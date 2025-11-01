// Utils - Utility function for merging Tailwind CSS classes
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Merge and deduplicate Tailwind CSS class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
