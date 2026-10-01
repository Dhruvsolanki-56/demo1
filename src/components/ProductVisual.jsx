import React from "react";

/**
 * Rendered stand-in for a product photograph.
 *
 * Every one of the 798 products currently carries the same external
 * placehold.co URL — a navy rectangle reading "Strikar Lifescience". A grid of
 * those is the single least premium thing on the site, and it also means 798
 * requests to a third-party host on a catalogue page (which an ad-blocker can
 * refuse, exactly as it refused analytics.js).
 *
 * This renders a motif from data the product already has: its dosage form. It
 * is NOT a change to the product data or to how products are fetched — a real
 * uploaded image still wins; see isPlaceholderImage below, which is the only
 * thing that decides whether this is used.
 *
 * The forms map onto eleven families, covering all 24 dosage_form values in
 * the catalogue (335 tablets, 94 ampoules, 89 vials, 68 liquids, 53 syringes,
 * 40 powders, 37 capsules, 31 suppositories, 25 sprays, 21 inhalers, and a
 * handful of pack-size strings that fall through to the default).
 */

/** True when there is no real photograph behind this URL. */
export function isPlaceholderImage(url) {
  if (!url) return true;
  return /placehold\.co|placeholder|via\.placeholder|dummyimage/i.test(url);
}

/** dosage_form string -> motif key. Order matters: narrower patterns first. */
export function motifFor(dosageForm = "") {
  const s = String(dosageForm).toLowerCase();
  if (/lyophili|vial/.test(s)) return "vial";
  if (/ampoule/.test(s)) return "ampoule";
  if (/syringe/.test(s)) return "syringe";
  if (/inhaler|metered/.test(s)) return "inhaler";
  if (/nasal|spray/.test(s)) return "spray";
  if (/suppositor|pessar/.test(s)) return "suppository";
  if (/capsule/.test(s)) return "capsule";
  if (/powder|sachet|granule/.test(s)) return "powder";
  if (/liquid|suspension|syrup|solution|ml\b/.test(s)) return "liquid";
  if (/tablet/.test(s)) return "tablet";
  return "default";
}

// Two brand tints so a grid of same-form products still has rhythm. Chosen
// from the palette rather than generated, so nothing lands off-brand.
const TINTS = [
  { face: "#ccd5f2", edge: "#7286d6", mark: "#293596" },
  { face: "#d4dbf5", edge: "#8093da", mark: "#3243b4" },
];

/** Stable per-product tint — same product always renders the same way. */
function tintFor(seed = "") {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return TINTS[Math.abs(h) % TINTS.length];
}

