"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
      primary:
        "bg-gradient-to-r from-brand to-brand-secondary text-white shadow-lg hover:shadow-xl hover:scale-[1.02] focus:ring-brand",
      secondary:
        "bg-white text-gray-900 border-2 border-gray-200 hover:border-brand hover:text-brand hover:shadow-lg focus:ring-brand",
      outline:
        "border-2 border-gray-200 bg-white/80 backdrop-blur-sm text-gray-700 hover:border-brand hover:text-brand hover:bg-white focus:ring-brand",
      ghost:
        "border-2 border-current text-gray-600 hover:text-brand hover:bg-brand/5 hover:border-brand focus:ring-brand",
      gradient:
        "bg-gradient-to-r from-brand via-brand-secondary to-accent text-white shadow-lg hover:shadow-xl hover:scale-[1.02] focus:ring-brand",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-6 py-3 text-base gap-2",
      lg: "px-8 py-4 text-lg gap-2.5",
    };

    // Add glow shadow for primary and gradient variants
    const glowShadow =
      variant === "primary" || variant === "gradient"
        ? "shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.5)]"
        : "";

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          glowShadow,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
