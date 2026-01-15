/**
 * Mock Data for Influbazzar Creator Dashboard
 *
 * This file contains all mock data used throughout the Creator journey.
 * It's structured to mirror the expected API responses from the backend.
 *
 * Backend Integration Notes:
 * - Replace all mock data with actual API calls
 * - Each data structure represents expected JSON response format
 * - {{Dynamic}} markers indicate where real-time data should be fetched
 *
 * API Endpoints Structure:
 * - GET /api/creator/stats - Dashboard statistics
 * - GET /api/creator/campaigns - Campaign data with filters
 * - GET /api/creator/earnings - Earnings and payout information
 * - GET /api/creator/analytics - Performance analytics data
 * - GET /api/creator/profile - Creator profile information
 * - GET /api/creator/notifications - Real-time notifications
 */

// {{Dynamic}} - Replace with actual user data from GET /api/creator/profile
export const creatorProfile = {
  id: "creator_ajay_123",
  firstName: "Ajay",
  lastName: "Kumar",
  username: "@ajay_creates",
  email: "ajay@example.com",
  phone: "+91 98765 43210",
  bio: "Content creator passionate about tech, lifestyle, and authentic storytelling. Building communities through engaging content.",
  avatar: "/api/uploads/avatars/ajay_profile.jpg",
  coverImage: "/api/uploads/covers/ajay_cover.jpg",
  location: "Mumbai, Maharashtra",
  dateOfBirth: "1995-08-15",
  joinedDate: "2023-01-15",
  isVerified: true,
  influbazzarScore: 84,

  // Social Platform Data - {{Dynamic}} from platform APIs
  platforms: {
    instagram: {
      handle: "@ajay_creates",
      followers: 45000,
      avgEngagement: 8.5,
      verified: true,
      lastSync: "2024-01-15T10:30:00Z",
    },
    youtube: {
      handle: "AjayCreates",
      subscribers: 12000,
      avgViews: 5000,
      verified: false,
      lastSync: "2024-01-15T10:30:00Z",
    },
    tiktok: {
      handle: "@ajay_creates",
      followers: 25000,
      avgEngagement: 12.3,
      verified: false,
      lastSync: "2024-01-15T10:30:00Z",
    },
  },

  // Content Preferences
  niches: ["Technology", "Lifestyle", "Travel", "Fashion"],
  languages: ["Hindi", "English", "Marathi"],
  contentTypes: ["Reels", "Stories", "Posts", "Videos"],

  // Monetization Settings
  paymentMethods: [
    { type: "UPI", identifier: "ajay@paytm", isPrimary: true },
    {
      type: "Bank",
      accountNumber: "****1234",
      ifsc: "HDFC0001234",
      isPrimary: false,
    },
  ],
  gstNumber: "27AAAAA0000A1Z5",
  panNumber: "AAAAA0000A",
};

// {{Dynamic}} - Replace with GET /api/creator/stats?period=current
export const dashboardStats = {
  influbazzarScore: {
    current: 84,
    change: +5,
    breakdown: {
      contentQuality: 90,
      engagement: 85,
      reliability: 88,
      growth: 75,
      professionalismScore: 82,
    },
    lastUpdated: "2024-01-15T08:00:00Z",
  },

  totalEarnings: {
    amount: 45670,
    currency: "INR",
    change: +12.5,
    periodComparison: "vs last month",
  },

  activeCampaigns: {
    count: 3,
    change: +1,
    details: {
      approved: 3,
      submitted: 2,
      underReview: 1,
    },
  },

  approvalRate: {
    percentage: 92,
    change: +2.1,
    totalApplications: 25,
    approvedApplications: 23,
  },

  avgEngagement: {
    percentage: 8.5,
    change: +0.3,
    platforms: {
      instagram: 8.2,
      youtube: 7.8,
      tiktok: 9.1,
    },
  },

  followerGrowth: {
    total: 82000,
    monthlyGrowth: 2500,
    growthRate: 3.2,
  },
};

