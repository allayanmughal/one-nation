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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles] = useState(() => 
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1.5,
      startX: Math.random() * 100,
      speed: Math.random() * 10 + 7,
      delay: Math.random() * 5
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // 6s rotation for Ken Burns slideshow
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[100svh] flex flex-col justify-between items-center overflow-hidden bg-black py-12 text-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Background Ken Burns Slideshow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence>
          <motion.div
            key={currentBg}
            initial={{ scale: 1.15, opacity: 0, x: -15, y: -8 }}
            animate={{ scale: 1.05, opacity: 0.65, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 1.0, x: 15, y: 8 }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentBg]})` }}
          />
        </AnimatePresence>
        {/* Soft overlay gradients: Deeper Navy and shadow overlay for premium contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-primary/45" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80" />
      </div>

      {/* Floating Animated Starburst Background Accents (Responsive to mouse) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Large green starburst top right */}
        <motion.div
          animate={{
            y: [-15 + mousePos.y * 35, 15 + mousePos.y * 35, -15 + mousePos.y * 35],
            x: mousePos.x * 35,
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
            x: { type: "spring", stiffness: 80, damping: 20 }
          }}
          className="absolute -top-32 -right-32 w-80 h-80 opacity-10 dark:opacity-20 text-primary"
        >
          <StarburstIcon />
        </motion.div>

        {/* Small gold starburst bottom left */}
        <motion.div
          animate={{
            y: [10 + mousePos.y * -25, -10 + mousePos.y * -25, 10 + mousePos.y * -25],
            x: mousePos.x * -25,
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
            x: { type: "spring", stiffness: 80, damping: 20 }
          }}
          className="absolute bottom-20 -left-16 w-48 h-48 opacity-10 dark:opacity-15 text-accent"
        >
          <StarburstIcon />
        </motion.div>

        {/* Floating 3D Glowing Sparks Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              y: "110svh", 
              x: `${p.startX}vw`, 
              opacity: 0 
            }}
            animate={{ 
              y: "-10svh",
              opacity: [0, 0.65, 0.65, 0],
              x: [
                `${p.startX}vw`, 
                `${p.startX + (Math.random() * 15 - 7.5) + (mousePos.x * 12)}vw`,
                `${p.startX + (Math.random() * 20 - 10) + (mousePos.x * 18)}vw`
              ]
            }}
            transition={{
              duration: p.speed,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute rounded-full bg-accent/35 blur-[0.5px]"
            style={{
              width: p.size,
              height: p.size,
              boxShadow: "0 0 8px rgba(76, 175, 80, 0.45)",
              transform: "translateZ(10px)"
            }}
          />
        ))}
      </div>

      {/* Top spacer to push contents down below the header */}
      <div className="h-16 sm:h-20 w-full flex-shrink-0 relative z-20" />

      {/* Hero Content with 3D Parallax */}
      <motion.div 
        className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-20 flex-1 flex flex-col justify-center"
        style={{ 
          transformStyle: 'preserve-3d', 
          rotateX: -mousePos.y * 18, 
          rotateY: mousePos.x * 18,
          transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
      >
        {/* Tagline Badge */}
        <div className="flex justify-center w-full mb-6 sm:mb-8" style={{ transform: "translateZ(30px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>Be a Nation, Not Separation</span>
          </motion.div>
        </div>

        {/* Main Animated Headline with drop shadow filters for maximum readability */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight leading-none mb-6" style={{ transform: "translateZ(60px)" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="block text-white"
            style={{ filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.95))' }}
          >
            ONE NATION
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="block mt-2 text-accent text-glow-accent"
            style={{ filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.98))' }}
          >
            PAKISTAN
          </motion.span>
        </h1>

        {/* Supporting Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 font-medium max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed"
          style={{ 
            filter: 'drop-shadow(0px 3px 8px rgba(0, 0, 0, 0.9))',
            transform: "translateZ(45px)"
          }}
        >
          1 Nation Pakistan unites resources, institutions, and dedicated volunteers to foster social welfare, national cohesion, and direct relief across Pakistan.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ transformStyle: 'preserve-3d', transform: "translateZ(50px)" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.08, rotateX: 12, rotateY: -12, z: 40 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => window.location.hash = '#/get-involved'}
            style={{ transformStyle: 'preserve-3d' }}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-primary hover:bg-primary-light text-white font-bold text-sm sm:text-base rounded-full shadow-lg shadow-primary-glow hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer group"
          >
            <Users size={18} className="text-accent group-hover:scale-125 transition-transform" />
            <span>Become a Volunteer</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08, rotateX: 12, rotateY: -12, z: 40 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => window.location.hash = '#/contact'}
            style={{ transformStyle: 'preserve-3d' }}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-white/40 hover:border-accent hover:bg-accent/10 text-white hover:text-accent font-bold text-sm sm:text-base rounded-full transition-all duration-300 cursor-pointer group"
          >
            <Handshake size={18} className="group-hover:scale-125 transition-transform" />
            <span>Collaborate With Us</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <div className="relative z-20 flex justify-center flex-shrink-0 mt-8 mb-4" style={{ transform: "translateZ(20px)" }}>
        <motion.button
          onClick={() => handleScrollTo('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-accent transition-colors duration-300 cursor-pointer"
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
