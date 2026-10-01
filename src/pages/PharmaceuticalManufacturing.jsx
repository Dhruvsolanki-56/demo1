import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pill, FlaskConical, FileCheck2, Factory } from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";
import HighlightPanel from "../components/HighlightPanel";

const DOSAGE_FORMS = [
  { title: "Oral Solid Dosage", items: ["Tablets", "Film-Coated & Chewable Tablets", "Effervescent Tablets", "Sustained & Modified Release Tablets", "Hard & Soft Gelatin Capsules"] },
  { title: "Oral Liquids & Powders", items: ["Oral Liquids, Suspensions & Emulsions", "Drops", "Oral Powders & Granules", "Sachets & Dry Syrups"] },
  { title: "Injectable & Sterile Products", items: ["Ampoules", "Vials", "Prefilled Syringes", "Lyophilized & Depot Injectables"] },
  { title: "Topical & Dermatology", items: ["Creams, Ointments & Gels", "Lotions", "Medicated Shampoos"] },
  { title: "Ophthalmic, Otic & Nasal", items: ["Ophthalmic Solutions & Ointments", "Ear Drops", "Nasal Sprays & Drops"] },
  { title: "Specialty Dosage Forms", items: ["Mouthwash & Oral Sprays", "Suppositories & Pessaries", "Inhalation & Nebulizer Products", "Transdermal Preparations", "Oral Thin Films"] },
];

const THERAPEUTIC_CATEGORIES = [
  "Oncology", "Critical Care", "Anti-Infectives", "Cardiovascular", "Diabetology", "Gastroenterology",
  "Neurology", "Psychiatry", "Pain Management", "Respiratory Care", "Dermatology", "Nephrology",
  "Urology", "Gynecology & Women's Health", "Pediatrics", "Ophthalmology", "ENT", "Orthopedics",
  "Rheumatology", "Endocrinology", "General Medicine", "Hospital & Emergency Care",
];

const SERVICES = [
  "Contract Manufacturing (CMO)",
  "Contract Development & Manufacturing (CDMO)",
  "Product Development",
  "Technology Transfer",
  "Private Label Manufacturing",
  "Dossier Development Support",
  "Scale-Up & Validation Support",
  "Lifecycle Management Support",
];

const REGULATORY_SERVICES = [
  { title: "Product Registration & Regulatory Strategy", desc: "Efficient regulatory pathways that support both market entry and long-term compliance objectives." },
  { title: "Dossier Development & Technical Documentation", desc: "CTD/eCTD/ACTD dossier preparation and technical documentation for regulatory submissions." },
  { title: "Artwork, Labeling & Packaging Development", desc: "Market-ready, country-specific packaging and labeling that balances compliance with commercial appeal." },
  { title: "Market Access & Commercialization Planning", desc: "Market-entry strategy, portfolio positioning, and tender and product launch readiness." },
  { title: "Compliance & Lifecycle Management", desc: "Ongoing variation, renewal, and documentation support to maintain long-term product sustainability." },
];

const REGULATORY_ENVIRONMENTS = [
  "WHO-GMP Markets", "US FDA Aligned Opportunities", "EU-GMP Markets", "Health Canada Opportunities",
  "PIC/S Member Countries", "ANVISA-Regulated Markets", "INVIMA-Regulated Markets", "DIGEMID-Regulated Markets",
  "COFEPRIS-Regulated Markets", "GCC Markets", "LATAM Markets", "Africa & Emerging Markets",
];

