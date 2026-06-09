import type { Metadata } from "next";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ - Zero To DSA",
};

const faqs = [
  {
    q: "What is Zero To DSA?",
    a: "Zero To DSA is a structured learning platform for Data Structures & Algorithms. If you are learning from scratch, it builds up one topic at a time in a logical order. If you learned DSA years ago and need a refresher, it gives you the same structured path without assuming you remember anything (most of us don't).",
  },
  {
    q: "How is this different from LeetCode or NeetCode?",
    a: "LeetCode and NeetCode are problem-solving platforms. They assume you already know the concepts and just need practice. Zero To DSA teaches the concepts first. You learn, then practice, then move on. Whether you are learning DSA for the first time or coming back after years of real-world engineering, jumping straight into LeetCode with no structure is overwhelming. Think of us as the structured foundation that makes those platforms actually useful.",
  },
  {
    q: "Do I need to know programming before starting?",
    a: "You should know the basics of at least one programming language (variables, loops, functions, conditionals). We do not teach syntax. We teach DSA concepts. Code examples are provided in Python, Java, C++, TypeScript, and C#.",
  },
  {
    q: "What languages are supported?",
    a: "All code examples and problem solutions are available in Python, Java, C++, TypeScript, and C#. You can switch languages at any time using the language selector in the top navigation bar.",
  },
  {
    q: "Is this free?",
    a: "Yes, Zero To DSA is completely free. If you find it helpful, you can <a href=\"https://ko-fi.com/zerotodsa\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"underline underline-offset-2 hover:text-foreground\">support the project on Ko‑fi</a>, but there is no paywall. All content is accessible to everyone.",
  },
  {
    q: "How does progress tracking work?",
    a: "Your progress is saved automatically in your browser's localStorage. Topics are locked by default so you build in order, but you can unlock all modules at any time from the sidebar or home page if you want to jump around. Passing the exam is optional but marks the topic as completed. You can view your overall progress on the Progress page. Clearing your browser data will reset your progress.",
  },
  {
    q: "How do exams work?",
    a: "Each topic has a multiple-choice exam to test your understanding. You must score 100% to pass. If you get a question wrong, you can review the topic material and retry. Exams are unlocked after you have read the theory and solved all practice problems for that topic.",
  },
  // {
  //   q: "Is there a built-in code editor?",
  //   a: "Yes. Each practice problem includes a code editor where you can write, run, and test your solution directly in the browser. You can switch between supported languages, write your code, and see the output without leaving the page.",
  // },
  {
    q: "How are the problems structured?",
    a: "Each topic includes curated practice problems labeled Easy, Medium, or Hard. You can view the problem description, study the solution in your chosen language, and mark problems as complete. We recommend attempting to solve each problem on your own before looking at the solution.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Frequently Asked Questions</h1>
        <p className="text-sm text-muted-foreground">
          Everything you need to know about Zero To DSA.
        </p>
      </div>

      <Accordion>
        {faqs.map((faq, i) => (
          <AccordionItem key={i}>
            <AccordionTrigger>{faq.q}</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: faq.a }} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
