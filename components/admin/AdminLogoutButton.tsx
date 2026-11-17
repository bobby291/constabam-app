"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      router.replace("/admin/login");
      router.refresh();
    } catch {
      setLoading(false);
      alert("Unable to log out. Please try again.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-[#E5EAE6] bg-white px-4 py-2.5 text-sm font-medium text-[#52645A] transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-60"
    >
      <LogOut size={16} />
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}