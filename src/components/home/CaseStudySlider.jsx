import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  Eye,
  Hash,
} from "lucide-react";

export default function CaseStudySlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const caseStudies = [
    {
      id: 1,
      hashtag: "#BareGlowRoutine",
      brand: "SkinGlow Pro",
      result: "Boosted sales 2.5x with 20+ micro creators",
      creator: "Rhea Kapoor",
      followers: "8.2K",
      engagement: "12.5%",
      reach: "250K",
      conversions: "1,240",
      roi: "285%",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=250&fit=crop",
      category: "Beauty & Skincare",
      color: "from-pink-500 to-rose-600",
      duration: "14 days",
    },
    {
      id: 2,
      hashtag: "#FitLifeChallenge",
      brand: "FitLife Supplements",
      result: "Generated 50K+ video views in 7 days",
      creator: "Arjun Fitness",
      followers: "15.3K",
      engagement: "9.8%",
      reach: "180K",
      conversions: "892",
      roi: "195%",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      category: "Health & Fitness",
      color: "from-green-500 to-emerald-600",
      duration: "7 days",
    },
    {
      id: 3,
      hashtag: "#TechReviewHub",
      brand: "TechnoPhone",
      result: "Achieved 95% positive sentiment across reviews",
      creator: "Tech Guru Amit",
      followers: "25.7K",
      engagement: "8.9%",
      reach: "420K",
      conversions: "2,150",
      roi: "340%",
      image:
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=250&fit=crop",
      category: "Technology",
      color: "from-blue-500 to-cyan-600",
      duration: "21 days",
    },
    {
      id: 4,
      hashtag: "#StyleEvolution",
      brand: "StyleHub",
      result: "Increased brand awareness by 180% in metros",
      creator: "Fashion Diva",
      followers: "32.1K",
      engagement: "11.2%",
      reach: "680K",
      conversions: "3,240",
      roi: "420%",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop",
      category: "Fashion",
      color: "from-purple-500 to-violet-600",
      duration: "30 days",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + caseStudies.length) % caseStudies.length,
    );
  };

  const currentCase = caseStudies[currentSlide];

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
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real campaigns, real results from our creator community
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Case Study Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={currentCase.image}
                    alt={currentCase.hashtag}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${currentCase.color} opacity-20`}
                  ></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 text-gray-900 text-sm font-medium rounded-full">
                      {currentCase.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-2 text-white">
                      <Hash className="h-5 w-5" />
                      <span className="text-lg font-bold">
                        {currentCase.hashtag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-12">
                  <div className="mb-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      {currentCase.result}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Campaign by{" "}
                      <span className="font-semibold">{currentCase.brand}</span>
                    </p>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {currentCase.creator
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {currentCase.creator}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {currentCase.followers} followers •{" "}
                        {currentCase.engagement} ER
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                      <Eye className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                        {currentCase.reach}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Total Reach
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                      <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="font-bold text-green-600 dark:text-green-400 text-lg">
                        {currentCase.conversions}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Conversions
                      </div>
                    </div>
                  </div>

                  {/* ROI & Duration */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {currentCase.roi}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        ROI
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {currentCase.duration}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Duration
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {caseStudies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-indigo-600 scale-125"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
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
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Want your campaign to be our next success story?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Campaign
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
