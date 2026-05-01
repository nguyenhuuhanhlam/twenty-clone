# People Firebase UI

React + Vite app trình bày collection `users` từ Firebase.

## Chạy local

```bash
npm install
cp .env.example .env
npm run dev
```

Điền Firebase config vào `.env`, bật Google Auth và tạo Firestore collection `users`.

## Collection `users`

```ts
{
  created_at: Timestamp
  auth_provider: "password" | "google"
  display_name: string
  email: string
  role?: string
  is_active: boolean
}
```

## Kiến trúc

- `src/app`: shell và entry app.
- `src/config`: Firebase config.
- `src/features/auth`: đăng nhập.
- `src/features/people`: màn hình People và Firestore users.
- `src/shared`: component và CSS dùng chung.
- `docs`: ngữ cảnh để AI tiếp tục dự án.

## Styling

- Tailwind CSS v4 dùng qua `@tailwindcss/vite`.
- Entry Tailwind nằm trong `src/shared/styles/theme.css`.
- CSS layout hiện tại được giữ trong `@layer components`.
