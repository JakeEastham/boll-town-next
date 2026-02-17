"use client";

import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import type { MatchReportPreview } from "@/types";

interface LatestMatchReportProps {
  report: MatchReportPreview | null;
}

export function LatestMatchReport({ report }: LatestMatchReportProps) {
  if (!report) return null;

  const btfcScore = report.isHome ? report.homeScore : report.awayScore;
  const opponentScore = report.isHome ? report.awayScore : report.homeScore;

  const resultType =
    btfcScore > opponentScore ? "win" : btfcScore < opponentScore ? "loss" : "draw";

  const resultColors = {
    win: "from-green-600 to-green-800",
    loss: "from-red-600 to-red-800",
    draw: "from-gray-600 to-gray-800",
  };

  return (
    <section className="py-16 bg-gradient-to-b from-btfc-navy to-btfc-blue">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wider">
              Latest Match Report
            </h2>
            <Link
              href="/matches"
              className="text-btfc-gold hover:text-white transition-colors font-medium"
            >
              View All Results →
            </Link>
          </div>

          <Link href={`/matches/${report._id}`} className="block group">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-btfc-gold/50 transition-all">
              <div className="flex flex-col md:flex-row">
                {/* Score Section */}
                <div
                  className={`bg-gradient-to-br ${resultColors[resultType]} p-6 md:p-8 flex flex-col items-center justify-center md:w-48`}
                >
                  <div className="text-white/70 text-sm mb-2">
                    {format(new Date(report.date), "dd MMM yyyy")}
                  </div>
                  <div className="text-white text-4xl md:text-5xl font-display font-bold">
                    {report.isHome
                      ? `${report.homeScore}-${report.awayScore}`
                      : `${report.awayScore}-${report.homeScore}`}
                  </div>
                  <div className="text-white/80 text-sm mt-2 uppercase tracking-wider">
                    {report.isHome ? "Home" : "Away"}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1">
                  <div className="text-btfc-gold text-sm font-medium mb-2">
                    vs {report.opponent}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-white mb-3 group-hover:text-btfc-gold transition-colors">
                    {report.reportHeadline}{" "}
                    {report.reportHeadlineEmphasis && (
                      <span className="text-btfc-gold">{report.reportHeadlineEmphasis}</span>
                    )}
                  </h3>
                  <p className="text-white/70 line-clamp-2 mb-4">{report.reportIntro}</p>
                  <span className="inline-flex items-center text-btfc-gold font-medium group-hover:translate-x-2 transition-transform">
                    Read Full Report
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
