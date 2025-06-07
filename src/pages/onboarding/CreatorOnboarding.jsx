import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  SkipForward,
  Upload,
  User,
  MapPin,
  Instagram,
  Youtube,
  Music,
  Globe,
  DollarSign,
  CreditCard,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function CreatorOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Profile Basics
    username: "",
    profilePicture: null,
    bio: "",
    city: "",
    state: "",

    // Step 2: Platform Details
    primaryPlatform: "",
    instagramHandle: "",
    youtubeChannel: "",
    tiktokUsername: "",
    followerCount: "",

    // Step 3: Content Preferences
    niches: [],
    languages: [],
    postsPerWeek: "",
    videoLength: "",

    // Step 4: Collaboration Preferences
    campaignTypes: [],
    minimumPayout: "",
    openToBarter: false,
    openToLiveCollabs: false,

    // Step 5: Monetization
    paymentMethod: "",
    gstNumber: "",
    taxResidency: "",

    // Step 6: Final Info
    funFact: "",
    inspiration: "",
    agreeToTerms: false,
  });

  const totalSteps = 6;

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("creatorOnboardingProgress");
    if (saved) {
      const { step, data } = JSON.parse(saved);
      setCurrentStep(step);
      setFormData(data);
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem(
      "creatorOnboardingProgress",
      JSON.stringify({
        step: currentStep,
        data: formData,
      }),
    );
  }, [currentStep, formData]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    // Save completion flag
    localStorage.setItem("onboardingComplete_creator", "true");
    localStorage.removeItem("creatorOnboardingProgress");

    // Navigate to dashboard
    navigate("/creator/dashboard");
  };

  const motivationalTips = [
    "Complete your profile to get more campaign invites!",
    "Creators with full profiles receive 3x more invites!",
    "Showcase your uniqueness to stand out from the crowd!",
    "Build trust with brands through detailed preferences!",
    "Secure payments start with proper verification!",
    "You're almost ready to start earning!",
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} onChange={handleInputChange} />;
      case 2:
        return <Step2 formData={formData} onChange={handleInputChange} />;
      case 3:
        return <Step3 formData={formData} onChange={handleInputChange} />;
      case 4:
        return <Step4 formData={formData} onChange={handleInputChange} />;
      case 5:
        return <Step5 formData={formData} onChange={handleInputChange} />;
      case 6:
        return <Step6 formData={formData} onChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Creator Profile Setup
            </h2>
            <span className="text-sm text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-3">
            {currentStep < totalSteps && (
              <button
                onClick={handleSkip}
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <SkipForward className="h-4 w-4" />
                <span>Skip</span>
              </button>
            )}

            {currentStep < totalSteps ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                disabled={!formData.agreeToTerms}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Complete Profile</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Motivational Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-indigo-900/20 border border-indigo-700 rounded-lg text-center"
        >
          <p className="text-indigo-400 text-sm">
            💡 {motivationalTips[currentStep - 1]}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Step Components
function Step1({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="h-12 w-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Profile & Personalization
        </h3>
        <p className="text-gray-400">Let's start with the basics</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Username
        </label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => onChange("username", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="@your_username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Profile Picture
        </label>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center border border-gray-600">
            <Upload className="h-6 w-6 text-gray-400" />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Upload Photo
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Bio (150 characters max)
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => onChange("bio", e.target.value)}
          maxLength={150}
          rows={3}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
          placeholder="Tell us about yourself..."
        />
        <p className="text-xs text-gray-400 mt-1">{formData.bio.length}/150</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Mumbai"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            State
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => onChange("state", e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Maharashtra"
          />
        </div>
      </div>
    </div>
  );
}

function Step2({ formData, onChange }) {
  const platforms = [
    { id: "instagram", label: "Instagram", icon: Instagram },
    { id: "youtube", label: "YouTube", icon: Youtube },
    { id: "tiktok", label: "TikTok", icon: Music },
    { id: "other", label: "Other", icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Instagram className="h-12 w-12 text-pink-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Platform Details</h3>
        <p className="text-gray-400">Connect your social media accounts</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Primary Platform
        </label>
        <div className="grid grid-cols-2 gap-3">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                onClick={() => onChange("primaryPlatform", platform.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  formData.primaryPlatform === platform.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                <Icon className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-white">{platform.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Instagram Handle
        </label>
        <input
          type="text"
          value={formData.instagramHandle}
          onChange={(e) => onChange("instagramHandle", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="@username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          YouTube Channel URL
        </label>
        <input
          type="url"
          value={formData.youtubeChannel}
          onChange={(e) => onChange("youtubeChannel", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="https://youtube.com/@channel"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          TikTok Username
        </label>
        <input
          type="text"
          value={formData.tiktokUsername}
          onChange={(e) => onChange("tiktokUsername", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="@username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Total Follower Count
        </label>
        <input
          type="number"
          value={formData.followerCount}
          onChange={(e) => onChange("followerCount", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="10000"
        />
      </div>
    </div>
  );
}

function Step3({ formData, onChange }) {
  const niches = [
    "Fashion",
    "Beauty",
    "Fitness",
    "Tech",
    "Food",
    "Travel",
    "Comedy",
    "Education",
    "Gaming",
    "Music",
  ];
  const languages = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Bengali",
    "Marathi",
    "Gujarati",
    "Kannada",
  ];

  const handleMultiSelect = (field, value) => {
    const current = formData[field] || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    onChange(field, updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Content Preferences
        </h3>
        <p className="text-gray-400">Tell us about your content style</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Content Niches (Select multiple)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {niches.map((niche) => (
            <button
              key={niche}
              onClick={() => handleMultiSelect("niches", niche)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.niches?.includes(niche)
                  ? "border-purple-500 bg-purple-500/10 text-purple-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {niche}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Languages Used in Content
        </label>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => handleMultiSelect("languages", language)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.languages?.includes(language)
                  ? "border-purple-500 bg-purple-500/10 text-purple-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Average Posts Per Week
        </label>
        <select
          value={formData.postsPerWeek}
          onChange={(e) => onChange("postsPerWeek", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        >
          <option value="">Select frequency</option>
          <option value="1-2">1-2 posts</option>
          <option value="3-5">3-5 posts</option>
          <option value="daily">Daily</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Typical Video Length
        </label>
        <select
          value={formData.videoLength}
          onChange={(e) => onChange("videoLength", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        >
          <option value="">Select length</option>
          <option value="15s">15 seconds</option>
          <option value="30s">30 seconds</option>
          <option value="60s+">60+ seconds</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>
    </div>
  );
}

function Step4({ formData, onChange }) {
  const campaignTypes = [
    "Product Review",
    "Giveaway",
    "UGC Content",
    "Tutorial",
    "Unboxing",
    "Story Feature",
  ];

  const handleMultiSelect = (field, value) => {
    const current = formData[field] || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    onChange(field, updated);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <DollarSign className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Collaboration Preferences
        </h3>
        <p className="text-gray-400">Set your collaboration terms</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Preferred Campaign Types
        </label>
        <div className="grid grid-cols-2 gap-2">
          {campaignTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleMultiSelect("campaignTypes", type)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.campaignTypes?.includes(type)
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Minimum Acceptable Payout (₹)
        </label>
        <input
          type="number"
          value={formData.minimumPayout}
          onChange={(e) => onChange("minimumPayout", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          placeholder="5000"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
          <span className="text-white">Open to Barter Collaborations?</span>
          <button
            onClick={() => onChange("openToBarter", !formData.openToBarter)}
            className={`w-12 h-6 rounded-full transition-all duration-200 ${
              formData.openToBarter ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                formData.openToBarter ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
          <span className="text-white">Open to Live Collaborations?</span>
          <button
            onClick={() =>
              onChange("openToLiveCollabs", !formData.openToLiveCollabs)
            }
            className={`w-12 h-6 rounded-full transition-all duration-200 ${
              formData.openToLiveCollabs ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                formData.openToLiveCollabs ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function Step5({ formData, onChange }) {
  const paymentMethods = [
    { id: "upi", label: "UPI" },
    { id: "bank", label: "Bank Transfer" },
    { id: "paypal", label: "PayPal" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CreditCard className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Monetization Setup
        </h3>
        <p className="text-gray-400">Configure your payment preferences</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Preferred Payment Method
        </label>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => onChange("paymentMethod", method.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                formData.paymentMethod === method.id
                  ? "border-yellow-500 bg-yellow-500/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
            >
              <span className="text-white">{method.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          GST Number (Optional)
        </label>
        <input
          type="text"
          value={formData.gstNumber}
          onChange={(e) => onChange("gstNumber", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
          placeholder="Enter GST number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Country of Tax Residency
        </label>
        <select
          value={formData.taxResidency}
          onChange={(e) => onChange("taxResidency", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
        >
          <option value="">Select country</option>
          <option value="india">India</option>
          <option value="usa">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
}

function Step6({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Final Touch</h3>
        <p className="text-gray-400">Almost done! Just a few more details</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Fun Fact About You (Optional)
        </label>
        <textarea
          value={formData.funFact}
          onChange={(e) => onChange("funFact", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white resize-none"
          placeholder="Share something interesting about yourself..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Influencer Who Inspires You (Optional)
        </label>
        <input
          type="text"
          value={formData.inspiration}
          onChange={(e) => onChange("inspiration", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          placeholder="Name an influencer you admire"
        />
      </div>

      <div className="p-4 bg-slate-700 rounded-lg">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) => onChange("agreeToTerms", e.target.checked)}
            className="w-5 h-5 text-green-600 bg-slate-600 border-gray-500 rounded focus:ring-green-500 focus:ring-2 mt-1"
          />
          <span className="text-white">
            I agree to Influbazzar's{" "}
            <a href="/terms" className="text-green-400 hover:text-green-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/community-guidelines"
              className="text-green-400 hover:text-green-300"
            >
              Community Guidelines
            </a>
          </span>
        </label>
      </div>
    </div>
  );
}