function Motif({ kind, t }) {
  const stroke = { fill: "none", stroke: t.edge, strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (kind) {
    case "capsule":
      return (
        <g>
          <rect x="58" y="58" width="84" height="38" rx="19" fill={t.face} />
          <path d="M77 58h-0a19 19 0 0 0 0 38h0z" fill={t.mark} opacity="0.85" />
          <rect x="58" y="58" width="84" height="38" rx="19" {...stroke} />
          <line x1="77" y1="58" x2="77" y2="96" {...stroke} />
        </g>
      );
    case "ampoule":
      return (
        <g>
          <path d="M96 34l4 12v10h-8V46z" fill={t.mark} opacity="0.85" />
          <path d="M88 56h24v40a12 12 0 0 1-12 12 12 12 0 0 1-12-12z" fill={t.face} />
          <path d="M88 56h24v40a12 12 0 0 1-12 12 12 12 0 0 1-12-12z" {...stroke} />
          <line x1="88" y1="70" x2="112" y2="70" {...stroke} />
        </g>
      );
    case "vial":
      return (
        <g>
          <rect x="80" y="36" width="40" height="12" rx="3" fill={t.mark} opacity="0.85" />
          <path d="M84 48h32v50a10 10 0 0 1-10 10h-12a10 10 0 0 1-10-10z" fill={t.face} />
          <path d="M84 48h32v50a10 10 0 0 1-10 10h-12a10 10 0 0 1-10-10z" {...stroke} />
          <path d="M84 82h32" {...stroke} />
        </g>
      );
    case "syringe":
      return (
        <g>
          <line x1="52" y1="98" x2="72" y2="78" {...stroke} />
          <rect x="66" y="52" width="62" height="26" rx="5" transform="rotate(45 97 65)" fill={t.face} />
          <rect x="66" y="52" width="62" height="26" rx="5" transform="rotate(45 97 65)" {...stroke} />
          <line x1="118" y1="38" x2="136" y2="56" {...stroke} />
          <circle cx="88" cy="74" r="5" fill={t.mark} opacity="0.85" />
        </g>
      );
    case "inhaler":
      return (
        <g>
          <rect x="76" y="46" width="34" height="16" rx="5" fill={t.mark} opacity="0.85" />
          <path d="M72 62h42v40a10 10 0 0 1-10 10H82a10 10 0 0 1-10-10z" fill={t.face} />
          <path d="M72 62h42v40a10 10 0 0 1-10 10H82a10 10 0 0 1-10-10z" {...stroke} />
          <path d="M114 74h16M114 84h22" {...stroke} />
        </g>
      );
    case "spray":
      return (
        <g>
          <rect x="84" y="34" width="24" height="14" rx="4" fill={t.mark} opacity="0.85" />
          <path d="M82 48h28v52a8 8 0 0 1-8 8H90a8 8 0 0 1-8-8z" fill={t.face} />
          <path d="M82 48h28v52a8 8 0 0 1-8 8H90a8 8 0 0 1-8-8z" {...stroke} />
          <path d="M116 40h10M120 30h8M118 52h12" {...stroke} />
        </g>
      );
    case "suppository":
      return (
        <g>
          <path d="M100 34c14 14 20 30 20 44 0 18-9 30-20 30s-20-12-20-30c0-14 6-30 20-44z" fill={t.face} />
          <path d="M100 34c14 14 20 30 20 44 0 18-9 30-20 30s-20-12-20-30c0-14 6-30 20-44z" {...stroke} />
          <path d="M100 62c5 6 8 12 8 18" {...stroke} stroke={t.mark} opacity="0.8" />
        </g>
      );
    case "powder":
      return (
        <g>
          <path d="M66 44h68l-6 62a10 10 0 0 1-10 9H82a10 10 0 0 1-10-9z" fill={t.face} />
          <path d="M66 44h68l-6 62a10 10 0 0 1-10 9H82a10 10 0 0 1-10-9z" {...stroke} />
          <path d="M70 74h60" {...stroke} />
          <circle cx="88" cy="92" r="3.5" fill={t.mark} opacity="0.7" />
          <circle cx="104" cy="98" r="3" fill={t.mark} opacity="0.55" />
          <circle cx="114" cy="88" r="2.5" fill={t.mark} opacity="0.7" />
        </g>
      );
    case "liquid":
      return (
        <g>
          <rect x="90" y="30" width="20" height="12" rx="3" fill={t.mark} opacity="0.85" />
          <path d="M86 42h28v58a10 10 0 0 1-10 10h-8a10 10 0 0 1-10-10z" fill="#fff" opacity="0.55" />
          <path d="M86 76h28v24a10 10 0 0 1-10 10h-8a10 10 0 0 1-10-10z" fill={t.face} />
          <path d="M86 42h28v58a10 10 0 0 1-10 10h-8a10 10 0 0 1-10-10z" {...stroke} />
          <path d="M86 76h28" {...stroke} />
        </g>
      );
    case "tablet":
      return (
        <g>
          <circle cx="100" cy="77" r="34" fill={t.face} />
          <circle cx="100" cy="77" r="34" {...stroke} />
          <line x1="100" y1="47" x2="100" y2="107" {...stroke} stroke={t.mark} opacity="0.75" />
        </g>
      );
    default:
      return (
        <g>
          <rect x="66" y="50" width="68" height="54" rx="10" fill={t.face} />
          <rect x="66" y="50" width="68" height="54" rx="10" {...stroke} />
          <path d="M84 77h32M100 61v32" {...stroke} stroke={t.mark} opacity="0.75" />
        </g>
      );
  }
}

/**
 * `seed` keeps the tint stable per product (pass the sku or slug).
 * `label` is announced to assistive tech; the motif itself is decorative.
 */
export default function ProductVisual({ dosageForm, seed = "", label, className = "" }) {
  const kind = motifFor(dosageForm);
  const t = tintFor(seed || kind);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#eef1fa] ${className}`}>
      <svg
        viewBox="0 0 200 150"
        className="h-full w-full"
        role="img"
        aria-label={label || `${dosageForm || "Product"} illustration`}
      >
        {/* Soft brand disc for depth, so the motif is not floating on flat grey. */}
        <circle cx="100" cy="77" r="58" fill="#e2e7f8" />
        <circle cx="100" cy="77" r="58" fill="none" stroke="#ccd4ef" strokeWidth="1" />
        <Motif kind={kind} t={t} />
      </svg>
    </div>
  );
}
