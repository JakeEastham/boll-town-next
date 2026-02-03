import { Metadata } from "next";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Bollington Town FC community initiatives and programs. We are committed to making a positive impact in Bollington and surrounding areas.",
};

export default function CommunityPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-btfc-navy py-16 mb-12">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider">
            Community
          </h1>
          <p className="text-white/70 mt-4 max-w-xl">
            We believe football has the power to bring people together and make a
            positive impact in our community.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Community Focus */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl text-btfc-navy uppercase tracking-wider mb-6">
              More Than a Football Club
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              At Bollington Town FC, we&apos;re committed to being at the heart of our
              local community. We believe that football can bring people together,
              promote healthy lifestyles, and create opportunities for everyone.
            </p>
          </div>
        </section>

        {/* Community Initiatives */}
        <section className="mb-16">
          <h2 className="font-display text-2xl text-btfc-navy uppercase tracking-wider mb-8 text-center">
            Our Community Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mb-4">
                Youth Development
              </h3>
              <p className="text-neutral-600 mb-4">
                We&apos;re working to establish youth pathways that give young players
                in Bollington the opportunity to develop their skills and potentially
                progress into senior football.
              </p>
              <p className="text-sm text-btfc-gold">Coming Soon</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mb-4">
                Walking Football
              </h3>
              <p className="text-neutral-600 mb-4">
                A lower-impact version of the beautiful game, perfect for those looking
                to stay active and social regardless of age or fitness level.
              </p>
              <p className="text-sm text-btfc-gold">Coming Soon</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mb-4">
                Local Partnerships
              </h3>
              <p className="text-neutral-600 mb-4">
                We work with local businesses and organizations to support community
                events and initiatives throughout Bollington.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="font-display text-lg text-btfc-navy uppercase tracking-wider mb-4">
                Inclusive Football
              </h3>
              <p className="text-neutral-600 mb-4">
                We welcome players of all backgrounds and abilities. Football is for
                everyone, and we&apos;re committed to creating an inclusive environment.
              </p>
            </div>
          </div>
        </section>

        {/* Get Involved CTA */}
        <section className="bg-btfc-navy rounded-xl p-12 text-center">
          <h2 className="font-display text-3xl text-white uppercase tracking-wider mb-4">
            Want to Help?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            We&apos;re always looking for volunteers and partners to help us expand our
            community programs. Get in touch to find out how you can make a difference.
          </p>
          <Button href="/get-involved" size="lg">
            Get Involved
          </Button>
        </section>
      </div>
    </div>
  );
}
