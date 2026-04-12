import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { PERSONAL_INFO } from '../constants.js';
import { useTheme } from './ThemeProvider.jsx';
import Menu from 'lucide-react/dist/esm/icons/menu.js';
import X from 'lucide-react/dist/esm/icons/x.js';
import Github from 'lucide-react/dist/esm/icons/github.js';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin.js';
import Mail from 'lucide-react/dist/esm/icons/mail.js';
import Instagram from 'lucide-react/dist/esm/icons/instagram.js';
import Sun from 'lucide-react/dist/esm/icons/sun.js';
import Moon from 'lucide-react/dist/esm/icons/moon.js';
import Monitor from 'lucide-react/dist/esm/icons/monitor.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const ThemeIcon = () => {
    if (theme === 'light') return <Sun size={20} />;
    if (theme === 'dark') return <Moon size={20} />;
    return <Monitor size={20} />;
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b-0 m-4 rounded-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#"
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold font-display text-gradient flex overflow-hidden"
          >
            {Array.from("PRADEEPRAJ").map((l, i) => (
              <motion.span
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {l}
              </motion.span>
            ))}
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-muted hover:text-text transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
              {/* Theme Toggle */}
              <div className="relative group">
                <button 
                  className="p-2 rounded-full hover:bg-border transition-colors text-text-muted hover:text-text"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  <ThemeIcon />
                </button>
                <div className="absolute top-full right-0 mt-2 hidden group-hover:block glass rounded-xl p-2 min-w-[120px]">
                  <button onClick={() => setTheme('light')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-border flex items-center gap-2">
                    <Sun size={14} /> Light
                  </button>
                  <button onClick={() => setTheme('dark')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-border flex items-center gap-2">
                    <Moon size={14} /> Dark
                  </button>
                  <button onClick={() => setTheme('system')} className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-border flex items-center gap-2">
                    <Monitor size={14} /> System
                  </button>
                </div>
              </div>

              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text transition-colors">
                <Github size={20} />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              className="p-2 rounded-full hover:bg-border transition-colors text-text-muted"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <ThemeIcon />
            </button>
            <button 
              className="text-text"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border rounded-b-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-text-muted hover:text-text"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text">
                  <Github size={24} />
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text">
                  <Linkedin size={24} />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-text-muted hover:text-text">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
