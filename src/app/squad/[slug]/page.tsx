import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { groq } from "next-sanity";
import { client, urlFor } from "@/lib/sanity";
import { playerBySlugQuery } from "@/lib/sanity/queries";
import { PositionBadge, Button } from "@/components/ui";
import type { Player } from "@/types";

interface PlayerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const players = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "player" && isActive == true]{ "slug": slug.current }`
  );
  if (!players || players.length === 0) {
    return [{ slug: "_placeholder" }];
  }
  return players.map((player) => ({ slug: player.slug }));
}

async function getPlayer(slug: string) {
  return client.fetch<Player>(playerBySlugQuery, { slug });
}

export async function generateMetadata({
  params,
}: PlayerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = await getPlayer(slug);

  if (!player) {
    return { title: "Player Not Found" };
  }

  return {
    title: player.name,
    description: `${player.name} - ${player.position} for Bollington Town FC`,
    openGraph: {
      title: `${player.name} | Bollington Town FC`,
      description: `${player.position} for Bollington Town FC`,
      images: player.image
        ? [urlFor(player.image).width(600).height(800).url()]
        : undefined,
    },
  };
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { slug } = await params;
  const player = await getPlayer(slug);

  if (!player) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16">
      {/* Back Link */}
      <div className="container py-4">
        <Link
          href="/squad"
          className="inline-flex items-center gap-2 text-btfc-blue hover:text-btfc-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Squad
        </Link>
      </div>

      {/* Player Profile */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Player Image */}
          <div className="relative aspect-[3/4] bg-gradient-to-b from-btfc-navy to-btfc-navy-dark rounded-2xl overflow-hidden">
            {player.image ? (
              <Image
                src={urlFor(player.image).width(600).height(800).url()}
                alt={player.name}
                fill
                className="object-cover object-top"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl font-display text-white/20">
                  {player.number || "?"}
                </span>
              </div>
            )}

            {/* Number Overlay */}
            {player.number && (
              <div className="absolute top-8 right-8">
                <span className="text-8xl font-display text-white/20">
                  {player.number}
                </span>
              </div>
            )}
          </div>

          {/* Player Info */}
          <div>
            <PositionBadge position={player.position} className="mb-4" />
            <h1 className="font-display text-4xl md:text-5xl text-btfc-navy uppercase tracking-wider mb-2">
              {player.name}
            </h1>
            {player.number && (
              <p className="text-2xl text-btfc-gold font-display mb-6">
                #{player.number}
              </p>
            )}

            {/* Player Details */}
            <div className="space-y-4 mb-8">
              {player.nationality && (
                <div className="flex items-center gap-4">
                  <span className="text-neutral-500 w-32">Nationality</span>
                  <span className="font-medium">{player.nationality}</span>
                </div>
              )}
              {player.dateOfBirth && (
                <div className="flex items-center gap-4">
                  <span className="text-neutral-500 w-32">Date of Birth</span>
                  <span className="font-medium">
                    {format(new Date(player.dateOfBirth), "MMMM d, yyyy")}
                  </span>
                </div>
              )}
              {player.joinedDate && (
                <div className="flex items-center gap-4">
                  <span className="text-neutral-500 w-32">Joined</span>
                  <span className="font-medium">
                    {format(new Date(player.joinedDate), "MMMM yyyy")}
                  </span>
                </div>
              )}
              {player.team && (
                <div className="flex items-center gap-4">
                  <span className="text-neutral-500 w-32">Team</span>
                  <span className="font-medium">{player.team.name}</span>
                </div>
              )}
            </div>

            {/* Previous Clubs */}
            {player.previousClubs && player.previousClubs.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mb-3">
                  Previous Clubs
                </h3>
                <div className="flex flex-wrap gap-2">
                  {player.previousClubs.map((club, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-100 rounded-full text-sm"
                    >
                      {club}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Biography */}
            {player.bio && (
              <div className="prose prose-lg max-w-none">
                <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mb-3">
                  About
                </h3>
                <PortableText value={player.bio} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
