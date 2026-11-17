import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, MoreHorizontal, Star } from 'lucide-react';
import { BookItem } from '../data/booksData';
import { BookCoverArtwork } from './BookCoverArtwork';

interface BookCardProps {
  book: BookItem;
  isSaved: boolean;
  isDownloaded?: boolean;
  index?: number;
  onToggleSave: (bookId: string) => void;
  onToggleDownload?: (bookId: string) => void;
  onReadBook: (book: BookItem) => void;
  onOpenDetails: (book: BookItem) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  isSaved,
  isDownloaded = false,
  index = 0,
  onToggleSave,
  onToggleDownload,
  onReadBook,
  onOpenDetails
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: Math.min(index * 0.04, 0.25), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative rounded-[20px] overflow-hidden bg-[#171411] border border-white/12 aspect-[0.68] shadow-[0_14px_30px_rgba(0,0,0,0.35)] flex flex-col justify-end"
    >
      {/* Full-bleed Book Cover Artwork (clickable to read) */}
      <button
        type="button"
        onClick={() => onReadBook(book)}
        aria-label={`Read ${book.title}`}
        className="absolute inset-0 w-full h-full text-left focus-visible:outline-none cursor-pointer"
      >
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <BookCoverArtwork variant={book.coverVariant} size="card" />
        </div>
        {/* Measured Bottom Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/38 to-black/10 pointer-events-none" />
      </button>

      {/* Top-Right Three-Dots Menu Button */}
      <div ref={menuRef} className="absolute top-3 right-3 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          aria-expanded={menuOpen}
          aria-label={`Options for ${book.title}`}
          className="w-7 h-7 rounded-full bg-black/45 hover:bg-black/70 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/85 hover:text-white transition-colors cursor-pointer"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.14 }}
              className="absolute right-0 mt-1.5 w-36 p-1 rounded-xl bg-[#221e1a]/95 backdrop-blur-xl border border-white/15 shadow-2xl z-30"
            >
              <button
                type="button"
                onClick={() => {
                  onReadBook(book);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-white/85 hover:bg-white/12 hover:text-white cursor-pointer"
              >
                Read now
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenDetails(book);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-white/85 hover:bg-white/12 hover:text-white cursor-pointer"
              >
                Book details
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggleSave(book.id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-white/85 hover:bg-white/12 hover:text-white cursor-pointer"
              >
                {isSaved ? 'Remove save' : 'Save book'}
              </button>
              {onToggleDownload && (
                <button
                  type="button"
                  onClick={() => {
                    onToggleDownload(book.id);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-white/85 hover:bg-white/12 hover:text-white cursor-pointer"
                >
                  {isDownloaded ? 'Remove offline' : 'Download offline'}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Metadata & Floating White Bookmark Action */}
      <div className="relative z-10 p-3.5 flex items-end justify-between gap-2 pointer-events-none">
        <div className="min-w-0 flex-1">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white/90 mb-2">
            {book.category}
          </span>
          <h3 className="text-[13.5px] font-semibold text-white truncate leading-snug">
            {book.title}
          </h3>
          <p className="text-[11px] text-white/65 truncate mt-0.5">{book.author}</p>
          <div className="flex items-center gap-1 mt-1 text-[11px] font-medium text-white/90 tabular-nums">
            <span>{book.rating.toFixed(1)}</span>
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          </div>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(book.id);
          }}
          aria-label={isSaved ? `Unsave ${book.title}` : `Save ${book.title}`}
          className={`pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-colors shrink-0 cursor-pointer ${
            isSaved
              ? 'bg-amber-300 text-[#181410]'
              : 'bg-white text-[#181410] hover:bg-white/90'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#181410]' : ''}`} />
        </motion.button>
      </div>
    </motion.article>
  );
};
