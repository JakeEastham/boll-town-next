import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import { client } from "@/lib/sanity";
import { upcomingMatchesQuery, recentResultsQuery, teamsQuery } from "@/lib/sanity/queries";
import { MatchCard, Button } from "@/components/ui";
import type { Match, Team } from "@/types";

export const metadata: Metadata = {
  title: "Matches",
  description: "View fixtures and results for Bollington Town FC.",
};

async function getMatchData() {
  const [upcoming, results, teams] = await Promise.all([
    client.fetch<Match[]>(upcomingMatchesQuery),
    client.fetch<Match[]>(recentResultsQuery),
    client.fetch<Team[]>(teamsQuery),
  ]);
  return { upcoming, results, teams };
}

export default async function MatchesPage() {
  const { upcoming, results, teams } = await getMatchData();

  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-btfc-navy py-16 mb-12">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider">
            Matches
          </h1>
          <p className="text-white/70 mt-4 max-w-xl">
            View upcoming fixtures and recent results for Bollington Town FC.
          </p>
        </div>
      </div>

      <div className="container">
        {/* FA Full-Time Links */}
        <div className="mb-12 p-6 bg-neutral-50 rounded-xl">
          <h2 className="font-display text-xl text-btfc-navy uppercase tracking-wider mb-4">
            Full Fixtures on FA Full-Time
          </h2>
          <p className="text-neutral-600 mb-4">
            View complete league tables, fixtures, and statistics on the FA Full-Time website.
          </p>
          <div className="flex flex-wrap gap-4">
            {teams?.map((team) =>
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
        </div>

        {/* Upcoming Fixtures */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-btfc-navy uppercase tracking-wider mb-6">
            Upcoming Fixtures
          </h2>
          {upcoming && upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map((match) => (
                <MatchCard key={match._id} match={match} variant="upcoming" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-neutral-50 rounded-xl">
              <p className="text-neutral-500">No upcoming fixtures scheduled</p>
              <p className="text-sm text-neutral-400 mt-2">
                Check FA Full-Time for the latest fixture information
              </p>
            </div>
          )}
        </section>

        {/* Recent Results */}
        <section>
          <h2 className="font-display text-2xl text-btfc-navy uppercase tracking-wider mb-6">
            Recent Results
          </h2>
          {results && results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((match) => (
                <MatchCard key={match._id} match={match} variant="result" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-neutral-50 rounded-xl">
              <p className="text-neutral-500">No recent results available</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
