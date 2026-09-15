'use client';

import { useState } from 'react';
import { Sun, Moon, Sparkles, Check } from 'lucide-react';
import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';
import { formatIDR, formatUSD } from '@/data/products';

interface Hotspot {
  id: string;
  x: string;
  y: string;
  category: string;
  name: string;
  price: number;
  specs: string;
  active: boolean;
}

export default function WorkspaceCanvas() {
  const [isNight, setIsNight] = useState(false);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const { desk, chair, tech, accessories, activePresetId } = useWorkspaceStore();
  const currency = useCurrency();

  const monitor = tech.find((t) => t.id === 'tech-ultrawide' || t.id === 'tech-4k-27');
  const screenbar = accessories.find((a) => a.id === 'acc-screenbar');
  const monstera = accessories.find((a) => a.id === 'acc-monstera');
  const surfboard = accessories.find((a) => a.id === 'acc-surfboard');

  const isEmpty = !desk && !chair && tech.length === 0 && accessories.length === 0;

  // Determine photorealistic scene background based on active preset & lighting
  let sceneSrc = isNight
    ? '/assets/scenes/developer-pro-night.jpg'
    : '/assets/scenes/developer-pro-day.jpg';

  if (activePresetId === 'preset-creator') {
    sceneSrc = isNight
      ? '/assets/scenes/creator-studio-night.jpg'
      : '/assets/scenes/creator-studio-day.jpg';
  } else if (activePresetId === 'preset-nomad') {
    sceneSrc = isNight
      ? '/assets/scenes/minimal-nomad-night.jpg'
      : '/assets/scenes/minimal-nomad-day.jpg';
  }

  // Interactive hotspots on the 3D scene
  const hotspots: Hotspot[] = [
    {
      id: 'desk',
      x: '52%',
      y: '72%',
      category: 'STANDING DESK',
      name: desk?.name || 'MONIS Standing Desk Pro',
      price: desk?.price || 85000,
      specs: 'Solid Oak · Dual Motor · 4 Memory Heights',
      active: !!desk,
    },
    {
      id: 'chair',
      x: '24%',
      y: '74%',
      category: 'ERGONOMIC CHAIR',
      name: chair?.name || 'Herman Miller Aeron',
      price: chair?.price || 150000,
      specs: 'Pellicle 8Z Mesh · PostureFit SL Lumbar',
      active: !!chair,
    },
    {
      id: 'monitor',
      x: '53%',
      y: '47%',
      category: 'DISPLAY',
      name: monitor?.name || '34" Curved Ultrawide Display',
      price: monitor?.price || 85000,
      specs: '144Hz IPS · USB-C 90W Fast Charging',
      active: !!monitor,
    },
    {
      id: 'plant',
      x: '81%',
      y: '67%',
      category: 'BIOPHILIC ACCENT',
      name: monstera?.name || 'Live Tropical Monstera',
      price: monstera?.price || 15000,
      specs: 'Ceramic White Pot · Hand-cared in Canggu',
      active: !!monstera,
    },
  ];

  if (surfboard) {
    hotspots.push({
      id: 'surfboard',
      x: '93%',
      y: '68%',
      category: 'BALI LIFESTYLE',
      name: surfboard.name,
      price: surfboard.price,
      specs: "6'2 Wave Cruiser · Handcrafted Teak",
      active: true,
    });
  }

  return (
    <div
      style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 24px',
        background: 'var(--paper)',
        overflow: 'hidden',
      }}
    >
      {/* ── Top Controls Bar: Lighting Toggle ── */}
      <div
        style={{
          width: '100%',
          maxWidth: 820,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          zIndex: 25,
        }}
      >
        {/* Active Scene Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '6px 14px',
            background: 'var(--paper-2)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius)',
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--ink)',
            letterSpacing: '0.02em',
          }}
        >
          <Sparkles size={13} color="var(--brass)" />
          <span>Villa 3D Showroom</span>
          <span style={{ fontSize: 11, color: 'var(--ink-soft)', fontWeight: 500 }}>
            · Hover pins to inspect gear
          </span>
        </div>

        {/* Daylight / Evening Lighting Toggle */}
        <button
          type="button"
          onClick={() => setIsNight(!isNight)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '6px 14px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--line)',
            background: isNight ? 'var(--ink)' : 'var(--paper)',
            color: isNight ? 'var(--paper)' : 'var(--ink)',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            transition: 'all 0.2s ease',
          }}
        >
          {isNight ? (
            <>
              <Moon size={13} color="#fef08a" />
              <span>Evening Ambiance</span>
            </>
          ) : (
            <>
              <Sun size={13} color="var(--brass)" />
              <span>Daylight</span>
            </>
          )}
        </button>
      </div>

      {/* ── Main Canvas Frame ── */}
      <div
        style={{
          width: '100%',
          maxWidth: 820,
          aspectRatio: '16 / 9',
          borderRadius: 14,
          border: '1px solid var(--line)',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 12px 36px rgba(22,33,29,0.14)',
          background: isNight ? '#0b132b' : '#e3dbc7',
        }}
      >
        {/* Photorealistic Scene Render */}
        <img
          src={sceneSrc}
          alt="Bali Villa Workspace Setup"
          width={1280}
          height={720}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            inset: 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Ambient Lighting Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: isNight
              ? 'radial-gradient(ellipse at 50% 60%, rgba(254,240,138,0.04) 0%, rgba(11,19,43,0.2) 100%)'
              : 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.03) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Surfboard (if added to accessories) leaning naturally by sliding door frame */}
        {surfboard && (
          <div
            style={{
              position: 'absolute',
              right: '2.5%',
              bottom: '3%',
              width: '9.2%',
              zIndex: 15,
              transform: 'rotate(-4deg)',
              transformOrigin: 'bottom center',
              filter: isNight
                ? 'brightness(0.85) contrast(1.05) drop-shadow(-8px 12px 18px rgba(0,0,0,0.7))'
                : 'drop-shadow(-6px 12px 16px rgba(0,0,0,0.38))',
              transition: 'all 0.3s ease',
            }}
          >
            <img
              src="/assets/accessories/surfboard.png"
              alt="Bali Surfboard"
              width={120}
              height={360}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        )}

            {/* ── Interactive Hotspot Pins ── */}
            {hotspots.map((spot) => {
              const isOpen = activeHotspotId === spot.id;
              const formattedPrice =
                currency === 'IDR'
                  ? formatIDR(spot.price)
                  : formatUSD(spot.price);

              return (
                <div
                  key={spot.id}
                  style={{
                    position: 'absolute',
                    left: spot.x,
                    top: spot.y,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20,
                  }}
                  onMouseEnter={() => setActiveHotspotId(spot.id)}
                  onMouseLeave={() => setActiveHotspotId(null)}
                >
                  {/* Glowing Pin */}
                  <button
                    type="button"
                    onClick={() => setActiveHotspotId(isOpen ? null : spot.id)}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: 'rgba(239, 233, 220, 0.95)',
                      border: '2px solid var(--brass)',
                      color: 'var(--ink)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 0 4px rgba(168,122,52,0.25), 0 4px 12px rgba(0,0,0,0.3)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--brass)' }}>
                      +
                    </span>
                  </button>

                  {/* Hotspot Glassmorphic Tooltip Card */}
                  {isOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '130%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 220,
                        background: 'rgba(22, 33, 29, 0.94)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(168,122,52,0.4)',
                        borderRadius: 10,
                        padding: '10px 14px',
                        color: '#fdfbf7',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                        pointerEvents: 'none',
                        zIndex: 30,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          color: 'var(--brass)',
                          textTransform: 'uppercase',
                          marginBottom: 3,
                        }}
                      >
                        {spot.category}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: '#ffffff',
                          lineHeight: 1.3,
                          marginBottom: 4,
                          fontFamily: 'var(--font-heading)',
                        }}
                      >
                        {spot.name}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'rgba(255,255,255,0.7)',
                          lineHeight: 1.3,
                          marginBottom: 6,
                        }}
                      >
                        {spot.specs}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '1px solid rgba(255,255,255,0.12)',
                          paddingTop: 6,
                          marginTop: 4,
                        }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#fef08a' }}>
                          {formattedPrice}
                          <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.8 }}>/day</span>
                        </span>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 3,
                            fontSize: 10,
                            color: '#86efac',
                            fontWeight: 600,
                          }}
                        >
                          <Check size={11} /> Installed
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </div>

      {/* ── Bottom Caption ── */}
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '6px 14px',
          fontSize: 12,
          color: 'var(--ink-soft)',
        }}
      >
        <span>📍 South Bali Delivery</span>
        <span style={{ opacity: 0.35 }}>•</span>
        <span>⚡ In-Villa White-Glove Setup & Tuning</span>
        <span style={{ opacity: 0.35 }}>•</span>
        <span>🛡️ 100% Tested Pro Gear</span>
      </div>
    </div>
  );
}
