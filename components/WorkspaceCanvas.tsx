'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { WorkspaceState } from '@/lib/types';

interface WorkspaceCanvasProps {
  state: WorkspaceState;
}

const DESK_STYLES: Record<string, { top: string; topDark: string; side: string; leg: string }> = {
  'desk-oak':    { top: '#d4a574', topDark: '#b8895a', side: '#9a6e45', leg: '#7a5232' },
  'desk-walnut': { top: '#8b5e3c', topDark: '#6e4828', side: '#573a1e', leg: '#3d2710' },
  'desk-white':  { top: '#f5f5f3', topDark: '#e8e8e5', side: '#d0d0cc', leg: '#b8b8b4' },
  'desk-glass':  { top: '#b8dcf0', topDark: '#90c4e0', side: '#7ab0d0', leg: '#5a9ab8' },
};

const CHAIR_STYLES: Record<string, { back: string; backLight: string; seat: string }> = {
  'chair-aeron':  { back: '#1e293b', backLight: '#334155', seat: '#0f172a' },
  'chair-mesh':   { back: '#374151', backLight: '#4b5563', seat: '#1f2937' },
  'chair-gaming': { back: '#7f1d1d', backLight: '#991b1b', seat: '#6b1515' },
  'chair-stool':  { back: '#78350f', backLight: '#92400e', seat: '#5c280a' },
};

