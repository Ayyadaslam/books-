import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Bell, ChevronDown, X, BookOpenCheck, Sparkles } from 'lucide-react';

export type NavFilter = 'Discover' | 'Fiction' | 'Non-fiction' | 'Mystery' | 'Fantasy' | 'Sci-Fi' | 'Biography';

interface TopNavBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: NavFilter;
  onSelectFilter: (filter: NavFilter) => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onSelectBookById: (id: string) => void;
}

const PRIMARY_TABS: NavFilter[] = ['Discover', 'Fiction', 'Non-fiction', 'Mystery'];
const MORE_TABS: NavFilter[] = ['Fantasy', 'Sci-Fi', 'Biography'];

const NOTIFICATIONS = [
  {
    id: 'n1',
    bookId: 'starless-archive',
    title: 'Editor’s Pick added',
    detail: 'The Starless Archive by Elian Voss is ready to read.'
  },
  {
    id: 'n2',
    bookId: 'project-hail-mary',
    title: 'New Release Spotlight',
    detail: 'Project Hail Mary climbed to #4 in New Releases.'
  },
  {
    id: 'n3',
    bookId: 'atomic-habits',
    title: 'Reading Streak: 14 Days',
    detail: 'Resume Atomic Habits from 56% progress.'
  }
];

export const TopNavBar: React.FC<TopNavBarProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onSelectFilter,
  onOpenProfile,
  onOpenSettings,
  onSelectBookById
}) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
        setNotifOpen(false);
        setUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const isMoreActive = MORE_TABS.includes(activeFilter);

  return (
    <header
      ref={navRef}
      className="relative z-30 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 lg:gap-8 px-4 md:px-6 pt-4 pb-3"
    >
      {/* Left: Search Books Bar */}
      <div className="relative w-full md:w-[270px] lg:w-[295px] shrink-0">
        <Search className="w-4 h-4 text-white/55 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search books"
          aria-label="Search books"
          className="w-full h-10 pl-10 pr-9 rounded-full bg-white/10 hover:bg-white/14 focus:bg-white/16 border border-white/10 focus:border-white/25 text-[13px] text-white placeholder:text-white/55 outline-none transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Center: Category Tabs */}
      <nav aria-label="Book categories" className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
        {PRIMARY_TABS.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                onSelectFilter(tab);
                setMoreOpen(false);
              }}
              className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                isActive ? 'text-white' : 'text-white/65 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="topCategoryActivePill"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-white/18 border border-white/15 shadow-sm"
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          );
        })}

        {/* More Dropdown Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setMoreOpen((prev) => !prev);
              setNotifOpen(false);
              setUserOpen(false);
            }}
            className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
              isMoreActive ? 'text-white' : 'text-white/65 hover:text-white'
            }`}
          >
            {isMoreActive && (
              <motion.span
                layoutId="topCategoryActivePill"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="absolute inset-0 rounded-full bg-white/18 border border-white/15 shadow-sm"
              />
            )}
            <span className="relative z-10">{isMoreActive ? activeFilter : 'More'}</span>
            <ChevronDown
              className={`relative z-10 w-3.5 h-3.5 transition-transform duration-150 ${
                moreOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {moreOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 mt-2 w-40 p-1.5 rounded-2xl bg-[#27231e]/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-50"
              >
                {MORE_TABS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      onSelectFilter(cat);
                      setMoreOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                      activeFilter === cat
                        ? 'bg-white/18 text-white'
                        : 'text-white/75 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Right: Notification Bell & User Profile */}
      <div className="flex items-center gap-2.5 shrink-0 ml-auto md:ml-0">
        {/* Notifications Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setUserOpen(false);
              setMoreOpen(false);
              setUnreadCount(0);
            }}
            aria-label="Notifications"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/18 border border-white/10 text-white/85 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <Bell className="w-[17px] h-[17px]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-emerald-400 text-[#131715] text-[10px] font-bold flex items-center justify-center tabular-nums">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 mt-2 w-80 p-3 rounded-2xl bg-[#24201b]/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-50"
              >
                <div className="flex items-center justify-between px-1 pb-2 border-b border-white/10">
                  <span className="text-[13px] font-semibold text-white">Library Updates</span>
                  <span className="text-[11px] text-white/50">Today</span>
                </div>
                <div className="mt-2 space-y-1.5">
                  {NOTIFICATIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectBookById(item.bookId);
                        setNotifOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-start gap-2.5"
                    >
                      <BookOpenCheck className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[12px] font-medium text-white">{item.title}</div>
                        <div className="text-[11px] text-white/60 leading-snug mt-0.5">
                          {item.detail}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setUserOpen((prev) => !prev);
              setNotifOpen(false);
              setMoreOpen(false);
            }}
            className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-white/10 hover:bg-white/16 border border-white/12 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-amber-300 flex items-center justify-center text-[12px] font-bold text-white shadow-inner shrink-0">
              AM
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-[12px] font-semibold text-white whitespace-nowrap">
                Arfi Maulana
              </div>
              <div className="text-[10px] text-white/60 whitespace-nowrap">@arfimaulana_</div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-white/70 transition-transform duration-150 ${
                userOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {userOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 mt-2 w-52 p-1.5 rounded-2xl bg-[#24201b]/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-50"
              >
                <button
                  type="button"
                  onClick={() => {
                    onOpenProfile();
                    setUserOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] text-white/85 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span>Reading Profile</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenSettings();
                    setUserOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-[13px] text-white/85 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Workspace Settings
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
