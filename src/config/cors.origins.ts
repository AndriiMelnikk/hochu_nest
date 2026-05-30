export const DEFAULT_CORS_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://shukayu.com.ua',
  'https://shukayu.com.ua',
  'http://www.shukayu.com.ua',
  'https://www.shukayu.com.ua',
];

export function normalizeOrigin(origin: string): string {
  return origin.trim().replace(/\/+$/, '');
}

export function getAllowedOrigins(): string[] {
  const raw = process.env.CORS_ORIGIN || process.env.FRONTEND_URL;
  const fromEnv = raw
    ? raw
        .split(',')
        .map((o) => normalizeOrigin(o))
        .filter(Boolean)
    : [];

  if (fromEnv.includes('*') || process.env.CORS_ALLOW_ALL === 'true') {
    return ['*'];
  }

  return [...new Set([...DEFAULT_CORS_ORIGINS, ...fromEnv])];
}

export function getCorsOptions() {
  const allowedOrigins = getAllowedOrigins();

  return {
    origin: allowedOrigins.includes('*') ? true : allowedOrigins,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'],
  };
}

export function getSocketIoCorsOptions() {
  const allowedOrigins = getAllowedOrigins();

  if (allowedOrigins.includes('*')) {
    return { origin: true, credentials: true };
  }

  return { origin: allowedOrigins, credentials: true };
}
