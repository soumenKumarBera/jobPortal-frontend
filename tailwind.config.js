/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mine-shaft": {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e6e6e6",
          300: "#d6d6d6",
          400: "#a5a5a5",
          500: "#767676",
          600: "#575757",
          700: "#434343",
          800: "#2d2d2d",
          900: "#1a1a1a",
          950: "#0a0a0a",
        },
        "bright-sun": {
          50: "#fff8e1",
          100: "#ffecb3",
          200: "#ffe082",
          300: "#ffd54f",
          400: "#ffca28",
          500: "#ffc107",
          600: "#ffb300",
          700: "#ffa000",
          800: "#ff8f00",
          900: "#ff6f00",
          950: "#ff3d00",
        },
      },

      screens: {
        xsm: "350px",
        "xs ": "476px",
        sm: "640px",
        md: "768px",
        bs: "900px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",

        "2xl-mx": { max: "1535px" },
        "xl-mx": { max: "1279px" },
        "lg-mx": { max: "1024px" },
        "bs-mx": { max: "899px" },
        "md-mx": { max: "767px" },
        "sm-mx": { max: "639px" },
        "xs-mx": { max: "475px" },
        "xsm-mx": { max: "349px" },
      },
    },
  },
  plugins: [],
};
