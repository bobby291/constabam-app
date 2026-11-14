
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bath,
  BedDouble,
  CalendarDays,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const PROPERTY = {
  id: "41586a68-482a-44a6-8e79-e33c59964ead",
  name: "Pinecrest Family Estate",
  city: "Pinecrest",
  state: "Florida",
  price: 475,
  bedrooms: 5,
  bathrooms: 6,
  maxGuests: 6, // Confirm the actual maximum occupancy.
  description:
    "A professionally managed vacation rental in Pinecrest, Florida, offering 5 bedrooms and 6 bathrooms. Managed by CONSTABAMSHORTLET — browse the gallery and send an inquiry to check availability for your dates.",
};

const photos = [
  "/images/properties/pinecrest/IMG_1189.jpg",
  "/images/properties/pinecrest/IMG_1190.jpg",
  "/images/properties/pinecrest/IMG_1191.jpg",
  "/images/properties/pinecrest/IMG_1192.jpg",
  "/images/properties/pinecrest/IMG_1193.jpg",
  "/images/properties/pinecrest/IMG_1194.jpg",
  "/images/properties/pinecrest/IMG_1195.jpg",
  "/images/properties/pinecrest/IMG_1196.jpg",
  "/images/properties/pinecrest/IMG_1197.jpg",
  "/images/properties/pinecrest/IMG_1198.jpg",
  "/images/properties/pinecrest/IMG_1199.jpg",
  "/images/properties/pinecrest/IMG_1200.jpg",
  "/images/properties/pinecrest/IMG_1201.jpg",
  "/images/properties/pinecrest/IMG_1202.jpg",
  "/images/properties/pinecrest/IMG_1203.jpg",
  "/images/properties/pinecrest/IMG_1204.jpg",
  "/images/properties/pinecrest/IMG_1205.jpg",
  "/images/properties/pinecrest/IMG_1206.jpg",
  "/images/properties/pinecrest/IMG_1207.jpg",
  "/images/properties/pinecrest/IMG_1208.jpg",
  "/images/properties/pinecrest/IMG_1209.jpg",
  "/images/properties/pinecrest/IMG_1210.jpg",
  "/images/properties/pinecrest/IMG_1211.jpg",
  "/images/properties/pinecrest/IMG_1212.jpg",
  "/images/properties/pinecrest/IMG_1213.jpg",
  "/images/properties/pinecrest/IMG_1214.jpg",
  "/images/properties/pinecrest/IMG_1215.jpg",
  "/images/properties/pinecrest/IMG_1216.jpg",
  "/images/properties/pinecrest/IMG_1217.jpg",
  "/images/properties/pinecrest/IMG_1218.jpg",
  "/images/properties/pinecrest/IMG_1219.jpg",
  "/images/properties/pinecrest/IMG_1220.jpg",
  "/images/properties/pinecrest/IMG_1221.jpg",
  "/images/properties/pinecrest/IMG_1222.jpg",
  "/images/properties/pinecrest/IMG_1223.jpg",
  "/images/properties/pinecrest/IMG_1224.jpg",
  "/images/properties/pinecrest/IMG_1225.jpg",
  "/images/properties/pinecrest/IMG_1226.jpg",
  "/images/properties/pinecrest/IMG_1227.jpg",
  "/images/properties/pinecrest/IMG_1228.jpg",
  "/images/properties/pinecrest/IMG_1229.jpg",
  "/images/properties/pinecrest/IMG_1230.jpg",
  "/images/properties/pinecrest/IMG_1231.jpg",
  "/images/properties/pinecrest/IMG_1232.jpg",
  "/images/properties/pinecrest/IMG_1233.jpg",
  "/images/properties/pinecrest/IMG_1234.jpg",
  "/images/properties/pinecrest/IMG_1235.jpg",
  "/images/properties/pinecrest/IMG_1236.jpg",
  "/images/properties/pinecrest/IMG_1237.jpg",
  "/images/properties/pinecrest/IMG_1238.jpg",
  "/images/properties/pinecrest/IMG_1239.jpg",
  "/images/properties/pinecrest/IMG_1240.jpg",
  "/images/properties/pinecrest/IMG_1241.jpg",
  "/images/properties/pinecrest/IMG_1242.jpg",
];

function getLocalDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Adds one calendar day to a YYYY-MM-DD date without timezone drift.
function getNextDateString(dateString: string) {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-").map(Number);

  const nextDay = new Date(
    Date.UTC(year, month - 1, day + 1)
  );

  return [
    nextDay.getUTCFullYear(),
    String(nextDay.getUTCMonth() + 1).padStart(2, "0"),
    String(nextDay.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

// Calculates nights using UTC date values.
function getNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;

  const [startYear, startMonth, startDay] = checkIn
    .split("-")
    .map(Number);

  const [endYear, endMonth, endDay] = checkOut
    .split("-")
    .map(Number);

  const start = Date.UTC(
    startYear,
    startMonth - 1,
    startDay
  );

  const end = Date.UTC(
    endYear,
    endMonth - 1,
    endDay
  );

  return Math.max(
    0,
    Math.round((end - start) / 86400000)
  );
}

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export default function PinecrestHomeClinets() {
  const [today, setToday] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  // Read the current date only after the component mounts in the browser.
  useEffect(() => {
    setToday(getLocalDateString(new Date()));
  }, []);

  const nights = useMemo(
    () => getNights(checkIn, checkOut),
    [checkIn, checkOut]
  );

  const subtotal = nights * PROPERTY.price;

  const inquiryUrl = useMemo(() => {
    const params = new URLSearchParams({
      property: PROPERTY.id,
      guests: String(guests),
    });

    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);

    return `/inquire?${params.toString()}`;
  }, [checkIn, checkOut, guests]);

  // Image viewer keyboard and scroll controls.
  useEffect(() => {
    if (activeImage === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveImage(null);
      }

      if (event.key === "ArrowRight") {
        setActiveImage((current) =>
          current === null
            ? null
            : (current + 1) % photos.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveImage((current) =>
          current === null
            ? null
            : (current - 1 + photos.length) % photos.length
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  function showPrevious() {
    setActiveImage((current) =>
      current === null
        ? null
        : (current - 1 + photos.length) % photos.length
    );
  }

  function showNext() {
    setActiveImage((current) =>
      current === null
        ? null
        : (current + 1) % photos.length
    );
  }

  function handleCheckIn(value: string) {
    setCheckIn(value);

    if (checkOut && value >= checkOut) {
      setCheckOut("");
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAF8] pb-24 text-[#26382F] md:pb-0">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-24">

        {/* Back navigation */}
        <Link
          href="/properties"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#758078] transition-colors hover:text-[#07563D]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          All properties
        </Link>

        {/* Title and price */}
        <section className="animate-fade-up mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#C8A84C]">
              <MapPin size={15} />
              PINECREST, FLORIDA, USA
            </div>

            <h1 className="max-w-3xl font-serif text-3xl font-semibold leading-tight tracking-tight text-[#123C2D] sm:text-4xl lg:text-5xl">
              {PROPERTY.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#758078]">
              <span className="inline-flex items-center gap-2">
                <BedDouble size={17} />
                {PROPERTY.bedrooms} bed
              </span>

              <span className="text-[#C8A84C]">·</span>

              <span className="inline-flex items-center gap-2">
                <Bath size={16} />
                {PROPERTY.bathrooms} bath
              </span>

              <span className="text-[#C8A84C]">·</span>

              <span className="inline-flex items-center gap-2">
                <Users size={16} />
                Sleeps {PROPERTY.maxGuests}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 md:pb-1">
            <span className="text-3xl font-bold tracking-tight text-[#123C2D] sm:text-4xl">
              {formatCurrency(PROPERTY.price)}
            </span>
            <span className="text-sm text-[#7B877F]">/ night</span>
          </div>
        </section>

        {/* Photo gallery */}
        <section className="animate-fade-up mb-12">
          <div className="relative grid grid-cols-1 gap-2 overflow-hidden rounded-2xl md:h-[490px] md:grid-cols-2">

            {/* Main image */}
            <button
              type="button"
              onClick={() => setActiveImage(0)}
              aria-label="Open photo 1"
              className="group relative aspect-[4/3] overflow-hidden bg-[#EAF3EC] md:aspect-auto"
            >
              <Image
                src={photos[0]}
                alt="Pinecrest Family Estate main view"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>

            {/* Four supporting images */}
            <div className="hidden grid-cols-2 grid-rows-2 gap-2 md:grid">
              {photos.slice(1, 5).map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  onClick={() => setActiveImage(index + 1)}
                  aria-label={`Open photo ${index + 2}`}
                  className="group relative min-h-0 overflow-hidden bg-[#EAF3EC]"
                >
                  <Image
                    src={photo}
                    alt={`Pinecrest Family Estate photo ${index + 2}`}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>

            {/* Show all photos */}
            <button
              type="button"
              onClick={() => setActiveImage(0)}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-4 py-2.5 text-xs font-semibold text-[#123C2D] shadow-lg backdrop-blur transition hover:bg-white sm:text-sm"
            >
              <span className="grid grid-cols-2 gap-0.5">
                <span className="h-1.5 w-1.5 rounded-[2px] bg-[#07563D]" />
                <span className="h-1.5 w-1.5 rounded-[2px] bg-[#07563D]" />
                <span className="h-1.5 w-1.5 rounded-[2px] bg-[#07563D]" />
                <span className="h-1.5 w-1.5 rounded-[2px] bg-[#07563D]" />
              </span>
              Show all photos
            </button>
          </div>
        </section>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">

          {/* Left content */}
          <div className="min-w-0">

            {/* About */}
            <section className="animate-fade-up border-b border-[#E4EAE5] pb-9">
              <h2 className="font-serif text-2xl font-semibold text-[#123C2D]">
                About this home
              </h2>

              <p className="mt-4 text-[15px] leading-7 text-[#52635A]">
                {PROPERTY.description}
              </p>

              <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-[#68766D]">
                {PROPERTY.description}
              </p>
            </section>

            {/* Highlights */}
            <section className="animate-fade-up border-b border-[#E4EAE5] py-9">
              <h2 className="font-serif text-2xl font-semibold text-[#123C2D]">
                Highlights
              </h2>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  {
                    icon: BedDouble,
                    label: "Bedrooms",
                    value: PROPERTY.bedrooms,
                  },
                  {
                    icon: Bath,
                    label: "Bathrooms",
                    value: PROPERTY.bathrooms,
                  },
                  {
                    icon: Users,
                    label: "Guests",
                    value: PROPERTY.maxGuests,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-[#E6ECE7] bg-white p-4 sm:p-5"
                    >
                      <Icon size={22} className="text-[#07563D]" />

                      <p className="mt-4 text-xl font-bold text-[#123C2D]">
                        {item.value}
                      </p>

                      <p className="mt-1 text-xs text-[#7B877F] sm:text-sm">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Amenities */}
            <section className="animate-fade-up border-b border-[#E4EAE5] py-9">
              <h2 className="font-serif text-2xl font-semibold text-[#123C2D]">
                Amenities
              </h2>

              <div className="mt-5">
                <span className="inline-flex items-center rounded-full border border-dashed border-[#C8D5CA] bg-[#F2F6F2] px-4 py-2 text-sm text-[#758078]">
                  Amenities being verified
                </span>
              </div>
            </section>

            {/* Location */}
            <section className="animate-fade-up border-b border-[#E4EAE5] py-9">
              <h2 className="font-serif text-2xl font-semibold text-[#123C2D]">
                Location
              </h2>

              <div className="mt-5 flex items-start gap-3">
                <div className="rounded-xl bg-[#EAF3EC] p-3 text-[#07563D]">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="font-semibold text-[#123C2D]">
                    Pinecrest, Florida
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#758078]">
                    Exact address is shared once your stay is confirmed.
                  </p>
                </div>
              </div>
            </section>

            {/* Party policy */}
            <section className="animate-fade-up pt-9">
              <div className="rounded-2xl border border-[#E2EAE3] bg-[#EDF3EE] p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2.5 text-[#07563D]">
                    <ShieldCheck size={22} />
                  </div>

                  <h2 className="font-serif text-xl font-semibold text-[#123C2D]">
                    Party policy
                  </h2>
                </div>

                <p className="mt-4 text-sm leading-7 text-[#5E6E63]">
                  No parties or events. Quiet hours 10 PM – 8 AM. Guests must
                  be 25+ to book. Maximum occupancy is strictly enforced.
                </p>

                <p className="mt-3 text-xs text-[#8A958D]">
                  Please confirm this policy before publishing.
                </p>
              </div>
            </section>
          </div>

          {/* Sticky inquiry card */}
          <aside className="hidden lg:sticky lg:top-28 lg:block">
            <InquiryCard
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              nights={nights}
              subtotal={subtotal}
              today={today}
              inquiryUrl={inquiryUrl}
              onCheckIn={handleCheckIn}
              onCheckOut={setCheckOut}
              onGuests={setGuests}
            />
          </aside>

          {/* Mobile inquiry card */}
          <div className="lg:hidden">
            <InquiryCard
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              nights={nights}
              subtotal={subtotal}
              today={today}
              inquiryUrl={inquiryUrl}
              onCheckIn={handleCheckIn}
              onCheckOut={setCheckOut}
              onGuests={setGuests}
            />
          </div>
        </div>
      </div>

      {/* Mobile fixed booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6ECE7] bg-white/95 px-4 py-3 shadow-[0_-8px_25px_rgba(18,60,45,0.08)] backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xl font-bold text-[#123C2D]">
              {formatCurrency(PROPERTY.price)}
              <span className="ml-1 text-xs font-normal text-[#758078]">
                / night
              </span>
            </p>

            <p className="text-[11px] text-[#758078]">
              {nights > 0
                ? `${nights} night${nights > 1 ? "s" : ""} selected`
                : "Inquiry only"}
            </p>
          </div>

          <Link
            href={inquiryUrl}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#07563D] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#123C2D]"
          >
            Send Inquiry
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Full-screen image viewer */}
      {activeImage !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07130E]/95 p-4 backdrop-blur-sm"
          onTouchStart={(event) => {
            (
              event.currentTarget as HTMLDivElement
            ).dataset.touchStart = String(
              event.touches[0].clientX
            );
          }}
          onTouchEnd={(event) => {
            const start = Number(
              (
                event.currentTarget as HTMLDivElement
              ).dataset.touchStart
            );

            const difference =
              event.changedTouches[0].clientX - start;

            if (Math.abs(difference) > 50) {
              difference > 0 ? showPrevious() : showNext();
            }
          }}
        >
          <div className="absolute left-5 top-5 z-10 text-sm font-semibold text-white">
            {activeImage + 1} / {photos.length}
          </div>

          <button
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label="Close gallery"
            className="absolute right-5 top-5 z-10 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20 sm:left-7"
          >
            <ChevronLeft size={26} />
          </button>

          <div className="relative h-[72vh] w-full max-w-6xl">
            <Image
              src={photos[activeImage]}
              alt={`Pinecrest Family Estate photo ${activeImage + 1}`}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={showNext}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20 sm:right-7"
          >
            <ChevronRight size={26} />
          </button>

          <div className="mt-5 flex max-w-full gap-2 overflow-x-auto">
            {photos.map((photo, index) => (
              <button
                key={photo}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Go to photo ${index + 1}`}
                className={`relative h-12 w-14 shrink-0 overflow-hidden rounded-md border-2 transition sm:h-14 sm:w-20 ${
                  activeImage === index
                    ? "border-[#D9B94F] opacity-100"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fadeUp 0.65s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}

type InquiryCardProps = {
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  subtotal: number;
  today: string;
  inquiryUrl: string;
  onCheckIn: (value: string) => void;
  onCheckOut: (value: string) => void;
  onGuests: (value: number) => void;
};

function InquiryCard({
  checkIn,
  checkOut,
  guests,
  nights,
  subtotal,
  today,
  inquiryUrl,
  onCheckIn,
  onCheckOut,
  onGuests,
}: InquiryCardProps) {
  // Checkout must be at least one day after check-in.
  const minimumCheckOut = checkIn
    ? getNextDateString(checkIn)
    : today;

  return (
    <div className="rounded-2xl border border-[#E5EBE6] bg-white p-5 shadow-[0_12px_40px_rgba(18,60,45,0.07)] sm:p-6">
      <div className="flex items-baseline gap-2 border-b border-[#EDF0ED] pb-5">
        <span className="text-3xl font-bold text-[#123C2D]">
          {formatCurrency(PROPERTY.price)}
        </span>
        <span className="text-sm text-[#7B877F]">/ night</span>
      </div>

      {/* Date fields */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <label className="block min-w-0">
          <span className="mb-2 block text-xs font-semibold text-[#52635A]">
            Check-in
          </span>

          <div className="relative">
            <CalendarDays
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#87938A]"
            />

            <input
              type="date"
              value={checkIn}
              min={today || undefined}
              onChange={(event) =>
                onCheckIn(event.target.value)
              }
              className="w-full min-w-0 rounded-xl border border-[#DDE6DF] bg-[#FBFCFB] py-3 pl-9 pr-2 text-xs text-[#26382F] outline-none transition focus:border-[#07563D] focus:ring-2 focus:ring-[#07563D]/10"
            />
          </div>
        </label>

        <label className="block min-w-0">
          <span className="mb-2 block text-xs font-semibold text-[#52635A]">
            Check-out
          </span>

          <div className="relative">
            <CalendarDays
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#87938A]"
            />

            <input
              type="date"
              value={checkOut}
              min={minimumCheckOut || undefined}
              disabled={!checkIn}
              onChange={(event) =>
                onCheckOut(event.target.value)
              }
              className="w-full min-w-0 rounded-xl border border-[#DDE6DF] bg-[#FBFCFB] py-3 pl-9 pr-2 text-xs text-[#26382F] outline-none transition focus:border-[#07563D] focus:ring-2 focus:ring-[#07563D]/10 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </label>
      </div>

      {/* Guest stepper */}
      <div className="mt-5 flex items-center justify-between rounded-xl border border-[#DDE6DF] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#26382F]">
            Guests
          </p>

          <p className="mt-0.5 text-xs text-[#87938A]">
            Maximum {PROPERTY.maxGuests}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              onGuests(Math.max(1, guests - 1))
            }
            disabled={guests <= 1}
            aria-label="Decrease guests"
            className="rounded-full border border-[#DDE6DF] p-2 text-[#07563D] transition hover:bg-[#EAF3EC] disabled:opacity-30"
          >
            <Minus size={14} />
          </button>

          <span className="min-w-4 text-center text-sm font-bold text-[#123C2D]">
            {guests}
          </span>

          <button
            type="button"
            onClick={() =>
              onGuests(
                Math.min(PROPERTY.maxGuests, guests + 1)
              )
            }
            disabled={guests >= PROPERTY.maxGuests}
            aria-label="Increase guests"
            className="rounded-full border border-[#DDE6DF] p-2 text-[#07563D] transition hover:bg-[#EAF3EC] disabled:opacity-30"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Estimate */}
      {nights > 0 && (
        <div className="mt-5 rounded-xl bg-[#F3F7F3] p-4">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-[#68766D]">
              {formatCurrency(PROPERTY.price)} × {nights}{" "}
              {nights === 1 ? "night" : "nights"}
            </span>

            <span className="font-semibold text-[#123C2D]">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <div className="mt-3 border-t border-[#DDE6DF] pt-3 text-xs leading-5 text-[#87938A]">
            Estimate only — final pricing, fees and taxes confirmed by our
            team.
          </div>
        </div>
      )}

      {/* Actions */}
      <Link
        href={inquiryUrl}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#07563D] px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#123C2D] hover:shadow-md"
      >
        Send Inquiry
        <ArrowUpRight size={17} />
      </Link>

      <Link
        href="/contact"
        className="mt-3 flex w-full items-center justify-center rounded-full border border-[#C8D5CA] px-5 py-4 text-sm font-semibold text-[#07563D] transition hover:bg-[#EAF3EC]"
      >
        Contact us
      </Link>

      <p className="mt-5 text-center text-xs leading-6 text-[#87938A]">
        This is an inquiry, not a confirmed reservation. We&apos;ll review
        availability and follow up within 24 hours.
      </p>
    </div>
  );
}
