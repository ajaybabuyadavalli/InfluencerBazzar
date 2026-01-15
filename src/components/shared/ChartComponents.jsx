/**
 * Chart Components for Creator Analytics Dashboard
 *
 * Comprehensive set of chart components built with custom SVG rendering
 * and animations. Provides interactive data visualizations for:
 * - Line charts (engagement timeline, growth metrics)
 * - Pie charts (campaign status, audience breakdown)
 * - Bar charts (platform comparison, earnings)
 * - Donut charts (progress indicators)
 * - Heatmaps (content performance by time)
 *
 * Features:
 * - Smooth entrance animations
 * - Interactive hover states
 * - Responsive design
 * - Customizable colors and styling
 * - Tooltip support
 * - Loading states
 *
 * {{Dynamic}} - All data comes from API responses
 * Chart data should be formatted according to expected structure
 *
 * Backend Integration:
 * - GET /api/creator/analytics/engagement-timeline
 * - GET /api/creator/analytics/platform-comparison
 * - GET /api/creator/analytics/audience-breakdown
 * - GET /api/creator/analytics/content-heatmap
 */

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * LineChart Component
 *
 * Displays time-series data with smooth animations and hover interactions
 *
 * {{Dynamic}} - Data from GET /api/creator/analytics/engagement-timeline
 * Expected format: [{ date: '2024-01-01', instagram: 8.2, youtube: 7.5, tiktok: 9.1 }]
 */
