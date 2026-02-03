import { defineType, defineField } from "sanity";

export default defineType({
  name: "team",
  title: "Team",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Team Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "logo",
      title: "Team Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "faFullTimeTeamId",
      title: "FA Full-Time Team ID",
      type: "string",
      description: "e.g., 312011849 for First Team",
    }),
    defineField({
      name: "faFullTimeDivisionId",
      title: "FA Full-Time Division Season ID",
      type: "string",
      description: "e.g., 80570566",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
});
