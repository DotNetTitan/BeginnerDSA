import { describe, it, expect } from 'vitest';
import { generateClimbingStairsSteps } from '@/lib/dp-visualizer-algorithms';

describe('generateClimbingStairsSteps', () => {
  it('generates steps for n=6', () => {
    const steps = generateClimbingStairsSteps(6);
    expect(steps.length).toBeGreaterThan(0);
    const last = steps[steps.length - 1];
    expect(last.values[6]).toBe(13);
    expect(last.description).toContain('Done');
  });

  it('starts with an empty dp array', () => {
    const steps = generateClimbingStairsSteps(3);
    expect(steps[0].values.every(v => v === null)).toBe(true);
  });

  it('computes fibonacci-like sequence', () => {
    const steps = generateClimbingStairsSteps(6);
    const dp6 = steps.find(s => s.computingIndex === 6);
    expect(dp6).toBeDefined();
    expect(dp6!.values[6]).toBe(13);
    expect(dp6!.formula).toContain('ways[6]');
  });

  it('has proper step structure', () => {
    const steps = generateClimbingStairsSteps(4);
    for (const step of steps) {
      expect(step).toHaveProperty('values');
      expect(step).toHaveProperty('computingIndex');
      expect(step).toHaveProperty('referencedIndices');
      expect(step).toHaveProperty('formula');
      expect(step).toHaveProperty('description');
    }
  });
});
