'use client';

import { topics } from '@/lib/topics';
import { getTopicProgress } from '@/lib/progress-store';
import { useEffect, useState } from 'react';

export default function IntroContent() {
  const [completed, setCompleted] = useState(() => getTopicProgress('intro').completed);
  useEffect(() => {
    const handler = () => setCompleted(getTopicProgress('intro').completed);
    window.addEventListener('dsa-progress-changed', handler);
    return () => window.removeEventListener('dsa-progress-changed', handler);
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold mb-3">Data Structures</h2>
        <p className="text-base text-foreground/80 mb-3">
          A data structure is just a way of organizing data on a computer. Think of it like
          organizing your files. You could throw everything into one big folder
          (an array). You could label things with sticky notes so you can find them
          instantly (a hash map). You could stack papers in a pile where you can
          only grab the top one (a stack). You could arrange things in a hierarchy
          like a family tree (a tree).
        </p>
        <p className="text-base text-foreground/80">
          Different data structures are good at different things. Some are fast at
          adding data. Some are fast at searching. Some keep things in order.
          Choosing the right one is the first step to writing good code.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Algorithms</h2>
        <p className="text-base text-foreground/80 mb-3">
          An algorithm is a set of steps to solve a problem. If you have a phone
          book and need to find Smith, you would not read every name from the
          start. You would flip to the middle, see if Smith is before or after,
          then repeat. That is binary search, and it is an algorithm.
        </p>
        <p className="text-base text-foreground/80">
          Most problems can be solved in more than one way. The difference is
          often speed. An algorithm that takes 1 millisecond vs one that takes
          10 seconds is the difference between a working app and a broken one.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Why learn this stuff?</h2>
        <ul className="text-base text-foreground/80 space-y-2 list-disc pl-5">
          <li>You will write code that runs faster and uses less memory.</li>
          <li>You will learn to think through problems before writing code.</li>
          <li>Many companies ask DSA questions in interviews for a reason: it tests how you approach problems, not what you memorized.</li>
          <li>Once you know the patterns, a lot of coding problems become variations of things you already know.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">What this course covers</h2>
        <p className="text-base text-foreground/80 mb-4">
          There are {topics.filter(t => t.id !== 'intro').length} modules, ordered so that each one builds on the previous.
          You can go through them in order, or jump around once you unlock them.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">How each module works</h2>
        <div className="text-base text-foreground/80 space-y-2">
          <p><strong>Learn.</strong> Read through the theory sections with code examples and visualizations.</p>
          <p><strong>Practice.</strong> Solve problems that test your understanding. Start with easy ones, work up to harder ones.</p>
          <p><strong>Exam.</strong> Pass a short quiz to lock in the module. Once you pass, the next module unlocks.</p>
        </div>
      </section>

      {!completed && (
        <div className="border rounded-lg p-5 bg-muted/30 text-center">
          <p className="font-semibold mb-1">Ready to start?</p>
          <p className="text-sm text-muted-foreground mb-3">
            Click &ldquo;Mark as Read&rdquo; below to unlock Module 1.
          </p>
        </div>
      )}
    </div>
  );
}
