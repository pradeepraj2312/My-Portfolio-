import { motion } from 'motion/react';
import { EDUCATION } from '../constants.js';
import GraduationCap from 'lucide-react/dist/esm/icons/graduation-cap.js';
import Calendar from 'lucide-react/dist/esm/icons/calendar.js';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-text/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            MY <span className="text-gradient animate-shimmer">JOURNEY</span>
          </motion.h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Academic background and professional milestones.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {EDUCATION.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ 
                scale: 1.02, 
                x: index % 2 === 0 ? 5 : -5,
                backgroundColor: "var(--color-text)/[0.05]"
              }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl glass flex flex-col md:flex-row gap-8 items-start group cursor-default transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 group-hover:rotate-12 transition-transform">
                <GraduationCap size={32} />
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-2xl font-bold text-text group-hover:text-brand-accent transition-colors">
                    {edu.institution}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-medium text-text-muted bg-text/[0.05] px-3 py-1 rounded-full">
                    <Calendar size={14} />
                    {edu.period}
                  </div>
                </div>
                
                <p className="text-lg font-medium text-text-muted mb-2">
                  {edu.degree}
                </p>
                
                {edu.description && (
                  <p className="text-text-muted text-sm italic opacity-70">
                    {edu.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
