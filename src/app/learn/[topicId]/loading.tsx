export default function LearnLoading() {
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
          <div className="space-y-2 flex-1">
            <div className="h-7 w-56 bg-muted rounded" />
            <div className="h-4 w-36 bg-muted rounded" />
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-5 w-40 bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-5/6 bg-muted rounded" />
              <div className="h-4 w-4/6 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
