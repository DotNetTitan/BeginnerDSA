export default function ExamLoading() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 animate-pulse">
      <div className="h-8 w-48 bg-muted rounded mb-2" />
      <div className="h-4 w-64 bg-muted rounded mb-6" />
      <div className="space-y-4">
        <div className="border rounded-lg p-6">
          <div className="h-5 w-32 bg-muted rounded mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
          </div>
          <div className="space-y-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-4 w-4 bg-muted rounded-full" />
                <div className="h-4 flex-1 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="h-10 w-28 bg-muted rounded" />
          <div className="h-10 w-28 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