// {{Dynamic}} - Replace with GET /api/creator/notifications?limit=20
export const notifications = [
  {
    id: "notif_001",
    type: "campaign_approval",
    title: "Campaign Approved! 🎉",
    message:
      "Your application for #GlowFix campaign has been approved by Mamaearth",
    timestamp: "2024-01-15T14:30:00Z",
    isRead: false,
    actionUrl: "/creator/my-campaigns/glowfix_001",
    icon: "✅",
    priority: "high",
  },
  {
    id: "notif_002",
    type: "payout_released",
    title: "Payment Released 💸",
    message: "Escrow payout of ₹1,500 has been released for #GlowFix campaign",
    timestamp: "2024-01-15T12:15:00Z",
    isRead: false,
    actionUrl: "/creator/earnings",
    icon: "💰",
    priority: "medium",
  },
  {
    id: "notif_003",
    type: "campaign_invite",
    title: "New Campaign Invitation",
    message: "UrbanCompany invites you to apply for #UrbanOnCampus campaign",
    timestamp: "2024-01-15T10:45:00Z",
    isRead: true,
    actionUrl: "/creator/discover-campaigns/urban_campus_001",
    icon: "📢",
    priority: "medium",
  },
  {
    id: "notif_004",
    type: "content_feedback",
    title: "Content Feedback Received",
    message: "Mamaearth has provided feedback on your submitted content",
    timestamp: "2024-01-14T16:20:00Z",
    isRead: true,
    actionUrl: "/creator/my-campaigns/glowfix_001",
    icon: "💬",
    priority: "low",
  },
  {
    id: "notif_005",
    type: "score_update",
    title: "Influbazzar Score Updated",
    message: "Your score increased by 5 points! Current score: 84",
    timestamp: "2024-01-14T09:00:00Z",
    isRead: true,
    actionUrl: "/creator/analytics",
    icon: "📈",
    priority: "low",
  },
];

// {{Dynamic}} - Replace with GET /api/campaigns?status=available&creatorId=userId
export const availableCampaigns = [
  {
    id: "camp_urban_001",
    title: "#UrbanOnCampus - Student Life Content",
    brand: {
      id: "brand_urban_001",
      name: "UrbanCompany",
      logo: "/api/uploads/brands/urban_logo.jpg",
      verified: true,
      rating: 4.8,
    },
    description:
      "Create engaging content showcasing urban lifestyle for college students",
    budget: {
      min: 2000,
      max: 5000,
      currency: "INR",
      type: "per_post",
    },
    requirements: {
      platforms: ["Instagram", "YouTube"],
      contentTypes: ["Reels", "Stories"],
      followers: { min: 10000, max: 100000 },
      age: { min: 18, max: 28 },
      location: ["Mumbai", "Delhi", "Bangalore"],
    },
    timeline: {
      applicationDeadline: "2024-01-25T23:59:59Z",
      contentDeadline: "2024-02-05T23:59:59Z",
      campaignStart: "2024-01-20T00:00:00Z",
      campaignEnd: "2024-02-10T23:59:59Z",
    },
    tags: ["Lifestyle", "Student", "Urban", "College"],
    eligibilityScore: 89,
    applicationsCount: 142,
    isEligible: true,
    hasApplied: false,
    isFeatured: true,
    priority: "high",
  },
  {
    id: "camp_skincare_002",
    title: "#GlowUp2024 - Skincare Routine",
    brand: {
      id: "brand_mama_001",
      name: "Mamaearth",
      logo: "/api/uploads/brands/mamaearth_logo.jpg",
      verified: true,
      rating: 4.9,
    },
    description:
      "Showcase your daily skincare routine using Mamaearth products",
    budget: {
      min: 3000,
      max: 7000,
      currency: "INR",
      type: "per_post",
    },
    requirements: {
      platforms: ["Instagram", "TikTok"],
      contentTypes: ["Reels", "Posts"],
      followers: { min: 20000, max: 200000 },
      age: { min: 20, max: 35 },
      location: ["Pan India"],
    },
    timeline: {
      applicationDeadline: "2024-01-30T23:59:59Z",
      contentDeadline: "2024-02-15T23:59:59Z",
      campaignStart: "2024-02-01T00:00:00Z",
      campaignEnd: "2024-02-20T23:59:59Z",
    },
    tags: ["Beauty", "Skincare", "Wellness", "Routine"],
    eligibilityScore: 95,
    applicationsCount: 89,
    isEligible: true,
    hasApplied: false,
    isFeatured: false,
    priority: "medium",
  },
  {
    id: "camp_fitness_003",
    title: "#FitLife - Home Workout Challenge",
    brand: {
      id: "brand_cult_001",
      name: "Cult.fit",
      logo: "/api/uploads/brands/cult_logo.jpg",
      verified: true,
      rating: 4.7,
    },
    description: "Create motivational fitness content for home workouts",
    budget: {
      min: 1500,
      max: 4000,
      currency: "INR",
      type: "per_post",
    },
    requirements: {
      platforms: ["Instagram", "YouTube"],
      contentTypes: ["Reels", "Videos", "Stories"],
      followers: { min: 15000, max: 150000 },
      age: { min: 22, max: 40 },
      location: ["Metro Cities"],
    },
    timeline: {
      applicationDeadline: "2024-02-05T23:59:59Z",
      contentDeadline: "2024-02-25T23:59:59Z",
      campaignStart: "2024-02-10T00:00:00Z",
      campaignEnd: "2024-03-01T23:59:59Z",
    },
    tags: ["Fitness", "Health", "Motivation", "Challenge"],
    eligibilityScore: 78,
    applicationsCount: 234,
    isEligible: true,
    hasApplied: false,
    isFeatured: false,
    priority: "low",
  },
];

