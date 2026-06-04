import { describe, it, expect } from 'vitest';
import {
  getTopicStatus,
  isPracticeReachable,
  isReadyForExam,
  getNextRecommendedTopic,
} from '@/lib/topic-status';
import type { Topic, AppProgress } from '@/lib/types';

function makeTopic(overrides: Partial<Topic> = {}): Topic {
  return {
    id: 'test-topic',
    title: 'Test Topic',
    icon: 'Code',
    order: 1,
    description: 'A test topic',
    difficulty: 'beginner',
    prerequisites: [],
    theory: [],
    problemIds: ['p1', 'p2'],
    ...overrides,
  };
}

describe('getTopicStatus', () => {
  it('returns locked when a prerequisite is not completed', () => {
    const topic = makeTopic({ prerequisites: ['prereq'] });
    const progress: AppProgress = { topics: {}, activityLog: [] };
    const allTopics = [topic, makeTopic({ id: 'prereq', problemIds: ['p1'] })];
    expect(getTopicStatus(topic, progress, allTopics)).toBe('locked');
  });

  it('returns locked when prerequisite problems are not solved', () => {
    const topic = makeTopic({ prerequisites: ['prereq'] });
    const progress: AppProgress = {
      topics: { prereq: { topicId: 'prereq', completed: true, solvedProblems: [], lastAccessed: '', examPassed: false, examAttempts: 0 } },
      activityLog: [],
    };
    const allTopics = [topic, makeTopic({ id: 'prereq', problemIds: ['p1'] })];
    expect(getTopicStatus(topic, progress, allTopics)).toBe('locked');
  });

  it('returns available when no prerequisites', () => {
    const topic = makeTopic({ prerequisites: [] });
    const progress: AppProgress = { topics: {}, activityLog: [] };
    expect(getTopicStatus(topic, progress, [topic])).toBe('available');
  });

  it('returns in-progress when theory is read', () => {
    const topic = makeTopic({ prerequisites: [] });
    const progress: AppProgress = {
      topics: { 'test-topic': { topicId: 'test-topic', completed: true, solvedProblems: [], lastAccessed: '', examPassed: false, examAttempts: 0 } },
      activityLog: [],
    };
    expect(getTopicStatus(topic, progress, [topic])).toBe('in-progress');
  });

  it('returns in-progress when some problems solved', () => {
    const topic = makeTopic({ prerequisites: [] });
    const progress: AppProgress = {
      topics: { 'test-topic': { topicId: 'test-topic', completed: false, solvedProblems: ['p1'], lastAccessed: '', examPassed: false, examAttempts: 0 } },
      activityLog: [],
    };
    expect(getTopicStatus(topic, progress, [topic])).toBe('in-progress');
  });

  it('returns completed when theory read, exam passed, and all problems solved', () => {
    const topic = makeTopic({ prerequisites: [] });
    const progress: AppProgress = {
      topics: { 'test-topic': { topicId: 'test-topic', completed: true, solvedProblems: ['p1', 'p2'], lastAccessed: '', examPassed: true, examAttempts: 1 } },
      activityLog: [],
    };
    expect(getTopicStatus(topic, progress, [topic])).toBe('completed');
  });

  it('returns available if only available prereqs are met but no progress', () => {
    const topic = makeTopic({ prerequisites: [] });
    const progress: AppProgress = { topics: {}, activityLog: [] };
    expect(getTopicStatus(topic, progress, [topic])).toBe('available');
  });
});

