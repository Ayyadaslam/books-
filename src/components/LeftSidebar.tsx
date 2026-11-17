import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Bookmark, ChevronDown } from 'lucide-react';
import { BookItem } from '../data/booksData';
import { BookCoverArtwork } from './BookCoverArtwork';

type SortOption = 'Latest' | 'Title' | 'Rating';

interface LeftSidebarProps {
  newReleases: BookItem[];
  continueReading: BookItem[];
  savedBookIds: Set<string>;
  readingProgressMap: Record<string, number>;
  onToggleSave: (bookId: string) => void;
  onOpenBook: (book: BookItem) => void;
  onReadBook: (book: BookItem) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  newReleases,
  continueReading,
  savedBookIds,
  readingProgressMap,
  onToggleSave,
  onOpenBook,
  onReadBook
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('Latest');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const sortedReleases = [...newReleases].sort((a, b) => {
    if (sortBy === 'Title') return a.title.localeCompare(b.title);
    if (sortBy === 'Rating') return b.rating - a.rating;
    return b.year - a.year;
  });

  return (
    <aside className="w-full lg:w-[270px] xl:w-[295px] shrink-0 flex flex-col gap-4">
      {/* Top Panel: New Releases */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[22px] bg-white/[0.08] border border-white/12 p-4 backdrop-blur-md"
      >
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2 text-white">
            <BookOpen className="w-4 h-4 text-white/80" />
            <h2 className="text-[14px] font-semibold tracking-tight">New Releases</h2>
          </div>

          <div ref={sortRef} className="relative">
            <button
              type="button"
              onClick={() => setSortMenuOpen((prev) => !prev)}
              aria-expanded={sortMenuOpen}
              className="flex items-center gap-1 text-[11px] text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <span>Sort by:</span>
              <span className="text-white/90 font-medium">{sortBy}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${sortMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {sortMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.14 }}
                  className="absolute right-0 mt-1.5 w-28 p-1 rounded-xl bg-[#27221d]/95 backdrop-blur-xl border border-white/15 shadow-xl z-30"
                >
                  {(['Latest', 'Title', 'Rating'] as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSortBy(opt);
                        setSortMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                        sortBy === opt
                          ? 'bg-white/18 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2.5">
          {sortedReleases.map((book) => {
            const isSaved = savedBookIds.has(book.id);
            return (
              <motion.div
                layout
                key={book.id}
                className="group flex items-center justify-between gap-2.5 p-1.5 -mx-1.5 rounded-xl hover:bg-white/[0.08] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => onOpenBook(book)}
                  className="flex items-center gap-3 min-w-0 flex-1 text-left focus-visible:outline-none cursor-pointer"
                >
                  <div className="w-10 h-12 rounded-[6px] overflow-hidden shrink-0 shadow-md ring-1 ring-white/15 transition-transform duration-200 group-hover:scale-105">
                    <BookCoverArtwork variant={book.coverVariant} size="thumb" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-medium text-white truncate group-hover:text-amber-100 transition-colors">
                      {book.title}
                    </div>
                    <div className="text-[11px] text-white/55 truncate mt-0.5">
                      {book.author}
                    </div>
                  </div>
                </button>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  onClick={() => onToggleSave(book.id)}
                  aria-label={isSaved ? `Remove ${book.title} from saved` : `Save ${book.title}`}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                >
                  <Bookmark
                    className={`w-4 h-4 transition-colors ${
                      isSaved ? 'fill-white text-white' : 'text-white/55'
                    }`}
                  />
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Bottom Panel: Continue Reading */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[22px] bg-white/[0.08] border border-white/12 p-4 backdrop-blur-md flex-1"
      >
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-[14px] font-semibold tracking-tight text-white">
            Continue Reading
          </h2>
          <span className="text-[11px] text-white/50 tabular-nums">
            {continueReading.length} active
          </span>
        </div>

        <div className="space-y-3 max-h-[340px] overflow-y-auto glass-scroll pr-1">
          {continueReading.map((book) => {
            const pct = readingProgressMap[book.id] ?? book.continueReadingProgress ?? 0;
            return (
              <motion.button
                layout
                key={book.id}
                type="button"
                onClick={() => onReadBook(book)}
                className="group w-full flex items-center gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-white/[0.08] transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer"
              >
                <div className="w-8 h-10 rounded-[5px] overflow-hidden shrink-0 shadow-md ring-1 ring-white/15 transition-transform duration-200 group-hover:scale-105">
                  <BookCoverArtwork variant={book.coverVariant} size="thumb" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[12px] font-medium text-white truncate group-hover:text-amber-100 transition-colors">
                      {book.title}
                    </span>
                    <span className="text-[11px] font-medium text-white/70 tabular-nums shrink-0">
                      {pct}%
                    </span>
                  </div>
                  <div className="text-[10.5px] text-white/50 truncate mb-1.5">
                    {book.author}
                  </div>
                  <div className="h-[3px] w-full rounded-full bg-white/15 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-white/85"
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.section>
    </aside>
  );
};
