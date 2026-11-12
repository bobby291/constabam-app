
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Clock3,
  CreditCard,
  Heart,
  House,
  KeyRound,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Headphones,
  Wallet,
} from "lucide-react";

// Replace this sample data with your published properties API/database.
const publishedProperties = [
  { id: 1, city: "Miami", published: true },
  { id: 2, city: "Miami", published: true },
  { id: 3, city: "Houston", published: true },
  { id: 4, city: "Atlanta", published: true },
  { id: 5, city: "Los Angeles", published: true },
  { id: 6, city: "Nashville", published: true },
];

const testimonials = [
  {
    quote:
      "The apartment was spotless, beautifully furnished and exactly as described. The entire experience felt effortless.",
    name: "Sarah Mitchell",
    city: "Miami, Florida",
  },
  {
    quote:
      "Excellent communication and a very comfortable stay. It genuinely felt like having a home away from home.",
    name: "Daniel Brooks",
    city: "Houston, Texas",
  },
  {
    quote:
      "From the inquiry to check-out, everything was handled professionally. I would absolutely book with them again.",
    name: "Olivia Carter",
    city: "Atlanta, Georgia",
  },
];

const values = [
  {
    icon: House,
    title: "Hand-picked homes",
    description: "Every property is selected with comfort and quality in mind.",
  },
  {
    icon: Sparkles,
    title: "Spotless and ready",
    description: "Professionally cleaned and prepared before every stay.",
  },
  {
    icon: ShieldCheck,
    title: "Safe and secure",
    description: "Guest comfort, privacy and peace of mind come first.",
  },
  {
    icon: Headphones,
    title: "Responsive support",
    description: "A dedicated team ready to assist throughout your stay.",
  },
  {
    icon: Wallet,
    title: "Transparent pricing",
    description: "Clear rates and straightforward booking communication.",
  },
  {
    icon: BadgeCheck,
    title: "Book direct and save",
    description: "A simple direct inquiry process without unnecessary hassle.",
  },
];

const steps = [
  {
    number: "01",
    title: "Inquire",
    description: "Find your preferred home and send us your stay details.",
  },
  {
    number: "02",
    title: "Confirm",
    description: "We verify availability and guide you through confirmation.",
  },
  {
    number: "03",
    title: "Enjoy",
    description: "Receive your check-in details and enjoy your stay.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B89436]">
      {children}
    </p>
  );
}

