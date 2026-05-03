# UI System

## shadcn/ui
- Components: `src/components/ui/` — add via `npx shadcn@latest add <name>`
- Path alias: `@/` → `src/`
- Base: Radix UI + Lucide React

## Design Tokens
File: `src/shared/styles/theme.css`

shadcn vars (`--background`, `--primary`, `--sidebar`…) are mapped from project tokens:

| Token | Usage |
|---|---|
| `--bg` | Page / app background |
| `--surface` | Card / panel background |
| `--accent` | Hover, active highlight |
| `--border` | Default border |
| `--border-soft` | Subtle border |

**Always use `var(--token)`, never hardcoded hex.**

## Ultra-Compact Sizing (CRM standard)
| Element | Value |
|---|---|
| Table row height | 26px |
| Topbar height | 48px |
| Button default | `size="xs"` → 24px |
| Icon button | `size="icon-xs"` |
| Checkbox | `size-3.5` (14px) |
| Primary hover | `#6d28d9` (violet) |

## Status Avatars
Avatar bg reflects record status — centered with Flexbox:
- `active` → Emerald/Green
- `inactive` → Red

## AppSidebar (`src/shared/components/app_sidebar.tsx`)
- Collapsible icon mode (`collapsible="icon"`) · cookie-persisted · `Cmd/Ctrl+B` toggle
- Collapsed: text `<span>` needs `group-data-[collapsible=icon]:hidden`
- Collapsed: show text-avatar instead of image avatar
- Use `render` prop on `SidebarMenuButton` to wrap `<a>` tags

## Styling Decision Tree
```
Static utility → Tailwind v4
Dynamic/prop-based logic → Emotion Styled
Complex layout constraints → shared CSS modules (src/shared/styles/modules/)
```

> Emotion: add `/** @jsxImportSource @emotion/react */` when using `css` prop.

## CSS Architecture
- `src/shared/styles/layout.css` — single entry point
- `src/shared/styles/modules/` — split by concern
- `.content` class: `flex: 1; min-height: 0` — required on every page root
