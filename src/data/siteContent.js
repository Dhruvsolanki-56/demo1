// Static corporate copy, sourced from client_given/ (see docs/02_PRODUCT_IMPORT_GUIDE.md and
// CLIENT_CONTENT_TRANSFORMATION.md for provenance). This is not admin-editable by design — only
// operational contact details (phone, email, address, socials, etc.) are configurable from
// Admin -> Site Settings; everything here is written directly into the page.

export const COMPANY_NAME = "Strikar Lifescience LLP";

export const TAGLINE = "Advancing Healthcare Through Manufacturing, Innovation, and Global Access";

export const HERO_HEADING = "Your Partner in Global Pharmaceutical Manufacturing";

// Kept short on purpose -- this sits directly under a large H1 and an eyebrow
// tagline in the hero, so it only needs to add the one fact those two don't
// already cover (the hub locations). The full region list still lives in
// ABOUT_INTRO below, for the About page.
export const HERO_SUBHEADING =
  "WHO-GMP manufacturing in India, with regional hubs in Guatemala and Thailand, and a regional presence in El Salvador.";

export const ABOUT_INTRO =
  "Strikar Lifescience LLP is a diversified healthcare company spanning pharmaceutical manufacturing, nutraceuticals, hospital and healthcare solutions, emergency supply and patient access, and personal hygiene products. Backed by over 35 years of combined industry expertise, we operate a manufacturing and technical excellence hub in India, with regional hubs in Guatemala and Thailand and a regional presence in El Salvador, serving healthcare partners across Central America, Latin America, the Caribbean, Southeast Asia, Africa, and the CIS region.";

// Short homepage teaser -- ABOUT_INTRO above is the full version for the About
// page; the homepage's Company Intro section links straight to /about for it.
export const HOME_INTRO_TEASER =
  "A diversified healthcare company backed by over 35 years of combined industry expertise, manufacturing and delivering pharmaceutical, nutraceutical, and healthcare solutions from our India hub, with regional hubs in Guatemala and Thailand.";

export const VISION =
  "To become a globally trusted healthcare organization recognized for manufacturing excellence, healthcare accessibility, innovation, and long-term partnerships that improve lives across international markets.";

export const MISSION =
  "To develop, manufacture, commercialize, and deliver high-quality healthcare solutions supported by regulatory expertise, scientific innovation, and customer-focused collaboration, enabling our partners to improve healthcare access and create sustainable value in their respective markets.";

export const CORE_VALUES = [
  "Quality-First Approach",
  "Long-Term Partnership Mindset",
  "Transparent & Responsible Collaboration",
  "Patient-Centered Thinking",
  "Regulatory Compliance",
  "Continuous Improvement",
  "Customer Satisfaction",
];

export const WHY_CHOOSE_US = [
  "WHO-GMP Manufacturing Excellence",
  "Multiple Dosage Forms & Therapeutic Categories",
  "Product Development & Formulation Expertise",
  "Regulatory Affairs & Registration Support",
  "CMO, CDMO & Private Label Manufacturing",
  "Strategic Manufacturing & Regulatory Alliances",
  "Regional Hubs in Guatemala & Thailand",
  "Government & Institutional Healthcare Experience",
  "Emergency Supply & Patient Access Solutions",
  "Long-Term, Customer-Focused Partnerships",
];

export const SEO_DEFAULT_TITLE = "Strikar Lifescience LLP | Pharmaceutical Manufacturing & Global Healthcare Access";

export const SEO_DEFAULT_DESCRIPTION =
  "Strikar Lifescience LLP is a diversified healthcare company spanning pharmaceutical manufacturing, nutraceuticals, and hospital and healthcare solutions, serving partners across Latin America, the Caribbean, Southeast Asia, Africa, and the CIS region.";

export const PRIVACY_POLICY_HTML =
  "<p>Strikar Lifescience LLP respects your privacy. Information submitted via this website (RFQ forms, contact forms) is used solely to respond to your inquiry and is not shared with third parties except as required to fulfill your request.</p>";

export const TERMS_CONDITIONS_HTML =
  "<p>By using this website you agree to use the information provided for legitimate business/professional purposes only. Product information is subject to change without notice. All quotations are subject to confirmation.</p>";

export const DISCLAIMER_HTML =
  "<p>The product information on this website is intended for healthcare professionals, distributors and institutional buyers, and does not constitute medical advice. Please consult a qualified healthcare professional before using any pharmaceutical product.</p>";

// The client's own "Certifications & Standards" document explicitly lists "Standards & Frameworks
// Supported: WHO-GMP, Good Documentation Practices (GDP), Quality Risk Management Principles, Data
// Integrity Practices..." -- WHO-GMP is the one named, badge-style standard; the rest are internal
// quality-system practices, not something with a certificate to display. Add another entry here only
// once the client supplies an actual certificate/standard to back it -- never invent one (see the
// removed "ISO 9001"/"CDSCO" fabrication noted in BUILD_TASKLIST.md).
export const CERTIFICATIONS = [
  { title: "WHO-GMP", description: "Manufacturing standards and frameworks supported in line with WHO Good Manufacturing Practice." },
];
