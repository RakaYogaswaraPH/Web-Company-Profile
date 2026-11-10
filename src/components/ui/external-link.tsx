import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
}

const ALLOWED_SCHEMES = ["https://", "mailto:", "tel:"];

export function ExternalLink({
  href,
  children,
  className,
  ...props
}: ExternalLinkProps) {
  const isValidScheme = ALLOWED_SCHEMES.some((scheme) => href.startsWith(scheme));
  const safeHref = isValidScheme ? href : "#";

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2", className)}
      {...props}
    >
      {children}
    </a>
  );
}
