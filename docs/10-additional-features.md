# Додаткові функції

## Пошук та фільтрація

**Пошук:**
- Full-text search по заголовку та опису запитів
- Використовується FULLTEXT індекс в MySQL/MariaDB
- Або Elasticsearch для більш складних випадків

**Фільтрація:**
- За категорією
- За локацією
- За бюджетом (budgetMin, budgetMax)
- За терміновістю
- За статусом

## Пагінація

Всі endpoints зі списками підтримують пагінацію:

- `page` - номер сторінки (починається з 1)
- `pageSize` - розмір сторінки (за замовчуванням 20, максимум 100)

**Response формат:**
```json
{
  "count": 150,
  "next": "https://api.hochu.com/api/requests?page=2",
  "previous": null,
  "results": [...]
}
```

## Сортування

Сортування через query параметр `sort`:

- `sort=createdAt` - за датою створення (ASC)
- `sort=-createdAt` - за датою створення (DESC)
- `sort=price` - за ціною (ASC)
- `sort=-price` - за ціною (DESC)
- `sort=rating` - за рейтингом (ASC)
- `sort=-rating` - за рейтингом (DESC)

## Нотифікації

Система нотифікацій для інформування користувачів про:
- Нові пропозиції на їх запити
- Прийняття/відхилення їх пропозицій
- Нові повідомлення
- Отримання відгуків
- Розблоковування досягнень

**API Endpoints:**
- `GET /api/notifications` - отримати нотифікації
  - Headers: `Authorization: Bearer <access_token>`
  - Query параметри:
    - `unread` (boolean, опціонально) - тільки непрочитані
    - `page` (number, опціонально)
    - `pageSize` (number, опціонально)
  - Response: `{ count: number, results: Notification[] }`

- `PATCH /api/notifications/:id/read` - позначити як прочитане
  - Headers: `Authorization: Bearer <access_token>`
  - Response: `{ success: boolean }`

- `PATCH /api/notifications/read-all` - позначити всі як прочитані
  - Headers: `Authorization: Bearer <access_token>`
  - Response: `{ success: boolean }`

**Таблиця notifications:**

| Поле | Тип | Обмеження | Опис |
|------|-----|-----------|------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT | Унікальний ідентифікатор |
| user_id | INT | NOT NULL, FOREIGN KEY | ID користувача |
| type | VARCHAR(50) | NOT NULL | Тип нотифікації |
| title | VARCHAR(255) | NOT NULL | Заголовок |
| message | TEXT | NOT NULL | Текст нотифікації |
| link | VARCHAR(500) | NULL | Посилання |
| read | BOOLEAN | DEFAULT FALSE | Чи прочитано |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Дата створення |
