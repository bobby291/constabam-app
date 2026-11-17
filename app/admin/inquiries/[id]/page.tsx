import type { ReactNode } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  Home,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  User,
  Users,
  Wallet,
} from "lucide-react";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

type PropertyDetails = {
  id?: string;
  name?: string;
  city?: string;
  state?: string;
  rate?: number | string;
};

type InquiryPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  propertyId?: string;
  property?: PropertyDetails;
  checkIn?: string;
  checkOut?: string;
  guests?: string | number;
  purpose?: string;
  localResident?: string;
  specialNeeds?: string;
  bringingPets?: string;
  readyToProceed?: string;
  poolAccess?: boolean;
  paymentMethod?: string;
  message?: string;
  agreement?: boolean;
  nights?: number;
  nightlyRate?: number;
  poolFee?: number;
  subtotal?: number;
  estimatedTotal?: number;
  currency?: string;
};

type InquiryRecord = {
  id: string;
  created_at: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  property_name: string | null;
  check_in: string | null;
  check_out: string | null;
  payload: InquiryPayload | null;
};

function textValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}

function formatDate(value?: string | null) {
  if (!value) return "Not provided";

  const date = new Date(`${value.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(date.getTime())) return "Not provided";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatSubmittedDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

function formatPrice(value: unknown, currency = "USD") {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  const amount = Number(value);

  if (!Number.isFinite(amount)) return "Not provided";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("en-US")}`;
  }
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: unknown;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-[#EDF0ED] py-3 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <span className="text-sm text-[#849188]">{label}</span>
      <span className="break-words text-sm font-medium text-[#30483C] sm:max-w-[65%] sm:text-right">
        {textValue(value)}
      </span>
    </div>
  );
}

