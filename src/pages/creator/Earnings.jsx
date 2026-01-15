/**
 * Creator Earnings Page - Comprehensive Earnings Dashboard
 *
 * Advanced earnings management interface featuring:
 * - Lifetime and monthly earnings overview
 * - Interactive charts for earnings trends
 * - Brand-wise payment breakdown
 * - Escrow payment tracking with release dates
 * - Payment method management
 * - Tax and GST information
 * - Earnings export functionality
 * - Payment dispute resolution
 *
 * Backend Integration:
 * {{Dynamic}} - Earnings data from GET /api/creator/earnings
 * {{Dynamic}} - Payment history from GET /api/creator/payments
 * {{Dynamic}} - Escrow details from GET /api/creator/escrow
 * {{Dynamic}} - Payment methods from GET /api/creator/payment-methods
 * {{Dynamic}} - Tax documents from GET /api/creator/tax-documents
 *
 * Features:
 * - Real-time payment tracking
 * - Automated tax calculations
 * - Payment timeline visualization
 * - Escrow release requests
 * - Earnings forecasting
 * - Multiple currency support
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  Download,
  Upload,
  CreditCard,
  Bank,
  Smartphone,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Search,
  MoreHorizontal,
  FileText,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  Shield,
  HelpCircle,
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
} from "../../components/shared/ChartComponents";
import {
  useCurrencyCounter,
  useAnimatedCounter,
} from "../../hooks/useAnimatedCounter";

// Mock Data - {{Dynamic}} Replace with API calls
import { earningsData } from "../../utils/mockData";

/**
 * Creator Earnings Component
 *
 * Comprehensive earnings tracking and management dashboard
 */
