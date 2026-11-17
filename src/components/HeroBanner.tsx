import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { BookItem } from '../data/booksData';
import { BookCoverArtwork } from './BookCoverArtwork';

interface HeroBannerProps {
  featuredBooks: BookItem[];
  savedBookIds: Set<string>;
  onReadBook: (book: BookItem) => void;
  onToggleSave: (bookId: string) => void;
  onOpenDetails: (book: BookItem) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredBooks,
  savedBookIds,
  onReadBook,
  onToggleSave,
  onOpenDetails
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const uid = useId().replace(/:/g, '');
  const mistId = `cavernMist-${uid}`;
  const archId = `archStone-${uid}`;
  const pedestalId = `pedestalStone-${uid}`;

  if (featuredBooks.length === 0) return null;

  const safeIndex = currentIndex % featuredBooks.length;
  const activeBook = featuredBooks[safeIndex];
  const isSaved = savedBookIds.has(activeBook.id);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredBooks.length);
  };

  const handleJump = (idx: number) => {
    setDirection(idx >= safeIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  return (
    <section
      aria-label="Featured book showcase"
      className="relative rounded-[24px] overflow-hidden border border-white/14 bg-[#0d1117] min-h-[345px] lg:min-h-[372px] flex items-end shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
    >
      {/* Atmospheric Subterranean Stone Library Cavern Artwork */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <svg
          viewBox="0 0 1000 480"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full opacity-95"
        >
          <defs>
            <radialGradient id={mistId} cx="48%" cy="32%" r="60%">
              <stop offset="0%" stopColor="#35485c" stopOpacity="0.65" />
              <stop offset="55%" stopColor="#161f29" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#090c10" stopOpacity="1" />
            </radialGradient>
            <linearGradient id={archId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#202a36" />
              <stop offset="100%" stopColor="#0b0f14" />
            </linearGradient>
            <linearGradient id={pedestalId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#37424d" />
              <stop offset="100%" stopColor="#12161b" />
            </linearGradient>
          </defs>
          <rect width="1000" height="480" fill={`url(#${mistId})`} />
          <path d="M180 480 L180 120 Q280 20 380 120 L380 480 Z" fill={`url(#${archId})`} opacity="0.55" />
          <path d="M405 480 L405 85 Q520 -10 635 85 L635 480 Z" fill={`url(#${archId})`} opacity="0.7" />
          <path d="M660 480 L660 110 Q785 15 910 110 L910 480 Z" fill={`url(#${archId})`} opacity="0.75" />
          {[145, 195, 245, 295, 345].map((y) => (
            <rect key={y} x="680" y={y} width="220" height="4" fill="#2c3744" opacity="0.65" />
          ))}
          <polygon points="560,480 620,382 990,374 1000,480" fill={`url(#${pedestalId})`} />
          <polygon points="620,382 990,374 965,360 635,368" fill="#465260" opacity="0.7" />
        </svg>

        <span className="animate-dust absolute top-[22%] left-[44%] w-1.5 h-1.5 rounded-full bg-slate-200/40" />
        <span
          className="animate-dust absolute top-[48%] left-[56%] w-1 h-1 rounded-full bg-slate-100/35"
          style={{ animationDelay: '2.1s' }}
        />
        <span
          className="animate-dust absolute top-[30%] left-[64%] w-1 h-1 rounded-full bg-amber-100/30"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Measured contrast scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#090c10]/92 via-[#090c10]/65 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#090c10]/85 via-transparent to-[#090c10]/25"
      />

      {/* Animated Slide Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeBook.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -24 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 p-6 md:p-8"
        >
          {/* Left Copy & Actions */}
          <div className="max-w-[490px] z-10 pb-8 md:pb-0">
            <div className="flex flex-wrap items-center gap-2 mb-3.5">
              {activeBook.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/12 border border-white/14 backdrop-blur-md text-[11px] font-medium text-white/85 whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-[28px] sm:text-[34px] leading-[1.12] font-semibold tracking-tight text-white [text-wrap:balance]">
              {activeBook.title}
            </h1>
            <p className="text-[14.5px] font-medium text-white/80 mt-1.5">
              {activeBook.author}
            </p>
            <p className="text-[13px] leading-relaxed text-white/70 mt-3 max-w-[430px]">
              {activeBook.synopsis}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 mt-6">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onReadBook(activeBook)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#141414] hover:bg-white/92 text-[13px] font-semibold shadow-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Now</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onToggleSave(activeBook.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full border text-[13px] font-medium backdrop-blur-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSaved
                    ? 'bg-white/24 border-white/40 text-white'
                    : 'bg-white/10 hover:bg-white/18 border-white/20 text-white/90'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenDetails(activeBook)}
                aria-label={`More details about ${activeBook.title}`}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/85 backdrop-blur-md transition-colors shrink-0 cursor-pointer"
              >
                <MoreHorizontal className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Right 3D Pedestal Hardcover Book */}
          <div className="hidden sm:flex items-center justify-center md:pr-6 md:pb-12 shrink-0">
            <motion.button
              type="button"
              onClick={() => onReadBook(activeBook)}
              aria-label={`Open ${activeBook.title} reader`}
              whileHover={{ y: -6, rotateY: -4, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{ perspective: 900 }}
              className="group relative cursor-pointer focus-visible:outline-none"
            >
              <div className="absolute -bottom-3 left-3 right-2 h-5 bg-black/75 blur-md rounded-full" />
              <div className="relative w-[170px] h-[238px] lg:w-[192px] lg:h-[268px] rounded-r-md rounded-l-sm overflow-hidden shadow-[-14px_18px_36px_rgba(0,0,0,0.75)] ring-1 ring-white/20">
                <BookCoverArtwork variant={activeBook.coverVariant} size="hero" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom-Right Carousel Navigation Arrows & Indicators */}
      <div className="absolute bottom-4 right-5 z-20 flex items-center gap-2.5">
        <div className="hidden sm:flex items-center gap-1.5 mr-1">
          {featuredBooks.map((fb, idx) => (
            <button
              key={fb.id}
              type="button"
              onClick={() => handleJump(idx)}
              aria-label={`Show ${fb.title}`}
              className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                idx === safeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous featured book"
          className="w-9 h-9 rounded-full bg-white/12 hover:bg-white/24 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/85 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next featured book"
          className="w-9 h-9 rounded-full bg-white/12 hover:bg-white/24 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/85 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
