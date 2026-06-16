import React from 'react';

export default function BrandLogo({ className = "h-10 sm:h-12 md:h-14" }: { className?: string }) {
  return (
    <div className="flex items-center">
      <img
        src="/logo.png"
        alt="Sooftcode Logo"
        className={`object-contain transition-opacity duration-300 hover:opacity-90 ${className}`}
      />
    </div>
  );
}
