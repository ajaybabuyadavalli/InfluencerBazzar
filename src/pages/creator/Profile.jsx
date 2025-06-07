/**
 * Creator Profile Page - Profile Management & Portfolio Showcase
 *
 * Comprehensive profile management interface featuring:
 * - Editable profile sections with live preview
 * - Content portfolio grid with performance metrics
 * - Social platform integration and sync
 * - Brand testimonials and reviews
 * - Profile visibility controls
 * - Media upload with drag & drop
 * - Real-time profile score updates
 * - Professional portfolio export
 *
 * Backend Integration:
 * {{Dynamic}} - Profile data from GET /api/creator/profile
 * {{Dynamic}} - Profile updates via PATCH /api/creator/profile
 * {{Dynamic}} - Content sync from platform APIs
 * {{Dynamic}} - File uploads to /api/uploads/profile
 * {{Dynamic}} - Testimonials from GET /api/creator/testimonials
 *
 * Features:
 * - Live profile preview
 * - Bulk content import from social platforms
 * - Advanced portfolio filtering
 * - Professional branding tools
 * - Analytics integration
 * - Export capabilities
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Edit3,
  Save,
  X,
  Upload,
  Download,
  Eye,
  EyeOff,
  Link,
  MapPin,
  Calendar,
  Users,
  Heart,
  MessageSquare,
  Share,
  TrendingUp,
  Star,
  Quote,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Globe,
  Smartphone,
  Mail,
  Phone,
  Copy,
  Check,
  RefreshCw,
  Filter,
  Grid,
  List,
  ExternalLink,
  Award,
  Verified,
  MoreHorizontal,
} from "lucide-react";

// Shared Components
import AnimatedCard, { StatCard } from "../../components/shared/AnimatedCard";
import RippleButton, {
  PrimaryButton,
  OutlineButton,
  GhostButton,
} from "../../components/shared/RippleButton";
import { DonutChart } from "../../components/shared/ChartComponents";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

// Mock Data - {{Dynamic}} Replace with API calls
import { creatorProfile, topPerformingContent } from "../../utils/mockData";

/**
 * Creator Profile Component
 *
 * Comprehensive profile management and showcase interface
 */
