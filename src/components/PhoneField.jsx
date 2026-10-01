import React from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
// react-phone-number-input/style.css is imported once, globally, from
// index.css (ahead of our .PhoneInput* overrides in @layer components) --
// not here. This component is lazy-loaded, so importing the stylesheet in
// this file would put it in its own code-split chunk, whose <link> gets
// injected into <head> at an unpredictable time relative to the main
// stylesheet -- fine for the properties we override, but needless fragility
// to leave in place when a single deterministic import removes it entirely.

/**
 * Country-code-aware phone input, shared by every public form that collects
 * a phone/WhatsApp number (RequestQuote, Contact, EnquireModal,
 * ProductInquiryModal, InquiryCenter). Always outputs E.164
 * (e.g. "+919876543210") or undefined -- this is what makes the backend's
 * WhatsApp dispatch reliable, since a customer can no longer submit a number
 * missing its country code or full of stray spaces/dashes.
 *
 * `defaultCountry="IN"` only seeds which flag is preselected -- any country
 * can still be picked from the dropdown before typing a number.
 */
export default function PhoneField({ control, name, label, required = false, error, className = "" }) {
  return (
    <div className={className}>
      {label && (
        <label className="label" htmlFor={name}>
          {label} {required && "*"}
        </label>
      )}
      <PhoneInputWithCountry
        id={name}
        name={name}
        control={control}
        defaultCountry="IN"
        international
        countryCallingCodeEditable={false}
        rules={{
          required: required ? "Phone number is required" : false,
          validate: (value) => !value || isValidPhoneNumber(value) || "Enter a valid phone number, including country code",
        }}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
