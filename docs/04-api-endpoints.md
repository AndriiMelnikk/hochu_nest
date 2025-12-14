# API Endpoints

## Базовий URL

```
https://api.hochu.com/api
```

або для розробки:

```
http://localhost:3000/api
```

## Загальні принципи

1. **Аутентифікація:** Більшість endpoints вимагають JWT токен в заголовку `Authorization: Bearer <access_token>`
2. **Формат даних:** Всі запити та відповіді в форматі JSON
3. **Кодування:** UTF-8
4. **Пагінація:** Використовується для списків (page, pageSize)
5. **Сортування:** Можливе через query параметр `sort` (наприклад, `sort=-createdAt` для сортування за датою створення DESC)
6. **Фільтрація:** Через query параметри

## Коди відповідей

- `200 OK` - успішний запит
- `201 Created` - ресурс створено
- `400 Bad Request` - невалідні дані
- `401 Unauthorized` - не авторизовано
- `403 Forbidden` - недостатньо прав
- `404 Not Found` - ресурс не знайдено
- `422 Unprocessable Entity` - помилка валідації
- `500 Internal Server Error` - помилка сервера

## Формат помилок

```json
{
  "error": {
    "message": "string",
    "code": "string",
    "details": "object (optional)"
  }
}
```
