import { defineType, defineField } from "sanity";

export default defineType({
  name: "player",
  title: "Player",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "number",
      title: "Squad Number",
      type: "number",
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      options: {
        list: [
          { title: "Goalkeeper", value: "goalkeeper" },
          { title: "Defender", value: "defender" },
          { title: "Midfielder", value: "midfielder" },
          { title: "Forward", value: "forward" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "reference",
      to: [{ type: "team" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "blockContent",
    }),
    defineField({
      name: "dateOfBirth",
      title: "Date of Birth",
      type: "date",
    }),
    defineField({
      name: "nationality",
      title: "Nationality",
      type: "string",
    }),
    defineField({
      name: "joinedDate",
      title: "Date Joined Club",
      type: "date",
    }),
    defineField({
      name: "previousClubs",
      title: "Previous Clubs",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isActive",
      title: "Active Player",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "image",
    },
  },
});
