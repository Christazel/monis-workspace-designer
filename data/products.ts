import { Product } from './types';

// ─────────────────────────────────────────
// DESKS
// ─────────────────────────────────────────
export const DESKS: Product[] = [
  {
    id: 'desk-standing-oak',
    name: 'MONIS Standing Desk Pro',
    subtitle: 'Electric Height-Adjustable',
    category: 'desk',
    price: 85000,
    rating: 4.9,
    reviewCount: 312,
    image: '/assets/desks/standing-oak.png',
    dimensions: '140 × 70 cm',
    description: 'Electric dual-motor standing desk with solid oak top. Smoothly transitions from sitting to standing in seconds. Cable management tray included.',
    features: ['Electric dual-motor', 'Solid oak surface', 'Cable management tray', 'Height memory presets', 'Anti-collision protection'],
    badge: 'bestseller',
    colorVariants: [
      { name: 'Natural Oak', hex: '#a0785a' },
      { name: 'White', hex: '#f5f5f5' },
      { name: 'Walnut', hex: '#5c3d2e' },
    ],
    inStock: true,
  },
  {
    id: 'desk-walnut-executive',
    name: 'MONIS Executive Desk',
    subtitle: 'Wide Surface, Premium Walnut',
    category: 'desk',
    price: 120000,
    rating: 4.8,
    reviewCount: 187,
    image: '/assets/desks/walnut-executive.png',
    dimensions: '160 × 80 cm',
    description: 'Solid walnut executive desk with generous workspace. Two integrated drawers and a built-in USB charging port. Perfect for power users.',
    features: ['Solid walnut finish', '2x built-in drawers', 'USB-A/USB-C charging port', 'Cable grommet', 'Rubber feet'],
    badge: 'topbali',
    colorVariants: [
      { name: 'Dark Walnut', hex: '#5c3d2e' },
      { name: 'Light Oak', hex: '#c8a882' },
    ],
    inStock: true,
  },
  {
    id: 'desk-white-minimal',
    name: 'MONIS Studio Desk',
    subtitle: 'Minimalist Clean Design',
    category: 'desk',
    price: 65000,
    rating: 4.7,
    reviewCount: 421,
    image: '/assets/desks/white-minimal.png',
    dimensions: '120 × 60 cm',
    description: 'Clean, minimal white desk built for focus. Powder-coated steel legs and a scratch-resistant MDF surface. Compact and perfect for small villa setups.',
    features: ['Scratch-resistant surface', 'Powder-coated steel legs', 'Easy assembly', 'Cable notch cutout'],
    badge: 'bestseller',
    colorVariants: [
      { name: 'White', hex: '#f5f5f5' },
      { name: 'Black', hex: '#111827' },
    ],
    inStock: true,
  },
  {
    id: 'desk-glass-corner',
    name: 'MONIS Corner Glass Desk',
    subtitle: 'L-Shaped Tempered Glass',
    category: 'desk',
    price: 100000,
    rating: 4.6,
    reviewCount: 95,
    image: '/assets/desks/glass-corner.png',
    dimensions: '150 × 120 cm (L-shape)',
    description: 'Modern L-shaped corner desk with 10mm tempered glass top. Maximise your workspace with dual monitor area. Chrome-finish steel frame.',
    features: ['10mm tempered glass', 'L-shaped corner design', 'Chrome steel frame', 'Monitor riser platform'],
    badge: 'new',
    inStock: true,
  },
];

