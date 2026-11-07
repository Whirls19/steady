import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#14263F", teal: { DEFAULT: "#2F7F7A", soft: "#E6F0EE" }, paper: "#FAF8F4", alert: { DEFAULT: "#8A3226", soft: "#FBEDE9" } },
    fontFamily: { sans: ["var(--font-body)", "system-ui", "sans-serif"], display: ["var(--font-display)", "system-ui", "sans-serif"] } } },
  plugins: [],
};
export default config;
