import { motion, useScroll, useSpring } from 'motion/react';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import BinaryBackground from './components/BinaryBackground.jsx';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-bg min-h-screen selection:bg-brand-primary/30 selection:text-text">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Binary Background Effect */}
      <BinaryBackground />
      
      {/* Global Background Mesh */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none z-0 opacity-50" />
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 noise pointer-events-none z-[1]" />

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Custom Mouse Follower */}
      <div className="hidden lg:block">
        <MouseFollower />
      </div>
    </div>
  );
}

function MouseFollower() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target instanceof Element ? e.target : null;
      const isClickable = target?.closest('a, button, .cursor-pointer');
      setIsHovering(!!isClickable);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-brand-primary/50 rounded-full pointer-events-none z-[100] mix-blend-difference"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? "var(--brand-primary)" : "transparent",
        opacity: isHovering ? 0.3 : 1,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
    />
  );
}


