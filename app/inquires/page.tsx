
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Info,
  LoaderCircle,
  MapPin,
  ShieldCheck,
  Wallet,
} from "lucide-react";

type Property = {
  id: string;
  name: string;
  city: string;
  state: string;
  rate: number;
};

const properties: Property[] = [
  { id: "downtown-miami", name: "Downtown Miami Residence", city: "Miami", state: "FL", rate: 250 },
  { id: "las-olas-isle", name: "Las Olas Isle Retreat", city: "Fort Lauderdale", state: "FL", rate: 250 },
  { id: "pinecrest-estate", name: "Pinecrest Family Estate", city: "Pinecrest", state: "FL", rate: 475 },
  { id: "downtown-fort-lauderdale", name: "Downtown Fort Lauderdale Grand Home", city: "Fort Lauderdale", state: "FL", rate: 400 },
  { id: "la-signature", name: "Los Angeles Signature Home", city: "Los Angeles", state: "CA", rate: 450 },
  { id: "miami-six-bedroom", name: "Miami Six-Bedroom Residence", city: "Miami", state: "FL", rate: 550 },
  { id: "miami-seven-bedroom", name: "Miami Seven-Bedroom Residence", city: "Miami", state: "FL", rate: 455 },
  { id: "eado-houston", name: "EaDo Houston Townhome", city: "Houston", state: "TX", rate: 400 },
  { id: "denver-highlands", name: "Highlands / LoHi Denver Home", city: "Denver", state: "CO", rate: 385 },
  { id: "summerhill-atlanta", name: "Summerhill Atlanta Home", city: "Atlanta", state: "GA", rate: 400 },
  { id: "shadyside-pittsburgh", name: "Shadyside Pittsburgh Home", city: "Pittsburgh", state: "PA", rate: 350 },
  { id: "uptown-dallas", name: "Uptown Dallas Residence", city: "Dallas", state: "TX", rate: 300 },
  { id: "sf-signature", name: "San Francisco Signature Home", city: "San Francisco", state: "CA", rate: 600 },
  { id: "fort-lauderdale-four", name: "Fort Lauderdale Four-Bedroom Home", city: "Fort Lauderdale", state: "FL", rate: 485 },
  { id: "miami-eight-bath", name: "Miami Eight-Bath Residence", city: "Miami", state: "FL", rate: 505 },
  { id: "ottawa-signature", name: "Ottawa Signature Home", city: "Ottawa", state: "ON", rate: 400 },
  { id: "nashville-castle", name: "The Nashville Castle", city: "Nashville", state: "TN", rate: 1000 },
  { id: "austin-five", name: "Austin Five-Bedroom Home", city: "Austin", state: "TX", rate: 850 },
  { id: "houston-estate", name: "Houston Signature Estate", city: "Houston", state: "TX", rate: 1000 },
  { id: "miami-beach-mansion", name: "Miami Beach Mansion", city: "Miami Beach", state: "FL", rate: 1350 },
  { id: "calgary-signature", name: "Calgary Signature Home", city: "Calgary", state: "AB", rate: 450 },
  { id: "austin-three", name: "Austin Three-Bedroom Home", city: "Austin", state: "TX", rate: 400 },
  { id: "hershey-signature", name: "Hershey Signature Home", city: "Hershey", state: "PA", rate: 400 },
  { id: "fort-lauderdale-five", name: "Fort Lauderdale Five-Bedroom Home", city: "Fort Lauderdale", state: "FL", rate: 585 },
  { id: "houston-four", name: "Houston Four-Bedroom Home", city: "Houston", state: "TX", rate: 350 },
  { id: "la-five-bedroom", name: "Los Angeles Five-Bedroom Home", city: "Los Angeles", state: "CA", rate: 405 },
  { id: "miami-eight-bedroom", name: "Miami Eight-Bedroom Residence", city: "Miami", state: "FL", rate: 650 },
  { id: "miami-five-bedroom", name: "Miami Five-Bedroom Residence", city: "Miami", state: "FL", rate: 550 },
  { id: "fort-lauderdale-retreat", name: "Fort Lauderdale Five-Bedroom Retreat", city: "Fort Lauderdale", state: "FL", rate: 507 },
  { id: "charlotte-signature", name: "Charlotte Signature Home", city: "Charlotte", state: "NC", rate: 404 },
];

