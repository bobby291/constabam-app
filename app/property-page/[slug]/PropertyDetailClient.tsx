
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import type { Property } from "@/lib/properties";

type PropertyWithDescription = Property & {
  fullDescription?: string;
};

interface PropertyDetailClientProps {
  property: PropertyWithDescription;
}

// Every property's gallery is managed directly in lib/properties.ts.
function getPropertyGallery(property: Property): string[] {
  const photos = property.gallery?.filter(Boolean) ?? [];

  if (photos.length > 0) {
    return Array.from(new Set(photos));
  }

  return property.coverPhoto ? [property.coverPhoto] : [];
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;

  const [inYear, inMonth, inDay] = checkIn.split("-").map(Number);
  const [outYear, outMonth, outDay] = checkOut.split("-").map(Number);

  const start = Date.UTC(inYear, inMonth - 1, inDay);
  const end = Date.UTC(outYear, outMonth - 1, outDay);

  return Math.max(0, Math.round((end - start) / 86_400_000));
}

export default function PropertyDetailClient({
  property,
}: PropertyDetailClientProps) {
  const gallery = useMemo(
    () => getPropertyGallery(property),
    [property]
  );

  const [today, setToday] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const touchStartX = useRef<number | null>(null);

  const maxGuests = property.maxGuests;
  const nights = getNights(checkIn, checkOut);
  const subtotal = nights * property.nightlyRate;

  const location = `${property.city}, ${property.destination}`;

  const hasValidDates =
    Boolean(checkIn) &&
    Boolean(checkOut) &&
    nights > 0;

  useEffect(() => {
    const localDate = new Date();
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");

    setToday(`${year}-${month}-${day}`);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveImage(null);
  }, []);

  const showPreviousImage = useCallback(() => {
    setActiveImage((current) => {
      if (current === null || gallery.length === 0) return current;

      return (current - 1 + gallery.length) % gallery.length;
    });
  }, [gallery.length]);

  const showNextImage = useCallback(() => {
    setActiveImage((current) => {
      if (current === null || gallery.length === 0) return current;

      return (current + 1) % gallery.length;
    });
  }, [gallery.length]);

  useEffect(() => {
    if (activeImage === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeImage,
    closeLightbox,
    showNextImage,
    showPreviousImage,
  ]);

  function handleCheckInChange(value: string) {
    setCheckIn(value);

    if (checkOut && value >= checkOut) {
      setCheckOut("");
    }
  }

  function handleGuestChange(direction: "increase" | "decrease") {
    setGuests((current) => {
      if (direction === "decrease") {
        return Math.max(1, current - 1);
      }

      if (maxGuests !== undefined) {
        return Math.min(maxGuests, current + 1);
      }

      return current + 1;
    });
  }

  function openInquiry() {
    const params = new URLSearchParams({
      propertyId: property.id,
      propertySlug: property.slug,
      propertyName: property.name,
      guests: String(guests),
    });

    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);

    window.location.href = `/inquire?${params.toString()}`;
  }

  function handleTouchStart(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const difference = touchStartX.current - touchEndX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        showNextImage();
      } else {
        showPreviousImage();
      }
    }

    touchStartX.current = null;
  }

  const summary = property.description;
  const fullDescription = property.fullDescription;

  const highlights = [
    {
      label: "Bedrooms",
      value:
        property.bedrooms === null
          ? "To be confirmed"
          : String(property.bedrooms),
      icon: BedDouble,
    },
    {
      label: "Bathrooms",
      value:
        property.bathrooms === null
          ? "To be confirmed"
          : String(property.bathrooms),
      icon: Bath,
    },
    {
      label: "Guests",
      value: maxGuests ? String(maxGuests) : "To be confirmed",
      icon: Users,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAF8] pb-24 text-[#18372B] md:pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* Back link */}
        <Link
          href="/properties"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#07563D]"
        >
          <ArrowLeft size={16} />
          All properties
        </Link>

        {/* Property title and price */}
        <section className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="min-w-0">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.19em] text-[#A98736]">
              <MapPin size={15} />
              {location}
            </p>

            <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-[#173C2D] sm:text-4xl lg:text-5xl">
              {property.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="inline-flex items-center gap-2">
                <BedDouble size={16} />
                {property.bedrooms === null
                  ? "Bedrooms to be confirmed"
                  : `${property.bedrooms} bed`}
              </span>

              <span className="inline-flex items-center gap-2">
                <Bath size={16} />
                {property.bathrooms === null
                  ? "Bathrooms to be confirmed"
                  : `${property.bathrooms} bath`}
              </span>

              <span className="inline-flex items-center gap-2">
                <Users size={16} />
                {maxGuests
                  ? `Sleeps ${maxGuests}`
                  : "Guest capacity to be confirmed"}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 md:shrink-0 md:pb-1">
            <span className="text-3xl font-bold tracking-tight text-[#173C2D] sm:text-4xl">
              {formatCurrency(property.nightlyRate)}
            </span>
            <span className="text-sm text-gray-500">/ night</span>
          </div>
        </section>

        {/* Photo gallery */}
        <section className="mb-10">
          {gallery.length > 0 ? (
            <div
              className={`relative grid h-auto grid-cols-1 gap-2 overflow-hidden rounded-2xl md:h-[430px] ${
                gallery.length > 1 ? "md:grid-cols-2" : ""
              }`}
            >
              {/* Main image */}
              <button
                type="button"
                onClick={() => setActiveImage(0)}
                className={`group relative block min-h-[260px] overflow-hidden bg-gray-200 text-left md:min-h-0 ${
                  gallery.length > 1 ? "md:row-span-2" : ""
                }`}
                aria-label="Open first property photo"
              >
                <Image
                  src={gallery[0]}
                  alt={`${property.name} — photo 1`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
              </button>

              {/* Desktop supporting images */}
              {gallery.length > 1 && (
                <div className="hidden min-h-0 grid-cols-2 grid-rows-2 gap-2 md:grid">
                  {gallery.slice(1, 5).map((photo, index) => (
                    <button
                      type="button"
                      key={`${photo}-${index}`}
                      onClick={() => setActiveImage(index + 1)}
                      className="group relative min-h-0 overflow-hidden bg-gray-200"
                      aria-label={`Open property photo ${index + 2}`}
                    >
                      <Image
                        src={photo}
                        alt={`${property.name} — photo ${index + 2}`}
                        fill
                        sizes="25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Show all photos button */}
              <button
                type="button"
                onClick={() => setActiveImage(0)}
                className="absolute bottom-4 right-4 z-10 rounded-full border border-gray-300 bg-white/95 px-4 py-2.5 text-xs font-semibold text-[#173C2D] shadow-sm transition hover:bg-white sm:text-sm"
              >
                Show all {gallery.length}{" "}
                {gallery.length === 1 ? "photo" : "photos"}
              </button>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-500">
              Photos coming soon
            </div>
          )}
        </section>

        {/* Main content and inquiry card */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-12">

          {/* Left content */}
          <div className="min-w-0">

            {/* About */}
            <section className="border-b border-gray-200 pb-8">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-[#173C2D]">
                About this home
              </h2>

              <p className="text-[15px] leading-7 text-gray-600">
                {summary}
              </p>

              {fullDescription && (
                <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-gray-600">
                  {fullDescription}
                </p>
              )}
            </section>

            {/* Highlights */}
            <section className="border-b border-gray-200 py-8">
              <h2 className="mb-5 font-serif text-2xl font-semibold text-[#173C2D]">
                Highlights
              </h2>

              <div className="grid grid-cols-3 gap-3">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
                    >
                      <Icon
                        size={21}
                        className="mb-4 text-[#A98736]"
                      />

                      <p className="text-lg font-semibold text-[#173C2D] sm:text-xl">
                        {item.value}
                      </p>

                      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Amenities */}
            <section className="border-b border-gray-200 py-8">
              <h2 className="mb-5 font-serif text-2xl font-semibold text-[#173C2D]">
                Amenities
              </h2>

              {property.amenities.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <Check
                        size={17}
                        className="shrink-0 text-[#A98736]"
                      />
                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="inline-flex rounded-full border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-500">
                  Amenities being verified
                </div>
              )}
            </section>

            {/* Location */}
            <section className="border-b border-gray-200 py-8">
              <h2 className="mb-5 font-serif text-2xl font-semibold text-[#173C2D]">
                Location
              </h2>

              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="mt-0.5 shrink-0 text-[#A98736]"
                />

                <div>
                  <p className="font-semibold text-[#173C2D]">
                    {location}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Exact address is shared once your stay is confirmed.
                  </p>
                </div>
              </div>
            </section>

            {/* House rules */}
            <section className="pt-8">
              <div className="rounded-2xl border border-[#E9E3D4] bg-[#F1EEE5] p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-3">
                  <ShieldCheck
                    size={22}
                    className="text-[#987A35]"
                  />

                  <h2 className="font-semibold text-[#173C2D]">
                    Party policy
                  </h2>
                </div>

                <p className="text-sm leading-7 text-gray-600">
                  No parties or events. Quiet hours 10 PM – 8 AM.
                  Guests must be 25+ to book. Maximum occupancy is
                  strictly enforced.
                </p>
              </div>
            </section>
          </div>

          {/* Right inquiry card */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#173C2D]">
                  {formatCurrency(property.nightlyRate)}
                </span>

                <span className="text-sm text-gray-500">/ night</span>
              </div>

              {/* Date fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="desktop-check-in"
                    className="mb-2 block text-xs font-semibold text-gray-600"
                  >
                    Check-in
                  </label>

                  <input
                    id="desktop-check-in"
                    type="date"
                    min={today || undefined}
                    value={checkIn}
                    onChange={(event) =>
                      handleCheckInChange(event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-200 px-2 py-3 text-xs text-gray-700 outline-none focus:border-[#07563D]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="desktop-check-out"
                    className="mb-2 block text-xs font-semibold text-gray-600"
                  >
                    Check-out
                  </label>

                  <input
                    id="desktop-check-out"
                    type="date"
                    min={checkIn || today || undefined}
                    value={checkOut}
                    onChange={(event) =>
                      setCheckOut(event.target.value)
                    }
                    disabled={!checkIn}
                    className="w-full rounded-lg border border-gray-200 px-2 py-3 text-xs text-gray-700 outline-none focus:border-[#07563D] disabled:bg-gray-50"
                  />
                </div>
              </div>

              {/* Guest stepper */}
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-600">
                    Guests
                  </label>

                  {maxGuests && (
                    <span className="text-xs text-gray-400">
                      Maximum {maxGuests}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
                  <span className="text-sm text-gray-700">
                    {guests} {guests === 1 ? "guest" : "guests"}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleGuestChange("decrease")}
                      disabled={guests <= 1}
                      aria-label="Decrease guests"
                      className="rounded-full border border-gray-200 p-1.5 text-gray-600 transition hover:border-[#07563D] disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleGuestChange("increase")}
                      disabled={
                        maxGuests !== undefined &&
                        guests >= maxGuests
                      }
                      aria-label="Increase guests"
                      className="rounded-full border border-gray-200 p-1.5 text-gray-600 transition hover:border-[#07563D] disabled:opacity-30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {!maxGuests && (
                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    Guest capacity will be confirmed by our team.
                  </p>
                )}
              </div>

              {/* Estimate */}
              {hasValidDates && (
                <div className="mt-5 border-t border-gray-100 pt-5">
                  <div className="flex justify-between gap-3 text-sm text-gray-600">
                    <span>
                      {formatCurrency(property.nightlyRate)} × {nights}{" "}
                      {nights === 1 ? "night" : "nights"}
                    </span>

                    <span className="font-semibold text-[#173C2D]">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-gray-400">
                    Estimate only — final pricing, fees and taxes
                    confirmed by our team.
                  </p>
                </div>
              )}

              {/* Inquiry actions */}
              <button
                type="button"
                onClick={openInquiry}
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[#123C2D] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#07563D]"
              >
                Send Inquiry
              </button>

              <Link
                href="/contact"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-[#123C2D] px-5 py-3.5 text-sm font-semibold text-[#123C2D] transition hover:bg-[#F4F7F4]"
              >
                Contact us
              </Link>

              <p className="mt-5 text-center text-xs leading-5 text-gray-400">
                This is an inquiry, not a confirmed reservation. We&apos;ll
                review availability and follow up within 24 hours.
              </p>
            </div>
          </aside>

          {/* Mobile inquiry card */}
          <div className="lg:hidden">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="mb-5 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#173C2D]">
                  {formatCurrency(property.nightlyRate)}
                </span>

                <span className="text-sm text-gray-500">/ night</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="mobile-check-in"
                    className="mb-2 block text-xs font-semibold text-gray-600"
                  >
                    Check-in
                  </label>

                  <input
                    id="mobile-check-in"
                    type="date"
                    min={today || undefined}
                    value={checkIn}
                    onChange={(event) =>
                      handleCheckInChange(event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-200 px-2 py-3 text-xs text-gray-700 outline-none focus:border-[#07563D]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile-check-out"
                    className="mb-2 block text-xs font-semibold text-gray-600"
                  >
                    Check-out
                  </label>

                  <input
                    id="mobile-check-out"
                    type="date"
                    min={checkIn || today || undefined}
                    value={checkOut}
                    onChange={(event) =>
                      setCheckOut(event.target.value)
                    }
                    disabled={!checkIn}
                    className="w-full rounded-lg border border-gray-200 px-2 py-3 text-xs text-gray-700 outline-none focus:border-[#07563D] disabled:bg-gray-50"
                  />
                </div>
              </div>

              {/* Mobile guest stepper */}
              <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 px-3 py-3">
                <div>
                  <p className="text-xs font-semibold text-gray-600">
                    Guests
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {guests} {guests === 1 ? "guest" : "guests"}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleGuestChange("decrease")}
                    disabled={guests <= 1}
                    aria-label="Decrease guests"
                    className="rounded-full border border-gray-200 p-2 text-gray-600 disabled:opacity-30"
                  >
                    <Minus size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGuestChange("increase")}
                    disabled={
                      maxGuests !== undefined &&
                      guests >= maxGuests
                    }
                    aria-label="Increase guests"
                    className="rounded-full border border-gray-200 p-2 text-gray-600 disabled:opacity-30"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {!maxGuests && (
                <p className="mt-2 text-xs text-gray-400">
                  Guest capacity will be confirmed by our team.
                </p>
              )}

              {/* Mobile estimate */}
              {hasValidDates && (
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <div className="flex justify-between gap-3 text-sm text-gray-600">
                    <span>
                      {formatCurrency(property.nightlyRate)} × {nights}{" "}
                      {nights === 1 ? "night" : "nights"}
                    </span>

                    <span className="font-semibold text-[#173C2D]">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-gray-400">
                    Estimate only — final pricing, fees and taxes
                    confirmed by our team.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={openInquiry}
                className="mt-5 flex w-full items-center justify-center rounded-full bg-[#123C2D] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#07563D]"
              >
                Send Inquiry
              </button>

              <Link
                href="/contact"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-[#123C2D] px-5 py-3.5 text-sm font-semibold text-[#123C2D]"
              >
                Contact us
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                This is an inquiry, not a confirmed reservation. We&apos;ll
                review availability and follow up within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fixed inquiry bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-5px_20px_rgba(0,0,0,0.06)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

          <div className="shrink-0">
            <p className="text-lg font-bold text-[#173C2D]">
              {formatCurrency(property.nightlyRate)}
            </p>

            <p className="text-xs text-gray-500">per night</p>
          </div>

          <button
            type="button"
            onClick={openInquiry}
            className="flex flex-1 items-center justify-center rounded-full bg-[#123C2D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#07563D]"
          >
            Send Inquiry
          </button>
        </div>
      </div>

      {/* Full-screen photo lightbox */}
      {activeImage !== null && gallery.length > 0 && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Property photo gallery"
          onClick={closeLightbox}
        >

          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close gallery"
            className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {/* Counter */}
          <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2 text-sm font-medium text-white">
            {activeImage + 1} / {gallery.length}
          </div>

          {/* Previous */}
          {gallery.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
              aria-label="Previous photo"
              className="absolute left-2 z-20 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:left-6 sm:p-3"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Active photo */}
          <div
            className="relative h-[75vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              key={gallery[activeImage]}
              src={gallery[activeImage]}
              alt={`${property.name} — photo ${activeImage + 1}`}
              fill
              priority
              sizes="100vw"
              className="select-none object-contain"
            />
          </div>

          {/* Next */}
          {gallery.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
              aria-label="Next photo"
              className="absolute right-2 z-20 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:right-6 sm:p-3"
            >
              <ChevronRight size={28} />
            </button>
          )}

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-xs text-white/60">
            {property.name}
          </p>
        </div>
      )}
    </main>
  );
}
