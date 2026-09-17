import { Preset } from './types';

export const PRESETS: Preset[] = [
  {
    id: 'preset-essentials',
    name: 'The Essentials',
    tagline: 'Essential workspace for solo nomads & quick remote stays in Bali',
    description:
      'Clean minimalist desk, ergonomic breathable mesh chair, 27" 4K display, aluminum laptop stand, and monitor screenbar. 100% plug & play.',
    icon: 'nomad',
    deskId: 'desk-white-minimal',
    chairId: 'chair-markus-mesh',
    techIds: ['tech-4k-27'],
    accessoryIds: ['acc-laptop-stand', 'acc-screenbar'],
    totalPrice: 295000, // IDR/day
  },
  {
    id: 'preset-trading',
    name: 'The Trading Setup',
    tagline: 'Multi-screen ultrawide powerhouse for finance & day-trading',
    description:
      'Dual-motor electric standing desk with Herman Miller Aeron, 34" curved ultrawide monitor, MX Master keyboard & mouse, and monitor screenbar.',
    icon: 'dev',
    deskId: 'desk-standing-oak',
    chairId: 'chair-aeron',
    techIds: ['tech-ultrawide', 'tech-keyboard-mouse'],
    accessoryIds: ['acc-screenbar', 'acc-monstera'],
    totalPrice: 445000, // IDR/day
  },
  {
    id: 'preset-founders',
    name: 'The Founders Setup',
    tagline: 'The ultimate luxury executive workstation for founders & leaders',
    description:
      'Solid walnut executive desk, iconic Herman Miller Aeron chair, 27" 4K display, wireless peripherals, Italian espresso machine, and villa greenery.',
    icon: 'creator',
    deskId: 'desk-walnut-executive',
    chairId: 'chair-aeron',
    techIds: ['tech-4k-27', 'tech-keyboard-mouse'],
    accessoryIds: ['acc-espresso', 'acc-screenbar', 'acc-monstera'],
    totalPrice: 505000, // IDR/day
  },
  {
    id: 'preset-studio',
    name: 'The Studio Setup',
    tagline: 'Creative studio setup for designers, podcasters & video editors',
    description:
      'Solid oak standing desk, Aeron chair, curved ultrawide canvas, 4K video webcam, studio speakers, eye-care screenbar, and fresh espresso maker.',
    icon: 'creator',
    deskId: 'desk-standing-oak',
    chairId: 'chair-aeron',
    techIds: ['tech-ultrawide', 'tech-webcam-4k', 'tech-speakers'],
    accessoryIds: ['acc-screenbar', 'acc-espresso'],
    totalPrice: 500000, // IDR/day
  },
];
