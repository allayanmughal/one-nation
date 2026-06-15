import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, CheckCircle, Clock, Info, X } from 'lucide-react';

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.status.toLowerCase() === filter;
  });

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-dark-bg/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
              Our Initiatives
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-gray-900 dark:text-white mt-2">
              Transforming Commmunities
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-4">
              Explore our ongoing and completed social welfare projects. Use the filters to browse specific impact categories.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-white dark:bg-dark-card p-1.5 rounded-full border border-gray-100 dark:border-dark-border shadow-sm self-start md:self-end">
            {['all', 'ongoing', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  filter === tab
                    ? 'bg-primary text-white dark:bg-accent dark:text-primary-dark shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group bg-white dark:bg-dark-card rounded-3xl overflow-hidden border border-gray-100 dark:border-dark-border hover:border-accent/20 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image & Status Badge */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Status Badge */}
                  <span
                    className={`absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase shadow-md ${
                      project.status.toLowerCase() === 'ongoing'
                        ? 'bg-amber-600 dark:bg-amber-500'
                        : 'bg-primary dark:bg-primary-light'
                    }`}
                  >
                    {project.status.toLowerCase() === 'ongoing' ? (
                      <Clock size={12} className="animate-spin" style={{ animationDuration: '3s' }} />
                    ) : (
                      <CheckCircle size={12} />
                    )}
                    <span>{project.status}</span>
                  </span>
                </div>

                {/* Card Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-primary dark:text-accent" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-primary dark:text-accent" />
                      {project.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-extrabold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors duration-200 mb-3 line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary dark:text-accent group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1.5">
                      <Info size={14} />
                      Learn More
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-dark-card rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 dark:border-dark-border text-left relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors duration-200"
              >
                <X size={20} />
              </button>

              {/* Large Image */}
              <div className="h-64 sm:h-80 overflow-hidden relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Title inside image for styling */}
                <h3 className="absolute bottom-6 left-6 right-6 text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-primary dark:text-accent" />
                    {selectedProject.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-primary dark:text-accent" />
                    {selectedProject.date}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white uppercase ${
                      selectedProject.status.toLowerCase() === 'ongoing'
                        ? 'bg-amber-600 dark:bg-amber-500'
                        : 'bg-primary dark:bg-primary-light'
                    }`}
                  >
                    {selectedProject.status}
                  </span>
                </div>

                {/* Subtitle / Description heading */}
                <h4 className="text-xs font-bold text-primary dark:text-accent uppercase tracking-widest mb-2">
                  Project Details
                </h4>

                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {selectedProject.details || selectedProject.description}
                </p>

                {/* Modal footer CTA */}
                <div className="pt-6 border-t border-gray-100 dark:border-dark-border flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      const el = document.getElementById('get-involved');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-primary hover:bg-primary-light dark:bg-accent dark:hover:bg-accent-light text-white dark:text-primary-dark font-bold text-sm rounded-full shadow transition-all duration-300 hover:scale-[1.02]"
                  >
                    Support This Project
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
