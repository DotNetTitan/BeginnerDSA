'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getExamQuestions } from '@/lib/exams';
import { getNextTopic } from '@/lib/topics';
import { markExamPassed, getTopicProgress } from '@/lib/progress-store';
import { Button } from '@/components/ui/button';
import TopicSidebar from '@/components/layout/TopicSidebar';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, GraduationCap, BookOpen } from 'lucide-react';

type Phase = 'start' | 'question' | 'result' | 'already-passed';

interface Props {
  topicId: string;
  topicTitle: string;
}

export default function ExamPage({ topicId, topicTitle }: Props) {
  const router = useRouter();
  const questions = useMemo(() => getExamQuestions(topicId), [topicId]);
  const nextTopic = useMemo(() => getNextTopic(topicId), [topicId]);
  const [alreadyPassed] = useState(() => getTopicProgress(topicId).examPassed);

  const [phase, setPhase] = useState<Phase>(alreadyPassed ? 'already-passed' : 'start');
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState<Record<string, boolean>>({});
  const [examPassed, setExamPassed] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) return;

      if (phase === 'question' && questions[currentQ]) {
        const numKey = parseInt(e.key);
        if (numKey >= 1 && numKey <= 4 && !showResult[questions[currentQ].id]) {
          const idx = numKey - 1;
          if (idx < questions[currentQ].options.length) {
            setSelectedAnswers(prev => ({ ...prev, [questions[currentQ].id]: idx }));
            return;
          }
        }
        const letterKey = e.key.toLowerCase();
        if (['a', 'b', 'c', 'd'].includes(letterKey) && !showResult[questions[currentQ].id]) {
          const idx = letterKey.charCodeAt(0) - 97;
          if (idx < questions[currentQ].options.length) {
            setSelectedAnswers(prev => ({ ...prev, [questions[currentQ].id]: idx }));
            return;
          }
        }
        if (e.key === 'Enter') {
          if (showResult[questions[currentQ].id]) {
            if (currentQ < questions.length - 1) {
              setCurrentQ(prev => prev + 1);
            } else {
              const correct = questions.filter(q => selectedAnswers[q.id] === q.correctIndex).length;
              const passed = correct === questions.length;
              if (passed) markExamPassed(topicId);
              setExamPassed(passed);
              setAttempted(true);
              setPhase('result');
            }
          } else if (selectedAnswers[questions[currentQ].id] !== undefined) {
            setShowResult(prev => ({ ...prev, [questions[currentQ].id]: true }));
          }
        }
      }

      if (phase === 'start' && e.key === 'Enter') {
        setPhase('question');
      }

      if (phase === 'result' && e.key.toLowerCase() === 'r' && !examPassed) {
        setSelectedAnswers({});
        setShowResult({});
        setCurrentQ(0);
        setPhase('question');
        setAttempted(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentQ, questions, showResult, selectedAnswers, examPassed, topicId]);

  if (questions.length === 0) {
    return (
      <div className="flex">
        <TopicSidebar />
        <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 min-w-0">
          <h1 className="text-2xl font-bold">No Exam</h1>
          <p className="text-muted-foreground mt-2">No exam questions available for this module.</p>
          <Button className="mt-4" variant="outline" onClick={() => router.push(`/learn/${topicId}`)}>
            Back to Learn
          </Button>
        </div>
      </div>
    );
  }


  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleConfirm = () => {
    setShowResult(prev => ({ ...prev, [questions[currentQ].id]: true }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      // Calculate results
      const correct = questions.filter(q => selectedAnswers[q.id] === q.correctIndex).length;
      const passed = correct === questions.length;
      if (passed) {
        markExamPassed(topicId);
      }
      setExamPassed(passed);
      setAttempted(true);
      setPhase('result');
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setShowResult({});
    setCurrentQ(0);
    setPhase('question');
    setAttempted(false);
  };

  const handleStart = () => {
    setPhase('question');
  };

  const isAnswered = (qId: string) => selectedAnswers[qId] !== undefined;
  const isCorrect = (q: typeof questions[0]) => selectedAnswers[q.id] === q.correctIndex;

  return (
    <div className="flex">
      <TopicSidebar />
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 min-w-0">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Module Exam</h1>
            <p className="text-sm text-muted-foreground">{topicTitle}</p>
          </div>
        </div>

        {phase === 'start' && (
          <div className="border rounded-lg p-8 text-center">
            <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Ready for the Exam?</h2>
            <p className="text-muted-foreground mb-2">
              {questions.length} multiple-choice questions
            </p>
            <p className="text-muted-foreground mb-6">
              You must answer all questions correctly to pass.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => router.push(`/learn/${topicId}`)}>
                Review Material
              </Button>
              <Button onClick={handleStart}>
                Start Exam
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {phase === 'already-passed' && (
          <div className="border rounded-lg p-8 text-center">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
            <h2 className="text-xl font-semibold mb-2">Exam Already Passed</h2>
            <p className="text-muted-foreground mb-6">
              You&apos;ve already passed this module&apos;s exam. Great work!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {nextTopic && (
                <Button onClick={() => router.push(`/learn/${nextTopic.id}`)}>
                  Next Module: {nextTopic.title} <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
              <Button variant="outline" onClick={() => router.push(`/learn/${topicId}`)}>
                <BookOpen className="h-4 w-4 mr-1" />
                Review Material
              </Button>
              <Button variant="outline" onClick={() => router.push('/')}>
                Back to Home
              </Button>
            </div>
          </div>
        )}

        {phase === 'question' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Question {currentQ + 1} of {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((q, i) => (
                  <div
                    key={q.id}
                    className={`w-2 h-2 rounded-full ${
                      i === currentQ ? 'bg-primary' :
                      showResult[q.id] ? (isCorrect(q) ? 'bg-emerald-500' : 'bg-red-500') :
                      isAnswered(q.id) ? 'bg-primary/50' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="border rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold mb-4">{questions[currentQ].question}</h3>
              <div className="space-y-2">
                {questions[currentQ].options.map((option, idx) => {
                  const revealed = showResult[questions[currentQ].id];
                  const isSelected = selectedAnswers[questions[currentQ].id] === idx;
                  const isCorrectOption = questions[currentQ].correctIndex === idx;

                  let className = 'w-full justify-start text-left h-auto py-3 px-4';

                  if (revealed) {
                    if (isCorrectOption) {
                      className += ' border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300';
                    } else if (isSelected && !isCorrectOption) {
                      className += ' border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300';
                    } else {
                      className += ' opacity-50';
                    }
                  } else if (isSelected) {
                    className += ' border-primary';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !revealed && handleSelectAnswer(questions[currentQ].id, idx)}
                      className={`flex items-center gap-3 border rounded-lg ${className} transition-colors`}
                    >
                      <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-medium shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                      {revealed && isCorrectOption && <CheckCircle2 className="h-4 w-4 ml-auto text-emerald-500 shrink-0" />}
                      {revealed && isSelected && !isCorrectOption && <XCircle className="h-4 w-4 ml-auto text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {showResult[questions[currentQ].id] ? (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isCorrect(questions[currentQ])
                      ? <><CheckCircle2 className="h-4 w-4 text-emerald-500" /><span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Correct</span></>
                      : <><XCircle className="h-4 w-4 text-red-500" /><span className="text-sm font-medium text-red-700 dark:text-red-300">Incorrect</span></>
                    }
                  </div>
                  <Button onClick={handleNext}>
                    {currentQ < questions.length - 1 ? (
                      <>Next <ArrowRight className="h-4 w-4 ml-1" /></>
                    ) : (
                      'See Results'
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{questions[currentQ].explanation}</p>
              </div>
            ) : (
              <div className="flex justify-end">
                <Button
                  onClick={handleConfirm}
                  disabled={!isAnswered(questions[currentQ].id)}
                >
                  Confirm
                </Button>
              </div>
            )}
          </div>
        )}

        {phase === 'result' && (
          <div className="border rounded-lg p-8 text-center">
            {examPassed ? (
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
            ) : (
              <XCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            )}

            <h2 className="text-xl font-semibold mb-2">
              {examPassed ? 'Exam Passed!' : 'Exam Failed'}
            </h2>

            <p className="text-muted-foreground mb-2">
              Score: {questions.filter(q => selectedAnswers[q.id] === q.correctIndex).length} / {questions.length}
            </p>

            {attempted && (
              <div className="space-y-2 mb-6 text-left">
                {questions.map((q, i) => {
                  const userAnswer = selectedAnswers[q.id];
                  const correct = userAnswer === q.correctIndex;
                  return (
                    <div key={q.id} className={`border rounded-lg p-3 text-sm ${
                      correct ? 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-red-500/30 bg-red-50/50 dark:bg-red-950/20'
                    }`}>
                      <div className="flex items-start gap-2">
                        {correct
                          ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          : <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                        }
                        <div>
                          <p className="font-medium">{i + 1}. {q.question}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Your answer: <span className={correct ? 'text-emerald-600' : 'text-red-600'}>{q.options[userAnswer]}</span>
                            {!correct && <> · Correct answer: <span className="text-emerald-600">{q.options[q.correctIndex]}</span></>}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex gap-3 justify-center flex-wrap">
              {!examPassed && (
                <Button variant="outline" onClick={handleRetry}>
                  <RotateCcw className="h-4 w-4 mr-1" /> Retry Exam
                </Button>
              )}
              <Button variant="outline" onClick={() => router.push(`/learn/${topicId}`)}>
                Review Material
              </Button>
              {examPassed && nextTopic && (
                <Button onClick={() => router.push(`/learn/${nextTopic.id}`)}>
                  Next Module: {nextTopic.title} <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
              <Button variant="outline" onClick={() => router.push('/')}>
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
