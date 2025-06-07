import { motion } from "framer-motion";
import { Shield, Star, TrendingUp, Award, CheckCircle } from "lucide-react";

export default function TrustScore() {
  const scoreMetrics = [
    {
      icon: TrendingUp,
      label: "Delivery Rate",
      value: 98,
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Star,
      label: "Engagement %",
      value: 4.8,
      color: "from-yellow-500 to-orange-600",
      isRating: true,
    },
    {
      icon: Award,
      label: "Brand Feedback",
      value: 95,
      color: "from-purple-500 to-violet-600",
    },
  ];

  const achievements = [
    { title: "Verified Creator", icon: CheckCircle, unlocked: true },
    { title: "Top Performer", icon: Award, unlocked: true },
    { title: "Brand Favorite", icon: Star, unlocked: false },
    { title: "Elite Status", icon: Shield, unlocked: false },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Gamified Trust & Reputation Score
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Every creator has a public Influbazzar Score based on performance
            and reliability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Score Display */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10">
                {/* Main Score */}
                <div className="text-center mb-8">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="white"
                        strokeOpacity="0.2"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="white"
                        strokeWidth="8"
                        fill="transparent"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 352" }}
                        whileInView={{ strokeDasharray: "317 352" }} // 90% of circumference
                        transition={{ duration: 2, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">90</div>
                        <div className="text-sm opacity-80">Score</div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Influbazzar Score
                  </h3>
                  <p className="text-sm opacity-80">Excellent Performance</p>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-4">
                  {scoreMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between p-3 bg-white/10 rounded-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{metric.label}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">
                            {metric.value}
                            {metric.isRating ? "/5" : "%"}
                          </span>
                          {metric.isRating && (
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(metric.value)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-white/30"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Achievements */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                <Award className="h-6 w-6 text-yellow-500" />
                <span>Achievements</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`p-4 rounded-xl text-center transition-all duration-300 ${
                        achievement.unlocked
                          ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-700"
                          : "bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-gray-600 opacity-50"
                      }`}
                    >
                      <Icon
                        className={`h-8 w-8 mx-auto mb-2 ${
                          achievement.unlocked
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      />
                      <p
                        className={`text-sm font-medium ${
                          achievement.unlocked
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {achievement.title}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                High Score Benefits
              </h3>
              <ul className="space-y-3">
                {[
                  "Priority in campaign applications",
                  "Higher payment rates",
                  "Exclusive brand partnerships",
                  "Featured creator spotlight",
                ].map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center"
            >
              <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Build Your Score
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
