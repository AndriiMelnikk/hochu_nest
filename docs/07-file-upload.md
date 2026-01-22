# Файли та зображення

## Завантаження зображень

Зображення завантажуються через окремий endpoint перед створенням запиту/пропозиції.

**API Endpoint:**

- `POST /api/upload` - завантаження зображення
  - Headers: `Authorization: Bearer <access_token>`
  - Content-Type: `multipart/form-data`
  - Request Body: `file` (image file)
  - Response: `{ url: string }`

## Обмеження

- **Максимальний розмір файлу:** 10 MB
- **Формати:** JPEG, PNG, WebP
- **Максимальна кількість:** 5 зображень на запит/пропозицію

## Storage Strategy (Cloudflare R2)

Для продакшну використовується **Cloudflare R2** (S3-compatible).

### Налаштування ENV

```
STORAGE_PROVIDER=r2
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=...
R2_PUBLIC_BASE_URL=...
R2_PREFIX=...
R2_REGION=auto
```

### Примітки

- `R2_PUBLIC_BASE_URL` — публічний домен/URL для файлів (наприклад, через custom domain + CDN)
- `R2_PREFIX` — опціональний префікс директорії в бакеті
