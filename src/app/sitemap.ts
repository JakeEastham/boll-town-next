import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bollingtontownfc.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic routes from Sanity
  const [newsArticles, matches] = await Promise.all([
    client.fetch<{ slug: string; updatedAt: string }[]>(
      groq`*[_type == "newsArticle"] | order(publishedAt desc) {
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`
    ),
    client.fetch<{ id: string; updatedAt: string }[]>(
      groq`*[_type == "match" && defined(reportHeadline)] {
        "id": _id,
        "updatedAt": _updatedAt
      }`
    ),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/matches`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/squad`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/get-involved`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/club-documents`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const newsRoutes: MetadataRoute.Sitemap = (newsArticles || []).map(
    (article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  const matchRoutes: MetadataRoute.Sitemap = (matches || []).map((match) => ({
    url: `${baseUrl}/matches/${match.id}`,
    lastModified: new Date(match.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes, ...matchRoutes];
}
