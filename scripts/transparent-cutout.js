const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function removeBackgroundFloodFill(inputPath, outputPath, threshold = 245) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBg(x, y) {
    const idx = (y * width + x) * channels;
    return data[idx] >= threshold && data[idx + 1] >= threshold && data[idx + 2] >= threshold;
  }

  // Push all 4 image borders to queue if near white
  for (let x = 0; x < width; x++) {
    if (isBg(x, 0)) { queue.push(x, 0); visited[0 * width + x] = 1; }
    if (isBg(x, height - 1)) { queue.push(x, height - 1); visited[(height - 1) * width + x] = 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isBg(0, y)) { queue.push(0, y); visited[y * width + 0] = 1; }
    if (isBg(width - 1, y)) { queue.push(width - 1, y); visited[y * width + (width - 1)] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const idx = (cy * width + cx) * channels;
    data[idx + 3] = 0; // transparent!

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

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

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(outputPath);

  console.log(`✓ Made transparent: ${outputPath}`);
}

async function run() {
  const images = [
    'public/assets/desks/standing-oak.png',
    'public/assets/desks/walnut-executive.png',
    'public/assets/desks/white-minimal.png',
    'public/assets/desks/glass-corner.png',
    'public/assets/chairs/aeron.png',
    'public/assets/chairs/markus-mesh.png',
    'public/assets/chairs/gaming-racer.png',
    'public/assets/tech/4k-27.png',
    'public/assets/tech/ultrawide.png',
    'public/assets/accessories/laptop-stand.png',
    'public/assets/accessories/surfboard.png',
    'public/assets/accessories/screenbar.png',
    'public/assets/accessories/monstera.png',
  ];

  for (const img of images) {
    if (fs.existsSync(img)) {
      const tempPath = img + '.tmp.png';
      try {
        await removeBackgroundFloodFill(img, tempPath);
        fs.renameSync(tempPath, img);
      } catch (err) {
        console.error(`Error processing ${img}:`, err.message);
      }
    }
  }
}

run();
