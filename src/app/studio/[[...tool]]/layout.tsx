import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";

export const metadata = {
  ...studioMetadata,
  title: "Sanity Studio | Bollington Town FC",
};

export const viewport = studioViewport;

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
