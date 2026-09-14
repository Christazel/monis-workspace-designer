// Product & Workspace Type Definitions

export type Category = 'desk' | 'chair' | 'tech' | 'accessory';

export type RentalDuration = 'daily' | 'weekly' | 'monthly';

export type Currency = 'IDR' | 'USD';

export type BadgeType = 'bestseller' | 'new' | 'topbali';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  subCategory?: string;
  price: number;         // IDR per day
  rating: number;
  reviewCount: number;
  image: string;         // path to public/assets/
  dimensions?: string;
  description: string;
  features: string[];
  badge?: BadgeType;
  colorVariants?: ColorVariant[];
  inStock: boolean;
}

export interface ColorVariant {
  name: string;
  hex: string;
}

export interface Preset {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  deskId: string;
  chairId: string;
  techIds: string[];
  accessoryIds: string[];
  totalPrice: number;  // IDR/day sum
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WorkspaceConfig {
  desk: Product | null;
  chair: Product | null;
  tech: Product[];
  accessories: Product[];
}
