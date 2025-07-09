"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
// @ts-ignore
import Marker from "@editorjs/marker";
// @ts-ignore
import Checklist from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
// @ts-ignore
import LinkTool from "@editorjs/link";
// @ts-ignore
import Image from "@editorjs/image";
// @ts-ignore
import Embed from "@editorjs/embed";
// @ts-ignore
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import Paragraph from "@editorjs/paragraph";
import { FiX, FiImage } from "react-icons/fi";
import dynamic from "next/dynamic";

// Dynamically import ImageSearchModal to avoid SSR issues
const ImageSearchModal = dynamic(() => import("./ImageSearchModal"), {
  ssr: false,
});

// Type assertions for EditorJS tools
const MarkerTool = Marker as any;
const ChecklistTool = Checklist as any;
const LinkToolPlugin = LinkTool as any;
const EmbedTool = Embed as any;
const DelimiterTool = Delimiter as any;
const InlineCodeTool = InlineCode as any;
const ImageTool = Image as any;
const TableTool = Table as any;
const WarningTool = Warning as any;
const CodeTool = Code as any;
const ParagraphTool = Paragraph as any;

import { blogSchema } from './types';

import { Blog, BlogFormData } from './types';

interface BlogFormProps {
  isOpen: boolean;
  blog?: Blog | null;
  onClose: () => void;
  onSubmit: (data: BlogFormData) => Promise<void>;
  isSubmitting: boolean;
}

const defaultValues: BlogFormData = {
  title: "",
  slug: "",
  metaDescription: "",
  body: {
    time: 1,
    blocks: [],
  },
  coverImage: "",
  isPublished: false,
  publishedAt: undefined,
  isFeatured: false,
  readTime: 5,
  tags: [],
};

