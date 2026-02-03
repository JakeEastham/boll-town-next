import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { clubDocumentsQuery } from "@/lib/sanity/queries";
import { DocumentCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "Club Documents",
  description:
    "Download official Bollington Town FC documents including policies, codes of conduct, and constitution.",
};

interface ClubDocument {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  category: string;
}

async function getDocuments() {
  return client.fetch<ClubDocument[]>(clubDocumentsQuery);
}

// Fallback documents if Sanity has none
const fallbackDocuments: ClubDocument[] = [
  {
    _id: "1",
    title: "FA Code of Conduct - Players",
    description: "FA England respect code of conduct for players",
    fileUrl: "/pdfs/FA_Code-of-Conduct_Players.pdf",
    category: "code-of-conduct",
  },
  {
    _id: "2",
    title: "FA Code of Conduct - Spectators & Parents",
    description: "FA England respect code of conduct for spectators and parents",
    fileUrl: "/pdfs/FA_Code-of-Conduct_Spectators-Parents.pdf",
    category: "code-of-conduct",
  },
  {
    _id: "3",
    title: "Anti-Bullying Policy",
    description: "Our commitment to preventing and addressing bullying",
    fileUrl: "/pdfs/anti-bullying-policy.pdf",
    category: "policy",
  },
  {
    _id: "4",
    title: "Data Privacy Policy",
    description: "How we handle and protect your personal data",
    fileUrl: "/pdfs/data-privacy-policy.pdf",
    category: "policy",
  },
  {
    _id: "5",
    title: "Drug & Alcohol Policy",
    description: "Our policy on drugs and alcohol",
    fileUrl: "/pdfs/drug-alcohol-policy.pdf",
    category: "policy",
  },
];

export default async function ClubDocumentsPage() {
  let documents = await getDocuments();

  // Use fallback if no documents from Sanity
  if (!documents || documents.length === 0) {
    documents = fallbackDocuments;
  }

  // Group documents by category
  const documentsByCategory = documents.reduce(
    (acc, doc) => {
      const category = doc.category || "other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(doc);
      return acc;
    },
    {} as Record<string, ClubDocument[]>
  );

  const categoryLabels: Record<string, string> = {
    constitution: "Constitution",
    "code-of-conduct": "Codes of Conduct",
    policy: "Club Policies",
    other: "Other Documents",
  };

  const categoryOrder = ["constitution", "code-of-conduct", "policy", "other"];

  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-btfc-navy py-16 mb-12">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider">
            Club Documents
          </h1>
          <p className="text-white/70 mt-4 max-w-xl">
            Download official club documents including policies, codes of conduct, and
            our constitution.
          </p>
        </div>
      </div>

      <div className="container">
        {categoryOrder.map((category) => {
          const docs = documentsByCategory[category];
          if (!docs || docs.length === 0) return null;

          return (
            <section key={category} className="mb-12">
              <h2 className="font-display text-xl text-btfc-navy uppercase tracking-wider mb-6">
                {categoryLabels[category] || category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {docs.map((doc) => (
                  <DocumentCard
                    key={doc._id}
                    title={doc.title}
                    description={doc.description}
                    fileUrl={doc.fileUrl}
                    category={doc.category}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* FA Respect Notice */}
        <div className="bg-neutral-50 rounded-xl p-6 text-center mt-12">
          <p className="text-neutral-600">
            Bollington Town FC is committed to the FA Respect programme. All players,
            coaches, and supporters are expected to adhere to these codes of conduct.
          </p>
        </div>
      </div>
    </div>
  );
}
