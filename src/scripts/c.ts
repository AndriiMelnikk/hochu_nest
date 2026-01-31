import mongoose from 'mongoose';
import { Category } from '../database/schemas/category.schema';

export const categoriesMock: Partial<Category>[] = [
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
    translations: {
      uk: {
        title: 'Послуги',
        description: 'Різноманітні професійні та побутові послуги',
      },
      en: {
        title: 'Services',
        description: 'Various professional and household services',
      },
    },
    slug: 'services',
    parentId: null,
    path: [],
    level: 0,
    order: 0,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5b'),
    translations: {
      uk: {
        title: 'IT, розробка та дизайн',
        description: 'IT, розробка та дизайн',
      },
      en: {
        title: 'IT, Development & Design',
        description: 'IT, Development & Design',
      },
    },
    slug: 'services-it',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5c'),
    translations: {
      uk: {
        title: 'Розробка сайтів',
        description: 'Розробка сайтів',
      },
      en: {
        title: 'Web',
        description: 'Web',
      },
    },
    slug: 'services-it-web',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5b'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5d'),
    translations: {
      uk: {
        title: 'Мобільні додатки',
        description: 'Мобільні додатки',
      },
      en: {
        title: 'Mobile',
        description: 'Mobile',
      },
    },
    slug: 'services-it-mobile',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5b'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5e'),
    translations: {
      uk: {
        title: 'Дизайн логотипів',
        description: 'Дизайн логотипів',
      },
      en: {
        title: 'Logo',
        description: 'Logo',
      },
    },
    slug: 'services-it-logo',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5b'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5f'),
    translations: {
      uk: {
        title: 'SEO просування',
        description: 'SEO просування',
      },
      en: {
        title: 'Seo',
        description: 'Seo',
      },
    },
    slug: 'services-it-seo',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5b'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c60'),
    translations: {
      uk: {
        title: 'SMM та реклама',
        description: 'SMM та реклама',
      },
      en: {
        title: 'Smm',
        description: 'Smm',
      },
    },
    slug: 'services-it-smm',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5b'),
    ],
    level: 2,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c61'),
    translations: {
      uk: {
        title: 'Ремонт та будівництво',
        description: 'Ремонт та будівництво',
      },
      en: {
        title: 'Repair & Construction',
        description: 'Repair & Construction',
      },
    },
    slug: 'services-construction',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c62'),
    translations: {
      uk: {
        title: 'Електрика',
        description: 'Електрика',
      },
      en: {
        title: 'Electrical',
        description: 'Electrical',
      },
    },
    slug: 'services-construction-electrical',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c61'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c61'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c63'),
    translations: {
      uk: {
        title: 'Сантехніка',
        description: 'Сантехніка',
      },
      en: {
        title: 'Plumbing',
        description: 'Plumbing',
      },
    },
    slug: 'services-construction-plumbing',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c61'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c61'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c64'),
    translations: {
      uk: {
        title: 'Оздоблювальні роботи',
        description: 'Оздоблювальні роботи',
      },
      en: {
        title: 'Finishing',
        description: 'Finishing',
      },
    },
    slug: 'services-construction-finishing',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c61'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c61'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c65'),
    translations: {
      uk: {
        title: 'Монтаж меблів',
        description: 'Монтаж меблів',
      },
      en: {
        title: 'Furniture',
        description: 'Furniture',
      },
    },
    slug: 'services-construction-furniture',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c61'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c61'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c66'),
    translations: {
      uk: {
        title: 'Навчання та репетиторство',
        description: 'Навчання та репетиторство',
      },
      en: {
        title: 'Education & Tutoring',
        description: 'Education & Tutoring',
      },
    },
    slug: 'services-education',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c67'),
    translations: {
      uk: {
        title: 'Англійська мова',
        description: 'Англійська мова',
      },
      en: {
        title: 'English',
        description: 'English',
      },
    },
    slug: 'services-education-english',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c66'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c66'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c68'),
    translations: {
      uk: {
        title: 'Математика',
        description: 'Математика',
      },
      en: {
        title: 'Math',
        description: 'Math',
      },
    },
    slug: 'services-education-math',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c66'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c66'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c69'),
    translations: {
      uk: {
        title: 'Підготовка до школи',
        description: 'Підготовка до школи',
      },
      en: {
        title: 'School',
        description: 'School',
      },
    },
    slug: 'services-education-school',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c66'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c66'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6a'),
    translations: {
      uk: {
        title: 'Прибирання та допомога',
        description: 'Прибирання та допомога',
      },
      en: {
        title: 'Cleaning & Help',
        description: 'Cleaning & Help',
      },
    },
    slug: 'services-cleaning',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6b'),
    translations: {
      uk: {
        title: 'Прибирання квартир',
        description: 'Прибирання квартир',
      },
      en: {
        title: 'Home',
        description: 'Home',
      },
    },
    slug: 'services-cleaning-home',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6a'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6c'),
    translations: {
      uk: {
        title: 'Хімчистка',
        description: 'Хімчистка',
      },
      en: {
        title: 'Dry',
        description: 'Dry',
      },
    },
    slug: 'services-cleaning-dry',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6a'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6d'),
    translations: {
      uk: {
        title: 'Допомога по дому',
        description: 'Допомога по дому',
      },
      en: {
        title: 'Handyman',
        description: 'Handyman',
      },
    },
    slug: 'services-cleaning-handyman',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c5a'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6a'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
    translations: {
      uk: {
        title: 'Дім та меблі',
        description: 'Все для затишку та облаштування вашого дому',
      },
      en: {
        title: 'Home & Furniture',
        description: 'Everything for your home comfort and interior',
      },
    },
    slug: 'home',
    parentId: null,
    path: [],
    level: 0,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    translations: {
      uk: {
        title: 'Меблі',
        description: 'Меблі',
      },
      en: {
        title: 'Furniture',
        description: 'Furniture',
      },
    },
    slug: 'home-furniture',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c70'),
    translations: {
      uk: {
        title: 'Дивани',
        description: 'Дивани',
      },
      en: {
        title: 'Sofas',
        description: 'Sofas',
      },
    },
    slug: 'home-furniture-sofas',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c71'),
    translations: {
      uk: {
        title: 'Ліжка',
        description: 'Ліжка',
      },
      en: {
        title: 'Beds',
        description: 'Beds',
      },
    },
    slug: 'home-furniture-beds',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c72'),
    translations: {
      uk: {
        title: 'Шафи',
        description: 'Шафи',
      },
      en: {
        title: 'Wardrobes',
        description: 'Wardrobes',
      },
    },
    slug: 'home-furniture-wardrobes',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c73'),
    translations: {
      uk: {
        title: 'Столи',
        description: 'Столи',
      },
      en: {
        title: 'Tables',
        description: 'Tables',
      },
    },
    slug: 'home-furniture-tables',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c74'),
    translations: {
      uk: {
        title: 'Стільці',
        description: 'Стільці',
      },
      en: {
        title: 'Chairs',
        description: 'Chairs',
      },
    },
    slug: 'home-furniture-chairs',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    ],
    level: 2,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c75'),
    translations: {
      uk: {
        title: 'Комоди',
        description: 'Комоди',
      },
      en: {
        title: 'Dressers',
        description: 'Dressers',
      },
    },
    slug: 'home-furniture-dressers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    ],
    level: 2,
    order: 6,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c76'),
    translations: {
      uk: {
        title: 'Тумби',
        description: 'Тумби',
      },
      en: {
        title: 'Nightstands',
        description: 'Nightstands',
      },
    },
    slug: 'home-furniture-nightstands',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    ],
    level: 2,
    order: 7,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c77'),
    translations: {
      uk: {
        title: 'Полиці',
        description: 'Полиці',
      },
      en: {
        title: 'Shelves',
        description: 'Shelves',
      },
    },
    slug: 'home-furniture-shelves',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    ],
    level: 2,
    order: 8,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c78'),
    translations: {
      uk: {
        title: "М'які крісла",
        description: "М'які крісла",
      },
      en: {
        title: 'Armchairs',
        description: 'Armchairs',
      },
    },
    slug: 'home-furniture-armchairs',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    ],
    level: 2,
    order: 9,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c79'),
    translations: {
      uk: {
        title: 'Кухонні гарнітури',
        description: 'Кухонні гарнітури',
      },
      en: {
        title: 'Kitchen Sets',
        description: 'Kitchen Sets',
      },
    },
    slug: 'home-furniture-kitchen-sets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6f'),
    ],
    level: 2,
    order: 10,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    translations: {
      uk: {
        title: 'Домашній декор',
        description: 'Домашній декор',
      },
      en: {
        title: 'Decor',
        description: 'Decor',
      },
    },
    slug: 'home-decor',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7b'),
    translations: {
      uk: {
        title: 'Дзеркала',
        description: 'Дзеркала',
      },
      en: {
        title: 'Mirrors',
        description: 'Mirrors',
      },
    },
    slug: 'home-decor-mirrors',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7c'),
    translations: {
      uk: {
        title: 'Картини та постери',
        description: 'Картини та постери',
      },
      en: {
        title: 'Art',
        description: 'Art',
      },
    },
    slug: 'home-decor-art',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7d'),
    translations: {
      uk: {
        title: 'Настінні годинники',
        description: 'Настінні годинники',
      },
      en: {
        title: 'Clocks',
        description: 'Clocks',
      },
    },
    slug: 'home-decor-clocks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7e'),
    translations: {
      uk: {
        title: 'Вази',
        description: 'Вази',
      },
      en: {
        title: 'Vases',
        description: 'Vases',
      },
    },
    slug: 'home-decor-vases',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7f'),
    translations: {
      uk: {
        title: 'Свічки та свічники',
        description: 'Свічки та свічники',
      },
      en: {
        title: 'Candles',
        description: 'Candles',
      },
    },
    slug: 'home-decor-candles',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    ],
    level: 2,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c80'),
    translations: {
      uk: {
        title: 'Килими',
        description: 'Килими',
      },
      en: {
        title: 'Rugs',
        description: 'Rugs',
      },
    },
    slug: 'home-decor-rugs',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c7a'),
    ],
    level: 2,
    order: 6,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    translations: {
      uk: {
        title: 'Домашній текстиль',
        description: 'Домашній текстиль',
      },
      en: {
        title: 'Textile',
        description: 'Textile',
      },
    },
    slug: 'home-textile',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c82'),
    translations: {
      uk: {
        title: 'Постільна білизна',
        description: 'Постільна білизна',
      },
      en: {
        title: 'Bedding',
        description: 'Bedding',
      },
    },
    slug: 'home-textile-bedding',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c83'),
    translations: {
      uk: {
        title: 'Подушки',
        description: 'Подушки',
      },
      en: {
        title: 'Pillows',
        description: 'Pillows',
      },
    },
    slug: 'home-textile-pillows',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c84'),
    translations: {
      uk: {
        title: 'Ковдри',
        description: 'Ковдри',
      },
      en: {
        title: 'Blankets',
        description: 'Blankets',
      },
    },
    slug: 'home-textile-blankets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c85'),
    translations: {
      uk: {
        title: 'Штори та жалюзі',
        description: 'Штори та жалюзі',
      },
      en: {
        title: 'Curtains',
        description: 'Curtains',
      },
    },
    slug: 'home-textile-curtains',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c86'),
    translations: {
      uk: {
        title: 'Пледи',
        description: 'Пледи',
      },
      en: {
        title: 'Throws',
        description: 'Throws',
      },
    },
    slug: 'home-textile-throws',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    ],
    level: 2,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c87'),
    translations: {
      uk: {
        title: 'Рушники',
        description: 'Рушники',
      },
      en: {
        title: 'Towels',
        description: 'Towels',
      },
    },
    slug: 'home-textile-towels',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c81'),
    ],
    level: 2,
    order: 6,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c88'),
    translations: {
      uk: {
        title: 'Зберігання та організація',
        description: 'Зберігання та організація',
      },
      en: {
        title: 'Storage',
        description: 'Storage',
      },
    },
    slug: 'home-storage',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c89'),
    translations: {
      uk: {
        title: 'Контейнери',
        description: 'Контейнери',
      },
      en: {
        title: 'Containers',
        description: 'Containers',
      },
    },
    slug: 'home-storage-containers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c88'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c88'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8a'),
    translations: {
      uk: {
        title: 'Кошики',
        description: 'Кошики',
      },
      en: {
        title: 'Baskets',
        description: 'Baskets',
      },
    },
    slug: 'home-storage-baskets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c88'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c88'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8b'),
    translations: {
      uk: {
        title: 'Органайзери',
        description: 'Органайзери',
      },
      en: {
        title: 'Organizers',
        description: 'Organizers',
      },
    },
    slug: 'home-storage-organizers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c88'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c88'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8c'),
    translations: {
      uk: {
        title: 'Вішалки',
        description: 'Вішалки',
      },
      en: {
        title: 'Hangers',
        description: 'Hangers',
      },
    },
    slug: 'home-storage-hangers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c88'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c88'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    translations: {
      uk: {
        title: 'Кухня та сервірування',
        description: 'Кухня та сервірування',
      },
      en: {
        title: 'Kitchenware',
        description: 'Kitchenware',
      },
    },
    slug: 'kitchenware',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e')],
    level: 1,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8e'),
    translations: {
      uk: {
        title: 'Посуд',
        description: 'Посуд',
      },
      en: {
        title: 'Dishes',
        description: 'Dishes',
      },
    },
    slug: 'kitchenware-dishes',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8f'),
    translations: {
      uk: {
        title: 'Ножі',
        description: 'Ножі',
      },
      en: {
        title: 'Knives',
        description: 'Knives',
      },
    },
    slug: 'kitchenware-knives',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c90'),
    translations: {
      uk: {
        title: 'Сковорідки',
        description: 'Сковорідки',
      },
      en: {
        title: 'Pans',
        description: 'Pans',
      },
    },
    slug: 'kitchenware-pans',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c91'),
    translations: {
      uk: {
        title: 'Каструлі',
        description: 'Каструлі',
      },
      en: {
        title: 'Pots',
        description: 'Pots',
      },
    },
    slug: 'kitchenware-pots',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c92'),
    translations: {
      uk: {
        title: 'Набори посуду',
        description: 'Набори посуду',
      },
      en: {
        title: 'Sets',
        description: 'Sets',
      },
    },
    slug: 'kitchenware-sets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    ],
    level: 2,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c93'),
    translations: {
      uk: {
        title: 'Столові прибори',
        description: 'Столові прибори',
      },
      en: {
        title: 'Cutlery',
        description: 'Cutlery',
      },
    },
    slug: 'kitchenware-cutlery',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c8d'),
    ],
    level: 2,
    order: 6,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c94'),
    translations: {
      uk: {
        title: 'Санвузол',
        description: 'Санвузол',
      },
      en: {
        title: 'Bathroom',
        description: 'Bathroom',
      },
    },
    slug: 'bathroom',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e')],
    level: 1,
    order: 6,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c95'),
    translations: {
      uk: {
        title: 'Змішувачі',
        description: 'Змішувачі',
      },
      en: {
        title: 'Faucets',
        description: 'Faucets',
      },
    },
    slug: 'bathroom-faucets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c94'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c94'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c96'),
    translations: {
      uk: {
        title: 'Душові системи',
        description: 'Душові системи',
      },
      en: {
        title: 'Showers',
        description: 'Showers',
      },
    },
    slug: 'bathroom-showers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c94'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c94'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c97'),
    translations: {
      uk: {
        title: 'Раковини',
        description: 'Раковини',
      },
      en: {
        title: 'Sinks',
        description: 'Sinks',
      },
    },
    slug: 'bathroom-sinks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c94'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c94'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c98'),
    translations: {
      uk: {
        title: 'Унітази',
        description: 'Унітази',
      },
      en: {
        title: 'Toilets',
        description: 'Toilets',
      },
    },
    slug: 'bathroom-toilets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c94'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c94'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c99'),
    translations: {
      uk: {
        title: 'Аксесуари',
        description: 'Аксесуари',
      },
      en: {
        title: 'Accessories',
        description: 'Accessories',
      },
    },
    slug: 'bathroom-accessories',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c94'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c94'),
    ],
    level: 2,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9a'),
    translations: {
      uk: {
        title: 'Освітлення',
        description: 'Освітлення',
      },
      en: {
        title: 'Lighting',
        description: 'Lighting',
      },
    },
    slug: 'lighting',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e')],
    level: 1,
    order: 7,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9b'),
    translations: {
      uk: {
        title: 'Люстри',
        description: 'Люстри',
      },
      en: {
        title: 'Chandeliers',
        description: 'Chandeliers',
      },
    },
    slug: 'lighting-chandeliers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9a'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9c'),
    translations: {
      uk: {
        title: 'Бра',
        description: 'Бра',
      },
      en: {
        title: 'Wall',
        description: 'Wall',
      },
    },
    slug: 'lighting-wall',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9a'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9d'),
    translations: {
      uk: {
        title: 'Настільні лампи',
        description: 'Настільні лампи',
      },
      en: {
        title: 'Table',
        description: 'Table',
      },
    },
    slug: 'lighting-table',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9a'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9e'),
    translations: {
      uk: {
        title: 'Торшери',
        description: 'Торшери',
      },
      en: {
        title: 'Floor',
        description: 'Floor',
      },
    },
    slug: 'lighting-floor',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9a'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9f'),
    translations: {
      uk: {
        title: 'Світлодіодні стрічки',
        description: 'Світлодіодні стрічки',
      },
      en: {
        title: 'Led Strips',
        description: 'Led Strips',
      },
    },
    slug: 'lighting-led-strips',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c9a'),
    ],
    level: 2,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca0'),
    translations: {
      uk: {
        title: 'Домашня безпека',
        description: 'Домашня безпека',
      },
      en: {
        title: 'Security',
        description: 'Security',
      },
    },
    slug: 'home-security',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e')],
    level: 1,
    order: 8,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca1'),
    translations: {
      uk: {
        title: 'Замки',
        description: 'Замки',
      },
      en: {
        title: 'Locks',
        description: 'Locks',
      },
    },
    slug: 'home-security-locks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca0'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca0'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca2'),
    translations: {
      uk: {
        title: 'Домофони',
        description: 'Домофони',
      },
      en: {
        title: 'Intercoms',
        description: 'Intercoms',
      },
    },
    slug: 'home-security-intercoms',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca0'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca0'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca3'),
    translations: {
      uk: {
        title: 'Сигналізації',
        description: 'Сигналізації',
      },
      en: {
        title: 'Alarms',
        description: 'Alarms',
      },
    },
    slug: 'home-security-alarms',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca0'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca0'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca4'),
    translations: {
      uk: {
        title: 'Датчики диму',
        description: 'Датчики диму',
      },
      en: {
        title: 'Smoke Sensors',
        description: 'Smoke Sensors',
      },
    },
    slug: 'home-security-smoke-sensors',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca0'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21c6e'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca0'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
    translations: {
      uk: {
        title: "Сад та подвір'я",
        description: 'Обладнання та рослини для саду та присадибної ділянки',
      },
      en: {
        title: 'Garden & Outdoor',
        description: 'Equipment and plants for your garden and backyard',
      },
    },
    slug: 'garden',
    parentId: null,
    path: [],
    level: 0,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca6'),
    translations: {
      uk: {
        title: 'Садові меблі',
        description: 'Садові меблі',
      },
      en: {
        title: 'Furniture',
        description: 'Furniture',
      },
    },
    slug: 'garden-furniture',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca7'),
    translations: {
      uk: {
        title: 'Столи',
        description: 'Столи',
      },
      en: {
        title: 'Tables',
        description: 'Tables',
      },
    },
    slug: 'garden-furniture-tables',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca6'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca6'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca8'),
    translations: {
      uk: {
        title: 'Стільці',
        description: 'Стільці',
      },
      en: {
        title: 'Chairs',
        description: 'Chairs',
      },
    },
    slug: 'garden-furniture-chairs',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca6'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca6'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca9'),
    translations: {
      uk: {
        title: 'Шезлонги',
        description: 'Шезлонги',
      },
      en: {
        title: 'Sunloungers',
        description: 'Sunloungers',
      },
    },
    slug: 'garden-furniture-sunloungers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca6'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca6'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21caa'),
    translations: {
      uk: {
        title: 'Гойдалки',
        description: 'Гойдалки',
      },
      en: {
        title: 'Swings',
        description: 'Swings',
      },
    },
    slug: 'garden-furniture-swings',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca6'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca6'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cab'),
    translations: {
      uk: {
        title: 'Садові інструменти',
        description: 'Садові інструменти',
      },
      en: {
        title: 'Tools',
        description: 'Tools',
      },
    },
    slug: 'garden-tools',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cac'),
    translations: {
      uk: {
        title: 'Лопати',
        description: 'Лопати',
      },
      en: {
        title: 'Shovels',
        description: 'Shovels',
      },
    },
    slug: 'garden-tools-shovels',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cab'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cab'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cad'),
    translations: {
      uk: {
        title: 'Граблі',
        description: 'Граблі',
      },
      en: {
        title: 'Rakes',
        description: 'Rakes',
      },
    },
    slug: 'garden-tools-rakes',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cab'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cab'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cae'),
    translations: {
      uk: {
        title: 'Секатори',
        description: 'Секатори',
      },
      en: {
        title: 'Pruners',
        description: 'Pruners',
      },
    },
    slug: 'garden-tools-pruners',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cab'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cab'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21caf'),
    translations: {
      uk: {
        title: 'Поливальні системи',
        description: 'Поливальні системи',
      },
      en: {
        title: 'Watering',
        description: 'Watering',
      },
    },
    slug: 'garden-tools-watering',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cab'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cab'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb0'),
    translations: {
      uk: {
        title: 'Рослини та насіння',
        description: 'Рослини та насіння',
      },
      en: {
        title: 'Plants Seeds',
        description: 'Plants Seeds',
      },
    },
    slug: 'plants-seeds',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb1'),
    translations: {
      uk: {
        title: 'Насіння овочів',
        description: 'Насіння овочів',
      },
      en: {
        title: 'Vegetables',
        description: 'Vegetables',
      },
    },
    slug: 'plants-seeds-vegetables',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb0'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb0'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb2'),
    translations: {
      uk: {
        title: 'Насіння квітів',
        description: 'Насіння квітів',
      },
      en: {
        title: 'Flowers',
        description: 'Flowers',
      },
    },
    slug: 'plants-seeds-flowers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb0'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb0'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb3'),
    translations: {
      uk: {
        title: 'Саджанці',
        description: 'Саджанці',
      },
      en: {
        title: 'Seedlings',
        description: 'Seedlings',
      },
    },
    slug: 'plants-seeds-seedlings',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb0'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb0'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb4'),
    translations: {
      uk: {
        title: 'Ґрунти та добрива',
        description: 'Ґрунти та добрива',
      },
      en: {
        title: 'Soil',
        description: 'Soil',
      },
    },
    slug: 'plants-seeds-soil',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb0'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb0'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb5'),
    translations: {
      uk: {
        title: 'Барбекю та відпочинок',
        description: 'Барбекю та відпочинок',
      },
      en: {
        title: 'Bbq Outdoor',
        description: 'Bbq Outdoor',
      },
    },
    slug: 'bbq-outdoor',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb6'),
    translations: {
      uk: {
        title: 'Грилі',
        description: 'Грилі',
      },
      en: {
        title: 'Grills',
        description: 'Grills',
      },
    },
    slug: 'bbq-outdoor-grills',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb5'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb5'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb7'),
    translations: {
      uk: {
        title: 'Мангали',
        description: 'Мангали',
      },
      en: {
        title: 'Braziers',
        description: 'Braziers',
      },
    },
    slug: 'bbq-outdoor-braziers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb5'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb5'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb8'),
    translations: {
      uk: {
        title: 'Вугілля та розпал',
        description: 'Вугілля та розпал',
      },
      en: {
        title: 'Charcoal',
        description: 'Charcoal',
      },
    },
    slug: 'bbq-outdoor-charcoal',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb5'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb5'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb9'),
    translations: {
      uk: {
        title: 'Пікнікові набори',
        description: 'Пікнікові набори',
      },
      en: {
        title: 'Picnic Sets',
        description: 'Picnic Sets',
      },
    },
    slug: 'bbq-outdoor-picnic-sets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb5'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cb5'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cba'),
    translations: {
      uk: {
        title: 'Басейни та аксесуари',
        description: 'Басейни та аксесуари',
      },
      en: {
        title: 'Pools',
        description: 'Pools',
      },
    },
    slug: 'pools',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5')],
    level: 1,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cbb'),
    translations: {
      uk: {
        title: 'Каркасні басейни',
        description: 'Каркасні басейни',
      },
      en: {
        title: 'Frame',
        description: 'Frame',
      },
    },
    slug: 'pools-frame',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cba'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cba'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cbc'),
    translations: {
      uk: {
        title: 'Насоси та фільтри',
        description: 'Насоси та фільтри',
      },
      en: {
        title: 'Pumps',
        description: 'Pumps',
      },
    },
    slug: 'pools-pumps',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cba'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cba'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cbd'),
    translations: {
      uk: {
        title: 'Надувні матраци',
        description: 'Надувні матраци',
      },
      en: {
        title: 'Inflatables',
        description: 'Inflatables',
      },
    },
    slug: 'pools-inflatables',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cba'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cba'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cbe'),
    translations: {
      uk: {
        title: 'Догляд за двором',
        description: 'Догляд за двором',
      },
      en: {
        title: 'Yard Care',
        description: 'Yard Care',
      },
    },
    slug: 'yard-care',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5')],
    level: 1,
    order: 6,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cbf'),
    translations: {
      uk: {
        title: 'Газонокосарки',
        description: 'Газонокосарки',
      },
      en: {
        title: 'Mowers',
        description: 'Mowers',
      },
    },
    slug: 'yard-care-mowers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cbe'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cbe'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc0'),
    translations: {
      uk: {
        title: 'Тримери',
        description: 'Тримери',
      },
      en: {
        title: 'Trimmers',
        description: 'Trimmers',
      },
    },
    slug: 'yard-care-trimmers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cbe'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cbe'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc1'),
    translations: {
      uk: {
        title: 'Снігоприбирачі',
        description: 'Снігоприбирачі',
      },
      en: {
        title: 'Snowblowers',
        description: 'Snowblowers',
      },
    },
    slug: 'yard-care-snowblowers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cbe'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ca5'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cbe'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
    translations: {
      uk: {
        title: 'Техніка для дому',
        description: 'Побутова техніка для кухні, прибирання та догляду',
      },
      en: {
        title: 'Home Appliances',
        description: 'Appliances for kitchen, cleaning, and home care',
      },
    },
    slug: 'home-appliances',
    parentId: null,
    path: [],
    level: 0,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc3'),
    translations: {
      uk: {
        title: 'Крупна техніка',
        description: 'Крупна техніка',
      },
      en: {
        title: 'Large Appliances',
        description: 'Large Appliances',
      },
    },
    slug: 'large-appliances',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc4'),
    translations: {
      uk: {
        title: 'Холодильники',
        description: 'Холодильники',
      },
      en: {
        title: 'Fridges',
        description: 'Fridges',
      },
    },
    slug: 'large-appliances-fridges',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc3'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc3'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc5'),
    translations: {
      uk: {
        title: 'Пральні машини',
        description: 'Пральні машини',
      },
      en: {
        title: 'Washers',
        description: 'Washers',
      },
    },
    slug: 'large-appliances-washers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc3'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc3'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc6'),
    translations: {
      uk: {
        title: 'Посудомийні',
        description: 'Посудомийні',
      },
      en: {
        title: 'Dishwashers',
        description: 'Dishwashers',
      },
    },
    slug: 'large-appliances-dishwashers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc3'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc3'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc7'),
    translations: {
      uk: {
        title: 'Плити та духовки',
        description: 'Плити та духовки',
      },
      en: {
        title: 'Ovens',
        description: 'Ovens',
      },
    },
    slug: 'large-appliances-ovens',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc3'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc3'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc8'),
    translations: {
      uk: {
        title: 'Витяжки',
        description: 'Витяжки',
      },
      en: {
        title: 'Hoods',
        description: 'Hoods',
      },
    },
    slug: 'large-appliances-hoods',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc3'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc3'),
    ],
    level: 2,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc9'),
    translations: {
      uk: {
        title: 'Дрібна кухонна техніка',
        description: 'Дрібна кухонна техніка',
      },
      en: {
        title: 'Small Kitchen Appliances',
        description: 'Small Kitchen Appliances',
      },
    },
    slug: 'small-kitchen-appliances',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cca'),
    translations: {
      uk: {
        title: 'Блендери',
        description: 'Блендери',
      },
      en: {
        title: 'Blenders',
        description: 'Blenders',
      },
    },
    slug: 'small-kitchen-appliances-blenders',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc9'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc9'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccb'),
    translations: {
      uk: {
        title: 'Міксери',
        description: 'Міксери',
      },
      en: {
        title: 'Mixers',
        description: 'Mixers',
      },
    },
    slug: 'small-kitchen-appliances-mixers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc9'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc9'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccc'),
    translations: {
      uk: {
        title: 'Кавоварки',
        description: 'Кавоварки',
      },
      en: {
        title: 'Coffee',
        description: 'Coffee',
      },
    },
    slug: 'small-kitchen-appliances-coffee',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc9'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc9'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccd'),
    translations: {
      uk: {
        title: 'Мікрохвильові',
        description: 'Мікрохвильові',
      },
      en: {
        title: 'Microwaves',
        description: 'Microwaves',
      },
    },
    slug: 'small-kitchen-appliances-microwaves',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc9'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc9'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cce'),
    translations: {
      uk: {
        title: 'Тостери',
        description: 'Тостери',
      },
      en: {
        title: 'Toasters',
        description: 'Toasters',
      },
    },
    slug: 'small-kitchen-appliances-toasters',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc9'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc9'),
    ],
    level: 2,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccf'),
    translations: {
      uk: {
        title: 'Кліматична техніка',
        description: 'Кліматична техніка',
      },
      en: {
        title: 'Climate Appliances',
        description: 'Climate Appliances',
      },
    },
    slug: 'climate-appliances',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd0'),
    translations: {
      uk: {
        title: 'Кондиціонери',
        description: 'Кондиціонери',
      },
      en: {
        title: 'Ac',
        description: 'Ac',
      },
    },
    slug: 'climate-appliances-ac',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccf'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccf'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd1'),
    translations: {
      uk: {
        title: 'Обігрівачі',
        description: 'Обігрівачі',
      },
      en: {
        title: 'Heaters',
        description: 'Heaters',
      },
    },
    slug: 'climate-appliances-heaters',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccf'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccf'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd2'),
    translations: {
      uk: {
        title: 'Зволожувачі',
        description: 'Зволожувачі',
      },
      en: {
        title: 'Humidifiers',
        description: 'Humidifiers',
      },
    },
    slug: 'climate-appliances-humidifiers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccf'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccf'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd3'),
    translations: {
      uk: {
        title: 'Очищувачі повітря',
        description: 'Очищувачі повітря',
      },
      en: {
        title: 'Purifiers',
        description: 'Purifiers',
      },
    },
    slug: 'climate-appliances-purifiers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccf'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ccf'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd4'),
    translations: {
      uk: {
        title: 'Догляд за домом',
        description: 'Догляд за домом',
      },
      en: {
        title: 'Cleaning Appliances',
        description: 'Cleaning Appliances',
      },
    },
    slug: 'cleaning-appliances',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd5'),
    translations: {
      uk: {
        title: 'Пилососи',
        description: 'Пилососи',
      },
      en: {
        title: 'Vacuums',
        description: 'Vacuums',
      },
    },
    slug: 'cleaning-appliances-vacuums',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd4'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd4'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd6'),
    translations: {
      uk: {
        title: 'Пароочисники',
        description: 'Пароочисники',
      },
      en: {
        title: 'Steam',
        description: 'Steam',
      },
    },
    slug: 'cleaning-appliances-steam',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd4'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd4'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd7'),
    translations: {
      uk: {
        title: 'Праски',
        description: 'Праски',
      },
      en: {
        title: 'Irons',
        description: 'Irons',
      },
    },
    slug: 'cleaning-appliances-irons',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd4'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd4'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd8'),
    translations: {
      uk: {
        title: 'Швейні машини',
        description: 'Швейні машини',
      },
      en: {
        title: 'Sewing',
        description: 'Sewing',
      },
    },
    slug: 'cleaning-appliances-sewing',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd4'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd4'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd9'),
    translations: {
      uk: {
        title: 'Вбудована техніка',
        description: 'Вбудована техніка',
      },
      en: {
        title: 'Built In Appliances',
        description: 'Built In Appliances',
      },
    },
    slug: 'built-in-appliances',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2')],
    level: 1,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cda'),
    translations: {
      uk: {
        title: 'Варильні поверхні',
        description: 'Варильні поверхні',
      },
      en: {
        title: 'Hobs',
        description: 'Hobs',
      },
    },
    slug: 'built-in-appliances-hobs',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd9'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd9'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdb'),
    translations: {
      uk: {
        title: 'Духові шафи',
        description: 'Духові шафи',
      },
      en: {
        title: 'Ovens',
        description: 'Ovens',
      },
    },
    slug: 'built-in-appliances-ovens',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd9'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd9'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdc'),
    translations: {
      uk: {
        title: 'Вбудовані холодильники',
        description: 'Вбудовані холодильники',
      },
      en: {
        title: 'Fridges',
        description: 'Fridges',
      },
    },
    slug: 'built-in-appliances-fridges',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd9'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cc2'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cd9'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
    translations: {
      uk: {
        title: 'Електроніка та гаджети',
        description: 'Смартфони, комп’ютери та інша сучасна техніка',
      },
      en: {
        title: 'Electronics & Gadgets',
        description: 'Smartphones, computers, and other modern electronics',
      },
    },
    slug: 'electronics',
    parentId: null,
    path: [],
    level: 0,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cde'),
    translations: {
      uk: {
        title: 'Смартфони та аксесуари',
        description: 'Смартфони та аксесуари',
      },
      en: {
        title: 'Smartphones',
        description: 'Smartphones',
      },
    },
    slug: 'smartphones',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdf'),
    translations: {
      uk: {
        title: 'Смартфони',
        description: 'Смартфони',
      },
      en: {
        title: 'Phones',
        description: 'Phones',
      },
    },
    slug: 'smartphones-phones',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cde'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cde'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce0'),
    translations: {
      uk: {
        title: 'Чохли',
        description: 'Чохли',
      },
      en: {
        title: 'Cases',
        description: 'Cases',
      },
    },
    slug: 'smartphones-cases',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cde'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cde'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce1'),
    translations: {
      uk: {
        title: 'Захисне скло',
        description: 'Захисне скло',
      },
      en: {
        title: 'Glass',
        description: 'Glass',
      },
    },
    slug: 'smartphones-glass',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cde'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cde'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce2'),
    translations: {
      uk: {
        title: 'Зарядні пристрої',
        description: 'Зарядні пристрої',
      },
      en: {
        title: 'Chargers',
        description: 'Chargers',
      },
    },
    slug: 'smartphones-chargers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cde'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cde'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce3'),
    translations: {
      uk: {
        title: "Комп'ютери",
        description: "Комп'ютери",
      },
      en: {
        title: 'Computers',
        description: 'Computers',
      },
    },
    slug: 'computers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce4'),
    translations: {
      uk: {
        title: 'Ноутбуки',
        description: 'Ноутбуки',
      },
      en: {
        title: 'Laptops',
        description: 'Laptops',
      },
    },
    slug: 'computers-laptops',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce3'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce3'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce5'),
    translations: {
      uk: {
        title: 'ПК',
        description: 'ПК',
      },
      en: {
        title: 'Desktops',
        description: 'Desktops',
      },
    },
    slug: 'computers-desktops',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce3'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce3'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce6'),
    translations: {
      uk: {
        title: 'Монітори',
        description: 'Монітори',
      },
      en: {
        title: 'Monitors',
        description: 'Monitors',
      },
    },
    slug: 'computers-monitors',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce3'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce3'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce7'),
    translations: {
      uk: {
        title: 'Клавіатури та миші',
        description: 'Клавіатури та миші',
      },
      en: {
        title: 'Peripherals',
        description: 'Peripherals',
      },
    },
    slug: 'computers-peripherals',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce3'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce3'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce8'),
    translations: {
      uk: {
        title: 'ТВ та аудіо',
        description: 'ТВ та аудіо',
      },
      en: {
        title: 'Tv Audio',
        description: 'Tv Audio',
      },
    },
    slug: 'tv-audio',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce9'),
    translations: {
      uk: {
        title: 'Телевізори',
        description: 'Телевізори',
      },
      en: {
        title: 'Tvs',
        description: 'Tvs',
      },
    },
    slug: 'tv-audio-tvs',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce8'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce8'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cea'),
    translations: {
      uk: {
        title: 'Саундбари',
        description: 'Саундбари',
      },
      en: {
        title: 'Soundbars',
        description: 'Soundbars',
      },
    },
    slug: 'tv-audio-soundbars',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce8'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce8'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ceb'),
    translations: {
      uk: {
        title: 'Навушники',
        description: 'Навушники',
      },
      en: {
        title: 'Headphones',
        description: 'Headphones',
      },
    },
    slug: 'tv-audio-headphones',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce8'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce8'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cec'),
    translations: {
      uk: {
        title: 'Колонки',
        description: 'Колонки',
      },
      en: {
        title: 'Speakers',
        description: 'Speakers',
      },
    },
    slug: 'tv-audio-speakers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce8'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ce8'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ced'),
    translations: {
      uk: {
        title: 'Фото та відео',
        description: 'Фото та відео',
      },
      en: {
        title: 'Photo Video',
        description: 'Photo Video',
      },
    },
    slug: 'photo-video',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cee'),
    translations: {
      uk: {
        title: 'Камери',
        description: 'Камери',
      },
      en: {
        title: 'Cameras',
        description: 'Cameras',
      },
    },
    slug: 'photo-video-cameras',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ced'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ced'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cef'),
    translations: {
      uk: {
        title: "Об'єктиви",
        description: "Об'єктиви",
      },
      en: {
        title: 'Lenses',
        description: 'Lenses',
      },
    },
    slug: 'photo-video-lenses',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ced'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ced'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf0'),
    translations: {
      uk: {
        title: 'Штативи',
        description: 'Штативи',
      },
      en: {
        title: 'Tripods',
        description: 'Tripods',
      },
    },
    slug: 'photo-video-tripods',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ced'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21ced'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf1'),
    translations: {
      uk: {
        title: 'Розумний дім',
        description: 'Розумний дім',
      },
      en: {
        title: 'Smart Home',
        description: 'Smart Home',
      },
    },
    slug: 'smart-home',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd')],
    level: 1,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf2'),
    translations: {
      uk: {
        title: 'Камери спостереження',
        description: 'Камери спостереження',
      },
      en: {
        title: 'Cameras',
        description: 'Cameras',
      },
    },
    slug: 'smart-home-cameras',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf1'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf1'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf3'),
    translations: {
      uk: {
        title: 'Розумні лампи',
        description: 'Розумні лампи',
      },
      en: {
        title: 'Lights',
        description: 'Lights',
      },
    },
    slug: 'smart-home-lights',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf1'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf1'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf4'),
    translations: {
      uk: {
        title: 'Розетки',
        description: 'Розетки',
      },
      en: {
        title: 'Plugs',
        description: 'Plugs',
      },
    },
    slug: 'smart-home-plugs',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf1'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf1'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf5'),
    translations: {
      uk: {
        title: 'Хаби',
        description: 'Хаби',
      },
      en: {
        title: 'Hubs',
        description: 'Hubs',
      },
    },
    slug: 'smart-home-hubs',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf1'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf1'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf6'),
    translations: {
      uk: {
        title: 'Ігрові консолі',
        description: 'Ігрові консолі',
      },
      en: {
        title: 'Gaming',
        description: 'Gaming',
      },
    },
    slug: 'gaming',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd')],
    level: 1,
    order: 6,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf7'),
    translations: {
      uk: {
        title: 'Консолі',
        description: 'Консолі',
      },
      en: {
        title: 'Consoles',
        description: 'Consoles',
      },
    },
    slug: 'gaming-consoles',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf6'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf6'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf8'),
    translations: {
      uk: {
        title: 'Геймпади',
        description: 'Геймпади',
      },
      en: {
        title: 'Controllers',
        description: 'Controllers',
      },
    },
    slug: 'gaming-controllers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf6'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf6'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf9'),
    translations: {
      uk: {
        title: 'Диски та картриджі',
        description: 'Диски та картриджі',
      },
      en: {
        title: 'Games',
        description: 'Games',
      },
    },
    slug: 'gaming-games',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf6'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cdd'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cf6'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
    translations: {
      uk: {
        title: 'Одяг та взуття',
        description: 'Одяг, взуття та аксесуари для всієї родини',
      },
      en: {
        title: 'Clothing & Shoes',
        description: 'Apparel, footwear, and accessories for the whole family',
      },
    },
    slug: 'apparel',
    parentId: null,
    path: [],
    level: 0,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfb'),
    translations: {
      uk: {
        title: 'Жіночий одяг',
        description: 'Жіночий одяг',
      },
      en: {
        title: 'Women Clothing',
        description: 'Women Clothing',
      },
    },
    slug: 'women-clothing',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfc'),
    translations: {
      uk: {
        title: 'Сукні',
        description: 'Сукні',
      },
      en: {
        title: 'Dresses',
        description: 'Dresses',
      },
    },
    slug: 'women-clothing-dresses',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfb'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfb'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfd'),
    translations: {
      uk: {
        title: 'Блузи',
        description: 'Блузи',
      },
      en: {
        title: 'Blouses',
        description: 'Blouses',
      },
    },
    slug: 'women-clothing-blouses',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfb'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfb'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfe'),
    translations: {
      uk: {
        title: 'Джинси',
        description: 'Джинси',
      },
      en: {
        title: 'Jeans',
        description: 'Jeans',
      },
    },
    slug: 'women-clothing-jeans',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfb'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfb'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cff'),
    translations: {
      uk: {
        title: 'Верхній одяг',
        description: 'Верхній одяг',
      },
      en: {
        title: 'Outerwear',
        description: 'Outerwear',
      },
    },
    slug: 'women-clothing-outerwear',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfb'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfb'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d00'),
    translations: {
      uk: {
        title: 'Чоловічий одяг',
        description: 'Чоловічий одяг',
      },
      en: {
        title: 'Men Clothing',
        description: 'Men Clothing',
      },
    },
    slug: 'men-clothing',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d01'),
    translations: {
      uk: {
        title: 'Футболки',
        description: 'Футболки',
      },
      en: {
        title: 'Tshirts',
        description: 'Tshirts',
      },
    },
    slug: 'men-clothing-tshirts',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d00'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d00'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d02'),
    translations: {
      uk: {
        title: 'Сорочки',
        description: 'Сорочки',
      },
      en: {
        title: 'Shirts',
        description: 'Shirts',
      },
    },
    slug: 'men-clothing-shirts',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d00'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d00'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d03'),
    translations: {
      uk: {
        title: 'Джинси',
        description: 'Джинси',
      },
      en: {
        title: 'Jeans',
        description: 'Jeans',
      },
    },
    slug: 'men-clothing-jeans',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d00'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d00'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d04'),
    translations: {
      uk: {
        title: 'Верхній одяг',
        description: 'Верхній одяг',
      },
      en: {
        title: 'Outerwear',
        description: 'Outerwear',
      },
    },
    slug: 'men-clothing-outerwear',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d00'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d00'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d05'),
    translations: {
      uk: {
        title: 'Взуття',
        description: 'Взуття',
      },
      en: {
        title: 'Shoes',
        description: 'Shoes',
      },
    },
    slug: 'shoes',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d06'),
    translations: {
      uk: {
        title: 'Жіноче взуття',
        description: 'Жіноче взуття',
      },
      en: {
        title: 'Women',
        description: 'Women',
      },
    },
    slug: 'shoes-women',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d05'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d05'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d07'),
    translations: {
      uk: {
        title: 'Чоловіче взуття',
        description: 'Чоловіче взуття',
      },
      en: {
        title: 'Men',
        description: 'Men',
      },
    },
    slug: 'shoes-men',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d05'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d05'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d08'),
    translations: {
      uk: {
        title: 'Дитяче взуття',
        description: 'Дитяче взуття',
      },
      en: {
        title: 'Kids',
        description: 'Kids',
      },
    },
    slug: 'shoes-kids',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d05'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d05'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d09'),
    translations: {
      uk: {
        title: 'Спортивне взуття',
        description: 'Спортивне взуття',
      },
      en: {
        title: 'Sport',
        description: 'Sport',
      },
    },
    slug: 'shoes-sport',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d05'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d05'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0a'),
    translations: {
      uk: {
        title: 'Аксесуари',
        description: 'Аксесуари',
      },
      en: {
        title: 'Accessories',
        description: 'Accessories',
      },
    },
    slug: 'apparel-accessories',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0b'),
    translations: {
      uk: {
        title: 'Сумки',
        description: 'Сумки',
      },
      en: {
        title: 'Bags',
        description: 'Bags',
      },
    },
    slug: 'apparel-accessories-bags',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0a'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0c'),
    translations: {
      uk: {
        title: 'Ремені',
        description: 'Ремені',
      },
      en: {
        title: 'Belts',
        description: 'Belts',
      },
    },
    slug: 'apparel-accessories-belts',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0a'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0d'),
    translations: {
      uk: {
        title: 'Гаманці',
        description: 'Гаманці',
      },
      en: {
        title: 'Wallets',
        description: 'Wallets',
      },
    },
    slug: 'apparel-accessories-wallets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0a'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0e'),
    translations: {
      uk: {
        title: 'Головні убори',
        description: 'Головні убори',
      },
      en: {
        title: 'Hats',
        description: 'Hats',
      },
    },
    slug: 'apparel-accessories-hats',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0a'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0f'),
    translations: {
      uk: {
        title: 'Білизна та шкарпетки',
        description: 'Білизна та шкарпетки',
      },
      en: {
        title: 'Underwear Socks',
        description: 'Underwear Socks',
      },
    },
    slug: 'underwear-socks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa')],
    level: 1,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d10'),
    translations: {
      uk: {
        title: 'Жіноча білизна',
        description: 'Жіноча білизна',
      },
      en: {
        title: 'Underwear Women',
        description: 'Underwear Women',
      },
    },
    slug: 'underwear-women',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0f'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d11'),
    translations: {
      uk: {
        title: 'Чоловіча білизна',
        description: 'Чоловіча білизна',
      },
      en: {
        title: 'Underwear Men',
        description: 'Underwear Men',
      },
    },
    slug: 'underwear-men',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0f'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d12'),
    translations: {
      uk: {
        title: 'Шкарпетки',
        description: 'Шкарпетки',
      },
      en: {
        title: 'Items',
        description: 'Items',
      },
    },
    slug: 'underwear-socks-items',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0f'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d13'),
    translations: {
      uk: {
        title: 'Піжами',
        description: 'Піжами',
      },
      en: {
        title: 'Underwear Pajamas',
        description: 'Underwear Pajamas',
      },
    },
    slug: 'underwear-pajamas',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21cfa'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d0f'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
    translations: {
      uk: {
        title: 'Дитячі товари',
        description: 'Іграшки, одяг та засоби догляду для дітей',
      },
      en: {
        title: 'Kids & Baby',
        description: 'Toys, clothing, and care products for children',
      },
    },
    slug: 'kids',
    parentId: null,
    path: [],
    level: 0,
    order: 6,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d15'),
    translations: {
      uk: {
        title: 'Одяг для дітей',
        description: 'Одяг для дітей',
      },
      en: {
        title: 'Clothing',
        description: 'Clothing',
      },
    },
    slug: 'kids-clothing',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d16'),
    translations: {
      uk: {
        title: 'Для немовлят',
        description: 'Для немовлят',
      },
      en: {
        title: 'Babies',
        description: 'Babies',
      },
    },
    slug: 'kids-clothing-babies',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d15'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d15'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d17'),
    translations: {
      uk: {
        title: 'Для дівчаток',
        description: 'Для дівчаток',
      },
      en: {
        title: 'Girls',
        description: 'Girls',
      },
    },
    slug: 'kids-clothing-girls',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d15'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d15'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d18'),
    translations: {
      uk: {
        title: 'Для хлопчиків',
        description: 'Для хлопчиків',
      },
      en: {
        title: 'Boys',
        description: 'Boys',
      },
    },
    slug: 'kids-clothing-boys',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d15'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d15'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d19'),
    translations: {
      uk: {
        title: 'Іграшки',
        description: 'Іграшки',
      },
      en: {
        title: 'Toys',
        description: 'Toys',
      },
    },
    slug: 'toys',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1a'),
    translations: {
      uk: {
        title: 'Конструктори',
        description: 'Конструктори',
      },
      en: {
        title: 'Building',
        description: 'Building',
      },
    },
    slug: 'toys-building',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d19'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d19'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1b'),
    translations: {
      uk: {
        title: 'Ляльки',
        description: 'Ляльки',
      },
      en: {
        title: 'Dolls',
        description: 'Dolls',
      },
    },
    slug: 'toys-dolls',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d19'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d19'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1c'),
    translations: {
      uk: {
        title: 'Машинки',
        description: 'Машинки',
      },
      en: {
        title: 'Cars',
        description: 'Cars',
      },
    },
    slug: 'toys-cars',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d19'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d19'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1d'),
    translations: {
      uk: {
        title: 'Настільні ігри',
        description: 'Настільні ігри',
      },
      en: {
        title: 'Boardgames',
        description: 'Boardgames',
      },
    },
    slug: 'toys-boardgames',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d19'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d19'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1e'),
    translations: {
      uk: {
        title: 'Дитяча кімната',
        description: 'Дитяча кімната',
      },
      en: {
        title: 'Room',
        description: 'Room',
      },
    },
    slug: 'kids-room',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1f'),
    translations: {
      uk: {
        title: 'Ліжечка',
        description: 'Ліжечка',
      },
      en: {
        title: 'Cribs',
        description: 'Cribs',
      },
    },
    slug: 'kids-room-cribs',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1e'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1e'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d20'),
    translations: {
      uk: {
        title: 'Матраци',
        description: 'Матраци',
      },
      en: {
        title: 'Mattresses',
        description: 'Mattresses',
      },
    },
    slug: 'kids-room-mattresses',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1e'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1e'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d21'),
    translations: {
      uk: {
        title: 'Комоди',
        description: 'Комоди',
      },
      en: {
        title: 'Dressers',
        description: 'Dressers',
      },
    },
    slug: 'kids-room-dressers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1e'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1e'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d22'),
    translations: {
      uk: {
        title: 'Освітлення',
        description: 'Освітлення',
      },
      en: {
        title: 'Lighting',
        description: 'Lighting',
      },
    },
    slug: 'kids-room-lighting',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1e'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d1e'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d23'),
    translations: {
      uk: {
        title: 'Прогулянки та подорожі',
        description: 'Прогулянки та подорожі',
      },
      en: {
        title: 'Strollers Travel',
        description: 'Strollers Travel',
      },
    },
    slug: 'strollers-travel',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d24'),
    translations: {
      uk: {
        title: 'Коляски',
        description: 'Коляски',
      },
      en: {
        title: 'Strollers',
        description: 'Strollers',
      },
    },
    slug: 'strollers-travel-strollers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d23'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d23'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d25'),
    translations: {
      uk: {
        title: 'Автокрісла',
        description: 'Автокрісла',
      },
      en: {
        title: 'Car Seats',
        description: 'Car Seats',
      },
    },
    slug: 'strollers-travel-car-seats',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d23'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d23'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d26'),
    translations: {
      uk: {
        title: 'Слінги',
        description: 'Слінги',
      },
      en: {
        title: 'Slings',
        description: 'Slings',
      },
    },
    slug: 'strollers-travel-slings',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d23'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d23'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d27'),
    translations: {
      uk: {
        title: 'Гігієна та догляд',
        description: 'Гігієна та догляд',
      },
      en: {
        title: 'Baby Care',
        description: 'Baby Care',
      },
    },
    slug: 'baby-care',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14')],
    level: 1,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d28'),
    translations: {
      uk: {
        title: 'Підгузки',
        description: 'Підгузки',
      },
      en: {
        title: 'Diapers',
        description: 'Diapers',
      },
    },
    slug: 'baby-care-diapers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d27'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d27'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d29'),
    translations: {
      uk: {
        title: 'Купання',
        description: 'Купання',
      },
      en: {
        title: 'Bathing',
        description: 'Bathing',
      },
    },
    slug: 'baby-care-bathing',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d27'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d27'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2a'),
    translations: {
      uk: {
        title: 'Годування',
        description: 'Годування',
      },
      en: {
        title: 'Feeding',
        description: 'Feeding',
      },
    },
    slug: 'baby-care-feeding',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d27'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d14'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d27'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
    translations: {
      uk: {
        title: 'Спорт та відпочинок',
        description: 'Товари для спорту, фітнесу та активного відпочинку',
      },
      en: {
        title: 'Sports & Outdoors',
        description: 'Products for sports, fitness, and active recreation',
      },
    },
    slug: 'sports',
    parentId: null,
    path: [],
    level: 0,
    order: 7,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2c'),
    translations: {
      uk: {
        title: 'Фітнес',
        description: 'Фітнес',
      },
      en: {
        title: 'Fitness',
        description: 'Fitness',
      },
    },
    slug: 'fitness',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2d'),
    translations: {
      uk: {
        title: 'Гантелі',
        description: 'Гантелі',
      },
      en: {
        title: 'Dumbbells',
        description: 'Dumbbells',
      },
    },
    slug: 'fitness-dumbbells',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2c'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2c'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2e'),
    translations: {
      uk: {
        title: 'Килимки',
        description: 'Килимки',
      },
      en: {
        title: 'Mats',
        description: 'Mats',
      },
    },
    slug: 'fitness-mats',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2c'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2c'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2f'),
    translations: {
      uk: {
        title: 'Тренажери',
        description: 'Тренажери',
      },
      en: {
        title: 'Machines',
        description: 'Machines',
      },
    },
    slug: 'fitness-machines',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2c'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2c'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d30'),
    translations: {
      uk: {
        title: 'Еспандери',
        description: 'Еспандери',
      },
      en: {
        title: 'Resistance',
        description: 'Resistance',
      },
    },
    slug: 'fitness-resistance',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2c'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2c'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d31'),
    translations: {
      uk: {
        title: 'Велосипеди',
        description: 'Велосипеди',
      },
      en: {
        title: 'Bicycles',
        description: 'Bicycles',
      },
    },
    slug: 'bicycles',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d32'),
    translations: {
      uk: {
        title: 'Гірські',
        description: 'Гірські',
      },
      en: {
        title: 'Mountain',
        description: 'Mountain',
      },
    },
    slug: 'bicycles-mountain',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d31'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d31'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d33'),
    translations: {
      uk: {
        title: 'Міські',
        description: 'Міські',
      },
      en: {
        title: 'City',
        description: 'City',
      },
    },
    slug: 'bicycles-city',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d31'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d31'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d34'),
    translations: {
      uk: {
        title: 'Аксесуари',
        description: 'Аксесуари',
      },
      en: {
        title: 'Accessories',
        description: 'Accessories',
      },
    },
    slug: 'bicycles-accessories',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d31'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d31'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d35'),
    translations: {
      uk: {
        title: 'Туризм і кемпінг',
        description: 'Туризм і кемпінг',
      },
      en: {
        title: 'Camping',
        description: 'Camping',
      },
    },
    slug: 'camping',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d36'),
    translations: {
      uk: {
        title: 'Намети',
        description: 'Намети',
      },
      en: {
        title: 'Tents',
        description: 'Tents',
      },
    },
    slug: 'camping-tents',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d35'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d35'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d37'),
    translations: {
      uk: {
        title: 'Спальники',
        description: 'Спальники',
      },
      en: {
        title: 'Sleeping Bags',
        description: 'Sleeping Bags',
      },
    },
    slug: 'camping-sleeping-bags',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d35'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d35'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d38'),
    translations: {
      uk: {
        title: 'Рюкзаки',
        description: 'Рюкзаки',
      },
      en: {
        title: 'Backpacks',
        description: 'Backpacks',
      },
    },
    slug: 'camping-backpacks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d35'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d35'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d39'),
    translations: {
      uk: {
        title: 'Пальники',
        description: 'Пальники',
      },
      en: {
        title: 'Burners',
        description: 'Burners',
      },
    },
    slug: 'camping-burners',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d35'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d35'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3a'),
    translations: {
      uk: {
        title: 'Водні види спорту',
        description: 'Водні види спорту',
      },
      en: {
        title: 'Water Sports',
        description: 'Water Sports',
      },
    },
    slug: 'water-sports',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3b'),
    translations: {
      uk: {
        title: 'SUP дошки',
        description: 'SUP дошки',
      },
      en: {
        title: 'Sup',
        description: 'Sup',
      },
    },
    slug: 'water-sports-sup',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3a'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3c'),
    translations: {
      uk: {
        title: 'Маски та ласти',
        description: 'Маски та ласти',
      },
      en: {
        title: 'Snorkeling',
        description: 'Snorkeling',
      },
    },
    slug: 'water-sports-snorkeling',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3a'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3d'),
    translations: {
      uk: {
        title: 'Рятувальні жилети',
        description: 'Рятувальні жилети',
      },
      en: {
        title: 'Life Jackets',
        description: 'Life Jackets',
      },
    },
    slug: 'water-sports-life-jackets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3a'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3e'),
    translations: {
      uk: {
        title: 'Зимові види спорту',
        description: 'Зимові види спорту',
      },
      en: {
        title: 'Winter Sports',
        description: 'Winter Sports',
      },
    },
    slug: 'winter-sports',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b')],
    level: 1,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3f'),
    translations: {
      uk: {
        title: 'Лижі',
        description: 'Лижі',
      },
      en: {
        title: 'Skis',
        description: 'Skis',
      },
    },
    slug: 'winter-sports-skis',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3e'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3e'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d40'),
    translations: {
      uk: {
        title: 'Сноуборди',
        description: 'Сноуборди',
      },
      en: {
        title: 'Snowboards',
        description: 'Snowboards',
      },
    },
    slug: 'winter-sports-snowboards',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3e'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3e'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d41'),
    translations: {
      uk: {
        title: 'Ковзани',
        description: 'Ковзани',
      },
      en: {
        title: 'Skates',
        description: 'Skates',
      },
    },
    slug: 'winter-sports-skates',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3e'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d2b'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d3e'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
    translations: {
      uk: {
        title: 'Авто та мото',
        description: 'Запчастини, аксесуари та догляд за авто і мото технікою',
      },
      en: {
        title: 'Auto & Moto',
        description: 'Parts, accessories, and care for cars and motorcycles',
      },
    },
    slug: 'auto-moto',
    parentId: null,
    path: [],
    level: 0,
    order: 8,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d43'),
    translations: {
      uk: {
        title: 'Автозапчастини',
        description: 'Автозапчастини',
      },
      en: {
        title: 'Auto Parts',
        description: 'Auto Parts',
      },
    },
    slug: 'auto-parts',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d44'),
    translations: {
      uk: {
        title: 'Фільтри',
        description: 'Фільтри',
      },
      en: {
        title: 'Filters',
        description: 'Filters',
      },
    },
    slug: 'auto-parts-filters',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d43'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d43'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d45'),
    translations: {
      uk: {
        title: 'Гальма',
        description: 'Гальма',
      },
      en: {
        title: 'Brakes',
        description: 'Brakes',
      },
    },
    slug: 'auto-parts-brakes',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d43'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d43'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d46'),
    translations: {
      uk: {
        title: 'Амортизатори',
        description: 'Амортизатори',
      },
      en: {
        title: 'Shocks',
        description: 'Shocks',
      },
    },
    slug: 'auto-parts-shocks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d43'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d43'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d47'),
    translations: {
      uk: {
        title: 'Акумулятори',
        description: 'Акумулятори',
      },
      en: {
        title: 'Batteries',
        description: 'Batteries',
      },
    },
    slug: 'auto-parts-batteries',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d43'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d43'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d48'),
    translations: {
      uk: {
        title: 'Аксесуари',
        description: 'Аксесуари',
      },
      en: {
        title: 'Auto Accessories',
        description: 'Auto Accessories',
      },
    },
    slug: 'auto-accessories',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d49'),
    translations: {
      uk: {
        title: 'Відеореєстратори',
        description: 'Відеореєстратори',
      },
      en: {
        title: 'Dashcams',
        description: 'Dashcams',
      },
    },
    slug: 'auto-accessories-dashcams',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d48'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d48'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4a'),
    translations: {
      uk: {
        title: 'Килимки',
        description: 'Килимки',
      },
      en: {
        title: 'Mats',
        description: 'Mats',
      },
    },
    slug: 'auto-accessories-mats',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d48'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d48'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4b'),
    translations: {
      uk: {
        title: 'Чохли',
        description: 'Чохли',
      },
      en: {
        title: 'Covers',
        description: 'Covers',
      },
    },
    slug: 'auto-accessories-covers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d48'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d48'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4c'),
    translations: {
      uk: {
        title: 'Органайзери',
        description: 'Органайзери',
      },
      en: {
        title: 'Organizers',
        description: 'Organizers',
      },
    },
    slug: 'auto-accessories-organizers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d48'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d48'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4d'),
    translations: {
      uk: {
        title: 'Шини та диски',
        description: 'Шини та диски',
      },
      en: {
        title: 'Tires Wheels',
        description: 'Tires Wheels',
      },
    },
    slug: 'tires-wheels',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4e'),
    translations: {
      uk: {
        title: 'Літні шини',
        description: 'Літні шини',
      },
      en: {
        title: 'Summer',
        description: 'Summer',
      },
    },
    slug: 'tires-wheels-summer',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4d'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4f'),
    translations: {
      uk: {
        title: 'Зимові шини',
        description: 'Зимові шини',
      },
      en: {
        title: 'Winter',
        description: 'Winter',
      },
    },
    slug: 'tires-wheels-winter',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4d'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d50'),
    translations: {
      uk: {
        title: 'Диски',
        description: 'Диски',
      },
      en: {
        title: 'Rims',
        description: 'Rims',
      },
    },
    slug: 'tires-wheels-rims',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d4d'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d51'),
    translations: {
      uk: {
        title: 'Мото',
        description: 'Мото',
      },
      en: {
        title: 'Moto',
        description: 'Moto',
      },
    },
    slug: 'moto',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d52'),
    translations: {
      uk: {
        title: 'Шоломи',
        description: 'Шоломи',
      },
      en: {
        title: 'Helmets',
        description: 'Helmets',
      },
    },
    slug: 'moto-helmets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d51'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d51'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d53'),
    translations: {
      uk: {
        title: 'Екіпіровка',
        description: 'Екіпіровка',
      },
      en: {
        title: 'Gear',
        description: 'Gear',
      },
    },
    slug: 'moto-gear',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d51'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d51'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d54'),
    translations: {
      uk: {
        title: 'Запчастини',
        description: 'Запчастини',
      },
      en: {
        title: 'Parts',
        description: 'Parts',
      },
    },
    slug: 'moto-parts',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d51'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d51'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d55'),
    translations: {
      uk: {
        title: 'Інструменти для авто',
        description: 'Інструменти для авто',
      },
      en: {
        title: 'Auto Tools',
        description: 'Auto Tools',
      },
    },
    slug: 'auto-tools',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42')],
    level: 1,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d56'),
    translations: {
      uk: {
        title: 'Домкрати',
        description: 'Домкрати',
      },
      en: {
        title: 'Jacks',
        description: 'Jacks',
      },
    },
    slug: 'auto-tools-jacks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d55'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d55'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d57'),
    translations: {
      uk: {
        title: 'Компресори',
        description: 'Компресори',
      },
      en: {
        title: 'Compressors',
        description: 'Compressors',
      },
    },
    slug: 'auto-tools-compressors',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d55'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d55'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d58'),
    translations: {
      uk: {
        title: 'Набори ключів',
        description: 'Набори ключів',
      },
      en: {
        title: 'Wrenches',
        description: 'Wrenches',
      },
    },
    slug: 'auto-tools-wrenches',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d55'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d42'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d55'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
    translations: {
      uk: {
        title: "Краса та здоров'я",
        description: 'Косметика, парфуми та товари для особистої гігієни',
      },
      en: {
        title: 'Beauty & Health',
        description: 'Cosmetics, perfumes, and personal care products',
      },
    },
    slug: 'beauty-health',
    parentId: null,
    path: [],
    level: 0,
    order: 9,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5a'),
    translations: {
      uk: {
        title: 'Догляд за волоссям',
        description: 'Догляд за волоссям',
      },
      en: {
        title: 'Hair Care',
        description: 'Hair Care',
      },
    },
    slug: 'hair-care',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5b'),
    translations: {
      uk: {
        title: 'Фени',
        description: 'Фени',
      },
      en: {
        title: 'Dryers',
        description: 'Dryers',
      },
    },
    slug: 'hair-care-dryers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5a'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5c'),
    translations: {
      uk: {
        title: 'Плойки та випрямлячі',
        description: 'Плойки та випрямлячі',
      },
      en: {
        title: 'Stylers',
        description: 'Stylers',
      },
    },
    slug: 'hair-care-stylers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5a'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5d'),
    translations: {
      uk: {
        title: 'Щітки',
        description: 'Щітки',
      },
      en: {
        title: 'Brushes',
        description: 'Brushes',
      },
    },
    slug: 'hair-care-brushes',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5a'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5e'),
    translations: {
      uk: {
        title: 'Шампуні',
        description: 'Шампуні',
      },
      en: {
        title: 'Shampoos',
        description: 'Shampoos',
      },
    },
    slug: 'hair-care-shampoos',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5a'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5a'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5f'),
    translations: {
      uk: {
        title: 'Догляд за шкірою',
        description: 'Догляд за шкірою',
      },
      en: {
        title: 'Skin Care',
        description: 'Skin Care',
      },
    },
    slug: 'skin-care',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d60'),
    translations: {
      uk: {
        title: 'Креми',
        description: 'Креми',
      },
      en: {
        title: 'Creams',
        description: 'Creams',
      },
    },
    slug: 'skin-care-creams',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5f'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d61'),
    translations: {
      uk: {
        title: 'Сироватки',
        description: 'Сироватки',
      },
      en: {
        title: 'Serums',
        description: 'Serums',
      },
    },
    slug: 'skin-care-serums',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5f'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d62'),
    translations: {
      uk: {
        title: 'Маски',
        description: 'Маски',
      },
      en: {
        title: 'Masks',
        description: 'Masks',
      },
    },
    slug: 'skin-care-masks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d5f'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d63'),
    translations: {
      uk: {
        title: 'Макіяж',
        description: 'Макіяж',
      },
      en: {
        title: 'Makeup',
        description: 'Makeup',
      },
    },
    slug: 'makeup',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d64'),
    translations: {
      uk: {
        title: 'Помади',
        description: 'Помади',
      },
      en: {
        title: 'Lipsticks',
        description: 'Lipsticks',
      },
    },
    slug: 'makeup-lipsticks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d63'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d63'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d65'),
    translations: {
      uk: {
        title: 'Тіні',
        description: 'Тіні',
      },
      en: {
        title: 'Eyeshadow',
        description: 'Eyeshadow',
      },
    },
    slug: 'makeup-eyeshadow',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d63'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d63'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d66'),
    translations: {
      uk: {
        title: 'Тональні засоби',
        description: 'Тональні засоби',
      },
      en: {
        title: 'Foundation',
        description: 'Foundation',
      },
    },
    slug: 'makeup-foundation',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d63'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d63'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d67'),
    translations: {
      uk: {
        title: 'Парфуми',
        description: 'Парфуми',
      },
      en: {
        title: 'Perfumes',
        description: 'Perfumes',
      },
    },
    slug: 'perfumes',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d68'),
    translations: {
      uk: {
        title: 'Жіночі',
        description: 'Жіночі',
      },
      en: {
        title: 'Women',
        description: 'Women',
      },
    },
    slug: 'perfumes-women',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d67'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d67'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d69'),
    translations: {
      uk: {
        title: 'Чоловічі',
        description: 'Чоловічі',
      },
      en: {
        title: 'Men',
        description: 'Men',
      },
    },
    slug: 'perfumes-men',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d67'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d67'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6a'),
    translations: {
      uk: {
        title: 'Унісекс',
        description: 'Унісекс',
      },
      en: {
        title: 'Unisex',
        description: 'Unisex',
      },
    },
    slug: 'perfumes-unisex',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d67'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d67'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6b'),
    translations: {
      uk: {
        title: 'Медтехніка',
        description: 'Медтехніка',
      },
      en: {
        title: 'Medical Devices',
        description: 'Medical Devices',
      },
    },
    slug: 'medical-devices',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59')],
    level: 1,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6c'),
    translations: {
      uk: {
        title: 'Тонометри',
        description: 'Тонометри',
      },
      en: {
        title: 'Pressure',
        description: 'Pressure',
      },
    },
    slug: 'medical-devices-pressure',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6b'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6d'),
    translations: {
      uk: {
        title: 'Глюкометри',
        description: 'Глюкометри',
      },
      en: {
        title: 'Glucose',
        description: 'Glucose',
      },
    },
    slug: 'medical-devices-glucose',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6b'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6e'),
    translations: {
      uk: {
        title: 'Інгалятори',
        description: 'Інгалятори',
      },
      en: {
        title: 'Inhalers',
        description: 'Inhalers',
      },
    },
    slug: 'medical-devices-inhalers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d59'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6b'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
    translations: {
      uk: {
        title: 'Офіс та канцелярія',
        description: 'Офіс та канцелярія',
      },
      en: {
        title: 'Office',
        description: 'Office',
      },
    },
    slug: 'office',
    parentId: null,
    path: [],
    level: 0,
    order: 10,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d70'),
    translations: {
      uk: {
        title: 'Канцелярія',
        description: 'Канцелярія',
      },
      en: {
        title: 'Stationery',
        description: 'Stationery',
      },
    },
    slug: 'stationery',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d71'),
    translations: {
      uk: {
        title: 'Ручки',
        description: 'Ручки',
      },
      en: {
        title: 'Pens',
        description: 'Pens',
      },
    },
    slug: 'stationery-pens',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d70'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d70'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d72'),
    translations: {
      uk: {
        title: 'Зошити',
        description: 'Зошити',
      },
      en: {
        title: 'Notebooks',
        description: 'Notebooks',
      },
    },
    slug: 'stationery-notebooks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d70'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d70'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d73'),
    translations: {
      uk: {
        title: 'Папір',
        description: 'Папір',
      },
      en: {
        title: 'Paper',
        description: 'Paper',
      },
    },
    slug: 'stationery-paper',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d70'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d70'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d74'),
    translations: {
      uk: {
        title: 'Папки',
        description: 'Папки',
      },
      en: {
        title: 'Folders',
        description: 'Folders',
      },
    },
    slug: 'stationery-folders',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d70'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d70'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d75'),
    translations: {
      uk: {
        title: 'Організація робочого місця',
        description: 'Організація робочого місця',
      },
      en: {
        title: 'Desk Organization',
        description: 'Desk Organization',
      },
    },
    slug: 'desk-organization',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d76'),
    translations: {
      uk: {
        title: 'Органайзери',
        description: 'Органайзери',
      },
      en: {
        title: 'Organizers',
        description: 'Organizers',
      },
    },
    slug: 'desk-organization-organizers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d75'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d75'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d77'),
    translations: {
      uk: {
        title: 'Лотки',
        description: 'Лотки',
      },
      en: {
        title: 'Trays',
        description: 'Trays',
      },
    },
    slug: 'desk-organization-trays',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d75'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d75'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d78'),
    translations: {
      uk: {
        title: 'Підставки',
        description: 'Підставки',
      },
      en: {
        title: 'Stands',
        description: 'Stands',
      },
    },
    slug: 'desk-organization-stands',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d75'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d75'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d79'),
    translations: {
      uk: {
        title: 'Офісні меблі',
        description: 'Офісні меблі',
      },
      en: {
        title: 'Furniture',
        description: 'Furniture',
      },
    },
    slug: 'office-furniture',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7a'),
    translations: {
      uk: {
        title: 'Офісні стільці',
        description: 'Офісні стільці',
      },
      en: {
        title: 'Chairs',
        description: 'Chairs',
      },
    },
    slug: 'office-furniture-chairs',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d79'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d79'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7b'),
    translations: {
      uk: {
        title: 'Офісні столи',
        description: 'Офісні столи',
      },
      en: {
        title: 'Desks',
        description: 'Desks',
      },
    },
    slug: 'office-furniture-desks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d79'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d79'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7c'),
    translations: {
      uk: {
        title: 'Шафи',
        description: 'Шафи',
      },
      en: {
        title: 'Cabinets',
        description: 'Cabinets',
      },
    },
    slug: 'office-furniture-cabinets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d79'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d79'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7d'),
    translations: {
      uk: {
        title: 'Техніка для офісу',
        description: 'Техніка для офісу',
      },
      en: {
        title: 'Equipment',
        description: 'Equipment',
      },
    },
    slug: 'office-equipment',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7e'),
    translations: {
      uk: {
        title: 'Принтери',
        description: 'Принтери',
      },
      en: {
        title: 'Printers',
        description: 'Printers',
      },
    },
    slug: 'office-equipment-printers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7d'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7f'),
    translations: {
      uk: {
        title: 'Сканери',
        description: 'Сканери',
      },
      en: {
        title: 'Scanners',
        description: 'Scanners',
      },
    },
    slug: 'office-equipment-scanners',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7d'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d80'),
    translations: {
      uk: {
        title: 'Ламінатори',
        description: 'Ламінатори',
      },
      en: {
        title: 'Laminators',
        description: 'Laminators',
      },
    },
    slug: 'office-equipment-laminators',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7d'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d6f'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d7d'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
    translations: {
      uk: {
        title: 'Товари для тварин',
        description: 'Товари для тварин',
      },
      en: {
        title: 'Pets',
        description: 'Pets',
      },
    },
    slug: 'pets',
    parentId: null,
    path: [],
    level: 0,
    order: 11,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d82'),
    translations: {
      uk: {
        title: 'Для собак',
        description: 'Для собак',
      },
      en: {
        title: 'Dogs',
        description: 'Dogs',
      },
    },
    slug: 'dogs',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d83'),
    translations: {
      uk: {
        title: 'Корм',
        description: 'Корм',
      },
      en: {
        title: 'Food',
        description: 'Food',
      },
    },
    slug: 'dogs-food',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d82'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d82'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d84'),
    translations: {
      uk: {
        title: 'Ліжка',
        description: 'Ліжка',
      },
      en: {
        title: 'Beds',
        description: 'Beds',
      },
    },
    slug: 'dogs-beds',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d82'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d82'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d85'),
    translations: {
      uk: {
        title: 'Іграшки',
        description: 'Іграшки',
      },
      en: {
        title: 'Toys',
        description: 'Toys',
      },
    },
    slug: 'dogs-toys',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d82'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d82'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d86'),
    translations: {
      uk: {
        title: 'Повідці',
        description: 'Повідці',
      },
      en: {
        title: 'Leashes',
        description: 'Leashes',
      },
    },
    slug: 'dogs-leashes',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d82'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d82'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d87'),
    translations: {
      uk: {
        title: 'Для котів',
        description: 'Для котів',
      },
      en: {
        title: 'Cats',
        description: 'Cats',
      },
    },
    slug: 'cats',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d88'),
    translations: {
      uk: {
        title: 'Корм',
        description: 'Корм',
      },
      en: {
        title: 'Food',
        description: 'Food',
      },
    },
    slug: 'cats-food',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d87'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d87'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d89'),
    translations: {
      uk: {
        title: 'Лотки',
        description: 'Лотки',
      },
      en: {
        title: 'Litter',
        description: 'Litter',
      },
    },
    slug: 'cats-litter',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d87'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d87'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8a'),
    translations: {
      uk: {
        title: 'Кігтеточки',
        description: 'Кігтеточки',
      },
      en: {
        title: 'Scratchers',
        description: 'Scratchers',
      },
    },
    slug: 'cats-scratchers',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d87'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d87'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8b'),
    translations: {
      uk: {
        title: 'Іграшки',
        description: 'Іграшки',
      },
      en: {
        title: 'Toys',
        description: 'Toys',
      },
    },
    slug: 'cats-toys',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d87'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d87'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8c'),
    translations: {
      uk: {
        title: 'Для птахів',
        description: 'Для птахів',
      },
      en: {
        title: 'Birds',
        description: 'Birds',
      },
    },
    slug: 'birds',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8d'),
    translations: {
      uk: {
        title: 'Клітки',
        description: 'Клітки',
      },
      en: {
        title: 'Cages',
        description: 'Cages',
      },
    },
    slug: 'birds-cages',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8c'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8c'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8e'),
    translations: {
      uk: {
        title: 'Корм',
        description: 'Корм',
      },
      en: {
        title: 'Food',
        description: 'Food',
      },
    },
    slug: 'birds-food',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8c'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8c'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8f'),
    translations: {
      uk: {
        title: 'Для акваріумів',
        description: 'Для акваріумів',
      },
      en: {
        title: 'Aquariums',
        description: 'Aquariums',
      },
    },
    slug: 'aquariums',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d90'),
    translations: {
      uk: {
        title: 'Акваріуми',
        description: 'Акваріуми',
      },
      en: {
        title: 'Tanks',
        description: 'Tanks',
      },
    },
    slug: 'aquariums-tanks',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8f'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d91'),
    translations: {
      uk: {
        title: 'Фільтри',
        description: 'Фільтри',
      },
      en: {
        title: 'Filters',
        description: 'Filters',
      },
    },
    slug: 'aquariums-filters',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8f'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d92'),
    translations: {
      uk: {
        title: 'Декор',
        description: 'Декор',
      },
      en: {
        title: 'Decor',
        description: 'Decor',
      },
    },
    slug: 'aquariums-decor',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8f'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d8f'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d93'),
    translations: {
      uk: {
        title: 'Ветеринарні товари',
        description: 'Ветеринарні товари',
      },
      en: {
        title: 'Pet Health',
        description: 'Pet Health',
      },
    },
    slug: 'pet-health',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81')],
    level: 1,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d94'),
    translations: {
      uk: {
        title: 'Вітаміни',
        description: 'Вітаміни',
      },
      en: {
        title: 'Vitamins',
        description: 'Vitamins',
      },
    },
    slug: 'pet-health-vitamins',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d93'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d93'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d95'),
    translations: {
      uk: {
        title: 'Засоби догляду',
        description: 'Засоби догляду',
      },
      en: {
        title: 'Care',
        description: 'Care',
      },
    },
    slug: 'pet-health-care',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d93'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d81'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d93'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
    translations: {
      uk: {
        title: 'Будівництво та ремонт',
        description: 'Будівництво та ремонт',
      },
      en: {
        title: 'Construction',
        description: 'Construction',
      },
    },
    slug: 'construction',
    parentId: null,
    path: [],
    level: 0,
    order: 12,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d97'),
    translations: {
      uk: {
        title: 'Інструменти',
        description: 'Інструменти',
      },
      en: {
        title: 'Tools',
        description: 'Tools',
      },
    },
    slug: 'tools',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96')],
    level: 1,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d98'),
    translations: {
      uk: {
        title: 'Електроінструменти',
        description: 'Електроінструменти',
      },
      en: {
        title: 'Power',
        description: 'Power',
      },
    },
    slug: 'tools-power',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d97'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d97'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d99'),
    translations: {
      uk: {
        title: 'Ручні інструменти',
        description: 'Ручні інструменти',
      },
      en: {
        title: 'Hand',
        description: 'Hand',
      },
    },
    slug: 'tools-hand',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d97'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d97'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9a'),
    translations: {
      uk: {
        title: 'Оснастка',
        description: 'Оснастка',
      },
      en: {
        title: 'Accessories',
        description: 'Accessories',
      },
    },
    slug: 'tools-accessories',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d97'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d97'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9b'),
    translations: {
      uk: {
        title: 'Будівельні матеріали',
        description: 'Будівельні матеріали',
      },
      en: {
        title: 'Materials',
        description: 'Materials',
      },
    },
    slug: 'materials',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96')],
    level: 1,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9c'),
    translations: {
      uk: {
        title: 'Фарби',
        description: 'Фарби',
      },
      en: {
        title: 'Paints',
        description: 'Paints',
      },
    },
    slug: 'materials-paints',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9b'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9d'),
    translations: {
      uk: {
        title: 'Лаки',
        description: 'Лаки',
      },
      en: {
        title: 'Varnish',
        description: 'Varnish',
      },
    },
    slug: 'materials-varnish',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9b'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9e'),
    translations: {
      uk: {
        title: 'Суміші',
        description: 'Суміші',
      },
      en: {
        title: 'Mixes',
        description: 'Mixes',
      },
    },
    slug: 'materials-mixes',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9b'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9f'),
    translations: {
      uk: {
        title: 'Герметики',
        description: 'Герметики',
      },
      en: {
        title: 'Sealants',
        description: 'Sealants',
      },
    },
    slug: 'materials-sealants',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9b'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d9b'),
    ],
    level: 2,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da0'),
    translations: {
      uk: {
        title: 'Сантехніка',
        description: 'Сантехніка',
      },
      en: {
        title: 'Plumbing',
        description: 'Plumbing',
      },
    },
    slug: 'plumbing',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96')],
    level: 1,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da1'),
    translations: {
      uk: {
        title: 'Труби',
        description: 'Труби',
      },
      en: {
        title: 'Pipes',
        description: 'Pipes',
      },
    },
    slug: 'plumbing-pipes',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da0'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da0'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da2'),
    translations: {
      uk: {
        title: 'Крани',
        description: 'Крани',
      },
      en: {
        title: 'Faucets',
        description: 'Faucets',
      },
    },
    slug: 'plumbing-faucets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da0'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da0'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da3'),
    translations: {
      uk: {
        title: 'Фітинги',
        description: 'Фітинги',
      },
      en: {
        title: 'Fittings',
        description: 'Fittings',
      },
    },
    slug: 'plumbing-fittings',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da0'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da0'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da4'),
    translations: {
      uk: {
        title: 'Електрика',
        description: 'Електрика',
      },
      en: {
        title: 'Electrical',
        description: 'Electrical',
      },
    },
    slug: 'electrical',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96')],
    level: 1,
    order: 4,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da5'),
    translations: {
      uk: {
        title: 'Розетки',
        description: 'Розетки',
      },
      en: {
        title: 'Sockets',
        description: 'Sockets',
      },
    },
    slug: 'electrical-sockets',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da4'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da4'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da6'),
    translations: {
      uk: {
        title: 'Вимикачі',
        description: 'Вимикачі',
      },
      en: {
        title: 'Switches',
        description: 'Switches',
      },
    },
    slug: 'electrical-switches',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da4'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da4'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da7'),
    translations: {
      uk: {
        title: 'Кабелі',
        description: 'Кабелі',
      },
      en: {
        title: 'Cables',
        description: 'Cables',
      },
    },
    slug: 'electrical-cables',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da4'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da4'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da8'),
    translations: {
      uk: {
        title: 'Покриття підлоги',
        description: 'Покриття підлоги',
      },
      en: {
        title: 'Flooring',
        description: 'Flooring',
      },
    },
    slug: 'flooring',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96')],
    level: 1,
    order: 5,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da9'),
    translations: {
      uk: {
        title: 'Плитка',
        description: 'Плитка',
      },
      en: {
        title: 'Tiles',
        description: 'Tiles',
      },
    },
    slug: 'flooring-tiles',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da8'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da8'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21daa'),
    translations: {
      uk: {
        title: 'Ламінат',
        description: 'Ламінат',
      },
      en: {
        title: 'Laminate',
        description: 'Laminate',
      },
    },
    slug: 'flooring-laminate',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da8'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da8'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21dab'),
    translations: {
      uk: {
        title: 'Паркет',
        description: 'Паркет',
      },
      en: {
        title: 'Parquet',
        description: 'Parquet',
      },
    },
    slug: 'flooring-parquet',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da8'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21da8'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21dac'),
    translations: {
      uk: {
        title: 'Двері та вікна',
        description: 'Двері та вікна',
      },
      en: {
        title: 'Doors Windows',
        description: 'Doors Windows',
      },
    },
    slug: 'doors-windows',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
    path: [new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96')],
    level: 1,
    order: 6,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21dad'),
    translations: {
      uk: {
        title: 'Двері',
        description: 'Двері',
      },
      en: {
        title: 'Doors',
        description: 'Doors',
      },
    },
    slug: 'doors-windows-doors',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21dac'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21dac'),
    ],
    level: 2,
    order: 1,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21dae'),
    translations: {
      uk: {
        title: 'Вікна',
        description: 'Вікна',
      },
      en: {
        title: 'Windows',
        description: 'Windows',
      },
    },
    slug: 'doors-windows-windows',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21dac'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21dac'),
    ],
    level: 2,
    order: 2,
    isActive: true,
    icon: null,
  },
  {
    _id: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21daf'),
    translations: {
      uk: {
        title: 'Фурнітура',
        description: 'Фурнітура',
      },
      en: {
        title: 'Hardware',
        description: 'Hardware',
      },
    },
    slug: 'doors-windows-hardware',
    parentId: new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21dac'),
    path: [
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21d96'),
      new mongoose.Types.ObjectId('697d9ad2b1c3aa4559e21dac'),
    ],
    level: 2,
    order: 3,
    isActive: true,
    icon: null,
  },
];
