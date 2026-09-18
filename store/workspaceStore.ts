import { create } from 'zustand';
import { Product, RentalDuration, Currency } from '@/data/types';
import { ALL_PRODUCTS, calculateTotal } from '@/data/products';
import { PRESETS } from '@/data/presets';

// ─────────────────────────────────────────
// APP MODE
// ─────────────────────────────────────────
export type AppMode = 'catalog' | 'builder';

// ─────────────────────────────────────────
// WORKSPACE STORE STATE
// ─────────────────────────────────────────
interface WorkspaceStore {
  // App mode
  mode: AppMode;
  setMode: (mode: AppMode) => void;

  // Workspace config
  desk: Product | null;
  chair: Product | null;
  tech: Product[];
  accessories: Product[];

  // Active preset
  activePresetId: string | null;

  // Rental options
  duration: RentalDuration;
  currency: Currency;
  setDuration: (d: RentalDuration) => void;
  setCurrency: (c: Currency) => void;

  // Checkout drawer
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;

  // Builder active category tab
  builderTab: 'desk' | 'chair' | 'accessory';
  setBuilderTab: (tab: 'desk' | 'chair' | 'accessory') => void;

  // Builder mobile view tab
  builderMobileTab: 'canvas' | 'items' | 'summary';
  setBuilderMobileTab: (tab: 'canvas' | 'items' | 'summary') => void;

  // Catalog search & filter state
  searchQuery: string;
  activeCategory: 'all' | 'desk' | 'chair' | 'tech' | 'accessory';
  setSearchQuery: (q: string) => void;
  setActiveCategory: (cat: 'all' | 'desk' | 'chair' | 'tech' | 'accessory') => void;

  // Workspace actions
  setDesk: (product: Product | null) => void;
  setChair: (product: Product | null) => void;
  toggleTech: (product: Product) => void;
  toggleAccessory: (product: Product) => void;
  applyPreset: (presetId: string) => void;
  clearWorkspace: () => void;

  // Precomputed total in store state
  total: { subtotal: number; discount: number; total: number; formatted: string };

  // Computed
  getAllSelectedProducts: () => Product[];
  getTotal: () => { subtotal: number; discount: number; total: number; formatted: string };
  hasItems: () => boolean;
}

function computeStoreTotal(state: {
  desk: Product | null;
  chair: Product | null;
  tech: Product[];
  accessories: Product[];
  duration: RentalDuration;
  currency: Currency;
}) {
  const products = [
    ...(state.desk ? [state.desk] : []),
    ...(state.chair ? [state.chair] : []),
    ...state.tech,
    ...state.accessories,
  ];
  return calculateTotal(products, state.duration, state.currency);
}

const INITIAL_DURATION: RentalDuration = 'monthly';
const INITIAL_CURRENCY: Currency = 'IDR';

const initialDesk = ALL_PRODUCTS.find((p) => p.id === 'desk-standing-oak') ?? null;
const initialChair = ALL_PRODUCTS.find((p) => p.id === 'chair-aeron') ?? null;
const initialTech = [
  ALL_PRODUCTS.find((p) => p.id === 'tech-ultrawide'),
  ALL_PRODUCTS.find((p) => p.id === 'tech-keyboard-mouse'),
].filter(Boolean) as Product[];
const initialAccessories = [
  ALL_PRODUCTS.find((p) => p.id === 'acc-screenbar'),
  ALL_PRODUCTS.find((p) => p.id === 'acc-monstera'),
].filter(Boolean) as Product[];

