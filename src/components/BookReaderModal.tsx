import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Download,
  Check,
  Minus,
  Plus,
  List
} from 'lucide-react';
import { BookItem } from '../data/booksData';

export type ReaderTheme = 'dark' | 'sepia' | 'paper';

interface BookReaderModalProps {
  book: BookItem;
  progress: number;
  isSaved: boolean;
  isDownloaded: boolean;
  defaultTheme: ReaderTheme;
  defaultFontSize: number;
  onClose: () => void;
  onUpdateProgress: (bookId: string, progress: number) => void;
  onToggleSave: (bookId: string) => void;
  onToggleDownload: (bookId: string) => void;
}

const THEME_STYLES: Record<
  ReaderTheme,
  {
    modal: string;
    border: string;
    muted: string;
    pillTrack: string;
    pillActive: string;
    btn: string;
    popover: string;
  }
> = {
  dark: {
    modal: 'bg-[#171513] text-[#f2eee7] border-white/15',
    border: 'border-white/10',
    muted: 'text-white/60',
    pillTrack: 'bg-white/8 border-white/12',
    pillActive: 'bg-white/22 text-white font-semibold',
    btn: 'bg-white/10 hover:bg-white/18 text-white',
    popover: 'bg-[#221f1c] border-white/15 text-white'
  },
  sepia: {
    modal: 'bg-[#efe6d5] text-[#2c2219] border-amber-900/20',
    border: 'border-amber-900/12',
    muted: 'text-[#6c5842]',
    pillTrack: 'bg-amber-900/8 border-amber-900/15',
    pillActive: 'bg-amber-900/18 text-[#2c2219] font-semibold',
    btn: 'bg-amber-900/10 hover:bg-amber-900/18 text-[#2c2219]',
    popover: 'bg-[#f6efe2] border-amber-900/20 text-[#2c2219]'
  },
  paper: {
    modal: 'bg-[#f8f6f1] text-[#1c1917] border-stone-300',
    border: 'border-stone-200',
    muted: 'text-stone-500',
    pillTrack: 'bg-stone-200/70 border-stone-300/80',
    pillActive: 'bg-white text-stone-900 shadow-sm font-semibold',
    btn: 'bg-stone-200/75 hover:bg-stone-300/75 text-stone-900',
    popover: 'bg-white border-stone-200 text-stone-900'
  }
};

