import React from 'react';
import {
  Armchair,
  Table,
  Layers,
  Briefcase,
  Maximize2,
  Feather,
  Gamepad2,
  CircleDot,
  Monitor,
  Tv,
  LampDesk,
  Leaf,
  Keyboard,
  Camera,
  Coffee,
  Waves,
  Bike,
  Zap,
  Sofa,
  Palmtree,
  Wrench,
  Package,
  Sparkles,
  LucideProps,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  // Desks
  'desk-oak': Layers,
  'desk-walnut': Briefcase,
  'desk-white': Table,
  'desk-glass': Maximize2,

  // Chairs
  'chair-aeron': Armchair,
  'chair-mesh': Feather,
  'chair-gaming': Gamepad2,
  'chair-stool': CircleDot,

  // Accessories
  'acc-monitor-27': Monitor,
  'acc-monitor-ultra': Tv,
  'acc-screenbar': LampDesk,
  'acc-plant': Leaf,
  'acc-keyboard': Keyboard,
  'acc-camera': Camera,

  // Extras
  'extra-coffee-machine': Coffee,
  'extra-pour-over': Coffee,
  'extra-surfboard': Waves,
  'extra-motorcycle': Zap,
  'extra-bicycle': Bike,
  'extra-bean-bag': Sofa,
  'extra-hammock': Palmtree,
  'extra-tool-shelf': Wrench,
  'extra-locker': Package,
};

interface ItemIconProps {
  id: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ItemIcon({
  id,
  size = 18,
  className = '',
  style,
}: ItemIconProps) {
  const IconComponent = ICON_MAP[id] || Sparkles;
  return <IconComponent size={size} className={className} style={style} strokeWidth={1.75} />;
}
