import React from "react";

const CircularProgressBar = ({
  value = 0, // current value
  max = 100, // max value
  size = 120, // width/height of the SVG
  strokeWidth = 10, // thickness of the circle
}) => {
  const clampedValue = Math.min(Math.max(value, 0), max);
  const progress = clampedValue / max;

  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <svg width={size} height={size} className="block">
      {/* Background circle (track) */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#e5e7eb" // Tailwind gray-200-ish
        strokeWidth={strokeWidth}
      />

      {/* Progress circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#4f46e5" // Tailwind indigo-600-ish
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        // rotate -90deg so it starts from the top
        transform={`rotate(-90 ${center} ${center})`}
      />

      {/* Optional text in the center */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={size * 0.2}
        fill="#111827"
      >
        {Math.round(progress * 100)}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
