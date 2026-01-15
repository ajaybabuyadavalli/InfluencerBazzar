import { motion } from "framer-motion";
import { TrendingUp, Star, DollarSign, Activity } from "lucide-react";

export default function TrendingSection() {
  const trendingData = [
    {
      title: "Top Creators This Week",
      icon: Star,
      color: "from-yellow-500 to-orange-600",
      items: [
        {
          name: "Priya Sharma",
          category: "Beauty",
          followers: "125K",
          engagement: "8.2%",
        },
        {
          name: "Rahul Fitness",
          category: "Health",
          followers: "89K",
          engagement: "9.1%",
        },
        {
          name: "Tech Guru Amit",
          category: "Technology",
          followers: "156K",
          engagement: "7.8%",
        },
        {
          name: "Fashion Diva",
          category: "Fashion",
          followers: "203K",
          engagement: "6.9%",
        },
      ],
    },
    {
      title: "Highest Paying Campaigns",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      items: [
        {
          brand: "SkinGlow Pro",
          category: "Skincare",
          budget: "₹50K",
          applications: "245",
        },
        {
          brand: "FitLife Supplements",
          category: "Fitness",
          budget: "₹35K",
          applications: "189",
        },
        {
          brand: "TechnoPhone",
          category: "Technology",
          budget: "₹75K",
          applications: "312",
        },
        {
          brand: "StyleHub",
          category: "Fashion",
          budget: "₹40K",
          applications: "156",
        },
      ],
    },
    {
      title: "Most Active Brands",
      icon: Activity,
      color: "from-purple-500 to-violet-600",
      items: [
        {
          brand: "BeautyBrand Co.",
          campaigns: "12",
          budget: "₹2.5L",
          success: "96%",
        },
        {
          brand: "HealthFirst",
          campaigns: "8",
          budget: "₹1.8L",
          success: "94%",
        },
        {
          brand: "TechInnovate",
          campaigns: "15",
          budget: "₹3.2L",
          success: "98%",
        },
        {
          brand: "FashionForward",
          campaigns: "10",
          budget: "₹2.1L",
          success: "92%",
        },
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="h-8 w-8 text-indigo-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Real-Time Trending
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest trends and opportunities in the creator
            economy
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Live updates
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {trendingData.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: sectionIndex * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Header */}
                <div
                  className={`p-6 bg-gradient-to-r ${section.color} text-white`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-6 w-6" />
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-200 group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                #{itemIndex + 1}
                              </span>
                            </div>
                          </div>
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {item.name || item.brand}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {item.category}
                          </p>
                        </div>

                        <div className="text-right">
                          {item.followers && (
                            <>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                {item.followers}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {item.engagement} ER
                              </div>
                            </>
                          )}
                          {item.budget && (
                            <>
                              <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                                {item.budget}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {item.applications} applications
                              </div>
                            </>
                          )}
                          {item.campaigns && (
                            <>
                              <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                {item.campaigns} campaigns
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {item.success} success
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* View More Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full mt-6 py-2 px-4 bg-gradient-to-r ${section.color} text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300`}
                  >
                    View All
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Auto-update Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Updated 2 minutes ago
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
