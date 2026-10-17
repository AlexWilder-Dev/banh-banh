// Everything factual on the site lives here: menu, hours, addresses, contact and links.
// Sources: banhbanh.com (menu pages, footer, group dining, Little Bánh Bánh, At Home),
// Google Maps, and the press listed in `press`.

export type Session = [open: string, close: string]
/** Indexed by JS day: 0 = Sunday … 6 = Saturday */
export type WeekHours = [Session[], Session[], Session[], Session[], Session[], Session[], Session[]]

export type Mark = 'vg' | 'vgo' | 'gf' | 'p' | 'n'

export interface DishOption {
  label: string
  marks: Mark[]
}

export interface Dish {
  id: string
  vi: string
  en: string
  price: number
  perPerson?: boolean
  marks: Mark[]
  options?: DishOption[]
  limited?: boolean
}

export interface MenuSection {
  id: string
  vi: string
  en?: string
  intro?: string[]
  dishes: Dish[]
}

export const brixton = {
  name: 'Bánh Bánh',
  area: 'Brixton',
  street: '326 Coldharbour Lane',
  town: 'London',
  postcode: 'SW9 8QH',
  phone: '+44 7783 738010',
  phoneHref: 'tel:+447783738010',
  email: 'info@banhbanh.com',
  instagram: 'banhbanh.london',
  instagramUrl: 'https://www.instagram.com/banhbanh.london',
  lat: 51.463008,
  lng: -0.108426,
  stations: ['Brixton (Victoria line and rail)', 'Loughborough Junction (Thameslink)'],
  bookingUrl: 'https://tables.toasttab.com/restaurants/6626273c-5e71-4a0e-b43b-c7338f9c2877/findTime',
  deliverooUrl: 'https://deliveroo.co.uk/menu/london/brixton/banh-banh-coldharbour',
  // Hours as printed on banhbanh.com's home page
  hours: [
    [['12:00', '15:00'], ['18:00', '21:00']], // Sun
    [['18:00', '21:30']], // Mon
    [], // Tue
    [['18:00', '21:30']], // Wed
    [['18:00', '21:30']], // Thu
    [['18:00', '22:00']], // Fri
    [['12:00', '15:00'], ['18:00', '22:00']], // Sat
  ] as WeekHours,
  maxTableSize: 10,
  // From their Toast Tables profile: tables are bookable every 15 minutes, last booking an hour before close
  booking: {
    slotMinutes: 15,
    lastBookingBeforeClose: 60,
    daysAhead: 30,
    policy: [
      'Please contact us if you’re running late, your table will be held for 15 minutes before being offered to another party.',
      'Standard dining allotment is 90 minutes for tables up to 3. Tables of 4+ are allocated 120 minutes.',
    ],
  },
}

export const little = {
  name: 'Little Bánh Bánh',
  street: '170 Fleet Street',
  town: 'London',
  postcode: 'EC4A 2EA',
  lat: 51.514299,
  lng: -0.108752,
  stations: ['Chancery Lane (Central line)', 'Temple (Circle and District)', 'City Thameslink'],
  hours: [
    [], // Sun
    [['11:00', '15:00']],
    [['11:00', '15:00']],
    [['11:00', '15:00']],
    [['11:00', '15:00']],
    [['11:00', '15:00']],
    [], // Sat
  ] as WeekHours,
  blurb:
    'In the heart of Fleet Street, Little Bánh Bánh brings the same spirit as our South London kitchen. Vietnamese food made fresh each day, served fast and with care, built for the weekday rhythm of the city.',
  catering: 'Bespoke catering packages for events across the city.',
  deliverooUrl: 'https://deliveroo.co.uk/menu/london/holborn/little-banh-banh-vietnamese-deli',
}

export interface LittleItem {
  en: string
  vi: string
  price: number
  options?: string
}

export interface LittleSection {
  en: string
  vi?: string
  intro: string
  items: LittleItem[]
}

