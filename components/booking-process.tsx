
"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Search,
  Send,
  CalendarCheck,
  FileSignature,
  Receipt,
  ShieldCheck,
  KeyRound,
  Moon,
  Sparkles,
  Building2,
  LockKeyhole,
  ArrowUpRight,
  Check,
} from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

// ============================================
// BOOKING PROCESS TYPES
// ============================================

type BookingStep = {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  type: "guest" | "team";
};

// ============================================
// BOOKING PROCESS DATA
// ============================================

const BOOKING_STEPS: BookingStep[] = [
  {
    number: "01",
    title: "Browse properties",
    description:
      "Explore our homes, photos, rates and estimated pricing.",
    icon: Search,
    type: "guest",
  },
  {
    number: "02",
    title: "Submit an inquiry",
    description:
      "Choose your home, dates and guest count and send us your details.",
    icon: Send,
    type: "guest",
  },
  {
    number: "03",
    title: "Availability review",
    description:
      "Our team checks availability for your dates and reviews your request.",
    icon: CalendarCheck,
    type: "team",
  },
  {
    number: "04",
    title: "Rental agreement",
    description:
      "If available, we send a rental agreement for you to review and sign.",
    icon: FileSignature,
    type: "team",
  },
  {
    number: "05",
    title: "Invoice & payment instructions",
    description:
      "You receive an invoice with payment instructions for your chosen method.",
    icon: Receipt,
    type: "team",
  },
  {
    number: "06",
    title: "Verification",
    description:
      "We verify your signed agreement and payment.",
    icon: ShieldCheck,
    type: "team",
  },
  {
    number: "07",
    title: "Confirmation & check-in",
    description:
      "You receive your booking confirmation and check-in details.",
    icon: KeyRound,
    type: "team",
  },
];

// ============================================
// ANIMATION VARIANTS
// ============================================

const timelineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// ============================================
// TIMELINE STEP
// ============================================

