// Script to generate clean SVG product placeholder images
// Run: node scripts/generate-placeholders.js

const fs = require('fs');
const path = require('path');

const PRODUCTS = [
  // Desks
  { file: 'public/assets/desks/walnut-executive.png',  label: 'Executive Desk',     emoji: '🪵', color: '#8B5E3C', bg: '#FFF8F3' },
  { file: 'public/assets/desks/white-minimal.png',     label: 'Studio Desk',        emoji: '🪵', color: '#111827', bg: '#F9FAFB' },
  { file: 'public/assets/desks/glass-corner.png',      label: 'Corner Glass Desk',  emoji: '🪵', color: '#0284c7', bg: '#F0F9FF' },
  // Chairs
  { file: 'public/assets/chairs/nordic-task.png',      label: 'Nordic Task Chair',  emoji: '🪑', color: '#d4b896', bg: '#FFF8F3' },
  { file: 'public/assets/chairs/gaming-racer.png',     label: 'Gaming Racer Chair', emoji: '🪑', color: '#ef4444', bg: '#FFF1F1' },
  // Tech
  { file: 'public/assets/tech/keyboard-mouse.png',     label: 'Keyboard & Mouse',   emoji: '⌨️',  color: '#374151', bg: '#F5F3FF' },
  { file: 'public/assets/tech/webcam-4k.png',          label: '4K Webcam',          emoji: '📷', color: '#2563EB', bg: '#EFF6FF' },
  // Accessories
  { file: 'public/assets/accessories/screenbar.png',   label: 'ScreenBar Plus',     emoji: '💡', color: '#F59E0B', bg: '#FFFBEB' },
  { file: 'public/assets/accessories/monstera.png',    label: 'Monstera Plant',     emoji: '🌿', color: '#16A34A', bg: '#F0FDF4' },
  { file: 'public/assets/accessories/espresso.png',    label: 'Espresso Kit',       emoji: '☕', color: '#6B3F2A', bg: '#FFF8F3' },
  { file: 'public/assets/accessories/surfboard.png',   label: 'Bali Surfboard',     emoji: '🏄', color: '#0284C7', bg: '#F0F9FF' },
  { file: 'public/assets/accessories/laptop-stand.png',label: 'Laptop Stand',       emoji: '💻', color: '#6B7280', bg: '#F9FAFB' },
  { file: 'public/assets/accessories/bean-bag.png',    label: 'Bean Bag',           emoji: '🛋️',  color: '#F59E0B', bg: '#FFFBEB' },
];

// Generate a clean SVG as a PNG-compatible SVG data
function makeSVG(label, emoji, color, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <rect width="800" height="800" fill="${bg}"/>
  <!-- Clean product illustration area -->
  <rect x="100" y="100" width="600" height="500" rx="16" fill="white" opacity="0.7"/>
  <!-- Large emoji / icon area -->
  <text x="400" y="380" font-size="180" text-anchor="middle" dominant-baseline="middle" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif">${emoji}</text>
  <!-- Product label -->
  <rect x="160" y="580" width="480" height="64" rx="8" fill="${color}" opacity="0.12"/>
  <text x="400" y="619" font-size="26" font-weight="700" text-anchor="middle" dominant-baseline="middle" 
    font-family="Inter, system-ui, sans-serif" fill="${color}">${label}</text>
  <!-- Corner dot branding -->
  <circle cx="726" cy="74" r="20" fill="${color}" opacity="0.35"/>
</svg>`;
}

let created = 0;
for (const product of PRODUCTS) {
  const dir = path.dirname(product.file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  // Only write if file doesn't already exist (don't overwrite real photos)
  if (!fs.existsSync(product.file)) {
    const svg = makeSVG(product.label, product.emoji, product.color, product.bg);
    fs.writeFileSync(product.file, svg);
    console.log(`✓ Created: ${product.file}`);
    created++;
  } else {
    console.log(`  Skipped (exists): ${product.file}`);
  }
}

console.log(`\nDone. Created ${created} placeholder images.`);
