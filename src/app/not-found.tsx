import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="container text-center">
        <h1 className="font-display text-8xl text-btfc-gold mb-4">404</h1>
        <h2 className="font-display text-2xl md:text-3xl text-btfc-navy uppercase tracking-wider mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-btfc-navy text-white font-display uppercase tracking-wider rounded-lg hover:bg-btfc-navy-light transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
