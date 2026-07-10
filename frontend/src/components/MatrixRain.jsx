import React, { useEffect, useRef } from 'react';

export const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas dimensions to parent element bounds
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // High-tech character set (binary + symbols + hex)
    const charset = "010101010101010101010101ABCDEF+-/*<>[]{}%";
    const chars = charset.split("");
    
    const fontSize = 12;
    const columns = Math.ceil(canvas.width / 32); // space between columns
    
    // Initial Y coordinates (randomized negative values to stagger start)
    const drops = Array(columns).fill(1).map(() => Math.random() * -100);
    // Staggered speed factors for each column to make motion organic (calm speeds ranging from 0.12 to 0.45)
    const speeds = Array(columns).fill(1).map(() => Math.random() * 0.33 + 0.12);

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      // Clear canvas with trails (fade out older frames)
      ctx.fillStyle = isDark ? 'rgba(10, 10, 10, 0.07)' : 'rgba(255, 255, 255, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const colX = i * 32;
        
        // Faint in center of the page, visible on sides (like user reference)
        let opacity = 0.015;
        if (colX < canvas.width * 0.30 || colX > canvas.width * 0.70) {
          opacity = 0.08; // Very subtle on the margins
        }
        
        // Theme color matching
        ctx.fillStyle = isDark 
          ? `rgba(34, 211, 238, ${opacity})` // Cyan-400 in dark mode
          : `rgba(9, 9, 11, ${opacity * 0.95})`; // Zinc-950 in light mode

        // Grab random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw character
        ctx.fillText(char, colX, drops[i] * fontSize);

        // Reset drops when they reach the bottom randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
          speeds[i] = Math.random() * 0.33 + 0.12; // Assign a new random speed for the next stream
        }

        // Increment drop position using its specific randomized speed factor
        drops[i] += speeds[i];
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none select-none opacity-30 dark:opacity-45 z-0" 
    />
  );
};
