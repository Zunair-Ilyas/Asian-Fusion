import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Normalize an image source string. If it's plain base64 without a data URL prefix,
// wrap it with an inferred mime type. If it's already a data URL or http(s), return as-is.
export function normalizeImageSrc(value?: string | null): string | undefined {
  if (!value) return undefined;
  let v = value.trim();
  if (!v) return undefined;

  // Strip wrapping quotes if present
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1).trim();
  }

  const lower = v.toLowerCase();
  if (lower === "null" || lower === "undefined" || lower === "none" || lower === "n/a") return undefined;

  // Already a proper data URL or http(s)
  if (v.startsWith("data:")) {
    // Normalize any whitespace around the comma after base64 header
    const parts = v.split(",");
    if (parts.length >= 2 && /;base64$/i.test(parts[0])) {
      // Remove whitespace/newlines in the base64 payload
      const header = parts[0];
      const payload = parts.slice(1).join(",").replace(/\s+/g, "");
      return `${header},${payload}`;
    }
    return v;
  }
  if (v.startsWith("http://") || v.startsWith("https://")) {
    return v;
  }

  // Otherwise, treat as raw base64; remove whitespace/newlines
  const raw = v.replace(/\s+/g, "");

  // Heuristic: looks like base64?
  const looksBase64 = /^[A-Za-z0-9+/=]+$/.test(raw) && raw.length > 50;
  if (!looksBase64) return v;

  // Infer mime type by magic bytes
  let mime = "image/jpeg";
  if (raw.startsWith("iVBOR")) mime = "image/png"; // PNG: iVBORw0KG...
  else if (raw.startsWith("/9j/")) mime = "image/jpeg"; // JPEG
  else if (raw.startsWith("R0lGOD")) mime = "image/gif"; // GIF
  else if (raw.startsWith("UklGR")) mime = "image/webp"; // WebP
  else if (raw.startsWith("Qk")) mime = "image/bmp"; // BMP

  return `data:${mime};base64,${raw}`;
}
