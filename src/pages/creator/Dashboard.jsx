import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  TrendingUp,
  DollarSign,
  CheckCircle,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  ArrowUpRight,
  Star,
  Award,
  Target,
  Upload,
  Search,
  Bell,
  MoreHorizontal,
  Play,
} from "lucide-react";

/**
 * Creator Dashboard Component
 *
 * Purpose: Main dashboard for creator users showing performance metrics,
 * notifications, quick actions, and campaign overview
 *
 * Features:
 * - Animated statistics with count-up effects
 * - Real-time notification feed
 * - Performance charts and metrics
 * - Quick action buttons
 * - Responsive design with dark theme
 *
 * Backend Integration:
 * - Dashboard stats from /api/creator/dashboard/stats {{Dynamic}}
 * - Notifications from /api/creator/notifications {{Dynamic}}
 * - Top performing content from /api/creator/content/top-performing {{Dynamic}}
 * - Campaign data from /api/creator/campaigns/overview {{Dynamic}}
 *
 * API Endpoints needed:
 * - GET /api/creator/dashboard/stats
 * - GET /api/creator/notifications?limit=5
 * - GET /api/creator/content/top-performing?limit=3
 * - GET /api/creator/campaigns/active
 * - GET /api/creator/profile/completion
 */
export default function CreatorDashboard() {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [showScoreTooltip, setShowScoreTooltip] = useState(false);

  // {{Dynamic}} - These should come from API endpoints
  const [dashboardData, setDashboardData] = useState({
    user: {
      name: "Ajay Kumar",
      influbazzarScore: 84,
      level: "Gold Creator",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      profileCompletion: 85,
    },
    stats: {
      totalEarnings: 45670,
      activeCampaigns: 3,
      approvalRate: 92,
      avgEngagement: 8.5,
      followerGrowth: 1.4,
      totalFollowers: 28500,
    },
    notifications: [
      {
        id: 1,
        type: "approval",
        icon: CheckCircle,
        title: "Content Approved",
        message: "Your Instagram post for SkinGlow Pro has been approved!",
        timestamp: "2 hours ago",
        color: "text-green-500",
      },
      {
        id: 2,
        type: "payout",
        icon: DollarSign,
        title: "Payment Released",
        message: "₹5,000 has been credited to your account",
        timestamp: "5 hours ago",
        color: "text-green-500",
      },
      {
        id: 3,
        type: "invite",
        icon: Bell,
        title: "New Campaign Invite",
        message: "FitLife Supplements wants to collaborate with you",
        timestamp: "Yesterday",
        color: "text-blue-500",
      },
      {
        id: 4,
        type: "achievement",
        icon: Award,
        title: "Achievement Unlocked",
        message: "You reached Gold Creator status!",
        timestamp: "2 days ago",
        color: "text-yellow-500",
      },
    ],
    topPerformingContent: [
      {
        id: 1,
        thumbnail:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=400&fit=crop",
        title: "Skincare Morning Routine",
        views: 45200,
        likes: 3200,
        engagement: 9.2,
      },
      {
        id: 2,
        thumbnail:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
        title: "Workout Motivation",
        views: 38900,
        likes: 2800,
        engagement: 8.7,
      },
      {
        id: 3,
        thumbnail:
          "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=400&fit=crop",
        title: "Tech Review Unboxing",
        views: 52100,
        likes: 4100,
        engagement: 10.1,
      },
    ],
  });

  /**
   * Load dashboard data from API
   * This should be called on component mount and when user returns to dashboard
   */
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // {{Dynamic}} - Replace with actual API calls
        // const response = await api.get('/api/creator/dashboard/stats')
        // setDashboardData(response.data)
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    };

    loadDashboardData();
  }, []);

  /**
   * Score breakdown for tooltip
   * Shows factors contributing to Influbazzar Score
   */
  const scoreBreakdown = [
    { factor: "Content Quality", score: 90, weight: "30%" },
    { factor: "Engagement Rate", score: 85, weight: "25%" },
    { factor: "Delivery Consistency", score: 88, weight: "20%" },
    { factor: "Brand Feedback", score: 82, weight: "15%" },
    { factor: "Profile Completeness", score: 85, weight: "10%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <img
                  src={dashboardData.user.avatar}
                  alt={dashboardData.user.name}
                  className="w-16 h-16 rounded-full border-4 border-white/20"
                />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Hi {dashboardData.user.name}! 👋
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-lg">Your Influbazzar Score is</span>
                    <div
                      className="relative cursor-pointer"
                      onMouseEnter={() => setShowScoreTooltip(true)}
                      onMouseLeave={() => setShowScoreTooltip(false)}
                    >
                      <span className="text-2xl font-bold text-yellow-300">
                        {dashboardData.user.influbazzarScore}
                      </span>

                      {/* Score Tooltip */}
                      {showScoreTooltip && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white text-gray-900 rounded-lg shadow-xl p-4 z-50"
                        >
                          <div className="text-sm font-medium mb-3">
                            Score Breakdown:
                          </div>
                          {scoreBreakdown.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center mb-2"
                            >
                              <span className="text-xs">{item.factor}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-indigo-600 h-2 rounded-full"
                                    style={{ width: `${item.score}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium w-8">
                                  {item.score}
                                </span>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Award className="h-5 w-5 text-yellow-300" />
                    <span className="text-yellow-300 font-medium">
                      {dashboardData.user.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Completion */}
              {dashboardData.user.profileCompletion < 100 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm mb-2">Profile Completion</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-white/20 rounded-full h-2">
                      <motion.div
                        className="bg-white h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${dashboardData.user.profileCompletion}%`,
                        }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {dashboardData.user.profileCompletion}%
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/creator/profile")}
                    className="text-xs text-white/80 hover:text-white mt-1 underline"
                  >
                    Complete Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Statistics Widgets */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          ref={ref}
        >
          {[
            {
              title: "Total Earnings",
              value: dashboardData.stats.totalEarnings,
              prefix: "₹",
              icon: DollarSign,
              color: "from-green-500 to-emerald-600",
              change: "+12.5%",
              changeType: "positive",
            },
            {
              title: "Active Campaigns",
              value: dashboardData.stats.activeCampaigns,
              icon: Target,
              color: "from-blue-500 to-cyan-600",
              change: "+2",
              changeType: "positive",
            },
            {
              title: "Approval Rate",
              value: dashboardData.stats.approvalRate,
              suffix: "%",
              icon: CheckCircle,
              color: "from-purple-500 to-violet-600",
              change: "+5.2%",
              changeType: "positive",
            },
            {
              title: "Avg Engagement",
              value: dashboardData.stats.avgEngagement,
              suffix: "%",
              icon: Heart,
              color: "from-pink-500 to-rose-600",
              change: "+0.3%",
              changeType: "positive",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:bg-slate-800/70 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>

                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.prefix}
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2}
                      delay={index * 0.2}
                      preserveValue
                      separator=","
                    />
                  )}
                  {stat.suffix}
                </div>

                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {stat.title}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notifications Feed */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-indigo-400" />
                  <span>Recent Activity</span>
                </h3>
                <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                  Mark all as read
                </button>
              </div>

              <div className="space-y-4">
                {dashboardData.notifications.map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer"
                    >
                      <div
                        className={`p-2 rounded-lg bg-slate-700 ${notification.color}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium">
                          {notification.title}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">
                          {notification.message}
                        </div>
                        <div className="text-gray-500 text-xs mt-2">
                          {notification.timestamp}
                        </div>
                      </div>
                      <MoreHorizontal className="h-4 w-4 text-gray-500 hover:text-gray-300" />
                    </motion.div>
                  );
                })}
              </div>

              <button
                onClick={() => navigate("/creator/notifications")}
                className="w-full mt-4 py-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
              >
                View All Notifications
              </button>
            </motion.div>
          </div>

          {/* Quick Actions & Top Performing Content */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
            >
              <h3 className="text-lg font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Browse Campaigns",
                    icon: Search,
                    href: "/creator/discover-campaigns",
                    color: "from-blue-500 to-cyan-600",
                  },
                  {
                    label: "Upload Content",
                    icon: Upload,
                    href: "/creator/my-campaigns",
                    color: "from-green-500 to-emerald-600",
                  },
                  {
                    label: "Update Profile",
                    icon: Star,
                    href: "/creator/profile",
                    color: "from-purple-500 to-violet-600",
                  },
                ].map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(action.href)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r ${action.color} text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{action.label}</span>
                      <ArrowUpRight className="h-4 w-4 ml-auto" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Top Performing Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Top Performing</h3>
                <button
                  onClick={() => navigate("/creator/my-reels")}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {dashboardData.topPerformingContent.map((content, index) => (
                  <div
                    key={content.id}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer group"
                  >
                    <div className="relative">
                      <img
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">
                        {content.title}
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-400">
                            {content.views.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3 text-red-400" />
                          <span className="text-xs text-gray-400">
                            {content.likes.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-green-400 mt-1">
                        {content.engagement}% engagement
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Performance Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
        >
          <h3 className="text-xl font-bold text-white mb-6">
            Performance Snapshot
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Follower Growth Chart Placeholder */}
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 text-sm">Follower Growth</span>
                <span className="text-green-400 text-sm font-medium">
                  +{dashboardData.stats.followerGrowth}% ↑
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {dashboardData.stats.totalFollowers.toLocaleString()}
              </div>
              <div className="h-16 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded flex items-end justify-center">
                <TrendingUp className="h-8 w-8 text-indigo-400" />
              </div>
            </div>

            {/* Campaign Status Pie Chart Placeholder */}
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-gray-300 text-sm mb-3">Campaign Status</div>
              <div className="flex items-center justify-center h-20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-80"></div>
              </div>
              <div className="text-center mt-2">
                <span className="text-white text-sm">
                  3 Active, 8 Completed
                </span>
              </div>
            </div>

            {/* Platform Engagement Bar Chart Placeholder */}
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-gray-300 text-sm mb-3">
                Platform Engagement
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Instagram</span>
                  <span className="text-white">8.5%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-pink-500 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">YouTube</span>
                  <span className="text-white">6.2%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: "62%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
