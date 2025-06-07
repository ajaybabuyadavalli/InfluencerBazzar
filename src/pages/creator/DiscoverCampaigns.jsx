import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Tag,
  Heart,
  ExternalLink,
  TrendingUp,
  Calendar,
  Target,
  Users,
  X,
  ChevronDown,
  Star,
  Instagram,
  Youtube,
  Music,
  Sparkles,
} from "lucide-react";

/**
 * Discover Campaigns Component
 *
 * Purpose: Allows creators to browse and filter available campaigns
 * Features:
 * - Advanced filtering system with multiple criteria
 * - Real-time search functionality
 * - Campaign cards with hover effects and detailed information
 * - Sorting options (trending, ending soon, highest payout, etc.)
 * - Responsive design with mobile-optimized filters
 *
 * Backend Integration:
 * - Campaign data from /api/creator/campaigns/available {{Dynamic}}
 * - Search and filtering via /api/creator/campaigns/search {{Dynamic}}
 * - Campaign application via /api/creator/campaigns/apply {{Dynamic}}
 * - Save campaign via /api/creator/campaigns/save {{Dynamic}}
 *
 * API Endpoints needed:
 * - GET /api/creator/campaigns/available?page=1&limit=12
 * - POST /api/creator/campaigns/search (with filter criteria)
 * - POST /api/creator/campaigns/{id}/apply
 * - POST /api/creator/campaigns/{id}/save
 * - GET /api/creator/campaigns/recommended
 */
