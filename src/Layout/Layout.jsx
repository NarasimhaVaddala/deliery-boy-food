import Header from "./Header";
import Sidebar from "./Sidebar";

import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

// Layout Component
export default function Layout() {
  const { profile } = useSelector((state) => state.profile);

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!profile?.approved) {
    return <Navigate to="/under-verification" replace />;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Main Content */}
        <div className="flex-1 p-4 md:ml-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