// Transcribed from the Little Bánh Bánh menu linked on banhbanh.com/little-banh-banh. Prices in £.
export const littleMenu: LittleSection[] = [
  {
    en: 'Bánh Mì',
    intro: 'Freshly baked baguette with cucumber, pickled carrot & daikon, fresh coriander, sliced chilli, and spring onion',
    items: [
      { en: 'Classic Cold Cut', vi: 'Bánh mì thịt nguội', price: 11 },
      { en: 'Braised Ginger Chicken', vi: 'Bánh mì gà kho gừng', price: 11 },
      { en: 'Crispy Pork Belly', vi: 'Bánh mì heo quay', price: 11 },
      { en: 'Braised Aubergine & Tofu', vi: 'Bánh mì cà tím đậu phụ', price: 11 },
      { en: 'Beef Stew with Banh Mi Slices', vi: 'Bò kho với bánh mì', price: 12 },
    ],
  },
  {
    en: 'Rice Box',
    intro: 'Classic workers lunch. Fluffy jasmine rice topped with your choice of protein & fresh vegetables',
    items: [
      { en: 'Crispy Pork Belly', vi: 'Cơm heo quay', price: 12.5 },
      { en: 'Pork Char Siu', vi: 'Cơm thịt xá xíu', price: 12.5 },
      { en: 'Braised Ginger Chicken', vi: 'Cơm gà kho gừng', price: 12.5 },
      { en: 'Vietnamese Beef Stew', vi: 'Cơm bò kho', price: 13.5 },
      { en: 'Braised Aubergine & Tofu', vi: 'Cơm cà tím đậu phụ', price: 12.5 },
    ],
  },
  {
    en: 'Bún Noodle Salad',
    intro: 'Chilled rice noodles with fresh herbs, pickled vegetables, and a tangy dressing',
    items: [
      { en: 'Lemongrass Pork', vi: 'Bún thịt nướng', price: 12.5 },
      { en: 'Corn-fed Chicken', vi: 'Bún trộn gà', price: 12.5 },
      { en: 'Tofu & Mushroom', vi: 'Bún đậu hũ & nấm', price: 12 },
    ],
  },
  {
    en: 'Phở',
    intro: 'Classic fragrant Vietnamese noodle soup served with fresh herbs, bean sprouts, and lime.',
    items: [
      { en: 'Classic', options: 'Chicken / Beef / Stewed beef +1.5', vi: 'Phở gà, Phở bò, Phở bò kho', price: 12.5 },
      { en: 'Vegan', vi: 'Phở chay', price: 11 },
    ],
  },
  {
    en: 'Rolls & Sides',
    intro: 'Light rolls and pickled cucumber, perfect alongside rice or noodles',
    items: [
      { en: 'Fresh Summer Rolls', options: 'Prawn / Tofu', vi: 'Gỏi cuốn', price: 7 },
      { en: 'Crispy Spring Rolls', options: 'Pork & prawn / Tofu', vi: 'Chả giò', price: 7.5 },
      { en: 'Pickled Cucumber', vi: 'Dưa chuột muối', price: 3.5 },
    ],
  },
  {
    en: 'Drinks',
    intro: 'Refreshing Vietnamese favourites, rich iced coffees, sodas and tropical smoothies',
    items: [
      { en: 'Vietnamese Coffee', options: 'Classic with condensed milk / Salted cream', vi: 'Cà phê Việt Nam. Vị sữa cổ điển, hoặc muối', price: 4.5 },
      { en: 'Home-made Softs', options: 'Lime soda / Pineapple coconut water', vi: 'Giải khát nhà làm. Vị chanh hoặc dừa dứa', price: 4.5 },
      { en: 'Smoothies', options: 'Mango / Avocado', vi: 'Sinh tố. Vị xoài hoặc bơ', price: 5 },
    ],
  },
]

export const atHome = {
  intro: 'Enjoy a taste of Bánh Bánh at home.',
  line: 'Familiar classics, from our home to yours.',
  platform: 'Deliveroo',
  url: brixton.deliverooUrl,
}

export const voice = {
  tagline: 'Celebrating Vietnamese home style cooking in South London. Authentic family sharing dishes.',
  comNha: 'Built on over 10 years of cooking, guided by Cơm Nhà: family style home cooking, made for sharing.',
  amulet:
    'A culinary amulet, a ritual of comfort and joy. Each visit offering a sense of home, a familiar warmth, and a little piece of belonging to carry with you again and again.',
  groups: 'Semi private spaces for you and friends. Suitable for groups up to 10.',
  groupsBig: 'Got a group bigger than 10? Get in touch for full or semi private hire.',
  allergies: 'If you have any allergies, please speak to your server.',
  christmas: 'An intimate Christmas party space for up to 10, built around sharing plates.',
}

