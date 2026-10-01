import React, { Suspense, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloatButton from "./WhatsAppFloatButton";
import BackToTopButton from "./BackToTopButton";
import PageLoader from "./PageLoader";
import { trackPageView } from "../lib/siteMetrics";
import SmoothScroll, { useLenis } from "./motion/SmoothScroll";
import { RouteProgress } from "./motion/Premium";

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  // useLayoutEffect (not useEffect) runs synchronously before the browser
  // paints the new route's content -- with useEffect, the new page briefly
  // painted at the OLD scroll position first (a visible jump/flicker on
  // every navigation) before the effect fired a frame later to correct it.
  //
  // Lenis owns the scroll position while it is running, so telling the
  // browser alone would leave Lenis mid-flight and animate back down the page.
  useLayoutEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    trackPageView(pathname);
  }, [pathname, lenis]);

  return null;
}

export default function PublicLayout() {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ScrollToTop />
        <RouteProgress />
        <Header />
        {/* Reserves the floating header's height (plus the frame gutter) so
            every page starts just below it without its own offset. */}
        <div aria-hidden="true" className="h-[96px] shrink-0 sm:h-[106px] lg:h-[122px]" />
        <main id="main-content" className="flex-1">
          {/* No key={pathname} here -- it forced every page to fully unmount
              and remount on each navigation (just for a fade-in), which meant
              every page's data-fetching useEffect re-ran from scratch on every
              click, not only on a genuine first load. Each route already mounts
              fresh when its component changes; this was pure duplicate work.
              Entrance motion is handled per-section by the Reveal primitives,
              which do not require a remount. */}
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloatButton />
        <BackToTopButton />
      </div>
    </SmoothScroll>
  );
}
