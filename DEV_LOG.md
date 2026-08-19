# 💖 Love Story — Dev Log

## 🏷️ Довідник модулів для Notion (Modules Multi-select)

### 🌐 Головні сфери (Main Domains):
`Frontend`, `Backend`, `Database`, `DevOps`

### ⚡ Функціональні модулі (Feature Modules):
- 🔐 `Auth` — Авторизація, JWT, 4-pin вход, Ролі (ADMIN / KITTY)
- ⏳ `Timer & Calendar` — Лічильник часу разом, Календар важливих подій
- 🎁 `Wishlist` — Список бажаних подарунків, статус «Куплено (Сюрприз)»
- 📜 `Sin-o-meter` — «Гріхомір» / Список провин та кнопка «Простити»
- 💬 `Quotes` — Реєстр смішних цитат та висловлювань
- 🎟️ `Coupons` — Купони кохання / Інтерактивні сертифікати
- 💖 `100 Reasons` — 100 причин кохання + святкове конфетті
- 🎯 `Bucket List` — Список спільних мрій та цілей на майбутнє
- 🔒 `Secret Safe` — Секретний сейф / Великодки (Easter Eggs) та фото
- ☕ `Fast Order` — Кнопка «Принеси смачненьке!» + Telegram повідомлення
- 🌙 `Night Mode` — Авто-нічна тема «Good Night» (після 23:00)
- 👑 `Admin Dashboard` — Жива стрічка дій, Birthday Mode, Telegram-Центр

---

## 📊 Загальна таблиця сеансів

| # | Дата | Назва сеансу | Status | Modules | Resume File |
|---|---|---|---|---|---|
| 1 | 19.08.2026 | Створення бази даних та Повна авторизація (Auth Backend) | Done ✅ | Backend, Database, Auth | `backend/src/auth/auth.controller.ts` |
| 2 | 20.08.2026 | Next.js UI, Тестування Auth & Деплой на Vercel | In Progress ⏳ | Frontend, Backend, DevOps, Auth | `frontend/src/app/page.tsx` |

---

## 📌 Детальний журнал розробки

### 🗓️ Сеанс #1 (19.08.2026) — Створення бази даних та Повна авторизація (Auth Backend)

#### ✅ Реалізовано:
- **База даних Supabase + Prisma 7**:
  - Налаштовано `schema.prisma` з ролями `ADMIN` та `KITTY`.
  - Застосовано міграцію `init_user` в Supabase.
  - Увімкнено **RLS** у Supabase SQL Editor.
- **Логіка Auth у NestJS**:
  - Ендпоінти: `POST /auth/login-admin` та `POST /auth/login-pin` (`1501`).
  - Захищений `GET /auth/me` через `JwtAuthGuard`.
  - Валідація Zod.
- **Prisma Seed**:
  - Створено `prisma/seed.ts`, додано акаунти Admin та Katia у Supabase.

---

### 🗓️ Сеанс #2 (20.08.2026) — Next.js UI, Тестування Auth & Деплой на Vercel

#### ⏳ В процесі:
- **Next.js Frontend UI**: Створення базового красивого дизайну з формами входу (Admin Login & Романтичний 4-значний PIN для Каті).
- **Інтеграція Auth**: Перевірка входу, збереження JWT токена, перенаправлення на захищений профіль.
- **Деплой на Vercel**: Налаштування та деплой бекенду NestJS і фронтенду Next.js.