const paymentMethods = [
  "Chime",
  "Cash App",
  "Apple Pay",
  "USDT",
  "PayPal",
  "ETH",
  "OnePay",
  "E-Transfer",
  "Skrill",
  "Bank Wire Transfer",
];

const questions = [
  { name: "localResident", label: "Are you a local resident?" },
  { name: "specialNeeds", label: "Any special needs?" },
  { name: "bringingPets", label: "Bringing pets?" },
  {
    name: "readyToProceed",
    label: "Ready to proceed if availability is confirmed?",
  },
] as const;

type QuestionKey = (typeof questions)[number]["name"];

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  purpose: string;
  localResident: string;
  specialNeeds: string;
  bringingPets: string;
  readyToProceed: string;
  poolAccess: boolean;
  paymentMethod: string;
  message: string;
  agreement: boolean;
  website: string;
};

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  propertyId: "",
  checkIn: "",
  checkOut: "",
  guests: "1",
  purpose: "",
  localResident: "",
  specialNeeds: "",
  bringingPets: "",
  readyToProceed: "",
  poolAccess: false,
  paymentMethod: "",
  message: "",
  agreement: false,
  website: "",
};

const inputClass =
  "w-full rounded-xl border border-[#DFE8DF] bg-white px-4 py-3.5 text-sm text-[#263F33] outline-none transition placeholder:text-[#A0AAA2] focus:border-[#C8A84C] focus:ring-4 focus:ring-[#C8A84C]/10";

const labelClass = "mb-2 block text-sm font-semibold text-[#344C3E]";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function getLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const difference = end.getTime() - start.getTime();

  return difference > 0
    ? Math.round(difference / (1000 * 60 * 60 * 24))
    : 0;
}

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#07563D] text-sm font-bold text-[#D9B94F]">
        {number}
      </div>
      <div>
        <h2 className="font-serif text-xl font-semibold text-[#123C2D] sm:text-2xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm leading-6 text-[#849087]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
      {message}
    </p>
  );
}

