export const COLLEGE_LOGO_PATH = "/images/logo.png";

/** Official brand palette */
export const BRAND = {
  green: "#01DC02",
  blue: "#0C019B",
  black: "#0E0903",
  white: "#FFFFFF",
} as const;

export function resolveLogo(src?: string | null): string {
  return src && src.trim().length > 0 ? src : COLLEGE_LOGO_PATH;
}
