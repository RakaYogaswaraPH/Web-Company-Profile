"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2E5DC] bg-[#F6F7F3]/95 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        {/* Brand identity without asterisk */}
        <Link
          href="#beranda"
          className="group flex items-center focus-visible:outline-2 focus-visible:outline-slate-900"
        >
          <div className="relative h-8 w-36 sm:w-44">
            <Image
              src="/images/brands/logo.webp"
              alt={SITE_CONFIG.name}
              fill
              priority
              className="object-contain object-left"
              sizes="(max-width: 640px) 144px, 176px"
            />
          </div>
        </Link>

        {/* Studio nav */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden items-center gap-8 lg:flex text-xs uppercase tracking-widest font-medium text-slate-700"
        >
          {SITE_CONFIG.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-red-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3">
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
