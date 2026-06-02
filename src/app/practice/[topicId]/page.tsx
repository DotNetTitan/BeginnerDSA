import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTopic } from '@/lib/topics';
import TopicIcon from '@/components/ui/TopicIcon';
import { getProblems } from '@/lib/problems';
import TopicSidebar from '@/components/layout/TopicSidebar';
import ModuleFlow from '@/components/layout/ModuleFlow';
import ProblemList from './ProblemList';

interface Props {
  params: Promise<{ topicId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) return { title: 'Topic Not Found' };
  return { title: `${topic.title} — Practice — Zero To DSA` };
}

export default async function PracticePage({ params }: Props) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();
  const problems = getProblems(topicId);

  return (
    <div className="flex">
      <TopicSidebar />
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 min-w-0">
        <div className="flex items-center gap-3 mb-4">
          <TopicIcon topicId={topicId} className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">{topic.title}</h1>
            <p className="text-sm text-muted-foreground">
              {problems.length} practice problems
            </p>
          </div>
        </div>

        <ModuleFlow topicId={topicId} />

        <ProblemList problems={problems} topicId={topicId} />
      </div>
    </div>
  );
}
