'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ComplexityAnswer({
  timeComplexity,
  spaceComplexity,
}: {
  timeComplexity: string;
  spaceComplexity: string;
}) {
  return (
    <Accordion>
      <AccordionItem value="answer">
        <AccordionTrigger className="text-sm font-medium">Complexity Analysis</AccordionTrigger>
        <AccordionContent>
          <div className="border rounded-lg p-4 text-sm space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-muted-foreground w-32">Time Complexity</span>
              <span className="font-mono font-bold text-primary">{timeComplexity}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-muted-foreground w-32">Space Complexity</span>
              <span className="font-mono font-bold text-primary">{spaceComplexity}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
