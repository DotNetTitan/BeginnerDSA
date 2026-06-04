import { describe, it, expect } from 'vitest';
import { generateBfsSteps, generateDfsSteps, getGraphData } from '@/lib/graph-visualizer-algorithms';

describe('generateBfsSteps', () => {
  it('visits all nodes starting from 0', () => {
    const steps = generateBfsSteps(0);
    const last = steps[steps.length - 1];
    expect(last.visited.sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('initializes with the start node in the queue', () => {
    const steps = generateBfsSteps(0);
    expect(steps[0].frontier).toContain(0);
    expect(steps[0].frontLabel).toBe('queue');
  });

  it('has proper step structure', () => {
    const steps = generateBfsSteps(0);
    for (const step of steps) {
      expect(step).toHaveProperty('visited');
      expect(step).toHaveProperty('current');
      expect(step).toHaveProperty('frontier');
      expect(step).toHaveProperty('frontLabel');
      expect(step).toHaveProperty('description');
    }
  });
});

describe('generateDfsSteps', () => {
  it('visits all nodes starting from 0', () => {
    const steps = generateDfsSteps(0);
    const last = steps[steps.length - 1];
    expect(last.visited.sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('initializes with the start node on the stack', () => {
    const steps = generateDfsSteps(0);
    expect(steps[0].frontier).toContain(0);
    expect(steps[0].frontLabel).toBe('stack');
  });

  it('has proper step structure', () => {
    const steps = generateDfsSteps(0);
    for (const step of steps) {
      expect(step).toHaveProperty('visited');
      expect(step).toHaveProperty('current');
      expect(step).toHaveProperty('frontier');
      expect(step).toHaveProperty('frontLabel');
      expect(step).toHaveProperty('description');
    }
  });
});

describe('getGraphData', () => {
  it('returns nodes and edges', () => {
    const data = getGraphData();
    expect(data.nodes).toHaveLength(6);
    expect(data.edges).toHaveLength(6);
    expect(data.nodes[0]).toHaveProperty('id');
    expect(data.nodes[0]).toHaveProperty('x');
    expect(data.nodes[0]).toHaveProperty('y');
    expect(data.edges[0]).toHaveProperty('from');
    expect(data.edges[0]).toHaveProperty('to');
  });
});
