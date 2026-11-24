"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  // If on 404 or any non-root page, keep navbar clean: centered logo only, no nav buttons
  const isNotFoundOrSubpage = pathname !== "/";

  if (isNotFoundOrSubpage) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-[#E2E5DC] bg-[#F6F7F3]/95 backdrop-blur-md">
        <Container className="flex h-20 items-center justify-center">
          <Link
            href="/"
            className="group flex items-center justify-center focus-visible:outline-2 focus-visible:outline-slate-900"
          >
            <div className="relative h-8 w-36 sm:w-44">
              <Image
                src="/images/brands/logo.webp"
                alt={SITE_CONFIG.name}
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>
          </Link>
        </Container>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-[#E2E5DC] bg-[#F6F7F3]/95 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isMobileNavOpen &&
          "-translate-y-full opacity-0 pointer-events-none lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto"
      )}
    >
      <Container className="relative flex h-20 items-center justify-between">
        {/* Brand identity: Centered on mobile, left-aligned on desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:left-auto flex items-center justify-center lg:justify-start w-36 sm:w-44 lg:w-48 shrink-0 z-10">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("beranda");
            }}
            className="group flex items-center justify-center lg:justify-start focus-visible:outline-2 focus-visible:outline-slate-900"
          >
            <div className="relative h-8 w-36 sm:w-44">
              <Image
                src="/images/brands/logo.webp"
                alt={SITE_CONFIG.name}
                fill
                priority
                className="object-contain object-center lg:object-left"
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>
          </Link>
        </div>

        {/* Center: Centered Studio Nav Links (Click scrolls smoothly without adding # to URL) */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden items-center justify-center gap-8 xl:gap-10 lg:flex font-heading text-xs uppercase tracking-widest font-semibold text-slate-700 flex-1 mx-4"
        >
          {SITE_CONFIG.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(item.href);
              }}
              className="hover:text-red-600 transition-colors py-2 cursor-pointer text-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Balanced Spacer on Desktop / Hamburger on Mobile */}
        <div className="ml-auto lg:ml-0 flex items-center justify-end w-auto lg:w-48 shrink-0">
          <MobileNav
            isOpen={isMobileNavOpen}
            onToggle={() => setIsMobileNavOpen((prev) => !prev)}
            onClose={() => setIsMobileNavOpen(false)}
          />
        </div>
      </Container>
    </header>
  );
}
