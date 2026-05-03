# AI Context

React + Vite + TypeScript + Firebase. Clone of Twenty CRM UI. Currently manages `users` collection only.

## Stack
- Auth: Firebase Google sign-in
- DB: Firestore realtime via `onSnapshot`
- Style: Tailwind CSS v4 (`@tailwindcss/vite`) + shadcn/ui + Emotion CSS
- Default: Dark mode

## Read First
| Topic | File |
|---|---|
| Architecture & routing | `ARCHITECTURE.md` |
| New module guide | `MODULE_STANDARD.md` |
| UI rules & tokens | `UI_SYSTEM.md` |
| Schema (source of truth) | `src/features/users/types.ts` + `services/users_service.ts` |

## Rules
- **No new CRM modules** (Companies, Deals…) unless explicitly requested.
- Firebase queries → `services/` only. Never inside UI components.
- Realtime state → `hooks/` only.
- UI components must be pure (props-in, render-out).
- Use CSS variables (`var(--bg)`, `var(--border)`…), never hardcoded hex.
- Update docs when schema or architecture changes.
