import {
  BarChart3, List, Bookmark, Link2, Layers, RefreshCw,
  ArrowUpDown, GitBranch, Share2, BrainCircuit, Zap, ListIcon,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'big-o': BarChart3,
  'arrays-strings': List,
  'hashmaps-sets': Bookmark,
  'linked-lists': Link2,
  'stacks-queues': Layers,
  'recursion': RefreshCw,
  'sorting-searching': ArrowUpDown,
  'trees': GitBranch,
  'graphs': Share2,
  'dynamic-programming': BrainCircuit,
  'greedy-intervals': Zap,
};

export default function TopicIcon({ topicId, className = '' }: { topicId: string; className?: string }) {
  const Icon = iconMap[topicId] ?? ListIcon;
  return <Icon className={className} />;
}
