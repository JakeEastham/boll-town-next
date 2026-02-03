import { defineType, defineField } from "sanity";

export default defineType({
  name: "matchEvent",
  title: "Match Event",
  type: "object",
  fields: [
    defineField({
      name: "minute",
      title: "Minute",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(120),
    }),
    defineField({
      name: "type",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Goal", value: "goal" },
          { title: "Own Goal", value: "own-goal" },
          { title: "Penalty", value: "penalty" },
          { title: "Missed Penalty", value: "penalty-missed" },
          { title: "Yellow Card", value: "yellow-card" },
          { title: "Red Card", value: "red-card" },
          { title: "Substitution", value: "substitution" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "player",
      title: "Player",
      type: "reference",
      to: [{ type: "player" }],
    }),
    defineField({
      name: "assistedBy",
      title: "Assisted By",
      type: "reference",
      to: [{ type: "player" }],
      hidden: ({ parent }) =>
        parent?.type !== "goal" && parent?.type !== "penalty",
    }),
    defineField({
      name: "replacedPlayer",
      title: "Replaced Player",
      type: "reference",
      to: [{ type: "player" }],
      hidden: ({ parent }) => parent?.type !== "substitution",
    }),
    defineField({
      name: "isOpponentEvent",
      title: "Opponent Event",
      type: "boolean",
      initialValue: false,
      description: "Check if this event is for the opponent team",
    }),
  ],
  preview: {
    select: {
      minute: "minute",
      type: "type",
      playerName: "player.name",
    },
    prepare({ minute, type, playerName }) {
      const typeLabels: Record<string, string> = {
        goal: "Goal",
        "own-goal": "Own Goal",
        penalty: "Penalty",
        "penalty-missed": "Missed Penalty",
        "yellow-card": "Yellow Card",
        "red-card": "Red Card",
        substitution: "Substitution",
      };
      return {
        title: `${minute}' - ${typeLabels[type] || type}`,
        subtitle: playerName || "Unknown player",
      };
    },
  },
});
