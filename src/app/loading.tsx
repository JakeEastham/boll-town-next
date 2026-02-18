export default function Loading() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Header skeleton */}
      <div className="bg-btfc-navy py-16 mb-12">
        <div className="container">
          <div className="h-12 w-64 skeleton rounded" />
          <div className="h-5 w-96 max-w-full skeleton rounded mt-4" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="aspect-[3/2] skeleton" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-20 skeleton rounded" />
                <div className="h-6 w-full skeleton rounded" />
                <div className="h-4 w-3/4 skeleton rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
