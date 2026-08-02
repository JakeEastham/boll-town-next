"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { format, parse, isFuture, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { urlFor } from "@/lib/sanity";
import type { Match, SanityImage } from "@/types";

// Sanity Match, or the lighter shape scraped from FA Full-Time when no
// Sanity match is scheduled
type NextMatch = Pick<Match, "date" | "isHome" | "opponent" | "venue"> &
  Partial<Pick<Match, "opponentLogo" | "competition">>;

interface NextMatchWidgetProps {
  match: NextMatch | null;
}

// BTFC fixtures/results widget lrcode (src/components/sections/FAFullTimeWidget)
const FA_LR_CODE = "621339226";

// ponytail: scrapes FA Full-Time's undocumented widget markup as a fallback
// when no Sanity match is scheduled. Must run client-side — FA's server
// blocks connections from CI/cloud datacenter IPs (confirmed: GitHub Actions'
// build-time fetch to this endpoint hung until ConnectTimeoutError), and the
// endpoint sends no CORS header so even a browser-side fetch() would be
// blocked. A <script src> tag sidesteps CORS the same way FAFullTimeWidget
// already does. If FA changes their markup this just finds nothing and the
// homepage falls back to "Season Complete".
function parseFANextFixture(container: HTMLElement): NextMatch | null {
  const rows = Array.from(container.querySelectorAll("tr"));
  let lastDate: string | null = null;

  for (const row of rows) {
    const style = row.getAttribute("style") || "";
    if (style.includes("#E6FAFF")) {
      lastDate = row.textContent?.replace(/\s+/g, " ").trim() || null;
      continue;
    }
    if (!style.includes("#b3f0ff") || !lastDate) continue;

    const anchors = Array.from(row.querySelectorAll("a")).map(
      (a) => a.textContent?.replace(/\s+/g, " ").trim() || ""
    );
    if (anchors.length < 7) continue;

    const [, home, homeScore, , awayScore, away, venue] = anchors;
    if (homeScore || awayScore) continue; // already played or postponed

    const fixtureDate = parse(lastDate, "EEE dd MMM yyyy HH:mm", new Date());
    if (!isFuture(fixtureDate)) continue;

    const isHome = home === "Bollington Town";
    return {
      opponent: isHome ? away : home,
      isHome,
      date: fixtureDate.toISOString(),
      venue: venue || undefined,
    };
  }
  return null;
}

// Same footprint for both crests so the row aligns; BTFC's badge has its own
// colour and stands on transparent, opponent crests sit on a white disc for contrast.
function TeamCrest({
  isBtfc,
  opponentLogo,
  opponentName,
}: {
  isBtfc: boolean;
  opponentLogo?: SanityImage;
  opponentName: string;
}) {
  if (isBtfc) {
    return (
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 flex items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="Bollington Town FC"
          width={96}
          height={96}
          className="object-contain"
        />
      </div>
    );
  }

  if (!opponentLogo) {
    return (
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 flex items-center justify-center">
        <span className="font-display text-xl text-white">
          {opponentName.slice(0, 3).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
      <Image
        src={urlFor(opponentLogo).width(60).height(60).url()}
        alt={opponentName}
        width={60}
        height={60}
        className="object-contain"
      />
    </div>
  );
}

export function NextMatchWidget({ match }: NextMatchWidgetProps) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [faFixture, setFaFixture] = useState<NextMatch | null>(null);
  const [faChecked, setFaChecked] = useState(false);
  const faContainerRef = useRef<HTMLDivElement>(null);

  // No Sanity match — try to find the next fixture from FA Full-Time instead
  useEffect(() => {
    if (match) return;
    const container = faContainerRef.current;
    if (!container) return;

    (window as unknown as Record<string, string>).lrcode = FA_LR_CODE;
    const script = document.createElement("script");
    script.src = `https://fulltime.thefa.com/client/api/cs1.js?_=${Date.now()}`;
    script.async = false;
    document.body.appendChild(script);

    const observer = new MutationObserver(() => {
      const parsed = parseFANextFixture(container);
      if (parsed) {
        setFaFixture(parsed);
        setFaChecked(true);
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    const timeout = setTimeout(() => {
      observer.disconnect();
      setFaChecked(true);
    }, 8000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
      script.remove();
    };
  }, [match]);

  const effectiveMatch = match || faFixture;
  const isProvisional = !match && !!faFixture;

  useEffect(() => {
    if (!effectiveMatch) return;

    const matchDate = new Date(effectiveMatch.date);

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
  }, [effectiveMatch]);

  // No Sanity match, and still waiting to hear back from FA — avoid flashing
  // "Season Complete" before we know whether a fixture is actually there.
  if (!effectiveMatch && !faChecked) {
    return (
      <section className="py-16 bg-gradient-to-b from-btfc-navy to-btfc-navy-dark overflow-hidden">
        <div ref={faContainerRef} id={`lrep${FA_LR_CODE}`} style={{ display: "none" }} />
        <div className="container text-center">
          <p className="text-white/50 text-sm">Loading next fixture...</p>
        </div>
      </section>
    );
  }

  // No upcoming match — season complete
  if (!effectiveMatch) {
    return (
      <section className="py-16 bg-gradient-to-b from-btfc-navy to-btfc-navy-dark overflow-hidden">
        <div ref={faContainerRef} id={`lrep${FA_LR_CODE}`} style={{ display: "none" }} />
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

  const isHome = effectiveMatch.isHome;
  const matchDate = new Date(effectiveMatch.date);

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
            {effectiveMatch.competition?.name || "League Match"}
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
                <TeamCrest isBtfc={isHome} opponentLogo={effectiveMatch.opponentLogo} opponentName={effectiveMatch.opponent} />
                <h3 className="font-display text-lg md:text-xl text-white uppercase tracking-wide">
                  {isHome ? "Bollington Town" : effectiveMatch.opponent}
                </h3>
                <span className="text-sm text-white/50">{isHome ? "Home" : "Away"}</span>
              </div>

              {/* VS */}
              <div className="text-center">
                <span className="font-display text-3xl md:text-4xl text-btfc-gold">VS</span>
              </div>

              {/* Away Team */}
              <div className="flex-1 text-center">
                <TeamCrest isBtfc={!isHome} opponentLogo={effectiveMatch.opponentLogo} opponentName={effectiveMatch.opponent} />
                <h3 className="font-display text-lg md:text-xl text-white uppercase tracking-wide">
                  {!isHome ? "Bollington Town" : effectiveMatch.opponent}
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
              {effectiveMatch.venue && (
                <p className="text-white/50 text-sm mt-2">{effectiveMatch.venue}</p>
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
            {isProvisional && (
              <p className="text-white/40 text-xs mt-4">
                Via FA Full-Time — details may change
              </p>
            )}
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
