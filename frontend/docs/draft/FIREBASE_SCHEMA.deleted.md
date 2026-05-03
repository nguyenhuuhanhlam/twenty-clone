# Firebase Schema

## `users/{userId}`
```ts
type UserRecord = {
  created_at:   Timestamp
  auth_provider: "password" | "google"
  display_name: string
  email:        string
  role?:        string
  is_active:    boolean
}
```

Default query: `orderBy("created_at", "desc")`
