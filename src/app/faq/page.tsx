import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is Zero To DSA?",
    a: "Zero To DSA is a structured learning platform that teaches you Data Structures & Algorithms from scratch. It is designed for absolute beginners who want to build a strong foundation before tackling problems on LeetCode, NeetCode, HackerRank, or similar platforms.",
  },
  {
    q: "How is this different from LeetCode or NeetCode?",
    a: "LeetCode and NeetCode are problem-solving platforms where you practice coding challenges. Zero To DSA is the step before that. We teach you the concepts, theory, and patterns first. Think of us as a textbook with interactive visualizations. Once you understand the material here, you will be much better prepared for those platforms.",
  },
  {
    q: "Do I need to know programming before starting?",
    a: "You should know the basics of at least one programming language (variables, loops, functions, conditionals). We do not teach syntax. We teach DSA concepts. Code examples are provided in Python, Java, C++, JavaScript, and C#.",
  },
  {
    q: "What languages are supported?",
    a: "All code examples and problem solutions are available in Python, Java, C++, JavaScript, and C#. You can switch languages at any time using the language selector in the top navigation bar.",
  },
  {
    q: "Is this free?",
    a: "Yes, Zero To DSA is completely free. If you find it helpful, you can support the project on Ko‑fi (link in the footer), but there is no paywall. All content is accessible to everyone.",
  },
  {
    q: "How does progress tracking work?",
    a: "Your progress is saved automatically in your browser's localStorage. Topics are unlocked sequentially. You must complete a topic (pass its exam) before the next one becomes available. You can view your overall progress on the Progress page. Clearing your browser data will reset your progress.",
  },
  {
    q: "How do exams work?",
    a: "Each topic has a multiple-choice exam to test your understanding. You must score 100% to pass. If you get a question wrong, you can review the topic material and retry. Exams are only available after you have studied the topic.",
  },
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
              <p className="text-muted-foreground">{faq.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
