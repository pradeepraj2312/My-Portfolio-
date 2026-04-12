import { motion } from 'motion/react';

export default function AnimatedName({ name, className = '' }) {
  const letters = Array.from(name);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className={`flex flex-nowrap justify-center items-center perspective-1000 whitespace-nowrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => {
        const isInitial = index === letters.length - 1 && letter === 'R';
        return (
          <motion.span
            key={index}
            variants={child}
            className={`inline-block transition-colors duration-300 cursor-default ${letter === ' ' ? '' : 'text-gradient'} ${isInitial ? 'text-brand-accent drop-shadow-[0_0_15px_var(--brand-accent)]' : ''}`}
            whileHover={{ 
              scale: 1.2, 
              y: -10,
              filter: `brightness(1.2) drop-shadow(0 0 8px ${isInitial ? 'var(--brand-accent)' : 'var(--brand-primary)'})`,
              rotateZ: letter === ' ' ? 0 : [0, -10, 10, 0],
              transition: { duration: 0.2 }
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
