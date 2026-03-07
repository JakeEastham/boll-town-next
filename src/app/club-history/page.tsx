"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Star, TrendingUp, Shield, ExternalLink } from "lucide-react";
import { allTimeStats } from "@/data/playerStats";

const seasons = [
  {
    id: "2020-21",
    label: "2020/21",
    title: "The Beginning",
    subtitle: "Inaugural Season",
    competition: "Altrincham & District Amateur Football League",
    narrative: `The 2020/21 season marked the very start of Bollington Town FC's story. With a squad of local players brought together by a shared love of the game, the club made an immediate impression on the Altrincham & District Amateur Football League.\n\nA dominant campaign followed — 14 wins and just one defeat from 16 matches, with 63 goals scored and only 9 conceded. It was a remarkable debut that set the standard for everything that would follow.`,
    stats: [
      { label: "Played", value: "16" },
      { label: "Won", value: "14" },
      { label: "Drawn", value: "1" },
      { label: "Lost", value: "1" },
      { label: "Goals For", value: "63" },
      { label: "Goals Against", value: "9" },
    ],
    highlights: [
      "Club's first competitive season",
      "14 wins from 16 games — a dominant debut campaign",
      "63 goals scored, just 9 conceded",
    ],
    topScorers: [
      { name: "Conor Beaden", goals: 14 },
      { name: "Jack Naylor", goals: 14 },
      { name: "Nathan Edwards", goals: 9 },
      { name: "Beau Gatward", goals: 7 },
      { name: "Zach Gatward", goals: 6 },
    ],
    topAppearances: [
      { name: "Matthew Joyce", apps: 15 },
      { name: "Conor Beaden", apps: 14 },
      { name: "Jake Eastham", apps: 14 },
      { name: "Nathan Edwards", apps: 14 },
      { name: "Declan Hanks", apps: 13 },
    ],
    leagueTableUrl: "https://fulltime.thefa.com/displayTeam.html?divisionseason=320897402&teamID=961018307",
    icon: Trophy,
    accent: "btfc-gold",
  },
  {
    id: "2021-22",
    label: "2021/22",
    title: "Champions — Back-to-Back",
    subtitle: "Second Season",
    competition: "Altrincham & District Amateur Football League — Division One",
    narrative: `Building on a strong debut campaign, Bollington Town returned for 2021/22 with even greater ambition. The squad — many of whom had been with the club from the start — were determined to go one better.\n\nWhat followed was nothing short of remarkable. An almost flawless league record — 16 wins and a single draw from 17 games, finishing the season unbeaten and at the top of Division One. Champions again.\n\nIt was a statement of intent that set the tone for everything that would follow.`,
    stats: [
      { label: "Played", value: "17" },
      { label: "Won", value: "16" },
      { label: "Drawn", value: "1" },
      { label: "Lost", value: "0" },
      { label: "Goals For", value: "61" },
      { label: "Goals Against", value: "20" },
      { label: "Final Position", value: "1st" },
    ],
    highlights: [
      "ADAFL Champions — unbeaten throughout the entire season",
      "Altrincham & District Cup Winners",
      "Beau Gatward top scorer with 9 goals",
    ],
    topScorers: [
      { name: "Beau Gatward", goals: 9 },
      { name: "Conor Beaden", goals: 8 },
      { name: "Nathan Jackson", goals: 7 },
      { name: "Connor Dabbs", goals: 6 },
      { name: "Ethan Barker", goals: 5 },
    ],
    topAppearances: [
      { name: "Matthew Joyce", apps: 15 },
      { name: "Nathan Edwards", apps: 14 },
      { name: "Jake Eastham", apps: 13 },
      { name: "Declan Hanks", apps: 13 },
      { name: "Alexander Howarth", apps: 13 },
    ],
    leagueTableUrl: "https://fulltime.thefa.com/index.html?league=3909304&selectedSeason=564569651&selectedDivision=556402235&selectedCompetition=0&selectedFixtureGroupKey=1_685266626",
    icon: Trophy,
    accent: "btfc-gold",
  },
  {
    id: "2022-23",
    label: "2022/23",
    title: "Establishing Ourselves",
    subtitle: "Third Season",
    competition: "Cheshire Football League — League 2",
    narrative: `Bollington Town stepped up into the Cheshire Football League for the first time in 2022/23. The jump in quality was immediately apparent, but the squad adapted well to the demands of the division throughout the campaign.\n\nA consistent season saw the club win 19 of their 30 league fixtures and finish third in League 2. It was a strong debut at this level — comfortably in the promotion conversation for much of the campaign — and confirmed that the club had the quality and the character to compete at Cheshire Football League level.\n\nThe third-place finish earned promotion to League 1, setting up what would prove to be a defining challenge.`,
    stats: [
      { label: "Played", value: "30" },
      { label: "Won", value: "19" },
      { label: "Drawn", value: "2" },
      { label: "Lost", value: "9" },
      { label: "Goals For", value: "75" },
      { label: "Goals Against", value: "56" },
      { label: "Final Position", value: "3rd" },
    ],
    highlights: [
      "First season in the Cheshire Football League",
      "Finished third — promotion secured to League 1",
      "19 wins from 30 games at a higher level of football",
      "Strong goal difference reflecting attacking intent throughout",
    ],
    topScorers: [
      { name: "Joshua Connolly", goals: 11 },
      { name: "Nathan Jackson", goals: 11 },
      { name: "Jack Naylor", goals: 11 },
      { name: "Conor Beaden", goals: 8 },
      { name: "Ryan Hibbert", goals: 6 },
    ],
    topAppearances: [
      { name: "Alfie Earith", apps: 26 },
      { name: "Matthew Joyce", apps: 26 },
      { name: "Declan Hanks", apps: 25 },
      { name: "Nathan Jackson", apps: 23 },
      { name: "Matthew Nelson", apps: 23 },
    ],
    leagueTableUrl: "https://fulltime.thefa.com/index.html?selectedSeason=266082746&selectedFixtureGroupAgeGroup=0&selectedDivision=629513070&selectedCompetition=0",
    icon: TrendingUp,
    accent: "btfc-blue",
  },
  {
    id: "2023-24",
    label: "2023/24",
    title: "Rising to the Challenge",
    subtitle: "Fourth Season",
    competition: "Cheshire Football League — League 1",
    narrative: `League 1 represented a significant step up in class, and the 2023/24 season tested the squad in ways the previous campaigns had not. The competition was tighter, the margins smaller, and the quality of opposition notably higher across the board.\n\nDespite the challenges, Bollington Town produced a campaign of real substance — winning 20 of 30 matches and conceding just 22 goals across the entire season. The defensive record in particular was outstanding at this level, and showed the tactical maturity the squad had developed.\n\nA seventh-place finish, while not reflecting the total number of wins, demonstrated the club's ability to compete in the top division of the Cheshire Football League and set a platform for the title challenge that would follow.`,
    stats: [
      { label: "Played", value: "30" },
      { label: "Won", value: "20" },
      { label: "Drawn", value: "2" },
      { label: "Lost", value: "8" },
      { label: "Goals For", value: "50" },
      { label: "Goals Against", value: "22" },
      { label: "Points", value: "50" },
      { label: "Final Position", value: "7th" },
    ],
    highlights: [
      "First full season competing in Cheshire Football League 1",
      "Only 22 goals conceded — outstanding defensive record",
      "20 league victories across the campaign",
      "A record deserving of promotion",
    ],
    topScorers: [
      { name: "Joshua Connolly", goals: 20 },
      { name: "Jack Heppell", goals: 15 },
      { name: "Beau Gatward", goals: 9 },
      { name: "Zak James Mousa", goals: 8 },
      { name: "Ryan Hibbert", goals: 7 },
    ],
    topAppearances: [
      { name: "Jack Heppell", apps: 32 },
      { name: "Ryan Hibbert", apps: 32 },
      { name: "Finn Manning", apps: 32 },
      { name: "Joshua Connolly", apps: 31 },
      { name: "Jake Eastham", apps: 31 },
    ],
    leagueTableUrl: "https://fulltime.thefa.com/index.html?selectedSeason=468302204&selectedFixtureGroupAgeGroup=0&selectedDivision=900532629&selectedCompetition=0",
    icon: Shield,
    accent: "btfc-blue",
  },
  {
    id: "2024-25",
    label: "2024/25",
    title: "Champions Again",
    subtitle: "Fifth Season",
    competition: "Cheshire Football League — League 1",
    narrative: `If the 2023/24 season was about proving the club belonged at League 1 level, the 2024/25 campaign was about dominating it. Bollington Town were simply outstanding from start to finish — winning 22 of 30 matches, dropping points in just eight games all season, and finishing as champions with 70 points.\n\nThe goal difference of +59 told the story of a team that was relentless going forward while remaining difficult to break down at the back. It was a performance that drew attention from all within the Cheshire League system.\n\nThe title was the club's biggest achievement to date — claiming the Cheshire Football League League 1 championship and earning promotion. A remarkable testament to the players, the management, and everyone who has been part of the journey.`,
    stats: [
      { label: "Played", value: "30" },
      { label: "Won", value: "22" },
      { label: "Drawn", value: "4" },
      { label: "Lost", value: "4" },
      { label: "Goal Diff", value: "+59" },
      { label: "Points", value: "70" },
      { label: "Final Position", value: "1st" },
    ],
    highlights: [
      "Cheshire Football League 1 Champions",
      "70 points from 30 games — dominant title-winning campaign",
      "Goal difference of +59 across the season",
      "Altrincham & District Cup Winners",
    ],
    topScorers: [
      { name: "Ally Harrison-Virani", goals: 21 },
      { name: "Joshua Connolly", goals: 15 },
      { name: "Matthew Nelson", goals: 12 },
      { name: "Zak James Mousa", goals: 10 },
      { name: "Alfie Earith", goals: 5 },
    ],
    topAppearances: [
      { name: "Matthew Joyce", apps: 32 },
      { name: "Jake Eastham", apps: 31 },
      { name: "Ally Harrison-Virani", apps: 30 },
      { name: "George Richardson", apps: 30 },
      { name: "Zak James Mousa", apps: 26 },
    ],
    leagueTableUrl: "https://fulltime.thefa.com/index.html?selectedSeason=54628403&selectedFixtureGroupAgeGroup=0&selectedDivision=900532629&selectedCompetition=0",
    icon: Trophy,
    accent: "btfc-gold",
  },
  {
    id: "2025-26",
    label: "2025/26",
    title: "Current Season",
    subtitle: "Sixth Season — In Progress",
    competition: "Cheshire Football League",
    narrative: `As champions of League 1, Bollington Town enter the 2025/26 season with their sights set firmly on the next challenge. The squad that delivered last season's title has been retained and strengthened, and the ambition within the club has never been higher.\n\nThe story of this season is still being written. Check the fixtures and results pages for the latest from the campaign..`,
    stats: [
      { label: "Played", value: "22+" },
      { label: "Won", value: "—" },
      { label: "Drawn", value: "—" },
      { label: "Lost", value: "—" },
      { label: "Goal Diff", value: "—" },
      { label: "Points", value: "—" },
      { label: "Final Position", value: "TBD" },
    ],
    highlights: [
      "Season underway — building on last season's title win",
      "Joshua Connolly leading scorer with 11 goals",
      "Squad retained and strengthened ahead of the new challenge",
    ],
    topScorers: [
      { name: "Joshua Connolly", goals: 11 },
      { name: "Alfie Earith", goals: 10 },
      { name: "Zak James Mousa", goals: 5 },
      { name: "Daniel Williams", goals: 4 },
      { name: "George Richardson", goals: 3 },
    ],
    topAppearances: [
      { name: "Jake Eastham", apps: 23 },
      { name: "Beau Gatward", apps: 23 },
      { name: "Alfie Earith", apps: 22 },
      { name: "Matthew Joyce", apps: 21 },
      { name: "Philip Milsom", apps: 20 },
    ],
    leagueTableUrl: "https://fulltime.thefa.com/index.html?selectedSeason=882113536&selectedFixtureGroupAgeGroup=0&selectedDivision=261815174&selectedCompetition=0",
    icon: Star,
    accent: "btfc-gold",
    isCurrent: true,
  },
];

