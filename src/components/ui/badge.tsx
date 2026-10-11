import React from "react";

export type BadgeVariant = "default" | "accent" | "indicative" | "category" | "success";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[#F7F4EC] text-[#20252B] border border-[#E5E0D4]",
  accent: "bg-[#F7F4EC] text-[#7A5817] border border-[#C49A3A]/50 tracking-wider uppercase font-semibold",
  indicative: "bg-[#F7F4EC] text-[#20252B] border border-[#E5E0D4] font-medium tracking-wide",
  category: "bg-white text-[#5A626A] border border-[#E5E0D4] tracking-wider uppercase font-medium",
  success: "bg-emerald-50 text-[#15803D] border border-emerald-200",
};

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-none text-xs ${variantStyles[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
