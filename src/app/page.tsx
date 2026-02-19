import { client } from "@/lib/sanity";
import {
  siteSettingsQuery,
  nextMatchQuery,
  latestNewsQuery,
  latestMatchReportQuery,
  playersPreviewQuery,
  sponsorsQuery,
} from "@/lib/sanity/queries";
import {
  HeroSlider,
  NextMatchWidget,
  NewsGrid,
  PlayerPreviewGrid,
  SponsorBanner,
  LatestMatchReport,
} from "@/components/sections";
import { Button } from "@/components/ui";
import type { SiteSettings, Match, NewsArticle, Player, Sponsor, MatchReportPreview } from "@/types";

async function getHomePageData() {
  const [siteSettings, nextMatch, latestNews, latestMatchReport, players, sponsors] =
    await Promise.all([
      client.fetch<SiteSettings>(siteSettingsQuery),
      client.fetch<Match>(nextMatchQuery),
      client.fetch<NewsArticle[]>(latestNewsQuery, { limit: 5 }),
      client.fetch<MatchReportPreview>(latestMatchReportQuery),
      client.fetch<Player[]>(playersPreviewQuery),
      client.fetch<Sponsor[]>(sponsorsQuery),
    ]);

  return { siteSettings, nextMatch, latestNews, latestMatchReport, players, sponsors };
}

export default async function HomePage() {
  const { siteSettings, nextMatch, latestNews, latestMatchReport, players, sponsors } =
    await getHomePageData();

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={siteSettings?.heroSlides || []} />

      {/* Next Match */}
      <NextMatchWidget match={nextMatch} />

      {/* Latest Match Report */}
      <LatestMatchReport report={latestMatchReport} />

      {/* Latest News */}
      <NewsGrid articles={latestNews || []} />

      {/* Squad Preview */}
      {players && players.length > 0 && (
        <PlayerPreviewGrid players={players} maxPlayers={5} />
      )}

      {/* Get Involved CTA */}
      <GetInvolvedCTA />

      {/* Sponsors */}
      <SponsorBanner sponsors={sponsors || []} />
    </>
  );
}

function GetInvolvedCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-btfc-blue to-btfc-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl text-white uppercase tracking-wider mb-6">
            Be Part of the Journey
          </h2>
          <p className="text-lg text-white/80 mb-10 leading-relaxed">
            Whether you want to play, volunteer, or support our club, there&apos;s a place
            for you at Bollington Town FC. Join our growing community and help us
            build something special.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/get-involved" size="lg">
              Get Involved
            </Button>
            <Button href="/get-involved#sponsor" variant="outline" size="lg">
              Become a Sponsor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
