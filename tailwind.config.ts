import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config: Config = {
  ...defaultConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
        spin: "spin 1s linear infinite",
      },
      perspective: {
        "1000": "1000px",
      },
      colors: {
        ...defaultConfig.theme.extend.colors,
        "neon-cyan": "#00FFFF",
        "neon-pink": "#FF00FF",
        "neon-purple": "#8A2BE2",
        "matrix-green": "#00FF00",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid":
          "linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)",
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 255, 255, 0.5)",
        "neon-pink": "0 0 20px rgba(255, 0, 255, 0.5)",
        "neon-purple": "0 0 20px rgba(138, 43, 226, 0.5)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}

export default config
