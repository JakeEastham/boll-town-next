import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { MatchReport, MatchReportData } from "@/components/sections";
import { groq } from "next-sanity";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const matches = await client.fetch<{ id: string }[]>(
    groq`*[_type == "match" && defined(reportHeadline)]{ "id": _id }`
  );
  if (!matches || matches.length === 0) {
    return [{ id: "_placeholder" }];
  }
  return matches.map((match) => ({ id: match.id }));
}

const matchReportQuery = groq`
  *[_type == "match" && _id == $id][0] {
    _id,
    date,
    kickoff,
    "competition": competition->name,
    opponent,
    isHome,
    venue,
    status,
    homeScore,
    awayScore,
    homeScorers,
    awayScorers,
    reportHeadline,
    reportHeadlineEmphasis,
    reportIntro,
    firstHalfEvents,
    secondHalfEvents,
    matchStats,
    pullQuote,
    matchVerdict,
    veoHighlightUrl,
    homeLineup[] {
      "name": coalesce(player->name, customName),
      badgeType,
      badgeText
    },
    homeSubs[] {
      "name": coalesce(player->name, customName),
      badgeType,
      badgeText
    },
    awayLineup[] {
      "name": coalesce(player->name, customName),
      badgeType,
      badgeText
    },
    awaySubs[] {
      "name": coalesce(player->name, customName),
      badgeType,
      badgeText
    }
  }
`;

const getMatch = cache(async (id: string) => {
  return client.fetch(matchReportQuery, { id });
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const match = await getMatch(id);

  if (!match) {
    return { title: "Match Not Found" };
  }

  const score = `${match.homeScore}-${match.awayScore}`;
  const title = match.isHome
    ? `Bollington Town ${score} ${match.opponent}`
    : `${match.opponent} ${score} Bollington Town`;

  return {
    title: `Match Report | ${title}`,
    description: match.reportIntro || `Match report for ${title}`,
  };
}

export default async function MatchReportPage({ params }: PageProps) {
  const { id } = await params;
  const match = await getMatch(id);

  if (!match || !match.reportHeadline) {
    notFound();
  }

  // Transform Sanity data to MatchReportData format
  const reportData: MatchReportData = {
    competition: match.competition || "League Match",
    date: match.date,
    kickoff: match.kickoff || "15:00",
    venue: match.venue || "TBC",

    homeTeam: match.isHome ? "Bollington Town" : match.opponent,
    awayTeam: match.isHome ? match.opponent : "Bollington Town",
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    isHome: match.isHome,

    homeScorers: match.homeScorers || [],
    awayScorers: match.awayScorers || [],

    headline: match.reportHeadline,
    headlineEmphasis: match.reportHeadlineEmphasis,
    intro: match.reportIntro,

    firstHalfEvents: (match.firstHalfEvents || []).map((e: any) => ({
      minute: e.minute,
      type: e.type,
      title: e.title,
      description: e.description,
    })),

    secondHalfEvents: (match.secondHalfEvents || []).map((e: any) => ({
      minute: e.minute,
      type: e.type,
      title: e.title,
      description: e.description,
    })),

    stats: match.matchStats || [],
    quote: match.pullQuote,
    verdict: match.matchVerdict || [],
    veoHighlightUrl: match.veoHighlightUrl,

    homeLineup: (match.homeLineup || []).map((p: any) => ({
      name: p.name,
      badge: p.badgeType !== "none" && p.badgeText ? {
        type: p.badgeType,
        text: p.badgeText,
      } : undefined,
    })),

    homeSubs: (match.homeSubs || []).map((p: any) => ({
      name: p.name,
      badge: p.badgeType !== "none" && p.badgeText ? {
        type: p.badgeType,
        text: p.badgeText,
      } : undefined,
    })),

    awayLineup: (match.awayLineup || []).map((p: any) => ({
      name: p.name,
      badge: p.badgeType !== "none" && p.badgeText ? {
        type: p.badgeType,
        text: p.badgeText,
      } : undefined,
    })),

    awaySubs: (match.awaySubs || []).map((p: any) => ({
      name: p.name,
      badge: p.badgeType !== "none" && p.badgeText ? {
        type: p.badgeType,
        text: p.badgeText,
      } : undefined,
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${reportData.homeTeam} vs ${reportData.awayTeam}`,
    startDate: match.date,
    location: { "@type": "Place", name: reportData.venue },
    homeTeam: { "@type": "SportsTeam", name: reportData.homeTeam },
    awayTeam: { "@type": "SportsTeam", name: reportData.awayTeam },
    competitor: [
      { "@type": "SportsTeam", name: reportData.homeTeam },
      { "@type": "SportsTeam", name: reportData.awayTeam },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MatchReport data={reportData} />
    </>
  );
}