export default function InquiresPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [today, setToday] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setToday(getLocalDate());

    // Accept a property ID or property name from the property page URL.
    const params = new URLSearchParams(window.location.search);
    const propertyParam =
      params.get("propertyId") || params.get("property");

    if (propertyParam) {
      const selected = properties.find(
        (property) =>
          property.id.toLowerCase() === propertyParam.toLowerCase() ||
          property.name.toLowerCase() === propertyParam.toLowerCase()
      );

      if (selected) {
        setValues((current) => ({
          ...current,
          propertyId: selected.id,
        }));
      }
    }
  }, []);

  const selectedProperty = properties.find(
    (property) => property.id === values.propertyId
  );

  const nights = getNights(values.checkIn, values.checkOut);
  const poolFee = values.poolAccess ? 30 : 0;
  const subtotal =
    selectedProperty && nights > 0
      ? selectedProperty.rate * nights
      : 0;

  const estimatedTotal = subtotal + poolFee;
  const hasEstimate = Boolean(
    selectedProperty && values.checkIn && values.checkOut && nights > 0
  );

  const bankWireDisabled = !hasEstimate || estimatedTotal < 1000;

  const setField = (name: keyof FormValues, value: string | boolean) => {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setSubmitError("");
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    }

    if (!values.propertyId) {
      nextErrors.propertyId = "Please select a property.";
    }

    if (!values.checkIn) {
      nextErrors.checkIn = "Please select your check-in date.";
    } else if (today && values.checkIn < today) {
      nextErrors.checkIn = "Check-in cannot be in the past.";
    }

    if (!values.checkOut) {
      nextErrors.checkOut = "Please select your check-out date.";
    } else if (values.checkIn && values.checkOut <= values.checkIn) {
      nextErrors.checkOut = "Check-out must be after check-in.";
    }

    const guestCount = Number(values.guests);

    if (
      !values.guests ||
      !Number.isInteger(guestCount) ||
      guestCount < 1
    ) {
      nextErrors.guests = "Enter a whole number of at least 1.";
    }

    if (!values.purpose.trim()) {
      nextErrors.purpose = "Please tell us the purpose of your stay.";
    }

    questions.forEach((question) => {
      if (!values[question.name]) {
        nextErrors[question.name] = "Please select Yes or No.";
      }
    });

    if (!values.paymentMethod) {
      nextErrors.paymentMethod = "Please choose a payment method.";
    } else if (
      values.paymentMethod === "Bank Wire Transfer" &&
      bankWireDisabled
    ) {
      nextErrors.paymentMethod =
        "Bank wire transfer is available only for estimated totals of $1,000 or more.";
    }

    if (!values.agreement) {
      nextErrors.agreement =
        "You must agree to the Privacy Policy to continue.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0];

      window.setTimeout(() => {
        const field = formRef.current?.querySelector(
          `[data-field="${firstInvalidField}"]`
        );

        field?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        if (field instanceof HTMLElement) {
          const control = field.querySelector(
            "input, select, textarea, button"
          );

          if (control instanceof HTMLElement) {
            control.focus({ preventScroll: true });
          }
        }
      }, 50);

      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (sending) return;

    // Quietly ignore bot submissions that fill the hidden honeypot.
    if (values.website) return;

    if (!validate()) return;

    setSending(true);
    setSubmitError("");

    const payload = {
      ...values,
      property: selectedProperty,
      nights,
      nightlyRate: selectedProperty?.rate,
      poolFee,
      subtotal,
      estimatedTotal,
      currency: "USD",
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            "We couldn't submit your inquiry. Please try again."
        );
      }

      setSuccess(true);
      setValues(initialValues);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#F8FAF8]">
        <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF3EC] text-[#07563D]">
            <Check size={38} />
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-[#B89436]">
            INQUIRY SUBMITTED
          </p>

          <h1 className="mt-3 font-serif text-3xl font-semibold text-[#123C2D] sm:text-4xl">
            Thank you for your inquiry
          </h1>

          <p className="mt-5 text-sm leading-8 text-[#68766D]">
            Your request has been received. Our team will review availability
            and follow up with you. Your inquiry is not a confirmed reservation
            until availability is confirmed and payment is received.
          </p>

          <Link
            href="/properties"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#07563D] px-7 py-3.5 text-sm font-bold text-[#D9B94F] transition hover:bg-[#064630]"
          >
            Explore more properties
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAF8] text-[#26352E]">
      {/* PAGE BANNER */}
      <section className="relative overflow-hidden border-b border-[#DDE9DF] bg-[#EAF3EC]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#C8A84C]/20" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full border border-[#C8A84C]/20" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#B89436]">
            AVAILABILITY INQUIRY
          </p>

          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#123C2D] sm:text-5xl lg:text-6xl">
            Check availability
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#617168] sm:text-base">
            Tell us about your stay. An inquiry is not a confirmed reservation
            — our team will review availability and follow up.
          </p>

          <div className="mx-auto mt-7 h-[3px] w-16 rounded-full bg-[#C8A84C]" />
        </div>
      </section>

      {/* FORM + ESTIMATED PRICING */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-10"
        >
          {/* HIDDEN HONEYPOT FIELD */}
          <div
            aria-hidden="true"
            className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
          >
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => setField("website", event.target.value)}
            />
          </div>

          {/* LEFT COLUMN */}
          <div className="min-w-0 space-y-8">
            {/* SECTION 1: YOUR DETAILS */}
            <section className="rounded-2xl border border-[#E4EAE4] bg-white p-5 shadow-sm sm:p-8">
              <SectionHeading
                number="01"
                title="Your details"
                description="Tell us who we're preparing this stay for."
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div data-field="fullName">
                  <label className={labelClass} htmlFor="fullName">
                    Full name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={values.fullName}
                    onChange={(event) =>
                      setField("fullName", event.target.value)
                    }
                    placeholder="Your full name"
                    className={inputClass}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  <FieldError message={errors.fullName} />
                </div>

                <div data-field="email">
                  <label className={labelClass} htmlFor="email">
                    Email address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(event) => setField("email", event.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                  />
                  <FieldError message={errors.email} />
                </div>

                <div data-field="phone">
                  <label className={labelClass} htmlFor="phone">
                    Phone number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={(event) => setField("phone", event.target.value)}
                    placeholder="Your phone number"
                    className={inputClass}
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                  />
                  <FieldError message={errors.phone} />
                </div>

                <div>
                  <label className={labelClass} htmlFor="address">
                    Home address (if requested)
                  </label>
                  <input
                    id="address"
                    name="address"
                    value={values.address}
                    onChange={(event) =>
                      setField("address", event.target.value)
                    }
                    placeholder="Your home address"
                    className={inputClass}
                    autoComplete="street-address"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 2: YOUR STAY */}
            <section className="rounded-2xl border border-[#E4EAE4] bg-white p-5 shadow-sm sm:p-8">
              <SectionHeading
                number="02"
                title="Your stay"
                description="Select your preferred home and travel details."
              />

              <div className="space-y-5">
                <div data-field="propertyId">
                  <label className={labelClass} htmlFor="propertyId">
                    Select a property *
                  </label>

                  <div className="relative">
                    <MapPin
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#B89436]"
                    />
                    <select
                      id="propertyId"
                      value={values.propertyId}
                      onChange={(event) =>
                        setField("propertyId", event.target.value)
                      }
                      className={`${inputClass} appearance-none pl-11 pr-11`}
                      aria-invalid={Boolean(errors.propertyId)}
                    >
                      <option value="">Choose your preferred home</option>
                      {properties.map((property) => (
                        <option key={property.id} value={property.id}>
                          {property.name} — {property.city}, {property.state} (
                          {formatMoney(property.rate)}/night)
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#89958C]"
                    />
                  </div>

                  <FieldError message={errors.propertyId} />
                </div>

                {selectedProperty && (
                  <div className="rounded-xl border border-[#DDE9DF] bg-[#F4F8F4] p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#B89436]">
                      SELECTED PROPERTY
                    </p>
                    <p className="mt-1 font-serif text-lg font-semibold text-[#123C2D]">
                      {selectedProperty.name}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[#7D8B80]">
                      <MapPin size={13} />
                      {selectedProperty.city}, {selectedProperty.state}
                    </p>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div data-field="checkIn">
                    <label className={labelClass} htmlFor="checkIn">
                      Check-in date *
                    </label>
                    <input
                      id="checkIn"
                      type="date"
                      min={today || undefined}
                      value={values.checkIn}
                      onChange={(event) => {
                        const nextCheckIn = event.target.value;
                        setField("checkIn", nextCheckIn);

                        if (
                          values.checkOut &&
                          nextCheckIn >= values.checkOut
                        ) {
                          setField("checkOut", "");
                        }
                      }}
                      className={inputClass}
                      aria-invalid={Boolean(errors.checkIn)}
                    />
                    <FieldError message={errors.checkIn} />
                  </div>

                  <div data-field="checkOut">
                    <label className={labelClass} htmlFor="checkOut">
                      Check-out date *
                    </label>
                    <input
                      id="checkOut"
                      type="date"
                      min={
                        values.checkIn
                          ? values.checkIn
                          : today || undefined
                      }
                      value={values.checkOut}
                      onChange={(event) =>
                        setField("checkOut", event.target.value)
                      }
                      className={inputClass}
                      aria-invalid={Boolean(errors.checkOut)}
                    />
                    <FieldError message={errors.checkOut} />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div data-field="guests">
                    <label className={labelClass} htmlFor="guests">
                      Number of guests *
                    </label>
                    <input
                      id="guests"
                      type="number"
                      min="1"
                      step="1"
                      value={values.guests}
                      onChange={(event) =>
                        setField("guests", event.target.value)
                      }
                      className={inputClass}
                      aria-invalid={Boolean(errors.guests)}
                    />
                    <FieldError message={errors.guests} />
                  </div>

                  <div data-field="purpose">
                    <label className={labelClass} htmlFor="purpose">
                      Purpose of stay *
                    </label>
                    <input
                      id="purpose"
                      value={values.purpose}
                      onChange={(event) =>
                        setField("purpose", event.target.value)
                      }
                      placeholder="e.g. Family vacation, birthday party"
                      className={inputClass}
                      aria-invalid={Boolean(errors.purpose)}
                    />
                    <FieldError message={errors.purpose} />
                  </div>
                </div>

                {/* OPTIONAL POOL ACCESS */}
                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-[#E3EAE3] bg-[#F8FAF8] p-4 transition hover:border-[#C8A84C]/70">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={values.poolAccess}
                      onChange={(event) =>
                        setField("poolAccess", event.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-[#07563D]"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#123C2D]">
                        Add pool access
                      </p>
                      <p className="mt-1 text-xs leading-6 text-[#87928A]">
                        Flat fee per booking, added to your estimate.
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 font-semibold text-[#B89436]">
                    +$30
                  </span>
                </label>
              </div>
            </section>

            {/* SECTION 3: QUESTIONS */}
            <section className="rounded-2xl border border-[#E4EAE4] bg-white p-5 shadow-sm sm:p-8">
              <SectionHeading
                number="03"
                title="A few questions"
                description="Help us prepare for your visit."
              />

              <div className="space-y-6">
                {questions.map((question) => (
                  <div
                    key={question.name}
                    data-field={question.name}
                    className="border-b border-[#EDF1ED] pb-5 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-semibold text-[#344C3E]">
                      {question.label} *
                    </p>

                    <div className="mt-3 flex gap-3">
                      {["Yes", "No"].map((answer) => {
                        const selected = values[question.name] === answer;

                        return (
                          <button
                            key={answer}
                            type="button"
                            onClick={() =>
                              setField(question.name, answer)
                            }
                            aria-pressed={selected}
                            className={`min-w-24 rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${
                              selected
                                ? "border-[#07563D] bg-[#07563D] text-[#D9B94F]"
                                : "border-[#DFE8DF] bg-white text-[#68766D] hover:border-[#C8A84C]"
                            }`}
                          >
                            {answer}
                          </button>
                        );
                      })}
                    </div>

                    <FieldError message={errors[question.name]} />
                  </div>
                ))}
              </div>
            </section>

            {/* PREFERRED PAYMENT METHOD */}
            <section className="rounded-2xl border border-[#E4EAE4] bg-white p-5 shadow-sm sm:p-8">
              <SectionHeading
                number="04"
                title="Preferred payment method"
                description="Choose how you would prefer to make payment if your booking is confirmed."
              />

              <div data-field="paymentMethod">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {paymentMethods.map((method) => {
                    const selected = values.paymentMethod === method;
                    const isBankWire = method === "Bank Wire Transfer";
                    const disabled = isBankWire && bankWireDisabled;

                    return (
                      <button
                        key={method}
                        type="button"
                        disabled={disabled}
                        onClick={() => setField("paymentMethod", method)}
                        aria-pressed={selected}
                        className={`relative flex min-h-[58px] items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                          isBankWire ? "col-span-2 sm:col-span-3" : ""
                        } ${
                          disabled
                            ? "cursor-not-allowed border-[#E8ECE8] bg-[#F4F5F4] text-[#ADB5AE]"
                            : selected
                              ? "border-[#07563D] bg-[#07563D] text-[#D9B94F] shadow-sm"
                              : "border-[#E0E8E0] bg-white text-[#526459] hover:border-[#C8A84C]"
                        }`}
                      >
                        {selected && <Check size={16} />}
                        {isBankWire
                          ? "Bank Wire Transfer – ($1,000.00 Upwards)"
                          : method}
                      </button>
                    );
                  })}
                </div>

                <FieldError message={errors.paymentMethod} />

                {bankWireDisabled && (
                  <p className="mt-3 text-xs leading-6 text-[#9A7540]">
                    Bank wire transfer is available only when your estimated
                    total reaches $1,000.
                  </p>
                )}
              </div>

              <div className="mt-5 flex gap-3 rounded-xl bg-[#F2F7F2] p-4">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-[#B89436]"
                />
                <p className="text-xs leading-6 text-[#68766D]">
                  We accept all methods above. Bank wire transfer is accepted
                  only for payments of $1,000 or more. Payment instructions
                  arrive with your invoice. We will never ask for passwords,
                  PINs or wallet seed phrases.
                </p>
              </div>
            </section>

            {/* MESSAGE */}
            <section className="rounded-2xl border border-[#E4EAE4] bg-white p-5 shadow-sm sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-[#123C2D] sm:text-2xl">
                Message or special requests
              </h2>
              <p className="mt-2 text-sm text-[#87928A]">
                Share any additional information you would like our team to know.
              </p>

              <textarea
                rows={5}
                value={values.message}
                onChange={(event) =>
                  setField("message", event.target.value)
                }
                placeholder="Write your message or special requests here..."
                className={`${inputClass} mt-5 resize-y leading-7`}
              />
            </section>

            {/* PRIVACY AGREEMENT */}
            <section
              className="rounded-2xl border border-[#E4EAE4] bg-white p-5 shadow-sm sm:p-8"
              data-field="agreement"
            >
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={values.agreement}
                  onChange={(event) =>
                    setField("agreement", event.target.checked)
                  }
                  className="mt-1 h-4 w-4 shrink-0 accent-[#07563D]"
                />

                <span className="text-sm leading-7 text-[#68766D]">
                  I agree to the{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#07563D] underline decoration-[#C8A84C] underline-offset-4 hover:text-[#B89436]"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and understand that an inquiry is not a confirmed reservation.
                </span>
              </label>

              <FieldError message={errors.agreement} />
            </section>

            {/* SUBMIT */}
            {submitError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#07563D] px-6 py-4 text-sm font-bold text-[#D9B94F] shadow-md transition hover:bg-[#064630] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Sending your inquiry...
                </>
              ) : (
                <>
                  Submit Availability Inquiry
                  <span className="text-lg">→</span>
                </>
              )}
            </button>

            <p className="text-center text-xs leading-6 text-[#929D94]">
              Your inquiry will be reviewed by our reservations team.
              Submission does not guarantee availability or confirm a booking.
            </p>
          </div>

          {/* RIGHT COLUMN: STICKY ESTIMATED PRICING */}
          <aside className="lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-2xl border border-[#DDE8DD] bg-white shadow-[0_10px_35px_rgba(18,60,45,0.07)]">
              <div className="bg-[#07563D] px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D9B94F]/40 bg-white/5 text-[#D9B94F]">
                    <Wallet size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B94F]">
                      YOUR STAY
                    </p>
                    <h2 className="mt-1 font-serif text-xl font-semibold text-white">
                      Estimated pricing
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {!selectedProperty ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF3EC] text-[#B89436]">
                      <CalendarDays size={25} />
                    </div>
                    <p className="mt-5 text-sm leading-7 text-[#87928A]">
                      Choose a property to see an estimate.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#B89436]">
                        SELECTED PROPERTY
                      </p>
                      <h3 className="mt-2 font-serif text-lg font-semibold leading-7 text-[#123C2D]">
                        {selectedProperty.name}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-[#87928A]">
                        <MapPin size={13} />
                        {selectedProperty.city}, {selectedProperty.state}
                      </p>
                    </div>

                    <div className="my-6 border-t border-dashed border-[#DFE8DF]" />

                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between gap-3">
                        <span className="text-[#87928A]">Nightly rate</span>
                        <span className="font-semibold text-[#344C3E]">
                          {formatMoney(selectedProperty.rate)}
                        </span>
                      </div>

                      <div className="flex justify-between gap-3">
                        <span className="text-[#87928A]">Number of nights</span>
                        <span className="font-semibold text-[#344C3E]">
                          {nights || "—"}
                        </span>
                      </div>

                      {nights > 0 && (
                        <div className="flex justify-between gap-3">
                          <span className="text-[#87928A]">
                            Accommodation
                          </span>
                          <span className="font-semibold text-[#344C3E]">
                            {formatMoney(subtotal)}
                          </span>
                        </div>
                      )}

                      {values.poolAccess && (
                        <div className="flex justify-between gap-3">
                          <span className="text-[#87928A]">Pool access</span>
                          <span className="font-semibold text-[#344C3E]">
                            {formatMoney(30)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="my-6 border-t border-dashed border-[#DFE8DF]" />

                    {hasEstimate ? (
                      <>
                        <div className="flex items-end justify-between gap-3">
                          <span className="text-sm font-semibold text-[#344C3E]">
                            Estimated total
                          </span>
                          <span className="font-serif text-3xl font-bold text-[#07563D]">
                            {formatMoney(estimatedTotal)}
                          </span>
                        </div>

                        <p className="mt-4 text-xs leading-6 text-[#929D94]">
                          This is an estimate based on your selected dates
                          and extras. Your final price will be confirmed on
                          your invoice.
                        </p>
                      </>
                    ) : (
                      <div className="rounded-xl bg-[#F4F8F4] p-4 text-center">
                        <p className="text-sm font-medium text-[#68766D]">
                          Choose your check-in and check-out dates to calculate
                          your estimated total.
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div className="mt-6 rounded-xl bg-[#F4F8F4] p-4">
                  <div className="flex items-center gap-2 text-[#07563D]">
                    <Info size={17} />
                    <span className="text-xs font-bold">
                      Booking information
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-[#7E8C81]">
                    Your inquiry is a request, not a confirmed reservation.
                    Our team will review availability and send your invoice
                    and payment instructions.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#E4EAE4] bg-white p-4">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-[#B89436]"
              />
              <p className="text-xs leading-6 text-[#87928A]">
                Your information is handled according to our Privacy Policy.
                We will never request your passwords, PINs or wallet seed phrases.
              </p>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}
