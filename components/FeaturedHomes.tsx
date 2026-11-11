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
    name: "Miami Palm Residence",
    location: "MIAMI BEACH, FL",
    description:
      "A bright, modern 3-bedroom apartment minutes from the beach with fast Wi-Fi and a rooftop pool.",
    price: 180,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    name: "Houston Skyline Suite",
    location: "DOWNTOWN HOUSTON, TX",
    description:
      "Elegant high-rise suite with sweeping lagoon views, gym and pool access.",
    price: 150,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    name: "The Palm Luxury Villa",
    location: "BEVERLY HILLS, CA",
    description:
      "A stunning private villa with contemporary interiors, beautiful gardens and a relaxing outdoor pool.",
    price: 320,
    bedrooms: 4,
    bathrooms: 4,
    guests: 8,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    name: "Serenity Garden Apartment",
    location: "AUSTIN, TX",
    description:
      "A peaceful modern apartment with warm interiors, natural light and a fully equipped kitchen.",
    price: 125,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    name: "The Grand Oak Residence",
    location: "DALLAS, TX",
    description:
      "Spacious luxury accommodation designed for families, extended stays and business travelers.",
    price: 210,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    name: "Coastal Breeze Retreat",
    location: "MALIBU, CA",
    description:
      "An elegant coastal escape featuring beautiful interiors and relaxing views near the ocean.",
    price: 275,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 7,
    name: "Urban Nest Apartment",
    location: "BROOKLYN, NY",
    description:
      "A stylish city apartment with minimalist furnishings and easy access to major attractions.",
    price: 165,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 8,
    name: "The Royal Penthouse",
    location: "MANHATTAN, NY",
    description:
      "Premium penthouse living with designer furniture, spectacular views and spacious entertainment areas.",
    price: 390,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 9,
    name: "Azure Waterfront Home",
    location: "MIAMI, FL",
    description:
      "A beautiful waterfront home with a private terrace, premium finishes and peaceful surroundings.",
    price: 245,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 10,
    name: "Ivory Living Suite",
    location: "ORLANDO, FL",
    description:
      "A beautifully furnished suite with comfortable living spaces, modern appliances and family-friendly amenities.",
    price: 135,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 11,
    name: "Cedarwood Luxury Stay",
    location: "DENVER, CO",
    description:
      "A refined mountain-inspired residence combining natural textures, comfort and contemporary design.",
    price: 195,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 12,
    name: "The Haven Residence",
    location: "ATLANTA, GA",
    description:
      "A welcoming residence with elegant furnishings, spacious bedrooms and an inviting dining area.",
    price: 155,
    bedrooms: 3,
    bathrooms: 2,
    guests: 5,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 13,
    name: "Golden Coast Villa",
    location: "SAN DIEGO, CA",
    description:
      "A premium holiday home with an open-plan interior, sunlit spaces and an inviting outdoor lounge.",
    price: 295,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 14,
    name: "Parkview Executive Suite",
    location: "CHICAGO, IL",
    description:
      "An executive apartment offering sophisticated interiors, dedicated workspace and premium comfort.",
    price: 175,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 15,
    name: "The White Orchid Villa",
    location: "SCOTTSDALE, AZ",
    description:
      "A distinctive luxury villa with elegant architecture, peaceful surroundings and resort-inspired living.",
    price: 350,
    bedrooms: 4,
    bathrooms: 4,
    guests: 8,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
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
      <div className="relative h-[235px] w-full overflow-hidden sm:h-[255px]">

        <Image
          src={property.image}
          alt={property.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
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

      </div>

      {/* Property information */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* Location */}
        <div className="mb-4 flex items-center gap-2">
          <MapPin
            size={17}
            strokeWidth={2.5}
            className="shrink-0 text-[#C2A34E]"
          />

          <span className="text-[13px] font-semibold tracking-[0.11em] text-[#B99C4D]">
            {property.location}
          </span>
        </div>

        {/* Property name */}
        <h3 className="font-[family-name:var(--font-display)] text-[27px] font-medium leading-tight text-[#171815]">
          {property.name}
        </h3>

        {/* Description */}
        <p className="mt-4 line-clamp-2 min-h-[55px] text-[15px] leading-[1.65] text-[#737A75] sm:text-[16px]">
          {property.description}
        </p>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-[#E0E5E1]" />

        {/* Property features */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[#727873]">

          <div className="flex items-center gap-1.5">
            <BedDouble size={20} className="text-[#BEA24E]" />
            <span className="text-[15px]">
              {property.bedrooms} bd
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath size={20} className="text-[#BEA24E]" />
            <span className="text-[15px]">
              {property.bathrooms} ba
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users size={20} className="text-[#BEA24E]" />
            <span className="text-[15px]">
              {property.guests} guests
            </span>
          </div>

        </div>

        {/* Action buttons */}
        <div className="mt-auto flex gap-3 pt-7">

          <Link
            href={`/properties/${property.id}`}
            className="flex min-h-[53px] flex-1 items-center justify-center gap-1 rounded-full border border-[#D9E1DB] bg-white px-3 text-center text-[14px] font-medium text-[#252925] shadow-[0_3px_9px_rgba(0,0,0,0.09)] transition-all hover:border-[#07583F] hover:bg-[#F2F7F3] sm:text-[15px]"
          >
            View details
            <ArrowUpRight size={16} />
          </Link>

          <Link
            href={`/contact?property=${encodeURIComponent(property.name)}`}
            className="flex min-h-[53px] flex-1 items-center justify-center rounded-full bg-[#07583F] px-3 text-center text-[14px] font-medium text-white shadow-[0_4px_12px_rgba(7,88,63,0.18)] transition-all hover:bg-[#06452F] sm:text-[15px]"
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

      <div className="mx-auto max-w-[1120px]">

        {/* Section heading */}
        <div className="mb-12 sm:mb-14">
          <h2 className="font-[family-name:var(--font-display)] text-[38px] font-medium leading-tight tracking-[-0.025em] text-[#171815] sm:text-[46px]">
            Featured homes
          </h2>
        </div>

        {/* Property grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-8 lg:gap-9">

          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}

        </div>

        {/* Bottom note */}
        <div className="mt-14 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm text-[#737A75]">
            Discover thoughtfully managed homes for every kind of stay.
          </p>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 font-semibold text-[#07583F] transition-colors hover:text-[#B99C4D]"
          >
            Explore all properties
            <ArrowUpRight size={17} />
          </Link>
        </div>

      </div>
    </section>
  );
}

