import type { Problem } from '../types';
import { problems as bigO } from './big-o-problems';
import { problems as arraysStrings } from './arrays-strings-problems';
import { problems as hashmapsSets } from './hashmaps-sets-problems';
import { problems as linkedLists } from './linked-lists-problems';
import { problems as stacksQueues } from './stacks-queues-problems';
import { problems as recursion } from './recursion-problems';
import { problems as sortingSearching } from './sorting-searching-problems';
import { problems as trees } from './trees-problems';
import { problems as graphs } from './graphs-problems';
import { problems as dynamicProgramming } from './dynamic-programming-problems';
import { problems as greedyIntervals } from './greedy-intervals-problems';

const allProblems: Record<string, Problem[]> = {
  'big-o': bigO,
  'arrays-strings': arraysStrings,
  'hashmaps-sets': hashmapsSets,
  'linked-lists': linkedLists,
  'stacks-queues': stacksQueues,
  'recursion': recursion,
  'sorting-searching': sortingSearching,
  'trees': trees,
  'graphs': graphs,
  'dynamic-programming': dynamicProgramming,
  'greedy-intervals': greedyIntervals,
};

export function getProblems(topicId: string): Problem[] {
  return allProblems[topicId] ?? [];
}

export function getProblem(topicId: string, problemId: string): Problem | undefined {
  return allProblems[topicId]?.find(p => p.id === problemId);
}

export function getAllProblems(): Problem[] {
  return Object.values(allProblems).flat();
}
