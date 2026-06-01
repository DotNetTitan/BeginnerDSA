import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTopic, getPrevTopic, getNextTopic } from '@/lib/topics';
import TopicIcon from '@/components/ui/TopicIcon';
import TopicSidebar from '@/components/layout/TopicSidebar';
import ModuleFlow from '@/components/layout/ModuleFlow';
import TheorySection from '@/components/learn/TheorySection';
import { Badge } from '@/components/ui/badge';
import MarkCompleteButton from './MarkCompleteButton';
import TakeExamButton from './TakeExamButton';
import PracticeNavButton from './PracticeNavButton';
import TopicNavButtons from '@/components/learn/TopicNavButtons';

interface Props {
  params: Promise<{ topicId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) return { title: 'Topic Not Found' };
  return { title: `${topic.title} — DSA University` };
}

export default async function LearnPage({ params }: Props) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();

  const prev = getPrevTopic(topicId);
  const next = getNextTopic(topicId);

  const difficultyColor = (d: string) => {
    switch (d) {
      case 'beginner': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'intermediate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return '';
    }
  };

  return (
    <div className="flex">
      <TopicSidebar />
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 min-w-0">
        <div className="flex items-center gap-3 mb-4">
          <TopicIcon topicId={topicId} className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">{topic.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className={difficultyColor(topic.difficulty)}>
                {topic.difficulty}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {topic.problemIds.length} problems
              </span>
              {topic.prerequisites.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  · Prerequisites: {topic.prerequisites.map(id => getTopic(id)?.title).join(', ')}
                </span>
              )}
            </div>
          </div>
        </div>

        <ModuleFlow topicId={topicId} />

        <div className="flex justify-center gap-2 flex-wrap mb-6">
          <MarkCompleteButton topicId={topicId} />
          <PracticeNavButton topicId={topicId} />
          <TakeExamButton topicId={topicId} totalProblems={topic.problemIds.length} />
        </div>

        <div className="space-y-10">
          {topic.theory.map((section) => (
            <TheorySection key={section.id} section={section} />
          ))}
        </div>

        <div className="flex justify-center gap-2 flex-wrap mt-10">
          <MarkCompleteButton topicId={topicId} />
          <PracticeNavButton topicId={topicId} />
          <TakeExamButton topicId={topicId} totalProblems={topic.problemIds.length} />
        </div>

        <TopicNavButtons prev={prev ? { id: prev.id, title: prev.title } : null} next={next ? { id: next.id, title: next.title } : null} />
      </div>
    </div>
  );
}
