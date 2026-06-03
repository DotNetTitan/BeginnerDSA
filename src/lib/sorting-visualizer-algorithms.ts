export type BarState = 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';

export interface SortStep {
  array: number[];
  states: BarState[];
  description: string;
}

function createStep(arr: number[], states: BarState[], description: string): SortStep {
  return { array: [...arr], states: [...states], description };
}

function markSorted(states: BarState[], sorted: boolean[]): void {
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i]) states[i] = 'sorted';
  }
}

function* bubbleSortGenerator(initial: number[]): Generator<SortStep> {
  const arr = [...initial];
  const n = arr.length;
  const sorted: boolean[] = new Array(n).fill(false);

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const states = new Array<BarState>(n).fill('default');
      states[j] = 'comparing';
      states[j + 1] = 'comparing';
      markSorted(states, sorted);
      yield createStep(arr, states, `Comparing ${arr[j]} and ${arr[j + 1]}`);

      if (arr[j] > arr[j + 1]) {
        const swapStates = new Array<BarState>(n).fill('default');
        swapStates[j] = 'swapping';
        swapStates[j + 1] = 'swapping';
        markSorted(swapStates, sorted);
        yield createStep(arr, swapStates, `Swapping ${arr[j]} and ${arr[j + 1]}`);

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        const postSwapStates = new Array<BarState>(n).fill('default');
        postSwapStates[j] = 'swapping';
        postSwapStates[j + 1] = 'swapping';
        markSorted(postSwapStates, sorted);
        yield createStep(arr, postSwapStates, `${arr[j + 1]} bubbled up`);
      }
    }
    sorted[n - 1 - i] = true;
  }

  const finalStates = new Array<BarState>(n).fill('sorted');
  yield createStep(arr, finalStates, 'Array sorted!');
}

