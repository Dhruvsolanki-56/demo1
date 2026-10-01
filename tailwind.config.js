/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // react-phone-number-input renders these class names itself at runtime
  // (inside PhoneField.jsx) -- Tailwind's content scan only sees literal
  // JSX/HTML text, so it can never find them there and would otherwise purge
  // the custom `.PhoneInput*` rules in index.css as "unused" in production.
  safelist: [
    "PhoneInput",
    "PhoneInputInput",
    "PhoneInputCountry",
    "PhoneInputCountrySelect",
    "PhoneInputCountrySelectArrow",
    "PhoneInputCountryIcon",
    "PhoneInputCountryIconImg",
  ],
  theme: {
    extend: {
      colors: {
        // Steel blue -- the brand colour. 600 is the one interactive blue
        // (buttons, headings, links); 950 is the deep navy ink.
        primary: {
          50: "#f1f5fa",
          100: "#e2eaf3",
          200: "#c5d5e7",
          300: "#9cb8d6",
          400: "#6d95bf",
          500: "#4a79aa",
          600: "#336699",
          700: "#2a5580",
          800: "#234669",
          900: "#1b3653",
          950: "#051b2e",
        },
        // Warm yellow -- fills and small highlights only (never body text on
        // white: it fails contrast). 700 is the one shade dark enough to use
        // as text/icon colour on a white ground.
        accent: {
          50: "#fff8e8",
          100: "#feefc6",
          300: "#fedd8c",
          400: "#fdd36c",
          500: "#fdc94f",
          600: "#e9ae27",
          700: "#a86f06",
        },
        // Soft neutral panel ground.
        panel: "#eff2f3",
      },
      fontFamily: {
        // Jost: light geometric display face -- headings only.
        display: ["Jost", "Futura", "system-ui", "sans-serif"],
        // DM Sans: clean grotesk for body and UI.
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid hero size so the headline actually carries the page.
        display: ["clamp(2.5rem, 4.6vw, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(2rem, 3.2vw, 2.85rem)", { lineHeight: "1.15", letterSpacing: "-0.005em" }],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(5 27 46 / 0.05)",
        "card-hover": "0 2px 8px -2px rgb(5 27 46 / 0.10)",
        // The reference's card "ledge": a solid band under the card rather
        // than a blurred drop shadow.
        ledge: "0 6px 0 0 #dfe5ea",
        "ledge-blue": "0 6px 0 0 #336699",
      },
    },
  },
  plugins: [],
};
