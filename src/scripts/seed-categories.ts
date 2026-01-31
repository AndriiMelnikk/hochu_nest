import mongoose from 'mongoose';
import { Category, CategorySchema } from '../database/schemas/category.schema';
import { categoriesMock } from './c';

async function seedCategories() {
  const uri =
    process.env.MONGODB_URI ||
    'mongodb+srv://amelnik464_db_user:ATy5zwCAF7p2oAxh@cluster0.frq9fb5.mongodb.net/?appName=Cluster0';

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);

  const CategoryModel = mongoose.model<Category>('Category', CategorySchema);

  console.log('Clearing existing categories...');
  await CategoryModel.deleteMany({});

  console.log(`Seeding ${categoriesMock.length} categories...`);

  // Using insertMany for better performance since we have pre-generated IDs and flat structure
  await CategoryModel.insertMany(categoriesMock);

  console.log('Categories seeded successfully.');
  await mongoose.disconnect();
}

seedCategories()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Category seed failed:', error);
    process.exit(1);
  });
