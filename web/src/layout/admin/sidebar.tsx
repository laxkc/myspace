import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FiHome,
  FiFolder,
  FiFileText,
  FiTag,
  FiMail,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

const navLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <FiHome className="w-5 h-5" />,
    type: "link",
  },
  {
    label: "Blogs",
    href: "/admin/blogs",
    icon: <FiFileText className="w-5 h-5" />,
    type: "link",
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: <FiFolder className="w-5 h-5" />,
    type: "link",
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: <FiMail className="w-5 h-5" />,
    type: "link",
  },
  { type: "divider" },
  {
    label: "Profile",
    href: "/admin/profile",
    icon: <FiUser className="w-5 h-5" />,
    type: "profile",
  },
  {
    label: "Logout",
    icon: <FiLogOut className="w-5 h-5" />,
    type: "logout",
  },
];

interface AdminSidebarProps {
  onLogout?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout }) => {
  const pathname = usePathname();
  return (
    <aside className="bg-white border-r border-gray-200 h-screen w-16 sm:w-52 flex flex-col py-6 px-2 sm:px-4 transition-all duration-200">
      <nav className="flex flex-col gap-1">
        {navLinks.map((link, idx) => {
          if (link.type === "divider") {
            return <div key={idx} className="my-3 border-t border-gray-100" />;
          }
          if (link.type === "logout") {
            return (
              <button
                key={link.label}
                className="flex items-center gap-3 w-full rounded-lg px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                onClick={onLogout}
              >
                {link.icon}
                <span className="hidden sm:inline">Logout</span>
              </button>
            );
          }
          // Profile and normal links
          const active = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href ?? "#"}
              className={`flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors
                ${
                  active && link.type !== "profile"
                    ? "bg-indigo-50 text-indigo-700"
                    : link.type === "profile"
                    ? "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                }
                ${!active || link.type === "profile" ? "" : "shadow-sm"}
              `}
              aria-current={
                active && link.type !== "profile" ? "page" : undefined
              }
            >
              <span className="flex-shrink-0">{link.icon}</span>
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
