# Сутності та їх взаємодії

## Основні сутності

### 1. User (Користувач)

Користувачі платформи можуть бути:
- **Buyer** (покупець/замовник) - створює запити на послуги
- **Seller** (продавець/виконавець) - надсилає пропозиції на запити
- **Admin** (адміністратор) - модерує контент та управляє платформою

**Поля:**
- `id` - унікальний ідентифікатор
- `name` - ім'я користувача
- `email` - email адреса (унікальна)
- `password` - хеш пароля
- `avatar` - URL аватара
- `role` - роль (buyer, seller, admin)
- `rating` - середній рейтинг (0-5)
- `reviewsCount` - кількість відгуків
- `isVerified` - чи верифікований користувач
- `memberSince` - дата реєстрації
- `completedDeals` - кількість завершених угод
- `location` - локація користувача
- `xp` - досвід (experience points) для гейміфікації
- `unlockedAchievements` - масив ID розблокованих досягнень
- `topAchievements` - масив ID топ досягнень для відображення
- `isBlocked` - чи заблокований користувач
- `blockedUntil` - дата до якої заблокований (якщо тимчасово)
- `createdAt` - дата створення
- `updatedAt` - дата оновлення

### 2. Request (Запит)

Запит на послугу від покупця.

**Поля:**
- `id` - унікальний ідентифікатор
- `title` - заголовок запиту
- `description` - детальний опис
- `category` - категорія (Електроніка, Дизайн, Освіта, тощо)
- `budgetMin` - мінімальний бюджет (грн)
- `budgetMax` - максимальний бюджет (грн)
- `location` - локація (місто або "Віддалено")
- `urgency` - терміновість (Гнучко, Протягом тижня, 2-3 дні, Терміново)
- `buyerId` - ID покупця (foreign key до User)
- `images` - масив URL зображень
- `views` - кількість переглядів
- `proposalsCount` - кількість пропозицій
- `status` - статус (pending, active, closed, rejected)
- `edits` - масив історії редагувань (текст, timestamp)
- `createdAt` - дата створення
- `updatedAt` - дата оновлення

### 3. Proposal (Пропозиція)

Пропозиція від продавця на запит покупця.

**Поля:**
- `id` - унікальний ідентифікатор
- `requestId` - ID запиту (foreign key до Request)
- `sellerId` - ID продавця (foreign key до User)
- `price` - запропонована ціна (грн)
- `title` - заголовок пропозиції
- `description` - детальний опис послуги
- `estimatedTime` - термін виконання (1-2 дні, тиждень, тощо)
- `warranty` - гарантія (1 місяць, 3 місяці, тощо)
- `images` - масив URL зображень робіт продавця
- `status` - статус (pending, accepted, rejected, completed)
- `createdAt` - дата створення
- `updatedAt` - дата оновлення

### 4. Review (Відгук)

Відгук між користувачами після завершення угоди.

**Поля:**
- `id` - унікальний ідентифікатор
- `userId` - ID користувача, який залишив відгук (foreign key до User)
- `targetUserId` - ID користувача, про якого відгук (foreign key до User)
- `requestId` - ID запиту (foreign key до Request, опціонально)
- `proposalId` - ID пропозиції (foreign key до Proposal, опціонально)
- `rating` - оцінка (1-5)
- `comment` - текст відгуку
- `createdAt` - дата створення
- `updatedAt` - дата оновлення

### 5. Message (Повідомлення)

Повідомлення в чаті між користувачами.

**Поля:**
- `id` - унікальний ідентифікатор
- `senderId` - ID відправника (foreign key до User)
- `receiverId` - ID отримувача (foreign key до User)
- `requestId` - ID запиту, пов'язаного з чатом (foreign key до Request, опціонально)
- `proposalId` - ID пропозиції, пов'язаної з чатом (foreign key до Proposal, опціонально)
- `content` - текст повідомлення
- `read` - чи прочитано повідомлення
- `createdAt` - дата створення

### 6. Discussion (Обговорення)

Публічні коментарі під запитом або пропозицією.

