const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/**
 * Admin-panel date/time format, standardized everywhere a timestamp is shown
 * in the admin UI: "05:30 PM 23 JAN 2026". Unambiguous across locales (no
 * dd/mm vs mm/dd confusion) and reads as one glance, unlike the varying
 * native toLocaleString()/toLocaleDateString() output every browser/OS/
 * region previously rendered these with.
 */
export function formatAdminDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const day = String(d.getDate()).padStart(2, "0");
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();

  return `${String(hours).padStart(2, "0")}:${minutes} ${ampm} ${day} ${month} ${year}`;
}

/** Date-only variant (no time) for columns/contexts where time isn't relevant: "23 JAN 2026". */
export function formatAdminDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}
