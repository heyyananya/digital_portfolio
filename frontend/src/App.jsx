import React from 'react';
import { Dock } from './components/Dock';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { useTheme } from './hooks/useTheme';
import { MatrixRain } from './components/MatrixRain';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen">
      {/* Global Holographic OS Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* Holographic OS Aurora Drift Blobs (Blue and Pink mesh) */}
        <div className="absolute inset-0 overflow-hidden select-none" aria-hidden="true">
          {/* Cyan Orb (Left side) */}
          <div 
            className="absolute top-[20%] left-[15%] w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full bg-cyan-400/20 dark:bg-cyan-500/10 blur-[80px] sm:blur-[120px] animate-drift"
            style={{ animationDuration: '28s' }}
          />
          {/* Purple Orb (Right side) */}
          <div 
            className="absolute bottom-[20%] right-[15%] w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full bg-purple-400/20 dark:bg-purple-500/10 blur-[80px] sm:blur-[120px] animate-drift"
            style={{ animationDuration: '34s', animationDelay: '-5s' }}
          />
          {/* Indigo Center Accent */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[550px] sm:h-[550px] rounded-full bg-indigo-500/15 dark:bg-indigo-500/5 blur-[90px] sm:blur-[140px] animate-drift"
            style={{ animationDuration: '40s', animationDelay: '-12s' }}
          />
        </div>

        {/* Dot grid and Matrix rain placed on top of aurora colors */}
        <div className="dot-grid absolute inset-0 opacity-40" />
        <MatrixRain />
      </div>

      {/* Main Interactive Website Layer */}
      <div className="relative z-10">
        <Dock theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
