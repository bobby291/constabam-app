
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  BedDouble,
  Bath,
  Users,
  ArrowUpRight,
  Wifi,
  Car,
  Waves,
  Wind,
  Coffee,
  ChevronDown,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

import {
  getAvailableProperties,
  type Property,
} from "@/lib/properties";

// ============================================
// PROPERTY CARD SKELETON
// ============================================

function PropertySkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5EAE5] bg-white">
      <div className="aspect-[4/3] animate-pulse bg-[#E9EFEA]" />

      <div className="space-y-4 p-5">
        <div className="h-3 w-24 animate-pulse rounded bg-[#E9EFEA]" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-[#E9EFEA]" />
        <div className="h-4 w-full animate-pulse rounded bg-[#E9EFEA]" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-[#E9EFEA]" />

        <div className="flex gap-5 pt-2">
          <div className="h-4 w-14 animate-pulse rounded bg-[#E9EFEA]" />
          <div className="h-4 w-14 animate-pulse rounded bg-[#E9EFEA]" />
          <div className="h-4 w-14 animate-pulse rounded bg-[#E9EFEA]" />
        </div>

        <div className="flex gap-3 pt-3">
          <div className="h-11 flex-1 animate-pulse rounded-lg bg-[#E9EFEA]" />
          <div className="h-11 flex-1 animate-pulse rounded-lg bg-[#E9EFEA]" />
        </div>
      </div>
    </div>
  );
}

// ============================================
// PROPERTY CARD
// ============================================

