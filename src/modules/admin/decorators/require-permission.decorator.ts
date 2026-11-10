import { SetMetadata } from '@nestjs/common';
import type { AdminPermission } from '../admin-permissions';

export const ADMIN_PERMISSION_KEY = 'adminPermission';
export const ADMIN_ANY_STAFF_KEY = 'adminAnyStaff';

/** Ендпоінт доступний ролям, що мають це право. Без декоратора AdminGuard відмовляє всім (deny by default). */
export const RequirePermission = (permission: AdminPermission) =>
  SetMetadata(ADMIN_PERMISSION_KEY, permission);

/** Ендпоінт для будь-якого активного співробітника (профіль, зміна власного пароля). */
export const AnyStaff = () => SetMetadata(ADMIN_ANY_STAFF_KEY, true);
