
"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Apartments", href: "/apartments" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-[#FDFCFB]">

      {/* Main Navbar */}
      <nav className="h-[124px] w-full">
        <div className="mx-auto flex h-full max-w-[1168px] items-center justify-between px-5 sm:px-0">

          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-[16px]"
            aria-label="Constabam Shortlet Home"
          >
            {/* Logo Icon */}
            <div
              className="
                flex h-[82px] w-[82px] shrink-0
                items-center justify-center
                rounded-[19px]
                border-[3px] border-[#C8A33E]
                bg-[#075638]
                shadow-[0_2px_5px_rgba(0,0,0,0.22)]
                outline outline-[1px] outline-[#D9B94F]
                outline-offset-[-5px]
              "
            >
              <span className="font-serif text-[39px] font-normal leading-none text-[#C9A33C]">
                C
              </span>
            </div>

            {/* Brand Name */}
            <div className="flex flex-col justify-center">
              <span className="font-serif text-[35px] leading-[1.05] tracking-[-1.2px] text-[#171717]">
                Constabam
              </span>

              <span className="mt-[5px] text-[14px] font-semibold leading-none tracking-[5px] text-[#C4A64B]">
                SHORTLET
              </span>
            </div>
          </Link>

          {/* Hamburger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center text-[#171717] transition-opacity hover:opacity-60"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6.5H20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
              <path
                d="M4 12H20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
              <path
                d="M4 17.5H20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Dropdown Navigation */}
      {menuOpen && (
        <div className="absolute left-0 top-full w-full border-t border-[#E9E5D9] bg-[#FDFCFB] shadow-lg">
          <div className="mx-auto flex max-w-[1168px] flex-col py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-5 py-4 font-serif text-lg text-[#17251C] transition-colors hover:bg-[#F0F4EF] hover:text-[#C5A13D] sm:px-0"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

    </header>
  );
}
