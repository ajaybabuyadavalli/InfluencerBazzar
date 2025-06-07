/**
 * Creator Dashboard - Main Overview Page
 *
 * Comprehensive dashboard showing creator's performance metrics,
 * earnings, campaigns, and actionable insights. Features:
 * - Animated statistics with count-up effects
 * - Real-time notifications feed
 * - Performance charts and visualizations
 * - Quick action buttons for common tasks
 * - Influbazzar Score breakdown with tooltip
 * - Top performing content showcase
 * - Mobile-responsive design with glass morphism
 *
 * Backend Integration:
 * {{Dynamic}} - Dashboard stats from GET /api/creator/stats
 * {{Dynamic}} - Notifications from GET /api/creator/notifications
 * {{Dynamic}} - Top content from GET /api/creator/content/top-performing
 * {{Dynamic}} - Recent campaigns from GET /api/creator/campaigns/recent
 *
 * Real-time Features:
 * - WebSocket for live stat updates
 * - Push notifications for new opportunities
 * - Live engagement rate tracking
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Target,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Search,
  Upload,
  User,
  Bell,
  Filter,
  Calendar,
  ExternalLink,
  Info,
  ChevronRight,
  Play,
} from "lucide-react";

// Shared Components
import AnimatedCard, {
  StatCard,
  ActionCard,
} from "../../components/shared/AnimatedCard";
import RippleButton, {
  PrimaryButton,
  OutlineButton,
} from "../../components/shared/RippleButton";
import {
  LineChart,
  PieChart,
  DonutChart,
} from "../../components/shared/ChartComponents";
import {
  useAnimatedCounter,
  useCurrencyCounter,
  usePercentageCounter,
} from "../../hooks/useAnimatedCounter";

// Mock Data - {{Dynamic}} Replace with API calls
import {
  dashboardStats,
  notifications,
  topPerformingContent,
  myCampaigns,
  creatorProfile,
} from "../../utils/mockData";

/**
 * Creator Dashboard Component
 *
 * Main dashboard interface for creators showing overview of their
 * performance, earnings, and opportunities
 */
const CreatorDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [notificationFilter, setNotificationFilter] = useState("all");
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(dashboardStats);

  const controls = useAnimation();

  /**
   * Fetch dashboard data from API
   * {{Dynamic}} - Replace with actual API integration
   */
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // {{Dynamic}} - Real API calls:
        // const [statsResponse, notificationsResponse, contentResponse] = await Promise.all([
        //   fetch('/api/creator/stats?period=' + selectedTimeframe, {
        //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        //   }),
        //   fetch('/api/creator/notifications?limit=10', {
        //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        //   }),
        //   fetch('/api/creator/content/top-performing?limit=6', {
        //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        //   })
        // ])
        //
        // const stats = await statsResponse.json()
        // const notifications = await notificationsResponse.json()
        // const topContent = await contentResponse.json()
        //
        // setDashboardData(stats)

        // Mock delay for demo
        await new Promise((resolve) => setTimeout(resolve, 800));
        setDashboardData(dashboardStats);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedTimeframe]);

  /**
   * Animated counters for main statistics
   */
  const totalEarnings = useCurrencyCounter(dashboardData.totalEarnings.amount, {
    duration: 2000,
    delay: 200,
  });

  const approvalRate = usePercentageCounter(
    dashboardData.approvalRate.percentage,
    {
      duration: 1800,
      delay: 400,
    },
  );

  const avgEngagement = usePercentageCounter(
    dashboardData.avgEngagement.percentage,
    {
      duration: 1600,
      delay: 600,
    },
  );

  const activeCampaigns = useAnimatedCounter(
    dashboardData.activeCampaigns.count,
    {
      duration: 1400,
      delay: 800,
    },
  );

  /**
   * Filter notifications by type
   */
  const filteredNotifications = notifications.filter((notification) => {
    if (notificationFilter === "all") return true;
    return notification.type === notificationFilter;
  });

  /**
   * Get trend indicator component
   */
  const TrendIndicator = ({ change, size = "sm" }) => {
    const isPositive = change > 0;
    const isNegative = change < 0;

    return (
      <span
        className={`
        flex items-center gap-1 text-${size} font-medium
        ${isPositive ? "text-green-400" : isNegative ? "text-red-400" : "text-gray-400"}
      `}
      >
        {isPositive && <TrendingUp className="w-3 h-3" />}
        {isNegative && <TrendingUp className="w-3 h-3 rotate-180" />}
        {change > 0 ? "+" : ""}
        {change}%
      </span>
    );
  };

  /**
   * Influbazzar Score Breakdown Tooltip
   */
  const ScoreBreakdown = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      className="absolute top-full left-0 mt-2 w-80 bg-gray-800 border border-gray-600 rounded-xl p-4 shadow-xl z-50"
    >
      <h4 className="text-lg font-semibold text-white mb-3">Score Breakdown</h4>

      <div className="space-y-3">
        {Object.entries(dashboardData.influbazzarScore.breakdown).map(
          ([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="text-white font-medium w-8">{value}</span>
              </div>
            </div>
          ),
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-600">
        <p className="text-xs text-gray-400">
          Last updated:{" "}
          {new Date(
            dashboardData.influbazzarScore.lastUpdated,
          ).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );

  /**
   * Performance snapshot chart data
   * {{Dynamic}} - Data from engagement timeline API
   */
  const engagementChartData = [
    { date: "2024-01-01", instagram: 8.2, youtube: 7.5, tiktok: 9.1 },
    { date: "2024-01-08", instagram: 8.5, youtube: 7.8, tiktok: 9.3 },
    { date: "2024-01-15", instagram: 8.1, youtube: 8.2, tiktok: 8.9 },
    { date: "2024-01-22", instagram: 8.7, youtube: 8.0, tiktok: 9.5 },
    { date: "2024-01-29", instagram: 8.9, youtube: 8.3, tiktok: 9.2 },
  ];

  /**
   * Campaign status distribution for pie chart
   * {{Dynamic}} - Data from campaign analytics API
   */
  const campaignStatusData = [
    { label: "Approved", value: 60, color: "#10B981" },
    { label: "Submitted", value: 25, color: "#F59E0B" },
    { label: "Paid", value: 15, color: "#6366F1" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {creatorProfile.firstName}! 👋
          </h1>
          <p className="text-gray-400 text-lg">
            Here's your performance overview for today
          </p>
        </motion.div>

        {/* Influbazzar Score Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatedCard
            variant="gradient"
            className="relative overflow-hidden"
            animateOnScroll={true}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex items-center space-x-6">
                <DonutChart
                  percentage={dashboardData.influbazzarScore.current}
                  size={100}
                  strokeWidth={8}
                  color="#6366f1"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {dashboardData.influbazzarScore.current}
                    </div>
                    <div className="text-xs text-gray-400">Score</div>
                  </div>
                </DonutChart>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Your Influbazzar Score
                  </h3>
                  <div className="flex items-center gap-3">
                    <TrendIndicator
                      change={dashboardData.influbazzarScore.change}
                    />
                    <span className="text-gray-400">vs last month</span>
                  </div>

                  {/* Score breakdown button */}
                  <div className="relative mt-3">
                    <button
                      className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition-colors"
                      onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
                      onBlur={() =>
                        setTimeout(() => setShowScoreBreakdown(false), 200)
                      }
                    >
                      <Info className="w-4 h-4" />
                      <span className="text-sm">View breakdown</span>
                    </button>

                    {showScoreBreakdown && <ScoreBreakdown />}
                  </div>
                </div>
              </div>

              <div className="mt-6 lg:mt-0">
                <Link to="/creator/analytics">
                  <PrimaryButton
                    icon={<TrendingUp className="w-4 h-4" />}
                    iconRight={<ChevronRight className="w-4 h-4" />}
                  >
                    Boost My Score
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard
            title="Total Earnings"
            value={totalEarnings.formattedValue}
            change={`+${dashboardData.totalEarnings.change}%`}
            trend="up"
            icon={<DollarSign className="w-6 h-6" />}
            color="green"
            isLoading={isLoading}
          />

          <StatCard
            title="Active Campaigns"
            value={activeCampaigns.formattedValue}
            change={`+${dashboardData.activeCampaigns.change}`}
            trend="up"
            icon={<Briefcase className="w-6 h-6" />}
            color="blue"
            isLoading={isLoading}
          />

          <StatCard
            title="Approval Rate"
            value={approvalRate.formattedValue}
            change={`+${dashboardData.approvalRate.change}%`}
            trend="up"
            icon={<Target className="w-6 h-6" />}
            color="indigo"
            isLoading={isLoading}
          />

          <StatCard
            title="Avg Engagement"
            value={avgEngagement.formattedValue}
            change={`+${dashboardData.avgEngagement.change}%`}
            trend="up"
            icon={<Heart className="w-6 h-6" />}
            color="pink"
            isLoading={isLoading}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Snapshot */}
          <div className="lg:col-span-2 space-y-6">
            {/* Engagement Timeline Chart */}
            <AnimatedCard variant="glass" animateOnScroll={true}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  Engagement Timeline
                </h3>

                {/* Time filter buttons */}
                <div className="flex bg-gray-700/50 rounded-lg p-1">
                  {["7d", "30d", "90d"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedTimeframe(period)}
                      className={`
                        px-3 py-1 text-sm rounded-md transition-all duration-200
                        ${
                          selectedTimeframe === period
                            ? "bg-indigo-600 text-white"
                            : "text-gray-400 hover:text-white"
                        }
                      `}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <LineChart
                data={engagementChartData}
                width={600}
                height={250}
                colors={["#6366f1", "#8b5cf6", "#10b981"]}
                isLoading={isLoading}
              />
            </AnimatedCard>

            {/* Campaign Status Distribution */}
            <AnimatedCard variant="glass" animateOnScroll={true}>
              <h3 className="text-xl font-bold text-white mb-6">
                Campaign Status
              </h3>

              <PieChart
                data={campaignStatusData}
                width={250}
                height={200}
                showLegend={true}
                isLoading={isLoading}
              />
            </AnimatedCard>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <AnimatedCard variant="glass" animateOnScroll={true}>
              <h3 className="text-xl font-bold text-white mb-6">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <Link to="/creator/discover-campaigns">
                  <RippleButton
                    variant="outline"
                    fullWidth
                    icon={<Search className="w-4 h-4" />}
                    iconRight={<ChevronRight className="w-4 h-4" />}
                  >
                    Browse Campaigns
                  </RippleButton>
                </Link>

                <Link to="/creator/my-campaigns">
                  <RippleButton
                    variant="outline"
                    fullWidth
                    icon={<Upload className="w-4 h-4" />}
                    iconRight={<ChevronRight className="w-4 h-4" />}
                  >
                    Upload Content
                  </RippleButton>
                </Link>

                <Link to="/creator/profile">
                  <RippleButton
                    variant="outline"
                    fullWidth
                    icon={<User className="w-4 h-4" />}
                    iconRight={<ChevronRight className="w-4 h-4" />}
                  >
                    Update Profile
                  </RippleButton>
                </Link>
              </div>
            </AnimatedCard>

            {/* Recent Notifications */}
            <AnimatedCard variant="glass" animateOnScroll={true}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Notifications</h3>

                {/* Notification filter */}
                <select
                  value={notificationFilter}
                  onChange={(e) => setNotificationFilter(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm text-white"
                >
                  <option value="all">All</option>
                  <option value="campaign_approval">Approvals</option>
                  <option value="payout_released">Payments</option>
                  <option value="campaign_invite">Invites</option>
                </select>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {filteredNotifications.slice(0, 5).map((notification) => (
                  <motion.div
                    key={notification.id}
                    className={`
                      p-3 rounded-lg border cursor-pointer transition-all duration-200
                      ${
                        !notification.isRead
                          ? "bg-indigo-500/10 border-indigo-400/30"
                          : "bg-gray-700/30 border-gray-600/30"
                      }
                      hover:bg-gray-600/30
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`
                        w-2 h-2 rounded-full mt-2 flex-shrink-0
                        ${!notification.isRead ? "bg-indigo-400" : "bg-gray-500"}
                      `}
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>

                      <span className="text-lg">{notification.icon}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredNotifications.length > 5 && (
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <Link to="/creator/notifications">
                    <OutlineButton fullWidth size="sm">
                      View All Notifications
                    </OutlineButton>
                  </Link>
                </div>
              )}
            </AnimatedCard>
          </div>
        </div>

        {/* Top Performing Content */}
        <AnimatedCard variant="glass" animateOnScroll={true}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              Top Performing Content
            </h3>
            <Link to="/creator/analytics">
              <OutlineButton
                size="sm"
                iconRight={<ExternalLink className="w-4 h-4" />}
              >
                View All
              </OutlineButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPerformingContent.slice(0, 6).map((content) => (
              <motion.div
                key={content.id}
                className="group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative rounded-lg overflow-hidden mb-3">
                  <img
                    src={content.thumbnail}
                    alt={content.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play button overlay for videos */}
                  {content.type === "Video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-gray-800 ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Platform badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                      {content.platform}
                    </span>
                  </div>

                  {/* Engagement rate badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-green-500/80 text-white text-xs rounded-full">
                      {content.engagementRate}% ER
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2 group-hover:text-indigo-300 transition-colors">
                    {content.title}
                  </h4>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {content.metrics.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {content.metrics.likes.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-green-400 font-medium">
                      {content.engagementRate}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default CreatorDashboard;
