import React, { useId } from 'react';
import { CoverVariant } from '../data/booksData';

interface BookCoverArtworkProps {
  variant: CoverVariant;
  size?: 'thumb' | 'card' | 'hero';
  className?: string;
}

export const BookCoverArtwork: React.FC<BookCoverArtworkProps> = ({
  variant,
  size = 'card',
  className = ''
}) => {
  const isThumb = size === 'thumb';
  const uid = useId().replace(/:/g, '');
  const duneSunId = `duneSun-${uid}`;
  const duneRidgeId = `duneRidge-${uid}`;
  const lanternGlowId = `lanternGlow-${uid}`;

  switch (variant) {
    case 'starless-archive':
      return (
        <div
          className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#12161f] via-[#1c232e] to-[#0a0d12] flex flex-col items-center justify-between border border-white/15 shadow-2xl ${
            isThumb ? 'p-1.5 rounded-[4px]' : 'p-5 rounded-md'
          } ${className}`}
        >
          {/* Subtle silver geometric astrolabe & eclipse */}
          <svg
            viewBox="0 0 200 280"
            className="absolute inset-0 w-full h-full opacity-75 pointer-events-none"
            fill="none"
          >
            <circle cx="100" cy="154" r="76" stroke="#9fb1c7" strokeWidth="0.7" strokeOpacity="0.45" />
            <circle cx="100" cy="154" r="58" stroke="#9fb1c7" strokeWidth="0.6" strokeDasharray="3 4" strokeOpacity="0.45" />
            <circle cx="100" cy="154" r="38" stroke="#c8d6e6" strokeWidth="0.8" strokeOpacity="0.55" />
            <line x1="20" y1="154" x2="180" y2="154" stroke="#9fb1c7" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="100" y1="74" x2="100" y2="234" stroke="#9fb1c7" strokeWidth="0.5" strokeOpacity="0.3" />
            <circle cx="100" cy="154" r="18" fill="#06080c" stroke="#dce7f5" strokeWidth="1.2" strokeOpacity="0.85" />
            <circle cx="100" cy="154" r="24" stroke="#dce7f5" strokeWidth="0.5" strokeOpacity="0.35" />
            {/* Tiny constellation stars */}
            <circle cx="42" cy="88" r="1.2" fill="#e2ebf5" fillOpacity="0.7" />
            <circle cx="158" cy="96" r="1.4" fill="#e2ebf5" fillOpacity="0.6" />
            <circle cx="54" cy="218" r="1.1" fill="#e2ebf5" fillOpacity="0.5" />
            <circle cx="150" cy="214" r="1.3" fill="#e2ebf5" fillOpacity="0.65" />
          </svg>
          {/* Left spine highlight */}
          <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-white/15 to-transparent" />
          {!isThumb && (
            <>
              <div className="relative z-10 text-center pt-1">
                <div className="text-[9px] tracking-[0.28em] uppercase text-slate-300/80 font-medium">
                  THE
                </div>
                <div className="font-editorial text-[21px] leading-[1.02] tracking-[0.12em] text-slate-100 uppercase font-semibold">
                  STARLESS
                  <br />
                  ARCHIVE
                </div>
              </div>
              <div className="relative z-10 text-[9px] tracking-[0.26em] uppercase text-slate-300/85 pb-1">
                ELIAN VOSS
              </div>
            </>
          )}
        </div>
      );

    case 'dune':
      return (
        <div
          className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#1a120d] via-[#4a2612] to-[#120b07] flex flex-col justify-between ${
            isThumb ? 'p-1' : 'p-4'
          } ${className}`}
        >
          {/* Desert horizon & solar eclipse ring */}
          <svg viewBox="0 0 200 280" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id={duneSunId} cx="50%" cy="22%" r="35%">
                <stop offset="0%" stopColor="#ffd79a" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#d97724" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#1b100b" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={duneRidgeId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c76828" />
                <stop offset="100%" stopColor="#261209" />
              </linearGradient>
            </defs>
            <rect width="200" height="280" fill="#17100c" />
            <circle cx="100" cy="60" r="65" fill={`url(#${duneSunId})`} />
            <circle cx="100" cy="54" r="14" fill="#120b07" stroke="#f5b867" strokeWidth="1.4" />
            <path d="M0 198 Q62 155 128 182 T200 175 L200 280 L0 280 Z" fill={`url(#${duneRidgeId})`} opacity="0.95" />
            <path d="M0 228 Q85 186 155 215 T200 212 L200 280 L0 280 Z" fill="#140c08" opacity="0.92" />
          </svg>
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/60 via-amber-200/10 to-transparent" />
          {!isThumb && (
            <div className="relative z-10 text-center mt-14">
              <div className="font-editorial text-[34px] tracking-[0.16em] text-[#e5a853] font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                DUNE
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-amber-200/80 mt-0.5">
                FRANK HERBERT
              </div>
            </div>
          )}
        </div>
      );

    case 'hobbit':
      return (
        <div
          className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0e1a16] via-[#0c1411] to-[#060908] flex flex-col items-center justify-between ${
            isThumb ? 'p-1' : 'p-4'
          } ${className}`}
        >
          {/* Intricate Gold Elven Filigree */}
          <svg viewBox="0 0 200 280" className="absolute inset-0 w-full h-full">
            <rect x="14" y="14" width="172" height="252" rx="3" fill="none" stroke="#c89e4c" strokeWidth="0.9" strokeOpacity="0.65" />
            <rect x="20" y="20" width="160" height="240" rx="2" fill="none" stroke="#c89e4c" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="100" cy="148" r="56" fill="none" stroke="#d4aa57" strokeWidth="1.1" strokeOpacity="0.7" />
            <circle cx="100" cy="148" r="46" fill="none" stroke="#d4aa57" strokeWidth="0.7" strokeDasharray="4 3" strokeOpacity="0.65" />
            <circle cx="100" cy="148" r="32" fill="none" stroke="#d4aa57" strokeWidth="0.9" strokeOpacity="0.6" />
            <path d="M100 92 L106 142 L156 148 L106 154 L100 204 L94 154 L44 148 L94 142 Z" fill="none" stroke="#d4aa57" strokeWidth="0.7" strokeOpacity="0.55" />
          </svg>
          <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-emerald-200/10 to-transparent" />
          {!isThumb && (
            <>
              <div className="relative z-10 text-center pt-5">
                <div className="text-[8px] tracking-[0.28em] uppercase text-[#d8b163]">THE</div>
                <div className="font-editorial text-[24px] tracking-[0.1em] uppercase text-[#e6c478] font-semibold leading-none">
                  HOBBIT
                </div>
              </div>
              <div className="relative z-10 text-[9px] tracking-[0.22em] uppercase text-[#d8b163]/85 pb-5">
                J.R.R. TOLKIEN
              </div>
            </>
          )}
        </div>
      );

    case 'silent-patient':
      return (
        <div
          className={`relative w-full h-full overflow-hidden bg-[#d8d5cf] flex flex-col justify-between ${
            isThumb ? 'p-1' : 'p-4'
          } ${className}`}
        >
          {/* Minimalist split portrait & shadow */}
          <svg viewBox="0 0 200 280" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <rect width="128" height="280" fill="#dcd9d2" />
            <rect x="128" width="72" height="280" fill="#18191c" />
            <path d="M128 70 C108 75 96 98 102 126 C106 146 116 156 110 176 C104 196 128 212 128 212 Z" fill="#18191c" />
            <circle cx="52" cy="64" r="1.4" fill="#18191c" opacity="0.3" />
            <circle cx="72" cy="184" r="1.2" fill="#18191c" opacity="0.25" />
          </svg>
          {!isThumb && (
            <div className="relative z-10 mt-10 pl-1 pr-10">
              <div className="font-editorial text-[19px] leading-[1.05] tracking-[0.06em] uppercase text-[#17181b] font-semibold">
                THE
                <br />
                SILENT
                <br />
                PATIENT
              </div>
              <div className="text-[7px] tracking-[0.18em] uppercase text-[#3b3c40] mt-2 font-semibold">
                ALEX MICHAELIDES
              </div>
            </div>
          )}
        </div>
      );

    case 'lessons-chemistry':
      return (
        <div
          className={`relative w-full h-full overflow-hidden bg-[#ece6da] flex flex-col justify-between ${
            isThumb ? 'p-1' : 'p-4'
          } ${className}`}
        >
          {/* Mid-century atomic orbs & red book spine */}
          <svg viewBox="0 0 200 280" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <rect width="200" height="280" fill="#ebe5d8" />
            <rect width="22" height="280" fill="#cf4a36" />
            <circle cx="62" cy="48" r="12" fill="#214663" />
            <circle cx="144" cy="44" r="15" fill="#cf4a36" />
            <circle cx="96" cy="72" r="9" fill="#d99a32" />
            <circle cx="164" cy="82" r="8" fill="#5e8780" />
            <circle cx="152" cy="206" r="13" fill="#214663" />
            <circle cx="76" cy="212" r="10" fill="#cf4a36" />
            <line x1="62" y1="48" x2="96" y2="72" stroke="#2f3237" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="96" y1="72" x2="144" y2="44" stroke="#2f3237" strokeWidth="1" strokeOpacity="0.4" />
          </svg>
          {!isThumb && (
            <div className="relative z-10 my-auto pl-6 pr-2 text-center">
              <div className="text-[20px] leading-[1.05] tracking-[0.04em] uppercase text-[#1f242c] font-bold">
                LESSONS
              </div>
              <div className="font-editorial italic text-[17px] text-[#cf4a36] -my-0.5">in</div>
              <div className="text-[16px] leading-[1.1] tracking-[0.06em] uppercase text-[#1f242c] font-bold">
                CHEMISTRY
              </div>
              <div className="text-[7px] tracking-[0.22em] uppercase text-[#cf4a36] mt-2 font-bold">
                BONNIE GARMUS
              </div>
            </div>
          )}
        </div>
      );

    case 'book-thief':
      return (
        <div
          className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#23201c] via-[#191613] to-[#0f0d0b] flex flex-col items-center justify-between ${
            isThumb ? 'p-1' : 'p-4'
          } ${className}`}
        >
          <svg viewBox="0 0 200 280" className="absolute inset-0 w-full h-full">
            <rect x="16" y="16" width="168" height="248" fill="none" stroke="#c5a15a" strokeWidth="1" strokeOpacity="0.6" />
            <path d="M55 245 L55 170 Q100 130 145 170 L145 245 Z" fill="#100e0c" stroke="#c5a15a" strokeWidth="0.8" strokeOpacity="0.55" />
            <defs>
              <radialGradient id={lanternGlowId} cx="50%" cy="68%" r="32%">
                <stop offset="0%" stopColor="#f5c062" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#100e0c" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="195" r="55" fill={`url(#${lanternGlowId})`} />
          </svg>
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-white/10 to-transparent" />
          {!isThumb && (
            <div className="relative z-10 text-center pt-5">
              <div className="text-[8px] tracking-[0.26em] uppercase text-[#d2af68]">THE</div>
              <div className="font-editorial text-[23px] leading-[0.98] tracking-[0.06em] uppercase text-[#e6c882] font-semibold">
                BOOK
                <br />
                THIEF
              </div>
              <div className="text-[7px] tracking-[0.22em] uppercase text-[#c4a15c]/80 mt-2">
                MARKUS ZUSAK
              </div>
            </div>
          )}
        </div>
      );

    case 'fourth-wing':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#241d15] via-[#17130e] to-[#0b0907] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <path d="M12 52 Q30 18 48 52 Q30 42 12 52 Z" fill="none" stroke="#d8a84e" strokeWidth="1.5" />
            <circle cx="30" cy="24" r="6" fill="none" stroke="#d8a84e" strokeWidth="1.2" />
            <text x="30" y="68" textAnchor="middle" fill="#e9c87b" fontSize="6" fontWeight="700" letterSpacing="1">FOURTH</text>
          </svg>
        </div>
      );

    case 'iron-flame':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#2b1011] via-[#190a0b] to-[#090505] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <path d="M30 14 C38 26 44 36 30 54 C16 36 22 26 30 14 Z" fill="#c7392f" fillOpacity="0.85" />
            <text x="30" y="68" textAnchor="middle" fill="#f3b8aa" fontSize="6" fontWeight="700" letterSpacing="1">IRON</text>
          </svg>
        </div>
      );

    case 'housemaid':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#13243b] via-[#0e1b2d] to-[#070d17] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <circle cx="30" cy="30" r="8" fill="#f2d085" fillOpacity="0.9" />
            <path d="M26 36 L34 36 L37 54 L23 54 Z" fill="#f2d085" fillOpacity="0.9" />
          </svg>
        </div>
      );

    case 'project-hail-mary':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#14171c] via-[#101318] to-[#050608] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <circle cx="30" cy="32" r="14" fill="#f2b84b" fillOpacity="0.85" />
            <circle cx="33" cy="30" r="11" fill="#13161b" />
            <circle cx="16" cy="18" r="1.2" fill="#fff" />
            <circle cx="46" cy="20" r="1" fill="#fff" />
          </svg>
        </div>
      );

    case 'tomorrow':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#d96934] via-[#4a5b8c] to-[#1a2238] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <circle cx="30" cy="34" r="14" fill="#ffd28a" fillOpacity="0.85" />
            <path d="M0 46 Q18 38 34 45 T60 44 L60 80 L0 80 Z" fill="#1f3154" />
          </svg>
        </div>
      );

    case 'atomic-habits':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-[#f4f1ea] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <circle cx="30" cy="36" r="14" fill="none" stroke="#c89e4c" strokeWidth="2" />
            <circle cx="30" cy="36" r="4" fill="#1c1d21" />
          </svg>
        </div>
      );

    case 'midnight-library':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#13292c] to-[#081315] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <rect x="16" y="14" width="28" height="52" rx="14" fill="none" stroke="#85c4ba" strokeWidth="1.5" />
            <circle cx="30" cy="34" r="5" fill="#e9c87b" />
          </svg>
        </div>
      );

    case 'educated':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#1f344d] to-[#0f1b2b] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <path d="M10 56 L30 22 L50 56 Z" fill="#d8c39e" fillOpacity="0.85" />
          </svg>
        </div>
      );

    case 'sapiens':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#9e3322] to-[#54160d] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <circle cx="30" cy="36" r="14" fill="none" stroke="#f4d5b2" strokeWidth="1.4" strokeDasharray="3 2" />
            <circle cx="30" cy="36" r="8" fill="none" stroke="#f4d5b2" strokeWidth="1.2" />
          </svg>
        </div>
      );

    case 'psychology-of-money':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#1b3328] to-[#0d1a14] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <rect x="14" y="18" width="32" height="44" fill="none" stroke="#c8a85e" strokeWidth="1.5" />
            <circle cx="30" cy="40" r="7" fill="#c8a85e" fillOpacity="0.85" />
          </svg>
        </div>
      );

    case 'circe':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#1a1510] to-[#0a0806] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 60 80" className="w-full h-full">
            <circle cx="30" cy="36" r="15" fill="none" stroke="#d49e45" strokeWidth="1.6" />
            <circle cx="30" cy="36" r="6" fill="#d49e45" fillOpacity="0.7" />
          </svg>
        </div>
      );
  }
};
