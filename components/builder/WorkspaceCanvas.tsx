'use client';

import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspaceStore';

export default function WorkspaceCanvas() {
  const { desk, chair, tech, accessories } = useWorkspaceStore();
  const [ambiance, setAmbiance] = useState<'day' | 'night'>('day');

  const monitor1 = tech.find((t) => t.id === 'tech-4k-27' || t.id === 'tech-ultrawide');
  const monitor2 = tech.find((t) => t.id === 'tech-4k-27' && monitor1?.id !== 'tech-4k-27');
  const hasKeyboard = tech.some((t) => t.id === 'tech-keyboard-mouse');
  const hasWebcam = tech.some((t) => t.id === 'tech-webcam-4k');
  const hasLamp = accessories.some((a) => a.id === 'acc-screenbar');
  const hasPlant = accessories.some((a) => a.id === 'acc-monstera');
  const hasCoffee = accessories.some((a) => a.id === 'acc-coffee-espresso');
  const hasSurfboard = accessories.some((a) => a.id === 'acc-surfboard');
  const hasLaptopStand = accessories.some((a) => a.id === 'acc-laptop-stand');
  const hasBeanBag = accessories.some((a) => a.id === 'acc-bean-bag');

  const isNight = ambiance === 'night';

  return (
    <div
      className="workspace-canvas"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 10',
        minHeight: 340,
        overflow: 'hidden',
        userSelect: 'none',
        borderRadius: 12,
        border: '1px solid ' + (isNight ? 'rgba(148,163,184,0.15)' : '#e5e7eb'),
        boxShadow: isNight
          ? '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)'
          : '0 4px 24px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.5s ease',
      }}
    >
      {/* ── Ambiance Mode Switch ── */}
      <button
        onClick={() => setAmbiance(isNight ? 'day' : 'night')}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: isNight ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.92)',
          color: isNight ? '#cbd5e1' : '#374151',
          border: '1px solid ' + (isNight ? 'rgba(100,116,139,0.4)' : 'rgba(0,0,0,0.1)'),
          borderRadius: 99,
          padding: '5px 12px',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          boxShadow: isNight
            ? '0 2px 12px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'all 0.25s ease',
        }}
        title="Toggle Day / Evening Ambiance"
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

      {/* ── Background: Bali villa room ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isNight
            ? 'linear-gradient(180deg, #090d16 0%, #0f172a 30%, #1e293b 55%, #1e1b4b 75%, #451a03 100%)'
            : 'linear-gradient(180deg, #dbeafe 0%, #eff6ff 25%, #f8fafc 55%, #f1f5f9 75%, #e2d9c8 100%)',
          transition: 'background 0.5s ease',
        }}
      />

      {/* Wall surface */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '35%',
          background: isNight
            ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
          transition: 'all 0.5s ease',
        }}
      />

      {/* Floor */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: isNight
            ? 'linear-gradient(180deg, #3b1f0a 0%, #1c0a02 100%)'
            : 'linear-gradient(180deg, #d4a574 0%, #b8876a 100%)',
          borderTop: '2px solid ' + (isNight ? 'rgba(69,26,3,0.8)' : 'rgba(180,120,80,0.5)'),
          transition: 'all 0.5s ease',
        }}
      />

      {/* Window */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '30%',
          height: '28%',
          background: isNight
            ? 'linear-gradient(180deg, #020617 0%, #0b132b 100%)'
            : 'linear-gradient(180deg, #bae6fd 0%, #e0f2fe 100%)',
          border: '3px solid ' + (isNight ? '#334155' : '#e2e8f0'),
          borderRadius: 4,
          boxShadow: isNight
            ? '0 0 30px 8px rgba(56,189,248,0.1)'
            : '0 0 40px 10px rgba(186,230,253,0.45)',
          transition: 'all 0.5s ease',
          overflow: 'hidden',
        }}
      >
        {isNight && (
          <>
            <div style={{ position: 'absolute', top: 8, right: 12, width: 14, height: 14, borderRadius: '50%', background: '#fef08a', boxShadow: '0 0 12px 4px rgba(254,240,138,0.7)' }} />
            <div style={{ position: 'absolute', top: 12, left: 16, width: 2, height: 2, background: '#ffffff', borderRadius: '50%', opacity: 0.8 }} />
            <div style={{ position: 'absolute', top: 22, left: 34, width: 2, height: 2, background: '#ffffff', borderRadius: '50%', opacity: 0.6 }} />
            <div style={{ position: 'absolute', top: 16, right: 38, width: 2, height: 2, background: '#ffffff', borderRadius: '50%', opacity: 0.7 }} />
          </>
        )}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: isNight ? 'rgba(51,65,85,0.7)' : 'rgba(226,232,240,0.6)' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 2, background: isNight ? 'rgba(51,65,85,0.7)' : 'rgba(226,232,240,0.6)' }} />
        </div>
      </div>

      {/* Surfboard (leans against left wall) */}
      {hasSurfboard && (
        <div
          style={{
            position: 'absolute',
            bottom: '33%',
            left: '5%',
            width: '4%',
            height: '38%',
            background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
            borderRadius: '50% 50% 30% 30% / 60% 60% 40% 40%',
            transform: 'rotate(-8deg)',
            boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
          }}
        />
      )}

      {/* Bean bag */}
      {hasBeanBag && (
        <div
          style={{
            position: 'absolute',
            bottom: '34%',
            left: hasSurfboard ? '9%' : '5%',
            width: '10%',
            height: '10%',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        />
      )}

      {/* ── Desk ── */}
      {desk && (
        <div
          style={{
            position: 'absolute',
            bottom: '30%',
            left: '18%',
            right: '18%',
            zIndex: 10,
          }}
        >
          {/* Desk surface */}
          <div
            style={{
              height: desk.id === 'desk-standing-oak' ? 14 : 11,
              background:
                desk.id === 'desk-walnut-executive'
                  ? 'linear-gradient(180deg, #8B5E3C 0%, #6B4226 100%)'
                  : desk.id === 'desk-glass-corner'
                  ? 'linear-gradient(180deg, rgba(186,230,253,0.6) 0%, rgba(147,210,245,0.5) 100%)'
                  : desk.id === 'desk-standing-oak'
                  ? 'linear-gradient(180deg, #c8a882 0%, #a0785a 100%)'
                  : 'linear-gradient(180deg, #f5f5f5 0%, #e5e5e5 100%)',
              borderRadius: '3px 3px 0 0',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 3px 12px rgba(0,0,0,0.2)',
              position: 'relative',
            }}
          />
          {/* Desk legs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8%' }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: desk.id === 'desk-standing-oak' ? 5 : 4,
                  height: desk.id === 'desk-standing-oak' ? 45 : 38,
                  background: desk.id === 'desk-glass-corner' ? '#94a3b8' : '#9ca3af',
                  borderRadius: '0 0 2px 2px',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── ScreenBar Lamp ── */}
      {desk && hasLamp && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(30% + 20px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 60,
              height: 6,
              background: isNight
                ? 'linear-gradient(90deg, rgba(254,215,170,0) 0%, #fed7aa 20%, #fed7aa 80%, rgba(254,215,170,0) 100%)'
                : 'linear-gradient(90deg, rgba(55,65,81,0) 0%, #374151 20%, #374151 80%, rgba(55,65,81,0) 100%)',
              borderRadius: 99,
              boxShadow: isNight ? '0 0 18px 6px rgba(251,191,36,0.35)' : 'none',
            }}
          />
          {isNight && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '30px solid transparent',
                borderRight: '30px solid transparent',
                borderTop: '55px solid rgba(251,191,36,0.07)',
                marginTop: 0,
              }}
            />
          )}
        </div>
      )}

      {/* ── Monitor 1 ── */}
      {desk && monitor1 && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(30% + 14px)',
            left: monitor1.id === 'tech-ultrawide' ? '28%' : '33%',
            zIndex: 12,
          }}
        >
          {/* Screen */}
          <div
            style={{
              width: monitor1.id === 'tech-ultrawide' ? 110 : 78,
              height: monitor1.id === 'tech-ultrawide' ? 58 : 52,
              background: isNight
                ? 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)'
                : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: '4px 4px 0 0',
              border: '3px solid #374151',
              boxShadow: isNight
                ? '0 0 20px rgba(56,189,248,0.25), 0 4px 12px rgba(0,0,0,0.4)'
                : '0 4px 12px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Screen content glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(99,102,241,0.08) 100%)',
              }}
            />
            {/* Status bar dots */}
            <div style={{ position: 'absolute', top: 4, left: 6, display: 'flex', gap: 3 }}>
              {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
                <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: c }} />
              ))}
            </div>
            {/* Code lines */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 6,
                  top: 14 + i * 8,
                  height: 2,
                  width: `${50 + (i % 3) * 15}%`,
                  background: `rgba(${i === 0 ? '99,102,241' : i === 1 ? '56,189,248' : '34,197,94'},0.5)`,
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
          {/* Monitor stand */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 3, height: 8, background: '#6b7280' }} />
          </div>
          <div style={{ width: monitor1.id === 'tech-ultrawide' ? 44 : 30, height: 3, background: '#6b7280', margin: '0 auto', borderRadius: 2 }} />
        </div>
      )}

      {/* ── Laptop stand (only if no primary monitor) ── */}
      {desk && hasLaptopStand && !monitor1 && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(30% + 12px)',
            left: '44%',
            zIndex: 12,
          }}
        >
          <div style={{ width: 42, height: 4, background: '#9ca3af', borderRadius: 2, transform: 'perspective(200px) rotateX(10deg)' }} />
          <div style={{ width: 0, height: 0, borderLeft: '21px solid transparent', borderRight: '21px solid transparent', borderTop: '18px solid #9ca3af', margin: '0 auto' }} />
        </div>
      )}

      {/* ── Keyboard ── */}
      {desk && hasKeyboard && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(30% + 4px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 11,
          }}
        >
          <div
            style={{
              width: 68,
              height: 18,
              background: 'linear-gradient(180deg, #374151 0%, #1f2937 100%)',
              borderRadius: 4,
              border: '1px solid #4b5563',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 3,
              padding: '2px 4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {[3, 4, 3].map((count, row) => (
              <div key={row} style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 2, background: '#6b7280', borderRadius: 1 }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Webcam (top of monitor) ── */}
      {desk && hasWebcam && monitor1 && (
        <div
          style={{
            position: 'absolute',
            bottom: monitor1.id === 'tech-ultrawide' ? 'calc(30% + 72px)' : 'calc(30% + 67px)',
            left: monitor1.id === 'tech-ultrawide' ? '44%' : '43%',
            zIndex: 16,
          }}
        >
          <div
            style={{
              width: 14,
              height: 8,
              background: '#111827',
              borderRadius: 4,
              border: '1px solid #374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#3b82f6', boxShadow: isNight ? '0 0 6px rgba(59,130,246,0.8)' : 'none' }} />
          </div>
        </div>
      )}

      {/* ── Chair ── */}
      {chair && (
        <div
          style={{
            position: 'absolute',
            bottom: '28%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9,
          }}
        >
          {/* Chair back */}
          <div
            style={{
              width: chair.id === 'chair-aeron' ? 40 : 36,
              height: chair.id === 'chair-aeron' ? 48 : 42,
              background:
                chair.id === 'chair-aeron'
                  ? 'linear-gradient(180deg, #374151 0%, #1f2937 100%)'
                  : chair.id === 'chair-scandi-cushion'
                  ? 'linear-gradient(180deg, #d4b896 0%, #c49a73 100%)'
                  : chair.id === 'chair-gaming-racer'
                  ? 'linear-gradient(180deg, #ef4444 0%, #b91c1c 100%)'
                  : 'linear-gradient(180deg, #4b5563 0%, #374151 100%)',
              borderRadius:
                chair.id === 'chair-aeron'
                  ? '20px 20px 4px 4px'
                  : chair.id === 'chair-scandi-cushion'
                  ? '16px 16px 4px 4px'
                  : '10px 10px 4px 4px',
              margin: '0 auto',
              border: '1px solid rgba(0,0,0,0.1)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          />
          {/* Seat */}
          <div
            style={{
              width: chair.id === 'chair-aeron' ? 48 : 44,
              height: 12,
              background:
                chair.id === 'chair-scandi-cushion'
                  ? 'linear-gradient(180deg, #e8d5bc 0%, #d4b896 100%)'
                  : 'linear-gradient(180deg, #4b5563 0%, #374151 100%)',
              borderRadius: '4px 4px 2px 2px',
              margin: '2px auto 0',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            }}
          />
          {/* Chair stem */}
          <div style={{ width: 3, height: 14, background: '#9ca3af', margin: '0 auto' }} />
          {/* Chair base */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
            {[-1, 0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: 2,
                  height: 8,
                  background: '#6b7280',
                  transform: `rotate(${i * 30}deg)`,
                  transformOrigin: 'top center',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Coffee machine ── */}
      {desk && hasCoffee && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(30% + 10px)',
            right: 'calc(18% + 20px)',
            zIndex: 11,
          }}
        >
          <div
            style={{
              width: 22,
              height: 28,
              background: 'linear-gradient(180deg, #1f2937 0%, #111827 100%)',
              borderRadius: '4px 4px 2px 2px',
              border: '1px solid #374151',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 4,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 6,
                height: 6,
                background: '#f59e0b',
                borderRadius: '50%',
                boxShadow: '0 0 6px rgba(245,158,11,0.6)',
              }}
            />
          </div>
          <div
            style={{
              width: 14,
              height: 10,
              background: '#ffffff',
              borderRadius: '0 0 4px 4px',
              border: '1px solid #e5e7eb',
              margin: '0 auto',
            }}
          />
        </div>
      )}

      {/* ── Monstera Plant ── */}
      {hasPlant && (
        <div
          style={{
            position: 'absolute',
            bottom: '33%',
            right: desk ? 'calc(18% - 2px)' : '8%',
            zIndex: 13,
          }}
        >
          {/* Pot */}
          <div
            style={{
              width: 22,
              height: 18,
              background: 'linear-gradient(180deg, #c2410c 0%, #9a3412 100%)',
              borderRadius: '2px 2px 8px 8px',
              margin: '0 auto',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
          {/* Stem */}
          <div style={{ width: 2, height: 14, background: '#16a34a', margin: '-14px auto 0' }} />
          {/* Leaves */}
          <div
            style={{
              width: 32,
              height: 22,
              background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
              borderRadius: '0 60% 0 60%',
              marginLeft: -4,
              marginTop: -18,
              transform: 'rotate(-20deg)',
              boxShadow: '1px 2px 4px rgba(0,0,0,0.15)',
            }}
          />
          <div
            style={{
              width: 28,
              height: 18,
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              borderRadius: '60% 0 60% 0',
              marginLeft: 8,
              marginTop: -10,
              transform: 'rotate(10deg)',
              boxShadow: '1px 2px 4px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      )}

      {/* ── Empty state call to action ── */}
      {!desk && !chair && tech.length === 0 && accessories.length === 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.92)',
              borderRadius: 12,
              padding: '24px 36px',
              textAlign: 'center',
              border: '1px dashed #d1d5db',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 10 }}>🪑</div>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 6 }}>
              Your workspace is empty
            </p>
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 0 }}>
              Pick items from the left panel
            </p>
            <p style={{ fontSize: 12, color: '#9ca3af' }}>
              or apply a quick preset above
            </p>
            <div
              style={{
                marginTop: 14,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 99,
                padding: '4px 12px',
              }}
            >
              <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>
                ← Select a desk to start
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
