
"use client";

import Link from "next/link";
import {
  Search,
  ClipboardList,
  Mail,
  CreditCard,
  KeyRound,
  ShieldCheck,
  Clock3,
  ReceiptText,
  Headphones,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Wallet,
  Info,
  Sparkles,
} from "lucide-react";

// ============================================
// BOOKING PROCESS STEPS
// ============================================

const bookingSteps = [
  {
    number: "01",
    title: "Browse homes",
    description:
      "Explore our properties and destinations and pick the home that suits your trip.",
    icon: Search,
  },
  {
    number: "02",
    title: "Send an inquiry",
    description:
      "Fill in the inquiry form with your dates, number of guests, a few quick questions about your stay, and your preferred payment method. You'll see an estimated total before submitting.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Get your reference",
    description:
      "You'll instantly receive an email with your unique inquiry reference. Your request is now on hold pending availability review.",
    icon: Mail,
  },
  {
    number: "04",
    title: "Confirmation and payment",
    description:
      "Our reservations team checks availability, then contacts you with your final total, invoice and payment instructions for your chosen method. Your booking is confirmed once payment is received.",
    icon: CreditCard,
  },
  {
    number: "05",
    title: "Check in and enjoy",
    description:
      "Before arrival you'll receive check-in instructions, the address and access details. Then enjoy your signature stay.",
    icon: KeyRound,
  },
];

// ============================================
// GOOD TO KNOW CARDS
// ============================================

const goodToKnow = [
  {
    title: "An inquiry isn't a confirmed booking",
    description:
      "Submitting an inquiry does not automatically reserve a home. Your request remains pending until our team reviews availability and confirms the booking.",
    icon: Info,
  },
  {
    title: "Transparent pricing",
    description:
      "You'll see an estimated total before submitting your inquiry. Our team will provide your final amount and invoice before payment.",
    icon: ReceiptText,
  },
  {
    title: "Choose your payment method",
    description:
      "Tell us your preferred payment method when submitting your inquiry. Available payment instructions will be provided after availability is confirmed.",
    icon: Wallet,
  },
  {
    title: "We're here to help",
    description:
      "Need assistance with your dates, property selection or booking? Our reservations team is available to guide you through the process.",
    icon: Headphones,
  },
];

// ============================================
// TIMELINE STEP COMPONENT
// ============================================

