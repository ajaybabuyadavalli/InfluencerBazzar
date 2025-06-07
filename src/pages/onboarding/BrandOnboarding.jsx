import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Skip,
  Upload,
  Building2,
  Target,
  Users,
  Palette,
  CreditCard,
  CheckCircle,
  Globe,
  Instagram,
  Youtube,
} from "lucide-react";

export default function BrandOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Brand Information
    brandName: "",
    website: "",
    brandLogo: null,
    instagramHandle: "",
    youtubeChannel: "",
    industry: "",
    companySize: "",
    city: "",
    state: "",

    // Step 2: Campaign Preferences
    campaignTypes: [],
    preferredPlatforms: [],
    creatorTiers: [],
    budgetRange: "",

    // Step 3: Target Audience
    targetAgeRanges: [],
    targetLocations: [],
    genderPreference: "",
    audienceLanguages: [],
    customerPersona: "",

    // Step 4: Brand Voice & Tone
    brandTone: "",
    contentStyles: [],
    openToHumor: false,
    provideScripts: false,
    brandTagline: "",

    // Step 5: Payment & Legal
    gstNumber: "",
    ndaRequired: false,
    paymentTimeline: "",
    paymentMode: "",
    taxResidency: "",

    // Step 6: Final Setup
    uniqueValue: "",
    pastCollaboration: "",
    agreeToTerms: false,
  });

  const totalSteps = 6;

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("brandOnboardingProgress");
    if (saved) {
      const { step, data } = JSON.parse(saved);
      setCurrentStep(step);
      setFormData(data);
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem(
      "brandOnboardingProgress",
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
    localStorage.setItem("onboardingComplete_brand", "true");
    localStorage.removeItem("brandOnboardingProgress");

    // Navigate to dashboard
    navigate("/brand/dashboard");
  };

  const motivationalTips = [
    "Complete your brand profile to unlock premium creators!",
    "Verified brands get 4x more applications!",
    "Define your audience to find perfect creator matches!",
    "Authentic brand voice attracts quality collaborations!",
    "Secure payment terms build creator trust!",
    "You're ready to launch amazing campaigns!",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900">
      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Brand Profile Setup
            </h2>
            <span className="text-sm text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-violet-600 h-2 rounded-full"
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
                <Skip className="h-4 w-4" />
                <span>Skip</span>
              </button>
            )}

            {currentStep < totalSteps ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
                <span>Complete Setup</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Motivational Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-purple-900/20 border border-purple-700 rounded-lg text-center"
        >
          <p className="text-purple-400 text-sm">
            💡 {motivationalTips[currentStep - 1]}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Step Components
function Step1({ formData, onChange }) {
  const industries = [
    "Beauty & Cosmetics",
    "Fashion & Apparel",
    "Technology",
    "Food & Beverage",
    "Fitness & Health",
    "Education",
    "Finance",
    "Travel",
    "Gaming",
    "Other",
  ];

  const companySizes = ["1-10", "11-50", "51-200", "200+"];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building2 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Basic Brand Information
        </h3>
        <p className="text-gray-400">Tell us about your brand</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Brand / Company Name
        </label>
        <input
          type="text"
          value={formData.brandName}
          onChange={(e) => onChange("brandName", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          placeholder="Your Brand Name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Website URL
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => onChange("website", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          placeholder="https://yourbrand.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Brand Logo
        </label>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center border border-gray-600">
            <Upload className="h-6 w-6 text-gray-400" />
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Upload Logo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Instagram Handle (Optional)
          </label>
          <div className="relative">
            <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.instagramHandle}
              onChange={(e) => onChange("instagramHandle", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="@yourbrand"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            YouTube Channel (Optional)
          </label>
          <div className="relative">
            <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.youtubeChannel}
              onChange={(e) => onChange("youtubeChannel", e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="Channel name"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Industry / Sector
          </label>
          <select
            value={formData.industry}
            onChange={(e) => onChange("industry", e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          >
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company Size
          </label>
          <select
            value={formData.companySize}
            onChange={(e) => onChange("companySize", e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
          >
            <option value="">Select size</option>
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size} employees
              </option>
            ))}
          </select>
        </div>
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
            className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
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
            className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            placeholder="Maharashtra"
          />
        </div>
      </div>
    </div>
  );
}

function Step2({ formData, onChange }) {
  const campaignTypes = [
    "Product Launch",
    "Promo Code Campaign",
    "Brand Awareness",
    "Paid Reviews",
    "Long-term Ambassador",
    "Event Promotion",
  ];

  const platforms = ["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn"];
  const creatorTiers = [
    "Nano (1K-10K)",
    "Micro (10K-100K)",
    "Macro (100K-1M)",
    "Mega (1M+)",
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
        <Target className="h-12 w-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Campaign Preferences
        </h3>
        <p className="text-gray-400">Define your campaign strategy</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Campaign Types You're Interested In
        </label>
        <div className="grid grid-cols-2 gap-2">
          {campaignTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleMultiSelect("campaignTypes", type)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.campaignTypes?.includes(type)
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Preferred Creator Platforms
        </label>
        <div className="grid grid-cols-3 gap-2">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => handleMultiSelect("preferredPlatforms", platform)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.preferredPlatforms?.includes(platform)
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Creator Tiers
        </label>
        <div className="grid grid-cols-2 gap-2">
          {creatorTiers.map((tier) => (
            <button
              key={tier}
              onClick={() => handleMultiSelect("creatorTiers", tier)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.creatorTiers?.includes(tier)
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Typical Campaign Budget Range (₹)
        </label>
        <select
          value={formData.budgetRange}
          onChange={(e) => onChange("budgetRange", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        >
          <option value="">Select budget range</option>
          <option value="10k-50k">₹10K - ₹50K</option>
          <option value="50k-1l">₹50K - ₹1L</option>
          <option value="1l-5l">₹1L - ₹5L</option>
          <option value="5l+">₹5L+</option>
        </select>
      </div>
    </div>
  );
}

function Step3({ formData, onChange }) {
  const ageRanges = ["13-17", "18-25", "26-35", "36-45", "45+"];
  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Pune",
    "Hyderabad",
    "Pan India",
  ];
  const languages = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Bengali",
    "Marathi",
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
        <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Target Audience</h3>
        <p className="text-gray-400">Define your ideal customers</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Target Age Range
        </label>
        <div className="grid grid-cols-3 gap-2">
          {ageRanges.map((age) => (
            <button
              key={age}
              onClick={() => handleMultiSelect("targetAgeRanges", age)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.targetAgeRanges?.includes(age)
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Target Locations
        </label>
        <div className="grid grid-cols-2 gap-2">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => handleMultiSelect("targetLocations", location)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.targetLocations?.includes(location)
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Gender Preference
        </label>
        <select
          value={formData.genderPreference}
          onChange={(e) => onChange("genderPreference", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
        >
          <option value="">No preference</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="any">Any</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Audience Language(s)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => handleMultiSelect("audienceLanguages", language)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.audienceLanguages?.includes(language)
                  ? "border-green-500 bg-green-500/10 text-green-400"
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
          Your Ideal Customer Persona (Optional)
        </label>
        <textarea
          value={formData.customerPersona}
          onChange={(e) => onChange("customerPersona", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white resize-none"
          placeholder="Describe your ideal customer..."
        />
      </div>
    </div>
  );
}

function Step4({ formData, onChange }) {
  const brandTones = [
    "Fun",
    "Premium",
    "Informative",
    "Bold",
    "Youthful",
    "Traditional",
  ];
  const contentStyles = [
    "Reels",
    "Stories",
    "Tutorials",
    "Product Demos",
    "Reviews",
    "Unboxing",
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
        <Palette className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Brand Voice & Tone
        </h3>
        <p className="text-gray-400">Define your brand personality</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          How Would You Describe Your Brand Tone?
        </label>
        <div className="grid grid-cols-3 gap-2">
          {brandTones.map((tone) => (
            <button
              key={tone}
              onClick={() => onChange("brandTone", tone)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.brandTone === tone
                  ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Preferred Content Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          {contentStyles.map((style) => (
            <button
              key={style}
              onClick={() => handleMultiSelect("contentStyles", style)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.contentStyles?.includes(style)
                  ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
          <span className="text-white">Open to Humor or Meme Content?</span>
          <button
            onClick={() => onChange("openToHumor", !formData.openToHumor)}
            className={`w-12 h-6 rounded-full transition-all duration-200 ${
              formData.openToHumor ? "bg-yellow-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                formData.openToHumor ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
          <span className="text-white">
            Will You Provide Scripts or Creative Briefs?
          </span>
          <button
            onClick={() => onChange("provideScripts", !formData.provideScripts)}
            className={`w-12 h-6 rounded-full transition-all duration-200 ${
              formData.provideScripts ? "bg-yellow-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                formData.provideScripts ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          One-liner Brand Tagline (Optional)
        </label>
        <input
          type="text"
          value={formData.brandTagline}
          onChange={(e) => onChange("brandTagline", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
          placeholder="Your memorable tagline"
        />
      </div>
    </div>
  );
}

function Step5({ formData, onChange }) {
  const paymentTimelines = ["7 days", "15 days", "30 days"];
  const paymentModes = ["UPI", "Bank Transfer", "PayPal"];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CreditCard className="h-12 w-12 text-orange-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Payment & Legal</h3>
        <p className="text-gray-400">Set up payment and legal preferences</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          GST Number (If applicable)
        </label>
        <input
          type="text"
          value={formData.gstNumber}
          onChange={(e) => onChange("gstNumber", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
          placeholder="Enter GST number"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
        <span className="text-white">NDA Required?</span>
        <button
          onClick={() => onChange("ndaRequired", !formData.ndaRequired)}
          className={`w-12 h-6 rounded-full transition-all duration-200 ${
            formData.ndaRequired ? "bg-orange-500" : "bg-gray-600"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
              formData.ndaRequired ? "translate-x-6" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Payment Timeline After Content Delivery
        </label>
        <div className="grid grid-cols-3 gap-2">
          {paymentTimelines.map((timeline) => (
            <button
              key={timeline}
              onClick={() => onChange("paymentTimeline", timeline)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.paymentTimeline === timeline
                  ? "border-orange-500 bg-orange-500/10 text-orange-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {timeline}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Preferred Payment Mode
        </label>
        <div className="grid grid-cols-3 gap-2">
          {paymentModes.map((mode) => (
            <button
              key={mode}
              onClick={() => onChange("paymentMode", mode)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.paymentMode === mode
                  ? "border-orange-500 bg-orange-500/10 text-orange-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Country of Tax Residency
        </label>
        <select
          value={formData.taxResidency}
          onChange={(e) => onChange("taxResidency", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
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
        <h3 className="text-2xl font-bold text-white mb-2">Final Setup</h3>
        <p className="text-gray-400">
          Just a few more details to complete your profile
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          What Makes Your Brand Unique? (Optional)
        </label>
        <textarea
          value={formData.uniqueValue}
          onChange={(e) => onChange("uniqueValue", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white resize-none"
          placeholder="Describe your unique value proposition..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Example Past Influencer Collaboration (Optional)
        </label>
        <input
          type="text"
          value={formData.pastCollaboration}
          onChange={(e) => onChange("pastCollaboration", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          placeholder="URL or brief description"
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
              href="/brand-code-of-conduct"
              className="text-green-400 hover:text-green-300"
            >
              Brand Code of Conduct
            </a>
          </span>
        </label>
      </div>
    </div>
  );
}
