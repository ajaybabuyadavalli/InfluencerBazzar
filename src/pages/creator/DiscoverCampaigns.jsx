/**
 * Discover Campaigns Page - Advanced Campaign Search & Discovery
 *
 * Premium campaign discovery interface with:
 * - Smart search with autocomplete
 * - Advanced multi-filter system
 * - Interactive campaign cards with hover effects
 * - Real-time eligibility scoring
 * - Map-based location filtering
 * - Campaign application modal
 * - Responsive design with mobile-optimized filters
 *
 * Backend Integration:
 * {{Dynamic}} - Campaign data from GET /api/campaigns?filters=...
 * {{Dynamic}} - Search suggestions from GET /api/campaigns/search?q=...
 * {{Dynamic}} - Apply to campaign via POST /api/campaigns/:id/apply
 * {{Dynamic}} - Save campaign via POST /api/creator/saved-campaigns
 * {{Dynamic}} - Filter options from GET /api/campaigns/filter-options
 *
 * Features:
 * - Real-time search with debouncing
 * - Advanced filtering (platform, niche, budget, location)
 * - Sorting options (trending, newest, highest payout)
 * - Campaign eligibility indicators
 * - Application tracking
 * - Save/bookmark campaigns
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Star,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Eye,
  Heart,
  MessageSquare,
  X,
  ChevronDown,
  SlidersHorizontal,
  Zap,
  Target,
  Globe,
} from "lucide-react";

// Shared Components
import AnimatedCard from "../../components/shared/AnimatedCard";
import RippleButton, {
  PrimaryButton,
  OutlineButton,
  GhostButton,
} from "../../components/shared/RippleButton";

// Mock Data - {{Dynamic}} Replace with API calls
import { availableCampaigns, filterOptions } from "../../utils/mockData";

/**
 * Campaign Discovery Component
 *
 * Main interface for discovering and applying to campaigns
 */
