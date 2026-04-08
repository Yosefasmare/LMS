"use client";

import Sidebar from "@/components/admin/Sidebar";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row bg-background min-h-screen">
      {/* Mobile Top Bar */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">LMS Admin</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar with visibility control */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 transition-transform duration-300 ease-in-out md:static md:translate-x-0`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}