function TimelineStep({
  step,
}: {
  step: (typeof bookingSteps)[number];
}) {
  const Icon = step.icon;

  return (
    <div className="relative flex gap-6 md:flex-col md:items-center md:gap-0">

      {/* Mobile timeline line */}
      <div className="absolute left-[25px] top-[57px] h-[calc(100%+32px)] w-[1px] bg-[#C8A84C]/60 md:hidden" />

      {/* Numbered Icon Circle */}
      <div className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-[2px] border-[#C8A84C] bg-[#07563D] shadow-[0_0_0_7px_#F8FAF8] md:mb-7 md:h-[66px] md:w-[66px]">

        <span className="font-serif text-[20px] font-semibold text-[#D9B94F] md:text-[23px]">
          {step.number}
        </span>

      </div>

      {/* Step Content */}
      <div className="min-w-0 flex-1 pb-12 md:flex md:flex-col md:items-center md:pb-0 md:text-center">

        {/* Step Icon */}
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#07563D]">
          <Icon size={21} strokeWidth={1.8} />
        </div>

        {/* Title */}
        <h3 className="mb-3 font-serif text-[22px] font-semibold leading-tight text-[#193B2C] md:min-h-[56px] md:text-[21px]">
          {step.title}
        </h3>

        {/* Description */}
        <p className="max-w-[340px] text-[14px] leading-[1.85] text-[#758178]">
          {step.description}
        </p>

        {/* Reference Example */}
        {step.number === "03" && (
          <div className="mt-5 w-full max-w-[310px] rounded-lg border border-[#E8E1CB] bg-[#FBF9F2] p-3 text-left">

            <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.13em] text-[#A8893F]">
              Example inquiry reference
            </span>

            <code className="break-all text-[12px] font-semibold text-[#07563D]">
              CSL-20261110-A3F9C2
            </code>

          </div>
        )}

        {/* Pending Status */}
        {step.number === "03" && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#F7F1DF] px-3 py-2 text-[10px] font-semibold text-[#92752F]">

            <Clock3 size={13} />

            Pending availability review

          </div>
        )}

        {/* Payment Methods */}
        {step.number === "04" && (
          <div className="mt-5 flex flex-wrap justify-center gap-2">

            {["Bank transfer", "Card", "Other available methods"].map(
              (method) => (
                <span
                  key={method}
                  className="rounded-md border border-[#E5EBE5] bg-white px-2.5 py-1.5 text-[10px] font-medium text-[#617168]"
                >
                  {method}
                </span>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
}

// ============================================
// GOOD TO KNOW CARD COMPONENT
// ============================================

function InformationCard({
  item,
}: {
  item: (typeof goodToKnow)[number];
}) {
  const Icon = item.icon;

  return (
    <div className="group rounded-2xl border border-[#E7ECE7] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8A84C] hover:shadow-[0_12px_30px_rgba(15,45,30,0.07)] sm:p-7">

      {/* Icon */}
      <div className="mb-5 flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#F7F2E5] text-[#B18D37] transition-colors duration-300 group-hover:bg-[#C8A84C] group-hover:text-white">

        <Icon size={22} strokeWidth={1.8} />

      </div>

      {/* Heading */}
      <h3 className="mb-3 font-serif text-[20px] font-semibold leading-snug text-[#193B2C]">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-[14px] leading-[1.85] text-[#758178]">
        {item.description}
      </p>

    </div>
  );
}

// ============================================
// MAIN BOOKING PROCESS PAGE
// ============================================

export default function BookingProcessPage() {

  return (
    <main className="min-h-screen bg-[#F8FAF8]">

      {/* ====================================
          HERO BANNER
      ==================================== */}

      <section className="relative overflow-hidden border-b border-[#E1EAE2] bg-[#EAF3EC]">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-32 h-[360px] w-[360px] rounded-full border-[45px] border-[#07563D]/[0.035]" />

        <div className="pointer-events-none absolute -right-5 bottom-[-180px] h-[300px] w-[300px] rounded-full border-[35px] border-[#07563D]/[0.035]" />

        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">

          <div className="max-w-[800px]">

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">

              <span className="h-[2px] w-8 bg-[#C8A84C]" />

              <span className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#9B7C32]">
                Booking Process
              </span>

            </div>

            {/* Headline */}
            <h1 className="font-serif text-[44px] font-medium leading-[1.1] tracking-[-1.5px] text-[#173C2B] sm:text-[58px] lg:text-[68px]">
              Booking made simple
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-[650px] text-[15px] leading-[1.9] text-[#65766B] sm:text-[17px]">
              From inquiry to check-in in five easy steps — no surprises.
            </p>

          </div>

        </div>
      </section>

      {/* ====================================
          INTRODUCTION
      ==================================== */}

      <section className="mx-auto max-w-[1440px] px-6 pb-4 pt-16 sm:px-10 lg:px-16 lg:pt-20">

        <div className="mx-auto max-w-[750px] text-center">

          <div className="mb-4 flex items-center justify-center gap-2">

            <Sparkles size={17} className="text-[#C8A84C]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A8893F]">
              Your journey starts here
            </span>

          </div>

          <h2 className="font-serif text-[30px] font-semibold leading-tight text-[#193B2C] sm:text-[37px]">
            Five simple steps to your next stay.
          </h2>

          <p className="mt-4 text-[14px] leading-[1.9] text-[#758178] sm:text-[15px]">
            We've made finding and booking your accommodation
            straightforward. From choosing your ideal home to
            receiving your check-in instructions, our team
            keeps you informed at every stage.
          </p>

        </div>
      </section>

      {/* ====================================
          BOOKING TIMELINE
      ==================================== */}

      <section className="mx-auto max-w-[1440px] px-6 pb-20 pt-16 sm:px-10 lg:px-16 lg:pb-28 lg:pt-20">

        {/* Section heading */}
        <div className="mb-14 text-center">

          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A8893F]">
            How it works
          </span>

          <h2 className="mt-3 font-serif text-[30px] font-semibold text-[#193B2C] sm:text-[36px]">
            Your booking journey
          </h2>

        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Desktop horizontal gold connecting line */}
          <div className="absolute left-[10%] right-[10%] top-[32px] hidden h-[1px] bg-[#C8A84C]/70 md:block" />

          <div className="grid grid-cols-1 gap-0 md:grid-cols-5 md:gap-5">

            {bookingSteps.map((step) => (
              <TimelineStep
                key={step.number}
                step={step}
              />
            ))}

          </div>

        </div>

      </section>

      {/* ====================================
          GOOD TO KNOW
      ==================================== */}

      <section className="border-y border-[#E5EBE5] bg-[#EDF4EE]">

        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">

          {/* Section heading */}
          <div className="mb-10 max-w-[700px]">

            <div className="mb-4 flex items-center gap-2">

              <ShieldCheck size={18} className="text-[#C8A84C]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A8893F]">
                Important information
              </span>

            </div>

            <h2 className="font-serif text-[32px] font-semibold leading-tight text-[#193B2C] sm:text-[40px]">
              Good to know.
            </h2>

            <p className="mt-4 text-[14px] leading-[1.9] text-[#758178] sm:text-[15px]">
              A few important details to help you book with
              confidence and know exactly what to expect.
            </p>

          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {goodToKnow.map((item) => (
              <InformationCard
                key={item.title}
                item={item}
              />
            ))}

          </div>

        </div>
      </section>

      {/* ====================================
          BOOKING CONFIDENCE SECTION
      ==================================== */}

      <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Availability */}
          <div className="flex items-start gap-4 rounded-xl border border-[#E7ECE7] bg-white p-5">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EDF4EE] text-[#07563D]">
              <CalendarDays size={20} />
            </div>

            <div>
              <h3 className="font-serif text-[18px] font-semibold text-[#193B2C]">
                Availability checked
              </h3>

              <p className="mt-2 text-[13px] leading-6 text-[#758178]">
                Every inquiry is reviewed by our reservations team.
              </p>
            </div>

          </div>

          {/* Payment */}
          <div className="flex items-start gap-4 rounded-xl border border-[#E7ECE7] bg-white p-5">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7F2E5] text-[#B18D37]">
              <CreditCard size={20} />
            </div>

            <div>
              <h3 className="font-serif text-[18px] font-semibold text-[#193B2C]">
                Clear payment instructions
              </h3>

              <p className="mt-2 text-[13px] leading-6 text-[#758178]">
                Receive your invoice and payment details before completing your booking.
              </p>
            </div>

          </div>

          {/* Confirmation */}
          <div className="flex items-start gap-4 rounded-xl border border-[#E7ECE7] bg-white p-5">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EDF4EE] text-[#07563D]">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <h3 className="font-serif text-[18px] font-semibold text-[#193B2C]">
                Booking confirmation
              </h3>

              <p className="mt-2 text-[13px] leading-6 text-[#758178]">
                Your booking is confirmed once payment is received.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ====================================
          FINAL CALL TO ACTION
      ==================================== */}

      <section className="border-t border-[#E5EBE5] bg-[#EDF4EE]">

        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">

          <div className="relative overflow-hidden rounded-[22px] bg-[#07563D] px-7 py-12 sm:px-12 sm:py-14 lg:px-16">

            {/* Decorative circle */}
            <div className="pointer-events-none absolute -right-20 -top-28 h-[320px] w-[320px] rounded-full border-[45px] border-white/[0.04]" />

            <div className="relative flex flex-col justify-between gap-9 md:flex-row md:items-center">

              <div className="max-w-[650px]">

                <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#D9B94F]">
                  Your next stay awaits
                </span>

                <h2 className="font-serif text-[32px] font-semibold leading-tight text-white sm:text-[40px]">
                  Ready to find your home away from home?
                </h2>

                <p className="mt-4 max-w-[540px] text-[14px] leading-[1.9] text-[#D0DED4] sm:text-[15px]">
                  Explore our managed properties and send us
                  an inquiry. We'll guide you through the rest.
                </p>

              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">

                <Link
                  href="/properties"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-[#C8A84C] px-6 py-4 text-[13px] font-bold text-[#173C2B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E0C16A]"
                >
                  Explore properties
                  <ArrowUpRight size={17} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-4 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  Contact us
                  <ArrowRight size={16} />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
