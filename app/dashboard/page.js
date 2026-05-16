"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("shop");
  const [userEmail, setUserEmail] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data?.user?.email || "");
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col lg:flex-row">
      <aside className="lg:w-64 lg:min-h-screen border-r border-neutral-800 flex flex-col">
        <div className="p-6 border-b border-neutral-800">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-teal-500 flex items-center justify-center font-bold text-sm">SX</div>
            <span className="text-lg font-bold">ShopXray</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button onClick={() => setActiveTab("shop")} className="w-full text-left px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Shop Spy</button>
          <button onClick={() => setActiveTab("keyword")} className="w-full text-left px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Keyword Research</button>
          <button disabled className="w-full text-left px-4 py-3 rounded-lg text-neutral-600 cursor-not-allowed flex items-center justify-between">
            <span>AI Action Plan</span>
            <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded">Soon</span>
          </button>
          <button disabled className="w-full text-left px-4 py-3 rounded-lg text-neutral-600 cursor-not-allowed flex items-center justify-between">
            <span>Settings</span>
            <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded">Soon</span>
          </button>
        </nav>
        <div className="p-4 border-t border-neutral-800">
          <div className="text-xs text-neutral-500 mb-2 truncate">{userEmail}</div>
          <button onClick={handleLogout} disabled={logoutLoading} className="w-full px-4 py-2 text-sm bg-neutral-900 hover:bg-neutral-800 rounded-lg transition disabled:opacity-50">{logoutLoading ? "Logging out..." : "Log out"}</button>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-10">
        {activeTab === "shop" ? <ShopSpy /> : <KeywordPlaceholder />}
      </main>
    </div>
  );
}

function ShopSpy() {
  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!shopName.trim()) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch("/api/etsy/shop?shopname=" + encodeURIComponent(shopName));
      const json = await res.json();
      if (!res.ok) setError(json.error || "Something went wrong");
      else setData(json);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Shop Spy</h1>
      <p className="text-neutral-400 mb-8">Analyze any Etsy shop and surface real competitor insights.</p>
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="Shop name or URL" className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-violet-500 transition" />
        <button type="submit" disabled={loading} className="px-6 py-3 bg-gradient-to-r from-violet-500 to-teal-500 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50">{loading ? "Spying..." : "Spy Now"}</button>
      </form>
      {error ? <div className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">{error}</div> : null}
      {data ? <ShopResults data={data} /> : null}
      {!data && !loading && !error ? <div className="text-center py-16 text-neutral-500">Enter a shop name or URL above to see competitor insights</div> : null}
    </div>
  );
}

function ShopResults({ data }) {
  return (
    <div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">{data.shopName}</h2>
            <p className="text-sm text-neutral-400">
              Found <span className="text-white font-medium">{data.totalFound}</span> listings
              {data.shopReviews ? <span>{" · "}<span className="text-white font-medium">{data.shopReviews.toLocaleString()}</span>{" shop reviews"}</span> : null}
              {data.shopRating ? <span>{" · "}<span className="text-yellow-400 font-medium">{data.shopRating} stars</span></span> : null}
            </p>
          </div>
          <a href={data.shopUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium transition text-center">View Shop on Etsy</a>
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800">
          <h3 className="font-bold">Top Listings</h3>
          <p className="text-xs text-neutral-500 mt-1">Most visible products from this shop based on search popularity</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs uppercase text-neutral-500 border-b border-neutral-800">
                <th className="px-6 py-3">Product Title</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.listings.map((item, idx) => (
                <tr key={idx} className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/30 transition">
                  <td className="px-6 py-4 text-sm">{item.title.length > 70 ? item.title.slice(0, 70) + "..." : item.title}</td>
                  <td className="px-6 py-4 text-sm">{item.price ? <span className="text-white">{item.price}</span> : <span className="text-neutral-600">--</span>}</td>
                  <td className="px-6 py-4 text-right"><a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-lg transition inline-block">View on Etsy</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KeywordPlaceholder() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Keyword Research</h1>
      <p className="text-neutral-400">Coming next.</p>
    </div>
  );
}