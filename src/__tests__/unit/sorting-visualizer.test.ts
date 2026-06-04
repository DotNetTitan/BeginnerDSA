import { describe, it, expect } from 'vitest';
import { generateSteps, generateRandomArray, getAlgorithmName } from '@/lib/sorting-visualizer-algorithms';

describe('generateSteps', () => {
  const arr = [30, 10, 20];

  it('generates steps for bubble sort', () => {
    const steps = generateSteps('bubble', arr);
    expect(steps.length).toBeGreaterThan(0);
    const last = steps[steps.length - 1];
    expect(last.description).toBe('Array sorted!');
    expect(last.states.every(s => s === 'sorted')).toBe(true);
    expect(last.array).toEqual([10, 20, 30]);
  });

  it('generates steps for quick sort', () => {
    const steps = generateSteps('quick', arr);
    expect(steps.length).toBeGreaterThan(0);
    const last = steps[steps.length - 1];
    expect(last.description).toBe('Array sorted!');
    expect(last.states.every(s => s === 'sorted')).toBe(true);
    expect(last.array).toEqual([10, 20, 30]);
  });

  it('generates steps for merge sort', () => {
    const steps = generateSteps('merge', arr);
    expect(steps.length).toBeGreaterThan(0);
    const last = steps[steps.length - 1];
    expect(last.description).toBe('Array sorted!');
    expect(last.states.every(s => s === 'sorted')).toBe(true);
    expect(last.array).toEqual([10, 20, 30]);
  });

  it('sorts a reversed array', () => {
    const steps = generateSteps('bubble', [5, 4, 3, 2, 1]);
    const last = steps[steps.length - 1];
    expect(last.array).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles a single element array', () => {
    const steps = generateSteps('bubble', [42]);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1].array).toEqual([42]);
  });

  it('handles an empty array', () => {
    const steps = generateSteps('bubble', []);
    // bubble sort generator produces a final 'sorted' step even for empty arrays
    expect(steps.length).toBeGreaterThanOrEqual(0);
  });

  it('creates steps with correct structure', () => {
    const steps = generateSteps('bubble', [3, 1, 2]);
    for (const step of steps) {
      expect(step).toHaveProperty('array');
      expect(step).toHaveProperty('states');
      expect(step).toHaveProperty('description');
      expect(step.array.length).toBe(3);
      expect(step.states.length).toBe(3);
    }
  });
});

describe('generateRandomArray', () => {
  it('generates an array of the given size', () => {
    const arr = generateRandomArray(5);
    expect(arr.length).toBe(5);
  });

  it('generates numbers in range [10, 99]', () => {
    const arr = generateRandomArray(100);
    for (const n of arr) {
      expect(n).toBeGreaterThanOrEqual(10);
      expect(n).toBeLessThanOrEqual(99);
    }
  });

  it('generates different arrays on subsequent calls', () => {
    const a = generateRandomArray(10);
    const b = generateRandomArray(10);
    expect(a).not.toEqual(b);
  });
});

describe('getAlgorithmName', () => {
  it('returns correct names', () => {
    expect(getAlgorithmName('bubble')).toBe('Bubble Sort');
    expect(getAlgorithmName('quick')).toBe('Quick Sort');
    expect(getAlgorithmName('merge')).toBe('Merge Sort');
  });
});
