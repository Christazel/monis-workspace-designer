'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, X, Layers, Sun, Moon } from 'lucide-react';
import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';
import { formatMonthlyRate } from '@/data/products';

// ─── Framer Motion variants ────────────────────────────────────────────────
const itemVariants = {
  hidden:  { opacity: 0, scale: 0.85, y: 12 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.32, ease: 'easeOut' as const } },
  exit:    { opacity: 0, scale: 0.85, y: 12, transition: { duration: 0.2,  ease: 'easeIn'  as const } },
};


// ─── SVG Illustrations ─────────────────────────────────────────────────────

/* DESKS */
function DeskMinimal({ width = 220 }: { width?: number }) {
  return (
    <svg width={width} viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Surface */}
      <rect x="4" y="8" width="212" height="18" rx="4" fill="#f0ede6" stroke="#d4cfc6" strokeWidth="1.2"/>
      {/* Legs */}
      <rect x="14" y="26" width="8" height="48" rx="3" fill="#d4cfc6"/>
      <rect x="198" y="26" width="8" height="48" rx="3" fill="#d4cfc6"/>
      {/* Foot bars */}
      <rect x="10" y="70" width="16" height="5" rx="2.5" fill="#c4bfb6"/>
      <rect x="194" y="70" width="16" height="5" rx="2.5" fill="#c4bfb6"/>
      {/* Shadow */}
      <ellipse cx="110" cy="78" rx="90" ry="4" fill="rgba(0,0,0,0.25)"/>
    </svg>
  );
}

function DeskStanding({ width = 220 }: { width?: number }) {
  return (
    <svg width={width} viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Electric column left */}
      <rect x="16" y="20" width="14" height="62" rx="4" fill="#374151"/>
      <rect x="18" y="30" width="10" height="4" rx="2" fill="#4b5563"/>
      <rect x="18" y="38" width="10" height="4" rx="2" fill="#22c55e" opacity="0.8"/>
      {/* Electric column right */}
      <rect x="190" y="20" width="14" height="62" rx="4" fill="#374151"/>
      <rect x="192" y="30" width="10" height="4" rx="2" fill="#4b5563"/>
      {/* Solid oak surface */}
      <rect x="4" y="8" width="212" height="20" rx="5" fill="#a0785a"/>
      <rect x="4" y="8" width="212" height="8" rx="5" fill="#b08868"/>
      {/* Grain lines */}
      <line x1="40" y1="10" x2="40" y2="26" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <line x1="80" y1="10" x2="80" y2="26" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <line x1="130" y1="10" x2="130" y2="26" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <line x1="175" y1="10" x2="175" y2="26" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {/* Cable tray under surface */}
      <rect x="50" y="28" width="120" height="6" rx="3" fill="#2d3748"/>
      {/* Foot base */}
      <rect x="6" y="78" width="28" height="8" rx="4" fill="#2d3748"/>
      <rect x="186" y="78" width="28" height="8" rx="4" fill="#2d3748"/>
      {/* Shadow */}
      <ellipse cx="110" cy="88" rx="95" ry="4" fill="rgba(0,0,0,0.3)"/>
    </svg>
  );
}

function DeskExecutive({ width = 240 }: { width?: number }) {
  return (
    <svg width={width} viewBox="0 0 240 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main surface - dark walnut */}
      <rect x="2" y="6" width="236" height="22" rx="6" fill="#5c3d2e"/>
      <rect x="2" y="6" width="236" height="9" rx="6" fill="#6e4a38"/>
      {/* Wood grain */}
      <line x1="50" y1="8" x2="50" y2="28" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
      <line x1="100" y1="8" x2="100" y2="28" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
      <line x1="150" y1="8" x2="150" y2="28" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
      <line x1="200" y1="8" x2="200" y2="28" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
      {/* Left drawer unit */}
      <rect x="10" y="28" width="50" height="48" rx="4" fill="#4a3024"/>
      <rect x="14" y="34" width="42" height="18" rx="3" fill="#3d2519" stroke="#5c3d2e" strokeWidth="0.8"/>
      <circle cx="35" cy="43" r="3" fill="#a0785a"/>
      <rect x="14" y="56" width="42" height="16" rx="3" fill="#3d2519" stroke="#5c3d2e" strokeWidth="0.8"/>
      <circle cx="35" cy="64" r="3" fill="#a0785a"/>
      {/* Right leg */}
      <rect x="180" y="28" width="14" height="56" rx="4" fill="#4a3024"/>
      {/* USB-C port indicator */}
      <rect x="196" y="42" width="30" height="6" rx="3" fill="#1a1a2e"/>
      <rect x="198" y="43" width="8" height="4" rx="1" fill="#3b82f6" opacity="0.7"/>
      <rect x="208" y="43" width="8" height="4" rx="1" fill="#10b981" opacity="0.7"/>
      {/* Foot */}
      <rect x="6" y="78" width="228" height="8" rx="4" fill="#3a2518"/>
      {/* Shadow */}
      <ellipse cx="120" cy="88" rx="100" ry="4" fill="rgba(0,0,0,0.3)"/>
    </svg>
  );
}

function DeskGlassCorner({ width = 240 }: { width?: number }) {
  return (
    <svg width={width} viewBox="0 0 240 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glass top */}
      <rect x="2" y="6" width="236" height="18" rx="4" fill="rgba(148,190,220,0.25)" stroke="rgba(148,190,220,0.5)" strokeWidth="1.5"/>
      <rect x="2" y="6" width="236" height="7" rx="4" fill="rgba(200,230,255,0.2)"/>
      {/* Reflection */}
      <rect x="20" y="8" width="60" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
      {/* Chrome frame */}
      <rect x="2" y="22" width="236" height="3" rx="1.5" fill="rgba(200,200,200,0.5)"/>
      {/* Chrome legs */}
      <rect x="18" y="25" width="8" height="56" rx="3" fill="#9ca3af"/>
      <rect x="214" y="25" width="8" height="56" rx="3" fill="#9ca3af"/>
      <rect x="110" y="25" width="8" height="56" rx="3" fill="#9ca3af"/>
      {/* Monitor riser platform */}
      <rect x="80" y="18" width="80" height="6" rx="3" fill="rgba(148,190,220,0.3)" stroke="rgba(148,190,220,0.4)" strokeWidth="1"/>
      {/* Foot crossbar */}
      <rect x="14" y="77" width="212" height="6" rx="3" fill="#9ca3af" opacity="0.6"/>
      {/* Shadow */}
      <ellipse cx="120" cy="86" rx="100" ry="4" fill="rgba(0,0,0,0.25)"/>
    </svg>
  );
}

