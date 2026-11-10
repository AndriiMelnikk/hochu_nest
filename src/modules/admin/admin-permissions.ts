/**
 * Ролі та права персоналу адмінки. Єдине джерело правди для бекенду;
 * фронт (`entities/admin/const/permissions.ts`) дзеркалить цей список лише для відображення меню.
 */
export const ADMIN_PERMISSIONS = [
  'moderation.requests',
  'moderation.proposals',
  'moderation.reports',
  'users.block',
  'notifications.subscriptions',
  'content.blog',
  'content.pricing',
  'content.pages',
  'analytics.view',
  'analytics.traffic',
  'staff.manage',
] as const;
export type AdminPermission = (typeof ADMIN_PERMISSIONS)[number];

export const ADMIN_ROLES = ['admin', 'moderator', 'editor', 'analyst'] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export const ROLE_PERMISSIONS: Record<AdminRole, readonly AdminPermission[]> = {
  admin: ADMIN_PERMISSIONS,
  moderator: [
    'moderation.requests',
    'moderation.proposals',
    'moderation.reports',
    'users.block',
    'notifications.subscriptions',
  ],
  editor: ['content.blog', 'content.pricing', 'content.pages'],
  analyst: ['analytics.view', 'analytics.traffic'],
};

export function roleHasPermission(role: AdminRole, permission: AdminPermission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
