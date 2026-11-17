import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MotionConfig, motion, AnimatePresence } from 'motion/react';
import { INITIAL_BOOKS, BookItem } from './data/booksData';
import { AmbientBackdrop, RoomMood } from './components/AmbientBackdrop';
import { FloatingDock, DockTab } from './components/FloatingDock';
import { TopNavBar, NavFilter } from './components/TopNavBar';
import { LeftSidebar } from './components/LeftSidebar';
import { HeroBanner } from './components/HeroBanner';
import { BookCard } from './components/BookCard';
import { BookReaderModal, ReaderTheme } from './components/BookReaderModal';
import { BookDetailsModal } from './components/BookDetailsModal';
import {
  SavedView,
  DownloadsView,
  ProfileView,
  SettingsView
} from './components/SecondaryViews';

const STORAGE_KEY = 'steary_books_state_v1';

interface PersistedState {
  savedIds: string[];
  downloadedIds: string[];
  progressMap: Record<string, number>;
  roomMood: RoomMood;
  defaultReaderTheme: ReaderTheme;
  defaultFontSize: number;
}

function getInitialProgress(): Record<string, number> {
  const initial: Record<string, number> = {};
  INITIAL_BOOKS.forEach((b) => {
    if (typeof b.continueReadingProgress === 'number') {
      initial[b.id] = b.continueReadingProgress;
    }
  });
  return initial;
}

function loadPersistedState(): Partial<PersistedState> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<PersistedState>;
  } catch {
    return {};
  }
}

