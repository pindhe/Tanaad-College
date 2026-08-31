export const COLLEGE_LOGO_PATH = "/images/logo.png";

/** Verified public profiles and location links */
export const OFFICIAL_LINKS = {
  facebook: "https://www.facebook.com/tanaadcollege",
  tiktok: "https://www.tiktok.com/@tanaad.college",
  googleMapsPlace:
    "https://www.google.com/maps/place/Tanaad+Computer+Science+College/@9.5624208,44.0744219,17z/data=!3m1!4b1!4m6!3m5!1s0x1628bf0efb2d5485:0xc8a018387db30d29!8m2!3d9.5624155!4d44.0769968!16s%2Fg%2F11fp4s0qmy",
  googleMapsEmbed:
    "https://maps.google.com/maps?q=9.5624155,44.0769968&hl=en&z=16&output=embed",
} as const;

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
