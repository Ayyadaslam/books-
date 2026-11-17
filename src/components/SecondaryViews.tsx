import React from 'react';
import { motion } from 'motion/react';
import { Heart, Download, BookOpen, Check, Trash2, Flame, Award, Layers } from 'lucide-react';
import { BookItem } from '../data/booksData';
import { BookCard } from './BookCard';
import { BookCoverArtwork } from './BookCoverArtwork';
import { RoomMood } from './AmbientBackdrop';
import { ReaderTheme } from './BookReaderModal';

interface SavedViewProps {
  books: BookItem[];
  savedBookIds: Set<string>;
  downloadedBookIds: Set<string>;
  onToggleSave: (bookId: string) => void;
  onToggleDownload: (bookId: string) => void;
  onReadBook: (book: BookItem) => void;
  onOpenDetails: (book: BookItem) => void;
  onBrowseHome: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  books,
  savedBookIds,
  downloadedBookIds,
  onToggleSave,
  onToggleDownload,
  onReadBook,
  onOpenDetails,
  onBrowseHome
}) => {
  const savedBooks = books.filter((b) => savedBookIds.has(b.id));

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 min-w-0"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[22px] font-semibold text-white">Saved Books</h1>
          <p className="text-[13px] text-white/60 mt-0.5 tabular-nums">
            {savedBooks.length} {savedBooks.length === 1 ? 'title' : 'titles'} bookmarked in your collection
          </p>
        </div>
        <button
          type="button"
          onClick={onBrowseHome}
          className="px-4 py-2 rounded-full bg-white/12 hover:bg-white/20 border border-white/15 text-[12px] font-medium text-white transition-colors cursor-pointer"
        >
          Back to Discover
        </button>
      </div>

      {savedBooks.length === 0 ? (
        <div className="rounded-[22px] bg-white/[0.06] border border-white/12 p-12 text-center">
          <Heart className="w-8 h-8 text-white/40 mx-auto mb-3" />
          <h2 className="text-[16px] font-semibold text-white">No saved books yet</h2>
          <p className="text-[13px] text-white/60 mt-1 max-w-sm mx-auto">
            Click the bookmark icon on any title in New Releases or recommendations to build your personal shelf.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {savedBooks.map((book, idx) => (
            <BookCard
              key={book.id}
              book={book}
              index={idx}
              isSaved={true}
              isDownloaded={downloadedBookIds.has(book.id)}
              onToggleSave={onToggleSave}
              onToggleDownload={onToggleDownload}
              onReadBook={onReadBook}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
};

interface DownloadsViewProps {
  books: BookItem[];
  downloadedBookIds: Set<string>;
  onToggleDownload: (bookId: string) => void;
  onReadBook: (book: BookItem) => void;
}

export const DownloadsView: React.FC<DownloadsViewProps> = ({
  books,
  downloadedBookIds,
  onToggleDownload,
  onReadBook
}) => {
  const downloaded = books.filter((b) => downloadedBookIds.has(b.id));
  const available = books.filter((b) => !downloadedBookIds.has(b.id)).slice(0, 5);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 min-w-0 space-y-6"
    >
      <div>
        <h1 className="text-[22px] font-semibold text-white">Offline Library</h1>
        <p className="text-[13px] text-white/60 mt-0.5 tabular-nums">
          {downloaded.length} books cached for instant offline reading
        </p>
      </div>

      <div className="space-y-2.5">
        {downloaded.map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-white/[0.08] border border-white/12"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-14 rounded-lg overflow-hidden shrink-0 ring-1 ring-white/15">
                <BookCoverArtwork variant={book.coverVariant} size="thumb" />
              </div>
              <div className="min-w-0">
                <div className="text-[14px] font-semibold text-white truncate">{book.title}</div>
                <div className="text-[12px] text-white/60 truncate">
                  {book.author} · {book.pages} pages · Ready offline
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onReadBook(book)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#141414] text-[12px] font-semibold hover:bg-white/90 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleDownload(book.id)}
                aria-label={`Remove offline copy of ${book.title}`}
                className="p-2 rounded-full bg-white/10 hover:bg-rose-500/30 text-white/75 hover:text-white transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-[15px] font-semibold text-white mb-3">Quick Download</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {available.map((book) => (
            <div
              key={book.id}
              className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.05] border border-white/10"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-12 rounded-md overflow-hidden shrink-0">
                  <BookCoverArtwork variant={book.coverVariant} size="thumb" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-white truncate">{book.title}</div>
                  <div className="text-[11px] text-white/55 truncate">{book.author}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onToggleDownload(book.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/12 hover:bg-white/22 text-[11.5px] font-medium text-white transition-colors shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

interface ProfileViewProps {
  savedCount: number;
  downloadedCount: number;
  activeCount: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  savedCount,
  downloadedCount,
  activeCount
}) => {
  const stats = [
    { label: 'Reading Streak', value: '14 Days', icon: Flame },
    { label: 'Active Books', value: String(activeCount), icon: BookOpen },
    { label: 'Saved Collection', value: String(savedCount), icon: Layers },
    { label: 'Offline Ready', value: String(downloadedCount), icon: Award }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 min-w-0 space-y-6"
    >
      <div className="rounded-[24px] bg-white/[0.08] border border-white/14 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-amber-300 flex items-center justify-center text-[20px] font-bold text-white shadow-lg">
            AM
          </div>
          <div>
            <h1 className="text-[22px] font-semibold text-white">Arfi Maulana</h1>
            <p className="text-[13px] text-white/60">@arfimaulana_ · Annual Goal: 24 / 30 Books</p>
          </div>
        </div>
        <div className="px-4 py-2 rounded-full bg-white/12 border border-white/15 text-[12px] font-medium text-white tabular-nums">
          80% of 2026 goal reached
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl bg-white/[0.07] border border-white/12 p-4"
            >
              <Icon className="w-4 h-4 text-amber-300 mb-3" />
              <div className="text-[22px] font-semibold text-white tabular-nums">{item.value}</div>
              <div className="text-[12px] text-white/60 mt-0.5">{item.label}</div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

interface SettingsViewProps {
  roomMood: RoomMood;
  onChangeRoomMood: (mood: RoomMood) => void;
  defaultReaderTheme: ReaderTheme;
  onChangeDefaultReaderTheme: (theme: ReaderTheme) => void;
  defaultFontSize: number;
  onChangeDefaultFontSize: (size: number) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  roomMood,
  onChangeRoomMood,
  defaultReaderTheme,
  onChangeDefaultReaderTheme,
  defaultFontSize,
  onChangeDefaultFontSize
}) => {
  const moods: { id: RoomMood; label: string; desc: string }[] = [
    { id: 'warm-study', label: 'Warm Study', desc: 'Sunlit oak shelves & amber room depth' },
    { id: 'midnight-archive', label: 'Midnight Archive', desc: 'Cool slate evening reading ambiance' },
    { id: 'sunlit-atrium', label: 'Sunlit Atrium', desc: 'Bright natural travertine & greenery' }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 min-w-0 space-y-6"
    >
      <div>
        <h1 className="text-[22px] font-semibold text-white">Workspace Settings</h1>
        <p className="text-[13px] text-white/60 mt-0.5">
          Customize your spatial glass ambiance and reader defaults
        </p>
      </div>

      <div className="rounded-[22px] bg-white/[0.08] border border-white/12 p-5 space-y-4">
        <h2 className="text-[14px] font-semibold text-white">Ambient Room Backdrop</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {moods.map((m) => {
            const active = roomMood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onChangeRoomMood(m.id)}
                className={`text-left p-4 rounded-2xl border transition-colors cursor-pointer ${
                  active
                    ? 'bg-white/18 border-white/35 text-white'
                    : 'bg-white/[0.04] hover:bg-white/10 border-white/10 text-white/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13.5px] font-semibold">{m.label}</span>
                  {active && <Check className="w-4 h-4 text-amber-300" />}
                </div>
                <p className="text-[11.5px] text-white/60 mt-1">{m.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[22px] bg-white/[0.08] border border-white/12 p-5 space-y-4">
        <h2 className="text-[14px] font-semibold text-white">Default Reader Preferences</h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[13px] font-medium text-white">Paper Surface</div>
            <div className="text-[11.5px] text-white/55">Default palette when opening chapters</div>
          </div>
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/10 border border-white/12">
            {(['dark', 'sepia', 'paper'] as ReaderTheme[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onChangeDefaultReaderTheme(t)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium capitalize transition-colors cursor-pointer ${
                  defaultReaderTheme === t
                    ? 'bg-white text-[#141414]'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
          <div>
            <div className="text-[13px] font-medium text-white">Default Font Size</div>
            <div className="text-[11.5px] text-white/55 tabular-nums">Currently {defaultFontSize}px</div>
          </div>
          <input
            type="range"
            min={15}
            max={24}
            value={defaultFontSize}
            onChange={(e) => onChangeDefaultFontSize(Number(e.target.value))}
            className="w-36 accent-amber-300 cursor-pointer"
          />
        </div>
      </div>
    </motion.section>
  );
};
