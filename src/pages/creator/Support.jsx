/**
 * Creator Support Page - Help Center & Customer Support
 *
 * Comprehensive support interface featuring:
 * - Searchable FAQ with categorized sections
 * - Ticket submission system with priority levels
 * - Live chat widget integration
 * - Knowledge base with articles and tutorials
 * - Video help guides and walkthroughs
 * - Community forum access
 * - Direct contact options
 * - Support ticket tracking and history
 *
 * Backend Integration:
 * {{Dynamic}} - FAQ data from GET /api/support/faq
 * {{Dynamic}} - Ticket submission via POST /api/support/tickets
 * {{Dynamic}} - Ticket history from GET /api/support/tickets/user
 * {{Dynamic}} - Knowledge base from GET /api/support/articles
 * {{Dynamic}} - Live chat integration with WebSocket
 *
 * Features:
 * - Smart search across all help content
 * - Real-time chat support
 * - Ticket status tracking
 * - File attachments for support requests
 * - Escalation workflows
 * - Community-driven solutions
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  HelpCircle,
  MessageCircle,
  FileText,
  Video,
  Users,
  Mail,
  Phone,
  Send,
  Paperclip,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Download,
  Plus,
  Filter,
  Tag,
  MessageSquare,
  Headphones,
  Book,
  Zap,
  Shield,
  DollarSign,
  Settings,
  Camera,
  BarChart3,
} from "lucide-react";

// Shared Components
import AnimatedCard from "../../components/shared/AnimatedCard";
import RippleButton, {
  PrimaryButton,
  OutlineButton,
  GhostButton,
} from "../../components/shared/RippleButton";

// Mock Data - {{Dynamic}} Replace with API calls
import { supportTickets } from "../../utils/mockData";

/**
 * Creator Support Component
 *
 * Comprehensive support and help center interface
 */
