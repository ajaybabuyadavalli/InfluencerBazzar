/**
 * Creator Analytics Page - Performance Insights & Data Visualization
 *
 * Advanced analytics dashboard featuring:
 * - Engagement timeline with platform comparison
 * - Audience demographics and behavior analysis
 * - Content performance heatmaps
 * - Growth metrics and trend analysis
 * - Platform-specific insights
 * - Influbazzar Score breakdown and improvement tips
 * - Competitor benchmarking
 * - Export and reporting capabilities
 *
 * Backend Integration:
 * {{Dynamic}} - Analytics data from GET /api/creator/analytics
 * {{Dynamic}} - Engagement metrics from GET /api/creator/engagement
 * {{Dynamic}} - Audience data from GET /api/creator/audience
 * {{Dynamic}} - Content performance from GET /api/creator/content/analytics
 * {{Dynamic}} - Growth metrics from GET /api/creator/growth
 *
 * Features:
 * - Real-time data updates
 * - Interactive charts and visualizations
 * - Advanced filtering and date ranges
 * - Performance benchmarking
 * - Actionable insights and recommendations
 * - Custom report generation
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Eye,
  Heart,
  MessageSquare,
  Share,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Target,
  Award,
  MapPin,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Lightbulb,
  Star,
  Globe,
} from "lucide-react";

// Shared Components
import AnimatedCard, { StatCard } from "../../components/shared/AnimatedCard";
import RippleButton, {
  PrimaryButton,
  OutlineButton,
  GhostButton,
} from "../../components/shared/RippleButton";
import {
  LineChart,
  PieChart as PieChartComponent,
  BarChart,
  DonutChart,
} from "../../components/shared/ChartComponents";
import {
  useAnimatedCounter,
  usePercentageCounter,
} from "../../hooks/useAnimatedCounter";

// Mock Data - {{Dynamic}} Replace with API calls
import { analyticsData, dashboardStats } from "../../utils/mockData";

/**
 * Creator Analytics Component
 *
 * Comprehensive analytics dashboard for performance insights
 */
