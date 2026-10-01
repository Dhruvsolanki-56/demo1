import React from "react";
import { Link } from "react-router-dom";

const SIZES = {
  default: "h-11 sm:h-12",
  large: "h-14 sm:h-16",
};

export default function Logo({ size = "default", className = "" }) {
  return (
    <Link to="/" className={`flex items-center select-none ${className}`} aria-label="Strikar Lifescience LLP — Home">
      <img src="/logo.png" alt="Strikar Lifescience LLP" className={`${SIZES[size]} w-auto`} />
    </Link>
  );
}
