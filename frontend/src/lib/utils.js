import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}
