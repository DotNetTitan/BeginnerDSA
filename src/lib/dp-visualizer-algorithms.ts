export interface DPStep {
  values: (number | null)[];
  computingIndex: number;
  referencedIndices: number[];
  formula: string;
  description: string;
}

export function generateClimbingStairsSteps(n: number = 6): DPStep[] {
  const steps: DPStep[] = [];
  const dp: (number | null)[] = Array(n + 1).fill(null);

  steps.push({
    values: [...dp],
    computingIndex: -1,
    referencedIndices: [],
    formula: '',
    description: 'We will compute how many ways there are to reach each step, from bottom up.',
  });

  dp[0] = 1;
  steps.push({
    values: [...dp],
    computingIndex: 0,
    referencedIndices: [],
    formula: 'ways[0] = 1',
    description: 'There is 1 way to be at the starting point (take no steps).',
  });

  dp[1] = 1;
  steps.push({
    values: [...dp],
    computingIndex: 1,
    referencedIndices: [],
    formula: 'ways[1] = 1',
    description: 'There is 1 way to reach step 1: take one step.',
  });

  for (let i = 2; i <= n; i++) {
    const val = dp[i - 1]! + dp[i - 2]!;
    dp[i] = val;
    steps.push({
      values: [...dp],
      computingIndex: i,
      referencedIndices: [i - 2, i - 1],
      formula: `ways[${i}] = ways[${i - 1}] + ways[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${val}`,
      description: `To reach step ${i}, you can come from step ${i - 1} or step ${i - 2}. That gives ${dp[i - 1]} + ${dp[i - 2]} = ${val} ways.`,
    });
  }

  steps.push({
    values: [...dp],
    computingIndex: n,
    referencedIndices: [],
    formula: `There are ${dp[n]} ways to climb ${n} steps.`,
    description: `Done! Each step's value was built from previously computed results — that's dynamic programming.`,
  });

  return steps;
}
