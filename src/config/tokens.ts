/**
 * Design Tokens — PT. MAULANA SADHA UTAMA (MUL Rent Car)
 * Phase 2.5 — Editorial Luxury Design Direction
 */

export const colors = {
  // Editorial Luxury Core (70% White/Ivory, 20% Charcoal, 10% Champagne Gold)
  primary: "#20252B",       // Charcoal
  primaryLight: "#343B45",
  gold: "#C49A3A",          // Champagne Gold accent
  goldDark: "#7A5817",      // Deep Bronze Gold (WCAG AA Compliant on Ivory/White)
  accent: "#C49A3A",
  ivory: "#F7F4EC",         // Warm Ivory
  bg: "#FFFFFF",            // Pure White default background
  surface: "#FFFFFF",
  surfaceIvory: "#F7F4EC",
  text: "#20252B",          // Charcoal typography
  muted: "#5A626A",         // Tested neutral gray with WCAG AA contrast
  border: "#E5E0D4",        // Subtle warm hairline divider
  borderLight: "#F0ECE1",
  wa: "#25D366",            // Official WhatsApp green
  waDark: "#1EBE5D",
  success: "#15803D",
  warning: "#B45309",
  error: "#B91C1C",
  info: "#1D4ED8",
} as const;

export const radii = {
  // Sharp corners and zero-radius components as the default (Editorial Luxury)
  none: "0px",
  input: "0px",
  card: "0px",
  button: "0px",
  media: "0px",
  badge: "0px",
  full: "9999px",
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const container = {
  maxWidth: 1280,
  gutterMobile: 16,
  gutterDesktop: 32,
} as const;

