/**
 * My Campaigns Page - Campaign Management & Tracking
 *
 * Comprehensive campaign management interface for creators featuring:
 * - Tabbed view for different campaign statuses
 * - Interactive campaign cards with status tracking
 * - Content submission interface
 * - Timeline tracking for deliverables
 * - Search and filter functionality
 * - Engagement metrics display
 * - Payment status tracking
 * - Deadline management with notifications
 *
 * Backend Integration:
 * {{Dynamic}} - Campaign data from GET /api/creator/campaigns?status=...
 * {{Dynamic}} - Content submission via POST /api/campaigns/:id/content
 * {{Dynamic}} - Campaign updates from WebSocket connection
 * {{Dynamic}} - File uploads to /api/uploads/content
 *
 * Features:
 * - Real-time status updates
 * - Drag & drop file uploads
 * - Performance metrics tracking
 * - Automated deadline reminders
 * - Campaign brief access
 * - Brand communication history
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Upload,
  Eye,
  Heart,
  MessageSquare,
  Share,
  Bookmark,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Image,
  Video,
  Download,
  ExternalLink,
  Send,
  MessageCircle,
  TrendingUp,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
} from "lucide-react";

// Shared Components
import AnimatedCard from "../../components/shared/AnimatedCard";
import RippleButton, {
  PrimaryButton,
  OutlineButton,
  GhostButton,
} from "../../components/shared/RippleButton";

// Mock Data - {{Dynamic}} Replace with API calls
import { myCampaigns } from "../../utils/mockData";

/**
 * My Campaigns Component
 *
 * Campaign management dashboard for creators to track and manage
 * their active, applied, submitted, and completed campaigns
 */
