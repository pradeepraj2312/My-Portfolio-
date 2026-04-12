import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../constants.js';
import Mail from 'lucide-react/dist/esm/icons/mail.js';
import Phone from 'lucide-react/dist/esm/icons/phone.js';
import Github from 'lucide-react/dist/esm/icons/github.js';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin.js';
import Send from 'lucide-react/dist/esm/icons/send.js';
import Instagram from 'lucide-react/dist/esm/icons/instagram.js';

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              LET'S <span className="text-gradient animate-shimmer">CONNECT</span>
            </motion.h2>
            <p className="text-text-muted text-lg mb-12 leading-relaxed">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="space-y-6">
              <motion.a 
                whileHover={{ scale: 1.02, x: 10 }}
                href={`mailto:${PERSONAL_INFO.email}`} 
                className="flex items-center gap-6 p-6 rounded-3xl glass hover:bg-text/[0.05] transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Email Me</p>
                  <p className="text-lg font-medium text-text">{PERSONAL_INFO.email}</p>
                </div>
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.02, x: 10 }}
                href={`tel:${PERSONAL_INFO.phone}`} 
                className="flex items-center gap-6 p-6 rounded-3xl glass hover:bg-text/[0.05] transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Call Me</p>
                  <p className="text-lg font-medium text-text">{PERSONAL_INFO.phone}</p>
                </div>
              </motion.a>
            </div>

            <div className="flex gap-4 mt-12">
              <motion.a 
                href={PERSONAL_INFO.github} 
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5, scale: 1.1, rotate: 5, backgroundColor: "var(--color-text)", color: "var(--color-bg)" }}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-text-muted transition-all duration-300"
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5, scale: 1.1, rotate: -5, backgroundColor: "#0077b5", color: "white" }}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-text-muted transition-all duration-300"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                href={PERSONAL_INFO.instagram} 
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5, scale: 1.1, rotate: 5, backgroundColor: "#e4405f", color: "white" }}
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-text-muted transition-all duration-300"
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-[40px]"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-text/[0.05] border border-border focus:border-brand-blue outline-none transition-colors text-text" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">Email</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl bg-text/[0.05] border border-border focus:border-brand-blue outline-none transition-colors text-text" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-1">Message</label>
                <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-text/[0.05] border border-border focus:border-brand-blue outline-none transition-colors resize-none text-text" placeholder="How can I help you?" />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-brand-blue/20"
              >
                Send Message
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <footer className="mt-24 py-12 border-t border-border text-center">
        <p className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
