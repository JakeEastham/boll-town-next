"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { NewsCard } from "@/components/ui";
import type { NewsArticle, MatchReportPreview } from "@/types";

const ITEMS_PER_PAGE = 12;

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
  matchReports?: MatchReportPreview[];
  currentCategory?: string;
}

const categories = [
  { value: "all", label: "All News" },
  { value: "match-report", label: "Match Reports" },
  { value: "club-news", label: "Club News" },
  { value: "transfers", label: "Transfers" },
  { value: "announcements", label: "Announcements" },
];

export function NewsListing({ articles, matchReports = [] }: NewsListingProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  // Build the combined items list based on category
  const allItems: Array<{ type: "report"; data: MatchReportPreview } | { type: "article"; data: NewsArticle }> = [];
  if (activeCategory === "all" || activeCategory === "match-report") {
    matchReports.forEach((r) => allItems.push({ type: "report", data: r }));
  }
  if (activeCategory !== "match-report") {
    filteredArticles.forEach((a) => allItems.push({ type: "article", data: a }));
  }

  const totalPages = Math.max(1, Math.ceil(allItems.length / ITEMS_PER_PAGE));
  const paginatedItems = allItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleCategoryChange(value: string) {
    setActiveCategory(value);
    setCurrentPage(1);
  }

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.value
                ? "bg-btfc-gold text-btfc-navy"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      {paginatedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedItems.map((item, index) =>
            item.type === "report" ? (
              <motion.div
                key={item.data._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MatchReportCard report={item.data} />
              </motion.div>
            ) : (
              <motion.div
                key={item.data._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NewsCard article={item.data} />
              </motion.div>
            )
          )}
        </div>
      ) : (
        <p className="text-neutral-500 text-center py-12">
          {activeCategory === "match-report"
            ? "No match reports available yet"
            : activeCategory === "all"
            ? "No content available yet"
            : "No articles found in this category"}
        </p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-btfc-gold text-btfc-navy"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// Match Report Card Component
function MatchReportCard({ report }: { report: MatchReportPreview }) {
  const btfcScore = report.isHome ? report.homeScore : report.awayScore;
  const opponentScore = report.isHome ? report.awayScore : report.homeScore;
  const resultType =
    btfcScore > opponentScore ? "win" : btfcScore < opponentScore ? "loss" : "draw";

  const resultColors = {
    win: "bg-green-500",
    loss: "bg-red-500",
    draw: "bg-yellow-500",
  };

  const resultLabels = {
    win: "W",
    loss: "L",
    draw: "D",
  };

  return (
    <Link
      href={`/matches/${report._id}`}
      className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
    >
      {/* Score Header */}
      <div className="bg-btfc-navy p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-xs uppercase tracking-wider">
            {format(new Date(report.date), "dd MMM yyyy")}
          </span>
          <span
            className={`${resultColors[resultType]} text-white text-xs font-bold px-2 py-0.5 rounded`}
          >
            {resultLabels[resultType]}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-white">
            <p className="font-medium">Bollington Town</p>
            <p className="text-white/70 text-sm">vs {report.opponent}</p>
          </div>
          <div className="text-right">
            <span className="font-display text-3xl text-white">
              {report.isHome
                ? `${report.homeScore}-${report.awayScore}`
                : `${report.awayScore}-${report.homeScore}`}
            </span>
            <p className="text-white/60 text-xs uppercase">
              {report.isHome ? "Home" : "Away"}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg text-btfc-navy mb-2 group-hover:text-btfc-blue transition-colors line-clamp-2">
          {report.reportHeadline}{" "}
          {report.reportHeadlineEmphasis && (
            <span className="text-btfc-gold">{report.reportHeadlineEmphasis}</span>
          )}
        </h3>
        <p className="text-neutral-600 text-sm line-clamp-2">{report.reportIntro}</p>
        <span className="inline-flex items-center text-btfc-gold text-sm font-medium mt-3 group-hover:translate-x-1 transition-transform">
          Read Full Report →
        </span>
      </div>
    </Link>
  );
}
