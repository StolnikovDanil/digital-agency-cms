# Digital Agency CMS

Fullstack SSR-блог с админ-панелью для агентства веб-разработки. Публичная часть — лендинг и блог с SSR/ISR и SEO-оптимизацией. Админ-панель — полноценный CRUD с JWT-авторизацией.

## 🚀 Демо

- Frontend: _скоро (деплой на Vercel)_
- Backend API: _скоро (деплой на Render)_

## 🛠 Стек

**Frontend**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- SSR / ISR

**Backend**
- Express 5
- Prisma 7 (driver adapter `@prisma/adapter-pg`)
- PostgreSQL 18
- Zod (валидация)
- JWT + bcrypt (авторизация)

## ✨ Возможности

- SSR/ISR список статей и страница отдельной статьи с `generateMetadata`, `robots.ts`, `sitemap.ts`
- Админ-панель: создание, редактирование, удаление статей
- JWT-авторизация с httpOnly cookie, защищённые роуты через middleware
- Централизованная обработка ошибок, Loading/Error состояния (`loading.tsx`, `error.tsx`)
- Адаптивная вёрстка
- Автотесты (Vitest + Supertest)

## 📦 Локальный запуск

### Backend

\`\`\`bash
cd backend
npm install
cp .env.example .env
# заполни .env своими значениями (DATABASE_URL, JWT_SECRET и т.д.)
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
\`\`\`

### Frontend

\`\`\`bash
cd frontend
npm install
cp .env.example .env.local
# заполни NEXT_PUBLIC_API_URL и NEXT_PUBLIC_SITE_URL
npm run dev
\`\`\`

## 📁 Структура проекта

\`\`\`
digital-agency-cms/
├── backend/     # Express API
└── frontend/    # Next.js приложение
\`\`\`

## 🔐 Переменные окружения

См. `.env.example` в каждой из папок `backend/` и `frontend/`.