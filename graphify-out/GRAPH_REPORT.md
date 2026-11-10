# Graph Report - hochu_nest (2026-08-29)

## Corpus Check

- cluster-only mode — file stats not available

## Summary

- 1517 nodes · 3384 edges · 116 communities (61 shown, 55 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 145 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `1c634343`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- CurrentUser
- RequestsService
- upload.module.ts
- messages.service.ts
- reports.controller.ts
- CreateProposalDto
- GetWarehousesDto
- BlogService
- CreateDiscussionDto
- NotificationsService
- notifications.service.ts
- AdminController
- app.module.ts
- requests.service.ts
- MailService
- auth.service.ts
- notifications.module.ts
- categories.service.ts
- AuthController
- proposals.controller.ts
- ProfileDocument
- notification-preferences.schema.ts
- compilerOptions
- scripts
- achievements.module.ts
- ReviewsService
- NotificationCategory
- auth.controller.ts
- users.service.ts
- NotificationPreferencesService
- NotificationsController
- cors.origins.ts
- category.schema.ts
- AuthService
- reviews.service.ts
- CreateRequestDto
- NotificationsGateway
- RegisterDto
- package.json
- AppService
- user.schema.ts
- CreateReviewDto
- dependencies
- devDependencies
- jest
- CategoryPreferenceDto
- GetProposalsByRequestDto
- GetUsersDto
- nest-cli.json
- exclude
- ProposalRejectionReason
- GetReviewsQueryDto
- ForgotPasswordDto
- ResetPasswordDto
- GoogleTokenDto
- lint-staged
- AchievementRarity
- moduleFileExtensions
- AchievementRole
- bcrypt
- class-transformer
- class-validator
- @commitlint/cli
- @commitlint/config-conventional
- cz-conventional-changelog
- eslint
- eslint-config-prettier
- @eslint/eslintrc
- @eslint/js
- eslint-plugin-prettier
- google-auth-library
- handlebars
- jest
- lint-staged
- mongoose
- @nestjs/cli
- @nestjs/common
- @nestjs/config
- @nestjs-modules/mailer
- @nestjs/mongoose
- @nestjs/passport
- @nestjs/platform-express
- @nestjs/platform-socket.io
- @nestjs/schedule
- @nestjs/schematics
- @nestjs/swagger
- @nestjs/testing
- @nestjs/websockets
- nodemailer
- passport
- passport-google-oauth20
- passport-jwt
- reflect-metadata
- rxjs
- socket.io
- @types/cron
- prettier
- source-map-support
- supertest
- ts-jest
- ts-loader
- ts-node
- tsconfig-paths
- tsconfig-paths-webpack-plugin
- @types/bcrypt
- @types/express
- @types/jest
- @types/multer
- @types/node
- @types/passport-google-oauth20
- @types/passport-jwt
- typescript
- typescript-eslint
- webpack.config.js

## God Nodes (most connected - your core abstractions)

1. `CurrentUser` - 50 edges
2. `NotificationsService` - 34 edges
3. `Profile` - 33 edges
4. `ProfileDocument` - 32 edges
5. `NotificationType` - 28 edges
6. `UsersService` - 27 edges
7. `UsersController` - 25 edges
8. `ProfileType` - 23 edges
9. `NotificationCategory` - 22 edges
10. `compilerOptions` - 22 edges

## Surprising Connections (you probably didn't know these)

- `CreateProfileDto` --references--> `ProfileType` [EXTRACTED]
  src/modules/users/dto/create-profile.dto.ts → src/database/enums/profile-type.enum.ts
- `GetRequestsDto` --references--> `RequestStatus` [EXTRACTED]
  src/modules/requests/dto/get-requests.dto.ts → src/database/schemas/request.schema.ts
- `UpdateRequestDto` --references--> `ItemCondition` [EXTRACTED]
  src/modules/requests/dto/update-request.dto.ts → src/database/schemas/request.schema.ts
- `Notification` --references--> `NotificationCategory` [EXTRACTED]
  src/database/schemas/notification.schema.ts → src/database/enums/notification-category.enum.ts
- `CreateNotificationDto` --references--> `NotificationCategory` [EXTRACTED]
  src/modules/notifications/dto/create-notification.dto.ts → src/database/enums/notification-category.enum.ts

## Import Cycles

- None detected.

## Communities (116 total, 55 thin omitted)

### Community 0 - "CurrentUser"

Cohesion: 0.07
Nodes (41): IsUrl, CurrentUser, AccountDocument, CreateProfileDto, ApiProperty, ApiPropertyOptional, IsEnum, IsNotEmpty (+33 more)

### Community 1 - "RequestsService"

Cohesion: 0.06
Nodes (43): PaginationResult, PaginationUtil, SortField, SortOptions, SortUtil, GetRequestsDto, ApiProperty, IsEnum (+35 more)

### Community 2 - "upload.module.ts"

Cohesion: 0.06
Nodes (45): ApiConsumes, ApiQuery, Cron, Prop, Schema, Upload, UploadDocument, UploadSchema (+37 more)

### Community 3 - "messages.service.ts"

Cohesion: 0.06
Nodes (36): ConnectedSocket, MessageBody, Message, MessageDocument, MessageSchema, Prop, Schema, CreateMessageDto (+28 more)

### Community 4 - "reports.controller.ts"

Cohesion: 0.06
Nodes (42): Report, ReportDocument, ReportReason, DUPLICATE, INAPPROPRIATE, LOW_PRICE, OTHER, SCAM (+34 more)

### Community 5 - "CreateProposalDto"

Cohesion: 0.10
Nodes (26): CreateProposalDto, ApiProperty, ArrayMaxSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional (+18 more)

### Community 6 - "GetWarehousesDto"

Cohesion: 0.06
Nodes (34): GetWarehousesDto, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, Type (+26 more)

### Community 7 - "BlogService"

Cohesion: 0.08
Nodes (30): BlogPost, BlogPostDocument, BlogPostSchema, Prop, Schema, BlogController, ApiBearerAuth, ApiOperation (+22 more)

### Community 8 - "CreateDiscussionDto"

Cohesion: 0.09
Nodes (27): Discussion, DiscussionDocument, DiscussionSchema, Prop, Schema, DiscussionsController, ApiBearerAuth, ApiOperation (+19 more)

### Community 9 - "NotificationsService"

Cohesion: 0.07
Nodes (25): RequestSubscriptionDocument, CreateRequestSubscriptionDto, ApiPropertyOptional, IsArray, IsBoolean, IsEnum, IsMongoId, IsNumber (+17 more)

### Community 10 - "notifications.service.ts"

Cohesion: 0.11
Nodes (27): Notification, NotificationDocument, NotificationMetadata, NotificationMetadataSchema, NotificationSchema, NotificationType, ACHIEVEMENT_UNLOCKED, NEW_MESSAGE (+19 more)

### Community 11 - "AdminController"

Cohesion: 0.11
Nodes (14): AdminController, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, Body, Controller, Get (+6 more)

### Community 12 - "app.module.ts"

Cohesion: 0.11
Nodes (21): DatabaseModule, Module, Proposal, ProposalSchema, Prop, Schema, RequestSchema, AchievementsModule (+13 more)

### Community 13 - "requests.service.ts"

Cohesion: 0.09
Nodes (25): PaginationOptions, ProposalStatus, ACCEPTED, COMPLETED, PENDING, REJECTED, WITHDRAWN, ItemCondition (+17 more)

### Community 14 - "MailService"

Cohesion: 0.08
Nodes (22): ContactController, ApiBody, ApiOperation, ApiResponse, ApiTags, Body, Controller, HttpCode (+14 more)

### Community 15 - "auth.service.ts"

Cohesion: 0.08
Nodes (21): RefreshToken, RefreshTokenDocument, RefreshTokenSchema, Prop, Schema, InjectModel, LoginDto, ApiProperty (+13 more)

### Community 16 - "notifications.module.ts"

Cohesion: 0.15
Nodes (19): Account, AccountSchema, Prop, Schema, Profile, ProfileSchema, Prop, Schema (+11 more)

### Community 17 - "categories.service.ts"

Cohesion: 0.10
Nodes (18): CategoriesController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Query, CategoriesService (+10 more)

### Community 18 - "AuthController"

Cohesion: 0.25
Nodes (15): Res, AuthController, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, Body (+7 more)

### Community 19 - "proposals.controller.ts"

Cohesion: 0.20
Nodes (8): Roles(), ROLES_KEY, JwtAuthGuard, Injectable, RolesGuard, Injectable, ParseObjectIdPipe, Injectable

### Community 20 - "ProfileDocument"

Cohesion: 0.14
Nodes (12): CategoryDocument, ProfileDocument, ProposalDocument, RequestDocument, InjectModel, InjectModel, MatchedSellerProfile, RequestSubscriptionMatcherService (+4 more)

### Community 21 - "notification-preferences.schema.ts"

Cohesion: 0.17
Nodes (14): NotificationChannel, EMAIL, IN_APP, CategoryPreferenceSchema, defaultCategoryPreference(), defaultNewRequestsPreference(), defaultNotificationPreferences(), NewRequestsPreferenceSchema (+6 more)

### Community 22 - "compilerOptions"

Cohesion: 0.09
Nodes (22): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+14 more)

