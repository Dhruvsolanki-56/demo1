import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, Plus } from "lucide-react";

/**
 * A searchable dropdown of existing values that never blocks a new one —
 * pick from what's already used elsewhere, or just keep typing and use
 * your own value. Used for admin fields (brand, dosage form, therapeutic
 * segment, country) that are naturally categorical but shouldn't force
 * retyping/lookup of exact prior spelling.
 */
export default function CreatableCombobox({ value, onChange, options = [], placeholder = "Type or select...", label, ariaLabel }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef(null);
  const listboxId = useId();

  useEffect(() => setQuery(value || ""), [value]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [query, options]);

  const exactMatch = options.some((o) => o.toLowerCase() === query.trim().toLowerCase());
  const showCreateRow = query.trim() && !exactMatch;

  const commit = (val) => {
    setQuery(val);
    onChange(val);
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    const totalRows = filtered.length + (showCreateRow ? 1 : 0);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, totalRows - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && highlight < filtered.length) {
        commit(filtered[highlight]);
      } else {
        commit(query.trim());
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      {label && <label className="label">{label}</label>}
      <div className="relative">
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label={ariaLabel}
          className="input pr-9"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            // Commit free-typed text even without opening the dropdown, so the value is never lost.
            if (query.trim() !== (value || "")) onChange(query.trim());
          }}
        />
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600" />
      </div>

      {open && (filtered.length > 0 || showCreateRow) && (
        <ul id={listboxId} role="listbox" className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg">
          {filtered.map((opt, idx) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={opt === value}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(opt)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
                  idx === highlight ? "bg-primary-50 text-primary-700" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {opt}
                {opt === value && <Check size={14} />}
              </button>
            </li>
          ))}
          {showCreateRow && (
            <li>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(query.trim())}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-primary-700 ${
                  highlight === filtered.length ? "bg-primary-50" : "hover:bg-primary-50"
                }`}
              >
                <Plus size={14} /> Use "{query.trim()}"
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
