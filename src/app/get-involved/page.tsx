import { Metadata } from "next";
import { MapPin, Mail, Users, Heart, Building } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { staffByCategoryQuery, sponsorsQuery } from "@/lib/sanity/queries";
import { StaffCard, Button, ScrollToHash } from "@/components/ui";
import { SponsorBanner } from "@/components/sections";
import type { StaffMember, Sponsor } from "@/types";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join Bollington Town FC as a player, volunteer, or sponsor. Find out how you can be part of our community football club.",
};

async function getPageData() {
  const [boardMembers, sponsors] = await Promise.all([
    client.fetch<StaffMember[]>(staffByCategoryQuery, { category: "board" }),
    client.fetch<Sponsor[]>(sponsorsQuery),
  ]);
  return { boardMembers, sponsors };
}

export default async function GetInvolvedPage() {
  const { boardMembers, sponsors } = await getPageData();

  return (
    <div className="pt-24 pb-16">
      <ScrollToHash />
      {/* Page Header */}
      <div className="bg-btfc-navy py-16 mb-12">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider">
            Get Involved
          </h1>
          <p className="text-white/70 mt-4 max-w-xl">
            There are many ways to be part of Bollington Town FC. Whether you want to
            play, volunteer, or support the club, we&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Ways to Get Involved */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Play */}
            <div id="play" className="bg-white rounded-xl p-8 shadow-md border-t-4 border-btfc-gold">
              <div className="w-14 h-14 bg-btfc-gold/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-btfc-gold" />
              </div>
              <h2 className="font-display text-xl text-btfc-navy uppercase tracking-wider mb-4">
                Play For Us
              </h2>
              <p className="text-neutral-600 mb-6">
                Looking to play competitive football? We&apos;re always looking for talented
                players to join our first team.
              </p>
              <ul className="text-sm text-neutral-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-btfc-gold rounded-full" />
                  First Team - Cheshire League
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-btfc-gold rounded-full" />
                  Regular training sessions with UEFA B Qualified coach
                </li>
              </ul>
              <a
                href="mailto:secretary@bollingtontownfc.co.uk"
                className="text-btfc-blue hover:text-btfc-gold transition-colors font-medium"
              >
                Contact us to join →
              </a>
            </div>

            {/* Volunteer */}
            <div id="volunteer" className="bg-white rounded-xl p-8 shadow-md border-t-4 border-btfc-blue">
              <div className="w-14 h-14 bg-btfc-blue/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-btfc-blue" />
              </div>
              <h2 className="font-display text-xl text-btfc-navy uppercase tracking-wider mb-4">
                Volunteer
              </h2>
              <p className="text-neutral-600 mb-6">
                Help us run the club! We need volunteers for matchdays, events, and
                general club operations. No football experience necessary.
              </p>
              <ul className="text-sm text-neutral-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-btfc-blue rounded-full" />
                  Matchday assistance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-btfc-blue rounded-full" />
                  Social media, Photography & content
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-btfc-blue rounded-full" />
                  Committee roles
                </li>
              </ul>
              <a
                href="mailto:secretary@bollingtontownfc.co.uk"
                className="text-btfc-blue hover:text-btfc-gold transition-colors font-medium"
              >
                Get in touch →
              </a>
            </div>

            {/* Sponsor */}
            <div id="sponsor" className="bg-white rounded-xl p-8 shadow-md border-t-4 border-btfc-navy">
              <div className="w-14 h-14 bg-btfc-navy/10 rounded-full flex items-center justify-center mb-6">
                <Building className="w-7 h-7 text-btfc-navy" />
              </div>
              <h2 className="font-display text-xl text-btfc-navy uppercase tracking-wider mb-4">
                Become a Sponsor
              </h2>
              <p className="text-neutral-600 mb-6">
                Support local football while promoting your business. We offer various
                sponsorship packages to suit different budgets.
              </p>
              <ul className="text-sm text-neutral-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-btfc-navy rounded-full" />
                  Club sponsorship
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-btfc-navy rounded-full" />
                  Player sponsorship
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-btfc-navy rounded-full" />
                  Pitchside advertising
                </li>
              </ul>
              <a
                href="mailto:secretary@bollingtontownfc.co.uk"
                className="text-btfc-blue hover:text-btfc-gold transition-colors font-medium"
              >
                Sponsorship enquiries →
              </a>
            </div>
          </div>
        </section>

        {/* Board Members */}
        {boardMembers && boardMembers.length > 0 && (
          <section id="contact" className="mb-16">
            <h2 className="font-display text-2xl text-btfc-navy uppercase tracking-wider mb-6">
              Club Contacts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {boardMembers.map((member) => (
                <StaffCard
                  key={member._id}
                  name={member.name}
                  role={member.role}
                  email={member.email}
                  imageUrl={member.image ? urlFor(member.image).width(400).height(400).url() : undefined}
                />
              ))}
            </div>
          </section>
        )}

        {/* Location */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-btfc-navy uppercase tracking-wider mb-6">
            Find Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="w-6 h-6 text-btfc-gold shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mb-2">
                      All Hallows Catholic College
                    </h3>
                    <p className="text-neutral-600">
                      Macclesfield<br />
                      Cheshire
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Mail className="w-5 h-5 text-btfc-gold" />
                  <a
                    href="mailto:secretary@bollingtontownfc.co.uk"
                    className="text-btfc-blue hover:text-btfc-gold transition-colors"
                  >
                    secretary@bollingtontownfc.co.uk
                  </a>
                </div>
                <p className="text-sm text-neutral-500">
                  Home matches are played at All Hallows Catholic College. Check the
                  fixtures page for upcoming matches.
                </p>
              </div>
            </div>
            <div className="h-80 lg:h-auto rounded-xl overflow-hidden bg-neutral-200">
              <iframe
                src="https://www.google.com/maps?q=All+Hallows+Catholic+College,+Macclesfield,+Cheshire&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Sponsors */}
      <SponsorBanner sponsors={sponsors || []} />
    </div>
  );
}
