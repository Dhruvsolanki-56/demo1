import React from "react";
import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "../context/SiteSettingsContext";

export default function WhatsAppFloatButton() {
  const { settings } = useSiteSettings();
  const number = (settings.whatsapp || "").replace(/[^\d+]/g, "");
  if (!number) return null;

  const href = `https://wa.me/${number.replace("+", "")}?text=${encodeURIComponent(
    "Hello Strikar Lifescience, I would like to inquire about your products."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40 group-hover:opacity-0" />
      <MessageCircle size={28} fill="white" strokeWidth={0} className="relative" />
    </a>
  );
}