export interface PressLine {
  quote: string
  source: string
  date: string
  url: string
}

// Verbatim, from 2026 coverage of the relaunch
export const press = {
  nudgeInstallation: {
    quote: 'Bánh Bánh feels more like an art installation than your average neighbourhood Vietnamese.',
    source: 'The Nudge',
    date: 'August 2026',
    url: 'https://thenudge.com/banh-banh-brixton/',
  },
  nudgeMet: {
    quote: 'Get the whole table involved with one of the generous mẹt platters',
    source: 'The Nudge',
    date: 'August 2026',
    url: 'https://thenudge.com/banh-banh-brixton/',
  },
  broadsheetMenus: {
    quote: 'Vietnamese dishes that hardly make it onto menus in London.',
    source: 'Broadsheet',
    date: 'April 2026',
    url: 'https://broadsheet.com/london/articles/now-open-banh-banh',
  },
  weHeart: {
    quote: 'an inspired space where the cooking and the room arrive at the same conclusion.',
    source: 'We Heart',
    date: 'April 2026',
    url: 'https://www.we-heart.com/2026/04/28/banh-banh-brixton-london-restaurant-house-of-baby/',
  },
  // Quotes from the team, as given to Broadsheet
  apNoPho: {
    quote: 'For dinner it’s about sharing.',
    source: 'AP Nguyen, to Broadsheet',
    date: 'April 2026',
    url: 'https://broadsheet.com/london/articles/now-open-banh-banh',
  },
  apMiddle: {
    quote: '…that one meal of the day where you see everyone, and the food is in the middle.',
    source: 'AP Nguyen, to Broadsheet',
    date: 'April 2026',
    url: 'https://broadsheet.com/london/articles/now-open-banh-banh',
  },
  losperReveal: {
    quote: 'As you enter, you can’t see much… and then you move through and everything kind of reveals itself.',
    source: 'Joseph Losper, House of Baby, to Broadsheet',
    date: 'April 2026',
    url: 'https://broadsheet.com/london/articles/now-open-banh-banh',
  },
} satisfies Record<string, PressLine>

// Named in the press; prices and the full list are kept for the restaurant to supply
export const drinks = {
  cocktails: ['Sesame Boulevardier', 'Jasmine Martini', 'Coriander Margarita'],
  fizz: 'Tamarind Fizz: caramelised tamarind, pineapple and ginger, topped with soda',
  wine: 'Wine by the glass or bottle from nearby Vining Street Wine Club',
  beer: 'Beer',
}

export const credits = {
  spatial: { name: 'House of Baby', people: ['Joseph Losper', 'Tomio Shota'], url: 'https://www.instagram.com/houseofbaby.studio' },
  menu: { name: 'AP Nguyen', url: 'https://www.instagram.com/___ap_____' },
}

export const markLabels: Record<Mark, string> = {
  vgo: 'vegan option available',
  vg: 'vegan',
  p: 'peanuts',
  gf: 'gluten free',
  n: '',
}

