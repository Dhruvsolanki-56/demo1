import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

/**
 * Generic accessible modal built on Radix Dialog -- handles focus trap,
 * Escape-to-close, scroll lock, and return-focus automatically. Use this
 * for any admin modal instead of hand-rolling a fixed-overlay div.
 */
export default function Dialog({ open, onOpenChange, title, description, children, maxWidth = "max-w-lg" }) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-slate-900/50 data-[state=open]:animate-fade-in" />
        <RadixDialog.Content
          className={`fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] ${maxWidth} -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-200 bg-white shadow-card-hover focus:outline-none max-h-[90vh] overflow-y-auto`}
        >
          <div className="flex items-start justify-between gap-4 p-6 pb-4">
            <div>
              <RadixDialog.Title className="font-bold text-primary-900 text-lg">{title}</RadixDialog.Title>
              {description && <RadixDialog.Description className="text-sm text-slate-600 mt-1">{description}</RadixDialog.Description>}
            </div>
            <RadixDialog.Close asChild>
              <button className="icon-btn shrink-0" aria-label="Close">
                <X size={18} />
              </button>
            </RadixDialog.Close>
          </div>
          <div className="px-6 pb-6">{children}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
