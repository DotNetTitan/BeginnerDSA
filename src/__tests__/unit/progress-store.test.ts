import { describe, it, expect, beforeEach } from 'vitest';
import {
  getProgress,
  markTopicCompleted,
  getTopicProgress,
  markProblemSolved,
  isProblemSolved,
  markExamPassed,
  getExamAttempts,
  resetExam,
  getRecentActivity,
  getStats,
  resetProgress,
} from '@/lib/progress-store';

beforeEach(() => {
  localStorage.clear();
});

describe('getProgress', () => {
  it('returns default progress when nothing stored', () => {
    const progress = getProgress();
    expect(progress.topics).toEqual({});
    expect(progress.activityLog).toEqual([]);
  });

  it('returns stored progress from localStorage', () => {
    const data = { topics: { test: { topicId: 'test', completed: true, solvedProblems: [], lastAccessed: '', examPassed: false, examAttempts: 0 } }, activityLog: [] };
    localStorage.setItem('dsa-university-progress', JSON.stringify(data));
    const progress = getProgress();
    expect(progress.topics.test.completed).toBe(true);
  });
});

describe('markTopicCompleted', () => {
  it('marks a topic as completed', () => {
    markTopicCompleted('big-o');
    const tp = getTopicProgress('big-o');
    expect(tp.completed).toBe(true);
  });
});

describe('getTopicProgress', () => {
  it('creates default progress for unknown topic', () => {
    const tp = getTopicProgress('nonexistent');
    expect(tp.topicId).toBe('nonexistent');
    expect(tp.completed).toBe(false);
    expect(tp.solvedProblems).toEqual([]);
    expect(tp.examPassed).toBe(false);
    expect(tp.examAttempts).toBe(0);
  });
});

describe('markProblemSolved', () => {
  it('marks a problem as solved', () => {
    markProblemSolved('big-o', 'constant-vs-linear');
    expect(isProblemSolved('big-o', 'constant-vs-linear')).toBe(true);
  });

  it('does not duplicate solved problems', () => {
    markProblemSolved('big-o', 'constant-vs-linear');
    markProblemSolved('big-o', 'constant-vs-linear');
    const tp = getTopicProgress('big-o');
    expect(tp.solvedProblems).toHaveLength(1);
  });
});

describe('markExamPassed', () => {
  it('marks exam as passed and increments attempts', () => {
    markExamPassed('big-o');
    const tp = getTopicProgress('big-o');
    expect(tp.examPassed).toBe(true);
    expect(tp.examAttempts).toBe(1);
  });
});

describe('getExamAttempts', () => {
  it('returns 0 for topic with no attempts', () => {
    expect(getExamAttempts('big-o')).toBe(0);
  });

  it('returns correct attempt count', () => {
    markExamPassed('big-o');
    expect(getExamAttempts('big-o')).toBe(1);
  });
});

describe('resetExam', () => {
  it('resets exam passed status', () => {
    markExamPassed('big-o');
    resetExam('big-o');
    const tp = getTopicProgress('big-o');
    expect(tp.examPassed).toBe(false);
  });
});

describe('getRecentActivity', () => {
  it('returns recent activity', () => {
    markProblemSolved('big-o', 'constant-vs-linear');
    const activity = getRecentActivity(5);
    expect(activity.length).toBeGreaterThan(0);
    expect(activity[0].type).toBe('solved-problem');
  });
});

describe('getStats', () => {
  it('returns stats with default values', () => {
    const stats = getStats();
    expect(stats.totalTopics).toBe(11);
    expect(stats.totalProblems).toBe(52);
    expect(stats.solvedProblems).toBe(0);
    expect(stats.completedTopics).toBe(0);
    expect(stats.percentage).toBe(0);
  });

  it('returns updated stats after solving problems', () => {
    markProblemSolved('big-o', 'constant-vs-linear');
    const stats = getStats();
    expect(stats.solvedProblems).toBe(1);
    expect(stats.percentage).toBeGreaterThan(0);
  });
});

describe('resetProgress', () => {
  it('clears all progress', () => {
    markTopicCompleted('big-o');
    resetProgress();
    const progress = getProgress();
    expect(progress.topics).toEqual({});
  });
});
