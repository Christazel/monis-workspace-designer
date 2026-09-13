'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CatalogItem, Extra, WorkspaceState } from '@/lib/types';

interface WorkspaceCanvasProps {
  state: WorkspaceState;
}

// Desk visual color mapping
const DESK_COLORS: Record<string, { top: string; side: string; leg: string }> = {
  'desk-oak':   { top: '#c8a26c', side: '#a07850', leg: '#6b4c2a' },
  'desk-walnut':{ top: '#8b5e3c', side: '#6b4428', leg: '#4a2c14' },
  'desk-white': { top: '#f0f0ee', side: '#d8d8d5', leg: '#b0b0ae' },
  'desk-glass': { top: '#c8e8f5', side: '#9ec8e0', leg: '#6bacc8' },
  'default':    { top: '#c8a26c', side: '#a07850', leg: '#6b4c2a' },
};

const CHAIR_COLORS: Record<string, { body: string; seat: string }> = {
  'chair-aeron':  { body: '#1a1a2e', seat: '#16213e' },
  'chair-mesh':   { body: '#2d3748', seat: '#374151' },
  'chair-gaming': { body: '#7f1d1d', seat: '#991b1b' },
  'chair-stool':  { body: '#78350f', seat: '#92400e' },
  'default':      { body: '#1a1a2e', seat: '#16213e' },
};

