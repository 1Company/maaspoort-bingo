import Link from 'next/link';
import { events, sponsors, announcements, formatDate, isUpcoming } from '@/lib/data';

function BingoBall({ number, color }: { number: number; color: string }) {
  return (
    <div className={`bingo-ball w-14 h-14 rounded-full flex items-center justify-center text-xl font-black ${color} select-none`}>
      {number}
    </div>
  );
}

export default function Home() {
  const upcomingEvents = events.filter(e => isUpcoming(e.date));
  const nextEvent = upcomingEvents[0];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-br from-red-700 via-red-600 to-amber-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-yellow-300 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-red-300 blur-3xl" />
        </div>
        <nav className="relative container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎱</div>
            <div>
              <div className="font-black text-xl tracking-tight">MAASPOORT BINGO</div>
              <div className="text-xs text-red-200">Den Bosch</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#agenda" className="hover:text-amber-300 transition-colors">Agenda</a>
            <a href="#sponsoren" className="hover:text-amber-300 transition-colors">Sponsoren</a>
            <a href="#meedoen" className="hover:text-amber-300 transition-colors">Word Sponsor</a>
            <Link href="/slideshow" className="bg-white text-red-700 px-4 py-2 rounded-full font-bold hover:bg-amber-100 transition-colors">
              📺 Slideshow
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="flex justify-center gap-3 mb-8">
            <BingoBall number={11} color="text-red-600" />
            <BingoBall number={24} color="text-blue-700" />
            <BingoBall number={37} color="text-green-700" />
            <BingoBall number={52} color="text-amber-600" />
            <BingoBall number={69} color="text-purple-700" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            BINGO!
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-2">
            Elke twee weken gezelligheid in Maaspoort
          </p>
          <p className="text-red-200 mb-10 max-w-lg mx-auto">
            Kom langs, win mooie prijzen en geniet van een gezellige avond met je buren!
          </p>

          {nextEvent && (
            <div className="inline-block bg-white/15 backdrop-blur-sm rounded-2xl px-8 py-5 border border-white/20">
              <div className="text-amber-300 text-sm font-bold uppercase tracking-wider mb-1">Volgende bingo</div>
              <div className="text-2xl font-black">{formatDate(nextEvent.date)}</div>
              <div className="text-red-200 mt-1">{nextEvent.time} uur — {nextEvent.location}</div>
              {nextEvent.special && (
                <div className="mt-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block">
                  ⭐ {nextEvent.description}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mededelingen ticker */}
      {announcements.length > 0 && (
        <div className="bg-amber-500 text-white py-2 overflow-hidden">
          <div className="container mx-auto px-4 flex items-center gap-4 text-sm font-medium">
            <span className="font-black flex-shrink-0">📢 NIEUWS</span>
            <div className="overflow-hidden whitespace-nowrap">
              <span className="inline-block animate-marquee">
                {announcements.map((a, i) => (
                  <span key={a.id}>
                    {a.text}
                    {i < announcements.length - 1 && ' ● '}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Agenda */}
      <section id="agenda" className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">📅 Agenda</h2>
          <p className="text-gray-500 mt-2">Alle aankomende bingoavonden</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {upcomingEvents.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Geen aankomende data gepland. Kom snel terug!</p>
          ) : (
            upcomingEvents.map((event, i) => (
              <div
                key={event.id}
                className={`flex items-stretch rounded-xl overflow-hidden border-2 transition-all hover:shadow-lg ${
                  event.special ? 'border-amber-400 bg-amber-50' : 'border-gray-200 bg-white'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Date block */}
                <div className={`flex-shrink-0 w-24 flex flex-col items-center justify-center p-3 ${
                  event.special ? 'bg-amber-500 text-white' : 'bg-red-600 text-white'
                }`}>
                  <div className="text-3xl font-black">{new Date(event.date).getDate()}</div>
                  <div className="text-xs uppercase font-bold">
                    {new Date(event.date).toLocaleDateString('nl-NL', { month: 'short' })}
                  </div>
                  <div className="text-xs opacity-80">
                    {new Date(event.date).toLocaleDateString('nl-NL', { weekday: 'short' })}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-gray-900">🕢 {event.time} uur</span>
                    {event.special && <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">SPECIAL</span>}
                  </div>
                  <div className="text-sm text-gray-600">📍 {event.location}</div>
                  <div className="text-xs text-gray-400">{event.address}</div>
                  {event.description && (
                    <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Sponsoren */}
      <section id="sponsoren" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">🏆 Onze Sponsoren</h2>
            <p className="text-gray-500 mt-2">Dankzij hen kunnen wij mooie prijzen aanbieden!</p>
          </div>

          {/* Gold sponsors */}
          {sponsors.filter(s => s.tier === 'gold').length > 0 && (
            <div className="mb-10">
              <h3 className="text-center text-amber-600 font-bold text-sm uppercase tracking-wider mb-4">⭐ Goud Sponsoren</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {sponsors.filter(s => s.tier === 'gold').map(s => (
                  <SponsorCard key={s.id} sponsor={s} />
                ))}
              </div>
            </div>
          )}

          {/* Silver */}
          {sponsors.filter(s => s.tier === 'silver').length > 0 && (
            <div className="mb-10">
              <h3 className="text-center text-gray-500 font-bold text-sm uppercase tracking-wider mb-4">🥈 Zilver Sponsoren</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {sponsors.filter(s => s.tier === 'silver').map(s => (
                  <SponsorCard key={s.id} sponsor={s} />
                ))}
              </div>
            </div>
          )}

          {/* Bronze */}
          {sponsors.filter(s => s.tier === 'bronze').length > 0 && (
            <div>
              <h3 className="text-center text-amber-800 font-bold text-sm uppercase tracking-wider mb-4">🥉 Brons Sponsoren</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
                {sponsors.filter(s => s.tier === 'bronze').map(s => (
                  <SponsorCard key={s.id} sponsor={s} small />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Word Sponsor Form */}
      <section id="meedoen" className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">🤝 Word Sponsor</h2>
            <p className="text-gray-500 mt-2">
              Steun de buurt én vergroot uw naamsbekendheid!<br />
              Uw logo op de website, in de zaal en op het grote scherm.
            </p>
          </div>

          {/* Pricing tiers */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { tier: 'Brons', price: '€25', color: 'border-amber-800 bg-amber-50', features: ['Naam op website', 'Vermelding in zaal'] },
              { tier: 'Zilver', price: '€50', color: 'border-gray-400 bg-gray-50', features: ['Logo op website', 'Vermelding in zaal', 'Slideshow vermelding'] },
              { tier: 'Goud', price: '€100', color: 'border-amber-500 bg-amber-50', features: ['Groot logo op website', 'Banner in zaal', 'Slideshow + aankondiging', 'Social media shoutout'] },
            ].map(t => (
              <div key={t.tier} className={`border-2 rounded-xl p-4 text-center ${t.color}`}>
                <div className="font-black text-lg">{t.tier}</div>
                <div className="text-2xl font-black text-red-600 my-2">{t.price}</div>
                <div className="text-xs text-gray-500">per seizoen</div>
                <ul className="text-xs text-gray-600 mt-3 space-y-1 text-left">
                  {t.features.map(f => <li key={f}>✓ {f}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            action="https://formspree.io/f/placeholder"
            method="POST"
            className="bg-white rounded-2xl border-2 border-gray-200 p-6 space-y-4"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Bedrijfsnaam *</label>
              <input type="text" name="bedrijf" required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Contactpersoon *</label>
              <input type="text" name="naam" required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">E-mail *</label>
              <input type="email" name="email" required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Telefoon</label>
              <input type="tel" name="telefoon"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Gewenst pakket</label>
              <select name="pakket" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="brons">🥉 Brons — €25/seizoen</option>
                <option value="zilver">🥈 Zilver — €50/seizoen</option>
                <option value="goud">⭐ Goud — €100/seizoen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Bericht (optioneel)</label>
              <textarea name="bericht" rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <button type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors text-lg">
              Aanmelden als Sponsor 🎉
            </button>
          </form>
        </div>
      </section>

      {/* Slideshow CTA */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-black mb-3">📺 Fullscreen Slideshow</h2>
          <p className="text-gray-400 mb-6">Toon sponsoren en mededelingen op het grote scherm in de zaal</p>
          <Link href="/slideshow"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">
            Start Slideshow →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-sm">
          <div className="flex justify-center items-center gap-2 mb-3">
            <span className="text-2xl">🎱</span>
            <span className="font-bold text-white">Maaspoort Bingo</span>
          </div>
          <p>Wijkcentrum Maaspoort — Deutersestraat 2, Den Bosch</p>
          <p className="mt-2">
            Vragen? Mail naar{' '}
            <a href="mailto:bingo@maaspoort.nl" className="text-amber-400 hover:text-amber-300">
              bingo@maaspoort.nl
            </a>
          </p>
          <p className="mt-4 text-gray-600">© 2026 Maaspoort Bingo — Met ❤️ gemaakt voor de buurt</p>
        </div>
      </footer>
    </div>
  );
}

function SponsorCard({ sponsor, small }: { sponsor: typeof sponsors[0]; small?: boolean }) {
  const content = (
    <div className={`bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-amber-300 transition-all ${small ? 'p-3' : 'p-5'}`}>
      {/* Logo placeholder */}
      <div className={`rounded-lg flex items-center justify-center font-black mb-2 ${
        small ? 'h-12 text-lg' : 'h-20 text-2xl'
      }`} style={{
        backgroundColor: sponsor.tier === 'gold' ? '#FEF3C7' : sponsor.tier === 'silver' ? '#F3F4F6' : '#FFF7ED',
        color: sponsor.tier === 'gold' ? '#D97706' : sponsor.tier === 'silver' ? '#6B7280' : '#92400E',
      }}>
        {sponsor.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sponsor.logo} alt={sponsor.name} className="max-h-full max-w-full object-contain p-2" />
        ) : (
          sponsor.name.charAt(0)
        )}
      </div>
      <div className={`font-bold text-gray-900 ${small ? 'text-xs' : 'text-sm'}`}>{sponsor.name}</div>
      {!small && sponsor.description && (
        <p className="text-xs text-gray-500 mt-1">{sponsor.description}</p>
      )}
    </div>
  );

  if (sponsor.website) {
    return <a href={sponsor.website} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  return content;
}
