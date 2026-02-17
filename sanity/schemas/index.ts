// Document types
import team from "./documents/team";
import player from "./documents/player";
import competition from "./documents/competition";
import match from "./documents/match";
import newsArticle from "./documents/newsArticle";
import staffMember from "./documents/staffMember";
import sponsor from "./documents/sponsor";
import clubDocument from "./documents/clubDocument";
import siteSettings from "./documents/siteSettings";

// Object types
import blockContent from "./objects/blockContent";
import heroSlide from "./objects/heroSlide";
import matchEvent from "./objects/matchEvent";
import matchReportEvent from "./objects/matchReportEvent";
import matchStat from "./objects/matchStat";
import lineupPlayer from "./objects/lineupPlayer";
import socialLink from "./objects/socialLink";
import seo from "./objects/seo";

export const schemaTypes = [
  // Documents
  team,
  player,
  competition,
  match,
  newsArticle,
  staffMember,
  sponsor,
  clubDocument,
  siteSettings,
  // Objects
  blockContent,
  heroSlide,
  matchEvent,
  matchReportEvent,
  matchStat,
  lineupPlayer,
  socialLink,
  seo,
];