export default function App() {
  const persisted = useMemo(() => loadPersistedState(), []);

  const [activeDockTab, setActiveDockTab] = useState<DockTab>('home');
  const [activeNavFilter, setActiveNavFilter] = useState<NavFilter>('Discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [seeAllExpanded, setSeeAllExpanded] = useState(false);

  const [savedBookIds, setSavedBookIds] = useState<Set<string>>(
    () => new Set(persisted.savedIds ?? ['starless-archive', 'dune'])
  );
  const [downloadedBookIds, setDownloadedBookIds] = useState<Set<string>>(
    () => new Set(persisted.downloadedIds ?? ['atomic-habits', 'the-hobbit'])
  );
  const [readingProgressMap, setReadingProgressMap] = useState<Record<string, number>>(
    () => persisted.progressMap ?? getInitialProgress()
  );

  const [readerBook, setReaderBook] = useState<BookItem | null>(null);
  const [detailsBook, setDetailsBook] = useState<BookItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const [roomMood, setRoomMood] = useState<RoomMood>(persisted.roomMood ?? 'warm-study');
  const [defaultReaderTheme, setDefaultReaderTheme] = useState<ReaderTheme>(
    persisted.defaultReaderTheme ?? 'dark'
  );
  const [defaultFontSize, setDefaultFontSize] = useState<number>(
    persisted.defaultFontSize ?? 18
  );

  useEffect(() => {
    try {
      const payload: PersistedState = {
        savedIds: Array.from(savedBookIds),
        downloadedIds: Array.from(downloadedBookIds),
        progressMap: readingProgressMap,
        roomMood,
        defaultReaderTheme,
        defaultFontSize
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [savedBookIds, downloadedBookIds, readingProgressMap, roomMood, defaultReaderTheme, defaultFontSize]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 2400);
  };

  const handleToggleSave = (bookId: string) => {
    const book = INITIAL_BOOKS.find((b) => b.id === bookId);
    setSavedBookIds((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
        if (book) showToast(`Removed "${book.title}" from Saved`);
      } else {
        next.add(bookId);
        if (book) showToast(`Saved "${book.title}" to your shelf`);
      }
      return next;
    });
  };

  const handleToggleDownload = (bookId: string) => {
    const book = INITIAL_BOOKS.find((b) => b.id === bookId);
    setDownloadedBookIds((prev) => {
      const next = new Set(prev);
      if (next.has(bookId)) {
        next.delete(bookId);
        if (book) showToast(`Removed offline copy of "${book.title}"`);
      } else {
        next.add(bookId);
        if (book) showToast(`Downloaded "${book.title}" for offline reading`);
      }
      return next;
    });
  };

  const handleUpdateProgress = (bookId: string, pct: number) => {
    setReadingProgressMap((prev) => ({
      ...prev,
      [bookId]: Math.max(0, Math.min(100, pct))
    }));
  };

  const handleOpenReader = (book: BookItem) => {
    setReadingProgressMap((prev) => {
      if (typeof prev[book.id] === 'number' && prev[book.id] > 0) return prev;
      return { ...prev, [book.id]: 12 };
    });
    setReaderBook(book);
  };

  const handleOpenBookById = (id: string) => {
    const found = INITIAL_BOOKS.find((b) => b.id === id);
    if (found) setDetailsBook(found);
  };

  const newReleases = useMemo(
    () => INITIAL_BOOKS.filter((b) => b.isNewRelease),
    []
  );

  const continueReadingBooks = useMemo(
    () => INITIAL_BOOKS.filter((b) => (readingProgressMap[b.id] ?? 0) > 0),
    [readingProgressMap]
  );

  const featuredBooks = useMemo(
    () => INITIAL_BOOKS.filter((b) => b.isFeatured),
    []
  );

  const displayedRecommendations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const isFiltering = q.length > 0 || activeNavFilter !== 'Discover' || seeAllExpanded;

    if (!isFiltering) {
      return INITIAL_BOOKS.filter((b) => b.isRecommendation);
    }

    return INITIAL_BOOKS.filter((book) => {
      const matchesCategory =
        activeNavFilter === 'Discover' ||
        book.category.toLowerCase() === activeNavFilter.toLowerCase() ||
        book.tags.some((t) => t.toLowerCase() === activeNavFilter.toLowerCase());

      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeNavFilter, seeAllExpanded]);

  const isFilteredView = searchQuery.trim().length > 0 || activeNavFilter !== 'Discover';

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-3 sm:p-5 lg:p-7">
        {/* Warm Blurred Spatial Room Background */}
        <AmbientBackdrop mood={roomMood} />

        {/* Spatial Layout Container: Floating Dock + Main Glass Window */}
        <div className="w-full max-w-[1380px] flex flex-col-reverse lg:flex-row items-center lg:items-center gap-4 lg:gap-5">
          {/* Left Floating Vertical Dock */}
          <FloatingDock
            activeTab={activeDockTab}
            onSelectTab={(tab) => setActiveDockTab(tab)}
            savedCount={savedBookIds.size}
            downloadedCount={downloadedBookIds.size}
          />

          {/* Main Frosted Glass Application Shell */}
          <motion.main
            initial={{ opacity: 0, scale: 0.985, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-1 rounded-[28px] lg:rounded-[32px] bg-[#554e45]/55 backdrop-blur-3xl border border-white/22 shadow-[0_32px_90px_rgba(0,0,0,0.52)] overflow-hidden"
          >
            {/* Top Bar inside Glass Shell */}
            <TopNavBar
              searchQuery={searchQuery}
              onSearchChange={(val) => {
                setSearchQuery(val);
                if (activeDockTab !== 'home') setActiveDockTab('home');
              }}
              activeFilter={activeNavFilter}
              onSelectFilter={(filter) => {
                setActiveNavFilter(filter);
                setActiveDockTab('home');
              }}
              onOpenProfile={() => setActiveDockTab('profile')}
              onOpenSettings={() => setActiveDockTab('settings')}
              onSelectBookById={handleOpenBookById}
            />

            {/* Main Workspace Body */}
            <div className="px-4 md:px-6 pb-6 pt-1 flex flex-col lg:flex-row gap-5">
              {activeDockTab === 'home' && (
                <>
                  {/* Left Two-Panel Sidebar */}
                  <LeftSidebar
                    newReleases={newReleases}
                    continueReading={continueReadingBooks}
                    savedBookIds={savedBookIds}
                    readingProgressMap={readingProgressMap}
                    onToggleSave={handleToggleSave}
                    onOpenBook={(book) => setDetailsBook(book)}
                    onReadBook={handleOpenReader}
                  />

                  {/* Right Main Discovery Content */}
                  <div className="flex-1 min-w-0 flex flex-col gap-5">
                    {!isFilteredView && (
                      <HeroBanner
                        featuredBooks={featuredBooks}
                        savedBookIds={savedBookIds}
                        onReadBook={handleOpenReader}
                        onToggleSave={handleToggleSave}
                        onOpenDetails={(book) => setDetailsBook(book)}
                      />
                    )}

                    {/* You might like / Filtered Catalog Grid */}
                    <section aria-label="Book recommendations">
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-baseline gap-2.5">
                          <h2 className="text-[17px] font-semibold text-white tracking-tight">
                            {isFilteredView
                              ? `${activeNavFilter === 'Discover' ? 'Search Results' : activeNavFilter}`
                              : seeAllExpanded
                                ? 'All Books'
                                : 'You might like'}
                          </h2>
                          {isFilteredView && (
                            <span className="text-[12px] text-white/55 tabular-nums">
                              {displayedRecommendations.length} found
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {isFilteredView ? (
                            <button
                              type="button"
                              onClick={() => {
                                setSearchQuery('');
                                setActiveNavFilter('Discover');
                                setSeeAllExpanded(false);
                              }}
                              className="px-3.5 py-1 rounded-full bg-white/12 hover:bg-white/20 border border-white/15 text-[11.5px] font-medium text-white transition-colors cursor-pointer"
                            >
                              Reset filter
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSeeAllExpanded((prev) => !prev)}
                              className="px-3.5 py-1 rounded-full bg-white/12 hover:bg-white/20 border border-white/15 text-[11.5px] font-medium text-white/85 hover:text-white transition-colors cursor-pointer"
                            >
                              {seeAllExpanded ? 'Show less' : 'See all'}
                            </button>
                          )}
                        </div>
                      </div>

                      {displayedRecommendations.length === 0 ? (
                        <div className="rounded-[22px] bg-white/[0.06] border border-white/12 p-10 text-center">
                          <p className="text-[15px] font-medium text-white">
                            No books match &ldquo;{searchQuery}&rdquo;
                          </p>
                          <p className="text-[12.5px] text-white/60 mt-1">
                            Try another title, author, or switch back to Discover.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5">
                          {displayedRecommendations.map((book, idx) => (
                            <BookCard
                              key={book.id}
                              book={book}
                              index={idx}
                              isSaved={savedBookIds.has(book.id)}
                              isDownloaded={downloadedBookIds.has(book.id)}
                              onToggleSave={handleToggleSave}
                              onToggleDownload={handleToggleDownload}
                              onReadBook={handleOpenReader}
                              onOpenDetails={(b) => setDetailsBook(b)}
                            />
                          ))}
                        </div>
                      )}
                    </section>
                  </div>
                </>
              )}

              {activeDockTab === 'saved' && (
                <SavedView
                  books={INITIAL_BOOKS}
                  savedBookIds={savedBookIds}
                  downloadedBookIds={downloadedBookIds}
                  onToggleSave={handleToggleSave}
                  onToggleDownload={handleToggleDownload}
                  onReadBook={handleOpenReader}
                  onOpenDetails={(b) => setDetailsBook(b)}
                  onBrowseHome={() => setActiveDockTab('home')}
                />
              )}

              {activeDockTab === 'downloads' && (
                <DownloadsView
                  books={INITIAL_BOOKS}
                  downloadedBookIds={downloadedBookIds}
                  onToggleDownload={handleToggleDownload}
                  onReadBook={handleOpenReader}
                />
              )}

              {activeDockTab === 'profile' && (
                <ProfileView
                  savedCount={savedBookIds.size}
                  downloadedCount={downloadedBookIds.size}
                  activeCount={continueReadingBooks.length}
                />
              )}

              {activeDockTab === 'settings' && (
                <SettingsView
                  roomMood={roomMood}
                  onChangeRoomMood={setRoomMood}
                  defaultReaderTheme={defaultReaderTheme}
                  onChangeDefaultReaderTheme={setDefaultReaderTheme}
                  defaultFontSize={defaultFontSize}
                  onChangeDefaultFontSize={setDefaultFontSize}
                />
              )}
            </div>
          </motion.main>
        </div>

        {/* Interactive Book Reader Modal */}
        <AnimatePresence>
          {readerBook && (
            <BookReaderModal
              book={readerBook}
              progress={readingProgressMap[readerBook.id] ?? 0}
              isSaved={savedBookIds.has(readerBook.id)}
              isDownloaded={downloadedBookIds.has(readerBook.id)}
              defaultTheme={defaultReaderTheme}
              defaultFontSize={defaultFontSize}
              onClose={() => setReaderBook(null)}
              onUpdateProgress={handleUpdateProgress}
              onToggleSave={handleToggleSave}
              onToggleDownload={handleToggleDownload}
            />
          )}
        </AnimatePresence>

        {/* Book Details Modal */}
        <AnimatePresence>
          {detailsBook && (
            <BookDetailsModal
              book={detailsBook}
              isSaved={savedBookIds.has(detailsBook.id)}
              isDownloaded={downloadedBookIds.has(detailsBook.id)}
              progress={readingProgressMap[detailsBook.id] ?? 0}
              onClose={() => setDetailsBook(null)}
              onReadNow={handleOpenReader}
              onToggleSave={handleToggleSave}
              onToggleDownload={handleToggleDownload}
            />
          )}
        </AnimatePresence>

        {/* Subtle Floating Feedback Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              role="status"
              className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-full bg-[#1d1a16]/92 backdrop-blur-xl border border-white/18 text-[12.5px] font-medium text-white shadow-2xl"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
