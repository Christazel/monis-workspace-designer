import { CatalogItem, Extra } from './types';

export const DESKS: CatalogItem[] = [
  {
    id: 'desk-oak',
    name: 'Oak Standing Desk',
    category: 'desk',
    price: 85000,
    description: 'Adjustable height, natural oak top',
    emoji: '🪵',
    tags: ['adjustable', 'natural'],
  },
  {
    id: 'desk-walnut',
    name: 'Walnut Executive',
    category: 'desk',
    price: 120000,
    description: 'Wide surface, premium walnut finish',
    emoji: '🍂',
    tags: ['premium', 'wide'],
  },
  {
    id: 'desk-white',
    name: 'Minimalist White Desk',
    category: 'desk',
    price: 65000,
    description: 'Clean, minimal, cable management built-in',
    emoji: '⬜',
    tags: ['minimal', 'clean'],
  },
  {
    id: 'desk-glass',
    name: 'Glass Corner Desk',
    category: 'desk',
    price: 100000,
    description: 'L-shaped glass top for maximum space',
    emoji: '🔷',
    tags: ['corner', 'glass'],
  },
];

export const CHAIRS: CatalogItem[] = [
  {
    id: 'chair-aeron',
    name: 'Herman Miller Aeron',
    category: 'chair',
    price: 150000,
    description: 'Iconic ergonomic, lumbar support',
    emoji: '🪑',
    tags: ['ergonomic', 'premium'],
  },
  {
    id: 'chair-mesh',
    name: 'Breathable Mesh Chair',
    category: 'chair',
    price: 75000,
    description: 'All-day comfort, mesh backrest',
    emoji: '💺',
    tags: ['breathable', 'comfort'],
  },
  {
    id: 'chair-gaming',
    name: 'Gaming Racing Chair',
    category: 'chair',
    price: 90000,
    description: 'Racing style, full recline support',
    emoji: '🏎️',
    tags: ['gaming', 'recline'],
  },
  {
    id: 'chair-stool',
    name: 'Adjustable Bar Stool',
    category: 'chair',
    price: 50000,
    description: 'Casual, height adjustable, backless',
    emoji: '🪑',
    tags: ['casual', 'minimal'],
  },
];

export const ACCESSORIES: CatalogItem[] = [
  {
    id: 'acc-monitor-27',
    name: '27" 4K Monitor',
    category: 'accessory',
    subCategory: 'display',
    price: 80000,
    description: 'LG 27", 4K IPS, color accurate',
    emoji: '🖥️',
  },
  {
    id: 'acc-monitor-ultra',
    name: 'Ultrawide Monitor',
    category: 'accessory',
    subCategory: 'display',
    price: 110000,
    description: '34" curved ultrawide, immersive',
    emoji: '📺',
  },
  {
    id: 'acc-lamp',
    name: 'BenQ ScreenBar',
    category: 'accessory',
    subCategory: 'lighting',
    price: 35000,
    description: 'Monitor-mounted lamp, no glare',
    emoji: '💡',
  },
  {
    id: 'acc-plant',
    name: 'Tropical Plant',
    category: 'accessory',
    subCategory: 'decor',
    price: 20000,
    description: 'Fresh vibes, air purifying',
    emoji: '🌿',
  },
  {
    id: 'acc-keyboard',
    name: 'Mech Keyboard + Mouse',
    category: 'accessory',
    subCategory: 'input',
    price: 45000,
    description: 'Keychron K2, premium tactile feel',
    emoji: '⌨️',
  },
  {
    id: 'acc-webcam',
    name: '4K Webcam',
    category: 'accessory',
    subCategory: 'video',
    price: 40000,
    description: 'Logitech Brio 4K, look pro on calls',
    emoji: '📷',
  },
];

export const EXTRAS: Extra[] = [
  // Coffee Station
  { id: 'extra-coffee-machine', name: 'Coffee Machine', section: 'coffee', price: 50000, emoji: '☕' },
  { id: 'extra-pour-over', name: 'Pour Over Kit', section: 'coffee', price: 25000, emoji: '🫗' },

  // Outdoor Gear
  { id: 'extra-surfboard', name: 'Surfboard', section: 'outdoor', price: 80000, emoji: '🏄' },
  { id: 'extra-motorcycle', name: 'Motorcycle', section: 'outdoor', price: 120000, emoji: '🏍️' },
  { id: 'extra-bicycle', name: 'Bicycle', section: 'outdoor', price: 60000, emoji: '🚲' },

  // Relax Zone
  { id: 'extra-bean-bag', name: 'Bean Bag', section: 'relax', price: 30000, emoji: '🛋️' },
  { id: 'extra-hammock', name: 'Hammock', section: 'relax', price: 35000, emoji: '🌴' },

  // Garage Space
  { id: 'extra-tool-shelf', name: 'Tool Shelf', section: 'garage', price: 40000, emoji: '🔧' },
  { id: 'extra-locker', name: 'Storage Locker', section: 'garage', price: 55000, emoji: '🗄️' },
];

export const PRICE_PER_DAY_BASE = 200000; // IDR base (includes room)

export const DURATION_DISCOUNTS: { days: number; label: string; discount: number }[] = [
  { days: 1, label: '1 Day', discount: 0 },
  { days: 3, label: '3 Days', discount: 0.05 },
  { days: 7, label: '1 Week', discount: 0.10 },
  { days: 14, label: '2 Weeks', discount: 0.15 },
  { days: 30, label: '1 Month', discount: 0.20 },
];

export const formatIDR = (amount: number): string =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
