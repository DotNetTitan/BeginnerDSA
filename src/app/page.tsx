import TopicGrid from '@/components/home/TopicGrid';
import { BookOpen, Code2, Signal } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">BaseCase</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Master data structures and algorithms from the ground up.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
        <div className="border rounded-lg p-3 text-center">
          <BookOpen className="h-4 w-4 mx-auto mb-1 text-primary" />
          <p className="text-lg font-bold leading-tight">11</p>
          <p className="text-[11px] text-muted-foreground">Modules</p>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <Code2 className="h-4 w-4 mx-auto mb-1 text-primary" />
          <p className="text-lg font-bold leading-tight">52</p>
          <p className="text-[11px] text-muted-foreground">Problems</p>
        </div>
        <div className="border rounded-lg p-3 text-center">
          <Signal className="h-4 w-4 mx-auto mb-1 text-primary" />
          <p className="text-lg font-bold leading-tight">15 / 34 / 3</p>
          <p className="text-[11px] text-muted-foreground">Easy / Medium / Hard</p>
        </div>
      </div>

      <TopicGrid />
    </div>
  );
}
