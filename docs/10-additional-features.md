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
  "next": "https://api.shukayu.com/api/requests?page=2",
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

Централізована система сповіщень з preferences per profile, dispatcher, in-app inbox, WebSocket та email-каналом.

**Категорії preferences:**

- `new_requests` - підписка продавця на нові запити
- `request_updates` - статус запиту (схвалено/відхилено)
- `my_request_activity` - нова пропозиція на запит покупця
- `my_proposal_status` - статус пропозиції продавця
- `messages` - нові повідомлення
- `reviews` - нові відгуки
- `achievements` - розблоковані досягнення

**API Endpoints (inbox):**

- `GET /api/notifications` - отримати нотифікації (пагіновано)
  - Query: `unread`, `category`, `profileId`, `page` (default 1), `pageSize` (default 20, max 100)
  - Response: `{ count, next, previous, results }`
- `GET /api/notifications/unread-count` - кількість непрочитаних
- `PATCH /api/notifications/:id/read` - позначити як прочитане
- `PATCH /api/notifications/read-all` - позначити всі як прочитані

**API Endpoints (preferences):**

- `GET /api/users/:id/notification-preferences`
- `PATCH /api/users/:id/notification-preferences`

**API Endpoints (request subscriptions):**

- `GET /api/users/:id/request-subscriptions` (пагіновано: `page`, `pageSize`)
- `POST /api/users/:id/request-subscriptions`
- `PATCH /api/users/:id/request-subscriptions/:subscriptionId`
- `DELETE /api/users/:id/request-subscriptions/:subscriptionId`

**WebSocket namespace:** `/notifications`

- `notification:new` - нове сповіщення
- `notification:unread_count` - оновлення лічильника

**Таблиця notifications:**

| Поле      | Тип          | Обмеження              | Опис                     |
| --------- | ------------ | ---------------------- | ------------------------ |
| id        | ObjectId     | PRIMARY KEY            | Унікальний ідентифікатор |
| accountId | ObjectId     | NOT NULL, ref: Account | ID акаунта               |
| profileId | ObjectId     | NULL, ref: Profile     | Контекст buyer/seller    |
| type      | VARCHAR(50)  | NOT NULL               | Тип нотифікації          |
| category  | VARCHAR(50)  | NOT NULL               | Категорія preferences    |
| title     | VARCHAR(255) | NOT NULL               | Заголовок                |
| message   | TEXT         | NOT NULL               | Текст нотифікації        |
| link      | VARCHAR(500) | NULL                   | Посилання                |
| metadata  | Object       | NULL                   | requestId, proposalId... |
| read      | BOOLEAN      | DEFAULT FALSE          | Чи прочитано             |
| createdAt | Date         | DEFAULT NOW            | Дата створення           |
