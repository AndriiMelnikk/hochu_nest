# Чат та повідомлення

## Real-time комунікація

Для real-time повідомлень рекомендовано використовувати:
- **WebSocket** (Socket.io) - для двосторонньої комунікації
- **Server-Sent Events (SSE)** - для односторонніх оновлень

## Структура повідомлень

Повідомлення зберігаються в таблиці `messages` та можуть бути пов'язані з:
- Запитом (`request_id`)
- Пропозицією (`proposal_id`)
- Або бути приватним чатом між користувачами

## Історія чатів

**API Endpoints:**
- `GET /api/messages` - отримати повідомлення
  - Headers: `Authorization: Bearer <access_token>`
  - Query параметри:
    - `requestId` (number, опціонально) - фільтр по запиту
    - `proposalId` (number, опціонально) - фільтр по пропозиції
    - `userId` (number, опціонально) - фільтр по користувачу (для приватного чату)
    - `page` (number, опціонально)
    - `pageSize` (number, опціонально)
  - Response: `{ count: number, results: Message[] }`

- `POST /api/messages` - відправити повідомлення
  - Headers: `Authorization: Bearer <access_token>`
  - Request Body:
    ```json
    {
      "receiverId": "number (required)",
      "content": "string (required)",
      "requestId": "number (optional)",
      "proposalId": "number (optional)"
    }
    ```
  - Response: `Message`

- `PATCH /api/messages/:id/read` - позначити як прочитане
  - Headers: `Authorization: Bearer <access_token>`
  - Response: `{ success: boolean }`

- `GET /api/messages/conversations` - список розмов
  - Headers: `Authorization: Bearer <access_token>`
  - Response: `Conversation[]` (з останнім повідомленням та кількістю непрочитаних)

## WebSocket Events

Якщо використовується WebSocket:

**Клієнт → Сервер:**
- `message:send` - відправка повідомлення
- `message:read` - позначення як прочитане
- `typing:start` - початок набору тексту
- `typing:stop` - кінець набору тексту

**Сервер → Клієнт:**
- `message:new` - нове повідомлення
- `message:read` - повідомлення прочитано
- `typing` - користувач набирає текст
- `user:online` - користувач онлайн
- `user:offline` - користувач офлайн
