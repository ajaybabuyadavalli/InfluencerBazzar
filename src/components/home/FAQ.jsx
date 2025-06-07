import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Shield,
  CreditCard,
  Users,
} from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: 1,
      question: "How does the escrow system work?",
      answer:
        "Our escrow system protects both brands and creators. When a campaign is accepted, the payment is held securely in escrow. Funds are only released to the creator after the brand approves the submitted content. This ensures quality delivery and payment security for all parties.",
      icon: Shield,
      category: "Payment & Security",
    },
    {
      id: 2,
      question: "What if the creator doesn't post the content?",
      answer:
        "We have multiple safeguards in place. Creators must maintain a minimum 90% delivery rate to stay active on the platform. If content isn't delivered within the agreed timeframe, the escrow amount is automatically refunded to the brand. We also have a dispute resolution system with our support team.",
      icon: Users,
      category: "Campaign Management",
    },
    {
      id: 3,
      question: "Can brands do barter-only deals?",
      answer:
        "Yes! Brands can offer product-only collaborations, cash payments, or a combination of both. Many creators, especially those starting out, are happy to work for products in exchange for portfolio building and brand partnerships. You can specify your collaboration type when posting a campaign.",
      icon: CreditCard,
      category: "Collaboration Types",
    },
    {
      id: 4,
      question: "Can agencies invite their own creators?",
      answer:
        "Absolutely! Agencies can invite their existing talent roster to join Influbazzar. You can manage multiple creators under your agency account, handle their campaigns, and maintain your existing relationships while accessing new opportunities through our platform.",
      icon: Users,
      category: "Agency Features",
    },
    {
      id: 5,
      question: "How do you verify creators?",
      answer:
        "We have a comprehensive verification process that includes social media account authentication, engagement rate analysis, content quality review, and background checks. Only creators who meet our quality standards get the verified badge and access to premium campaigns.",
      icon: Shield,
      category: "Creator Verification",
    },
    {
      id: 6,
      question: "What percentage does Influbazzar take?",
      answer:
        "For creators, our platform is completely free - we don't take any commission from creator earnings. For brands, we charge a small platform fee (5-10%) depending on your plan. Agencies have custom pricing based on their volume and requirements.",
      icon: CreditCard,
      category: "Pricing & Fees",
    },
    {
      id: 7,
      question: "How long does campaign approval take?",
      answer:
        "Most campaigns are approved within 24 hours. Our AI-powered review system checks for compliance with our guidelines, and our team manually reviews for quality. Urgent campaigns can be fast-tracked for approval within 2-4 hours.",
      icon: HelpCircle,
      category: "Campaign Process",
    },
    {
      id: 8,
      question: "Can I track campaign performance?",
      answer:
        "Yes! Our dashboard provides real-time analytics including reach, engagement, clicks, conversions, and ROI tracking. You can monitor individual creator performance, compare campaigns, and export detailed reports for your records.",
      icon: HelpCircle,
      category: "Analytics & Reporting",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center space-x-3">
            <HelpCircle className="h-8 w-8 text-indigo-600" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about Influbazzar
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div
                      className={`p-2 rounded-lg ${
                        isOpen
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400"
                      } transition-all duration-200`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-medium">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="pl-12">
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-gray-600 dark:text-gray-300 leading-relaxed"
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our support team is here to help you get started
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
