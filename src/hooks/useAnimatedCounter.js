/**
 * Custom Hook for Animated Counter Effects
 *
 * Provides smooth count-up animations for numerical values with
 * configurable duration, easing, and formatting options.
 * Used throughout the Creator dashboard for statistics display.
 *
 * Features:
 * - Smooth easing animations
 * - Custom duration and delay
 * - Number formatting (currency, percentage, etc.)
 * - Intersection Observer support for scroll-triggered animations
 * - Performance optimized with requestAnimationFrame
 */

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Easing function for smooth animations
 * Uses cubic-bezier for natural motion feel
 */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/**
 * useAnimatedCounter Hook
 *
 * @param {number} endValue - Final value to count to
 * @param {Object} options - Configuration options
 * @param {number} options.duration - Animation duration in milliseconds (default: 2000)
 * @param {number} options.delay - Delay before starting animation (default: 0)
 * @param {boolean} options.triggerOnView - Whether to trigger on element coming into view (default: true)
 * @param {string} options.format - Number format type: 'currency', 'percentage', 'number' (default: 'number')
 * @param {boolean} options.preserveDecimals - Whether to show decimal places (default: false)
 * @param {string} options.prefix - Text to prepend to value (default: '')
 * @param {string} options.suffix - Text to append to value (default: '')
 *
 * @returns {Object} { value, formattedValue, ref, isAnimating, restart }
 */
export const useAnimatedCounter = (endValue, options = {}) => {
  const {
    duration = 2000,
    delay = 0,
    triggerOnView = true,
    format = "number",
    preserveDecimals = false,
    prefix = "",
    suffix = "",
  } = options;

  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const elementRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  /**
   * Format number based on specified format type
   */
  const formatValue = useCallback(
    (value) => {
      let formattedValue;

      switch (format) {
        case "currency":
          formattedValue = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: preserveDecimals ? 2 : 0,
            maximumFractionDigits: preserveDecimals ? 2 : 0,
          }).format(value);
          break;

        case "percentage":
          formattedValue = `${preserveDecimals ? value.toFixed(1) : Math.round(value)}%`;
          break;

        case "compact":
          if (value >= 1000000) {
            formattedValue = `${(value / 1000000).toFixed(1)}M`;
          } else if (value >= 1000) {
            formattedValue = `${(value / 1000).toFixed(1)}K`;
          } else {
            formattedValue = preserveDecimals
              ? value.toFixed(1)
              : Math.round(value).toString();
          }
          break;

        default:
          formattedValue = new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: preserveDecimals ? 1 : 0,
            maximumFractionDigits: preserveDecimals ? 1 : 0,
          }).format(value);
      }

      return `${prefix}${formattedValue}${suffix}`;
    },
    [format, preserveDecimals, prefix, suffix],
  );

  /**
   * Animation function using requestAnimationFrame
   */
  const animate = useCallback(
    (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const newValue = easedProgress * endValue;
      setCurrentValue(newValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
        setIsAnimating(false);
        startTimeRef.current = null;
      }
    },
    [endValue, duration],
  );

  /**
   * Start the animation with optional delay
   */
  const startAnimation = useCallback(() => {
    if (isAnimating || hasTriggered) return;

    setHasTriggered(true);
    setIsAnimating(true);
    setCurrentValue(0);

    const delayedStart = () => {
      animationRef.current = requestAnimationFrame(animate);
    };

    if (delay > 0) {
      setTimeout(delayedStart, delay);
    } else {
      delayedStart();
    }
  }, [animate, delay, isAnimating, hasTriggered]);

  /**
   * Restart animation (useful for manual triggers)
   */
  const restart = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setHasTriggered(false);
    setIsAnimating(false);
    setCurrentValue(0);
    startTimeRef.current = null;

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      startAnimation();
    });
  }, [startAnimation]);

  /**
   * Intersection Observer for scroll-triggered animations
   */
  useEffect(() => {
    if (!triggerOnView || !elementRef.current) {
      // If not using intersection observer, start immediately
      if (!triggerOnView) {
        startAnimation();
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            startAnimation();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "-50px", // Start animation 50px before element is visible
      },
    );

    const currentElement = elementRef.current;
    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [triggerOnView, startAnimation, hasTriggered]);

  /**
   * Cleanup animation on unmount
   */
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  /**
   * Update animation when endValue changes
   */
  useEffect(() => {
    if (!triggerOnView && !isAnimating) {
      startAnimation();
    }
  }, [endValue, triggerOnView, isAnimating, startAnimation]);

  return {
    value: currentValue,
    formattedValue: formatValue(currentValue),
    ref: elementRef,
    isAnimating,
    restart,
    hasTriggered,
  };
};

/**
 * useCountUp Hook - Simplified version for basic count-up animations
 *
 * @param {number} endValue - Final value to count to
 * @param {number} duration - Animation duration in milliseconds
 * @param {boolean} start - Whether to start animation
 *
 * @returns {number} Current animated value
 */
export const useCountUp = (endValue, duration = 2000, start = true) => {
  const { value } = useAnimatedCounter(endValue, {
    duration,
    triggerOnView: false,
  });

  return Math.round(value);
};

/**
 * usePercentageCounter Hook - Specialized for percentage values
 *
 * @param {number} percentage - Percentage value (0-100)
 * @param {Object} options - Configuration options
 *
 * @returns {Object} Animation state and formatted percentage
 */
export const usePercentageCounter = (percentage, options = {}) => {
  return useAnimatedCounter(percentage, {
    ...options,
    format: "percentage",
    preserveDecimals: true,
  });
};

/**
 * useCurrencyCounter Hook - Specialized for currency values
 *
 * @param {number} amount - Currency amount
 * @param {Object} options - Configuration options
 *
 * @returns {Object} Animation state and formatted currency
 */
export const useCurrencyCounter = (amount, options = {}) => {
  return useAnimatedCounter(amount, {
    ...options,
    format: "currency",
  });
};

export default useAnimatedCounter;
