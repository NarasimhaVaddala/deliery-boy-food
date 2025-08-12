import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    title: "Home",
    path: "/",
  },
];

// Sidebar Component
export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-[100vh] w-80 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-auto md:w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 md:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-700"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4">
          <nav className="space-y-2">
            {links.map((e, index) => {
              const isActive = location.pathname === e.path;

              return (
                <Link
                  className={`block py-2 px-3 rounded transition-colors ${
                    isActive
                      ? "bg-white text-gray-900 font-medium"
                      : "hover:bg-gray-700"
                  }`}
                  key={index}
                  to={e.path}
                  onClick={onClose} // Close sidebar on mobile when link is clicked
                >
                  {e.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
