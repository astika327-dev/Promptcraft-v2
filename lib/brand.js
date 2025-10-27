// lib/brand.js

export const brand = {
  colors: {
    primary: {
      DEFAULT: "hsl(265, 69%, 50%)", // Purple
      foreground: "hsl(0, 0%, 100%)",   // White
    },
    secondary: {
      DEFAULT: "hsl(265, 75%, 65%)", // Lighter Violet
      foreground: "hsl(0, 0%, 100%)",   // White
    },
    accent: {
      DEFAULT: "hsl(38, 92%, 50%)", // Golden Yellow / Orange
      foreground: "hsl(215, 28%, 17%)", // Charcoal text on accent
    },
    background: "hsl(215, 28%, 17%)", // Charcoal Gray
    foreground: "hsl(0, 0%, 100%)",   // White
    border: "hsl(215, 20%, 30%)",     // Lighter Charcoal for borders
    ring: "hsl(38, 92%, 60%)",       // Lighter accent for rings
    muted: {
        DEFAULT: "hsl(215, 28%, 25%)", // Muted charcoal
        foreground: "hsl(215, 20%, 65%)", // Muted gray text
    },
  },
  typography: {
    fontFamily: {
      sans: ["var(--font-geist-sans)"],
      mono: ["var(--font-geist-mono)"],
    },
    fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
    },
    lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
};