const CreatorEarnings = () => {
  // Data State
  const [earnings, setEarnings] = useState(earningsData);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  /**
   * Animated counters for key metrics
   */
  const lifetimeEarnings = useCurrencyCounter(
    earnings.overview.lifetimeEarnings,
    {
      duration: 2000,
      delay: 200,
    },
  );

  const monthlyEarnings = useCurrencyCounter(
    earnings.overview.monthlyEarnings,
    {
      duration: 1800,
      delay: 400,
    },
  );

  const pendingPayouts = useCurrencyCounter(earnings.overview.pendingPayouts, {
    duration: 1600,
    delay: 600,
  });

  const avgEarningPerPost = useCurrencyCounter(
    earnings.overview.avgEarningPerPost,
    {
      duration: 1400,
      delay: 800,
    },
  );

  /**
   * Fetch earnings data based on selected period
   * {{Dynamic}} - Replace with actual API integration
   */
  const fetchEarningsData = async (period) => {
    setIsLoading(true);
    try {
      // {{Dynamic}} - Real API call:
      // const response = await fetch(`/api/creator/earnings?period=${period}`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // })
      // const data = await response.json()
      // setEarnings(data)

      // Mock delay for demo
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Using existing mock data
    } catch (error) {
      console.error("Failed to fetch earnings data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load earnings data when period changes
   */
  useEffect(() => {
    fetchEarningsData(selectedPeriod);
  }, [selectedPeriod]);

  /**
   * Get status styling for payments
   */
  const getPaymentStatusInfo = (status) => {
    switch (status) {
      case "completed":
        return {
          color: "green",
          bg: "bg-green-500/20",
          text: "text-green-300",
          icon: CheckCircle,
          label: "Completed",
        };
      case "held":
        return {
          color: "yellow",
          bg: "bg-yellow-500/20",
          text: "text-yellow-300",
          icon: Clock,
          label: "In Escrow",
        };
      case "pending":
        return {
          color: "blue",
          bg: "bg-blue-500/20",
          text: "text-blue-300",
          icon: AlertCircle,
          label: "Pending",
        };
      case "failed":
        return {
          color: "red",
          bg: "bg-red-500/20",
          text: "text-red-300",
          icon: XCircle,
          label: "Failed",
        };
      default:
        return {
          color: "gray",
          bg: "bg-gray-500/20",
          text: "text-gray-300",
          icon: Clock,
          label: "Unknown",
        };
    }
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /**
   * Calculate days until escrow release
   */
  const getDaysUntilRelease = (releaseDate) => {
    const today = new Date();
    const release = new Date(releaseDate);
    const diffTime = release - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  /**
   * Tab configuration
   */
  const earningsTabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "payments", label: "Payment History", icon: Receipt },
    { id: "escrow", label: "Escrow Tracking", icon: Shield },
    { id: "methods", label: "Payment Methods", icon: CreditCard },
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
                Earnings Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                Track your earnings, payments, and financial performance
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {/* Period Selector */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 3 Months</option>
                <option value="1y">Last Year</option>
                <option value="all">All Time</option>
              </select>

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
            title="Lifetime Earnings"
            value={lifetimeEarnings.formattedValue}
            change="+12.5%"
            trend="up"
            icon={<DollarSign className="w-6 h-6" />}
            color="green"
            isLoading={isLoading}
          />

          <StatCard
            title="This Month"
            value={monthlyEarnings.formattedValue}
            change="+8.2%"
            trend="up"
            icon={<TrendingUp className="w-6 h-6" />}
            color="blue"
            isLoading={isLoading}
          />

          <StatCard
            title="Pending Payouts"
            value={pendingPayouts.formattedValue}
            change="2 payments"
            icon={<Clock className="w-6 h-6" />}
            color="yellow"
            isLoading={isLoading}
          />

          <StatCard
            title="Avg Per Post"
            value={avgEarningPerPost.formattedValue}
            change="+15.3%"
            trend="up"
            icon={<Wallet className="w-6 h-6" />}
            color="purple"
            isLoading={isLoading}
          />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <AnimatedCard variant="glass" className="p-6">
            <div className="flex flex-wrap gap-2">
              {earningsTabs.map((tab) => {
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
              {/* Earnings Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Earnings Trend */}
                <AnimatedCard variant="glass">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Earnings Trend
                    </h3>
                    <LineChart
                      data={earnings.monthlyBreakdown.map((item) => ({
                        date: item.month,
                        earnings: item.earnings / 1000, // Convert to thousands for better visualization
                      }))}
                      width={500}
                      height={250}
                      colors={["#10b981"]}
                      isLoading={isLoading}
                    />
                  </div>
                </AnimatedCard>

                {/* Brand Breakdown */}
                <AnimatedCard variant="glass">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Earnings by Brand
                    </h3>
                    <PieChartComponent
                      data={earnings.brandBreakdown.map((brand) => ({
                        label: brand.brand,
                        value: Math.round(
                          (brand.amount / earnings.overview.lifetimeEarnings) *
                            100,
                        ),
                        color: brand.color,
                      }))}
                      width={250}
                      height={200}
                      showLegend={true}
                      isLoading={isLoading}
                    />
                  </div>
                </AnimatedCard>
              </div>

              {/* Payment Methods Breakdown */}
              <AnimatedCard variant="glass">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Payment Method Distribution
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {earnings.paymentMethods.map((method, index) => (
                      <div
                        key={index}
                        className="bg-gray-700/30 rounded-lg p-4 text-center"
                      >
                        <div className="text-2xl font-bold text-white mb-2">
                          ₹{method.amount.toLocaleString()}
                        </div>
                        <div className="text-gray-400 mb-2">{method.type}</div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-indigo-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${method.percentage}%` }}
                          />
                        </div>
                        <div className="text-sm text-gray-400 mt-2">
                          {method.percentage}% of total
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          )}

          {activeTab === "escrow" && (
            <motion.div
              key="escrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Escrow Overview */}
              <AnimatedCard variant="glass">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Escrow Payments
                  </h3>

                  {earnings.escrowDetails.length > 0 ? (
                    <div className="space-y-4">
                      {earnings.escrowDetails.map((escrow) => {
                        const daysLeft = getDaysUntilRelease(
                          escrow.releaseDate,
                        );
                        const status = getPaymentStatusInfo(escrow.status);
                        const StatusIcon = status.icon;

                        return (
                          <div
                            key={escrow.id}
                            className="bg-gray-700/30 rounded-lg p-4 flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`p-3 rounded-lg ${status.bg}`}>
                                <StatusIcon
                                  className={`w-5 h-5 ${status.text}`}
                                />
                              </div>

                              <div>
                                <h4 className="font-semibold text-white">
                                  {escrow.campaign}
                                </h4>
                                <p className="text-gray-400 text-sm">
                                  {escrow.brand}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Release: {formatDate(escrow.releaseDate)}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-xl font-bold text-white">
                                ₹{escrow.amount.toLocaleString()}
                              </div>
                              <div
                                className={`
                                text-sm font-medium
                                ${
                                  daysLeft <= 3
                                    ? "text-red-400"
                                    : daysLeft <= 7
                                      ? "text-yellow-400"
                                      : "text-green-400"
                                }
                              `}
                              >
                                {daysLeft > 0
                                  ? `${daysLeft} days left`
                                  : "Released"}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Shield className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-white mb-2">
                        No Escrow Payments
                      </h4>
                      <p className="text-gray-400">
                        All your payments have been released or you don't have
                        any pending escrow.
                      </p>
                    </div>
                  )}
                </div>
              </AnimatedCard>

              {/* Escrow Release Request */}
              {earnings.escrowDetails.length > 0 && (
                <AnimatedCard variant="glass">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Request Early Release
                    </h3>
                    <p className="text-gray-400 mb-6">
                      If you've completed all deliverables, you can request
                      early release of escrow payments.
                    </p>

                    <PrimaryButton icon={<Upload className="w-4 h-4" />}>
                      Submit Release Request
                    </PrimaryButton>
                  </div>
                </AnimatedCard>
              )}
            </motion.div>
          )}

          {activeTab === "methods" && (
            <motion.div
              key="methods"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Payment Methods */}
              <AnimatedCard variant="glass">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">
                      Payment Methods
                    </h3>
                    <PrimaryButton size="sm">Add Method</PrimaryButton>
                  </div>

                  <div className="space-y-4">
                    {/* UPI Payment */}
                    <div className="bg-gray-700/30 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                          <Smartphone className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            UPI Payment
                          </h4>
                          <p className="text-gray-400 text-sm">ajay@paytm</p>
                          <span className="inline-block px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full mt-1">
                            Primary
                          </span>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Bank Account */}
                    <div className="bg-gray-700/30 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                          <Bank className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            Bank Account
                          </h4>
                          <p className="text-gray-400 text-sm">
                            HDFC Bank - ****1234
                          </p>
                          <p className="text-gray-500 text-xs">
                            IFSC: HDFC0001234
                          </p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Tax Information */}
              <AnimatedCard variant="glass">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Tax Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        GST Number
                      </label>
                      <input
                        type="text"
                        value="27AAAAA0000A1Z5"
                        readOnly
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        value="AAAAA0000A"
                        readOnly
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <OutlineButton icon={<FileText className="w-4 h-4" />}>
                      Download Tax Documents
                    </OutlineButton>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          )}

          {activeTab === "payments" && (
            <motion.div
              key="payments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Payment History */}
              <AnimatedCard variant="glass">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">
                      Payment History
                    </h3>

                    {/* Search and Filter */}
                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search payments..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </div>

                  {/* Payment List */}
                  <div className="space-y-3">
                    {/* Mock payment history - {{Dynamic}} Replace with real data */}
                    {[
                      {
                        id: "pay_001",
                        campaign: "#GlowFix Campaign",
                        brand: "Mamaearth",
                        amount: 1500,
                        status: "completed",
                        date: "2024-01-15T10:30:00Z",
                        method: "UPI",
                      },
                      {
                        id: "pay_002",
                        campaign: "#TechReview Campaign",
                        brand: "Samsung",
                        amount: 2500,
                        status: "held",
                        date: "2024-01-10T14:20:00Z",
                        method: "Bank Transfer",
                      },
                      {
                        id: "pay_003",
                        campaign: "#FashionWeek Campaign",
                        brand: "Myntra",
                        amount: 3000,
                        status: "completed",
                        date: "2024-01-05T16:45:00Z",
                        method: "UPI",
                      },
                    ].map((payment) => {
                      const status = getPaymentStatusInfo(payment.status);
                      const StatusIcon = status.icon;

                      return (
                        <div
                          key={payment.id}
                          className="bg-gray-700/30 rounded-lg p-4 flex items-center justify-between hover:bg-gray-600/30 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-lg ${status.bg}`}>
                              <StatusIcon
                                className={`w-4 h-4 ${status.text}`}
                              />
                            </div>

                            <div>
                              <h4 className="font-semibold text-white">
                                {payment.campaign}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {payment.brand}
                              </p>
                              <div className="flex items-center space-x-3 mt-1">
                                <span className="text-xs text-gray-500">
                                  {formatDate(payment.date)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  via {payment.method}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-white">
                              ₹{payment.amount.toLocaleString()}
                            </div>
                            <span
                              className={`
                              inline-block px-2 py-1 rounded-full text-xs font-medium
                              ${status.bg} ${status.text}
                            `}
                            >
                              {status.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
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

export default CreatorEarnings;
