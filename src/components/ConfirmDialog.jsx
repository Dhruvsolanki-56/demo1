import React from "react";
import { AlertTriangle } from "lucide-react";
import Dialog from "./admin/Dialog";

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = "Delete" }) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onCancel()} title={title} maxWidth="max-w-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle size={20} />
        </div>
        <p className="text-sm text-slate-600">{message}</p>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onCancel} className="btn-outline">Cancel</button>
        <button onClick={onConfirm} className="btn-danger">{confirmLabel}</button>
      </div>
    </Dialog>
  );
}
