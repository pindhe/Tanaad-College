# Tanaad College Website

Official promotional website and admissions platform for Tanaad College. The public site presents programs, news, events, and applications. The `/admin` dashboard manages all content in PostgreSQL.

This project is TypeScript-only: Next.js App Router, Prisma, Auth.js, Tailwind CSS, and shadcn/ui. There is no separate backend.

## Features

- Public college website with homepage, about, programs, admissions, faculty, student life, news, events, gallery, FAQ, search, and contact
- Multi-step online application with reference numbers (`TC-2026-00001`)
- Application status lookup
- Admin dashboard with role-based access
- Content management for programs, faculties, departments, staff, news, events, gallery, testimonials, FAQs, messages, and site settings
- Email notifications via Resend (optional in development)
- Cloudinary uploads with a local file fallback
- English / Somali / Arabic locale architecture with RTL for Arabic

## Technology

- Next.js 15 (App Router) and React 19
- TypeScript (strict)
- Tailwind CSS and shadcn/ui
- Prisma ORM and PostgreSQL
- Auth.js / NextAuth credentials authentication
- Zod and React Hook Form
- Framer Motion and Lucide React

## Installation

```bash
npm install
```

Copy environment variables:

```bash
copy .env.example .env
```

On macOS or Linux use `cp .env.example .env`.

Generate a long random value for `AUTH_SECRET`.

## Database setup

Start local PostgreSQL with Docker:

```bash
docker compose up -d
```

Or point `DATABASE_URL` to Neon, Supabase, Railway, or Vercel Postgres.

Then run:

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

## Admin setup

After seeding, sign in at `/admin/login` with the **demo** account:

- Email: `admin@tanaad.college`
- Password: `Admin@12345`

Change this password before any production use. Replace all `[Official ...]` placeholders and demo records with verified college information.

## Development

```bash
npm run dev
```

- Public website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- Apply: `http://localhost:3000/apply`
- Application status: `http://localhost:3000/application-status`

## Production build

```bash
npm run build
npm start
```

## Environment variables

See `.env.example` for:

- `DATABASE_URL`
- `AUTH_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_EMAIL`

Never commit `.env`.

## Deployment

Deploy on Vercel and attach a PostgreSQL provider (Neon, Supabase, Railway, or Vercel Postgres). Set the same environment variables in the Vercel project. Run migrations against the production database before the first deploy:

```bash
npx prisma migrate deploy
npx prisma db seed
```

## Content rule

Do not invent official accreditation, rankings, partnerships, awards, or statistics. Homepage counters and contact details come from Site Settings and should be updated by administrators only after they are confirmed.