/* CHAIRS */
function ChairAeron({ height = 160 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lumbar back frame */}
      <path d="M28 38 Q60 20 92 38 L88 110 Q60 120 32 110 Z" fill="#1f2937" stroke="#374151" strokeWidth="1.2"/>
      {/* Mesh pattern backrest */}
      {[44, 52, 60, 68, 76, 84, 92, 100].map((y, i) => (
        <line key={`h${i}`} x1="33" y1={y} x2="87" y2={y} stroke="#374151" strokeWidth="0.8" opacity="0.7"/>
      ))}
      {[38, 46, 54, 62, 70, 78, 86].map((x, i) => (
        <line key={`v${i}`} x1={x} y1="42" x2={x} y2="108" stroke="#374151" strokeWidth="0.8" opacity="0.7"/>
      ))}
      {/* PostureFit lumbar arch */}
      <path d="M38 105 Q60 115 82 105" stroke="#4b5563" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Seat */}
      <ellipse cx="60" cy="118" rx="32" ry="12" fill="#111827" stroke="#374151" strokeWidth="1.2"/>
      <ellipse cx="60" cy="116" rx="28" ry="9" fill="#1f2937"/>
      {/* Armrests */}
      <rect x="18" y="100" width="10" height="22" rx="4" fill="#374151"/>
      <rect x="14" y="120" width="18" height="6" rx="3" fill="#4b5563"/>
      <rect x="92" y="100" width="10" height="22" rx="4" fill="#374151"/>
      <rect x="88" y="120" width="18" height="6" rx="3" fill="#4b5563"/>
      {/* Gas cylinder */}
      <rect x="55" y="130" width="10" height="22" rx="4" fill="#6b7280"/>
      {/* 5-star base */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 60 + 34 * Math.sin(rad);
        const y2 = 162 + 12 * Math.cos(rad) * 0.4;
        return <line key={i} x1="60" y1="155" x2={x2} y2={y2} stroke="#374151" strokeWidth="5" strokeLinecap="round"/>;
      })}
      {/* Casters */}
      <circle cx="60" cy="155" r="4" fill="#374151"/>
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + 34 * Math.sin(rad);
        const cy = 162 + 12 * Math.cos(rad) * 0.4;
        return <ellipse key={i} cx={cx} cy={cy} rx="4" ry="3" fill="#1f2937" stroke="#4b5563" strokeWidth="0.8"/>;
      })}
      {/* Shadow */}
      <ellipse cx="60" cy="174" rx="38" ry="5" fill="rgba(0,0,0,0.3)"/>
    </svg>
  );
}

function ChairMesh({ height = 160 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* High back headrest */}
      <rect x="34" y="12" width="52" height="24" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="1"/>
      <rect x="38" y="16" width="44" height="16" rx="5" fill="#111827"/>
      {/* Backrest frame */}
      <path d="M30 36 Q60 22 90 36 L86 108 Q60 118 34 108 Z" fill="#1f2937" stroke="#374151" strokeWidth="1"/>
      {/* Mesh lines */}
      {[48, 58, 68, 78, 88, 98].map((y, i) => (
        <line key={`h${i}`} x1="35" y1={y} x2="85" y2={y} stroke="#374151" strokeWidth="1" opacity="0.8"/>
      ))}
      {[42, 52, 62, 72, 82].map((x, i) => (
        <line key={`v${i}`} x1={x} y1="40" x2={x} y2="106" stroke="#374151" strokeWidth="1" opacity="0.8"/>
      ))}
      {/* Lumbar knob */}
      <rect x="54" y="90" width="12" height="6" rx="3" fill="#4b5563"/>
      {/* Seat */}
      <ellipse cx="60" cy="118" rx="33" ry="12" fill="#111827" stroke="#374151" strokeWidth="1"/>
      <ellipse cx="60" cy="116" rx="29" ry="9" fill="#1f2937"/>
      {/* Armrests */}
      <rect x="17" y="102" width="10" height="18" rx="4" fill="#374151"/>
      <rect x="13" y="118" width="18" height="5" rx="2.5" fill="#4b5563"/>
      <rect x="93" y="102" width="10" height="18" rx="4" fill="#374151"/>
      <rect x="89" y="118" width="18" height="5" rx="2.5" fill="#4b5563"/>
      {/* Cylinder */}
      <rect x="55" y="130" width="10" height="20" rx="4" fill="#6b7280"/>
      {/* Base */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 60 + 32 * Math.sin(rad);
        const y2 = 160 + 10 * Math.cos(rad) * 0.4;
        return <line key={i} x1="60" y1="153" x2={x2} y2={y2} stroke="#374151" strokeWidth="5" strokeLinecap="round"/>;
      })}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + 32 * Math.sin(rad);
        const cy = 160 + 10 * Math.cos(rad) * 0.4;
        return <ellipse key={i} cx={cx} cy={cy} rx="4" ry="3" fill="#1f2937" stroke="#4b5563" strokeWidth="0.8"/>;
      })}
      <ellipse cx="60" cy="172" rx="38" ry="5" fill="rgba(0,0,0,0.3)"/>
    </svg>
  );
}

function ChairNordic({ height = 150 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 120 170" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back legs */}
      <rect x="30" y="58" width="10" height="88" rx="4" fill="#8b6914"/>
      <rect x="80" y="58" width="10" height="88" rx="4" fill="#8b6914"/>
      {/* Backrest cushion */}
      <rect x="24" y="18" width="72" height="52" rx="10" fill="#d4b896"/>
      <rect x="28" y="22" width="64" height="44" rx="8" fill="#e0c9a8"/>
      {/* Backrest seam lines */}
      <line x1="60" y1="24" x2="60" y2="64" stroke="rgba(139,105,20,0.15)" strokeWidth="1.5"/>
      <line x1="28" y1="44" x2="92" y2="44" stroke="rgba(139,105,20,0.15)" strokeWidth="1.5"/>
      {/* Seat cushion */}
      <rect x="20" y="64" width="80" height="26" rx="8" fill="#d4b896"/>
      <rect x="24" y="67" width="72" height="20" rx="6" fill="#e0c9a8"/>
      {/* Front legs */}
      <rect x="26" y="88" width="9" height="72" rx="4" fill="#a07820"/>
      <rect x="85" y="88" width="9" height="72" rx="4" fill="#a07820"/>
      {/* Cross support */}
      <rect x="34" y="134" width="52" height="6" rx="3" fill="#8b6914"/>
      {/* Foot pads */}
      <ellipse cx="30" cy="160" rx="8" ry="4" fill="#6b5010"/>
      <ellipse cx="90" cy="160" rx="8" ry="4" fill="#6b5010"/>
      <ellipse cx="60" cy="164" rx="42" ry="5" fill="rgba(0,0,0,0.25)"/>
    </svg>
  );
}

