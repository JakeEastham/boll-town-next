"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="container text-center">
        <h1 className="font-display text-3xl md:text-4xl text-btfc-navy uppercase tracking-wider mb-4">
          Something Went Wrong
        </h1>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          We&apos;re having trouble loading this page. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-btfc-navy text-white font-display uppercase tracking-wider rounded-lg hover:bg-btfc-navy-light transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
