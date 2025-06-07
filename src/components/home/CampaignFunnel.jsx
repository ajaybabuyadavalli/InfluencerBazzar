import { motion } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Users,
  Package,
  Camera,
  CreditCard,
} from "lucide-react";

export default function CampaignFunnel() {
  const steps = [
    {
      id: 1,
      title: "Brand Posts Campaign",
      description: "Define goals, budget, and target audience",
      icon: Upload,
      color: "from-blue-500 to-cyan-600",
      position: { x: 0, y: 0 },
    },
    {
      id: 2,
      title: "Creators Apply",
      description: "Verified creators submit applications with portfolio",
      icon: Users,
      color: "from-purple-500 to-violet-600",
      position: { x: 1, y: 0 },
    },
    {
      id: 3,
      title: "Product Shipped",
      description: "Brand ships products to selected creators",
      icon: Package,
      color: "from-orange-500 to-red-600",
      position: { x: 2, y: 0 },
    },
    {
      id: 4,
      title: "Content Created",
      description: "Creators produce and submit content through dashboard",
      icon: Camera,
      color: "from-green-500 to-emerald-600",
      position: { x: 1, y: 1 },
    },
    {
      id: 5,
      title: "Payment Released",
      description: "Escrow releases payment after content approval",
      icon: CreditCard,
      color: "from-pink-500 to-rose-600",
      position: { x: 0, y: 1 },
    },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
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
            How Campaigns Work
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Seamless collaboration flow from campaign creation to payment
          </p>
        </motion.div>

        {/* Desktop Flow Chart */}
        <div className="hidden lg:block relative">
          <div className="relative w-full h-96">
            {/* Connection Lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 1 }}
            >
              {connections.map((connection, index) => {
                const fromStep = steps[connection.from];
                const toStep = steps[connection.to];

                // Calculate positions (approximated for responsive design)
                const fromX = fromStep.position.x * 300 + 150;
                const fromY = fromStep.position.y * 200 + 100;
                const toX = toStep.position.x * 300 + 150;
                const toY = toStep.position.y * 200 + 100;

                return (
                  <motion.line
                    key={index}
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                    viewport={{ once: true }}
                  />
                );
              })}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Steps */}
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className="absolute"
                  style={{
                    left: `${step.position.x * 33.33}%`,
                    top: `${step.position.y * 50}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="group relative">
                    {/* Step Circle */}
                    <div
                      className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </div>

                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white">
                      {step.id}
                    </div>

                    {/* Tooltip */}
                    <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {step.description}
                        </p>
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-l border-t border-gray-200 dark:border-gray-700 rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Linear Flow */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-start space-x-4">
                  {/* Step Circle */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connection Line for Mobile */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-gray-300 to-gray-200 dark:from-gray-600 dark:to-gray-700"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Process Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-700">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">24h</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Quick Approval
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Average campaign approval time
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">100%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Secure Escrow
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Protected payments for all parties
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl border border-purple-200 dark:border-purple-700">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">7d</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Fast Delivery
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Average content delivery time
            </p>
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
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>Start Your First Campaign</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
