import { defineType, defineField } from "sanity";

export default defineType({
  name: "lineupPlayer",
  title: "Lineup Player",
  type: "object",
  fields: [
    defineField({
      name: "player",
      title: "Player",
      type: "reference",
      to: [{ type: "player" }],
      description: "Select from registered players",
    }),
    defineField({
      name: "customName",
      title: "Custom Name",
      type: "string",
      description: "Use this if player is not in the system (e.g., opponent players)",
    }),
    defineField({
      name: "badgeType",
      title: "Badge Type",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Goal", value: "goal" },
          { title: "Substituted Off", value: "sub" },
          { title: "Substituted On", value: "sub-on" },
          { title: "Yellow Card", value: "yellow" },
          { title: "Red Card", value: "red" },
        ],
      },
      initialValue: "none",
    }),
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      description: "e.g., \"⚽ 10', 24'\", \"Sub 57'\", \"🟨 32'\"",
      hidden: ({ parent }) => parent?.badgeType === "none",
    }),
  ],
  preview: {
    select: {
      playerName: "player.name",
      customName: "customName",
      badgeType: "badgeType",
      badgeText: "badgeText",
    },
    prepare({ playerName, customName, badgeType, badgeText }) {
      const name = playerName || customName || "Unknown";
      const badge = badgeType !== "none" && badgeText ? ` (${badgeText})` : "";
      return {
        title: `${name}${badge}`,
      };
    },
  },
});
