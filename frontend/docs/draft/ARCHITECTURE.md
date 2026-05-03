# Architecture

Feature-based folder structure.

## Directory Map
```
src/
├── app/              # App shell, route registry (router.tsx, App.tsx)
├── config/           # Firebase init
├── features/
│   ├── auth/         # Google auth service + hook + login screen
│   └── users/        # Main feature: service, hook, table, detail panel
├── shared/
│   ├── components/   # Reusable UI: DataTable, Topbar, AppSidebar, SmartTabsList…
│   └── styles/
│       ├── theme.css      # CSS variable tokens
│       └── layout.css     # Entry point → imports /modules/*.css
└── components/ui/    # shadcn/ui primitives
```

## Routing (Metadata-driven)
Defined in `src/app/router.tsx`:
```ts
Record<string, { Component, group, title }>
```
`App.tsx` reads the current hash and passes `{ group, title }` as props to every Page — breadcrumb is automatic, no hardcoding per page.

## Core Shared Components
| Component | Path | Notes |
|---|---|---|
| `DataTable` | `src/shared/components/data_table.tsx` | Pagination, row select, ultra-compact style |
| `Topbar` | `src/shared/components/topbar.tsx` | Receives `breadcrumb` + `title` props |

## Adding a New Feature
```
src/features/<name>/
  components/   # Page, Table, DetailPanel
  hooks/        # State & realtime subscriptions
  services/     # Firestore / API calls only
  types.ts
```
See `MODULE_STANDARD.md` for full conventions.