function ChairGaming({ height = 160 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 120 185" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Racing back frame */}
      <path d="M28 22 Q60 8 92 22 L88 112 Q60 125 32 112 Z" fill="#0f0f1a" stroke="#dc2626" strokeWidth="1.5"/>
      {/* Racing stripe */}
      <path d="M44 22 L40 112" stroke="#dc2626" strokeWidth="3" opacity="0.8"/>
      <path d="M76 22 L80 112" stroke="#dc2626" strokeWidth="3" opacity="0.8"/>
      {/* Back cushion */}
      <rect x="36" y="28" width="48" height="76" rx="8" fill="#1a1a2e"/>
      <rect x="40" y="32" width="40" height="68" rx="6" fill="#111111"/>
      {/* Logo */}
      <text x="60" y="72" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold" fontFamily="sans-serif">GAMING</text>
      {/* Lumbar pillow */}
      <rect x="40" y="92" width="40" height="14" rx="6" fill="#dc2626" opacity="0.9"/>
      {/* Neck pillow */}
      <rect x="44" y="20" width="32" height="16" rx="7" fill="#dc2626" opacity="0.9"/>
      {/* Seat */}
      <ellipse cx="60" cy="122" rx="34" ry="13" fill="#0f0f1a" stroke="#dc2626" strokeWidth="1.2"/>
      <ellipse cx="60" cy="120" rx="30" ry="10" fill="#1a1a2e"/>
      {/* Armrests */}
      <rect x="15" y="104" width="12" height="20" rx="4" fill="#1a1a2e" stroke="#dc2626" strokeWidth="0.8"/>
      <rect x="12" y="122" width="18" height="6" rx="3" fill="#0f0f1a"/>
      <rect x="93" y="104" width="12" height="20" rx="4" fill="#1a1a2e" stroke="#dc2626" strokeWidth="0.8"/>
      <rect x="90" y="122" width="18" height="6" rx="3" fill="#0f0f1a"/>
      {/* Cylinder */}
      <rect x="55" y="135" width="10" height="20" rx="4" fill="#6b7280"/>
      {/* Base */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 60 + 34 * Math.sin(rad);
        const y2 = 166 + 12 * Math.cos(rad) * 0.4;
        return <line key={i} x1="60" y1="158" x2={x2} y2={y2} stroke="#1a1a2e" strokeWidth="5" strokeLinecap="round"/>;
      })}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + 34 * Math.sin(rad);
        const cy = 166 + 12 * Math.cos(rad) * 0.4;
        return <ellipse key={i} cx={cx} cy={cy} rx="4" ry="3" fill="#111111" stroke="#dc2626" strokeWidth="0.8"/>;
      })}
      <ellipse cx="60" cy="178" rx="40" ry="5" fill="rgba(0,0,0,0.3)"/>
    </svg>
  );
}

/* WEBCAM */
function WebcamSVG({ width = 36 }: { width?: number }) {
  return (
    <svg width={width} viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Clip base */}
      <rect x="14" y="14" width="8" height="6" rx="2" fill="#374151"/>
      {/* Camera body */}
      <rect x="2" y="2" width="32" height="13" rx="6.5" fill="#111827" stroke="#4b5563" strokeWidth="1"/>
      {/* Lens housing */}
      <circle cx="18" cy="8.5" r="5" fill="#1f2937" stroke="#374151" strokeWidth="0.8"/>
      <circle cx="18" cy="8.5" r="3" fill="#0d1117"/>
      <circle cx="18" cy="8.5" r="1.5" fill="#3b82f6"/>
      {/* Active LED status dot */}
      <circle cx="27" cy="8.5" r="1.2" fill="#22c55e"/>
      {/* Mic pinholes */}
      <circle cx="8" cy="8.5" r="0.8" fill="#4b5563"/>
      <circle cx="10" cy="8.5" r="0.8" fill="#4b5563"/>
    </svg>
  );
}

/* MONITORS */
function MonitorUltrawide({ width = 200, isNight = false }: { width?: number; isNight?: boolean }) {
  return (
    <svg width={width} viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: isNight ? 'drop-shadow(0 0 16px rgba(56,189,248,0.22))' : 'none', transition: 'filter 0.5s ease' }}>
      {/* Screen bezel */}
      <rect x="2" y="2" width="196" height="70" rx="6" fill="#111827" stroke="#374151" strokeWidth="1.5"/>
      {/* Curved screen */}
      <rect x="6" y="6" width="188" height="60" rx="4" fill="#0d1117"/>
      {/* Wallpaper gradient */}
      <defs>
        <linearGradient id="uwGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f3460"/>
          <stop offset="40%" stopColor="#16213e"/>
          <stop offset="100%" stopColor="#1a472a"/>
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="188" height="60" rx="4" fill="url(#uwGrad)"/>
      {/* Screen content mockup */}
      <rect x="12" y="12" width="80" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
      <rect x="12" y="22" width="55" height="4" rx="2" fill="rgba(99,102,241,0.5)"/>
      {/* Blinking code cursor */}
      <motion.rect
        x="70" y="22" width="2" height="4" rx="1" fill="#38bdf8"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
      <rect x="12" y="30" width="70" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
      <rect x="12" y="37" width="62" height="3" rx="1.5" fill="rgba(255,255,255,0.06)"/>
      <rect x="100" y="10" width="88" height="52" rx="3" fill="rgba(0,0,0,0.2)"/>
      <rect x="104" y="14" width="80" height="30" rx="2" fill="rgba(16,185,129,0.12)"/>
      {/* Bottom bar indicator */}
      <rect x="6" y="62" width="188" height="4" rx="0" fill="#0d1117"/>
      <rect x="90" y="63" width="20" height="2" rx="1" fill="#374151"/>
      {/* Stand neck */}
      <rect x="93" y="72" width="14" height="12" rx="3" fill="#374151"/>
      {/* Stand base */}
      <rect x="72" y="82" width="56" height="7" rx="3.5" fill="#374151"/>
      <ellipse cx="100" cy="94" rx="50" ry="4" fill="rgba(0,0,0,0.3)"/>
    </svg>
  );
}

