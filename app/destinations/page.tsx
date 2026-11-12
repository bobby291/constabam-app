
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  MapPin,
  ArrowUpRight,
  ArrowRight,
  Home,
  Search,
  Compass,
  Sparkles,
  ChevronRight,
} from "lucide-react";

// ============================================
// TYPES
// ============================================

type Property = {
  id: string;
  name: string;
  city: string;
  destination: string;
  nightlyRate: number;
  coverPhoto: string;
  available: boolean;
};

type Destination = {
  name: string;
  homes: number;
  startingPrice: number;
  coverPhoto: string;
};

// ============================================
// PROPERTY DATA
// Sample data for frontend development.
// Replace with your backend/API data later.
// ============================================

const PROPERTY_DATA: Property[] = [
  {
    id: "1",
    name: "Luxury Miami Beach Villa",
    city: "Miami",
    destination: "Florida",
    nightlyRate: 350,
    coverPhoto:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=85",
    available: true,
  },
  {
    id: "2",
    name: "Miami Palm Residence",
    city: "Miami",
    destination: "Florida",
    nightlyRate: 250,
    coverPhoto:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85",
    available: true,
  },
  {
    id: "3",
    name: "Modern Houston City Apartment",
    city: "Houston",
    destination: "Texas",
    nightlyRate: 180,
    coverPhoto:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=85",
    available: true,
  },
  {
    id: "4",
    name: "Atlanta Executive Residence",
    city: "Atlanta",
    destination: "Georgia",
    nightlyRate: 250,
    coverPhoto:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85",
    available: true,
  },
  {
    id: "5",
    name: "California Coastal Retreat",
    city: "Los Angeles",
    destination: "California",
    nightlyRate: 420,
    coverPhoto:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=85",
    available: false,
  },
  {
    id: "6",
    name: "Nashville Comfort Suites",
    city: "Nashville",
    destination: "Tennessee",
    nightlyRate: 145,
    coverPhoto:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1400&q=85",
    available: true,
  },
  {
    id: "7",
    name: "Dallas Luxury Family Home",
    city: "Dallas",
    destination: "Texas",
    nightlyRate: 295,
    coverPhoto:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&q=85",
    available: true,
  },
];

// ============================================
// DESTINATION SKELETON
// ============================================

function DestinationSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <div className="relative aspect-[4/3] animate-pulse bg-[#E5EDE6]">
        <div className="absolute bottom-8 left-7 space-y-3">
          <div className="h-7 w-40 rounded bg-[#D5E1D7]" />
          <div className="h-4 w-24 rounded bg-[#D5E1D7]" />
        </div>
      </div>
    </div>
  );
}

// ============================================
// DESTINATION CARD
// ============================================

function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  const propertyUrl = `/properties?destination=${encodeURIComponent(
    destination.name
  )}`;

  return (
    <Link
      href={propertyUrl}
      aria-label={`Explore ${destination.name} properties`}
      className="group relative block overflow-hidden rounded-2xl bg-[#123D2B] shadow-[0_5px_20px_rgba(15,45,30,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_35px_rgba(15,45,30,0.16)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">

        <Image
          src={destination.coverPhoto}
          alt={`${destination.name} shortlet homes`}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Green gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#062A1C] via-[#062A1C]/35 to-transparent opacity-95 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-[#07563D]/0 transition-colors duration-300 group-hover:bg-[#07563D]/10" />

        {/* Destination Information */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-6 sm:p-7">

          <div>

            {/* Location label */}
            <div className="mb-3 flex items-center gap-1.5">
              <MapPin size={13} className="text-[#D9B94F]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.19em] text-[#D9B94F]">
                Explore destination
              </span>
            </div>

            {/* Destination name */}
            <h2 className="font-serif text-[30px] font-medium leading-tight tracking-[-0.5px] text-white sm:text-[34px] lg:text-[36px]">
              {destination.name}
            </h2>

            {/* Home count */}
            <p className="mt-2 text-[13px] font-semibold tracking-wide text-[#D9B94F]">
              {destination.homes}{" "}
              {destination.homes === 1 ? "home" : "homes"}
            </p>

            {/* Starting price */}
            <p className="mt-2 text-[12px] font-medium text-white/75">
              From{" "}
              <span className="font-bold text-white">
                ${destination.startingPrice.toLocaleString("en-US")}
              </span>{" "}
              / night
            </p>

          </div>

          {/* Arrow */}
          <div className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:border-[#D9B94F] group-hover:bg-[#C8A84C] group-hover:text-[#173C2B]">
            <ArrowUpRight size={20} />
          </div>

        </div>
      </div>
    </Link>
  );
}

// ============================================
// FEATURED DESTINATION
// ============================================

function FeaturedDestination({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <Link
      href={`/properties?destination=${encodeURIComponent(destination.name)}`}
      className="group relative block overflow-hidden rounded-[22px] bg-[#123D2B] shadow-[0_12px_35px_rgba(15,45,30,0.10)]"
    >
      <div className="relative aspect-[16/8] min-h-[310px] overflow-hidden sm:aspect-[16/6] lg:aspect-[16/5]">

        <Image
          src={destination.coverPhoto}
          alt={`Featured destination: ${destination.name}`}
          fill
          unoptimized
          sizes="100vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Dark green overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#052D1D]/95 via-[#052D1D]/65 to-[#052D1D]/10" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#052D1D]/55 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-7 py-10 sm:px-12 lg:px-16">

          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9B94F]/50 bg-[#C8A84C]/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E6C967]">
            <Sparkles size={13} />
            Featured destination
          </span>

          <span className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D9B94F]">
            Discover our most popular location
          </span>

          <h2 className="max-w-[700px] font-serif text-[42px] font-medium leading-tight text-white sm:text-[55px] lg:text-[68px]">
            {destination.name}
          </h2>

          <p className="mt-4 text-[14px] text-white/85 sm:text-[16px]">
            {destination.homes}{" "}
            {destination.homes === 1 ? "home" : "homes"} available to explore
          </p>

          <div className="mt-7 inline-flex items-center gap-3 rounded-lg bg-[#C8A84C] px-6 py-3.5 text-[13px] font-bold text-[#173C2B] transition-all duration-300 group-hover:bg-[#E0C16A]">
            Explore {destination.name}
            <ArrowUpRight size={17} />
          </div>

        </div>
      </div>
    </Link>
  );
}

