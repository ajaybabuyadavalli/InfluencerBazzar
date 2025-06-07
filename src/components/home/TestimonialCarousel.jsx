import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, User, Building2, Briefcase } from "lucide-react";

export default function TestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ajay Kumar",
      role: "Content Creator",
      type: "creator",
      icon: User,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote:
        "Within 2 weeks I had 3 paid collaborations! The platform made it so easy to connect with brands and showcase my work.",
      rating: 5,
      earnings: "₹45K",
      campaigns: 12,
      location: "Mumbai, Maharashtra",
      color: "from-blue-500 to-cyan-600",
      category: "Fitness & Lifestyle",
    },
    {
      id: 2,
      name: "Srinivas Reddy",
      role: "Brand Manager",
      type: "brand",
      icon: Building2,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote:
        "Escrow system gave us confidence as a growing D2C brand. We found authentic creators who truly understood our vision.",
      rating: 5,
      roi: "280%",
      campaigns: 8,
      location: "Bangalore, Karnataka",
      color: "from-purple-500 to-violet-600",
      category: "E-commerce Beauty",
    },
    {
      id: 3,
      name: "Yoshitha Sharma",
      role: "Agency Director",
      type: "agency",
      icon: Briefcase,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b3da?w=150&h=150&fit=crop&crop=face",
      quote:
        "Managing 50+ creators became seamless with their dashboard. The analytics and payment system saved us 20+ hours per week.",
      rating: 5,
      creators: "50+",
      campaigns: 25,
      location: "Delhi, India",
      color: "from-orange-500 to-red-600",
      category: "Digital Marketing Agency",
    },
    {
      id: 4,
      name: "Priya Malhotra",
      role: "Beauty Influencer",
      type: "creator",
      icon: User,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote:
        "The quality of brands here is amazing! Every collaboration feels meaningful and my audience loves the authentic content.",
      rating: 5,
      earnings: "₹85K",
      campaigns: 18,
      location: "Chennai, Tamil Nadu",
      color: "from-pink-500 to-rose-600",
      category: "Beauty & Skincare",
    },
    {
      id: 5,
      name: "Rakesh Gupta",
      role: "Marketing Head",
      type: "brand",
      icon: Building2,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      quote:
        "Best ROI we've seen from influencer marketing. The creator vetting process ensures we work with genuine, engaged audiences.",
      rating: 5,
      roi: "320%",
      campaigns: 15,
      location: "Pune, Maharashtra",
      color: "from-green-500 to-emerald-600",
      category: "FinTech",
    },
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentTestimonial];
  const Icon = current.icon;

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real stories from creators, brands, and agencies who are succeeding
            together
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div
                className={`relative p-8 lg:p-12 bg-gradient-to-br ${current.color} text-white`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                      <pattern
                        id="testimonial-grid"
                        width="60"
                        height="60"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 60 0 L 0 0 0 60"
                          fill="none"
                          stroke="white"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#testimonial-grid)"
                    />
                  </svg>
                </div>

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex justify-center mb-8"
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Quote className="h-8 w-8" />
                    </div>
                  </motion.div>

                  {/* Quote */}
                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl lg:text-2xl font-medium text-center leading-relaxed mb-8"
                  >
                    "{current.quote}"
                  </motion.blockquote>

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center mb-8"
                  >
                    <div className="flex space-x-1">
                      {[...Array(current.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Author Info */}
              <div className="p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                  {/* Avatar & Basic Info */}
                  <div className="flex flex-col items-center lg:items-start">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="relative mb-4"
                    >
                      <img
                        src={current.avatar}
                        alt={current.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                      />
                      <div
                        className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r ${current.color} rounded-full flex items-center justify-center`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </motion.div>

                    <div className="text-center lg:text-left">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {current.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {current.role}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {current.location}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        {current.category}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex-1">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {current.type === "creator" && (
                        <>
                          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {current.earnings}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Total Earned
                            </div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {current.campaigns}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Campaigns
                            </div>
                          </div>
                        </>
                      )}

                      {current.type === "brand" && (
                        <>
                          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {current.roi}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              ROI
                            </div>
                          </div>
                          <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700">
                            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                              {current.campaigns}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Campaigns
                            </div>
                          </div>
                        </>
                      )}

                      {current.type === "agency" && (
                        <>
                          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-700">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                              {current.creators}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Creators
                            </div>
                          </div>
                          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700">
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                              {current.campaigns}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Campaigns
                            </div>
                          </div>
                        </>
                      )}

                      <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-gray-600">
                        <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                          {current.rating}/5
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Rating
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? `bg-gradient-to-r ${current.color} scale-125`
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Auto-playing testimonials
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
