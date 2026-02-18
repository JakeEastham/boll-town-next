"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import type { Sponsor } from "@/types";

interface SponsorCarouselProps {
  sponsors: Sponsor[];
}

export function SponsorCarousel({ sponsors }: SponsorCarouselProps) {
  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  // Group sponsors by tier
  const mainSponsors = sponsors.filter((s) => s.tier === "main" || s.tier === "kit");
  const otherSponsors = sponsors.filter((s) => s.tier !== "main" && s.tier !== "kit");

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl md:text-3xl text-btfc-navy uppercase tracking-wider text-center mb-4">
            Our Partners
          </h2>
          <p className="text-neutral-600 text-center mb-10 max-w-xl mx-auto">
            Thank you to our sponsors and partners who support Bollington Town FC
          </p>

          {/* Main Sponsors */}
          {mainSponsors.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-8 mb-10">
              {mainSponsors.map((sponsor) => (
                <SponsorLogo key={sponsor._id} sponsor={sponsor} size="large" />
              ))}
            </div>
          )}

          {/* Other Sponsors */}
          {otherSponsors.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-6">
              {otherSponsors.map((sponsor) => (
                <SponsorLogo key={sponsor._id} sponsor={sponsor} size="small" />
              ))}
            </div>
          )}

          {/* Become a Sponsor CTA */}
          <div className="text-center mt-10">
            <Link
              href="/get-involved#sponsor"
              className="text-btfc-blue hover:text-btfc-gold transition-colors text-sm font-medium"
            >
              Become a Sponsor →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface SponsorLogoProps {
  sponsor: Sponsor;
  size?: "small" | "large";
}

function SponsorLogo({ sponsor, size = "small" }: SponsorLogoProps) {
  const dimensions = size === "large" ? { width: 180, height: 80 } : { width: 120, height: 60 };

  const content = (
    <div
      className={`relative grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 ${
        size === "large" ? "p-4" : "p-2"
      }`}
    >
      <Image
        src={urlFor(sponsor.logo).width(dimensions.width * 2).height(dimensions.height * 2).url()}
        alt={sponsor.name}
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
      />
    </div>
  );

  if (sponsor.website) {
    return (
      <a
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        title={sponsor.name}
      >
        {content}
      </a>
    );
  }

  return content;
}

// Simplified version for footer
interface SponsorStripProps {
  sponsors: Sponsor[];
}

export function SponsorStrip({ sponsors }: SponsorStripProps) {
  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  return (
    <div className="py-6 border-t border-white/10">
      <div className="container">
        <div className="flex flex-wrap justify-center items-center gap-6">
          {sponsors.slice(0, 6).map((sponsor) => (
            <div key={sponsor._id} className="opacity-50 hover:opacity-100 transition-opacity">
              <Image
                src={urlFor(sponsor.logo).width(80).height(40).url()}
                alt={sponsor.name}
                width={80}
                height={40}
                className="object-contain brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Banner version for subpages
interface SponsorBannerProps {
  sponsors: Sponsor[];
}

export function SponsorBanner({ sponsors }: SponsorBannerProps) {
  // Get main sponsors first, then others
  const mainSponsors = (sponsors || []).filter((s) => s.tier === "main" || s.tier === "kit");
  const otherSponsors = (sponsors || []).filter((s) => s.tier !== "main" && s.tier !== "kit");
  const displaySponsors = [...mainSponsors, ...otherSponsors].slice(0, 6);

  return (
    <section className="py-10 bg-neutral-100 border-y border-neutral-200">
      <div className="container">
        <div className="text-center mb-6">
          <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider">
            Proudly Supported By
          </h3>
        </div>
        {displaySponsors.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {displaySponsors.map((sponsor) => {
              const logoContent = (
                <div className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                  <Image
                    src={urlFor(sponsor.logo).width(240).height(100).url()}
                    alt={sponsor.name}
                    width={120}
                    height={50}
                    className="object-contain"
                  />
                </div>
              );

              if (sponsor.website) {
                return (
                  <a
                    key={sponsor._id}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={sponsor.name}
                  >
                    {logoContent}
                  </a>
                );
              }

              return (
                <div key={sponsor._id}>
                  {logoContent}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-neutral-500">
            Interested in sponsoring Bollington Town FC?
          </p>
        )}
        <div className="text-center mt-6">
          <Link
            href="/get-involved#sponsor"
            className="text-btfc-blue hover:text-btfc-gold transition-colors text-sm"
          >
            Become a sponsor →
          </Link>
        </div>
      </div>
    </section>
  );
}
