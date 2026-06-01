export default function RootLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 w-48 bg-muted rounded mb-2" />
      <div className="h-4 w-72 bg-muted rounded mb-8" />
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
        <div className="border rounded-lg p-3 text-center">
          <div className="h-4 w-4 bg-muted rounded mx-auto mb-1" />
          <div className="h-6 w-12 bg-muted rounded mx-auto mb-1" />
          <div className="h-3 w-16 bg-muted rounded mx-auto" />
        </div>
        <div className="border rounded-lg p-3 text-center">
          <div className="h-4 w-4 bg-muted rounded mx-auto mb-1" />
          <div className="h-6 w-12 bg-muted rounded mx-auto mb-1" />
          <div className="h-3 w-16 bg-muted rounded mx-auto" />
        </div>
        <div className="border rounded-lg p-3 text-center">
          <div className="h-4 w-4 bg-muted rounded mx-auto mb-1" />
          <div className="h-6 w-16 bg-muted rounded mx-auto mb-1" />
          <div className="h-3 w-16 bg-muted rounded mx-auto" />
        </div>
      </div>
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 border rounded-lg p-4">
            <div className="h-8 w-8 bg-muted rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-3 w-1/2 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