// {{Dynamic}} - Replace with GET /api/creator/campaigns?status=all
export const myCampaigns = [
  {
    id: "camp_glowfix_001",
    title: "#GlowFix - Daily Skincare",
    brand: {
      name: "Mamaearth",
      logo: "/api/uploads/brands/mamaearth_logo.jpg",
    },
    status: "approved",
    payment: {
      amount: 1500,
      currency: "INR",
      status: "escrow",
    },
    timeline: {
      appliedDate: "2024-01-05T10:30:00Z",
      approvedDate: "2024-01-08T14:20:00Z",
      contentDeadline: "2024-01-20T23:59:59Z",
      paymentReleaseDate: "2024-01-25T00:00:00Z",
    },
    deliverables: [
      {
        type: "Instagram Reel",
        status: "submitted",
        submittedDate: "2024-01-15T16:45:00Z",
      },
      {
        type: "Instagram Story",
        status: "approved",
        submittedDate: "2024-01-15T16:45:00Z",
      },
    ],
    platform: "Instagram",
    engagement: {
      views: 12500,
      likes: 850,
      comments: 45,
      shares: 23,
      saves: 67,
    },
  },
  {
    id: "camp_tech_002",
    title: "#TechReview - Smartphone",
    brand: {
      name: "Samsung",
      logo: "/api/uploads/brands/samsung_logo.jpg",
    },
    status: "submitted",
    payment: {
      amount: 2500,
      currency: "INR",
      status: "pending",
    },
    timeline: {
      appliedDate: "2024-01-10T09:15:00Z",
      approvedDate: "2024-01-12T11:30:00Z",
      contentDeadline: "2024-01-22T23:59:59Z",
      paymentReleaseDate: null,
    },
    deliverables: [
      {
        type: "YouTube Video",
        status: "submitted",
        submittedDate: "2024-01-18T20:30:00Z",
      },
      { type: "Instagram Post", status: "pending", submittedDate: null },
    ],
    platform: "YouTube",
    engagement: {
      views: 8200,
      likes: 456,
      comments: 78,
      shares: 12,
      subscribersGained: 23,
    },
  },
  {
    id: "camp_fashion_003",
    title: "#WinterStyle - Fashion Haul",
    brand: {
      name: "Myntra",
      logo: "/api/uploads/brands/myntra_logo.jpg",
    },
    status: "paid",
    payment: {
      amount: 3000,
      currency: "INR",
      status: "completed",
    },
    timeline: {
      appliedDate: "2023-12-20T14:20:00Z",
      approvedDate: "2023-12-22T16:45:00Z",
      contentDeadline: "2024-01-05T23:59:59Z",
      paymentReleaseDate: "2024-01-10T12:00:00Z",
    },
    deliverables: [
      {
        type: "Instagram Reel",
        status: "approved",
        submittedDate: "2024-01-03T18:20:00Z",
      },
      {
        type: "Instagram Post",
        status: "approved",
        submittedDate: "2024-01-03T18:20:00Z",
      },
    ],
    platform: "Instagram",
    engagement: {
      views: 25600,
      likes: 1840,
      comments: 156,
      shares: 89,
      saves: 234,
    },
  },
];