function SectionCard({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#E5EAE6] bg-white shadow-sm">
      <div className="flex items-start gap-3 border-b border-[#EDF0ED] px-5 py-5 sm:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#07563D]/[0.08] text-[#07563D]">
          {icon}
        </div>

        <div>
          <h2 className="font-semibold text-[#123C2D]">{title}</h2>
          {description && (
            <p className="mt-1 text-xs leading-5 text-[#849188]">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="px-5 py-2 sm:px-6">{children}</div>
    </section>
  );
}

async function InquiryDetailsContent({
  id,
}: {
  id: string;
}) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .select(
      "id, created_at, customer_name, customer_email, customer_phone, property_name, check_in, check_out, payload"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to retrieve inquiry:", error);

    return (
      <main className="min-h-screen bg-[#F5F7F5] px-5 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-[#123C2D]">
            Unable to load inquiry
          </h1>
          <p className="mt-2 text-sm text-[#718078]">
            Something went wrong while retrieving this inquiry. Please try
            again.
          </p>
          <Link
            href="/admin"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-[#07563D]"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (!data) {
    notFound();
  }

  const inquiry = data as InquiryRecord;
  const payload = inquiry.payload ?? {};
  const property = payload.property ?? {};
  const currency = payload.currency || "USD";

  const customerName =
    payload.fullName || inquiry.customer_name || "Unnamed customer";

  const customerEmail =
    payload.email || inquiry.customer_email || "Not provided";

  const customerPhone =
    payload.phone || inquiry.customer_phone || "Not provided";

  const propertyName =
    property.name || inquiry.property_name || "Not provided";

  return (
    <main className="min-h-screen bg-[#F5F7F5]">
      <header className="border-b border-[#E5EAE6] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#07563D] text-white">
              <ShieldCheck size={22} />
            </div>

            <div>
              <p className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[#123C2D]">
                Constabam
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#B99A40]">
                Administration
              </p>
            </div>
          </Link>

          <AdminLogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-11">
        <Link
          href="/admin"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#718078] transition hover:text-[#07563D]"
        >
          <ArrowLeft size={16} />
          Back to all inquiries
        </Link>

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B99A40]">
              Customer submission
            </p>

            <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#123C2D] sm:text-4xl">
              Inquiry details
            </h1>

            <p className="mt-2 text-sm text-[#718078]">
              Complete information submitted through the Constabam inquiry
              form.
            </p>
          </div>

          <div className="rounded-xl border border-[#E5EAE6] bg-white px-4 py-3">
            <p className="text-xs text-[#849188]">Submitted on</p>
            <p className="mt-1 text-sm font-medium text-[#30483C]">
              {formatSubmittedDate(inquiry.created_at)}
            </p>
          </div>
        </div>

        <div className="mb-7 rounded-2xl border border-[#E5EAE6] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#07563D]/[0.08] text-[#07563D]">
              <User size={27} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-[#123C2D]">
                {customerName}
              </h2>

              <div className="mt-2 flex flex-col gap-2 text-sm text-[#718078] sm:flex-row sm:flex-wrap sm:gap-5">
                <span className="flex items-center gap-2 break-all">
                  <Mail size={15} />
                  {customerEmail}
                </span>

                <span className="flex items-center gap-2">
                  <Phone size={15} />
                  {customerPhone}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-[#F5F7F5] px-4 py-3">
              <p className="text-xs text-[#849188]">Inquiry reference</p>
              <p className="mt-1 max-w-[180px] break-all font-mono text-xs font-medium text-[#30483C]">
                {inquiry.id}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard
            title="Your Details"
            description="Contact and personal information provided by the customer."
            icon={<User size={20} />}
          >
            <DetailRow label="Full name" value={customerName} />
            <DetailRow label="Email address" value={customerEmail} />
            <DetailRow label="Phone number" value={customerPhone} />
            <DetailRow label="Residential address" value={payload.address} />
          </SectionCard>

          <SectionCard
            title="Your Stay"
            description="Selected property and requested stay information."
            icon={<Home size={20} />}
          >
            <DetailRow label="Selected property" value={propertyName} />
            <DetailRow
              label="Property city"
              value={property.city}
            />
            <DetailRow
              label="Property state"
              value={property.state}
            />
            <DetailRow label="Property ID" value={payload.propertyId} />
            <DetailRow
              label="Check-in"
              value={formatDate(payload.checkIn || inquiry.check_in)}
            />
            <DetailRow
              label="Check-out"
              value={formatDate(payload.checkOut || inquiry.check_out)}
            />
            <DetailRow label="Number of nights" value={payload.nights} />
            <DetailRow
              label="Number of guests"
              value={payload.guests}
            />
          </SectionCard>

          <SectionCard
            title="A Few Questions"
            description="The customer's answers to the additional stay questions."
            icon={<Users size={20} />}
          >
            <DetailRow label="Purpose of stay" value={payload.purpose} />
            <DetailRow
              label="Local resident"
              value={payload.localResident}
            />
            <DetailRow
              label="Special needs"
              value={payload.specialNeeds}
            />
            <DetailRow
              label="Bringing pets"
              value={payload.bringingPets}
            />
            <DetailRow
              label="Ready to proceed"
              value={payload.readyToProceed}
            />
            <DetailRow
              label="Pool access"
              value={payload.poolAccess}
            />
          </SectionCard>

          <SectionCard
            title="Preferred Payment Method"
            description="Payment preference selected by the customer."
            icon={<CreditCard size={20} />}
          >
            <DetailRow
              label="Payment method"
              value={payload.paymentMethod}
            />
          </SectionCard>

          <SectionCard
            title="Message or Special Requests"
            description="Additional information written by the customer."
            icon={<MessageSquare size={20} />}
          >
            <div className="py-4">
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#52645A]">
                {payload.message?.trim() || "No additional message provided."}
              </p>
            </div>
          </SectionCard>

          <SectionCard
            title="Privacy Policy Agreement"
            description="Confirmation recorded from the submitted inquiry."
            icon={<ShieldCheck size={20} />}
          >
            <div className="flex items-center gap-3 py-5">
              {payload.agreement === true ? (
                <CheckCircle2 className="shrink-0 text-[#07563D]" size={21} />
              ) : (
                <FileText className="shrink-0 text-[#849188]" size={21} />
              )}

              <div>
                <p className="text-sm font-semibold text-[#30483C]">
                  {payload.agreement === true
                    ? "Customer agreed to the Privacy Policy."
                    : "Agreement not confirmed in stored submission."}
                </p>
                <p className="mt-1 text-xs text-[#849188]">
                  This reflects the agreement value saved with the inquiry.
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Estimated Pricing"
            description="Pricing information submitted with the customer's inquiry."
            icon={<Wallet size={20} />}
          >
            <DetailRow
              label="Nightly rate"
              value={formatPrice(payload.nightlyRate, currency)}
            />
            <DetailRow
              label="Number of nights"
              value={payload.nights}
            />
            <DetailRow
              label="Pool fee"
              value={formatPrice(payload.poolFee, currency)}
            />
            <DetailRow
              label="Subtotal"
              value={formatPrice(payload.subtotal, currency)}
            />

            <div className="my-3 rounded-xl bg-[#07563D]/[0.06] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#718078]">
                Estimated total
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-[#07563D]">
                {formatPrice(payload.estimatedTotal, currency)}
              </p>
            </div>

            <DetailRow label="Currency" value={currency} />
          </SectionCard>

          <SectionCard
            title="Submission Information"
            description="Reference information for this inquiry."
            icon={<CalendarDays size={20} />}
          >
            <DetailRow
              label="Inquiry ID"
              value={inquiry.id}
            />
            <DetailRow
              label="Submission date"
              value={formatSubmittedDate(inquiry.created_at)}
            />
          </SectionCard>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E5EAE6] bg-white px-5 py-5">
          <div>
            <p className="text-sm font-semibold text-[#123C2D]">
              End of inquiry record
            </p>
            <p className="mt-1 text-xs text-[#849188]">
              This is a read-only view of the customer's original submission.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-xl bg-[#07563D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#06452F]"
          >
            <ArrowLeft size={16} />
            All inquiries
          </Link>
        </div>
      </div>
    </main>
  );
}

function InquiryLoading() {
  return (
    <main className="min-h-screen bg-[#F5F7F5] p-6">
      <div className="mx-auto max-w-6xl animate-pulse space-y-5">
        <div className="h-10 w-48 rounded-lg bg-[#E5EAE6]" />
        <div className="h-28 rounded-2xl bg-[#E5EAE6]" />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="h-64 rounded-2xl bg-[#E5EAE6]" />
          <div className="h-64 rounded-2xl bg-[#E5EAE6]" />
          <div className="h-64 rounded-2xl bg-[#E5EAE6]" />
          <div className="h-64 rounded-2xl bg-[#E5EAE6]" />
        </div>
      </div>
    </main>
  );
}

export default function InquiryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<InquiryLoading />}>
      <InquiryPageContent params={params} />
    </Suspense>
  );
}

async function InquiryPageContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <InquiryDetailsContent id={id} />;
}