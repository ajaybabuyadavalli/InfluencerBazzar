import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, TrendingUp, Sparkles } from "lucide-react";

export default function EarningsSimulator() {
  const [followers, setFollowers] = useState(10000);
  const [platform, setPlatform] = useState("instagram");
  const [niche, setNiche] = useState("beauty");
  const [earnings, setEarnings] = useState({ min: 0, max: 0 });

  const platforms = [
    { value: "instagram", label: "Instagram", multiplier: 1 },
    { value: "youtube", label: "YouTube", multiplier: 1.5 },
    { value: "tiktok", label: "TikTok", multiplier: 0.8 },
    { value: "linkedin", label: "LinkedIn", multiplier: 1.2 },
  ];

  const niches = [
    { value: "beauty", label: "Beauty & Skincare", multiplier: 1.2 },
    { value: "fitness", label: "Fitness & Health", multiplier: 1.1 },
    { value: "fashion", label: "Fashion & Lifestyle", multiplier: 1.0 },
    { value: "tech", label: "Technology", multiplier: 1.3 },
    { value: "food", label: "Food & Travel", multiplier: 1.0 },
    { value: "finance", label: "Finance & Business", multiplier: 1.4 },
  ];

  useEffect(() => {
    const calculateEarnings = () => {
      const basePlatformMultiplier =
        platforms.find((p) => p.value === platform)?.multiplier || 1;
      const baseNicheMultiplier =
        niches.find((n) => n.value === niche)?.multiplier || 1;

      // Base calculation: ₹0.2 to ₹2 per follower
      const baseMin = Math.floor(
        followers *
          0.0002 *
          basePlatformMultiplier *
          baseNicheMultiplier *
          1000,
      );
      const baseMax = Math.floor(
        followers * 0.002 * basePlatformMultiplier * baseNicheMultiplier * 1000,
      );

      // Add some realistic ranges
      const min = Math.max(500, baseMin);
      const max = Math.min(100000, baseMax);

      setEarnings({ min, max });
    };

    calculateEarnings();
  }, [followers, platform, niche]);

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center space-x-3">
            <Calculator className="h-8 w-8 text-indigo-600" />
            <span>Estimate Your Earnings</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how much you could earn per campaign based on your profile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Your Profile Details
              </h3>

              <div className="space-y-6">
                {/* Followers Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Follower Count
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1000"
                      max="1000000"
                      step="1000"
                      value={followers}
                      onChange={(e) => setFollowers(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span>1K</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {followers >= 1000000
                          ? `${(followers / 1000000).toFixed(1)}M`
                          : followers >= 1000
                            ? `${Math.floor(followers / 1000)}K`
                            : followers}
                      </span>
                      <span>1M</span>
                    </div>
                  </div>
                </div>

                {/* Platform Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Platform
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {platforms.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setPlatform(p.value)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          platform === p.value
                            ? "bg-indigo-600 text-white shadow-lg"
                            : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Niche Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content Niche
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full p-3 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {niches.map((n) => (
                      <option key={n.value} value={n.value}>
                        {n.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Earnings Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-white/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-6">
                  <Sparkles className="h-6 w-6" />
                  <h3 className="text-xl font-semibold">Estimated Earnings</h3>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <IndianRupee className="h-8 w-8" />
                    <span className="text-4xl md:text-5xl font-bold">
                      {earnings.min.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="text-lg opacity-90">to</div>
                  <div className="flex items-center justify-center space-x-2">
                    <IndianRupee className="h-8 w-8" />
                    <span className="text-4xl md:text-5xl font-bold">
                      {earnings.max.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-sm opacity-80 mt-2">per campaign</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Potential Monthly Income
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                    ₹{(earnings.max * 4).toLocaleString("en-IN")}+
                  </div>
                  <p className="text-xs opacity-80">
                    Based on 4 campaigns/month
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Earning Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            * Earnings estimates are based on industry averages and may vary
            depending on campaign requirements, engagement rates, and market
            conditions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
