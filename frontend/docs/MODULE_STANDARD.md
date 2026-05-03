# Module Standard Guide

Tài liệu này định nghĩa cấu trúc chuẩn cho các module (features) mới trong dự án TwentyClone. Tất cả các module mới nên tuân thủ cấu trúc này để đảm bảo tính nhất quán và dễ bảo trì.

## 1. Cấu trúc thư mục (Folder Structure)

Mỗi module mới phải được đặt trong `src/features/<module_name>/` với cấu trúc sau:

```text
src/features/<module_name>/
├── components/           # Các UI component của module
│   ├── <module>_page.tsx         # Trang chính (Phải nhận props: { group: string, title: string })
│   ├── <module>_table.tsx        # Bảng hiển thị dữ liệu
│   └── <module>_detail_panel.tsx # Panel chi tiết (Resizable)
├── hooks/                # Custom hooks quản lý state/logic
│   └── use_<module>.ts
├── services/             # Lớp truy cập dữ liệu (API/Firestore)
│   └── <module>_service.ts
└── types.ts              # Định nghĩa TypeScript interfaces/types

**Lưu ý**: Tất cả tên file phải là chữ thường hoàn toàn, dùng snake_case (ví dụ: `hello_content_page.tsx`).
```

## 2. Quy tắc UI & Layout

### Trang chính (Page Component)
Trang chính phải sử dụng cấu trúc Split Layout để hỗ trợ Panel chi tiết:

- **Container**: Mọi trang phải được bọc trong thẻ `<div className="content">`. Lớp này đảm bảo trang chiếm trọn chiều cao màn hình và quản lý Topbar ổn định.
- **Header**: Sử dụng component chung `<Topbar />`. Truyền `breadcrumb={group}` và `title={title}` nhận được từ props.
- **Layout Container**: Sử dụng class `records-layout`. Thêm class `panel-open` khi có bản ghi được chọn.
- **SplitResizer**: Cho phép người dùng kéo thả để thay đổi chiều rộng của Panel chi tiết.

### Bảng dữ liệu (DataTable)
- **Bắt buộc**: Sử dụng component chung `<DataTable />` từ `src/shared/components/`.
- Hỗ trợ sẵn phân trang, chọn dòng (checkbox) và xử lý trạng thái loading/empty một cách nhất quán.
- Định nghĩa cột thông qua `ColumnDef` của TanStack Table.

### Panel chi tiết (Detail Panel)
- Sử dụng `aside` với class `detail-panel`.
- Header panel bao gồm nút đóng (X), Avatar/Icon, tiêu đề và nút More actions.
- Sử dụng `Tabs` (shadcn/ui) để phân loại thông tin (Overview, History, v.v.).

## 3. Phân tách trách nhiệm (Separation of Concerns)

1. **Services**: Chỉ chứa logic tương tác với Firebase hoặc API bên ngoài. Không chứa logic UI.
2. **Hooks**: Chứa logic quản lý state, subscribe dữ liệu thời gian thực. Trả về dữ liệu và trạng thái (loading, error).
3. **Components**:
    - **Page**: Điều phối layout và quản lý state "bản ghi được chọn".
    - **Table/Detail**: Thuần túy nhận props và hiển thị (Pure components).

## 4. Ví dụ mẫu (Reference)

- **Module mẫu**: `src/features/hello_content/`
- **Module thực tế**: `src/features/users/`

---
*Lưu ý: Luôn ưu tiên dùng Design Tokens (`var(--bg)`, `var(--border)`, ...) để đảm bảo hỗ trợ Dark Mode.*
