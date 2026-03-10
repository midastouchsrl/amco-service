"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, AlertTriangle, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NAV_ITEMS,
  NAV_CTA,
  EMERGENCY_NAV,
  COMPANY,
} from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 transform transition-transform duration-300 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link
              href="/"
              className="font-bold text-lg text-foreground"
              onClick={onClose}
            >
              <span className="text-brand">AMCO</span>
              <span className="text-foreground">Service</span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-text-muted hover:text-foreground transition-colors"
              aria-label="Chiudi menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-3 text-text hover:text-brand hover:bg-brand-subtle rounded-lg transition-colors"
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-text-muted" />
                  </Link>
                </li>
              ))}

              {/* Emergenze */}
              <li>
                <Link
                  href={EMERGENCY_NAV.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 text-emergency hover:bg-red-50 rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <AlertTriangle className="w-5 h-5" />
                    {EMERGENCY_NAV.label}
                  </span>
                  <ChevronRight className="w-5 h-5 opacity-60" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border space-y-3">
            {/* CTA */}
            <Button asChild className="w-full" size="lg">
              <Link href={NAV_CTA.href} onClick={onClose}>
                {NAV_CTA.label}
              </Link>
            </Button>

            {/* Phone */}
            <a
              href={`tel:${COMPANY.phone1.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-2 text-sm text-text-muted hover:text-brand transition-colors py-2"
            >
              <Phone className="w-4 h-4" />
              {COMPANY.phone1}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
