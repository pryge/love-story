import { KittyLoginForm } from '@/components/modules/kitty/auth';
import styles from './login.module.css';

export default function KittyLoginPage() {
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>🔐 Вхід у Love Story</h2>
      <KittyLoginForm />
    </main>
  );
}
