# Аутентифікація та авторизація

## JWT Токени

Платформа використовує JWT (JSON Web Tokens) для аутентифікації.

### Access Token

- **Тривалість:** 15 хвилин
- **Використання:** Відправляється в заголовку `Authorization: Bearer <access_token>`
- **Містить:** user_id, email, role

### Refresh Token

- **Тривалість:** 7 днів
- **Зберігання:** В базі даних (таблиця `refresh_tokens`)
- **Використання:** Для отримання нового access token

## Механізм оновлення токенів

1. Користувач робить запит з access token
2. Якщо access token прострочений, сервер повертає `401 Unauthorized`
3. Фронтенд відправляє refresh token на `/api/auth/refresh`
4. Сервер перевіряє refresh token та видає нові access та refresh токени
5. Фронтенд повторює оригінальний запит з новим access token

## Захищені routes

Деякі endpoints вимагають авторизації:
- Створення/редагування/видалення запитів
- Створення пропозицій
- Оновлення профілю
- Відправка повідомлень
- Залишення відгуків
- Адмін функції

## Ролі користувачів

- **buyer** - може створювати запити, приймати пропозиції
- **seller** - може надсилати пропозиції
- **admin** - має доступ до адмін панелі та модерації

## Діаграма flow авторизації

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant DB
    
    Client->>API: POST /api/auth/register
    API->>DB: Створити користувача
    DB-->>API: User created
    API->>API: Генерувати JWT токени
    API-->>Client: { access_token, refresh_token, user }
    
    Client->>API: POST /api/auth/login
    API->>DB: Перевірити credentials
    DB-->>API: User found
    API->>API: Генерувати JWT токени
    API-->>Client: { access_token, refresh_token, user }
    
    Client->>API: GET /api/requests (з access_token)
    API->>API: Валідувати токен
    API->>DB: Отримати запити
    DB-->>API: Requests
    API-->>Client: { results: [...] }
    
    Note over Client,API: Access token прострочений
    Client->>API: GET /api/requests (з простроченим токеном)
    API-->>Client: 401 Unauthorized
    
    Client->>API: POST /api/auth/refresh (з refresh_token)
    API->>DB: Перевірити refresh_token
    DB-->>API: Token valid
    API->>API: Генерувати нові токени
    API-->>Client: { access_token, refresh_token }
    
    Client->>API: GET /api/requests (з новим access_token)
    API->>DB: Отримати запити
    DB-->>API: Requests
    API-->>Client: { results: [...] }
```
