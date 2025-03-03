import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

/**
 * Converts a string to a URL-friendly slug with configurable length
 * @param {string} str - The string to convert to a slug
 * @param {number} [maxLength=0] - Maximum length of the slug (0 means no limit)
 * @returns {string} The slugified string
 */
export function slugify(str: string, maxLength = 0) {
  if (!str) return "";

  // Convert to lowercase, remove accents/diacritics
  const slug = str
    .toLowerCase()
    .trim()
    // Replace accents/diacritics with normal characters
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Replace spaces and special chars with hyphens
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    // Remove consecutive hyphens
    .replace(/-+/g, "-")
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, "");

  // Apply length constraint if specified
  if (maxLength > 0 && slug.length > maxLength) {
    // Cut at max length and remove trailing hyphens
    return slug.substring(0, maxLength).replace(/-+$/g, "");
  }

  return slug;
}
