import React from "react";
import { Link } from "react-router-dom";

/**
 * Shared consent checkbox for every public form that submits an RFQ or
 * contact/inquiry record. `register` is react-hook-form's register function;
 * pass the same `errors` object the form already destructures from
 * formState so the error message renders consistently.
 */
export default function ConsentCheckbox({ register, errors, id = "consent", tone = "light" }) {
  const dark = tone === "dark";
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
          {...register("consent", { required: true })}
        />
        <span className={`text-xs leading-relaxed ${dark ? "text-white/80" : "text-slate-600"}`}>
          I agree that the information I've submitted may be used to respond to my request, in line with the{" "}
          <Link to="/privacy-policy" target="_blank" className={`underline ${dark ? "text-accent-400" : "text-primary-600"}`}>Privacy Policy</Link>. *
        </span>
      </label>
      {errors?.consent && <p className={`text-xs mt-1 ml-6 ${dark ? "text-accent-300" : "text-red-500"}`}>Please accept the consent statement to continue.</p>}
    </div>
  );
}
