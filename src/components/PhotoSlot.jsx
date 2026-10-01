import React from "react";

/**
 * Drop-in photo slot: renders the real image once `src` is provided; until
 * then shows a clearly-intentional placeholder (soft tint + dot pattern +
 * icon) rather than an empty gap, so it's obvious a photo belongs there
 * without looking broken in the meantime.
 */
export default function PhotoSlot({ src, alt = "", icon: Icon, className = "" }) {
  if (src) {
    return <img src={src} alt={alt} className={`object-cover ${className}`} />;
  }
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50 ${className}`}>
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: "radial-gradient(circle, #2c58bd 1.5px, transparent 1.5px)", backgroundSize: "18px 18px" }}
      />
      {Icon && <Icon size={40} strokeWidth={1.2} className="relative text-primary-300" />}
    </div>
  );
}