const CreatorSupport = () => {
  // UI State
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Ticket System State
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
    attachments: [],
  });
  const [tickets, setTickets] = useState(supportTickets);

  // Chat State
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  // File Upload
  const fileInputRef = useRef(null);

  /**
   * FAQ Categories and Data
   * {{Dynamic}} - Replace with GET /api/support/faq
   */
  const faqCategories = [
    { id: "all", label: "All Topics", icon: HelpCircle },
    { id: "campaigns", label: "Campaigns", icon: Zap },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "profile", label: "Profile", icon: Settings },
    { id: "content", label: "Content", icon: Camera },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "account", label: "Account", icon: Shield },
  ];

  const faqData = [
    {
      id: 1,
      category: "campaigns",
      question: "How do I apply for campaigns?",
      answer:
        'To apply for campaigns, go to the "Discover Campaigns" page, find campaigns that match your profile, and click "Apply Now". Make sure your profile is complete and meets the campaign requirements.',
      helpful: 25,
      tags: ["campaigns", "application", "requirements"],
    },
    {
      id: 2,
      category: "payments",
      question: "When will I receive my payment?",
      answer:
        "Payments are typically released 7-14 days after content approval. You can track payment status in your Earnings dashboard. Escrow payments may take longer depending on campaign terms.",
      helpful: 32,
      tags: ["payments", "escrow", "timeline"],
    },
    {
      id: 3,
      category: "campaigns",
      question: "What happens if my content is rejected?",
      answer:
        "If your content is rejected, you'll receive feedback from the brand. You can revise and resubmit your content. Multiple rejections may affect your Influbazzar Score.",
      helpful: 18,
      tags: ["campaigns", "rejection", "feedback"],
    },
    {
      id: 4,
      category: "profile",
      question: "How can I improve my Influbazzar Score?",
      answer:
        "Improve your score by completing your profile, maintaining high engagement rates, submitting quality content on time, and receiving positive brand feedback.",
      helpful: 45,
      tags: ["profile", "score", "improvement"],
    },
    {
      id: 5,
      category: "payments",
      question: "How do I add payment methods?",
      answer:
        "Go to Earnings > Payment Methods to add UPI, bank account, or other payment options. Ensure all details are accurate to avoid payment delays.",
      helpful: 28,
      tags: ["payments", "methods", "setup"],
    },
    {
      id: 6,
      category: "account",
      question: "How do I verify my account?",
      answer:
        "Account verification requires uploading a government ID and completing social media verification. This process typically takes 2-3 business days.",
      helpful: 22,
      tags: ["account", "verification", "identity"],
    },
  ];

  /**
   * Support tabs configuration
   */
  const supportTabs = [
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "tickets", label: "My Tickets", icon: FileText },
    { id: "guides", label: "Guides", icon: Book },
    { id: "contact", label: "Contact Us", icon: MessageCircle },
  ];

  /**
   * Filter FAQ based on search and category
   */
  const filteredFAQ = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  /**
   * Submit support ticket
   * {{Dynamic}} - Call POST /api/support/tickets
   */
  const submitTicket = async () => {
    try {
      // {{Dynamic}} - Real API call:
      // const formData = new FormData()
      // formData.append('subject', ticketForm.subject)
      // formData.append('category', ticketForm.category)
      // formData.append('priority', ticketForm.priority)
      // formData.append('description', ticketForm.description)
      // ticketForm.attachments.forEach(file => formData.append('attachments', file))
      //
      // const response = await fetch('/api/support/tickets', {
      //   method: 'POST',
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      //   body: formData
      // })
      //
      // if (response.ok) {
      //   const newTicket = await response.json()
      //   setTickets(prev => [newTicket, ...prev])
      //   setShowTicketModal(false)
      //   setTicketForm({ subject: '', category: '', priority: 'medium', description: '', attachments: [] })
      // }

      // Mock ticket creation for demo
      const newTicket = {
        id: `ticket_${Date.now()}`,
        subject: ticketForm.subject,
        category: ticketForm.category,
        status: "open",
        priority: ticketForm.priority,
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        messages: [
          {
            id: "msg_new",
            sender: "creator",
            message: ticketForm.description,
            timestamp: new Date().toISOString(),
          },
        ],
      };

      setTickets((prev) => [newTicket, ...prev]);
      setShowTicketModal(false);
      setTicketForm({
        subject: "",
        category: "",
        priority: "medium",
        description: "",
        attachments: [],
      });
    } catch (error) {
      console.error("Failed to submit ticket:", error);
    }
  };

  /**
   * Handle file attachment
   */
  const handleFileAttachment = (event) => {
    const files = Array.from(event.target.files);
    setTicketForm((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  /**
   * Remove attachment
   */
  const removeAttachment = (index) => {
    setTicketForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  /**
   * Get ticket status styling
   */
  const getTicketStatusInfo = (status) => {
    switch (status) {
      case "open":
        return {
          color: "blue",
          bg: "bg-blue-500/20",
          text: "text-blue-300",
          label: "Open",
        };
      case "in_progress":
        return {
          color: "yellow",
          bg: "bg-yellow-500/20",
          text: "text-yellow-300",
          label: "In Progress",
        };
      case "resolved":
        return {
          color: "green",
          bg: "bg-green-500/20",
          text: "text-green-300",
          label: "Resolved",
        };
      case "closed":
        return {
          color: "gray",
          bg: "bg-gray-500/20",
          text: "text-gray-300",
          label: "Closed",
        };
      default:
        return {
          color: "gray",
          bg: "bg-gray-500/20",
          text: "text-gray-300",
          label: "Unknown",
        };
    }
  };

  /**
   * Get priority styling
   */
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case "high":
        return {
          color: "red",
          bg: "bg-red-500/20",
          text: "text-red-300",
          label: "High",
        };
      case "medium":
        return {
          color: "yellow",
          bg: "bg-yellow-500/20",
          text: "text-yellow-300",
          label: "Medium",
        };
      case "low":
        return {
          color: "green",
          bg: "bg-green-500/20",
          text: "text-green-300",
          label: "Low",
        };
      default:
        return {
          color: "gray",
          bg: "bg-gray-500/20",
          text: "text-gray-300",
          label: "Medium",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Support Center</h1>
          <p className="text-gray-400 text-lg">
            Get help, find answers, and connect with our support team
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <AnimatedCard
            variant="glass"
            className="p-6 cursor-pointer group"
            onClick={() => setShowChat(true)}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors">
                  Live Chat
                </h3>
                <p className="text-gray-400 text-sm">
                  Get instant help from our team
                </p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard
            variant="glass"
            className="p-6 cursor-pointer group"
            onClick={() => setShowTicketModal(true)}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                  Submit Ticket
                </h3>
                <p className="text-gray-400 text-sm">
                  Report issues or get detailed help
                </p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard variant="glass" className="p-6 cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                  Call Support
                </h3>
                <p className="text-gray-400 text-sm">
                  +91 80-4567-8900 (9 AM - 6 PM)
                </p>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <AnimatedCard variant="glass" className="p-6">
            <div className="flex flex-wrap gap-2">
              {supportTabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                      ${
                        activeTab === tab.id
                          ? "bg-indigo-600 text-white"
                          : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      }
                    `}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "faq" && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search and Filter */}
              <AnimatedCard variant="glass" className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search for help topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {faqCategories.map((category) => {
                      const CategoryIcon = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`
                            flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                            ${
                              selectedCategory === category.id
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                            }
                          `}
                        >
                          <CategoryIcon className="w-4 h-4" />
                          <span>{category.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </AnimatedCard>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFAQ.length > 0 ? (
                  filteredFAQ.map((faq) => (
                    <AnimatedCard key={faq.id} variant="glass">
                      <button
                        className="w-full p-6 text-left"
                        onClick={() =>
                          setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                        }
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {faq.question}
                            </h3>
                            <div className="flex items-center space-x-4">
                              <div className="flex flex-wrap gap-1">
                                {faq.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-gray-600/30 text-gray-400 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center space-x-1 text-gray-400 text-sm">
                                <Star className="w-3 h-3" />
                                <span>{faq.helpful} helpful</span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            {expandedFAQ === faq.id ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedFAQ === faq.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-gray-600"
                            >
                              <p className="text-gray-300 leading-relaxed">
                                {faq.answer}
                              </p>

                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-2 text-sm text-gray-400">
                                  <span>Was this helpful?</span>
                                  <button className="text-green-400 hover:text-green-300">
                                    Yes
                                  </button>
                                  <button className="text-red-400 hover:text-red-300">
                                    No
                                  </button>
                                </div>

                                <GhostButton size="sm">
                                  Still need help?
                                </GhostButton>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </AnimatedCard>
                  ))
                ) : (
                  <AnimatedCard variant="glass" className="p-12 text-center">
                    <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Try different keywords or browse by category
                    </p>
                    <OutlineButton
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                    >
                      Clear Search
                    </OutlineButton>
                  </AnimatedCard>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "tickets" && (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Ticket Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  My Support Tickets
                </h2>
                <PrimaryButton
                  onClick={() => setShowTicketModal(true)}
                  icon={<Plus className="w-4 h-4" />}
                >
                  New Ticket
                </PrimaryButton>
              </div>

              {/* Tickets List */}
              <div className="space-y-4">
                {tickets.length > 0 ? (
                  tickets.map((ticket) => {
                    const status = getTicketStatusInfo(ticket.status);
                    const priority = getPriorityInfo(ticket.priority);

                    return (
                      <AnimatedCard
                        key={ticket.id}
                        variant="glass"
                        className="p-6"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">
                                {ticket.subject}
                              </h3>
                              <span
                                className={`
                                px-2 py-1 rounded-full text-xs font-medium
                                ${status.bg} ${status.text}
                              `}
                              >
                                {status.label}
                              </span>
                              <span
                                className={`
                                px-2 py-1 rounded-full text-xs font-medium
                                ${priority.bg} ${priority.text}
                              `}
                              >
                                {priority.label}
                              </span>
                            </div>

                            <p className="text-gray-400 text-sm mb-3">
                              {ticket.messages[0]?.message.substring(0, 100)}...
                            </p>

                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <span>
                                Created:{" "}
                                {new Date(
                                  ticket.createdDate,
                                ).toLocaleDateString()}
                              </span>
                              <span>
                                Updated:{" "}
                                {new Date(
                                  ticket.lastUpdated,
                                ).toLocaleDateString()}
                              </span>
                              <span>Messages: {ticket.messages.length}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <OutlineButton size="sm">
                              View Details
                            </OutlineButton>
                          </div>
                        </div>
                      </AnimatedCard>
                    );
                  })
                ) : (
                  <AnimatedCard variant="glass" className="p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No support tickets
                    </h3>
                    <p className="text-gray-400 mb-6">
                      You haven't submitted any support tickets yet
                    </p>
                    <PrimaryButton
                      onClick={() => setShowTicketModal(true)}
                      icon={<Plus className="w-4 h-4" />}
                    >
                      Create Your First Ticket
                    </PrimaryButton>
                  </AnimatedCard>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Contact Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Email Support */}
                <AnimatedCard variant="glass" className="p-6 text-center">
                  <div className="p-4 bg-blue-500/20 rounded-full w-fit mx-auto mb-4">
                    <Mail className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Email Support
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Get detailed help via email
                  </p>
                  <p className="text-blue-400 text-sm">
                    support@influbazzar.com
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Response time: 24-48 hours
                  </p>
                </AnimatedCard>

                {/* Phone Support */}
                <AnimatedCard variant="glass" className="p-6 text-center">
                  <div className="p-4 bg-green-500/20 rounded-full w-fit mx-auto mb-4">
                    <Phone className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Phone Support
                  </h3>
                  <p className="text-gray-400 mb-4">Talk to our support team</p>
                  <p className="text-green-400 text-sm">+91 80-4567-8900</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Mon-Fri: 9 AM - 6 PM IST
                  </p>
                </AnimatedCard>

                {/* Community Forum */}
                <AnimatedCard variant="glass" className="p-6 text-center">
                  <div className="p-4 bg-purple-500/20 rounded-full w-fit mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Community
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Connect with other creators
                  </p>
                  <OutlineButton
                    size="sm"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Visit Forum
                  </OutlineButton>
                </AnimatedCard>
              </div>

              {/* Office Hours */}
              <AnimatedCard variant="glass" className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Support Hours
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-3">
                      Live Chat & Phone
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monday - Friday</span>
                        <span className="text-white">
                          9:00 AM - 6:00 PM IST
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Saturday</span>
                        <span className="text-white">
                          10:00 AM - 4:00 PM IST
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sunday</span>
                        <span className="text-red-400">Closed</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">
                      Email Support
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time</span>
                        <span className="text-white">24-48 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Urgent Issues</span>
                        <span className="text-white">2-6 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Availability</span>
                        <span className="text-green-400">24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ticket Submission Modal */}
        <AnimatePresence>
          {showTicketModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowTicketModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-2xl font-bold text-white">
                    Submit Support Ticket
                  </h3>
                  <p className="text-gray-400 mt-1">
                    Describe your issue and we'll help you resolve it
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={ticketForm.subject}
                      onChange={(e) =>
                        setTicketForm((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  {/* Category and Priority */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category *
                      </label>
                      <select
                        value={ticketForm.category}
                        onChange={(e) =>
                          setTicketForm((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select category</option>
                        <option value="campaigns">Campaigns</option>
                        <option value="payments">Payments</option>
                        <option value="profile">Profile</option>
                        <option value="technical">Technical Issue</option>
                        <option value="account">Account</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Priority
                      </label>
                      <select
                        value={ticketForm.priority}
                        onChange={(e) =>
                          setTicketForm((prev) => ({
                            ...prev,
                            priority: e.target.value,
                          }))
                        }
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={ticketForm.description}
                      onChange={(e) =>
                        setTicketForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      rows={6}
                      placeholder="Please provide detailed information about your issue..."
                    />
                  </div>

                  {/* File Attachments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Attachments (Optional)
                    </label>

                    <div
                      className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">
                        Click to attach files or drag and drop
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileAttachment}
                      className="hidden"
                    />

                    {/* Attachment List */}
                    {ticketForm.attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {ticketForm.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3"
                          >
                            <div className="flex items-center space-x-2">
                              <Paperclip className="w-4 h-4 text-gray-400" />
                              <span className="text-white text-sm">
                                {file.name}
                              </span>
                              <span className="text-gray-500 text-xs">
                                ({(file.size / 1024 / 1024).toFixed(1)} MB)
                              </span>
                            </div>
                            <button
                              onClick={() => removeAttachment(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="p-6 border-t border-gray-700 flex space-x-4">
                  <OutlineButton
                    fullWidth
                    onClick={() => setShowTicketModal(false)}
                  >
                    Cancel
                  </OutlineButton>
                  <PrimaryButton
                    fullWidth
                    onClick={submitTicket}
                    disabled={
                      !ticketForm.subject ||
                      !ticketForm.category ||
                      !ticketForm.description
                    }
                    icon={<Send className="w-4 h-4" />}
                  >
                    Submit Ticket
                  </PrimaryButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CreatorSupport;
