export interface Topic {
  id: string;
  title: string;
  icon: string;
  order: number;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];       // topic IDs that should be completed first

  theory: TheorySection[];
  problemIds: string[];
}

export interface TheorySection {
  id: string;
  title: string;
  content: string;
  codeExamples?: CodeExample[];
  table?: TableData;
  component?: string;
  vizLabel?: string;
}

export interface CodeExample {
  title: string;
  code: Record<string, string>;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface Problem {
  id: string;
  title: string;
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples: Example[];
  constraints: string[];
  hints: string[];
  solution: Record<string, string>;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TopicProgress {
  topicId: string;
  completed: boolean;
  solvedProblems: string[];
  lastAccessed: string;
  examPassed: boolean;
  examAttempts: number;
}

export interface ActivityEntry {
  type: 'viewed-topic' | 'solved-problem' | 'passed-exam';
  topicId: string;
  problemId?: string;
  timestamp: string;
}

export interface AppProgress {
  topics: Record<string, TopicProgress>;
  activityLog: ActivityEntry[];
}
