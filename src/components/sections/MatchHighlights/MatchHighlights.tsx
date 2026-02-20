"use client";

import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export interface MatchHighlight {
  _id: string;
  date: string;
  opponent: string;
  isHome: boolean;
  homeScore: number;
  awayScore: number;
  reportHeadline?: string;
  reportHeadlineEmphasis?: string;
  veoHighlightUrl: string;
}

interface MatchHighlightsProps {
  highlight: MatchHighlight | null;
  isLatestMatch?: boolean;
}

export function MatchHighlights({ highlight, isLatestMatch = true }: MatchHighlightsProps) {
  if (!highlight) return null;

  const isDirectVideo = highlight.veoHighlightUrl.endsWith(".mp4");
  const matchLabel = `vs ${highlight.opponent} · ${format(new Date(highlight.date), "dd MMM yyyy")}`;

  return (
    <section className="bg-btfc-blue py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Play className="w-4 h-4 text-btfc-gold fill-btfc-gold" />
                <span className="font-display text-btfc-gold text-sm uppercase tracking-widest">
                  {isLatestMatch ? "Highlight Reel" : "Previous Match Highlights"}
                </span>
              </div>
              <p className="text-white/60 text-sm">{matchLabel}</p>
            </div>
            <Link
              href={`/matches/${highlight._id}`}
              className="text-btfc-gold hover:text-white transition-colors text-sm font-medium"
            >
              Match Report →
            </Link>
          </div>

          {/* Video */}
          <div className="rounded-xl overflow-hidden bg-black">
            {isDirectVideo ? (
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full max-h-[520px] block"
              >
                <source src={highlight.veoHighlightUrl} type="video/mp4" />
              </video>
            ) : (
              <iframe
                src={highlight.veoHighlightUrl}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="w-full aspect-video block border-0"
              />
            )}
          </div>

          <p className="text-white/30 text-xs mt-2 text-right">
            Recorded by{" "}
            <a
              href="https://veo.co"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/50 transition-colors"
            >
              Veo
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