### Community 23 - "scripts"

Cohesion: 0.09
Nodes (22): scripts, build, commit, commit:retry, format, lint, migrate:account-profile, migrate:notification-preferences (+14 more)

### Community 24 - "achievements.module.ts"

Cohesion: 0.15
Nodes (13): Achievement, AchievementDocument, AchievementSchema, Prop, Schema, Prop, Schema, UserAchievement (+5 more)

### Community 25 - "ReviewsService"

Cohesion: 0.14
Nodes (14): ReviewsController, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, Body, Controller, Get (+6 more)

### Community 26 - "NotificationCategory"

Cohesion: 0.10
Nodes (19): NotificationCategory, ACHIEVEMENTS, MESSAGES, MY_PROPOSAL_STATUS, MY_REQUEST_ACTIVITY, NEW_REQUESTS, REQUEST_UPDATES, REVIEWS (+11 more)

### Community 27 - "auth.controller.ts"

Cohesion: 0.12
Nodes (14): GoogleAuthGuard, ChangePasswordDto, ApiProperty, IsNotEmpty, IsString, MinLength, RefreshTokenDto, ApiProperty (+6 more)

### Community 28 - "users.service.ts"

Cohesion: 0.15
Nodes (13): ALLOWED_CONTACTS, ContactChannel, EMAIL, FACEBOOK, INSTAGRAM, PHONE, TELEGRAM, VIBER (+5 more)

