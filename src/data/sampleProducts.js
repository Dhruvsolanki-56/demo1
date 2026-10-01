// Demo catalogue, used only when the products API cannot be reached (for
// example a static Netlify preview with no backend behind it). The real
// catalogue always wins whenever the API answers. Images are left empty so
// each card draws its dosage-form illustration (see ProductVisual).

const PHARMA = "Pharmaceutical Products";
const HSM = "Products from High-Surveillance Regulatory Markets";
const NUTRA = "Nutraceutical Products";

// [name, generic, strength, dosage form, packing, segment, class, portfolio, featured, description]
const ROWS = [
  ["Amlodipine Tablets", "Amlodipine Besylate", "5 mg / 10 mg", "Tablet", "10 x 10 Blister", "Cardiovascular", "Calcium Channel Blocker", PHARMA, true, "Once-daily calcium channel blocker for hypertension and chronic stable angina."],
  ["Atorvastatin Tablets", "Atorvastatin Calcium", "10 mg / 20 mg / 40 mg", "Film-Coated Tablet", "10 x 10 Blister", "Cardiovascular", "Statin", PHARMA, false, "HMG-CoA reductase inhibitor used to lower LDL cholesterol."],
  ["Clopidogrel Tablets", "Clopidogrel Bisulfate", "75 mg", "Film-Coated Tablet", "10 x 10 Alu-Alu", "Cardiovascular", "Antiplatelet", HSM, false, "Antiplatelet agent for secondary prevention of atherothrombotic events."],
  ["Enoxaparin Sodium Injection", "Enoxaparin Sodium", "40 mg / 0.4 mL", "Prefilled Syringe", "Box of 2 Syringes", "Cardiovascular", "Anticoagulant", HSM, true, "Low-molecular-weight heparin for prophylaxis and treatment of venous thromboembolism."],
  ["Metformin Tablets", "Metformin Hydrochloride", "500 mg / 850 mg / 1000 mg", "Tablet", "10 x 10 Blister", "Diabetes & Metabolic Health", "Biguanide", PHARMA, true, "First-line oral antidiabetic for type 2 diabetes mellitus."],
  ["Glimepiride Tablets", "Glimepiride", "1 mg / 2 mg / 4 mg", "Tablet", "10 x 10 Blister", "Diabetes & Metabolic Health", "Sulfonylurea", PHARMA, false, "Sulfonylurea for glycaemic control in type 2 diabetes."],
  ["Insulin Glargine Injection", "Insulin Glargine", "100 IU/mL", "Prefilled Syringe", "Box of 5 Pens", "Diabetes & Metabolic Health", "Long-Acting Insulin", HSM, false, "Basal insulin analogue for once-daily dosing."],
  ["Imatinib Tablets", "Imatinib Mesylate", "100 mg / 400 mg", "Film-Coated Tablet", "3 x 10 Blister", "Oncology", "Tyrosine Kinase Inhibitor", HSM, true, "Targeted therapy for chronic myeloid leukaemia and GIST."],
  ["Paclitaxel Injection", "Paclitaxel", "6 mg/mL", "Vial", "Single Vial", "Oncology", "Taxane", PHARMA, false, "Cytotoxic taxane for breast, ovarian and lung cancers."],
  ["Ondansetron Injection", "Ondansetron Hydrochloride", "2 mg/mL", "Ampoule", "5 x 2 mL Ampoules", "Oncology", "Antiemetic", PHARMA, false, "5-HT3 antagonist for chemotherapy-induced nausea and vomiting."],
  ["Amoxicillin and Clavulanate Tablets", "Amoxicillin + Clavulanic Acid", "625 mg", "Film-Coated Tablet", "10 x 6 Alu-Alu", "Infectious Diseases", "Penicillin + Beta-Lactamase Inhibitor", PHARMA, true, "Broad-spectrum antibiotic for respiratory, urinary and skin infections."],
  ["Ceftriaxone for Injection", "Ceftriaxone Sodium", "1 g", "Lyophilized Powder Vial", "Single Vial with Diluent", "Infectious Diseases", "Third-Generation Cephalosporin", PHARMA, false, "Parenteral cephalosporin for serious bacterial infections."],
  ["Azithromycin Oral Suspension", "Azithromycin", "200 mg / 5 mL", "Oral Suspension", "15 mL Bottle", "Infectious Diseases", "Macrolide", PHARMA, false, "Macrolide antibiotic for paediatric respiratory infections."],
  ["Fluconazole Capsules", "Fluconazole", "150 mg", "Capsule", "1 x 1 Blister", "Infectious Diseases", "Azole Antifungal", PHARMA, false, "Systemic antifungal for candidiasis."],
  ["Artemether and Lumefantrine Tablets", "Artemether + Lumefantrine", "20 mg / 120 mg", "Tablet", "1 x 24 Blister", "Infectious Diseases", "Antimalarial", HSM, false, "Artemisinin-based combination therapy for uncomplicated malaria."],
  ["Tenofovir, Lamivudine and Dolutegravir Tablets", "Tenofovir DF + Lamivudine + Dolutegravir", "300 mg / 300 mg / 50 mg", "Film-Coated Tablet", "Bottle of 30", "HIV & Antiretrovirals", "Fixed-Dose Combination ART", HSM, true, "Once-daily fixed-dose antiretroviral regimen."],
  ["Efavirenz Tablets", "Efavirenz", "600 mg", "Film-Coated Tablet", "Bottle of 30", "HIV & Antiretrovirals", "NNRTI", PHARMA, false, "Non-nucleoside reverse transcriptase inhibitor."],
  ["Sertraline Tablets", "Sertraline Hydrochloride", "50 mg / 100 mg", "Film-Coated Tablet", "10 x 10 Blister", "Psychiatry & Mental Health", "SSRI", PHARMA, false, "Selective serotonin reuptake inhibitor for depression and anxiety disorders."],
  ["Olanzapine Tablets", "Olanzapine", "5 mg / 10 mg", "Tablet", "10 x 10 Blister", "Psychiatry & Mental Health", "Atypical Antipsychotic", PHARMA, false, "Atypical antipsychotic for schizophrenia and bipolar disorder."],
  ["Levetiracetam Tablets", "Levetiracetam", "500 mg / 750 mg", "Film-Coated Tablet", "10 x 10 Blister", "Neurology", "Antiepileptic", PHARMA, false, "Broad-spectrum antiepileptic for partial and generalised seizures."],
  ["Pregabalin Capsules", "Pregabalin", "75 mg / 150 mg", "Capsule", "10 x 10 Blister", "Neurology", "Gabapentinoid", PHARMA, false, "For neuropathic pain and adjunctive treatment of partial seizures."],
  ["Diclofenac Sodium Injection", "Diclofenac Sodium", "75 mg / 3 mL", "Ampoule", "5 x 3 mL Ampoules", "Pain Management", "NSAID", PHARMA, false, "Non-steroidal anti-inflammatory for acute pain."],
  ["Paracetamol Infusion", "Paracetamol", "1 g / 100 mL", "Solution for Infusion", "100 mL Bottle", "Pain Management", "Analgesic / Antipyretic", PHARMA, true, "Intravenous analgesic and antipyretic for hospital use."],
  ["Tramadol Capsules", "Tramadol Hydrochloride", "50 mg", "Capsule", "10 x 10 Blister", "Pain Management", "Opioid Analgesic", PHARMA, false, "Centrally acting analgesic for moderate to severe pain."],
  ["Meropenem for Injection", "Meropenem Trihydrate", "1 g", "Lyophilized Powder Vial", "Single Vial", "Critical Care & Emergency Medicine", "Carbapenem", HSM, false, "Carbapenem antibiotic for severe hospital-acquired infections."],
  ["Noradrenaline Injection", "Norepinephrine Bitartrate", "4 mg / 4 mL", "Ampoule", "10 x 4 mL Ampoules", "Critical Care & Emergency Medicine", "Vasopressor", PHARMA, false, "Vasopressor for acute hypotension and shock."],
  ["Pantoprazole for Injection", "Pantoprazole Sodium", "40 mg", "Lyophilized Powder Vial", "Single Vial", "Gastroenterology", "Proton Pump Inhibitor", PHARMA, false, "Intravenous PPI for acid-related disorders."],
  ["Omeprazole Capsules", "Omeprazole", "20 mg", "Delayed-Release Capsule", "10 x 10 Blister", "Gastroenterology", "Proton Pump Inhibitor", PHARMA, false, "For GERD, peptic ulcer and H. pylori regimens."],
  ["Oral Rehydration Salts", "Sodium Chloride + Potassium Chloride + Glucose + Sodium Citrate", "20.5 g", "Powder Sachet", "Box of 25 Sachets", "Gastroenterology", "Electrolyte Replacement", PHARMA, false, "WHO-formula oral rehydration for dehydration due to diarrhoea."],
  ["Salbutamol Inhaler", "Salbutamol Sulfate", "100 mcg/dose", "Metered-Dose Inhaler", "200 Doses", "Respiratory Care", "Short-Acting Beta-2 Agonist", PHARMA, true, "Reliever inhaler for bronchospasm in asthma and COPD."],
  ["Montelukast Tablets", "Montelukast Sodium", "10 mg", "Film-Coated Tablet", "10 x 10 Blister", "Respiratory Care", "Leukotriene Receptor Antagonist", PHARMA, false, "For asthma maintenance and allergic rhinitis."],
  ["Fluticasone Nasal Spray", "Fluticasone Propionate", "50 mcg/spray", "Nasal Spray", "120 Sprays", "Respiratory Care", "Intranasal Corticosteroid", PHARMA, false, "Intranasal steroid for allergic rhinitis."],
  ["Clotrimazole Vaginal Pessaries", "Clotrimazole", "100 mg", "Pessary", "Pack of 6", "Women's Health & Gynecology", "Azole Antifungal", PHARMA, false, "Topical antifungal for vaginal candidiasis."],
  ["Tamsulosin Capsules", "Tamsulosin Hydrochloride", "0.4 mg", "Modified-Release Capsule", "10 x 10 Blister", "Urology & Nephrology", "Alpha-1 Blocker", PHARMA, false, "For lower urinary tract symptoms of benign prostatic hyperplasia."],
  ["Mupirocin Ointment", "Mupirocin", "2% w/w", "Ointment", "15 g Tube", "Dermatology", "Topical Antibiotic", PHARMA, false, "Topical antibiotic for impetigo and infected skin lesions."],
  ["Moxifloxacin Eye Drops", "Moxifloxacin Hydrochloride", "0.5% w/v", "Eye Drops Solution", "5 mL Bottle", "Ophthalmology", "Fluoroquinolone", PHARMA, false, "Ophthalmic antibiotic for bacterial conjunctivitis."],
  ["Etoricoxib Tablets", "Etoricoxib", "60 mg / 90 mg", "Film-Coated Tablet", "10 x 10 Blister", "Orthopedics & Musculoskeletal Care", "COX-2 Inhibitor", PHARMA, false, "Selective COX-2 inhibitor for osteoarthritis and acute pain."],
  ["Sodium Chloride Infusion", "Sodium Chloride", "0.9% w/v", "Solution for Infusion", "500 mL Bottle", "Hospital Care Products", "IV Fluid", PHARMA, false, "Isotonic intravenous fluid for hydration and drug dilution."],
  ["Lidocaine Injection", "Lidocaine Hydrochloride", "2% w/v", "Vial", "30 mL Vial", "Hospital Care Products", "Local Anaesthetic", PHARMA, false, "Local anaesthetic for infiltration and nerve block."],
  ["Cetirizine Tablets", "Cetirizine Hydrochloride", "10 mg", "Film-Coated Tablet", "10 x 10 Blister", "General Medicine", "Antihistamine", PHARMA, false, "Non-sedating antihistamine for allergic conditions."],
  ["Vitamin D3 Softgel Capsules", "Cholecalciferol", "60,000 IU", "Soft Gelatin Capsule", "1 x 4 Blister", "General Medicine", "Vitamin Supplement", NUTRA, true, "Weekly vitamin D3 supplement for deficiency."],
  ["Multivitamin and Multimineral Tablets", "Multivitamin + Multimineral", "Standard", "Tablet", "Bottle of 30", "General Medicine", "Nutritional Supplement", NUTRA, false, "Daily multivitamin and mineral supplement."],
  ["Omega-3 Fatty Acid Capsules", "EPA + DHA", "1000 mg", "Soft Gelatin Capsule", "Bottle of 60", "Cardiovascular", "Nutritional Supplement", NUTRA, false, "Fish oil supplement providing EPA and DHA."],
  ["Zinc Dispersible Tablets", "Zinc Sulfate", "20 mg", "Dispersible Tablet", "10 x 10 Blister", "Gastroenterology", "Mineral Supplement", NUTRA, false, "Zinc supplementation alongside oral rehydration in childhood diarrhoea."],
];

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const presentationFor = (form) => {
  const f = form.toLowerCase();
  if (/vial|ampoule|syringe|infusion/.test(f)) return "Injectable";
  if (/drops|ointment|cream|spray|pessary|inhaler/.test(f)) return "Topical & Other";
  if (/suspension|solution|syrup|sachet|powder/.test(f)) return "Oral Liquid & Powder";
  return "Oral Solid";
};

