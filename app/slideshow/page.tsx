'use client';

import { useState, useEffect, useCallback } from 'react';
import { sponsors, announcements, events, formatDate, isUpcoming } from '@/lib/data';

type Slide =
  | { type: 'welcome' }
  | { type: 'sponsor'; sponsor: typeof sponsors[0] }
  | { type: 'announcement'; announcement: typeof announcements[0] }
  | { type: 'next-event' }
  | { type: 'all-sponsors' };

export default function SlideshowPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fade, setFade] = useState(true);

  // Build slide deck
  const slides: Slide[] = [];

  // Welcome slide
  slides.push({ type: 'welcome' });

  // Next event
  const upcoming = events.filter(e => isUpcoming(e.date));
  if (upcoming.length > 0) {
    slides.push({ type: 'next-event' });
  }

  // Interleave sponsors and announcements
  const goldSponsors = sponsors.filter(s => s.tier === 'gold');
  const silverSponsors = sponsors.filter(s => s.tier === 'silver');
  const allSponsors = [...goldSponsors, ...goldSponsors, ...silverSponsors, ...sponsors.filter(s => s.tier === 'bronze')];

  allSponsors.forEach((s, i) => {
    slides.push({ type: 'sponsor', sponsor: s });
    // Insert announcement every 3 sponsors
    if ((i + 1) % 3 === 0 && announcements[Math.floor(i / 3) % announcements.length]) {
      slides.push({ type: 'announcement', announcement: announcements[Math.floor(i / 3) % announcements.length] });
    }
  });

  // All sponsors overview
  slides.push({ type: 'all-sponsors' });

  const nextSlide = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
      setFade(true);
    }, 300);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
      setFade(true);
    }, 300);
  }, [slides.length]);

  // Auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f' || e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === 'Escape') exitFullscreen();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div
      className="min-h-screen bg-gray-900 text-white flex flex-col cursor-none select-none"
      onClick={nextSlide}
    >
      {/* Controls bar */}
      <div className="absolute top-4 right-4 z-50 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
        <button onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="bg-black/50 text-white px-3 py-2 rounded-lg text-sm hover:bg-black/80">
          ← Vorige
        </button>
        <button onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="bg-black/50 text-white px-3 py-2 rounded-lg text-sm hover:bg-black/80">
          Volgende →
        </button>
        <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
          className="bg-black/50 text-white px-3 py-2 rounded-lg text-sm hover:bg-black/80">
          {isFullscreen ? '🔲 Exit' : '📺 Fullscreen'}
        </button>
        <a href="/" onClick={(e) => e.stopPropagation()}
          className="bg-black/50 text-white px-3 py-2 rounded-lg text-sm hover:bg-black/80">
          🏠 Home
        </a>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-1.5">
        {slides.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all ${
            i === currentSlide ? 'bg-amber-400 w-6' : 'bg-white/30'
          }`} />
        ))}
      </div>

      {/* Main slide area */}
      <div className={`flex-1 flex items-center justify-center p-8 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        {slide.type === 'welcome' && <WelcomeSlide />}
        {slide.type === 'sponsor' && <SponsorSlide sponsor={slide.sponsor} />}
        {slide.type === 'announcement' && <AnnouncementSlide announcement={slide.announcement} />}
        {slide.type === 'next-event' && <NextEventSlide event={upcoming[0]} />}
        {slide.type === 'all-sponsors' && <AllSponsorsSlide />}
      </div>

      {/* Bottom bar */}
      <div className="bg-red-700 py-3 px-6 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎱</span>
          <span className="font-black">MAASPOORT BINGO</span>
        </div>
        <div className="text-red-200">
          {new Date().toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>
    </div>
  );
}

function WelcomeSlide() {
  return (
    <div className="text-center">
      <div className="text-8xl mb-6">🎱</div>
      <h1 className="text-7xl md:text-9xl font-black tracking-tight mb-4">
        <span className="text-amber-400">MAASPOORT</span><br />
        <span className="text-white">BINGO!</span>
      </h1>
      <p className="text-2xl text-gray-400 mt-6">Welkom! De bingo begint zo...</p>
    </div>
  );
}

