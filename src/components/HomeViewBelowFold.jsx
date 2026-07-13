import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, HeartHandshake, ShieldCheck, Users, Heart, BookOpen, HeartPulse, Quote, Shield, Award, GraduationCap, Activity } from 'lucide-react';
import Image from 'next/image';

const mushtaqGhaniPhoto = "/assets/mushtaq_ghani.jpg";
const harmainGhaniPhoto = "/assets/harmain_ghani.jpg";
const ambassador1Photo = "/assets/Ambassador1.jpg";
const ambassador2Photo = "/assets/Ambassador2.jpg";

function LeafBranch({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20,95 C30,70 50,30 80,10" />
      <path d="M40,65 C30,60 32,45 45,48 C55,50 52,60 40,65 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M55,45 C45,40 47,25 60,28 C70,30 67,40 55,45 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M30,80 C20,75 22,60 35,63 C45,65 42,75 30,80 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M45,60 C35,55 37,40 50,43 C60,45 57,55 45,60 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M58,55 C68,52 70,37 57,35 C47,33 48,47 58,55 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M42,75 C52,72 54,57 41,55 C31,53 32,67 42,75 Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M72,20 C72,8 84,4 88,12 C80,18 76,20 72,20 Z" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

function InteractiveTiltCard({ children, className = "" }) {
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, sheenX: 50, sheenY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setCoords({
      rotateX: -((mouseY / rect.height) - 0.5) * 18,
      rotateY: ((mouseX / rect.width) - 0.5) * 18,
      sheenX: (mouseX / rect.width) * 100,
      sheenY: (mouseY / rect.height) * 100
    });
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setIsHovered(false); setCoords({ rotateX: 0, rotateY: 0, sheenX: 50, sheenY: 50 }); }}
      animate={{ rotateX: coords.rotateX, rotateY: coords.rotateY, scale: isHovered ? 1.025 : 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 22 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10" style={{ opacity: isHovered ? 0.35 : 0, background: `radial-gradient(circle 220px at ${coords.sheenX}% ${coords.sheenY}%, rgba(255, 255, 255, 0.18), transparent)` }} />
      {children}
    </motion.div>
  );
}

function ParallaxProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: ((e.clientX - rect.left) / rect.width - 0.5) * 12, y: ((e.clientY - rect.top) / rect.height - 0.5) * 12 });
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setCoords({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      animate={{ rotateY: coords.x * 2.8, rotateX: -coords.y * 2.8, y: hovered ? -8 : 0, z: hovered ? 20 : 0 }}
      transition={{ type: "spring", stiffness: 110, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className="group surface-card dark:bg-dark-card rounded-3xl overflow-hidden border border-primary/5 dark:border-dark-border hover:border-accent/30 shadow-lg shadow-primary/8 dark:shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100 pointer-events-none">
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ scale: hovered ? 1.08 : 1.0, x: -coords.x * 0.9, y: -coords.y * 0.9 }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {project.category && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black text-white uppercase shadow-sm ${project.category === 'Free Medical Camps' ? 'bg-campaign-medical' : project.category === 'Project Haya' ? 'bg-campaign-haya' : project.category === 'Nature Rehabilitation' ? 'bg-campaign-nature' : project.category === 'Special Nation' ? 'bg-campaign-special' : project.category === 'Learn2Earn' ? 'bg-campaign-learn' : project.category === 'One Nation Explorers' ? 'bg-campaign-explorers' : 'bg-accent'}`}>
            {project.category}
          </span>
        )}
        <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase shadow-sm ${project.status.toLowerCase() === 'ongoing' ? 'bg-amber-600' : 'bg-primary'}`}>
          {project.status}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow pointer-events-none" style={{ transform: "translateZ(35px)", transformStyle: 'preserve-3d' }}>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">{project.location} • {project.date}</span>
        <h4 className="text-lg font-display font-extrabold text-primary dark:text-white group-hover:text-accent dark:group-hover:text-accent transition-colors duration-200 mb-2 line-clamp-1">{project.title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );
}

function PatronShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-light-bg dark:bg-dark-bg border-t border-primary/5 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 mb-8 items-stretch">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-primary/10 border-4 border-red-600 aspect-[4/5] w-full max-w-sm bg-white dark:bg-dark-card">
              <Image src={mushtaqGhaniPhoto} alt="Mushtaq Ahmed Ghani portrait" width={400} height={500} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <span className="block text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Chairman</span>
                <h3 className="text-base sm:text-lg font-display font-black text-white leading-tight">MUSHTAQ AHMED GHANI</h3>
                <p className="text-[11px] text-gray-300 font-medium mt-0.5">Patron &amp; Chief of One Nation Pakistan</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border-4 border-blue-600/80 shadow-lg">
            <div className="flex flex-col text-left justify-center">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-primary dark:text-white leading-tight mb-2">MUSHTAQ AHMED GHANI</h3>
              <div className="mb-5">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.18em] text-accent uppercase">Patron &amp; Chief of One Nation Pakistan</span>
                <div className="h-0.5 w-14 bg-accent mt-2 rounded-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {[
                  { title: "Minister of Higher Education & Information", subtitle: "Government of Khyber Pakhtunkhwa", date: "2013 - 2018", icon: Shield },
                  { title: "Speaker, KP Assembly", subtitle: "Provincial Legislature Leadership", date: "2018 - 2023", icon: Award },
                  { title: "Member of Provincial Assembly", subtitle: "Chairman, Health Committee", date: "Currently Serving", icon: Users },
                  { title: "Founder, Pine Hills Education System", subtitle: "Pioneer of modern education in Abbottabad", date: "Est. 1984", icon: GraduationCap }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="p-4 rounded-xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 hover:border-accent/40 hover:scale-[1.02] transition-all duration-300 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5"><IconComponent size={18} /></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-wider mb-0.5">{item.date}</span>
                        <h4 className="text-xs sm:text-sm font-display font-extrabold text-primary dark:text-white leading-tight mb-1">{item.title}</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-normal">{item.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 shadow-lg shadow-primary/8 border border-primary/5 dark:border-dark-border flex flex-col surface-card">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0"><Quote size={18} className="text-white fill-white/20" /></div>
            <h4 className="text-lg font-display font-extrabold text-primary dark:text-white">Chairman&apos;s Message</h4>
          </div>
          <p className="text-sm sm:text-base font-bold text-accent leading-relaxed mb-4">Our mission is to serve humanity with integrity, transparency and compassion.</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">At One Nation Pakistan, we believe that every act of service strengthens the bonds of our nation. Through youth-led volunteer chapters and direct field outreach, we deliver food security, clean water, and emergency relief to underserved communities.</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">Together with our volunteers and collaborators, we are building a future where compassion drives action — standing united as one nation, not separation.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <a href="#/projects" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-light dark:bg-accent dark:hover:bg-accent-light text-white dark:text-primary-dark font-bold text-sm rounded-xl shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"><span>View Projects</span><ArrowRight size={16} /></a>
            <a href="#/get-involved" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-dark-bg border-2 border-primary/20 dark:border-dark-border hover:border-accent text-primary dark:text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-95"><Heart size={16} className="text-accent fill-accent/20" /><span>Support Our Mission</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoFounderShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-dark-card border-t border-primary/5 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 mb-8 items-stretch">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-primary/10 border-4 border-red-600 aspect-[4/5] w-full max-w-sm bg-white dark:bg-dark-card">
              <Image src={harmainGhaniPhoto} alt="Dr. Harmain Ghani portrait" width={400} height={500} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <span className="block text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Founder &amp; CEO</span>
                <h3 className="text-base sm:text-lg font-display font-black text-white leading-tight">DR. HARMAIN GHANI</h3>
                <p className="text-[11px] text-gray-300 font-medium mt-0.5">One Nation Pakistan</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center bg-light-bg dark:bg-dark-bg rounded-2xl p-6 sm:p-8 border-4 border-blue-600/80 shadow-lg">
            <div className="flex flex-col text-left justify-center">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-primary dark:text-white leading-tight mb-2">DR. HARMAIN GHANI</h3>
              <div className="mb-5">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.18em] text-accent uppercase">Founder &amp; CEO of One Nation Pakistan</span>
                <div className="h-0.5 w-14 bg-accent mt-2 rounded-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {[
                  { title: "Founder & CEO", subtitle: "One Nation Pakistan Welfare Initiatives", date: "Founder", icon: Award },
                  { title: "Executive Director", subtitle: "Pine Hills Education System", date: "Executive", icon: GraduationCap },
                  { title: "Clinical Pharmacist & Entrepreneur", subtitle: "Combining medicine & social impact", date: "Professional", icon: Activity },
                  { title: "Philanthropist & Youth Leader", subtitle: "Mobilizing 1,200+ student volunteers", date: "Core Commitments", icon: Users }
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="p-4 rounded-xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 hover:border-accent/40 hover:scale-[1.02] transition-all duration-300 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5"><IconComponent size={18} /></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-wider mb-0.5">{item.date}</span>
                        <h4 className="text-xs sm:text-sm font-display font-extrabold text-primary dark:text-white leading-tight mb-1">{item.title}</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-normal">{item.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 shadow-lg shadow-primary/8 border border-primary/5 dark:border-dark-border flex flex-col surface-card">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0"><Quote size={18} className="text-white fill-white/20" /></div>
            <h4 className="text-lg font-display font-extrabold text-primary dark:text-white">Founder&apos;s Message</h4>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-left">
            <p>Dr. Harmain Ghani is dedicated to building a more united, empowered, and compassionate Pakistan. Through One Nation Pakistan, he leads transformative initiatives in healthcare, education, women empowerment, environmental sustainability, humanitarian response, and youth development, bringing together institutions, professionals, and volunteers to create lasting social impact across the country.</p>
            <p className="font-semibold text-accent italic">&ldquo;Driven by the belief that meaningful change begins with collective action, Dr. Harmain Ghani envisions a Pakistan where every individual has the opportunity to contribute, every community has the power to thrive, and every act of service helps build a stronger nation.&rdquo;</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <a href="#/get-involved" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-dark text-white font-bold text-sm rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-95"><Heart size={16} className="fill-white/20" /><span>Join as Volunteer</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AmbassadorsSection() {
  const ambassadors = [
    { name: "Dr. Waseef Ullah", role: "Chief Ambassador", department: "Medical & Health Care Projects", image: ambassador1Photo },
    { name: "Ayesha Khan", role: "Chief Ambassador", department: "Youth & Community Development", image: ambassador2Photo }
  ];

  return (
    <section className="py-20 bg-white dark:bg-dark-card border-t border-primary/5 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase">Our Voices</span>
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-primary dark:text-white mt-1">Global Ambassadors</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">Meet the leaders heading our regional chapters and specialized welfare campaigns.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {ambassadors.map((amb, idx) => (
            <div key={idx} className="surface-card dark:bg-dark-bg/60 rounded-3xl p-6 border border-primary/5 dark:border-dark-border shadow-lg flex flex-col sm:flex-row items-center gap-6 group hover:shadow-xl transition-all duration-300">
              <div className="w-36 h-36 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-accent/20">
                <Image src={amb.image} alt={amb.name} width={144} height={144} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-lg font-display font-bold text-primary dark:text-white mb-1">{amb.name}</h4>
                <p className="text-xs font-extrabold text-accent uppercase tracking-wide mb-2">{amb.role}</p>
                <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/5 dark:bg-white/5 text-gray-600 dark:text-gray-400">{amb.department}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomeViewBelowFold({ projects }) {
  const previewProjects = projects.slice(0, 3);
  const valueProps = [
    { title: "Direct Field Outreach", description: "We bypass administrative bottlenecks to distribute food packs, blankets, and water systems directly to local families.", icon: Heart },
    { title: "Youth Mobilization", description: "Harnessing the power of over 1,200 student ambassadors to organize disaster response and local advocacy chapters.", icon: Users },
    { title: "Radical Transparency", description: "Every distribution campaign is video-recorded and logged, giving our institutional donors absolute accountability.", icon: ShieldCheck }
  ];

  return (
    <>
      {/* Mission Teaser */}
      <section className="py-20 bg-light-bg dark:bg-dark-bg border-t border-primary/5 dark:border-dark-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveTiltCard className="p-8 sm:p-12 rounded-[2rem] surface-card dark:bg-dark-card border border-primary/5 dark:border-dark-border shadow-xl shadow-primary/8 dark:shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <span className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase block mb-2">Our Movement Tagline</span>
                <div className="h-0.5 w-10 bg-accent mb-6 rounded-full" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-black dark:text-white leading-tight mb-6">&quot;Be a Nation, Not Separation&quot;</h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mb-8">One Nation Pakistan brings together compassionate people, trusted institutions, strategic partners, and dedicated volunteers to strengthen national unity, empower communities, and create lasting social impact through education, healthcare, humanitarian action, environmental sustainability, and youth led community development across Pakistan.</p>
                <a href="#/mission" className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-dark dark:bg-accent dark:hover:bg-accent-light text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 group cursor-pointer"><span>Read Full Mission</span><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></a>
              </div>
              <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] w-full mt-10 lg:mt-0">
                <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                  <svg className="absolute w-72 h-72 text-gray-300/40 dark:text-gray-700/45 -top-4 -right-4 animate-pulse-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" /></svg>
                  <svg className="absolute w-64 h-64 text-gray-300/40 dark:text-gray-700/45 -bottom-8 -left-8" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" /></svg>
                  <LeafBranch className="absolute -top-6 -right-12 w-24 h-24 text-accent/20 rotate-[15deg]" />
                  <LeafBranch className="absolute -bottom-10 -left-10 w-24 h-24 text-accent/20 -rotate-[145deg]" />
                </div>
                <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[340px] mx-auto z-10">
                  <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full border-[6px] border-white shadow-2xl overflow-hidden absolute top-2 right-4 z-10 hover:scale-105 transition-transform duration-300">
                    <Image src="/medical_camp.jpeg" alt="Doctor at Free Medical Camp" width={176} height={176} className="w-full h-full object-cover object-center" loading="lazy" />
                  </div>
                  <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full border-[6px] border-white shadow-2xl overflow-hidden absolute bottom-12 left-0 z-20 hover:scale-105 transition-transform duration-300">
                    <Image src="/massive_plantation.jpeg" alt="Volunteers planting tree" width={176} height={176} className="w-full h-full object-cover object-center" loading="lazy" />
                  </div>
                  <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full border-[6px] border-white shadow-2xl overflow-hidden absolute bottom-2 right-12 sm:right-16 z-20 hover:scale-105 transition-transform duration-300">
                    <Image src="/special_nation.jpeg" alt="Welfare ration distribution" width={176} height={176} className="w-full h-full object-cover object-center" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </InteractiveTiltCard>
        </div>
      </section>

      <PatronShowcase />
      <CoFounderShowcase />

      {/* Why Collaborate */}
      <section className="py-24 bg-light-bg dark:bg-dark-bg border-t border-primary/5 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase">Our Values in Action</span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-primary dark:text-white mt-1">Why Collaborate With Us?</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">We translate charity into accountable, youth-led infrastructure with verified local impact.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((value, idx) => {
              const Icon = value.icon;
              return (
                <InteractiveTiltCard key={idx} className="p-8 rounded-2xl bg-white dark:bg-dark-card border border-primary/5 dark:border-dark-border hover:border-accent/30 dark:hover:border-accent/40 shadow-lg shadow-primary/8 flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white mb-6 shadow-sm shadow-accent/30"><Icon size={22} /></div>
                  <h4 className="text-lg font-display font-extrabold text-primary dark:text-white mb-3">{value.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{value.description}</p>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-light-bg dark:bg-dark-bg border-t border-primary/5 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase">Ongoing Initiatives</span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-primary dark:text-white mt-1">Active Welfare Preview</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {previewProjects.map((project) => (
              <ParallaxProjectCard key={project.id} project={project} onClick={() => { window.location.hash = '#/projects'; }} />
            ))}
          </div>
          <div className="flex justify-center">
            <a href="#/projects" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-light dark:bg-accent dark:hover:bg-accent-light text-white dark:text-primary-dark font-extrabold text-sm uppercase tracking-wide rounded-full shadow-lg shadow-primary/20 dark:shadow-accent/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 group"><span>View All Projects</span><ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></a>
          </div>
        </div>
      </section>

      <AmbassadorsSection />
    </>
  );
}
