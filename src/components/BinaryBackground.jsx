import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider.jsx';

export default function BinaryBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(1);

    const binary = "01";

    const draw = () => {
      // Subtle trail effect
      ctx.fillStyle = theme === 'dark' ? 'rgba(2, 2, 4, 0.1)' : 'rgba(253, 252, 253, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Get colors from CSS variables
      const style = getComputedStyle(document.documentElement);
      const primary = style.getPropertyValue('--brand-primary').trim();
      const secondary = style.getPropertyValue('--brand-secondary').trim();

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        
        const color = i % 2 === 0 ? primary : secondary;
        
        if (theme === 'dark') {
          ctx.fillStyle = color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = color;
        } else {
          // In light mode, make it very subtle
          ctx.fillStyle = color + '22'; // Add transparency
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Re-calculate columns on resize
      const newColumns = Math.floor(width / fontSize);
      if (newColumns > drops.length) {
        const extra = new Array(newColumns - drops.length).fill(1);
        drops.push(...extra);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-30"
    />
  );
}