// Computed from src/data/playerStats.ts — all seasons 2020/21 – 2025/26
const allTimeScorers = allTimeStats.byGoals.slice(0, 10);
const allTimeAppearances = allTimeStats.byApps.slice(0, 10);

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center bg-neutral-100 rounded-lg px-3 py-2 min-w-[72px]">
      <span className="font-display text-lg text-btfc-navy leading-none">{value}</span>
      <span className="text-xs text-neutral-500 mt-1 text-center leading-tight">{label}</span>
    </div>
  );
}

export default function ClubHistoryPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-btfc-navy py-16 mb-16">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider">
            Club History
          </h1>
          <p className="text-white/70 mt-4 max-w-xl">
            From humble beginnings in 2020 to competing in the Cheshire Association
            Football League — the story of Bollington Town FC.
          </p>
        </div>
      </div>

      {/* Founded Banner */}
      <div className="container mb-16">
        <div className="relative bg-gradient-to-r from-btfc-blue to-btfc-navy rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/G%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <div className="shrink-0">
              <div className="font-display text-6xl md:text-8xl text-btfc-gold leading-none">
                2020
              </div>
              <div className="text-white/60 text-sm uppercase tracking-widest mt-1">
                Year Founded
              </div>
            </div>
            <div className="md:border-l md:border-white/20 md:pl-8">
              <h2 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wider mb-3">
                Born in Bollington
              </h2>
              <p className="text-white/75 leading-relaxed max-w-2xl">
                Bollington Town FC was established in 2020 with a simple ambition: to create
                a competitive, community-focused football club that the town could be proud of.
                In six short seasons the club has grown from a newly formed side to an
                established presence in the Cheshire Association Football League.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="container">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-neutral-200" aria-hidden="true" />

          <div className="space-y-16">
            {seasons.map((season, index) => {
              const Icon = season.icon;
              return (
                <motion.div
                  key={season.id}
                  id={season.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="relative pl-16 md:pl-24"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-2 top-1 w-12 h-12 rounded-full bg-btfc-navy flex items-center justify-center border-4 border-white shadow-md">
                    <Icon className="w-5 h-5 text-btfc-gold" />
                  </div>

                  {/* Season card */}
                  <div className={`bg-white rounded-2xl shadow-md border border-neutral-100 overflow-hidden ${season.isCurrent ? "ring-2 ring-btfc-gold" : ""}`}>
                    {/* Card header */}
                    <div className="bg-btfc-navy px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-display text-btfc-gold text-2xl tracking-wider">
                            {season.label}
                          </span>
                          {season.isCurrent && (
                            <span className="bg-btfc-gold text-btfc-navy text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl text-white uppercase tracking-wider">
                          {season.title}
                        </h3>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <p className="text-white/50 text-sm leading-snug sm:text-right">
                          {season.competition}
                        </p>
                        {"leagueTableUrl" in season && (
                          <Link
                            href={season.leagueTableUrl as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-btfc-gold hover:text-white transition-colors"
                          >
                            View League Table
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      {/* Narrative */}
                      <div className="mb-8">
                        {season.narrative.split("\n\n").map((para, i) => (
                          <p key={i} className="text-neutral-600 leading-relaxed mb-4 last:mb-0">
                            {para}
                          </p>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Stats */}
                        <div>
                          <h4 className="font-display text-sm text-btfc-navy uppercase tracking-wider mb-4">
                            Season Statistics
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {season.stats.map((stat) => (
                              <StatBadge key={stat.label} label={stat.label} value={stat.value} />
                            ))}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h4 className="font-display text-sm text-btfc-navy uppercase tracking-wider mb-4">
                            Season Highlights
                          </h4>
                          <ul className="space-y-2">
                            {season.highlights.map((h) => (
                              <li key={h} className="flex items-start gap-2 text-sm text-neutral-600">
                                <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-btfc-gold" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Player Stats */}
                      {season.topScorers.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-neutral-100">
                          {season.isCurrent && (
                            <p className="text-xs text-neutral-400 italic mb-4">
                              Statistics up to 7 March 2026. Season in progress.
                            </p>
                          )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Top Scorers */}
                          <div>
                            <h4 className="font-display text-sm text-btfc-navy uppercase tracking-wider mb-3">
                              Top Scorers
                            </h4>
                            <div className="space-y-2">
                              {season.topScorers.map((p, i) => {
                                const isTied = season.topScorers.filter(s => s.goals === p.goals).length > 1;
                                const rank = season.topScorers.findIndex(s => s.goals === p.goals) + 1;
                                return (
                                  <div key={p.name} className="flex items-center gap-3">
                                    <span className="w-6 text-center text-xs font-bold text-neutral-400">
                                      {isTied ? `=${rank}` : i + 1}
                                    </span>
                                    <span className="flex-1 text-sm text-neutral-700">{p.name}</span>
                                    <span className="text-sm font-semibold text-btfc-navy tabular-nums">{p.goals}</span>
                                    <span className="text-xs text-neutral-400">goals</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          {/* Top Appearances */}
                          <div>
                            <h4 className="font-display text-sm text-btfc-navy uppercase tracking-wider mb-3">
                              Most Appearances
                            </h4>
                            <div className="space-y-2">
                              {season.topAppearances.map((p, i) => (
                                <div key={p.name} className="flex items-center gap-3">
                                  <span className="w-5 text-center text-xs font-bold text-neutral-400">{i + 1}</span>
                                  <span className="flex-1 text-sm text-neutral-700">{p.name}</span>
                                  <span className="text-sm font-semibold text-btfc-navy tabular-nums">{p.apps}</span>
                                  <span className="text-xs text-neutral-400">apps</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* All-Time Stats */}
      <div className="container mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-btfc-navy uppercase tracking-wider">
              All-Time Records
            </h2>
            <p className="text-sm text-neutral-400 italic">
              All competitive appearances. Data up to 7 March 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* All-Time Top Scorers */}
            <div className="bg-white rounded-2xl shadow-md border border-neutral-100 overflow-hidden">
              <div className="bg-btfc-navy px-6 py-4">
                <h3 className="font-display text-lg text-white uppercase tracking-wider">
                  Top Scorers
                </h3>
              </div>
              <div className="divide-y divide-neutral-100">
                {allTimeScorers.map((p, i) => {
                  const isTied = allTimeScorers.filter(s => s.goals === p.goals).length > 1;
                  const rank = allTimeScorers.findIndex(s => s.goals === p.goals) + 1;
                  return (
                    <div key={p.name} className="flex items-center gap-4 px-6 py-3">
                      <span className="w-7 text-center text-sm font-bold text-neutral-400">
                        {isTied ? `=${rank}` : i + 1}
                      </span>
                      <span className="flex-1 text-sm font-medium text-neutral-700">{p.name}</span>
                      <span className="text-lg font-display text-btfc-navy tabular-nums">{p.goals}</span>
                      <span className="text-xs text-neutral-400 w-8">goals</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All-Time Most Appearances */}
            <div className="bg-white rounded-2xl shadow-md border border-neutral-100 overflow-hidden">
              <div className="bg-btfc-navy px-6 py-4">
                <h3 className="font-display text-lg text-white uppercase tracking-wider">
                  Most Appearances
                </h3>
              </div>
              <div className="divide-y divide-neutral-100">
                {allTimeAppearances.map((p, i) => {
                  const isTied = allTimeAppearances.filter(s => s.apps === p.apps).length > 1;
                  const rank = allTimeAppearances.findIndex(s => s.apps === p.apps) + 1;
                  return (
                    <div key={p.name} className="flex items-center gap-4 px-6 py-3">
                      <span className="w-7 text-center text-sm font-bold text-neutral-400">
                        {isTied ? `=${rank}` : i + 1}
                      </span>
                      <span className="flex-1 text-sm font-medium text-neutral-700">{p.name}</span>
                      <span className="text-lg font-display text-btfc-navy tabular-nums">{p.apps}</span>
                      <span className="text-xs text-neutral-400 w-8">apps</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/club-history/all-time-stats"
              className="inline-flex items-center gap-2 text-sm text-btfc-blue hover:text-btfc-navy font-medium transition-colors"
            >
              View full all-time stats for all players →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
