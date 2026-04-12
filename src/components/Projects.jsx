import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants.js';
import { useState } from 'react';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link.js';
import Github from 'lucide-react/dist/esm/icons/github.js';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.js';
import X from 'lucide-react/dist/esm/icons/x.js';
import Maximize2 from 'lucide-react/dist/esm/icons/maximize-2.js';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showLive, setShowLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              FEATURED <span className="text-gradient animate-shimmer">PROJECTS</span>
            </motion.h2>
            <p className="text-text-muted max-w-xl">
              Selection of my most recent work. Click a card to see details and an interactive preview.
            </p>
          </div>
          <motion.a 
            href="https://github.com/pradeepraj2312" 
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-brand-primary font-bold group"
          >
            View All Projects
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              layoutId={`project-${project.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedProject(project);
                setShowLive(false);
                setIsLoading(true);
              }}
              className="group relative p-8 rounded-3xl glass hover:bg-text/[0.05] transition-all duration-500 flex flex-col h-full cursor-pointer overflow-hidden"
            >
              {/* Hover Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
              
              <div className="mb-6 flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform duration-500">
                  <Maximize2 size={24} />
                </div>
                <div className="flex gap-3">
                  {project.github && (
                    <div className="text-text-muted hover:text-text transition-colors">
                      <Github size={20} />
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6 group-hover:text-brand-primary transition-colors text-text relative z-10">
                {project.title}
              </h3>
              
              <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-bg border border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-bg/90 backdrop-blur-xl z-[100] cursor-pointer"
            />
            <motion.div
              layoutId={`project-${selectedProject.title}`}
              className="fixed inset-4 md:inset-x-auto md:top-10 md:bottom-10 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-5xl glass z-[101] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-bg/50 backdrop-blur-md sticky top-0 z-30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Maximize2 size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-text truncate max-w-[200px] md:max-w-md">
                    {selectedProject.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full hover:bg-border flex items-center justify-center text-text transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-10">
                <div className="grid lg:grid-cols-5 gap-10">
                  <div className="lg:col-span-3 space-y-8">
                    {/* Browser Mockup */}
                    <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-bg group">
                      <div className="h-8 bg-border/50 flex items-center px-4 gap-1.5 border-b border-border">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                        <div className="ml-4 px-3 py-0.5 rounded bg-bg/50 text-[10px] text-text-muted truncate flex-grow max-w-xs font-mono">
                          {selectedProject.link || 'local://preview'}
                        </div>
                      </div>
                      
                      <div className="relative aspect-video bg-bg overflow-hidden">
                        {showLive && selectedProject.link ? (
                          <>
                            {isLoading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-bg z-10">
                                <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
                              </div>
                            )}
                            <iframe 
                              src={selectedProject.link}
                              className="w-full h-full border-none"
                              onLoad={() => setIsLoading(false)}
                              title={selectedProject.title}
                            />
                          </>
                        ) : (
                          <img 
                            src={selectedProject.previewImage} 
                            alt={selectedProject.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        
                        {!showLive && selectedProject.link && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                            <button 
                              onClick={() => setShowLive(true)}
                              className="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                            >
                              Launch Live Preview
                              <ExternalLink size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="hidden lg:block">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Project Description</h4>
                      <p className="text-text-muted leading-relaxed text-lg">
                        {selectedProject.description}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 rounded-xl bg-text/[0.03] border border-border text-xs font-bold text-text">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:hidden">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Project Description</h4>
                      <p className="text-text-muted leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-border space-y-4">
                      {selectedProject.link && (
                        <a 
                          href={selectedProject.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full py-4 bg-text text-bg font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-white transition-all group"
                        >
                          Visit Live Website
                          <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      )}
                      {selectedProject.github && (
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full py-4 glass text-text font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-border transition-all"
                        >
                          View Source Code
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
