import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ShieldAlert, Heart, Calendar, ArrowRight, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';
import mushtaqGhaniPhoto from '../assets/mushtaq_ghani.jpg';
import harmainGhaniPhoto from '../assets/harmain_ghani.jpg';

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
  const stats = [
    { label: "Volunteers Onboarded", count: "1200", suffix: "+" },
    { label: "Active Welfare Projects", count: "15", suffix: "+" },
    { label: "Cities Supported", count: "8", suffix: "" },
    { label: "Lives Impacted", count: "50000", suffix: "+" }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Foundational Roots",
      desc: "Conceived the welfare framework in Abbottabad, mobilizing the first 50 university students to coordinate local relief drives."
    },
    {
      year: "2025",
      title: "Regional Mobilization",
      desc: "Expanded volunteer wings to Haripur, Mansehra, and Peshawar. Launched mobile health checkup camps in remote tribal villages."
    },
    {
      year: "2026",
      title: "Nationwide Scaling",
      desc: "Launched large-scale clean water filtration plant installations and secured corporate CSR alignment for sustainable impact."
    }
  ];

  const commitments = [
    {
      title: "100% Financial Auditing",
      desc: "Every rupee received is audited and transparently accounted for, with field distribution video reports shared directly with sponsors.",
      icon: ShieldCheck
    },
    {
      title: "Youth Leadership Framework",
      desc: "We train our student chapters in crisis management, logistics, and ground leadership to empower the next generation of changemakers.",
      icon: Compass
    },
    {
      title: "Elders & Local Alignment",
      desc: "We coordinate with local village councils (Jirgas) and community leaders to perform thorough needs assessments before allocating relief packs.",
      icon: Heart
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
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-accent dark:text-white mt-2 mb-6"
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
              Founded on the principle of national integrity and social welfare, **1 Nation Pakistan** is a dedicated movement designed to bridge gaps between communities. We aim to cultivate volunteerism among youth, build resilient community infrastructure, and collaborate with institutions to deliver food, healthcare, and education to underserved regions.
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
                <div className="text-3xl sm:text-4xl font-brand font-bold text-accent dark:text-accent mb-2">
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
                <h4 className="text-xl font-display font-extrabold text-accent dark:text-white mb-3">
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
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-accent dark:text-white mt-1 mb-4 leading-tight">
                Our Core Promises
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                We believe that trust is the currency of charity. Our operations adhere to strict governance rules to guarantee maximum local impact.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
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
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
              Our Leadership
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-primary dark:text-white mt-1">
              Visionaries Behind 1 Nation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto items-stretch">
            {/* Patron Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="surface-card dark:bg-dark-card rounded-3xl border border-primary/5 dark:border-dark-border shadow-lg shadow-primary/8 dark:shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
              <div className="h-4 bg-gradient-to-r from-primary to-accent" />

              <div className="p-8 flex flex-col items-center text-center flex-grow justify-between">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary/10 to-accent/20 flex items-center justify-center p-1 border-2 border-accent/30 shadow-md">
                      <div className="w-full h-full rounded-full bg-primary-dark flex items-center justify-center overflow-hidden">
                        <img
                          src={mushtaqGhaniPhoto}
                          alt="Mushtaq Ahmed Ghani"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 bg-accent text-primary-dark font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                      PATRON
                    </span>
                  </div>

                  <h4 className="text-xl font-display font-extrabold text-primary dark:text-white mb-1">
                    Mushtaq Ahmed Ghani
                  </h4>
                  <p className="text-xs font-bold text-primary dark:text-accent tracking-wide uppercase mb-4">
                    Chief Patron & Advisor
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 dark:bg-primary/20 text-primary dark:text-white uppercase">
                      <Award size={10} className="text-accent" />
                      KP Assembly Member
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-accent/15 text-accent-dark dark:text-accent uppercase">
                      <Calendar size={10} />
                      Speaker (2018-2024)
                    </span>
                  </div>

                  <hr className="w-full border-primary/5 dark:border-dark-border mb-6" />

                  <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed mb-6">
                    "A veteran lawmaker and public servant representing Abbottabad. Having served as Speaker of the Khyber Pakhtunkhwa Assembly, he guides our welfare vision to ensure transparency, structured growth, and collaboration with national and provincial institutions."
                  </p>
                </div>

                <a
                  href="https://en.wikipedia.org/wiki/Mushtaq_Ahmed_Ghani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white hover:bg-accent/5 dark:bg-dark-bg/60 dark:hover:bg-dark-bg text-xs font-bold text-primary dark:text-accent rounded-xl border border-primary/10 dark:border-dark-border transition-colors hover:scale-[1.01] active:scale-95 shadow-sm cursor-pointer"
                >
                  Read Biography on Wikipedia
                </a>
              </div>
            </motion.div>

            {/* Harmain Ghani Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="surface-card dark:bg-dark-card rounded-3xl border border-primary/5 dark:border-dark-border shadow-lg shadow-primary/8 dark:shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
              <div className="h-4 bg-gradient-to-r from-accent to-primary" />

              <div className="p-8 flex flex-col items-center text-center flex-grow justify-between">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary/10 to-accent/20 flex items-center justify-center p-1 border-2 border-accent/30 shadow-md">
                      <div className="w-full h-full rounded-full bg-primary-dark flex items-center justify-center overflow-hidden">
                        <img
                          src={harmainGhaniPhoto}
                          alt="Harmain Ghani"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 bg-accent text-primary-dark font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                      CO-FOUNDER
                    </span>
                  </div>

                  <h4 className="text-xl font-display font-extrabold text-primary dark:text-white mb-1">
                    Harmain Ghani
                  </h4>
                  <p className="text-xs font-bold text-primary dark:text-accent tracking-wide uppercase mb-4">
                    Co-Founder & Executive Director
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 dark:bg-primary/20 text-primary dark:text-white uppercase">
                      <Award size={10} className="text-accent" />
                      Executive Director
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-accent/15 text-accent-dark dark:text-accent uppercase">
                      <Calendar size={10} />
                      Operations Lead
                    </span>
                  </div>

                  <hr className="w-full border-primary/5 dark:border-dark-border mb-6" />

                  <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed mb-6">
                    "As the Co-Founder and Executive Director, Harmain drives the organizational strategy, youth coordination wings, and ground execution. She ensures transparent distribution loops, coordinates medical camps, and leads regional disaster relief programs across Khyber Pakhtunkhwa."
                  </p>
                </div>

                <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 max-w-[250px] mt-4">
                  (Executive Member of 1 Nation Pakistan)
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
