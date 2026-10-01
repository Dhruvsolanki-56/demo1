import React from "react";
import { Link } from "react-router-dom";
import {
  Factory,
  Lightbulb,
  FileCheck2,
  MapPin,
  Compass,
  Handshake,
  Landmark,
  ShieldCheck,
  Award,
  ScrollText,
  Network,
  Globe2,
  Layers3,
  ArrowRight,
} from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const PROMPTS = [
  {
    icon: Factory,
    question: "Looking for a Manufacturing Partner?",
    subtitle: "Pharmaceutical & Nutraceutical Manufacturing Solutions",
    description:
      "We support organizations seeking reliable and quality-focused manufacturing partners for healthcare products intended for domestic and international markets.",
    items: [
      "Contract Manufacturing (CMO)",
      "Contract Development & Manufacturing (CDMO)",
      "Private Label Manufacturing",
      "Product Development Programs",
      "Technology Transfer Projects",
      "Scale-Up & Validation Support",
      "Product Lifecycle Management",
      "Portfolio Expansion Projects",
    ],
  },
  {
    icon: Lightbulb,
    question: "Looking to Develop New Products?",
    subtitle: "From Concept to Commercialization",
    description:
      "We work closely with partners to transform ideas into commercially viable healthcare solutions aligned with market needs and customer expectations.",
    items: [
      "New Product Development",
      "Formulation Optimization",
      "Market-Specific Adaptation",
      "Specialty Product Development",
      "Nutraceutical Product Innovation",
      "Healthcare Product Development",
      "Packaging & Artwork Development",
      "Commercialization Readiness Planning",
    ],
  },
  {
    icon: FileCheck2,
    question: "Looking for Product Registration Support?",
    subtitle: "Regulatory & Market Access Expertise",
    description: "We help partners accelerate registrations while supporting long-term compliance objectives.",
    items: [
      "Product Registration Support",
      "Dossier Preparation & Review",
      "CTD / ACTD Documentation",
      "Regulatory Strategy Development",
      "Artwork & Packaging Compliance",
      "Market-Specific Registration Guidance",
      "Lifecycle Regulatory Support",
      "Documentation Gap Analysis",
    ],
  },
  {
    icon: MapPin,
    question: "Looking to Expand into Latin America & the Caribbean?",
    subtitle: "Regional Support Through Guatemala & El Salvador",
    description:
      "Through Strikar Pharma S.A. in Guatemala and our regional presence in El Salvador, we support partners across the region.",
    items: [
      "Market Entry Planning",
      "Distributor Development",
      "Product Registration Coordination",
      "Tender Opportunity Support",
      "Commercialization Programs",
      "Portfolio Expansion Planning",
      "Institutional Business Development",
      "Customer Engagement Support",
    ],
  },
  {
    icon: Compass,
    question: "Looking to Expand into Southeast Asia?",
    subtitle: "Regional Support Through Thailand",
    description: "Through our Thailand operations, we support partners entering and growing across the region.",
    items: [
      "Partner Engagement",
      "Distributor Development",
      "Product Registration Support",
      "Market Development Activities",
      "Institutional Healthcare Opportunities",
      "Commercialization Planning",
      "Regional Market Expansion",
    ],
  },
  {
    icon: Handshake,
    question: "Looking for Co-Marketing & Commercialization Opportunities?",
    subtitle: "Building Sustainable Market Growth",
    description: "Flexible partnership models designed to build sustainable market growth together.",
    items: [
      "Co-Marketing Collaborations",
      "Authorized Commercialization Programs",
      "Territory Development Initiatives",
      "Regional Market Expansion",
      "Licensing Opportunities",
      "Portfolio Expansion Strategies",
      "Business Development Partnerships",
    ],
  },
  {
    icon: Landmark,
    question: "Looking for Government & Institutional Opportunities?",
    subtitle: "Supporting Public Healthcare Programs",
    description: "We collaborate with public and institutional partners on healthcare programs of shared benefit.",
    items: [
      "Ministry of Health Programs",
      "Hospital Supply Initiatives",
      "Public Health Projects",
      "Government Procurement Programs",
      "Tender Participation Support",
      "Institutional Healthcare Solutions",
      "International Healthcare Projects",
    ],
  },
];

