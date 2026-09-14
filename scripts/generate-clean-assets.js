const sharp = require('sharp');
const fs = require('fs');

async function generateAssets() {
  // 1. Logitech Brio 4K Webcam
  const webcamSvg = `
  <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#374151"/>
        <stop offset="50%" stop-color="#1f2937"/>
        <stop offset="100%" stop-color="#111827"/>
      </linearGradient>
      <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="50%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <radialGradient id="lensGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
        <stop offset="40%" stop-color="#0369a1"/>
        <stop offset="80%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#020617"/>
      </radialGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="24" stdDeviation="32" flood-color="#000" flood-opacity="0.35"/>
      </filter>
    </defs>
    <!-- Stand / Clip Base -->
    <path d="M 470 540 L 554 540 L 564 740 L 460 740 Z" fill="#1e293b" filter="url(#shadow)"/>
    <rect x="440" y="720" width="144" height="44" rx="12" fill="#0f172a" filter="url(#shadow)"/>
    <path d="M 450 760 L 574 760 L 560 830 L 464 830 Z" fill="#1e293b"/>
    
    <!-- Main Webcam Body -->
    <rect x="212" y="380" width="600" height="160" rx="80" fill="url(#bodyGrad)" filter="url(#shadow)"/>
    <!-- Glass Front Face -->
    <rect x="232" y="400" width="560" height="120" rx="60" fill="url(#glassGrad)"/>
    
    <!-- Center 4K Lens Ring -->
    <circle cx="512" cy="460" r="48" fill="#334155" stroke="#64748b" stroke-width="4"/>
    <circle cx="512" cy="460" r="38" fill="url(#lensGrad)"/>
    <circle cx="500" cy="448" r="10" fill="#ffffff" opacity="0.6"/>
    <circle cx="524" cy="472" r="4" fill="#38bdf8" opacity="0.8"/>
    
    <!-- Stereo Mic Grilles & Sensors -->
    <circle cx="340" cy="460" r="6" fill="#475569"/>
    <circle cx="360" cy="460" r="6" fill="#475569"/>
    <circle cx="664" cy="460" r="6" fill="#475569"/>
    <circle cx="684" cy="460" r="6" fill="#475569"/>
    <!-- 4K Status LED -->
    <circle cx="420" cy="460" r="5" fill="#38bdf8"/>
  </svg>
  `;
  await sharp(Buffer.from(webcamSvg)).png().toFile('public/assets/tech/webcam-4k.png');
  console.log('✓ Created webcam-4k.png');

  // 2. Keychron Mechanical Keyboard + Mouse
  const keyboardSvg = `
  <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="kbShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#000" flood-opacity="0.3"/>
      </filter>
      <linearGradient id="caseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#374151"/>
        <stop offset="100%" stop-color="#111827"/>
      </linearGradient>
      <linearGradient id="keyDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#4b5563"/>
        <stop offset="100%" stop-color="#1f2937"/>
      </linearGradient>
      <linearGradient id="keyLight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#9ca3af"/>
        <stop offset="100%" stop-color="#6b7280"/>
      </linearGradient>
    </defs>
    <!-- Keyboard Body -->
    <rect x="110" y="340" width="560" height="340" rx="20" fill="url(#caseGrad)" filter="url(#kbShadow)"/>
    <rect x="126" y="356" width="528" height="308" rx="12" fill="#0f172a"/>

    <!-- Key Rows -->
    <!-- Row 1: Esc, F-keys -->
    <rect x="136" y="368" width="34" height="36" rx="6" fill="#f97316"/>
    <rect x="178" y="368" width="34" height="36" rx="6" fill="url(#keyDark)"/>
    <rect x="220" y="368" width="34" height="36" rx="6" fill="url(#keyDark)"/>
    <rect x="262" y="368" width="34" height="36" rx="6" fill="url(#keyDark)"/>
    <rect x="304" y="368" width="34" height="36" rx="6" fill="url(#keyDark)"/>
    <rect x="354" y="368" width="34" height="36" rx="6" fill="url(#keyDark)"/>
    <rect x="396" y="368" width="34" height="36" rx="6" fill="url(#keyDark)"/>
    <rect x="438" y="368" width="34" height="36" rx="6" fill="url(#keyDark)"/>
    <rect x="480" y="368" width="34" height="36" rx="6" fill="url(#keyDark)"/>
    <rect x="530" y="368" width="34" height="36" rx="6" fill="url(#keyDark)"/>
    <rect x="572" y="368" width="34" height="36" rx="6" fill="url(#keyDark)"/>
    <rect x="614" y="368" width="30" height="36" rx="6" fill="#f97316"/>

    <!-- Row 2 -->
    <rect x="136" y="414" width="40" height="38" rx="6" fill="url(#keyLight)"/>
    <rect x="182" y="414" width="34" height="38" rx="6" fill="url(#keyLight)"/>
    <rect x="222" y="414" width="34" height="38" rx="6" fill="url(#keyLight)"/>
    <rect x="262" y="414" width="34" height="38" rx="6" fill="url(#keyLight)"/>
    <rect x="302" y="414" width="34" height="38" rx="6" fill="url(#keyLight)"/>
    <rect x="342" y="414" width="34" height="38" rx="6" fill="url(#keyLight)"/>
    <rect x="382" y="414" width="34" height="38" rx="6" fill="url(#keyLight)"/>
    <rect x="422" y="414" width="34" height="38" rx="6" fill="url(#keyLight)"/>
    <rect x="462" y="414" width="34" height="38" rx="6" fill="url(#keyLight)"/>
    <rect x="502" y="414" width="34" height="38" rx="6" fill="url(#keyLight)"/>
    <rect x="542" y="414" width="50" height="38" rx="6" fill="url(#keyDark)"/>
    <rect x="600" y="414" width="44" height="38" rx="6" fill="url(#keyDark)"/>

    <!-- Row 3 -->
    <rect x="136" y="462" width="50" height="38" rx="6" fill="url(#keyDark)"/>
    <rect x="192" y="462" width="340" height="38" rx="6" fill="url(#keyLight)"/>
    <rect x="538" y="462" width="54" height="38" rx="6" fill="#f97316"/>
    <rect x="600" y="462" width="44" height="38" rx="6" fill="url(#keyDark)"/>

    <!-- Row 4 Spacebar -->
    <rect x="136" y="510" width="60" height="40" rx="6" fill="url(#keyDark)"/>
    <rect x="204" y="510" width="280" height="40" rx="6" fill="url(#keyLight)"/>
    <rect x="492" y="510" width="50" height="40" rx="6" fill="url(#keyDark)"/>
    <rect x="550" y="510" width="44" height="40" rx="6" fill="url(#keyDark)"/>
    <rect x="600" y="510" width="44" height="40" rx="6" fill="url(#keyDark)"/>

    <!-- Ergonomic Wireless Mouse (MX Master Style) -->
    <path d="M 760 380 C 810 380, 850 430, 850 510 C 850 610, 810 680, 760 680 C 720 680, 695 620, 695 560 C 695 490, 720 380, 760 380 Z" fill="url(#caseGrad)" filter="url(#kbShadow)"/>
    <!-- Mouse thumb rest -->
    <path d="M 710 520 C 665 540, 665 620, 715 640 Z" fill="#1e293b"/>
    <!-- Scroll wheel cutout & metal wheel -->
    <rect x="752" y="410" width="16" height="56" rx="8" fill="#94a3b8"/>
    <line x1="750" y1="476" x2="770" y2="476" stroke="#334155" stroke-width="2"/>
  </svg>
  `;
  await sharp(Buffer.from(keyboardSvg)).png().toFile('public/assets/tech/keyboard-mouse.png');
  console.log('✓ Created keyboard-mouse.png');

  // 3. De'Longhi Dedica Espresso Machine
  const espressoSvg = `
  <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="espShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#000" flood-opacity="0.3"/>
      </filter>
      <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#94a3b8"/>
        <stop offset="30%" stop-color="#f1f5f9"/>
        <stop offset="70%" stop-color="#cbd5e1"/>
        <stop offset="100%" stop-color="#64748b"/>
      </linearGradient>
    </defs>
    <!-- Machine Base -->
    <rect x="360" y="780" width="304" height="44" rx="10" fill="#1e293b" filter="url(#espShadow)"/>
    <rect x="380" y="750" width="264" height="34" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
    
    <!-- Main Body Tower -->
    <rect x="400" y="240" width="224" height="510" rx="16" fill="url(#steelGrad)" filter="url(#espShadow)"/>
    
    <!-- Top Chrome Cup Warmer -->
    <rect x="392" y="210" width="240" height="34" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/>
    
    <!-- Pressure Gauge / Center Dial -->
    <circle cx="512" cy="340" r="42" fill="#ffffff" stroke="#475569" stroke-width="6"/>
    <circle cx="512" cy="340" r="32" fill="#f8fafc"/>
    <line x1="512" y1="340" x2="526" y2="320" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
    <circle cx="512" cy="340" r="4" fill="#1e293b"/>
    
    <!-- Brew Group Head -->
    <rect x="452" y="440" width="120" height="34" rx="6" fill="#1e293b"/>
    
    <!-- Portafilter Handle (Chrome & Black Handle) -->
    <path d="M 512 470 L 512 510 L 480 510 L 480 470 Z" fill="url(#steelGrad)"/>
    <!-- Handle extending right -->
    <rect x="510" y="486" width="160" height="22" rx="11" fill="#0f172a" stroke="#334155" stroke-width="2" filter="url(#espShadow)"/>
    
    <!-- Double Spout -->
    <circle cx="496" cy="524" r="6" fill="url(#steelGrad)"/>
    <circle cx="528" cy="524" r="6" fill="url(#steelGrad)"/>
    
    <!-- Steam Wand -->
    <path d="M 590 440 L 616 520 L 606 630" fill="none" stroke="#e2e8f0" stroke-width="10" stroke-linecap="round"/>
    <circle cx="606" cy="634" r="8" fill="#1e293b"/>
    
    <!-- Dual Ceramic Espresso Cups on Drip Tray -->
    <rect x="456" y="650" width="50" height="44" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="518" y="650" width="50" height="44" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  </svg>
  `;
  await sharp(Buffer.from(espressoSvg)).png().toFile('public/assets/accessories/espresso.png');
  console.log('✓ Created espresso.png');

  // 4. Bali Villa Linen Bean Bag
  const beanBagSvg = `
  <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="bbShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="28" stdDeviation="36" flood-color="#000" flood-opacity="0.3"/>
      </filter>
      <radialGradient id="linenGrad" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#475569"/>
        <stop offset="70%" stop-color="#334155"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </radialGradient>
      <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#b45309"/>
        <stop offset="100%" stop-color="#78350f"/>
      </linearGradient>
    </defs>
    <!-- Leather Handle at Top -->
    <path d="M 480 310 C 480 260, 544 260, 544 310 Z" fill="url(#leatherGrad)" stroke="#92400e" stroke-width="4"/>
    
    <!-- Organic Bean Bag Body -->
    <path d="M 512 300 C 640 380, 780 500, 780 660 C 780 780, 680 820, 512 820 C 344 820, 244 780, 244 660 C 244 500, 384 380, 512 300 Z" fill="url(#linenGrad)" filter="url(#bbShadow)"/>
    
    <!-- Natural Fabric Seam & Creases -->
    <path d="M 512 300 Q 520 540, 512 820" fill="none" stroke="#1e293b" stroke-width="5" opacity="0.6"/>
    <path d="M 380 480 Q 450 560, 380 680" fill="none" stroke="#1e293b" stroke-width="4" opacity="0.4"/>
    <path d="M 640 480 Q 570 560, 640 680" fill="none" stroke="#1e293b" stroke-width="4" opacity="0.4"/>
    
    <!-- Deep Sitting Indentation Cushion -->
    <ellipse cx="512" cy="640" rx="160" ry="80" fill="#1e293b" opacity="0.35"/>
  </svg>
  `;
  await sharp(Buffer.from(beanBagSvg)).png().toFile('public/assets/accessories/bean-bag.png');
  console.log('✓ Created bean-bag.png');
}

generateAssets().catch(console.error);
