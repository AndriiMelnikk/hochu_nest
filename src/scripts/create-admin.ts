/**
 * Створення співробітника адмінки з консолі.
 *   MONGODB_URI=... npm run admin:create -- <login> <password> [admin|moderator|editor|analyst]
 */
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AdminUser, AdminUserSchema } from '../database/schemas/admin-user.schema';
import { ADMIN_ROLES, AdminRole } from '../modules/admin/admin-permissions';

async function main() {
  const [login, password, role = 'admin'] = process.argv.slice(2);
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is required');
  if (!login || !password) throw new Error('Usage: admin:create <login> <password> [role]');
  if (!ADMIN_ROLES.includes(role as AdminRole)) {
    throw new Error(`Role must be one of: ${ADMIN_ROLES.join(', ')}`);
  }
  if (password.length < 8) throw new Error('Password must be at least 8 characters');

  await mongoose.connect(uri);
  const Model = mongoose.model(AdminUser.name, AdminUserSchema);
  await Model.create({
    login,
    name: login,
    passwordHash: await bcrypt.hash(password, 12),
    role,
    createdBy: 'cli',
  });
  console.log(`Created ${role} "${login.toLowerCase()}"`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