function PropertyCard({ property }: { property: Property }) {
  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi size={13} />,
    "Swimming Pool": <Waves size={13} />,
    Parking: <Car size={13} />,
    "Air Conditioning": <Wind size={13} />,
    "Coffee Maker": <Coffee size={13} />,
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#E7EAE5] bg-white shadow-[0_4px_20px_rgba(15,45,30,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C8A84C] hover:shadow-[0_15px_35px_rgba(15,45,30,0.10)]">

      {/* PROPERTY IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E9EFEA]">
        <Image
          src={property.coverPhoto}
          alt={property.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {property.featured && (
          <span className="absolute left-4 top-4 z-10 rounded-md bg-[#C8A84C] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#173C2B] shadow-sm">
            Featured
          </span>
        )}

        {!property.available && (
          <span className="absolute left-4 top-4 z-10 rounded-md bg-[#303A34] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            Unavailable
          </span>
        )}

        {/* NIGHTLY RATE */}
        <div className="absolute bottom-4 right-4 z-10 rounded-lg bg-[#07563D] px-4 py-2 text-white shadow-lg">
          <span className="text-[16px] font-bold">
            ${property.nightlyRate.toLocaleString("en-US")}
          </span>

          <span className="ml-1 text-[11px] text-white/80">
            / night
          </span>
        </div>

        {!property.available && (
          <div className="absolute inset-0 bg-black/15" />
        )}
      </div>

      {/* PROPERTY INFORMATION */}
      <div className="p-5 sm:p-6">

        {/* LOCATION */}
        <div className="mb-3 flex items-center gap-1.5">
          <MapPin size={14} className="text-[#C8A84C]" />

          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#B18D37]">
            {property.city}, {property.destination}
          </span>
        </div>

        {/* PROPERTY NAME */}
        <h2 className="mb-2 font-serif text-[22px] font-semibold leading-tight text-[#193B2C] sm:text-[24px]">
          {property.name}
        </h2>

        {/* DESCRIPTION */}
        <p className="mb-5 line-clamp-2 min-h-[48px] text-[14px] leading-6 text-[#758178]">
          {property.description}
        </p>

        {/* PROPERTY DETAILS */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-[#EDF0EC] py-4 text-[13px] text-[#58675D]">

          <div className="flex items-center gap-1.5">
            <BedDouble size={17} className="text-[#A58A43]" />

            <span>
              {property.bedrooms ?? "TBC"} Beds
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath size={17} className="text-[#A58A43]" />

            <span>
              {property.bathrooms ?? "TBC"} Baths
            </span>
          </div>

          {property.maxGuests != null && (
            <div className="flex items-center gap-1.5">
              <Users size={17} className="text-[#A58A43]" />

              <span>
                {property.maxGuests} Guests
              </span>
            </div>
          )}

        </div>

        {/* TOP AMENITIES */}
        <div className="flex min-h-[43px] flex-wrap items-center gap-2 py-3">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#F3F7F3] px-2.5 py-1.5 text-[11px] font-medium text-[#587063]"
            >
              {amenityIcons[amenity] || null}
              {amenity}
            </span>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-3 grid grid-cols-2 gap-3">

          <Link
            href={`/property-page/${property.slug}`}
            className="flex h-[46px] items-center justify-center gap-2 rounded-lg border border-[#07563D] text-[13px] font-semibold text-[#07563D] transition-all duration-200 hover:bg-[#F0F6F1] sm:text-[14px]"
          >
            View details
            <ArrowUpRight size={15} />
          </Link>

          <Link
            href="/inquires"
            className="flex h-[46px] items-center justify-center gap-2 rounded-lg bg-[#07563D] text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#06442F] sm:text-[14px]"
          >
            Inquire
            <ArrowUpRight size={15} />
          </Link>

        </div>
      </div>
    </article>
  );
}

// ============================================
// MAIN PROPERTIES PAGE
// ============================================

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ==========================================
  // FILTER STATES
  // ==========================================

  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("All destinations");
  const [bedrooms, setBedrooms] = useState("Any");
  const [sort, setSort] = useState("recommended");

  // ==========================================
  // LOAD PROPERTIES FROM LIBRARY
  // ==========================================

  const loadProperties = async () => {
    setLoading(true);
    setError(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const propertyData = getAvailableProperties();

      setProperties(propertyData);
    } catch (error) {
      console.error("Failed to load properties:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  // ==========================================
  // READ DESTINATION FROM URL
  // ==========================================

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedDestination = params.get("destination");

    if (selectedDestination) {
      setDestination(selectedDestination);
    }
  }, []);

  // ==========================================
  // DESTINATION OPTIONS
  // ==========================================

  const destinations = useMemo(() => {
    return Array.from(
      new Set(properties.map((property) => property.destination))
    ).sort();
  }, [properties]);

  // ==========================================
  // FILTER AND SORT PROPERTIES
  // ==========================================

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // SEARCH FILTER
    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter(
        (property) =>
          property.name.toLowerCase().includes(query) ||
          property.city.toLowerCase().includes(query)
      );
    }

    // DESTINATION FILTER
    if (destination !== "All destinations") {
      result = result.filter(
        (property) =>
          property.destination.toLowerCase() ===
          destination.toLowerCase()
      );
    }

    // BEDROOM FILTER
    if (bedrooms !== "Any") {
      const minimum = Number(bedrooms);

      result = result.filter(
        (property) =>
          property.bedrooms !== null &&
          property.bedrooms >= minimum
      );
    }

    // RECOMMENDED SORTING
    if (sort === "recommended") {
      result.sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
    }

    // LOWEST PRICE FIRST
    if (sort === "price-low") {
      result.sort(
        (a, b) => a.nightlyRate - b.nightlyRate
      );
    }

    // HIGHEST PRICE FIRST
    if (sort === "price-high") {
      result.sort(
        (a, b) => b.nightlyRate - a.nightlyRate
      );
    }

    return result;
  }, [properties, search, destination, bedrooms, sort]);

  // ==========================================
  // UPDATE DESTINATION URL
  // ==========================================

  const handleDestinationChange = (value: string) => {
    setDestination(value);

    const params = new URLSearchParams(window.location.search);

    if (value === "All destinations") {
      params.delete("destination");
    } else {
      params.set("destination", value);
    }

    const query = params.toString();

    window.history.replaceState(
      null,
      "",
      query ? `?${query}` : window.location.pathname
    );
  };

  // ==========================================
  // RESET FILTERS
  // ==========================================

  const resetFilters = () => {
    setSearch("");
    setDestination("All destinations");
    setBedrooms("Any");
    setSort("recommended");

    window.history.replaceState(
      null,
      "",
      window.location.pathname
    );
  };

  // ==========================================
  // PAGE UI
  // ==========================================

  return (
    <main className="min-h-screen bg-[#F8FAF8]">

      {/* ======================================
          HERO BANNER
      ====================================== */}

      <section className="relative overflow-hidden border-b border-[#E1EAE2] bg-[#EAF3EC]">

        <div className="pointer-events-none absolute -right-24 -top-32 h-[350px] w-[350px] rounded-full border-[45px] border-[#07563D]/[0.035]" />

        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">

          <div className="max-w-[760px]">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C8A84C]" />

              <span className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#9B7C32]">
                Our Properties
              </span>
            </div>

            <h1 className="font-serif text-[42px] font-medium leading-[1.12] tracking-[-1.5px] text-[#173C2B] sm:text-[54px] lg:text-[64px]">
              Homes for every occasion
            </h1>

            <p className="mt-6 max-w-[660px] text-[15px] leading-[1.9] text-[#65766B] sm:text-[17px]">
              Browse our managed shortlet homes. Rates are in USD;
              send an inquiry to check availability for your dates.
            </p>

          </div>
        </div>
      </section>

      {/* ======================================
          FILTER BAR
      ====================================== */}

      <section className="relative z-20 mx-auto -mt-2 max-w-[1440px] px-6 pt-8 sm:px-10 lg:px-16">

        <div className="rounded-2xl border border-[#E5EBE5] bg-white p-4 shadow-[0_10px_35px_rgba(15,45,30,0.06)] sm:p-6">

          {/* FILTER HEADER */}
          <div className="mb-5 flex items-center justify-between">

            <div className="flex items-center gap-2">
              <SlidersHorizontal
                size={17}
                className="text-[#07563D]"
              />

              <h2 className="text-[14px] font-bold text-[#193B2C]">
                Find your stay
              </h2>
            </div>

            <button
              onClick={resetFilters}
              className="text-[12px] font-semibold text-[#A8893F] transition-colors hover:text-[#07563D]"
            >
              Clear filters
            </button>

          </div>

          {/* FILTER CONTROLS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* SEARCH */}
            <div className="relative">

              <label
                htmlFor="property-search"
                className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#718076]"
              >
                Search properties
              </label>

              <div className="relative">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9A8E]"
                />

                <input
                  id="property-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Name or city..."
                  className="h-[49px] w-full rounded-lg border border-[#E4EAE4] bg-[#F9FBF9] pl-11 pr-4 text-[13px] text-[#193B2C] outline-none transition-all placeholder:text-[#A2ADA5] focus:border-[#07563D] focus:bg-white focus:ring-2 focus:ring-[#07563D]/10"
                />

              </div>
            </div>

            {/* DESTINATION */}
            <div>

              <label
                htmlFor="destination-filter"
                className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#718076]"
              >
                Destination
              </label>

              <div className="relative">

                <select
                  id="destination-filter"
                  value={destination}
                  onChange={(e) =>
                    handleDestinationChange(e.target.value)
                  }
                  className="h-[49px] w-full appearance-none rounded-lg border border-[#E4EAE4] bg-[#F9FBF9] px-4 pr-10 text-[13px] text-[#193B2C] outline-none transition-all focus:border-[#07563D] focus:bg-white focus:ring-2 focus:ring-[#07563D]/10"
                >
                  <option value="All destinations">
                    All destinations
                  </option>

                  {destinations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718076]"
                />

              </div>
            </div>

            {/* BEDROOMS */}
            <div>

              <label
                htmlFor="bedroom-filter"
                className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#718076]"
              >
                Bedrooms
              </label>

              <div className="relative">

                <select
                  id="bedroom-filter"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="h-[49px] w-full appearance-none rounded-lg border border-[#E4EAE4] bg-[#F9FBF9] px-4 pr-10 text-[13px] text-[#193B2C] outline-none transition-all focus:border-[#07563D] focus:bg-white focus:ring-2 focus:ring-[#07563D]/10"
                >
                  <option value="Any">
                    Any bedrooms
                  </option>

                  <option value="1">
                    1+ Bedrooms
                  </option>

                  <option value="2">
                    2+ Bedrooms
                  </option>

                  <option value="3">
                    3+ Bedrooms
                  </option>

                  <option value="4">
                    4+ Bedrooms
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718076]"
                />

              </div>
            </div>

            {/* SORTING */}
            <div>

              <label
                htmlFor="sort-filter"
                className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#718076]"
              >
                Sort by
              </label>

              <div className="relative">

                <select
                  id="sort-filter"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-[49px] w-full appearance-none rounded-lg border border-[#E4EAE4] bg-[#F9FBF9] px-4 pr-10 text-[13px] text-[#193B2C] outline-none transition-all focus:border-[#07563D] focus:bg-white focus:ring-2 focus:ring-[#07563D]/10"
                >
                  <option value="recommended">
                    Recommended
                  </option>

                  <option value="price-low">
                    Price: low to high
                  </option>

                  <option value="price-high">
                    Price: high to low
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718076]"
                />

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================
          PROPERTY GRID
      ====================================== */}

      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-14 sm:px-10 lg:px-16 lg:pt-16">

        {/* RESULTS HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

          <div>

            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#A8893F]">
              Discover your next stay
            </span>

            <h2 className="font-serif text-[29px] font-semibold text-[#193B2C] sm:text-[34px]">
              Explore our homes
            </h2>

          </div>

          {!loading && !error && (
            <p className="text-[13px] text-[#7A887E]">

              Showing{" "}

              <span className="font-bold text-[#07563D]">
                {filteredProperties.length}
              </span>{" "}

              of {properties.length} properties

            </p>
          )}

        </div>

        {/* ==================================
            LOADING STATE
        ================================== */}

        {loading && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {Array.from({ length: 6 }).map((_, index) => (
              <PropertySkeleton key={index} />
            ))}

          </div>
        )}

        {/* ==================================
            ERROR STATE
        ================================== */}

        {!loading && error && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-[#E5EBE5] bg-white px-6 text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F0E5] text-[#A8893F]">
              <RefreshCw size={26} />
            </div>

            <h3 className="font-serif text-[24px] font-semibold text-[#193B2C]">
              Couldn't load properties.
            </h3>

            <p className="mt-2 text-[14px] text-[#7A887E]">
              Please refresh and try again.
            </p>

            <button
              onClick={loadProperties}
              className="mt-6 rounded-lg bg-[#07563D] px-7 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#06442F]"
            >
              Try again
            </button>

          </div>
        )}

        {/* ==================================
            EMPTY STATE
        ================================== */}

        {!loading && !error && filteredProperties.length === 0 && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#D8E2D9] bg-white px-6 text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF4EE] text-[#07563D]">
              <Search size={26} />
            </div>

            <h3 className="font-serif text-[24px] font-semibold text-[#193B2C]">
              No homes match your filters.
            </h3>

            <p className="mt-2 max-w-[360px] text-[14px] leading-6 text-[#7A887E]">
              Try changing your search or adjusting your filters
              to discover more properties.
            </p>

            <button
              onClick={resetFilters}
              className="mt-6 rounded-lg border border-[#07563D] px-7 py-3 text-[13px] font-semibold text-[#07563D] transition-colors hover:bg-[#EDF4EE]"
            >
              Clear all filters
            </button>

          </div>
        )}

        {/* ==================================
            PROPERTIES
        ================================== */}

        {!loading && !error && filteredProperties.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}

          </div>
        )}

      </section>
    </main>
  );
}
