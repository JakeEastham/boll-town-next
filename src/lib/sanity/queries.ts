import { groq } from "next-sanity";

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logo,
    favicon,
    heroSlides[] {
      _key,
      image,
      alt
    },
    socialLinks[] {
      _key,
      platform,
      url
    },
    contactEmail,
    contactPhone,
    address,
    defaultSeo
  }
`;

// Teams
export const teamsQuery = groq`
  *[_type == "team"] | order(name asc) {
    _id,
    name,
    slug,
    logo,
    description,
    faFullTimeTeamId,
    faFullTimeDivisionId
  }
`;

export const teamBySlugQuery = groq`
  *[_type == "team" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    logo,
    description,
    faFullTimeTeamId,
    faFullTimeDivisionId
  }
`;

// Players
export const playersQuery = groq`
  *[_type == "player" && isActive == true] | order(number asc) {
    _id,
    name,
    slug,
    number,
    position,
    team-> {
      _id,
      name,
      slug
    },
    image,
    nationality
  }
`;

export const playersByTeamQuery = groq`
  *[_type == "player" && isActive == true && team->slug.current == $teamSlug] | order(position asc, number asc) {
    _id,
    name,
    slug,
    number,
    position,
    team-> {
      _id,
      name,
      slug
    },
    image,
    nationality
  }
`;

export const playerBySlugQuery = groq`
  *[_type == "player" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    number,
    position,
    team-> {
      _id,
      name,
      slug
    },
    image,
    bio,
    dateOfBirth,
    nationality,
    joinedDate,
    previousClubs,
    isActive
  }
`;

// Matches
export const upcomingMatchesQuery = groq`
  *[_type == "match" && status == "scheduled" && date > now()] | order(date asc) [0...10] {
    _id,
    date,
    competition-> {
      _id,
      name,
      shortName,
      logo
    },
    team-> {
      _id,
      name,
      slug,
      logo
    },
    opponent,
    opponentLogo,
    isHome,
    venue,
    status
  }
`;

export const recentResultsQuery = groq`
  *[_type == "match" && status == "fulltime"] | order(date desc) [0...10] {
    _id,
    date,
    competition-> {
      _id,
      name,
      shortName,
      logo
    },
    team-> {
      _id,
      name,
      slug,
      logo
    },
    opponent,
    opponentLogo,
    isHome,
    homeScore,
    awayScore,
    status
  }
`;

export const nextMatchQuery = groq`
  *[_type == "match" && status == "scheduled" && date > now()] | order(date asc) [0] {
    _id,
    date,
    competition-> {
      _id,
      name,
      shortName,
      logo
    },
    team-> {
      _id,
      name,
      slug,
      logo
    },
    opponent,
    opponentLogo,
    isHome,
    venue
  }
`;

export const matchByIdQuery = groq`
  *[_type == "match" && _id == $id][0] {
    _id,
    date,
    competition-> {
      _id,
      name,
      shortName,
      logo
    },
    team-> {
      _id,
      name,
      slug,
      logo
    },
    opponent,
    opponentLogo,
    isHome,
    venue,
    status,
    homeScore,
    awayScore,
    lineup[]-> {
      _id,
      name,
      number,
      position
    },
    substitutes[]-> {
      _id,
      name,
      number,
      position
    },
    events[] {
      _key,
      minute,
      type,
      player-> {
        _id,
        name,
        number
      },
      assistedBy-> {
        _id,
        name
      },
      replacedPlayer-> {
        _id,
        name
      },
      isOpponentEvent
    },
    matchReport,
    gallery,
    faFullTimeId
  }
`;

// News Articles
export const latestNewsQuery = groq`
  *[_type == "newsArticle"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    publishedAt,
    author-> {
      _id,
      name,
      image
    },
    featured
  }
`;

export const featuredNewsQuery = groq`
  *[_type == "newsArticle" && featured == true] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    publishedAt
  }
`;

export const newsByCategoryQuery = groq`
  *[_type == "newsArticle" && category == $category] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    publishedAt,
    author-> {
      _id,
      name,
      image
    }
  }
`;

export const newsArticleBySlugQuery = groq`
  *[_type == "newsArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    content,
    publishedAt,
    author-> {
      _id,
      name,
      role,
      image
    },
    relatedPlayers[]-> {
      _id,
      name,
      slug,
      image,
      position
    },
    relatedMatch-> {
      _id,
      date,
      opponent,
      homeScore,
      awayScore
    },
    seo
  }
`;

// Staff Members
export const staffMembersQuery = groq`
  *[_type == "staffMember"] | order(order asc) {
    _id,
    name,
    slug,
    role,
    category,
    team-> {
      _id,
      name
    },
    image,
    email
  }
`;

export const staffByCategoryQuery = groq`
  *[_type == "staffMember" && category == $category] | order(order asc) {
    _id,
    name,
    slug,
    role,
    image,
    email
  }
`;

// Sponsors
export const sponsorsQuery = groq`
  *[_type == "sponsor" && isActive == true] | order(tier asc, order asc) {
    _id,
    name,
    logo,
    website,
    tier
  }
`;

// Club Documents
export const clubDocumentsQuery = groq`
  *[_type == "clubDocument"] | order(category asc, order asc) {
    _id,
    title,
    description,
    "fileUrl": file.asset->url,
    category
  }
`;
