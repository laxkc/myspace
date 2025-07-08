"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Header as UserHeader, Footer as UserFooter } from "../layout/user";
import {
  Header as AdminHeader,
  Sidebar as AdminSidebar,
} from "../layout/admin";

export default function UserLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.includes("/admin");

  if (isAdmin) {
    return (
      <>
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </>
    );
  }

  return (
    <>
      <UserHeader />
      <main className="flex-1">{children}</main>
      <UserFooter />
    </>
  );
}
