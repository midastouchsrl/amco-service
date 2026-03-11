"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, NAV_CTA, EMERGENCY_NAV } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_0_rgb(0_0_0/0.05)] border-b border-border/40"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="AMCO Service"
                width={240}
                height={94}
                className="h-8 lg:h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-text hover:text-brand transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}

              {/* Emergenze link */}
              <Link
                href={EMERGENCY_NAV.href}
                className="px-4 py-2 text-sm font-medium text-emergency hover:text-emergency/80 transition-colors duration-200 flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {EMERGENCY_NAV.label}
              </Link>

              {/* CTA Button */}
              <Button asChild className="ml-4 shadow-sm">
                <Link href={NAV_CTA.href}>{NAV_CTA.label}</Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -mr-2 text-foreground hover:text-brand transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Apri menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