const packagingFor = (packing) => {
  const p = packing.toLowerCase();
  if (p.includes("alu-alu")) return "Alu-Alu";
  if (p.includes("blister")) return "Blister";
  if (p.includes("bottle")) return "Bottle";
  if (p.includes("vial")) return "Vial";
  if (p.includes("ampoule")) return "Ampoule";
  if (p.includes("syringe") || p.includes("pen")) return "Prefilled Syringe / Pen";
  if (p.includes("tube")) return "Tube";
  return "Carton";
};

export const SAMPLE_PRODUCTS = ROWS.map(([name, generic, strength, form, packing, segment, klass, portfolio, featured, description], i) => ({
  id: 9000 + i,
  sku: `SMP-${String(i + 1).padStart(3, "0")}`,
  name: `${name} ${strength.split(" / ")[0]}`.trim(),
  slug: slugify(`${name} ${strength.split(" / ")[0]}`),
  brand: null,
  generic_name: generic,
  composition: `${generic} ${strength}`,
  strength,
  dosage_form: form,
  packing,
  presentation: presentationFor(form),
  packaging_type: packagingFor(packing),
  route: null,
  therapeutic_segment: segment,
  therapeutic_class: klass,
  portfolio_category: portfolio,
  product_status: "Available",
  description,
  indications: description,
  status: "active",
  is_featured: featured,
  rfq_enabled: true,
  dossier_request_enabled: true,
  registration_feasibility_enabled: true,
  sample_request_enabled: true,
  distribution_opportunity_enabled: true,
  show_principal_name: false,
  images: [],
  documents: [],
  variants: strength.includes(" / ")
    ? strength.split(" / ").map((s, k) => ({ id: k + 1, variant_name: `${name} ${s}`, strength: s, packing }))
    : [],
}));

