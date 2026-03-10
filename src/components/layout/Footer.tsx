"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { COMPANY, FOOTER } from "@/lib/constants";

export function Footer() {
  const handleCookiePreferences = (e: React.MouseEvent) => {
    e.preventDefault();
    // Trigger cookie preferences panel
    window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block font-bold text-xl text-foreground"
            >
              <span className="text-brand">AMCO</span>
              <span className="text-foreground">Service</span>
            </Link>
            <p className="text-sm text-text-muted">{FOOTER.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {FOOTER.columns.links.title}
            </h3>
            <ul className="space-y-2">
              {FOOTER.columns.links.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-muted hover:text-brand transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {FOOTER.columns.contacts.title}
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="flex items-start gap-2 text-sm text-text-muted">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {COMPANY.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone1.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-brand transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {COMPANY.phone1}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-brand transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <Link
                  href="/emergenze"
                  className="flex items-center gap-2 text-sm text-emergency hover:text-emergency/80 transition-colors"
                >
                  <AlertTriangle className="w-4 h-4" />
                  {COMPANY.emergency}
                  <span className="text-xs">(emergenze)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {FOOTER.columns.legal.title}
            </h3>
            <ul className="space-y-2">
              {FOOTER.columns.legal.items.map((item) => (
                <li key={item.href}>
                  {item.href === "#cookie-preferences" ? (
                    <button
                      onClick={handleCookiePreferences}
                      className="text-sm text-text-muted hover:text-brand transition-colors"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm text-text-muted hover:text-brand transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-text-muted">
            <p>{FOOTER.copyright}</p>
            <p className="text-xs">{COMPANY.legalRef}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