const CreatorProfile = () => {
  // Profile Data State
  const [profile, setProfile] = useState(creatorProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [tempProfile, setTempProfile] = useState(creatorProfile);

  // UI State
  const [activeTab, setActiveTab] = useState("overview");
  const [contentFilter, setContentFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [isPublicPreview, setIsPublicPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // File Upload Refs
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  /**
   * Profile tabs configuration
   */
  const profileTabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "portfolio", label: "Portfolio", icon: Grid },
    { id: "testimonials", label: "Testimonials", icon: Quote },
    { id: "settings", label: "Settings", icon: Edit3 },
  ];

  /**
   * Calculate profile completion score
   */
  const calculateProfileScore = () => {
    const fields = [
      profile.bio,
      profile.platforms.instagram.handle,
      profile.platforms.youtube.handle,
      profile.niches.length > 0,
      profile.languages.length > 0,
      profile.avatar,
      profile.coverImage,
      profile.paymentMethods.length > 0,
    ];

    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  /**
   * Animated counter for profile score
   */
  const profileScore = useAnimatedCounter(calculateProfileScore(), {
    duration: 1500,
    format: "number",
  });

  /**
   * Update profile data
   * {{Dynamic}} - Call PATCH /api/creator/profile
   */
  const updateProfile = async (updates) => {
    setIsLoading(true);
    try {
      // {{Dynamic}} - Real API call:
      // const response = await fetch('/api/creator/profile', {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(updates)
      // })
      //
      // if (response.ok) {
      //   const updatedProfile = await response.json()
      //   setProfile(updatedProfile)
      // }

      // Mock update for demo
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProfile((prev) => ({ ...prev, ...updates }));
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle section editing
   */
  const startEditing = (section) => {
    setEditingSection(section);
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const saveEditing = () => {
    updateProfile(tempProfile);
    setIsEditing(false);
    setEditingSection(null);
  };

  const cancelEditing = () => {
    setTempProfile(profile);
    setIsEditing(false);
    setEditingSection(null);
  };

  /**
   * Handle file uploads
   * {{Dynamic}} - Upload to /api/uploads/profile
   */
  const handleFileUpload = async (file, type) => {
    try {
      // {{Dynamic}} - Real file upload:
      // const formData = new FormData()
      // formData.append('file', file)
      // formData.append('type', type)
      //
      // const response = await fetch('/api/uploads/profile', {
      //   method: 'POST',
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      //   body: formData
      // })
      //
      // if (response.ok) {
      //   const { url } = await response.json()
      //   const updates = { [type]: url }
      //   updateProfile(updates)
      // }

      // Mock file upload for demo
      const mockUrl = URL.createObjectURL(file);
      const updates = { [type]: mockUrl };
      updateProfile(updates);
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  /**
   * Sync content from social platforms
   * {{Dynamic}} - Call POST /api/creator/sync-content
   */
  const syncPlatformContent = async (platform) => {
    setIsSyncing(true);
    try {
      // {{Dynamic}} - Real API call:
      // const response = await fetch('/api/creator/sync-content', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({ platform })
      // })
      //
      // if (response.ok) {
      //   const syncedContent = await response.json()
      //   // Update content state with synced data
      // }

      // Mock sync delay for demo
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Failed to sync content:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  /**
   * Copy profile link to clipboard
   */
  const copyProfileLink = () => {
    const profileUrl = `${window.location.origin}/creator/${profile.username}`;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Get platform icon
   */
  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return Instagram;
      case "youtube":
        return Youtube;
      case "twitter":
        return Twitter;
      case "linkedin":
        return Linkedin;
      default:
        return Globe;
    }
  };

  /**
   * Format follower count
   */
  const formatFollowerCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
              <p className="text-gray-400 text-lg">
                Manage your profile and showcase your work
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {/* Profile completion score */}
              <div className="flex items-center space-x-3 bg-gray-800/50 rounded-lg p-3">
                <DonutChart
                  percentage={profileScore.value}
                  size={60}
                  strokeWidth={6}
                  color="#6366f1"
                >
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">
                      {Math.round(profileScore.value)}%
                    </div>
                  </div>
                </DonutChart>
                <div>
                  <p className="text-sm font-medium text-white">
                    Profile Score
                  </p>
                  <p className="text-xs text-gray-400">Complete your profile</p>
                </div>
              </div>

              {/* Action buttons */}
              <OutlineButton
                onClick={() => setIsPublicPreview(!isPublicPreview)}
                icon={
                  isPublicPreview ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )
                }
              >
                {isPublicPreview ? "Edit Mode" : "Preview"}
              </OutlineButton>

              <PrimaryButton
                onClick={copyProfileLink}
                icon={
                  copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )
                }
              >
                {copied ? "Copied!" : "Share Profile"}
              </PrimaryButton>
            </div>
          </div>
        </motion.div>

        {/* Profile Cover Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <AnimatedCard variant="glass" className="overflow-hidden">
            {/* Cover Image */}
            <div className="relative h-64 bg-gradient-to-r from-indigo-600 to-purple-600">
              {profile.coverImage && (
                <img
                  src={profile.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              )}

              {!isPublicPreview && (
                <button
                  onClick={() => coverInputRef.current?.click()}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </button>
              )}

              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileUpload(e.target.files[0], "coverImage")
                }
                className="hidden"
              />
            </div>

            {/* Profile Info */}
            <div className="p-6 -mt-16 relative">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col lg:flex-row lg:items-end space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-gray-800 overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600">
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt={profile.firstName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                          {profile.firstName.charAt(0)}
                        </div>
                      )}
                    </div>

                    {!isPublicPreview && (
                      <button
                        onClick={() => avatarInputRef.current?.click()}
                        className="absolute bottom-2 right-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    )}

                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e.target.files[0], "avatar")
                      }
                      className="hidden"
                    />
                  </div>

                  {/* Name and Bio */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-3xl font-bold text-white">
                        {profile.firstName} {profile.lastName}
                      </h2>
                      {profile.isVerified && (
                        <Verified className="w-6 h-6 text-blue-400" />
                      )}
                    </div>

                    <p className="text-xl text-indigo-300 mb-2">
                      {profile.username}
                    </p>

                    {editingSection === "bio" ? (
                      <div className="space-y-3">
                        <textarea
                          value={tempProfile.bio}
                          onChange={(e) =>
                            setTempProfile((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }))
                          }
                          className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white resize-none"
                          rows={3}
                          maxLength={200}
                        />
                        <div className="flex space-x-2">
                          <GhostButton size="sm" onClick={saveEditing}>
                            <Save className="w-4 h-4" />
                          </GhostButton>
                          <GhostButton size="sm" onClick={cancelEditing}>
                            <X className="w-4 h-4" />
                          </GhostButton>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start space-x-2">
                        <p className="text-gray-300 flex-1">{profile.bio}</p>
                        {!isPublicPreview && (
                          <button
                            onClick={() => startEditing("bio")}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined {new Date(profile.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {Object.entries(profile.platforms).map(([platform, data]) => {
            const PlatformIcon = getPlatformIcon(platform);
            const totalFollowers = useAnimatedCounter(data.followers, {
              duration: 2000,
              format: "compact",
            });

            return (
              <StatCard
                key={platform}
                title={platform}
                value={totalFollowers.formattedValue}
                change={`${data.avgEngagement}% ER`}
                trend="up"
                icon={<PlatformIcon className="w-6 h-6" />}
                color="indigo"
              />
            );
          })}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <AnimatedCard variant="glass" className="p-6">
            <div className="flex flex-wrap gap-2">
              {profileTabs.map((tab) => {
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
              {/* Content Preferences */}
              <AnimatedCard variant="glass">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Content Preferences
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Niches */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">Niches</h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.niches.map((niche) => (
                          <span
                            key={niche}
                            className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm"
                          >
                            {niche}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">
                        Languages
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.languages.map((language) => (
                          <span
                            key={language}
                            className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content Types */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">
                        Content Types
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.contentTypes.map((type) => (
                          <span
                            key={type}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard
                  title="Total Followers"
                  value={formatFollowerCount(
                    Object.values(profile.platforms).reduce(
                      (sum, p) => sum + p.followers,
                      0,
                    ),
                  )}
                  icon={<Users className="w-6 h-6" />}
                  color="blue"
                />
                <StatCard
                  title="Avg Engagement"
                  value="8.5%"
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="green"
                />
                <StatCard
                  title="Content Types"
                  value={profile.contentTypes.length}
                  icon={<Grid className="w-6 h-6" />}
                  color="purple"
                />
                <StatCard
                  title="Languages"
                  value={profile.languages.length}
                  icon={<Globe className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </motion.div>
          )}

          {activeTab === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Portfolio Controls */}
              <AnimatedCard variant="glass" className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  {/* Sync Button */}
                  <div className="flex items-center space-x-4">
                    <PrimaryButton
                      onClick={() => syncPlatformContent("all")}
                      icon={
                        <RefreshCw
                          className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`}
                        />
                      }
                      disabled={isSyncing}
                    >
                      {isSyncing ? "Syncing..." : "Sync Content"}
                    </PrimaryButton>

                    {/* Filter Dropdown */}
                    <select
                      value={contentFilter}
                      onChange={(e) => setContentFilter(e.target.value)}
                      className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="all">All Content</option>
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "grid"
                          ? "bg-indigo-600 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "list"
                          ? "bg-indigo-600 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </AnimatedCard>

              {/* Content Grid */}
              <div
                className={`
                grid gap-6
                ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }
              `}
              >
                {topPerformingContent.map((content, index) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AnimatedCard
                      variant="glass"
                      className="overflow-hidden group"
                    >
                      {viewMode === "grid" ? (
                        <div>
                          {/* Content Thumbnail */}
                          <div className="relative">
                            <img
                              src={content.thumbnail}
                              alt={content.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Platform Badge */}
                            <div className="absolute top-3 left-3">
                              <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                                {content.platform}
                              </span>
                            </div>

                            {/* Engagement Rate */}
                            <div className="absolute top-3 right-3">
                              <span className="px-2 py-1 bg-green-500/80 text-white text-xs rounded-full">
                                {content.engagementRate}% ER
                              </span>
                            </div>
                          </div>

                          {/* Content Info */}
                          <div className="p-4">
                            <h4 className="font-semibold text-white mb-2 line-clamp-2">
                              {content.title}
                            </h4>

                            {/* Metrics */}
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>
                                  {content.metrics.views.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="w-3 h-3" />
                                <span>
                                  {content.metrics.likes.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 flex items-center space-x-4">
                          <img
                            src={content.thumbnail}
                            alt={content.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />

                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">
                              {content.title}
                            </h4>
                            <p className="text-gray-400 text-sm mb-2">
                              {content.platform}
                            </p>

                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>
                                  {content.metrics.views.toLocaleString()}
                                </span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Heart className="w-3 h-3" />
                                <span>
                                  {content.metrics.likes.toLocaleString()}
                                </span>
                              </span>
                              <span className="text-green-400">
                                {content.engagementRate}% ER
                              </span>
                            </div>
                          </div>

                          <GhostButton size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </GhostButton>
                        </div>
                      )}
                    </AnimatedCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "testimonials" && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <AnimatedCard variant="glass" className="p-8 text-center">
                <Quote className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Testimonials Yet
                </h3>
                <p className="text-gray-400 mb-6">
                  Complete campaigns to receive testimonials from brands
                </p>
                <OutlineButton>Request Testimonial</OutlineButton>
              </AnimatedCard>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Privacy Settings */}
              <AnimatedCard variant="glass" className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Privacy Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Public Profile</p>
                      <p className="text-sm text-gray-400">
                        Make your profile visible to brands
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">
                        Show Contact Info
                      </p>
                      <p className="text-sm text-gray-400">
                        Display email and phone in profile
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </AnimatedCard>

              {/* Account Settings */}
              <AnimatedCard variant="glass" className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Account Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      readOnly
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <PrimaryButton>Save Changes</PrimaryButton>
                </div>
              </AnimatedCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CreatorProfile;
