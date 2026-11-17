export type BookCategory =
  | 'Fiction'
  | 'Non-fiction'
  | 'Mystery'
  | 'Fantasy'
  | 'Sci-Fi'
  | 'Biography'
  | 'Self-Help';

export type CoverVariant =
  | 'starless-archive'
  | 'fourth-wing'
  | 'iron-flame'
  | 'housemaid'
  | 'project-hail-mary'
  | 'tomorrow'
  | 'atomic-habits'
  | 'midnight-library'
  | 'educated'
  | 'sapiens'
  | 'psychology-of-money'
  | 'circe'
  | 'dune'
  | 'hobbit'
  | 'silent-patient'
  | 'lessons-chemistry'
  | 'book-thief';

export interface BookChapter {
  title: string;
  content: string[];
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  tags: string[];
  rating: number;
  pages: number;
  year: number;
  synopsis: string;
  coverVariant: CoverVariant;
  isNewRelease?: boolean;
  isFeatured?: boolean;
  isRecommendation?: boolean;
  continueReadingProgress?: number;
  chapters: BookChapter[];
}

export const INITIAL_BOOKS: BookItem[] = [
  {
    id: 'starless-archive',
    title: 'The Starless Archive',
    author: 'Elian Voss',
    category: 'Mystery',
    tags: ["Editor's Pick", 'Dark Fantasy', 'Mystery'],
    rating: 4.9,
    pages: 448,
    year: 2026,
    synopsis:
      'Beneath a drowned city, a disgraced archivist discovers a library that remembers every future erased from the stars.',
    coverVariant: 'starless-archive',
    isFeatured: true,
    chapters: [
      {
        title: 'Chapter I — The Flooded Vaults',
        content: [
          'The tide always returned to Sunken Vespera before the bells struck four, carrying the faint metallic scent of rusted astrolabes and damp vellum.',
          'Cassian Wren lowered his brass lantern toward the limestone threshold. Beneath three meters of black canal water, the bronze seal of the Seventh Observatory gleamed intact—untouched since the sky went dark ninety winters ago.',
          'Every map in the Upper Guild insisted the lower vaults held nothing but silt and shattered lenses. Yet here, carved neatly into the lintel above the stairwell, were the exact coordinates of constellations that had never existed in human memory.'
        ]
      },
      {
        title: 'Chapter II — Ink That Remembers Tomorrow',
        content: [
          'Inside the circular reading hall, silence had weight. Thousands of obsidian-spined folios rested along tiered alcoves, dry as desert salt despite the ocean pressing against the glass dome overhead.',
          'When Cassian opened the central ledger, the ink was still wet. Not with soot or iron gall, but with a pale silver luminescence that rearranged itself beneath his gaze—recording choices he had not yet made.',
          'On page forty-two, written in his own cramped archivist hand, was a single warning: Do not return the key to the Meridian Tower before midnight.'
        ]
      },
      {
        title: 'Chapter III — Cartography of Lost Futures',
        content: [
          'Footsteps echoed along the upper gallery. Cassian extinguished his lantern and pressed against a marble pillar, watching a figure in a salt-stained coat trace the zodiac rings inlaid in the floor.',
          '"You read the margin notes," the stranger said without turning around. "Only someone exiled from the Observatory would know how to unlatch the seventh seal."'
        ]
      }
    ]
  },
  {
    id: 'fourth-wing',
    title: 'Fourth Wing',
    author: 'Rebecca Yarros',
    category: 'Fantasy',
    tags: ['Fantasy', 'Dragons', 'Bestseller'],
    rating: 4.7,
    pages: 528,
    year: 2023,
    synopsis:
      'Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history—until the commanding general orders her to join the dragon riders.',
    coverVariant: 'fourth-wing',
    isNewRelease: true,
    chapters: [
      {
        title: 'Chapter I — The Parapet',
        content: [
          'Rain slicks the narrow stone bridge high above the gorge, where every candidate for the Riders Quadrant must cross without looking down.',
          'Violet tightens the leather straps of her boots, balancing years of quiet scholarship against a single unforgiving afternoon of wind and stone.'
        ]
      },
      {
        title: 'Chapter II — Basgiath War College',
        content: [
          'Within the basalt courtyard, shadows of wings pass across the slate rooftops. Alliances here are forged faster than steel and tested before dusk.'
        ]
      }
    ]
  },
  {
    id: 'iron-flame',
    title: 'Iron Flame',
    author: 'Rebecca Yarros',
    category: 'Fantasy',
    tags: ['Fantasy', 'Sequel', 'Action'],
    rating: 4.6,
    pages: 640,
    year: 2024,
    synopsis:
      'Everyone expected Violet Sorrengail to die during her first year at Basgiath War College—including her. Now the real training begins, and secrets hidden for centuries threaten the realm.',
    coverVariant: 'iron-flame',
    isNewRelease: true,
    chapters: [
      {
        title: 'Chapter I — Ashes on the Rampart',
        content: [
          'Dawn arrives over the northern cliffs with the smell of pine resin and scorched iron. Surviving the first year only earned the right to face harder truths.'
        ]
      }
    ]
  },
  {
    id: 'the-housemaid',
    title: 'The Housemaid',
    author: 'Freida McFadden',
    category: 'Mystery',
    tags: ['Thriller', 'Mystery', 'Psychological'],
    rating: 4.5,
    pages: 336,
    year: 2024,
    synopsis:
      'Behind the spotless facade of the Winchester estate lies an attic bedroom that only locks from the outside—and a family hiding far darker secrets than dust.',
    coverVariant: 'housemaid',
    isNewRelease: true,
    chapters: [
      {
        title: 'Chapter I — The Attic Key',
        content: [
          'Welcome to the family, Nina said with a porcelain smile that never quite reached her eyes. Your room is right at the top of the stairs.'
        ]
      }
    ]
  },
  {
    id: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    category: 'Sci-Fi',
    tags: ['Sci-Fi', 'Space', 'Survival'],
    rating: 4.8,
    pages: 496,
    year: 2024,
    synopsis:
      'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. Except right now, he does not even remember his own name.',
    coverVariant: 'project-hail-mary',
    isNewRelease: true,
    isFeatured: true,
    chapters: [
      {
        title: 'Chapter I — Two Plus Two',
        content: [
          '"What is two plus two?" asked the calm synthetic voice of the infirmary computer. Ryland blinked against the sterile white ceiling, piecing together gravity, time, and a star system light-years from home.'
        ]
      }
    ]
  },
  {
    id: 'tomorrow-and-tomorrow',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    category: 'Fiction',
    tags: ['Fiction', 'Contemporary', 'Art & Games'],
    rating: 4.5,
    pages: 416,
    year: 2024,
    synopsis:
      'On a bitter-cold day in Cambridge, Sam Masur spots Sadie Green in a crowded subway station—igniting a thirty-year creative partnership across friendship, ambition, and virtual worlds.',
    coverVariant: 'tomorrow',
    isNewRelease: true,
    chapters: [
      {
        title: 'Chapter I — The T Station',
        content: [
          'Before Sam even spoke her name, he remembered the exact shade of her wool scarf against the winter slate of Harvard Square.'
        ]
      }
    ]
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Non-fiction',
    tags: ['Non-fiction', 'Productivity', 'Habits'],
    rating: 4.8,
    pages: 320,
    year: 2018,
    synopsis:
      'An actionable framework for improving every day through tiny, compounding behavioral shifts—showing how 1% daily improvements reshape systems and identity.',
    coverVariant: 'atomic-habits',
    continueReadingProgress: 56,
    chapters: [
      {
        title: 'Chapter I — The Surprising Power of Tiny Habits',
        content: [
          'Success is the product of daily habits—not once-in-a-lifetime transformations. When you improve by just one percent each day for a year, you end up thirty-seven times better by the time you are done.'
        ]
      }
    ]
  },
  {
    id: 'the-midnight-library',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    category: 'Fiction',
    tags: ['Fiction', 'Philosophical', 'Magical Realism'],
    rating: 4.4,
    pages: 304,
    year: 2020,
    synopsis:
      'Between life and death there is a library, and within that library, the shelves go on forever—each book offering a chance to experience another life you could have lived.',
    coverVariant: 'midnight-library',
    continueReadingProgress: 32,
    chapters: [
      {
        title: 'Chapter I — Between Life and Death',
        content: [
          'The green shelves stretched infinitely into the mist, glowing faintly with the quiet hum of unlived possibilities.'
        ]
      }
    ]
  },
  {
    id: 'educated',
    title: 'Educated',
    author: 'Tara Westover',
    category: 'Biography',
    tags: ['Non-fiction', 'Memoir', 'Biography'],
    rating: 4.7,
    pages: 352,
    year: 2018,
    synopsis:
      'Born to survivalists in the mountains of Idaho, Tara Westover sets foot in a classroom for the first time at seventeen—launching an extraordinary journey of self-invention.',
    coverVariant: 'educated',
    continueReadingProgress: 18,
    chapters: [
      {
        title: 'Chapter I — Choose the Good',
        content: [
          'The mountain was an iron silhouette against the morning sky, holding the valley in stillness long before the snow melted.'
        ]
      }
    ]
  },
  {
    id: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'Non-fiction',
    tags: ['Non-fiction', 'History', 'Anthropology'],
    rating: 4.6,
    pages: 464,
    year: 2015,
    synopsis:
      'A sweeping chronicle of humankind from the Stone Age to the twenty-first century, exploring how shared stories built empires, science, and modern civilization.',
    coverVariant: 'sapiens',
    continueReadingProgress: 71,
    chapters: [
      {
        title: 'Chapter I — An Animal of No Significance',
        content: [
          'About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang. Yet the story of shared human myths began far later.'
        ]
      }
    ]
  },
  {
    id: 'psychology-of-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Non-fiction',
    tags: ['Non-fiction', 'Finance', 'Behavior'],
    rating: 4.7,
    pages: 256,
    year: 2020,
    synopsis:
      'Doing well with money is not necessarily about what you know—it is about how you behave. Nineteen timeless stories exploring greed, patience, and wealth.',
    coverVariant: 'psychology-of-money',
    continueReadingProgress: 43,
    chapters: [
      {
        title: 'Chapter I — No One Is Crazy',
        content: [
          'Your personal experiences with money make up maybe 0.00000001% of what has happened in the world, but maybe 80% of how you think the world works.'
        ]
      }
    ]
  },
  {
    id: 'circe',
    title: 'Circe',
    author: 'Madeline Miller',
    category: 'Fantasy',
    tags: ['Fantasy', 'Mythology', 'Literary'],
    rating: 4.6,
    pages: 400,
    year: 2018,
    synopsis:
      'In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. Banished to the island of Aiaia, Circe hones her occult craft amidst gods and mortals.',
    coverVariant: 'circe',
    isFeatured: true,
    continueReadingProgress: 24,
    chapters: [
      {
        title: 'Chapter I — The Halls of Helios',
        content: [
          'When I was born, the name for what I was did not exist. They called me nymph, assuming I would be like my mother and aunts—until my voice carried a sharper alchemy.'
        ]
      }
    ]
  },
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Sci-Fi',
    tags: ['Sci-Fi', 'Classic', 'Epic'],
    rating: 4.6,
    pages: 688,
    year: 1965,
    synopsis:
      'Set on the desert planet Arrakis, Dune follows young Paul Atreides as his noble family navigates betrayal, prophecy, and control of the universe’s rarest substance.',
    coverVariant: 'dune',
    isRecommendation: true,
    isFeatured: true,
    chapters: [
      {
        title: 'Book One — Dune',
        content: [
          'A beginning is the time for taking the most delicate care that the balances are correct. Across the crimson ergs of Arrakis, the wind carries both spice and warning.'
        ]
      }
    ]
  },
  {
    id: 'the-hobbit',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fantasy',
    tags: ['Fantasy', 'Classic', 'Adventure'],
    rating: 4.8,
    pages: 310,
    year: 1937,
    synopsis:
      'Bilbo Baggins enjoys a comfortable, unremarkable life in Bag End—until the wizard Gandalf and thirteen dwarves sweep him toward the Lonely Mountain and a sleeping dragon.',
    coverVariant: 'hobbit',
    isRecommendation: true,
    chapters: [
      {
        title: 'Chapter I — An Unexpected Party',
        content: [
          'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell—it was a hobbit-hole, and that means comfort.'
        ]
      }
    ]
  },
  {
    id: 'the-silent-patient',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    category: 'Mystery',
    tags: ['Mystery', 'Thriller', 'Suspense'],
    rating: 4.3,
    pages: 336,
    year: 2019,
    synopsis:
      'Alicia Berenson’s life appears idyllic until one evening she fires five shots into her husband’s face and never speaks another word. One criminal psychotherapist is determined to make her talk.',
    coverVariant: 'silent-patient',
    isRecommendation: true,
    chapters: [
      {
        title: 'Prologue — Alicia’s Diary',
        content: [
          'I am writing this in secret, tucked behind the canvas stretches in my studio. Nobody knows why I painted Alcestis, only that the silence arrived long before the verdict.'
        ]
      }
    ]
  },
  {
    id: 'lessons-in-chemistry',
    title: 'Lessons in Chemistry',
    author: 'Bonnie Garmus',
    category: 'Fiction',
    tags: ['Fiction', 'Historical', 'Wit'],
    rating: 4.3,
    pages: 400,
    year: 2022,
    synopsis:
      'Chemist Elizabeth Zott is not your average woman. Forced out of her research lab in early-1960s California, she becomes the reluctant star of a beloved cooking show that teaches science and courage.',
    coverVariant: 'lessons-chemistry',
    isRecommendation: true,
    chapters: [
      {
        title: 'Chapter I — Supper at Six',
        content: [
          'Back in 1961, when women wore shirtwaist dresses and joined garden clubs, Elizabeth Zott kept three sharpened pencils tucked into her chignon and measured sodium chloride to the milligram.'
        ]
      }
    ]
  },
  {
    id: 'the-book-thief',
    title: 'The Book Thief',
    author: 'Markus Zusak',
    category: 'Fiction',
    tags: ['Fiction', 'Historical', 'Classic'],
    rating: 4.6,
    pages: 584,
    year: 2005,
    synopsis:
      'In 1939 Germany, young Liesel Meminger finds solace by stealing books and sharing them with her foster family and the Jewish man hidden in their basement.',
    coverVariant: 'book-thief',
    isRecommendation: true,
    chapters: [
      {
        title: 'Prologue — A Mountain Range of Rubble',
        content: [
          'First the colors. Then the humans. That is usually how I see things—or at least how I try to remember a small girl holding a black book in the snow.'
        ]
      }
    ]
  }
];
