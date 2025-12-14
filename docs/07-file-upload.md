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

## Storage Strategy

Рекомендовано використовувати:
- **Cloud Storage:** AWS S3, Google Cloud Storage, або Cloudinary
- **CDN:** Для швидкої доставки зображень