function TimelineStep({
  step,
}: {
  step: BookingStep;
}) {
  const Icon = step.icon;
  const isGuest = step.type === "guest";

  return (
    <motion.li
      variants={stepVariants}
      className="group relative flex flex-col items-center text-center"
    >
      {/* Step Number */}
      <span className="
        mb-3 font-serif text-[34px]
        font-semibold leading-none
        tracking-[-1px] text-[#193B2C]/15
        transition-colors duration-300
        group-hover:text-[#C8A84C]/70
        sm:text-[38px]
      ">
        {step.number}
      </span>

      {/* Icon Circle */}
      <div
        className={`
          relative z-[2]
          flex h-12 w-12 shrink-0
          items-center justify-center
          rounded-full
          transition-all duration-300
          group-hover:scale-110
          ${
            isGuest
              ? "border border-[#07563D] bg-[#07563D] text-white shadow-[0_5px_15px_rgba(7,86,61,0.15)]"
              : "border-2 border-[#C8A84C] bg-[#F1F5F0] text-[#A8893F]"
          }
        `}
      >
        <Icon
          size={20}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </div>

      {/* Step Content */}
      <div className="mt-5 max-w-[190px]">
        <h3 className="
          font-serif text-[17px]
          font-semibold leading-snug
          text-[#193B2C]
          transition-colors duration-300
          group-hover:text-[#A8893F]
          sm:text-[18px]
        ">
          {step.title}
        </h3>

        <p className="
          mt-2 text-[12px] leading-[1.8]
          text-[#758178] sm:text-[13px]
        ">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}

// ============================================
// PRICING ITEM
// ============================================

function PricingItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="
      flex items-start gap-3
      sm:flex-col sm:items-center
      sm:text-center
    ">
      <div className="
        flex h-11 w-11 shrink-0
        items-center justify-center
        rounded-xl bg-[#EDF3ED]
        text-[#A8893F]
      ">
        <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
      </div>

      <div>
        <h4 className="
          text-[13px] font-bold
          text-[#193B2C] sm:text-[14px]
        ">
          {title}
        </h4>

        <p className="
          mt-1 text-[12px] leading-[1.7]
          text-[#7A887E]
        ">
          {description}
        </p>
      </div>
    </div>
  );
}

// ============================================
// MAIN BOOKING PROCESS COMPONENT
// ============================================

export default function BookingProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.12,
  });

  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      ref={sectionRef}
      id="booking-process"
      className="
        overflow-hidden border-y border-[#E5ECE5]
        bg-[#EFF5EF]
        py-20 sm:py-24 lg:py-24
      "
    >
      <div className="
        mx-auto max-w-[1440px]
        px-6 sm:px-10 lg:px-16
      ">

        {/* ================================== */}
        {/* SECTION HEADER */}
        {/* ================================== */}

        <div className="mx-auto max-w-[790px] text-center">

          <div className="
            mb-5 flex items-center
            justify-center gap-3
          ">
            <span className="h-[2px] w-8 bg-[#C8A84C]" />

            <span className="
              text-[11px] font-bold uppercase
              tracking-[0.24em] text-[#A8893F]
            ">
              Booking Process
            </span>

            <span className="h-[2px] w-8 bg-[#C8A84C]" />
          </div>

          <h2 className="
            font-serif text-[36px] font-medium
            leading-[1.13] tracking-[-1px]
            text-[#173C2B]
            sm:text-[46px] lg:text-[54px]
          ">
            From inquiry to check-in
          </h2>

          <p className="
            mx-auto mt-5 max-w-[710px]
            text-[14px] leading-[1.9]
            text-[#718076] sm:text-[16px]
          ">
            A simple, guided process. An inquiry is not a
            confirmed reservation. Your booking is confirmed
            only after the agreement and payment have been verified.
          </p>

        </div>

        {/* ================================== */}
        {/* LEGEND */}
        {/* ================================== */}

        <div className="
          mt-10 flex items-center
          justify-center gap-7
        ">
          <div className="flex items-center gap-2">
            <span className="
              flex h-5 w-5 items-center
              justify-center rounded-full
              bg-[#07563D]
            ">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>

            <span className="text-[12px] font-semibold text-[#52665A]">
              You
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="
              flex h-5 w-5 items-center
              justify-center rounded-full
              border-2 border-[#C8A84C]
              bg-transparent
            ">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8A84C]" />
            </span>

            <span className="text-[12px] font-semibold text-[#52665A]">
              Our team
            </span>
          </div>
        </div>

        {/* ================================== */}
        {/* DESKTOP TIMELINE */}
        {/* ================================== */}

        <div className="mt-16 hidden lg:block">

          <motion.ol
            aria-label="Booking process: seven steps"
            variants={timelineVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion || isInView ? "visible" : "hidden"}
            className="
              relative grid grid-cols-7
              gap-4
            "
          >
            {/* Connecting Line */}
            <div
              className="
                pointer-events-none absolute
                left-[7.14%] right-[7.14%]
                top-[58px] z-0 h-[1px]
                bg-[#D6E1D7]
              "
              aria-hidden="true"
            >
              <motion.div
                className="
                  h-full origin-left
                  bg-[#C8A84C]
                "
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={
                  reduceMotion || isInView
                    ? { scaleX: 1 }
                    : { scaleX: 0 }
                }
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  delay: reduceMotion ? 0 : 0.15,
                }}
              />
            </div>

            {BOOKING_STEPS.map((step) => (
              <TimelineStep key={step.number} step={step} />
            ))}
          </motion.ol>

        </div>

        {/* ================================== */}
        {/* TABLET TIMELINE */}
        {/* ================================== */}

        <div className="mt-14 hidden md:block lg:hidden">

          {/* First Row: Steps 01–04 */}
          <div className="relative">
            <motion.ol
              aria-label="Booking process steps one through four"
              variants={timelineVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion || isInView ? "visible" : "hidden"}
              className="relative grid grid-cols-4 gap-5"
            >
              <div
                className="
                  pointer-events-none absolute
                  left-[12.5%] right-[12.5%]
                  top-[58px] h-px bg-[#D6E1D7]
                "
                aria-hidden="true"
              >
                <motion.div
                  className="h-full origin-left bg-[#C8A84C]"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={
                    reduceMotion || isInView
                      ? { scaleX: 1 }
                      : { scaleX: 0 }
                  }
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    delay: 0.15,
                  }}
                />
              </div>

              {BOOKING_STEPS.slice(0, 4).map((step) => (
                <TimelineStep key={step.number} step={step} />
              ))}
            </motion.ol>
          </div>

          {/* Second Row: Steps 05–07 */}
          <div className="relative mt-16">
            <motion.ol
              aria-label="Booking process steps five through seven"
              variants={timelineVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion || isInView ? "visible" : "hidden"}
              className="
                relative grid grid-cols-3 gap-8
                px-10
              "
            >
              <div
                className="
                  pointer-events-none absolute
                  left-[16.67%] right-[16.67%]
                  top-[58px] h-px bg-[#D6E1D7]
                "
                aria-hidden="true"
              >
                <motion.div
                  className="h-full origin-left bg-[#C8A84C]"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  animate={
                    reduceMotion || isInView
                      ? { scaleX: 1 }
                      : { scaleX: 0 }
                  }
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                />
              </div>

              {BOOKING_STEPS.slice(4).map((step) => (
                <TimelineStep key={step.number} step={step} />
              ))}
            </motion.ol>
          </div>

        </div>

        {/* ================================== */}
        {/* MOBILE VERTICAL TIMELINE */}
        {/* ================================== */}

        <div className="mt-12 md:hidden">

          <motion.ol
            aria-label="Booking process: seven steps"
            variants={timelineVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion || isInView ? "visible" : "hidden"}
            className="relative space-y-8 pl-1"
          >
            {/* Vertical Connecting Line */}
            <div
              className="
                pointer-events-none absolute
                bottom-8 left-[23px] top-8
                z-0 w-px bg-[#D6E1D7]
              "
              aria-hidden="true"
            >
              <motion.div
                className="
                  h-full w-full origin-top
                  bg-[#C8A84C]
                "
                initial={reduceMotion ? false : { scaleY: 0 }}
                animate={
                  reduceMotion || isInView
                    ? { scaleY: 1 }
                    : { scaleY: 0 }
                }
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  delay: 0.15,
                }}
              />
            </div>

            {BOOKING_STEPS.map((step) => {
              const Icon = step.icon;
              const isGuest = step.type === "guest";

              return (
                <motion.li
                  key={step.number}
                  variants={stepVariants}
                  className="group relative z-[1] flex gap-5"
                >
                  {/* Marker */}
                  <div className="
                    flex w-[46px] shrink-0
                    flex-col items-center
                  ">
                    <span className="
                      mb-2 font-serif text-[13px]
                      font-semibold text-[#193B2C]/35
                    ">
                      {step.number}
                    </span>

                    <div
                      className={`
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        rounded-full
                        transition-all duration-300
                        group-hover:scale-110
                        ${
                          isGuest
                            ? "border border-[#07563D] bg-[#07563D] text-white"
                            : "border-2 border-[#C8A84C] bg-[#EFF5EF] text-[#A8893F]"
                        }
                      `}
                    >
                      <Icon
                        size={19}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="pb-2 pt-6">
                    <h3 className="
                      font-serif text-[18px]
                      font-semibold leading-snug
                      text-[#193B2C]
                      transition-colors duration-300
                      group-hover:text-[#A8893F]
                    ">
                      {step.title}
                    </h3>

                    <p className="
                      mt-2 max-w-[420px]
                      text-[13px] leading-[1.8]
                      text-[#758178]
                    ">
                      {step.description}
                    </p>

                    <span className="
                      mt-3 inline-flex rounded-full
                      bg-white/80 px-2.5 py-1
                      text-[10px] font-semibold
                      text-[#718076]
                    ">
                      {isGuest ? "Your step" : "Our team's step"}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>

        </div>

        {/* ================================== */}
        {/* PRICING CARD */}
        {/* ================================== */}

        <div className="mx-auto mt-20 max-w-[720px]">

          <div className="
            overflow-hidden rounded-2xl
            border border-[#E0E8E0]
            bg-white
            shadow-[0_8px_30px_rgba(15,45,30,0.05)]
          ">

            {/* Pricing Header */}
            <div className="
              border-b border-[#EDF1ED]
              px-6 py-6 text-center
              sm:px-8
            ">
              <span className="
                text-[10px] font-bold uppercase
                tracking-[0.2em] text-[#A8893F]
              ">
                Transparent pricing
              </span>

              <h3 className="
                mt-2 font-serif text-[24px]
                font-semibold text-[#193B2C]
                sm:text-[28px]
              ">
                What&apos;s included in your total
              </h3>
            </div>

            {/* Pricing Items */}
            <div className="
              grid grid-cols-1 gap-6
              px-6 py-7
              sm:grid-cols-3 sm:gap-5
              sm:px-8 sm:py-8
            ">

              <PricingItem
                icon={Moon}
                title="Nightly rate"
                description="Set per home, shown on every listing"
              />

              <PricingItem
                icon={Sparkles}
                title="5% cleaning fee"
                description="Applied to the nightly charges"
              />

              <PricingItem
                icon={Building2}
                title="6% occupancy tax"
                description="Applied to the nightly charges"
              />

            </div>

            {/* Pricing Footnote */}
            <div className="
              border-t border-[#EDF1ED]
              bg-[#FAFCFA] px-6 py-5
              sm:px-8
            ">
              <p className="
                text-center text-[11px]
                leading-[1.8] text-[#7A887E]
              ">
                Certain Miami homes with a confirmed pool
                include a $30 pool access fee per booking.
                All prices are in USD, including Canadian homes.
              </p>
            </div>

          </div>

        </div>

        {/* ================================== */}
        {/* SECURITY / TRUST NOTE */}
        {/* ================================== */}

        <div className="
          mx-auto mt-7 flex max-w-[720px]
          items-start gap-3 rounded-xl
          border border-[#DCE7DC]
          bg-white/65 px-5 py-4
        ">

          <div className="
            mt-0.5 flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-full bg-[#EDF4EE]
            text-[#07563D]
          ">
            <LockKeyhole size={17} aria-hidden="true" />
          </div>

          <div>
            <h3 className="
              text-[12px] font-bold
              text-[#193B2C]
            ">
              Your payment security matters
            </h3>

            <p className="
              mt-1 text-[12px]
              leading-[1.8] text-[#718076]
            ">
              We will never ask for passwords, PINs or wallet
              seed phrases. Payment details are only shared
              on your official invoice.
            </p>
          </div>

        </div>

        {/* ================================== */}
        {/* CALLS TO ACTION */}
        {/* ================================== */}

        <div className="
          mt-12 flex flex-col
          items-center justify-center
          gap-4 sm:flex-row
        ">

          {/* Primary CTA */}
          <Link
            href="/inquire"
            className="
              inline-flex h-[50px]
              w-full items-center justify-center
              gap-2 rounded-lg
              bg-[#07563D] px-8
              text-[13px] font-semibold
              text-white
              shadow-[0_5px_15px_rgba(7,86,61,0.12)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#06442F]
              hover:shadow-[0_8px_20px_rgba(7,86,61,0.18)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#C8A84C]
              focus-visible:ring-offset-4
              sm:w-auto
            "
          >
            Start an inquiry
            <ArrowUpRight size={16} />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/booking-process"
            className="
              inline-flex h-[50px]
              w-full items-center justify-center
              gap-2 rounded-lg
              border border-[#07563D]
              bg-transparent px-8
              text-[13px] font-semibold
              text-[#07563D]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#C8A84C]
              focus-visible:ring-offset-4
              sm:w-auto
            "
          >
            See the full process
            <ArrowUpRight size={16} />
          </Link>

        </div>

      </div>
    </section>
  );
}
