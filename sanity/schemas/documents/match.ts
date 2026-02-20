import { defineType, defineField } from "sanity";

export default defineType({
  name: "match",
  title: "Match",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "result", title: "Result & Scorers" },
    { name: "report", title: "Match Report" },
    { name: "lineups", title: "Lineups" },
    { name: "media", title: "Media" },
  ],
  fields: [
    // === BASIC INFO ===
    defineField({
      name: "date",
      title: "Match Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      group: "basic",
    }),
    defineField({
      name: "kickoff",
      title: "Kick-off Time",
      type: "string",
      description: "e.g., \"14:00\", \"19:45\"",
      group: "basic",
    }),
    defineField({
      name: "competition",
      title: "Competition",
      type: "reference",
      to: [{ type: "competition" }],
      validation: (Rule) => Rule.required(),
      group: "basic",
    }),
    defineField({
      name: "team",
      title: "Our Team",
      type: "reference",
      to: [{ type: "team" }],
      validation: (Rule) => Rule.required(),
      group: "basic",
    }),
    defineField({
      name: "opponent",
      title: "Opponent",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "basic",
    }),
    defineField({
      name: "opponentLogo",
      title: "Opponent Logo",
      type: "image",
      group: "basic",
    }),
    defineField({
      name: "isHome",
      title: "Home Game",
      type: "boolean",
      initialValue: true,
      group: "basic",
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "status",
      title: "Match Status",
      type: "string",
      options: {
        list: [
          { title: "Scheduled", value: "scheduled" },
          { title: "Live", value: "live" },
          { title: "Half Time", value: "halftime" },
          { title: "Full Time", value: "fulltime" },
          { title: "Postponed", value: "postponed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "scheduled",
      group: "basic",
    }),

    // === RESULT & SCORERS ===
    defineField({
      name: "homeScore",
      title: "Home Score",
      type: "number",
      group: "result",
    }),
    defineField({
      name: "awayScore",
      title: "Away Score",
      type: "number",
      group: "result",
    }),
    defineField({
      name: "homeScorers",
      title: "Home Scorers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Player Name", type: "string" },
            {
              name: "minutes",
              title: "Minutes",
              type: "array",
              of: [{ type: "string" }],
              description: "e.g., \"10'\", \"24'\"",
            },
          ],
          preview: {
            select: { name: "name", minutes: "minutes" },
            prepare({ name, minutes }) {
              return {
                title: name,
                subtitle: minutes?.join(", ") || "",
              };
            },
          },
        },
      ],
      group: "result",
    }),
    defineField({
      name: "awayScorers",
      title: "Away Scorers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Player Name", type: "string" },
            {
              name: "minutes",
              title: "Minutes",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: {
            select: { name: "name", minutes: "minutes" },
            prepare({ name, minutes }) {
              return {
                title: name,
                subtitle: minutes?.join(", ") || "",
              };
            },
          },
        },
      ],
      group: "result",
    }),

    // === MATCH REPORT ===
    defineField({
      name: "reportHeadline",
      title: "Report Headline",
      type: "string",
      description: "Main part of headline (e.g., \"Town put five past Middlewich in\")",
      group: "report",
    }),
    defineField({
      name: "reportHeadlineEmphasis",
      title: "Headline Emphasis",
      type: "string",
      description: "Italicized part (e.g., \"comfortable home win\")",
      group: "report",
    }),
    defineField({
      name: "reportIntro",
      title: "Introduction",
      type: "text",
      rows: 3,
      description: "Opening paragraph summarizing the match",
      group: "report",
    }),
    defineField({
      name: "firstHalfEvents",
      title: "First Half Events",
      type: "array",
      of: [{ type: "matchReportEvent" }],
      group: "report",
    }),
    defineField({
      name: "secondHalfEvents",
      title: "Second Half Events",
      type: "array",
      of: [{ type: "matchReportEvent" }],
      group: "report",
    }),
    defineField({
      name: "matchStats",
      title: "Match Stats",
      type: "array",
      of: [{ type: "matchStat" }],
      description: "Key statistics to highlight (max 3-4)",
      group: "report",
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "text",
      rows: 2,
      description: "A highlighted quote from the report",
      group: "report",
    }),
    defineField({
      name: "matchVerdict",
      title: "Match Verdict",
      type: "array",
      of: [{ type: "text" }],
      description: "Final analysis paragraphs. Use **name** for bold.",
      group: "report",
    }),

    // === LINEUPS ===
    defineField({
      name: "homeLineup",
      title: "Home Team Lineup",
      type: "array",
      of: [{ type: "lineupPlayer" }],
      group: "lineups",
    }),
    defineField({
      name: "homeSubs",
      title: "Home Substitutes",
      type: "array",
      of: [{ type: "lineupPlayer" }],
      group: "lineups",
    }),
    defineField({
      name: "awayLineup",
      title: "Away Team Lineup",
      type: "array",
      of: [{ type: "lineupPlayer" }],
      group: "lineups",
    }),
    defineField({
      name: "awaySubs",
      title: "Away Substitutes",
      type: "array",
      of: [{ type: "lineupPlayer" }],
      group: "lineups",
    }),

    // Legacy fields for backwards compatibility
    defineField({
      name: "lineup",
      title: "Starting Lineup (Legacy)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "player" }] }],
      group: "lineups",
      hidden: true,
    }),
    defineField({
      name: "substitutes",
      title: "Substitutes (Legacy)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "player" }] }],
      group: "lineups",
      hidden: true,
    }),
    defineField({
      name: "events",
      title: "Match Events (Legacy)",
      type: "array",
      of: [{ type: "matchEvent" }],
      hidden: true,
    }),
    defineField({
      name: "matchReport",
      title: "Match Report (Legacy)",
      type: "blockContent",
      hidden: true,
    }),

    // === MEDIA ===
    defineField({
      name: "veoHighlightUrl",
      title: "Veo Highlight Reel URL",
      type: "url",
      description: "Paste the Veo CDN video URL (ending in .mp4) or a Veo share/embed URL",
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "Match Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "media",
    }),
    defineField({
      name: "faFullTimeId",
      title: "FA Full-Time Match ID",
      type: "string",
      description: "For linking to FA Full-Time system",
      group: "basic",
    }),
  ],
  orderings: [
    {
      title: "Match Date, New",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      opponent: "opponent",
      date: "date",
      homeScore: "homeScore",
      awayScore: "awayScore",
      isHome: "isHome",
      status: "status",
    },
    prepare({ opponent, date, homeScore, awayScore, isHome, status }) {
      const scoreText =
        homeScore !== undefined && awayScore !== undefined
          ? `${homeScore} - ${awayScore}`
          : "vs";
      const statusIcon = status === "fulltime" ? "✓" : status === "scheduled" ? "📅" : "";
      return {
        title: isHome
          ? `${statusIcon} BTFC ${scoreText} ${opponent}`
          : `${statusIcon} ${opponent} ${scoreText} BTFC`,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date",
      };
    },
  },
});
