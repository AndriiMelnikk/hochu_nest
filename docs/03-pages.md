# Опис сторінок та необхідних даних

## 1. Головна сторінка (`/`)

**Опис:** Лендінг сторінка з Hero секцією, Features, HowItWorks та Footer.

**Дані з бекенду:**
- Статистика платформи (опціонально, для динамічного відображення)

**API Endpoints:**
- `GET /api/stats` - статистика платформи
  - Response: `{ totalUsers: number, totalRequests: number, totalDeals: number, averageRating: number }`

---

## 2. Перегляд запитів (`/browse`)

**Опис:** Сторінка зі списком запитів, фільтрацією за категорією, локацією, бюджетом та пошуком.

**Дані з бекенду:**
- Список активних запитів з пагінацією
- Фільтри: категорія, локація, бюджет, пошук

**API Endpoints:**
- `GET /api/requests` - список запитів
  - Query параметри:
    - `category` (string, опціонально) - категорія
    - `search` (string, опціонально) - пошук по заголовку/опису
    - `location` (string, опціонально) - локація
    - `budgetMin` (number, опціонально) - мінімальний бюджет
    - `budgetMax` (number, опціонально) - максимальний бюджет
    - `page` (number, опціонально, default: 1) - номер сторінки
    - `pageSize` (number, опціонально, default: 20) - розмір сторінки
  - Response: `{ count: number, next: string | null, previous: string | null, results: Request[] }`

---

## 3. Створення запиту (`/create`)

**Опис:** Форма для створення нового запиту на послугу.

**Дані з бекенду:**
- Список категорій (може бути статичним на фронтенді)

**API Endpoints:**
- `POST /api/requests` - створення запиту
  - Headers: `Authorization: Bearer <access_token>`
  - Request Body:
    ```json
    {
      "title": "string (required, min 1)",
      "description": "string (required, min 10)",
      "category": "string (required)",
      "budgetMin": "number (required, min 0)",
      "budgetMax": "number (required, min 0)",
      "location": "string (required, min 1)",
      "urgency": "string (required)",
      "images": "string[] (optional)"
    }
    ```
  - Response: `Request` (створений запит)

---

## 4. Деталі запиту (`/request/[id]`)

**Опис:** Детальна сторінка запиту з:
- Інформацією про запит
- Списком пропозицій від продавців
- Публічними обговореннями
- Формою для створення пропозиції
- Інформацією про покупця
- Можливістю скарги

**Дані з бекенду:**
- Деталі запиту
- Інформація про покупця
- Список пропозицій до запиту
- Публічні обговорення
- Можливість створення пропозиції
- Можливість додавання коментаря
- Можливість скарги

**API Endpoints:**
- `GET /api/requests/:id` - деталі запиту
  - Response: `RequestWithBuyer` (запит з інформацією про покупця)

- `GET /api/requests/:id/proposals` - пропозиції до запиту
  - Query параметри:
    - `page` (number, опціонально)
    - `pageSize` (number, опціонально)
  - Response: `{ count: number, results: ProposalWithSeller[] }`

- `GET /api/requests/:id/discussions` - публічні обговорення
  - Response: `Discussion[]`

- `POST /api/requests/:id/proposals` - створення пропозиції
  - Headers: `Authorization: Bearer <access_token>`
  - Request Body:
    ```json
    {
      "price": "number (required, min 0)",
      "title": "string (required)",
      "description": "string (required)",
      "estimatedTime": "string (required)",
      "warranty": "string (required)",
      "images": "string[] (optional)"
    }
    ```
  - Response: `ProposalWithSeller`

- `POST /api/requests/:id/discussions` - додавання коментаря
  - Headers: `Authorization: Bearer <access_token>`
  - Request Body:
    ```json
    {
      "content": "string (required)",
      "replyToId": "number (optional)"
    }
    ```
  - Response: `Discussion`

- `POST /api/requests/:id/report` - скарга на запит
  - Headers: `Authorization: Bearer <access_token>`
  - Request Body:
    ```json
    {
      "reason": "string (required, enum: low-price, scam, inappropriate, spam, duplicate, other)",
      "details": "string (optional)"
    }
    ```
  - Response: `{ success: boolean, message: string }`

---

## 5. Деталі пропозиції (`/proposal/[id]`)

**Опис:** Детальна сторінка пропозиції з:
- Інформацією про пропозицію
- Інформацією про продавця
- Інформацією про покупця (оригінальний запит)
- Коментарями/обговоренням
- Відгуками про продавця
- Можливістю прийняття/відхилення пропозиції