export default function PharmaceuticalManufacturing() {
  return (
    <>
      <SEO
        title="Pharmaceutical Manufacturing"
        description="Development, manufacturing, and market access support across a broad range of dosage forms and therapeutic categories for regulated and emerging markets."
        canonicalPath="/business-divisions/pharmaceutical-manufacturing"
      />
      <PageHeader eyebrow="Business Division" title="Pharmaceutical Manufacturing" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <TwoToneHeading text="Manufacturing Excellence from Development to Market Access" className="section-title mt-3" />
          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            Our Pharmaceutical Manufacturing Division focuses on the development, manufacturing, and supply of
            high-quality pharmaceutical products across a broad range of therapeutic categories and dosage forms. We
            support healthcare companies, distributors, importers, brand owners, hospitals, institutional buyers, and
            government organizations through manufacturing solutions designed to meet the requirements of both
            regulated and emerging markets.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            By combining manufacturing expertise, product development capabilities, and regulatory support, we help
            partners successfully introduce, register, commercialize, and expand pharmaceutical products across
            international markets.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Finished Dosage Formulations" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              Our product portfolio spans multiple dosage forms and delivery technologies to meet diverse
              therapeutic, regulatory, and commercial requirements.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOSAGE_FORMS.map((group) => (
              <div key={group.title} className="card card-hover card-bold p-6">
                <div className="icon-badge">
                  <Pill size={22} />
                </div>
                <h3 className="font-bold text-lg text-primary-900 mt-4">{group.title}</h3>
                <ul className="text-sm text-slate-600 mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="A Broad Spectrum of Therapeutic Support" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              Our product development and manufacturing capabilities support a wide range of therapeutic and
              specialty healthcare segments.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {THERAPEUTIC_CATEGORIES.map((cat) => (
              <span key={cat} className="badge bg-primary-50 text-primary-700">{cat}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="icon-badge">
              <Factory size={22} />
            </div>
            <TwoToneHeading text="Manufacturing & Development Services" className="section-title mt-4" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              Successful pharmaceutical products require more than manufacturing alone. Our integrated development
              capabilities help partners accelerate product readiness while reducing development complexities and
              commercialization risks.
            </p>
            <ul className="text-sm text-slate-600 mt-4 space-y-2">
              {SERVICES.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <HighlightPanel
            icon={Factory}
            title="Manufacturing Strengths"
            items={[
              "WHO-GMP Certified Manufacturing",
              "6 Dosage Form Categories",
              "18 Therapeutic Areas Covered",
              "CMO, CDMO & Private Label Manufacturing",
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <div className="mx-auto icon-badge">
              <FileCheck2 size={22} />
            </div>
            <TwoToneHeading text="Supporting Successful Product Registration & Commercialization" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              We support pharmaceutical partners throughout the product lifecycle, helping transform product
              concepts into commercially viable and regulatory-ready healthcare solutions, and navigate complex
              regulatory environments across international markets.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {REGULATORY_SERVICES.map((s) => (
              <div key={s.title} className="card card-hover card-bold p-6">
                <h3 className="font-bold text-primary-900">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-8">
            <TwoToneHeading text="Positioned for International Markets" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              Through our regulatory expertise, manufacturing capabilities, and strategic alliances, we are
              positioned to support projects intended for a broad range of regulatory environments.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {REGULATORY_ENVIRONMENTS.map((env) => (
              <span key={env} className="badge-lime">{env}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="icon-badge">
            <FlaskConical size={22} />
          </div>
          <TwoToneHeading text="Built for Scale, Quality & Long-Term Growth" className="section-title mt-3" />
          <p className="mt-4 text-slate-600 leading-relaxed">
            Strikar Lifescience operates modern pharmaceutical manufacturing facilities designed to support diverse
            dosage forms, stringent quality requirements, and scalable production needs across international
            healthcare markets. Our manufacturing infrastructure combines high-volume production capabilities,
            specialized sterile facilities, dedicated containment areas, advanced analytical laboratories, research
            and development capabilities, and comprehensive quality systems to support pharmaceutical products
            throughout their lifecycle, including oral solid dosage forms, sterile injectables, lyophilized
            products, beta-lactam and cephalosporin products, and ophthalmic and nasal preparations, supported by
            dedicated R&amp;D, formulation development, and quality control laboratories.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Partner with Our Pharmaceutical Manufacturing Division</h2>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Visit the Inquiry Center <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
