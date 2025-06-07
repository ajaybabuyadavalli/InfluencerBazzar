import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Building2,
  Briefcase,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("creator");

  const userTypes = [
    {
      id: "creator",
      name: "Ajay (Creator)",
      icon: User,
      color: "from-blue-500 to-cyan-600",
      steps: [
        {
          title: "Sign Up Free",
          description:
            "Create your creator profile with portfolio and analytics",
          icon: "📝",
        },
        {
          title: "Browse Campaigns",
          description:
            "Find paid collaborations matching your niche and audience",
          icon: "🔍",
        },
        {
          title: "Upload Content",
          description: "Create and submit content through our dashboard",
          icon: "📱",
        },
        {
          title: "Earn Money",
          description: "Get paid securely via our escrow system",
          icon: "💰",
        },
      ],
    },
    {
      id: "brand",
      name: "Srinivas (Brand)",
      icon: Building2,
      color: "from-purple-500 to-violet-600",
      steps: [
        {
          title: "Post Campaign",
          description:
            "Define your campaign goals, budget, and target audience",
          icon: "🎯",
        },
        {
          title: "Select Creators",
          description: "Filter and choose from thousands of verified creators",
          icon: "👥",
        },
        {
          title: "Track Progress",
          description: "Monitor submissions and campaign performance",
          icon: "📊",
        },
        {
          title: "Secure Payout",
          description: "Approve content and release payments through escrow",
          icon: "🔒",
        },
      ],
    },
    {
      id: "agency",
      name: "Yoshitha (Agency)",
      icon: Briefcase,
      color: "from-orange-500 to-red-600",
      steps: [
        {
          title: "Add Creators",
          description: "Onboard and manage your roster of talent",
          icon: "🌟",
        },
        {
          title: "Co-manage Campaigns",
          description: "Handle multiple brand campaigns simultaneously",
          icon: "⚡",
        },
        {
          title: "View Dashboards",
          description: "Access comprehensive analytics and reports",
          icon: "📈",
        },
        {
          title: "Scale Operations",
          description: "Grow your agency with enterprise tools",
          icon: "🚀",
        },
      ],
    },
  ];

  const activeUserType = userTypes.find((type) => type.id === activeTab);

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How Influbazzar Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Simple steps for each user type to start collaborating and earning
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row justify-center mb-12 space-y-2 sm:space-y-0 sm:space-x-2">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <motion.button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === type.id
                    ? "bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${type.color}`}
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span>{type.name}</span>
                {activeTab === type.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-lg -z-10"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Steps Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {activeUserType.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-center">
                    {/* Step Icon */}
                    <div className="relative mb-4">
                      <div
                        className={`w-16 h-16 mx-auto bg-gradient-to-r ${activeUserType.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}
                      >
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white shadow-md">
                        {index + 1}
                      </div>
                    </div>

                    {/* Step Content */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  {index < activeUserType.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 transform translate-x-1/2">
                      <ArrowRight className="h-6 w-6 text-gray-400 dark:text-gray-600" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 bg-gradient-to-r ${activeUserType.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto`}
              >
                <span>Get Started as {activeUserType.name.split(" ")[0]}</span>
                <CheckCircle className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
