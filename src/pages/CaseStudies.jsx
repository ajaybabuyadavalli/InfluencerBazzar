import { useState } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  Eye,
  Heart,
  Share2,
  TrendingUp,
  Users,
  Target,
  Hash,
} from "lucide-react";

export default function CaseStudies() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Campaigns" },
    { id: "beauty", label: "Beauty & Skincare" },
    { id: "fitness", label: "Fitness & Health" },
    { id: "fashion", label: "Fashion & Lifestyle" },
    { id: "tech", label: "Technology" },
    { id: "food", label: "Food & Beverage" },
  ];

  const sizeFilters = [
    { id: "micro", label: "Micro Influencers (1K-100K)" },
    { id: "macro", label: "Macro Influencers (100K+)" },
  ];

  const caseStudies = [
    {
      id: 1,
      hashtag: "#BareGlowRoutine",
      title: "Boosted sales 2.5x with 20+ micro creators",
      brand: "SkinGlow Pro",
      brandLogo: "SG",
      category: "beauty",
      size: "micro",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop",
      creator: {
        name: "Rhea Kapoor",
        followers: "8.2K",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b3da?w=100&h=100&fit=crop&crop=face",
      },
      metrics: {
        reach: "250K",
        engagement: "12.5%",
        conversions: "1,240",
        roi: "285%",
        duration: "14 days",
        ctr: "8.2%",
      },
      description:
        "A comprehensive skincare campaign targeting young professionals with authentic morning and evening skincare routines.",
      challenge:
        "SkinGlow Pro wanted to increase brand awareness among working women aged 22-35 and establish credibility in the competitive skincare market.",
      solution:
        "We partnered with 20+ micro-creators who documented their authentic 30-day skincare journey using SkinGlow Pro products.",
      results: [
        "Generated 250K+ impressions across platforms",
        "Achieved 285% ROI within 2 weeks",
        "Increased website traffic by 180%",
        "Built a community of 5K+ engaged followers",
      ],
      color: "from-pink-500 to-rose-600",
    },
    {
      id: 2,
      hashtag: "#FitLifeChallenge",
      title: "Generated 50K+ video views in 7 days",
      brand: "FitLife Supplements",
      brandLogo: "FL",
      category: "fitness",
      size: "micro",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      creator: {
        name: "Arjun Fitness",
        followers: "15.3K",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      metrics: {
        reach: "180K",
        engagement: "9.8%",
        conversions: "892",
        roi: "195%",
        duration: "7 days",
        ctr: "6.7%",
      },
      description:
        "High-energy fitness challenge campaign promoting pre-workout supplements through workout videos and transformation stories.",
      challenge:
        "FitLife needed to demonstrate product effectiveness and build trust with fitness enthusiasts in a saturated supplement market.",
      solution:
        "Created a 7-day fitness challenge where creators showcased their workouts, energy levels, and results using FitLife supplements.",
      results: [
        "Reached 180K+ fitness enthusiasts",
        "Generated 50K+ video views",
        "Achieved 195% ROI in just 7 days",
        "Increased supplement sales by 150%",
      ],
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 3,
      hashtag: "#TechReviewHub",
      title: "Achieved 95% positive sentiment across reviews",
      brand: "TechnoPhone",
      brandLogo: "TP",
      category: "tech",
      size: "macro",
      image:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=400&fit=crop",
      creator: {
        name: "Tech Guru Amit",
        followers: "125.7K",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      },
      metrics: {
        reach: "420K",
        engagement: "8.9%",
        conversions: "2,150",
        roi: "340%",
        duration: "21 days",
        ctr: "7.1%",
      },
      description:
        "Comprehensive smartphone review campaign showcasing features, performance, and real-world usage scenarios.",
      challenge:
        "TechnoPhone needed to establish credibility for their new flagship smartphone in a competitive tech market dominated by established brands.",
      solution:
        "Collaborated with tech reviewers to create detailed, unbiased reviews covering performance, camera quality, and user experience.",
      results: [
        "Reached 420K+ tech enthusiasts",
        "Achieved 95% positive sentiment",
        "340% ROI with 2,150+ conversions",
        "Pre-orders increased by 220%",
      ],
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 4,
      hashtag: "#StyleEvolution",
      title: "Increased brand awareness by 180% in metros",
      brand: "StyleHub",
      brandLogo: "SH",
      category: "fashion",
      size: "macro",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
      creator: {
        name: "Fashion Diva",
        followers: "89.1K",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      },
      metrics: {
        reach: "680K",
        engagement: "11.2%",
        conversions: "3,240",
        roi: "420%",
        duration: "30 days",
        ctr: "9.4%",
      },
      description:
        "Month-long fashion campaign showcasing versatile styling options for working professionals.",
      challenge:
        "StyleHub wanted to position itself as the go-to brand for professional fashion among young working women in metro cities.",
      solution:
        "Created 30-day style transformation series with fashion influencers showcasing office-to-evening looks.",
      results: [
        "Reached 680K+ fashion enthusiasts",
        "Increased brand awareness by 180%",
        "Achieved record 420% ROI",
        "Generated 3,240+ sales",
      ],
      color: "from-purple-500 to-violet-600",
    },
    {
      id: 5,
      hashtag: "#FoodieDelight",
      title: "Created viral recipe series with 2M+ views",
      brand: "Spice Masters",
      brandLogo: "SM",
      category: "food",
      size: "micro",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      creator: {
        name: "Chef Priya",
        followers: "45.8K",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b3da?w=100&h=100&fit=crop&crop=face",
      },
      metrics: {
        reach: "2.1M",
        engagement: "15.3%",
        conversions: "4,500",
        roi: "380%",
        duration: "21 days",
        ctr: "12.1%",
      },
      description:
        "Authentic Indian recipe series featuring traditional spice blends and modern cooking techniques.",
      challenge:
        "Spice Masters needed to differentiate their products in the crowded spice market and connect with home cooking enthusiasts.",
      solution:
        "Collaborated with food creators to develop easy-to-follow recipe series using Spice Masters products.",
      results: [
        "Generated 2.1M+ video views",
        "Created viral #FoodieDelight trend",
        "Achieved 380% ROI",
        "Increased online sales by 250%",
      ],
      color: "from-orange-500 to-red-600",
    },
    {
      id: 6,
      hashtag: "#CodeWithTech",
      title: "Reached 500K+ developers with coding tutorials",
      brand: "DevTools Pro",
      brandLogo: "DT",
      category: "tech",
      size: "macro",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      creator: {
        name: "CodeMaster Raj",
        followers: "98.5K",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      metrics: {
        reach: "520K",
        engagement: "13.7%",
        conversions: "1,890",
        roi: "290%",
        duration: "28 days",
        ctr: "8.9%",
      },
      description:
        "Educational coding tutorial series demonstrating advanced development tools and best practices.",
      challenge:
        "DevTools Pro wanted to establish authority in the developer tools space and increase adoption among professional developers.",
      solution:
        "Created comprehensive tutorial series showing real-world applications of DevTools Pro in various development scenarios.",
      results: [
        "Reached 520K+ developers",
        "Generated 13.7% engagement rate",
        "Achieved 290% ROI",
        "Increased tool adoption by 180%",
      ],
      color: "from-indigo-500 to-purple-600",
    },
  ];

  const filteredCaseStudies = caseStudies.filter((study) => {
    if (selectedFilter === "all") return true;
    return study.category === selectedFilter;
  });

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Campaign Case Studies
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Real campaigns, real results. Discover how brands and creators are
              achieving exceptional success on Influbazzar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCaseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.hashtag}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${study.color} opacity-20`}
                  ></div>

                  {/* Hashtag Overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                      <Hash className="h-4 w-4 text-gray-700" />
                      <span className="font-bold text-gray-900">
                        {study.hashtag}
                      </span>
                    </div>
                  </div>

                  {/* Brand Logo */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${study.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
                    >
                      {study.brandLogo}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {study.title}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
                    Campaign by {study.brand}
                  </p>

                  {/* Creator Info */}
                  <div className="flex items-center space-x-3 mb-6">
                    <img
                      src={study.creator.avatar}
                      alt={study.creator.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {study.creator.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {study.creator.followers} followers
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Eye className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                      <div className="font-bold text-blue-600 dark:text-blue-400">
                        {study.metrics.reach}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Reach
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
                      <div className="font-bold text-green-600 dark:text-green-400">
                        {study.metrics.roi}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        ROI
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {study.description}
                  </p>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="text-center p-2 bg-gray-50 dark:bg-slate-700 rounded">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {study.metrics.engagement}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Engagement
                      </div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-slate-700 rounded">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {study.metrics.conversions}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Conversions
                      </div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-slate-700 rounded">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {study.metrics.duration}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Duration
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 bg-gradient-to-r ${study.color} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    View Full Case Study
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overall Stats */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Campaign Performance Overview
            </h2>
            <p className="text-xl opacity-90">
              Aggregate results from successful campaigns on our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { metric: "5.2M+", label: "Total Reach", icon: Eye },
              { metric: "11.2%", label: "Avg Engagement", icon: Heart },
              { metric: "295%", label: "Avg ROI", icon: TrendingUp },
              { metric: "98%", label: "Success Rate", icon: Target },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Icon className="h-12 w-12 mx-auto mb-4 opacity-80" />
                  <div className="text-4xl font-bold mb-2">{stat.metric}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 text-center shadow-xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Want Your Campaign Featured?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful brands and creators. Start your next
              campaign and achieve exceptional results with authentic
              partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Launch Campaign
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                Browse Opportunities
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
