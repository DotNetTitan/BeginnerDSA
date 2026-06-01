export default function ProblemLoading() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-36 bg-muted rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-28 bg-muted rounded" />
          <div className="h-8 w-28 bg-muted rounded" />
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-6 w-6 bg-muted rounded-full" />
        <div className="h-6 w-48 bg-muted rounded" />
        <div className="h-5 w-14 bg-muted rounded-full" />
      </div>
      <div className="space-y-3 mb-6">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
        <div className="h-4 w-4/6 bg-muted rounded" />
      </div>
      <div className="border rounded-lg p-4 mb-6">
        <div className="h-4 w-20 bg-muted rounded mb-2" />
        <div className="h-20 w-full bg-muted rounded" />
      </div>
      <div className="h-5 w-32 bg-muted rounded mb-3" />
      <div className="border rounded-lg p-4 mb-6 space-y-2">
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-4 w-1/2 bg-muted rounded" />
      </div>
      <div className="h-5 w-40 bg-muted rounded mb-2" />
      <div className="border rounded-lg p-4">
        <div className="h-40 w-full bg-muted rounded" />
      </div>
    </div>
  );
}
