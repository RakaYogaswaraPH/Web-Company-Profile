import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: "div" | "section" | "article" | "main" | "header" | "footer";
}

export function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