function Monitor4K({ width = 160, isNight = false }: { width?: number; isNight?: boolean }) {
  return (
    <svg width={width} viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: isNight ? 'drop-shadow(0 0 14px rgba(139,92,246,0.25))' : 'none', transition: 'filter 0.5s ease' }}>
      {/* Bezel */}
      <rect x="2" y="2" width="156" height="70" rx="5" fill="#1f2937" stroke="#374151" strokeWidth="1.2"/>
      <rect x="6" y="6" width="148" height="60" rx="3" fill="#0d1117"/>
      {/* Screen content */}
      <defs>
        <linearGradient id="k4Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b"/>
          <stop offset="100%" stopColor="#0c4a6e"/>
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="148" height="60" rx="3" fill="url(#k4Grad)"/>
      <rect x="10" y="10" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.1)"/>
      <rect x="10" y="19" width="40" height="3" rx="1.5" fill="rgba(139,92,246,0.5)"/>
      {/* Blinking code cursor */}
      <motion.rect
        x="53" y="19" width="2" height="3" rx="1" fill="#a78bfa"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
      <rect x="10" y="26" width="50" height="2.5" rx="1" fill="rgba(255,255,255,0.07)"/>
      <rect x="75" y="10" width="74" height="52" rx="2" fill="rgba(12,74,110,0.3)"/>
      {/* Stand */}
      <rect x="73" y="72" width="14" height="10" rx="3" fill="#374151"/>
      <rect x="56" y="80" width="48" height="7" rx="3.5" fill="#374151"/>
      <ellipse cx="80" cy="92" rx="44" ry="4" fill="rgba(0,0,0,0.28)"/>
    </svg>
  );
}

/* KEYBOARD */
function KeyboardIllustration({ width = 130 }: { width?: number }) {
  return (
    <svg width={width} viewBox="0 0 130 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Keyboard body */}
      <rect x="2" y="6" width="90" height="38" rx="5" fill="#1f2937" stroke="#374151" strokeWidth="1"/>
      {/* Keys rows */}
      {[12, 20, 28].map((row, ri) =>
        [8, 16, 24, 32, 40, 48, 56, 64, 72, 80].map((col, ci) => (
          <rect key={`${ri}-${ci}`} x={col} y={row} width="5" height="5" rx="1.5" fill="#374151"/>
        ))
      )}
      {/* Space bar */}
      <rect x="22" y="36" width="48" height="5" rx="2.5" fill="#374151"/>
      {/* LED glow under keys */}
      <rect x="3" y="36" width="86" height="2" rx="1" fill="rgba(99,102,241,0.3)"/>
      {/* Mouse next to keyboard */}
      <ellipse cx="115" cy="24" rx="12" ry="18" fill="#1f2937" stroke="#374151" strokeWidth="1"/>
      <line x1="115" y1="8" x2="115" y2="20" stroke="#374151" strokeWidth="1"/>
      <ellipse cx="115" cy="18" rx="4" ry="3" fill="#374151"/>
      <ellipse cx="115" cy="44" rx="12" ry="4" fill="rgba(0,0,0,0.25)"/>
      <ellipse cx="46" cy="47" rx="44" ry="4" fill="rgba(0,0,0,0.2)"/>
    </svg>
  );
}

/* SCREENBAR LAMP */
function ScreenBarLamp({ width = 90 }: { width?: number }) {
  return (
    <svg width={width} viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lamp bar */}
      <rect x="5" y="14" width="80" height="12" rx="5" fill="#2d3748"/>
      <rect x="8" y="17" width="74" height="6" rx="3" fill="#fef3c7" opacity="0.9"/>
      {/* LED strip */}
      <rect x="10" y="18" width="70" height="3" rx="1.5" fill="#fcd34d"/>
      {/* Glow effect */}
      <rect x="5" y="26" width="80" height="10" rx="0" fill="rgba(253,224,71,0.12)"/>
      {/* Clip */}
      <rect x="40" y="6" width="10" height="12" rx="3" fill="#374151"/>
      <rect x="38" y="2" width="14" height="8" rx="3" fill="#1f2937" stroke="#374151" strokeWidth="0.8"/>
      {/* Dial button */}
      <circle cx="76" cy="20" r="5" fill="#374151"/>
      <circle cx="76" cy="20" r="3" fill="#4b5563"/>
    </svg>
  );
}

/* MONSTERA PLANT */
function MonsteraPlant({ height = 120 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pot */}
      <path d="M30 130 L34 158 L66 158 L70 130 Z" fill="#c2410c"/>
      <ellipse cx="50" cy="130" rx="20" ry="7" fill="#b45309"/>
      <ellipse cx="50" cy="158" rx="16" ry="5" fill="#92400e"/>
      {/* Soil */}
      <ellipse cx="50" cy="130" rx="18" ry="5" fill="#422006"/>
      {/* Stem */}
      <line x1="50" y1="128" x2="50" y2="90" stroke="#16a34a" strokeWidth="3" strokeLinecap="round"/>
      <line x1="50" y1="108" x2="28" y2="85" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="50" y1="98" x2="72" y2="72" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Large left leaf */}
      <path d="M28 85 Q10 60 20 40 Q35 55 40 70 Q38 78 28 85Z" fill="#15803d"/>
      {/* Leaf holes */}
      <ellipse cx="25" cy="58" rx="5" ry="3" fill="#15803d" opacity="0"/>
      <path d="M22 62 Q18 58 20 53" stroke="#166534" strokeWidth="1.5" fill="none"/>
      {/* Large right leaf */}
      <path d="M72 72 Q90 48 82 28 Q65 42 62 58 Q64 66 72 72Z" fill="#16a34a"/>
      {/* Top center leaf */}
      <path d="M50 90 Q34 68 40 48 Q55 62 56 76 Q54 84 50 90Z" fill="#22c55e"/>
      {/* Leaf veins */}
      <line x1="30" y1="80" x2="22" y2="48" stroke="#166534" strokeWidth="0.8" opacity="0.6"/>
      <line x1="68" y1="68" x2="78" y2="38" stroke="#15803d" strokeWidth="0.8" opacity="0.6"/>
      {/* Shadow */}
      <ellipse cx="50" cy="162" rx="24" ry="4" fill="rgba(0,0,0,0.25)"/>
    </svg>
  );
}

