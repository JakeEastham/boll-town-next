"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ArrowLeft } from "lucide-react";
import { allTimeStats } from "@/data/playerStats";

type SortKey = "apps" | "goals";
type SortDir = "desc" | "asc";

export default function AllTimeStatsPage() {
  const [sortKey, setSortKey] = useState<SortKey>("apps");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const players = useMemo(() => {
    const all = allTimeStats.byApps; // byApps has every player
    return [...all].sort((a, b) => {
      const diff = sortDir === "desc" ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey];
      if (diff !== 0) return diff;
      // secondary sort: the other column descending
      return sortKey === "apps" ? b.goals - a.goals : b.apps - a.apps;
    });
  }, [sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(d => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (col !== sortKey) return <ChevronDown className="w-3.5 h-3.5 opacity-30" />;
    return sortDir === "desc"
      ? <ChevronDown className="w-3.5 h-3.5 text-btfc-gold" />
      : <ChevronUp className="w-3.5 h-3.5 text-btfc-gold" />;
  }

  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-btfc-navy py-16 mb-12">
        <div className="container">
          <Link
            href="/club-history"
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Club History
          </Link>
          <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider">
            All-Time Player Stats
          </h1>
          <p className="text-white/60 mt-3 text-sm">
            All competitive appearances across all seasons. Data up to 23 February 2026.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="bg-white rounded-2xl shadow-md border border-neutral-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-btfc-navy text-white">
                <th className="px-4 py-3 text-left w-12 font-display text-xs uppercase tracking-wider text-white/60">
                  #
                </th>
                <th className="px-4 py-3 text-left font-display text-xs uppercase tracking-wider">
                  Player
                </th>
                <th
                  className="px-4 py-3 text-right font-display text-xs uppercase tracking-wider cursor-pointer hover:text-btfc-gold transition-colors select-none"
                  onClick={() => handleSort("apps")}
                >
                  <span className="inline-flex items-center justify-end gap-1">
                    Appearances <SortIcon col="apps" />
                  </span>
                </th>
                <th
                  className="px-4 py-3 text-right font-display text-xs uppercase tracking-wider cursor-pointer hover:text-btfc-gold transition-colors select-none"
                  onClick={() => handleSort("goals")}
                >
                  <span className="inline-flex items-center justify-end gap-1">
                    Goals <SortIcon col="goals" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {players.map((p, i) => (
                <tr key={p.name} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                  <td className="px-4 py-2.5 text-neutral-400 font-bold tabular-nums text-xs">
                    {i + 1}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-neutral-700">
                    {p.name}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-btfc-navy">
                    {p.apps}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-neutral-600">
                    {p.goals > 0 ? p.goals : <span className="text-neutral-300">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-neutral-400 mt-4 italic text-center">
          {players.length} players across all seasons · Click column headers to sort
        </p>
      </div>
    </div>
  );
}
