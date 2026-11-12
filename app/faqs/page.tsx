
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  X,
  HelpCircle,
} from "lucide-react";

type FAQ = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

const categories = [
  "All",
  "Booking",
  "Payments",
  "Check-in & Stay",
  "Policies",
  "Amenities",
];

const faqs: FAQ[] = [
  // BOOKING
  {
    id: "booking-1",
    category: "Booking",
    question: "How do I book a home?",
    answer:
      'Choose a property and click "Inquire". Fill in your dates, number of guests and a few quick questions, then submit. Our team reviews availability and contacts you.',
  },
  {
    id: "booking-2",
    category: "Booking",
    question: "Is my booking confirmed once I submit the form?",
    answer:
      "No. An inquiry places your request on hold pending availability review. Your stay is confirmed only after our team contacts you and payment is received.",
  },
  {
    id: "booking-3",
    category: "Booking",
    question: "What is an inquiry reference?",
    answer:
      "Right after submitting, you'll receive an email with a unique reference (e.g. CSL-20261110-A3F9C2). Please quote it whenever you contact us.",
  },
  {
    id: "booking-4",
    category: "Booking",
    question: "How quickly will you respond?",
    answer: "Usually within 24 hours.",
  },
  {
    id: "booking-5",
    category: "Booking",
    question: "Can I change my dates after inquiring?",
    answer:
      "Yes. Reply to your acknowledgment email with your reference and the new dates.",
  },

  // PAYMENTS
  {
    id: "payments-1",
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "You choose your preferred method on the inquiry form. We then send an invoice with payment instructions.",
  },
  {
    id: "payments-2",
    category: "Payments",
    question: "Do I pay online when I submit the form?",
    answer: "No. No payment is taken on the website.",
  },
  {
    id: "payments-3",
    category: "Payments",
    question: "How is the price calculated?",
    answer:
      "Nightly rate × number of nights, plus optional extras such as pool access ($30). You'll see an estimated total before submitting.",
  },
  {
    id: "payments-4",
    category: "Payments",
    question: "Is a security deposit required?",
    answer:
      "Security deposit requirements may vary by property and booking. Please contact our reservations team to confirm the applicable deposit before completing your booking.",
  },

  // CHECK-IN & STAY
  {
    id: "stay-1",
    category: "Check-in & Stay",
    question: "What time are check-in and check-out?",
    answer:
      "Standard check-in is 3:00 PM and check-out is 11:00 AM. Please confirm the applicable times for your selected property with our reservations team.",
  },
  {
    id: "stay-2",
    category: "Check-in & Stay",
    question: "How do I get access to the home?",
    answer:
      "Check-in instructions and access details are sent before arrival.",
  },
  {
    id: "stay-3",
    category: "Check-in & Stay",
    question: "Is support available during my stay?",
    answer: "Yes, our team is available 24/7.",
  },

  // POLICIES
  {
    id: "policies-1",
    category: "Policies",
    question: "What is your cancellation policy?",
    answer:
      "Cancellation terms can vary depending on the property and booking. Please review the cancellation terms provided with your booking confirmation or contact our team before making payment.",
  },
  {
    id: "policies-2",
    category: "Policies",
    question: "Are pets allowed?",
    answer:
      "Let us know on the inquiry form; it depends on the property.",
  },
  {
    id: "policies-3",
    category: "Policies",
    question: "Are parties or events allowed?",
    answer:
      "Party and event permissions depend on the individual property. Please contact our team for approval before making arrangements. Unauthorized events may not be permitted.",
  },
  {
    id: "policies-4",
    category: "Policies",
    question: "Is there a minimum stay?",
    answer:
      "Minimum stay requirements vary by property and travel dates. Send us an inquiry with your preferred dates and our team will confirm the available options.",
  },

  // AMENITIES
  {
    id: "amenities-1",
    category: "Amenities",
    question: "What's included in every home?",
    answer:
      "Wi-Fi, air conditioning, a fully equipped kitchen and fresh linens. Each property page lists its full amenities.",
  },
  {
    id: "amenities-2",
    category: "Amenities",
    question: "Is the pool available?",
    answer:
      "Pool access can be added on the inquiry form for a $30 fee. Please confirm availability for your selected property.",
  },
];

const categoryDescriptions: Record<string, string> = {
  Booking: "Everything about finding a home and securing your reservation.",
  Payments: "Understand pricing, invoices and payment arrangements.",
  "Check-in & Stay": "Helpful information for a comfortable stay.",
  Policies: "Important guidelines for guests and reservations.",
  Amenities: "Learn more about the facilities available in our homes.",
};

