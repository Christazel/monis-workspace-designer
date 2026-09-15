'use client';

import { useState } from 'react';
import {
  Sun,
  Moon,
  Plus,
  Minus,
  Check,
  Coffee,
  Waves,
  Tv,
  Layers,
  Truck,
  Wrench,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useWorkspaceStore, useCurrency } from '@/store/workspaceStore';
import { formatIDR, formatUSD, ALL_PRODUCTS } from '@/data/products';
import { Product } from '@/data/types';

function HotspotPin({
  label,
  price,
  active,
  style,
}: {
  label: string;
  price?: string;
  active: boolean;
  style: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ position: 'absolute', zIndex: 20, ...style }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: active ? 'var(--ink)' : 'rgba(255,255,255,0.92)',
          border: active ? '2.5px solid var(--brass)' : '2px solid var(--ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: active
            ? '0 0 0 4px rgba(168,122,52,0.28), 0 4px 14px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.2)',
          transition: 'all 0.2s ease',
        }}
      >
        {active ? (
          <Check size={13} strokeWidth={2.5} color="var(--brass)" />
        ) : (
          <Plus size={13} strokeWidth={2.5} color="var(--ink)" />
        )}
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            minWidth: 160,
            background: 'rgba(22, 33, 29, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(168,122,52,0.35)',
            borderRadius: 10,
            padding: '8px 12px',
            color: '#fdfbf7',
            boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--brass)', textTransform: 'uppercase', marginBottom: 2 }}>
            {active ? 'Selected' : 'Available'}
          </p>
          <p style={{ fontSize: 12.5, fontWeight: 700 }}>{label}</p>
          {price && (
            <p style={{ fontSize: 11.5, color: '#fef08a', fontWeight: 600, marginTop: 3 }}>
              {price}<span style={{ fontSize: 10, fontWeight: 400, opacity: 0.8 }}>/day</span>
            </p>
          )}
          <div style={{
            position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
            width: 10, height: 10, background: 'rgba(22,33,29,0.95)',
            borderRight: '1px solid rgba(168,122,52,0.35)', borderBottom: '1px solid rgba(168,122,52,0.35)',
            clipPath: 'polygon(0 0, 100% 100%, 0 100%)', rotate: '-45deg',
          }} />
        </div>
      )}
    </div>
  );
}

function StationCard({
  icon, label, item, emptyLabel, onAdd, onRemove,
}: {
  icon: React.ReactNode;
  label: string;
  item?: Product;
  emptyLabel: string;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const currency = useCurrency();
  const priceStr = item ? (currency === 'IDR' ? formatIDR(item.price) : formatUSD(item.price)) : null;
  return (
    <div style={{
      width: '100%', minWidth: 0, background: 'var(--paper)',
      border: item ? '1.5px solid var(--ink)' : '1px solid var(--line)',
      borderRadius: 'var(--radius)', padding: '10px 12px', display: 'flex',
      flexDirection: 'column', gap: 7, transition: 'all 0.15s ease',
      boxShadow: item ? '0 2px 8px rgba(22,33,29,0.06)' : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: 'var(--brass)', display: 'flex' }}>{icon}</span>
        <span style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)' }}>
          {label}
        </span>
      </div>
      {item ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 38, height: 38, background: '#f6f3ee', borderRadius: 7, padding: 3, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
            <p style={{ fontSize: 10.5, color: 'var(--brass)', fontWeight: 700, marginTop: 1 }}>
              {priceStr}<span style={{ fontWeight: 400, color: 'var(--ink-soft)', fontSize: 9.5 }}>/day</span>
            </p>
          </div>
          <button onClick={onRemove} type="button" style={{
            width: 22, height: 22, borderRadius: '50%', border: '1px solid #e53e3e', background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#e53e3e', flexShrink: 0, transition: 'all 0.15s ease',
          }} title={"Remove " + item.name}>
            <Minus size={11} />
          </button>
        </div>
      ) : (
        <button onClick={onAdd} type="button" style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          padding: '7px 8px', border: '1.5px dashed var(--line)', borderRadius: 7, background: 'transparent',
          color: 'var(--ink-soft)', fontSize: 11.5, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease',
        }}>
          <Plus size={12} /><span>{emptyLabel}</span>
        </button>
      )}
    </div>
  );
}

