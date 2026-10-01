// Mirrors backend INQUIRY_TYPES in app/models/contact.py — keep values in sync.
// RFQ Request and General Contact are handled by their own existing pages
// (/request-quote and /contact) rather than the shared inline form here.
export const INQUIRY_TYPE_CONFIG = [
  {
    value: "dossier_request",
    icon: "FileText",
    label: "Dossier Request",
    description: "Request technical or regulatory documentation (CTD / eCTD / ACTD) for a product.",
    referenceDetail: { label: "Product / Dossier Needed", required: true },
  },
  {
    value: "registration_feasibility",
    icon: "Globe2",
    label: "Registration Feasibility",
    description: "Ask whether a product can be registered and supplied into your target market.",
    targetMarket: { label: "Target Country / Market", required: true },
    referenceDetail: { label: "Product of Interest" },
  },
  {
    value: "sample_request",
    icon: "PackageSearch",
    label: "Sample Request",
    description: "Request physical product samples ahead of placing an order.",
    referenceDetail: { label: "Product Requested", required: true },
  },
  {
    value: "distribution_opportunity",
    icon: "Handshake",
    label: "Distribution Opportunity",
    description: "Apply to become a distribution partner for Strikar Lifescience in your territory.",
    targetMarket: { label: "Territory of Interest", required: true },
  },
  {
    value: "tender_inquiry",
    icon: "FileSignature",
    label: "Tender Inquiry",
    description: "Submit a government, institutional, or NGO tender inquiry.",
    targetMarket: { label: "Country / Region" },
    referenceDetail: { label: "Tender Reference / Title" },
  },
  {
    value: "manufacturing_inquiry",
    icon: "Factory",
    label: "Manufacturing Inquiry",
    description: "Explore CDMO, CMO, or private-label manufacturing with Strikar Lifescience.",
    referenceDetail: { label: "Manufacturing Requirement" },
  },
  {
    value: "healthcare_access_inquiry",
    icon: "HeartPulse",
    label: "Healthcare Access Inquiry",
    description: "Inquire about healthcare access and institutional supply solutions.",
    referenceDetail: { label: "Product / Therapy Area of Interest" },
  },
];
