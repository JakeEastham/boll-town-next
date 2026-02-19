import { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { client } from "@/lib/sanity";
import { teamsQuery } from "@/lib/sanity/queries";
import {
  LeagueTable,
  ClubFixtures,
  ClubResults,
} from "@/components/sections";
import type { Team } from "@/types";

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