/* ESPRESSO MACHINE */
function EspressoMachine({ height = 70 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="8" y="8" width="54" height="68" rx="8" fill="#1e293b"/>
      <rect x="10" y="10" width="50" height="64" rx="7" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
      {/* Top section */}
      <rect x="14" y="14" width="42" height="28" rx="5" fill="#1e293b"/>
      {/* Pressure gauge circle */}
      <circle cx="35" cy="28" r="10" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
      <circle cx="35" cy="28" r="7" fill="#1e293b"/>
      <line x1="35" y1="22" x2="35" y2="28" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="35" y1="28" x2="40" y2="30" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Portafilter */}
      <rect x="24" y="52" width="22" height="8" rx="3" fill="#334155"/>
      <circle cx="35" cy="56" r="4" fill="#1e293b"/>
      {/* Steam wand */}
      <line x1="56" y1="42" x2="62" y2="62" stroke="#475569" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="62" cy="64" rx="4" ry="2" fill="#334155"/>
      {/* Drip tray */}
      <rect x="10" y="72" width="50" height="6" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="0.8"/>
      <rect x="12" y="73" width="46" height="3" rx="1" fill="#0f172a"/>
      {/* Power button */}
      <circle cx="52" cy="18" r="4" fill="#10b981" opacity="0.8"/>
      <ellipse cx="35" cy="82" rx="28" ry="4" fill="rgba(0,0,0,0.3)"/>
    </svg>
  );
}

/* LAPTOP STAND */
function LaptopStandSVG({ height = 60 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Platform */}
      <ellipse cx="40" cy="20" rx="38" ry="12" fill="#9ca3af"/>
      <ellipse cx="40" cy="18" rx="36" ry="10" fill="#d1d5db"/>
      {/* Neck */}
      <path d="M28 28 L28 68 Q40 74 52 68 L52 28 Q40 32 28 28Z" fill="#9ca3af"/>
      {/* Cable channel */}
      <line x1="40" y1="30" x2="40" y2="66" stroke="#e5e7eb" strokeWidth="2" opacity="0.4"/>
      {/* Base */}
      <ellipse cx="40" cy="72" rx="28" ry="10" fill="#6b7280"/>
      <ellipse cx="40" cy="70" rx="26" ry="8" fill="#9ca3af"/>
      {/* Non-slip pads */}
      <ellipse cx="22" cy="72" rx="5" ry="2" fill="#374151"/>
      <ellipse cx="58" cy="72" rx="5" ry="2" fill="#374151"/>
      <ellipse cx="40" cy="80" rx="30" ry="4" fill="rgba(0,0,0,0.25)"/>
    </svg>
  );
}

/* BEAN BAG */
function BeanBagSVG({ height = 100 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main body */}
      <ellipse cx="60" cy="85" rx="52" ry="48" fill="#2563eb"/>
      {/* Upper sphere */}
      <ellipse cx="60" cy="50" rx="34" ry="36" fill="#3b82f6"/>
      {/* Highlight */}
      <ellipse cx="46" cy="38" rx="12" ry="10" fill="rgba(255,255,255,0.12)" transform="rotate(-20 46 38)"/>
      {/* Seam line */}
      <ellipse cx="60" cy="78" rx="52" ry="14" fill="none" stroke="#1d4ed8" strokeWidth="2" opacity="0.5"/>
      {/* Bottom shadow */}
      <ellipse cx="60" cy="130" rx="44" ry="8" fill="rgba(0,0,0,0.25)"/>
    </svg>
  );
}

/* SURFBOARD */
function SurfboardSVG({ height = 130 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 50 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Board outline */}
      <path d="M25 2 Q40 30 42 90 Q42 160 25 198 Q8 160 8 90 Q10 30 25 2Z" fill="#f0f4ff"/>
      {/* Nose rocker line */}
      <path d="M25 2 Q38 28 40 88" stroke="#e2e8f0" strokeWidth="0.8"/>
      {/* Rails */}
      <path d="M15 50 Q12 100 14 160" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5"/>
      <path d="M35 50 Q38 100 36 160" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5"/>
      {/* Design stripe */}
      <path d="M25 30 Q32 60 32 100 Q32 140 25 170 Q18 140 18 100 Q18 60 25 30Z" fill="rgba(99,102,241,0.3)"/>
      {/* Logo */}
      <circle cx="25" cy="95" r="6" fill="rgba(99,102,241,0.5)"/>
      {/* Fins */}
      <path d="M22 180 L18 196 L22 192 Z" fill="#cbd5e1"/>
      <path d="M28 180 L32 196 L28 192 Z" fill="#cbd5e1"/>
      <ellipse cx="25" cy="198" rx="18" ry="3" fill="rgba(0,0,0,0.2)"/>
    </svg>
  );
}

/* STUDIO SPEAKERS */
function SpeakersSVG({ height = 70 }: { height?: number }) {
  return (
    <svg height={height} viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cabinet */}
      <rect x="8" y="8" width="64" height="86" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.2"/>
      {/* Front baffle */}
      <rect x="10" y="10" width="60" height="82" rx="7" fill="#0f172a"/>
      {/* Tweeter */}
      <circle cx="40" cy="32" r="10" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
      <circle cx="40" cy="32" r="6" fill="#1e293b"/>
      <circle cx="40" cy="32" r="2.5" fill="#475569"/>
      {/* Woofer */}
      <circle cx="40" cy="70" r="22" fill="#0f172a" stroke="#334155" strokeWidth="1.2"/>
      <circle cx="40" cy="70" r="16" fill="#1e293b" stroke="#334155" strokeWidth="0.8"/>
      <circle cx="40" cy="70" r="10" fill="#0f172a"/>
      <circle cx="40" cy="70" r="5" fill="#1e293b"/>
      <circle cx="40" cy="70" r="2" fill="#475569"/>
      {/* Port */}
      <rect x="24" y="88" width="32" height="4" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.6"/>
      {/* LED */}
      <circle cx="16" cy="16" r="3" fill="#10b981" opacity="0.8"/>
      <ellipse cx="40" cy="97" rx="34" ry="4" fill="rgba(0,0,0,0.3)"/>
    </svg>
  );
}

