
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  Bath,
  MapPin,
} from "lucide-react";

import { getFeaturedProperties } from "@/lib/properties";

export default function FeaturedHomes() {
  const properties = getFeaturedProperties();

  return (
    <section className="bg-[#F8FAF8] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1440px]">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-[650px]">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C8A84C]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A8893F]">
                Carefully selected stays
              </span>
            </div>

            <h2 className="font-serif text-[34px] font-semibold leading-tight text-[#173C2B] sm:text-[42px]">
              Featured homes
            </h2>

            <p className="mt-4 max-w-[580px] text-[14px] leading-7 text-[#758178] sm:text-[15px]">
              Explore a selection of our featured residences,
              chosen for guests seeking comfort, space and
              memorable stays.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex h-[48px] shrink-0 items-center justify-center gap-2 rounded-lg border border-[#07563D] px-6 text-[13px] font-semibold text-[#07563D] transition-all hover:bg-[#07563D] hover:text-white"
          >
            Explore all homes
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Featured Property Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <article
                key={property.id}
                className="group overflow-hidden rounded-2xl border border-[#E7EAE5] bg-white shadow-[0_4px_20px_rgba(15,45,30,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C8A84C] hover:shadow-[0_15px_35px_rgba(15,45,30,0.10)]"
              >
                {/* Image */}
                <Link
                  href={`/property-page/${property.slug}`}
                  className="relative block aspect-[4/3] overflow-hidden bg-[#E9EFEA]"
                >
                  <Image
                    src={property.coverPhoto}
                    alt={property.name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-md bg-[#C8A84C] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#173C2B] shadow-sm">
                    Featured
                  </span>

                  <div className="absolute bottom-4 right-4 rounded-lg bg-[#07563D] px-4 py-2 text-white shadow-lg">
                    <span className="text-[16px] font-bold">
                      ${property.nightlyRate.toLocaleString("en-US")}
                    </span>
                    <span className="ml-1 text-[11px] text-white/80">
                      / night
                    </span>
                  </div>
                </Link>

                {/* Property Information */}
                <div className="p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-1.5">
                    <MapPin
                      size={14}
                      className="text-[#C8A84C]"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A8893F]">
                      {property.city}, {property.destination}
                    </span>
                  </div>

                  <h3 className="mb-2 font-serif text-[22px] font-semibold leading-tight text-[#193B2C]">
                    {property.name}
                  </h3>

                  <p className="mb-5 line-clamp-2 min-h-[48px] text-[13px] leading-6 text-[#758178]">
                    {property.description}
                  </p>

                  {/* Property Details */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-[#EDF0EC] py-4 text-[13px] text-[#58675D]">
                    <div className="flex items-center gap-1.5">
                      <BedDouble
                        size={17}
                        className="text-[#A58A43]"
                      />
                      <span>
                        {property.bedrooms ?? "TBC"} Beds
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Bath
                        size={17}
                        className="text-[#A58A43]"
                      />
                      <span>
                        {property.bathrooms ?? "TBC"} Baths
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                      href={`/property-page/${property.slug}`}
                      className="flex h-[45px] items-center justify-center gap-2 rounded-lg border border-[#07563D] text-[12px] font-semibold text-[#07563D] transition-colors hover:bg-[#F0F6F1] sm:text-[13px]"
                    >
                      View details
                      <ArrowUpRight size={15} />
                    </Link>

                    <Link
                      href="/inquires"
                      className="flex h-[45px] items-center justify-center gap-2 rounded-lg bg-[#07563D] text-[12px] font-semibold text-white transition-colors hover:bg-[#06442F] sm:text-[13px]"
                    >
                      Inquire
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E5EBE5] bg-white px-6 py-16 text-center">
            <h3 className="font-serif text-xl font-semibold text-[#193B2C]">
              Featured homes coming soon
            </h3>
            <p className="mt-2 text-sm text-[#758178]">
              We are preparing our featured properties.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
