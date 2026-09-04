import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Betees Brand Palette
        charcoal: "#18181B",
        burgundy: "#7F1D3A",
        "warm-white": "#FAFAF9",
        "rose-gold": "#C08484",
        emerald: "#059669",
        // Surface system
        surface: "#FAFAF9",
        "surface-dim": "#F0EEEA",
        "surface-low": "#F5F3EF",
        "surface-container": "#EEECEA",
        "surface-high": "#E8E6E2",
        "surface-highest": "#E2E0DC",
        // Text
        "on-surface": "#18181B",
        "on-surface-variant": "#52525B",
        // Border
        "outline-color": "#D4D2CE",
        "outline-variant": "#E8E6E2",
        // Brand
        primary: "#18181B",
        "on-primary": "#FAFAF9",
        "primary-container": "#2D2D30",
        secondary: "#7F1D3A",
        "on-secondary": "#FAFAF9",
        "secondary-container": "#F9E8EC",
        accent: "#C08484",
        success: "#059669",
        // Sidebar & Dashboard
        "sidebar-bg": "#18181B",
        "sidebar-text": "#D4D2CE",
        "sidebar-active": "#7F1D3A",
        border: "hsl(0 0% 89.8%)",
        input: "hsl(0 0% 89.8%)",
        ring: "hsl(0 0% 3.9%)",
        background: "#FAFAF9",
        foreground: "#18181B",
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "#F5F3EF",
          foreground: "#52525B",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#18181B",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#18181B",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": ["72px", { lineHeight: "80px", letterSpacing: "-0.02em", fontWeight: "400" }],
        "display-hero-mobile": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "headline-xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "400" }],
        "headline-lg": ["36px", { lineHeight: "44px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "500" }],
        "title-editorial": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "label-caps": ["11px", { lineHeight: "16px", letterSpacing: "0.15em", fontWeight: "600" }],
      },
      spacing: {
        "space-3xs": "0.125rem",
        "space-2xs": "0.25rem",
        "space-xs": "0.5rem",
        "space-sm": "0.75rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
        "space-2xl": "3rem",
        "space-3xl": "4.5rem",
        "space-4xl": "6rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "hero-float": "heroFloat 6s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        heroFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "editorial": "0 20px 40px -15px rgba(24, 24, 27, 0.06), 0 0 1px 1px rgba(228, 228, 231, 0.8)",
        "card-hover": "0 25px 50px -12px rgba(127, 29, 58, 0.08)",
        "sidebar": "2px 0 20px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
