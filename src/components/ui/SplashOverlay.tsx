'use client';

import { useEffect, useMemo, useState } from 'react';
import { initParticlesEngine, Particles } from '@tsparticles/react';
import { loadFireworksPreset } from '@tsparticles/preset-fireworks';

import './splash.css';

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
      // setVisible(false); // Uncomment to re-enable one-time splash
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
      { phase: 'flowers', ms: 5000 },
      { phase: 'fireworks', ms: 5000 },
      { phase: 'arabicWish', ms: 5000 },
      { phase: 'exit', ms: 5000 },
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

  const fireworksOptions: Parameters<typeof Particles>[0]['options'] = useMemo(
    () => ({
      preset: 'fireworks',
      fullScreen: {
        enable: true,
        zIndex: 1, // Ensure it's behind text
      },
      background: {
        color: {
          value: '#0d0124', // Match the deep space background color
        },
      },
      // ✨ MODIFICATIONS FOR BRIGHTER FIREWORKS ✨
      particles: {
        number: {
          value: 0, // Emitters control particle creation
        },
        color: {
          value: ['#ffc0cb', '#ff69b4', '#ff1493', '#c71585'], // Pink/Magenta theme
        },
        opacity: {
          value: { min: 0.5, max: 1 },
          animation: {
            enable: true,
            speed: 2,
            startValue: 'max',
            destroy: 'min',
          },
        },
        // Add twinkle to make particles shimmer and appear brighter
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 1,
          },
        },
      },
      sounds: {
        enable: true, // Enable sound for a more immersive experience
        volume: {
          min: 10,
          max: 30,
        },
      },
      emitters: {
        life: {
          count: 0, // infinite loop
          duration: 0.1,
          delay: 0.4,
        },
        rate: {
          delay: 0.15,
          quantity: 5,
        },
      },
    }),
    []
  );

  if (!visible) return null;

  return (
    <div className={`splash-overlay ${exiting ? 'splash-exit' : ''}`}>
      <div className="splash-container">
        <div className="splash-gradient" />

        {(phase === 'spaceStars' ||
          phase === 'flowers' ||
          phase === 'fireworks' ||
          phase === 'arabicWish') && (
          <div className="splash-stars-container">
            <div className="splash-stars" />
            <div className="splash-stars-2" />
            <div className="splash-stars-3" />
          </div>
        )}

        {showIntroText && (
          <div className="splash-particles" aria-hidden="true">
            {Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className="splash-dot"
                style={{ '--i': i + 1 } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {(phase === 'flowers' ||
          phase === 'fireworks' ||
          phase === 'arabicWish') && (
          <div className="splash-petals" aria-hidden="true">
            {Array.from({ length: 100 }).map((_, i) => (
              <span
                key={i}
                className="petal"
                style={{
                  '--d': 1 + Math.random() * 5,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  transform: `scale(${0.5 + Math.random() * 0.5}) rotate(${Math.random() * 360}deg)`,
                  backgroundColor: `hsl(${Math.random() * 30 + 330}, 80%, 70%)`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {(phase === 'fireworks' || phase === 'arabicWish') && engineReady && (
          <Particles id="fireworks" options={fireworksOptions} />
        )}

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
