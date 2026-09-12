import { KittySinometer } from '@/components/modules/kitty/widgets/KittySinometer/KittySinometer';

export const metadata = {
  title: 'Забава · Kitty',
  description: 'Гріхомір — стеж за провинами і прощай ♥',
};

export default function FunPage() {
  return (
    <main style={{ padding: '80px 16px 24px' }}>
      <KittySinometer />
    </main>
  );
}
