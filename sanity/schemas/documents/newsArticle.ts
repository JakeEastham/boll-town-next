import { defineType, defineField } from "sanity";

export default defineType({
  name: "newsArticle",
  title: "News Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Brief summary for cards and SEO",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Match Report", value: "match-report" },
          { title: "Club News", value: "club-news" },
          { title: "Transfer News", value: "transfers" },
          { title: "Community", value: "community" },
          { title: "Youth", value: "youth" },
          { title: "Announcements", value: "announcements" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "staffMember" }],
    }),
    defineField({
      name: "relatedPlayers",
      title: "Related Players",
      type: "array",
      of: [{ type: "reference", to: [{ type: "player" }] }],
    }),
    defineField({
      name: "relatedMatch",
      title: "Related Match",
      type: "reference",
      to: [{ type: "match" }],
    }),
    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      description: "Show in hero slider on homepage",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "featuredImage",
      date: "publishedAt",
    },
    prepare({ title, category, media, date }) {
      return {
        title,
        subtitle: `${category} - ${date ? new Date(date).toLocaleDateString() : "Draft"}`,
        media,
      };
    },
  },
});
