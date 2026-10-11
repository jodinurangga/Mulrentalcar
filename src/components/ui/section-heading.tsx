import React from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: HeadingTag = "h2",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-8 sm:mb-12 ${
        isCenter ? "text-center mx-auto max-w-3xl" : "max-w-3xl"
      } ${className}`.trim()}
    >
      {eyebrow && (
        <div className={`flex items-center gap-2 mb-3 ${isCenter ? "justify-center" : ""}`}>
          <span className="w-5 h-[1px] bg-[#C49A3A]" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#7A5817]">
            {eyebrow}
          </span>
          <span className="w-5 h-[1px] bg-[#C49A3A]" aria-hidden="true" />
        </div>
      )}
      <HeadingTag className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal sm:font-medium tracking-tight text-[#20252B] leading-[1.2]">
        {title}
      </HeadingTag>
      {description && (
        <p className="mt-3.5 text-sm sm:text-base text-[#5A626A] leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
