# Hochu Backend API

Backend API for Hochu - a marketplace for services (freelance platform).

## Technology Stack

- **Framework**: NestJS 11
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with refresh tokens
- **Real-time**: Socket.io for WebSocket
- **File Storage**: Configurable (local/Cloudinary/S3)
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_REFRESH_SECRET` - JWT refresh token secret
- `PORT` - Server port (default: 3000)

## Running the app

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Documentation

Swagger documentation is available at:
- http://localhost:3000/api/docs

## Project Structure

```
src/
├── common/              # Shared utilities, decorators, guards, filters
├── config/              # Configuration files
├── database/
│   ├── schemas/         # Mongoose schemas
│   └── seeds/           # Seed data
├── modules/             # Business modules
│   ├── auth/            # Authentication
│   ├── users/           # Users management
│   ├── requests/        # Service requests
│   ├── proposals/       # Proposals
│   ├── reviews/         # Reviews
│   ├── messages/        # Messages & chat
│   ├── discussions/     # Public comments
│   ├── blog/            # Blog
│   ├── reports/         # Reports
│   ├── achievements/    # Gamification
│   ├── notifications/   # Notifications
│   ├── upload/          # File upload
│   ├── admin/           # Admin panel
│   └── xp/              # XP service
└── main.ts
```

## Features

- JWT authentication with refresh tokens
- Role-based access control (buyer, seller, admin)
- Real-time messaging with WebSocket
- Gamification system (XP, levels, achievements)
- File upload with validation
- Admin panel for moderation
- Full-text search
- Pagination and filtering
- Swagger API documentation

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

UNLICENSED
