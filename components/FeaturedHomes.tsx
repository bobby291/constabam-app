
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  BedDouble,
  Bath,
  Users,
  ArrowUpRight,
} from "lucide-react";

const properties = [
  {
    id: 1,
    pageUrl: "/property-page/pinecrest",
    name: "Pinecrest Family Estate ",
    location: "PINECREST, FLORIDA",
    description:
      "A professionally managed vacation rental in Pinecrest, Florida, offering 5 bedrooms and 6 bathrooms.",
    price: 475,
    bedrooms: 5,
    bathrooms: 6,
    guests: 6,
    featured: true,
    image: "/images/picture/IMG_3.jpg",
  },
  {
    id: 2,
    pageUrl: "/property-page/miami",
    name: "Miami Six-Bedroom Residence",
    location: "MIAMI, FLORIDA",
    description:
      "Elegant high-rise suite with sweeping lagoon views, gym and pool access.",
    price: 550,
    bedrooms: 6,
    bathrooms: 2,
    guests: 4,
    featured: true,
    image: "/images/picture/IMG_6.jpg",
  },
  {
    id: 3,
    pageUrl: "/property-page/san-francisco",
    name: "San Francisco Signature Home",
    location: "SAN FRANSICO, CALIFONIA",
    description:
      "A professionally managed vacation rental in San Francisco, California, offering 5 bedrooms and 5.5 bathrooms",
    price: 600,
    bedrooms: 5,
    bathrooms: 5.5,
    guests: 8,
    featured: true,
    image: "/images/picture/IMG_13.jpg",
  },
  {
    id: 4,
    pageUrl: "/property-page/nashville",
    name: "The Nashville Castle",
    location: "NASHVILLE, TEENESEE",
    description:
      "A professionally managed vacation rental in Nashville, Tennessee, offering room counts to be confirmed. Managed by ISABELLASIGNATUREHOMES — browse the gallery and send an inquiry to check availability for your dates.",
    price: 1000,
    bedrooms: 5,
    bathrooms: 6,
    guests: 4,
    featured: false,
    image: "/images/picture/IMG_16.jpg",
  },
  {
    id: 5,
    pageUrl: "/property-page/hershey",
    name: "Hershey Signature Home",
    location: "HERSHEY, PENNSYLVANIA",
    description:
      "Spacious luxury accommodation designed for families, extended stays and business travelers.",
    price: 400,
    bedrooms: 6,
    bathrooms: 6,
    guests: 6,
    featured: true,
    image: "/images/picture/IMG_22.jpg",
  },
  {
    id: 6,
    pageUrl: "/property-page/Miami-Beach-Mansion",
    name: "Miami Beach Mansion",
    location: "MIAMI BEACH, FLORIDA",
    description:
      "A professionally managed vacation rental in Miami Beach, Florida, offering 6 bedrooms and 11 bathrooms.",
    price: 1350,
    bedrooms: 6,
    bathrooms: 11,
    guests: 6,
    featured: false,
    image: "/images/picture/IMG_19.jpg",
  },
];

function PropertyCard({
  property,
}: {
  property: (typeof properties)[number];
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[27px] border border-[#E5E9E5] bg-white shadow-[0_3px_12px_rgba(22,52,35,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(22,52,35,0.13)]">

      {/* Property image */}
      <Link
        href={property.pageUrl}
        className="relative block h-[235px] w-full overflow-hidden sm:h-[255px]"
      >
        <Image
          src={property.image}
          alt={property.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Featured badge */}
        {property.featured && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#D5A51E] px-5 py-2 text-[13px] font-semibold text-[#30250B] shadow-md">
            Featured
          </span>
        )}

        {/* Price badge */}
        <div className="absolute bottom-4 right-4 z-10 rounded-full bg-[#07583F] px-4 py-2 text-white shadow-lg">
          <span className="text-lg font-semibold">
            ${property.price}
          </span>
          <span className="ml-1 text-sm text-white/80">
            / night
          </span>
        </div>
      </Link>

      {/* Property information */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* Location */}
        <div className="mb-4 flex items-center gap-2">
          <MapPin
            size={17}
            strokeWidth={2.5}
            className="shrink-0 text-[#C2A34E]"
          />

          <span className="text-[12px] font-semibold tracking-[0.11em] text-[#B99C4D] sm:text-[13px]">
            {property.location}
          </span>
        </div>

        {/* Property name */}
        <h3 className="font-[family-name:var(--font-display)] text-[24px] font-medium leading-tight text-[#171815] sm:text-[27px]">
          {property.name}
        </h3>

        {/* Description */}
        <p className="mt-4 line-clamp-2 min-h-[55px] text-[14px] leading-[1.65] text-[#737A75] sm:text-[15px]">
          {property.description}
        </p>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-[#E0E5E1]" />

        {/* Property features */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-[#727873]">

          <div className="flex items-center gap-1.5">
            <BedDouble size={19} className="text-[#BEA24E]" />
            <span className="text-[14px]">
              {property.bedrooms} bd
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath size={19} className="text-[#BEA24E]" />
            <span className="text-[14px]">
              {property.bathrooms} ba
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users size={19} className="text-[#BEA24E]" />
            <span className="text-[14px]">
              {property.guests} guests
            </span>
          </div>

        </div>

        {/* Action buttons */}
        <div className="mt-auto flex gap-3 pt-7">

          <Link
            href={property.pageUrl}
            className="flex min-h-[50px] flex-1 items-center justify-center gap-1 rounded-full border border-[#D9E1DB] bg-white px-3 text-center text-[13px] font-medium text-[#252925] shadow-[0_3px_9px_rgba(0,0,0,0.09)] transition-all hover:border-[#07583F] hover:bg-[#F2F7F3] sm:text-[14px]"
          >
            View details
            <ArrowUpRight size={15} />
          </Link>

          <Link
            href={`/inquires?propertyId=${property.id}`}
            className="flex min-h-[50px] flex-1 items-center justify-center rounded-full bg-[#07583F] px-3 text-center text-[13px] font-medium text-white shadow-[0_4px_12px_rgba(7,88,63,0.18)] transition-all hover:bg-[#06452F] sm:text-[14px]"
          >
            Inquire
          </Link>

        </div>
      </div>
    </article>
  );
}

export default function FeaturedHomes() {
  return (
    <section
      id="featured-homes"
      className="relative overflow-hidden bg-[#FCFDFC] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px]">

        {/* Section heading */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[11px] font-bold tracking-[0.22em] text-[#B99C4D]">
              DISCOVER YOUR NEXT STAY
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-[36px] font-medium leading-tight tracking-[-0.025em] text-[#171815] sm:text-[46px]">
              Featured homes
            </h2>

            <p className="mt-3 max-w-xl text-[14px] leading-7 text-[#737A75] sm:text-[15px]">
              Explore a selection of thoughtfully managed homes,
              designed to make every stay comfortable and memorable.
            </p>
          </div>

          <Link
            href="/properties"
            className="hidden items-center gap-2 text-sm font-semibold text-[#07583F] transition-colors hover:text-[#B99C4D] sm:inline-flex"
          >
            Explore all homes
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Six property listings */}
        <div className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>

        {/* More properties button */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:mt-16">

          <p className="text-sm text-[#737A75]">
            Looking for more options? Explore our complete collection of homes.
          </p>

          <Link
            href="/properties"
            className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#07583F] px-9 py-4 text-sm font-semibold text-white shadow-[0_5px_16px_rgba(7,88,63,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#06452F] hover:shadow-lg"
          >
            More Properties

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
