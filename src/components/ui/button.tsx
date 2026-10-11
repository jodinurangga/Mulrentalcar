import React from "react";
import Link from "next/link";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "whatsapp"
  | "outline";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  isFullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#20252B] text-white hover:bg-[#343B45] border border-[#20252B] shadow-2xs hover:shadow-xs",
  secondary:
    "border border-[#20252B] text-[#20252B] bg-transparent hover:bg-[#20252B] hover:text-white",
  tertiary:
    "text-[#20252B] bg-transparent hover:text-[#7A5817] underline underline-offset-6 decoration-[#C49A3A] px-2 shadow-none",
  whatsapp:
    "bg-[#128C7E] text-white hover:bg-[#075E54] border border-[#128C7E] shadow-2xs hover:shadow-xs",
  outline:
    "border border-[#E5E0D4] text-[#20252B] bg-white hover:bg-[#F7F4EC] hover:border-[#C49A3A]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-[44px] px-4 py-2 text-xs uppercase tracking-wider font-semibold",
  md: "min-h-[44px] px-6 py-2.5 text-sm tracking-wide font-semibold",
  lg: "min-h-[48px] px-8 py-3.5 text-sm sm:text-base tracking-wide font-semibold",
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      target,
      rel,
      isFullWidth = false,
      disabled = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-none transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#C49A3A] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";

    const combinedClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${
      isFullWidth ? "w-full" : ""
    } ${className}`.trim();

    if (href && !disabled) {
      const isExternal = href.startsWith("http") || href.startsWith("//");
      const defaultRel = isExternal ? "noopener noreferrer" : undefined;

      return (
        <Link
          href={href}
          target={target}
          rel={rel || defaultRel}
          className={combinedClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