**Дані з бекенду:**
- Деталі пропозиції
- Інформація про продавця
- Інформація про покупця та оригінальний запит
- Коментарі до пропозиції
- Відгуки про продавця

**API Endpoints:**
- `GET /api/proposals/:id` - деталі пропозиції
  - Response: `ProposalWithSeller` (пропозиція з інформацією про продавця та запит)

- `GET /api/proposals/:id/comments` - коментарі до пропозиції
  - Response: `Discussion[]`

- `POST /api/proposals/:id/accept` - прийняття пропозиції
  - Headers: `Authorization: Bearer <access_token>`
  - Response: `{ success: boolean, message: string }`

- `POST /api/proposals/:id/reject` - відхилення пропозиції
  - Headers: `Authorization: Bearer <access_token>`
  - Response: `{ success: boolean, message: string }`

- `POST /api/proposals/:id/comments` - додавання коментаря
  - Headers: `Authorization: Bearer <access_token>`
  - Request Body:
    ```json
    {
      "content": "string (required)",
      "replyToId": "number (optional)"
    }
    ```
  - Response: `Discussion`

---

## 6. Профіль користувача (`/profile`)

**Опис:** Профіль користувача з вкладками:
- Огляд (overview) - активні запити, останні угоди
- Досягнення (gamification) - XP, рівні, досягнення
- Аналітика (analytics) - статистика користувача
- Відгуки (reviews) - відгуки про користувача
- Повідомлення (messages) - чат з іншими користувачами
- Налаштування (settings) - редагування профілю

**Дані з бекенду:**
- Дані поточного користувача
- Запити користувача
- Пропозиції користувача
- Відгуки про користувача
- Статистика користувача
- Досягнення користувача

**API Endpoints:**
- `GET /api/users/me` - дані поточного користувача
  - Headers: `Authorization: Bearer <access_token>`
  - Response: `User`

- `GET /api/users/:id/requests` - запити користувача
  - Query параметри:
    - `status` (string, опціонально) - статус запитів
    - `page` (number, опціонально)
    - `pageSize` (number, опціонально)
  - Response: `{ count: number, results: Request[] }`

- `GET /api/users/:id/proposals` - пропозиції користувача
  - Query параметри:
    - `status` (string, опціонально) - статус пропозицій
    - `page` (number, опціонально)
    - `pageSize` (number, опціонально)
  - Response: `{ count: number, results: Proposal[] }`

- `GET /api/users/:id/reviews` - відгуки про користувача
  - Query параметри:
    - `page` (number, опціонально)
    - `pageSize` (number, опціонально)
  - Response: `{ count: number, results: Review[] }`

- `GET /api/users/:id/stats` - статистика користувача
  - Response:
    ```json
    {
      "totalRequests": "number",
      "totalProposals": "number",
      "acceptedProposals": "number",
      "completedDeals": "number",
      "averageRating": "number",
      "totalEarned": "number (для продавців)",
      "totalSpent": "number (для покупців)"
    }
    ```

- `GET /api/users/:id/achievements` - досягнення користувача
  - Response: `UserAchievement[]`

- `PATCH /api/users/me` - оновлення профілю
  - Headers: `Authorization: Bearer <access_token>`
  - Request Body:
    ```json
    {
      "name": "string (optional)",
      "avatar": "string (optional)",
      "location": "string (optional)"
    }
    ```
  - Response: `User`

---

## 7. Авторизація (`/login`, `/register`)

**Опис:** Сторінки входу та реєстрації.

**Дані з бекенду:**
- Вхід користувача
- Реєстрація нового користувача
- Оновлення токенів

**API Endpoints:**
- `POST /api/auth/register` - реєстрація
  - Request Body:
    ```json
    {
      "email": "string (required, email format)",
      "password": "string (required, min 6)",
      "name": "string (required, min 2)"
    }
    ```
  - Response: `AuthResponse` (access_token, refresh_token, user)

- `POST /api/auth/login` - вхід
  - Request Body:
    ```json
    {
      "email": "string (required)",
      "password": "string (required)"
    }
    ```
  - Response: `AuthResponse`

- `POST /api/auth/refresh` - оновлення токену
  - Request Body:
    ```json
    {
      "refresh_token": "string (required)"
    }
    ```
  - Response: `{ access_token: string, refresh_token: string }`

- `POST /api/auth/logout` - вихід
  - Headers: `Authorization: Bearer <access_token>`
  - Response: `{ success: boolean }`