export const LineChart = ({
  data = [],
  width = 400,
  height = 200,
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
  colors = ["#6366f1", "#8b5cf6", "#10b981"],
  showGrid = true,
  showTooltip = true,
  animate = true,
  isLoading = false,
}) => {
  const [tooltip, setTooltip] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const svgRef = useRef(null);
  const controls = useAnimation();

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Extract data keys (excluding date)
  const dataKeys =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== "date") : [];

  // Calculate scales
  const xScale = (index) => (index / (data.length - 1)) * chartWidth;
  const yValues = data.flatMap((d) => dataKeys.map((key) => d[key]));
  const yMin = Math.min(...yValues, 0);
  const yMax = Math.max(...yValues);
  const yScale = (value) =>
    chartHeight - ((value - yMin) / (yMax - yMin)) * chartHeight;

  /**
   * Generate SVG path for line
   */
  const generatePath = (dataKey) => {
    return data
      .map((point, index) => {
        const x = xScale(index);
        const y = yScale(point[dataKey]);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  /**
   * Handle point hover
   */
  const handlePointHover = (point, index, dataKey, event) => {
    if (!showTooltip) return;

    const rect = svgRef.current.getBoundingClientRect();
    setTooltip({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      data: point,
      dataKey,
      index,
    });
    setHoveredPoint({ index, dataKey });
  };

  /**
   * Handle mouse leave
   */
  const handleMouseLeave = () => {
    setTooltip(null);
    setHoveredPoint(null);
  };

  /**
   * Animation on mount
   */
  useEffect(() => {
    if (animate && data.length > 0) {
      controls.start({
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: 1.5,
          ease: "easeInOut",
        },
      });
    }
  }, [controls, animate, data]);

  if (isLoading) {
    return (
      <div className="w-full h-48 bg-gray-800/50 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Loading chart...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-800/50 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">No data available</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="overflow-visible"
        onMouseLeave={handleMouseLeave}
      >
        {/* Grid Lines */}
        {showGrid && (
          <g className="opacity-20">
            {/* Horizontal grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <line
                key={`h-grid-${i}`}
                x1={margin.left}
                y1={margin.top + ratio * chartHeight}
                x2={margin.left + chartWidth}
                y2={margin.top + ratio * chartHeight}
                stroke="#6b7280"
                strokeWidth="1"
              />
            ))}

            {/* Vertical grid lines */}
            {data.map((_, index) => (
              <line
                key={`v-grid-${index}`}
                x1={margin.left + xScale(index)}
                y1={margin.top}
                x2={margin.left + xScale(index)}
                y2={margin.top + chartHeight}
                stroke="#6b7280"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Lines */}
        {dataKeys.map((dataKey, keyIndex) => (
          <motion.path
            key={dataKey}
            d={generatePath(dataKey)}
            stroke={colors[keyIndex % colors.length]}
            strokeWidth="3"
            fill="none"
            transform={`translate(${margin.left}, ${margin.top})`}
            initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
            animate={controls}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Data Points */}
        {dataKeys.map((dataKey, keyIndex) =>
          data.map((point, index) => (
            <circle
              key={`${dataKey}-${index}`}
              cx={margin.left + xScale(index)}
              cy={margin.top + yScale(point[dataKey])}
              r={
                hoveredPoint?.index === index &&
                hoveredPoint?.dataKey === dataKey
                  ? 6
                  : 4
              }
              fill={colors[keyIndex % colors.length]}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={(e) => handlePointHover(point, index, dataKey, e)}
            />
          )),
        )}

        {/* Axes */}
        <g className="text-xs text-gray-400">
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const value = yMin + (yMax - yMin) * (1 - ratio);
            return (
              <text
                key={`y-label-${i}`}
                x={margin.left - 10}
                y={margin.top + ratio * chartHeight + 4}
                textAnchor="end"
                className="fill-gray-400"
              >
                {value.toFixed(1)}
              </text>
            );
          })}

          {/* X-axis labels */}
          {data.map((point, index) => (
            <text
              key={`x-label-${index}`}
              x={margin.left + xScale(index)}
              y={margin.top + chartHeight + 20}
              textAnchor="middle"
              className="fill-gray-400"
            >
              {new Date(point.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </text>
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-10 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl pointer-events-none"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
          }}
        >
          <div className="text-sm text-white">
            <div className="font-medium mb-1">
              {new Date(tooltip.data.date).toLocaleDateString()}
            </div>
            <div className="text-gray-300">
              {tooltip.dataKey}: {tooltip.data[tooltip.dataKey]}%
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/**
 * PieChart Component
 *
 * Displays categorical data as pie slices with hover animations
 *
 * {{Dynamic}} - Data from various API endpoints depending on use case
 * Expected format: [{ label: 'Instagram', value: 45, color: '#6366f1' }]
 */
export const PieChart = ({
  data = [],
  width = 200,
  height = 200,
  innerRadius = 0,
  showLabels = true,
  showLegend = true,
  animate = true,
  isLoading = false,
}) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const controls = useAnimation();

  const radius = Math.min(width, height) / 2 - 20;
  const centerX = width / 2;
  const centerY = height / 2;

  // Calculate angles
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -Math.PI / 2; // Start from top

  const segments = data.map((item, index) => {
    const angle = (item.value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    return {
      ...item,
      startAngle,
      endAngle,
      index,
    };
  });

  /**
   * Generate SVG path for pie segment
   */
  const generateArcPath = (
    startAngle,
    endAngle,
    outerRadius,
    innerRadius = 0,
  ) => {
    const x1 = centerX + Math.cos(startAngle) * outerRadius;
    const y1 = centerY + Math.sin(startAngle) * outerRadius;
    const x2 = centerX + Math.cos(endAngle) * outerRadius;
    const y2 = centerY + Math.sin(endAngle) * outerRadius;

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    if (innerRadius > 0) {
      const x3 = centerX + Math.cos(endAngle) * innerRadius;
      const y3 = centerY + Math.sin(endAngle) * innerRadius;
      const x4 = centerX + Math.cos(startAngle) * innerRadius;
      const y4 = centerY + Math.sin(startAngle) * innerRadius;

      return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
    } else {
      return `M ${centerX} ${centerY} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    }
  };

  /**
   * Animation on mount
   */
  useEffect(() => {
    if (animate && data.length > 0) {
      controls.start({
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      });
    }
  }, [controls, animate, data]);

  if (isLoading) {
    return (
      <div className="w-full h-48 bg-gray-800/50 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Loading chart...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-800/50 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">No data available</div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <motion.svg
        width={width}
        height={height}
        initial={animate ? { scale: 0, opacity: 0 } : undefined}
        animate={controls}
      >
        {segments.map((segment) => {
          const isHovered = hoveredSegment === segment.index;
          const segmentRadius = isHovered ? radius + 5 : radius;

          return (
            <motion.path
              key={segment.index}
              d={generateArcPath(
                segment.startAngle,
                segment.endAngle,
                segmentRadius,
                innerRadius,
              )}
              fill={segment.color}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredSegment(segment.index)}
              onMouseLeave={() => setHoveredSegment(null)}
              whileHover={{ scale: 1.05 }}
            />
          );
        })}

        {/* Labels */}
        {showLabels &&
          segments.map((segment) => {
            const angle = (segment.startAngle + segment.endAngle) / 2;
            const labelRadius = radius * 0.7;
            const x = centerX + Math.cos(angle) * labelRadius;
            const y = centerY + Math.sin(angle) * labelRadius;

            return (
              <text
                key={`label-${segment.index}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-white pointer-events-none"
              >
                {segment.value}%
              </text>
            );
          })}
      </motion.svg>

      {/* Legend */}
      {showLegend && (
        <div className="space-y-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm cursor-pointer"
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-300">{item.label}</span>
              <span className="text-white font-medium ml-auto">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * BarChart Component
 *
 * Displays comparative data as horizontal or vertical bars
 *
 * {{Dynamic}} - Data from platform comparison or earnings breakdown APIs
 * Expected format: [{ label: 'Instagram', value: 8.5, color: '#6366f1' }]
 */
export const BarChart = ({
  data = [],
  width = 400,
  height = 300,
  margin = { top: 20, right: 30, bottom: 40, left: 80 },
  horizontal = true,
  animate = true,
  showValues = true,
  isLoading = false,
}) => {
  const controls = useAnimation();

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const maxValue = Math.max(...data.map((d) => d.value));
  const scale = horizontal ? chartWidth / maxValue : chartHeight / maxValue;
  const barHeight = horizontal
    ? (chartHeight / data.length) * 0.8
    : (chartWidth / data.length) * 0.8;

  /**
   * Animation on mount
   */
  useEffect(() => {
    if (animate && data.length > 0) {
      controls.start({
        scaleX: horizontal ? 1 : undefined,
        scaleY: horizontal ? undefined : 1,
        opacity: 1,
        transition: {
          duration: 1,
          ease: "easeOut",
          staggerChildren: 0.1,
        },
      });
    }
  }, [controls, animate, data, horizontal]);

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-gray-800/50 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Loading chart...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">No data available</div>
      </div>
    );
  }

  return (
    <svg width={width} height={height}>
      {data.map((item, index) => {
        const barLength = item.value * scale;
        const position = horizontal
          ? (chartHeight / data.length) * index +
            (chartHeight / data.length - barHeight) / 2
          : (chartWidth / data.length) * index +
            (chartWidth / data.length - barHeight) / 2;

        return (
          <g key={index}>
            {/* Bar */}
            <motion.rect
              x={horizontal ? margin.left : margin.left + position}
              y={
                horizontal
                  ? margin.top + position
                  : margin.top + chartHeight - barLength
              }
              width={horizontal ? barLength : barHeight}
              height={horizontal ? barHeight : barLength}
              fill={item.color}
              className="cursor-pointer"
              initial={
                animate
                  ? {
                      [horizontal ? "scaleX" : "scaleY"]: 0,
                      opacity: 0,
                    }
                  : undefined
              }
              animate={controls}
              whileHover={{ opacity: 0.8 }}
              style={{
                transformOrigin: horizontal ? "left center" : "center bottom",
              }}
            />

            {/* Label */}
            <text
              x={
                horizontal
                  ? margin.left - 10
                  : margin.left + position + barHeight / 2
              }
              y={
                horizontal
                  ? margin.top + position + barHeight / 2
                  : height - margin.bottom + 15
              }
              textAnchor={horizontal ? "end" : "middle"}
              dominantBaseline={horizontal ? "middle" : "hanging"}
              className="text-sm fill-gray-300"
            >
              {item.label}
            </text>

            {/* Value */}
            {showValues && (
              <text
                x={
                  horizontal
                    ? margin.left + barLength + 5
                    : margin.left + position + barHeight / 2
                }
                y={
                  horizontal
                    ? margin.top + position + barHeight / 2
                    : margin.top + chartHeight - barLength - 5
                }
                textAnchor={horizontal ? "start" : "middle"}
                dominantBaseline={horizontal ? "middle" : "auto"}
                className="text-sm fill-white font-medium"
              >
                {item.value}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * DonutChart Component - Specialized pie chart with center content
 *
 * {{Dynamic}} - Used for progress indicators, score breakdowns
 */
export const DonutChart = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = "#6366f1",
  backgroundColor = "#374151",
  children,
  animate = true,
}) => {
  const controls = useAnimation();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (animate) {
      controls.start({
        strokeDashoffset,
        transition: {
          duration: 1.5,
          ease: "easeOut",
        },
      });
    }
  }, [controls, animate, strokeDashoffset]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={animate ? { strokeDashoffset: circumference } : undefined}
          animate={controls}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (
          <span className="text-xl font-bold text-white">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default {
  LineChart,
  PieChart,
  BarChart,
  DonutChart,
};