// Transcribed from the two menu pages on banhbanh.com/menus. Prices in £.
export const menu: MenuSection[] = [
  {
    id: 'khai-vi',
    vi: 'Khai Vị',
    en: 'Starters',
    dishes: [
      { id: 'banh-trang-me-den', vi: 'Bánh Tráng Mè Đen', en: 'Black sesame rice crackers with sweet chilli.', price: 3.5, marks: ['vg', 'n'] },
      {
        id: 'nem',
        vi: 'Nem',
        en: 'Fried spring rolls with nước chấm. Choose your filling.',
        price: 9,
        marks: [],
        options: [
          { label: 'Pork & prawn', marks: [] },
          { label: 'Vegetable', marks: ['vg'] },
        ],
      },
      {
        id: 'goi-cuon',
        vi: 'Gỏi Cuốn',
        en: 'Fresh rice paper rolls with nước chấm. Choose your filling.',
        price: 8.5,
        marks: ['p'],
        options: [
          { label: 'Pork & prawn', marks: ['gf'] },
          { label: 'Vegetable', marks: ['vg'] },
        ],
      },
      { id: 'bap-cai-cuon-thit', vi: 'Bắp Cải Cuộn Thịt', en: 'Steamed pork cabbage rolls with tomato sauce.', price: 9.5, marks: ['gf'] },
      { id: 'goi-ga', vi: 'Gỏi Gà', en: 'Chicken and herb salad with shrimp crackers.', price: 10, marks: ['gf', 'p'] },
    ],
  },
  {
    id: 'met',
    vi: 'Mẹt',
    intro: ['Bamboo grazing platters, perfect for sharing.', 'Priced per person. min 2 people.'],
    dishes: [
      {
        id: 'banh-man-2-mien',
        vi: 'Bánh Mặn 2 Miền',
        en: 'A selection of savoury steamed or fried cakes from two regions. Bánh rán with pork and mushroom filling from Hà Nội. Bánh bèo with tofu and prawn floss from Huế.',
        price: 14,
        perPerson: true,
        marks: ['gf'],
      },
      {
        id: 'cha-ca-la-vong',
        vi: 'Chả Cá Lã Vọng',
        en: 'Flash grilled monkfish, marinated in turmeric, galangal and garlic, then fried with aromatic bundles of spring onion & dill. Served with fresh rice vermicelli, peanuts and fermented shrimp dip.',
        price: 17,
        perPerson: true,
        marks: ['gf', 'p'],
        limited: true,
      },
      {
        id: 'nem-lui-boc-sa',
        vi: 'Nem Lụi Bọc Sả',
        en: 'Charcoal grilled pork sausage, made with minced lemongrass, garlic and chunky, succulent pork fat. Served on a stick of lemongrass with starfruit, fried plantain and an in-house made peanut dip.',
        price: 14,
        perPerson: true,
        marks: ['p', 'gf'],
      },
      {
        id: 'bo-nuong-la-lot',
        vi: 'Bò Nướng Lá Lốt',
        en: 'Skewers of succulent grilled beef wrapped in betel leaf, served with rice vermicelli, fresh lettuce and nước chấm broth.',
        price: 15,
        perPerson: true,
        marks: ['p', 'gf'],
      },
    ],
  },
  {
    id: 'com-nha',
    vi: 'Cơm Nhà',
    en: 'Mains',
    dishes: [
      { id: 'ca-kho-to', vi: 'Cá Kho Tộ', en: 'Caramelised catfish steak marinated and slow cooked in sweet soy and chillies.', price: 14.5, marks: ['gf'] },
      {
        id: 'thit-kho-tau',
        vi: 'Thịt Kho Tầu',
        en: 'Thick cubes of braised pork belly, slow cooked in a fish sauce and coconut broth, served with a marinated boiled egg.',
        price: 14.5,
        marks: ['gf'],
      },
      { id: 'canh-chua-vem', vi: 'Canh Chua Vẹm', en: 'Sweet & sour mussel and dill broth. Light and clear with pineapple, okra and tomato.', price: 13, marks: ['gf'] },
      {
        id: 'rau-cu-hap-kho-quet',
        vi: 'Rau Củ Hấp Kho Quẹt',
        en: 'A rich, savoury caramelised mushroom kho quẹt dip, served with a medley of okra, broccoli, cauliflower and chayote squash.',
        price: 12,
        marks: ['vg', 'gf'],
      },
      { id: 'dau-chien-mo-hanh', vi: 'Đậu Chiên Mỡ Hành', en: 'Golden fried turmeric chickpea tofu, dressed with fragrant scallion oil.', price: 13, marks: ['vg', 'gf'] },
    ],
  },
  {
    id: 'an-kem',
    vi: 'Ăn Kèm',
    en: 'Sides',
    dishes: [
      { id: 'ca-phao', vi: 'Cà Pháo', en: 'Pickled baby aubergine.', price: 3.5, marks: ['vg', 'gf'] },
      { id: 'rau-theo-mua', vi: 'Rau Theo Mùa', en: 'Seasonal vegetables with fermented bean paste.', price: 8, marks: ['vg'] },
      { id: 'dau-co-ve-xao-toi', vi: 'Đậu Cô Ve Xào Tỏi', en: 'Pan fried garlic green beans.', price: 8, marks: ['vg', 'gf'] },
      { id: 'com-trang', vi: 'Cơm Trắng', en: 'Fragrant ST25 rice from Sóc Trăng, prized for its soft grain and gentle aroma.', price: 4, marks: ['vg', 'gf'] },
    ],
  },
]

export const metDishes = menu.find((s) => s.id === 'met')!.dishes