### Community 29 - "NotificationPreferencesService"

Cohesion: 0.19
Nodes (11): CategoryPreference, NewRequestsPreference, NotificationPreferences, Prop, Schema, Type, UpdateNotificationPreferencesDto, NotificationPreferencesService (+3 more)

### Community 30 - "NotificationsController"

Cohesion: 0.15
Nodes (11): NotificationsController, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, Controller, Get, Param (+3 more)

### Community 31 - "cors.origins.ts"

Cohesion: 0.18
Nodes (11): Catch, AppModule, Module, HttpExceptionFilter, MulterLikeError, DEFAULT_CORS_ORIGINS, getAllowedOrigins(), getCorsOptions() (+3 more)

### Community 32 - "category.schema.ts"

Cohesion: 0.18
Nodes (12): Category, CategoryLanguage, CategoryLanguageSchema, CategorySchema, CategoryTranslations, CategoryTranslationsSchema, Prop, Schema (+4 more)

### Community 33 - "AuthService"

Cohesion: 0.23
Nodes (5): AuthService, Injectable, AuthResponseDto, ProfileSummaryDto, ApiProperty

### Community 34 - "reviews.service.ts"

Cohesion: 0.16
Nodes (9): Review, ReviewDocument, ReviewSchema, Prop, Schema, LevelInfo, Injectable, InjectModel (+1 more)

### Community 35 - "CreateRequestDto"

Cohesion: 0.17
Nodes (12): CreateRequestDto, ApiProperty, ArrayMaxSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional (+4 more)

### Community 36 - "NotificationsGateway"

Cohesion: 0.18
Nodes (6): Optional, NotificationsGateway, Injectable, WebSocketGateway, WebSocketServer, InjectModel

### Community 37 - "RegisterDto"

Cohesion: 0.18
Nodes (10): RegisterDto, ApiProperty, ApiPropertyOptional, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString (+2 more)

### Community 38 - "package.json"

Cohesion: 0.20
Nodes (9): author, path, config, commitizen, description, license, name, private (+1 more)

### Community 39 - "AppService"

Cohesion: 0.27
Nodes (5): AppController, Controller, Get, AppService, Injectable

### Community 40 - "user.schema.ts"

Cohesion: 0.20
Nodes (9): Prop, Schema, User, UserDocument, UserRole, ADMIN, BUYER, SELLER (+1 more)

### Community 41 - "CreateReviewDto"

Cohesion: 0.20
Nodes (9): CreateReviewDto, ApiProperty, IsNumber, IsOptional, IsString, Max, MaxLength, Min (+1 more)

### Community 42 - "dependencies"

Cohesion: 0.22
Nodes (9): @aws-sdk/client-s3, @nestjs/core, nestjs-i18n, @nestjs/jwt, dependencies, @aws-sdk/client-s3, @nestjs/core, nestjs-i18n (+1 more)

### Community 43 - "devDependencies"

Cohesion: 0.22
Nodes (9): commitizen, globals, husky, devDependencies, commitizen, globals, husky, @types/supertest (+1 more)

### Community 44 - "jest"

Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, rootDir, testEnvironment, testRegex, transform, ^.+\\.(t|j)s$ (+1 more)

