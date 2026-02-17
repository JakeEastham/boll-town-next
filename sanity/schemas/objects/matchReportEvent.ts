import { defineType, defineField } from "sanity";

export default defineType({
  name: "matchReportEvent",
  title: "Match Report Event",
  type: "object",
  fields: [
    defineField({
      name: "minute",
      title: "Minute",
      type: "string",
      description: "e.g., \"10'\", \"45+2'\", \"75'-83'\"",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Goal", value: "goal" },
          { title: "Chance", value: "chance" },
          { title: "Save/Block", value: "save" },
          { title: "Opponent Goal", value: "opponent-goal" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      description: "e.g., \"Goal — Daniel Williams\", \"Early Chance\"",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Detailed description of the event. Use **name** for bold player names.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      minute: "minute",
      type: "type",
      title: "title",
    },
    prepare({ minute, type, title }) {
      const icons: Record<string, string> = {
        goal: "⚽",
        chance: "🎯",
        save: "🧤",
        "opponent-goal": "❌",
      };
      return {
        title: `${minute} - ${title}`,
        subtitle: `${icons[type] || ""} ${type}`,
      };
    },
  },
});
