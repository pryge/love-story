import { AdminLoginForm } from '@/components/modules/admin/auth';
import styles from '../login.module.css';

export default function AdminLoginPage() {
  return (
    <main className={styles.container}>
      <h2 className={styles.title}>👑 Вхід для Адміна</h2>
      <AdminLoginForm />
    </main>
  );
}