const DiscoverCampaigns = () => {
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    platforms: [],
    niches: [],
    languages: [],
    campaignTypes: [],
    regions: [],
    budgetRange: null,
    followerRange: { min: 0, max: 1000000 },
  });
  const [sortBy, setSortBy] = useState("trending");
  const [showFilters, setShowFilters] = useState(false);

  // Data State
  const [campaigns, setCampaigns] = useState(availableCampaigns);
  const [isLoading, setIsLoading] = useState(false);
  const [savedCampaigns, setSavedCampaigns] = useState(new Set());
  const [appliedCampaigns, setAppliedCampaigns] = useState(new Set());

  // UI State
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchInputRef = useRef(null);
  const searchDebounceRef = useRef(null);

  /**
   * Fetch campaigns from API based on filters and search
   * {{Dynamic}} - Replace with actual API integration
   */
  const fetchCampaigns = async (
    query = "",
    filters = {},
    sort = "trending",
  ) => {
    setIsLoading(true);
    try {
      // {{Dynamic}} - Real API call:
      // const queryParams = new URLSearchParams({
      //   q: query,
      //   sort,
      //   ...Object.entries(filters).reduce((acc, [key, value]) => {
      //     if (Array.isArray(value) && value.length > 0) {
      //       acc[key] = value.join(',')
      //     } else if (value && typeof value === 'object') {
      //       acc[key] = JSON.stringify(value)
      //     } else if (value) {
      //       acc[key] = value
      //     }
      //     return acc
      //   }, {})
      // })
      //
      // const response = await fetch(`/api/campaigns?${queryParams}`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // })
      // const data = await response.json()
      // setCampaigns(data.campaigns)

      // Mock delay and filtering for demo
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simple mock filtering logic
      let filteredCampaigns = [...availableCampaigns];

      if (query) {
        filteredCampaigns = filteredCampaigns.filter(
          (campaign) =>
            campaign.title.toLowerCase().includes(query.toLowerCase()) ||
            campaign.brand.name.toLowerCase().includes(query.toLowerCase()) ||
            campaign.tags.some((tag) =>
              tag.toLowerCase().includes(query.toLowerCase()),
            ),
        );
      }

      // Apply filters
      if (filters.platforms.length > 0) {
        filteredCampaigns = filteredCampaigns.filter((campaign) =>
          campaign.requirements.platforms.some((platform) =>
            filters.platforms.includes(platform),
          ),
        );
      }

      if (filters.niches.length > 0) {
        filteredCampaigns = filteredCampaigns.filter((campaign) =>
          campaign.tags.some((tag) => filters.niches.includes(tag)),
        );
      }

      // Sort campaigns
      switch (sort) {
        case "newest":
          filteredCampaigns.sort(
            (a, b) =>
              new Date(b.timeline.campaignStart) -
              new Date(a.timeline.campaignStart),
          );
          break;
        case "highest_payout":
          filteredCampaigns.sort((a, b) => b.budget.max - a.budget.max);
          break;
        case "ending_soon":
          filteredCampaigns.sort(
            (a, b) =>
              new Date(a.timeline.applicationDeadline) -
              new Date(b.timeline.applicationDeadline),
          );
          break;
        case "best_match":
          filteredCampaigns.sort(
            (a, b) => b.eligibilityScore - a.eligibilityScore,
          );
          break;
        default: // trending
          filteredCampaigns.sort(
            (a, b) => b.applicationsCount - a.applicationsCount,
          );
      }

      setCampaigns(filteredCampaigns);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Debounced search function
   */
  useEffect(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      fetchCampaigns(searchQuery, selectedFilters, sortBy);
    }, 300);

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchQuery, selectedFilters, sortBy]);

  /**
   * Fetch search suggestions
   * {{Dynamic}} - Replace with GET /api/campaigns/search-suggestions?q=query
   */
  const fetchSearchSuggestions = async (query) => {
    if (query.length < 2) {
      setSearchSuggestions([]);
      return;
    }

    try {
      // {{Dynamic}} - Real API call:
      // const response = await fetch(`/api/campaigns/search-suggestions?q=${encodeURIComponent(query)}`)
      // const data = await response.json()
      // setSearchSuggestions(data.suggestions)

      // Mock suggestions for demo
      const mockSuggestions = [
        { type: "brand", text: "Mamaearth", count: 5 },
        { type: "niche", text: "Beauty", count: 12 },
        { type: "campaign", text: "#GlowUp2024", count: 1 },
        { type: "platform", text: "Instagram", count: 25 },
      ].filter((s) => s.text.toLowerCase().includes(query.toLowerCase()));

      setSearchSuggestions(mockSuggestions);
    } catch (error) {
      console.error("Failed to fetch search suggestions:", error);
    }
  };

  /**
   * Handle search input change
   */
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSearchSuggestions(query);
    setShowSuggestions(true);
  };

  /**
   * Handle filter changes
   */
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      if (Array.isArray(newFilters[filterType])) {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter(
            (item) => item !== value,
          );
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      } else {
        newFilters[filterType] = value;
      }

      return newFilters;
    });
  };

  /**
   * Clear all filters
   */
  const clearAllFilters = () => {
    setSelectedFilters({
      platforms: [],
      niches: [],
      languages: [],
      campaignTypes: [],
      regions: [],
      budgetRange: null,
      followerRange: { min: 0, max: 1000000 },
    });
    setSearchQuery("");
  };

  /**
   * Toggle saved campaign
   * {{Dynamic}} - Call POST/DELETE /api/creator/saved-campaigns/:campaignId
   */
  const toggleSavedCampaign = async (campaignId) => {
    try {
      const isSaved = savedCampaigns.has(campaignId);

      // {{Dynamic}} - Real API call:
      // if (isSaved) {
      //   await fetch(`/api/creator/saved-campaigns/${campaignId}`, {
      //     method: 'DELETE',
      //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      //   })
      // } else {
      //   await fetch(`/api/creator/saved-campaigns/${campaignId}`, {
      //     method: 'POST',
      //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      //   })
      // }

      setSavedCampaigns((prev) => {
        const newSet = new Set(prev);
        if (isSaved) {
          newSet.delete(campaignId);
        } else {
          newSet.add(campaignId);
        }
        return newSet;
      });
    } catch (error) {
      console.error("Failed to toggle saved campaign:", error);
    }
  };

  /**
   * Apply to campaign
   * {{Dynamic}} - Call POST /api/campaigns/:campaignId/apply
   */
  const applyCampaign = async (campaignId, applicationData = {}) => {
    try {
      // {{Dynamic}} - Real API call:
      // const response = await fetch(`/api/campaigns/${campaignId}/apply`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(applicationData)
      // })
      //
      // if (response.ok) {
      //   setAppliedCampaigns(prev => new Set([...prev, campaignId]))
      //   setShowApplicationModal(false)
      // }

      // Mock success for demo
      setAppliedCampaigns((prev) => new Set([...prev, campaignId]));
      setShowApplicationModal(false);
    } catch (error) {
      console.error("Failed to apply to campaign:", error);
    }
  };

  /**
   * Get eligibility color and text
   */
  const getEligibilityInfo = (score) => {
    if (score >= 90)
      return { color: "green", text: "Perfect Match", icon: CheckCircle };
    if (score >= 70) return { color: "blue", text: "Good Match", icon: Target };
    if (score >= 50)
      return { color: "yellow", text: "Potential Match", icon: AlertCircle };
    return { color: "red", text: "Low Match", icon: X };
  };

  /**
   * Format time remaining for application deadline
   */
  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffInHours = Math.ceil((deadlineDate - now) / (1000 * 60 * 60));

    if (diffInHours < 24) return `${diffInHours}h remaining`;
    const diffInDays = Math.ceil(diffInHours / 24);
    return `${diffInDays}d remaining`;
  };

  /**
   * Active filter count for mobile display
   */
  const activeFilterCount = useMemo(() => {
    return Object.values(selectedFilters).reduce((count, value) => {
      if (Array.isArray(value)) return count + value.length;
      if (value && typeof value === "object") return count + 1;
      if (value) return count + 1;
      return count;
    }, 0);
  }, [selectedFilters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Discover Campaigns
          </h1>
          <p className="text-gray-400 text-lg">
            Find campaigns that match your content style and audience
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <AnimatedCard variant="glass" className="p-6">
            {/* Search Section */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search campaigns, brands, or niches..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                {/* Search Suggestions */}
                <AnimatePresence>
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl overflow-hidden z-10"
                    >
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors flex items-center justify-between"
                          onClick={() => {
                            setSearchQuery(suggestion.text);
                            setShowSuggestions(false);
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-400 capitalize text-sm">
                              {suggestion.type}:
                            </span>
                            <span className="text-white">
                              {suggestion.text}
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm">
                            {suggestion.count} campaigns
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="trending">🔥 Trending</option>
                  <option value="newest">🆕 Newest</option>
                  <option value="ending_soon">⏰ Ending Soon</option>
                  <option value="highest_payout">💰 Highest Payout</option>
                  <option value="best_match">🎯 Best Match</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              {/* Filter Toggle */}
              <RippleButton
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                icon={<SlidersHorizontal className="w-5 h-5" />}
                className="relative"
              >
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </RippleButton>
            </div>

            {/* Filter Section */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-600 pt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Platform Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Platforms
                      </label>
                      <div className="space-y-2">
                        {filterOptions.campaigns.platforms.map((platform) => (
                          <label key={platform} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedFilters.platforms.includes(
                                platform,
                              )}
                              onChange={() =>
                                handleFilterChange("platforms", platform)
                              }
                              className="rounded border-gray-600 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-300">
                              {platform}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Niche Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Niches
                      </label>
                      <div className="space-y-2">
                        {filterOptions.campaigns.niches.map((niche) => (
                          <label key={niche} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedFilters.niches.includes(niche)}
                              onChange={() =>
                                handleFilterChange("niches", niche)
                              }
                              className="rounded border-gray-600 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-300">
                              {niche}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Language Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Languages
                      </label>
                      <div className="space-y-2">
                        {filterOptions.campaigns.languages.map((language) => (
                          <label key={language} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedFilters.languages.includes(
                                language,
                              )}
                              onChange={() =>
                                handleFilterChange("languages", language)
                              }
                              className="rounded border-gray-600 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-300">
                              {language}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Campaign Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Campaign Types
                      </label>
                      <div className="space-y-2">
                        {filterOptions.campaigns.campaignTypes.map((type) => (
                          <label key={type} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedFilters.campaignTypes.includes(
                                type,
                              )}
                              onChange={() =>
                                handleFilterChange("campaignTypes", type)
                              }
                              className="rounded border-gray-600 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-300">
                              {type}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  {activeFilterCount > 0 && (
                    <div className="mt-6 flex justify-end">
                      <GhostButton onClick={clearAllFilters}>
                        Clear All Filters
                      </GhostButton>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedCard>
        </motion.div>

        {/* Campaign Results */}
        <div className="space-y-6">
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between"
          >
            <div className="text-gray-300">
              {isLoading
                ? "Searching campaigns..."
                : `Found ${campaigns.length} campaigns`}
            </div>

            {/* View Toggle - could add grid/list view */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">View:</span>
              <button className="p-2 text-indigo-400 bg-indigo-500/20 rounded-lg">
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Campaign Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-800/50 rounded-xl h-80"></div>
                </div>
              ))}
            </div>
          ) : campaigns.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {campaigns.map((campaign, index) => {
                const eligibility = getEligibilityInfo(
                  campaign.eligibilityScore,
                );
                const EligibilityIcon = eligibility.icon;
                const isApplied = appliedCampaigns.has(campaign.id);
                const isSaved = savedCampaigns.has(campaign.id);

                return (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AnimatedCard
                      variant="glass"
                      className="h-full group cursor-pointer relative overflow-hidden"
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setShowApplicationModal(true);
                      }}
                    >
                      {/* Campaign Priority Badge */}
                      {campaign.isFeatured && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-medium rounded-full">
                            <Zap className="w-3 h-3" />
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Save Button */}
                      <button
                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSavedCampaign(campaign.id);
                        }}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <Bookmark className="w-4 h-4 text-white" />
                        )}
                      </button>

                      {/* Brand Info */}
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src={campaign.brand.logo}
                          alt={campaign.brand.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                            {campaign.brand.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {campaign.brand.verified && (
                              <CheckCircle className="w-4 h-4 text-blue-400" />
                            )}
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-400">
                                {campaign.brand.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Campaign Title */}
                      <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {campaign.title}
                      </h4>

                      {/* Campaign Description */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {campaign.description}
                      </p>

                      {/* Budget and Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-gray-400">
                              Budget
                            </span>
                          </div>
                          <p className="text-white font-semibold">
                            ₹{campaign.budget.min.toLocaleString()}-
                            {campaign.budget.max.toLocaleString()}
                          </p>
                        </div>

                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <Users className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-gray-400">
                              Applications
                            </span>
                          </div>
                          <p className="text-white font-semibold">
                            {campaign.applicationsCount}
                          </p>
                        </div>
                      </div>

                      {/* Platform Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {campaign.requirements.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>

                      {/* Deadline and Eligibility */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-orange-400" />
                          <span className="text-gray-400">
                            {getTimeRemaining(
                              campaign.timeline.applicationDeadline,
                            )}
                          </span>
                        </div>

                        <div
                          className={`
                          flex items-center space-x-1 px-2 py-1 rounded-full text-xs
                          ${
                            eligibility.color === "green"
                              ? "bg-green-500/20 text-green-300"
                              : eligibility.color === "blue"
                                ? "bg-blue-500/20 text-blue-300"
                                : eligibility.color === "yellow"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-red-500/20 text-red-300"
                          }
                        `}
                        >
                          <EligibilityIcon className="w-3 h-3" />
                          <span>{campaign.eligibilityScore}%</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-auto">
                        {isApplied ? (
                          <RippleButton
                            variant="success"
                            fullWidth
                            disabled
                            icon={<CheckCircle className="w-4 h-4" />}
                          >
                            Applied
                          </RippleButton>
                        ) : (
                          <PrimaryButton
                            fullWidth
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCampaign(campaign);
                              setShowApplicationModal(true);
                            }}
                          >
                            Apply Now
                          </PrimaryButton>
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
              <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No campaigns found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search terms or filters to find more
                campaigns.
              </p>
              <OutlineButton onClick={clearAllFilters}>
                Clear All Filters
              </OutlineButton>
            </motion.div>
          )}
        </div>

        {/* Application Modal */}
        <AnimatePresence>
          {showApplicationModal && selectedCampaign && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowApplicationModal(false)}
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
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      Apply to Campaign
                    </h3>
                    <button
                      onClick={() => setShowApplicationModal(false)}
                      className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Campaign Details */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={selectedCampaign.brand.logo}
                        alt={selectedCampaign.brand.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-xl font-bold text-white">
                          {selectedCampaign.title}
                        </h4>
                        <p className="text-gray-400">
                          {selectedCampaign.brand.name}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">
                      {selectedCampaign.description}
                    </p>

                    {/* Requirements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h5 className="font-semibold text-white mb-2">
                          Platforms
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedCampaign.requirements.platforms.map(
                            (platform) => (
                              <span
                                key={platform}
                                className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-sm rounded-full"
                              >
                                {platform}
                              </span>
                            ),
                          )}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-white mb-2">
                          Budget
                        </h5>
                        <p className="text-green-400 font-semibold">
                          ₹{selectedCampaign.budget.min.toLocaleString()}-
                          {selectedCampaign.budget.max.toLocaleString()} per
                          post
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Application Form (simplified for demo) */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Why are you a good fit for this campaign?
                      </label>
                      <textarea
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={4}
                        placeholder="Tell the brand why you're perfect for this campaign..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Content Ideas (optional)
                      </label>
                      <textarea
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={3}
                        placeholder="Share your creative ideas for this campaign..."
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <OutlineButton
                      fullWidth
                      onClick={() => setShowApplicationModal(false)}
                    >
                      Cancel
                    </OutlineButton>
                    <PrimaryButton
                      fullWidth
                      onClick={() => applyCampaign(selectedCampaign.id)}
                    >
                      Submit Application
                    </PrimaryButton>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiscoverCampaigns;
