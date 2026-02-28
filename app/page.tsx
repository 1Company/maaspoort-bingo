'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { events, sponsors, isUpcoming } from '@/lib/data';
import { Spotlight } from '@/components/ui/spotlight';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';
import { GlowCard } from '@/components/ui/glow-card';

export default function Home() {
  const upcomingEvents = events.filter((e) => isUpcoming(e.date));
  const nextEvent = upcomingEvents[0];
  const specialEvents = upcomingEvents.filter((e) => e.special).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Maaspoort Bingo" width={36} height={36} className="rounded-full" />
          <span className="font-serif-display text-sm font-bold gold-text">Maaspoort Bingo</span>
        </div>
        <div className="flex items-center gap-4">
          <SocialIcon href="https://instagram.com" icon="instagram" />
          <SocialIcon href="https://facebook.com" icon="facebook" />
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <Spotlight className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="flex flex-col items-center text-center relative z-10">
          {/* Logo with floating glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative mb-10"
          >
            {/* Ambient glow behind logo */}
            <div className="absolute inset-0 blur-3xl bg-[#C8982E]/20 rounded-full scale-75" />
            <Image
              src="/logo.png"
              alt="Maaspoort Bingo"
              width={600}
              height={600}
              priority
              className="relative logo-glow w-[260px] md:w-[380px] lg:w-[440px] h-auto"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif-display italic text-2xl md:text-4xl gold-text mb-8"
          >
            {nextEvent
              ? `Volgende bingo: ${new Date(nextEvent.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })}`
              : 'Binnenkort weer bingo!'}
          </motion.h1>

          <motion.a
            href="#agenda"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="border-2 border-[#C8982E] text-[#C8982E] font-serif-display text-lg px-10 py-3 rounded-full hover:bg-[#C8982E] hover:text-white transition-colors"
          >
            Doe mee
          </motion.a>
        </div>
      </Spotlight>

      {/* ─── SPECIAL EVENTS ─── */}
      {specialEvents.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <FadeIn>
            <h2 className="divider-gold font-serif-display italic gold-text text-lg md:text-xl text-center mb-8">
              Bingo Agenda
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {specialEvents.map((event) => (
              <StaggerItem key={event.id}>
                <AnimatedBorder>
                  <div className="p-6 text-center">
                    <div className="w-2 h-2 rounded-full bg-[#C8982E] mx-auto mb-4" />
                    <div className="font-bold text-sm mb-1">
                      {event.description?.replace(/[🧡🌞]/g, '').trim() || 'Bingo'}
                    </div>
                    <div className="text-xs text-slate-400">
                      {new Date(event.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })}
                    </div>
                  </div>
                </AnimatedBorder>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* ─── FULL AGENDA ─── */}
      <section id="agenda" className="max-w-5xl mx-auto px-6 py-20">
        <FadeIn>
          <h2 className="divider-gold font-serif-display italic gold-text text-lg md:text-xl text-center mb-8">
            Alle data
          </h2>
        </FadeIn>
        <StaggerContainer className="grid gap-3 max-w-2xl mx-auto">
          {upcomingEvents.length === 0 ? (
            <p className="text-center text-slate-500 py-10">Geen aankomende data gepland. Kom snel terug!</p>
          ) : (
            upcomingEvents.map((event) => (
              <StaggerItem key={event.id}>
                <GlowCard>
                  <div className="flex overflow-hidden">
                    <div className="flex-shrink-0 w-20 flex flex-col items-center justify-center p-3 bg-[#C8982E]/10">
                      <span className="text-2xl font-bold text-[#C8982E]">{new Date(event.date).getDate()}</span>
                      <span className="text-xs uppercase text-slate-400">
                        {new Date(event.date).toLocaleDateString('nl-NL', { month: 'short' })}
                      </span>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{event.time} uur</span>
                        {event.special && (
                          <span className="gold-text text-xs font-semibold">✦ Special</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{event.location} — {event.address}</p>
                      {event.description && (
                        <p className="text-sm text-slate-300 mt-1">{event.description}</p>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))
          )}
        </StaggerContainer>
      </section>

      {/* ─── MISSIE ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <FadeIn>
          <h2 className="font-serif-display italic gold-text text-2xl md:text-3xl mb-4">
            Samen spelen. Samen helpen.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
            De opbrengst van Maaspoort Bingo gaat volledig naar lokale initiatieven.
            Samen maken we Den Bosch een stukje mooier.
          </p>
        </FadeIn>
      </section>

      {/* ─── SPONSOREN ─── */}
      <section id="sponsoren" className="max-w-5xl mx-auto px-6 py-20">
        <FadeIn>
          <h2 className="divider-gold font-serif-display italic gold-text text-lg md:text-xl text-center mb-10">
            Onze Sponsoren
          </h2>
        </FadeIn>

        {/* Gold */}
        {sponsors.filter((s) => s.tier === 'gold').length > 0 && (
          <div className="mb-8">
            <p className="text-center text-xs uppercase tracking-wider text-[#C8982E] font-semibold mb-4">Goud</p>
            <StaggerContainer className="flex flex-wrap justify-center gap-4">
              {sponsors.filter((s) => s.tier === 'gold').map((s) => (
                <StaggerItem key={s.id}>
                  <SponsorCard sponsor={s} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* Silver */}
        {sponsors.filter((s) => s.tier === 'silver').length > 0 && (
          <div className="mb-8">
            <p className="text-center text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">Zilver</p>
            <StaggerContainer className="flex flex-wrap justify-center gap-4">
              {sponsors.filter((s) => s.tier === 'silver').map((s) => (
                <StaggerItem key={s.id}>
                  <SponsorCard sponsor={s} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* Bronze */}
        {sponsors.filter((s) => s.tier === 'bronze').length > 0 && (
          <div>
            <p className="text-center text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4">Brons</p>
            <StaggerContainer className="flex flex-wrap justify-center gap-3">
              {sponsors.filter((s) => s.tier === 'bronze').map((s) => (
                <StaggerItem key={s.id}>
                  <SponsorCard sponsor={s} small />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}
      </section>

      {/* ─── WORD SPONSOR ─── */}
      <section id="meedoen" className="max-w-5xl mx-auto px-6 py-20">
        <div className="max-w-xl mx-auto">
          <FadeIn>
            <h2 className="divider-gold font-serif-display italic gold-text text-lg md:text-xl text-center mb-4">
              Word Sponsor
            </h2>
            <p className="text-center text-slate-400 text-sm mb-10">
              Steun de buurt én vergroot uw naamsbekendheid.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-3 gap-4 mb-10">
            {[
              { tier: 'Brons', price: '€25', features: ['Naam op website', 'Vermelding in zaal'] },
              { tier: 'Zilver', price: '€50', features: ['Logo op website', 'Vermelding in zaal', 'Slideshow'] },
              { tier: 'Goud', price: '€100', features: ['Groot logo', 'Banner in zaal', 'Slideshow', 'Social media'] },
            ].map((t) => (
              <StaggerItem key={t.tier}>
                <GlowCard className="h-full">
                  <div className="p-4 text-center">
                    <div className="font-semibold text-sm">{t.tier}</div>
                    <div className="text-2xl font-bold gold-text my-2">{t.price}</div>
                    <div className="text-xs text-slate-500">per seizoen</div>
                    <ul className="text-xs text-slate-400 mt-3 space-y-1 text-left">
                      {t.features.map((f) => (
                        <li key={f}>✓ {f}</li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn>
            <form
              action="https://formspree.io/f/placeholder"
              method="POST"
              className="bg-[#161F2F] border border-white/10 rounded-2xl p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Bedrijfsnaam *</label>
                <input type="text" name="bedrijf" required
                  className="w-full bg-[#0E1623] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#C8982E] transition-shadow placeholder:text-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Contactpersoon *</label>
                <input type="text" name="naam" required
                  className="w-full bg-[#0E1623] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#C8982E] transition-shadow placeholder:text-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">E-mail *</label>
                <input type="email" name="email" required
                  className="w-full bg-[#0E1623] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#C8982E] transition-shadow placeholder:text-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Telefoon</label>
                <input type="tel" name="telefoon"
                  className="w-full bg-[#0E1623] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#C8982E] transition-shadow placeholder:text-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Gewenst pakket</label>
                <select name="pakket"
                  className="w-full bg-[#0E1623] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#C8982E] transition-shadow">
                  <option value="brons">Brons — €25/seizoen</option>
                  <option value="zilver">Zilver — €50/seizoen</option>
                  <option value="goud">Goud — €100/seizoen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Bericht (optioneel)</label>
                <textarea name="bericht" rows={3}
                  className="w-full bg-[#0E1623] border border-white/10 rounded-lg px-4 py-2.5 text-[#EDEDED] focus:outline-none focus:ring-2 focus:ring-[#C8982E] transition-shadow placeholder:text-slate-600" />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#C8982E] text-[#0E1623] font-semibold py-3 rounded-lg hover:bg-[#B8882A] transition-colors"
              >
                Aanmelden als Sponsor
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ─── SLIDESHOW CTA ─── */}
      <FadeIn className="max-w-5xl mx-auto px-6 py-16 text-center">
        <Link href="/slideshow">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block border border-[#C8982E] text-[#C8982E] font-serif-display px-8 py-3 rounded-full hover:bg-[#C8982E] hover:text-white transition-colors"
          >
            📺 Start Slideshow
          </motion.span>
        </Link>
      </FadeIn>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-4 mb-4">
            <SocialIcon href="https://instagram.com" icon="instagram" />
            <SocialIcon href="https://facebook.com" icon="facebook" />
          </div>
          <p className="text-sm text-slate-500">© 2026 Maaspoort Bingo · Alle rechten voorbehouden</p>
          <a href="#" className="text-xs text-slate-500 hover:text-[#C8982E] transition-colors">Cookiebeleid</a>
        </div>
      </footer>
    </div>
  );
}

function SponsorCard({ sponsor, small }: { sponsor: (typeof sponsors)[0]; small?: boolean }) {
  const size = small ? 'w-44 h-44' : 'w-56 h-56';
  const content = (
    <GlowCard className={`text-center ${size}`}>
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div className={`flex items-center justify-center mb-3 ${small ? 'text-3xl' : 'text-4xl'}`}>
          {sponsor.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={sponsor.logo} alt={sponsor.name} className="max-h-12 max-w-full object-contain" />
          ) : (
            <span>{sponsor.icon || sponsor.name.charAt(0)}</span>
          )}
        </div>
        <div className={`font-semibold ${small ? 'text-xs' : 'text-sm'}`}>{sponsor.name}</div>
        {!small && sponsor.description && (
          <p className="text-xs text-slate-400 mt-1">{sponsor.description}</p>
        )}
      </div>
    </GlowCard>
  );

  if (sponsor.website) {
    return <a href={sponsor.website} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  return content;
}

function SocialIcon({ href, icon }: { href: string; icon: 'instagram' | 'facebook' }) {
  const paths = {
    instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C8982E] transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={paths[icon]} /></svg>
    </motion.a>
  );
}
