
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

// ============================================
// PROPERTY TYPES
// ============================================

type Property = {
  id: string;
  slug: string;
  name: string;
  city: string;
  destination: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  nightlyRate: number;
  description: string;
  coverPhoto: string;
  gallery: string[];
  amenities: string[];
  featured: boolean;
  available: boolean;
};

// ============================================
// PROPERTY DATA
// Replace this sample data with your API data.
// ============================================

const PROPERTY_DATA: Property[] = [
  {
    id: "1",
    slug: "luxury-miami-beach-villa",
    name: "Luxury Miami Beach Villa",
    city: "Miami",
    destination: "Florida",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    nightlyRate: 350,
    description:
      "Experience exceptional comfort in this beautifully designed villa featuring spacious interiors, premium amenities and easy access to Miami Beach.",
    coverPhoto:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
    ],
    amenities: ["WiFi", "Swimming Pool", "Parking", "Air Conditioning"],
    featured: true,
    available: true,
  },
  {
    id: "2",
    slug: "modern-houston-city-apartment",
    name: "Modern Houston City Apartment",
    city: "Houston",
    destination: "Texas",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    nightlyRate: 180,
    description:
      "A contemporary city apartment with elegant furnishings, modern finishes and convenient access to Houston's restaurants, shopping and business districts.",
    coverPhoto:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
    ],
    amenities: ["WiFi", "Parking", "Coffee Maker", "Air Conditioning"],
    featured: false,
    available: true,
  },
  {
    id: "3",
    slug: "atlanta-executive-residence",
    name: "Atlanta Executive Residence",
    city: "Atlanta",
    destination: "Georgia",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    nightlyRate: 250,
    description:
      "Enjoy a relaxing stay in a sophisticated residence designed for business travellers, families and guests seeking a premium Atlanta experience.",
    coverPhoto:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
    ],
    amenities: ["WiFi", "Parking", "Air Conditioning", "Coffee Maker"],
    featured: true,
    available: true,
  },
  {
    id: "4",
    slug: "california-coastal-retreat",
    name: "California Coastal Retreat",
    city: "Los Angeles",
    destination: "California",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    nightlyRate: 420,
    description:
      "Discover coastal living in this inviting property with beautiful interiors, relaxing outdoor spaces and convenient access to local attractions.",
    coverPhoto:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=85",
    ],
    amenities: ["WiFi", "Swimming Pool", "Parking", "Air Conditioning"],
    featured: true,
    available: false,
  },
  {
    id: "5",
    slug: "nashville-comfort-suites",
    name: "Nashville Comfort Suites",
    city: "Nashville",
    destination: "Tennessee",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    nightlyRate: 145,
    description:
      "A comfortable and stylish shortlet retreat featuring thoughtfully selected furnishings and everything you need for a peaceful stay.",
    coverPhoto:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
    ],
    amenities: ["WiFi", "Coffee Maker", "Air Conditioning"],
    featured: false,
    available: true,
  },
  {
    id: "6",
    slug: "dallas-luxury-family-home",
    name: "Dallas Luxury Family Home",
    city: "Dallas",
    destination: "Texas",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    nightlyRate: 295,
    description:
      "A spacious family-friendly home with beautiful living spaces, comfortable bedrooms and premium conveniences for short and extended stays.",
    coverPhoto:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
    ],
    amenities: ["WiFi", "Parking", "Swimming Pool", "Air Conditioning"],
    featured: false,
    available: true,
  },
];

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

      {/* Property Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E9EFEA]">

        <Image
          src={property.coverPhoto}
          alt={property.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Featured Badge */}
        {property.featured && (
          <span className="absolute left-4 top-4 z-10 rounded-md bg-[#C8A84C] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#173C2B] shadow-sm">
            Featured
          </span>
        )}

        {/* Unavailable Badge */}
        {!property.available && (
          <span className="absolute left-4 top-4 z-10 rounded-md bg-[#303A34] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            Unavailable
          </span>
        )}

        {/* Price */}
        <div className="absolute bottom-4 right-4 z-10 rounded-lg bg-[#07563D] px-4 py-2 text-white shadow-lg">
          <span className="text-[16px] font-bold">
            ${property.nightlyRate.toLocaleString("en-US")}
          </span>
          <span className="ml-1 text-[11px] text-white/80">
            / night
          </span>
        </div>

        {/* Unavailable overlay */}
        {!property.available && (
          <div className="absolute inset-0 bg-black/15" />
        )}
      </div>

      {/* Property Information */}
      <div className="p-5 sm:p-6">

        {/* Location */}
        <div className="mb-3 flex items-center gap-1.5">
          <MapPin size={14} className="text-[#C8A84C]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#B18D37]">
            {property.city}, {property.destination}
          </span>
        </div>

        {/* Name */}
        <h2 className="mb-2 font-serif text-[22px] font-semibold leading-tight text-[#193B2C] sm:text-[24px]">
          {property.name}
        </h2>

        {/* Description */}
        <p className="mb-5 line-clamp-2 min-h-[48px] text-[14px] leading-6 text-[#758178]">
          {property.description}
        </p>

        {/* Property Details */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-[#EDF0EC] py-4 text-[13px] text-[#58675D]">

          <div className="flex items-center gap-1.5">
            <BedDouble size={17} className="text-[#A58A43]" />
            <span>{property.bedrooms} Beds</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath size={17} className="text-[#A58A43]" />
            <span>{property.bathrooms} Baths</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users size={17} className="text-[#A58A43]" />
            <span>{property.maxGuests} Guests</span>
          </div>

        </div>

        {/* Top Amenities */}
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

        {/* Action Buttons */}
        <div className="mt-3 grid grid-cols-2 gap-3">

          <Link
            href={`/propertypage/${property.slug}`}
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

  // Properties and loading states
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filter states
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("All destinations");
  const [bedrooms, setBedrooms] = useState("Any");
  const [sort, setSort] = useState("recommended");

  // ==========================================
  // LOAD PROPERTIES
  // ==========================================

  const loadProperties = async () => {
    setLoading(true);
    setError(false);

    try {
      // Simulated loading for this frontend demo.
      // Replace with your API request when backend is connected.
      await new Promise((resolve) => setTimeout(resolve, 700));

      setProperties(PROPERTY_DATA);
    } catch {
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
  // Example: /propertypage?destination=Miami
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

    // Search by name or city
    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter(
        (property) =>
          property.name.toLowerCase().includes(query) ||
          property.city.toLowerCase().includes(query)
      );
    }

    // Destination filter
    if (destination !== "All destinations") {
      result = result.filter(
        (property) =>
          property.destination.toLowerCase() ===
          destination.toLowerCase()
      );
    }

    // Bedrooms filter
    if (bedrooms !== "Any") {
      const minimum = Number(bedrooms);

      result = result.filter(
        (property) => property.bedrooms >= minimum
      );
    }

    // Sorting
    if (sort === "recommended") {
      result.sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.nightlyRate - b.nightlyRate);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.nightlyRate - a.nightlyRate);
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

      {/* ====================================
          HERO BANNER
      ==================================== */}

      <section className="relative overflow-hidden border-b border-[#E1EAE2] bg-[#EAF3EC]">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-24 -top-32 h-[350px] w-[350px] rounded-full border-[45px] border-[#07563D]/[0.035]" />

        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">

          <div className="max-w-[760px]">

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C8A84C]" />

              <span className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#9B7C32]">
                Our Properties
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[42px] font-medium leading-[1.12] tracking-[-1.5px] text-[#173C2B] sm:text-[54px] lg:text-[64px]">
              Homes for every occasion
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-[660px] text-[15px] leading-[1.9] text-[#65766B] sm:text-[17px]">
              Browse our managed shortlet homes. Rates are in USD;
              send an inquiry to check availability for your dates.
            </p>

          </div>

        </div>
      </section>

      {/* ====================================
          FILTER BAR
      ==================================== */}

      <section className="relative z-20 mx-auto -mt-2 max-w-[1440px] px-6 pt-8 sm:px-10 lg:px-16">

        <div className="rounded-2xl border border-[#E5EBE5] bg-white p-4 shadow-[0_10px_35px_rgba(15,45,30,0.06)] sm:p-6">

          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={17} className="text-[#07563D]" />
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Search */}
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

            {/* Destination */}
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

            {/* Bedrooms */}
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
                  <option value="Any">Any bedrooms</option>
                  <option value="1">1+ Bedrooms</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#718076]"
                />
              </div>
            </div>

            {/* Sorting */}
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
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
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

      {/* ====================================
          PROPERTY GRID
      ==================================== */}

      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-14 sm:px-10 lg:px-16 lg:pt-16">

        {/* Results Header */}
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

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <PropertySkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
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

        {/* Empty State */}
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

        {/* Properties */}
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
