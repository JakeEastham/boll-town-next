import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { latestNewsQuery, sponsorsQuery } from "@/lib/sanity/queries";
import { NewsListing, SponsorBanner } from "@/components/sections";
import type { NewsArticle, Sponsor } from "@/types";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news, match reports, and announcements from Bollington Town FC.",
};

interface NewsPageProps {
  searchParams: Promise<{ category?: string }>;
}

async function getNewsPageData() {
  const [articles, sponsors] = await Promise.all([
    client.fetch<NewsArticle[]>(latestNewsQuery, { limit: 50 }),
    client.fetch<Sponsor[]>(sponsorsQuery),
  ]);
  return { articles, sponsors };
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const [{ articles, sponsors }, params] = await Promise.all([getNewsPageData(), searchParams]);
  const currentCategory = params.category || "all";

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
        <NewsListing articles={articles || []} currentCategory={currentCategory} />
      </div>

      {/* Sponsor Banner */}
      <div className="mt-16">
        <SponsorBanner sponsors={sponsors || []} />
      </div>
    </div>
  );
}
