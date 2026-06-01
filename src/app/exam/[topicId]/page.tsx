import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTopic } from '@/lib/topics';
import ExamPage from '@/components/exam/ExamPage';

interface Props {
  params: Promise<{ topicId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) return { title: 'Exam Not Found' };
  return { title: `Exam: ${topic.title} — DSA University` };
}

export default async function ExamRoute({ params }: Props) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();

  return <ExamPage topicId={topicId} topicTitle={topic.title} />;
}
