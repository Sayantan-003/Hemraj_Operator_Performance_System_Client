import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "../assets/images/Hemraj_logo.png"

// Helper to get initials from username
function getInitials(name) {
  if (!name || typeof name !== 'string') return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// User avatar + dropdown menu
function UserMenu({ user, logout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open]);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open user menu"
        type="button"
      >
        {getInitials(user?.username)}
      </button>
      
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-2xl py-4 z-50 border border-gray-100 transform transition-all duration-200 ease-out scale-100 opacity-100">
            {/* User Info Header */}
            <div className="flex items-center px-4 sm:px-6 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold mr-3 flex-shrink-0">
                {getInitials(user?.username)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-800 text-sm sm:text-base truncate">{user?.username || 'User'}</div>
                <div className="text-xs text-gray-500 capitalize truncate">{user?.role?.replace(/_/g, ' ') || 'Role'}</div>
              </div>
            </div>
            
            {/* Logout Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="w-full flex items-center px-4 sm:px-6 py-3 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-all duration-200 text-sm sm:text-base"
              >
                <span className="mr-3">🚪</span> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function SimpleLogoutHeader() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Right Side - User Avatar */}
          <div className="flex items-center">
            {user && user.username ? (
              <UserMenu user={user} logout={logout} />
            ) : (
              <div className="text-sm text-gray-500">No user data</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}