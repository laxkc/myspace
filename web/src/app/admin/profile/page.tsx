"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiCamera,
  FiSave,
  FiEdit,
  FiLock,
  FiBell,
  FiShield,
  FiKey,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
} from "react-icons/fi";

// Profile form validation schema
const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});

// Password change validation schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [profileImage, setProfileImage] = useState("");

  // Profile form
  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Laxman",
      lastName: "KC",
      email: "laxman@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "https://laxmankc.dev",
      bio: "Full-stack developer with 5+ years of experience in React, Node.js, and modern web technologies. Passionate about creating scalable and user-friendly applications.",
      company: "Freelance Developer",
      jobTitle: "Senior Full-Stack Developer",
    },
  });

  // Password form
  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle profile update
  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  // Handle password change
  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password changed successfully!");
      setIsChangingPassword(false);
      resetPassword();
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Profile image updated!");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />



      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                {isEditing ? (
                  <FiX className="w-4 h-4" />
                ) : (
                  <FiEdit className="w-4 h-4" />
                )}
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          <div className="p-6">
            <form
              onSubmit={handleProfileSubmit(onProfileSubmit)}
              className="space-y-6"
            >
              {/* Profile Image */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-indigo-100 border-4 border-gray-200 flex items-center justify-center">
                      <FiUser className="w-12 h-12 text-indigo-600" />
                    </div>
                  )}
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-colors">
                      <FiCamera className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Profile Photo
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isEditing
                      ? "Click the camera icon to upload a new photo"
                      : "Your profile photo will be displayed across the platform"}
                  </p>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <Controller
                    name="firstName"
                    control={profileControl}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                          profileErrors.firstName
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300"
                        } ${!isEditing ? "bg-gray-50" : ""}`}
                        placeholder="Enter your first name"
                      />
                    )}
                  />
                  {profileErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <Controller
                    name="lastName"
                    control={profileControl}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                          profileErrors.lastName
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300"
                        } ${!isEditing ? "bg-gray-50" : ""}`}
                        placeholder="Enter your last name"
                      />
                    )}
                  />
                  {profileErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Controller
                  name="email"
                  control={profileControl}
                  render={({ field }) => (
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...field}
                        type="email"
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                          profileErrors.email
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300"
                        } ${!isEditing ? "bg-gray-50" : ""}`}
                        placeholder="Enter your email address"
                      />
                    </div>
                  )}
                />
                {profileErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {profileErrors.email.message}
                  </p>
                )}
              </div>

              {/* Phone and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Controller
                    name="phone"
                    control={profileControl}
                    render={({ field }) => (
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...field}
                          type="tel"
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                            profileErrors.phone
                              ? "border-red-300 focus:ring-red-200"
                              : "border-gray-300"
                          } ${!isEditing ? "bg-gray-50" : ""}`}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    )}
                  />
                  {profileErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Controller
                    name="location"
                    control={profileControl}
                    render={({ field }) => (
                      <div className="relative">
                        <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...field}
                          type="text"
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                            profileErrors.location
                              ? "border-red-300 focus:ring-red-200"
                              : "border-gray-300"
                          } ${!isEditing ? "bg-gray-50" : ""}`}
                          placeholder="Enter your location"
                        />
                      </div>
                    )}
                  />
                  {profileErrors.location && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.location.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <Controller
                  name="website"
                  control={profileControl}
                  render={({ field }) => (
                    <div className="relative">
                      <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        {...field}
                        type="url"
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                          profileErrors.website
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300"
                        } ${!isEditing ? "bg-gray-50" : ""}`}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  )}
                />
                {profileErrors.website && (
                  <p className="mt-1 text-sm text-red-600">
                    {profileErrors.website.message}
                  </p>
                )}
              </div>

              {/* Company and Job Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <Controller
                    name="company"
                    control={profileControl}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                          profileErrors.company
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300"
                        } ${!isEditing ? "bg-gray-50" : ""}`}
                        placeholder="Enter your company name"
                      />
                    )}
                  />
                  {profileErrors.company && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.company.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <Controller
                    name="jobTitle"
                    control={profileControl}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                          profileErrors.jobTitle
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300"
                        } ${!isEditing ? "bg-gray-50" : ""}`}
                        placeholder="Enter your job title"
                      />
                    )}
                  />
                  {profileErrors.jobTitle && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.jobTitle.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <Controller
                  name="bio"
                  control={profileControl}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={4}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors resize-none ${
                        profileErrors.bio
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-300"
                      } ${!isEditing ? "bg-gray-50" : ""}`}
                      placeholder="Tell us about yourself..."
                    />
                  )}
                />
                {profileErrors.bio && (
                  <p className="mt-1 text-sm text-red-600">
                    {profileErrors.bio.message}
                  </p>
                )}
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <FiSave className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Security Settings
              </h2>
              <button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                {isChangingPassword ? (
                  <FiX className="w-4 h-4" />
                ) : (
                  <FiLock className="w-4 h-4" />
                )}
                {isChangingPassword ? "Cancel" : "Change Password"}
              </button>
            </div>
          </div>

          <div className="p-6">
            {isChangingPassword ? (
              <form
                onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password *
                  </label>
                  <Controller
                    name="currentPassword"
                    control={passwordControl}
                    render={({ field }) => (
                      <div className="relative">
                        <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...field}
                          type={showPassword.current ? "text" : "password"}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                            passwordErrors.currentPassword
                              ? "border-red-300 focus:ring-red-200"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter your current password"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("current")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword.current ? (
                            <FiEyeOff className="w-5 h-5" />
                          ) : (
                            <FiEye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    )}
                  />
                  {passwordErrors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password *
                  </label>
                  <Controller
                    name="newPassword"
                    control={passwordControl}
                    render={({ field }) => (
                      <div className="relative">
                        <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...field}
                          type={showPassword.new ? "text" : "password"}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                            passwordErrors.newPassword
                              ? "border-red-300 focus:ring-red-200"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter your new password"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword.new ? (
                            <FiEyeOff className="w-5 h-5" />
                          ) : (
                            <FiEye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    )}
                  />
                  {passwordErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password *
                  </label>
                  <Controller
                    name="confirmPassword"
                    control={passwordControl}
                    render={({ field }) => (
                      <div className="relative">
                        <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...field}
                          type={showPassword.confirm ? "text" : "password"}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
                            passwordErrors.confirmPassword
                              ? "border-red-300 focus:ring-red-200"
                              : "border-gray-300"
                          }`}
                          placeholder="Confirm your new password"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword.confirm ? (
                            <FiEyeOff className="w-5 h-5" />
                          ) : (
                            <FiEye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    )}
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <FiCheck className="w-4 h-4" />
                    Update Password
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShield className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Password Security
                </h3>
                <p className="text-gray-600 mb-4">
                  Keep your account secure by using a strong password and
                  updating it regularly.
                </p>
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <FiLock className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