export default function BlogForm({
  isOpen,
  blog,
  onClose,
  onSubmit,
  isSubmitting,
}: BlogFormProps) {
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<EditorJS | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues,
  });

  const watchedTitle = watch("title");
  const isEditMode = !!blog;

  // Auto-generate slug from title
  useEffect(() => {
    if (watchedTitle && !isEditMode) {
      const slug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setValue("slug", slug);
    }
  }, [watchedTitle, setValue, isEditMode]);

  // Initialize EditorJS
  const initEditor = async (container: HTMLElement, data?: any) => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    const Quote = (await import("@editorjs/quote")).default;
    // @ts-ignore
    const Marker = (await import("@editorjs/marker")).default;
    // @ts-ignore
    const Checklist = (await import("@editorjs/checklist")).default;
    const Delimiter = (await import("@editorjs/delimiter")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    // @ts-ignore
    const LinkTool = (await import("@editorjs/link")).default;
    // @ts-ignore
    const ImageTool = (await import("@editorjs/image")).default;
    // @ts-ignore
    const Embed = (await import("@editorjs/embed")).default;
    // @ts-ignore
    const Table = (await import("@editorjs/table")).default;
    const Warning = (await import("@editorjs/warning")).default;
    const Code = (await import("@editorjs/code")).default;
    const Paragraph = (await import("@editorjs/paragraph")).default;

    if (editorRef.current) {
      editorRef.current.destroy();
    }

    editorRef.current = new EditorJS({
      holder: container,
      data: data || defaultValues.body,
      tools: {
        header: {
          // @ts-ignore
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2,
          },
        },
        list: {
          // @ts-ignore
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        delimiter: Delimiter,
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+C",
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "/api/fetch-link",
          },
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "/api/upload-image",
              byUrl: "/api/upload-image",
            },
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
            },
          },
        },
        table: {
          // @ts-ignore
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        warning: Warning,
        code: Code,
        paragraph: {
          // @ts-ignore
          class: Paragraph,
          inlineToolbar: true,
        },
      },
      placeholder: "Let's write something amazing!",
      onChange: () => {
        // Handle editor changes
      },
      onReady: () => {
        setEditorReady(true);
      },
    });
  };

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (blog) {
        reset({
          title: blog.title,
          slug: blog.slug,
          metaDescription: blog.metaDescription || "",
          body: blog.body || defaultValues.body,
          coverImage: blog.coverImage || "",
          isPublished: blog.isPublished,
          publishedAt: blog.publishedAt ? new Date(blog.publishedAt) : undefined,
          isFeatured: blog.isFeatured,
          readTime: blog.readTime || 5,
          tags: blog.tags || [],
        });
      } else {
        reset(defaultValues);
      }

      // Initialize editor after modal opens
      setTimeout(() => {
        const container = document.getElementById("editorjs");
        if (container) {
          initEditor(container, blog?.body);
        }
      }, 100);
    } else {
      setEditorReady(false);
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    }
  }, [isOpen, blog, reset]);

  const handleFormSubmit = async (data: BlogFormData) => {
    // Get editor data
    let editorData = data.body;
    if (editorRef.current && editorReady) {
      editorData = await editorRef.current.save();
    }

    await onSubmit({ ...data, body: editorData });
  };

  const handleClose = () => {
    onClose();
    reset(defaultValues);
    setEditorReady(false);
    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }
  };

  const handleSelectImage = (imageUrl: string) => {
    setValue("coverImage", imageUrl);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditMode ? "Edit Blog Post" : "Add New Blog Post"}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title *
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                      errors.title
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter blog title"
                  />
                )}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug *
              </label>
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                      errors.slug
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300"
                    }`}
                    placeholder="blog-url-slug"
                  />
                )}
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.slug.message}
                </p>
              )}
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <Controller
                name="metaDescription"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={2}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                      errors.metaDescription
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300"
                    }`}
                    placeholder="Brief description for SEO (optional)"
                  />
                )}
              />
              {errors.metaDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.metaDescription.message}
                </p>
              )}
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <Controller
                name="coverImage"
                control={control}
                render={({ field }) => (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        {...field}
                        type="url"
                        className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                          errors.coverImage
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300"
                        }`}
                        placeholder="https://example.com/cover-image.jpg"
                      />
                      <button
                        type="button"
                        onClick={() => setShowImageSearch(true)}
                        className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                      >
                        <FiImage className="w-4 h-4" />
                        Search
                      </button>
                    </div>

                    {/* Preview */}
                    {field.value && (
                      <div className="relative">
                        <img
                          src={field.value}
                          alt="Cover preview"
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => field.onChange("")}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {errors.coverImage && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.coverImage.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Read Time (minutes)
              </label>
              <Controller
                name="readTime"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="1"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                      errors.readTime
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300"
                    }`}
                    placeholder="5"
                  />
                )}
              />
              {errors.readTime && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.readTime.message}
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => {
                  const [inputValue, setInputValue] = useState("");

                  const addTag = (tag: string) => {
                    const trimmedTag = tag.trim();
                    if (trimmedTag && !field.value?.includes(trimmedTag)) {
                      field.onChange([...(field.value || []), trimmedTag]);
                      setInputValue("");
                    }
                  };

                  const removeTag = (tagToRemove: string) => {
                    field.onChange(
                      field.value?.filter((tag) => tag !== tagToRemove) || []
                    );
                  };

                  const handleKeyPress = (e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addTag(inputValue);
                    }
                  };

                  return (
                    <div className="space-y-3">
                      {/* Input field */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Type a tag and press Enter or comma to add..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors pr-20"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                        <button
                          type="button"
                          onClick={() => addTag(inputValue)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      {/* Tags display */}
                      {field.value && field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="text-indigo-600 hover:text-indigo-800 transition-colors"
                              >
                                <FiX className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Help text */}
                      <p className="text-xs text-gray-500">
                        Type a tag and press Enter, comma, or click Add. Click
                        the X to remove tags.
                      </p>

                      {/* Suggested tags */}
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-2">
                          Suggested tags:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {[
                            "React",
                            "TypeScript",
                            "JavaScript",
                            "Node.js",
                            "CSS",
                            "API",
                            "Frontend",
                            "Backend",
                            "DevOps",
                            "Database",
                            "Performance",
                            "Security",
                          ].map((suggestedTag) => (
                            <button
                              key={suggestedTag}
                              type="button"
                              onClick={() => addTag(suggestedTag)}
                              disabled={field.value?.includes(suggestedTag)}
                              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                                field.value?.includes(suggestedTag)
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {suggestedTag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            </div>

            {/* Published Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Published Date
              </label>
              <Controller
                name="publishedAt"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
                    placeholderText="Select publish date"
                    dateFormat="MMMM d, yyyy"
                    isClearable
                  />
                )}
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6">
              <Controller
                name="isPublished"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Published
                    </span>
                  </label>
                )}
              />

              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Featured
                    </span>
                  </label>
                )}
              />
            </div>

            {/* EditorJS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Content *
              </label>
              <div className="border border-gray-300 rounded-lg">
                <div id="editorjs" className="min-h-[400px] p-4" />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Use the toolbar to format your content. Supports headers,
                lists, quotes, code blocks, and more.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : isEditMode ? (
                  "Update Blog"
                ) : (
                  "Create Blog"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ImageSearchModal
        isOpen={showImageSearch}
        onClose={() => setShowImageSearch(false)}
        onSelectImage={handleSelectImage}
      />
    </>
  );
} 