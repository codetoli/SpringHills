import React from "react";
import { Link } from "react-router-dom"; // Recommended for the Home link

const Banner = ({ title, highlightText, subtitle, breadcrumb }) => {
  return (
    <section className="relative bg-[#1C3F82] pt-24 pb-12 md:pt-32 md:pb-20 px-4 md:px-6 overflow-hidden">
      {/* Decorative Background Elements - Scaled for mobile */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <div className="absolute transform -rotate-12 -left-5 -top-5 text-white text-6xl md:text-9xl font-bold whitespace-nowrap">
          SHEBS SCHOOL
        </div>
      </div>

      {/* Floating Orange Glow - Adjusted size for mobile */}
      <div className="absolute -top-12 -right-12 md:-top-24 md:-right-24 w-48 h-48 md:w-96 md:h-96 bg-[#FF6B34] rounded-full blur-[80px] md:blur-[120px] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Main Title - Smaller on mobile (text-3xl) and tab (text-5xl) */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight uppercase mb-3 md:mb-4">
          {title} <span className="text-[#FF6B34]">{highlightText}</span>
        </h1>

        {/* Breadcrumb Navigation - Tighter gap and smaller text for mobile */}
        <div className="flex items-center justify-center gap-2 text-white/80 text-xs md:text-base mb-4 md:mb-6">
          <Link to="/" className="hover:text-[#FF6B34] transition-colors">
            Home
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-white font-medium">{breadcrumb}</span>
        </div>

        {/* Subtitle / Description - Controlled width and text size */}
        {subtitle && (
          <p className="text-white/70 max-w-xs sm:max-w-md md:max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed px-2">
            {subtitle}
          </p>
        )}

        {/* Animated Underline - Scaled down for mobile */}
        <div className="h-1 w-16 md:w-24 bg-[#FF6B34] mx-auto mt-6 md:mt-8 rounded-full" />
      </div>
    </section>
  );
};

export default Banner;
