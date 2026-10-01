import React from "react";
import { Helmet } from "react-helmet-async";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { COMPANY_NAME, SEO_DEFAULT_TITLE, SEO_DEFAULT_DESCRIPTION } from "../data/siteContent";

/**
 * Shared SEO tag renderer. Falls back to the site-wide static defaults
 * whenever a page doesn't provide its own title/description. `company_name`
 * still comes from Site Settings since that's admin-configurable; the SEO
 * defaults themselves are static copy, not CMS content.
 */
export default function SEO({ title, description, image, canonicalPath, jsonLd, noIndex = false }) {
  const { settings } = useSiteSettings();

  const resolvedTitle = title
    ? `${title} | ${settings.company_name || COMPANY_NAME}`
    : SEO_DEFAULT_TITLE;
  const resolvedDescription = description || SEO_DEFAULT_DESCRIPTION;
  const url = canonicalPath && typeof window !== "undefined" ? `${window.location.origin}${canonicalPath}` : undefined;
  // A social share card with no image looks broken/untrustworthy when a page
  // doesn't supply its own (e.g. no product photo) -- fall back to the logo
  // rather than omitting og:image entirely.
  const resolvedImage = image || (typeof window !== "undefined" ? `${window.location.origin}/logo.png` : undefined);

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {url && <link rel="canonical" href={url} />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      {url && <meta property="og:url" content={url} />}
      {resolvedImage && <meta property="og:image" content={resolvedImage} />}

      <meta name="twitter:card" content={resolvedImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      {resolvedImage && <meta name="twitter:image" content={resolvedImage} />}

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
