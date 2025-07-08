import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

interface SignInProps {
  onSignIn?: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!validateEmail(email)) newErrors.email = "Enter a valid email.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    // TODO: Add your sign-in logic here
    setTimeout(() => {
      setSubmitting(false);
      if (onSignIn) onSignIn();
      // Reset form or redirect
    }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-2 sm:py-16 sm:px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Admin Sign In
        </h1>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Please sign in to your admin account
        </p>
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiMail size={18} />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.email ? "border-red-400" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-sm bg-gray-50`}
                placeholder="you@email.com"
                value={email}
                onChange={handleEmailChange}
                disabled={submitting}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiLock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                className={`w-full pl-10 pr-10 py-2 border ${
                  errors.password ? "border-red-400" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-sm bg-gray-50`}
                placeholder="Your password"
                value={password}
                onChange={handlePasswordChange}
                disabled={submitting}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675m2.122 2.122A9.956 9.956 0 012 9c0 5.523 4.477 10 10 10 1.657 0 3.236-.336 4.675-.938m-2.122-2.122A9.956 9.956 0 0022 15c0-5.523-4.477-10-10-10-1.657 0-3.236.336-4.675.938"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={
              submitting ||
              !email ||
              !password ||
              Object.keys(errors).length > 0
            }
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
