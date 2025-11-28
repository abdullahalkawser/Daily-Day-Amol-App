// components/SafeLinearGradient.js
import { LinearGradient } from "expo-linear-gradient";

/**
 * SafeLinearGradient
 * - Ensures colors is always a non-empty array of valid color strings
 * - Filters out null/undefined/number/empty-string values
 * - Returns a fallback gradient if nothing valid remains
 */
const DEFAULT_FALLBACK = ["#4c669f", "#3b5998"];

function isValidColorValue(c) {
  // Accept strings only and non-empty after trim
  if (typeof c !== "string") return false;
  const s = c.trim();
  if (!s) return false;
  // Very light validation: allow #hex (3,4,6,8) or word/rgb/rgba strings
  if (/^#([0-9A-Fa-f]{3,8})$/.test(s)) return true;
  if (/^(rgb|rgba|hsl|hsla)\(/i.test(s)) return true;
  if (/^[a-zA-Z]+$/.test(s)) return true; // named color like "white"
  // fallback: accept as string (less strict) — but prefer valid hex/rgb/name
  return true;
}

export default function SafeLinearGradient({ colors, children, style, ...props }) {
  let safeColors = [];

  if (Array.isArray(colors)) {
    safeColors = colors
      .map((c) => (typeof c === "string" ? c.trim() : c))
      .filter((c) => isValidColorValue(c));
  }

  if (!safeColors || safeColors.length === 0) {
    safeColors = DEFAULT_FALLBACK;
  }

  return (
    <LinearGradient
      colors={safeColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}
