import { motion } from 'motion/react';
import { SKILLS } from '../constants.js';

export default function Skills() {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-24 bg-text/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            TECHNICAL <span className="text-gradient animate-shimmer">SKILLS</span>
          </motion.h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            A comprehensive set of tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 rounded-3xl glass hover:bg-text/[0.05] transition-colors group"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-text">
                <span className="w-2 h-2 rounded-full bg-brand-blue" />
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS.filter(s => s.category === category).map((skill) => (
                  <motion.span
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      backgroundColor: "var(--color-brand-primary)",
                      color: "white",
                      borderColor: "var(--color-brand-primary)",
                      boxShadow: "0 10px 20px -10px rgba(255, 51, 102, 0.5)"
                    }}
                    className="px-4 py-2 rounded-xl bg-bg border border-border text-sm font-medium transition-all cursor-default text-text"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
