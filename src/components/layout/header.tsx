"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-colors">
      <Container className="flex h-20 items-center justify-between">
        {/* Brand logo */}
        <Link
          href="#beranda"
          className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-4 rounded-md"
        >
          <div className="relative h-10 w-36 sm:w-44">
            <Image
              src="/images/brands/logo.webp"
              alt={SITE_CONFIG.name}
              fill
              priority
              className="object-contain object-left transition-transform group-hover:scale-102"
              sizes="(max-width: 640px) 144px, 176px"
            />
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden items-center gap-1 lg:flex"
        >
          {SITE_CONFIG.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#kontak"
            className="hidden items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-red-600 focus-visible:outline-offset-2 transition-colors sm:inline-flex"
          >
            <span>Hubungi Kami</span>
            <ArrowUpRight className="size-4" />
          </a>

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
