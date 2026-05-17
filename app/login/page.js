"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(139,92,246,0.28),transparent_55%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_100%_50%,rgba(217,70,239,0.10),transparent_50%)]" aria-hidden />

      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-violet-600/30">SX</div>
            <span className="text-xl font-bold">ShopXray</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-black/20">
          <h1 className="text-2xl font-bold mb-2 tracking-tight">Welcome back</h1>
          <p className="text-neutral-400 text-sm mb-6">Login to spy on Etsy competitors</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-neutral-950/80 border border-white/10 rounded-xl text-neutral-100 placeholder:text-neutral-500 outline-none transition focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/30"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-neutral-950/80 border border-white/10 rounded-xl text-neutral-100 placeholder:text-neutral-500 outline-none transition focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/30"
                placeholder="********"
              />
            </div>

            <div className="text-right">
              <Link href="/forgot-password" className="text-xs text-neutral-400 hover:text-violet-400 transition">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="text-red-300 text-sm bg-red-950/40 border border-red-500/30 rounded-xl p-3">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white shadow-lg shadow-violet-900/35 hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-neutral-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-violet-400 hover:text-fuchsia-400 transition">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}