/**
 * Enhanced Ripple Button Component
 *
 * Professional button component with ripple effects, multiple variants,
 * loading states, and accessibility features. Used throughout the Creator
 * dashboard for consistent interactions.
 *
 * Features:
 * - Multiple visual variants (primary, secondary, outline, ghost)
 * - Ripple click animations
 * - Loading states with spinners
 * - Icon support (leading/trailing)
 * - Keyboard accessibility
 * - Touch-friendly mobile interactions
 * - Disabled states
 *
 * {{Dynamic}} - No backend integration, purely UI component
 * Can be used with dynamic click handlers from parent components
 */

import { useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * RippleButton Component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} children - Button content
 * @param {Function} onClick - Click handler
 * @param {string} variant - Button style variant
 * @param {string} size - Button size
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state
 * @param {React.ReactNode} icon - Leading icon
 * @param {React.ReactNode} iconRight - Trailing icon
 * @param {boolean} fullWidth - Full width button
 * @param {string} className - Additional CSS classes
 * @param {Object} ...props - Additional props passed to button element
 */
const RippleButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  className = "",
  type = "button",
  ariaLabel,
  ...props
}) => {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  /**
   * Create ripple effect on click
   * Calculates click position relative to button and creates expanding circle
   */
  const createRipple = (event) => {
    if (disabled || loading) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now() + Math.random(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  /**
   * Handle button click with ripple effect
   */
  const handleClick = (event) => {
    createRipple(event);

    if (onClick && !disabled && !loading) {
      onClick(event);
    }
  };

  /**
   * Handle keyboard interactions (Enter/Space)
   */
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      createRipple(event);

      if (onClick && !disabled && !loading) {
        onClick(event);
      }
    }
  };

  /**
   * Get variant-specific styles
   */
  const getVariantStyles = () => {
    const baseStyles =
      "font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";

    switch (variant) {
      case "primary":
        return `${baseStyles} bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl focus:ring-indigo-500 disabled:bg-indigo-400`;

      case "secondary":
        return `${baseStyles} bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg focus:ring-gray-500 disabled:bg-gray-400`;

      case "outline":
        return `${baseStyles} border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white focus:ring-indigo-500 disabled:border-indigo-300 disabled:text-indigo-300`;

      case "ghost":
        return `${baseStyles} text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-gray-500 disabled:text-gray-500`;

      case "danger":
        return `${baseStyles} bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500 disabled:bg-red-400`;

      case "success":
        return `${baseStyles} bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-500 disabled:bg-green-400`;

      default:
        return `${baseStyles} bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl focus:ring-indigo-500 disabled:bg-indigo-400`;
    }
  };

  /**
   * Get size-specific styles
   */
  const getSizeStyles = () => {
    switch (size) {
      case "xs":
        return "px-2 py-1 text-xs rounded";
      case "sm":
        return "px-3 py-1.5 text-sm rounded-md";
      case "lg":
        return "px-6 py-3 text-lg rounded-lg";
      case "xl":
        return "px-8 py-4 text-xl rounded-xl";
      default:
        return "px-4 py-2 text-sm rounded-lg";
    }
  };

  /**
   * Get icon size based on button size
   */
  const getIconSize = () => {
    switch (size) {
      case "xs":
        return "w-3 h-3";
      case "sm":
        return "w-4 h-4";
      case "lg":
        return "w-6 h-6";
      case "xl":
        return "w-7 h-7";
      default:
        return "w-5 h-5";
    }
  };

  /**
   * Loading spinner component
   */
  const LoadingSpinner = () => (
    <svg
      className={`animate-spin ${getIconSize()}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const buttonClasses = `
    ${getVariantStyles()}
    ${getSizeStyles()}
    ${fullWidth ? "w-full" : ""}
    ${disabled || loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
    relative overflow-hidden inline-flex items-center justify-center gap-2
    ${className}
  `.trim();

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-disabled={disabled || loading}
      whileHover={
        !disabled && !loading
          ? {
              scale: 1.02,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      whileTap={
        !disabled && !loading
          ? {
              scale: 0.98,
              transition: { duration: 0.1 },
            }
          : undefined
      }
      {...props}
    >
      {/* Leading Icon or Loading Spinner */}
      {loading ? (
        <LoadingSpinner />
      ) : icon ? (
        <span className={getIconSize()}>{icon}</span>
      ) : null}

      {/* Button Content */}
      <span className="relative z-10">{children}</span>

      {/* Trailing Icon */}
      {iconRight && !loading && (
        <span className={getIconSize()}>{iconRight}</span>
      )}

      {/* Ripple Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full bg-white/30"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{
              scale: 0,
              opacity: 0.6,
            }}
            animate={{
              scale: 4,
              opacity: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
              },
            }}
          />
        ))}
      </div>

      {/* Hover Gradient Overlay */}
      {!disabled && !loading && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-lg" />
        </div>
      )}
    </motion.button>
  );
};

/**
 * Preset button variants for common use cases
 */

/**
 * Primary action button - for main CTAs
 */
export const PrimaryButton = (props) => (
  <RippleButton variant="primary" {...props} />
);

/**
 * Secondary action button - for supporting actions
 */
export const SecondaryButton = (props) => (
  <RippleButton variant="secondary" {...props} />
);

/**
 * Outline button - for subtle actions
 */
export const OutlineButton = (props) => (
  <RippleButton variant="outline" {...props} />
);

/**
 * Ghost button - for minimal actions
 */
export const GhostButton = (props) => (
  <RippleButton variant="ghost" {...props} />
);

/**
 * Danger button - for destructive actions
 */
export const DangerButton = (props) => (
  <RippleButton variant="danger" {...props} />
);

/**
 * Success button - for positive confirmations
 */
export const SuccessButton = (props) => (
  <RippleButton variant="success" {...props} />
);

/**
 * Icon-only button for compact layouts
 */
export const IconButton = ({ icon, ariaLabel, size = "md", ...props }) => (
  <RippleButton
    variant="ghost"
    size={size}
    ariaLabel={ariaLabel}
    className="!p-2 rounded-full"
    {...props}
  >
    {icon}
  </RippleButton>
);

export default RippleButton;
