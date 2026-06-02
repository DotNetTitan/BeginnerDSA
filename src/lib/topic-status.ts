import type { Topic, AppProgress } from './types';

export type TopicStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export function getTopicStatus(
  topic: Topic,
  progress: AppProgress,
  allTopics: Topic[]
): TopicStatus {
  const tp = progress.topics[topic.id];

  // Check prerequisites
  for (const prereqId of topic.prerequisites) {
    const prereqTopic = allTopics.find(t => t.id === prereqId);
    if (!prereqTopic) continue;
    const prereqProgress = progress.topics[prereqId];
    if (!prereqProgress || !prereqProgress.completed) {
      return 'locked';
    }
  }

  // All prerequisites done - topic is available
  const problemsSolved = tp?.solvedProblems?.length ?? 0;
  const theoryRead = tp?.completed ?? false;
  const examPassed = tp?.examPassed ?? false;

  if (theoryRead && examPassed && problemsSolved >= topic.problemIds.length) {
    return 'completed';
  }

  if (theoryRead || problemsSolved > 0) {
    return 'in-progress';
  }

  return 'available';
}

export function isPracticeReachable(topic: Topic, progress: AppProgress, allTopics: Topic[]): boolean {
  return getTopicStatus(topic, progress, allTopics) !== 'locked';
}

export function isReadyForExam(topic: Topic, progress: AppProgress): boolean {
  const tp = progress.topics[topic.id];
  if (!tp) return false;
  const problemsSolved = tp.solvedProblems?.length ?? 0;
  const theoryRead = tp.completed ?? false;
  const examPassed = tp.examPassed ?? false;
  return theoryRead && !examPassed && problemsSolved >= topic.problemIds.length;
}

export function getNextRecommendedTopic(
  progress: AppProgress,
  allTopics: Topic[]
): Topic | null {
  // First, check for a topic ready for exam
  for (const topic of allTopics) {
    if (isReadyForExam(topic, progress)) {
      return topic;
    }
  }
  // Then check for available or in-progress topics
  for (const topic of allTopics) {
    const status = getTopicStatus(topic, progress, allTopics);
    if (status === 'available' || status === 'in-progress') {
      return topic;
    }
  }
  return null;
}
