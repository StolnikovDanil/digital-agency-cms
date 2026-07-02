# Digital Agency CMS

Fullstack SSR-блог с админ-панелью: публичная часть на Next.js (SSR/ISR, SEO) и защищённая CMS для управления статьями.

**Демо:**
- Frontend: https://digital-agency-cms.vercel.app
- Backend API: https://digital-agency-cms.onrender.com

## Стек

**Frontend**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- SSR / ISR (`revalidate`)
- `next/image` для оптимизации изображений
- SEO: `robots.ts`, `sitemap.ts`, Metadata API, Open Graph

**Backend**
- Express 5
- Prisma 7
- PostgreSQL
- JWT-авторизация (httpOnly cookie)
- Zod-валидация

**Деплой**
- Frontend — Vercel
- Backend + PostgreSQL — Render

## Структура репозитория

```
digital-agency-cms/
├── backend/     # Express + Prisma API
└── frontend/    # Next.js приложение
```

## Основной функционал

### Публичная часть
- `/` — главная страница
- `/blog` — список опубликованных статей (ISR, `revalidate: 60`)
- `/blog/[slug]` — страница статьи (SSR, метаданные и Open Graph генерируются динамически)

### Админ-панель
- `/admin/login` — вход по email/паролю
- `/admin` — список статей (создание, редактирование, удаление)
- `/admin/new` — создание статьи (slug генерируется автоматически из заголовка, включая транслитерацию кириллицы)
- `/admin/[id]/edit` — редактирование статьи

Доступ к `/admin/*` защищён на двух уровнях:
- `middleware.ts` проверяет JWT (подпись и срок действия) из cookie перед рендером страницы
- Backend отдельно валидирует токен на каждом запросе к API (`requireAuth`)

## API

| Метод  | Endpoint             | Описание                          | Auth |
|--------|-----------------------|------------------------------------|------|
| GET    | `/posts`              | Все статьи                         | —    |
| GET    | `/posts/published`    | Опубликованные статьи              | —    |
| GET    | `/posts/:slug`        | Статья по slug                     | —    |
| GET    | `/posts/id/:id`       | Статья по id (для формы редактирования) | ✅ |
| POST   | `/posts`               | Создать статью                     | ✅   |
| PUT    | `/posts/:id`           | Обновить статью                    | ✅   |
| DELETE | `/posts/:id`           | Удалить статью                     | ✅   |
| POST   | `/auth/login`          | Вход, установка cookie             | —    |
| POST   | `/auth/logout`         | Выход, очистка cookie              | —    |

## Локальный запуск

### Backend

```bash
cd backend
npm install
cp .env.example .env   # заполнить переменные окружения
npx prisma migrate dev
npm run dev
```

Обязательные переменные окружения:

```
DATABASE_URL=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # заполнить переменные окружения
npm run dev
```

Обязательные переменные окружения:

```
BACKEND_URL=                  # абсолютный URL backend (для SSR/сборки)
NEXT_PUBLIC_API_URL=/api      # относительный путь, проксируется через rewrite
NEXT_PUBLIC_SITE_URL=         # публичный URL фронтенда (для sitemap/OG)
```

## Архитектурные решения

- **Единый домен для cookie.** Frontend и backend задеплоены на разных доменах (Vercel / Render), поэтому браузер не расшаривал httpOnly cookie между ними. Решение — `rewrite`-прокси в `next.config.js` (`/api/:path*` → `BACKEND_URL`): с точки зрения браузера все запросы идут на домен Vercel, cookie ставится и читается корректно с `sameSite: "lax"`.

- **Разный API URL для сервера и браузера.** Относительный путь `/api` работает только в браузере (нет домена в контексте Node.js при SSR/сборке), поэтому `src/lib/api.ts` выбирает URL в зависимости от окружения:
  ```ts
  const API_URL = typeof window === "undefined"
      ? process.env.BACKEND_URL
      : process.env.NEXT_PUBLIC_API_URL;
  ```

- **JWT-валидация в middleware.** `middleware.ts` выполняется в Edge Runtime, где недоступны Node.js API из `jsonwebtoken`, поэтому для проверки подписи и срока действия токена используется edge-совместимая библиотека `jose`.

## Известные ограничения

- **Cold start backend.** Render на бесплатном тарифе "усыпляет" сервис при простое — первый запрос после паузы может занимать несколько секунд, включая сборку sitemap и SSR-страниц, которые обращаются к API.
- **ISR-задержка контента.** `/blog` и `sitemap.xml` используют инкрементальную регенерацию (`revalidate`), поэтому новая или отредактированная статья может отобразиться в списке/sitemap не мгновенно, а в течение окна ревалидации (60 сек для страниц, 1 час для sitemap).
- **Sitemap при недоступном backend.** Если на момент сборки/ревалидации backend недоступен, `sitemap.ts` не роняет билд — отдаёт sitemap только со статичными страницами (без списка статей), ошибка логируется в консоль сборки.
- **`JWT_SECRET` задублирован** в переменных окружения Render (backend) и Vercel (frontend middleware) — это осознанный компромисс ради простоты pet-проекта; при ротации секрета нужно обновлять значение на обеих платформах.