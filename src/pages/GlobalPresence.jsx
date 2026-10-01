import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Factory,
  Building2,
  Globe2,
  ArrowRight,
  Zap,
  Compass,
  ShieldCheck,
  Handshake,
  Rocket,
} from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const HUBS = [
  {
    place: "India",
    role: "Manufacturing, Development & Technical Excellence Hub",
    icon: Factory,
    desc: "India is the foundation of our operations, supporting pharmaceutical manufacturing, nutraceutical manufacturing, healthcare solutions, regulatory support, product development, and commercialization readiness.",
    points: [
      "Pharmaceutical & nutraceutical manufacturing",
      "Product development & technology transfer",
      "Regulatory affairs & market access support",
      "Quality assurance & quality control",
    ],
  },
  {
    place: "Guatemala",
    role: "Regional Hub for Central America, Latin America & the Caribbean",
    icon: Building2,
    desc: "Through Strikar Pharma S.A. in Guatemala, we maintain a strategic regional hub that enables closer collaboration with healthcare organizations, distributors, institutional buyers, and commercial partners throughout the region.",
    points: [
      "Market entry planning & product registration coordination",
      "Distributor development & tender participation support",
      "Institutional business development",
      "Regional portfolio expansion",
    ],
  },
  {
    place: "El Salvador",
    role: "Regional Market Support & Business Development Presence",
    icon: MapPin,
    desc: "Our presence in El Salvador further strengthens our engagement across Central America, complementing our Guatemala hub with additional local support and coordination.",
    points: [
      "Local market support",
      "Customer engagement & regulatory coordination",
      "Institutional opportunity facilitation",
      "Regional business development",
    ],
  },
  {
    place: "Thailand",
    role: "Regional Hub for Southeast Asia",
    icon: Globe2,
    desc: "Recognizing the strategic importance of Southeast Asia, we established operations in Thailand to support regional healthcare growth initiatives and closer market engagement.",
    points: [
      "Market development & partner engagement",
      "Commercialization & distributor development support",
      "Regulatory coordination",
      "Product registration initiatives",
    ],
  },
];

const MARKETS = [
  { name: "Central America", desc: "Healthcare organizations, distributors, institutional buyers, and public health initiatives." },
  { name: "Latin America", desc: "Market expansion, product registration, and healthcare accessibility programs." },
  { name: "Caribbean", desc: "Healthcare providers, procurement agencies, and pharmaceutical stakeholders." },
  { name: "Southeast Asia", desc: "Regulatory assistance, commercialization support, and portfolio expansion via Thailand." },
  { name: "Africa", desc: "Quality healthcare products and sustainable market development opportunities." },
  { name: "CIS Region", desc: "Manufacturing capabilities, registration readiness, and commercialization assistance." },
  { name: "Emerging Markets", desc: "Distributors, healthcare companies, institutional buyers, and government organizations." },
];

const WHY_IT_MATTERS = [
  { icon: Zap, title: "Improve Responsiveness", desc: "Faster communication and more effective support across different time zones." },
  { icon: Compass, title: "Strengthen Market Understanding", desc: "Helping partners navigate local business environments and healthcare systems." },
  { icon: ShieldCheck, title: "Support Market Access", desc: "Assisting with product registrations, distributor engagement, and commercialization planning." },
  { icon: Handshake, title: "Build Long-Term Relationships", desc: "Creating closer partnerships through ongoing local engagement and support." },
  { icon: Rocket, title: "Accelerate Opportunity Development", desc: "Helping partners identify and pursue market expansion and institutional opportunities." },
];

export default function GlobalPresence() {
  return (
    <>
      <SEO
        title="Global Presence"
        description="Strikar Lifescience's manufacturing base in India, regional hubs in Guatemala and Thailand, and a regional presence in El Salvador, supporting healthcare partners worldwide."
        canonicalPath="/about/global-presence"
      />
      <PageHeader eyebrow="About Us" title="Global Presence & Market Coverage" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="text-slate-600 leading-relaxed text-lg">
            Successful international healthcare partnerships require more than manufacturing capability alone.
            Effective communication, local market understanding, regulatory familiarity, and long-term engagement
            are essential to helping partners navigate healthcare markets and achieve sustainable growth.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mt-4">
            While our manufacturing and development operations are based in India, our commitment extends beyond
            production to active market engagement, regional support, and customer-focused collaboration across
            key international healthcare markets.
          </p>
        </div>
      </section>

      {/* Operating framework */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="Where We Operate" className="section-title mt-3" />
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {HUBS.map(({ place, role, icon: Icon, desc, points }) => (
              <div key={place} className="card card-hover card-bold p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="icon-badge shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary-900">{place}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{role}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-4 leading-relaxed">{desc}</p>
                <ul className="mt-4 space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions served */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="Markets We Support" className="section-title mt-3" />
          <p className="text-slate-600 leading-relaxed mt-4 max-w-3xl">
            Through our manufacturing capabilities, strategic partnerships, and regional engagement platforms, we
            support healthcare stakeholders across multiple international markets.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MARKETS.map((m) => (
              <div key={m.name} className="card card-hover card-bold p-6">
                <div className="icon-badge h-10 w-10">
                  <Globe2 size={20} />
                </div>
                <h3 className="font-bold text-primary-900 mt-3">{m.name}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why regional presence matters */}
      <section className="section-lg section-dark relative">
        <div className="relative container-page">
          <div className="max-w-2xl mb-12">
            <h2 className="mt-3 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Why Our Regional Presence Matters</h2>
            <p className="mt-4 text-primary-100/90 leading-relaxed">
              Healthcare markets are unique, each with its own regulatory framework, healthcare priorities,
              commercial practices, and business culture. Our regional operating model helps us meet partners where
              they are.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {WHY_IT_MATTERS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 border border-white/15">
                  <Icon size={24} className="text-accent-400" />
                </div>
                <p className="mt-4 font-semibold">{title}</p>
                <p className="mt-2 text-sm text-primary-100/80 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Explore Opportunities in Your Region</h2>
          <p className="mt-3 text-primary-100/90 max-w-2xl mx-auto">
            Whether you are exploring market entry, distributor development, or institutional supply opportunities,
            our regional teams are ready to connect.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Start the Conversation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
