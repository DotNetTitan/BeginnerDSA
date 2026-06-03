'use client';

import SortingVisualizer from './SortingVisualizer';
import TreeVisualizer from './TreeVisualizer';
const COMPONENT_MAP: Record<string, React.ReactNode> = {
  'bubble-sort-viz': <SortingVisualizer algorithm="bubble" />,
  'quick-sort-viz': <SortingVisualizer algorithm="quick" />,
  'merge-sort-viz': <SortingVisualizer algorithm="merge" />,
  'tree-traversal-viz': <TreeVisualizer />,
};

export default function DynamicSectionComponent({ name }: { name: string }) {
  return COMPONENT_MAP[name] ?? null;
}
