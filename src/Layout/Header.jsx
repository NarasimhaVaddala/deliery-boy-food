import React, { useState } from "react";
import { Menu, X } from "lucide-react";

// Header Component
export default function Header({ onMenuClick, isSidebarOpen }) {
  return (
    <div className="bg-white shadow-md px-4 py-3 flex items-center justify-between md:justify-start">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-md hover:bg-gray-100 md:hidden"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <h1 className="text-xl font-semibold ml-2">Header</h1>
    </div>
  );
}
