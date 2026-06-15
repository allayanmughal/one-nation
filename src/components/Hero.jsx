import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Users, Handshake } from 'lucide-react';

// Selected high-quality royalty-free images representing Pakistan's community, youth, and welfare essence
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=85", // Global charity / hope
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1920&q=85", // Hands in / unity
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=85"  // Smiling children / hopeful future
];

export default function Hero() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // 6s rotation for slow Ken Burns transitions
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Ken Burns Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.02, opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentBg]})` }}
          />
        </AnimatePresence>
        {/* Soft overlay gradients: Pakistan flag green tint + deep shadow mask for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-primary/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/70" />
      </div>

      {/* Floating Animated Starburst Background Accents (Echoing the logo) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Large green starburst top right */}
        <motion.div
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 45, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -top-32 -right-32 w-80 h-80 opacity-10 dark:opacity-20 text-primary"
        >
          <StarburstIcon />
        </motion.div>

        {/* Small gold starburst bottom left */}
        <motion.div
          animate={{
            y: [10, -10, 10],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 35, repeat: Infinity, ease: "linear" }
          }}
          className="absolute bottom-20 -left-16 w-48 h-48 opacity-10 dark:opacity-15 text-accent"
        >
          <StarburstIcon />
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20 pt-20">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>Be a Nation, Not Separation</span>
        </motion.div>

        {/* Main Animated Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-none mb-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-200"
          >
            Building One Nation.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent text-glow-accent"
          >
            One Community at a Time.
          </motion.span>
        </h1>

        {/* Supporting Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 font-medium max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed"
        >
          1 Nation Pakistan unites resources, institutions, and dedicated volunteers to foster social welfare, national cohesion, and direct relief across Pakistan.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {/* Volunteer CTA */}
          <button
            onClick={() => handleScrollTo('get-involved')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary-light text-white font-bold text-base rounded-full shadow-lg shadow-primary-glow hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.03] active:scale-98 cursor-pointer group"
          >
            <Users size={20} className="text-accent group-hover:scale-110 transition-transform" />
            <span>Become a Volunteer</span>
          </button>

          {/* Collaborator CTA */}
          <button
            onClick={() => handleScrollTo('get-involved')}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white/40 hover:border-accent hover:bg-accent/10 text-white hover:text-accent font-bold text-base rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-98 cursor-pointer group"
          >
            <Handshake size={20} className="group-hover:scale-110 transition-transform" />
            <span>Partner With Us</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center z-20 pointer-events-none">
        <motion.button
          onClick={() => handleScrollTo('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-auto flex flex-col items-center gap-2 text-white/60 hover:text-accent transition-colors duration-300 cursor-pointer"
        >
          <span className="text-xs font-semibold tracking-widest uppercase">Discover Our Cause</span>
          <ArrowDown size={18} />
        </motion.button>
      </div>
    </section>
  );
}

// Inline Starburst SVG shape for floating background elements
function StarburstIcon() {
  const points = [];
  const center = 100;
  const outerRadius = 95;
  const innerRadius = 78;
  const totalPoints = 48; // 24 tips, 24 valleys

  for (let i = 0; i < totalPoints; i++) {
    const angle = (i * 360) / totalPoints;
    const angleRad = (angle * Math.PI) / 180;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = center + radius * Math.cos(angleRad);
    const y = center + radius * Math.sin(angleRad);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const pointsStr = points.join(' ');

  return (
    <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
      <polygon points={pointsStr} />
    </svg>
  );
}
