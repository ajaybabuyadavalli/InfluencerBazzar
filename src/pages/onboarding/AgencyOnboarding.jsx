import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Skip,
  Upload,
  Briefcase,
  Settings,
  Target,
  Trophy,
  CreditCard,
  CheckCircle,
  Users,
  BarChart3,
  Globe,
} from "lucide-react";

export default function AgencyOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Agency Information
    agencyName: "",
    website: "",
    agencyLogo: null,
    yearsInOperation: "",
    teamMembers: "",
    city: "",
    state: "",
    country: "",
    contactName: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",

    // Step 2: Services Offered
    services: [],
    manageCreators: false,
    manageBrands: false,
    totalCreators: "",

    // Step 3: Specialization & Targeting
    industries: [],
    targetGeographies: [],
    keyDifferentiator: "",

    // Step 4: Past Campaign Highlights
    campaignShowcases: "",
    monthlyVolume: "",
    platforms: [],
    supportsBarter: false,

    // Step 5: Billing & Contracts
    paymentModel: "",
    contractHandling: "",
    requirePlatformInvoice: false,
    gstNumber: "",
    taxResidency: "",

    // Step 6: Final Info & Compliance
    visionStatement: "",
    keyBrands: "",
    agreeToTerms: false,
  });

  const totalSteps = 6;

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("agencyOnboardingProgress");
    if (saved) {
      const { step, data } = JSON.parse(saved);
      setCurrentStep(step);
      setFormData(data);
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem(
      "agencyOnboardingProgress",
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
    localStorage.setItem("onboardingComplete_agency", "true");
    localStorage.removeItem("agencyOnboardingProgress");

    // Navigate to dashboard
    navigate("/agency/dashboard");
  };

  const motivationalTips = [
    "A well-built agency profile unlocks premium campaigns!",
    "Your network = your net worth. Complete your profile to grow it!",
    "Verified agencies get early access to high-paying brand briefs!",
    "Showcase your expertise to attract quality partnerships!",
    "Professional contract handling builds client trust!",
    "You're ready to scale your agency operations!",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Agency Profile Setup
            </h2>
            <span className="text-sm text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full"
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
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
          className="mt-6 p-4 bg-orange-900/20 border border-orange-700 rounded-lg text-center"
        >
          <p className="text-orange-400 text-sm">
            💡 {motivationalTips[currentStep - 1]}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Step Components
function Step1({ formData, onChange }) {
  const yearsOptions = ["1-2", "3-5", "6-10", "10+"];
  const teamSizes = ["1-5", "6-15", "16-50", "50+"];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Briefcase className="h-12 w-12 text-orange-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Agency Information
        </h3>
        <p className="text-gray-400">Tell us about your agency</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Agency Name
        </label>
        <input
          type="text"
          value={formData.agencyName}
          onChange={(e) => onChange("agencyName", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
          placeholder="Your Agency Name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Website
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => onChange("website", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
          placeholder="https://youragency.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Agency Logo
        </label>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center border border-gray-600">
            <Upload className="h-6 w-6 text-gray-400" />
          </div>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            Upload Logo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Years in Operation
          </label>
          <select
            value={formData.yearsInOperation}
            onChange={(e) => onChange("yearsInOperation", e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
          >
            <option value="">Select years</option>
            {yearsOptions.map((years) => (
              <option key={years} value={years}>
                {years} years
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Number of Team Members
          </label>
          <select
            value={formData.teamMembers}
            onChange={(e) => onChange("teamMembers", e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
          >
            <option value="">Select size</option>
            {teamSizes.map((size) => (
              <option key={size} value={size}>
                {size} members
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
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
            className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
            placeholder="Maharashtra"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => onChange("country", e.target.value)}
            className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
            placeholder="India"
          />
        </div>
      </div>

      {/* Point of Contact */}
      <div className="border-t border-gray-600 pt-6">
        <h4 className="text-lg font-medium text-white mb-4">
          Point of Contact
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => onChange("contactName", e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role/Designation
            </label>
            <input
              type="text"
              value={formData.contactRole}
              onChange={(e) => onChange("contactRole", e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="Founder/CEO"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => onChange("contactEmail", e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="john@agency.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => onChange("contactPhone", e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step2({ formData, onChange }) {
  const services = [
    "Talent Management",
    "Campaign Management",
    "Analytics & Reporting",
    "Paid Ads Boosting",
    "Brand Strategy",
    "UGC Content Creation",
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
        <Settings className="h-12 w-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Services Offered</h3>
        <p className="text-gray-400">Define your service offerings</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Services Your Agency Offers
        </label>
        <div className="grid grid-cols-2 gap-2">
          {services.map((service) => (
            <button
              key={service}
              onClick={() => handleMultiSelect("services", service)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.services?.includes(service)
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
          <span className="text-white">Do you manage Creators?</span>
          <button
            onClick={() => onChange("manageCreators", !formData.manageCreators)}
            className={`w-12 h-6 rounded-full transition-all duration-200 ${
              formData.manageCreators ? "bg-blue-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                formData.manageCreators ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
          <span className="text-white">Do you manage Brands?</span>
          <button
            onClick={() => onChange("manageBrands", !formData.manageBrands)}
            className={`w-12 h-6 rounded-full transition-all duration-200 ${
              formData.manageBrands ? "bg-blue-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                formData.manageBrands ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Total Number of Creators Managed
        </label>
        <input
          type="number"
          value={formData.totalCreators}
          onChange={(e) => onChange("totalCreators", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="50"
        />
      </div>
    </div>
  );
}

function Step3({ formData, onChange }) {
  const industries = [
    "Beauty",
    "Tech",
    "Education",
    "Fitness",
    "D2C",
    "Fintech",
    "Entertainment",
    "Fashion",
    "Food & Beverage",
    "Travel",
    "Gaming",
    "Healthcare",
  ];

  const geographies = [
    "PAN India",
    "Tier-1 Cities",
    "Tier-2 & 3",
    "Global Markets",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Pune",
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
        <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Specialization & Targeting
        </h3>
        <p className="text-gray-400">Define your areas of expertise</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Industries You Specialize In
        </label>
        <div className="grid grid-cols-3 gap-2">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => handleMultiSelect("industries", industry)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.industries?.includes(industry)
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Target Geographies
        </label>
        <div className="grid grid-cols-2 gap-2">
          {geographies.map((geo) => (
            <button
              key={geo}
              onClick={() => handleMultiSelect("targetGeographies", geo)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.targetGeographies?.includes(geo)
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {geo}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Key Differentiator or Niche Strength (Optional)
        </label>
        <textarea
          value={formData.keyDifferentiator}
          onChange={(e) => onChange("keyDifferentiator", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white resize-none"
          placeholder="What makes your agency unique?"
        />
      </div>
    </div>
  );
}

function Step4({ formData, onChange }) {
  const platforms = [
    "Instagram",
    "YouTube",
    "TikTok",
    "Twitter",
    "LinkedIn",
    "Others",
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
        <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Past Campaign Highlights
        </h3>
        <p className="text-gray-400">Showcase your experience</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Upload or paste URLs to Campaign Showcases (Optional)
        </label>
        <textarea
          value={formData.campaignShowcases}
          onChange={(e) => onChange("campaignShowcases", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white resize-none"
          placeholder="Share links to your best campaign results..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Average Campaign Volume Per Month
        </label>
        <input
          type="number"
          value={formData.monthlyVolume}
          onChange={(e) => onChange("monthlyVolume", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
          placeholder="10"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Platforms You Operate On
        </label>
        <div className="grid grid-cols-3 gap-2">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => handleMultiSelect("platforms", platform)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.platforms?.includes(platform)
                  ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
        <span className="text-white">
          Do You Support Barter-Based Campaigns?
        </span>
        <button
          onClick={() => onChange("supportsBarter", !formData.supportsBarter)}
          className={`w-12 h-6 rounded-full transition-all duration-200 ${
            formData.supportsBarter ? "bg-yellow-500" : "bg-gray-600"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
              formData.supportsBarter ? "translate-x-6" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function Step5({ formData, onChange }) {
  const paymentModels = ["Upfront", "Escrow", "Post-Delivery"];
  const contractMethods = ["Manual", "DocuSign", "SaaS Platform"];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CreditCard className="h-12 w-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Billing & Contracts
        </h3>
        <p className="text-gray-400">Set up your business processes</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Payment Collection Model
        </label>
        <div className="grid grid-cols-3 gap-2">
          {paymentModels.map((model) => (
            <button
              key={model}
              onClick={() => onChange("paymentModel", model)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.paymentModel === model
                  ? "border-purple-500 bg-purple-500/10 text-purple-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Contract Handling Method
        </label>
        <div className="grid grid-cols-3 gap-2">
          {contractMethods.map((method) => (
            <button
              key={method}
              onClick={() => onChange("contractHandling", method)}
              className={`p-3 rounded-lg border transition-all duration-200 text-sm ${
                formData.contractHandling === method
                  ? "border-purple-500 bg-purple-500/10 text-purple-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
        <span className="text-white">Require Platform Invoice Format?</span>
        <button
          onClick={() =>
            onChange("requirePlatformInvoice", !formData.requirePlatformInvoice)
          }
          className={`w-12 h-6 rounded-full transition-all duration-200 ${
            formData.requirePlatformInvoice ? "bg-purple-500" : "bg-gray-600"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
              formData.requirePlatformInvoice
                ? "translate-x-6"
                : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          GST Number (Optional)
        </label>
        <input
          type="text"
          value={formData.gstNumber}
          onChange={(e) => onChange("gstNumber", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
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
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
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
        <h3 className="text-2xl font-bold text-white mb-2">
          Final Info & Compliance
        </h3>
        <p className="text-gray-400">Complete your agency profile</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Vision Statement or Team Motto (Optional)
        </label>
        <textarea
          value={formData.visionStatement}
          onChange={(e) => onChange("visionStatement", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white resize-none"
          placeholder="Share your agency's vision..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Key Brands You Work With (Optional)
        </label>
        <input
          type="text"
          value={formData.keyBrands}
          onChange={(e) => onChange("keyBrands", e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          placeholder="Nike, Apple, Samsung..."
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
              href="/agency-code-of-conduct"
              className="text-green-400 hover:text-green-300"
            >
              Agency Code of Conduct
            </a>
          </span>
        </label>
      </div>
    </div>
  );
}