export default function DiscoverCampaigns() {
  const [campaigns, setCampaigns] = useState([]); // {{Dynamic}} - from API
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);

  // Filter states
  const [filters, setFilters] = useState({
    platforms: [],
    niches: [],
    languages: [],
    campaignTypes: [],
    followerRange: [1000, 1000000],
    regions: [],
    sortBy: "trending",
  });

  // Filter options - {{Dynamic}} these could come from API
  const filterOptions = {
    platforms: [
      { id: "instagram", name: "Instagram", icon: Instagram },
      { id: "youtube", name: "YouTube", icon: Youtube },
      { id: "tiktok", name: "TikTok", icon: Music },
    ],
    niches: [
      "Beauty",
      "Fashion",
      "Fitness",
      "Tech",
      "Food",
      "Travel",
      "Lifestyle",
      "Gaming",
      "Education",
      "Finance",
    ],
    languages: [
      "English",
      "Hindi",
      "Tamil",
      "Telugu",
      "Bengali",
      "Marathi",
      "Gujarati",
    ],
    campaignTypes: [
      { id: "paid", name: "Paid", icon: DollarSign },
      { id: "barter", name: "Barter", icon: Heart },
      { id: "hybrid", name: "Paid + Barter", icon: Star },
    ],
    regions: [
      "Pan India",
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
      "Tier 2 Cities",
    ],
    sortOptions: [
      { value: "trending", label: "🔥 Trending" },
      { value: "ending_soon", label: "🕓 Ending Soon" },
      { value: "highest_payout", label: "💰 Highest Payout" },
      { value: "newest", label: "🆕 Newest" },
      { value: "best_match", label: "🎯 Best Match" },
    ],
  };

  // Mock campaign data - {{Dynamic}} replace with API call
  const mockCampaigns = [
    {
      id: 1,
      title: "Summer Skincare Collection Launch",
      brand: "GlowSkin Pro",
      brandLogo:
        "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=100&h=100&fit=crop",
      description: "Showcase our new summer skincare routine for glowing skin",
      platform: "instagram",
      niche: "Beauty",
      payoutRange: "₹8,000 - ₹15,000",
      campaignType: "paid",
      deadline: "2024-01-15",
      daysLeft: 12,
      region: "Pan India",
      language: "English",
      requiredFollowers: "10K+",
      tags: ["#skincare", "#summer", "#glow"],
      requirements:
        "Must have beauty/skincare content, 10K+ followers, good engagement rate",
      isRecommended: true,
      isTrending: true,
      applications: 45,
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Fitness Challenge Campaign",
      brand: "FitLife Pro",
      brandLogo:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
      description:
        "30-day fitness transformation challenge with our supplements",
      platform: "youtube",
      niche: "Fitness",
      payoutRange: "₹12,000 - ₹25,000",
      campaignType: "hybrid",
      deadline: "2024-01-20",
      daysLeft: 17,
      region: "Mumbai",
      language: "Hindi",
      requiredFollowers: "25K+",
      tags: ["#fitness", "#challenge", "#transformation"],
      requirements: "Fitness content creators, 25K+ subscribers, video format",
      isRecommended: false,
      isTrending: true,
      applications: 23,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Tech Product Review - Smartphone",
      brand: "TechNova",
      brandLogo:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=100&h=100&fit=crop",
      description: "Detailed review of our latest flagship smartphone",
      platform: "youtube",
      niche: "Tech",
      payoutRange: "₹20,000 - ₹40,000",
      campaignType: "paid",
      deadline: "2024-01-25",
      daysLeft: 22,
      region: "Bangalore",
      language: "English",
      requiredFollowers: "50K+",
      tags: ["#tech", "#smartphone", "#review"],
      requirements: "Tech reviewers, 50K+ subscribers, detailed video reviews",
      isRecommended: true,
      isTrending: false,
      applications: 67,
      image:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Fashion Week Collection Showcase",
      brand: "StyleHub",
      brandLogo:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop",
      description: "Feature our latest fashion week collection in your content",
      platform: "instagram",
      niche: "Fashion",
      payoutRange: "₹5,000 - ₹12,000",
      campaignType: "barter",
      deadline: "2024-01-18",
      daysLeft: 15,
      region: "Delhi",
      language: "Hindi",
      requiredFollowers: "15K+",
      tags: ["#fashion", "#style", "#ootd"],
      requirements: "Fashion influencers, good aesthetic, 15K+ followers",
      isRecommended: false,
      isTrending: true,
      applications: 89,
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "Food Recipe Challenge",
      brand: "SpiceMaster",
      brandLogo:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop",
      description: "Create unique recipes using our spice collection",
      platform: "instagram",
      niche: "Food",
      payoutRange: "₹6,000 - ₹10,000",
      campaignType: "paid",
      deadline: "2024-01-30",
      daysLeft: 27,
      region: "Chennai",
      language: "Tamil",
      requiredFollowers: "8K+",
      tags: ["#food", "#recipe", "#spices"],
      requirements: "Food content creators, recipe videos, 8K+ followers",
      isRecommended: true,
      isTrending: false,
      applications: 34,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      title: "Travel Destination Feature",
      brand: "WanderLust Travel",
      brandLogo:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=100&fit=crop",
      description: "Showcase beautiful travel destinations in India",
      platform: "instagram",
      niche: "Travel",
      payoutRange: "₹15,000 - ₹30,000",
      campaignType: "hybrid",
      deadline: "2024-02-05",
      daysLeft: 33,
      region: "Pan India",
      language: "English",
      requiredFollowers: "30K+",
      tags: ["#travel", "#wanderlust", "#india"],
      requirements: "Travel influencers, high-quality photos, 30K+ followers",
      isRecommended: false,
      isTrending: true,
      applications: 156,
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    },
  ];

  /**
   * Load campaigns from API
   * Should include pagination, filtering, and sorting
   */
  useEffect(() => {
    const loadCampaigns = async () => {
      setLoading(true);
      try {
        // {{Dynamic}} - Replace with actual API call
        // const response = await api.get('/api/creator/campaigns/available')
        // setCampaigns(response.data.campaigns)

        // Mock data for demo
        setTimeout(() => {
          setCampaigns(mockCampaigns);
          setFilteredCampaigns(mockCampaigns);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to load campaigns:", error);
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  /**
   * Apply filters and search
   * This should call the API with filter parameters
   */
  const applyFilters = async () => {
    setLoading(true);

    try {
      // {{Dynamic}} - Replace with actual API call
      // const response = await api.post('/api/creator/campaigns/search', {
      //   search: searchQuery,
      //   filters: filters
      // })

      // Mock filtering logic for demo
      let filtered = campaigns.filter((campaign) => {
        // Search query filter
        if (searchQuery) {
          const searchLower = searchQuery.toLowerCase();
          const matchesSearch =
            campaign.title.toLowerCase().includes(searchLower) ||
            campaign.brand.toLowerCase().includes(searchLower) ||
            campaign.niche.toLowerCase().includes(searchLower) ||
            campaign.description.toLowerCase().includes(searchLower);

          if (!matchesSearch) return false;
        }

        // Platform filter
        if (
          filters.platforms.length > 0 &&
          !filters.platforms.includes(campaign.platform)
        ) {
          return false;
        }

        // Niche filter
        if (
          filters.niches.length > 0 &&
          !filters.niches.includes(campaign.niche)
        ) {
          return false;
        }

        // Campaign type filter
        if (
          filters.campaignTypes.length > 0 &&
          !filters.campaignTypes.includes(campaign.campaignType)
        ) {
          return false;
        }

        // Region filter
        if (
          filters.regions.length > 0 &&
          !filters.regions.includes(campaign.region)
        ) {
          return false;
        }

        // Language filter
        if (
          filters.languages.length > 0 &&
          !filters.languages.includes(campaign.language)
        ) {
          return false;
        }

        return true;
      });

      // Apply sorting
      switch (filters.sortBy) {
        case "ending_soon":
          filtered.sort((a, b) => a.daysLeft - b.daysLeft);
          break;
        case "highest_payout":
          filtered.sort((a, b) => {
            const aMax = parseInt(
              a.payoutRange
                .match(/₹[\d,]+ - ₹([\d,]+)/)?.[1]
                ?.replace(",", "") || "0",
            );
            const bMax = parseInt(
              b.payoutRange
                .match(/₹[\d,]+ - ₹([\d,]+)/)?.[1]
                ?.replace(",", "") || "0",
            );
            return bMax - aMax;
          });
          break;
        case "newest":
          filtered.sort((a, b) => b.id - a.id);
          break;
        case "best_match":
          filtered.sort(
            (a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0),
          );
          break;
        case "trending":
        default:
          filtered.sort(
            (a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0),
          );
          break;
      }

      setFilteredCampaigns(filtered);
    } catch (error) {
      console.error("Failed to filter campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear all filters and reset to default view
   */
  const clearAllFilters = () => {
    setSearchQuery("");
    setFilters({
      platforms: [],
      niches: [],
      languages: [],
      campaignTypes: [],
      followerRange: [1000, 1000000],
      regions: [],
      sortBy: "trending",
    });
    setFilteredCampaigns(campaigns);
    setAppliedFiltersCount(0);
  };

  /**
   * Count applied filters for badge display
   */
  useEffect(() => {
    const count =
      filters.platforms.length +
      filters.niches.length +
      filters.languages.length +
      filters.campaignTypes.length +
      filters.regions.length +
      (searchQuery ? 1 : 0);

    setAppliedFiltersCount(count);
  }, [filters, searchQuery]);

  /**
   * Handle campaign application
   * Should open modal or navigate to application form
   */
  const handleApplyToCampaign = async (campaignId) => {
    try {
      // {{Dynamic}} - Call API to apply to campaign
      // await api.post(`/api/creator/campaigns/${campaignId}/apply`)
      console.log("Applying to campaign:", campaignId);
      // Show success message or open application modal
    } catch (error) {
      console.error("Failed to apply to campaign:", error);
    }
  };

  /**
   * Handle save campaign for later
   */
  const handleSaveCampaign = async (campaignId) => {
    try {
      // {{Dynamic}} - Call API to save campaign
      // await api.post(`/api/creator/campaigns/${campaignId}/save`)
      console.log("Saving campaign:", campaignId);
      // Show success message
    } catch (error) {
      console.error("Failed to save campaign:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover Campaigns
          </h1>
          <p className="text-gray-300 text-lg">
            Find the perfect brand collaborations that match your content and
            audience
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="sticky top-20 z-40 bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns, brands, niches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 relative"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {appliedFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {appliedFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                }
                className="appearance-none bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {filterOptions.sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={applyFilters}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
            >
              Search
            </button>

            {/* Clear Filters */}
            {appliedFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                <X className="h-4 w-4" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 pt-6 border-t border-gray-700 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Platform Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Platform
                    </label>
                    <div className="space-y-2">
                      {filterOptions.platforms.map((platform) => {
                        const Icon = platform.icon;
                        return (
                          <label
                            key={platform.id}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={filters.platforms.includes(platform.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilters((prev) => ({
                                    ...prev,
                                    platforms: [...prev.platforms, platform.id],
                                  }));
                                } else {
                                  setFilters((prev) => ({
                                    ...prev,
                                    platforms: prev.platforms.filter(
                                      (p) => p !== platform.id,
                                    ),
                                  }));
                                }
                              }}
                              className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <Icon className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300">
                              {platform.name}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Niche Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Niche
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filterOptions.niches.map((niche) => (
                        <label
                          key={niche}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.niches.includes(niche)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  niches: [...prev.niches, niche],
                                }));
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  niches: prev.niches.filter(
                                    (n) => n !== niche,
                                  ),
                                }));
                              }
                            }}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-gray-300">{niche}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Campaign Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Campaign Type
                    </label>
                    <div className="space-y-2">
                      {filterOptions.campaignTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <label
                            key={type.id}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={filters.campaignTypes.includes(type.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilters((prev) => ({
                                    ...prev,
                                    campaignTypes: [
                                      ...prev.campaignTypes,
                                      type.id,
                                    ],
                                  }));
                                } else {
                                  setFilters((prev) => ({
                                    ...prev,
                                    campaignTypes: prev.campaignTypes.filter(
                                      (t) => t !== type.id,
                                    ),
                                  }));
                                }
                              }}
                              className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <Icon className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300">{type.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Language Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Language
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filterOptions.languages.map((language) => (
                        <label
                          key={language}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.languages.includes(language)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  languages: [...prev.languages, language],
                                }));
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  languages: prev.languages.filter(
                                    (l) => l !== language,
                                  ),
                                }));
                              }
                            }}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-gray-300">{language}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Region Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Region
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filterOptions.regions.map((region) => (
                        <label
                          key={region}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.regions.includes(region)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  regions: [...prev.regions, region],
                                }));
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  regions: prev.regions.filter(
                                    (r) => r !== region,
                                  ),
                                }));
                              }
                            }}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-gray-300">{region}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-300">
            {loading
              ? "Loading..."
              : `${filteredCampaigns.length} campaigns found`}
          </p>

          {/* Recommended Section Toggle */}
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium">
              Recommended for You
            </span>
          </div>
        </div>

        {/* Campaign Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-2xl p-6 animate-pulse"
              >
                <div className="h-48 bg-slate-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group"
              >
                {/* Campaign Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex space-x-2">
                    {campaign.isRecommended && (
                      <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-medium rounded-full">
                        🎯 Recommended
                      </span>
                    )}
                    {campaign.isTrending && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        🔥 Trending
                      </span>
                    )}
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={() => handleSaveCampaign(campaign.id)}
                    className="absolute top-3 right-3 p-2 bg-slate-900/50 backdrop-blur-sm rounded-full text-white hover:bg-slate-900/70 transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                  </button>

                  {/* Deadline Countdown */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded text-white text-xs">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {campaign.daysLeft} days left
                  </div>
                </div>

                {/* Campaign Content */}
                <div className="p-6">
                  {/* Brand Info */}
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={campaign.brandLogo}
                      alt={campaign.brand}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-indigo-400 font-medium">
                      {campaign.brand}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {campaign.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>

                  {/* Platform & Niche */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {campaign.platform === "instagram" && (
                        <Instagram className="h-4 w-4 text-pink-500" />
                      )}
                      {campaign.platform === "youtube" && (
                        <Youtube className="h-4 w-4 text-red-500" />
                      )}
                      {campaign.platform === "tiktok" && (
                        <Music className="h-4 w-4 text-purple-500" />
                      )}
                      <span className="text-gray-400 text-sm capitalize">
                        {campaign.platform}
                      </span>
                    </div>
                    <span className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded">
                      {campaign.niche}
                    </span>
                  </div>

                  {/* Payout */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-semibold">
                        {campaign.payoutRange}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{campaign.applications} applied</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {campaign.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-indigo-900/30 text-indigo-400 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Requirements */}
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                    {campaign.requirements}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleApplyToCampaign(campaign.id)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Target className="h-4 w-4" />
                      <span>Apply Now</span>
                    </motion.button>

                    <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-slate-700 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredCampaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Search className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No campaigns found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or clearing some filters
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
