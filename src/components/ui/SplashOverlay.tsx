'use client';

import { useEffect, useMemo, useState } from 'react';
import { initParticlesEngine, Particles } from '@tsparticles/react';
import { loadFireworksPreset } from '@tsparticles/preset-fireworks'; // v3 preset loader <mcreference link="https://www.npmjs.com/package/@tsparticles/preset-fireworks" index="2">2</mcreference>

type Phase =
  | 'introParticles'
  | 'spaceStars'
  | 'flowers'
  | 'fireworks'
  | 'arabicWish'
  | 'exit';

const PHASE_ORDER: Phase[] = [
  'introParticles',
  'spaceStars',
  'flowers',
  'fireworks',
  'arabicWish',
  'exit',
];

export default function SplashOverlay() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const phase = PHASE_ORDER[currentPhaseIndex];
  const [engineReady, setEngineReady] = useState(false);

  // Show only on first visit (persist across visits)
  useEffect(() => {
    const seen =
      typeof window !== 'undefined' && localStorage.getItem('ayaSplashSeen');
    if (seen) {
      // setVisible(false);
      document.documentElement.classList.remove('no-scroll');
    } else {
      document.documentElement.classList.add('no-scroll');
    }
  }, []);

  // Initialize fireworks preset
  useEffect(() => {
    if (!visible) return;
    initParticlesEngine(async engine => {
      await loadFireworksPreset(engine);
    }).then(() => setEngineReady(true));
  }, [visible]);

  // Orchestrate timeline only when visible
  useEffect(() => {
    if (!visible) return;
    const timers: number[] = [];

    const schedule = (durations: { phase: Phase; ms: number }[]) => {
      let acc = 0;
      durations.forEach(d => {
        acc += d.ms;
        timers.push(
          window.setTimeout(() => {
            setCurrentPhaseIndex(PHASE_ORDER.indexOf(d.phase));
          }, acc)
        );
      });
    };

    schedule([
      { phase: 'spaceStars', ms: 1500 },
      { phase: 'flowers', ms: 3500 },
      { phase: 'fireworks', ms: 3500 },
      { phase: 'arabicWish', ms: 3500 },
      { phase: 'exit', ms: 1000 },
    ]);

    return () => timers.forEach(t => clearTimeout(t));
  }, [visible]);

  // Handle exit: fade out and reveal page
  useEffect(() => {
    if (visible && phase === 'exit') {
      setExiting(true);
      localStorage.setItem('ayaSplashSeen', 'true');
      const t = setTimeout(() => {
        setVisible(false);
        setExiting(false);
        document.documentElement.classList.remove('no-scroll');
      }, 800); // match CSS fade duration
      return () => clearTimeout(t);
    }
  }, [phase, visible]);

  const showIntroText = phase === 'introParticles' || phase === 'spaceStars';
  const showArabicWish = phase === 'arabicWish';

  const fireworksOptions = useMemo(
    () => ({
      preset: 'fireworks',
      fullScreen: {
        enable: false,
      },
      background: {
        color: {
          value: 'transparent',
        },
      },
    }),
    []
  );

  if (!visible) return null;

  return (
    <div className={`splash-overlay ${exiting ? 'splash-exit' : ''}`}>
      <div className="splash-container">
        {/* Layer: gradient bg for elegance */}
        <div className="splash-gradient" />

        {/* Phase: Space stars CSS layer */}
        {(phase === 'spaceStars' ||
          phase === 'flowers' ||
          phase === 'fireworks' ||
          phase === 'arabicWish') && (
          <div className="splash-stars" aria-hidden="true" />
        )}

        {/* Phase: Intro particles (CSS floating dots) */}
        {showIntroText && (
          <div className="splash-particles" aria-hidden="true">
            {Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className="splash-dot"
                style={{ ['--i' as any]: i + 1 }}
              />
            ))}
          </div>
        )}

        {/* Phase: Falling flowers (CSS petals) */}
        {(phase === 'flowers' ||
          phase === 'fireworks' ||
          phase === 'arabicWish') && (
          <div className="splash-petals" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="petal"
                style={{
                  ['--d' as any]: (i % 6) + 1,
                  left: `${(i * 100) / 24}%`,
                }}
              />
            ))}
          </div>
        )}

        {/* Phase: Fireworks using tsParticles */}
        {(phase === 'fireworks' || phase === 'arabicWish') && engineReady && (
          <Particles id="fireworks" options={fireworksOptions} />
        )}

        {/* Text overlays */}
        <div className="splash-center">
          {showIntroText && (
            <h1 className="splash-title" aria-live="polite">
              Happy Birthday Aya
            </h1>
          )}

          {phase === 'flowers' && (
            <h2 className="splash-subtitle">
              Wishing you joy, light, and love
            </h2>
          )}

          {showArabicWish && (
            <h1 className="splash-title rtl" aria-live="polite">
              كل عام وأنتِ بخير يا آية
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