const CreatorAnalytics = () => {
  // Data State
  const [analytics, setAnalytics] = useState(analyticsData);
  const [selectedMetric, setSelectedMetric] = useState("engagement");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [showInsights, setShowInsights] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Animated counters for key metrics
   */
  const totalFollowers = useAnimatedCounter(82000, {
    duration: 2000,
    format: "compact",
  });

  const avgEngagement = usePercentageCounter(8.5, {
    duration: 1800,
    preserveDecimals: true,
  });

  const monthlyGrowth = usePercentageCounter(3.2, {
    duration: 1600,
    preserveDecimals: true,
  });

  const influbazzarScore = useAnimatedCounter(
    dashboardStats.influbazzarScore.current,
    {
      duration: 2200,
    },
  );

  /**
   * Fetch analytics data
   * {{Dynamic}} - Replace with actual API integration
   */
  const fetchAnalyticsData = async (platform, period, metric) => {
    setIsLoading(true);
    try {
      // {{Dynamic}} - Real API call:
      // const queryParams = new URLSearchParams({
      //   platform,
      //   period,
      //   metric
      // })
      //
      // const response = await fetch(`/api/creator/analytics?${queryParams}`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // })
      // const data = await response.json()
      // setAnalytics(data)

      // Mock delay for demo
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Using existing mock data
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refresh analytics data
   */
  const refreshData = async () => {
    setIsRefreshing(true);
    await fetchAnalyticsData(selectedPlatform, selectedPeriod, selectedMetric);
    setIsRefreshing(false);
  };

  /**
   * Load analytics data when filters change
   */
  useEffect(() => {
    fetchAnalyticsData(selectedPlatform, selectedPeriod, selectedMetric);
  }, [selectedPlatform, selectedPeriod, selectedMetric]);

  /**
   * Tab configuration
   */
  const analyticsTabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "engagement", label: "Engagement", icon: Heart },
    { id: "audience", label: "Audience", icon: Users },
    { id: "content", label: "Content Performance", icon: TrendingUp },
    { id: "insights", label: "Insights", icon: Lightbulb },
  ];

  /**
   * Get trend indicator
   */
  const TrendIndicator = ({ value, isPositive = true, size = "sm" }) => (
    <span
      className={`
      flex items-center gap-1 text-${size} font-medium
      ${isPositive ? "text-green-400" : "text-red-400"}
    `}
    >
      {isPositive ? (
        <ArrowUpRight className="w-3 h-3" />
      ) : (
        <ArrowDownRight className="w-3 h-3" />
      )}
      {value > 0 ? "+" : ""}
      {value}%
    </span>
  );

  /**
   * Generate insights based on data
   * {{Dynamic}} - AI-generated insights from backend
   */
  const generateInsights = () => [
    {
      type: "opportunity",
      title: "Peak Engagement Time",
      description:
        "Your audience is most active between 6-8 PM. Schedule content during this window for maximum reach.",
      icon: Clock,
      color: "blue",
    },
    {
      type: "achievement",
      title: "Engagement Rate Growth",
      description:
        "Your engagement rate increased by 12% this month. Keep up the great content!",
      icon: TrendingUp,
      color: "green",
    },
    {
      type: "suggestion",
      title: "Platform Diversification",
      description:
        "Consider expanding to YouTube Shorts. Your Instagram Reels perform well and could translate effectively.",
      icon: Target,
      color: "purple",
    },
    {
      type: "warning",
      title: "Follower Growth Slowdown",
      description:
        "Follower growth has slowed by 5%. Try experimenting with trending hashtags and collaborations.",
      icon: TrendingDown,
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                Deep insights into your content performance and audience
                engagement
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {/* Filters */}
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
              </select>

              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 3 Months</option>
                <option value="1y">Last Year</option>
              </select>

              <GhostButton
                onClick={refreshData}
                icon={
                  <RefreshCw
                    className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                }
                disabled={isRefreshing}
              >
                Refresh
              </GhostButton>

              <OutlineButton icon={<Download className="w-4 h-4" />}>
                Export
              </OutlineButton>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            title="Total Followers"
            value={totalFollowers.formattedValue}
            change="+3.2%"
            trend="up"
            icon={<Users className="w-6 h-6" />}
            color="blue"
            isLoading={isLoading}
          />

          <StatCard
            title="Avg Engagement Rate"
            value={avgEngagement.formattedValue}
            change="+0.8%"
            trend="up"
            icon={<Heart className="w-6 h-6" />}
            color="red"
            isLoading={isLoading}
          />

          <StatCard
            title="Monthly Growth"
            value={monthlyGrowth.formattedValue}
            change="+1.2%"
            trend="up"
            icon={<TrendingUp className="w-6 h-6" />}
            color="green"
            isLoading={isLoading}
          />

          <StatCard
            title="Influbazzar Score"
            value={Math.round(influbazzarScore.value)}
            change="+5"
            trend="up"
            icon={<Star className="w-6 h-6" />}
            color="yellow"
            isLoading={isLoading}
          />
        </motion.div>

        {/* Insights Banner */}
        {showInsights && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <AnimatedCard
              variant="gradient"
              className="relative overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      AI Insights
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowInsights(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generateInsights()
                    .slice(0, 2)
                    .map((insight, index) => {
                      const InsightIcon = insight.icon;
                      return (
                        <div key={index} className="flex items-start space-x-3">
                          <div
                            className={`p-2 bg-${insight.color}-500/20 rounded-lg flex-shrink-0`}
                          >
                            <InsightIcon
                              className={`w-4 h-4 text-${insight.color}-400`}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-sm">
                              {insight.title}
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {insight.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <AnimatedCard variant="glass" className="p-6">
            <div className="flex flex-wrap gap-2">
              {analyticsTabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                      ${
                        activeTab === tab.id
                          ? "bg-indigo-600 text-white"
                          : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      }
                    `}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Main Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Engagement Timeline */}
                <AnimatedCard variant="glass">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Engagement Timeline
                    </h3>
                    <LineChart
                      data={analytics.engagementTimeline}
                      width={500}
                      height={250}
                      colors={["#6366f1", "#8b5cf6", "#10b981"]}
                      isLoading={isLoading}
                    />
                  </div>
                </AnimatedCard>

                {/* Platform Performance */}
                <AnimatedCard variant="glass">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Platform Performance
                    </h3>

                    <div className="space-y-4">
                      {Object.entries(analytics.platformComparison).map(
                        ([platform, data]) => (
                          <div
                            key={platform}
                            className="bg-gray-700/30 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-white capitalize">
                                {platform}
                              </h4>
                              <TrendIndicator
                                value={parseFloat(data.growth.replace("%", ""))}
                              />
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-400">Followers</p>
                                <p className="font-semibold text-white">
                                  {data.followers.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">Engagement</p>
                                <p className="font-semibold text-white">
                                  {data.avgEngagement}%
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">Top Content</p>
                                <p className="font-semibold text-white text-xs truncate">
                                  {data.topContent}
                                </p>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              </div>

              {/* Influbazzar Score Breakdown */}
              <AnimatedCard variant="glass">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Influbazzar Score Breakdown
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {Object.entries(
                      dashboardStats.influbazzarScore.breakdown,
                    ).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <DonutChart
                          percentage={value}
                          size={80}
                          strokeWidth={6}
                          color="#6366f1"
                        >
                          <div className="text-center">
                            <div className="text-sm font-bold text-white">
                              {value}
                            </div>
                          </div>
                        </DonutChart>

                        <h4 className="font-medium text-white mt-3 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {value >= 90
                            ? "Excellent"
                            : value >= 80
                              ? "Good"
                              : value >= 70
                                ? "Average"
                                : "Needs Improvement"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          )}

          {activeTab === "audience" && (
            <motion.div
              key="audience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Audience Demographics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Age Distribution */}
                <AnimatedCard variant="glass">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Age Distribution
                    </h3>
                    <PieChartComponent
                      data={analytics.audienceBreakdown.age.map((item) => ({
                        label: item.range,
                        value: item.percentage,
                        color: ["#6366f1", "#8b5cf6", "#10b981", "#f59e0b"][
                          analytics.audienceBreakdown.age.indexOf(item)
                        ],
                      }))}
                      width={200}
                      height={160}
                      showLegend={true}
                      isLoading={isLoading}
                    />
                  </div>
                </AnimatedCard>

                {/* Gender Distribution */}
                <AnimatedCard variant="glass">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Gender Distribution
                    </h3>
                    <PieChartComponent
                      data={analytics.audienceBreakdown.gender.map((item) => ({
                        label: item.type,
                        value: item.percentage,
                        color: ["#ec4899", "#3b82f6", "#10b981"][
                          analytics.audienceBreakdown.gender.indexOf(item)
                        ],
                      }))}
                      width={200}
                      height={160}
                      showLegend={true}
                      isLoading={isLoading}
                    />
                  </div>
                </AnimatedCard>

                {/* Geographic Distribution */}
                <AnimatedCard variant="glass">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Top Cities
                    </h3>

                    <div className="space-y-3">
                      {analytics.audienceBreakdown.geography.map(
                        (city, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-white">{city.city}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                                  style={{ width: `${city.percentage}%` }}
                                />
                              </div>
                              <span className="text-gray-400 text-sm w-8">
                                {city.percentage}%
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </motion.div>
          )}

          {activeTab === "insights" && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generateInsights().map((insight, index) => {
                  const InsightIcon = insight.icon;
                  return (
                    <AnimatedCard key={index} variant="glass">
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`p-3 bg-${insight.color}-500/20 rounded-lg flex-shrink-0`}
                          >
                            <InsightIcon
                              className={`w-5 h-5 text-${insight.color}-400`}
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-white">
                                {insight.title}
                              </h3>
                              <span
                                className={`
                                px-2 py-1 rounded-full text-xs font-medium capitalize
                                bg-${insight.color}-500/20 text-${insight.color}-300
                              `}
                              >
                                {insight.type}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">
                              {insight.description}
                            </p>

                            {insight.type === "opportunity" && (
                              <div className="mt-4">
                                <PrimaryButton size="sm">
                                  Take Action
                                </PrimaryButton>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </AnimatedCard>
                  );
                })}
              </div>

              {/* Performance Tips */}
              <AnimatedCard variant="glass">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Performance Tips
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        title: "Post Timing",
                        tip: "Post between 6-8 PM for maximum engagement",
                        impact: "High",
                      },
                      {
                        title: "Content Mix",
                        tip: "Balance educational and entertaining content 70:30",
                        impact: "Medium",
                      },
                      {
                        title: "Hashtag Strategy",
                        tip: "Use 8-12 relevant hashtags per post",
                        impact: "Medium",
                      },
                      {
                        title: "Engagement Rate",
                        tip: "Respond to comments within 2 hours",
                        impact: "High",
                      },
                      {
                        title: "Cross-Platform",
                        tip: "Share content across all platforms",
                        impact: "Low",
                      },
                      {
                        title: "Consistency",
                        tip: "Post at least 3 times per week",
                        impact: "High",
                      },
                    ].map((tip, index) => (
                      <div
                        key={index}
                        className="bg-gray-700/30 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white text-sm">
                            {tip.title}
                          </h4>
                          <span
                            className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${
                              tip.impact === "High"
                                ? "bg-red-500/20 text-red-300"
                                : tip.impact === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-blue-500/20 text-blue-300"
                            }
                          `}
                          >
                            {tip.impact}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{tip.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CreatorAnalytics;
