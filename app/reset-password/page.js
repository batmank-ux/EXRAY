"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    // Supabase auto-detects recovery token from URL hash
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setSessionReady(true);
      }
    });
    // Check current session in case event already fired
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) setSessionReady(true);
    });
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
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
          {success ? (
            <div>
              <h1 className="text-2xl font-bold mb-2 tracking-tight">Password updated</h1>
              <p className="text-neutral-400 text-sm mb-6">Your password has been reset successfully. You can now login with your new password.</p>
              <Link href="/login" className="inline-block w-full text-center py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white shadow-lg shadow-violet-900/35 hover:brightness-110 transition">
                Go to login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2 tracking-tight">Set new password</h1>
              <p className="text-neutral-400 text-sm mb-6">Enter your new password below.</p>

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-300 mb-2">New password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 bg-neutral-950/80 border border-white/10 rounded-xl text-neutral-100 placeholder:text-neutral-500 outline-none transition focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/30"
                    placeholder="At least 6 characters"
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-300 mb-2">Confirm password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 bg-neutral-950/80 border border-white/10 rounded-xl text-neutral-100 placeholder:text-neutral-500 outline-none transition focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/30"
                    placeholder="Repeat new password"
                  />
                </div>

                {error && (
                  <div className="text-red-300 text-sm bg-red-950/40 border border-red-500/30 rounded-xl p-3">{error}</div>
                )}

                {!sessionReady && (
                  <div className="text-amber-300 text-xs bg-amber-950/30 border border-amber-500/20 rounded-xl p-3">
                    Open this page from the password reset email link.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !sessionReady}
                  className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white shadow-lg shadow-violet-900/35 hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}