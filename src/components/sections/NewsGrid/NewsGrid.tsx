"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NewsCard } from "@/components/ui";
import type { NewsArticle } from "@/types";

interface NewsGridProps {
  articles: NewsArticle[];
  title?: string;
  showViewAll?: boolean;
}

export function NewsGrid({ articles, title = "Latest News", showViewAll = true }: NewsGridProps) {
  if (!articles || articles.length === 0) {
    return (
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl text-btfc-navy uppercase tracking-wider mb-8">
            {title}
          </h2>
          <p className="text-neutral-500">No news articles available</p>
        </div>
      </section>
    );
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1, 5);

  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-btfc-navy uppercase tracking-wider">
              {title}
            </h2>
            {showViewAll && (
              <Link
                href="/news"
                className="text-btfc-blue hover:text-btfc-gold transition-colors text-sm font-medium"
              >
                View All News →
              </Link>
            )}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured Article */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <NewsCard article={featuredArticle} featured />
            </motion.div>

            {/* Other Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherArticles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <NewsCard article={article} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// News listing with filters
interface NewsListingProps {
  articles: NewsArticle[];
  currentCategory?: string;
}

const categories = [
  { value: "all", label: "All News" },
  { value: "match-report", label: "Match Reports" },
  { value: "club-news", label: "Club News" },
  { value: "transfers", label: "Transfers" },
  { value: "announcements", label: "Announcements" },
];

export function NewsListing({ articles, currentCategory = "all" }: NewsListingProps) {
  const filteredArticles =
    currentCategory === "all"
      ? articles
      : articles.filter((a) => a.category === currentCategory);

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Link
            key={category.value}
            href={category.value === "all" ? "/news" : `/news?category=${category.value}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentCategory === category.value
                ? "bg-btfc-gold text-btfc-navy"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {category.label}
          </Link>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NewsCard article={article} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-500 text-center py-12">
          No articles found in this category
        </p>
      )}
    </div>
  );
}