### Community 45 - "CategoryPreferenceDto"

Cohesion: 0.31
Nodes (9): CategoryPreferenceDto, NewRequestsPreferenceDto, ApiPropertyOptional, IsArray, IsBoolean, IsEnum, IsMongoId, IsOptional (+1 more)

### Community 46 - "GetProposalsByRequestDto"

Cohesion: 0.22
Nodes (9): GetProposalsByRequestDto, ApiProperty, IsEnum, IsNumber, IsOptional, Max, Min, Transform (+1 more)

### Community 47 - "GetUsersDto"

Cohesion: 0.22
Nodes (9): GetUsersDto, ApiProperty, IsEnum, IsNumber, IsOptional, IsString, Max, Min (+1 more)

### Community 48 - "nest-cli.json"

Cohesion: 0.25
Nodes (7): collection, compilerOptions, assets, deleteOutDir, webpack, $schema, sourceRoot

### Community 49 - "exclude"

Cohesion: 0.25
Nodes (7): dist, node_modules, \**/*spec.ts, test, ./tsconfig.json, exclude, extends

### Community 50 - "ProposalRejectionReason"

Cohesion: 0.25
Nodes (7): ProposalRejectionReason, ALREADY_PROPOSED, NOT_SELLER, OWN_REQUEST, REQUEST_NOT_ACTIVE, REQUEST_NOT_FOUND, USER_BLOCKED

### Community 51 - "GetReviewsQueryDto"

Cohesion: 0.25
Nodes (7): GetReviewsQueryDto, ApiPropertyOptional, IsMongoId, IsNumber, IsOptional, Min, Type

### Community 52 - "ForgotPasswordDto"

Cohesion: 0.29
Nodes (4): ForgotPasswordDto, ApiProperty, IsEmail, IsNotEmpty

### Community 53 - "ResetPasswordDto"

Cohesion: 0.29
Nodes (5): ResetPasswordDto, ApiProperty, IsNotEmpty, IsString, MinLength

### Community 54 - "GoogleTokenDto"

Cohesion: 0.33
Nodes (6): GoogleTokenDto, GoogleUserInfoDto, ApiProperty, ApiPropertyOptional, IsNotEmpty, IsString

### Community 55 - "lint-staged"

Cohesion: 0.50
Nodes (5): lint-staged, _.{json,md,yml,yaml}, _.{ts,tsx}, eslint --fix, prettier --write

### Community 56 - "AchievementRarity"

Cohesion: 0.40
Nodes (5): AchievementRarity, COMMON, EPIC, LEGENDARY, RARE

### Community 57 - "moduleFileExtensions"

Cohesion: 0.50
Nodes (4): moduleFileExtensions, js, json, ts

### Community 58 - "AchievementRole"

Cohesion: 0.50
Nodes (4): AchievementRole, BOTH, BUYER, SELLER

## Knowledge Gaps

- **240 isolated node(s):** `SortField`, `SortOptions`, `NotificationTemplateResult`, `PaginationOptions`, `LeanRequest` (+235 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **55 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `CurrentUser` connect `CurrentUser` to `RequestsService`, `messages.service.ts`, `reports.controller.ts`, `CreateProposalDto`, `CreateDiscussionDto`, `NotificationsService`, `AuthController`, `proposals.controller.ts`, `ReviewsService`, `auth.controller.ts`, `NotificationsController`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `ProfileDocument` connect `ProfileDocument` to `CurrentUser`, `reviews.service.ts`, `NotificationsGateway`, `CreateProposalDto`, `NotificationsService`, `notifications.service.ts`, `requests.service.ts`, `auth.service.ts`, `notifications.module.ts`, `notification-preferences.schema.ts`, `achievements.module.ts`, `users.service.ts`, `NotificationPreferencesService`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `Profile` connect `notifications.module.ts` to `category.schema.ts`, `CurrentUser`, `reviews.service.ts`, `NotificationsService`, `notifications.service.ts`, `app.module.ts`, `requests.service.ts`, `auth.service.ts`, `ProfileDocument`, `notification-preferences.schema.ts`, `achievements.module.ts`, `users.service.ts`, `NotificationPreferencesService`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `SortField`, `SortOptions`, `NotificationTemplateResult` to the rest of the system?**
  _240 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `CurrentUser` be split into smaller, more focused modules?**
  _Cohesion score 0.06655192197360872 - nodes in this community are weakly interconnected._
- **Should `RequestsService` be split into smaller, more focused modules?**
  _Cohesion score 0.06322624743677376 - nodes in this community are weakly interconnected._
- **Should `upload.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05789235639981909 - nodes in this community are weakly interconnected._