// ─────────────────────────────────────────
// CHAIRS
// ─────────────────────────────────────────
export const CHAIRS: Product[] = [
  {
    id: 'chair-aeron',
    name: 'Herman Miller Aeron',
    subtitle: 'Iconic Ergonomic Office Chair',
    category: 'chair',
    price: 150000,
    rating: 5.0,
    reviewCount: 289,
    image: '/assets/chairs/aeron.png',
    description: 'The world\'s most studied chair. Fully adjustable PostureFit SL lumbar support, 8Z Pellicle mesh that breathes and supports. Zero compromises.',
    features: ['PostureFit SL lumbar support', '8Z Pellicle mesh backrest', 'Fully adjustable armrests', 'Tilt limiter + seat angle', 'Forward tilt option'],
    badge: 'bestseller',
    colorVariants: [
      { name: 'Graphite / Carbon', hex: '#374151' },
      { name: 'Graphite / Black', hex: '#111827' },
    ],
    inStock: true,
  },
  {
    id: 'chair-markus-mesh',
    name: 'MONIS Highback Mesh',
    subtitle: 'Breathable All-Day Comfort',
    category: 'chair',
    price: 75000,
    rating: 4.7,
    reviewCount: 534,
    image: '/assets/chairs/markus-mesh.png',
    description: 'High-back mesh chair with adjustable lumbar and headrest. Breathable mesh keeps you cool in Bali heat. 5-year Monis warranty.',
    features: ['High-back mesh backrest', 'Adjustable lumbar support', 'Padded headrest', '360° swivel + tilt lock', 'Adjustable armrests'],
    badge: 'bestseller',
    colorVariants: [
      { name: 'Black', hex: '#111827' },
      { name: 'Dark Gray', hex: '#374151' },
    ],
    inStock: true,
  },
  {
    id: 'chair-scandi-cushion',
    name: 'MONIS Nordic Task Chair',
    subtitle: 'Scandinavian Style, Premium Cushion',
    category: 'chair',
    price: 90000,
    rating: 4.6,
    reviewCount: 178,
    image: '/assets/chairs/nordic-task.png',
    description: 'Clean Scandinavian cushioned office chair. Memory foam seat pad and wooden leg base. Ideal for focused work sessions under 8 hours.',
    features: ['Memory foam seat cushion', 'Natural wood base', 'Fabric upholstery', 'Height adjustable', 'Available in warm beige or slate'],
    badge: 'topbali',
    colorVariants: [
      { name: 'Warm Beige', hex: '#d4b896' },
      { name: 'Slate Blue', hex: '#64748b' },
      { name: 'Sage Green', hex: '#84a98c' },
    ],
    inStock: true,
  },
  {
    id: 'chair-gaming-racer',
    name: 'Racing Pro Gaming Chair',
    subtitle: 'Full Recline + Neck & Lumbar',
    category: 'chair',
    price: 80000,
    rating: 4.4,
    reviewCount: 143,
    image: '/assets/chairs/gaming-racer.png',
    description: 'Racing-style recliner chair with full 135° recline, adjustable neck and lumbar pillows, and PU leather upholstery.',
    features: ['135° recline', 'Adjustable neck pillow', 'Adjustable lumbar pillow', 'Flip-up armrests', 'Heavy-duty base'],
    inStock: true,
  },
];

