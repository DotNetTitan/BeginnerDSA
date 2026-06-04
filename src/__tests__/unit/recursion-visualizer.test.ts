import { describe, it, expect } from 'vitest';
import { generateFactorialSteps } from '@/lib/recursion-visualizer-algorithms';

describe('generateFactorialSteps', () => {
  it('generates steps for factorial(5)', () => {
    const steps = generateFactorialSteps();
    expect(steps.length).toBeGreaterThan(0);
    const last = steps[steps.length - 1];
    expect(last.description).toContain('120');
  });

  it('starts with a single active frame for n=5', () => {
    const steps = generateFactorialSteps();
    expect(steps[0].frames).toHaveLength(1);
    expect(steps[0].frames[0].n).toBe(5);
    expect(steps[0].frames[0].status).toBe('active');
  });

  it('builds up the call stack correctly', () => {
    const steps = generateFactorialSteps();
    // Step 4 should have frames for 5,4,3,2,1
    const stepWithBaseCase = steps.find(s =>
      s.frames.some(f => f.n === 1 && f.status === 'active')
    );
    expect(stepWithBaseCase).toBeDefined();
    expect(stepWithBaseCase!.frames.length).toBe(5);
  });

  it('has proper step structure', () => {
    const steps = generateFactorialSteps();
    for (const step of steps) {
      expect(step).toHaveProperty('frames');
      expect(step).toHaveProperty('description');
      for (const frame of step.frames) {
        expect(frame).toHaveProperty('n');
        expect(frame).toHaveProperty('status');
        expect(frame).toHaveProperty('result');
        expect(frame).toHaveProperty('expression');
      }
    }
  });
});
