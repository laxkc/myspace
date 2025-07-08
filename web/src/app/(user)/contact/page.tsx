"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

// Contact form validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message sent successfully! I'll get back to you soon.");
      setIsSubmitted(true);
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white py-12 px-4">
        <Toaster position="top-right" />
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Message Sent Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for reaching out. I'll review your message and get back
              to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full py-3 px-6 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4">
      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600">
            Have a question, want to collaborate, or just want to say hello? I'd
            love to hear from you. Send me a message and I'll respond as soon as
            possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FiMessageSquare className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...field}
                      type="text"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                        errors.name
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                )}
              />
              {errors.name && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <FiAlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...field}
                      type="email"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                        errors.email
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                )}
              />
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <FiAlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Subject Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                      errors.subject
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300"
                    }`}
                    placeholder="What's this about?"
                  />
                )}
              />
              {errors.subject && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <FiAlertCircle className="w-4 h-4" />
                  {errors.subject.message}
                </div>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors resize-none ${
                      errors.message
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300"
                    }`}
                    placeholder="Tell me more about your project, question, or how I can help you..."
                  />
                )}
              />
              {errors.message && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <FiAlertCircle className="w-4 h-4" />
                  {errors.message.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
