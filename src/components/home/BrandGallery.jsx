import { motion } from "framer-motion";
import { Building2, Target, TrendingUp, Users } from "lucide-react";

export default function BrandGallery() {
  const brands = [
    {
      id: 1,
      name: "SkinGlow Pro",
      logo: "SG",
      category: "Beauty & Skincare",
      campaigns: 12,
      budget: "₹2.5L",
      success: "96%",
      description: "Premium skincare brand focusing on natural ingredients",
      color: "from-pink-500 to-rose-600",
      stats: {
        creators: 45,
        engagement: "8.5%",
        reach: "2.3M",
      },
    },
    {
      id: 2,
      name: "FitLife Supplements",
      logo: "FL",
      category: "Health & Fitness",
      campaigns: 8,
      budget: "₹1.8L",
      success: "94%",
      description: "Leading fitness supplement brand for athletes",
      color: "from-green-500 to-emerald-600",
      stats: {
        creators: 32,
        engagement: "9.2%",
        reach: "1.8M",
      },
    },
    {
      id: 3,
      name: "TechnoPhone",
      logo: "TP",
      category: "Technology",
      campaigns: 15,
      budget: "₹3.2L",
      success: "98%",
      description: "Innovative smartphone technology company",
      color: "from-blue-500 to-cyan-600",
      stats: {
        creators: 67,
        engagement: "7.8%",
        reach: "4.1M",
      },
    },
    {
      id: 4,
      name: "StyleHub",
      logo: "SH",
      category: "Fashion",
      campaigns: 10,
      budget: "₹2.1L",
      success: "92%",
      description: "Trendy fashion brand for young professionals",
      color: "from-purple-500 to-violet-600",
      stats: {
        creators: 38,
        engagement: "6.9%",
        reach: "2.7M",
      },
    },
    {
      id: 5,
      name: "EcoHome",
      logo: "EH",
      category: "Lifestyle",
      campaigns: 6,
      budget: "₹1.2L",
      success: "89%",
      description: "Sustainable home products and eco-friendly living",
      color: "from-green-600 to-teal-600",
      stats: {
        creators: 25,
        engagement: "8.1%",
        reach: "1.5M",
      },
    },
    {
      id: 6,
      name: "FoodieDelight",
      logo: "FD",
      category: "Food & Beverage",
      campaigns: 9,
      budget: "₹1.9L",
      success: "95%",
      description: "Gourmet food products and culinary experiences",
      color: "from-orange-500 to-red-600",
      stats: {
        creators: 42,
        engagement: "9.7%",
        reach: "2.9M",
      },
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center space-x-3">
            <Building2 className="h-8 w-8 text-indigo-600" />
            <span>Live Brand Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Partner with top brands and discover exciting campaign opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                {/* Header */}
                <div
                  className={`relative p-6 bg-gradient-to-br ${brand.color} text-white`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl font-bold">
                      {brand.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{brand.name}</h3>
                      <p className="text-sm opacity-90">{brand.category}</p>
                    </div>
                  </div>

                  <p className="text-sm opacity-90 leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Success Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                      {brand.success} Success
                    </div>
                  </div>
                </div>

                {/* Campaign Stats */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Target className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {brand.campaigns}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Campaigns
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {brand.stats.creators}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Creators
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {brand.stats.reach}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Total Reach
                      </div>
                    </div>
                  </div>

                  {/* Budget & Engagement */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Total Budget
                      </span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {brand.budget}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Avg. Engagement
                      </span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {brand.stats.engagement}
                      </span>
                    </div>
                  </div>

                  {/* Active Campaign Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2 mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700"
                  >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                      {Math.floor(Math.random() * 5) + 1} Active Campaigns
                    </span>
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 bg-gradient-to-r ${brand.color} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      View Campaigns
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
                    >
                      Follow Brand
                    </motion.button>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${brand.color} opacity-0 group-hover:opacity-5`}
                    initial={false}
                    whileHover={{
                      scale: [1, 1.1],
                      opacity: [0, 0.05, 0],
                    }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                100+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Partner Brands
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                ₹15Cr+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Total Budget
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                500+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Active Campaigns
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-400">
                Success Rate
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            See All Campaigns
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
