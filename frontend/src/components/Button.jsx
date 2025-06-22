import React from "react";
import clsx from "clsx";

export function Button({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) {
  const base = "rounded-full flex items-center justify-center transition font-medium";

  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-500 text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "w-10 h-10 text-sm",   // small circular
    md: "w-12 h-12 text-base", // medium circular
    lg: "w-14 h-14 text-lg",   // large circular
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