// ─────────────────────────────────────────
// TECH
// ─────────────────────────────────────────
export const TECH: Product[] = [
  {
    id: 'tech-ultrawide',
    name: '34" Ultrawide Curved Monitor',
    subtitle: 'LG UltraWide, WQHD 100Hz',
    category: 'tech',
    subCategory: 'display',
    price: 110000,
    rating: 4.9,
    reviewCount: 214,
    image: '/assets/tech/ultrawide.png',
    dimensions: '34" curved, 3440 × 1440',
    description: '34-inch curved ultrawide IPS display. WQHD resolution with 100Hz refresh rate and USB-C 65W PD. The ultimate single monitor for creatives and developers.',
    features: ['3440×1440 WQHD resolution', '100Hz refresh rate', 'USB-C 65W Power Delivery', 'Dual HDMI + DisplayPort', 'Height/tilt/swivel adjustable stand'],
    badge: 'bestseller',
    inStock: true,
  },
  {
    id: 'tech-4k-27',
    name: '27" 4K IPS Monitor',
    subtitle: 'LG 27UK850, Color Calibrated',
    category: 'tech',
    subCategory: 'display',
    price: 85000,
    rating: 4.8,
    reviewCount: 387,
    image: '/assets/tech/4k-27.png',
    dimensions: '27" flat, 3840 × 2160',
    description: '27-inch 4K UHD IPS display, factory color-calibrated to 99% sRGB. Ideal for designers who need accurate colors. USB-C hub built-in.',
    features: ['3840×2160 4K UHD', '99% sRGB color accuracy', 'USB-C 60W hub', 'HDMI 2.0 + DisplayPort 1.4', 'Factory color calibrated'],
    badge: 'topbali',
    inStock: true,
  },
  {
    id: 'tech-keyboard-mouse',
    name: 'Keychron K2 + Ergo Mouse',
    subtitle: 'Wireless Mechanical + Logitech MX',
    category: 'tech',
    subCategory: 'input',
    price: 45000,
    rating: 4.8,
    reviewCount: 502,
    image: '/assets/tech/keyboard-mouse.png',
    description: 'Keychron K2 compact wireless mechanical keyboard (Gateron Brown switches) bundled with Logitech MX Master 3 ergonomic mouse. The developer\'s daily driver.',
    features: ['Keychron K2 wireless mech', 'Gateron Brown switches', 'Logitech MX Master 3', 'Multi-device pairing', 'USB-C rechargeable'],
    badge: 'bestseller',
    inStock: true,
  },
  {
    id: 'tech-webcam-4k',
    name: 'Logitech Brio 4K Webcam',
    subtitle: 'Ultra HD Stream Webcam',
    category: 'tech',
    subCategory: 'video',
    price: 40000,
    rating: 4.7,
    reviewCount: 189,
    image: '/assets/tech/webcam-4k.png',
    description: 'Look professional on every call. 4K 30fps with HDR, 5x zoom, dual omnidirectional microphones, and Windows Hello support.',
    features: ['4K 30fps / 1080p 60fps', 'HDR with RightLight 3', 'Dual mics + noise cancel', 'Windows Hello / Face ID', 'Works with all video apps'],
    inStock: true,
  },
];

