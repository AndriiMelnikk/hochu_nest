import mongoose from 'mongoose';
import { CategorySchema } from '../database/schemas/category.schema';

type SeedCategory = {
  name: string;
  slug: string;
  order: number;
  children?: SeedCategory[];
};

const seedData = [
  {
    name: 'Дім та меблі',
    slug: 'home',
    order: 1,
    children: [
      {
        name: 'Меблі',
        slug: 'home-furniture',
        order: 1,
        children: [
          { name: 'Дивани', slug: 'home-furniture-sofas', order: 1 },
          { name: 'Ліжка', slug: 'home-furniture-beds', order: 2 },
          { name: 'Шафи', slug: 'home-furniture-wardrobes', order: 3 },
          { name: 'Столи', slug: 'home-furniture-tables', order: 4 },
          { name: 'Стільці', slug: 'home-furniture-chairs', order: 5 },
          { name: 'Комоди', slug: 'home-furniture-dressers', order: 6 },
          { name: 'Тумби', slug: 'home-furniture-nightstands', order: 7 },
          { name: 'Полиці', slug: 'home-furniture-shelves', order: 8 },
          { name: "М'які крісла", slug: 'home-furniture-armchairs', order: 9 },
          { name: 'Кухонні гарнітури', slug: 'home-furniture-kitchen-sets', order: 10 },
        ],
      },
      {
        name: 'Домашній декор',
        slug: 'home-decor',
        order: 2,
        children: [
          { name: 'Дзеркала', slug: 'home-decor-mirrors', order: 1 },
          { name: 'Картини та постери', slug: 'home-decor-art', order: 2 },
          { name: 'Настінні годинники', slug: 'home-decor-clocks', order: 3 },
          { name: 'Вази', slug: 'home-decor-vases', order: 4 },
          { name: 'Свічки та свічники', slug: 'home-decor-candles', order: 5 },
          { name: 'Килими', slug: 'home-decor-rugs', order: 6 },
        ],
      },
      {
        name: 'Домашній текстиль',
        slug: 'home-textile',
        order: 3,
        children: [
          { name: 'Постільна білизна', slug: 'home-textile-bedding', order: 1 },
          { name: 'Подушки', slug: 'home-textile-pillows', order: 2 },
          { name: 'Ковдри', slug: 'home-textile-blankets', order: 3 },
          { name: 'Штори та жалюзі', slug: 'home-textile-curtains', order: 4 },
          { name: 'Пледи', slug: 'home-textile-throws', order: 5 },
          { name: 'Рушники', slug: 'home-textile-towels', order: 6 },
        ],
      },
      {
        name: 'Зберігання та організація',
        slug: 'home-storage',
        order: 4,
        children: [
          { name: 'Контейнери', slug: 'home-storage-containers', order: 1 },
          { name: 'Кошики', slug: 'home-storage-baskets', order: 2 },
          { name: 'Органайзери', slug: 'home-storage-organizers', order: 3 },
          { name: 'Вішалки', slug: 'home-storage-hangers', order: 4 },
        ],
      },
      {
        name: 'Кухня та сервірування',
        slug: 'kitchenware',
        order: 5,
        children: [
          { name: 'Посуд', slug: 'kitchenware-dishes', order: 1 },
          { name: 'Ножі', slug: 'kitchenware-knives', order: 2 },
          { name: 'Сковорідки', slug: 'kitchenware-pans', order: 3 },
          { name: 'Каструлі', slug: 'kitchenware-pots', order: 4 },
          { name: 'Набори посуду', slug: 'kitchenware-sets', order: 5 },
          { name: 'Столові прибори', slug: 'kitchenware-cutlery', order: 6 },
        ],
      },
      {
        name: 'Санвузол',
        slug: 'bathroom',
        order: 6,
        children: [
          { name: 'Змішувачі', slug: 'bathroom-faucets', order: 1 },
          { name: 'Душові системи', slug: 'bathroom-showers', order: 2 },
          { name: 'Раковини', slug: 'bathroom-sinks', order: 3 },
          { name: 'Унітази', slug: 'bathroom-toilets', order: 4 },
          { name: 'Аксесуари', slug: 'bathroom-accessories', order: 5 },
        ],
      },
      {
        name: 'Освітлення',
        slug: 'lighting',
        order: 7,
        children: [
          { name: 'Люстри', slug: 'lighting-chandeliers', order: 1 },
          { name: 'Бра', slug: 'lighting-wall', order: 2 },
          { name: 'Настільні лампи', slug: 'lighting-table', order: 3 },
          { name: 'Торшери', slug: 'lighting-floor', order: 4 },
          { name: 'Світлодіодні стрічки', slug: 'lighting-led-strips', order: 5 },
        ],
      },
      {
        name: 'Домашня безпека',
        slug: 'home-security',
        order: 8,
        children: [
          { name: 'Замки', slug: 'home-security-locks', order: 1 },
          { name: 'Домофони', slug: 'home-security-intercoms', order: 2 },
          { name: 'Сигналізації', slug: 'home-security-alarms', order: 3 },
          { name: 'Датчики диму', slug: 'home-security-smoke-sensors', order: 4 },
        ],
      },
    ],
  },
  {
    name: "Сад та подвір'я",
    slug: 'garden',
    order: 2,
    children: [
      {
        name: 'Садові меблі',
        slug: 'garden-furniture',
        order: 1,
        children: [
          { name: 'Столи', slug: 'garden-furniture-tables', order: 1 },
          { name: 'Стільці', slug: 'garden-furniture-chairs', order: 2 },
          { name: 'Шезлонги', slug: 'garden-furniture-sunloungers', order: 3 },
          { name: 'Гойдалки', slug: 'garden-furniture-swings', order: 4 },
        ],
      },
      {
        name: 'Садові інструменти',
        slug: 'garden-tools',
        order: 2,
        children: [
          { name: 'Лопати', slug: 'garden-tools-shovels', order: 1 },
          { name: 'Граблі', slug: 'garden-tools-rakes', order: 2 },
          { name: 'Секатори', slug: 'garden-tools-pruners', order: 3 },
          { name: 'Поливальні системи', slug: 'garden-tools-watering', order: 4 },
        ],
      },
      {
        name: 'Рослини та насіння',
        slug: 'plants-seeds',
        order: 3,
        children: [
          { name: 'Насіння овочів', slug: 'plants-seeds-vegetables', order: 1 },
          { name: 'Насіння квітів', slug: 'plants-seeds-flowers', order: 2 },
          { name: 'Саджанці', slug: 'plants-seeds-seedlings', order: 3 },
          { name: 'Ґрунти та добрива', slug: 'plants-seeds-soil', order: 4 },
        ],
      },
      {
        name: 'Барбекю та відпочинок',
        slug: 'bbq-outdoor',
        order: 4,
        children: [
          { name: 'Грилі', slug: 'bbq-outdoor-grills', order: 1 },
          { name: 'Мангали', slug: 'bbq-outdoor-braziers', order: 2 },
          { name: 'Вугілля та розпал', slug: 'bbq-outdoor-charcoal', order: 3 },
          { name: 'Пікнікові набори', slug: 'bbq-outdoor-picnic-sets', order: 4 },
        ],
      },
      {
        name: 'Басейни та аксесуари',
        slug: 'pools',
        order: 5,
        children: [
          { name: 'Каркасні басейни', slug: 'pools-frame', order: 1 },
          { name: 'Насоси та фільтри', slug: 'pools-pumps', order: 2 },
          { name: 'Надувні матраци', slug: 'pools-inflatables', order: 3 },
        ],
      },
      {
        name: 'Догляд за двором',
        slug: 'yard-care',
        order: 6,
        children: [
          { name: 'Газонокосарки', slug: 'yard-care-mowers', order: 1 },
          { name: 'Тримери', slug: 'yard-care-trimmers', order: 2 },
          { name: 'Снігоприбирачі', slug: 'yard-care-snowblowers', order: 3 },
        ],
      },
    ],
  },
  {
    name: 'Техніка для дому',
    slug: 'home-appliances',
    order: 3,
    children: [
      {
        name: 'Крупна техніка',
        slug: 'large-appliances',
        order: 1,
        children: [
          { name: 'Холодильники', slug: 'large-appliances-fridges', order: 1 },
          { name: 'Пральні машини', slug: 'large-appliances-washers', order: 2 },
          { name: 'Посудомийні', slug: 'large-appliances-dishwashers', order: 3 },
          { name: 'Плити та духовки', slug: 'large-appliances-ovens', order: 4 },
          { name: 'Витяжки', slug: 'large-appliances-hoods', order: 5 },
        ],
      },
      {
        name: 'Дрібна кухонна техніка',
        slug: 'small-kitchen-appliances',
        order: 2,
        children: [
          { name: 'Блендери', slug: 'small-kitchen-appliances-blenders', order: 1 },
          { name: 'Міксери', slug: 'small-kitchen-appliances-mixers', order: 2 },
          { name: 'Кавоварки', slug: 'small-kitchen-appliances-coffee', order: 3 },
          { name: 'Мікрохвильові', slug: 'small-kitchen-appliances-microwaves', order: 4 },
          { name: 'Тостери', slug: 'small-kitchen-appliances-toasters', order: 5 },
        ],
      },
      {
        name: 'Кліматична техніка',
        slug: 'climate-appliances',
        order: 3,
        children: [
          { name: 'Кондиціонери', slug: 'climate-appliances-ac', order: 1 },
          { name: 'Обігрівачі', slug: 'climate-appliances-heaters', order: 2 },
          { name: 'Зволожувачі', slug: 'climate-appliances-humidifiers', order: 3 },
          { name: 'Очищувачі повітря', slug: 'climate-appliances-purifiers', order: 4 },
        ],
      },
      {
        name: 'Догляд за домом',
        slug: 'cleaning-appliances',
        order: 4,
        children: [
          { name: 'Пилососи', slug: 'cleaning-appliances-vacuums', order: 1 },
          { name: 'Пароочисники', slug: 'cleaning-appliances-steam', order: 2 },
          { name: 'Праски', slug: 'cleaning-appliances-irons', order: 3 },
          { name: 'Швейні машини', slug: 'cleaning-appliances-sewing', order: 4 },
        ],
      },
      {
        name: 'Вбудована техніка',
        slug: 'built-in-appliances',
        order: 5,
        children: [
          { name: 'Варильні поверхні', slug: 'built-in-appliances-hobs', order: 1 },
          { name: 'Духові шафи', slug: 'built-in-appliances-ovens', order: 2 },
          { name: 'Вбудовані холодильники', slug: 'built-in-appliances-fridges', order: 3 },
        ],
      },
    ],
  },
  {
    name: 'Електроніка та гаджети',
    slug: 'electronics',
    order: 4,
    children: [
      {
        name: 'Смартфони та аксесуари',
        slug: 'smartphones',
        order: 1,
        children: [
          { name: 'Смартфони', slug: 'smartphones-phones', order: 1 },
          { name: 'Чохли', slug: 'smartphones-cases', order: 2 },
          { name: 'Захисне скло', slug: 'smartphones-glass', order: 3 },
          { name: 'Зарядні пристрої', slug: 'smartphones-chargers', order: 4 },
        ],
      },
      {
        name: "Комп'ютери",
        slug: 'computers',
        order: 2,
        children: [
          { name: 'Ноутбуки', slug: 'computers-laptops', order: 1 },
          { name: 'ПК', slug: 'computers-desktops', order: 2 },
          { name: 'Монітори', slug: 'computers-monitors', order: 3 },
          { name: 'Клавіатури та миші', slug: 'computers-peripherals', order: 4 },
        ],
      },
      {
        name: 'ТВ та аудіо',
        slug: 'tv-audio',
        order: 3,
        children: [
          { name: 'Телевізори', slug: 'tv-audio-tvs', order: 1 },
          { name: 'Саундбари', slug: 'tv-audio-soundbars', order: 2 },
          { name: 'Навушники', slug: 'tv-audio-headphones', order: 3 },
          { name: 'Колонки', slug: 'tv-audio-speakers', order: 4 },
        ],
      },
      {
        name: 'Фото та відео',
        slug: 'photo-video',
        order: 4,
        children: [
          { name: 'Камери', slug: 'photo-video-cameras', order: 1 },
          { name: "Об'єктиви", slug: 'photo-video-lenses', order: 2 },
          { name: 'Штативи', slug: 'photo-video-tripods', order: 3 },
        ],
      },
      {
        name: 'Розумний дім',
        slug: 'smart-home',
        order: 5,
        children: [
          { name: 'Камери спостереження', slug: 'smart-home-cameras', order: 1 },
          { name: 'Розумні лампи', slug: 'smart-home-lights', order: 2 },
          { name: 'Розетки', slug: 'smart-home-plugs', order: 3 },
          { name: 'Хаби', slug: 'smart-home-hubs', order: 4 },
        ],
      },
      {
        name: 'Ігрові консолі',
        slug: 'gaming',
        order: 6,
        children: [
          { name: 'Консолі', slug: 'gaming-consoles', order: 1 },
          { name: 'Геймпади', slug: 'gaming-controllers', order: 2 },
          { name: 'Диски та картриджі', slug: 'gaming-games', order: 3 },
        ],
      },
    ],
  },
  {
    name: 'Одяг та взуття',
    slug: 'apparel',
    order: 5,
    children: [
      {
        name: 'Жіночий одяг',
        slug: 'women-clothing',
        order: 1,
        children: [
          { name: 'Сукні', slug: 'women-clothing-dresses', order: 1 },
          { name: 'Блузи', slug: 'women-clothing-blouses', order: 2 },
          { name: 'Джинси', slug: 'women-clothing-jeans', order: 3 },
          { name: 'Верхній одяг', slug: 'women-clothing-outerwear', order: 4 },
        ],
      },
      {
        name: 'Чоловічий одяг',
        slug: 'men-clothing',
        order: 2,
        children: [
          { name: 'Футболки', slug: 'men-clothing-tshirts', order: 1 },
          { name: 'Сорочки', slug: 'men-clothing-shirts', order: 2 },
          { name: 'Джинси', slug: 'men-clothing-jeans', order: 3 },
          { name: 'Верхній одяг', slug: 'men-clothing-outerwear', order: 4 },
        ],
      },
      {
        name: 'Взуття',
        slug: 'shoes',
        order: 3,
        children: [
          { name: 'Жіноче взуття', slug: 'shoes-women', order: 1 },
          { name: 'Чоловіче взуття', slug: 'shoes-men', order: 2 },
          { name: 'Дитяче взуття', slug: 'shoes-kids', order: 3 },
          { name: 'Спортивне взуття', slug: 'shoes-sport', order: 4 },
        ],
      },
      {
        name: 'Аксесуари',
        slug: 'apparel-accessories',
        order: 4,
        children: [
          { name: 'Сумки', slug: 'apparel-accessories-bags', order: 1 },
          { name: 'Ремені', slug: 'apparel-accessories-belts', order: 2 },
          { name: 'Гаманці', slug: 'apparel-accessories-wallets', order: 3 },
          { name: 'Головні убори', slug: 'apparel-accessories-hats', order: 4 },
        ],
      },
      {
        name: 'Білизна та шкарпетки',
        slug: 'underwear-socks',
        order: 5,
        children: [
          { name: 'Жіноча білизна', slug: 'underwear-women', order: 1 },
          { name: 'Чоловіча білизна', slug: 'underwear-men', order: 2 },
          { name: 'Шкарпетки', slug: 'underwear-socks-items', order: 3 },
          { name: 'Піжами', slug: 'underwear-pajamas', order: 4 },
        ],
      },
    ],
  },
  {
    name: 'Дитячі товари',
    slug: 'kids',
    order: 6,
    children: [
      {
        name: 'Одяг для дітей',
        slug: 'kids-clothing',
        order: 1,
        children: [
          { name: 'Для немовлят', slug: 'kids-clothing-babies', order: 1 },
          { name: 'Для дівчаток', slug: 'kids-clothing-girls', order: 2 },
          { name: 'Для хлопчиків', slug: 'kids-clothing-boys', order: 3 },
        ],
      },
      {
        name: 'Іграшки',
        slug: 'toys',
        order: 2,
        children: [
          { name: 'Конструктори', slug: 'toys-building', order: 1 },
          { name: 'Ляльки', slug: 'toys-dolls', order: 2 },
          { name: 'Машинки', slug: 'toys-cars', order: 3 },
          { name: 'Настільні ігри', slug: 'toys-boardgames', order: 4 },
        ],
      },
      {
        name: 'Дитяча кімната',
        slug: 'kids-room',
        order: 3,
        children: [
          { name: 'Ліжечка', slug: 'kids-room-cribs', order: 1 },
          { name: 'Матраци', slug: 'kids-room-mattresses', order: 2 },
          { name: 'Комоди', slug: 'kids-room-dressers', order: 3 },
          { name: 'Освітлення', slug: 'kids-room-lighting', order: 4 },
        ],
      },
      {
        name: 'Прогулянки та подорожі',
        slug: 'strollers-travel',
        order: 4,
        children: [
          { name: 'Коляски', slug: 'strollers-travel-strollers', order: 1 },
          { name: 'Автокрісла', slug: 'strollers-travel-car-seats', order: 2 },
          { name: 'Слінги', slug: 'strollers-travel-slings', order: 3 },
        ],
      },
      {
        name: 'Гігієна та догляд',
        slug: 'baby-care',
        order: 5,
        children: [
          { name: 'Підгузки', slug: 'baby-care-diapers', order: 1 },
          { name: 'Купання', slug: 'baby-care-bathing', order: 2 },
          { name: 'Годування', slug: 'baby-care-feeding', order: 3 },
        ],
      },
    ],
  },
  {
    name: 'Спорт та відпочинок',
    slug: 'sports',
    order: 7,
    children: [
      {
        name: 'Фітнес',
        slug: 'fitness',
        order: 1,
        children: [
          { name: 'Гантелі', slug: 'fitness-dumbbells', order: 1 },
          { name: 'Килимки', slug: 'fitness-mats', order: 2 },
          { name: 'Тренажери', slug: 'fitness-machines', order: 3 },
          { name: 'Еспандери', slug: 'fitness-resistance', order: 4 },
        ],
      },
      {
        name: 'Велосипеди',
        slug: 'bicycles',
        order: 2,
        children: [
          { name: 'Гірські', slug: 'bicycles-mountain', order: 1 },
          { name: 'Міські', slug: 'bicycles-city', order: 2 },
          { name: 'Аксесуари', slug: 'bicycles-accessories', order: 3 },
        ],
      },
      {
        name: 'Туризм і кемпінг',
        slug: 'camping',
        order: 3,
        children: [
          { name: 'Намети', slug: 'camping-tents', order: 1 },
          { name: 'Спальники', slug: 'camping-sleeping-bags', order: 2 },
          { name: 'Рюкзаки', slug: 'camping-backpacks', order: 3 },
          { name: 'Пальники', slug: 'camping-burners', order: 4 },
        ],
      },
      {
        name: 'Водні види спорту',
        slug: 'water-sports',
        order: 4,
        children: [
          { name: 'SUP дошки', slug: 'water-sports-sup', order: 1 },
          { name: 'Маски та ласти', slug: 'water-sports-snorkeling', order: 2 },
          { name: 'Рятувальні жилети', slug: 'water-sports-life-jackets', order: 3 },
        ],
      },
      {
        name: 'Зимові види спорту',
        slug: 'winter-sports',
        order: 5,
        children: [
          { name: 'Лижі', slug: 'winter-sports-skis', order: 1 },
          { name: 'Сноуборди', slug: 'winter-sports-snowboards', order: 2 },
          { name: 'Ковзани', slug: 'winter-sports-skates', order: 3 },
        ],
      },
    ],
  },
  {
    name: 'Авто та мото',
    slug: 'auto-moto',
    order: 8,
    children: [
      {
        name: 'Автозапчастини',
        slug: 'auto-parts',
        order: 1,
        children: [
          { name: 'Фільтри', slug: 'auto-parts-filters', order: 1 },
          { name: 'Гальма', slug: 'auto-parts-brakes', order: 2 },
          { name: 'Амортизатори', slug: 'auto-parts-shocks', order: 3 },
          { name: 'Акумулятори', slug: 'auto-parts-batteries', order: 4 },
        ],
      },
      {
        name: 'Аксесуари',
        slug: 'auto-accessories',
        order: 2,
        children: [
          { name: 'Відеореєстратори', slug: 'auto-accessories-dashcams', order: 1 },
          { name: 'Килимки', slug: 'auto-accessories-mats', order: 2 },
          { name: 'Чохли', slug: 'auto-accessories-covers', order: 3 },
          { name: 'Органайзери', slug: 'auto-accessories-organizers', order: 4 },
        ],
      },
      {
        name: 'Шини та диски',
        slug: 'tires-wheels',
        order: 3,
        children: [
          { name: 'Літні шини', slug: 'tires-wheels-summer', order: 1 },
          { name: 'Зимові шини', slug: 'tires-wheels-winter', order: 2 },
          { name: 'Диски', slug: 'tires-wheels-rims', order: 3 },
        ],
      },
      {
        name: 'Мото',
        slug: 'moto',
        order: 4,
        children: [
          { name: 'Шоломи', slug: 'moto-helmets', order: 1 },
          { name: 'Екіпіровка', slug: 'moto-gear', order: 2 },
          { name: 'Запчастини', slug: 'moto-parts', order: 3 },
        ],
      },
      {
        name: 'Інструменти для авто',
        slug: 'auto-tools',
        order: 5,
        children: [
          { name: 'Домкрати', slug: 'auto-tools-jacks', order: 1 },
          { name: 'Компресори', slug: 'auto-tools-compressors', order: 2 },
          { name: 'Набори ключів', slug: 'auto-tools-wrenches', order: 3 },
        ],
      },
    ],
  },
  {
    name: "Краса та здоров'я",
    slug: 'beauty-health',
    order: 9,
    children: [
      {
        name: 'Догляд за волоссям',
        slug: 'hair-care',
        order: 1,
        children: [
          { name: 'Фени', slug: 'hair-care-dryers', order: 1 },
          { name: 'Плойки та випрямлячі', slug: 'hair-care-stylers', order: 2 },
          { name: 'Щітки', slug: 'hair-care-brushes', order: 3 },
          { name: 'Шампуні', slug: 'hair-care-shampoos', order: 4 },
        ],
      },
      {
        name: 'Догляд за шкірою',
        slug: 'skin-care',
        order: 2,
        children: [
          { name: 'Креми', slug: 'skin-care-creams', order: 1 },
          { name: 'Сироватки', slug: 'skin-care-serums', order: 2 },
          { name: 'Маски', slug: 'skin-care-masks', order: 3 },
        ],
      },
      {
        name: 'Макіяж',
        slug: 'makeup',
        order: 3,
        children: [
          { name: 'Помади', slug: 'makeup-lipsticks', order: 1 },
          { name: 'Тіні', slug: 'makeup-eyeshadow', order: 2 },
          { name: 'Тональні засоби', slug: 'makeup-foundation', order: 3 },
        ],
      },
      {
        name: 'Парфуми',
        slug: 'perfumes',
        order: 4,
        children: [
          { name: 'Жіночі', slug: 'perfumes-women', order: 1 },
          { name: 'Чоловічі', slug: 'perfumes-men', order: 2 },
          { name: 'Унісекс', slug: 'perfumes-unisex', order: 3 },
        ],
      },
      {
        name: 'Медтехніка',
        slug: 'medical-devices',
        order: 5,
        children: [
          { name: 'Тонометри', slug: 'medical-devices-pressure', order: 1 },
          { name: 'Глюкометри', slug: 'medical-devices-glucose', order: 2 },
          { name: 'Інгалятори', slug: 'medical-devices-inhalers', order: 3 },
        ],
      },
    ],
  },
  {
    name: 'Офіс та канцелярія',
    slug: 'office',
    order: 10,
    children: [
      {
        name: 'Канцелярія',
        slug: 'stationery',
        order: 1,
        children: [
          { name: 'Ручки', slug: 'stationery-pens', order: 1 },
          { name: 'Зошити', slug: 'stationery-notebooks', order: 2 },
          { name: 'Папір', slug: 'stationery-paper', order: 3 },
          { name: 'Папки', slug: 'stationery-folders', order: 4 },
        ],
      },
      {
        name: 'Організація робочого місця',
        slug: 'desk-organization',
        order: 2,
        children: [
          { name: 'Органайзери', slug: 'desk-organization-organizers', order: 1 },
          { name: 'Лотки', slug: 'desk-organization-trays', order: 2 },
          { name: 'Підставки', slug: 'desk-organization-stands', order: 3 },
        ],
      },
      {
        name: 'Офісні меблі',
        slug: 'office-furniture',
        order: 3,
        children: [
          { name: 'Офісні стільці', slug: 'office-furniture-chairs', order: 1 },
          { name: 'Офісні столи', slug: 'office-furniture-desks', order: 2 },
          { name: 'Шафи', slug: 'office-furniture-cabinets', order: 3 },
        ],
      },
      {
        name: 'Техніка для офісу',
        slug: 'office-equipment',
        order: 4,
        children: [
          { name: 'Принтери', slug: 'office-equipment-printers', order: 1 },
          { name: 'Сканери', slug: 'office-equipment-scanners', order: 2 },
          { name: 'Ламінатори', slug: 'office-equipment-laminators', order: 3 },
        ],
      },
    ],
  },
  {
    name: 'Товари для тварин',
    slug: 'pets',
    order: 11,
    children: [
      {
        name: 'Для собак',
        slug: 'dogs',
        order: 1,
        children: [
          { name: 'Корм', slug: 'dogs-food', order: 1 },
          { name: 'Ліжка', slug: 'dogs-beds', order: 2 },
          { name: 'Іграшки', slug: 'dogs-toys', order: 3 },
          { name: 'Повідці', slug: 'dogs-leashes', order: 4 },
        ],
      },
      {
        name: 'Для котів',
        slug: 'cats',
        order: 2,
        children: [
          { name: 'Корм', slug: 'cats-food', order: 1 },
          { name: 'Лотки', slug: 'cats-litter', order: 2 },
          { name: 'Кігтеточки', slug: 'cats-scratchers', order: 3 },
          { name: 'Іграшки', slug: 'cats-toys', order: 4 },
        ],
      },
      {
        name: 'Для птахів',
        slug: 'birds',
        order: 3,
        children: [
          { name: 'Клітки', slug: 'birds-cages', order: 1 },
          { name: 'Корм', slug: 'birds-food', order: 2 },
        ],
      },
      {
        name: 'Для акваріумів',
        slug: 'aquariums',
        order: 4,
        children: [
          { name: 'Акваріуми', slug: 'aquariums-tanks', order: 1 },
          { name: 'Фільтри', slug: 'aquariums-filters', order: 2 },
          { name: 'Декор', slug: 'aquariums-decor', order: 3 },
        ],
      },
      {
        name: 'Ветеринарні товари',
        slug: 'pet-health',
        order: 5,
        children: [
          { name: 'Вітаміни', slug: 'pet-health-vitamins', order: 1 },
          { name: 'Засоби догляду', slug: 'pet-health-care', order: 2 },
        ],
      },
    ],
  },
  {
    name: 'Будівництво та ремонт',
    slug: 'construction',
    order: 12,
    children: [
      {
        name: 'Інструменти',
        slug: 'tools',
        order: 1,
        children: [
          { name: 'Електроінструменти', slug: 'tools-power', order: 1 },
          { name: 'Ручні інструменти', slug: 'tools-hand', order: 2 },
          { name: 'Оснастка', slug: 'tools-accessories', order: 3 },
        ],
      },
      {
        name: 'Будівельні матеріали',
        slug: 'materials',
        order: 2,
        children: [
          { name: 'Фарби', slug: 'materials-paints', order: 1 },
          { name: 'Лаки', slug: 'materials-varnish', order: 2 },
          { name: 'Суміші', slug: 'materials-mixes', order: 3 },
          { name: 'Герметики', slug: 'materials-sealants', order: 4 },
        ],
      },
      {
        name: 'Сантехніка',
        slug: 'plumbing',
        order: 3,
        children: [
          { name: 'Труби', slug: 'plumbing-pipes', order: 1 },
          { name: 'Крани', slug: 'plumbing-faucets', order: 2 },
          { name: 'Фітинги', slug: 'plumbing-fittings', order: 3 },
        ],
      },
      {
        name: 'Електрика',
        slug: 'electrical',
        order: 4,
        children: [
          { name: 'Розетки', slug: 'electrical-sockets', order: 1 },
          { name: 'Вимикачі', slug: 'electrical-switches', order: 2 },
          { name: 'Кабелі', slug: 'electrical-cables', order: 3 },
        ],
      },
      {
        name: 'Покриття підлоги',
        slug: 'flooring',
        order: 5,
        children: [
          { name: 'Плитка', slug: 'flooring-tiles', order: 1 },
          { name: 'Ламінат', slug: 'flooring-laminate', order: 2 },
          { name: 'Паркет', slug: 'flooring-parquet', order: 3 },
        ],
      },
      {
        name: 'Двері та вікна',
        slug: 'doors-windows',
        order: 6,
        children: [
          { name: 'Двері', slug: 'doors-windows-doors', order: 1 },
          { name: 'Вікна', slug: 'doors-windows-windows', order: 2 },
          { name: 'Фурнітура', slug: 'doors-windows-hardware', order: 3 },
        ],
      },
    ],
  },
] as SeedCategory[];