export default function BookingProcessPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const filteredFAQs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const groupedFAQs = useMemo(() => {
    const groups: Record<string, FAQ[]> = {};

    categories.slice(1).forEach((category) => {
      const matchingFAQs = filteredFAQs.filter(
        (faq) => faq.category === category
      );

      if (matchingFAQs.length > 0) {
        groups[category] = matchingFAQs;
      }
    });

    return groups;
  }, [filteredFAQs]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setOpenFAQ(null);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setOpenFAQ(null);
  };

  const toggleFAQ = (id: string) => {
    setOpenFAQ((current) => (current === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-[#F8FAF8] text-[#26352E]">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden border-b border-[#DDE9DF] bg-[#EAF3EC]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#C8A84C]/20" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full border border-[#C8A84C]/20" />
        <div className="pointer-events-none absolute -bottom-36 -left-24 h-72 w-72 rounded-full border border-[#C8A84C]/15" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 sm:py-24 lg:py-28">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#B89436]">
            FAQs
          </p>

          <h1 className="mx-auto max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[#123C2D] sm:text-5xl lg:text-6xl">
            Questions? We&apos;ve got answers
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#617168] sm:text-lg">
            Everything you need to know about booking a Constabamshortlet
            home.
          </p>

          <div className="mx-auto mt-8 h-[3px] w-16 rounded-full bg-[#C8A84C]" />
        </div>
      </section>

      {/* FAQ SEARCH AND CONTENT */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
        {/* SEARCH BAR */}
        <div className="relative">
          <Search
            size={21}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B89436]"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search questions…"
            aria-label="Search frequently asked questions"
            className="h-16 w-full rounded-2xl border border-[#E1E9E1] bg-white pl-14 pr-14 text-sm text-[#123C2D] shadow-[0_5px_25px_rgba(18,60,45,0.04)] outline-none transition placeholder:text-[#9AA69D] focus:border-[#C8A84C] focus:ring-4 focus:ring-[#C8A84C]/10"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearch("")}
              aria-label="Clear search"
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#87928A] transition hover:bg-[#EAF3EC] hover:text-[#07563D]"
            >
              <X size={19} />
            </button>
          )}
        </div>

        {/* CATEGORY TABS */}
        <div className="mt-8">
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-5 py-2.5 text-xs font-semibold transition duration-200 sm:text-sm ${
                    isActive
                      ? "border-[#07563D] bg-[#07563D] text-[#D9B94F] shadow-sm"
                      : "border-[#E0E8E0] bg-white text-[#627168] hover:border-[#C8A84C] hover:text-[#07563D]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="mt-10 flex items-center justify-between border-b border-[#E3EAE3] pb-4">
          <p className="text-sm font-medium text-[#68766D]">
            {filteredFAQs.length}{" "}
            {filteredFAQs.length === 1 ? "answer" : "answers"} found
          </p>

          {(searchQuery || activeCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setOpenFAQ(null);
              }}
              className="text-xs font-semibold text-[#07563D] underline decoration-[#C8A84C] underline-offset-4 transition hover:text-[#B89436]"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* FAQ GROUPS */}
        <div className="mt-9 space-y-12">
          {Object.entries(groupedFAQs).map(([category, questions]) => (
            <section key={category}>
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-1 rounded-full bg-[#C8A84C]" />

                  <h2 className="font-serif text-2xl font-semibold text-[#123C2D]">
                    {category}
                  </h2>
                </div>

                <p className="ml-4 mt-2 text-sm text-[#89958C]">
                  {categoryDescriptions[category]}
                </p>
              </div>

              <div className="space-y-3">
                {questions.map((faq) => {
                  const isOpen = openFAQ === faq.id;

                  return (
                    <article
                      key={faq.id}
                      className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
                        isOpen
                          ? "border-[#C8A84C]/60 border-l-[4px] border-l-[#C8A84C] shadow-[0_8px_25px_rgba(18,60,45,0.06)]"
                          : "border-[#E6ECE6] hover:border-[#C8A84C]/50"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFAQ(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`answer-${faq.id}`}
                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
                      >
                        <span
                          className={`font-serif text-base font-semibold leading-7 transition sm:text-lg ${
                            isOpen ? "text-[#07563D]" : "text-[#263F33]"
                          }`}
                        >
                          {faq.question}
                        </span>

                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition duration-300 ${
                            isOpen
                              ? "rotate-180 bg-[#07563D] text-[#D9B94F]"
                              : "bg-[#EAF3EC] text-[#07563D]"
                          }`}
                        >
                          <ChevronDown size={19} />
                        </span>
                      </button>

                      <div
                        id={`answer-${faq.id}`}
                        hidden={!isOpen}
                        className="px-5 pb-6 sm:px-7"
                      >
                        <div className="border-t border-[#E9EEE9] pt-5">
                          <p className="max-w-3xl text-sm leading-8 text-[#68766D]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}

          {/* EMPTY SEARCH STATE */}
          {filteredFAQs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#D8E3D9] bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF3EC] text-[#B89436]">
                <HelpCircle size={30} strokeWidth={1.5} />
              </div>

              <h3 className="mt-6 font-serif text-2xl font-semibold text-[#123C2D]">
                No matching questions
              </h3>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#839087]">
                We couldn&apos;t find an answer matching your search. Try
                another keyword or browse all questions.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setOpenFAQ(null);
                }}
                className="mt-6 rounded-lg bg-[#07563D] px-6 py-3 text-sm font-semibold text-[#D9B94F] transition hover:bg-[#064630]"
              >
                View all questions
              </button>
            </div>
          )}
        </div>
      </section>

      {/* STILL HAVE QUESTIONS CTA */}
      <section className="relative overflow-hidden bg-[#07563D] px-5 py-16 text-center sm:px-8 sm:py-20">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-[#D9B94F]/20" />
        <div className="pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full border border-[#D9B94F]/15" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D9B94F]/50 bg-white/5 text-[#D9B94F]">
            <MessageCircle size={25} strokeWidth={1.7} />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#D9B94F]">
            WE&apos;RE HERE TO HELP
          </p>

          <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            Still have questions?
          </h2>

          <p className="mt-4 text-sm leading-8 text-white/75 sm:text-base">
            Our reservations team is happy to help.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D9B94F] px-7 py-3.5 text-sm font-bold text-[#D9B94F] transition hover:bg-white hover:text-[#07563D]"
            >
              Contact us
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
