import { registerAs } from '@nestjs/config';

function parseClientIds(): string[] {
  const fromList = process.env.GOOGLE_CLIENT_IDS?.split(',')
    .map((id) => id.trim())
    .filter(Boolean);

  if (fromList?.length) {
    return fromList;
  }

  const single = process.env.GOOGLE_CLIENT_ID?.trim();
  return single ? [single] : [];
}

export default registerAs('google', () => {
  const clientIds = parseClientIds();
  const port = process.env.PORT || '8080';
  const apiBaseUrl = process.env.API_URL || `http://localhost:${port}`;

  return {
    clientId: clientIds[0],
    clientIds,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || `${apiBaseUrl}/api/auth/google/callback`,
  };
});
