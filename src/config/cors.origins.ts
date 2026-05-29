const DEFAULT_CORS_ORIGINS = [
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

export type CorsOriginCallback = (
  origin: string | undefined,
  callback: (err: Error | null, allow?: boolean) => void,
) => void;

export function createCorsOriginValidator(
  allowedOrigins: string[],
): boolean | string[] | CorsOriginCallback {
  if (allowedOrigins.includes('*')) {
    return true;
  }

  const normalized = new Set(allowedOrigins.map(normalizeOrigin));

  return (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }
    callback(null, normalized.has(normalizeOrigin(origin)));
  };
}

export function getCorsOptions() {
  const allowedOrigins = getAllowedOrigins();

  return {
    origin: createCorsOriginValidator(allowedOrigins),
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
  };
}

export function getSocketIoCorsOptions() {
  const allowedOrigins = getAllowedOrigins();

  if (allowedOrigins.includes('*')) {
    return { origin: true, credentials: true };
  }

  return { origin: allowedOrigins, credentials: true };
}
