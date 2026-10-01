import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Trash2, Plus, Upload, Star, Lock, CheckCircle2, XCircle,
  FileText, Layers, Eye, ShieldCheck, Images,
} from "lucide-react";
import {
  getProductAdmin,
  createProduct,
  updateProduct,
  uploadImage,
  uploadDocument,
  addProductImage,
  deleteProductImage,
  setPrimaryProductImage,
  addProductDocument,
  deleteProductDocument,
  setProductVariants,
  getProductFilterOptionsAdmin,
  getProductConstantsAdmin,
} from "../api/admin";
import { fileUrl } from "../api/client";
import CreatableCombobox from "../components/CreatableCombobox";
import { TabsRoot, TabPanel } from "../components/admin/Tabs";
import { SkeletonBlock } from "../components/Skeleton";
import { useToast } from "../context/ToastContext";

const EMPTY = {
  sku: "", name: "", brand: "", composition: "", generic_name: "", strength: "",
  dosage_form: "", packing: "", description: "", therapeutic_segment: "", indications: "",
  is_featured: false, status: "active", meta_title: "", meta_description: "",

  portfolio_category: "", portfolio_subcategory: "", therapeutic_class: "", route: "",
  presentation: "", packaging_type: "", shelf_life: "",

  product_status: "Available", validation_status: "Approved for Website", show_on_website: true,

  rfq_enabled: true, dossier_request_enabled: true, registration_feasibility_enabled: true,
  sample_request_enabled: true, distribution_opportunity_enabled: true,

  show_principal_name: false, source_principal: "",

  dossier_status: "", gmp_documentation_status: "", regulatory_notes_public: "", market_regions: "",
};

const CTA_FLAGS = [
  ["rfq_enabled", "RFQ / Quotation"],
  ["dossier_request_enabled", "Dossier Request"],
  ["registration_feasibility_enabled", "Registration Feasibility"],
  ["sample_request_enabled", "Sample Request"],
  ["distribution_opportunity_enabled", "Distribution Opportunity"],
];

const TABS = [
  { value: "basics", label: "Basics", icon: FileText },
  { value: "taxonomy", label: "Taxonomy", icon: Layers },
  { value: "visibility", label: "Visibility & CTAs", icon: Eye },
  { value: "regulatory", label: "Regulatory", icon: ShieldCheck },
  { value: "media", label: "Media & Variants", icon: Images },
];