function* quickSortGenerator(initial: number[]): Generator<SortStep> {
  const arr = [...initial];
  const sorted: boolean[] = new Array(arr.length).fill(false);

  function* qs(lo: number, hi: number): Generator<SortStep> {
    if (lo >= hi) {
      if (lo >= 0 && lo < arr.length) sorted[lo] = true;
      const states = arr.map((_, i) => (sorted[i] ? 'sorted' as BarState : 'default' as BarState));
      yield createStep(arr, states, lo >= 0 && lo < arr.length ? `Element ${arr[lo]} in position` : 'Done');
      return;
    }

    const pivotVal = arr[hi];
    const pivotStates = new Array<BarState>(arr.length).fill('default');
    pivotStates[hi] = 'pivot';
    sorted.forEach((s, i) => { if (s) pivotStates[i] = 'sorted'; });
    yield createStep(arr, pivotStates, `Pivot: ${pivotVal}`);

    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      const cmpStates = new Array<BarState>(arr.length).fill('default');
      cmpStates[j] = 'comparing';
      cmpStates[hi] = 'pivot';
      pivotStates.forEach((v, k) => { if (v === 'pivot' || v === 'sorted') cmpStates[k] = v; });
      yield createStep(arr, cmpStates, `Comparing ${arr[j]} with pivot ${pivotVal}`);

      if (arr[j] <= pivotVal) {
        i++;

        const swapStates = new Array<BarState>(arr.length).fill('default');
        swapStates[i] = 'swapping';
        swapStates[j] = 'swapping';
        swapStates[hi] = 'pivot';
        sorted.forEach((s, k) => { if (s) swapStates[k] = 'sorted'; });
        yield createStep(arr, swapStates, `Swapping ${arr[i]} and ${arr[j]}`);

        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    const finalSwapStates = new Array<BarState>(arr.length).fill('default');
    finalSwapStates[i + 1] = 'swapping';
    finalSwapStates[hi] = 'swapping';
    yield createStep(arr, finalSwapStates, `Placing pivot ${pivotVal} in position`);

    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    sorted[i + 1] = true;

    const pivotPlaced = arr.map((_, k) => (sorted[k] ? 'sorted' as BarState : 'default' as BarState));
    yield createStep(arr, pivotPlaced, `Pivot ${arr[i + 1]} in correct position`);

    yield* qs(lo, i);
    yield* qs(i + 2, hi);
  }

  yield* qs(0, arr.length - 1);

  const finalStates = new Array<BarState>(arr.length).fill('sorted');
  yield createStep(arr, finalStates, 'Array sorted!');
}

function* mergeSortGenerator(initial: number[]): Generator<SortStep> {
  const arr = [...initial];
  const sorted: boolean[] = new Array(arr.length).fill(false);

  function* merge(lo: number, mid: number, hi: number): Generator<SortStep> {
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;

    while (i < left.length && j < right.length) {
      const cmpStates = new Array<BarState>(arr.length).fill('default');
      cmpStates[lo + i] = 'comparing';
      cmpStates[mid + 1 + j] = 'comparing';
      sorted.forEach((s, idx) => { if (s) cmpStates[idx] = 'sorted'; });
      yield createStep(arr, cmpStates, `Comparing ${left[i]} and ${right[j]}`);

      if (left[i] <= right[j]) {
        const getStates = new Array<BarState>(arr.length).fill('default');
        getStates[lo + i] = 'swapping';
        sorted.forEach((s, idx) => { if (s) getStates[idx] = 'sorted'; });
        yield createStep(arr, getStates, `Taking ${left[i]} from left`);
        arr[k] = left[i];
        i++;
      } else {
        const getStates = new Array<BarState>(arr.length).fill('default');
        getStates[mid + 1 + j] = 'swapping';
        sorted.forEach((s, idx) => { if (s) getStates[idx] = 'sorted'; });
        yield createStep(arr, getStates, `Taking ${right[j]} from right`);
        arr[k] = right[j];
        j++;
      }
      k++;
    }

    while (i < left.length) {
      const getStates = new Array<BarState>(arr.length).fill('default');
      getStates[lo + i] = 'swapping';
      sorted.forEach((s, idx) => { if (s) getStates[idx] = 'sorted'; });
      yield createStep(arr, getStates, `Taking remaining ${left[i]} from left`);
      arr[k] = left[i];
      i++;
      k++;
    }

    while (j < right.length) {
      const getStates = new Array<BarState>(arr.length).fill('default');
      getStates[mid + 1 + j] = 'swapping';
      sorted.forEach((s, idx) => { if (s) getStates[idx] = 'sorted'; });
      yield createStep(arr, getStates, `Taking remaining ${right[j]} from right`);
      arr[k] = right[j];
      j++;
      k++;
    }

    for (let idx = lo; idx <= hi; idx++) {
      sorted[idx] = true;
    }
    const mergedStates = new Array<BarState>(arr.length).fill('default');
    sorted.forEach((s, idx) => { if (s) mergedStates[idx] = 'sorted'; });
    yield createStep(arr, mergedStates, `Merged segment [${lo}-${hi}]`);
  }

  function* ms(lo: number, hi: number): Generator<SortStep> {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    yield* ms(lo, mid);
    yield* ms(mid + 1, hi);

    const splitStates = new Array<BarState>(arr.length).fill('default');
    for (let i = lo; i <= hi; i++) splitStates[i] = 'comparing';
    sorted.forEach((s, idx) => { if (s) splitStates[idx] = 'sorted'; });
    yield createStep(arr, splitStates, `Merging segment [${lo}-${mid}] and [${mid + 1}-${hi}]`);

    yield* merge(lo, mid, hi);
  }

  yield* ms(0, arr.length - 1);

  const finalStates = new Array<BarState>(arr.length).fill('sorted');
  yield createStep(arr, finalStates, 'Array sorted!');
}

export type AlgorithmType = 'bubble' | 'quick' | 'merge';

export function generateSteps(algorithm: AlgorithmType, array: number[]): SortStep[] {
  const generator = (() => {
    switch (algorithm) {
      case 'bubble': return bubbleSortGenerator(array);
      case 'quick': return quickSortGenerator(array);
      case 'merge': return mergeSortGenerator(array);
    }
  })();

  return Array.from(generator);
}

export function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

export function getAlgorithmName(algorithm: AlgorithmType): string {
  switch (algorithm) {
    case 'bubble': return 'Bubble Sort';
    case 'quick': return 'Quick Sort';
    case 'merge': return 'Merge Sort';
  }
}