type CategoryDoc = mongoose.Document & {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  parentId: mongoose.Types.ObjectId | null;
  path: mongoose.Types.ObjectId[];
  level: number;
  order: number;
  isActive: boolean;
};

const CategorySchemaTyped = CategorySchema as unknown as mongoose.Schema;
const CategoryModel = mongoose.model<CategoryDoc>('Category', CategorySchemaTyped);
type CategoryModelWithFindOneAndUpdate = {
  findOneAndUpdate: (
    filter: { slug: string },
    update: Partial<CategoryDoc>,
    options: mongoose.QueryOptions,
  ) => { exec: () => Promise<CategoryDoc | null> };
};

async function upsertCategory(input: {
  name: string;
  slug: string;
  order: number;
  parentId: mongoose.Types.ObjectId | null;
  path: mongoose.Types.ObjectId[];
  level: number;
}): Promise<CategoryDoc> {
  const { name, slug, order, parentId, path, level } = input;
  const doc = await (CategoryModel as unknown as CategoryModelWithFindOneAndUpdate)
    .findOneAndUpdate(
      { slug },
      {
        name,
        slug,
        order,
        parentId,
        path,
        level,
        isActive: true,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
    .exec();
  if (!doc) {
    throw new Error(`Failed to upsert category: ${slug}`);
  }
  return doc;
}

async function seedCategoryTree(
  category: SeedCategory,
  parent: CategoryDoc | null,
  path: mongoose.Types.ObjectId[],
): Promise<void> {
  const doc = await upsertCategory({
    name: category.name,
    slug: category.slug,
    order: category.order,
    parentId: parent ? parent._id : null,
    path,
    level: path.length,
  });

  const children = category.children ?? [];
  if (!children.length) {
    return;
  }

  const nextPath = [...path, doc._id];
  for (const child of children) {
    await seedCategoryTree(child, doc, nextPath);
  }
}

async function seedCategories() {
  const uri =
    process.env.MONGODB_URI ||
    'mongodb+srv://amelnik464_db_user:ATy5zwCAF7p2oAxh@cluster0.frq9fb5.mongodb.net/?appName=Cluster0';

  await mongoose.connect(uri);

  for (const root of seedData) {
    await seedCategoryTree(root, null, []);
  }

  await mongoose.disconnect();
}

seedCategories()
  .then(() => {
    console.log('Categories seeded successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Category seed failed:', error);
    process.exit(1);
  });
