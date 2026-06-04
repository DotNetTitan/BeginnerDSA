import { describe, it, expect } from 'vitest';
import { getTopic, getNextTopic, getPrevTopic } from '@/lib/topics';
import { getProblems, getProblem, getAllProblems } from '@/lib/problems';
import { getExamQuestions } from '@/lib/exams';

describe('topics data', () => {
  it('getTopic returns a topic by id', () => {
    const topic = getTopic('big-o');
    expect(topic).toBeDefined();
    expect(topic!.id).toBe('big-o');
    expect(topic!.title).toBe('Big O & Complexity');
    expect(topic!.theory.length).toBeGreaterThan(0);
  });

  it('getTopic returns undefined for unknown id', () => {
    expect(getTopic('nonexistent')).toBeUndefined();
  });

  it('getNextTopic returns the next topic', () => {
    const next = getNextTopic('big-o');
    expect(next).toBeDefined();
    expect(next!.id).toBe('arrays-strings');
  });

  it('getNextTopic returns undefined for last topic', () => {
    const last = getTopic('dynamic-programming');
    expect(getNextTopic(last!.id)).toBeUndefined();
  });

  it('getPrevTopic returns the previous topic', () => {
    const prev = getPrevTopic('arrays-strings');
    expect(prev).toBeDefined();
    expect(prev!.id).toBe('big-o');
  });

  it('getPrevTopic returns undefined for first topic', () => {
    expect(getPrevTopic('big-o')).toBeUndefined();
  });
});

describe('problems data', () => {
  it('getProblems returns problems for a topic', () => {
    const problems = getProblems('big-o');
    expect(problems.length).toBeGreaterThan(0);
    expect(problems[0]).toHaveProperty('id');
    expect(problems[0]).toHaveProperty('title');
    expect(problems[0]).toHaveProperty('solution');
  });

  it('getProblems returns empty for unknown topic', () => {
    expect(getProblems('nonexistent')).toEqual([]);
  });

  it('getProblem returns a specific problem', () => {
    const problem = getProblem('big-o', 'constant-vs-linear');
    expect(problem).toBeDefined();
    expect(problem!.title).toBe('Constant vs Linear');
  });

  it('getProblem returns undefined for unknown problem', () => {
    expect(getProblem('big-o', 'nonexistent')).toBeUndefined();
  });

  it('getAllProblems returns all problems', () => {
    const all = getAllProblems();
    expect(all.length).toBe(52);
    for (const p of all) {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('topicId');
      expect(p).toHaveProperty('solution');
    }
  });

  it('each problem has solutions in all 5 languages', () => {
    const all = getAllProblems();
    for (const p of all) {
      expect(p.solution).toHaveProperty('csharp');
      expect(p.solution).toHaveProperty('python');
      expect(p.solution).toHaveProperty('java');
      expect(p.solution).toHaveProperty('javascript');
      expect(p.solution).toHaveProperty('cpp');
    }
  });
});

describe('exams data', () => {
  it('getExamQuestions returns questions for a topic', () => {
    const questions = getExamQuestions('big-o');
    expect(questions.length).toBe(3);
    expect(questions[0]).toHaveProperty('id');
    expect(questions[0]).toHaveProperty('question');
    expect(questions[0]).toHaveProperty('options');
    expect(questions[0]).toHaveProperty('correctIndex');
    expect(questions[0]).toHaveProperty('explanation');
  });

  it('getExamQuestions returns empty for unknown topic', () => {
    expect(getExamQuestions('nonexistent')).toEqual([]);
  });

  it('all exam questions have valid correctIndex', () => {
    const allTopics = ['big-o', 'arrays-strings', 'hashmaps-sets', 'linked-lists',
      'stacks-queues', 'recursion', 'sorting-searching', 'trees',
      'greedy-intervals', 'graphs', 'dynamic-programming'];
    for (const topicId of allTopics) {
      const questions = getExamQuestions(topicId);
      for (const q of questions) {
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
      }
    }
  });
});
