import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CategoryBadge, PositionBadge, StatusBadge } from "../Badge/Badge";
import type { NewsArticle, Player, Match } from "@/types";
import { urlFor } from "@/lib/sanity";

// Base Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function Card({ children, className, href }: CardProps) {
  const cardContent = (
    <div
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block group">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

// News Card Component
interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  return (
    <Card href={`/news/${article.slug.current}`}>
      <div className={cn("relative", featured ? "aspect-[16/9]" : "aspect-[3/2]")}>
        {article.featuredImage && (
          <Image
            src={urlFor(article.featuredImage).width(800).height(featured ? 450 : 533).url()}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-4 left-4">
          <CategoryBadge category={article.category} />
        </div>
      </div>
      <div className={cn("p-5", featured && "p-6")}>
        <h3
          className={cn(
            "font-display uppercase tracking-wide text-btfc-navy group-hover:text-btfc-blue transition-colors line-clamp-2",
            featured ? "text-2xl mb-3" : "text-lg mb-2"
          )}
        >
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-neutral-600 line-clamp-2 mb-3">{article.excerpt}</p>
        )}
        <time className="text-sm text-neutral-500">
          {format(new Date(article.publishedAt), "MMMM d, yyyy")}
        </time>
      </div>
    </Card>
  );
}

// Player Card Component
interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Card href={`/squad/${player.slug.current}`}>
      <div className="relative aspect-[3/4] bg-gradient-to-b from-btfc-navy to-btfc-navy-dark">
        {player.image ? (
          <Image
            src={urlFor(player.image).width(400).height(533).url()}
            alt={player.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-display text-white/20">
              {player.number || "?"}
            </span>
          </div>
        )}

        {/* Position Label - Rotated */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4">
          <span className="block -rotate-90 origin-center text-xs font-bold uppercase tracking-widest text-white/50">
            {player.position}
          </span>
        </div>

        {/* Squad Number */}
        {player.number && (
          <div className="absolute top-4 right-4">
            <span className="text-4xl font-display text-white/30">
              {player.number}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Player Info */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <PositionBadge position={player.position} className="mb-2" />
          <h3 className="font-display text-xl text-white uppercase tracking-wide">
            {player.name}
          </h3>
        </div>
      </div>
    </Card>
  );
}

// Match Card Component
interface MatchCardProps {
  match: Match;
  variant?: "upcoming" | "result";
}

export function MatchCard({ match, variant = "upcoming" }: MatchCardProps) {
  const isHome = match.isHome;
  const btfcFirst = isHome;

  return (
    <Card href={`/matches/${match._id}`} className="p-4">
      {/* Competition & Date */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-neutral-500 uppercase tracking-wider">
          {match.competition?.shortName || match.competition?.name}
        </span>
        <StatusBadge status={match.status} />
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-4">
        {/* Home Team */}
        <div className="flex-1 text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-neutral-100 rounded-full flex items-center justify-center">
            {btfcFirst ? (
              <span className="font-display text-sm text-btfc-navy">BTFC</span>
            ) : (
              <span className="font-display text-sm text-neutral-600">
                {match.opponent.slice(0, 3).toUpperCase()}
              </span>
            )}
          </div>
          <p className="text-sm font-medium truncate">
            {btfcFirst ? "Bollington Town" : match.opponent}
          </p>
        </div>

        {/* Score / Time */}
        <div className="text-center min-w-[80px]">
          {variant === "result" && match.homeScore !== undefined ? (
            <div className="text-2xl font-display">
              {match.homeScore} - {match.awayScore}
            </div>
          ) : (
            <>
              <div className="text-lg font-display">
                {format(new Date(match.date), "HH:mm")}
              </div>
              <div className="text-xs text-neutral-500">
                {format(new Date(match.date), "MMM d")}
              </div>
            </>
          )}
        </div>

        {/* Away Team */}
        <div className="flex-1 text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-neutral-100 rounded-full flex items-center justify-center">
            {!btfcFirst ? (
              <span className="font-display text-sm text-btfc-navy">BTFC</span>
            ) : (
              <span className="font-display text-sm text-neutral-600">
                {match.opponent.slice(0, 3).toUpperCase()}
              </span>
            )}
          </div>
          <p className="text-sm font-medium truncate">
            {!btfcFirst ? "Bollington Town" : match.opponent}
          </p>
        </div>
      </div>

      {/* Venue */}
      {match.venue && (
        <p className="text-xs text-neutral-500 text-center mt-4 truncate">
          {match.venue}
        </p>
      )}
    </Card>
  );
}

// Document Card Component
interface DocumentCardProps {
  title: string;
  description?: string;
  fileUrl: string;
  category: string;
}

export function DocumentCard({ title, description, fileUrl, category }: DocumentCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-btfc-navy/10 rounded-lg flex items-center justify-center shrink-0">
          <svg
            className="w-6 h-6 text-btfc-navy"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
            {category.replace(/-/g, " ")}
          </p>
          <h3 className="font-display text-btfc-navy uppercase tracking-wide mb-1 truncate">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-neutral-600 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
      <a
        href={fileUrl}
        download
        className="mt-4 inline-flex items-center gap-2 text-sm text-btfc-blue hover:text-btfc-gold transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download PDF
      </a>
    </div>
  );
}

// Staff Card Component
interface StaffCardProps {
  name: string;
  role: string;
  email?: string;
  imageUrl?: string;
}

export function StaffCard({ name, role, email, imageUrl }: StaffCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="relative aspect-square bg-gradient-to-b from-btfc-navy to-btfc-navy-dark">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl font-display text-white/20">
              {name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 text-center">
        <h3 className="font-display text-btfc-navy uppercase tracking-wide">{name}</h3>
        <p className="text-sm text-neutral-600 mb-2">{role}</p>
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-sm text-btfc-blue hover:text-btfc-gold transition-colors"
          >
            {email}
          </a>
        )}
      </div>
    </div>
  );
}
