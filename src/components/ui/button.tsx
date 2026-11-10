import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline-accent";
type ButtonSize = "md" | "lg";

interface BaseButtonProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
  readonly children: ReactNode;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    readonly href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    readonly href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-blue-600 shadow-xs",
  secondary:
    "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-slate-600 shadow-xs",
  accent:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:outline-red-600 shadow-xs",
  "outline-accent":
    "bg-white text-red-600 border border-red-200 hover:bg-red-50 active:bg-red-100 focus-visible:outline-red-600 shadow-xs",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 py-2.5 text-sm font-medium",
  lg: "min-h-12 px-7 py-3 text-base font-semibold",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const combinedClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 text-balance text-center cursor-pointer select-none",
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className
  );

  if (href) {
    const isAnchor = href.startsWith("#");
    if (isAnchor) {
      return (
        <a
          href={href}
          className={combinedClassName}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={combinedClassName}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
