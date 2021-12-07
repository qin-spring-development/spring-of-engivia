module.exports = {
  mode: "jit",
  purge: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: {
          100: "#FEF3C7",
        },
        green: {
          100: "#D1FAE5",
          700: "#047857",
          800: "#065F46",
        },
        orange: {
          100: "#FFEDD5",
          700: "#C2410C",
        },
        gray: {
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          700: "#374151",
          900: "#111827",
        },
        "light-blue": {
          100: "#E0F2FE",
          200: "#CAEFFF",
          300: "#64C8FF",
          400: "#1BB5EA",
          500: "#0F9FD8",
          600: "#0284C7",
          700: "#0369A1",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
