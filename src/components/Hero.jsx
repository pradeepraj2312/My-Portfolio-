import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.js';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles.js';
import { PERSONAL_INFO } from '../constants.js';
import AnimatedName from './AnimatedName.jsx';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Spotlight Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-30 dark:opacity-20"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--brand-primary), transparent 40%)`
        }}
      />

      {/* Background Accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-border text-brand-primary text-[10px] font-bold tracking-[0.2em] uppercase">
              Available for Opportunities
            </span>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles size={16} className="text-brand-secondary" />
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-text-muted text-sm font-bold tracking-[0.3em] uppercase opacity-50">Hello, I am</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <AnimatedName 
              name={PERSONAL_INFO.name} 
              className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-none"
            />
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-display font-medium text-gradient mb-8"
          >
            {PERSONAL_INFO.role}
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-text-muted text-lg md:text-xl mb-12 leading-relaxed font-medium"
          >
            Dedicated to building high-performance web applications 
            that solve real-world problems with <span className="text-text font-bold">creative solutions</span>.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-5 bg-text text-bg font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/10 hover:shadow-brand-primary/20 transition-all"
            >
              Explore Projects
              <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-5 glass text-text font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-border transition-all"
            >
              Let's Talk
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">Explore</span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-brand-primary to-transparent rounded-full" />
      </motion.div>
    </section>
  );
}
