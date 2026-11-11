import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function HeroPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#EAF4ED]">
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute -right-28 top-[-100px] h-[480px] w-[480px] rounded-full bg-[#D5E5DA] opacity-80" />

      <div className="pointer-events-none absolute -left-48 bottom-[-280px] h-[420px] w-[420px] rounded-full bg-[#E1EEE5] opacity-70" />

      {/* Booking announcement */}
      <div className="absolute right-[12%] top-6 z-20">
        <div className="relative flex items-center gap-3 rounded-full border-r-[6px] border-[#D2A832] bg-[#07563D] px-6 py-3 text-sm font-medium text-white shadow-lg sm:text-base">
          <Sparkles className="h-5 w-5 text-[#D7B74B]" />

          <span>
            Book direct &amp; save —
            <span className="ml-1 text-[#E3C34E]">
              Best rates guaranteed
            </span>
          </span>
        </div>
      </div>

      {/* Hero section */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] items-center px-6 pb-16 pt-36 sm:px-10 lg:px-12 xl:px-16">

        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">

          {/* Left content */}
          <div className="max-w-[590px]">

            {/* Brand label */}
            <p className="mb-7 text-[13px] font-semibold uppercase tracking-[0.32em] text-[#B99B43] sm:text-[15px]">
              CONSTABAMSHORTLET
            </p>

            {/* Main heading */}
            <h1 className="font-serif text-[clamp(3.7rem,7vw,6.2rem)] font-medium leading-[0.99] tracking-[-0.045em] text-[#10110F]">
              <span className="block">Signature</span>
              <span className="block">stays,</span>
              <span className="block">thoughtfully</span>
              <span className="block">managed</span>
            </h1>

            {/* Gold divider */}
            <div className="mb-7 mt-8 h-[3px] w-[148px] bg-[#C7A64C]" />

            {/* Description */}
            <p className="max-w-[500px] text-[18px] leading-[1.65] text-[#626A64] sm:text-[21px]">
              Premium shortlet homes for business
              trips, getaways and family visits.
            </p>

            {/* CTA buttons */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">

              <a
                href="/properties"
                className="inline-flex min-h-[62px] items-center justify-center rounded-full bg-[#07563D] px-11 text-base font-medium text-white shadow-[0_8px_20px_rgba(7,86,61,0.17)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#064831] hover:shadow-xl"
              >
                Browse properties
              </a>

              <a
                href="/contact"
                className="inline-flex min-h-[62px] items-center justify-center rounded-full border-2 border-[#CBB15E] bg-[#FFFDF7] px-12 text-base font-medium text-[#20221F] shadow-[0_5px_14px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8F1DA]"
              >
                Send inquiry
              </a>

            </div>
          </div>

          {/* Right image */}
          <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto lg:mt-12">

            {/* Image frame */}
            <div className="relative aspect-[1.28/1] overflow-hidden rounded-[42px] border-[5px] border-[#D5C27F] bg-[#DCE8DF] p-[2px] shadow-[0_18px_40px_rgba(39,67,49,0.13)]">

              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90"
                alt="Beautiful modern luxury villa and shortlet property"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-[35px] object-cover transition-transform duration-700 hover:scale-[1.04]"
              />

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}