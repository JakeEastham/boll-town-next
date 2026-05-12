"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { urlFor } from "@/lib/sanity";
import type { Match } from "@/types";

interface NextMatchWidgetProps {
  match: Match | null;
}

export function NextMatchWidget({ match }: NextMatchWidgetProps) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!match) return;

    const matchDate = new Date(match.date);

    const updateCountdown = () => {
      const now = new Date();
      if (matchDate <= now) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: differenceInDays(matchDate, now),
        hours: differenceInHours(matchDate, now) % 24,
        minutes: differenceInMinutes(matchDate, now) % 60,
        seconds: differenceInSeconds(matchDate, now) % 60,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [match]);

  // No upcoming match — season complete
  if (!match) {
    return (
      <section className="py-16 bg-gradient-to-b from-btfc-navy to-btfc-navy-dark overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-btfc-gold text-sm uppercase tracking-widest mb-2">
              2025/26 Season
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wider mb-8">
              Season Complete
            </h2>
            <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10">
              <div className="text-6xl mb-6">🏆</div>
              <p className="text-white text-lg leading-relaxed mb-3">
                That&apos;s a wrap on the 2025/26 season for Bollington Town FC.
              </p>
              <p className="text-white/60 mb-8">
                Stay posted for our pre-season schedule and news ahead of 2026/27.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/matches" variant="primary">
                  View Season Results
                </Button>
                <Button href="/news" variant="outline">
                  Latest News
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const isHome = match.isHome;
  const matchDate = new Date(match.date);

  return (
    <section className="py-16 bg-gradient-to-b from-btfc-navy to-btfc-navy-dark overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Section Header */}
          <p className="text-btfc-gold text-sm uppercase tracking-widest mb-2">
            {match.competition?.name || "League Match"}
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-wider mb-8">
            Next Match
          </h2>

          {/* Match Card */}
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10">
            {/* Teams */}
            <div className="flex items-center justify-between gap-4 md:gap-8 mb-8">
              {/* Home Team */}
              <div className="flex-1 text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {isHome ? (
                    <Image
                      src="/images/logo.png"
                      alt="Bollington Town FC"
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  ) : match.opponentLogo ? (
                    <Image
                      src={urlFor(match.opponentLogo).width(60).height(60).url()}
                      alt={match.opponent}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  ) : (
                    <span className="font-display text-xl text-btfc-navy">
                      {match.opponent.slice(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg md:text-xl text-white uppercase tracking-wide">
                  {isHome ? "Bollington Town" : match.opponent}
                </h3>
                <span className="text-sm text-white/50">{isHome ? "Home" : "Away"}</span>
              </div>

              {/* VS */}
              <div className="text-center">
                <span className="font-display text-3xl md:text-4xl text-btfc-gold">VS</span>
              </div>

              {/* Away Team */}
              <div className="flex-1 text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {!isHome ? (
                    <Image
                      src="/images/logo.png"
                      alt="Bollington Town FC"
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  ) : match.opponentLogo ? (
                    <Image
                      src={urlFor(match.opponentLogo).width(60).height(60).url()}
                      alt={match.opponent}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  ) : (
                    <span className="font-display text-xl text-btfc-navy">
                      {match.opponent.slice(0, 3).toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg md:text-xl text-white uppercase tracking-wide">
                  {!isHome ? "Bollington Town" : match.opponent}
                </h3>
                <span className="text-sm text-white/50">{!isHome ? "Home" : "Away"}</span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="mb-8">
              <p className="text-white text-lg">
                {format(matchDate, "EEEE, MMMM d, yyyy")}
              </p>
              <p className="text-btfc-gold text-2xl font-display">
                {format(matchDate, "HH:mm")} Kick-off
              </p>
              {match.venue && (
                <p className="text-white/50 text-sm mt-2">{match.venue}</p>
              )}
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Mins", value: countdown.minutes },
                { label: "Secs", value: countdown.seconds },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="bg-btfc-navy rounded-lg py-3 px-2 md:py-4 md:px-4 mb-2">
                    <span className="font-display text-2xl md:text-4xl text-white">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs text-white/50 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button href="/matches" variant="primary">
              View All Fixtures
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Recent Results Widget
interface RecentResultsWidgetProps {
  matches: Match[];
}

export function RecentResultsWidget({ matches }: RecentResultsWidgetProps) {
  if (!matches || matches.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-btfc-navy uppercase tracking-wider">
              Recent Results
            </h2>
            <Link
              href="/matches"
              className="text-btfc-blue hover:text-btfc-gold transition-colors text-sm font-medium"
            >
              View All →
            </Link>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.slice(0, 6).map((match) => (
              <ResultCard key={match._id} match={match} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ResultCard({ match }: { match: Match }) {
  const isHome = match.isHome;
  const btfcScore = isHome ? match.homeScore : match.awayScore;
  const opponentScore = isHome ? match.awayScore : match.homeScore;
  const isWin = btfcScore !== undefined && opponentScore !== undefined && btfcScore > opponentScore;
  const isDraw = btfcScore === opponentScore;
  const isLoss = btfcScore !== undefined && opponentScore !== undefined && btfcScore < opponentScore;

  return (
    <Link
      href={`/matches/${match._id}`}
      className="block bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-neutral-500 uppercase tracking-wider">
          {match.competition?.shortName || match.competition?.name}
        </span>
        <div className="flex items-center gap-2">
          {match.hasReport && (
            <span className="text-xs font-medium text-btfc-blue px-2 py-0.5 rounded bg-btfc-blue/10">
              Report
            </span>
          )}
          <span
            className={cn(
              "text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded",
              isWin && "bg-green-100 text-green-800",
              isDraw && "bg-yellow-100 text-yellow-800",
              isLoss && "bg-red-100 text-red-800"
            )}
          >
            {isWin ? "W" : isDraw ? "D" : "L"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="font-medium text-btfc-navy truncate">
            {isHome ? "Bollington Town" : match.opponent}
          </p>
        </div>
        <div className="text-center min-w-[60px]">
          <span className="font-display text-xl text-btfc-navy">
            {match.homeScore} - {match.awayScore}
          </span>
        </div>
        <div className="flex-1 text-right">
          <p className="font-medium text-btfc-navy truncate">
            {!isHome ? "Bollington Town" : match.opponent}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-neutral-500">
          {format(new Date(match.date), "MMM d, yyyy")}
        </p>
        {match.hasReport && (
          <span className="text-xs text-btfc-gold font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
            Read Report →
          </span>
        )}
      </div>
    </Link>
  );
}