// ============================================
// MAIN DESTINATION PAGE
// ============================================

export default function DestinationPage() {

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD DESTINATIONS
  // ==========================================

  useEffect(() => {
    let active = true;

    const loadDestinations = async () => {
      setLoading(true);

      try {
        // Simulated loading.
        // Replace with your API/backend request.

        await new Promise((resolve) =>
          setTimeout(resolve, 700)
        );

        if (active) {
          setProperties(PROPERTY_DATA);
        }
      } catch (error) {
        console.error("Unable to load destinations:", error);

        if (active) {
          setProperties([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDestinations();

    return () => {
      active = false;
    };
  }, []);

  // ==========================================
  // BUILD DESTINATIONS FROM PROPERTIES
  // ==========================================

  const destinations = useMemo(() => {

    const grouped = new Map<string, Property[]>();

    properties.forEach((property) => {
      const city = property.city.trim();

      if (!city) return;

      const existing = grouped.get(city) || [];

      existing.push(property);

      grouped.set(city, existing);
    });

    const result: Destination[] = Array.from(
      grouped.entries()
    ).map(([name, homes]) => {

      // Cheapest home in this destination
      const cheapestHome = Math.min(
        ...homes.map((home) => home.nightlyRate)
      );

      // Use the first home's cover image
      const coverPhoto = homes[0].coverPhoto;

      return {
        name,
        homes: homes.length,
        startingPrice: cheapestHome,
        coverPhoto,
      };
    });

    // Most homes first
    return result.sort(
      (a, b) =>
        b.homes - a.homes ||
        a.name.localeCompare(b.name)
    );

  }, [properties]);

  // ==========================================
  // FEATURED DESTINATION
  // ==========================================

  const featuredDestination = destinations[0];

  // ==========================================
  // REMAINING DESTINATIONS
  // ==========================================

  const otherDestinations = destinations.slice(1);

  // ==========================================
  // PAGE UI
  // ==========================================

  return (
    <main className="min-h-screen bg-[#F8FAF8]">

      {/* ====================================
          HERO BANNER
      ==================================== */}

      <section className="relative overflow-hidden border-b border-[#E1EAE2] bg-[#EAF3EC]">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-28 h-[350px] w-[350px] rounded-full border-[45px] border-[#07563D]/[0.035]" />

        <div className="pointer-events-none absolute -right-5 bottom-[-180px] h-[300px] w-[300px] rounded-full border-[35px] border-[#07563D]/[0.035]" />

        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">

          <div className="max-w-[760px]">

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C8A84C]" />

              <span className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#9B7C32]">
                Destinations
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[46px] font-medium leading-[1.1] tracking-[-1.5px] text-[#173C2B] sm:text-[58px] lg:text-[68px]">
              Where we host
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-[600px] text-[15px] leading-[1.9] text-[#65766B] sm:text-[17px]">
              Find a home in the city you're visiting.
            </p>

          </div>

        </div>
      </section>

      {/* ====================================
          INTRODUCTION
      ==================================== */}

      <section className="mx-auto max-w-[1440px] px-6 pt-16 sm:px-10 lg:px-16 lg:pt-20">

        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">

          <div className="max-w-[760px]">

            <div className="mb-4 flex items-center gap-2">
              <Compass size={17} className="text-[#C8A84C]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A8893F]">
                Your stay, your destination
              </span>
            </div>

            <h2 className="font-serif text-[30px] font-semibold leading-tight text-[#193B2C] sm:text-[37px]">
              Discover places worth staying in.
            </h2>

            <p className="mt-4 max-w-[690px] text-[14px] leading-[1.9] text-[#758178] sm:text-[15px]">
              Whether you're travelling for business, planning a
              family getaway or exploring somewhere new, Constabam
              Shortlet makes finding a comfortable place to stay
              easier. Explore our destinations, discover thoughtfully
              managed homes and find the right space for your next trip.
            </p>

          </div>

          {/* Destination count */}
          {!loading && destinations.length > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-[#E5EBE5] bg-white px-5 py-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF4EE] text-[#07563D]">
                <MapPin size={20} />
              </div>

              <div>
                <p className="text-[23px] font-bold text-[#193B2C]">
                  {destinations.length}
                </p>

                <p className="text-[11px] uppercase tracking-wider text-[#829087]">
                  Destinations
                </p>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ====================================
          FEATURED DESTINATION
      ==================================== */}

      {!loading && featuredDestination && (
        <section className="mx-auto max-w-[1440px] px-6 pt-12 sm:px-10 lg:px-16 lg:pt-14">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A8893F]">
                Guest favourite
              </span>

              <h2 className="mt-2 font-serif text-[27px] font-semibold text-[#193B2C]">
                Featured destination
              </h2>
            </div>
          </div>

          <FeaturedDestination
            destination={featuredDestination}
          />

        </section>
      )}

      {/* ====================================
          DESTINATION GRID
      ==================================== */}

      <section className="mx-auto max-w-[1440px] px-6 pb-20 pt-16 sm:px-10 lg:px-16 lg:pb-28 lg:pt-20">

        {/* Section heading */}
        <div className="mb-9 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A8893F]">
              Explore our locations
            </span>

            <h2 className="mt-2 font-serif text-[31px] font-semibold text-[#193B2C] sm:text-[36px]">
              All destinations
            </h2>

            <p className="mt-3 text-[14px] text-[#829087]">
              Find the perfect place for your next stay.
            </p>
          </div>

          {!loading && destinations.length > 0 && (
            <span className="text-[13px] font-medium text-[#7A887E]">
              {destinations.length} locations to explore
            </span>
          )}

        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <DestinationSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && destinations.length === 0 && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#D8E2D9] bg-white px-6 text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF4EE] text-[#07563D]">
              <Home size={27} />
            </div>

            <h3 className="font-serif text-[25px] font-semibold text-[#193B2C]">
              New destinations coming soon.
            </h3>

            <p className="mt-3 max-w-[380px] text-[14px] leading-7 text-[#7A887E]">
              We're working on bringing more amazing places
              and comfortable homes to your next journey.
              Check back soon.
            </p>

          </div>
        )}

        {/* Destination Cards */}
        {!loading && otherDestinations.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {otherDestinations.map((destination) => (
              <DestinationCard
                key={destination.name}
                destination={destination}
              />
            ))}
          </div>
        )}

        {/* Single destination fallback */}
        {!loading && destinations.length === 1 && (
          <div className="mt-5 rounded-xl border border-[#E5EBE5] bg-white p-5 text-center text-[13px] text-[#758178]">
            More destinations are coming soon.
          </div>
        )}

      </section>

      {/* ====================================
          CAN'T FIND YOUR CITY CTA
      ==================================== */}

      <section className="border-t border-[#E5EBE5] bg-[#EDF4EE]">

        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">

          <div className="relative overflow-hidden rounded-[22px] bg-[#07563D] px-7 py-12 sm:px-12 sm:py-14 lg:px-16">

            {/* Decorative circle */}
            <div className="pointer-events-none absolute -right-20 -top-28 h-[320px] w-[320px] rounded-full border-[45px] border-white/[0.04]" />

            <div className="relative flex flex-col justify-between gap-9 md:flex-row md:items-center">

              <div className="max-w-[650px]">

                <div className="mb-4 flex items-center gap-2 text-[#D9B94F]">
                  <Sparkles size={17} />

                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                    Let us help you
                  </span>
                </div>

                <h2 className="font-serif text-[32px] font-semibold leading-tight text-white sm:text-[40px]">
                  Can't find your city?
                </h2>

                <p className="mt-4 max-w-[550px] text-[14px] leading-[1.9] text-[#D0DED4] sm:text-[15px]">
                  Tell us where you're planning to travel.
                  Our team will help you explore available
                  accommodation options for your destination.
                </p>

              </div>

              <Link
                href="/inquiry"
                className="inline-flex min-h-[53px] shrink-0 items-center justify-center gap-3 rounded-lg bg-[#C8A84C] px-7 py-4 text-[13px] font-bold text-[#173C2B] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#E0C16A] hover:shadow-xl"
              >
                Send an inquiry
                <ArrowRight size={17} />
              </Link>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
