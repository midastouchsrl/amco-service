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
    <footer className="bg-foreground">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Company Info */}
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-block text-xl font-bold tracking-tight"
            >
              <span className="text-brand">AMCO</span>
              <span className="text-white"> Service</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">{FOOTER.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 tracking-wider uppercase mb-5">
              {FOOTER.columns.links.title}
            </h3>
            <ul className="space-y-3">
              {FOOTER.columns.links.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 tracking-wider uppercase mb-5">
              {FOOTER.columns.contacts.title}
            </h3>
            <ul className="space-y-4">
              <li>
                <span className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                  {COMPANY.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone1.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-white/40" />
                  {COMPANY.phone1}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-white/40" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <Link
                  href="/emergenze"
                  className="flex items-center gap-3 text-sm text-red-400/80 hover:text-red-300 transition-colors duration-200"
                >
                  <AlertTriangle className="w-4 h-4" />
                  {COMPANY.emergency}
                  <span className="text-xs text-white/30">(emergenze)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 tracking-wider uppercase mb-5">
              {FOOTER.columns.legal.title}
            </h3>
            <ul className="space-y-3">
              {FOOTER.columns.legal.items.map((item) => (
                <li key={item.href}>
                  {item.href === "#cookie-preferences" ? (
                    <button
                      onClick={handleCookiePreferences}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
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
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-white/35">{FOOTER.copyright}</p>
            <p className="text-xs text-white/25">{COMPANY.legalRef}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
