import React from 'react';

export type RoomMood = 'warm-study' | 'midnight-archive' | 'sunlit-atrium';

interface AmbientBackdropProps {
  mood: RoomMood;
}

export const AmbientBackdrop: React.FC<AmbientBackdropProps> = ({ mood }) => {
  const palette =
    mood === 'midnight-archive'
      ? {
          wall: 'from-[#161a22] via-[#1c212b] to-[#11141a]',
          glow1: 'rgba(130, 165, 220, 0.20)',
          glow2: 'rgba(190, 145, 95, 0.16)',
          shelf: '#272c36',
          plant: '#1d2b24',
          chair: '#2a2d34'
        }
      : mood === 'sunlit-atrium'
        ? {
            wall: 'from-[#7d7366] via-[#6b6154] to-[#4c443a]',
            glow1: 'rgba(255, 228, 185, 0.38)',
            glow2: 'rgba(240, 198, 145, 0.25)',
            shelf: '#8c775f',
            plant: '#364a32',
            chair: '#b8aa98'
          }
        : {
            // Warm Study — matches the reference screenshot's cozy blurred interior
            wall: 'from-[#5e5346] via-[#4a4136] to-[#302921]',
            glow1: 'rgba(246, 206, 152, 0.30)',
            glow2: 'rgba(218, 174, 120, 0.22)',
            shelf: '#6e5842',
            plant: '#2d3b27',
            chair: '#9b8d7d'
          };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none"
    >
      {/* Base warm interior gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${palette.wall} transition-colors duration-700`} />

      {/* Architectural room depth-of-field scene */}
      <div className="absolute inset-0 scale-105 blur-[22px] opacity-90">
        {/* Soft sunlit curtain / window glow on upper left */}
        <div
          className="absolute -top-24 -left-16 w-[44vw] h-[75vh] rounded-full"
          style={{
            background: `radial-gradient(circle, ${palette.glow1} 0%, transparent 70%)`
          }}
        />

        {/* Warm wooden bookshelf silhouette on right */}
        <div
          className="absolute top-6 right-[-2vw] w-[28vw] h-[72vh] rounded-lg opacity-65"
          style={{
            background: `linear-gradient(180deg, ${palette.shelf} 0%, rgba(35,28,22,0.85) 100%)`
          }}
        >
          {/* Shelf recesses with warm LED strip glow */}
          {[14, 34, 54, 74].map((top) => (
            <div
              key={top}
              className="absolute left-4 right-4 h-[14%]"
              style={{
                top: `${top}%`,
                background: 'linear-gradient(180deg, rgba(255,214,158,0.28) 0%, rgba(25,20,15,0.65) 100%)',
                boxShadow: 'inset 0 2px 12px rgba(255,210,145,0.25)'
              }}
            />
          ))}
        </div>

        {/* Potted indoor botanical silhouette on left */}
        <div
          className="absolute top-[16%] left-[2%] w-[16vw] h-[58vh] opacity-70"
          style={{
            background: `radial-gradient(ellipse at 45% 35%, ${palette.plant} 0%, transparent 68%)`
          }}
        />
        <div
          className="absolute top-[28%] left-[7%] w-[11vw] h-[40vh] opacity-60"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${palette.plant} 0%, transparent 65%)`
          }}
        />

        {/* Sculptural armchair & travertine side table on bottom left/right */}
        <div
          className="absolute bottom-[-8%] left-[12%] w-[20vw] h-[28vh] rounded-full opacity-55"
          style={{
            background: `radial-gradient(circle, ${palette.chair} 0%, transparent 72%)`
          }}
        />
        <div
          className="absolute bottom-[-6%] right-[14%] w-[24vw] h-[30vh] rounded-full opacity-50"
          style={{
            background: `radial-gradient(circle, ${palette.glow2} 0%, transparent 72%)`
          }}
        />
      </div>

      {/* Subtle atmospheric vignette for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20" />
    </div>
  );
};
