import React from 'react';
import { motion } from 'framer-motion';
import { Flag, HeartHandshake, Flame, Building2, Eye, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

export default function Mission() {
  const pillars = [
    {
      title: "National Unity & Social Cohesion",
      description: "Fostering solidarity across diverse cultural, linguistic, and regional groups to champion one Pakistani identity, as encapsulated by our tagline: 'Be a Nation, Not Separation.'",
      icon: Flag,
    },
    {
      title: "Community Welfare & Support",
      description: "Deploying targeted humanitarian relief, food drives, basic healthcare setups, and clean water schemes to underserved districts, supporting families in times of critical need.",
      icon: HeartHandshake,
    },
    {
      title: "Youth Empowerment",
      description: "Mobilizing and training high school and university volunteers, equipping them with leadership, crisis management, and community organizing skills to lead future campaigns.",
      icon: Flame,
    },
    {
      title: "Institutional Collaboration",
      description: "Partnering with government welfare bureaus, private CSR initiatives, and local NGOs to streamline distribution networks and maximize the reach of social aid programs.",
      icon: Building2,
    }
  ];

  const pipelineStages = [
    {
      step: "01",
      title: "Needs Assessment",
      desc: "Field coordinators survey target union councils and coordinate with local elders to build verified recipient logs."
    },
    {
      step: "02",
      title: "Direct Procurement",
      desc: "Rations and equipment are sourced directly from manufacturers to avoid middleman inflation and maximize resource utility."
    },
    {
      step: "03",
      title: "Youth Deployment",
      desc: "Our college and university volunteer wing is mobilized to coordinate and run the field distribution points."
    },
    {
      step: "04",
      title: "Audited Logging",
      desc: "We perform GPS-tagged verification and update the records immediately to ensure transparent tracking."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="mission" className="py-24 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase"
          >
            Our Mission Pillars
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-gray-900 dark:text-white mt-2 mb-6"
          >
            The Foundations of Our Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400"
          >
            We operate under structured principles designed to build a unified front against adversity, ensuring every project directly empowers Pakistani citizens.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="group relative bg-gray-50 dark:bg-dark-card rounded-3xl p-8 border border-gray-100 dark:border-dark-border overflow-hidden hover:border-accent/30 dark:hover:border-accent/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col h-full"
              >
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/5 dark:bg-accent/5 rounded-full blur-xl group-hover:scale-[3] transition-transform duration-500 pointer-events-none" />
                <div className="mb-6 w-14 h-14 rounded-2xl bg-primary/10 dark:bg-accent/10 flex items-center justify-center text-primary dark:text-accent group-hover:bg-primary group-hover:text-white dark:group-hover:bg-accent dark:group-hover:text-primary-dark transition-all duration-300 shadow-sm">
                  <IconComponent size={24} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-display font-extrabold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-primary dark:group-hover:text-accent transition-colors duration-200">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                  {pillar.description}
                </p>
                <div className="mt-8 h-1 w-12 bg-gray-200 dark:bg-gray-800 rounded group-hover:w-full group-hover:bg-accent transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Expansion Section A: Execution pipeline flow */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
              How We Work
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white mt-1">
              Our Distribution Pipeline
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              A structured lifecycle that governs the allocation and deployment of all aid materials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pipelineStages.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 * idx }}
                className="bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 rounded-2xl relative"
              >
                <span className="text-xs font-bold text-primary dark:text-accent font-brand tracking-widest block mb-2">
                  STAGE {stage.step}
                </span>
                <h4 className="text-base font-display font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
                  {stage.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {stage.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expansion Section B: Philosophy tagline banner */}
        <div className="bg-primary-dark text-white rounded-[2.5rem] border border-white/5 overflow-hidden relative p-8 sm:p-12">
          {/* Glowing rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-accent font-extrabold text-[10px] uppercase tracking-widest rounded-full mb-6">
              <Eye size={12} />
              Tagline Philosophy
            </span>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black leading-tight mb-6">
              "Be a Nation, Not Separation"
            </h3>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl mb-8">
              At 1 Nation Pakistan, we believe that community service has the power to dissolve divisions. When students from different regional and cultural backgrounds stand shoulder-to-shoulder handing out flour rations or clean water canisters, they cease to identify with their separation. They stand united as one nation.
            </p>

            <a
              href="#/get-involved"
              className="px-6 py-3.5 bg-accent hover:bg-accent-light text-primary-dark font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              Join Our Chapters
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
