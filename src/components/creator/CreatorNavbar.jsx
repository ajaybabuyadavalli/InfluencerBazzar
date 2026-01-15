/**
 * Creator Navbar Component
 *
 * Specialized navigation bar for Creator dashboard with:
 * - Role-based navigation menu
 * - User profile dropdown with avatar
 * - Notification center with real-time updates
 * - Dark/light theme toggle
 * - Mobile-responsive hamburger menu
 * - Smooth glass morphism design
 * - Logout functionality
 *
 * Backend Integration:
 * {{Dynamic}} - User data from GET /api/user/profile
 * {{Dynamic}} - Notifications from GET /api/creator/notifications?unread=true
 * {{Dynamic}} - Logout via POST /api/auth/logout
 *
 * Real-time Features:
 * - WebSocket connection for live notifications
 * - Badge count updates
 * - Online status indicator
 */

import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  Search,
  Briefcase,
  FileText,
  DollarSign,
  BarChart3,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

/**
 * Creator Navbar Component
 *
 * @param {Object} user - Current user data from authentication context
 * @param {Function} onThemeToggle - Theme toggle handler
 * @param {boolean} isDarkMode - Current theme state
 */
const CreatorNavbar = ({
  user = null,
  onThemeToggle = () => {},
  isDarkMode = true,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  /**
   * Navigation menu items for Creator dashboard
   * {{Dynamic}} - Menu items can be role-based from backend configuration
   */
  const navigationItems = [
    {
      name: "Dashboard",
      href: "/creator/dashboard",
      icon: Home,
      description: "Overview and stats",
    },
    {
      name: "Discover",
      href: "/creator/discover-campaigns",
      icon: Search,
      description: "Find new campaigns",
    },
    {
      name: "My Campaigns",
      href: "/creator/my-campaigns",
      icon: Briefcase,
      description: "Track your campaigns",
    },
    {
      name: "Profile",
      href: "/creator/profile",
      icon: User,
      description: "Manage your profile",
    },
    {
      name: "Earnings",
      href: "/creator/earnings",
      icon: DollarSign,
      description: "View your earnings",
    },
    {
      name: "Analytics",
      href: "/creator/analytics",
      icon: BarChart3,
      description: "Performance insights",
    },
    {
      name: "Support",
      href: "/creator/support",
      icon: HelpCircle,
      description: "Get help and support",
    },
  ];

  /**
   * Mock notifications - {{Dynamic}} Replace with GET /api/creator/notifications
   */
  useEffect(() => {
    // {{Dynamic}} - Real API call would be:
    // const fetchNotifications = async () => {
    //   try {
    //     const response = await fetch('/api/creator/notifications?unread=true', {
    //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //     })
    //     const data = await response.json()
    //     setNotifications(data.notifications)
    //     setUnreadCount(data.unreadCount)
    //   } catch (error) {
    //     console.error('Failed to fetch notifications:', error)
    //   }
    // }
    // fetchNotifications()

    // Mock data for demo
    const mockNotifications = [
      {
        id: "notif_001",
        type: "campaign_approval",
        title: "Campaign Approved! 🎉",
        message: "Your application for #GlowFix campaign has been approved",
        timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        isRead: false,
        actionUrl: "/creator/my-campaigns",
      },
      {
        id: "notif_002",
        type: "payout_released",
        title: "Payment Released 💸",
        message: "Escrow payout of ₹1,500 has been released",
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        isRead: false,
        actionUrl: "/creator/earnings",
      },
      {
        id: "notif_003",
        type: "score_update",
        title: "Influbazzar Score Updated",
        message: "Your score increased by 5 points! Current score: 84",
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        isRead: true,
        actionUrl: "/creator/analytics",
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.isRead).length);
  }, []);

  /**
   * Setup WebSocket for real-time notifications
   * {{Dynamic}} - Connect to WebSocket endpoint for live updates
   */
  useEffect(() => {
    // {{Dynamic}} - Real WebSocket implementation:
    // const ws = new WebSocket(`ws://localhost:3001/ws/creator/${user?.id}`)
    //
    // ws.onmessage = (event) => {
    //   const notification = JSON.parse(event.data)
    //   setNotifications(prev => [notification, ...prev])
    //   setUnreadCount(prev => prev + 1)
    // }
    //
    // return () => ws.close()
  }, [user?.id]);

  /**
   * Close dropdowns when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handle user logout
   * {{Dynamic}} - Call POST /api/auth/logout to invalidate session
   */
  const handleLogout = async () => {
    try {
      // {{Dynamic}} - Real logout implementation:
      // await fetch('/api/auth/logout', {
      //   method: 'POST',
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // })

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect on error
      navigate("/login");
    }
  };

  /**
   * Mark notification as read
   * {{Dynamic}} - Call PATCH /api/notifications/:id/read
   */
  const markNotificationAsRead = async (notificationId) => {
    try {
      // {{Dynamic}} - Real API call:
      // await fetch(`/api/notifications/${notificationId}/read`, {
      //   method: 'PATCH',
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // })

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif,
        ),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  /**
   * Format timestamp for notifications
   */
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  /**
   * Check if current route is active
   */
  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/creator/dashboard" className="flex items-center space-x-3">
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              IB
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Influbazzar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "text-indigo-300 bg-indigo-500/20"
                        : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    }
                  `}
                >
                  <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </motion.div>

                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 rounded-full"
                      layoutId="activeTab"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={onThemeToggle}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationDropdownRef}>
              <motion.button
                onClick={() =>
                  setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
                }
                className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={unreadCount}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {isNotificationDropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-600 rounded-xl shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 border-b border-gray-600">
                      <h3 className="text-lg font-semibold text-white">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <p className="text-sm text-gray-400">
                          {unreadCount} unread
                        </p>
                      )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            className={`
                              p-4 border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors
                              ${!notification.isRead ? "bg-indigo-500/10" : ""}
                            `}
                            onClick={() => {
                              if (!notification.isRead) {
                                markNotificationAsRead(notification.id);
                              }
                              if (notification.actionUrl) {
                                navigate(notification.actionUrl);
                                setIsNotificationDropdownOpen(false);
                              }
                            }}
                            whileHover={{
                              backgroundColor: "rgba(55, 65, 81, 0.5)",
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`
                                w-2 h-2 rounded-full mt-2 flex-shrink-0
                                ${!notification.isRead ? "bg-indigo-400" : "bg-gray-600"}
                              `}
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {formatTimeAgo(notification.timestamp)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-gray-400">No notifications yet</p>
                        </div>
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className="p-3 bg-gray-750 border-t border-gray-600">
                        <Link
                          to="/creator/notifications"
                          className="block text-center text-sm text-indigo-400 hover:text-indigo-300"
                          onClick={() => setIsNotificationDropdownOpen(false)}
                        >
                          View all notifications
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <motion.button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* {{Dynamic}} - User avatar from user.avatar API field */}
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0) || "A"}
                    </span>
                  )}
                </div>

                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">
                    {user?.name || "Ajay Kumar"}
                  </p>
                  <div className="flex items-center space-x-1">
                    <p className="text-xs text-gray-400">
                      Score: {user?.influbazzarScore || 84}
                    </p>
                    {user?.isVerified && (
                      <span className="text-green-400">✓</span>
                    )}
                  </div>
                </div>

                <ChevronDown className="w-4 h-4" />
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-xl shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* User Info */}
                    <div className="p-4 border-b border-gray-600">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                          {user?.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-medium">
                              {user?.name?.charAt(0) || "A"}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {user?.name || "Ajay Kumar"}
                          </p>
                          <p className="text-sm text-gray-400">
                            {user?.email || "ajay@example.com"}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                              Score: {user?.influbazzarScore || 84}
                            </span>
                            {user?.isVerified && (
                              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                                Verified ✓
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/creator/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>View Profile</span>
                      </Link>

                      <Link
                        to="/creator/settings"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>

                      <Link
                        to="/creator/support"
                        className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Help & Support</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-600">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActiveRoute(item.href);

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                        ${
                          isActive
                            ? "text-indigo-300 bg-indigo-500/20"
                            : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                        }
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <div>{item.name}</div>
                        <div className="text-xs text-gray-400">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default CreatorNavbar;
