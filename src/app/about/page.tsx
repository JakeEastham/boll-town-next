import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { sponsorsQuery } from "@/lib/sanity/queries";
import { SponsorBanner } from "@/components/sections";
import type { Sponsor } from "@/types";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bollington Town FC, our history, values, and commitment to community football in Bollington, Macclesfield.",
};

const timelineEvents = [
  {
    year: "2021",
    title: "Club Founded",
    description:
      "Bollington Town FC was established with a vision to bring competitive football to the local community.",
  },
  {
    year: "2022",
    title: "First Season",
    description:
      "The club competed in its first full season in the Cheshire Football League.",
  },
  {
    year: "2023",
    title: "Growing Community",
    description:
      "Strengthened community partnerships and provided more opportunities for local players.",
  },
  {
    year: "2024",
    title: "Building for the Future",
    description:
      "Continued development of youth pathways and community partnerships.",
  },
];

async function getSponsors() {
  return client.fetch<Sponsor[]>(sponsorsQuery);
}

export default async function AboutPage() {
  const sponsors = await getSponsors();
  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-btfc-navy py-16 mb-12">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider">
            About Us
          </h1>
          <p className="text-white/70 mt-4 max-w-xl">
            Bollington Town FC is a community football club dedicated to providing
            high-quality football for players of all abilities.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Mission Statement */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl text-btfc-navy uppercase tracking-wider mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              To provide a welcoming and inclusive environment for players to develop
              their skills, compete at a high level, and be part of a thriving football
              community in Bollington and the surrounding areas.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-btfc-navy uppercase tracking-wider mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-btfc-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-btfc-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mb-3">
                Community
              </h3>
              <p className="text-neutral-600">
                We are at the heart of our local community, bringing people together
                through the beautiful game.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-btfc-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-btfc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mb-3">
                Excellence
              </h3>
              <p className="text-neutral-600">
                We strive for excellence in everything we do, both on and off the pitch.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-btfc-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-btfc-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mb-3">
                Respect
              </h3>
              <p className="text-neutral-600">
                We treat everyone with respect and promote fair play and sportsmanship.
              </p>
            </div>
          </div>
        </section>

        {/* Our Journey Timeline */}
        <section id="journey" className="mb-16">
          <h2 className="font-display text-2xl text-btfc-navy uppercase tracking-wider mb-8 text-center">
            Our Journey
          </h2>
          <div className="relative max-w-2xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-btfc-navy/20" />

            {/* Timeline Events */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex gap-6 pl-4">
                  {/* Year Marker */}
                  <div className="relative z-10 w-8 h-8 bg-btfc-gold rounded-full flex items-center justify-center shrink-0">
                    <span className="sr-only">{event.year}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
                    <span className="text-btfc-gold font-display text-lg">
                      {event.year}
                    </span>
                    <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mt-1 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-neutral-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FA Affiliation */}
        <section className="bg-neutral-50 rounded-xl p-8 text-center">
          <h2 className="font-display text-xl text-btfc-navy uppercase tracking-wider mb-4">
            FA Affiliated Club
          </h2>
          <p className="text-neutral-600 max-w-xl mx-auto">
            Bollington Town FC is an FA affiliated club, committed to the highest
            standards of grassroots football. We follow the FA Respect codes of conduct
            and are dedicated to providing a safe and enjoyable environment for all.
          </p>
        </section>
      </div>

      {/* Sponsor Banner */}
      <div className="mt-16">
        <SponsorBanner sponsors={sponsors || []} />
      </div>
    </div>
  );
}
