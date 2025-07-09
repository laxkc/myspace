"use client";
import React from "react";
import AdminDashboard from "@/pages/admin/dashboard";

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';

const AdminPage = () => {
  return <AdminDashboard />;
};

export default AdminPage;
