"use client";
import React from "react";

type LoadingSpinnerProps = {
  size?: number | string;
  fullScreen?: boolean;
  label?: string;
  className?: string;
};
export default function LoadingSpinner({
  size = 48,
  fullScreen = true,
  label = "Loading",
  className = "",
}: LoadingSpinnerProps) {
  const sizeStyle =
    typeof size === "number"
      ? { width: size, height: size }
      : { width: size, height: size };

  const wrapperClasses = fullScreen
    ? `fixed inset-0 flex items-center justify-center z-50 ${className}`
    : `flex items-center justify-center ${className}`;

  return (
    <div
      className={wrapperClasses}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div
        style={sizeStyle}
        className="animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
      />
      {/* assistive text for screen readers */}
      <span className="sr-only">{label}</span>
    </div>
  );
}