**Поля:**
- `id` - унікальний ідентифікатор
- `requestId` - ID запиту (foreign key до Request, опціонально)
- `proposalId` - ID пропозиції (foreign key до Proposal, опціонально)
- `userId` - ID користувача, який залишив коментар (foreign key до User)
- `replyToId` - ID коментаря, на який відповідають (foreign key до Discussion, опціонально)
- `content` - текст коментаря
- `createdAt` - дата створення
- `updatedAt` - дата оновлення

### 7. BlogPost (Стаття блогу)

Статті в блозі платформи.

**Поля:**
- `id` - унікальний ідентифікатор
- `title` - заголовок статті
- `description` - короткий опис
- `content` - повний текст статті
- `category` - категорія статті
- `author` - автор статті
- `image` - URL зображення
- `readTime` - час читання (хвилини)
- `published` - чи опублікована стаття
- `createdAt` - дата створення
- `updatedAt` - дата оновлення

### 8. Report (Скарга)

Скарги на контент або користувачів.

**Поля:**
- `id` - унікальний ідентифікатор
- `reporterId` - ID користувача, який подал скаргу (foreign key до User)
- `targetType` - тип об'єкта (request, proposal, user, discussion)
- `targetId` - ID об'єкта, на який скарга
- `reason` - причина скарги (low-price, scam, inappropriate, spam, duplicate, other)
- `details` - додаткові деталі
- `status` - статус (pending, reviewed, resolved, rejected)
- `createdAt` - дата створення
- `updatedAt` - дата оновлення

### 9. Achievement (Досягнення)

Досягнення для гейміфікації.

**Поля:**
- `id` - унікальний ідентифікатор (string)
- `name` - назва досягнення
- `description` - опис
- `icon` - іконка (emoji або URL)
- `rarity` - рідкісність (common, rare, epic, legendary)
- `role` - для якої ролі (buyer, seller, both)
- `condition` - умова отримання (JSON)

### 10. UserAchievement (Досягнення користувача)

Зв'язок між користувачем та досягненням.

**Поля:**
- `id` - унікальний ідентифікатор
- `userId` - ID користувача (foreign key до User)
- `achievementId` - ID досягнення (foreign key до Achievement)
- `unlockedAt` - дата отримання

## Діаграма взаємодії сутностей

```mermaid
erDiagram
    User ||--o{ Request : creates
    User ||--o{ Proposal : sends
    User ||--o{ Review : "gives/receives"
    User ||--o{ Message : "sends/receives"
    User ||--o{ Discussion : writes
    User ||--o{ Report : submits
    User ||--o{ UserAchievement : has
    
    Request ||--o{ Proposal : receives
    Request ||--o{ Discussion : has
    Request ||--o{ Report : "can be reported"
    
    Proposal ||--o{ Discussion : has
    Proposal ||--o{ Report : "can be reported"
    Proposal ||--o{ Review : "can have"
    
    Achievement ||--o{ UserAchievement : "unlocked by"
    
    Request {
        int id PK
        string title
        string description
        string category
        int budgetMin
        int budgetMax
        string location
        string urgency
        int buyerId FK
        array images
        int views
        int proposalsCount
        string status
    }
    
    Proposal {
        int id PK
        int requestId FK
        int sellerId FK
        int price
        string title
        string description
        string estimatedTime
        string warranty
        array images
        string status
    }
    
    User {
        int id PK
        string name
        string email
        string password
        string avatar
        string role
        float rating
        int reviewsCount
        boolean isVerified
        int completedDeals
        string location
        int xp
        boolean isBlocked
    }
    
    Review {
        int id PK
        int userId FK
        int targetUserId FK
        int requestId FK
        int proposalId FK
        int rating
        string comment
    }
    
    Message {
        int id PK
        int senderId FK
        int receiverId FK
        int requestId FK
        int proposalId FK
        string content
        boolean read
    }
    
    Discussion {
        int id PK
        int requestId FK
        int proposalId FK
        int userId FK
        int replyToId FK
        string content
    }
    
    Report {
        int id PK
        int reporterId FK
        string targetType
        int targetId
        string reason
        string details
        string status
    }
    
    Achievement {
        string id PK
        string name
        string description
        string icon
        string rarity
        string role
        json condition
    }
    
    UserAchievement {
        int id PK
        int userId FK
        string achievementId FK
        datetime unlockedAt
    }
```
