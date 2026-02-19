import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { latestNewsQuery, allMatchReportsQuery, sponsorsQuery } from "@/lib/sanity/queries";
import { NewsListing, SponsorBanner } from "@/components/sections";
import type { NewsArticle, Sponsor, MatchReportPreview } from "@/types";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news, match reports, and announcements from Bollington Town FC.",
};

async function getNewsPageData() {
  const [articles, matchReports, sponsors] = await Promise.all([
    client.fetch<NewsArticle[]>(latestNewsQuery, { limit: 50 }),
    client.fetch<MatchReportPreview[]>(allMatchReportsQuery),
    client.fetch<Sponsor[]>(sponsorsQuery),
  ]);
  return { articles, matchReports, sponsors };
}

export default async function NewsPage() {
  const { articles, matchReports, sponsors } = await getNewsPageData();
  const currentCategory = "all";

  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-btfc-navy py-16 mb-12">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider">
            News
          </h1>
          <p className="text-white/70 mt-4 max-w-xl">
            Stay up to date with the latest news, match reports, and announcements
            from Bollington Town FC.
          </p>
        </div>
      </div>

      {/* News Listing */}
      <div className="container">
        <NewsListing
          articles={articles || []}
          matchReports={matchReports || []}
          currentCategory={currentCategory}
        />
      </div>

      {/* Sponsor Banner */}
      <div className="mt-16">
        <SponsorBanner sponsors={sponsors || []} />
      </div>
    </div>
  );
}
