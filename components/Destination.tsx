
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ============================================
// DESTINATION TYPES
// ============================================

type Destination = {
  name: string;
  areas: string;
  homes: number;
  startingPrice: number;
  image: string;
  imageAlt: string;
  featured?: boolean;
  tall?: boolean;
};

// ============================================
// DESTINATION DATA
// ============================================

const DESTINATIONS: Destination[] = [
  {
    name: "Florida",
    areas: "Miami · Fort Lauderdale · Miami Beach · Pinecrest",
    homes: 13,
    startingPrice: 250,
    image: "/images/picture/IMG_5.jpg",
    imageAlt:
      "Miami beachfront with turquoise ocean water and beautiful coastal homes",
    featured: true,
  },
  {
    name: "Texas",
    areas: "Houston · Austin · Dallas",
    homes: 6,
    startingPrice: 300,
    image: "/images/picture/IMG_7.jpg",
    imageAlt:
      "Houston skyline with modern skyscrapers and city lights",
    tall: true,
  },
  {
    name: "California",
    areas: "Los Angeles · San Francisco",
    homes: 3,
    startingPrice: 405,
    image: "/images/picture/IMG_8.jpg",
    imageAlt:
      "Los Angeles hillside home overlooking the city",
    tall: true,
  },
  {
    name: "Pennsylvania",
    areas: "Pittsburgh · Hershey",
    homes: 2,
    startingPrice: 350,
    image: "/images/picture/IMG_9.jpg",
    imageAlt:
      "A picturesque Pennsylvania town with charming homes and green surroundings",
  },
  {
    name: "Canada",
    areas: "Ottawa · Calgary",
    homes: 2,
    startingPrice: 400,
    image: "/images/picture/IMG_10.jpg",
    imageAlt:
      "Canadian mountain landscape with beautiful homes and the Rocky Mountains",
  },
  {
    name: "Tennessee",
    areas: "Nashville",
    homes: 1,
    startingPrice: 1000,
    image: "/images/picture/IMG_11.jpg",
    imageAlt:
      "Nashville skyline at night with illuminated buildings",
  },
  {
    name: "Atlanta",
    areas: "Atlanta, Georgia",
    homes: 1,
    startingPrice: 400,
    image: "/images/picture/IMG_12.jpg",
    imageAlt:
      "Atlanta skyline with modern skyscrapers and urban surroundings",
  },
  {
    name: "Denver",
    areas: "Denver, Colorado",
    homes: 1,
    startingPrice: 385,
    image: "/images/picture/IMG_25.jpg",
    imageAlt:
      "Denver city skyline with the Rocky Mountains in the background",
  },
  {
    name: "North Carolina",
    areas: "Charlotte",
    homes: 1,
    startingPrice: 404,
    image: "/images/picture/IMG_26.jpg",
    imageAlt:
      "Charlotte skyline with modern buildings and an attractive city landscape",
  },
];

// ============================================
// ANIMATION VARIANTS
// ============================================

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ============================================
// DESTINATION CARD
// ============================================