function SectionHeading({
  children,
  centered = false,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#123C2D] sm:text-4xl">
        {children}
      </h2>
      <div
        className={`mt-4 h-[3px] w-14 rounded-full bg-[#C8A84C] ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

export default function AboutPage() {
  const [homeCount, setHomeCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);

  useEffect(() => {
    // Demo calculation. Replace with your published-properties API.
    const published = publishedProperties.filter(
      (property) => property.published
    );

    const destinations = new Set(published.map((property) => property.city));

    setHomeCount(published.length);
    setDestinationCount(destinations.size);
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAF8] text-[#26352E]">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden border-b border-[#DDE9DF] bg-[#EAF3EC]">
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-[#C8A84C]/20" />
        <div className="pointer-events-none absolute -right-10 -top-14 h-56 w-56 rounded-full border border-[#C8A84C]/20" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 sm:py-24 lg:py-28">
          <SectionLabel>ABOUT US</SectionLabel>

          <h1 className="mx-auto max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[#123C2D] sm:text-5xl lg:text-6xl">
            Hospitality with a signature touch
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#617168] sm:text-lg">
            Premium shortlet homes, thoughtfully managed for comfort,
            security and seamless service.
          </p>

          <div className="mx-auto mt-8 h-[3px] w-16 rounded-full bg-[#C8A84C]" />
        </div>
      </section>

      {/* OUR STORY */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionLabel>WHO WE ARE</SectionLabel>
            <SectionHeading>Our story</SectionHeading>

            <div className="mt-8 space-y-5 text-[15px] leading-8 text-[#68766D]">
              <p>
                Constabam Shortlet was created to give business travelers,
                families and holidaymakers a true home away from home, with
                the comfort of a private residence and the thoughtful service
                of a hotel.
              </p>

              <p>
                We believe that where you stay should be just as memorable as
                where you go. That is why every home in our collection is
                hand-picked, fully furnished and thoughtfully prepared to
                create a welcoming experience.
              </p>

              <p>
                From the first inquiry to the moment you check out, our
                responsive team is committed to making every part of your
                stay comfortable, secure and seamless.
              </p>
            </div>

            <Link
              href="/properties"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#07563D] transition hover:text-[#B89436]"
            >
              Explore our homes
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C8A84C]/60 transition group-hover:bg-[#C8A84C] group-hover:text-white">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[28px] border-2 border-[#C8A84C] sm:-bottom-5 sm:-right-5" />

            <div className="relative h-[360px] overflow-hidden rounded-[24px] shadow-xl sm:h-[470px]">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=85&w=1400"
                alt="Elegant and comfortable shortlet living room"
                fill
                priority
                unoptimized
                className="object-cover transition duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09291D]/35 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-xl border border-white/20 bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
                <p className="font-serif text-xl font-semibold text-[#123C2D]">
                  A better way to stay.
                </p>
                <p className="mt-1 text-xs text-[#68766D]">
                  Comfort in every detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS BAND */}
      <section className="bg-[#07563D] py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 sm:px-8 lg:grid-cols-4 lg:gap-8">
          <div className="text-center">
            <p className="font-serif text-4xl font-semibold text-[#D9B94F] sm:text-5xl">
              {homeCount}+
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              Total homes
            </p>
          </div>

          <div className="text-center">
            <p className="font-serif text-4xl font-semibold text-[#D9B94F] sm:text-5xl">
              {destinationCount}+
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              Destinations
            </p>
          </div>

          <div className="text-center">
            <p className="font-serif text-4xl font-semibold text-[#D9B94F] sm:text-5xl">
              24/7
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              Guest support
            </p>
          </div>

          <div className="text-center">
            <p className="font-serif text-4xl font-semibold text-[#D9B94F] sm:text-5xl">
              5★
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              Guest experience
            </p>
          </div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="mb-12 text-center">
          <SectionLabel>OUR PURPOSE</SectionLabel>
          <SectionHeading centered>What drives us</SectionHeading>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E4EAE4] bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF3EC] text-[#B89436]">
              <Heart size={27} strokeWidth={1.7} />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#123C2D]">
              Our mission
            </h3>
            <p className="mt-4 max-w-lg text-[15px] leading-8 text-[#68766D]">
              To deliver comfortable, secure and beautifully managed stays
              that make every guest feel at home.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4EAE4] bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF3EC] text-[#B89436]">
              <Award size={27} strokeWidth={1.7} />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#123C2D]">
              Our vision
            </h3>
            <p className="mt-4 max-w-lg text-[15px] leading-8 text-[#68766D]">
              To be the most trusted name in premium shortlet hospitality,
              known for exceptional homes and memorable guest experiences.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT SETS US APART */}
      <section className="border-y border-[#E7EDE7] bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <SectionLabel>THE CONSTABAM DIFFERENCE</SectionLabel>
            <SectionHeading centered>What sets us apart</SectionHeading>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#68766D]">
              Thoughtful details and dependable service come together to
              create a stay worth remembering.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-[#E8EDE8] bg-[#F8FAF8] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#C8A84C]/60 hover:bg-white hover:shadow-lg"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#B89436] transition group-hover:bg-[#07563D] group-hover:text-[#D9B94F]">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#123C2D]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#68766D]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="mb-12 text-center">
          <SectionLabel>YOUR STAY, SIMPLIFIED</SectionLabel>
          <SectionHeading centered>How it works</SectionHeading>
        </div>

        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-[#DCC77F] md:block" />

          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#C8A84C] bg-[#07563D] font-serif text-lg font-bold text-[#D9B94F] shadow-[0_0_0_8px_#F8FAF8]">
                {step.number}
              </div>

              <h3 className="mt-7 font-serif text-2xl font-semibold text-[#123C2D]">
                {step.title}
              </h3>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#68766D]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/booking-process"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#07563D] transition hover:text-[#B89436]"
          >
            See the full booking process
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* GUEST TESTIMONIALS */}
      <section className="border-y border-[#E7EDE7] bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <SectionLabel>GUEST EXPERIENCES</SectionLabel>
            <SectionHeading centered>Words from our guests</SectionHeading>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#68766D]">
              The best measure of our hospitality is how our guests feel
              about their stay.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((review) => (
              <article
                key={review.name}
                className="flex flex-col rounded-2xl border border-[#E8EDE8] bg-[#F8FAF8] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#C8A84C]/60 hover:shadow-lg"
              >
                <div className="flex gap-1 text-[#C8A84C]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      fill="currentColor"
                      strokeWidth={1}
                    />
                  ))}
                </div>

                <p className="mt-6 flex-1 font-serif text-lg leading-8 text-[#284538]">
                  “{review.quote}”
                </p>

                <div className="mt-7 border-t border-[#E2E9E2] pt-5">
                  <p className="font-semibold text-[#123C2D]">
                    {review.name}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#839087]">
                    <MapPin size={13} className="text-[#B89436]" />
                    {review.city}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-[#87928A]">
            Replace these sample testimonials with verified guest reviews
            before publishing.
          </p>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="bg-[#07563D] px-5 py-20 text-center sm:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#D9B94F]">
            YOUR NEXT STAY STARTS HERE
          </p>

          <h2 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Experience a signature stay
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/75 sm:text-base">
            Discover thoughtfully managed homes and experience hospitality
            that makes every moment away feel like home.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D9B94F] px-7 py-3.5 text-sm font-bold text-[#D9B94F] transition hover:bg-white hover:text-[#07563D]"
            >
              Browse properties
              <ArrowUpRight size={17} />
            </Link>

            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D9B94F] px-7 py-3.5 text-sm font-bold text-[#123C2D] shadow-lg transition hover:bg-[#E8CB72] hover:shadow-xl"
            >
              Send an inquiry
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
