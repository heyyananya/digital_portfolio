import React, { useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';
import { openEmail } from '../utils/contact';

export const Hero = () => {
  const [flipped, setFlipped] = useState(false);

  return (
  <section id="top" className="relative overflow-hidden px-5 py-12 min-h-screen flex items-center justify-center sm:px-6 sm:py-16 md:py-20">
    <style>{`
      @keyframes floatParticle {
        0% {
          transform: translateY(0) scale(1);
          opacity: 0;
        }
        15% {
          opacity: 0.7;
        }
        85% {
          opacity: 0.7;
        }
        100% {
          transform: translateY(-120px) translateX(15px) scale(0.6);
          opacity: 0;
        }
      }
      .animate-particle-float {
        animation: floatParticle linear infinite;
      }

    `}</style>
    


    {/* Dynamic Floating Particles (HUD Circuit Sparks) */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
      {Array.from({ length: 22 }).map((_, i) => {
        const size = (i % 3) * 1.5 + 3.5; // 3.5px, 5px, 6.5px
        const left = ((i * 13) % 80) + 10; // 10% to 90%
        const top = ((i * 17) % 65) + 20; // 20% to 85%
        const duration = ((i * 4) % 5) + 7; // 7s to 12s
        const delay = ((i * 9) % 6) * -1.2; // negative offset to prevent simultaneous launch
        const color = i % 2 === 0 
          ? 'bg-cyan-400/40 text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' 
          : 'bg-purple-400/40 text-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.5)]';
        
        return (
          <div
            key={i}
            className={`absolute rounded-full animate-particle-float ${color}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>

    <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center z-10">
      {/* 3D Card Flip Profile Picture Container with Orbiting HUD Rings */}
      <div className="group/orbit relative flex items-center justify-center w-[310px] h-[310px] sm:w-[370px] sm:h-[370px] mb-2">
        
        {/* HUD Orbit Background Effects */}
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center">
          {/* Outer spinning dashed ring (accelerates on hover) */}
          <div className="absolute w-[310px] h-[310px] sm:w-[360px] sm:h-[360px] border border-dashed border-zinc-200/30 dark:border-zinc-800/40 rounded-full animate-[spin_50s_linear_infinite] group-hover/orbit:animate-[spin_18s_linear_infinite] transition-all duration-700" />
          {/* Inner spinning dotted ring (accelerates on hover) */}
          <div className="absolute w-[280px] h-[280px] sm:w-[325px] sm:h-[325px] border border-dotted border-zinc-300/40 dark:border-zinc-700/60 rounded-full animate-[spin_25s_linear_infinite_reverse] group-hover/orbit:animate-[spin_9s_linear_infinite_reverse] transition-all duration-700" />
          {/* Pulsing neon radial glow (intensifies on hover) */}
          <div className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full bg-gradient-to-tr from-purple-500/10 to-cyan-500/10 dark:from-purple-500/5 dark:to-cyan-500/5 blur-xl animate-pulse group-hover/orbit:from-purple-500/20 group-hover/orbit:to-cyan-500/20 group-hover/orbit:scale-105 transition-all duration-500" />
          
        </div>

        {/* Animated Neon Circle Ring directly around the card */}
        <div 
          className="absolute w-[246px] h-[246px] rounded-full pointer-events-none select-none z-0 flex items-center justify-center transition-all duration-700 group-hover/orbit:scale-[1.03]"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          <svg className="absolute inset-0 w-full h-full animate-[spin_6s_linear_infinite]" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="neonRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <circle 
              cx="50" 
              cy="50" 
              r="47.5" 
              stroke="url(#neonRingGrad)" 
              strokeWidth="2" 
              fill="none"
            />
          </svg>
          <svg className="absolute inset-0 w-full h-full animate-[spin_6s_linear_infinite] blur-[6px] opacity-70" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="47.5" 
              stroke="url(#neonRingGrad)" 
              strokeWidth="3.2" 
              fill="none"
            />
          </svg>
        </div>

        {/* The 3D Flip Card */}
        <div 
          className="relative cursor-pointer select-none z-10"
          style={{ perspective: '1000px', width: '220px', height: '220px' }}
          onClick={() => setFlipped(!flipped)}
          aria-label="Click to flip profile card"
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setFlipped(!flipped);
            }
          }}
        >
          <div 
            className="w-full h-full duration-700 transition-transform"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              position: 'relative'
            }}
          >
            {/* Front Side: User Photo */}
            <div 
              className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-md bg-white dark:bg-zinc-950"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <img
                src={profile.photo}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Back Face (Flipped Monogram Signature) */}
            <div 
              className="absolute inset-0 rounded-full bg-zinc-950 flex items-center justify-center border-2 border-zinc-800"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <style>{`
                @keyframes drawSignature {
                  from {
                    stroke-dashoffset: 500;
                  }
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                .animate-draw-signature {
                  stroke-dasharray: 500;
                  stroke-dashoffset: 500;
                  animation: drawSignature 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                  animation-delay: 0.3s;
                }
              `}</style>

              {/* Neon particle stars inside monogram */}
              <div className="absolute inset-0 overflow-hidden rounded-full opacity-35">
                <div className="absolute w-[4px] h-[4px] bg-purple-400 rounded-full left-[25%] top-[30%] animate-ping duration-[4000ms]" />
                <div className="absolute w-[3px] h-[3px] bg-cyan-400 rounded-full left-[75%] top-[45%] animate-ping duration-[3000ms]" />
                <div className="absolute w-[3px] h-[3px] bg-indigo-400 rounded-full left-[40%] top-[70%] animate-ping duration-[5000ms]" />
              </div>

              <svg viewBox="0 0 100 100" className="w-[130px] h-[130px] select-none">
                <defs>
                  <linearGradient id="backMonGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#a5f3fc" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 27 75 L 37 75 M 32 75 L 52 25 L 52 75 M 47 75 L 57 75 M 42 50 L 52 50 M 52 25 C 70 25 70 50 52 50" 
                  stroke="url(#backMonGrad)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={flipped ? 'animate-draw-signature' : ''}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
        {profile.role} · {profile.location}
      </p>

      <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl sm:leading-[1.1] md:text-6xl">
        Hi, I'm {profile.name}. {profile.headline}
      </h1>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
        {profile.intro}
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a href="#projects" className="btn-solid">
          View my work
          <ArrowDown size={15} />
        </a>
        <button type="button" onClick={() => openEmail('Hello Ananya')} className="btn-ghost">
          <Mail size={15} />
          Get in touch
        </button>
      </div>

      <div className="mt-8 flex items-center gap-4 text-zinc-400">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
          className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <Github size={19} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn"
          className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <Linkedin size={19} />
        </a>
        <button
          type="button"
          onClick={() => openEmail('Hello Ananya')}
          aria-label="Send me an email"
          className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <Mail size={19} />
        </button>
      </div>
    </div>
  </section>
  );
};
