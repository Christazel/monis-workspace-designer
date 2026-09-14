const sharp = require('sharp');
const fs = require('fs');

async function floodClean(file, threshold = 210) {
  if (!fs.existsSync(file)) return;
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBg(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
    if (a === 0) return true;
    return r >= threshold && g >= threshold && b >= threshold;
  }

  for (let x = 0; x < width; x++) {
    if (isBg(x, 0)) { queue.push(x, 0); visited[x] = 1; }
    if (isBg(x, height - 1)) { queue.push(x, height - 1); visited[(height - 1) * width + x] = 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isBg(0, y)) { queue.push(0, y); visited[y * width] = 1; }
    if (isBg(width - 1, y)) { queue.push(width - 1, y); visited[y * width + (width - 1)] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const idx = (cy * width + cx) * channels;
    data[idx + 3] = 0;

    const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos]) {
          visited[nPos] = 1;
          if (isBg(nx, ny)) {
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  const outPath = file + '.tmp.png';
  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(outPath);
  fs.renameSync(outPath, file);
  console.log('✓ Cleaned:', file, 'Pixels cut:', head / 2);
}

async function run() {
  // Replace nordic-task with clean version
  if (fs.existsSync('public/assets/chairs/nordic-task.clean.png')) {
    fs.renameSync('public/assets/chairs/nordic-task.clean.png', 'public/assets/chairs/nordic-task.png');
    console.log('✓ Replaced nordic-task.png');
  }

  // Replace ultrawide with clean version
  if (fs.existsSync('public/assets/tech/ultrawide.clean.png')) {
    fs.renameSync('public/assets/tech/ultrawide.clean.png', 'public/assets/tech/ultrawide.png');
    console.log('✓ Replaced ultrawide.png');
  }

  // Clean remaining files with lower threshold
  const items = [
    ['public/assets/chairs/aeron.png', 215],
    ['public/assets/chairs/markus-mesh.png', 215],
    ['public/assets/chairs/gaming-racer.png', 225],
    ['public/assets/desks/standing-oak.png', 225],
    ['public/assets/desks/walnut-executive.png', 225],
    ['public/assets/desks/white-minimal.png', 225],
    ['public/assets/desks/glass-corner.png', 225],
    ['public/assets/accessories/laptop-stand.png', 220],
    ['public/assets/accessories/surfboard.png', 230],
    ['public/assets/accessories/screenbar.png', 225],
    ['public/assets/accessories/monstera.png', 225],
  ];

  for (const [file, thresh] of items) {
    await floodClean(file, thresh);
  }

  // Generate a dedicated, sleek 27" 4K IPS flat monitor (LG 27UK850 style)
  const monitor27Svg = `
  <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="monShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#000" flood-opacity="0.28"/>
      </filter>
      <linearGradient id="panelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="50%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.85"/>
        <stop offset="40%" stop-color="#0f766e" stop-opacity="0.75"/>
        <stop offset="80%" stop-color="#b45309" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="silverStand" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f1f5f9"/>
        <stop offset="50%" stop-color="#cbd5e1"/>
        <stop offset="100%" stop-color="#94a3b8"/>
      </linearGradient>
    </defs>

    <!-- Curved ArcLine Stand Base -->
    <path d="M 270 820 C 360 870, 664 870, 754 820 C 730 790, 650 830, 512 830 C 374 830, 294 790, 270 820 Z" fill="url(#silverStand)" filter="url(#monShadow)"/>
    
    <!-- Vertical Stand Stem -->
    <rect x="488" y="520" width="48" height="290" rx="6" fill="#1e293b" filter="url(#monShadow)"/>
    <rect x="494" y="520" width="12" height="290" fill="#334155"/>

    <!-- Monitor Outer Frame / Bezel -->
    <rect x="132" y="180" width="760" height="450" rx="10" fill="#0f172a" stroke="#334155" stroke-width="4" filter="url(#monShadow)"/>
    
    <!-- Inner Screen Display (16:9 ratio) -->
    <rect x="146" y="194" width="732" height="412" rx="4" fill="url(#panelGrad)"/>
    <rect x="146" y="194" width="732" height="412" rx="4" fill="url(#screenGlow)"/>

    <!-- Screen Glass Sheen -->
    <path d="M 146 194 L 460 194 L 146 560 Z" fill="#ffffff" opacity="0.06"/>

    <!-- Bottom Chin & LG Logo Accent -->
    <rect x="132" y="610" width="760" height="24" rx="4" fill="#1e293b"/>
    <circle cx="512" cy="622" r="4" fill="#64748b"/>
  </svg>
  `;
  await sharp(Buffer.from(monitor27Svg)).png().toFile('public/assets/tech/4k-27.png');
  console.log('✓ Created dedicated 4k-27.png flat 16:9 monitor');
}

run().catch(console.error);
