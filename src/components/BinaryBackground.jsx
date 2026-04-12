import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider.jsx';

export default function BinaryBackground() {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = new Array(columns).fill(1);

    const binary = '01';
    let rafId;
    let lastFrame = 0;
    const frameMs = 42;

    const draw = (timestamp) => {
      if (timestamp - lastFrame < frameMs) {
        rafId = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;

      // Keep a stronger trail in light mode so the animation remains visible.
      ctx.fillStyle = resolvedTheme === 'dark' ? 'rgba(2, 2, 4, 0.1)' : 'rgba(253, 252, 253, 0.3)';
      ctx.fillRect(0, 0, width, height);

      // Matrix-like green palette for both themes.
      const primary = resolvedTheme === 'dark' ? '#39FF14' : '#16A34A';
      const secondary = resolvedTheme === 'dark' ? '#00E676' : '#22C55E';

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        
        const color = i % 2 === 0 ? primary : secondary;
        
        if (resolvedTheme === 'dark') {
          ctx.fillStyle = color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = color;
        } else {
          // In light mode, use stronger alpha and a faint glow for readability.
          ctx.fillStyle = color + 'CC';
          ctx.shadowBlur = 4;
          ctx.shadowColor = color;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      rafId = window.requestAnimationFrame(draw);
    };

    rafId = window.requestAnimationFrame(draw);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const newDpr = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = width * newDpr;
      canvas.height = height * newDpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(newDpr, 0, 0, newDpr, 0, 0);

      // Re-calculate columns on resize
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(1);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${resolvedTheme === 'dark' ? 'opacity-35' : 'opacity-[0.85]'} `}
    />
  );
}
