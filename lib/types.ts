export type ItemCategory = 'chair' | 'desk' | 'accessory' | 'extra';

export interface CatalogItem {
  id: string;
  name: string;
  category: ItemCategory;
  subCategory?: string;
  price: number; // per day in IDR
  description: string;
  emoji: string;
  tags?: string[];
}

export interface Extra {
  id: string;
  name: string;
  section: 'coffee' | 'outdoor' | 'relax' | 'garage';
  price: number;
  emoji: string;
}

export interface WorkspaceState {
  selectedDesk: CatalogItem | null;
  selectedChair: CatalogItem | null;
  selectedAccessories: CatalogItem[];
  selectedExtras: Extra[];
  rentalDays: number;
  ambiance: 'day' | 'night';
}
