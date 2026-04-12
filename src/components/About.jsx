import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../constants.js';
import User from 'lucide-react/dist/esm/icons/user.js';
import MapPin from 'lucide-react/dist/esm/icons/map-pin.js';
import Mail from 'lucide-react/dist/esm/icons/mail.js';
import Phone from 'lucide-react/dist/esm/icons/phone.js';

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              ABOUT <span className="text-gradient animate-shimmer">ME</span>
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              {PERSONAL_INFO.about}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl glass">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Location</p>
                  <p className="text-sm font-medium text-text">{PERSONAL_INFO.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl glass">
                <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Email</p>
                  <p className="text-sm font-medium text-text">{PERSONAL_INFO.email}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="aspect-[3/4] rounded-3xl overflow-hidden glass p-2"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                <img 
                  src={PERSONAL_INFO.profileImage} 
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-primary/30 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-brand-secondary/30 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
