"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Our Properties", href: "/properties" },
  { label: "Destinations", href: "/destinations" },
  { label: "Booking Process", href: "/booking-process" },
  { label: "About Us", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="relative z-50 w-full bg-white">

      {/* Top green and gold accent line */}
      <div className="h-[4px] w-full bg-[linear-gradient(90deg,#07563D_0%,#07563D_60%,#C5A13B_100%)]" />

      {/* Navigation */}
      <nav className="relative mx-auto flex min-h-[80px] w-full items-center justify-between border-b border-[#E8EDE9] px-5 py-3 sm:px-8 lg:px-12">

        {/* Brand Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Constabam Shortlet home"
          className="group flex shrink-0 items-center gap-2.5"
        >
          {/* Logo mark */}
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[13px] border-2 border-[#C7A33C] bg-[#07563D] shadow-[0_2px_5px_rgba(0,0,0,0.10)] transition-transform duration-300 group-hover:scale-105">
            <span className="font-serif text-[26px] font-medium text-[#D7B447]">
              C
            </span>
          </div>

          {/* Brand name */}
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-display)] text-[23px] font-medium leading-none tracking-[-0.035em] text-[#171815] sm:text-[25px]">
              Constabam
            </span>

            <span className="mt-[6px] text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B99A40]">
              SHORTLET
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 xl:flex">

          <div className="flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-[14px] font-medium text-[#3F4440] transition-colors duration-200 hover:text-[#B99A40]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Inquiry button */}
          <Link
            href="/contact"
            className="ml-1 inline-flex h-[39px] items-center justify-center rounded-full bg-[#07563D] px-5 text-[14px] font-semibold text-white shadow-[0_3px_10px_rgba(7,86,61,0.17)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#06462F] hover:shadow-lg"
          >
            Send Inquiry
          </Link>

        </div>

        {/* Tablet navigation CTA */}
        <div className="hidden items-center gap-3 md:flex xl:hidden">
          <Link
            href="/contact"
            className="inline-flex h-[39px] items-center rounded-full bg-[#07563D] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#06462F]"
          >
            Send Inquiry
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5EAE6] text-[#07563D] transition-colors hover:bg-[#F0F5F1]"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5EAE6] text-[#07563D] transition-colors hover:bg-[#F0F5F1] md:hidden"
        >
          {mobileMenuOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>

      </nav>

      {/* Responsive dropdown menu */}
      <div
        className={`absolute left-0 top-full z-50 w-full border-b border-[#E5EAE6] bg-white shadow-[0_12px_20px_rgba(0,0,0,0.07)] transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-5">

          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center justify-between border-b border-[#EEF1EE] py-4 text-[15px] font-medium text-[#343A35] transition-colors hover:text-[#B99A40]"
              >
                {link.label}
                <ArrowUpRight
                  size={16}
                  className="text-[#B99A40]"
                />
              </Link>
            ))}
          </div>

          {/* Mobile inquiry button */}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-5 flex h-[48px] w-full items-center justify-center rounded-full bg-[#07563D] text-[15px] font-semibold text-white shadow-md transition-colors hover:bg-[#06462F]"
          >
            Send Inquiry
          </Link>

          <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B99A40]">
            CONSTABAM SHORTLET
          </p>

        </div>
      </div>

    </header>
  );
}