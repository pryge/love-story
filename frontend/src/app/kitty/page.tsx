'use client';

import dynamic from 'next/dynamic';

const KittyMemoryConstellation = dynamic(
  () =>
    import(
      '@/components/modules/kitty/widgets/KittyMemoryConstellation/KittyMemoryConstellation'
    ).then((mod) => mod.KittyMemoryConstellation),
  { ssr: false }
);

export default function KittyPage() {
  return <KittyMemoryConstellation />;
}
