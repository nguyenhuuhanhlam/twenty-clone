# Firebase Schema

## Collection `users`

Path: `users/{userId}`

```ts
type UserRecord = {
  created_at: Timestamp
  auth_provider: "password" | "google"
  display_name: string
  email: string
  role?: string
  is_active: boolean
}
```

Ví dụ:

```json
{
  "created_at": "serverTimestamp",
  "auth_provider": "google",
  "display_name": "Lan Anh",
  "email": "lan@anphat.vn",
  "role": "Quản lý",
  "is_active": true
}
```

Query hiện tại order theo `created_at desc`.
