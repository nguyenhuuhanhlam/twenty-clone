# Architecture

Project dùng feature-based folders.

## Cấu trúc

- `src/app`: composition cấp app, shell, route registry.
- `src/config`: cấu hình hạ tầng như Firebase.
- `src/features/auth`: auth service, hook, màn hình login.
- `src/features/users`: users service, hook, table, detail panel.
- `src/shared/components`: UI dùng lại.
- `src/components/ui`: Các component từ **shadcn/ui**.
- `src/shared/styles`: Tailwind entry, theme và layout CSS.

Xem chi tiết tại [UI_SYSTEM.md](./ui_system.md).

## Thêm feature mới

Tạo thư mục:

```text
src/features/<feature>/
  components/
  hooks/
  services/
  types.ts
```

Quy tắc:

- Firestore/API code đặt trong `services`.
- Subscribe/fetch state đặt trong `hooks`.
- UI không import trực tiếp Firebase SDK.
- Shared component chỉ chứa UI dùng lại, không chứa business logic.
- Tailwind v4 đã cấu hình trong `vite.config.ts`.