// ─── Map: product ID → illustration component ─────────────────────────────
function getDeskIllustration(deskId?: string) {
  switch (deskId) {
    case 'desk-standing-oak':    return <DeskStanding width={260} />;
    case 'desk-walnut-executive': return <DeskExecutive width={280} />;
    case 'desk-glass-corner':   return <DeskGlassCorner width={280} />;
    default:                     return <DeskMinimal width={240} />;
  }
}

function getChairIllustration(chairId?: string) {
  switch (chairId) {
    case 'chair-aeron':         return <ChairAeron height={180} />;
    case 'chair-markus-mesh':   return <ChairMesh height={175} />;
    case 'chair-scandi-cushion': return <ChairNordic height={165} />;
    case 'chair-gaming-racer':  return <ChairGaming height={185} />;
    default:                    return <ChairMesh height={175} />;
  }
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function WorkspaceCanvas() {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [ambiance, setAmbiance] = useState<'day' | 'night'>('night');

  const isNight = ambiance === 'night';

  const { desk, chair, tech, accessories } = useWorkspaceStore();
  const currency = useCurrency();

  const ultrawide    = tech.find((t) => t.id === 'tech-ultrawide');
  const monitor4k    = tech.find((t) => t.id === 'tech-4k-27');
  const webcamItem   = tech.find((t) => t.id === 'tech-webcam-4k');
  const keyboardItem = tech.find((t) => t.id === 'tech-keyboard-mouse');
  const speakerItem  = tech.find((t) => t.id === 'tech-speakers');
  const screenbar    = accessories.find((a) => a.id === 'acc-screenbar');
  const monstera     = accessories.find((a) => a.id === 'acc-monstera');
  const espresso     = accessories.find((a) => a.id === 'acc-espresso');
  const laptopStand  = accessories.find((a) => a.id === 'acc-laptop-stand');
  const beanBag      = accessories.find((a) => a.id === 'acc-bean-bag');
  const surfboard    = accessories.find((a) => a.id === 'acc-surfboard');

  const activeMonitor = ultrawide || monitor4k;

  const formatPrice = (priceIDR: number) => formatMonthlyRate(priceIDR, currency);

  const getSlotItem = (slot: string) => {
    switch (slot) {
      case 'desk':        return desk;
      case 'chair':       return chair;
      case 'monitor':     return activeMonitor;
      case 'webcam':      return webcamItem;
      case 'screenbar':   return screenbar;
      case 'keyboard':    return keyboardItem;
      case 'speakers':    return speakerItem;
      case 'laptopStand': return laptopStand;
      case 'espresso':    return espresso;
      case 'plant':       return monstera;
      case 'beanBag':     return beanBag;
      case 'surfboard':   return surfboard;
      default:            return null;
    }
  };

  const hoveredItem  = hoveredSlot  ? getSlotItem(hoveredSlot)  : null;

  const itemCount = [desk, chair, activeMonitor, webcamItem, keyboardItem, screenbar, monstera, espresso, laptopStand, speakerItem, beanBag, surfboard].filter(Boolean).length;

  return (
    <div
      style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--paper)',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* ── Fixed 58px Horizon Top Header ── */}
      <div
        style={{
          height: 58,
          width: '100%',
          padding: '0 20px',
          borderBottom: '1px solid var(--line)',
          background: 'var(--paper)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'var(--paper-2)',
              border: '1px solid var(--line)',
            }}
          >
            <Layers size={14} color="var(--brass)" />
          </div>
          <div>
            <h3
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: 'var(--ink)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Studio 2D Preview
            </h3>
            <p style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2, marginBottom: 0 }}>
              Visualisasi ruang kerja interaktif
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Ambiance Day/Night Toggle */}
          <button
            type="button"
            onClick={() => setAmbiance(isNight ? 'day' : 'night')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 12px',
              borderRadius: 20,
              border: '1px solid var(--line)',
              background: 'var(--paper-2)',
              color: 'var(--ink)',
              fontSize: 11.5,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="Ganti Suasana Siang / Malam"
          >
            {isNight ? (
              <>
                <Moon size={13} color="#7dd3fc" />
                <span>Evening</span>
              </>
            ) : (
              <>
                <Sun size={13} color="#f59e0b" />
                <span>Daylight</span>
              </>
            )}
          </button>

          {/* Item counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 11px',
              borderRadius: 20,
              border: '1px solid var(--line)',
              background: 'var(--paper-2)',
              color: 'var(--ink)',
              fontSize: 11.5,
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#22c55e',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
              }}
            />
            <span>{itemCount} item</span>
          </div>
        </div>
      </div>

      {/* ── Canvas Stage Area ── */}
      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 20px',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* ── STUDIO CANVAS ── */}
        <div
          style={{
            width: '100%',
            maxWidth: 920,
            maxHeight: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 16,
            border: isNight
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(0,0,0,0.1)',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: isNight
              ? '0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
              : '0 16px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
            isolation: 'isolate',
            background: isNight
              ? 'linear-gradient(165deg, #111827 0%, #0b0f19 50%, #030712 100%)'
              : 'linear-gradient(165deg, #f8fafc 0%, #edf2f7 50%, #e2e8f0 100%)',
            transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
          }}
        >
        {/* Grid pattern */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: isNight ? 0.05 : 0.08, pointerEvents: 'none', transition: 'opacity 0.5s ease' }}
        >
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke={isNight ? '#6b7280' : '#94a3b8'} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>

        {/* Floor platform glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '50%',
            background: isNight
              ? 'radial-gradient(ellipse at 50% 90%, rgba(99,112,145,0.18) 0%, rgba(168,122,52,0.06) 50%, transparent 80%)'
              : 'radial-gradient(ellipse at 50% 90%, rgba(168,122,52,0.14) 0%, rgba(99,112,145,0.05) 50%, transparent 80%)',
            pointerEvents: 'none',
            zIndex: 2,
            transition: 'background 0.5s ease',
          }}
        />

        {/* Floor line */}
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            right: '10%',
            height: '1px',
            background: isNight
              ? 'linear-gradient(90deg, transparent, rgba(168,122,52,0.2) 30%, rgba(168,122,52,0.3) 50%, rgba(168,122,52,0.2) 70%, transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.08) 70%, transparent)',
            zIndex: 3,
            pointerEvents: 'none',
            transition: 'background 0.5s ease',
          }}
        />

        {/* ────── LAYERS ────── */}

        {/* Bean Bag — bottom left, z:5 */}
        <AnimatePresence>
          {beanBag && (
            <motion.div
              key="beanBag"
              variants={itemVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ position: 'absolute', left: '3%', bottom: '4%', zIndex: 5, cursor: 'pointer' }}
              whileHover={{ scale: 1.04 }}
              onMouseEnter={() => setHoveredSlot('beanBag')}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => setSelectedSlot(s => s === 'beanBag' ? null : 'beanBag')}
            >
              <BeanBagSVG height={90} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Surfboard — bottom right, z:6 */}
        <AnimatePresence>
          {surfboard && (
            <motion.div
              key="surfboard"
              variants={itemVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ position: 'absolute', right: '2%', bottom: '4%', zIndex: 6, cursor: 'pointer' }}
              whileHover={{ scale: 1.04 }}
              onMouseEnter={() => setHoveredSlot('surfboard')}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => setSelectedSlot(s => s === 'surfboard' ? null : 'surfboard')}
            >
              <SurfboardSVG height={120} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Plant / Monstera — left of desk, z:7 */}
        <AnimatePresence>
          {monstera && (
            <motion.div
              key="monstera"
              variants={itemVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ position: 'absolute', left: '8%', bottom: '14%', zIndex: 7, cursor: 'pointer' }}
              whileHover={{ scale: 1.04 }}
              onMouseEnter={() => setHoveredSlot('plant')}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => setSelectedSlot(s => s === 'plant' ? null : 'plant')}
            >
              <MonsteraPlant height={110} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* DESK — center, z:10 */}
        <div
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '20%', zIndex: 10, cursor: desk ? 'pointer' : 'default' }}
          onMouseEnter={() => desk && setHoveredSlot('desk')}
          onMouseLeave={() => setHoveredSlot(null)}
          onClick={() => desk && setSelectedSlot(s => s === 'desk' ? null : 'desk')}
        >
          <AnimatePresence mode="wait">
            {desk ? (
              <motion.div
                key={desk.id}
                variants={itemVariants}
                initial="hidden" animate="visible" exit="exit"
                whileHover={{ scale: 1.015 }}
              >
                {getDeskIllustration(desk.id)}
              </motion.div>
            ) : (
              <motion.div
                key="empty-desk"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '20px 0' }}
              >
                <div
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '9px 22px', borderRadius: 30,
                    border: '1.5px dashed rgba(168,122,52,0.5)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700,
                  }}
                >
                  <Plus size={13} color="rgba(168,122,52,0.7)" />
                  <span>Pilih Meja</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Laptop Stand — left desk corner, z:14 */}
        <AnimatePresence>
          {desk && laptopStand && (
            <motion.div
              key="laptopStand"
              variants={itemVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ position: 'absolute', left: '25%', bottom: '30%', zIndex: 14, cursor: 'pointer' }}
              whileHover={{ scale: 1.06 }}
              onMouseEnter={() => setHoveredSlot('laptopStand')}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => setSelectedSlot(s => s === 'laptopStand' ? null : 'laptopStand')}
            >
              <LaptopStandSVG height={55} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Espresso Machine — right desk corner, z:14 */}
        <AnimatePresence>
          {desk && espresso && (
            <motion.div
              key="espresso"
              variants={itemVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ position: 'absolute', right: '24%', bottom: '30%', zIndex: 14, cursor: 'pointer' }}
              whileHover={{ scale: 1.06 }}
              onMouseEnter={() => setHoveredSlot('espresso')}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => setSelectedSlot(s => s === 'espresso' ? null : 'espresso')}
            >
              <EspressoMachine height={60} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Studio Speakers — stereo pair on left & right of monitor, z:14 */}
        <AnimatePresence>
          {desk && speakerItem && (
            <>
              {/* Left Speaker */}
              <motion.div
                key="speaker-left"
                variants={itemVariants}
                initial="hidden" animate="visible" exit="exit"
                style={{ position: 'absolute', left: '28%', bottom: '31%', zIndex: 14, cursor: 'pointer' }}
                whileHover={{ scale: 1.06 }}
                onMouseEnter={() => setHoveredSlot('speakers')}
                onMouseLeave={() => setHoveredSlot(null)}
                onClick={() => setSelectedSlot(s => s === 'speakers' ? null : 'speakers')}
              >
                <SpeakersSVG height={56} />
              </motion.div>
              {/* Right Speaker */}
              <motion.div
                key="speaker-right"
                variants={itemVariants}
                initial="hidden" animate="visible" exit="exit"
                style={{ position: 'absolute', right: '28%', bottom: '31%', zIndex: 14, cursor: 'pointer' }}
                whileHover={{ scale: 1.06 }}
                onMouseEnter={() => setHoveredSlot('speakers')}
                onMouseLeave={() => setHoveredSlot(null)}
                onClick={() => setSelectedSlot(s => s === 'speakers' ? null : 'speakers')}
              >
                <SpeakersSVG height={56} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Monitor — on desk center, z:16 */}
        {desk && (
          <div
            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '33%', zIndex: 16, cursor: activeMonitor ? 'pointer' : 'default' }}
            onMouseEnter={() => activeMonitor && setHoveredSlot('monitor')}
            onMouseLeave={() => setHoveredSlot(null)}
            onClick={() => activeMonitor && setSelectedSlot(s => s === 'monitor' ? null : 'monitor')}
          >
            <AnimatePresence mode="wait">
              {activeMonitor ? (
                <motion.div
                  key={activeMonitor.id}
                  variants={itemVariants}
                  initial="hidden" animate="visible" exit="exit"
                  whileHover={{ scale: 1.02 }}
                >
                  {ultrawide
                    ? <MonitorUltrawide width={200} isNight={isNight} />
                    : <Monitor4K width={160} isNight={isNight} />
                  }
                </motion.div>
              ) : (
                <motion.div
                  key="empty-monitor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center' }}
                >
                  <div
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '5px 12px', borderRadius: 20,
                      border: '1px dashed rgba(168,122,52,0.3)',
                      background: 'rgba(255,255,255,0.03)',
                      color: 'rgba(255,255,255,0.25)', fontSize: 10, fontWeight: 700,
                    }}
                  >
                    <Plus size={10} color="rgba(168,122,52,0.5)" />
                    <span>+ Monitor</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Webcam — top of monitor, z:22 */}
        <AnimatePresence>
          {desk && activeMonitor && webcamItem && !screenbar && (
            <motion.div
              key="webcam"
              variants={{ ...itemVariants, hidden: { opacity: 0, y: -6 }, exit: { opacity: 0, y: -6 } }}
              initial="hidden" animate="visible" exit="exit"
              style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '51%', zIndex: 22, cursor: 'pointer' }}
              whileHover={{ scale: 1.08 }}
              onMouseEnter={() => setHoveredSlot('webcam')}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => setSelectedSlot(s => s === 'webcam' ? null : 'webcam')}
            >
              <WebcamSVG width={32} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ScreenBar Lamp + Warm Light Cone — on top of monitor, z:20 */}
        <AnimatePresence>
          {desk && activeMonitor && screenbar && (
            <motion.div
              key="screenbar"
              variants={{ ...itemVariants, hidden: { opacity: 0, y: -8 }, exit: { opacity: 0, y: -8 } }}
              initial="hidden" animate="visible" exit="exit"
              style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '50%', zIndex: 20, cursor: 'pointer' }}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHoveredSlot('screenbar')}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => setSelectedSlot(s => s === 'screenbar' ? null : 'screenbar')}
            >
              <ScreenBarLamp width={100} />
              {/* Warm light cone shining down onto desk */}
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '55px solid transparent',
                  borderRight: '55px solid transparent',
                  borderTop: isNight
                    ? '85px solid rgba(251,191,36,0.14)'
                    : '75px solid rgba(251,191,36,0.07)',
                  pointerEvents: 'none',
                  transition: 'border-top 0.4s ease',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard & Mouse — front of desk, z:18 */}
        <AnimatePresence>
          {desk && keyboardItem && (
            <motion.div
              key="keyboard"
              variants={itemVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '26%', zIndex: 18, cursor: 'pointer' }}
              whileHover={{ scale: 1.04 }}
              onMouseEnter={() => setHoveredSlot('keyboard')}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={() => setSelectedSlot(s => s === 'keyboard' ? null : 'keyboard')}
            >
              <KeyboardIllustration width={140} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CHAIR — front-center, z:25 */}
        <div
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '4%', zIndex: 25, cursor: chair ? 'pointer' : 'default' }}
          onMouseEnter={() => chair && setHoveredSlot('chair')}
          onMouseLeave={() => setHoveredSlot(null)}
          onClick={() => chair && setSelectedSlot(s => s === 'chair' ? null : 'chair')}
        >
          <AnimatePresence mode="wait">
            {chair ? (
              <motion.div
                key={chair.id}
                variants={itemVariants}
                initial="hidden" animate="visible" exit="exit"
                whileHover={{ scale: 1.02, y: -3 }}
              >
                {getChairIllustration(chair.id)}
              </motion.div>
            ) : (
              <motion.div
                key="empty-chair"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '10px 0' }}
              >
                <div
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '7px 18px', borderRadius: 30,
                    border: '1.5px dashed rgba(168,122,52,0.5)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.5)', fontSize: 11.5, fontWeight: 700,
                  }}
                >
                  <Plus size={12} color="rgba(168,122,52,0.7)" />
                  <span>Pilih Kursi</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected / Hover Tooltip */}
        <AnimatePresence>
          {hoveredSlot && hoveredItem && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute', bottom: 14,
                left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(15,20,30,0.94)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(168,122,52,0.4)',
                borderRadius: 30, padding: '6px 18px',
                color: '#fff',
                display: 'flex', alignItems: 'center', gap: 10,
                zIndex: 40, boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                pointerEvents: 'none', whiteSpace: 'nowrap',
              }}
            >
              <Sparkles size={12} color="var(--brass)" />
              <span style={{ fontSize: 12, fontWeight: 700 }}>{hoveredItem.name}</span>
              <span style={{ fontSize: 11, color: '#fbbf24', fontWeight: 600 }}>
                {formatPrice(hoveredItem.price)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected item badge (top) */}
        <AnimatePresence>
          {selectedSlot && getSlotItem(selectedSlot) && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              style={{
                position: 'absolute', top: 12,
                left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(15,20,30,0.96)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(168,122,52,0.45)',
                borderRadius: 30, padding: '7px 18px',
                display: 'flex', alignItems: 'center', gap: 12,
                zIndex: 50, boxShadow: '0 8px 28px rgba(0,0,0,0.4)',
              }}
            >
              <Sparkles size={13} color="var(--brass)" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
                  {getSlotItem(selectedSlot)!.name}
                </span>
                <span style={{ fontSize: 11, color: '#fbbf24', fontWeight: 600 }}>
                  {formatPrice(getSlotItem(selectedSlot)!.price)}
                </span>
              </div>
              <button
                type="button"
                aria-label="Close item selection popup"
                onClick={() => setSelectedSlot(null)}
                style={{
                  background: 'rgba(255,255,255,0.08)', border: 'none',
                  borderRadius: '50%', width: 22, height: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#9ca3af',
                }}
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state CTA */}
        <AnimatePresence>
          {!desk && !chair && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 12,
                pointerEvents: 'none', zIndex: 3,
              }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  padding: '22px 36px',
                  background: isNight ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                  border: isNight ? '1px dashed rgba(255,255,255,0.15)' : '1px dashed rgba(0,0,0,0.15)',
                  borderRadius: 20, textAlign: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <p style={{ margin: 0, fontSize: 26, marginBottom: 8 }}>🪑</p>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: isNight ? 'rgba(255,255,255,0.75)' : 'var(--ink)' }}>
                  Workspace Anda kosong
                </p>
                <p style={{ margin: 0, fontSize: 12, color: isNight ? 'rgba(255,255,255,0.45)' : 'var(--ink-soft)', marginTop: 4 }}>
                  Pilih meja &amp; kursi dari panel kiri untuk memulai
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Watermark */}
        <div
          style={{
            position: 'absolute', bottom: 12, right: 16,
            fontSize: 10, fontWeight: 700,
            color: isNight ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.22)',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            pointerEvents: 'none', zIndex: 2,
            transition: 'color 0.5s ease',
          }}
        >
          MONIS Studio
        </div>
      </div>
    </div>
  </div>
);
}
