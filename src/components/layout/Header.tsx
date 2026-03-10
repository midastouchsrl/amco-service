"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-foreground"
            >
              <span className="text-brand">AMCO</span>
              <span className="text-foreground">Service</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-text hover:text-brand transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Emergenze link */}
              <Link
                href={EMERGENCY_NAV.href}
                className="px-4 py-2 text-sm font-medium text-emergency hover:text-emergency/80 transition-colors flex items-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                {EMERGENCY_NAV.label}
              </Link>

              {/* CTA Button */}
              <Button asChild className="ml-4">
                <Link href={NAV_CTA.href}>{NAV_CTA.label}</Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground hover:text-brand transition-colors"
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
