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
| 2 | 20.08.2026 | Next.js Modular Architecture, Auth & Full Deployment (Render + Vercel) | Done ✅ | Frontend, Backend, DevOps, Auth | `frontend/src/services/auth.service.ts` |
| 3 | 23.08.2026 | Авторизація v2.0, Захист Роутів & Re-hydration | Done ✅ | Frontend, Backend, Auth | `frontend/src/middleware.ts` |
| 4 | --.--.2026 | Стилізація Входу (Auth UI v2.0) & Модуль Таймера | Draft 📝 | Frontend, Auth | `frontend/src/app/login/page.tsx` |

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

### 🗓️ Сеанс #2 (20.08.2026) — Next.js Modular Architecture, Auth & Full Deployment (Render + Vercel)

#### ✅ Реалізовано:
- **Модульна архітектура проекту**:
  - Сторінки у `src/app/` мають всього по 4 рядки коду (`/`, `/login`, `/admin`, `/kitty`).
  - Створено універсальні UI компоненти [Button](file:///Users/pryge/Programming/love-story/frontend/src/components/UI/Button/Button.tsx) та [Input](file:///Users/pryge/Programming/love-story/frontend/src/components/UI/Input/Input.tsx) із власніми `.module.css`.
  - Модулі чисто розділено за ролями `src/components/modules/admin/` та `src/components/modules/kitty/`.
- **Архітектурні покращення Senior-рівня**:
  - **1. Barrel Exports (`index.ts`)**: чисті короткі імпорти для UI та всіх модулів.
  - **2. API Сервісний шар**: [src/services/auth.service.ts](file:///Users/pryge/Programming/love-story/frontend/src/services/auth.service.ts) виніс усю мережеву логіку `fetch` з UI-компонентів.
  - **3. Централізовані типи**: [src/types/auth.ts](file:///Users/pryge/Programming/love-story/frontend/src/types/auth.ts) містить інтерфейси `User`, `Role`, DTOs та `AuthResponse`.
  - **4. Глобальні CSS змінні**: [src/app/globals.css](file:///Users/pryge/Programming/love-story/frontend/src/app/globals.css) додано Design Tokens (`--primary-color`, `--pink-color`, `--kitty-bg`, `--admin-bg`).
- **Деплой та Зв'язок**:
  - **NestJS Backend** задеплоєно на **Render.com** (`https://love-story-mr3u.onrender.com`).
  - **Next.js Frontend** задеплоєно на **Vercel**.
  - **Keep-Alive (24/7 Активність)**: ендпоінт `GET /health` у [app.controller.ts](file:///Users/pryge/Programming/love-story/backend/src/app.controller.ts) + UptimeRobot пінг що 5 хвилин (сервер не засинає).
- **Повне тестування**: успішна перевірка авторизації Admin (Email + Password) та Katia (PIN 1501) в реальному часі!

---

### 🗓️ Сеанс #3 (23.08.2026) — Авторизація v2.0, Захист Роутів & Re-hydration

#### ✅ Реалізовано:
- **1. Поділ Входів за Ролями (Auth v2.0)**:
  - Основний роут `/login` призначений ТІЛЬКИ для Киці (4-значний PIN `1501`).
  - Створено секретний роут для входу Адміна `/login/admin` ([page.tsx](file:///Users/pryge/Programming/love-story/frontend/src/app/login/admin/page.tsx)).
- **2. Захист роутів (Next.js Middleware)**:
  - Створено [src/middleware.ts](file:///Users/pryge/Programming/love-story/frontend/src/middleware.ts) для автоматичної перевірки доступу до `/admin` та `/kitty`.
  - Встановлено збереження та видалення cookie `accessToken` у [useAuthStore.ts](file:///Users/pryge/Programming/love-story/frontend/src/store/useAuthStore.ts).
- **3. Авто-авторизація при оновленні (Re-hydration)**:
  - Створено [AuthProvider.tsx](file:///Users/pryge/Programming/love-story/frontend/src/components/providers/AuthProvider.tsx), який автоматично перевіряє токен у `localStorage` через `authService.getMe(token)` та відновлює сесію без повторного вводу PIN/пароля при оновленні сторінки (F5).

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

### 🗓️ Сеанс #2 (20.08.2026) — Next.js Modular Architecture, Auth & Full Deployment (Render + Vercel)

#### ✅ Реалізовано:
- **Модульна архітектура проекту**:
  - Сторінки у `src/app/` мають всього по 4 рядки коду (`/`, `/login`, `/admin`, `/kitty`).
  - Створено універсальні UI компоненти [Button](file:///Users/pryge/Programming/love-story/frontend/src/components/UI/Button/Button.tsx) та [Input](file:///Users/pryge/Programming/love-story/frontend/src/components/UI/Input/Input.tsx) із власніми `.module.css`.
  - Модулі чисто розділено за ролями `src/components/modules/admin/` та `src/components/modules/kitty/`.
- **Архітектурні покращення Senior-рівня**:
  - **1. Barrel Exports (`index.ts`)**: чисті короткі імпорти для UI та всіх модулів.
  - **2. API Сервісний шар**: [src/services/auth.service.ts](file:///Users/pryge/Programming/love-story/frontend/src/services/auth.service.ts) виніс усю мережеву логіку `fetch` з UI-компонентів.
  - **3. Централізовані типи**: [src/types/auth.ts](file:///Users/pryge/Programming/love-story/frontend/src/types/auth.ts) містить інтерфейси `User`, `Role`, DTOs та `AuthResponse`.
  - **4. Глобальні CSS змінні**: [src/app/globals.css](file:///Users/pryge/Programming/love-story/frontend/src/app/globals.css) додано Design Tokens (`--primary-color`, `--pink-color`, `--kitty-bg`, `--admin-bg`).
- **Деплой та Зв'язок**:
  - **NestJS Backend** задеплоєно на **Render.com** (`https://love-story-mr3u.onrender.com`).
  - **Next.js Frontend** задеплоєно на **Vercel**.
  - **Keep-Alive (24/7 Активність)**: ендпоінт `GET /health` у [app.controller.ts](file:///Users/pryge/Programming/love-story/backend/src/app.controller.ts) + UptimeRobot пінг що 5 хвилин (сервер не засинає).
- **Повне тестування**: успішна перевірка авторизації Admin (Email + Password) та Katia (PIN 1501) в реальному часі!

---

### 🗓️ Сеанс #3 (24.08.2026) — Авторизація v2.0, Захист Роутів & Re-hydration

#### ⏳ В процесі:
- **1. Поділ Входів за Ролями (Auth v2.0)**:
  - Основний роут `/login` призначений ТІЛЬКИ для Киці (4-значний PIN `1501`).
  - Створено секретний роут для входу Адміна `/login/admin` ([page.tsx](file:///Users/pryge/Programming/love-story/frontend/src/app/login/admin/page.tsx)).
- **2. Захист роутів (Next.js Middleware)**:
  - Створено [src/middleware.ts](file:///Users/pryge/Programming/love-story/frontend/src/middleware.ts) для автоматичної перевірки доступу до `/admin` та `/kitty`.
  - Встановлено збереження та видалення cookie `accessToken` у [useAuthStore.ts](file:///Users/pryge/Programming/love-story/frontend/src/store/useAuthStore.ts).
- **3. Авто-авторизація при оновленні (Re-hydration)**:
  - Планується перевірка токена у `localStorage` при завантаженні через `authService.getMe(token)`.

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

### 🗓️ Сеанс #2 (20.08.2026) — Next.js Modular Architecture, Auth & Full Deployment (Render + Vercel)

#### ✅ Реалізовано:
- **Модульна архітектура проекту**:
  - Сторінки у `src/app/` мають всього по 4 рядки коду (`/`, `/login`, `/admin`, `/kitty`).
  - Створено універсальні UI компоненти [Button](file:///Users/pryge/Programming/love-story/frontend/src/components/UI/Button/Button.tsx) та [Input](file:///Users/pryge/Programming/love-story/frontend/src/components/UI/Input/Input.tsx) із власніми `.module.css`.
  - Модулі чисто розділено за ролями `src/components/modules/admin/` та `src/components/modules/kitty/`.
- **Архітектурні покращення Senior-рівня**:
  - **1. Barrel Exports (`index.ts`)**: чисті короткі імпорти для UI та всіх модулів.
  - **2. API Сервісний шар**: [src/services/auth.service.ts](file:///Users/pryge/Programming/love-story/frontend/src/services/auth.service.ts) виніс усю мережеву логіку `fetch` з UI-компонентів.
  - **3. Централізовані типи**: [src/types/auth.ts](file:///Users/pryge/Programming/love-story/frontend/src/types/auth.ts) містить інтерфейси `User`, `Role`, DTOs та `AuthResponse`.
  - **4. Глобальні CSS змінні**: [src/app/globals.css](file:///Users/pryge/Programming/love-story/frontend/src/app/globals.css) додано Design Tokens (`--primary-color`, `--pink-color`, `--kitty-bg`, `--admin-bg`).
- **Деплой та Зв'язок**:
  - **NestJS Backend** задеплоєно на **Render.com** (`https://love-story-mr3u.onrender.com`).
  - **Next.js Frontend** задеплоєно на **Vercel**.
  - **Keep-Alive (24/7 Активність)**: ендпоінт `GET /health` у [app.controller.ts](file:///Users/pryge/Programming/love-story/backend/src/app.controller.ts) + UptimeRobot пінг що 5 хвилин (сервер не засинає).
- **Повне тестування**: успішна перевірка авторизації Admin (Email + Password) та Katia (PIN 1501) в реальному часі!


