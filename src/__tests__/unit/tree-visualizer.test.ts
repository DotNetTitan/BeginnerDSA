import { describe, it, expect } from 'vitest';
import { generateTraversalSteps, getTraversalDescription } from '@/lib/tree-visualizer-algorithms';

describe('generateTraversalSteps', () => {
  it('generates steps for inorder traversal', () => {
    const steps = generateTraversalSteps('inorder');
    expect(steps.length).toBeGreaterThan(0);
    const last = steps[steps.length - 1];
    expect(last.description).toBe('Traversal complete!');
    expect(last.result).toEqual([5, 10, 15, 20, 25, 30, 35]);
  });

  it('generates steps for preorder traversal', () => {
    const steps = generateTraversalSteps('preorder');
    expect(steps.length).toBeGreaterThan(0);
    const last = steps[steps.length - 1];
    expect(last.description).toBe('Traversal complete!');
    expect(last.result).toEqual([20, 10, 5, 15, 30, 25, 35]);
  });

  it('generates steps for postorder traversal', () => {
    const steps = generateTraversalSteps('postorder');
    expect(steps.length).toBeGreaterThan(0);
    const last = steps[steps.length - 1];
    expect(last.description).toBe('Traversal complete!');
    expect(last.result).toEqual([5, 15, 10, 25, 35, 30, 20]);
  });

  it('generates steps for level order traversal', () => {
    const steps = generateTraversalSteps('levelorder');
    expect(steps.length).toBeGreaterThan(0);
    const last = steps[steps.length - 1];
    expect(last.description).toBe('Traversal complete!');
    expect(last.result).toEqual([20, 10, 30, 5, 15, 25, 35]);
  });

  it('each step has proper structure', () => {
    const steps = generateTraversalSteps('inorder');
    for (const step of steps) {
      expect(step).toHaveProperty('positions');
      expect(step).toHaveProperty('currentNode');
      expect(step).toHaveProperty('visited');
      expect(step).toHaveProperty('result');
      expect(step).toHaveProperty('highlighted');
      expect(step).toHaveProperty('description');
    }
  });
});

describe('getTraversalDescription', () => {
  it('returns correct descriptions', () => {
    expect(getTraversalDescription('inorder')).toContain('Inorder');
    expect(getTraversalDescription('preorder')).toContain('Preorder');
    expect(getTraversalDescription('postorder')).toContain('Postorder');
    expect(getTraversalDescription('levelorder')).toContain('Level Order');
  });
});
