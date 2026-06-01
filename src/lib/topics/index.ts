import type { Topic } from '../types';
import { topic as bigO } from './big-o';
import { topic as arraysStrings } from './arrays-strings';
import { topic as hashmapsSets } from './hashmaps-sets';
import { topic as linkedLists } from './linked-lists';
import { topic as stacksQueues } from './stacks-queues';
import { topic as recursion } from './recursion';
import { topic as sortingSearching } from './sorting-searching';
import { topic as trees } from './trees';
import { topic as graphs } from './graphs';
import { topic as dynamicProgramming } from './dynamic-programming';
import { topic as greedyIntervals } from './greedy-intervals';

export const topics: Topic[] = [
  bigO, arraysStrings, hashmapsSets, linkedLists, stacksQueues,
  recursion, sortingSearching, greedyIntervals, trees, graphs, dynamicProgramming,
];

export function getTopic(id: string): Topic | undefined {
  return topics.find(t => t.id === id);
}

export function getNextTopic(id: string): Topic | undefined {
  const idx = topics.findIndex(t => t.id === id);
  return idx >= 0 && idx < topics.length - 1 ? topics[idx + 1] : undefined;
}

export function getPrevTopic(id: string): Topic | undefined {
  const idx = topics.findIndex(t => t.id === id);
  return idx > 0 ? topics[idx - 1] : undefined;
}
