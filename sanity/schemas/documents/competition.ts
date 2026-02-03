import { defineType, defineField } from "sanity";

export default defineType({
  name: "competition",
  title: "Competition",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Competition Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short Name",
      type: "string",
      description: "e.g., 'Premier League' -> 'PL'",
    }),
    defineField({
      name: "logo",
      title: "Competition Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "shortName",
      media: "logo",
    },
  },
});
