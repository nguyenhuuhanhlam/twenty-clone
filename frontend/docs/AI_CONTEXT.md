# AI Context

Ứng dụng React + Vite + Firebase được thiết kế để xây dựng một khung ứng dụng (framework) tương tự như **Twenty CRM**, cụ thể là quản lý collection `users`.

## Trạng thái hiện tại

- **Ngôn ngữ UI**: Tiếng Anh (Đã chuẩn hóa).
- **Kiến trúc**: Cấu trúc dựa trên module feature.
- **Firebase Auth**: Tích hợp đăng nhập Google.
- **Firestore**: Đồng bộ thời gian thực cho collection `users` qua `onSnapshot`.
- **Styling**: Mặc định Dark mode, Tailwind CSS v4 qua `@tailwindcss/vite`, layout tùy chỉnh trong `src/shared/styles`.
- **Layout**: 
  - Sidebar có thể thu gọn (Collapsible).
  - Bảng Users (Cấu trúc tương tự TanStack).
  - Panel chi tiết có thể thay đổi kích thước (Split layout 8px, kéo thả được).

## Các file cần đọc trước

- **Kiến trúc**: `docs/architecture.md`
- **Tiêu chuẩn Module**: `docs/module_standard.md`
- **Schema Firebase**: `docs/firebase_schema.md`
- **Tính năng Users**: `src/features/users`
- **Shared UI**: `src/shared`

## Quy tắc phát triển

- **Mục tiêu**: Duy trì cảm giác cao cấp và trải nghiệm người dùng (UX) tương tự như Twenty.com.
- **Modules**: Không thêm các module CRM khác (Opportunities, Companies,...) trừ khi được yêu cầu rõ ràng.
- **Phân tách trách nhiệm**:
  - Không viết query Firebase bên trong component UI.
  - Lớp truy cập dữ liệu nằm trong `services`.
  - Quản lý state thời gian thực nằm trong `hooks`.
  - Component UI nên thuần túy (pure) và tập trung vào hiển thị.
- **Styling**: Ưu tiên Tailwind utility cho các UI nhỏ; dùng Shared CSS cho các ràng buộc layout cốt lõi.
- **Tài liệu**: Luôn cập nhật docs nếu schema hoặc kiến trúc thay đổi.
