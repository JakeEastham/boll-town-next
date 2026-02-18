"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PlayerCard } from "@/components/ui";
import type { Player, PlayerPosition } from "@/types";

interface PlayerGridProps {
  players: Player[];
  showTeamToggle?: boolean;
  defaultTeam?: string;
}

const positionOrder: PlayerPosition[] = ["goalkeeper", "defender", "midfielder", "forward"];
const positionLabels: Record<PlayerPosition, string> = {
  goalkeeper: "Goalkeepers",
  defender: "Defenders",
  midfielder: "Midfielders",
  forward: "Forwards",
};

export function PlayerGrid({ players, showTeamToggle = false, defaultTeam = "first-team" }: PlayerGridProps) {
  const [selectedTeam, setSelectedTeam] = useState(defaultTeam);

  // Get unique teams
  const teams = Array.from(new Set(players.map((p) => p.team?.slug?.current).filter(Boolean)));

  // Filter players by team
  const filteredPlayers = showTeamToggle && teams.length > 1
    ? players.filter((p) => p.team?.slug?.current === selectedTeam)
    : players;

  // Group players by position
  const playersByPosition = positionOrder.reduce((acc, position) => {
    acc[position] = filteredPlayers.filter((p) => p.position === position);
    return acc;
  }, {} as Record<PlayerPosition, Player[]>);

  return (
    <div>
      {/* Team Toggle */}
      {showTeamToggle && teams.length > 1 && (
        <div className="flex justify-center gap-2 mb-10">
          {teams.map((team) => (
            <button
              key={team}
              onClick={() => setSelectedTeam(team!)}
              className={cn(
                "px-6 py-3 rounded-lg font-display uppercase tracking-wider text-sm transition-all",
                selectedTeam === team
                  ? "bg-btfc-gold text-btfc-navy"
                  : "bg-btfc-navy/10 text-btfc-navy hover:bg-btfc-navy/20"
              )}
            >
              {team === "first-team" ? "First Team" : team}
            </button>
          ))}
        </div>
      )}

      {/* Players by Position */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTeam}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {positionOrder.map((position) => {
            const positionPlayers = playersByPosition[position];
            if (positionPlayers.length === 0) return null;

            return (
              <div key={position} className="mb-12 last:mb-0">
                <h3 className="font-display text-xl text-btfc-navy uppercase tracking-wider mb-6 flex items-center gap-4">
                  <span>{positionLabels[position]}</span>
                  <span className="h-px flex-1 bg-btfc-navy/20" />
                  <span className="text-btfc-gold text-sm">
                    {positionPlayers.length}
                  </span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {positionPlayers.map((player, index) => (
                    <motion.div
                      key={player._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <PlayerCard player={player} />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredPlayers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">No players found</p>
        </div>
      )}
    </div>
  );
}

// Simplified grid for homepage preview
interface PlayerPreviewGridProps {
  players: Player[];
  maxPlayers?: number;
}

export function PlayerPreviewGrid({ players, maxPlayers = 5 }: PlayerPreviewGridProps) {
  const displayPlayers = players.slice(0, maxPlayers);

  return (
    <section className="py-16 bg-btfc-navy">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wider mb-4">
              Meet The Squad
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Get to know the players who represent Bollington Town FC on the pitch
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-10">
            {displayPlayers.map((player, index) => (
              <motion.div
                key={player._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PlayerCard player={player} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/squad"
              className="inline-flex items-center gap-2 px-6 py-3 bg-btfc-gold text-btfc-navy font-display uppercase tracking-wider rounded-lg hover:bg-btfc-gold-light transition-colors"
            >
              View Full Squad
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
