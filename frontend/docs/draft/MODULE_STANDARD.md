# Module Standard

## Folder Structure
```
src/features/<module>/
├── components/
│   ├── <module>_page.tsx          # props: { group: string, title: string }
│   ├── <module>_table.tsx
│   └── <module>_detail_panel.tsx
├── hooks/
│   └── use_<module>.ts
├── services/
│   └── <module>_service.ts
└── types.ts
```
> File names: lowercase `snake_case` only.

## Layer Responsibilities
| Layer | Responsibility |
|---|---|
| `services` | Firestore / API I/O — no UI logic |
| `hooks` | State, subscriptions, loading/error — no Firebase import in UI |
| `components/Page` | Layout orchestration, manages selected-record state |
| `components/Table` & `Detail` | Pure — props in, render out |

## Page Layout (required)
```tsx
<div className="content">               // full-height, stable topbar
  <Topbar breadcrumb={group} title={title} />
  <div className={cn("records-layout", selected && "panel-open")}>
    <DataTable ... />
    <SplitResizer />
    <aside className="detail-panel"> ... </aside>
  </div>
</div>
```

## DataTable
- Use `<DataTable />` from `src/shared/components/` — do not build custom tables.
- Columns via TanStack `ColumnDef`.
- Built-in: pagination, checkbox row select, loading/empty states.

## Detail Panel
- `<aside className="detail-panel">`
- Header: close (X) · Avatar · title · More actions button
- Body: `<Tabs>` (shadcn/ui) — e.g. Overview, History

## Reference Modules
- Template: `src/features/hello_content/`
- Production: `src/features/users/`
