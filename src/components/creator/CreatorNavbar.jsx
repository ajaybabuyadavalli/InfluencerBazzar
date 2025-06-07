import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Creator Navigation Component
 *
 * Purpose: Provides role-based navigation for creator users
 * Features:
 * - Dark/Light mode toggle
 * - User avatar dropdown with profile access
 * - Role-based menu items (creator only)
 * - Notification badge
 * - Mobile responsive design
 *
 * Backend Integration:
 * - User data should come from authentication context {{Dynamic}}
 * - Notification count from /api/creator/notifications/count {{Dynamic}}
 * - Avatar image from user profile endpoint {{Dynamic}}
 *
 * API Endpoints needed:
 * - GET /api/creator/profile (for user data)
 * - GET /api/creator/notifications/count
 * - POST /api/auth/logout
 */
export default function CreatorNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // {{Dynamic}} - from API
  const location = useLocation();
  const navigate = useNavigate();

  // {{Dynamic}} - This should come from authentication context/state management
  const currentUser = {
    name: "Ajay Kumar",
    email: "ajay@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: "creator",
    influbazzarScore: 84,
    level: "Gold Creator",
  };

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = stored ? JSON.parse(stored) : systemDark;
    setIsDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  /**
   * Toggle dark/light mode
   * Saves preference to localStorage for persistence
   */
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  /**
   * Creator-specific navigation items
   * These routes should be protected by RBAC middleware
   */
  const navigation = [
    { name: "Dashboard", href: "/creator/dashboard", icon: "🏠" },
    { name: "Discover", href: "/creator/discover-campaigns", icon: "🔍" },
    { name: "My Campaigns", href: "/creator/my-campaigns", icon: "📋" },
    { name: "My Content", href: "/creator/my-reels", icon: "🎬" },
    { name: "Earnings", href: "/creator/earnings", icon: "💰" },
    { name: "Analytics", href: "/creator/analytics", icon: "📊" },
  ];

  const isActive = (path) => location.pathname === path;

  /**
   * Handle user logout
   * Should clear authentication tokens and redirect to home
   */
  const handleLogout = async () => {
    try {
      // {{Dynamic}} - Call logout API endpoint
      // await api.post('/api/auth/logout')

      // Clear local storage
      localStorage.removeItem("userToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userData");

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Creator Navigation Bar - Dark themed with glass effect */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/creator/dashboard"
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IB</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Influbazzar
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    isActive(item.href)
                      ? "text-indigo-400 bg-indigo-900/30 shadow-lg"
                      : "text-gray-300 hover:text-indigo-400 hover:bg-indigo-900/20"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors duration-200">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors duration-200"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.button>

              {/* User Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-white">
                      {currentUser.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {currentUser.level}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600">
                        <div className="flex items-center space-x-3">
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-white font-medium">
                              {currentUser.name}
                            </div>
                            <div className="text-indigo-200 text-sm">
                              {currentUser.email}
                            </div>
                            <div className="text-indigo-200 text-xs">
                              Score: {currentUser.influbazzarScore}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/creator/profile"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/creator/settings"
                          className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-slate-700 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-700"
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-slate-800/95 backdrop-blur-lg border-t border-gray-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-indigo-400 bg-indigo-900/30"
                        : "text-gray-300 hover:text-indigo-400 hover:bg-slate-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
