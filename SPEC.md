# Module Exams Feature

## Goal
Add a multiple-choice exam to each module. Passing the exam is required (along with theory read and all problems solved) to mark a topic as "completed" and unlock the next module.

## Data Model

### `ExamQuestion` (new type in `types.ts`)
```ts
export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];       // 4 choices
  correctIndex: number;    // 0–3
  explanation: string;     // shown after answering
}
```

### `TopicProgress` — add `examPassed: boolean`
```ts
export interface TopicProgress {
  topicId: string;
  completed: boolean;
  solvedProblems: string[];
  lastAccessed: string;
  examPassed: boolean;       // new
  examAttempts: number;      // new
}
```

### `ActivityEntry` — add `'passed-exam'` type
```ts
type: 'viewed-topic' | 'solved-problem' | 'passed-exam';
```

## Exam Data

11 files under `src/lib/exams/`, one per module.
Each module has **5 questions** (big-o has 3 — same as its problem count).
Questions test conceptual understanding, C# syntax, and algorithmic reasoning.

Files:
- `big-o-exams.ts`
- `arrays-strings-exams.ts`
- etc.

Index: `src/lib/exams/index.ts` exports `getExamQuestions(topicId)`.

## Topic Status Logic Change

`topic-status.ts` — `getTopicStatus()`:
```
completed = theoryRead && examPassed && problemsSolved >= total
```

A new status is needed: beyond "in-progress" but not yet "completed". When theory is read and all problems solved but exam not passed, show a new `'ready-for-exam'` status? Or keep `'in-progress'` and let the UI detect the exam-ready state.

Decision: Keep `'in-progress'` for any progress short of full completion. Add a helper `isReadyForExam(topic, progress)` that returns true when theory is read and all problems are solved but exam isn't passed yet.

## Progress Store

- `markExamPassed(topicId)` — sets `examPassed = true`, increments `examAttempts`, logs activity
- `getExamAttempts(topicId)` — returns attempt count
- `resetExam(topicId)` — clears examPassed for retry (only if not all problems solved?)

## Exam UI

### Route: `/exam/[topicId]`
- Server component that checks topic exists (404 if not)
- Renders client `ExamPage` component

### `ExamPage` flow:
1. **Start screen**: "Ready for the [topic] exam? 5 questions, passing = 4/5 (80%)."
2. **Question screen**: Shows question + 4 options as radio buttons. Next button. Progress indicator (Q 2/5).
3. **After each answer**: Show correct/incorrect with explanation. Auto-advance or manual Next.
4. **Result screen**: Score (X/5), pass/fail badge. If pass: "Module Complete!" + buttons to review or continue. If fail: "Review material and try again" + list of topics to review.

### Integration
- **Learn page**: After "Mark as Read" button, show a "Take Exam" button when all problems are solved.
- **Module Flow**: No change — Learn → Practice stays. Exam is accessed from learn page.
- **Home page topic card**: Show exam status (badge or indicator) when in-progress with all problems solved.
- **"Continue Learning" card**: Skip to exam if ready.

## Questions Per Module (5 each, big-o = 3)
See individual exam data files for full questions.

Total questions: 53 (5×10 + 3)

## Implementation Order
1. Types + exam data files
2. Progress store updates
3. Topic status logic update
4. Exam page UI
5. Integration (learn page link, home page indicators)
6. Build + verify