// {{Dynamic}} - Replace with GET /api/creator/earnings?period=all
export const earningsData = {
  overview: {
    lifetimeEarnings: 45670,
    monthlyEarnings: 8500,
    pendingPayouts: 4000,
    completedPayouts: 41670,
    avgEarningPerPost: 2100,
    currency: "INR",
  },

  monthlyBreakdown: [
    { month: "2024-01", earnings: 8500, campaigns: 4 },
    { month: "2023-12", earnings: 12200, campaigns: 6 },
    { month: "2023-11", earnings: 6800, campaigns: 3 },
    { month: "2023-10", earnings: 9200, campaigns: 5 },
    { month: "2023-09", earnings: 4900, campaigns: 2 },
    { month: "2023-08", earnings: 4070, campaigns: 2 },
  ],

  brandBreakdown: [
    { brand: "Mamaearth", amount: 12500, campaigns: 5, color: "#10B981" },
    { brand: "Samsung", amount: 8900, campaigns: 3, color: "#3B82F6" },
    { brand: "Myntra", amount: 7800, campaigns: 4, color: "#8B5CF6" },
    { brand: "UrbanCompany", amount: 6200, campaigns: 2, color: "#F59E0B" },
    { brand: "Others", amount: 10270, campaigns: 8, color: "#6B7280" },
  ],

  paymentMethods: [
    { type: "Paid Campaigns", amount: 38200, percentage: 84 },
    { type: "Barter Deals", amount: 5470, percentage: 12 },
    { type: "Bonuses", amount: 2000, percentage: 4 },
  ],

  escrowDetails: [
    {
      id: "escrow_001",
      campaign: "#TechReview - Smartphone",
      brand: "Samsung",
      amount: 2500,
      status: "held",
      releaseDate: "2024-01-25T00:00:00Z",
      daysRemaining: 3,
    },
    {
      id: "escrow_002",
      campaign: "#FashionWeek - Style Guide",
      brand: "Nykaa",
      amount: 1500,
      status: "held",
      releaseDate: "2024-01-30T00:00:00Z",
      daysRemaining: 8,
    },
  ],
};

// {{Dynamic}} - Replace with GET /api/creator/analytics?period=3months
export const analyticsData = {
  engagementTimeline: [
    { date: "2024-01-01", instagram: 8.2, youtube: 7.5, tiktok: 9.1 },
    { date: "2024-01-08", instagram: 8.5, youtube: 7.8, tiktok: 9.3 },
    { date: "2024-01-15", instagram: 8.1, youtube: 8.2, tiktok: 8.9 },
    { date: "2024-01-22", instagram: 8.7, youtube: 8.0, tiktok: 9.5 },
    { date: "2024-01-29", instagram: 8.9, youtube: 8.3, tiktok: 9.2 },
  ],

  platformComparison: {
    instagram: {
      followers: 45000,
      avgEngagement: 8.5,
      growth: "+12%",
      topContent: "Skincare Routine Reel",
    },
    youtube: {
      subscribers: 12000,
      avgEngagement: 8.0,
      growth: "+8%",
      topContent: "Tech Review Video",
    },
    tiktok: {
      followers: 25000,
      avgEngagement: 9.2,
      growth: "+18%",
      topContent: "Dance Challenge",
    },
  },

  contentHeatmap: [
    { hour: 6, day: "Mon", engagement: 2.3 },
    { hour: 7, day: "Mon", engagement: 3.1 },
    { hour: 8, day: "Mon", engagement: 4.2 },
    { hour: 9, day: "Mon", engagement: 6.8 },
    { hour: 18, day: "Mon", engagement: 9.2 },
    { hour: 19, day: "Mon", engagement: 8.7 },
    { hour: 20, day: "Mon", engagement: 7.5 },
    // More data points...
  ],

  audienceBreakdown: {
    age: [
      { range: "18-24", percentage: 35 },
      { range: "25-34", percentage: 42 },
      { range: "35-44", percentage: 18 },
      { range: "45+", percentage: 5 },
    ],
    gender: [
      { type: "Female", percentage: 68 },
      { type: "Male", percentage: 30 },
      { type: "Other", percentage: 2 },
    ],
    geography: [
      { city: "Mumbai", percentage: 22 },
      { city: "Delhi", percentage: 18 },
      { city: "Bangalore", percentage: 15 },
      { city: "Chennai", percentage: 12 },
      { city: "Kolkata", percentage: 10 },
      { city: "Others", percentage: 23 },
    ],
  },
};