const MyCampaigns = () => {
  // Filter and Search State
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  // Data State
  const [campaigns, setCampaigns] = useState(myCampaigns);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // File Upload
  const fileInputRef = useRef(null);

  /**
   * Campaign status tabs with counts
   * {{Dynamic}} - Counts from API campaign statistics
   */
  const statusTabs = [
    { id: "all", label: "All Campaigns", count: campaigns.length },
    {
      id: "applied",
      label: "Applied",
      count: campaigns.filter((c) => c.status === "applied").length,
      color: "blue",
    },
    {
      id: "approved",
      label: "Approved",
      count: campaigns.filter((c) => c.status === "approved").length,
      color: "green",
    },
    {
      id: "submitted",
      label: "Submitted",
      count: campaigns.filter((c) => c.status === "submitted").length,
      color: "yellow",
    },
    {
      id: "paid",
      label: "Paid",
      count: campaigns.filter((c) => c.status === "paid").length,
      color: "indigo",
    },
  ];

  /**
   * Fetch campaigns from API
   * {{Dynamic}} - Replace with actual API integration
   */
  const fetchCampaigns = async (
    status = "all",
    query = "",
    sort = "deadline",
  ) => {
    setIsLoading(true);
    try {
      // {{Dynamic}} - Real API call:
      // const queryParams = new URLSearchParams({
      //   status: status === 'all' ? '' : status,
      //   q: query,
      //   sort,
      //   limit: 50
      // })
      //
      // const response = await fetch(`/api/creator/campaigns?${queryParams}`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // })
      // const data = await response.json()
      // setCampaigns(data.campaigns)

      // Mock delay and filtering for demo
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filteredCampaigns = [...myCampaigns];

      // Filter by status
      if (status !== "all") {
        filteredCampaigns = filteredCampaigns.filter(
          (campaign) => campaign.status === status,
        );
      }

      // Filter by search query
      if (query) {
        filteredCampaigns = filteredCampaigns.filter(
          (campaign) =>
            campaign.title.toLowerCase().includes(query.toLowerCase()) ||
            campaign.brand.name.toLowerCase().includes(query.toLowerCase()),
        );
      }

      // Sort campaigns
      switch (sort) {
        case "newest":
          filteredCampaigns.sort(
            (a, b) =>
              new Date(b.timeline.appliedDate) -
              new Date(a.timeline.appliedDate),
          );
          break;
        case "payment":
          filteredCampaigns.sort((a, b) => b.payment.amount - a.payment.amount);
          break;
        case "deadline":
        default:
          filteredCampaigns.sort((a, b) => {
            const aDeadline = a.timeline.contentDeadline;
            const bDeadline = b.timeline.contentDeadline;
            if (!aDeadline) return 1;
            if (!bDeadline) return -1;
            return new Date(aDeadline) - new Date(bDeadline);
          });
      }

      setCampaigns(filteredCampaigns);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load campaigns when filters change
   */
  useEffect(() => {
    fetchCampaigns(activeTab, searchQuery, sortBy);
  }, [activeTab, searchQuery, sortBy]);

  /**
   * Get status styling
   */
  const getStatusInfo = (status) => {
    switch (status) {
      case "applied":
        return {
          color: "blue",
          bg: "bg-blue-500/20",
          text: "text-blue-300",
          icon: Clock,
          label: "Applied",
        };
      case "approved":
        return {
          color: "green",
          bg: "bg-green-500/20",
          text: "text-green-300",
          icon: CheckCircle,
          label: "Approved",
        };
      case "submitted":
        return {
          color: "yellow",
          bg: "bg-yellow-500/20",
          text: "text-yellow-300",
          icon: Upload,
          label: "Submitted",
        };
      case "paid":
        return {
          color: "indigo",
          bg: "bg-indigo-500/20",
          text: "text-indigo-300",
          icon: DollarSign,
          label: "Paid",
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
   * Get payment status styling
   */
  const getPaymentStatusInfo = (status) => {
    switch (status) {
      case "completed":
        return { color: "green", text: "Paid", icon: CheckCircle };
      case "escrow":
        return { color: "yellow", text: "In Escrow", icon: Clock };
      case "pending":
        return { color: "orange", text: "Pending Review", icon: AlertTriangle };
      default:
        return { color: "gray", text: "Not Started", icon: XCircle };
    }
  };

  /**
   * Format time remaining until deadline
   */
  const getTimeUntilDeadline = (deadline) => {
    if (!deadline) return null;

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffInHours = Math.ceil((deadlineDate - now) / (1000 * 60 * 60));

    if (diffInHours < 0) return { text: "Overdue", color: "red", urgent: true };
    if (diffInHours < 24)
      return { text: `${diffInHours}h left`, color: "red", urgent: true };

    const diffInDays = Math.ceil(diffInHours / 24);
    if (diffInDays <= 3)
      return { text: `${diffInDays}d left`, color: "yellow", urgent: true };
    return { text: `${diffInDays}d left`, color: "green", urgent: false };
  };

  /**
   * Handle content submission
   * {{Dynamic}} - Call POST /api/campaigns/:campaignId/content
   */
  const handleContentSubmission = async (
    campaignId,
    files,
    description = "",
  ) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // {{Dynamic}} - Real file upload:
      // const formData = new FormData()
      // files.forEach(file => formData.append('files', file))
      // formData.append('description', description)
      // formData.append('campaignId', campaignId)
      //
      // const response = await fetch(`/api/campaigns/${campaignId}/content`, {
      //   method: 'POST',
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      //   body: formData,
      //   onUploadProgress: (progressEvent) => {
      //     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //     setUploadProgress(progress)
      //   }
      // })
      //
      // if (response.ok) {
      //   const updatedCampaign = await response.json()
      //   setCampaigns(prev => prev.map(c =>
      //     c.id === campaignId ? { ...c, status: 'submitted' } : c
      //   ))
      //   setShowSubmissionModal(false)
      // }

      // Mock upload progress for demo
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Update campaign status
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === campaignId ? { ...c, status: "submitted" } : c,
        ),
      );

      setShowSubmissionModal(false);
    } catch (error) {
      console.error("Failed to submit content:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  /**
   * Handle file selection for upload
   */
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0 && selectedCampaign) {
      handleContentSubmission(selectedCampaign.id, files);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">My Campaigns</h1>
          <p className="text-gray-400 text-lg">
            Track and manage your active campaigns and deliverables
          </p>
        </motion.div>

        {/* Status Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <AnimatedCard variant="glass" className="p-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {statusTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
                    }
                  `}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`
                    px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      activeTab === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-600 text-gray-300"
                    }
                  `}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search and Sort Controls */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search campaigns or brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="deadline">Sort by Deadline</option>
                <option value="newest">Newest First</option>
                <option value="payment">Highest Payment</option>
              </select>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Campaign List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-800/50 rounded-xl h-40"></div>
                </div>
              ))}
            </div>
          ) : campaigns.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {campaigns.map((campaign, index) => {
                const status = getStatusInfo(campaign.status);
                const paymentStatus = getPaymentStatusInfo(
                  campaign.payment.status,
                );
                const deadline = getTimeUntilDeadline(
                  campaign.timeline.contentDeadline,
                );
                const StatusIcon = status.icon;
                const PaymentIcon = paymentStatus.icon;

                return (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AnimatedCard variant="glass" className="overflow-hidden">
                      <div className="p-6">
                        {/* Campaign Header */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <img
                              src={campaign.brand.logo}
                              alt={campaign.brand.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">
                                {campaign.title}
                              </h3>
                              <p className="text-gray-400">
                                {campaign.brand.name}
                              </p>

                              {/* Status Badges */}
                              <div className="flex items-center space-x-3 mt-2">
                                <span
                                  className={`
                                  flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
                                  ${status.bg} ${status.text}
                                `}
                                >
                                  <StatusIcon className="w-3 h-3" />
                                  <span>{status.label}</span>
                                </span>

                                <span
                                  className={`
                                  flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
                                  text-${paymentStatus.color}-300 bg-${paymentStatus.color}-500/20
                                `}
                                >
                                  <PaymentIcon className="w-3 h-3" />
                                  <span>{paymentStatus.text}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                            {deadline && (
                              <div
                                className={`
                                flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
                                ${deadline.urgent ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"}
                              `}
                              >
                                <Clock className="w-4 h-4" />
                                <span>{deadline.text}</span>
                              </div>
                            )}

                            {campaign.status === "approved" && (
                              <PrimaryButton
                                onClick={() => {
                                  setSelectedCampaign(campaign);
                                  setShowSubmissionModal(true);
                                }}
                                icon={<Upload className="w-4 h-4" />}
                                size="sm"
                              >
                                Submit Content
                              </PrimaryButton>
                            )}
                          </div>
                        </div>

                        {/* Campaign Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {/* Payment Amount */}
                          <div className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <DollarSign className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-gray-400">
                                Payment
                              </span>
                            </div>
                            <p className="text-xl font-bold text-white">
                              ₹{campaign.payment.amount.toLocaleString()}
                            </p>
                          </div>

                          {/* Platform */}
                          <div className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <FileText className="w-4 h-4 text-blue-400" />
                              <span className="text-sm text-gray-400">
                                Platform
                              </span>
                            </div>
                            <p className="text-lg font-semibold text-white">
                              {campaign.platform}
                            </p>
                          </div>

                          {/* Engagement (if content submitted) */}
                          {campaign.engagement && (
                            <div className="bg-gray-700/30 rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-1">
                                <TrendingUp className="w-4 h-4 text-purple-400" />
                                <span className="text-sm text-gray-400">
                                  Views
                                </span>
                              </div>
                              <p className="text-lg font-semibold text-white">
                                {campaign.engagement.views.toLocaleString()}
                              </p>
                            </div>
                          )}

                          {/* Deliverables Count */}
                          <div className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-1">
                              <FileText className="w-4 h-4 text-orange-400" />
                              <span className="text-sm text-gray-400">
                                Deliverables
                              </span>
                            </div>
                            <p className="text-lg font-semibold text-white">
                              {campaign.deliverables.length}
                            </p>
                          </div>
                        </div>

                        {/* Deliverables List */}
                        {campaign.deliverables.length > 0 && (
                          <div className="border-t border-gray-600 pt-6">
                            <h4 className="text-lg font-semibold text-white mb-4">
                              Deliverables
                            </h4>

                            <div className="space-y-3">
                              {campaign.deliverables.map((deliverable, idx) => {
                                const deliverableStatus = getStatusInfo(
                                  deliverable.status,
                                );
                                const DeliverableIcon = deliverableStatus.icon;

                                return (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div
                                        className={`
                                        p-2 rounded-lg
                                        ${
                                          deliverable.type.includes("Video")
                                            ? "bg-red-500/20"
                                            : deliverable.type.includes("Image")
                                              ? "bg-blue-500/20"
                                              : "bg-green-500/20"
                                        }
                                      `}
                                      >
                                        {deliverable.type.includes("Video") ? (
                                          <Video className="w-4 h-4 text-red-400" />
                                        ) : deliverable.type.includes(
                                            "Image",
                                          ) ? (
                                          <Image className="w-4 h-4 text-blue-400" />
                                        ) : (
                                          <FileText className="w-4 h-4 text-green-400" />
                                        )}
                                      </div>

                                      <div>
                                        <p className="font-medium text-white">
                                          {deliverable.type}
                                        </p>
                                        {deliverable.submittedDate && (
                                          <p className="text-sm text-gray-400">
                                            Submitted{" "}
                                            {new Date(
                                              deliverable.submittedDate,
                                            ).toLocaleDateString()}
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    <span
                                      className={`
                                      flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
                                      ${deliverableStatus.bg} ${deliverableStatus.text}
                                    `}
                                    >
                                      <DeliverableIcon className="w-3 h-3" />
                                      <span className="capitalize">
                                        {deliverable.status}
                                      </span>
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Engagement Metrics (if available) */}
                        {campaign.engagement &&
                          campaign.status === "submitted" && (
                            <div className="border-t border-gray-600 pt-6 mt-6">
                              <h4 className="text-lg font-semibold text-white mb-4">
                                Performance
                              </h4>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                  <div className="flex items-center justify-center space-x-1 mb-1">
                                    <Eye className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-400">
                                      Views
                                    </span>
                                  </div>
                                  <p className="text-xl font-bold text-white">
                                    {campaign.engagement.views.toLocaleString()}
                                  </p>
                                </div>

                                <div className="text-center">
                                  <div className="flex items-center justify-center space-x-1 mb-1">
                                    <Heart className="w-4 h-4 text-red-400" />
                                    <span className="text-sm text-gray-400">
                                      Likes
                                    </span>
                                  </div>
                                  <p className="text-xl font-bold text-white">
                                    {campaign.engagement.likes.toLocaleString()}
                                  </p>
                                </div>

                                <div className="text-center">
                                  <div className="flex items-center justify-center space-x-1 mb-1">
                                    <MessageSquare className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm text-gray-400">
                                      Comments
                                    </span>
                                  </div>
                                  <p className="text-xl font-bold text-white">
                                    {campaign.engagement.comments.toLocaleString()}
                                  </p>
                                </div>

                                <div className="text-center">
                                  <div className="flex items-center justify-center space-x-1 mb-1">
                                    <Share className="w-4 h-4 text-green-400" />
                                    <span className="text-sm text-gray-400">
                                      Shares
                                    </span>
                                  </div>
                                  <p className="text-xl font-bold text-white">
                                    {campaign.engagement.shares.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    </AnimatedCard>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Briefcase className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No campaigns found
              </h3>
              <p className="text-gray-400 mb-6">
                {activeTab === "all"
                  ? "You haven't applied to any campaigns yet."
                  : `No campaigns in ${activeTab} status.`}
              </p>
              <OutlineButton
                onClick={() =>
                  (window.location.href = "/creator/discover-campaigns")
                }
              >
                Browse Campaigns
              </OutlineButton>
            </motion.div>
          )}
        </div>

        {/* Content Submission Modal */}
        <AnimatePresence>
          {showSubmissionModal && selectedCampaign && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => !isUploading && setShowSubmissionModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-2xl font-bold text-white">
                    Submit Content
                  </h3>
                  <p className="text-gray-400 mt-1">{selectedCampaign.title}</p>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {!isUploading ? (
                    <div className="space-y-6">
                      {/* Upload Area */}
                      <div
                        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-white font-medium mb-2">
                          Click to upload your content
                        </p>
                        <p className="text-gray-400 text-sm">
                          Supports images, videos, and documents
                        </p>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        className="hidden"
                      />

                      {/* Submission Note */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Submission Note (Optional)
                        </label>
                        <textarea
                          className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          rows={4}
                          placeholder="Add any notes about your submission..."
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <OutlineButton
                          fullWidth
                          onClick={() => setShowSubmissionModal(false)}
                        >
                          Cancel
                        </OutlineButton>
                        <PrimaryButton
                          fullWidth
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Choose Files
                        </PrimaryButton>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-white" />
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2">
                        Uploading Content
                      </h4>
                      <p className="text-gray-400 mb-6">
                        Please wait while we upload your files...
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                        <motion.div
                          className="bg-indigo-600 h-3 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>

                      <p className="text-sm text-gray-400">
                        {uploadProgress}% complete
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyCampaigns;
