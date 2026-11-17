
"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Invalid email or password.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F7F5] px-5 py-12">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#07563D]/[0.06] blur-3xl" />
      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#C8A84C]/[0.09] blur-3xl" />

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-2xl border border-[#E5EAE6] bg-white shadow-sm">
            <Image
              src="/logo.png"
              alt="Constabam logo"
              width={60}
              height={60}
              className="h-full w-full object-contain p-1"
              priority
            />
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#123C2D]">
            Constabam
          </h1>

          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#B99A40]">
            Shortlet Administration
          </p>
        </div>

        <section className="rounded-3xl border border-[#E5EAE6] bg-white p-7 shadow-[0_20px_70px_rgba(18,60,45,0.08)] sm:p-9">
          <div className="mb-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#07563D]/[0.08] text-[#07563D]">
              <LockKeyhole size={22} />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-[#123C2D]">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#718078]">
              Sign in to access your private inquiry dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#30483C]"
              >
                Admin email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91A097]"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your admin email"
                  className="h-13 w-full rounded-xl border border-[#E1E8E2] bg-[#FCFDFC] pl-11 pr-4 text-sm text-[#183B2C] outline-none transition placeholder:text-[#A3AEA7] focus:border-[#07563D] focus:ring-4 focus:ring-[#07563D]/[0.07]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#30483C]"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91A097]"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="h-13 w-full rounded-xl border border-[#E1E8E2] bg-[#FCFDFC] pl-11 pr-12 text-sm text-[#183B2C] outline-none transition placeholder:text-[#A3AEA7] focus:border-[#07563D] focus:ring-4 focus:ring-[#07563D]/[0.07]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#91A097] transition hover:text-[#07563D]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#07563D] px-5 text-sm font-semibold text-white shadow-lg shadow-[#07563D]/10 transition hover:bg-[#06452F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in to dashboard"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <div className="mt-7 flex items-center justify-center gap-2 border-t border-[#EDF0ED] pt-6 text-xs text-[#849188]">
            <ShieldCheck size={15} className="text-[#07563D]" />
            Private and secure administrator access
          </div>
        </section>

        <p className="mt-7 text-center text-xs text-[#98A39B]">
            © 2026 Constabam Shortlet. All rights reserved.
        </p>
      </div>
    </main>
  );
}
