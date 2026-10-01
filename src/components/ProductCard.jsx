import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, Eye, MessageCircleQuestion, Star } from "lucide-react";
import { fileUrl } from "../api/client";
import { useQuoteCart } from "../context/QuoteCartContext";
import EnquireModal from "./EnquireModal";
import ProductVisual, { isPlaceholderImage } from "./ProductVisual";


export default function ProductCard({ product }) {
  const { addItem, isInCart } = useQuoteCart();
  const image = product.images?.find((i) => i.is_primary) || product.images?.[0];
  // Every product currently ships the same external placehold.co URL. Where
  // that is all we have, draw from the product's own dosage form instead of
  // fetching a third-party grey box 798 times. A real upload still wins.
  const usePlaceholderArt = isPlaceholderImage(image?.image_url);
  const inCart = isInCart(product.id);
  const [enquiring, setEnquiring] = useState(false);

  return (
    <div className="card-bold card-solid group flex flex-col overflow-hidden p-3 transition-shadow duration-300">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-panel">
        <Link to={`/products/${product.slug}`} className="block h-full w-full">
          {usePlaceholderArt ? (
            <ProductVisual
              dosageForm={product.dosage_form}
              seed={product.sku || product.slug || ""}
              label={`${product.name} — ${product.dosage_form || "product"}`}
              className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <img
              src={fileUrl(image.image_url)}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </Link>
        {product.is_featured && (
          <span className="badge absolute left-3 top-3 bg-accent-500 text-primary-950">
            <Star size={11} className="fill-primary-950" /> Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <div className="min-h-[1rem]">
          {product.therapeutic_segment && (
            <Link
              to={`/products?therapeutic_segment=${encodeURIComponent(product.therapeutic_segment)}`}
              className="tap w-fit text-[11px] font-semibold uppercase tracking-wide text-primary-600 hover:text-primary-800 hover:underline"
            >
              {product.therapeutic_segment}
            </Link>
          )}
        </div>
        <Link to={`/products/${product.slug}`} className="tap line-clamp-2 min-h-[2.75rem] font-display text-[1.12rem] font-medium leading-snug text-primary-950 transition-colors hover:text-primary-600">
          {product.name}
        </Link>
        <div className="min-h-[1.125rem] mt-1">
          {product.composition ? (
            <p className="line-clamp-1 text-xs text-slate-500">{product.composition}</p>
          ) : (
            (product.dosage_form || product.strength) && (
              <p className="text-xs text-slate-600 line-clamp-1">
                {[product.dosage_form, product.strength].filter(Boolean).join(" · ")}
              </p>
            )
          )}
        </div>
        <div className="min-h-[2.625rem] mt-2">
          {product.description && (
            <p className="line-clamp-2 text-sm text-slate-500">{product.description}</p>
          )}
        </div>
        {/* whitespace-nowrap + tighter padding: at four-up the labels were
            wrapping to two lines, which left the two buttons different heights
            and the row ragged from card to card. */}
        <div className="mt-auto flex gap-2 pt-3 border-t border-slate-100">
          <Link
            to={`/products/${product.slug}`}
            className="btn-outline flex-1 !gap-1.5 !px-2.5 !py-2 text-[0.6875rem] whitespace-nowrap"
          >
            <Eye size={13} className="shrink-0" /> View Details
          </Link>
          {product.rfq_enabled !== false && (
            <button
              onClick={() => addItem(product, "1")}
              disabled={inCart}
              className={`btn flex-1 !gap-1.5 !px-2.5 !py-2 text-[0.6875rem] whitespace-nowrap ${inCart ? "bg-primary-100 text-primary-700 cursor-default" : "bg-primary-600 text-white hover:bg-primary-700"}`}
            >
              <ClipboardList size={13} className="shrink-0" /> {inCart ? "Added" : "Request Quote"}
            </button>
          )}
        </div>
        <button
          onClick={() => setEnquiring(true)}
          className="tap mt-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-800"
        >
          <MessageCircleQuestion size={13} /> Inquire Now
        </button>
      </div>

      {enquiring && <EnquireModal product={product} onClose={() => setEnquiring(false)} />}
    </div>
  );
}
