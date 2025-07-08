import React from "react";
import { FiBell } from "react-icons/fi";

const AdminHeader = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm px-2 sm:px-6 py-2 flex items-center justify-between z-50">
      {/* Logo/Title */}
      <div className="font-extrabold text-xl text-indigo-700 tracking-tight whitespace-nowrap">Admin</div>
      {/* Notification Icon */}
      <button
        className="ml-auto p-2 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
        aria-label="Notifications"
      >
        <FiBell className="w-6 h-6 text-gray-500 hover:text-indigo-600 transition" />
      </button>
    </header>
  );
};

export default AdminHeader;
