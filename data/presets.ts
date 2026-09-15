import { Preset } from './types';

export const PRESETS: Preset[] = [
  {
    id: 'preset-developer',
    name: 'Developer Pro',
    tagline: 'Built for deep work and long coding sessions',
    description:
      'Dual monitors, standing desk, and the iconic Herman Miller Aeron. Everything optimised for 10+ hour coding marathons in your Bali villa.',
    icon: 'dev',
    deskId: 'desk-standing-oak',
    chairId: 'chair-aeron',
    techIds: ['tech-4k-27', 'tech-keyboard-mouse'],
    accessoryIds: ['acc-screenbar', 'acc-monstera'],
    totalPrice: 395000, // IDR/day
  },
  {
    id: 'preset-creator',
    name: 'Creator Studio',
    tagline: 'Perfect for designers, video editors, and content creators',
    description:
      'Massive ultrawide display for your creative canvas, 4K webcam for pro video calls, and a lush Monstera to keep ideas flowing. Plus your morning espresso.',
    icon: 'creator',
    deskId: 'desk-walnut-executive',
    chairId: 'chair-scandi-cushion',
    techIds: ['tech-ultrawide', 'tech-webcam-4k'],
    accessoryIds: ['acc-screenbar', 'acc-monstera', 'acc-coffee-espresso'],
    totalPrice: 460000, // IDR/day
  },
  {
    id: 'preset-nomad',
    name: 'Minimal Nomad',
    tagline: 'Travel light, work sharp, surf after standup',
    description:
      'Clean minimal white desk, comfortable mesh chair, a 27" 4K display, plus the essential Bali perk: a surfboard waiting by the door for sunset sessions.',
    icon: 'nomad',
    deskId: 'desk-white-minimal',
    chairId: 'chair-markus-mesh',
    techIds: ['tech-4k-27'],
    accessoryIds: ['acc-laptop-stand', 'acc-monstera', 'acc-surfboard'],
    totalPrice: 310000, // IDR/day
  },
];