// ─────────────────────────────────────────
// ACCESSORIES
// ─────────────────────────────────────────
export const ACCESSORIES: Product[] = [
  {
    id: 'acc-screenbar',
    name: 'BenQ ScreenBar Plus',
    subtitle: 'Monitor-Mounted Smart Lamp',
    category: 'accessory',
    subCategory: 'lighting',
    price: 35000,
    rating: 4.8,
    reviewCount: 276,
    image: '/assets/accessories/screenbar.png',
    description: 'Auto-dimming monitor-mounted LED light bar. Illuminates your desk without screen glare. Wireless desk controller for brightness and color temperature.',
    features: ['Zero screen glare', 'Auto-dimming sensor', 'Wireless desk controller', '2700K to 6500K color temp', 'USB-A powered (no outlet needed)'],
    badge: 'bestseller',
    inStock: true,
  },
  {
    id: 'acc-monstera',
    name: 'Monstera Deliciosa',
    subtitle: 'Tropical Indoor Plant',
    category: 'accessory',
    subCategory: 'decor',
    price: 20000,
    rating: 4.9,
    reviewCount: 445,
    image: '/assets/accessories/monstera.png',
    description: 'Lush Bali-grown Monstera Deliciosa in a mid-century ceramic pot. Air-purifying, mood-boosting, and the perfect workspace companion.',
    features: ['Air purifying', 'Low maintenance', 'Ceramic terracotta pot', 'Watering service included', 'Grows with you!'],
    badge: 'topbali',
    inStock: true,
  },
  {
    id: 'acc-coffee-espresso',
    name: 'De\'Longhi Dedica Espresso Kit',
    subtitle: 'Compact Italian Espresso Maker',
    category: 'accessory',
    subCategory: 'coffee',
    price: 50000,
    rating: 4.8,
    reviewCount: 167,
    image: '/assets/accessories/espresso.png',
    description: 'Compact 15-bar Italian pump espresso machine. Pull silky espresso shots and steam milk like a Bali cafe barista. Starter coffee kit included.',
    features: ['15-bar Italian pump', 'Milk frother wand', 'Compact 14.5cm width', 'Coffee starter kit included', 'Auto shut-off'],
    badge: 'topbali',
    inStock: true,
  },
  {
    id: 'acc-surfboard',
    name: 'Bali Canggu Surfboard',
    subtitle: '7\'0" Mini Mal, Beginner-Friendly',
    category: 'accessory',
    subCategory: 'outdoor',
    price: 80000,
    rating: 4.7,
    reviewCount: 93,
    image: '/assets/accessories/surfboard.png',
    dimensions: '7\'0" × 21" × 2.75"',
    description: 'Grab waves before your 9am standup. 7-foot mini malibu board great for beginners and intermediates. Perfect for Canggu and Batu Bolong breaks.',
    features: ['7\'0" mini malibu shape', 'Beginner-intermediate friendly', 'Includes leash + wax', 'Free board bag', 'Pick-up from Canggu available'],
    badge: 'topbali',
    inStock: true,
  },
  {
    id: 'acc-laptop-stand',
    name: 'Rain Design mStand',
    subtitle: 'Aluminum Laptop Stand',
    category: 'accessory',
    subCategory: 'ergonomic',
    price: 25000,
    rating: 4.6,
    reviewCount: 312,
    image: '/assets/accessories/laptop-stand.png',
    description: 'Solid aluminum laptop stand that raises your screen to eye level. Reduces neck strain and looks beautiful on any desk. Cable channel built-in.',
    features: ['Premium aluminum build', 'Eye-level height (15cm)', 'Built-in cable channel', 'Non-slip rubber base', 'Compatible with 11" to 17" laptops'],
    inStock: true,
  },
  {
    id: 'acc-bean-bag',
    name: 'Fatboy Original Bean Bag',
    subtitle: 'Indoor/Outdoor Relax Zone',
    category: 'accessory',
    subCategory: 'relax',
    price: 35000,
    rating: 4.5,
    reviewCount: 88,
    image: '/assets/accessories/bean-bag.png',
    description: 'The ultimate Bali relax zone addition. Fade-resistant outdoor fabric, filled with EPS beads. For your villa balcony or chill-out corner.',
    features: ['Outdoor-grade fabric', 'EPS micro-bead fill', 'Water-resistant', 'Washable cover', 'Available in 5 colors'],
    inStock: true,
  },
];

// ─────────────────────────────────────────
// ALL PRODUCTS (convenience export)
// ─────────────────────────────────────────
export const ALL_PRODUCTS: Product[] = [
  ...DESKS,
  ...CHAIRS,
  ...TECH,
  ...ACCESSORIES,
];

// ─────────────────────────────────────────
// PRICING UTILITIES
// ─────────────────────────────────────────
export const USD_RATE = 15800; // IDR per 1 USD

export const DURATION_DISCOUNTS = {
  daily:   { label: '1 Day',    multiplier: 1,    discount: 0 },
  weekly:  { label: '1 Week',   multiplier: 7,    discount: 0.10 },
  monthly: { label: '1 Month',  multiplier: 30,   discount: 0.20 },
};

export function formatIDR(amount: number): string {
  return 'Rp ' + Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatUSD(amountIDR: number): string {
  const usd = (amountIDR / USD_RATE).toFixed(2);
  return '$' + usd;
}

export function calculateTotal(
  products: Product[],
  duration: 'daily' | 'weekly' | 'monthly',
  currency: 'IDR' | 'USD'
): { subtotal: number; discount: number; total: number; formatted: string } {
  const dailyTotal = products.reduce((sum, p) => sum + p.price, 0);
  const { multiplier, discount } = DURATION_DISCOUNTS[duration];
  const subtotal = dailyTotal * multiplier;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;
  const formatted = currency === 'IDR' ? formatIDR(total) : formatUSD(total);
  return { subtotal, discount: discountAmount, total, formatted };
}