export default function ProductForm() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const toast = useToast();

  const [tab, setTab] = useState("basics");
  const [form, setForm] = useState(EMPTY);
  const [filterOptions, setFilterOptions] = useState({
    brands: [], dosage_forms: [], therapeutic_segments: [], therapeutic_classes: [], presentations: [], packaging_types: [],
    routes: [], dossier_statuses: [], gmp_documentation_statuses: [], shelf_lives: [], portfolio_subcategories: [], source_principals: [],
    strengths: [], packings: [], variant_names: [], variant_strengths: [], variant_packings: [],
  });
  const [constants, setConstants] = useState({ portfolio_categories: [], product_statuses: [], validation_statuses: [], market_regions: [] });
  const [product, setProduct] = useState(null);
  const [savedForm, setSavedForm] = useState(EMPTY);
  const [variants, setVariants] = useState([]);
  const [saving, setSaving] = useState(false);
  const [savingVariants, setSavingVariants] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  useEffect(() => {
    getProductFilterOptionsAdmin().then(setFilterOptions);
    getProductConstantsAdmin().then(setConstants);
    if (!isNew) {
      getProductAdmin(id).then((p) => {
        setProduct(p);
        setVariants(p.variants || []);
        const loaded = {
          sku: p.sku || "", name: p.name, brand: p.brand || "", composition: p.composition || "",
          generic_name: p.generic_name || "", strength: p.strength || "", dosage_form: p.dosage_form || "",
          packing: p.packing || "", description: p.description || "", therapeutic_segment: p.therapeutic_segment || "",
          indications: p.indications || "", is_featured: p.is_featured,
          status: p.status, meta_title: p.meta_title || "", meta_description: p.meta_description || "",

          portfolio_category: p.portfolio_category || "", portfolio_subcategory: p.portfolio_subcategory || "",
          therapeutic_class: p.therapeutic_class || "", route: p.route || "", presentation: p.presentation || "",
          packaging_type: p.packaging_type || "", shelf_life: p.shelf_life || "",

          product_status: p.product_status || "Available", validation_status: p.validation_status || "Approved for Website",
          show_on_website: p.show_on_website,

          rfq_enabled: p.rfq_enabled, dossier_request_enabled: p.dossier_request_enabled,
          registration_feasibility_enabled: p.registration_feasibility_enabled,
          sample_request_enabled: p.sample_request_enabled, distribution_opportunity_enabled: p.distribution_opportunity_enabled,

          show_principal_name: p.show_principal_name, source_principal: p.source_principal || "",

          dossier_status: p.dossier_status || "", gmp_documentation_status: p.gmp_documentation_status || "",
          regulatory_notes_public: p.regulatory_notes_public || "", market_regions: p.market_regions || "",
        };
        setForm(loaded);
        setSavedForm(loaded);
      });
    }
  }, [id]);

  const field = (key) => ({
    value: form[key] ?? "",
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
  });

  // market_regions is stored as a semicolon-joined string so the backend column
  // and CSV export stay simple, but it's presented here as a proper multi-select.
  const selectedMarketRegions = (form.market_regions || "").split(";").map((r) => r.trim()).filter(Boolean);
  const toggleMarketRegion = (region) => {
    const next = selectedMarketRegions.includes(region)
      ? selectedMarketRegions.filter((r) => r !== region)
      : [...selectedMarketRegions, region];
    setForm({ ...form, market_regions: next.join("; ") });
  };

  const willShowOnWebsite = form.status === "active" && form.show_on_website && form.validation_status === "Approved for Website";
  const isDirty = JSON.stringify(form) !== JSON.stringify(isNew ? EMPTY : savedForm);

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Product name is required.");
      setTab("basics");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      // sku is uniquely indexed at the DB level -- an empty string is a real
      // value there (not "no value"), so leaving it blank on two different
      // products would collide. Send null instead so multiple products can
      // share "no SKU" the way multiple NULLs are allowed to.
      sku: form.sku.trim() || null,
    };
    try {
      if (isNew) {
        const created = await createProduct(payload);
        toast.success("Product created. Now add images, documents and variants below.");
        navigate(`/admin/products/${created.id}/edit`, { replace: true });
        setTab("media");
      } else {
        await updateProduct(id, payload);
        const refreshed = await getProductAdmin(id);
        setProduct(refreshed);
        setSavedForm(form);
        toast.success("Product saved.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Couldn't save the product. Please check the fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !product) return;
    setUploadingImage(true);
    try {
      const { url } = await uploadImage(file, "products");
      await addProductImage(product.id, url, product.images.length === 0);
      const refreshed = await getProductAdmin(id);
      setProduct(refreshed);
      toast.success("Image added.");
    } catch {
      toast.error("Image upload failed.");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteProductImage(product.id, imageId);
      const refreshed = await getProductAdmin(id);
      setProduct(refreshed);
    } catch {
      toast.error("Couldn't remove the image.");
    }
  };

  const handleSetPrimaryImage = async (imageId) => {
    try {
      await setPrimaryProductImage(product.id, imageId);
      const refreshed = await getProductAdmin(id);
      setProduct(refreshed);
    } catch {
      toast.error("Couldn't update the primary image.");
    }
  };

  const handleDocUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !product) return;
    setUploadingDoc(true);
    try {
      const { url } = await uploadDocument(file, "documents");
      await addProductDocument(product.id, file.name, url, file.name.split(".").pop());
      const refreshed = await getProductAdmin(id);
      setProduct(refreshed);
      toast.success("Document added.");
    } catch {
      toast.error("Document upload failed.");
    } finally {
      setUploadingDoc(false);
      e.target.value = "";
    }
  };

  const handleDeleteDoc = async (docId) => {
    try {
      await deleteProductDocument(product.id, docId);
      const refreshed = await getProductAdmin(id);
      setProduct(refreshed);
    } catch {
      toast.error("Couldn't remove the document.");
    }
  };

  const addVariantRow = () => setVariants([...variants, { variant_name: "", strength: "", packing: "", notes: "" }]);
  const updateVariant = (idx, key, value) => {
    const next = [...variants];
    next[idx] = { ...next[idx], [key]: value };
    setVariants(next);
  };
  const removeVariant = (idx) => setVariants(variants.filter((_, i) => i !== idx));
  const saveVariants = async () => {
    setSavingVariants(true);
    try {
      await setProductVariants(product.id, variants.map(({ variant_name, strength, packing, notes }) => ({ variant_name, strength, packing, notes })));
      toast.success("Variants saved.");
    } catch {
      toast.error("Couldn't save variants.");
    } finally {
      setSavingVariants(false);
    }
  };

  if (!isNew && !product) {
    return (
      <div className="max-w-4xl">
        <SkeletonBlock className="h-4 w-32 mb-4" />
        <div className="flex items-center justify-between mb-6">
          <SkeletonBlock className="h-7 w-64" />
          <SkeletonBlock className="h-10 w-32 rounded-md" />
        </div>
        <div className="card p-6 space-y-5">
          <div className="flex gap-4 border-b border-slate-100 pb-4">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonBlock key={i} className="h-5 w-24" />)}
          </div>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonBlock key={i} className="h-10 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <Link to="/admin/products" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-primary-600 mb-4">
        <ArrowLeft size={14} /> Back to Products
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-xl font-bold text-primary-900">{isNew ? "Add Product" : `Edit: ${product?.name || ""}`}</h1>
          {!isNew && (
            <span className={`badge ${willShowOnWebsite ? "bg-primary-50 text-primary-700" : "bg-slate-100 text-slate-600"}`}>
              {willShowOnWebsite ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
              {willShowOnWebsite ? "Visible on website" : "Hidden from website"}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {isDirty && !saving && <span className="text-xs font-semibold text-amber-600">Unsaved changes</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`btn-primary shrink-0 ${isDirty && !saving ? "ring-2 ring-amber-400 ring-offset-2" : ""}`}
          >
            {saving ? "Saving..." : isNew ? "Create Product" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="card">
        <TabsRoot value={tab} onValueChange={setTab} tabs={TABS}>
          <TabPanel value="basics" className="p-6 space-y-5">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="label" htmlFor="p-sku">SKU</label>
                <input id="p-sku" className="input" placeholder="e.g. STR-PH-0001" maxLength={60} {...field("sku")} />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="p-name">Product Name *</label>
                <input id="p-name" className="input" maxLength={1000} {...field("name")} />
              </div>
            </div>

            <div className="sm:max-w-sm">
              <CreatableCombobox
                label="Brand"
                value={form.brand}
                onChange={(v) => setForm({ ...form, brand: v })}
                options={filterOptions.brands}
                placeholder="Select or type a brand..."
              />
            </div>

            <div className="sm:max-w-xs">
              <label className="label" htmlFor="p-status">Status</label>
              <select id="p-status" className="input" {...field("status")}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="p-composition">Composition</label>
                <input id="p-composition" className="input" maxLength={500} {...field("composition")} />
              </div>
              <div>
                <label className="label" htmlFor="p-generic">Generic Name</label>
                <input id="p-generic" className="input" maxLength={1000} {...field("generic_name")} />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <CreatableCombobox
                label="Strength"
                value={form.strength}
                onChange={(v) => setForm({ ...form, strength: v })}
                options={filterOptions.strengths}
                placeholder="e.g. 500mg"
              />
              <CreatableCombobox
                label="Dosage Form"
                value={form.dosage_form}
                onChange={(v) => setForm({ ...form, dosage_form: v })}
                options={filterOptions.dosage_forms}
                placeholder="e.g. Tablet"
              />
              <CreatableCombobox
                label="Packing"
                value={form.packing}
                onChange={(v) => setForm({ ...form, packing: v })}
                options={filterOptions.packings}
                placeholder="e.g. 10x10 Blister"
              />
            </div>

            <div>
              <label className="label" htmlFor="p-description">Description</label>
              <textarea id="p-description" rows={4} className="input" {...field("description")} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <CreatableCombobox
                label="Therapeutic Segment"
                value={form.therapeutic_segment}
                onChange={(v) => setForm({ ...form, therapeutic_segment: v })}
                options={filterOptions.therapeutic_segments}
                placeholder="e.g. Anti-Infective"
              />
              <div>
                <label className="label" htmlFor="p-indications">Indications / Use</label>
                <input id="p-indications" className="input" {...field("indications")} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="p-meta-title">Meta Title (SEO)</label>
                <input id="p-meta-title" className="input" maxLength={200} {...field("meta_title")} />
              </div>
              <div>
                <label className="label" htmlFor="p-meta-desc">Meta Description (SEO)</label>
                <input id="p-meta-desc" className="input" maxLength={300} {...field("meta_description")} />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
              <span className="text-sm text-slate-600 flex items-center gap-1"><Star size={14} className="text-amber-500" /> Feature on homepage</span>
            </label>
          </TabPanel>

          <TabPanel value="taxonomy" className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="p-portfolio-category">Portfolio Category</label>
                <select id="p-portfolio-category" className="input" {...field("portfolio_category")}>
                  <option value="">Not set</option>
                  {constants.portfolio_categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <CreatableCombobox
                label="Portfolio Subcategory"
                value={form.portfolio_subcategory}
                onChange={(v) => setForm({ ...form, portfolio_subcategory: v })}
                options={filterOptions.portfolio_subcategories}
                placeholder="e.g. Health Canada Portfolio"
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <CreatableCombobox
                label="Therapeutic Class"
                value={form.therapeutic_class}
                onChange={(v) => setForm({ ...form, therapeutic_class: v })}
                options={filterOptions.therapeutic_classes}
                placeholder="e.g. Antibiotic"
              />
              <CreatableCombobox
                label="Route"
                value={form.route}
                onChange={(v) => setForm({ ...form, route: v })}
                options={filterOptions.routes}
                placeholder="e.g. Oral, Injection"
              />
              <CreatableCombobox
                label="Shelf Life"
                value={form.shelf_life}
                onChange={(v) => setForm({ ...form, shelf_life: v })}
                options={filterOptions.shelf_lives}
                placeholder="e.g. 24"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <CreatableCombobox
                label="Presentation"
                value={form.presentation}
                onChange={(v) => setForm({ ...form, presentation: v })}
                options={filterOptions.presentations}
                placeholder="e.g. Blister, Vial, Ampoule"
              />
              <CreatableCombobox
                label="Packaging Type"
                value={form.packaging_type}
                onChange={(v) => setForm({ ...form, packaging_type: v })}
                options={filterOptions.packaging_types}
                placeholder="e.g. Bottle, Kit"
              />
            </div>
          </TabPanel>

          <TabPanel value="visibility" className="p-6 space-y-6">
            <div className="space-y-5">
              <p className="text-xs text-slate-600">
                A product only appears on the public site when Status is Active, Show on Website is enabled, and
                Validation Status is "Approved for Website" — all three conditions must be true.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="p-product-status">Product Status</label>
                  <select id="p-product-status" className="input" {...field("product_status")}>
                    {constants.product_statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="p-validation-status">Validation Status</label>
                  <select id="p-validation-status" className="input" {...field("validation_status")}>
                    {constants.validation_statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer w-fit">
                <input type="checkbox" checked={form.show_on_website} onChange={(e) => setForm({ ...form, show_on_website: e.target.checked })} />
                <span className="text-sm text-slate-600">Show on Website</span>
              </label>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-3">
              <h3 className="font-semibold text-slate-800 text-sm">Inquiry Center — Enabled Actions</h3>
              <p className="text-xs text-slate-600 -mt-1">Controls which inquiry buttons appear on this product's detail page.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {CTA_FLAGS.map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.checked })} />
                    <span className="text-sm text-slate-600">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value="regulatory" className="p-6 space-y-6">
            <div className="space-y-5">
              <p className="text-xs text-slate-600">Public, status-level information only — never upload confidential dossiers or internal notes here.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <CreatableCombobox
                  label="Dossier Status"
                  value={form.dossier_status}
                  onChange={(v) => setForm({ ...form, dossier_status: v })}
                  options={filterOptions.dossier_statuses}
                  placeholder="e.g. Available on Request"
                />
                <CreatableCombobox
                  label="GMP Documentation Status"
                  value={form.gmp_documentation_status}
                  onChange={(v) => setForm({ ...form, gmp_documentation_status: v })}
                  options={filterOptions.gmp_documentation_statuses}
                  placeholder="e.g. Available on Request"
                />
              </div>
              <div>
                <label className="label" htmlFor="p-reg-notes-public">Public Regulatory Notes</label>
                <textarea id="p-reg-notes-public" rows={2} className="input" {...field("regulatory_notes_public")} />
              </div>
              <div>
                <span className="label">Market Availability</span>
                <p className="text-xs text-slate-600 -mt-0.5 mb-2">Select every broad region this product can currently be supplied to.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {constants.market_regions.map((region) => {
                    const selected = selectedMarketRegions.includes(region);
                    return (
                      <label
                        key={region}
                        className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer transition-colors ${
                          selected ? "border-primary-400 bg-primary-50 text-primary-800 font-medium" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <input type="checkbox" className="shrink-0" checked={selected} onChange={() => toggleMarketRegion(region)} />
                        {region}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-3">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2"><Lock size={15} className="text-slate-600" /> Source / Principal</h3>
              <p className="text-xs text-slate-600 -mt-1">
                The principal name is shown on the public product page only when "Show Principal Name Publicly" is checked.
              </p>
              <CreatableCombobox
                label="Source / Principal"
                value={form.source_principal}
                onChange={(v) => setForm({ ...form, source_principal: v })}
                options={filterOptions.source_principals}
                placeholder="e.g. SteriMax"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.show_principal_name}
                  onChange={(e) => setForm({ ...form, show_principal_name: e.target.checked })}
                />
                <span className="text-sm text-slate-600">Show Principal Name Publicly</span>
              </label>
            </div>
          </TabPanel>

          <TabPanel value="media" className="p-6 space-y-6">
            {isNew || !product ? (
              <p className="text-sm text-slate-600 py-8 text-center">
                Save the product first to add images, documents, and variants.
              </p>
            ) : (
              <>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm mb-4">Product Images</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {product.images.map((img) => (
                      <div key={img.id} className="relative group">
                        <img src={fileUrl(img.image_url)} alt="" className="h-24 w-24 object-cover rounded border border-slate-200" />
                        <button onClick={() => handleDeleteImage(img.id)} aria-label="Remove image" className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1">
                          <Trash2 size={12} />
                        </button>
                        {img.is_primary ? (
                          <span className="absolute bottom-1 left-1 text-[10px] bg-primary-700 text-white px-1.5 py-0.5 rounded">Primary</span>
                        ) : (
                          <button
                            onClick={() => handleSetPrimaryImage(img.id)}
                            className="absolute bottom-1 left-1 text-[10px] bg-slate-900/70 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Set primary
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <label className="btn-outline cursor-pointer inline-flex">
                    <Upload size={14} /> {uploadingImage ? "Uploading..." : "Upload Image"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                  </label>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="font-semibold text-slate-800 text-sm mb-4">Documents / Brochures</h3>
                  <div className="space-y-2 mb-4">
                    {product.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between border border-slate-200 rounded px-3 py-2">
                        <a href={fileUrl(doc.file_url)} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600">{doc.title}</a>
                        <button onClick={() => handleDeleteDoc(doc.id)} aria-label={`Remove ${doc.title}`} className="text-slate-600 hover:text-red-600"><Trash2 size={14} /></button>
                      </div>
                    ))}
                    {product.documents.length === 0 && <p className="text-sm text-slate-600">No documents uploaded yet.</p>}
                  </div>
                  <label className="btn-outline cursor-pointer inline-flex">
                    <Upload size={14} /> {uploadingDoc ? "Uploading..." : "Upload Document"}
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden" onChange={handleDocUpload} disabled={uploadingDoc} />
                  </label>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-slate-800 text-sm">Variants</h3>
                    <button onClick={addVariantRow} className="btn-outline btn-sm"><Plus size={14} /> Add Variant</button>
                  </div>
                  <div className="space-y-3">
                    {variants.map((v, idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:items-center">
                        <CreatableCombobox
                          ariaLabel="Variant name"
                          placeholder="Variant name"
                          value={v.variant_name}
                          onChange={(val) => updateVariant(idx, "variant_name", val)}
                          options={filterOptions.variant_names}
                        />
                        <CreatableCombobox
                          ariaLabel="Variant strength"
                          placeholder="Strength"
                          value={v.strength || ""}
                          onChange={(val) => updateVariant(idx, "strength", val)}
                          options={filterOptions.variant_strengths}
                        />
                        <CreatableCombobox
                          ariaLabel="Variant packing"
                          placeholder="Packing"
                          value={v.packing || ""}
                          onChange={(val) => updateVariant(idx, "packing", val)}
                          options={filterOptions.variant_packings}
                        />
                        <div className="flex gap-2">
                          <input className="input" placeholder="Notes" aria-label="Variant notes" value={v.notes || ""} onChange={(e) => updateVariant(idx, "notes", e.target.value)} />
                          <button onClick={() => removeVariant(idx)} aria-label="Remove variant" className="text-slate-600 hover:text-red-600"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                    {variants.length === 0 && <p className="text-sm text-slate-600">No variants added.</p>}
                  </div>
                  {variants.length > 0 && (
                    <div className="mt-4 flex items-center gap-3">
                      <button onClick={saveVariants} disabled={savingVariants} className="btn-primary btn-sm">
                        {savingVariants ? "Saving..." : "Save Variants"}
                      </button>
                      <span className="text-xs text-slate-600">Variants save independently of the fields above.</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </TabPanel>
        </TabsRoot>
      </div>
    </div>
  );
}
