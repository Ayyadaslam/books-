import React from 'react';
import { motion } from 'motion/react';
import { Home, Heart, Download, User, Settings } from 'lucide-react';

export type DockTab = 'home' | 'saved' | 'downloads' | 'profile' | 'settings';

interface FloatingDockProps {
  activeTab: DockTab;
  onSelectTab: (tab: DockTab) => void;
  savedCount: number;
  downloadedCount: number;
}

const DOCK_ITEMS: { id: DockTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'saved', label: 'Saved Books', icon: Heart },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const FloatingDock: React.FC<FloatingDockProps> = ({
  activeTab,
  onSelectTab,
  savedCount,
  downloadedCount
}) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Primary workspace navigation"
      className="flex lg:flex-col items-center gap-2 p-2 rounded-full bg-[#4a433c]/60 backdrop-blur-2xl border border-white/18 shadow-[0_20px_50px_rgba(0,0,0,0.45)] shrink-0"
    >
      {DOCK_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        const badgeCount =
          item.id === 'saved' ? savedCount : item.id === 'downloads' ? downloadedCount : 0;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            title={item.label}
            className="group relative flex items-center justify-center w-10 h-10 rounded-full text-white/75 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {isActive && (
              <motion.span
                layoutId="floatingDockActive"
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                className="absolute inset-0 rounded-full bg-white/22 border border-white/20 shadow-inner"
              />
            )}
            <Icon
              className={`relative z-10 w-[18px] h-[18px] transition-transform duration-150 group-hover:scale-110 ${
                isActive ? 'text-white' : 'text-white/75 group-hover:text-white'
              }`}
            />
            {badgeCount > 0 && (
              <span className="sr-only">{badgeCount} items</span>
            )}
            {/* Hover label tooltip on desktop */}
            <span className="pointer-events-none hidden lg:block absolute left-14 px-2.5 py-1 rounded-lg bg-[#1d1a16]/90 border border-white/15 text-[11px] font-medium text-white whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 shadow-lg z-40">
              {item.label}
              {badgeCount > 0 ? ` (${badgeCount})` : ''}
            </span>
          </button>
        );
      })}
    </motion.aside>
  );
};
