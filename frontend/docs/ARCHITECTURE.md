# Architecture

Project dùng feature-based folders.

## Cấu trúc

- `src/app`: composition cấp app, shell, route registry.
- `src/config`: cấu hình hạ tầng như Firebase.
- `src/features/auth`: auth service, hook, màn hình login.
- `src/features/users`: users service, hook, table, detail panel.
- `src/shared/components`: UI dùng lại.
- `src/components/ui`: Các component từ **shadcn/ui**.
- `src/shared/styles`: Chứa `theme.css` (biến màu) và `layout.css` (entry point cho các CSS modules trong thư mục `/modules`).

Xem chi tiết tại [UI_SYSTEM.md](./ui_system.md) và [MODULE_STANDARD.md](./module_standard.md).

## Hệ thống Routing (Metadata-driven)

Dự án sử dụng cơ chế định tuyến dựa trên Metadata tập trung tại `src/app/router.tsx`. Mỗi route không chỉ định nghĩa Component mà còn chứa thông tin về phân nhóm (`group`) và tiêu đề (`title`).

- **Cấu trúc**: `Record<string, { Component, group, title }>`
- **Cơ chế**: `App.tsx` sẽ tự động trích xuất metadata từ hash URL hiện tại và truyền xuống các Page component dưới dạng props. Điều này đảm bảo tính nhất quán của Breadcrumb trên `Topbar` mà không cần hardcode tại từng trang.

## Thành phần cốt lõi (Core Shared)

Để đảm bảo tính nhất quán cao, mọi module mới phải sử dụng các thành phần sau:
- **DataTable**: Component generic tại `src/shared/components/data_table.tsx`. Hỗ trợ phân trang, chọn dòng và style siêu gọn.
- **Topbar**: Component header tại `src/shared/components/topbar.tsx`.

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
- CSS được chia nhỏ theo chức năng trong `src/shared/styles/modules/` để dễ bảo trì.
- Tailwind v4 đã cấu hình trong `vite.config.ts`.
