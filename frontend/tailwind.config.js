const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors,
    extend: {
      width: {
        "custom/48": "48%",
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ["hover", "dark"],
    },
  },
  plugins: [],
};
