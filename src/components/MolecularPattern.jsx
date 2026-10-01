import React from "react";

/**
 * Decorative background texture: small circles connected by thin lines, like
 * a molecular diagram / lab schematic -- a motif specific to pharma/science,
 * used instead of the plain dot-grid so recurring dark/tinted sections don't
 * all read as the same background repeated. Purely decorative (aria-hidden),
 * absolutely positioned -- drop inside a `relative overflow-hidden` parent.
 */
export default function MolecularPattern({ className = "", opacity = 0.12 }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity }}
      width="420"
      height="420"
      viewBox="0 0 420 420"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="1.5">
        <line x1="40" y1="60" x2="140" y2="30" />
        <line x1="140" y1="30" x2="230" y2="90" />
        <line x1="230" y1="90" x2="340" y2="50" />
        <line x1="140" y1="30" x2="120" y2="150" />
        <line x1="230" y1="90" x2="260" y2="200" />
        <line x1="260" y1="200" x2="180" y2="270" />
        <line x1="260" y1="200" x2="370" y2="230" />
        <line x1="180" y1="270" x2="90" y2="320" />
        <line x1="180" y1="270" x2="230" y2="380" />
        <line x1="40" y1="60" x2="30" y2="180" />
      </g>
      <g fill="currentColor">
        <circle cx="40" cy="60" r="7" />
        <circle cx="140" cy="30" r="5" />
        <circle cx="230" cy="90" r="8" />
        <circle cx="340" cy="50" r="5" />
        <circle cx="120" cy="150" r="5" />
        <circle cx="260" cy="200" r="7" />
        <circle cx="180" cy="270" r="6" />
        <circle cx="370" cy="230" r="5" />
        <circle cx="90" cy="320" r="5" />
        <circle cx="230" cy="380" r="6" />
        <circle cx="30" cy="180" r="4" />
      </g>
    </svg>
  );
}