export const BookReaderModal: React.FC<BookReaderModalProps> = ({
  book,
  progress,
  isSaved,
  isDownloaded,
  defaultTheme,
  defaultFontSize,
  onClose,
  onUpdateProgress,
  onToggleSave,
  onToggleDownload
}) => {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [theme, setTheme] = useState<ReaderTheme>(defaultTheme);
  const [fontSize, setFontSize] = useState(defaultFontSize);

  const chapters = book.chapters;
  const activeChapter = chapters[chapterIdx] ?? chapters[0];
  const styles = THEME_STYLES[theme];

  useEffect(() => {
    setChapterIdx(0);
    setTocOpen(false);
  }, [book.id]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && chapterIdx < chapters.length - 1) {
        const next = chapterIdx + 1;
        setChapterIdx(next);
        const nextPct = Math.min(100, Math.max(progress, Math.round(((next + 1) / chapters.length) * 100)));
        onUpdateProgress(book.id, nextPct);
      } else if (e.key === 'ArrowLeft' && chapterIdx > 0) {
        setChapterIdx(chapterIdx - 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [book.id, chapterIdx, chapters.length, progress, onClose, onUpdateProgress]);

  const handleNextChapter = () => {
    if (chapterIdx < chapters.length - 1) {
      const next = chapterIdx + 1;
      setChapterIdx(next);
      const nextPct = Math.min(100, Math.max(progress, Math.round(((next + 1) / chapters.length) * 100)));
      onUpdateProgress(book.id, nextPct);
    }
  };

  const handlePrevChapter = () => {
    if (chapterIdx > 0) {
      setChapterIdx(chapterIdx - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Reading ${book.title}`}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-3xl max-h-[88vh] rounded-[26px] border shadow-[0_32px_90px_rgba(0,0,0,0.65)] flex flex-col overflow-hidden transition-colors duration-200 ${styles.modal}`}
      >
        {/* Reader Top Toolbar */}
        <div className={`flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b ${styles.border}`}>
          <div className="min-w-0">
            <div className="text-[14px] font-semibold truncate">{book.title}</div>
            <div className={`text-[12px] ${styles.muted}`}>{book.author}</div>
          </div>

          <div className="flex items-center gap-2">
            {/* Chapters TOC Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setTocOpen((prev) => !prev)}
                aria-label="Chapters"
                className={`p-2 rounded-full transition-colors cursor-pointer ${styles.btn}`}
              >
                <List className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {tocOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    className={`absolute right-0 mt-2 w-60 p-1.5 rounded-2xl border shadow-2xl z-30 ${styles.popover}`}
                  >
                    <div className={`px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${styles.muted}`}>
                      Contents
                    </div>
                    {chapters.map((ch, idx) => (
                      <button
                        key={ch.title}
                        type="button"
                        onClick={() => {
                          setChapterIdx(idx);
                          setTocOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-xl text-[12px] transition-colors cursor-pointer ${
                          idx === chapterIdx ? styles.pillActive : 'opacity-80 hover:opacity-100'
                        }`}
                      >
                        {ch.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Switcher */}
            <div className={`flex items-center gap-1 p-1 rounded-full border ${styles.pillTrack}`}>
              {(['dark', 'sepia', 'paper'] as ReaderTheme[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  aria-label={`${t} reader theme`}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium capitalize transition-colors cursor-pointer ${
                    theme === t ? styles.pillActive : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Font Size Stepper */}
            <div className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-full border ${styles.pillTrack}`}>
              <button
                type="button"
                onClick={() => setFontSize((s) => Math.max(15, s - 1))}
                aria-label="Decrease text size"
                className="p-1 opacity-75 hover:opacity-100 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] tabular-nums w-6 text-center">{fontSize}</span>
              <button
                type="button"
                onClick={() => setFontSize((s) => Math.min(24, s + 1))}
                aria-label="Increase text size"
                className="p-1 opacity-75 hover:opacity-100 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => onToggleSave(book.id)}
              aria-label={isSaved ? 'Remove bookmark' : 'Add bookmark'}
              className={`p-2 rounded-full transition-colors cursor-pointer ${styles.btn}`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => onToggleDownload(book.id)}
              aria-label={isDownloaded ? 'Remove offline copy' : 'Download for offline reading'}
              className={`p-2 rounded-full transition-colors cursor-pointer ${styles.btn}`}
            >
              {isDownloaded ? <Check className="w-4 h-4 text-emerald-500" /> : <Download className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close reader"
              className={`p-2 rounded-full transition-colors cursor-pointer ${styles.btn}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reading Prose Area */}
        <div className="flex-1 overflow-y-auto glass-scroll px-6 sm:px-14 py-8 sm:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="max-w-[62ch] mx-auto"
            >
              <div className={`text-[12px] uppercase tracking-[0.2em] font-medium mb-2 ${styles.muted}`}>
                Section {chapterIdx + 1} of {chapters.length}
              </div>
              <h2 className="font-editorial text-[28px] sm:text-[34px] font-semibold leading-tight mb-6">
                {activeChapter.title}
              </h2>
              <div className="space-y-5 font-editorial leading-[1.72]" style={{ fontSize: `${fontSize}px` }}>
                {activeChapter.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Chapter & Live Progress Footer */}
        <div className={`px-6 py-4 border-t ${styles.border} flex flex-wrap items-center justify-between gap-4`}>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={chapterIdx === 0}
              onClick={handlePrevChapter}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full disabled:opacity-35 text-[12px] font-medium transition-colors cursor-pointer disabled:cursor-not-allowed ${styles.btn}`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              disabled={chapterIdx >= chapters.length - 1}
              onClick={handleNextChapter}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full disabled:opacity-35 text-[12px] font-medium transition-colors cursor-pointer disabled:cursor-not-allowed ${styles.btn}`}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3 min-w-[190px]">
            <span className={`text-[11px] font-medium ${styles.muted}`}>Progress</span>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => onUpdateProgress(book.id, Number(e.target.value))}
              aria-label="Reading progress percentage"
              className="w-28 accent-amber-400 cursor-pointer"
            />
            <span className="text-[12px] font-semibold tabular-nums w-9 text-right">
              {progress}%
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
