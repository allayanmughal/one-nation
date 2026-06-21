import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flag, HeartHandshake, ShieldCheck, Compass, MessageSquare, Users, Heart } from 'lucide-react';
import Hero from './Hero';

// Sector Data for the 3D Perspective Impact Deck
const IMPACT_SECTORS = [
  {
    id: 1,
    title: "Food Security Campaign",
    subtitle: "Ration Distribution Drive",
    target: "1,500 Families",
    reached: "1,500 Families",
    stat: "100%",
    status: "Completed",
    frontBg: "bg-gradient-to-br from-emerald-950/40 to-black/85",
    successStory: "\"The ration packs reached our remote village in Abbottabad just when we ran out of options. Absolute life-saver for my kids.\"",
    beneficiary: "— Amina Bibi, Abbottabad"
  },
  {
    id: 2,
    title: "RO Clean Water Plants",
    subtitle: "Filtration Infrastructure",
    target: "5 Plants",
    reached: "3 Plants",
    stat: "60%",
    status: "Active",
    frontBg: "bg-gradient-to-br from-blue-950/40 to-black/85",
    successStory: "\"Clean water is no longer a luxury. Since the RO plant was installed near our school, water-borne illnesses have dropped to zero.\"",
    beneficiary: "— Master Rafique, Haripur"
  },
  {
    id: 3,
    title: "Winter Blanket Campaigns",
    subtitle: "Household Relief",
    target: "1,000 Households",
    reached: "850 Households",
    stat: "85%",
    status: "Active",
    frontBg: "bg-gradient-to-br from-purple-950/40 to-black/85",
    successStory: "\"Winters in the hills are harsh. These high-quality blankets kept our grandparents warm through the worst snow spells.\"",
    beneficiary: "— Tariq Mahmood, Nathiagali"
  }
];

// Sub-Component 1: Interactive Tilt & Glare Card (Value Cards, Mission Teaser)
function InteractiveTiltCard({ children, className = "" }) {
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, sheenX: 50, sheenY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const normX = (mouseX / width) - 0.5;
    const normY = (mouseY / height) - 0.5;

    setCoords({
      rotateX: -normY * 18,
      rotateY: normX * 18,
      sheenX: (mouseX / width) * 100,
      sheenY: (mouseY / height) * 100
    });
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ rotateX: 0, rotateY: 0, sheenX: 50, sheenY: 50 });
      }}
      animate={{
        rotateX: coords.rotateX,
        rotateY: coords.rotateY,
        scale: isHovered ? 1.025 : 1
      }}
      transition={{ type: "spring", stiffness: 150, damping: 22 }}
      style={{ 
        transformStyle: 'preserve-3d', 
        perspective: 1200 
      }}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 0.35 : 0,
          background: `radial-gradient(circle 220px at ${coords.sheenX}% ${coords.sheenY}%, rgba(255, 255, 255, 0.18), transparent)`
        }}
      />
      {children}
    </motion.div>
  );
}

