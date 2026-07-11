import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users } from 'lucide-react';

const CONFIG = {
  executive: {
    title: 'Executive Body',
    subtitle: 'Official Stakeholders',
    desc: 'Senior leadership and official stakeholders guiding One Nation Pakistan\'s vision, governance, and institutional direction.',
  },
  organizing: {
    title: 'Organizing Body',
    subtitle: 'Organizational Leadership',
    desc: 'Key organizers and operational leaders coordinating programs, volunteers, and on-ground initiatives across the organization.',
  },
};

export default function LeadershipModal({ isOpen, onClose, type = 'executive' }) {
  const config = CONFIG[type] || CONFIG.executive;
  const members = [];

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-dark-card border border-primary/10 dark:border-dark-border shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-primary/10 hover:bg-accent/20 text-primary dark:text-white transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-10">
              <span className="text-xs font-bold tracking-widest text-accent uppercase">{config.subtitle}</span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary dark:text-white mt-1 pr-10">{config.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">{config.desc}</p>

              <div className="mt-8">
                {members.length === 0 ? (
                  <div className="text-center p-10 rounded-2xl bg-light-bg dark:bg-dark-bg border border-dashed border-primary/15 dark:border-dark-border">
                    <Users size={36} className="mx-auto text-accent mb-3" />
                    <h3 className="font-display font-extrabold text-primary dark:text-white mb-1">Member Profiles Coming Soon</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Photos and details will be added here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((m, i) => (
                      <div key={i} className="rounded-2xl p-5 bg-light-bg dark:bg-dark-bg border border-primary/5 dark:border-dark-border text-center">
                        <img src={m.photo} alt={m.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
                        <h4 className="font-display font-extrabold text-primary dark:text-white text-sm">{m.name}</h4>
                        <p className="text-[10px] text-accent font-bold uppercase mt-1">{m.role}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
