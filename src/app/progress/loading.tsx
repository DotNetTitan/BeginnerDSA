export default function ProgressLoading() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-7 w-40 bg-muted rounded" />
          <div className="h-4 w-56 bg-muted rounded" />
        </div>
        <div className="h-8 w-20 bg-muted rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="h-4 w-16 bg-muted rounded mb-3" />
            <div className="h-8 w-20 bg-muted rounded mb-2" />
            <div className="h-2 w-full bg-muted rounded" />
          </div>
        ))}
      </div>
      <div className="h-6 w-44 bg-muted rounded mb-4" />
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 bg-muted rounded shrink-0" />
            <div className="flex-1 space-y-1">
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-2 w-full bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