describe('isPracticeReachable', () => {
  it('returns true for in-progress topics', () => {
    const topic = makeTopic();
    const progress: AppProgress = {
      topics: { 'test-topic': { topicId: 'test-topic', completed: false, solvedProblems: ['p1'], lastAccessed: '', examPassed: false, examAttempts: 0 } },
      activityLog: [],
    };
    expect(isPracticeReachable(topic, progress, [topic])).toBe(true);
  });

  it('returns true for completed topics', () => {
    const topic = makeTopic();
    const progress: AppProgress = {
      topics: { 'test-topic': { topicId: 'test-topic', completed: true, solvedProblems: ['p1', 'p2'], lastAccessed: '', examPassed: true, examAttempts: 1 } },
      activityLog: [],
    };
    expect(isPracticeReachable(topic, progress, [topic])).toBe(true);
  });

  it('returns false for locked topics', () => {
    const topic = makeTopic({ prerequisites: ['prereq'] });
    const progress: AppProgress = { topics: {}, activityLog: [] };
    const allTopics = [topic, makeTopic({ id: 'prereq', problemIds: ['p1'] })];
    expect(isPracticeReachable(topic, progress, allTopics)).toBe(false);
  });
});

describe('isReadyForExam', () => {
  it('returns true when theory read, exam not passed, all problems solved', () => {
    const topic = makeTopic();
    const progress: AppProgress = {
      topics: { 'test-topic': { topicId: 'test-topic', completed: true, solvedProblems: ['p1', 'p2'], lastAccessed: '', examPassed: false, examAttempts: 0 } },
      activityLog: [],
    };
    expect(isReadyForExam(topic, progress)).toBe(true);
  });

  it('returns false if exam already passed', () => {
    const topic = makeTopic();
    const progress: AppProgress = {
      topics: { 'test-topic': { topicId: 'test-topic', completed: true, solvedProblems: ['p1', 'p2'], lastAccessed: '', examPassed: true, examAttempts: 1 } },
      activityLog: [],
    };
    expect(isReadyForExam(topic, progress)).toBe(false);
  });

  it('returns false if theory not read', () => {
    const topic = makeTopic();
    const progress: AppProgress = {
      topics: { 'test-topic': { topicId: 'test-topic', completed: false, solvedProblems: ['p1', 'p2'], lastAccessed: '', examPassed: false, examAttempts: 0 } },
      activityLog: [],
    };
    expect(isReadyForExam(topic, progress)).toBe(false);
  });

  it('returns false if no progress exists', () => {
    const topic = makeTopic();
    const progress: AppProgress = { topics: {}, activityLog: [] };
    expect(isReadyForExam(topic, progress)).toBe(false);
  });

  it('returns false if not all problems solved', () => {
    const topic = makeTopic();
    const progress: AppProgress = {
      topics: { 'test-topic': { topicId: 'test-topic', completed: true, solvedProblems: ['p1'], lastAccessed: '', examPassed: false, examAttempts: 0 } },
      activityLog: [],
    };
    expect(isReadyForExam(topic, progress)).toBe(false);
  });
});

describe('getNextRecommendedTopic', () => {
  it('returns a topic ready for exam first', () => {
    const t1 = makeTopic({ id: 't1', prerequisites: [] });
    const t2 = makeTopic({ id: 't2', prerequisites: [] });
    const progress: AppProgress = {
      topics: { t2: { topicId: 't2', completed: true, solvedProblems: ['p1', 'p2'], lastAccessed: '', examPassed: false, examAttempts: 0 } },
      activityLog: [],
    };
    expect(getNextRecommendedTopic(progress, [t1, t2])?.id).toBe('t2');
  });

  it('returns available or in-progress if no exam-ready', () => {
    const t1 = makeTopic({ id: 't1', prerequisites: [] });
    const progress: AppProgress = { topics: {}, activityLog: [] };
    expect(getNextRecommendedTopic(progress, [t1])?.id).toBe('t1');
  });

  it('returns null if all completed', () => {
    const t1 = makeTopic({ id: 't1', prerequisites: [] });
    const progress: AppProgress = {
      topics: { t1: { topicId: 't1', completed: true, solvedProblems: ['p1', 'p2'], lastAccessed: '', examPassed: true, examAttempts: 1 } },
      activityLog: [],
    };
    expect(getNextRecommendedTopic(progress, [t1])).toBeNull();
  });
});
