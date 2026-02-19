import { cache } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import { client, urlFor } from "@/lib/sanity";
import { newsArticleBySlugQuery, latestNewsQuery } from "@/lib/sanity/queries";
import { CategoryBadge, NewsCard } from "@/components/ui";
import type { NewsArticle } from "@/types";

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "newsArticle"]{ "slug": slug.current }`
  );
  if (!articles || articles.length === 0) {
    return [{ slug: "_placeholder" }];
  }
  return articles.map((article) => ({ slug: article.slug }));
}

const getArticle = cache(async (slug: string) => {
  return client.fetch<NewsArticle>(newsArticleBySlugQuery, { slug });
});

async function getRelatedNews(excludeId: string) {
  const articles = await client.fetch<NewsArticle[]>(latestNewsQuery, { limit: 4 });
  return articles.filter((a) => a._id !== excludeId).slice(0, 3);
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.featuredImage
        ? [urlFor(article.featuredImage).width(1200).height(630).url()]
        : undefined,
    },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedNews = await getRelatedNews(article._id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    ...(article.featuredImage && {
      image: urlFor(article.featuredImage).width(1200).height(630).url(),
    }),
    datePublished: article.publishedAt,
    ...(article._updatedAt && { dateModified: article._updatedAt }),
    ...(article.author && {
      author: { "@type": "Person", name: article.author.name },
    }),
    publisher: {
      "@type": "SportsTeam",
      name: "Bollington Town FC",
      logo: {
        "@type": "ImageObject",
        url: "https://bollingtontownfc.co.uk/images/logo.png",
      },
    },
  };

  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Image */}
      {article.featuredImage && (
        <div className="relative h-[50vh] md:h-[60vh]">
          <Image
            src={urlFor(article.featuredImage).width(1920).height(1080).url()}
            alt={article.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <article className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <CategoryBadge category={article.category} className="mb-4" />
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-btfc-navy uppercase tracking-wider mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-neutral-500">
              <time dateTime={article.publishedAt}>
                {format(new Date(article.publishedAt), "MMMM d, yyyy")}
              </time>
              {article.author && (
                <>
                  <span>|</span>
                  <span>By {article.author.name}</span>
                </>
              )}
            </div>
          </header>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-neutral-600 leading-relaxed mb-8 border-l-4 border-btfc-gold pl-6">
              {article.excerpt}
            </p>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-a:text-btfc-blue hover:prose-a:text-btfc-gold">
            <PortableText value={article.content} />
          </div>

          {/* Related Players */}
          {article.relatedPlayers && article.relatedPlayers.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mb-4">
                Players Mentioned
              </h3>
              <div className="flex flex-wrap gap-3">
                {article.relatedPlayers.map((player) => (
                  <Link
                    key={player._id}
                    href={`/squad/${player.slug.current}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full hover:bg-btfc-gold hover:text-btfc-navy transition-colors"
                  >
                    {player.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-neutral-500 uppercase tracking-wider mb-4">
              Share this article
            </p>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://bollingtontownfc.co.uk/news/${article.slug.current}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-btfc-gold hover:text-btfc-navy transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://bollingtontownfc.co.uk/news/${article.slug.current}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-btfc-gold hover:text-btfc-navy transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="bg-neutral-50 py-16">
          <div className="container">
            <h2 className="font-display text-2xl text-btfc-navy uppercase tracking-wider mb-8">
              More News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((news) => (
                <NewsCard key={news._id} article={news} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