const EMERGENCY_PROMPT = {
  icon: ShieldCheck,
  question: "Looking for Emergency Supply & Patient Access Solutions?",
  subtitle: "Supporting Critical Healthcare Requirements",
  description:
    "We work with authorized healthcare organizations, distributors, and institutional partners to help address urgent and critical healthcare supply requirements, subject to applicable regulatory and eligibility requirements in each market. Because these arrangements are jurisdiction-specific and reviewed on a case-by-case basis, we discuss the details directly with qualified partners rather than publishing program mechanics here.",
};

const WHY = [
  {
    icon: Award,
    title: "Manufacturing Excellence",
    description:
      "WHO-GMP manufacturing capabilities supported by diversified dosage-form expertise and robust quality systems.",
  },
  {
    icon: ScrollText,
    title: "Regulatory & Market Access Expertise",
    description:
      "Comprehensive support spanning registration planning, dossier development, compliance readiness, and commercialization support.",
  },
  {
    icon: Network,
    title: "Strategic Manufacturing & Regulatory Alliances",
    description:
      "Access to diversified manufacturing ecosystems and regulatory pathways supporting global healthcare opportunities.",
  },
  {
    icon: Globe2,
    title: "Regional Presence",
    description:
      "Strategic hubs in Guatemala and Thailand enabling closer engagement across Latin America, the Caribbean, and Southeast Asia.",
  },
  {
    icon: Layers3,
    title: "Flexible Partnership Models",
    description: "Supporting manufacturing, licensing, co-marketing, commercialization, regulatory, and market-development initiatives.",
  },
  {
    icon: Handshake,
    title: "Long-Term Collaboration",
    description:
      "Focused on building sustainable partnerships that create value for both organizations while improving healthcare accessibility.",
  },
];

function PromptCard({ icon: Icon, question, subtitle, description, items }) {
  return (
    <div className="card card-hover card-bold p-7 flex flex-col">
      <div className="icon-badge h-12 w-12">
        <Icon size={24} />
      </div>
      <h3 className="font-bold text-lg text-primary-900 mt-5">{question}</h3>
      <p className="text-xs font-bold uppercase tracking-wide text-primary-600 mt-2">{subtitle}</p>
      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{description}</p>
      {items && (
        <ul className="text-sm text-slate-600 mt-4 space-y-1.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Partnership() {
  return (
    <>
      <SEO
        title="Partnership Opportunities"
        description="Explore manufacturing, product development, registration, regional expansion, and institutional partnership opportunities with Strikar Lifescience."
        canonicalPath="/partnership"
      />
      <PageHeader eyebrow="Partner with Us" title="Partnership Opportunities" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <TwoToneHeading text="Let's Build the Future of Healthcare Together" className="section-title" />
          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            At Strikar Lifescience, we believe the most successful healthcare solutions are created through strong
            partnerships built on trust, quality, innovation, and shared growth objectives.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Whether you are a manufacturer, distributor, importer, marketing authorization holder, healthcare
            organization, institutional buyer, or healthcare innovator, we offer flexible partnership models
            designed to create long-term value and sustainable market success. Through our manufacturing expertise,
            regulatory capabilities, strategic alliances, regional presence, and international market understanding,
            we help partners navigate complex healthcare markets while accelerating growth opportunities across
            pharmaceuticals, nutraceuticals, healthcare solutions, patient-access programs, and personal hygiene
            products.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid sm:grid-cols-2 gap-6">
          {PROMPTS.map((p) => (
            <PromptCard key={p.question} {...p} />
          ))}
          <PromptCard {...EMERGENCY_PROMPT} />
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-12">
            <TwoToneHeading text="Why Partner with Strikar Lifescience?" className="section-title mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card card-hover card-bold p-6">
                <div className="icon-badge">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-primary-900 mt-4 text-sm">{title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Start the Conversation</h2>
          <p className="mt-3 text-primary-100/90 max-w-2xl mx-auto">
            Whether you are seeking a manufacturing partner, regulatory support, market expansion assistance,
            product development expertise, co-marketing opportunities, or healthcare access solutions, Strikar
            Lifescience is ready to explore opportunities for long-term collaboration.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Start the Conversation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