---

## 8. Блог (`/blog`, `/blog/[id]`)

**Опис:** Список статей блогу та детальна сторінка статті.

**Дані з бекенду:**
- Список опублікованих статей
- Деталі статті

**API Endpoints:**
- `GET /api/blog/posts` - список статей
  - Query параметри:
    - `category` (string, опціонально) - категорія
    - `page` (number, опціонально)
    - `pageSize` (number, опціонально)
  - Response: `{ count: number, results: BlogPost[] }`

- `GET /api/blog/posts/:id` - деталі статті
  - Response: `BlogPost`

---

## 9. Адмін панель (`/admin`)

**Опис:** Адміністративна панель для модерації контенту та управління платформою.

**Дані з бекенду:**
- Статистика платформи
- Запити на модерацію
- Пропозиції на модерацію
- Користувачі зі скаргами
- Можливість затвердження/відхилення контенту
- Можливість блокування користувачів

**API Endpoints:**
- `GET /api/admin/analytics` - статистика платформи
  - Headers: `Authorization: Bearer <access_token>` (тільки для admin)
  - Response:
    ```json
    {
      "totalUsers": "number",
      "activeRequests": "number",
      "totalProposals": "number",
      "revenue": "number",
      "growth": "string",
      "usersByRole": {
        "buyers": "number",
        "sellers": "number"
      },
      "requestsByCategory": "object",
      "activityChart": "array"
    }
    ```

- `GET /api/admin/requests/pending` - запити на модерацію
  - Headers: `Authorization: Bearer <access_token>` (тільки для admin)
  - Query параметри:
    - `page` (number, опціонально)
    - `pageSize` (number, опціонально)
  - Response: `{ count: number, results: Request[] }`

- `POST /api/admin/requests/:id/approve` - затвердження запиту
  - Headers: `Authorization: Bearer <access_token>` (тільки для admin)
  - Response: `{ success: boolean, message: string }`

- `POST /api/admin/requests/:id/reject` - відхилення запиту
  - Headers: `Authorization: Bearer <access_token>` (тільки для admin)
  - Request Body:
    ```json
    {
      "reason": "string (required)"
    }
    ```
  - Response: `{ success: boolean, message: string }`

- `GET /api/admin/proposals/pending` - пропозиції на модерацію
  - Headers: `Authorization: Bearer <access_token>` (тільки для admin)
  - Query параметри:
    - `page` (number, опціонально)
    - `pageSize` (number, опціонально)
  - Response: `{ count: number, results: Proposal[] }`

- `POST /api/admin/proposals/:id/approve` - затвердження пропозиції
  - Headers: `Authorization: Bearer <access_token>` (тільки для admin)
  - Response: `{ success: boolean, message: string }`

- `POST /api/admin/proposals/:id/reject` - відхилення пропозиції
  - Headers: `Authorization: Bearer <access_token>` (тільки для admin)
  - Request Body:
    ```json
    {
      "reason": "string (required)"
    }
    ```
  - Response: `{ success: boolean, message: string }`

- `GET /api/admin/users/reported` - користувачі зі скаргами
  - Headers: `Authorization: Bearer <access_token>` (тільки для admin)
  - Query параметри:
    - `page` (number, опціонально)
    - `pageSize` (number, опціонально)
  - Response: `{ count: number, results: User[] }`

- `POST /api/admin/users/:id/block` - блокування користувача
  - Headers: `Authorization: Bearer <access_token>` (тільки для admin)
  - Request Body:
    ```json
    {
      "reason": "string (required)",
      "duration": "string (required, enum: 24h, 7d, 30d, permanent)"
    }
    ```
  - Response: `{ success: boolean, message: string }`

- `POST /api/admin/users/:id/unblock` - розблокування користувача
  - Headers: `Authorization: Bearer <access_token>` (тільки для admin)
  - Response: `{ success: boolean, message: string }`

---

## 10. Статичні сторінки

**Сторінки:** `/about`, `/contact`, `/how-it-works`, `/pricing`, `/terms`, `/privacy`, `/support`

**Опис:** Статичні інформаційні сторінки. Можуть бути статичними або з невеликою кількістю даних з бекенду.

**API Endpoints (опціонально):**
- `POST /api/contact` - відправка форми зворотного зв'язку
  - Request Body:
    ```json
    {
      "name": "string (required)",
      "email": "string (required, email)",
      "subject": "string (required)",
      "message": "string (required)"
    }
    ```
  - Response: `{ success: boolean, message: string }`