function DestinationCard({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  const destinationHref = `/properties?destination=${encodeURIComponent(
    destination.name
  )}`;

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      className={[
        "group relative min-w-0",
        "w-[85%] shrink-0 snap-start",
        "md:w-auto",
        destination.featured
          ? "md:col-span-2 md:row-span-2"
          : "",
        destination.tall
          ? "md:row-span-2"
          : "",
      ].join(" ")}
    >
      <Link
        href={destinationHref}
        aria-label={`${destination.name} — ${destination.homes} ${
          destination.homes === 1 ? "home" : "homes"
        } from $${destination.startingPrice.toLocaleString(
          "en-US"
        )} per night`}
        className={[
          "relative block h-[390px] w-full overflow-hidden",
          "rounded-2xl bg-[#193B2C]",
          "shadow-[0_5px_20px_rgba(15,45,30,0.08)]",
          "transition-all duration-500 ease-out",
          "hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(15,45,30,0.18)]",
          "focus-visible:outline-none",
          "focus-visible:ring-4 focus-visible:ring-[#C8A84C]",
          "focus-visible:ring-offset-4",
          destination.featured
            ? "md:h-full md:min-h-[470px]"
            : destination.tall
              ? "md:h-full md:min-h-[470px]"
              : "md:h-[225px]",
        ].join(" ")}
      >
        {/* Destination Image */}
        <Image
          src={destination.image}
          alt={destination.imageAlt}
          fill
          unoptimized
          sizes={
            destination.featured
              ? "(max-width: 768px) 85vw, 50vw"
              : "(max-width: 768px) 85vw, 25vw"
          }
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Top Right Arrow */}
        <div className="absolute right-5 top-5 z-10 flex h-11 w-11 translate-y-1 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <ArrowUpRight size={21} strokeWidth={1.8} />
        </div>

        {/* Destination Information */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
          <h3
            className={[
              "font-serif font-semibold leading-tight text-white",
              destination.featured
                ? "text-[34px] sm:text-[42px] md:text-[48px]"
                : "text-[30px] sm:text-[34px]",
            ].join(" ")}
          >
            {destination.name}
          </h3>

          <p className="mt-2 max-w-[95%] text-[12px] leading-5 text-white/75 sm:text-[13px]">
            {destination.areas}
          </p>

          {/* Homes and Starting Price */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
              {destination.homes}{" "}
              {destination.homes === 1 ? "home" : "homes"}
            </span>

            <span className="text-[12px] font-medium text-white/90">
              From $
              {destination.startingPrice.toLocaleString("en-US")}
              /night
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================
// MAIN DESTINATIONS COMPONENT
// ============================================

export default function Destination() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ==========================================
  // MOBILE CAROUSEL POSITION
  // ==========================================

  const handleCarouselScroll = () => {
    const container = carouselRef.current;

    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(
        "[data-destination-card]"
      )
    );

    if (!cards.length) return;

    const containerPosition = container.scrollLeft;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.offsetLeft - container.offsetLeft - containerPosition
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  // ==========================================
  // CAROUSEL DOT NAVIGATION
  // ==========================================

  const scrollToCard = (index: number) => {
    const container = carouselRef.current;

    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(
      "[data-destination-card]"
    );

    const selectedCard = cards[index];

    if (!selectedCard) return;

    container.scrollTo({
      left:
        selectedCard.offsetLeft -
        container.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  // ==========================================
  // COMPONENT UI
  // ==========================================

  return (
    <section
      id="destinations"
      aria-labelledby="destinations-heading"
      className="overflow-hidden bg-[#F8FAF8] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">

        {/* ==================================
            SECTION HEADER
        ================================== */}

        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">

          <div className="max-w-[760px]">

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C8A84C]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A8893F]">
                Destinations
              </span>
            </div>

            {/* Heading */}
            <h2
              id="destinations-heading"
              className="font-serif text-[36px] font-semibold leading-[1.15] tracking-[-1px] text-[#173C2B] sm:text-[46px] lg:text-[54px]"
            >
              Where would you like to stay?
            </h2>

            {/* Supporting Text */}
            <p className="mt-5 max-w-[650px] text-[14px] leading-[1.9] text-[#758178] sm:text-[16px]">
              Professionally managed homes across the United States and
              Canada. Pick a destination to see every home there.
            </p>
          </div>

          {/* View All Destinations */}
          <Link
            href="/destinations"
            className="group inline-flex w-fit shrink-0 items-center gap-2 border-b border-[#C8A84C] pb-2 text-[13px] font-semibold text-[#07563D] transition-colors hover:text-[#A8893F] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A84C] focus-visible:ring-offset-4"
          >
            View all destinations

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* ==================================
            DESTINATION GRID / MOBILE CAROUSEL
        ================================== */}

        <motion.div
          ref={carouselRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          onScroll={handleCarouselScroll}
          className={[
            // Mobile horizontal carousel
            "flex gap-4 overflow-x-auto overflow-y-hidden",
            "snap-x snap-mandatory scroll-smooth",
            "pb-3",
            // Hide scrollbar
            "[scrollbar-width:none]",
            "[&::-webkit-scrollbar]:hidden",
            // Tablet and desktop grid
            "md:grid md:grid-cols-2 md:gap-5",
            "md:overflow-visible md:pb-0",
            "lg:grid-cols-4 lg:gap-5",
          ].join(" ")}
          style={{
            gridAutoRows: "225px",
          }}
        >
          {DESTINATIONS.map((destination, index) => (
            <div
              key={destination.name}
              data-destination-card
              className="contents"
            >
              <DestinationCard
                destination={destination}
                index={index}
              />
            </div>
          ))}
        </motion.div>

        {/* ==================================
            MOBILE DOT INDICATORS
        ================================== */}

        <div
          className="mt-5 flex items-center justify-center gap-2 md:hidden"
          aria-label="Destination carousel navigation"
        >
          {DESTINATIONS.map((destination, index) => (
            <button
              key={destination.name}
              type="button"
              onClick={() => scrollToCard(index)}
              aria-label={`Go to ${destination.name}`}
              aria-current={
                activeIndex === index ? "true" : undefined
              }
              className={[
                "h-2 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "w-7 bg-[#07563D]"
                  : "w-2 bg-[#C9D4CB] hover:bg-[#8FA394]",
              ].join(" ")}
            />
          ))}
        </div>

        {/* ==================================
            BOTTOM INQUIRY NOTE
        ================================== */}

        <div className="mt-16 flex flex-col items-center justify-center gap-5 border-t border-[#E5EBE5] pt-10 text-center sm:mt-20 sm:flex-row sm:gap-6">

          <p className="text-[13px] leading-6 text-[#758178] sm:text-[14px]">
            Don&apos;t see your city? We&apos;re adding new homes regularly.
          </p>

          <Link
            href="/inquires"
            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-[#07563D] px-6 text-[13px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#06442F] hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C8A84C] focus-visible:ring-offset-4"
          >
            Send an inquiry
            <ArrowUpRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
