import type { Metadata } from 'next';
import ProgressContent from './ProgressContent';

export const metadata: Metadata = {
  title: 'Progress - Zero To DSA',
};

export default function ProgressPage() {
  return <ProgressContent />;
}
