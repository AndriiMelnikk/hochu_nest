import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri:
    process.env.MONGODB_URI ||
    'mongodb+srv://amelnik464_db_user:ATy5zwCAF7p2oAxh@cluster0.frq9fb5.mongodb.net/?appName=Cluster0',
}));
