import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Globe,
  Moon,
  Sun,
  Heart,
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "About", href: "/about" },
        { name: "Pricing", href: "/pricing" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Testimonials", href: "/testimonials" },
        { name: "FAQ", href: "/#faq" },
        { name: "Support", href: "/contact" },
      ],
    },
    {
      title: "For Creators",
      links: [
        { name: "Join as Creator", href: "/signup?role=creator" },
        { name: "Creator Resources", href: "/resources" },
        { name: "Success Stories", href: "/testimonials" },
        { name: "Creator Guidelines", href: "/guidelines" },
        { name: "Payment Terms", href: "/payment-terms" },
        { name: "Creator Support", href: "/support/creator" },
      ],
    },
    {
      title: "For Brands",
      links: [
        { name: "Post Campaign", href: "/signup?role=brand" },
        { name: "Find Creators", href: "/discover" },
        { name: "Brand Resources", href: "/brand-resources" },
        { name: "Campaign Examples", href: "/case-studies" },
        { name: "Pricing Plans", href: "/pricing" },
        { name: "Brand Support", href: "/support/brand" },
      ],
    },
    {
      title: "For Agencies",
      links: [
        { name: "Agency Partnership", href: "/agency" },
        { name: "Bulk Management", href: "/features/agency" },
        { name: "White Label", href: "/white-label" },
        { name: "API Documentation", href: "/api" },
        { name: "Enterprise Support", href: "/enterprise" },
        { name: "Custom Solutions", href: "/custom" },
      ],
    },
    {
      title: "Legal & Trust",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Creator Agreement", href: "/creator-terms" },
        { name: "Brand Agreement", href: "/brand-terms" },
        { name: "Security", href: "/security" },
        { name: "Compliance", href: "/compliance" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/influbazzar",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/influbazzar",
      icon: Linkedin,
    },
    { name: "Twitter", href: "https://twitter.com/influbazzar", icon: Twitter },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Here you would implement actual dark mode toggle
  };

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "HI" : "EN");
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">IB</span>
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Influbazzar
                </span>
              </Link>

              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                India's fastest-growing influencer collaboration platform.
                Connecting brands, creators, and agencies for authentic
                partnerships and measurable results.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-indigo-400">₹2Cr+</div>
                  <div className="text-xs text-gray-400">Creator Payouts</div>
                </div>
                <div className="text-center p-3 bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-purple-400">25K+</div>
                  <div className="text-xs text-gray-400">Verified Creators</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-4 w-4 text-indigo-400" />
                  <span className="text-sm">support@influbazzar.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-4 w-4 text-indigo-400" />
                  <span className="text-sm">+91-9000000000</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="h-4 w-4 text-indigo-400" />
                  <span className="text-sm">Bangalore, Karnataka, India</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Get the latest updates on new features, creator opportunities,
                and industry insights
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">
                © 2024 Influbazzar. All rights reserved.
              </p>
              <div className="flex items-center space-x-1 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>in India</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-6">
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language}</span>
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-colors duration-200"
              >
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
