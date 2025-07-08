"use client";
import React, { useState } from "react";
import { FiX, FiSearch, FiImage, FiDownload } from "react-icons/fi";
import { createApi } from "unsplash-js";

// Initialize Unsplash API
const unsplash = createApi({
  accessKey:
    process.env.UNPLASH_ACCESS_KEY ||
    "YPNkwLHptlecZnyvF-_HduMY25AaGuXel_UseIZUQVQ",
});

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

export default function ImageSearchModal({
  isOpen,
  onClose,
  onSelectImage,
}: ImageSearchModalProps) {
  const [imageSearchTerm, setImageSearchTerm] = useState("");
  const [searchingImages, setSearchingImages] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [imageErrorMap, setImageErrorMap] = useState<{ [id: string]: boolean }>(
    {}
  );

  const searchImages = async (query: string) => {
    if (!query.trim()) return;

    setSearchingImages(true);
    try {
      const result = await unsplash.search.getPhotos({
        query: query,
        page: 1,
        perPage: 20,
        orientation: "landscape",
      });

      if (result.response) {
        setSearchResults(result.response.results);
        setLoadingImages(
          new Set(result.response.results.map((img: any) => img.id))
        );
      } else {
        console.error("No response from Unsplash:", result);
      }
    } catch (error) {
      console.error("Unsplash API error:", error);
    } finally {
      setSearchingImages(false);
    }
  };

  const handleImageSearch = () => {
    searchImages(imageSearchTerm);
  };

  const selectImage = (image: any) => {
    const imageUrl = image.urls.full;
    onSelectImage(imageUrl);
    onClose();
    setImageSearchTerm("");
    setSearchResults([]);
  };

  const handleClose = () => {
    onClose();
    setImageSearchTerm("");
    setSearchResults([]);
    setLoadingImages(new Set());
    setImageErrorMap({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Search Images from Unsplash
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Input */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search for images (e.g., nature, technology, business)..."
              value={imageSearchTerm}
              onChange={(e) => setImageSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleImageSearch()}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
            />
            <button
              onClick={handleImageSearch}
              disabled={searchingImages || !imageSearchTerm.trim()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {searchingImages ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <FiSearch className="w-4 h-4" />
                  Search
                </>
              )}
            </button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Search Results ({searchResults.length} images)
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((image) => (
                  <div
                    key={image.id}
                    className="group relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={() => selectImage(image)}
                    style={{ minHeight: 128 }}
                  >
                    {/* Loading state */}
                    {loadingImages.has(image.id) &&
                      !imageErrorMap[image.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    <img
                      src={
                        imageErrorMap[image.id]
                          ? "https://via.placeholder.com/400x200?text=No+Image"
                          : image.urls.small
                      }
                      alt={image.alt_description || "Unsplash image"}
                      className={`w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200 ${
                        loadingImages.has(image.id) &&
                        !imageErrorMap[image.id]
                          ? "opacity-0"
                          : "opacity-100"
                      }`}
                      loading="lazy"
                      width={400}
                      height={128}
                      onLoad={() => {
                        setLoadingImages((prev) => {
                          const newSet = new Set(prev);
                          newSet.delete(image.id);
                          return newSet;
                        });
                      }}
                      onError={() => {
                        setImageErrorMap((prev) => ({
                          ...prev,
                          [image.id]: true,
                        }));
                        setLoadingImages((prev) => {
                          const newSet = new Set(prev);
                          newSet.delete(image.id);
                          return newSet;
                        });
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-white rounded-full p-2">
                          <FiDownload className="w-4 h-4 text-gray-700" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-white text-xs truncate">
                        Photo by{" "}
                        <a
                          href={image.user.links.html}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-indigo-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {image.user.name}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchResults.length === 0 &&
            imageSearchTerm &&
            !searchingImages && (
              <div className="text-center py-12">
                <FiImage className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  No images found for "{imageSearchTerm}"
                </p>
                <p className="text-sm text-gray-400">
                  Try a different search term
                </p>
              </div>
            )}

          {/* Initial State */}
          {searchResults.length === 0 &&
            !imageSearchTerm &&
            !searchingImages && (
              <div className="text-center py-12">
                <FiImage className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Search for images to use as your blog cover
                </p>
                <p className="text-sm text-gray-400">
                  Try searching for terms like "technology", "nature",
                  "business", etc.
                </p>
              </div>
            )}

          {/* Attribution */}
          <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
            <p>
              Images provided by{" "}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 underline"
              >
                Unsplash
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 