export default function WorkspaceCanvas() {
  const [isNight, setIsNight] = useState(false);
  const { desk, chair, tech, accessories, setDesk, setChair, toggleTech, toggleAccessory, activePresetId, setCheckoutOpen } = useWorkspaceStore();
  const currency = useCurrency();

  const monitor = tech.find((t) => t.id === 'tech-ultrawide' || t.id === 'tech-4k-27');
  const monstera = accessories.find((a) => a.id === 'acc-monstera');
  const surfboard = accessories.find((a) => a.id === 'acc-surfboard');
  const beanBag = accessories.find((a) => a.id === 'acc-bean-bag');
  const coffeeMachine = accessories.find((a) => a.id === 'acc-coffee-espresso');
  const keyboardMouse = tech.find((t) => t.id === 'tech-keyboard-mouse');

  const fmtPrice = (p: Product) => currency === 'IDR' ? formatIDR(p.price) : formatUSD(p.price);

  const quickAdd = (id: string) => {
    const p = ALL_PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    if (p.category === 'desk') setDesk(p);
    else if (p.category === 'chair') setChair(p);
    else if (p.category === 'tech') toggleTech(p);
    else if (p.category === 'accessory') toggleAccessory(p);
  };

  let sceneSrc = isNight ? '/assets/scenes/developer-pro-night.jpg' : '/assets/scenes/developer-pro-day.jpg';
  if (activePresetId === 'preset-creator') {
    sceneSrc = isNight ? '/assets/scenes/creator-studio-night.jpg' : '/assets/scenes/creator-studio-day.jpg';
  } else if (activePresetId === 'preset-nomad') {
    sceneSrc = isNight ? '/assets/scenes/minimal-nomad-night.jpg' : '/assets/scenes/minimal-nomad-day.jpg';
  }

  const isEmpty = !desk && !chair && tech.length === 0 && accessories.length === 0;

  return (
    <div style={{ flex: 1, height: '100%', overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 16px 28px', background: 'var(--paper)', gap: 12 }}>

      <div style={{ width: '100%', maxWidth: 900, textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          Design Your Workspace
        </h2>
        <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 2 }}>
          Select gear from the catalog, or pick a curated preset above
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: 900, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 11px', background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: 30, fontSize: 11, fontWeight: 600, color: 'var(--ink)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <span>Interactive Preview — hover pins for details</span>
        </div>
        <button type="button" onClick={() => setIsNight(!isNight)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 30, border: '1px solid var(--line)', background: isNight ? 'var(--ink)' : 'var(--paper)', color: isNight ? 'var(--paper)' : 'var(--ink)', fontSize: 11.5, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', flexShrink: 0 }}>
          {isNight ? (<><Moon size={12} color="#fef08a" /><span>Evening</span></>) : (<><Sun size={12} color="var(--brass)" /><span>Daylight</span></>)}
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: 900, aspectRatio: '16 / 9', minHeight: 220, maxHeight: 440, borderRadius: 14, overflow: 'hidden', position: 'relative', border: '1px solid var(--line)', boxShadow: '0 8px 30px rgba(22,33,29,0.12)', flexShrink: 0 }}>
        <img src={sceneSrc} alt="Bali Villa Workspace" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s ease' }} />
        <div style={{ position: 'absolute', inset: 0, background: isNight ? 'radial-gradient(ellipse at 50% 60%, rgba(254,240,138,0.04) 0%, rgba(11,19,43,0.22) 100%)' : 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <HotspotPin label={desk?.name ?? 'No desk selected'} price={desk ? fmtPrice(desk) : undefined} active={!!desk} style={{ left: '50%', bottom: '28%', transform: 'translateX(-50%)' }} />
        <HotspotPin label={chair?.name ?? 'No chair selected'} price={chair ? fmtPrice(chair) : undefined} active={!!chair} style={{ left: '30%', bottom: '14%', transform: 'translateX(-50%)' }} />
        <HotspotPin label={monitor?.name ?? 'No monitor selected'} price={monitor ? fmtPrice(monitor) : undefined} active={!!monitor} style={{ left: '55%', top: '28%', transform: 'translateX(-50%)' }} />
        <HotspotPin label={monstera?.name ?? 'No plant selected'} price={monstera ? fmtPrice(monstera) : undefined} active={!!monstera} style={{ right: '14%', top: '44%' }} />
        {surfboard && <HotspotPin label={surfboard.name} price={fmtPrice(surfboard)} active={true} style={{ right: '5%', bottom: '15%' }} />}

        {isEmpty && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(2px)', gap: 8 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-heading)' }}>Start building your setup</p>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Pick a curated preset above, or select items from the left</p>
            <button onClick={() => quickAdd('desk-standing-oak')} type="button" style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 30, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 6px 18px rgba(22,33,29,0.22)' }}>
              <Plus size={14} />Quick Start
            </button>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setCheckoutOpen(true)} type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 22px', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 30, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 18px rgba(22,33,29,0.18)', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}>
          <span>Ready to Rent? Complete Setup</span>
          <ChevronRight size={15} />
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: 900, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
        <StationCard icon={<Coffee size={14} />} label="Coffee Station" item={coffeeMachine} emptyLabel="Add Coffee Machine" onAdd={() => quickAdd('acc-coffee-espresso')} onRemove={() => coffeeMachine && toggleAccessory(coffeeMachine)} />
        <StationCard icon={<Waves size={14} />} label="Outdoor Gear" item={surfboard} emptyLabel="Add Surfboard" onAdd={() => quickAdd('acc-surfboard')} onRemove={() => surfboard && toggleAccessory(surfboard)} />
        <StationCard icon={<Tv size={14} />} label="Relax Zone" item={beanBag} emptyLabel="Add Bean Bag" onAdd={() => quickAdd('acc-bean-bag')} onRemove={() => beanBag && toggleAccessory(beanBag)} />
        <StationCard icon={<Layers size={14} />} label="Input and Extras" item={keyboardMouse} emptyLabel="Add Keyboard and Mouse" onAdd={() => quickAdd('tech-keyboard-mouse')} onRemove={() => keyboardMouse && toggleTech(keyboardMouse)} />
      </div>

      <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 24px', fontSize: 11.5, color: 'var(--ink-soft)', paddingTop: 2 }}>
        {[
          { icon: <Truck size={13} color="var(--brass)" />, text: 'Next-day South Bali delivery' },
          { icon: <Wrench size={13} color="var(--brass)" />, text: 'In-villa white-glove setup' },
          { icon: <ShieldCheck size={13} color="var(--brass)" />, text: '100% tested professional gear' },
        ].map((b) => (
          <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {b.icon}<span>{b.text}</span>
          </div>
        ))}
      </div>

    </div>
  );
}