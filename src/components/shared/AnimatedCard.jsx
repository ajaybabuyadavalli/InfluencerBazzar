/**
 * Animated Card Component with Ripple Effects
 *
 * A reusable card component that provides:
 * - Ripple effect on click/touch
 * - Smooth hover animations
 * - Customizable styling and layout
 * - Glass morphism effects
 * - Scroll-triggered animations
 *
 * Used throughout the Creator dashboard for consistent UI elements.
 * Optimized for both desktop and mobile interactions.
 *
 * Props:
 * - children: React nodes to render inside the card
 * - onClick: Click handler function
 * - className: Additional CSS classes
 * - variant: 'default', 'glass', 'gradient', 'outline'
 * - size: 'sm', 'md', 'lg'
 * - hover: Enable hover animations (default: true)
 * - ripple: Enable ripple effect (default: true)
 * - animateOnScroll: Enable scroll-triggered animations (default: false)
 */

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

/**
 * AnimatedCard Component
 *
 * {{Dynamic}} - No backend integration needed, purely UI component
 * Can be used with dynamic data passed through children prop
 */
const AnimatedCard = ({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "md",
  hover = true,
  ripple = true,
  animateOnScroll = false,
  disabled = false,
  ...props
}) => {
  const [ripples, setRipples] = useState([]);
  const cardRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  /**
   * Handle ripple effect on click/touch
   * Creates expanding circle animation from click position
   */
  const handleRipple = (event) => {
    if (!ripple || disabled) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  /**
   * Handle card click with ripple effect
   */
  const handleClick = (event) => {
    if (disabled) return;

    handleRipple(event);
    if (onClick) {
      onClick(event);
    }
  };

  /**
   * Scroll-triggered animation effect
   */
  useEffect(() => {
    if (animateOnScroll && isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.25, 0, 1],
        },
      });
    }
  }, [controls, isInView, animateOnScroll]);

  /**
   * Get variant-specific styles
   */
  const getVariantStyles = () => {
    const baseStyles =
      "relative overflow-hidden transition-all duration-300 ease-out";

    switch (variant) {
      case "glass":
        return `${baseStyles} bg-white/10 backdrop-blur-md border border-white/20 shadow-xl`;

      case "gradient":
        return `${baseStyles} bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-400/30 shadow-lg`;

      case "outline":
        return `${baseStyles} bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-400`;

      default:
        return `${baseStyles} bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md`;
    }
  };

  /**
   * Get size-specific styles
   */
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "p-3 rounded-lg";
      case "lg":
        return "p-8 rounded-2xl";
      default:
        return "p-6 rounded-xl";
    }
  };

  /**
   * Get hover animation styles
   */
  const getHoverStyles = () => {
    if (!hover || disabled) return "";

    return "hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]";
  };

  /**
   * Motion variants for animations
   */
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  /**
   * Ripple animation variants
   */
  const rippleVariants = {
    initial: {
      scale: 0,
      opacity: 0.6,
    },
    animate: {
      scale: 4,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardClasses = `
    ${getVariantStyles()}
    ${getSizeStyles()}
    ${getHoverStyles()}
    ${onClick ? "cursor-pointer" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `.trim();

  return (
    <motion.div
      ref={cardRef}
      className={cardClasses}
      onClick={handleClick}
      variants={animateOnScroll ? cardVariants : undefined}
      initial={animateOnScroll ? "hidden" : undefined}
      animate={animateOnScroll ? controls : undefined}
      whileHover={
        hover && !disabled
          ? {
              y: -4,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      whileTap={
        onClick && !disabled
          ? {
              scale: 0.98,
              transition: { duration: 0.1 },
            }
          : undefined
      }
      {...props}
    >
      {/* Card Content */}
      <div className="relative z-10">{children}</div>

      {/* Ripple Effects */}
      {ripple && (
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
              variants={rippleVariants}
              initial="initial"
              animate="animate"
            />
          ))}
        </div>
      )}

      {/* Hover Glow Effect */}
      {hover && !disabled && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-xl" />
        </div>
      )}
    </motion.div>
  );
};

/**
 * StatCard - Specialized card for displaying statistics
 *
 * {{Dynamic}} - Props like value, change, trend come from API responses
 * Usage: <StatCard title="Total Earnings" value={stats.totalEarnings} />
 */
export const StatCard = ({
  title,
  value,
  change,
  trend = "up",
  icon,
  color = "indigo",
  isLoading = false,
  ...props
}) => {
  const trendIcon = trend === "up" ? "↗" : trend === "down" ? "↘" : "→";
  const trendColor =
    trend === "up"
      ? "text-green-400"
      : trend === "down"
        ? "text-red-400"
        : "text-gray-400";

  return (
    <AnimatedCard
      variant="glass"
      className="group"
      animateOnScroll={true}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>

          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-24"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold text-white mb-1">{value}</div>

              {change && (
                <div className={`flex items-center text-sm ${trendColor}`}>
                  <span className="mr-1">{trendIcon}</span>
                  <span>{change}</span>
                </div>
              )}
            </>
          )}
        </div>

        {icon && (
          <div
            className={`text-2xl text-${color}-400 group-hover:scale-110 transition-transform duration-200`}
          >
            {icon}
          </div>
        )}
      </div>
    </AnimatedCard>
  );
};

/**
 * ActionCard - Card with primary call-to-action
 *
 * {{Dynamic}} - Used for campaign cards, quick actions, etc.
 * Data comes from API responses for campaigns, notifications, etc.
 */
export const ActionCard = ({
  title,
  description,
  action,
  actionText = "Take Action",
  image,
  badge,
  isLoading = false,
  ...props
}) => {
  return (
    <AnimatedCard variant="glass" hover={true} className="group" {...props}>
      {image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {badge && (
            <span className="px-2 py-1 text-xs font-medium bg-indigo-500/20 text-indigo-300 rounded-full">
              {badge}
            </span>
          )}
        </div>

        <p className="text-gray-400 text-sm">{description}</p>

        {action && (
          <button
            onClick={action}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
          >
            {actionText}
          </button>
        )}
      </div>
    </AnimatedCard>
  );
};

export default AnimatedCard;
