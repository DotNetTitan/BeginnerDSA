import type { Topic } from '../types';

export const topic: Topic = {
  id: 'intro',
  title: 'Introduction to DSA',
  icon: 'book-open',
  order: 0,
  description: 'What are data structures and algorithms, why learn them, and what this course covers.',
  difficulty: 'beginner',
  prerequisites: [],
  theory: [
    {
      id: 'what-is-dsa',
      title: 'What is DSA?',
      content: '',
      component: 'intro-content',
    },
  ],
  problemIds: [],
};