export default function WorkspaceCanvas({ state }: WorkspaceCanvasProps) {
  const { selectedDesk, selectedChair, selectedAccessories, ambiance } = state;

  const dk = DESK_STYLES[selectedDesk?.id ?? ''] ?? DESK_STYLES['desk-oak'];
  const ck = CHAIR_STYLES[selectedChair?.id ?? ''] ?? CHAIR_STYLES['chair-aeron'];

  const has27 = selectedAccessories.some(a => a.id === 'acc-monitor-27');
  const hasUW = selectedAccessories.some(a => a.id === 'acc-monitor-ultra');
  const hasLamp = selectedAccessories.some(a => a.id === 'acc-lamp');
  const hasPlant = selectedAccessories.some(a => a.id === 'acc-plant');
  const hasKbd = selectedAccessories.some(a => a.id === 'acc-keyboard');
  const hasCam = selectedAccessories.some(a => a.id === 'acc-webcam');

  const isNight = ambiance === 'night';
  const hasDesk = !!selectedDesk;
  const hasChair = !!selectedChair;

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-2xl transition-all duration-1000 ${isNight ? 'canvas-night' : 'canvas-day'}`}
      style={{ boxShadow: 'inset 0 0 80px rgba(0,0,0,0.15)' }}
    >
      {/* Night overlay glow */}
      <AnimatePresence>
        {isNight && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 55%, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
          />
        )}
      </AnimatePresence>

      {/* Stars */}
      {isNight && [...Array(24)].map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 2 : 1,
            height: i % 3 === 0 ? 2 : 1,
            background: '#fff',
            left: `${(i * 41 + 7) % 88}%`,
            top: `${(i * 19 + 3) % 38}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.15 }}
        />
      ))}

      {/* Title */}
      <div className="absolute top-4 inset-x-0 text-center pointer-events-none z-10">
        <h2 className="text-xl font-black tracking-tight"
          style={{ color: isNight ? '#e2e8f0' : '#1e3a5f', textShadow: isNight ? '0 2px 20px rgba(0,0,0,0.8)' : '0 1px 4px rgba(255,255,255,0.6)' }}
        >
          Design Your Workspace!
        </h2>
        <p className="text-xs font-medium mt-1"
          style={{ color: isNight ? '#64748b' : '#5b86a0' }}
        >
          — Create Your Perfect Setup —
        </p>
      </div>

      {/* ══ SVG Canvas ══ */}
      <svg viewBox="0 0 800 520" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Desk surface gradient */}
          <linearGradient id="deskTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={hasDesk ? dk.top : '#c8a26c'} stopOpacity={hasDesk ? 1 : 0.25} />
            <stop offset="100%" stopColor={hasDesk ? dk.topDark : '#a07850'} stopOpacity={hasDesk ? 1 : 0.25} />
          </linearGradient>
          {/* Platform gradient */}
          <radialGradient id="platform" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isNight ? '#1e293b' : '#cbd5e1'} stopOpacity="0.8" />
            <stop offset="100%" stopColor={isNight ? '#0f172a' : '#94a3b8'} stopOpacity="0" />
          </radialGradient>
          {/* Screen glow */}
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e3a6e" stopOpacity="0" />
          </radialGradient>
          {/* Chair back gradient */}
          <linearGradient id="chairBack" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={hasChair ? ck.backLight : '#334155'} stopOpacity={hasChair ? 1 : 0.25} />
            <stop offset="100%" stopColor={hasChair ? ck.back : '#1e293b'} stopOpacity={hasChair ? 1 : 0.25} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.35" />
          </filter>
          <filter id="monitorGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Platform / floor shadow */}
        <ellipse cx="400" cy="435" rx="295" ry="48" fill="url(#platform)" />
        <ellipse cx="400" cy="432" rx="240" ry="32" fill={isNight ? '#0f172a' : '#e2e8f0'} opacity="0.4" />

        {/* ── DESK ── */}
        <AnimatePresence mode="wait">
          <motion.g key={selectedDesk?.id ?? 'empty-desk'}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            filter="url(#shadow)"
          >
            {/* Desk top surface */}
            <rect x="195" y="252" width="410" height="16" rx="5" fill="url(#deskTop)" />
            {/* Desk front edge */}
            <rect x="195" y="266" width="410" height="8" rx="3"
              fill={hasDesk ? dk.side : '#9a8060'} opacity={hasDesk ? 1 : 0.25}
            />
            {/* Legs */}
            {[[210, 34], [560, 34]].map(([x, w], i) => (
              <rect key={i} x={x} y="274" width={w === 34 ? 14 : 14} height="90" rx="3"
                fill={hasDesk ? dk.leg : '#7a6040'} opacity={hasDesk ? 1 : 0.25}
              />
            ))}
            {/* Desk mat */}
            {hasKbd && (
              <rect x="275" y="246" width="220" height="10" rx="4" fill="#0f172a" opacity="0.65" />
            )}
          </motion.g>
        </AnimatePresence>

        {/* ── MONITORS ── */}
        <AnimatePresence>
          {hasUW && (
            <motion.g key="ultrawide"
              initial={{ opacity: 0, scaleX: 0.6, y: 10 }} animate={{ opacity: 1, scaleX: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ transformOrigin: '400px 205px' }}
            >
              {/* Screen bezel */}
              <rect x="205" y="158" width="390" height="92" rx="8" fill="#0a0f1a" stroke="#1e3a5c" strokeWidth="3" />
              {/* Screen content */}
              <rect x="209" y="162" width="382" height="84" rx="6"
                fill={isNight ? '#0d2240' : '#1a3a7a'} opacity="0.9"
              />
              {/* Screen glow fill */}
              {isNight && <rect x="209" y="162" width="382" height="84" rx="6" fill="url(#screenGlow)" opacity="0.4" />}
              {/* UI lines */}
              <rect x="226" y="178" width="90" height="3" rx="1.5" fill="#60a5fa" opacity="0.7" />
              <rect x="226" y="186" width="140" height="2" rx="1" fill="#94a3b8" opacity="0.4" />
              <rect x="226" y="193" width="70" height="2" rx="1" fill="#94a3b8" opacity="0.3" />
              {/* Fake code */}
              <rect x="340" y="175" width="60" height="4" rx="2" fill="#a78bfa" opacity="0.5" />
              <rect x="340" y="184" width="40" height="3" rx="1.5" fill="#34d399" opacity="0.5" />
              <rect x="340" y="192" width="80" height="3" rx="1.5" fill="#fb923c" opacity="0.4" />
              {/* Stand */}
              <rect x="388" y="250" width="24" height="10" rx="3" fill="#1e293b" />
              <rect x="373" y="258" width="54" height="5" rx="2.5" fill="#334155" />
              {/* Webcam */}
              {hasCam && <circle cx="400" cy="161" r="5" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />}
            </motion.g>
          )}

          {has27 && !hasUW && (
            <motion.g key="monitor27"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              <rect x="290" y="160" width="220" height="90" rx="7" fill="#0a0f1a" stroke="#1e3a5c" strokeWidth="3" />
              <rect x="294" y="164" width="212" height="82" rx="5"
                fill={isNight ? '#0d2240' : '#1a3a7a'} opacity="0.9"
              />
              {isNight && <rect x="294" y="164" width="212" height="82" rx="5" fill="url(#screenGlow)" opacity="0.35" />}
              <rect x="308" y="178" width="70" height="3" rx="1.5" fill="#60a5fa" opacity="0.7" />
              <rect x="308" y="186" width="110" height="2" rx="1" fill="#94a3b8" opacity="0.4" />
              <rect x="308" y="193" width="55" height="2" rx="1" fill="#94a3b8" opacity="0.3" />
              <rect x="308" y="250" width="184" height="6" rx="3" fill="none" />
              <rect x="391" y="250" width="18" height="10" rx="3" fill="#1e293b" />
              <rect x="380" y="258" width="40" height="5" rx="2.5" fill="#334155" />
              {hasCam && <circle cx="400" cy="163" r="5" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />}
            </motion.g>
          )}

          {!has27 && !hasUW && (
            <motion.g key="laptop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {/* Laptop screen */}
              <rect x="320" y="207" width="160" height="46" rx="5" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
              <rect x="323" y="210" width="154" height="40" rx="4"
                fill={isNight ? '#0a1a2e' : '#1a3260'} opacity="0.9"
              />
              {isNight && <rect x="323" y="210" width="154" height="40" rx="4" fill="url(#screenGlow)" opacity="0.25" />}
              {/* Laptop hinge + base */}
              <rect x="312" y="252" width="176" height="7" rx="3.5" fill="#1e293b" />
              {/* keyboard texture */}
              {[0,1,2,3,4].map(row => (
                [0,1,2,3,4,5].map(col => (
                  <rect key={`k${row}${col}`} x={325 + col*22} y={256 + row*0} width="16" height="2" rx="1" fill="#334155" opacity="0.5" />
                ))
              ))}
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── SCREENBAR LAMP ── */}
        <AnimatePresence>
          {hasLamp && (
            <motion.g key="lamp"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              {/* bar */}
              <rect x="365" y="153" width="70" height="7" rx="3.5"
                fill="#f59e0b" opacity="0.9"
                style={{ filter: isNight ? 'drop-shadow(0 2px 8px rgba(245,158,11,0.6))' : 'none' }}
              />
              {/* clip */}
              <rect x="393" y="157" width="14" height="8" rx="3" fill="#78350f" />
              {/* glow cone */}
              {isNight && (
                <ellipse cx="400" cy="200" rx="80" ry="25" fill="rgba(251,191,36,0.08)" />
              )}
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── KEYBOARD + MOUSE ── */}
        <AnimatePresence>
          {hasKbd && (
            <motion.g key="kbd"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              <rect x="300" y="244" width="130" height="9" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
              {/* Key rows */}
              {[0,1,2].map(row => (
                [0,1,2,3,4,5,6,7].map(col => (
                  <rect key={`r${row}c${col}`} x={305 + col*15} y={245.5 + row*2} width="13" height="1.5" rx="0.75" fill="#475569" opacity="0.6" />
                ))
              ))}
              {/* Mouse */}
              <ellipse cx="450" cy="248" rx="11" ry="14" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
              <line x1="450" y1="238" x2="450" y2="244" stroke="#475569" strokeWidth="0.5" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── PLANT ── */}
        <AnimatePresence>
          {hasPlant && (
            <motion.g key="plant"
              initial={{ opacity: 0, scale: 0, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0 }}
              style={{ transformOrigin: '580px 255px' }}
            >
              {/* Pot */}
              <ellipse cx="580" cy="265" rx="15" ry="5" fill="#92400e" opacity="0.8" />
              <path d="M566 255 Q568 268 580 268 Q592 268 594 255 Z" fill="#78350f" />
              <ellipse cx="580" cy="255" rx="14" ry="4" fill="#92400e" />
              {/* Stems & leaves */}
              <line x1="580" y1="254" x2="578" y2="238" stroke="#15803d" strokeWidth="2" />
              <ellipse cx="572" cy="236" rx="12" ry="9" fill="#15803d" transform="rotate(-20,572,236)" />
              <ellipse cx="584" cy="232" rx="11" ry="8" fill="#16a34a" transform="rotate(10,584,232)" />
              <ellipse cx="576" cy="226" rx="9" ry="7" fill="#22c55e" />
              <ellipse cx="582" cy="222" rx="7" ry="6" fill="#4ade80" opacity="0.8" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── CHAIR ── */}
        <AnimatePresence mode="wait">
          <motion.g key={selectedChair?.id ?? 'empty-chair'}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            filter="url(#shadow)"
          >
            {/* Gaming chair headrest */}
            {selectedChair?.id === 'chair-gaming' && (
              <rect x="365" y="275" width="70" height="22" rx="10"
                fill={ck.backLight} opacity="0.9"
              />
            )}
            {/* Chair backrest */}
            <rect x="360" y="292" width="80" height="85" rx="10" fill="url(#chairBack)" opacity={hasChair ? 1 : 0.2} />
            {/* Backrest padding lines */}
            {hasChair && [310, 330, 350, 360].map((y, i) => (
              <rect key={i} x="366" y={y} width="68" height="2.5" rx="1.25" fill="#fff" opacity="0.05" />
            ))}
            {/* Seat */}
            <rect x="348" y="370" width="104" height="26" rx="10" fill={hasChair ? ck.seat : '#0f172a'} opacity={hasChair ? 1 : 0.2} />
            {/* Seat cushion highlight */}
            {hasChair && <rect x="355" y="372" width="90" height="8" rx="5" fill="#fff" opacity="0.05" />}
            {/* Armrests */}
            {[[-20, 332], [80, 332]].map(([dx, y], i) => (
              <rect key={i} x={348 + Number(dx)} y={y} width="14" height="38" rx="5"
                fill={hasChair ? ck.back : '#1e293b'} opacity={hasChair ? 0.8 : 0.2}
              />
            ))}
            {/* Cylinder pole */}
            <rect x="391" y="396" width="18" height="35" rx="4" fill="#374151" opacity={hasChair ? 1 : 0.2} />
            {/* Star base */}
            {[-72, -36, 0, 36, 72].map((angle, i) => (
              <rect key={i} x="378" y="428" width="44" height="6" rx="3"
                fill="#4b5563" opacity={hasChair ? 0.9 : 0.2}
                transform={`rotate(${angle}, 400, 431)`}
              />
            ))}
            {/* Caster */}
            <ellipse cx="400" cy="435" rx="10" ry="5" fill="#6b7280" opacity={hasChair ? 0.8 : 0.2} />
          </motion.g>
        </AnimatePresence>

        {/* Empty state hint */}
        {!hasDesk && !hasChair && (
          <text x="400" y="460" textAnchor="middle" fontSize="12" fill={isNight ? '#475569' : '#94a3b8'} fontFamily="Inter,sans-serif">
            👈 Select items from the left panel
          </text>
        )}
      </svg>

      {/* Night mode screen glow ambient */}
      {isNight && (has27 || hasUW) && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 30% at 50% 38%, rgba(59,130,246,0.07) 0%, transparent 60%)' }}
        />
      )}
    </div>
  );
}
