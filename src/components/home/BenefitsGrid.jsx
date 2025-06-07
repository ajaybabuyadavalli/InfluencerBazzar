import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Users,
  BarChart3,
  CreditCard,
  Filter,
} from "lucide-react";

export default function BenefitsGrid() {
  const benefits = [
    {
      category: "For Creators",
      icon: Users,
      color: "from-blue-500 to-cyan-600",
      features: [
        {
          icon: CreditCard,
          title: "Paid + Barter Campaigns",
          description:
            "Choose between monetary payments or product collaborations",
        },
        {
          icon: TrendingUp,
          title: "Dashboard Uploads",
          description: "Easy content submission and tracking system",
        },
        {
          icon: BarChart3,
          title: "Performance Insights",
          description: "Track your engagement and earning analytics",
        },
      ],
    },
    {
      category: "For Brands",
      icon: Shield,
      color: "from-purple-500 to-violet-600",
      features: [
        {
          icon: Filter,
          title: "Advanced Creator Filters",
          description: "Find creators by niche, location, engagement rate",
        },
        {
          icon: Shield,
          title: "Escrow Protection",
          description: "Secure payments released only after content approval",
        },
        {
          icon: TrendingUp,
          title: "Campaign Analytics",
          description: "Real-time tracking of campaign performance",
        },
      ],
    },
    {
      category: "For Agencies",
      icon: BarChart3,
      color: "from-orange-500 to-red-600",
      features: [
        {
          icon: Users,
          title: "Manage 100+ Creators",
          description: "Efficiently handle large rosters of talent",
        },
        {
          icon: BarChart3,
          title: "Export Analytics",
          description: "Comprehensive reporting for all campaigns",
        },
        {
          icon: Shield,
          title: "Private/Public Toggle",
          description: "Control visibility of your creator roster",
        },
      ],
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Platform Benefits
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features designed specifically for each user type
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const CategoryIcon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="h-full p-8 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div
                      className={`inline-flex p-4 bg-gradient-to-r ${benefit.color} rounded-2xl mb-4 shadow-lg`}
                    >
                      <CategoryIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {benefit.category}
                    </h3>
                  </div>

                  {/* Features */}
                  <div className="space-y-6">
                    {benefit.features.map((feature, featureIndex) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: featureIndex * 0.1,
                          }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                        >
                          <div
                            className={`p-2 bg-gradient-to-r ${benefit.color} rounded-lg shadow-md flex-shrink-0`}
                          >
                            <FeatureIcon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <motion.div
                    className="mt-8 text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      className={`w-full py-3 px-6 bg-gradient-to-r ${benefit.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Get Started
                    </button>
                  </motion.div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-5`}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
