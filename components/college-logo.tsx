import Image from "next/image";
import { COLLEGE_LOGO_PATH, resolveLogo } from "@/lib/brand";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg" | "xl";

const sizes: Record<LogoSize, { className: string; px: number }> = {
  sm: { className: "h-9 w-9", px: 36 },
  md: { className: "h-11 w-11", px: 44 },
  lg: { className: "h-16 w-16", px: 64 },
  xl: { className: "h-24 w-24", px: 96 },
};

export function CollegeLogo({
  src,
  size = "md",
  className,
  priority = false,
}: {
  src?: string | null;
  size?: LogoSize;
  className?: string;
  priority?: boolean;
}) {
  const { className: sizeClass, px } = sizes[size];

  return (
    <Image
      src={resolveLogo(src)}
      alt="Tanaad College"
      width={px}
      height={px}
      priority={priority}
      className={cn("rounded-full object-cover", sizeClass, className)}
    />
  );
}

export { COLLEGE_LOGO_PATH };
