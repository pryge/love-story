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
| 2 | 20.08.2026 | Next.js Modular UI & Створення компонентів | Done ✅ | Frontend, Auth | `frontend/src/app/login/page.tsx` |
| 3 | 20.08.2026 | Деплой на Render (Backend) & Vercel (Frontend) | Done ✅ | Frontend, Backend, DevOps | `frontend/src/services/auth.service.ts` |
| 4 | --.--.2026 | Створення Дизайну, Таймера та Спільного Календаря | Draft 📝 | Frontend, Auth | `frontend/src/app/kitty/page.tsx` |

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

### 🗓️ Сеанс #2 (20.08.2026) — Next.js Modular UI & Створення компонентів

#### ✅ Реалізовано:
- **Модульна архітектура проекту**:
  - Сторінки у `src/app/` мають всього по 4 рядки коду (`/`, `/login`, `/admin`, `/kitty`).
  - Створено універсальні UI компоненти [Button](file:///Users/pryge/Programming/love-story/frontend/src/components/UI/Button/Button.tsx) та [Input](file:///Users/pryge/Programming/love-story/frontend/src/components/UI/Input/Input.tsx) із власніми `.module.css`.
- **Архітектурні покращення Senior-рівня**:
  - **1. Barrel Exports (`index.ts`)**: створити чисті короткі імпорти для `src/components/UI` та всіх ролевих модулів `src/components/modules/admin/` і `src/components/modules/kitty/`.
  - **2. API Сервісний шар**: [src/services/auth.service.ts](file:///Users/pryge/Programming/love-story/frontend/src/services/auth.service.ts) виніс усю мережеву логіку `fetch` з UI-компонентів.
  - **3. Централізовані типи**: [src/types/auth.ts](file:///Users/pryge/Programming/love-story/frontend/src/types/auth.ts) містить інтерфейси `User`, `Role`, DTOs та `AuthResponse`.
  - **4. Глобальні CSS змінні**: [src/app/globals.css](file:///Users/pryge/Programming/love-story/frontend/src/app/globals.css) додано Design Tokens (`--primary-color`, `--pink-color`, `--kitty-bg`, `--admin-bg`).
- **Успішний Build**: `npm run build` пройдено з **0 помилок**!

---

### 🗓️ Сеанс #3 (20.08.2026) — Деплой на Render (Backend) & Vercel (Frontend)

#### ✅ Реалізовано:
- **Бекенд NestJS задеплоєно на Render.com**:
  - Задеплоєно як Web Service у папці `backend`.
  - Підключено змінні `DATABASE_URL` та `DIRECT_URL` для Supabase.
  - Життєве посилання бекенду: `https://love-story-mr3u.onrender.com`.
- **Фронтенд Next.js задеплоєно на Vercel**:
  - Задеплоєно у папці `frontend`.
  - Підключено `NEXT_PUBLIC_API_URL` до Render бекенду.
- **Повне тестування входу**:
  - Успішна перевірка авторизації Admin (Email + Password) та Katia (PIN 1501).
  - Успішне визначення ролей та перенаправлення у відповідні кабінети!


