export default function PracticeListLoading() {
  return (
    <div className="flex animate-pulse">
      <div className="hidden lg:block w-64 shrink-0 border-r p-4 space-y-3">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="space-y-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-8 bg-muted rounded" />
          ))}
        </div>
      </div>
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 min-w-0">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 bg-muted rounded-full" />
          <div className="space-y-1">
            <div className="h-7 w-40 bg-muted rounded" />
            <div className="h-4 w-28 bg-muted rounded" />
          </div>
        </div>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-5 w-3/4 bg-muted rounded mb-2" />
              <div className="h-3 w-1/3 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
