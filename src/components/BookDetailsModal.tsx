import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, Bookmark, Download, Check, Star } from 'lucide-react';
import { BookItem } from '../data/booksData';
import { BookCoverArtwork } from './BookCoverArtwork';

interface BookDetailsModalProps {
  book: BookItem | null;
  isSaved: boolean;
  isDownloaded: boolean;
  progress: number;
  onClose: () => void;
  onReadNow: (book: BookItem) => void;
  onToggleSave: (bookId: string) => void;
  onToggleDownload: (bookId: string) => void;
}

export const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  book,
  isSaved,
  isDownloaded,
  progress,
  onClose,
  onReadNow,
  onToggleSave,
  onToggleDownload
}) => {
  useEffect(() => {
    if (!book) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [book, onClose]);

  if (!book) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${book.title}`}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-[26px] bg-[#221e1a]/95 border border-white/16 p-6 sm:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.65)] text-white"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-36 sm:w-44 aspect-[0.68] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20 shrink-0 mx-auto sm:mx-0">
            <BookCoverArtwork variant={book.coverVariant} size="hero" />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[12px] text-white/60 mb-2">
                <span>{book.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{book.year}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{book.pages} pages</span>
              </div>

              <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight leading-tight">
                {book.title}
              </h2>
              <p className="text-[14px] text-white/75 mt-1">{book.author}</p>

              <div className="flex items-center gap-1.5 mt-3 text-[13px] font-medium tabular-nums">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{book.rating.toFixed(1)}</span>
                {progress > 0 && (
                  <span className="text-white/55 ml-2">· {progress}% read</span>
                )}
              </div>

              <p className="text-[13.5px] leading-relaxed text-white/75 mt-4">
                {book.synopsis}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mt-6">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onReadNow(book);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#141414] hover:bg-white/90 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>{progress > 0 ? 'Continue Reading' : 'Read Now'}</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleSave(book.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-[13px] font-medium transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-white/22 border-white/35 text-white'
                    : 'bg-white/10 hover:bg-white/16 border-white/15 text-white/85'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleDownload(book.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/16 border border-white/15 text-[13px] font-medium text-white/85 transition-colors cursor-pointer"
              >
                {isDownloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Offline</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
