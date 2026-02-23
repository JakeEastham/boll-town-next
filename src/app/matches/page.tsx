import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { client } from "@/lib/sanity";
import { teamsQuery } from "@/lib/sanity/queries";
import {
  LeagueTable,
  ClubFixtures,
  ClubResults,
} from "@/components/sections";
import type { Team } from "@/types";
import { seasonPlayerStats } from "@/data/playerStats";

const CURRENT_SEASON = "2025-26";
const currentSeason = seasonPlayerStats[CURRENT_SEASON] ?? [];
const topScorers = [...currentSeason]
  .filter((p) => p.goals > 0)
  .sort((a, b) => b.goals - a.goals || b.apps - a.apps)
  .slice(0, 5);
const topAppearances = [...currentSeason]
  .filter((p) => p.apps > 0)
  .sort((a, b) => b.apps - a.apps || b.goals - a.goals)
  .slice(0, 5);

export const metadata: Metadata = {
  title: "Matches",
  description: "View fixtures and results for Bollington Town FC.",
};

async function getTeams() {
  return client.fetch<Team[]>(teamsQuery);
}

export default async function MatchesPage() {
  const teams = await getTeams();

  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-btfc-navy py-16 mb-12">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider">
            Matches
          </h1>
          <p className="text-white/70 mt-4 max-w-xl">
            View upcoming fixtures, recent results, and league standings for Bollington Town FC.
          </p>
        </div>
      </div>

      <div className="container">
        {/* League Table */}
        <section className="mb-16">
          <LeagueTable detail title="Premier Division Table" />
        </section>

        {/* Fixtures & Results Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ClubFixtures title="Upcoming Fixtures" />
            <ClubResults title="Recent Results" />
          </div>
        </section>

        {/* Season Stats */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-btfc-gold font-display text-sm uppercase tracking-widest mb-1">
                {CURRENT_SEASON} Season
              </p>
              <h2 className="font-display text-2xl md:text-3xl text-btfc-navy uppercase tracking-wider">
                Player Stats
              </h2>
            </div>
            <Link
              href="/club-history/all-time-stats"
              className="text-sm font-medium text-btfc-blue hover:text-btfc-gold transition-colors"
            >
              All-time stats →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Scorers */}
            <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center gap-2">
                <span className="text-xl">⚽</span>
                <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider">Top Scorers</h3>
              </div>
              <div className="divide-y divide-neutral-50">
                {topScorers.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-4 px-6 py-3">
                    <span className="w-5 text-center text-xs font-bold text-neutral-400">{i + 1}</span>
                    <span className="flex-1 text-sm font-medium text-neutral-700">{p.name}</span>
                    <span className="text-lg font-display text-btfc-navy tabular-nums">{p.goals}</span>
                    <span className="text-xs text-neutral-400 w-10">goals</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Appearances */}
            <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-neutral-100 flex items-center gap-2">
                <span className="text-xl">👕</span>
                <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider">Most Appearances</h3>
              </div>
              <div className="divide-y divide-neutral-50">
                {topAppearances.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-4 px-6 py-3">
                    <span className="w-5 text-center text-xs font-bold text-neutral-400">{i + 1}</span>
                    <span className="flex-1 text-sm font-medium text-neutral-700">{p.name}</span>
                    <span className="text-lg font-display text-btfc-navy tabular-nums">{p.apps}</span>
                    <span className="text-xs text-neutral-400 w-10">apps</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FA Full-Time Links */}
        {teams && teams.some((team) => team.faFullTimeTeamId) && (
          <section className="p-6 bg-neutral-50 rounded-xl">
            <h2 className="font-display text-xl text-btfc-navy uppercase tracking-wider mb-4">
              View Team Pages on FA Full-Time
            </h2>
            <p className="text-neutral-600 mb-4">
              View detailed statistics, player information, and full match reports.
            </p>
            <div className="flex flex-wrap gap-4">
              {teams.map((team) =>
                team.faFullTimeTeamId ? (
                  <a
                    key={team._id}
                    href={`https://fulltime.thefa.com/displayTeam.html?divisionseason=${team.faFullTimeDivisionId}&teamID=${team.faFullTimeTeamId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-btfc-navy text-white rounded-lg hover:bg-btfc-navy-light transition-colors"
                  >
                    {team.name}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : null
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
