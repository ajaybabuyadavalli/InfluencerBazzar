/**
 * Main Application Component for Influbazzar Platform
 *
 * This is the root component that handles routing for the entire application.
 * It sets up different route groups for public pages, authentication, onboarding,
 * and role-specific dashboards (Creator, Brand, Agency).
 *
 * Backend Integration Notes:
 * - Role-based routing requires user authentication state management
 * - Protected routes should verify JWT tokens and user roles
 * - Route guards needed for role-specific access control
 *
 * API Endpoints Referenced:
 * - GET /api/auth/verify-token - Verify user authentication status
 * - GET /api/user/profile - Get current user profile and role
 * - POST /api/auth/logout - Handle user logout
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import CaseStudies from "./pages/CaseStudies";

// Authentication Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOTP from "./pages/auth/VerifyOTP";

// Onboarding Pages
import CreatorOnboarding from "./pages/onboarding/CreatorOnboarding";
import BrandOnboarding from "./pages/onboarding/BrandOnboarding";
import AgencyOnboarding from "./pages/onboarding/AgencyOnboarding";

// Creator Dashboard Pages
import CreatorNavbar from "./components/creator/CreatorNavbar";
import CreatorDashboard from "./pages/creator/Dashboard";
import DiscoverCampaigns from "./pages/creator/DiscoverCampaigns";
import MyCampaigns from "./pages/creator/MyCampaigns";
import CreatorProfile from "./pages/creator/Profile";
import CreatorEarnings from "./pages/creator/Earnings";
import CreatorAnalytics from "./pages/creator/Analytics";
import CreatorSupport from "./pages/creator/Support";

/**
 * Layout Component for Creator Pages
 * Wraps Creator pages with specialized navigation and footer
 *
 * {{Dynamic}} - User authentication and role verification needed here
 * Backend should verify JWT token and ensure user has 'creator' role
 */
function CreatorLayout({ children }) {
  // {{Dynamic}} - Replace with actual user state from context/redux
  const [user, setUser] = useState({
    id: "creator_123",
    name: "Ajay Kumar",
    role: "creator",
    avatar: "/api/avatars/ajay.jpg",
    influbazzarScore: 84,
    isVerified: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <CreatorNavbar user={user} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}

/**
 * Public Layout Component
 * Standard layout for public-facing pages with regular navbar
 */
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}

/**
 * Auth Layout Component
 * Clean layout for authentication pages without navbar/footer
 */
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      {children}
    </div>
  );
}

/**
 * Protected Route Component
 * Handles route protection based on user authentication and role
 *
 * {{Dynamic}} - Implement actual authentication check
 * Should redirect to /login if not authenticated
 * Should redirect to appropriate dashboard based on user role
 */
function ProtectedRoute({ children, requiredRole = null }) {
  // {{Dynamic}} - Replace with actual auth state management
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock authenticated state
  const [userRole, setUserRole] = useState("creator"); // Mock user role
  const [isLoading, setIsLoading] = useState(false); // Mock loading state

  useEffect(() => {
    // {{Dynamic}} - Implement actual token verification
    // const verifyToken = async () => {
    //   try {
    //     const response = await fetch('/api/auth/verify-token', {
    //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //     })
    //     if (response.ok) {
    //       const userData = await response.json()
    //       setIsAuthenticated(true)
    //       setUserRole(userData.role)
    //     } else {
    //       setIsAuthenticated(false)
    //       localStorage.removeItem('token')
    //       navigate('/login')
    //     }
    //   } catch (error) {
    //     console.error('Token verification failed:', error)
    //     setIsAuthenticated(false)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    // verifyToken()
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // {{Dynamic}} - Redirect to login page
    window.location.href = "/login";
    return null;
  }

  if (requiredRole && userRole !== requiredRole) {
    // {{Dynamic}} - Redirect to appropriate dashboard based on role
    window.location.href = `/${userRole}/dashboard`;
    return null;
  }

  return children;
}

/**
 * Main App Component
 * Sets up all application routes with proper layout and protection
 */
function App() {
  // {{Dynamic}} - Initialize global state management (Redux/Context)
  // const [darkMode, setDarkMode] = useState(false)
  // const [user, setUser] = useState(null)
  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // {{Dynamic}} - Initialize app-wide settings
    // Load user preferences, theme, language, etc.
    // Check for existing authentication token
    // Set up error boundaries and analytics
    // Example initialization:
    // const initializeApp = async () => {
    //   try {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //       const userData = await verifyToken(token)
    //       setUser(userData)
    //     }
    //
    //     const savedTheme = localStorage.getItem('darkMode')
    //     setDarkMode(savedTheme === 'true')
    //
    //     setIsLoading(false)
    //   } catch (error) {
    //     console.error('App initialization failed:', error)
    //     setIsLoading(false)
    //   }
    // }
    // initializeApp()
  }, []);

  return (
    <Router>
      <Routes>
        {/* Authentication Routes - No Layout */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <AuthLayout>
              <VerifyOTP />
            </AuthLayout>
          }
        />

        {/* Onboarding Routes - No Layout */}
        <Route
          path="/onboarding/creator"
          element={
            <AuthLayout>
              <CreatorOnboarding />
            </AuthLayout>
          }
        />
        <Route
          path="/onboarding/brand"
          element={
            <AuthLayout>
              <BrandOnboarding />
            </AuthLayout>
          }
        />
        <Route
          path="/onboarding/agency"
          element={
            <AuthLayout>
              <AgencyOnboarding />
            </AuthLayout>
          }
        />

        {/* Creator Dashboard Routes - Protected */}
        <Route
          path="/creator/dashboard"
          element={
            <ProtectedRoute requiredRole="creator">
              <CreatorLayout>
                <CreatorDashboard />
              </CreatorLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator/discover-campaigns"
          element={
            <ProtectedRoute requiredRole="creator">
              <CreatorLayout>
                <DiscoverCampaigns />
              </CreatorLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator/my-campaigns"
          element={
            <ProtectedRoute requiredRole="creator">
              <CreatorLayout>
                <MyCampaigns />
              </CreatorLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator/profile"
          element={
            <ProtectedRoute requiredRole="creator">
              <CreatorLayout>
                <CreatorProfile />
              </CreatorLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator/earnings"
          element={
            <ProtectedRoute requiredRole="creator">
              <CreatorLayout>
                <CreatorEarnings />
              </CreatorLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator/analytics"
          element={
            <ProtectedRoute requiredRole="creator">
              <CreatorLayout>
                <CreatorAnalytics />
              </CreatorLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator/support"
          element={
            <ProtectedRoute requiredRole="creator">
              <CreatorLayout>
                <CreatorSupport />
              </CreatorLayout>
            </ProtectedRoute>
          }
        />

        {/* Public Routes - Standard Layout */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/pricing"
          element={
            <PublicLayout>
              <Pricing />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />
        <Route
          path="/testimonials"
          element={
            <PublicLayout>
              <Testimonials />
            </PublicLayout>
          }
        />
        <Route
          path="/case-studies"
          element={
            <PublicLayout>
              <CaseStudies />
            </PublicLayout>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <PublicLayout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-4">
                    404 - Page Not Found
                  </h1>
                  <p className="text-gray-400 mb-8">
                    The page you're looking for doesn't exist.
                  </p>
                  <a
                    href="/"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            </PublicLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
