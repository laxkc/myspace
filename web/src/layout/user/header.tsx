"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHeaderActiveTab } from "@/contexts/HeaderActiveTabContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeTab } = useHeaderActiveTab();

  // Header data
  const headerData = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/project" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      label: "Github",
      href: "https://github.com/laxkc",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/laxmankc/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <header className="w-full bg-white text-gray-900 sticky top-0 z-[1000] transition-all duration-300 backdrop-blur border-b border-gray-200 shadow-sm">
      <nav className="flex items-center justify-between max-w-[1200px] mx-auto px-4 md:px-8 py-4 md:py-3 w-full">
        {/* Logo */}
        <Link
          href="/"
          className="font-extrabold text-[1.75rem] md:text-[1.5rem] tracking-tight bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text text-transparent no-underline transition-transform duration-200 inline-block font-sans shrink-0"
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Laxman KC
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-auto p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Main nav, social, and search bar (desktop/tablet) */}
        <div className="hidden md:flex items-center flex-1 min-w-0 gap-6 lg:gap-10">
          {/* Main Nav Links */}
          <div className="flex gap-6 lg:gap-8 items-center flex-1 min-w-0 ml-4 md:ml-6 overflow-x-auto flex-nowrap">
            {headerData.map((item) => {
              const isActive = activeTab === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative no-underline font-medium text-[0.95rem] py-2 transition-colors duration-200 whitespace-nowrap text-gray-600 hover:text-indigo-500`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#6366f1";
                    const underline = e.currentTarget.querySelector(
                      ".underline"
                    ) as HTMLElement;
                    if (underline) underline.style.width = "100%";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#4b5563";
                    const underline = e.currentTarget.querySelector(
                      ".underline"
                    ) as HTMLElement;
                    if (underline)
                      underline.style.width = isActive ? "100%" : "0";
                  }}
                >
                  {item.label}
                  <span
                    className="underline absolute bottom-0 left-0 h-[2px] bg-indigo-500 transition-all duration-300"
                    style={{ width: isActive ? "100%" : "0" }}
                  />
                </Link>
              );
            })}
          </div>
          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 mx-2" />
          {/* Social Links */}
          <div className="flex gap-4 lg:gap-5 items-center">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500 transition-colors duration-200 p-2 rounded-lg flex items-center justify-center"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#6366f1";
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6b7280";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                aria-label={item.label}
              >
                {item.icon}
              </Link>
            ))}
          </div>
          {/* Search Bar (hide below lg) */}
          <div className="hidden lg:flex items-center min-w-0 pl-4">
            <div className="flex w-full max-w-xs h-10">
              <input
                type="search"
                className="flex-1 h-full px-3 border border-gray-200 rounded-l-md text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition min-w-0"
                placeholder="Search..."
                aria-label="Search"
              />
              <button
                type="button"
                className="h-full px-3 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition flex items-center justify-center border border-l-0 border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50 animate-fade-in flex flex-col py-4 px-6 gap-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {headerData.map((item) => {
                const isActive = activeTab === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`font-medium py-2 border-b border-gray-100 last:border-b-0 transition-colors duration-200 text-gray-700 hover:text-indigo-500`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex gap-4 mt-2">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-500 transition-colors duration-200 p-2 rounded-lg flex items-center justify-center"
                  aria-label={item.label}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
