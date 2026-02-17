import { defineType, defineField } from "sanity";

export default defineType({
  name: "matchStat",
  title: "Match Stat",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "e.g., \"5\", \"67%\", \"13+\"",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "e.g., \"Goals Scored\", \"Possession\"",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      value: "value",
      label: "label",
    },
    prepare({ value, label }) {
      return {
        title: `${value} - ${label}`,
      };
    },
  },
});
