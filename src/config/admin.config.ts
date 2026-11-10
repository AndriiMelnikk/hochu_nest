import { registerAs } from '@nestjs/config';

/**
 * Налаштування входу в адмін-панель.
 * Усі три змінні обов'язкові; без них вхід в адмінку вимкнений (503).
 */
export default registerAs('admin', () => ({
  login: process.env.ADMIN_LOGIN || '',
  password: process.env.ADMIN_PASSWORD || '',
  // Окремий секрет: токен адміна не можна підробити секретом звичайних користувачів
  jwtSecret: process.env.ADMIN_JWT_SECRET || '',
  expiresInSeconds: Number(process.env.ADMIN_JWT_EXPIRES_IN_SECONDS) || 8 * 60 * 60,
}));
