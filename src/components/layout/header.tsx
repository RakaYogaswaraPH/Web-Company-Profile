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
        {/* Left: Brand identity */}
        <div className="flex items-center w-36 sm:w-48 shrink-0">
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
        </div>

        {/* Center: Centered Studio Nav Links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden items-center justify-center gap-8 xl:gap-10 lg:flex text-xs uppercase tracking-widest font-medium text-slate-700 flex-1 mx-4"
        >
          {SITE_CONFIG.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-red-600 transition-colors py-2"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Balanced Spacer on Desktop / Hamburger on Mobile */}
        <div className="flex items-center justify-end w-36 sm:w-48 shrink-0">
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
