import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ShieldAlert, Heart, Calendar } from 'lucide-react';

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

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-dark-bg/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase"
            >
              Who We Are
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-gray-900 dark:text-white mt-2 mb-6"
            >
              Uniting Hearts for a Stronger, More Prosperous Pakistan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
            >
              Founded on the principle of national integrity and social welfare, **1 Nation Pakistan** is a dedicated movement designed to bridge gaps between communities. We aim to cultivate volunteerism among youth, build resilient community infrastructure, and collaborate with institutions to deliver food, healthcare, and education to underserved regions.
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm"
                >
                  <div className="text-3xl sm:text-4xl font-brand font-bold text-primary dark:text-accent mb-2">
                    <CountUp to={stat.count} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Patron Highlight Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full max-w-md bg-white dark:bg-dark-card rounded-3xl border border-gray-100 dark:border-dark-border shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              {/* Decorative Accent Ring */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/5 rounded-full blur-xl pointer-events-none" />

              {/* Card Banner Header */}
              <div className="h-4 bg-gradient-to-r from-primary to-accent" />

              <div className="p-8 flex flex-col items-center text-center">
                {/* Styled Profile Portrait Placeholder (Factual Statesman silhouette) */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary/10 to-accent/20 flex items-center justify-center p-1 border-2 border-accent/30 shadow-md">
                    <div className="w-full h-full rounded-full bg-primary-dark flex items-center justify-center overflow-hidden">
                      <svg className="w-20 h-20 text-gray-400 mt-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  </div>
                  {/* Badge */}
                  <span className="absolute bottom-1 right-1 bg-accent text-primary-dark font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    PATRON
                  </span>
                </div>

                {/* Profile info */}
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-gray-900 dark:text-white mb-1">
                  Mushtaq Ahmed Ghani
                </h3>
                <p className="text-xs font-bold text-primary dark:text-accent tracking-wide uppercase mb-4">
                  Chief Patron & Advisor
                </p>

                {/* Meta details */}
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

                <hr className="w-full border-gray-100 dark:border-dark-border mb-6" />

                {/* bio statement */}
                <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  "A veteran lawmaker and public servant representing Abbottabad. Having served as Speaker of the Khyber Pakhtunkhwa Assembly, he guides our welfare vision to ensure transparency, structured growth, and collaboration with national and provincial institutions."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
