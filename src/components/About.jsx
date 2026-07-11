import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Calendar, ArrowRight, ShieldCheck, Compass, CheckCircle2, Heart } from 'lucide-react';
import LeadershipModal from './LeadershipModal';

const mushtaqGhaniPhoto = "/assets/mushtaq_ghani.jpg";
const harmainGhaniPhoto = "/assets/harmain_ghani.jpg";

const MUSHTAQ_SOCIAL = [
  { icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/mgptiofficial' },
  { icon: 'x', label: 'X', href: 'https://x.com/MushtaqGhaniPTI' },
  { icon: 'wikipedia', label: 'Wikipedia', href: 'https://en.wikipedia.org/wiki/Mushtaq_Ahmed_Ghani' },
];

const HARMAIN_SOCIAL = [
  { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/harmain.ghani_official/' },
  { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/harmain-ghani-a88561246' },
  { icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/ghaniharmain' },
];

function SocialIcon({ type, size = 18, className = '' }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor', className };
  switch (type) {
    case 'facebook':
      return <svg {...props}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
    case 'instagram':
      return <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>;
    case 'linkedin':
      return <svg {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
    case 'x':
      return <svg {...props}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
    case 'wikipedia':
      return <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 8c1.5 2 3 4 4 8 1-4 2.5-6 4-8M9 16h6" /></svg>;
    default:
      return null;
  }
}

// Reusable CountUp component with cubic ease-out
function CountUp({ to, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    // Extract numbers only
    const end = parseInt(to.replace(/[^0-9]/g, ''));
    if (isNaN(end)) return;

    let animationFrameId;
    const startTime = performance.now();

    const updateCount = (now) => {
      const elapsed = (now - startTime) / 1000;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        // Ease out quad
        const easeOut = progress * (2 - progress);
        setCount(Math.floor(easeOut * end));
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function About() {
  const [leadershipModal, setLeadershipModal] = useState(null);
  const stats = [
    { label: "Volunteers", count: "200", suffix: "+" },
    { label: "Projects", count: "6", suffix: "+" },
    { label: "Cities", count: "2", suffix: "" },
    { label: "Lives Impacted", count: "83320", suffix: "+" }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Building the Foundation",
      desc: "We laid the foundation of One Nation Pakistan by promoting youth engagement, community connection, and positive social interaction through events like Azadi Fest, Winter Fest, and educational collaborations."
    },
    {
      year: "2025",
      title: "Community Relief & Social Impact",
      desc: "Our mission expanded toward humanitarian service, delivering food assistance, medical support, and community welfare initiatives that positively impacted 80,000+ individuals."
    },
    {
      year: "2026",
      title: "Expanding Sustainable Impact",
      desc: "We launched flagship initiatives in healthcare, environmental conservation, animal welfare, women empowerment, and Ethical Growth, building a stronger and more sustainable future for communities across Pakistan."
    }
  ];

  const commitments = [
    {
      title: "Transparency & Accountability",
      desc: "We uphold the highest standards of integrity by ensuring responsible use of resources, ethical governance, and transparency in all our operations.",
      icon: ShieldCheck
    },
    {
      title: "Compassionate Service",
      desc: "We serve communities with empathy and dignity, delivering humanitarian relief, healthcare, education, and social support where it is needed most.",
      icon: Heart
    },
    {
      title: "Ethical Growth & Sustainable Impact",
      desc: "We empower individuals through ethical leadership, environmental responsibility, and community-driven initiatives that create lasting positive change.",
      icon: Compass
    },
    {
      title: "Community Empowerment",
      desc: "We believe lasting change comes from empowered communities. By engaging youth, volunteers, and local partners, we build solutions that create sustainable impact.",
      icon: CheckCircle2
    }
  ];

  return (
    <section id="about" className="py-24 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Grid & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase"
            >
              Who We Are
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-black dark:text-white mt-2 mb-6"
            >
              Uniting Hearts for a Stronger, More Prosperous Pakistan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              Founded on the principle of national integrity and social welfare, <strong>1 Nation Pakistan</strong> is a dedicated movement designed to bridge gaps between communities. We aim to cultivate volunteerism among youth, build resilient community infrastructure, and collaborate with institutions to deliver food, healthcare, and education to underserved regions.
            </motion.p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="surface-card dark:bg-dark-card p-6 rounded-2xl border border-primary/5 dark:border-dark-border shadow-lg shadow-primary/8 dark:shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl sm:text-4xl font-brand font-bold text-black dark:text-white mb-2">
                  <CountUp to={stat.count} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expansion Section A: Milestones & Roadmap */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase">
              Our Journey
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-primary dark:text-white mt-1">
              Development Milestones
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * idx, duration: 0.5 }}
                className="surface-card dark:bg-dark-card rounded-3xl p-8 border border-primary/5 dark:border-dark-border shadow-lg shadow-primary/8 dark:shadow-sm relative group hover:shadow-xl transition-all"
              >
                <span className="text-4xl sm:text-5xl font-brand font-black text-primary/10 dark:text-accent/15 absolute top-6 right-6 transition-colors group-hover:text-accent/20">
                  {milestone.year}
                </span>
                <span className="text-xs font-bold text-accent dark:text-accent uppercase tracking-widest mb-4 block">
                  Phase {idx + 1}
                </span>
                <h4 className="text-xl font-display font-extrabold text-black dark:text-white mb-3">
                  {milestone.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {milestone.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expansion Section B: Our Commitments */}
        <div className="mb-24 py-16 surface-card dark:bg-dark-card/30 border border-primary/5 dark:border-dark-border/40 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-lg shadow-primary/8 dark:shadow-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 self-center">
              <span className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase">
                Transparency & Governance
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-black dark:text-white mt-1 mb-4 leading-tight">
                Our Core Promises
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                We believe that trust is the currency of charity. Our operations adhere to strict governance rules to guarantee maximum local impact.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {commitments.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl surface-card dark:bg-dark-card border border-primary/5 dark:border-dark-border shadow-lg shadow-primary/8 dark:shadow-md flex flex-col items-start"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent dark:rounded-xl dark:bg-accent/15 flex items-center justify-center text-white dark:text-accent mb-4 shadow-sm shadow-accent/30 dark:shadow-sm">
                      <Icon size={20} />
                    </div>
                    <h4 className="text-base font-display font-extrabold text-primary dark:text-white mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="mt-24 pt-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase">
              Our Leadership
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-primary dark:text-white mt-1">
              Visionaries Behind 1 Nation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto items-stretch">
            {/* Mushtaq Ghani Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              onClick={() => setLeadershipModal('executive')}
              className="surface-card dark:bg-dark-card rounded-3xl border-2 border-transparent hover:border-accent/40 dark:hover:border-accent/30 shadow-lg hover:shadow-2xl relative overflow-hidden group transition-all duration-300 flex flex-col h-full cursor-pointer"
            >
              <div className="h-4 bg-gradient-to-r from-primary to-accent" />
              <div className="p-8 flex flex-col items-center text-center flex-1 h-full">
                <div className="relative mb-6 shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary/10 to-accent/20 flex items-center justify-center p-1 border-2 border-accent/30 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-primary-dark overflow-hidden">
                      <img src={mushtaqGhaniPhoto} alt="Mushtaq Ahmed Ghani" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-primary-dark font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow whitespace-nowrap">Patron</span>
                </div>

                <h4 className="text-xl font-display font-extrabold text-primary dark:text-white mb-1 shrink-0">Mushtaq Ahmed Ghani</h4>
                <p className="text-xs font-bold text-primary dark:text-accent tracking-wide uppercase mb-4 shrink-0 min-h-[2.5rem] flex items-center justify-center">Patron & Chief of One Nation Pakistan</p>

                <div className="flex flex-wrap justify-center gap-2 mb-4 min-h-[4.5rem] items-center shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 dark:bg-primary/20 text-primary dark:text-white uppercase">
                    <Award size={10} className="text-accent" /> MPA & Health Committee Chairman
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-accent/15 text-accent-dark dark:text-accent uppercase">
                    <Calendar size={10} /> Speaker KP Assembly (2018–2023)
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-grow mb-0">
                  A distinguished public servant and education pioneer. Former Minister for Higher Education & Information (2013–2018) and Speaker of the KP Assembly (2018–2023). Founder of Pine Hills Education System (est. 1984), serving as Chief Patron & Chairman.
                </p>

                <div className="mt-auto w-full pt-6 shrink-0">
                  <div className="flex flex-wrap items-center justify-center gap-2 min-h-[2.25rem] mb-4" onClick={(e) => e.stopPropagation()}>
                    {MUSHTAQ_SOCIAL.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} aria-label={s.label} className="p-2.5 rounded-full bg-primary/10 hover:bg-accent/20 text-primary dark:text-accent border border-primary/10 hover:scale-110 transition-all"><SocialIcon type={s.icon} /></a>
                    ))}
                  </div>
                  <div className="w-full pt-3 border-t border-primary/10 dark:border-dark-border flex items-center justify-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wide opacity-70 group-hover:opacity-100 transition-opacity">
                    View Executive Body <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => setLeadershipModal('organizing')}
              className="surface-card dark:bg-dark-card rounded-3xl border-2 border-transparent hover:border-accent/40 dark:hover:border-accent/30 shadow-lg hover:shadow-2xl relative overflow-hidden group transition-all duration-300 flex flex-col h-full cursor-pointer"
            >
              <div className="h-4 bg-gradient-to-r from-accent to-primary" />
              <div className="p-8 flex flex-col items-center text-center flex-1 h-full">
                <div className="relative mb-6 shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary/10 to-accent/20 flex items-center justify-center p-1 border-2 border-accent/30 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-primary-dark overflow-hidden">
                      <img src={harmainGhaniPhoto} alt="Dr. Harmain Ghani" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-primary-dark font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow whitespace-nowrap">Founder & CEO</span>
                </div>

                <h4 className="text-xl font-display font-extrabold text-primary dark:text-white mb-1 shrink-0">Dr. Harmain Ghani</h4>
                <p className="text-xs font-bold text-primary dark:text-accent tracking-wide uppercase mb-4 shrink-0 min-h-[2.5rem] flex items-center justify-center">Founder & CEO of One Nation Pakistan</p>

                <div className="flex flex-col items-center gap-2 mb-4 min-h-[4.5rem] justify-center shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 dark:bg-primary/20 text-primary dark:text-white uppercase">
                    <Award size={10} className="text-accent" /> Executive Director, Pine Hills Education System
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-accent/15 text-accent-dark dark:text-accent uppercase">
                    <Calendar size={10} /> Clinical Pharmacist & Youth Leader
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-grow mb-0">
                Founder & CEO of One Nation Pakistan and Executive Director of Pine Hills Education System. Clinical Pharmacist, Social Entrepreneur, Philanthropist, Humanitarian, and Youth Leader dedicated to serving communities across Pakistan.
                </p>

                <div className="mt-auto w-full pt-6 shrink-0">
                  <div className="flex flex-wrap items-center justify-center gap-2 min-h-[2.25rem] mb-4" onClick={(e) => e.stopPropagation()}>
                    {HARMAIN_SOCIAL.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} aria-label={s.label} className="p-2.5 rounded-full bg-primary/10 hover:bg-accent/20 text-primary dark:text-accent border border-primary/10 hover:scale-110 transition-all"><SocialIcon type={s.icon} /></a>
                    ))}
                  </div>
                  <div className="w-full pt-3 border-t border-primary/10 dark:border-dark-border flex items-center justify-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wide opacity-70 group-hover:opacity-100 transition-opacity">
                    View Organizing Body <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <LeadershipModal isOpen={leadershipModal === 'executive'} onClose={() => setLeadershipModal(null)} type="executive" />
        <LeadershipModal isOpen={leadershipModal === 'organizing'} onClose={() => setLeadershipModal(null)} type="organizing" />
      </div>
    </section>
  );
}
