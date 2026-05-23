"use client";

export default function ConteudoSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-5 w-40 bg-white/10 rounded mb-2" />
          <div className="h-3 w-64 bg-white/5 rounded" />
        </div>

        <div className="flex gap-2">
          <div className="h-10 w-24 bg-white/10 rounded-xl" />
          <div className="h-10 w-28 bg-gold-500/20 rounded-xl" />
        </div>
      </div>

      {/* Blocks */}
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="bg-navy-900 border border-white/10 rounded-2xl p-5"
        >
          <div className="h-3 w-32 bg-gold-500/20 rounded mb-4" />

          <div className="space-y-2">
            <div className="h-3 w-full bg-white/10 rounded" />
            <div className="h-3 w-11/12 bg-white/10 rounded" />
            <div className="h-3 w-10/12 bg-white/10 rounded" />

            {item % 2 === 0 && (
              <div className="h-3 w-7/12 bg-white/10 rounded" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}