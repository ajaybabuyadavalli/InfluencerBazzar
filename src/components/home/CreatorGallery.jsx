import { motion } from "framer-motion";
import { Users, Eye, Heart, MessageCircle, ExternalLink } from "lucide-react";

export default function CreatorGallery() {
  const creators = [
    {
      id: 1,
      name: "Priya Sharma",
      category: "Beauty & Skincare",
      followers: "125K",
      engagement: "8.2%",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b3da?w=150&h=150&fit=crop&crop=face",
      location: "Mumbai, Maharashtra",
      languages: ["Hindi", "English"],
      rate: "₹5K-15K",
      verified: true,
      tags: ["Skincare", "Makeup", "Beauty Tips"],
    },
    {
      id: 2,
      name: "Rahul Kumar",
      category: "Fitness & Health",
      followers: "89K",
      engagement: "9.1%",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "Delhi, India",
      languages: ["Hindi", "English"],
      rate: "₹3K-12K",
      verified: true,
      tags: ["Fitness", "Nutrition", "Wellness"],
    },
    {
      id: 3,
      name: "Sneha Patel",
      category: "Fashion & Lifestyle",
      followers: "203K",
      engagement: "6.9%",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      location: "Bangalore, Karnataka",
      languages: ["English", "Kannada"],
      rate: "₹8K-25K",
      verified: true,
      tags: ["Fashion", "Lifestyle", "Travel"],
    },
    {
      id: 4,
      name: "Amit Singh",
      category: "Technology",
      followers: "156K",
      engagement: "7.8%",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: "Hyderabad, Telangana",
      languages: ["English", "Telugu"],
      rate: "₹10K-30K",
      verified: true,
      tags: ["Tech Reviews", "Gadgets", "AI"],
    },
    {
      id: 5,
      name: "Kavya Nair",
      category: "Food & Travel",
      followers: "95K",
      engagement: "8.7%",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      location: "Kerala, India",
      languages: ["Malayalam", "English"],
      rate: "₹4K-18K",
      verified: true,
      tags: ["Food", "Travel", "Culture"],
    },
    {
      id: 6,
      name: "Rohan Gupta",
      category: "Finance & Business",
      followers: "78K",
      engagement: "5.9%",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      location: "Pune, Maharashtra",
      languages: ["Hindi", "English"],
      rate: "₹6K-20K",
      verified: true,
      tags: ["Finance", "Investment", "Business"],
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center space-x-3">
            <Users className="h-8 w-8 text-indigo-600" />
            <span>Live Creator Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover verified creators across all niches and platforms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                {/* Header with Avatar */}
                <div className="relative p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-800">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-lg"
                      />
                      {creator.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {creator.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {creator.category}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {creator.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Users className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {creator.followers}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Followers
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Heart className="h-4 w-4 text-pink-600" />
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {creator.engagement}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Engagement
                      </div>
                    </div>
                  </div>

                  {/* Rate */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Rate per post
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {creator.rate}
                      </span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {creator.languages.map((lang, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1">
                      {creator.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Ripple Effect on Hover */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-5"
                    initial={false}
                    whileHover={{
                      scale: [1, 1.2],
                      opacity: [0, 0.05, 0],
                    }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Discover More Creators
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