// ─────────────────────────────────────────
// STORE IMPLEMENTATION
// ─────────────────────────────────────────
export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  // App mode
  mode: 'catalog',
  setMode: (mode) => set({ mode }),

  // Workspace config — starts with Developer Pro setup
  desk: initialDesk,
  chair: initialChair,
  tech: initialTech,
  accessories: initialAccessories,
  activePresetId: 'preset-developer',

  // Rental options
  duration: INITIAL_DURATION,
  currency: INITIAL_CURRENCY,

  // Precomputed total
  total: computeStoreTotal({
    desk: initialDesk,
    chair: initialChair,
    tech: initialTech,
    accessories: initialAccessories,
    duration: INITIAL_DURATION,
    currency: INITIAL_CURRENCY,
  }),

  setDuration: (duration) =>
    set((s) => ({
      duration,
      total: computeStoreTotal({ ...s, duration }),
    })),

  setCurrency: (currency) =>
    set((s) => ({
      currency,
      total: computeStoreTotal({ ...s, currency }),
    })),

  // Checkout
  checkoutOpen: false,
  setCheckoutOpen: (checkoutOpen) => set({ checkoutOpen }),

  // Builder active category tab
  builderTab: 'desk',
  setBuilderTab: (builderTab) => set({ builderTab, builderMobileTab: 'items' }),

  // Builder mobile view tab
  builderMobileTab: 'canvas',
  setBuilderMobileTab: (builderMobileTab) => set({ builderMobileTab }),

  // Catalog state
  searchQuery: '',
  activeCategory: 'all',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),

  // Workspace actions
  setDesk: (desk) =>
    set((s) => {
      const next = { ...s, desk, activePresetId: null };
      return { desk, activePresetId: null, total: computeStoreTotal(next) };
    }),

  setChair: (chair) =>
    set((s) => {
      const next = { ...s, chair, activePresetId: null };
      return { chair, activePresetId: null, total: computeStoreTotal(next) };
    }),

  toggleTech: (product) =>
    set((state) => {
      const exists = state.tech.some((p) => p.id === product.id);
      const nextTech = exists ? state.tech.filter((p) => p.id !== product.id) : [...state.tech, product];
      const next = { ...state, tech: nextTech, activePresetId: null };
      return {
        tech: nextTech,
        activePresetId: null,
        total: computeStoreTotal(next),
      };
    }),

  toggleAccessory: (product) =>
    set((state) => {
      const exists = state.accessories.some((p) => p.id === product.id);
      const nextAcc = exists
        ? state.accessories.filter((p) => p.id !== product.id)
        : [...state.accessories, product];
      const next = { ...state, accessories: nextAcc, activePresetId: null };
      return {
        accessories: nextAcc,
        activePresetId: null,
        total: computeStoreTotal(next),
      };
    }),

  applyPreset: (presetId) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const findProduct = (id: string) => ALL_PRODUCTS.find((p) => p.id === id) ?? null;

    set((state) => {
      const desk = findProduct(preset.deskId);
      const chair = findProduct(preset.chairId);
      const tech = preset.techIds.map(findProduct).filter(Boolean) as Product[];
      const accessories = preset.accessoryIds.map(findProduct).filter(Boolean) as Product[];
      const next = { ...state, desk, chair, tech, accessories };

      return {
        desk,
        chair,
        tech,
        accessories,
        activePresetId: presetId,
        mode: 'builder',
        total: computeStoreTotal(next),
      };
    });
  },

  clearWorkspace: () =>
    set((state) => {
      const next = { ...state, desk: null, chair: null, tech: [], accessories: [] };
      return {
        desk: null,
        chair: null,
        tech: [],
        accessories: [],
        activePresetId: null,
        total: computeStoreTotal(next),
      };
    }),

  // Computed helpers
  getAllSelectedProducts: () => {
    const { desk, chair, tech, accessories } = get();
    return [
      ...(desk ? [desk] : []),
      ...(chair ? [chair] : []),
      ...tech,
      ...accessories,
    ];
  },

  getTotal: () => get().total,

  hasItems: () => {
    const { desk, chair, tech, accessories } = get();
    return !!(desk || chair || tech.length > 0 || accessories.length > 0);
  },
}));

// ─────────────────────────────────────────
// SELECTORS (convenience)
// ─────────────────────────────────────────
export const useDesk = () => useWorkspaceStore((s) => s.desk);
export const useChair = () => useWorkspaceStore((s) => s.chair);
export const useTech = () => useWorkspaceStore((s) => s.tech);
export const useAccessories = () => useWorkspaceStore((s) => s.accessories);
export const useDuration = () => useWorkspaceStore((s) => s.duration);
export const useCurrency = () => useWorkspaceStore((s) => s.currency);
export const useMode = () => useWorkspaceStore((s) => s.mode);
export const useActivePreset = () => useWorkspaceStore((s) => s.activePresetId);

// Returns a boolean primitive — no re-render loop
export const useHasItems = () =>
  useWorkspaceStore(
    (s) => Boolean(s.desk || s.chair || s.tech.length > 0 || s.accessories.length > 0)
  );

// Direct selector of stable object reference in store state
export const useTotal = () => useWorkspaceStore((s) => s.total);

