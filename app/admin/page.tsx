import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  ClipboardList,
  Inbox,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

type Inquiry = {
  id: string;
  created_at: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  property_name: string | null;
  check_in: string | null;
  check_out: string | null;
};

function formatDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(`${value.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatSubmittedDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[#F5F7F5] p-6">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-8 w-56 rounded-lg bg-[#E5EAE6]" />
        <div className="mt-4 h-4 w-80 rounded bg-[#E5EAE6]" />
        <div className="mt-10 h-32 rounded-2xl bg-[#E5EAE6]" />
        <div className="mt-6 h-64 rounded-2xl bg-[#E5EAE6]" />
      </div>
    </main>
  );
}

async function DashboardContent() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const { data, count, error } = await supabaseAdmin
    .from("inquiries")
    .select(
      "id, created_at, customer_name, customer_email, customer_phone, property_name, check_in, check_out",
      { count: "exact" }
    )
    .order("created_at", { ascending: false });

  const inquiries = (data ?? []) as Inquiry[];

  return (
    <main className="min-h-screen bg-[#F5F7F5]">
      <header className="border-b border-[#E5EAE6] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
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

      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B99A40]">
            Private admin area
          </p>

          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#123C2D] sm:text-4xl">
            Inquiry dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#718078]">
            View and review inquiries submitted by your website visitors.
          </p>
        </div>

        <section className="mb-8 rounded-2xl border border-[#E5EAE6] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#07563D]/[0.08] text-[#07563D]">
              <ClipboardList size={23} />
            </div>

            <div>
              <p className="text-sm text-[#718078]">Total inquiries received</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-[#123C2D]">
                {count ?? inquiries.length}
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#E5EAE6] bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDF0ED] px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-[#123C2D]">
                Customer inquiries
              </h2>
              <p className="mt-1 text-sm text-[#849188]">
                Latest submissions appear first.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#718078]">
              <Inbox size={15} />
              {inquiries.length} shown
            </div>
          </div>

          {error ? (
            <div className="p-8 text-center">
              <p className="font-medium text-red-700">
                We couldn't load your inquiries.
              </p>
              <p className="mt-2 text-sm text-[#718078]">
                Please check your Supabase connection and try again.
              </p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F5F1] text-[#07563D]">
                <Inbox size={25} />
              </div>

              <h3 className="mt-4 font-semibold text-[#123C2D]">
                No inquiries yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#849188]">
                When a visitor submits the inquiry form on your website, their
                submission will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[850px] text-left">
                  <thead className="bg-[#FAFBFA] text-xs uppercase tracking-wider text-[#849188]">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Customer</th>
                      <th className="px-6 py-4 font-semibold">Property</th>
                      <th className="px-6 py-4 font-semibold">Check-in</th>
                      <th className="px-6 py-4 font-semibold">Check-out</th>
                      <th className="px-6 py-4 font-semibold">Submitted</th>
                      <th className="px-6 py-4 font-semibold">Details</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#EDF0ED]">
                    {inquiries.map((inquiry) => (
                      <tr
                        key={inquiry.id}
                        className="transition hover:bg-[#FAFCFA]"
                      >
                        <td className="px-6 py-5">
                          <p className="font-medium text-[#123C2D]">
                            {inquiry.customer_name || "Unnamed customer"}
                          </p>
                          <p className="mt-1 text-xs text-[#849188]">
                            {inquiry.customer_email || "No email provided"}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-[#52645A]">
                          {inquiry.property_name || "—"}
                        </td>

                        <td className="px-6 py-5 text-sm text-[#52645A]">
                          {formatDate(inquiry.check_in)}
                        </td>

                        <td className="px-6 py-5 text-sm text-[#52645A]">
                          {formatDate(inquiry.check_out)}
                        </td>

                        <td className="px-6 py-5 text-sm text-[#718078]">
                          {formatSubmittedDate(inquiry.created_at)}
                        </td>

                        <td className="px-6 py-5">
                          <Link
                            href={`/admin/inquiries/${inquiry.id}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#07563D] hover:text-[#B99A40]"
                          >
                            View
                            <ArrowUpRight size={15} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-[#EDF0ED] md:hidden">
                {inquiries.map((inquiry) => (
                  <article key={inquiry.id} className="space-y-4 p-5">
                    <div>
                      <p className="font-semibold text-[#123C2D]">
                        {inquiry.customer_name || "Unnamed customer"}
                      </p>
                      <p className="mt-1 break-all text-sm text-[#718078]">
                        {inquiry.customer_email || "No email provided"}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-[#52645A]">
                      <p>
                        <span className="text-[#849188]">Property:</span>{" "}
                        {inquiry.property_name || "—"}
                      </p>
                      <p>
                        <span className="text-[#849188]">Check-in:</span>{" "}
                        {formatDate(inquiry.check_in)}
                      </p>
                      <p>
                        <span className="text-[#849188]">Check-out:</span>{" "}
                        {formatDate(inquiry.check_out)}
                      </p>
                      <p>
                        <span className="text-[#849188]">Submitted:</span>{" "}
                        {formatSubmittedDate(inquiry.created_at)}
                      </p>
                    </div>

                    <Link
                      href={`/admin/inquiries/${inquiry.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#07563D]"
                    >
                      View full inquiry
                      <ArrowUpRight size={16} />
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>

        <div className="mt-6 flex items-center gap-2 text-xs text-[#849188]">
          <Mail size={14} />
          Inquiry records are available only to the authenticated administrator.
        </div>
      </div>
    </main>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}