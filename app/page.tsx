import Link from 'next/link';
import Image from 'next/image';
import { events, sponsors, announcements, formatDate, isUpcoming } from '@/lib/data';

export default function Home() {
  const upcomingEvents = events.filter((e) => isUpcoming(e.date));
  const nextEvent = upcomingEvents[0];

  return (
    <div className="min-h-screen">
      {/* ─── NAV ─── */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Maaspoort Bingo" width={40} height={40} className="logo-glow" />
          <span className="font-bold text-sm tracking-wide text-[#EDEDED]">MAASPOORT BINGO</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#agenda" className="hover:text-[#F5C451] transition-colors">Agenda</a>
          <a href="#sponsoren" className="hover:text-[#F5C451] transition-colors">Sponsoren</a>
          <a href="#meedoen" className="hover:text-[#F5C451] transition-colors">Word Sponsor</a>
          <Link
            href="/slideshow"
            className="border border-[#F5C451]/40 text-[#F5C451] px-4 py-2 rounded-full text-xs font-semibold hover:border-[#F5C451] transition-colors"
          >
            Slideshow
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Maaspoort Bingo"
          width={600}
          height={600}
          priority
          className="logo-glow w-[280px] md:w-[420px] lg:w-[500px] h-auto mb-12"
        />

        {nextEvent ? (
          <>
            <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Volgende bingo</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              <span className="text-[#F5C451]">{formatDate(nextEvent.date)}</span>
            </h1>
            <p className="text-slate-400 mb-1">{nextEvent.time} uur — {nextEvent.location}</p>
            {nextEvent.special && nextEvent.description && (
              <p className="text-[#F5C451]/80 text-sm mt-1">{nextEvent.description}</p>
            )}
          </>
        ) : (
          <h1 className="text-3xl md:text-5xl font-bold text-slate-400">
            Binnenkort weer bingo!
          </h1>
        )}

        <a
          href="#agenda"
          className="mt-10 bg-[#F5C451] text-[#0E1623] font-bold px-8 py-3.5 rounded-full hover:bg-[#F5C451]/90 transition-colors"
        >
          Doe mee
        </a>
      </section>

      {/* ─── ANNOUNCEMENTS ─── */}
      {announcements.length > 0 && (
        <div className="border-y border-white/5 py-3 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 flex items-center gap-4 text-sm">
            <span className="text-[#F5C451] font-semibold flex-shrink-0">Nieuws</span>
            <div className="overflow-hidden whitespace-nowrap text-slate-400">
              <span className="inline-block animate-marquee">
                {announcements.map((a, i) => (
                  <span key={a.id}>
                    {a.text}
                    {i < announcements.length - 1 && '  ·  '}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ─── AGENDA ─── */}
      <section id="agenda" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Agenda</h2>
          <p className="text-slate-400 text-sm mt-2">Alle aankomende bingoavonden</p>
        </div>

        <div className="grid gap-4 max-w-2xl mx-auto">
          {upcomingEvents.length === 0 ? (
            <p className="text-center text-slate-500 py-10">
              Geen aankomende data gepland. Kom snel terug!
            </p>
          ) : (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#161F2F] border border-[#F5C451]/20 hover:border-[#F5C451]/40 rounded-xl overflow-hidden flex transition-colors"
              >
                {/* Date block */}
                <div className="flex-shrink-0 w-20 flex flex-col items-center justify-center p-3 bg-[#F5C451]/10">
                  <span className="text-2xl font-bold text-[#F5C451]">
                    {new Date(event.date).getDate()}
                  </span>
                  <span className="text-xs uppercase text-slate-400">
                    {new Date(event.date).toLocaleDateString('nl-NL', { month: 'short' })}
                  </span>
                </div>
                {/* Details */}
                <div className="p-4 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{event.time} uur</span>
                    {event.special && (
                      <span className="text-[#F5C451] text-xs font-semibold bg-[#F5C451]/10 px-2 py-0.5 rounded-full">
                        Special
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{event.location}</p>
                  <p className="text-xs text-slate-500">{event.address}</p>
                  {event.description && (
                    <p className="text-sm text-slate-300 mt-2">{event.description}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ─── SPONSOREN ─── */}
      <section id="sponsoren" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Onze Sponsoren</h2>
          <p className="text-slate-400 text-sm mt-2">Dankzij hen kunnen wij mooie prijzen aanbieden</p>
        </div>

        {/* Gold */}
        {sponsors.filter((s) => s.tier === 'gold').length > 0 && (
          <div className="mb-10">
            <h3 className="text-center text-[#F5C451] text-xs font-semibold uppercase tracking-wider mb-4">
              Goud
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {sponsors
                .filter((s) => s.tier === 'gold')
                .map((s) => (
                  <SponsorCard key={s.id} sponsor={s} />
                ))}
            </div>
          </div>
        )}

        {/* Silver */}
        {sponsors.filter((s) => s.tier === 'silver').length > 0 && (
          <div className="mb-10">
            <h3 className="text-center text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Zilver
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {sponsors
                .filter((s) => s.tier === 'silver')
                .map((s) => (
                  <SponsorCard key={s.id} sponsor={s} />
                ))}
            </div>
          </div>
        )}

        {/* Bronze */}
        {sponsors.filter((s) => s.tier === 'bronze').length > 0 && (
          <div>
            <h3 className="text-center text-slate-500 text-xs font-semibold uppercase tracking-wider mb-4">
              Brons
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {sponsors
                .filter((s) => s.tier === 'bronze')
                .map((s) => (
                  <SponsorCard key={s.id} sponsor={s} small />
                ))}
            </div>
          </div>
        )}
      </section>

      {/* ─── WORD SPONSOR ─── */}
      <section id="meedoen" className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Word Sponsor</h2>
            <p className="text-slate-400 text-sm mt-2">
              Steun de buurt én vergroot uw naamsbekendheid.
            </p>
          </div>

          {/* Pricing tiers */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              {
                tier: 'Brons',
                price: '€25',
                features: ['Naam op website', 'Vermelding in zaal'],
              },
              {
                tier: 'Zilver',
                price: '€50',
                features: ['Logo op website', 'Vermelding in zaal', 'Slideshow vermelding'],
              },
              {
                tier: 'Goud',
                price: '€100',
                features: [
                  'Groot logo op website',
                  'Banner in zaal',
                  'Slideshow + aankondiging',
                  'Social media shoutout',
                ],
              },
            ].map((t) => (
              <div
                key={t.tier}
                className="bg-[#161F2F] border border-[#F5C451]/20 hover:border-[#F5C451]/40 rounded-xl p-4 text-center transition-colors"
              >
                <div className="font-bold text-sm">{t.tier}</div>
                <div className="text-2xl font-bold text-[#F5C451] my-2">{t.price}</div>
                <div className="text-xs text-slate-500">per seizoen</div>
                <ul className="text-xs text-slate-400 mt-3 space-y-1 text-left">
                  {t.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            action="https://formspree.io/f/placeholder"
            method="POST"
            className="bg-[#161F2F] border border-white/10 rounded-2xl p-6 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Bedrijfsnaam *</label>
              <input
                type="text"
                name="bedrijf"
                required
                className="w-full bg-[#161F2F] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#F5C451] placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Contactpersoon *</label>
              <input
                type="text"
                name="naam"
                required
                className="w-full bg-[#161F2F] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#F5C451] placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">E-mail *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-[#161F2F] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#F5C451] placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Telefoon</label>
              <input
                type="tel"
                name="telefoon"
                className="w-full bg-[#161F2F] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#F5C451] placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Gewenst pakket</label>
              <select
                name="pakket"
                className="w-full bg-[#161F2F] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#F5C451]"
              >
                <option value="brons">Brons — €25/seizoen</option>
                <option value="zilver">Zilver — €50/seizoen</option>
                <option value="goud">Goud — €100/seizoen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Bericht (optioneel)</label>
              <textarea
                name="bericht"
                rows={3}
                className="w-full bg-[#161F2F] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#F5C451] placeholder:text-slate-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#F5C451] text-[#0E1623] font-bold py-3 rounded-lg hover:bg-[#F5C451]/90 transition-colors"
            >
              Aanmelden als Sponsor
            </button>
          </form>
        </div>
      </section>

      {/* ─── SLIDESHOW CTA ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-xl font-bold mb-2">Fullscreen Slideshow</h2>
        <p className="text-slate-500 text-sm mb-6">
          Toon sponsoren en mededelingen op het grote scherm in de zaal
        </p>
        <Link
          href="/slideshow"
          className="inline-block border border-[#F5C451] text-[#F5C451] font-semibold px-8 py-3 rounded-full hover:bg-[#F5C451]/10 transition-colors"
        >
          Start Slideshow →
        </Link>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>Wijkcentrum Maaspoort — Deutersestraat 2, Den Bosch</p>
          <p className="mt-2">
            Vragen?{' '}
            <a href="mailto:bingo@maaspoort.nl" className="text-[#F5C451]/70 hover:text-[#F5C451] transition-colors">
              bingo@maaspoort.nl
            </a>
          </p>
          <p className="mt-4 text-slate-600">© 2026 Maaspoort Bingo</p>
        </div>
      </footer>
    </div>
  );
}

function SponsorCard({ sponsor, small }: { sponsor: (typeof sponsors)[0]; small?: boolean }) {
  const content = (
    <div
      className={`bg-[#161F2F] border border-[#F5C451]/20 hover:border-[#F5C451]/40 rounded-xl transition-colors ${
        small ? 'p-3' : 'p-5'
      }`}
    >
      <div
        className={`rounded-lg flex items-center justify-center font-bold text-slate-500 mb-2 ${
          small ? 'h-12 text-lg' : 'h-16 text-2xl'
        }`}
      >
        {sponsor.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="max-h-full max-w-full object-contain p-2"
          />
        ) : (
          <span className="text-[#F5C451]/50">{sponsor.name.charAt(0)}</span>
        )}
      </div>
      <div className={`font-semibold ${small ? 'text-xs' : 'text-sm'}`}>{sponsor.name}</div>
      {!small && sponsor.description && (
        <p className="text-xs text-slate-400 mt-1">{sponsor.description}</p>
      )}
    </div>
  );

  if (sponsor.website) {
    return (
      <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}
