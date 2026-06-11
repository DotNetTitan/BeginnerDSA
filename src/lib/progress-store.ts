'use client';

import type { AppProgress, TopicProgress, ActivityEntry } from './types';
import { topics } from './topics';
import { getTopicStatus } from './topic-status';

const STORAGE_KEY = 'dsa-university-progress';

function getDefaultProgress(): AppProgress {
  return {
    topics: {},
    activityLog: [],
  };
}

export function getProgress(): AppProgress {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    return JSON.parse(raw) as AppProgress;
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(progress: AppProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new CustomEvent('dsa-progress-changed'));
  } catch {
    // localStorage unavailable - silently degrade
  }
}

function ensureTopicProgress(progress: AppProgress, topicId: string): TopicProgress {
  if (!progress.topics[topicId]) {
    progress.topics[topicId] = {
      topicId,
      completed: false,
      solvedProblems: [],
      lastAccessed: new Date().toISOString(),
      examPassed: false,
      examAttempts: 0,
    };
  }
  return progress.topics[topicId];
}

export function markTopicCompleted(topicId: string): void {
  const progress = getProgress();
  const tp = ensureTopicProgress(progress, topicId);
  tp.completed = true;
  tp.lastAccessed = new Date().toISOString();
  saveProgress(progress);
}

export function unmarkTopicCompleted(topicId: string): void {
  const progress = getProgress();
  const tp = progress.topics[topicId];
  if (tp) {
    tp.completed = false;
    tp.lastAccessed = new Date().toISOString();
    saveProgress(progress);
  }
}

export function getTopicProgress(topicId: string): TopicProgress {
  const progress = getProgress();
  return ensureTopicProgress(progress, topicId);
}

export function markProblemSolved(topicId: string, problemId: string): void {
  const progress = getProgress();
  const tp = ensureTopicProgress(progress, topicId);
  if (!tp.solvedProblems.includes(problemId)) {
    tp.solvedProblems.push(problemId);
  }
  tp.lastAccessed = new Date().toISOString();
  logActivity(progress, {
    type: 'solved-problem',
    topicId,
    problemId,
    timestamp: new Date().toISOString(),
  });
  saveProgress(progress);
}

export function unmarkProblemSolved(topicId: string, problemId: string): void {
  const progress = getProgress();
  const tp = progress.topics[topicId];
  if (tp) {
    tp.solvedProblems = tp.solvedProblems.filter(id => id !== problemId);
    tp.lastAccessed = new Date().toISOString();
    saveProgress(progress);
  }
}

export function isProblemSolved(topicId: string, problemId: string): boolean {
  const progress = getProgress();
  const tp = progress.topics[topicId];
  return tp ? tp.solvedProblems.includes(problemId) : false;
}

function logActivity(progress: AppProgress, entry: ActivityEntry): void {
  progress.activityLog.unshift(entry);
  if (progress.activityLog.length > 50) {
    progress.activityLog = progress.activityLog.slice(0, 50);
  }
}

export function logTopicViewed(topicId: string): void {
  const progress = getProgress();
  ensureTopicProgress(progress, topicId).lastAccessed = new Date().toISOString();
  logActivity(progress, {
    type: 'viewed-topic',
    topicId,
    timestamp: new Date().toISOString(),
  });
  saveProgress(progress);
}

export function markExamPassed(topicId: string): void {
  const progress = getProgress();
  const tp = ensureTopicProgress(progress, topicId);
  tp.examPassed = true;
  tp.examAttempts++;
  tp.lastAccessed = new Date().toISOString();
  logActivity(progress, {
    type: 'passed-exam',
    topicId,
    timestamp: new Date().toISOString(),
  });
  saveProgress(progress);
}

export function getExamAttempts(topicId: string): number {
  const progress = getProgress();
  const tp = progress.topics[topicId];
  return tp?.examAttempts ?? 0;
}

export function resetExam(topicId: string): void {
  const progress = getProgress();
  const tp = progress.topics[topicId];
  if (tp) {
    tp.examPassed = false;
    saveProgress(progress);
  }
}

export function getRecentActivity(count = 5): ActivityEntry[] {
  const progress = getProgress();
  return progress.activityLog.slice(0, count);
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('dsa-progress-changed'));
  } catch {
    // silently degrade
  }
}

const PROBLEM_COUNTS: Record<string, number> = {
  'intro': 0,
  'big-o': 3,
  'arrays-strings': 5,
  'hashmaps-sets': 4,
  'linked-lists': 5,
  'stacks-queues': 5,
  'recursion': 5,
  'sorting-searching': 5,
  'trees': 5,
  'graphs': 5,
  'dynamic-programming': 5,
  'greedy-intervals': 5,
};

const TOPIC_IDS = Object.keys(PROBLEM_COUNTS);

const UNLOCK_KEY = 'dsa-all-unlocked';

export function isAllUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(UNLOCK_KEY) === 'true';
}

export function toggleAllUnlocked(): boolean {
  const current = isAllUnlocked();
  const next = !current;
  if (typeof window !== 'undefined') {
    localStorage.setItem(UNLOCK_KEY, String(next));
    window.dispatchEvent(new CustomEvent('dsa-progress-changed'));
  }
  return next;
}

export function getStats(forceUnlocked?: boolean): {
  totalTopics: number;
  completedTopics: number;
  totalProblems: number;
  solvedProblems: number;
  percentage: number;
} {
  const progress = getProgress();

  let totalProblems = 0;
  let solvedProblems = 0;
  let completedTopics = 0;

  for (const id of TOPIC_IDS) {
    const probCount = PROBLEM_COUNTS[id];
    totalProblems += probCount;
    const tp = progress.topics[id];
    if (tp) {
      if (tp.solvedProblems) solvedProblems += tp.solvedProblems.length;
      const topic = topics.find(t => t.id === id);
      if (topic && getTopicStatus(topic, progress, topics, forceUnlocked) === 'completed') {
        completedTopics++;
      }
    }
  }

  const percentage = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;

  return {
    totalTopics: TOPIC_IDS.length,
    completedTopics,
    totalProblems,
    solvedProblems,
    percentage,
  };
}