export default function WorkspaceCanvas({ state }: WorkspaceCanvasProps) {
  const { selectedDesk, selectedChair, selectedAccessories, ambiance } = state;

  const deskColors = DESK_COLORS[selectedDesk?.id ?? 'default'];
  const chairColors = CHAIR_COLORS[selectedChair?.id ?? 'default'];

  const hasMonitor = selectedAccessories.some(a => a.id === 'acc-monitor-27');
  const hasUltrawide = selectedAccessories.some(a => a.id === 'acc-monitor-ultra');
  const hasLamp = selectedAccessories.some(a => a.id === 'acc-lamp');
  const hasPlant = selectedAccessories.some(a => a.id === 'acc-plant');
  const hasKeyboard = selectedAccessories.some(a => a.id === 'acc-keyboard');
  const hasWebcam = selectedAccessories.some(a => a.id === 'acc-webcam');

  const isNight = ambiance === 'night';

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-2xl transition-all duration-1000 ${
        isNight ? 'canvas-night' : 'canvas-day'
      }`}
    >
      {/* Ambient atmosphere overlay */}
      <AnimatePresence>
        {isNight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 600px 300px at 50% 60%, rgba(245,158,11,0.08) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Stars for night mode */}
      {isNight && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{ left: `${(i * 37 + 5) % 90}%`, top: `${(i * 23 + 3) % 40}%` }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      )}

      {/* Floating label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
        <h2 className={`text-lg font-bold tracking-tight ${isNight ? 'text-slate-200' : 'text-slate-700'}`}>
          Design Your Workspace!
        </h2>
        <p className={`text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
          — Create Your Perfect Setup —
        </p>
      </div>

      {/* Main SVG canvas */}
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Floor ellipse (platform) */}
        <ellipse cx="400" cy="420" rx="280" ry="50" fill={isNight ? '#1e293b' : '#e2e8f0'} opacity="0.6" />
        <ellipse cx="400" cy="420" rx="260" ry="44" fill={isNight ? '#0f172a' : '#cbd5e1'} opacity="0.5" />

        {/* Desk top (isometric-ish) */}
        <AnimatePresence mode="wait">
          <motion.g key={selectedDesk?.id ?? 'no-desk'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Desk top surface */}
            <rect x="220" y="250" width="360" height="12" rx="4"
              fill={selectedDesk ? deskColors.top : '#c8a26c'}
              opacity={selectedDesk ? 1 : 0.3}
            />
            {/* Desk front face */}
            <rect x="220" y="258" width="360" height="6" rx="2"
              fill={selectedDesk ? deskColors.side : '#a07850'}
              opacity={selectedDesk ? 1 : 0.3}
            />
            {/* Desk legs */}
            <rect x="235" y="264" width="10" height="80" rx="2"
              fill={selectedDesk ? deskColors.leg : '#6b4c2a'}
              opacity={selectedDesk ? 1 : 0.3}
            />
            <rect x="555" y="264" width="10" height="80" rx="2"
              fill={selectedDesk ? deskColors.leg : '#6b4c2a'}
              opacity={selectedDesk ? 1 : 0.3}
            />

            {/* Desk mat */}
            {hasKeyboard && (
              <rect x="290" y="244" width="200" height="8" rx="3" fill="#1e293b" opacity="0.7" />
            )}
          </motion.g>
        </AnimatePresence>

        {/* Monitor(s) */}
        <AnimatePresence>
          {hasUltrawide && (
            <motion.g
              key="ultrawide"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              style={{ transformOrigin: '400px 200px' }}
            >
              {/* Ultrawide screen */}
              <rect x="230" y="160" width="340" height="85" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="4" />
              <rect x="234" y="164" width="332" height="77" rx="4"
                fill={isNight ? '#1a3a5c' : '#1e40af'}
                opacity={isNight ? 0.9 : 0.7}
              />
              {/* Screen glow */}
              {isNight && (
                <rect x="234" y="164" width="332" height="77" rx="4"
                  fill="url(#screenGlow)" opacity="0.6"
                />
              )}
              {/* Monitor stand */}
              <rect x="392" y="245" width="16" height="12" rx="2" fill="#334155" />
              <rect x="378" y="255" width="44" height="4" rx="2" fill="#475569" />
              {/* Screen content lines */}
              <rect x="250" y="180" width="100" height="3" rx="1" fill="#60a5fa" opacity="0.6" />
              <rect x="250" y="188" width="140" height="2" rx="1" fill="#94a3b8" opacity="0.4" />
              <rect x="250" y="194" width="80" height="2" rx="1" fill="#94a3b8" opacity="0.4" />
            </motion.g>
          )}

          {hasMonitor && !hasUltrawide && (
            <motion.g
              key="monitor27"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
            >
              {/* 27" Monitor */}
              <rect x="300" y="165" width="200" height="80" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="3" />
              <rect x="303" y="168" width="194" height="74" rx="3"
                fill={isNight ? '#1a3a5c' : '#1e3a6e'}
                opacity={isNight ? 0.9 : 0.75}
              />
              {/* Monitor stand */}
              <rect x="392" y="245" width="16" height="12" rx="2" fill="#334155" />
              <rect x="380" y="255" width="40" height="4" rx="2" fill="#475569" />
              {/* Screen content */}
              <rect x="316" y="182" width="80" height="3" rx="1" fill="#60a5fa" opacity="0.6" />
              <rect x="316" y="190" width="120" height="2" rx="1" fill="#94a3b8" opacity="0.4" />
              <rect x="316" y="196" width="70" height="2" rx="1" fill="#94a3b8" opacity="0.4" />
            </motion.g>
          )}

          {!hasMonitor && !hasUltrawide && (
            <motion.g
              key="laptop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Laptop */}
              <rect x="330" y="208" width="140" height="45" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <rect x="334" y="212" width="132" height="37" rx="3"
                fill={isNight ? '#0f2a4a' : '#1e3a6e'}
                opacity="0.85"
              />
              {/* Laptop base */}
              <rect x="320" y="252" width="160" height="6" rx="3" fill="#2d3748" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* ScreenBar Lamp */}
        <AnimatePresence>
          {hasLamp && (
            <motion.g
              key="lamp"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <rect x="375" y="157" width="50" height="6" rx="3" fill="#f59e0b" />
              {isNight && (
                <ellipse cx="400" cy="185" rx="60" ry="20"
                  fill="rgba(245, 220, 100, 0.15)"
                />
              )}
            </motion.g>
          )}
        </AnimatePresence>

        {/* Keyboard + Mouse */}
        <AnimatePresence>
          {hasKeyboard && (
            <motion.g
              key="keyboard"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <rect x="320" y="245" width="110" height="8" rx="2" fill="#334155" />
              <rect x="438" y="246" width="18" height="18" rx="9" fill="#475569" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Plant */}
        <AnimatePresence>
          {hasPlant && (
            <motion.g
              key="plant"
              initial={{ opacity: 0, scale: 0, transformOrigin: '570px 240px' }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              {/* Pot */}
              <ellipse cx="570" cy="260" rx="18" ry="7" fill="#92400e" />
              <rect x="554" y="250" width="32" height="12" rx="3" fill="#78350f" />
              {/* Plant */}
              <ellipse cx="565" cy="238" rx="12" ry="14" fill="#15803d" />
              <ellipse cx="578" cy="233" rx="10" ry="12" fill="#16a34a" />
              <ellipse cx="570" cy="225" rx="8" ry="10" fill="#22c55e" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Webcam */}
        <AnimatePresence>
          {hasWebcam && (hasMonitor || hasUltrawide) && (
            <motion.g
              key="webcam"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <rect x="394" y="158" width="12" height="8" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Chair */}
        <AnimatePresence mode="wait">
          <motion.g
            key={selectedChair?.id ?? 'no-chair'}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chair back */}
            <rect x="362" y="285" width="76" height="80" rx="8"
              fill={selectedChair ? chairColors.body : '#1a1a2e'}
              opacity={selectedChair ? 1 : 0.3}
            />
            {/* Chair seat */}
            <rect x="352" y="355" width="96" height="24" rx="8"
              fill={selectedChair ? chairColors.seat : '#16213e'}
              opacity={selectedChair ? 1 : 0.3}
            />
            {/* Chair armrests */}
            <rect x="346" y="330" width="12" height="32" rx="4"
              fill={selectedChair ? chairColors.body : '#1a1a2e'}
              opacity={selectedChair ? 0.7 : 0.3}
            />
            <rect x="442" y="330" width="12" height="32" rx="4"
              fill={selectedChair ? chairColors.body : '#1a1a2e'}
              opacity={selectedChair ? 0.7 : 0.3}
            />
            {/* Chair pole */}
            <rect x="393" y="378" width="14" height="28" rx="3"
              fill="#4b5563"
              opacity={selectedChair ? 1 : 0.3}
            />
            {/* Chair base (5 spokes) */}
            {[-40, -15, 10, 35, 60].map((x, i) => (
              <rect key={i}
                x={360 + x} y="403" width="40" height="5" rx="2.5"
                fill="#374151"
                transform={`rotate(${i * 36}, 400, 405)`}
                opacity={selectedChair ? 1 : 0.3}
              />
            ))}
            {/* Casters */}
            <circle cx="400" cy="412" r="7" fill="#6b7280" opacity={selectedChair ? 0.8 : 0.3} />

            {/* Gaming chair headrest */}
            {selectedChair?.id === 'chair-gaming' && (
              <rect x="368" y="278" width="64" height="20" rx="8" fill="#991b1b" />
            )}
          </motion.g>
        </AnimatePresence>

        {/* Screen glow gradient def */}
        <defs>
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1e3a6e" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Prompt overlays when nothing selected */}
      {!selectedChair && !selectedDesk && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`text-sm ${isNight ? 'text-slate-400' : 'text-slate-500'}`}
          >
            👈 Select items from the left panel
          </motion.p>
        </div>
      )}

      {/* Plant hotspot button (right side add-on) */}
      {hasPlant && (
        <div className="absolute right-4 top-1/3 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 bg-green-900/60 border border-green-700/50 rounded-full px-2 py-1 text-[10px] text-green-300"
          >
            🌿 Plant added
          </motion.div>
        </div>
      )}
    </div>
  );
}
