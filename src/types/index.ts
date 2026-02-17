import type { PortableTextBlock } from "@portabletext/types";

// Sanity Document Types
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// Portable Text type alias
export type BlockContent = PortableTextBlock[];

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

// Team Types
export interface Team extends SanityDocument {
  _type: "team";
  name: string;
  slug: SanitySlug;
  logo?: SanityImage;
  description?: string;
  faFullTimeTeamId?: string;
  faFullTimeDivisionId?: string;
}

// Player Types
export type PlayerPosition = "goalkeeper" | "defender" | "midfielder" | "forward";

export interface Player extends SanityDocument {
  _type: "player";
  name: string;
  slug: SanitySlug;
  number?: number;
  position: PlayerPosition;
  team: Team;
  image?: SanityImage;
  bio?: BlockContent;
  dateOfBirth?: string;
  nationality?: string;
  joinedDate?: string;
  previousClubs?: string[];
  isActive: boolean;
}

// Match Types
export type MatchStatus = "scheduled" | "live" | "halftime" | "fulltime" | "postponed" | "cancelled";
export type MatchEventType = "goal" | "own-goal" | "penalty" | "penalty-missed" | "yellow-card" | "red-card" | "substitution";

export interface MatchEvent {
  _key: string;
  minute: number;
  type: MatchEventType;
  player?: Player;
  assistedBy?: Player;
  replacedPlayer?: Player;
  isOpponentEvent: boolean;
}

export interface Competition extends SanityDocument {
  _type: "competition";
  name: string;
  shortName?: string;
  logo?: SanityImage;
}

export interface Match extends SanityDocument {
  _type: "match";
  date: string;
  competition: Competition;
  team: Team;
  opponent: string;
  opponentLogo?: SanityImage;
  isHome: boolean;
  venue?: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  lineup?: Player[];
  substitutes?: Player[];
  events?: MatchEvent[];
  matchReport?: BlockContent;
  gallery?: SanityImage[];
  faFullTimeId?: string;
  hasReport?: boolean;
}

export interface MatchReportPreview {
  _id: string;
  date: string;
  opponent: string;
  isHome: boolean;
  homeScore: number;
  awayScore: number;
  reportHeadline: string;
  reportHeadlineEmphasis?: string;
  reportIntro: string;
}

// News Types
export type NewsCategory = "match-report" | "club-news" | "transfers" | "youth" | "announcements";

export interface StaffMember extends SanityDocument {
  _type: "staffMember";
  name: string;
  slug: SanitySlug;
  role: string;
  category: "board" | "coaching" | "medical" | "operations";
  team?: Team;
  image?: SanityImage;
  email?: string;
  bio?: BlockContent;
  order?: number;
}

export interface NewsArticle extends SanityDocument {
  _type: "newsArticle";
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  featuredImage: SanityImage;
  category: NewsCategory;
  content: BlockContent;
  publishedAt: string;
  author?: StaffMember;
  relatedPlayers?: Player[];
  relatedMatch?: Match;
  featured: boolean;
  seo?: SEO;
}

// Sponsor Types
export type SponsorTier = "main" | "kit" | "partner" | "community";

export interface Sponsor extends SanityDocument {
  _type: "sponsor";
  name: string;
  logo: SanityImage;
  website?: string;
  tier: SponsorTier;
  order?: number;
  isActive: boolean;
}

// Club Document Types
export interface ClubDocument extends SanityDocument {
  _type: "clubDocument";
  title: string;
  description?: string;
  file: {
    _type: "file";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  category: "constitution" | "policy" | "code-of-conduct" | "other";
  order?: number;
}

// Site Settings Types
export interface HeroSlide {
  _key: string;
  image: SanityImage;
  alt?: string;
}

export interface SocialLink {
  _key: string;
  platform: "facebook" | "twitter" | "instagram" | "youtube" | "tiktok";
  url: string;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface SiteSettings extends SanityDocument {
  _type: "siteSettings";
  siteName: string;
  siteDescription?: string;
  logo: SanityImage;
  favicon?: SanityImage;
  heroSlides?: HeroSlide[];
  socialLinks?: SocialLink[];
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  defaultSeo?: SEO;
}
