import { defineType, defineField } from "sanity";

export default defineType({
  name: "match",
  title: "Match",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Match Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "competition",
      title: "Competition",
      type: "reference",
      to: [{ type: "competition" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "team",
      title: "Our Team",
      type: "reference",
      to: [{ type: "team" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "opponent",
      title: "Opponent",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "opponentLogo",
      title: "Opponent Logo",
      type: "image",
    }),
    defineField({
      name: "isHome",
      title: "Home Game",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
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
    }),
    defineField({
      name: "homeScore",
      title: "Home Score",
      type: "number",
    }),
    defineField({
      name: "awayScore",
      title: "Away Score",
      type: "number",
    }),
    defineField({
      name: "lineup",
      title: "Starting Lineup",
      type: "array",
      of: [{ type: "reference", to: [{ type: "player" }] }],
    }),
    defineField({
      name: "substitutes",
      title: "Substitutes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "player" }] }],
    }),
    defineField({
      name: "events",
      title: "Match Events",
      type: "array",
      of: [{ type: "matchEvent" }],
    }),
    defineField({
      name: "matchReport",
      title: "Match Report",
      type: "blockContent",
    }),
    defineField({
      name: "gallery",
      title: "Match Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "faFullTimeId",
      title: "FA Full-Time Match ID",
      type: "string",
      description: "For linking to FA Full-Time system",
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
    },
    prepare({ opponent, date, homeScore, awayScore, isHome }) {
      const scoreText =
        homeScore !== undefined ? `${homeScore} - ${awayScore}` : "vs";
      return {
        title: isHome
          ? `BTFC ${scoreText} ${opponent}`
          : `${opponent} ${scoreText} BTFC`,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date",
      };
    },
  },
});
