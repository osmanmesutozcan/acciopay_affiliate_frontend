const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6E6EED",
        secondary: colors.yellow,
        neutral: colors.gray,
        forbid: "#D6D6D6",
        danger: { text: "#AF1E1E", primary: "#FFECEC", light: "#FFF7F7" },
        gray: {
          text: "#979797",
          paragraph: "#7E7E7E",
          detail: "#363636",
          background: "#E6E6E6",
          light: "#F7F7F7",
        },
      },
      fontSize: {
        "2xs": "9px",
        "3xs": "8px",
      },
      keyframes: {
        banner: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },

  plugins: [require("daisyui"), require("@tailwindcss/forms"), require("@tailwindcss/typography")],

  darkMode: "class",

  daisyui: {
    themes: ["light"],
  },
};