// {{Dynamic}} - Replace with GET /api/support/tickets?creatorId=userId
export const supportTickets = [
  {
    id: "ticket_001",
    subject: "Payment not received for completed campaign",
    category: "Payment",
    status: "open",
    priority: "high",
    createdDate: "2024-01-14T10:30:00Z",
    lastUpdated: "2024-01-15T14:20:00Z",
    messages: [
      {
        id: "msg_001",
        sender: "creator",
        message:
          "I completed the #GlowFix campaign 5 days ago but haven't received payment yet.",
        timestamp: "2024-01-14T10:30:00Z",
      },
      {
        id: "msg_002",
        sender: "support",
        message:
          "Hi Ajay, we're looking into your payment issue. The escrow is set to release on Jan 20th.",
        timestamp: "2024-01-15T14:20:00Z",
      },
    ],
  },
  {
    id: "ticket_002",
    subject: "Unable to upload content to campaign",
    category: "Technical",
    status: "resolved",
    priority: "medium",
    createdDate: "2024-01-10T16:45:00Z",
    lastUpdated: "2024-01-11T09:30:00Z",
    messages: [
      {
        id: "msg_003",
        sender: "creator",
        message:
          "Getting error when trying to upload video to Samsung campaign.",
        timestamp: "2024-01-10T16:45:00Z",
      },
      {
        id: "msg_004",
        sender: "support",
        message: "Issue has been resolved. Please try uploading again.",
        timestamp: "2024-01-11T09:30:00Z",
      },
    ],
  },
];

// {{Dynamic}} - Replace with GET /api/content/top-performing?creatorId=userId&limit=6
export const topPerformingContent = [
  {
    id: "content_001",
    title: "Morning Skincare Routine",
    platform: "Instagram",
    type: "Reel",
    thumbnail: "/api/uploads/content/skincare_reel.jpg",
    metrics: {
      views: 25600,
      likes: 1840,
      comments: 156,
      shares: 89,
      saves: 234,
    },
    engagementRate: 9.2,
    campaignId: "camp_glowfix_001",
  },
  {
    id: "content_002",
    title: "Galaxy S24 Review",
    platform: "YouTube",
    type: "Video",
    thumbnail: "/api/uploads/content/galaxy_review.jpg",
    metrics: {
      views: 8200,
      likes: 456,
      comments: 78,
      shares: 12,
      subscribersGained: 23,
    },
    engagementRate: 7.8,
    campaignId: "camp_tech_002",
  },
  {
    id: "content_003",
    title: "Winter Fashion Haul",
    platform: "Instagram",
    type: "Post",
    thumbnail: "/api/uploads/content/fashion_haul.jpg",
    metrics: {
      views: 18900,
      likes: 1245,
      comments: 89,
      shares: 45,
      saves: 178,
    },
    engagementRate: 8.7,
    campaignId: "camp_fashion_003",
  },
];

// {{Dynamic}} - Filter and search configurations for various components
export const filterOptions = {
  campaigns: {
    platforms: ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn"],
    niches: [
      "Technology",
      "Fashion",
      "Beauty",
      "Lifestyle",
      "Travel",
      "Food",
      "Fitness",
      "Gaming",
    ],
    languages: [
      "Hindi",
      "English",
      "Tamil",
      "Telugu",
      "Bengali",
      "Marathi",
      "Gujarati",
    ],
    campaignTypes: ["Paid", "Barter", "Hybrid"],
    regions: [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
    ],
    budgetRanges: [
      { label: "₹1K - ₹5K", min: 1000, max: 5000 },
      { label: "₹5K - ₹10K", min: 5000, max: 10000 },
      { label: "₹10K - ₹25K", min: 10000, max: 25000 },
      { label: "₹25K+", min: 25000, max: null },
    ],
  },

  analytics: {
    periods: ["7d", "30d", "90d", "1y", "all"],
    platforms: ["All", "Instagram", "YouTube", "TikTok"],
    metrics: [
      "Engagement",
      "Reach",
      "Impressions",
      "Saves",
      "Shares",
      "Comments",
    ],
  },
};

export default {
  creatorProfile,
  dashboardStats,
  notifications,
  availableCampaigns,
  myCampaigns,
  earningsData,
  analyticsData,
  supportTickets,
  topPerformingContent,
  filterOptions,
};
