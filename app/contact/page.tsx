
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Send,
  CheckCircle2,
  House,
  Headphones,
  ShieldCheck,
} from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@constabamshortlet.com",
    description: "Send us your questions and booking requests.",
    href: "mailto:hello@constabamshortlet.com",
    action: "Send an email",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "(832) 555-0148",
    description: "Speak with our reservations team.",
    href: "tel:+18325550148",
    action: "Call our team",
  },
  {
    icon: MapPin,
    label: "Our address",
    value: "1200 McKinney St, Houston, TX 77010",
    description: "Houston, Texas, United States.",
    href: "https://www.google.com/maps/search/?api=1&query=1200+McKinney+St%2C+Houston%2C+TX+77010",
    action: "View location",
  },
];

const reasons = [
  {
    icon: House,
    title: "Property inquiries",
    description: "Find the right home for your next visit.",
  },
  {
    icon: Headphones,
    title: "Guest assistance",
    description: "Get help before, during or after your stay.",
  },
  {
    icon: ShieldCheck,
    title: "Booking support",
    description: "Get clear information about reservations and payments.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Contact Form: ${formData.subject}`
    );

    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || "Not provided"}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}`
    );

    window.location.href = `mailto:hello@constabamshortlet.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAF8] text-[#26352E]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#DDE9DF] bg-[#EAF3EC]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#C8A84C]/20" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full border border-[#C8A84C]/20" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-[#C8A84C]/15" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 sm:py-24 lg:py-28">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#B89436]">
            GET IN TOUCH
          </p>

          <h1 className="mx-auto max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[#123C2D] sm:text-5xl lg:text-6xl">
            We&apos;re here to help
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#617168] sm:text-lg">
            Have a question about a property, an upcoming stay or a
            reservation? Our team is happy to hear from you.
          </p>

          <div className="mx-auto mt-8 h-[3px] w-16 rounded-full bg-[#C8A84C]" />
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B89436]">
            CONTACT INFORMATION
          </p>

          <h2 className="font-serif text-3xl font-semibold text-[#123C2D] sm:text-4xl">
            Let&apos;s start a conversation
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#68766D]">
            Choose the most convenient way to reach Constabam Shortlet.
            We&apos;ll be glad to assist.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {contactDetails.map((detail) => {
            const Icon = detail.icon;

            return (
              <div
                key={detail.label}
                className="group rounded-2xl border border-[#E4EAE4] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C8A84C]/60 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF3EC] text-[#B89436] transition group-hover:bg-[#07563D] group-hover:text-[#D9B94F]">
                  <Icon size={25} strokeWidth={1.7} />
                </div>

                <h3 className="mt-6 font-serif text-xl font-semibold text-[#123C2D]">
                  {detail.label}
                </h3>

                <p className="mt-3 break-words text-base font-semibold text-[#07563D]">
                  {detail.value}
                </p>

                <p className="mt-2 min-h-12 text-sm leading-7 text-[#87928A]">
                  {detail.description}
                </p>

                <a
                  href={detail.href}
                  target={detail.label === "Our address" ? "_blank" : undefined}
                  rel={
                    detail.label === "Our address"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#B89436] transition hover:text-[#07563D]"
                >
                  {detail.action}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="border-y border-[#E5EBE5] bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* LEFT INFORMATION */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B89436]">
              WE&apos;RE LISTENING
            </p>

            <h2 className="font-serif text-3xl font-semibold leading-tight text-[#123C2D] sm:text-4xl">
              How can we make your stay better?
            </h2>

            <p className="mt-6 text-sm leading-8 text-[#68766D]">
              Whether you&apos;re planning a vacation, arranging a business
              trip or looking for assistance with an existing reservation,
              Constabam Shortlet is here to make things easier.
            </p>

            <div className="mt-9 space-y-6">
              {reasons.map((reason) => {
                const Icon = reason.icon;

                return (
                  <div key={reason.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#B89436]">
                      <Icon size={22} strokeWidth={1.7} />
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#123C2D]">
                        {reason.title}
                      </h3>

                      <p className="mt-1 text-sm leading-7 text-[#87928A]">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RESPONSE INFORMATION */}
            <div className="mt-10 flex gap-4 rounded-2xl border border-[#E5EBE5] bg-[#F8FAF8] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3EC] text-[#B89436]">
                <Clock size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-[#123C2D]">
                  Need a quick response?
                </h3>

                <p className="mt-1 text-sm leading-7 text-[#68766D]">
                  Call us at{" "}
                  <a
                    href="tel:+18325550148"
                    className="font-semibold text-[#07563D] hover:text-[#B89436]"
                  >
                    (832) 555-0148
                  </a>{" "}
                  for assistance.
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="rounded-2xl border border-[#E4EAE4] bg-[#F8FAF8] p-6 shadow-sm sm:p-9">
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-semibold text-[#123C2D]">
                Send us a message
              </h3>

              <p className="mt-2 text-sm leading-7 text-[#87928A]">
                Complete the form below and tell us how we can help.
              </p>

              <div className="mt-4 h-[3px] w-12 rounded-full bg-[#C8A84C]" />
            </div>

            {submitted ? (
              <div className="rounded-xl border border-[#C8A84C]/40 bg-white px-6 py-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF3EC] text-[#07563D]">
                  <CheckCircle2 size={32} />
                </div>

                <h4 className="mt-5 font-serif text-2xl font-semibold text-[#123C2D]">
                  Your message is ready
                </h4>

                <p className="mt-3 text-sm leading-7 text-[#68766D]">
                  Your email application should open with your message
                  prepared. Send it to complete your inquiry.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-bold text-[#07563D] underline decoration-[#C8A84C] underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#344C3E]"
                    >
                      Full name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="h-12 w-full rounded-lg border border-[#E0E8E0] bg-white px-4 text-sm outline-none transition placeholder:text-[#A4AEA6] focus:border-[#C8A84C] focus:ring-4 focus:ring-[#C8A84C]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#344C3E]"
                    >
                      Email address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-lg border border-[#E0E8E0] bg-white px-4 text-sm outline-none transition placeholder:text-[#A4AEA6] focus:border-[#C8A84C] focus:ring-4 focus:ring-[#C8A84C]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[#344C3E]"
                  >
                    Phone number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="h-12 w-full rounded-lg border border-[#E0E8E0] bg-white px-4 text-sm outline-none transition placeholder:text-[#A4AEA6] focus:border-[#C8A84C] focus:ring-4 focus:ring-[#C8A84C]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-[#344C3E]"
                  >
                    What can we help you with? *
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="h-12 w-full rounded-lg border border-[#E0E8E0] bg-white px-4 text-sm text-[#344C3E] outline-none transition focus:border-[#C8A84C] focus:ring-4 focus:ring-[#C8A84C]/10"
                  >
                    <option>General inquiry</option>
                    <option>Property inquiry</option>
                    <option>Existing reservation</option>
                    <option>Payment question</option>
                    <option>Guest support</option>
                    <option>Partnership opportunity</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[#344C3E]"
                  >
                    Your message *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can assist you..."
                    className="w-full resize-y rounded-lg border border-[#E0E8E0] bg-white px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-[#A4AEA6] focus:border-[#C8A84C] focus:ring-4 focus:ring-[#C8A84C]/10"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#07563D] px-6 py-4 text-sm font-bold text-[#D9B94F] shadow-sm transition hover:bg-[#064630] hover:shadow-lg"
                >
                  Send message
                  <Send size={17} />
                </button>

                <p className="text-center text-xs leading-6 text-[#98A299]">
                  By submitting, your email application will open with the
                  message prepared for Constabam Shortlet.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B89436]">
              FIND US
            </p>

            <h2 className="font-serif text-3xl font-semibold text-[#123C2D] sm:text-4xl">
              Our location
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-8 text-[#68766D]">
              Connect with Constabam Shortlet at our Houston, Texas address.
              For property availability and reservations, please contact
              our team before visiting.
            </p>

            <div className="mt-7 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#B89436]">
                <MapPin size={23} />
              </div>

              <div>
                <h3 className="font-semibold text-[#123C2D]">
                  Constabam Shortlet
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#68766D]">
                  1200 McKinney St,
                  <br />
                  Houston, TX 77010
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=1200+McKinney+St%2C+Houston%2C+TX+77010"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[#C8A84C] px-6 py-3 text-sm font-bold text-[#07563D] transition hover:bg-[#07563D] hover:text-[#D9B94F]"
            >
              Get directions
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-[#DDE8DD] bg-[#EAF3EC] p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#C8A84C]/30" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-[#C8A84C]/20" />

            <div className="relative max-w-sm text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#07563D] text-[#D9B94F] shadow-lg">
                <MapPin size={30} />
              </div>

              <h3 className="mt-6 font-serif text-2xl font-semibold text-[#123C2D]">
                Houston, Texas
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#68766D]">
                1200 McKinney St,
                <br />
                Houston, TX 77010
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=1200+McKinney+St%2C+Houston%2C+TX+77010"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#07563D] transition hover:text-[#B89436]"
              >
                Open in Google Maps
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#07563D] px-5 py-16 text-center sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#D9B94F]">
            YOUR NEXT STAY STARTS HERE
          </p>

          <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            Let&apos;s make your next stay special
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/75">
            Discover our thoughtfully managed homes and experience
            hospitality with a signature touch.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D9B94F] px-7 py-3.5 text-sm font-bold text-[#D9B94F] transition hover:bg-white hover:text-[#07563D]"
            >
              Browse properties
              <ArrowUpRight size={17} />
            </Link>

            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D9B94F] px-7 py-3.5 text-sm font-bold text-[#123C2D] transition hover:bg-[#E8CB72]"
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
