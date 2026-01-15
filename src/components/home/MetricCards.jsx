import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { IndianRupee, Users, Briefcase, Award } from "lucide-react";

export default function MetricCards() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const metrics = [
    {
      icon: IndianRupee,
      value: 2,
      suffix: " Cr+",
      label: "Total Creator Payouts",
      description: "Paid to creators across India",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Briefcase,
      value: 1500,
      suffix: "+",
      label: "Campaigns Posted",
      description: "Active and completed campaigns",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Users,
      value: 25000,
      suffix: "+",
      label: "Verified Creators",
      description: "Onboarded and active creators",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Award,
      value: 98,
      suffix: "%",
      label: "Success Rate",
      description: "Successful campaign completion",
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join India's most successful influencer marketplace with proven
            results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative p-8 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 bg-gradient-to-r ${metric.color} rounded-xl mb-4 shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {inView && (
                        <CountUp
                          end={metric.value}
                          duration={2.5}
                          delay={index * 0.2}
                          preserveValue
                        />
                      )}
                      {metric.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {metric.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.description}
                  </p>

                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-10`}
                      initial={false}
                      whileHover={{
                        scale: [1, 1.2],
                        opacity: [0, 0.1, 0],
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to be part of these numbers?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