// Sub-Component 2: Magnetic 3D Link Card (Quick Links)
function MagneticLink({ children, href, className = "" }) {
  const [coords, setCoords] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normX = (mouseX / width) - 0.5;
    const normY = (mouseY / height) - 0.5;

    setCoords({
      x: normX * 16,
      y: normY * 16,
      rotateX: -normY * 14,
      rotateY: normX * 14
    });
  };

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
      }}
      animate={{
        x: coords.x,
        y: coords.y,
        rotateX: coords.rotateX,
        rotateY: coords.rotateY,
        scale: isHovered ? 1.04 : 1
      }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`group block shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.a>
  );
}

// Sub-Component 3: 3D Parallax Depth Card (Featured Projects)
function ParallaxProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normX = (mouseX / width) - 0.5;
    const normY = (mouseY / height) - 0.5;

    setCoords({ x: normX * 12, y: normY * 12 });
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      animate={{
        rotateY: coords.x * 2.8,
        rotateX: -coords.y * 2.8,
        y: hovered ? -8 : 0,
        z: hovered ? 20 : 0
      }}
      transition={{ type: "spring", stiffness: 110, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className="group bg-white dark:bg-dark-card rounded-3xl overflow-hidden border border-gray-100 dark:border-dark-border hover:border-accent/20 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100 pointer-events-none">
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{
            scale: hovered ? 1.08 : 1.0,
            x: -coords.x * 0.9,
            y: -coords.y * 0.9
          }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase shadow-sm ${
            project.status.toLowerCase() === 'ongoing' ? 'bg-amber-600' : 'bg-primary'
          }`}
        >
          {project.status}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow pointer-events-none" style={{ transform: "translateZ(35px)", transformStyle: 'preserve-3d' }}>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
          {project.location} • {project.date}
        </span>
        <h4 className="text-lg font-display font-extrabold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors duration-200 mb-2 line-clamp-1">
          {project.title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

// Sub-Component 4: 3D Perspective Stack Flip Deck (Impact deck)
function ImpactDeck() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [flipped, setFlipped] = useState({ 0: false, 1: false, 2: false });

  const toggleFlip = (idx, e) => {
    e.stopPropagation();
    setFlipped(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-dark-bg/10 border-t border-b border-gray-100 dark:border-dark-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column Description */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
              Direct Impact Sectors
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white mt-2 mb-6 leading-tight">
              Interactive 3D Impact Deck
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8 font-medium">
              We focus our direct relief efforts on key pillars of human development. Sweep your cursor over the stack of cards on the right to interact, and click any card to flip and read verified success stories from Abbottabad and Haripur.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span className="w-6 h-6 rounded-full bg-primary/10 dark:bg-accent/15 flex items-center justify-center text-primary dark:text-accent text-xs">1</span>
                <span>Hover a card to pull it to the front in Z-depth.</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span className="w-6 h-6 rounded-full bg-primary/10 dark:bg-accent/15 flex items-center justify-center text-primary dark:text-accent text-xs">2</span>
                <span>Click "Success Story" to execute a complete 3D card flip.</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <span className="w-6 h-6 rounded-full bg-primary/10 dark:bg-accent/15 flex items-center justify-center text-primary dark:text-accent text-xs">3</span>
                <span>Verify transparency and read real local testimonials.</span>
              </div>
            </div>
          </div>

          {/* Right Column Stack */}
          <div className="lg:col-span-7 flex justify-center items-center py-12 lg:py-20 relative min-h-[460px]">
            <div 
              style={{ 
                perspective: 1500, 
                transformStyle: 'preserve-3d' 
              }} 
              className="relative w-full max-w-[390px] h-[340px]"
            >
              {IMPACT_SECTORS.map((sector, idx) => {
                const isHovered = hoveredIdx === idx;
                const isAnyHovered = hoveredIdx !== null;
                const isFlipped = flipped[idx];

                let zOffset = -idx * 40;
                let xOffset = idx * 35;
                let yOffset = idx * 20;
                let rotX = 18;
                let rotY = -32;
                let rotZ = -8;
                let opacityVal = 1;

                if (isHovered) {
                  zOffset = 100;
                  xOffset = -35;
                  yOffset = -25;
                  rotX = 0;
                  rotY = isFlipped ? 180 : 0;
                  rotZ = 0;
                  opacityVal = 1;
                } else if (isAnyHovered) {
                  zOffset = -idx * 50 - 50;
                  xOffset = idx * 45 + 15;
                  yOffset = idx * 25 + 15;
                  rotX = 18;
                  rotY = -32;
                  rotZ = -8;
                  opacityVal = 0.2;
                }

                return (
                  <motion.div
                    key={sector.id}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    animate={{
                      z: zOffset,
                      x: xOffset,
                      y: yOffset,
                      rotateX: rotX,
                      rotateY: rotY,
                      rotateZ: rotZ,
                      opacity: opacityVal
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 18
                    }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0
                    }}
                  >
                    <div 
                      className="w-full h-full relative rounded-3xl shadow-xl transition-shadow duration-300"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* FRONT CARD */}
                      <div
                        style={{ 
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(0deg)',
                          width: '100%',
                          height: '100%'
                        }}
                        className={`absolute inset-0 rounded-3xl p-8 border border-white/10 ${sector.frontBg} flex flex-col justify-between backdrop-blur-md text-white`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-accent">
                              {sector.subtitle}
                            </span>
                            <h4 className="text-xl font-display font-extrabold mt-1">
                              {sector.title}
                            </h4>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-white/10 text-white border border-white/20`}>
                            {sector.status}
                          </span>
                        </div>

                        <div>
                          <div className="flex justify-between items-end mb-2">
                            <div>
                              <span className="text-xs text-gray-400 block font-semibold">Reached</span>
                              <span className="text-lg font-bold text-white">{sector.reached}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-400 block font-semibold">Target</span>
                              <span className="text-base font-semibold text-gray-300">{sector.target}</span>
                            </div>
                          </div>
                          
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6">
                            <div 
                              style={{ width: sector.stat }}
                              className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                            />
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-xl font-black text-accent">{sector.stat}</span>
                            <button
                              onClick={(e) => toggleFlip(idx, e)}
                              className="px-4 py-1.5 rounded-full text-xs font-bold bg-white text-primary hover:bg-accent hover:text-white transition-colors duration-200 shadow"
                            >
                              Success Story
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* BACK CARD */}
                      <div
                        style={{ 
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          width: '100%',
                          height: '100%'
                        }}
                        className="absolute inset-0 rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-primary-dark/95 to-black/95 flex flex-col justify-between backdrop-blur-md text-white"
                      >
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-accent block mb-2">
                            Verified Beneficiary Story
                          </span>
                          <p className="text-sm sm:text-base italic leading-relaxed text-gray-200 mt-2 font-medium">
                            {sector.successStory}
                          </p>
                        </div>

                        <div className="flex justify-between items-end border-t border-white/10 pt-4">
                          <span className="text-xs font-bold text-accent">
                            {sector.beneficiary}
                          </span>
                          <button
                            onClick={(e) => toggleFlip(idx, e)}
                            className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-colors duration-200 border border-white/20"
                          >
                            Return
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeView({ projects }) {
  const previewProjects = projects.slice(0, 3);

  const valueProps = [
    {
      title: "Direct Field Outreach",
      description: "We bypass administrative bottlenecks to distribute food packs, blankets, and water systems directly to local families.",
      icon: Heart
    },
    {
      title: "Youth Mobilization",
      description: "Harnessing the power of over 1,200 student ambassadors to organize disaster response and local advocacy chapters.",
      icon: Users
    },
    {
      title: "Radical Transparency",
      description: "Every distribution campaign is video-recorded and logged, giving our institutional donors absolute accountability.",
      icon: ShieldCheck
    }
  ];

  const quickLinks = [
    {
      title: "About Our Movement",
      description: "Learn about speaker Mushtaq Ahmed Ghani, Harmain Ghani, and our welfare history.",
      hash: "#/about",
      icon: Compass,
      color: "from-emerald-500/10 to-emerald-600/10 hover:border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
    },
    {
      title: "Our Mission Pillars",
      description: "Understand the four foundational pillars that guide our charity and cohesion efforts.",
      hash: "#/mission",
      icon: Flag,
      color: "from-amber-500/10 to-amber-600/10 hover:border-amber-500/30 text-amber-700 dark:text-amber-400"
    },
    {
      title: "Become a Volunteer",
      description: "Register to join our regional chapters and assist in field distributions.",
      hash: "#/get-involved",
      icon: HeartHandshake,
      color: "from-blue-500/10 to-blue-600/10 hover:border-blue-500/30 text-blue-700 dark:text-blue-400"
    },
    {
      title: "Get In Touch",
      description: "Send direct inquiries, CSR alignment proposals, or check our map location.",
      hash: "#/contact",
      icon: MessageSquare,
      color: "from-purple-500/10 to-purple-600/10 hover:border-purple-500/30 text-purple-700 dark:text-purple-400"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* 1. Hero Banner with Parallax */}
      <Hero />

      {/* 2. Mission Teaser Banner with Tilt Card Wrap */}
      <section className="py-20 bg-gray-50/50 dark:bg-dark-bg/20 border-t border-b border-gray-100 dark:border-dark-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveTiltCard className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase block mb-3">
                  Our Movement Tagline
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white leading-tight">
                  "Be a Nation, Not Separation"
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                  We advocate for national unity across all segments of Pakistan. By organizing volunteer wings and establishing structured distribution lines, we deliver food security, clean water filtration, and emergency relief to families in critical need.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <a
                  href="#/mission"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-light dark:bg-accent dark:hover:bg-accent-light text-white dark:text-primary-dark font-extrabold text-sm uppercase tracking-wide rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
                >
                  <span>Read Full Mission</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </InteractiveTiltCard>
        </div>
      </section>

      {/* 3. Why 1 Nation Pakistan (Tilt Cards Grid) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
              Our Values in Action
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white mt-1">
              Why Partner With Us?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              We translate charity into accountable, youth-led infrastructure with verified local impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((value, idx) => {
              const Icon = value.icon;
              return (
                <InteractiveTiltCard
                  key={idx}
                  className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border hover:border-accent/30 dark:hover:border-accent/40 shadow-sm flex flex-col items-start"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-accent/15 flex items-center justify-center text-primary dark:text-accent mb-6 shadow-sm">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-lg font-display font-extrabold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    {value.description}
                  </p>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 3D Perspective Impact Deck (Replacing static progress bars) */}
      <ImpactDeck />

      {/* 5. Featured Projects Preview (3D Parallax cards) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
                Ongoing Initiatives
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white mt-1">
                Active Welfare Preview
              </h3>
            </div>
            <a
              href="#/projects"
              className="text-xs sm:text-sm font-bold text-primary dark:text-accent hover:underline flex items-center gap-1.5 self-start sm:self-auto group"
            >
              <span>Browse All Projects</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {previewProjects.map((project) => (
              <ParallaxProjectCard
                key={project.id}
                project={project}
                onClick={() => {
                  window.location.hash = '#/projects';
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Quick Links Navigation Grid (Magnetic Cards) */}
      <section className="py-20 bg-gray-50/50 dark:bg-dark-bg/20 border-t border-gray-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
              Explore More
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white mt-1">
              Quick Navigation Channels
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, idx) => {
              const IconComponent = link.icon;
              return (
                <MagneticLink
                  key={idx}
                  href={link.hash}
                  className={`p-6 rounded-3xl bg-gradient-to-br border border-gray-100 dark:border-dark-border/40 ${link.color}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-dark-card flex items-center justify-center mb-4 shadow-sm text-current">
                    <IconComponent size={22} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-base font-display font-extrabold text-gray-900 dark:text-white mb-2 transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    {link.description}
                  </p>
                </MagneticLink>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
