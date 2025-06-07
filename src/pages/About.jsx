import { motion } from "framer-motion";
import { Users, Target, Globe, Heart, TrendingUp, Award } from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Arjun Patel",
      role: "Co-Founder & CEO",
      bio: "Former Product Manager at Flipkart with 8+ years in e-commerce and creator economy",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Priya Sharma",
      role: "Co-Founder & CTO",
      bio: "Ex-Google engineer passionate about building scalable platforms for creators",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b3da?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Creator Relations",
      bio: "Former influencer with 10+ years in digital marketing and creator partnerships",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Sneha Reddy",
      role: "Head of Brand Partnerships",
      bio: "Marketing veteran with expertise in building brand-creator collaboration strategies",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "The Beginning",
      description:
        "Founded with a mission to democratize influencer marketing in India",
      achievements: [
        "Seed funding raised",
        "Core team assembled",
        "MVP development",
      ],
    },
    {
      year: "2024",
      title: "Platform Launch",
      description: "Official launch with focus on micro and nano creators",
      achievements: [
        "1,000+ creators onboarded",
        "50+ brand partnerships",
        "Series A funding",
      ],
    },
    {
      year: "2024",
      title: "Rapid Growth",
      description: "Expansion across tier 2 and tier 3 cities in India",
      achievements: [
        "25K+ verified creators",
        "₹2Cr+ creator payouts",
        "200+ successful campaigns",
      ],
    },
    {
      year: "2025",
      title: "Future Vision",
      description:
        "Building the largest creator economy platform in South Asia",
      achievements: [
        "International expansion",
        "AI-powered matching",
        "Creator education programs",
      ],
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Creator First",
      description:
        "We believe creators are the heart of authentic marketing. Every decision we make prioritizes creator success and fair compensation.",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Target,
      title: "Transparency",
      description:
        "No hidden fees, clear processes, and open communication. Trust is built through transparency in everything we do.",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Globe,
      title: "Inclusivity",
      description:
        "Supporting creators from all backgrounds, languages, and regions. Building for Bharat, by Bharat.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description:
        "Constantly evolving with technology to provide the best tools for creators and brands to collaborate.",
      color: "from-purple-500 to-violet-600",
    },
  ];

  const impact = [
    {
      metric: "₹2 Cr+",
      label: "Paid to creators",
      description: "Direct earnings for our creator community",
    },
    {
      metric: "100+",
      label: "Partner brands",
      description: "Trusted brands collaborating with creators",
    },
    {
      metric: "200+",
      label: "Successful campaigns",
      description: "Campaigns completed with excellence",
    },
    {
      metric: "15+",
      label: "States covered",
      description: "Pan-India creator network",
    },
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
                Why Influbazzar?
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Built to empower Bharat's creators and D2C brands with authentic
              collaborations, fair payments, and meaningful partnerships that
              drive real business results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                To democratize influencer marketing in India by creating a
                transparent, fair, and efficient platform where creators of all
                sizes can earn sustainable income while helping brands connect
                with authentic audiences.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We believe every creator deserves equal opportunity to monetize
                their content and every brand deserves access to genuine,
                engaged communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                To become South Asia's largest creator economy platform,
                enabling millions of creators to build sustainable businesses
                while helping brands achieve authentic growth through meaningful
                collaborations.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We envision a future where creator marketing is the primary
                driver of brand growth and creator entrepreneurship is a viable
                career path for everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`inline-flex p-3 bg-gradient-to-r ${value.color} rounded-xl mb-4`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From idea to India's fastest-growing creator platform
            </p>
          </motion.div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/2">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {item.description}
                    </p>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Impact */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Platform Impact
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Empowering creators and driving growth for brands across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {item.metric}
                </div>
                <div className="text-xl font-semibold mb-2">{item.label}</div>
                <div className="text-sm opacity-80">{item.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
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
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate builders dedicated to empowering the creator economy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 group-hover:border-indigo-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Bharat */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl p-12 text-center border border-orange-200 dark:border-orange-700"
          >
            <div className="flex items-center justify-center mb-6">
              <Globe className="h-12 w-12 text-orange-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Built for Bharat
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're committed to multilingual support, rural inclusion, and
              empowering creators from every corner of India. Our platform
              celebrates the diversity of Indian content and helps local
              creators reach global audiences while staying true to their roots.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
