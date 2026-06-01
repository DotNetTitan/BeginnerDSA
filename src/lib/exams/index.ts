import type { ExamQuestion } from '../types';
import { questions as bigO } from './big-o-exams';
import { questions as arraysStrings } from './arrays-strings-exams';
import { questions as hashmapsSets } from './hashmaps-sets-exams';
import { questions as linkedLists } from './linked-lists-exams';
import { questions as stacksQueues } from './stacks-queues-exams';
import { questions as recursion } from './recursion-exams';
import { questions as sortingSearching } from './sorting-searching-exams';
import { questions as greedyIntervals } from './greedy-intervals-exams';
import { questions as trees } from './trees-exams';
import { questions as graphs } from './graphs-exams';
import { questions as dp } from './dynamic-programming-exams';

const examMap: Record<string, ExamQuestion[]> = {
  'big-o': bigO,
  'arrays-strings': arraysStrings,
  'hashmaps-sets': hashmapsSets,
  'linked-lists': linkedLists,
  'stacks-queues': stacksQueues,
  recursion: recursion,
  'sorting-searching': sortingSearching,
  'greedy-intervals': greedyIntervals,
  trees: trees,
  graphs: graphs,
  'dynamic-programming': dp,
};

export function getExamQuestions(topicId: string): ExamQuestion[] {
  return examMap[topicId] ?? [];
}

export const PASS_THRESHOLD = 1;
