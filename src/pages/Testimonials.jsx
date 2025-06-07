import { motion } from "framer-motion";
import { Star, Quote, TrendingUp, Users, Award } from "lucide-react";

export default function Testimonials() {
  const creatorStories = [
    {
      name: "Ajay Kumar",
      role: "Fitness Creator",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      followers: "45K",
      earnings: "₹67K",
      campaigns: 15,
      quote:
        "Within 2 weeks I had 3 paid collaborations! The platform made it so easy to connect with brands and showcase my work. The payment protection gives me confidence.",
      rating: 5,
      location: "Mumbai, Maharashtra",
      category: "Fitness & Lifestyle",
    },
    {
      name: "Sneha Patel",
      role: "Beauty Influencer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      followers: "125K",
      earnings: "₹145K",
      campaigns: 22,
      quote:
        "The quality of brands here is amazing! Every collaboration feels meaningful and my audience loves the authentic content. Support team is super responsive.",
      rating: 5,
      location: "Bangalore, Karnataka",
      category: "Beauty & Skincare",
    },
    {
      name: "Rajat Sharma",
      role: "Tech Reviewer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      followers: "89K",
      earnings: "₹98K",
      campaigns: 18,
      quote:
        "Finally found a platform that values content creators. The analytics help me understand my performance and the escrow system ensures I always get paid.",
      rating: 5,
      location: "Delhi, India",
      category: "Technology",
    },
  ];

  const brandTestimonials = [
    {
      name: "Srinivas Reddy",
      role: "Marketing Manager",
      company: "GlowSkin Beauty",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      quote:
        "Escrow system gave us confidence as a growing D2C brand. We found authentic creators who truly understood our vision. ROI exceeded expectations.",
      rating: 5,
      roi: "285%",
      campaigns: 12,
      results: "Increased brand awareness by 180% in target demographics",
    },
    {
      name: "Priya Malhotra",
      role: "Brand Director",
      company: "FitLife Supplements",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b3da?w=150&h=150&fit=crop&crop=face",
      quote:
        "Best ROI we've seen from influencer marketing. The creator vetting process ensures we work with genuine, engaged audiences. Highly recommend!",
      rating: 5,
      roi: "320%",
      campaigns: 8,
      results: "Generated 50K+ video views and 2.5x sales increase",
    },
  ];

  const agencyTestimonials = [
    {
      name: "Yoshitha Sharma",
      role: "Agency Director",
      company: "Digital Marketing Pro",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      quote:
        "Managing 50+ creators became seamless with their dashboard. The analytics and payment system saved us 20+ hours per week. Game changer for agencies.",
      rating: 5,
      creators: "50+",
      campaigns: 35,
      timeSaved: "20 hours/week",
    },
  ];

  const platformStats = [
    { metric: "4.9/5", label: "Creator Rating", icon: Star },
    { metric: "4.8/5", label: "Brand Satisfaction", icon: Award },
    { metric: "98%", label: "Successful Campaigns", icon: TrendingUp },
    { metric: "25K+", label: "Happy Creators", icon: Users },
  ];

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
                Success Stories
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Real stories from creators, brands, and agencies who are thriving
              on Influbazzar
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg text-center"
                >
                  <Icon className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.metric}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Creator Success Stories */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Creator Success Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover how creators are building sustainable income streams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creatorStories.map((creator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-800">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-slate-700"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {creator.name}
                      </h3>
                      <p className="text-indigo-600 dark:text-indigo-400">
                        {creator.role}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {creator.location}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(creator.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="p-6">
                  <Quote className="h-8 w-8 text-indigo-600 mb-4" />
                  <p className="text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
                    "{creator.quote}"
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="font-bold text-blue-600 dark:text-blue-400">
                        {creator.followers}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Followers
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="font-bold text-green-600 dark:text-green-400">
                        {creator.earnings}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Earned
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="font-bold text-purple-600 dark:text-purple-400">
                        {creator.campaigns}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Campaigns
                      </div>
                    </div>
                  </div>

                  {/* Category Tag */}
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                    {creator.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Brand Success Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how brands are achieving exceptional ROI with authentic
              creator partnerships
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {brandTestimonials.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl p-8"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={brand.avatar}
                    alt={brand.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {brand.name}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400">
                      {brand.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {brand.company}
                    </p>
                  </div>
                </div>

                <Quote className="h-8 w-8 text-indigo-600 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 italic mb-6 text-lg leading-relaxed">
                  "{brand.quote}"
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {brand.roi}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      ROI Achieved
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {brand.campaigns}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Campaigns
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    Key Result: {brand.results}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Testimonial */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Agency Success Story
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              How agencies are scaling their operations with our platform
            </p>
          </motion.div>

          {agencyTestimonials.map((agency, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
            >
              <img
                src={agency.avatar}
                alt={agency.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-6 border-4 border-white/20"
              />

              <Quote className="h-10 w-10 text-white/80 mx-auto mb-6" />

              <p className="text-xl md:text-2xl italic mb-8 leading-relaxed">
                "{agency.quote}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {agency.creators}
                  </div>
                  <div className="text-white/80">Creators Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {agency.campaigns}
                  </div>
                  <div className="text-white/80">Campaigns Run</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {agency.timeSaved}
                  </div>
                  <div className="text-white/80">Time Saved</div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-1">{agency.name}</h3>
                <p className="text-white/80">
                  {agency.role}, {agency.company}
                </p>
              </div>
            </motion.div>
          ))}
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
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators, brands, and agencies who are achieving
              their goals on Influbazzar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Join as Creator
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                Post Campaign
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