function SponsorSlide({ sponsor }: { sponsor: typeof sponsors[0] }) {
  const tierColors = {
    gold: { bg: 'from-amber-900/50 to-amber-700/30', badge: 'bg-amber-500', label: '⭐ Goud Sponsor' },
    silver: { bg: 'from-gray-700/50 to-gray-600/30', badge: 'bg-gray-500', label: '🥈 Zilver Sponsor' },
    bronze: { bg: 'from-amber-900/30 to-amber-800/20', badge: 'bg-amber-800', label: '🥉 Brons Sponsor' },
  };
  const tier = tierColors[sponsor.tier];

  return (
    <div className={`text-center bg-gradient-to-br ${tier.bg} rounded-3xl p-16 max-w-3xl w-full`}>
      <div className={`inline-block ${tier.badge} text-white text-sm font-bold px-4 py-1.5 rounded-full mb-8`}>
        {tier.label}
      </div>

      {/* Logo / Initial */}
      <div className="w-40 h-40 mx-auto rounded-2xl bg-white flex items-center justify-center mb-8">
        {sponsor.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sponsor.logo} alt={sponsor.name} className="max-h-32 max-w-32 object-contain" />
        ) : (
          <span className="text-7xl font-black text-gray-300">{sponsor.name.charAt(0)}</span>
        )}
      </div>

      <h2 className="text-5xl font-black mb-4">{sponsor.name}</h2>
      {sponsor.description && (
        <p className="text-xl text-gray-300">{sponsor.description}</p>
      )}
      {sponsor.website && (
        <p className="text-amber-400 mt-4 text-lg">{sponsor.website.replace('https://', '')}</p>
      )}
    </div>
  );
}

function AnnouncementSlide({ announcement }: { announcement: typeof announcements[0] }) {
  const icons = { info: '📢', important: '⚠️', fun: '🎉' };
  const colors = { info: 'from-blue-900/50', important: 'from-red-900/50', fun: 'from-purple-900/50' };

  return (
    <div className={`text-center bg-gradient-to-br ${colors[announcement.type]} to-gray-900 rounded-3xl p-16 max-w-3xl w-full`}>
      <div className="text-8xl mb-8">{icons[announcement.type]}</div>
      <h2 className="text-4xl md:text-5xl font-black leading-tight">{announcement.text}</h2>
    </div>
  );
}

function NextEventSlide({ event }: { event: typeof events[0] }) {
  return (
    <div className="text-center bg-gradient-to-br from-red-900/50 to-amber-900/30 rounded-3xl p-16 max-w-3xl w-full">
      <div className="text-6xl mb-4">📅</div>
      <div className="text-amber-400 text-xl font-bold uppercase tracking-wider mb-4">Volgende Bingo</div>
      <h2 className="text-5xl md:text-6xl font-black mb-6">{formatDate(event.date)}</h2>
      <div className="text-3xl text-gray-300 mb-2">🕢 {event.time} uur</div>
      <div className="text-xl text-gray-400">📍 {event.location}</div>
      {event.description && (
        <div className="mt-6 bg-amber-500 text-white text-lg font-bold px-6 py-3 rounded-xl inline-block">
          {event.description}
        </div>
      )}
    </div>
  );
}

function AllSponsorsSlide() {
  return (
    <div className="text-center w-full max-w-4xl">
      <h2 className="text-4xl font-black mb-2">❤️ Bedankt aan onze sponsoren!</h2>
      <p className="text-gray-400 text-lg mb-10">Zonder hen geen mooie prijzen</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sponsors.map(s => (
          <div key={s.id} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto rounded-lg bg-white flex items-center justify-center mb-3">
              <span className="text-2xl font-black text-gray-400">{s.name.charAt(0)}</span>
            </div>
            <div className="text-sm font-bold">{s.name}</div>
            <div className="text-xs text-gray-400 capitalize">{s.tier === 'gold' ? '⭐' : s.tier === 'silver' ? '🥈' : '🥉'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
