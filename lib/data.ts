export interface BingoEvent {
  id: string;
  date: string; // ISO date
  time: string;
  location: string;
  address: string;
  description?: string;
  special?: boolean;
}

export interface Sponsor {
  id: string;
  name: string;
  logo?: string;
  icon?: string;
  website?: string;
  tier: 'gold' | 'silver' | 'bronze';
  description?: string;
}

export interface Announcement {
  id: string;
  text: string;
  type: 'info' | 'important' | 'fun';
}

// ===== AGENDA =====
export const events: BingoEvent[] = [
  {
    id: '1',
    date: '2026-03-14',
    time: '19:30',
    location: 'Wijkcentrum Maaspoort',
    address: 'Deutersestraat 2, Den Bosch',
    description: 'Reguliere bingoavond met mooie prijzen!',
  },
  {
    id: '2',
    date: '2026-03-28',
    time: '19:30',
    location: 'Wijkcentrum Maaspoort',
    address: 'Deutersestraat 2, Den Bosch',
    description: 'Lente-bingo — extra prijzen!',
    special: true,
  },
  {
    id: '3',
    date: '2026-04-11',
    time: '19:30',
    location: 'Wijkcentrum Maaspoort',
    address: 'Deutersestraat 2, Den Bosch',
    description: 'Reguliere bingoavond',
  },
  {
    id: '4',
    date: '2026-04-25',
    time: '19:30',
    location: 'Wijkcentrum Maaspoort',
    address: 'Deutersestraat 2, Den Bosch',
    description: 'Koningsdagbingo — Oranje special! 🧡',
    special: true,
  },
  {
    id: '5',
    date: '2026-05-09',
    time: '19:30',
    location: 'Wijkcentrum Maaspoort',
    address: 'Deutersestraat 2, Den Bosch',
    description: 'Reguliere bingoavond',
  },
  {
    id: '6',
    date: '2026-05-23',
    time: '19:30',
    location: 'Wijkcentrum Maaspoort',
    address: 'Deutersestraat 2, Den Bosch',
    description: 'Zomerbingo met BBQ na afloop! 🌞',
    special: true,
  },
];

// ===== SPONSOREN =====
export const sponsors: Sponsor[] = [
  {
    id: '1',
    name: 'Albert Heijn Maaspoort',
    logo: '/sponsors/albert-heijn.svg',
    tier: 'gold',
    website: 'https://www.ah.nl',
    description: 'Uw buurtsuper in Maaspoort',
  },
  {
    id: '2',
    name: 'Bakkerij Van den Berg',
    logo: '/sponsors/bakkerij.svg',
    tier: 'gold',
    description: 'Versgebakken brood en taart sinds 1985',
  },
  {
    id: '3',
    name: 'Café De Buurman',
    logo: '/sponsors/cafe-buurman.svg',
    tier: 'silver',
    description: 'Het gezelligste café van Maaspoort',
  },
  {
    id: '4',
    name: 'Schildersbedrijf Jansen',
    logo: '/sponsors/schilder-jansen.svg',
    tier: 'silver',
    website: 'https://example.com',
    description: 'Voor al uw schilder- en behangwerk',
  },
  {
    id: '5',
    name: 'Kapsalon Mooi',
    logo: '/sponsors/kapsalon-mooi.svg',
    tier: 'bronze',
    description: 'Knipppen & stylen voor het hele gezin',
  },
  {
    id: '6',
    name: 'Fietsenmaker Piet',
    logo: '/sponsors/fietsenmaker-piet.svg',
    tier: 'bronze',
    description: 'Reparatie, onderhoud en verkoop',
  },
  {
    id: '7',
    name: 'Snackbar Het Hoekje',
    logo: '/sponsors/snackbar-hoekje.svg',
    tier: 'bronze',
    description: 'De lekkerste friet van de wijk!',
  },
];

// ===== MEDEDELINGEN =====
export const announcements: Announcement[] = [
  {
    id: '1',
    text: 'Welkom bij Maaspoort Bingo! 🎱',
    type: 'fun',
  },
  {
    id: '2',
    text: 'Volgende bingo: vrijdag 14 maart om 19:30 uur',
    type: 'info',
  },
  {
    id: '3',
    text: 'Nieuwe vrijwilligers gezocht! Meld je aan bij het bestuur.',
    type: 'important',
  },
  {
    id: '4',
    text: 'Bedankt aan al onze geweldige sponsoren! ❤️',
    type: 'fun',
  },
];

// Helper
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function isUpcoming(dateStr: string): boolean {
  return new Date(dateStr) >= new Date(new Date().toDateString());
}
