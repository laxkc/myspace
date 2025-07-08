"use client";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-gray-500 border-t border-gray-200 py-12 px-4 mt-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6">
        <p className="text-sm tracking-wide text-center">
          © {currentYear} Laxman KC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
