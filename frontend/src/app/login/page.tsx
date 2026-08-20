import { AdminLoginForm } from '@/components/modules/admin/auth';
import { KittyLoginForm } from '@/components/modules/kitty/auth';
import styles from './login.module.css';

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>🔐 Вхід у Love Story</h2>
      <AdminLoginForm />
      <KittyLoginForm />
    </main>
  );
}
