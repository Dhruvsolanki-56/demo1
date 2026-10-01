import React, { useEffect, useState } from "react";

/**
 * Suspense fallback for route-level lazy page chunks. Renders nothing for the
 * first 150ms so an already-cached chunk (the common case after the first
 * visit) never produces a visible flash -- only a genuinely slow chunk load
 * shows anything. A single centered spinner reads as "content is on its way"
 * consistently everywhere this mounts; a progress bar implies a measurable,
 * completing task, which a chunk fetch isn't, so it's avoided here.
 * Header/Footer/Sidebar stay mounted around this (Suspense lives inside the
 * layout, not above it), so only the content area appears to load.
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-label="Loading page">
      <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-primary-100 border-t-primary-600" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
