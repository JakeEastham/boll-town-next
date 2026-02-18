import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { playersQuery } from "@/lib/sanity/queries";
import { PlayerGrid } from "@/components/sections";
import type { Player } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Squad",
  description: "Meet the players of Bollington Town FC. View our first team squad profiles.",
};

interface SquadPageProps {
  searchParams: Promise<{ team?: string }>;
}

async function getPlayers() {
  return client.fetch<Player[]>(playersQuery);
}

export default async function SquadPage({ searchParams }: SquadPageProps) {
  const [players, params] = await Promise.all([getPlayers(), searchParams]);
  const defaultTeam = params.team || "first-team";

  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-btfc-navy py-16 mb-12">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider">
            The Squad
          </h1>
          <p className="text-white/70 mt-4 max-w-xl">
            Meet the players who represent Bollington Town FC on the pitch.
          </p>
        </div>
      </div>

      {/* Squad Grid */}
      <div className="container">
        <PlayerGrid players={players || []} showTeamToggle defaultTeam={defaultTeam} />
      </div>
    </div>
  );
}
