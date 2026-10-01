import React, { useEffect, useState } from "react";
import { getSettingsAdmin, updateSettings } from "../api/admin";
import { useToast } from "../context/ToastContext";
import { SkeletonBlock } from "../components/Skeleton";
import AdminPageHeader from "../components/admin/AdminPageHeader";

const FIELDS = [
  { key: "company_name", label: "Company Name" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "email", label: "Email", type: "email" },
  { key: "whatsapp", label: "WhatsApp Number (with country code, e.g. +91...)", type: "tel" },
  { key: "address", label: "Address", area: true },
  { key: "business_hours", label: "Business Hours" },
  { key: "facebook_url", label: "Facebook URL", type: "url" },
  { key: "linkedin_url", label: "LinkedIn URL", type: "url" },
  { key: "twitter_url", label: "Twitter URL", type: "url" },
  { key: "instagram_url", label: "Instagram URL", type: "url" },
  { key: "google_maps_embed", label: "Google Maps Embed (paste the iframe code from Google Maps' Share > Embed)", area: true },
];

/**
 * Deliberately just contact details -- everything else (hero text, about/
 * vision/mission, legal pages, email templates, banners, certifications) is
 * written directly in the site's source, not managed from here. See
 * BUILD_TASKLIST.md for why.
 */
export default function SiteSettings() {
  const toast = useToast();
  const [values, setValues] = useState({});
  const [savedValues, setSavedValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettingsAdmin().then((v) => { setValues(v); setSavedValues(v); }).finally(() => setLoading(false));
  }, []);

  const setField = (key, value) => setValues((v) => ({ ...v, [key]: value }));
  const isDirty = JSON.stringify(values) !== JSON.stringify(savedValues);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateSettings(values);
      setValues(updated);
      setSavedValues(updated);
      toast.success("Contact details saved.");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Couldn't save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl space-y-4">
        <SkeletonBlock className="h-7 w-48" />
        <div className="card p-6 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonBlock key={i} className="h-10 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <form className="max-w-3xl" onSubmit={handleSave}>
      <AdminPageHeader
        title="Site Settings"
        subtitle="Contact details shown across the site (footer, header, contact page). Reflects live immediately after saving."
        actions={
          <div className="flex items-center gap-3">
            {isDirty && !saving && <span className="text-xs font-semibold text-amber-600">Unsaved changes</span>}
            <button
              type="submit"
              disabled={saving}
              className={`btn-primary shrink-0 ${isDirty && !saving ? "ring-2 ring-amber-400 ring-offset-2" : ""}`}
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        }
      />

      <div className="card p-6">
        <div className="space-y-4">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="label" htmlFor={`setting-${f.key}`}>{f.label}</label>
              {f.area ? (
                <textarea id={`setting-${f.key}`} rows={3} className="input" value={values[f.key] || ""} onChange={(e) => setField(f.key, e.target.value)} />
              ) : (
                <input
                  id={`setting-${f.key}`}
                  type={f.type || "text"}
                  maxLength={300}
                  className="input"
                  value={values[f.key] || ""}
                  onChange={(e) => setField(f.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
