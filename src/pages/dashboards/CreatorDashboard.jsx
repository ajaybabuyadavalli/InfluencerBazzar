import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, DollarSign, Users } from "lucide-react";

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Your Creator Dashboard! 🎉
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Your profile is now live and ready to receive campaign invitations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <TrendingUp className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Campaign Invites
            </h3>
            <p className="text-3xl font-bold text-blue-500 mb-2">0</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pending invitations
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <DollarSign className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Earnings
            </h3>
            <p className="text-3xl font-bold text-green-500 mb-2">₹0</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total earned
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <Users className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Profile Views
            </h3>
            <p className="text-3xl font-bold text-purple-500 mb-2">0</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This month
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Your Journey Starts Here!</h2>
          <p className="text-lg mb-6">
            Complete your profile, browse campaigns, and start earning from
            brand collaborations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Browse Campaigns
            </button>
            <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
