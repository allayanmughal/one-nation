import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flag, HeartHandshake, ShieldCheck, Compass, MessageSquare, Users, Heart, BookOpen, HeartPulse, Quote } from 'lucide-react';
import Hero from './Hero';
import mushtaqGhaniPhoto from '../assets/mushtaq_ghani.jpg';

const FOCUS_AREAS = [
  {
    title: 'Education',
    description: 'Promoting quality education and equal opportunities for a brighter future.',
    icon: BookOpen,
  },
  {
    title: 'Healthcare',
    description: 'Improving healthcare access and supporting healthy communities.',
    icon: HeartPulse,
  },
  {
    title: 'Welfare',
    description: 'Providing humanitarian aid and supporting vulnerable families.',
    icon: HeartHandshake,
  },
  {
    title: 'Community Development',
    description: 'Building stronger, self-reliant communities for long-term sustainable growth.',
    icon: Users,
  },
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
      className="group surface-card dark:bg-dark-card rounded-3xl overflow-hidden border border-primary/5 dark:border-dark-border hover:border-accent/30 shadow-lg shadow-primary/8 dark:shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
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
        {project.category && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black text-white uppercase shadow-sm ${
              project.category === 'Free Medical Camps' ? 'bg-campaign-medical' :
              project.category === 'Project Haya' ? 'bg-campaign-haya' :
              project.category === 'Nature Rehabilitation' ? 'bg-campaign-nature' :
              project.category === 'Special Nation' ? 'bg-campaign-special' :
              project.category === 'Learn2Earn' ? 'bg-campaign-learn' :
              project.category === 'One Nation Explorers' ? 'bg-campaign-explorers' :
              'bg-accent'
            }`}
          >
            {project.category}
          </span>
        )}
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
        <h4 className="text-lg font-display font-extrabold text-primary dark:text-white group-hover:text-accent dark:group-hover:text-accent transition-colors duration-200 mb-2 line-clamp-1">
          {project.title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

// Sub-Component 4: Chairman Showcase (reference layout)
function PatronShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-light-bg dark:bg-dark-bg border-t border-primary/5 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Portrait + Focus Areas */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Portrait */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-primary/10 border border-primary/5 dark:border-dark-border aspect-[4/5] max-w-xs sm:max-w-sm mx-auto lg:mx-0 bg-white dark:bg-dark-card">
              <img
                src={mushtaqGhaniPhoto}
                alt="Mushtaq Ahmed Ghani portrait"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Our Focus Areas */}
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 shadow-lg shadow-primary/8 border border-primary/5 dark:border-dark-border surface-card">
              <div className="mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl font-display font-extrabold text-black dark:text-white">
                  Our Focus Areas
                </h4>
                <div className="h-0.5 w-12 bg-accent mt-2 rounded-full" />
              </div>

              <div className="space-y-5">
                {FOCUS_AREAS.map((area) => {
                  const Icon = area.icon;
                  return (
                    <div key={area.title} className="flex gap-3 items-start">
                      <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shrink-0 shadow-sm shadow-accent/30 mt-0.5">
                        <Icon size={16} className="text-white" />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-display font-extrabold text-primary dark:text-white mb-1">
                          {area.title}
                        </h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Bio + Chairman's Message */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Bio */}
            <div className="flex flex-col text-center lg:text-left justify-center">
              <h3 className="text-3xl sm:text-4xl font-display font-black text-primary dark:text-white leading-tight mb-2">
                Mushtaq Ahmed Ghani
              </h3>
              <div className="mb-5">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.18em] text-accent uppercase">
                  Chairman & Humanitarian Leader
                </span>
                <div className="h-0.5 w-14 bg-accent mt-2 mx-auto lg:mx-0 rounded-full" />
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent-dark dark:text-accent uppercase border border-accent/15">
                  Veteran Lawmaker
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent-dark dark:text-accent uppercase border border-accent/15">
                  Speaker KP Assembly (2018–2024)
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                As a dedicated public servant representing Abbottabad, Mushtaq Ahmed Ghani leads our humanitarian vision. He coordinates welfare operations with transparency and compassion, ensuring structured outreach reaches families in critical need across Khyber Pakhtunkhwa.
              </p>
            </div>

            {/* Chairman's Message card */}
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 shadow-lg shadow-primary/8 border border-primary/5 dark:border-dark-border h-full flex flex-col surface-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <Quote size={18} className="text-white fill-white/20" />
                </div>
                <h4 className="text-lg font-display font-extrabold text-primary dark:text-white">
                  Chairman&apos;s Message
                </h4>
              </div>

              <p className="text-sm sm:text-base font-bold text-accent leading-relaxed mb-4">
                Our mission is to serve humanity with integrity, transparency and compassion.
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                At One Nation Pakistan, we believe that every act of service strengthens the bonds of our nation. Through youth-led volunteer chapters and direct field outreach, we deliver food security, clean water, and emergency relief to underserved communities.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Together with our volunteers and collaborators, we are building a future where compassion drives action — standing united as one nation, not separation.
              </p>

              <div className="mb-6">
                <p className="text-accent font-serif italic text-xl sm:text-2xl leading-none mb-1">
                  Mushtaq Ahmed Ghani
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Chairman & Humanitarian Leader
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a
                  href="#/projects"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-light dark:bg-accent dark:hover:bg-accent-light text-white dark:text-primary-dark font-bold text-sm rounded-xl shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>View Projects</span>
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#/get-involved"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-dark-bg border-2 border-primary/20 dark:border-dark-border hover:border-accent text-primary dark:text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Heart size={16} className="text-accent fill-accent/20" />
                  <span>Support Our Mission</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-Component 5: Brand Positioning Quote
function BrandPositioningQuote() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-dark text-white rounded-[2.5rem] border border-white/5 overflow-hidden relative p-8 sm:p-12">
          {/* Decorative glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-accent uppercase block mb-4">
              Brand Positioning Statement
            </span>
            <div className="relative inline-block max-w-4xl mb-6">
              <span className="absolute -top-12 -left-6 sm:-left-12 text-7xl sm:text-9xl text-accent/10 font-serif leading-none select-none">“</span>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white leading-relaxed italic px-4 sm:px-12 relative z-10">
                One Nation Pakistan is a youth-led humanitarian movement committed to serving humanity, protecting vulnerable communities, empowering future generations, and building a united Pakistan through sustainable social impact.
              </h3>

              <span className="absolute -bottom-24 -right-6 sm:-right-12 text-7xl sm:text-9xl text-accent/10 font-serif leading-none select-none">”</span>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-accent/30" />
              <span className="text-[9px] sm:text-xs font-bold tracking-wider text-accent-light uppercase">TOGETHER WE CAN CREATE A BETTER, STRONGER & COMPASSIONATE PAKISTAN</span>
              <div className="h-[1px] w-8 bg-accent/30" />
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

  return (
    <div className="relative overflow-hidden bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* 1. Hero Banner with Parallax */}
      <Hero />

      {/* 2. Mission Teaser Banner with Tilt Card Wrap */}
      <section className="py-20 bg-light-bg dark:bg-dark-bg border-t border-primary/5 dark:border-dark-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveTiltCard className="p-8 sm:p-12 rounded-2xl surface-card dark:bg-dark-card border border-primary/5 dark:border-dark-border shadow-lg shadow-primary/8 dark:shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase block mb-3">
                  Our Movement Tagline
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary dark:text-white leading-tight">
                  "Be a Nation, Not Separation"
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                  We advocate for national unity across all segments of Pakistan. By organizing volunteer wings and establishing structured distribution lines, we deliver food security, clean water filtration, and emergency relief to families in critical need.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <a
                  href="#/mission"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-light dark:bg-accent dark:hover:bg-accent-light text-white dark:text-primary-dark font-extrabold text-sm uppercase tracking-wide rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
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
      <section className="py-24 bg-light-bg dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase">
              Our Values in Action
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-primary dark:text-white mt-1">
              Why Collaborate With Us?
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
                  className="p-8 rounded-2xl bg-white dark:bg-dark-card border border-primary/5 dark:border-dark-border hover:border-accent/30 dark:hover:border-accent/40 shadow-lg shadow-primary/8 flex flex-col items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white mb-6 shadow-sm shadow-accent/30">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-lg font-display font-extrabold text-primary dark:text-white mb-3">
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

      {/* 4. 3D Patron Showcase (Mushtaq Ahmed Ghani Vision Deck) */}
      <PatronShowcase />

      {/* 5. Featured Projects Preview (3D Parallax cards) */}
      <section className="py-24 bg-light-bg dark:bg-dark-bg border-t border-primary/5 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase">
              Ongoing Initiatives
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-primary dark:text-white mt-1">
              Active Welfare Preview
            </h3>
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

          <div className="flex justify-center">
            <a
              href="#/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-light dark:bg-accent dark:hover:bg-accent-light text-white dark:text-primary-dark font-extrabold text-sm uppercase tracking-wide rounded-full shadow-lg shadow-primary/20 dark:shadow-accent/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 group"
            >
              <span>View All Projects</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* 5.5 Brand Positioning Statement Quote */}
      <BrandPositioningQuote />

    </div>
  );
}
