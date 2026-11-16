
import Link from "next/link";
import {
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const exploreLinks = [
  { label: "Our Properties", href: "/properties" },
  { label: "Destinations", href: "/destinations" },
  { label: "Booking Process", href: "/booking-process" },
  { label: "About Us", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

const destinations = [
  { label: "Florida", href: "/destinations/florida" },
  { label: "Texas", href: "/destinations/texas" },
  { label: "California", href: "/destinations/california" },
  { label: "Atlanta", href: "/destinations/atlanta" },
  { label: "Tennessee", href: "/destinations/tennessee" },
];

const currentYear = 2026;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#07563D] text-white">

      {/* Main footer content */}
      <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-16 sm:px-10 sm:pt-20 lg:px-16 lg:pb-24">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1.2fr] lg:gap-10">

          {/* Brand column */}
          <div className="max-w-[290px]">

            <Link
              href="/"
              aria-label="Constabam Shortlet homepage"
              className="group mb-7 inline-flex items-center gap-3"
            >

              {/* Logo image - matching Navbar */}
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-[13px] border border-[#E8EDE9] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.10)] transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Constabam Shortlet logo"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Brand name - matching Navbar */}
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-display)] text-[23px] font-medium leading-none tracking-[-0.035em] text-[#F5F2E8] sm:text-[25px]">
                  Constabam
                </span>

                <span className="mt-[6px] text-[10px] font-semibold uppercase tracking-[0.34em] text-[#B99A40]">
                  SHORTLET
                </span>
              </div>

            </Link>

            <p className="max-w-[270px] text-[16px] leading-[1.65] text-[#D1DDD6] sm:text-[17px]">
              Professionally managed shortlet apartments and vacation homes across the United States.
            </p>

          </div>

          {/* Explore column */}
          <div>
            <h3 className="mb-7 text-[14px] font-bold uppercase tracking-[0.13em] text-[#C8A84C]">
              Explore
            </h3>

            <ul className="space-y-[15px]">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-[16px] text-[#D2DED7] transition-colors duration-200 hover:text-[#D9B94F] sm:text-[17px]"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations column */}
          <div>
            <h3 className="mb-7 text-[14px] font-bold uppercase tracking-[0.13em] text-[#C8A84C]">
              Destinations
            </h3>

            <ul className="space-y-[15px]">
              {destinations.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[16px] text-[#D2DED7] transition-colors duration-200 hover:text-[#D9B94F] sm:text-[17px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Footer bottom divider */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">

          {/* Copyright */}
          <p className="max-w-[700px] text-[13px] leading-[1.7] text-[#B9CCC1] sm:text-[14px]">
            © {currentYear} CONSTABAMSHORTLET. Properties are managed, not necessarily owned, by CONSTABAMSHORTLET.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-8 text-[14px] text-[#B9CCC1]">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#D9B94F]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-[#D9B94F]"
            >
              Terms &amp; Conditions
            </Link>
          </div>

        </div>

      </div>

    </footer>
  );
}