const uniq = (key) => [...new Set(SAMPLE_PRODUCTS.map((p) => p[key]).filter(Boolean))].sort();

export const SAMPLE_FILTER_OPTIONS = {
  portfolio_categories: uniq("portfolio_category"),
  dosage_forms: uniq("dosage_form"),
  therapeutic_segments: uniq("therapeutic_segment"),
  therapeutic_classes: uniq("therapeutic_class"),
  presentations: uniq("presentation"),
  packaging_types: uniq("packaging_type"),
  product_statuses: uniq("product_status"),
};

/** Mirrors the API's list endpoint: filters, A-Z, featured, pagination. */
export function querySampleProducts(params = {}) {
  const {
    q, dosage_form, therapeutic_segment, therapeutic_class, portfolio_category,
    presentation, product_status, packaging_type, letter, featured,
    page = 1, page_size = 12,
  } = params;
  const needle = (q || "").trim().toLowerCase();
  let items = SAMPLE_PRODUCTS.filter((p) => {
    if (needle && ![p.name, p.generic_name, p.composition, p.strength, p.therapeutic_segment, p.therapeutic_class]
      .some((v) => (v || "").toLowerCase().includes(needle))) return false;
    if (dosage_form && p.dosage_form !== dosage_form) return false;
    if (therapeutic_segment && p.therapeutic_segment !== therapeutic_segment) return false;
    if (therapeutic_class && p.therapeutic_class !== therapeutic_class) return false;
    if (portfolio_category && p.portfolio_category !== portfolio_category) return false;
    if (presentation && p.presentation !== presentation) return false;
    if (product_status && p.product_status !== product_status) return false;
    if (packaging_type && p.packaging_type !== packaging_type) return false;
    if (letter && !p.name.toUpperCase().startsWith(String(letter).toUpperCase())) return false;
    if (featured !== undefined && featured !== null && String(featured) === "true" && !p.is_featured) return false;
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));
  const total = items.length;
  const size = Number(page_size) || 12;
  const pg = Math.max(1, Number(page) || 1);
  items = items.slice((pg - 1) * size, pg * size);
  return { items, total, page: pg, page_size: size };
}

export function findSampleProduct(slug) {
  return SAMPLE_PRODUCTS.find((p) => p.slug === slug) || null;
}

export function relatedSampleProducts(slug) {
  const p = findSampleProduct(slug);
  if (!p) return [];
  return SAMPLE_PRODUCTS.filter((o) => o.slug !== slug && o.therapeutic_segment === p.therapeutic_segment).slice(0, 4);
}
