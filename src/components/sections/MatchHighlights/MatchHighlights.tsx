"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import type { Sponsor } from "@/types";

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
  videoSponsor?: Sponsor[] | null;
}

export function MatchHighlights({ highlight, isLatestMatch = true, videoSponsor }: MatchHighlightsProps) {
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

          <div className="flex items-center justify-between mt-3">
            {videoSponsor && videoSponsor.length > 0 ? (
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-xs">Video sponsored by</span>
                {videoSponsor.map((s) =>
                  s.website ? (
                    <a
                      key={s._id}
                      href={s.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      className="bg-white/90 rounded px-2 py-1 opacity-80 hover:opacity-100 transition-opacity"
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
                    <span key={s._id} className="bg-white/90 rounded px-2 py-1 opacity-80">
                      <Image
                        src={urlFor(s.logo).width(120).height(40).url()}
                        alt={s.name}
                        width={60}
                        height={20}
                        className="object-contain"
                      />
                    </span>
                  )
                )}
              </div>
            ) : <span />}
            <p className="text-white/30 text-xs">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
