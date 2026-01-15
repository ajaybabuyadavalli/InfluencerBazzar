import { motion } from "framer-motion";
import { Check, X, Star, Zap, Crown, Sparkles } from "lucide-react";

export default function Pricing() {
  const creatorPlan = {
    name: "Creator Access",
    price: "Free Forever",
    description: "Perfect for individual creators starting their journey",
    features: [
      "Unlimited campaign applications",
      "No platform fee on earnings",
      "Basic portfolio showcase",
      "Email support",
      "Community access",
      "Payment protection via escrow",
    ],
    notIncluded: [
      "Priority campaign access",
      "Advanced analytics",
      "Custom branding",
    ],
    cta: "Start Creating",
    popular: false,
    color: "from-blue-500 to-cyan-600",
  };

  const brandPlans = [
    {
      name: "Free",
      price: "₹0",
      period: "/month",
      description: "Great for testing the platform",
      features: [
        "2 campaigns per month",
        "Access to 10 creators",
        "Basic campaign analytics",
        "Escrow payment protection",
        "Email support",
        "Standard approval process",
      ],
      notIncluded: [
        "Advanced creator filters",
        "Priority support",
        "Custom campaign templates",
      ],
      cta: "Get Started",
      popular: false,
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Starter",
      price: "₹499",
      period: "/month",
      description: "Perfect for growing D2C brands",
      features: [
        "10 campaigns per month",
        "Advanced creator filters",
        "Campaign performance analytics",
        "Priority creator matching",
        "Phone & email support",
        "Campaign templates",
        "Bulk messaging tools",
      ],
      notIncluded: ["Team collaboration", "White-label reports"],
      cta: "Start Free Trial",
      popular: true,
      color: "from-purple-500 to-violet-600",
    },
    {
      name: "Growth",
      price: "₹2,999",
      period: "/month",
      description: "For established brands scaling up",
      features: [
        "Unlimited campaigns",
        "Advanced analytics & insights",
        "Team collaboration (5 seats)",
        "Custom campaign workflows",
        "Dedicated account manager",
        "White-label reporting",
        "API access",
        "Priority support (24/7)",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false,
      color: "from-orange-500 to-red-600",
    },
  ];

  const agencyFeatures = [
    "White-label dashboard with your branding",
    "Manage 100+ creators and brands",
    "Bulk campaign management tools",
    "Advanced analytics and reporting",
    "Custom pricing and commission structures",
    "Dedicated API access",
    "Priority support with dedicated manager",
    "Custom onboarding and training",
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
                Transparent Pricing
              </span>
              <br />
              <span>for Everyone</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your needs. No hidden fees, no
              surprises. Creators always earn 100% of their campaign payments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Creator Plan */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              For Creators
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Start earning from day one with zero platform fees
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div
                className={`p-8 bg-gradient-to-r ${creatorPlan.color} text-white text-center`}
              >
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{creatorPlan.name}</h3>
                <div className="text-3xl font-bold mb-2">
                  {creatorPlan.price}
                </div>
                <p className="opacity-90">{creatorPlan.description}</p>
              </div>

              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  {creatorPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                  {creatorPlan.notIncluded.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-3 opacity-50"
                    >
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-500 dark:text-gray-500">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 bg-gradient-to-r ${creatorPlan.color} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  {creatorPlan.cta}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              For Brands
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Scale your influencer marketing with powerful tools and analytics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {brandPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 ${
                    plan.popular
                      ? "border-purple-500"
                      : "border-gray-200 dark:border-gray-700"
                  } overflow-hidden h-full`}
                >
                  <div className="p-8 text-center">
                    <div className="flex items-center justify-center mb-4">
                      {plan.name === "Free" && (
                        <Sparkles className="h-8 w-8 text-gray-500" />
                      )}
                      {plan.name === "Starter" && (
                        <Zap className="h-8 w-8 text-purple-500" />
                      )}
                      {plan.name === "Growth" && (
                        <Crown className="h-8 w-8 text-orange-500" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-1">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </p>
                  </div>

                  <div className="px-8 pb-8">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center space-x-3"
                        >
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center space-x-3 opacity-50"
                        >
                          <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-500 dark:text-gray-500">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.color} text-white`
                          : "border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                      }`}
                    >
                      {plan.cta}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Plan */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white p-12 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                For Agencies
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Custom solutions for agencies managing multiple creators and
                brands
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                {agencyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <Check className="h-5 w-5 text-green-300 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact for Custom Pricing
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Pricing FAQ
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "Do creators pay any fees?",
                a: "No! Creators never pay any platform fees. You keep 100% of your campaign earnings.",
              },
              {
                q: "Can I change my plan anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees for any plan. You only pay the monthly subscription for brand plans.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, UPI, and bank transfers for Indian businesses.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
