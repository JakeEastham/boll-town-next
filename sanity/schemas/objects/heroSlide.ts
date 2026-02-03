import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      type: "string",
    }),
    defineField({
      name: "linkedArticle",
      title: "Or Link to Article",
      type: "reference",
      to: [{ type: "newsArticle" }],
      description: "If set, CTA will link to this article instead",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled Slide",
        media,
      };
    },
  },
});
