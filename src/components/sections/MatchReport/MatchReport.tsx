"use client";

import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import type { Sponsor } from "@/types";

/** Strip all HTML tags except safe inline formatting */
function sanitizeHtml(html: string): string {
  return html.replace(/<\/?(?!strong|em|b|i|br\s*\/?)[\w\s="'-]+\/?>/gi, "");
}

// Types for match report data
interface Scorer {
  name: string;
  minutes: string[];
}

interface MatchEvent {
  minute: string;
  type: "goal" | "chance" | "save" | "opponent-goal";
  title: string;
  description: string;
  player?: string;
}

interface PlayerLineup {
  name: string;
  badges?: {
    type: "goal" | "sub" | "sub-on" | "yellow" | "red";
    text: string;
  }[];
}

interface MatchStat {
  value: string;
  label: string;
}

export interface MatchReportData {
  // Match info
  competition: string;
  date: string;
  kickoff: string;
  venue: string;

  // Teams and score
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isHome: boolean;

  // Scorers
  homeScorers: Scorer[];
  awayScorers: Scorer[];

  // Report content
  headline: string;
  headlineEmphasis?: string;
  intro: string;

  // Events
  firstHalfEvents: MatchEvent[];
  secondHalfEvents: MatchEvent[];

  // Stats
  stats?: MatchStat[];

  // Quote
  quote?: string;

  // Verdict
  verdict: string[];

  // Lineups
  homeLineup: PlayerLineup[];
  homeSubs: PlayerLineup[];
  awayLineup: PlayerLineup[];
  awaySubs?: PlayerLineup[];

  // Veo highlight reel
  veoHighlightUrl?: string;

  // Video sponsors
  videoSponsor?: Sponsor[] | null;
}

interface MatchReportProps {
  data: MatchReportData;
}

export function MatchReport({ data }: MatchReportProps) {
  const btfcIsHome = data.isHome;

  return (
    <article className="match-report">
      {/* Hero Header */}
      <section className="match-report-hero">
        <div className="match-report-hero-inner">
          <div className="match-report-competition-badge">{data.competition}</div>

          <div className="match-report-fixture-meta">
            <span>{format(new Date(data.date), "dd MMMM yyyy")}</span>
            <span className="match-report-dot" />
            <span>{data.kickoff} KO</span>
            <span className="match-report-dot" />
            <span>{data.venue}</span>
          </div>

          <div className="match-report-scoreline">
            <div className="match-report-team-block home">
              <div className="match-report-team-name">
                {data.homeTeam.split(" ").map((word, i) => (
                  <span key={i}>
                    {word}
                    {i < data.homeTeam.split(" ").length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="match-report-team-label">Home</div>
            </div>

            <div className="match-report-score-block">
              <div className={cn("match-report-score-digit", btfcIsHome ? "btfc" : "opponent")}>
                {data.homeScore}
              </div>
              <div className="match-report-score-sep">–</div>
              <div className={cn("match-report-score-digit", !btfcIsHome ? "btfc" : "opponent")}>
                {data.awayScore}
              </div>
            </div>

            <div className="match-report-team-block away">
              <div className="match-report-team-name">
                {data.awayTeam.split(" ").map((word, i) => (
                  <span key={i}>
                    {word}
                    {i < data.awayTeam.split(" ").length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="match-report-team-label">Away</div>
            </div>
          </div>

          <div className="match-report-scorers-row">
            <div className="match-report-scorer-entry">
              {data.homeScorers.map((scorer, i) => (
                <div key={i}>
                  <strong className={btfcIsHome ? "btfc" : "opponent"}>{scorer.name}</strong>
                  <span>{scorer.minutes.join(", ")}</span>
                </div>
              ))}
            </div>
            <div className="match-report-scorer-entry away">
              {data.awayScorers.map((scorer, i) => (
                <div key={i}>
                  <strong className={!btfcIsHome ? "btfc" : "opponent"}>{scorer.name}</strong>
                  <span>{scorer.minutes.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="match-report-content">
        <p className="match-report-section-label">Match Report</p>
        <h1 className="match-report-headline">
          {data.headline}
          {data.headlineEmphasis && <em> {data.headlineEmphasis}</em>}
        </h1>

        <p className="match-report-intro">{data.intro}</p>

        {/* First Half */}
        <TimelineSection title="First Half" events={data.firstHalfEvents} />

        {/* Stats Strip */}
        {data.stats && data.stats.length > 0 && (
          <div className="match-report-stats-strip">
            {data.stats.map((stat, i) => (
              <div key={i} className="match-report-stat-item">
                <div className="match-report-stat-value">{stat.value}</div>
                <div className="match-report-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Second Half */}
        <TimelineSection title="Second Half" events={data.secondHalfEvents} />

        {/* Quote */}
        {data.quote && (
          <div className="match-report-pull-quote">
            <blockquote>{data.quote}</blockquote>
          </div>
        )}

        {/* Match Verdict */}
        <div className="match-report-narrative">
          <h3>Match Verdict</h3>
          {data.verdict.map((paragraph, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: sanitizeHtml(paragraph) }} />
          ))}
        </div>

        {/* Veo Highlight Reel */}
        {data.veoHighlightUrl && (
          <div className="match-report-veo">
            <p className="match-report-section-label">Highlight Reel</p>
            <h3 className="match-report-veo-title">Watch the Highlights</h3>
            <div className="match-report-veo-player">
              {data.veoHighlightUrl.endsWith(".mp4") ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="match-report-veo-video"
                >
                  <source src={data.veoHighlightUrl} type="video/mp4" />
                </video>
              ) : (
                <iframe
                  src={data.veoHighlightUrl}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="match-report-veo-iframe"
                />
              )}
            </div>
            <div className="match-report-veo-credit">
              {data.videoSponsor && data.videoSponsor.length > 0 && (
                <span className="match-report-veo-sponsor">
                  <span>Video sponsored by</span>
                  {data.videoSponsor.map((s) =>
                    s.website ? (
                      <a
                        key={s._id}
                        href={s.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.name}
                      >
                        <Image
                          src={urlFor(s.logo).width(120).height(40).url()}
                          alt={s.name}
                          width={60}
                          height={20}
                          className="object-contain"
                        />
                      </a>
                    ) : (
                      <Image
                        key={s._id}
                        src={urlFor(s.logo).width(120).height(40).url()}
                        alt={s.name}
                        width={60}
                        height={20}
                        className="object-contain"
                      />
                    )
                  )}
                </span>
              )}
              <span>
                Recorded &amp; produced by{" "}
                <a href="https://veo.co" target="_blank" rel="noopener noreferrer">Veo</a>
              </span>
            </div>
          </div>
        )}

        {/* Lineups */}
        <div className="match-report-lineups">
          <p className="match-report-section-label">Team Lineups</p>
          <div className="match-report-lineups-grid">
            <LineupColumn
              title={data.homeTeam}
              players={data.homeLineup}
              subs={data.homeSubs}
            />
            <div className="match-report-lineup-divider" />
            <LineupColumn
              title={data.awayTeam}
              players={data.awayLineup}
              subs={data.awaySubs}
              isAway
            />
          </div>
        </div>

        {/* Footer */}
        <div className="match-report-footer">
          <div className="match-report-footer-club">Bollington Town FC</div>
          <div className="match-report-footer-note">
            {data.competition} · {format(new Date(data.date), "dd/MM/yyyy")} · {data.venue}
          </div>
        </div>
      </div>
    </article>
  );
}

// Timeline Section Component
function TimelineSection({ title, events }: { title: string; events: MatchEvent[] }) {
  return (
    <div className="match-report-timeline-section">
      <div className="match-report-half-header">
        <div className="match-report-half-title">{title}</div>
        <div className="match-report-half-line" />
      </div>

      <div className="match-report-timeline">
        {events.map((event, i) => (
          <div key={i} className="match-report-event">
            {i < events.length - 1 && <div className="match-report-event-line" />}
            <div className="match-report-event-time-col">
              <div className={cn("match-report-event-dot", event.type)} />
              <div className="match-report-event-minute">{event.minute}</div>
            </div>
            <div className="match-report-event-body">
              <div className={cn("match-report-event-type", event.type)}>{event.title}</div>
              <div
                className="match-report-event-desc"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.description) }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Lineup Column Component
function LineupColumn({
  title,
  players,
  subs,
  isAway,
}: {
  title: string;
  players: PlayerLineup[];
  subs?: PlayerLineup[];
  isAway?: boolean;
}) {
  const getBadgeClass = (type: string) => {
    switch (type) {
      case "goal":
        return "badge-goal";
      case "sub":
      case "sub-on":
        return "badge-sub";
      case "yellow":
        return "badge-yellow";
      case "red":
        return "badge-red";
      default:
        return "";
    }
  };

  return (
    <div className={cn("match-report-lineup-col", isAway && "away")}>
      <h4>{title}</h4>
      <ul className="match-report-player-list">
        {players.map((player, i) => (
          <li key={i}>
            <span className="pname">{player.name}</span>
            {player.badges?.map((badge, j) => (
              <span key={j} className={cn("pbadge", getBadgeClass(badge.type))}>
                {badge.text}
              </span>
            ))}
          </li>
        ))}
      </ul>

      {subs && subs.length > 0 && (
        <>
          <div className="match-report-subs-label">Substitutes</div>
          <ul className="match-report-player-list">
            {subs.map((player, i) => (
              <li key={i}>
                <span className="pname">{player.name}</span>
                {player.badges?.map((badge, j) => (
                  <span key={j} className={cn("pbadge", getBadgeClass(badge.type))}>
                    {badge.text}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
