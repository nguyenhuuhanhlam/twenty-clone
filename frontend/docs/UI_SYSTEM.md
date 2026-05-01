# UI System & shadcn/ui

Dự án đã tích hợp **shadcn/ui** kết hợp với **Tailwind CSS v4** để xây dựng giao diện hiện đại và nhất quán.

## Thành phần chính

### 1. shadcn/ui
- **Vị trí**: `src/components/ui/`
- **Cách thêm component mới**: `npx shadcn@latest add <component-name>`
- **Cấu hình**: Sử dụng `@/` path alias trỏ về `src/`.
- **Thư viện nền**: Base UI và Lucide React.

### 2. Design Tokens & Theme
- **File chính**: `src/shared/styles/theme.css`
- **Quy tắc**:
    - Các biến shadcn (như `--background`, `--primary`, `--sidebar`) được ánh xạ trực tiếp từ các token của dự án (`--bg`, `--accent`, `--surface`).
    - Luôn ưu tiên dùng biến CSS thay vì mã màu hex cứng trong component.
    - Hỗ trợ Dark Mode mặc định.

### 3. Hệ thống Sidebar (AppSidebar)
- **File**: `src/shared/components/app_sidebar.tsx`
- **Tính năng**:
    - **Collapsible**: Hỗ trợ thu nhỏ dạng icon (`collapsible="icon"`).
    - **Tooltip**: Tự động hiển thị chú thích khi thu nhỏ.
    - **Persistence**: Lưu trạng thái đóng/mở qua cookie.
    - **Phím tắt**: `Cmd+B` / `Ctrl+B` để toggle.
- **Lưu ý kỹ thuật**:
    - Dùng `render` prop của `SidebarMenuButton` để tích hợp thẻ `<a>`.
    - Khi Sidebar thu nhỏ (`data-state="collapsed"`), các thẻ `span` chứa text phải có class `group-data-[collapsible=icon]:hidden`.
    - Avatar sẽ tự động chuyển sang dạng chữ cái đầu (Text Avatar) khi thu nhỏ để đảm bảo thẩm mỹ.

### 4. Emotion CSS (CSS-in-JS)
- **Thư viện**: `@emotion/react`, `@emotion/styled`.
- **Vai trò**: 
    - Dùng cho các component cần logic style phức tạp, dynamic styling dựa trên props hoặc các animation/layout đặc thù mà Tailwind khó xử lý linh hoạt.
    - Kết hợp tốt với các biến CSS (`var(--...)`) đã định nghĩa trong `theme.css`.
- **Lưu ý**: Cần thêm `/** @jsxImportSource @emotion/react */` ở đầu file nếu dùng `css` prop.

## Quy tắc xây dựng UI mới
1. Kiểm tra xem component đã có trong `src/components/ui` chưa.
2. Nếu chưa, dùng lệnh `shadcn add` để thêm.
3. Khi tùy chỉnh style:
    - Ưu tiên dùng **Tailwind v4** cho các style tĩnh, tiện ích nhanh.
    - Dùng **Emotion Styled** cho các component phức tạp, có nhiều logic UI hoặc cần tính tái sử dụng cao trong feature.
4. Đảm bảo mọi thành phần tương tác đều có `Tooltip` khi ở trong không gian hẹp (như Sidebar thu nhỏ).
5. Luôn sử dụng Design Tokens (`var(--bg)`, `var(--text)`, ...) dù dùng Tailwind hay Emotion.
