# AI Context

App React + Vite + Firebase để hiển thị collection `users` dưới dạng màn hình People.

## Hiện có

- Firebase Auth: Google login.
- Firestore: realtime `users` qua `onSnapshot`.
- UI tiếng Việt, dark mode.
- Tailwind CSS v4 qua `@tailwindcss/vite`; CSS hiện tại nằm trong `src/shared/styles`.
- Sidebar có collapse.
- People table.
- Detail panel dạng split, khe 8px, resize được.

## Đọc file nào trước

- Kiến trúc: `docs/architecture.md`
- Schema Firebase: `docs/firebase_schema.md`
- People feature: `src/features/people`
- Shared UI: `src/shared`

## Quy tắc

- Không thêm CRM module khác khi chưa được yêu cầu.
- Không để query Firebase trong component UI.
- Data access nằm trong `services`.
- State realtime nằm trong `hooks`.
- Component nhận props và render UI.
- Khi thêm style mới, ưu tiên Tailwind utility cho UI nhỏ; layout lớn có thể giữ trong shared CSS.
- Nếu đổi schema hoặc kiến trúc, cập nhật docs.
