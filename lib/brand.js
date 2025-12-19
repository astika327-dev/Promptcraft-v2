// lib/brand.js

export const brand = {
  colors: {
    primary: {
      DEFAULT: "hsl(210, 40%, 98%)", // Almost white
      foreground: "hsl(215, 25%, 27%)", // Dark gray-blue
    },
    secondary: {
      DEFAULT: "hsl(215, 20%, 65%)", // Medium gray-blue
      foreground: "hsl(210, 40%, 98%)", // Almost white
    },
    accent: {
      DEFAULT: "hsl(260, 70%, 60%)", // A vibrant but not overly bright purple
      foreground: "hsl(210, 40%, 98%)", // Almost white
    },
    background: "hsl(0, 0%, 100%)", // White
    foreground: "hsl(215, 25%, 27%)", // Dark gray-blue
    border: "hsl(214, 32%, 91%)", // Light gray
    ring: "hsl(215, 28%, 63%)", // Medium-light gray
    muted: {
        DEFAULT: "hsl(210, 40%, 96.1%)",
        foreground: "hsl(215.4, 16.3%, 46.9%)",
    },
  },
  typography: {
    fontFamily: {
      sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
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
