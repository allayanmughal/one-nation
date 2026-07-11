import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Compass, Leaf, HeartHandshake, Users, Sparkles, Handshake } from 'lucide-react';

export default function Mission() {
  const missions = [
    {
      title: "Ethical Growth & Character Development",
      description: "We believe meaningful national change begins with the character of its people. Through ethical education, awareness programs, and leadership development initiatives, we strive to nurture honesty, integrity, empathy, respect, discipline, and responsible citizenship. Our mission is to groom the younger generation from the very basics—helping them understand the difference between right and wrong, good and bad, while building strong moral values, positive behaviour, and ethical leadership. By shaping character today, we are building stronger families, responsible citizens, and a better Pakistan for tomorrow.",
      icon: Compass,
      image: "/assets/ethical-growth-character-development.svg",
    },
    {
      title: "Nature Restoration & Climate Action",
      description: "We are committed to restoring Pakistan’s natural environment by promoting tree plantation, combating deforestation, and raising awareness about climate change and global warming. We believe that restoring forests means restoring wildlife, protecting biodiversity, improving air quality, conserving water resources, and creating a healthier future for generations to come. Through environmental education, community participation, and nationwide plantation campaigns, we aim to inspire every citizen to become a guardian of nature.",
      icon: Leaf,
      image: "/assets/nature-restoration-climate-action.svg",
    },
    {
      title: "Community Welfare & Humanitarian Relief",
      description: "We work to uplift vulnerable communities by providing food assistance, free medical camps, healthcare support, clean water initiatives, disaster relief, and essential humanitarian services. Our mission is to stand beside those in need, ensuring dignity, compassion, and hope reach every individual regardless of background or circumstance.",
      icon: HeartHandshake,
      image: "/assets/community-welfare-humanitarian-relief.svg",
    },
    {
      title: "Youth Leadership & Volunteerism",
      description: "We empower young people through leadership training, volunteer opportunities, skill development, internships, and civic engagement. By encouraging innovation, teamwork, and social responsibility, we prepare the next generation to become confident leaders and active contributors to Pakistan’s development.",
      icon: Users,
      image: "/assets/youth-leadership-volunteerism.svg",
    },
    {
      title: "Women Empowerment",
      description: "We believe empowered women build empowered communities. Through education, vocational training, entrepreneurship, financial independence, leadership development, and awareness initiatives, we strive to create equal opportunities where women can thrive with confidence, dignity, and purpose.",
      icon: Sparkles,
      image: "/assets/women-empowerment.svg",
    },
    {
      title: "Collaboration for National Impact",
      description: "Lasting change is only possible through collective action. We collaborate with educational institutions, healthcare organizations, NGOs, government departments, corporate partners, and local communities to maximize resources, strengthen impact, and create sustainable solutions for Pakistan’s future.",
      icon: Handshake,
      image: "/assets/collaboration-for-national-impact.svg",
    }
  ];

  const pipelineStages = [
    {
      step: "01",
      title: "Ethical Awareness",
      desc: "Building strong values, positive behaviour, and responsible citizenship."
    },
    {
      step: "02",
      title: "Community Assessment",
      desc: "Understanding local challenges and identifying genuine needs."
    },
    {
      step: "03",
      title: "Strategic Planning",
      desc: "Designing sustainable and measurable solutions."
    },
    {
      step: "04",
      title: "Volunteer Mobilization",
      desc: "Training and deploying skilled volunteers and leaders."
    },
    {
      step: "05",
      title: "Project Execution",
      desc: "Implementing impactful initiatives with transparency."
    },
    {
      step: "06",
      title: "Impact & Sustainability",
      desc: "Measuring results, empowering communities, and ensuring long-term positive change."
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
    <section id="mission" className="py-24 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase"
          >
            Our Mission Pillars
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-black dark:text-white mt-2 mb-6"
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

        {/* Mission cards grid */}
        <div className="mb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8"
          >
            {missions.slice(0, 3).map((mission, idx) => {
              const Icon = mission.icon;

              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="group relative surface-card dark:bg-dark-card rounded-3xl overflow-hidden border border-primary/5 dark:border-dark-border hover:border-accent/40 dark:hover:border-accent/40 shadow-lg shadow-primary/8 dark:shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <img
                      src={mission.image}
                      alt={mission.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/mission-placeholder.svg';
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/70 text-[11px] font-bold uppercase tracking-[0.24em] text-primary dark:text-white">
                      {mission.title}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col h-full">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-display font-extrabold text-primary dark:text-white mb-4 leading-tight group-hover:text-accent dark:group-hover:text-accent transition-colors duration-200">
                      {mission.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                      {mission.description}
                    </p>
                    <div className="mt-8 h-1 w-12 bg-gray-200 dark:bg-gray-800 rounded group-hover:w-full group-hover:bg-accent transition-all duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {missions.slice(3).map((mission, idx) => {
              const Icon = mission.icon;

              return (
                <motion.div
                  key={idx + 3}
                  variants={cardVariants}
                  className="group relative surface-card dark:bg-dark-card rounded-3xl overflow-hidden border border-primary/5 dark:border-dark-border hover:border-accent/40 dark:hover:border-accent/40 shadow-lg shadow-primary/8 dark:shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <img
                      src={mission.image}
                      alt={mission.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/mission-placeholder.svg';
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/70 text-[11px] font-bold uppercase tracking-[0.24em] text-primary dark:text-white">
                      {mission.title}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col h-full">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-display font-extrabold text-primary dark:text-white mb-4 leading-tight group-hover:text-accent dark:group-hover:text-accent transition-colors duration-200">
                      {mission.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                      {mission.description}
                    </p>
                    <div className="mt-8 h-1 w-12 bg-gray-200 dark:bg-gray-800 rounded group-hover:w-full group-hover:bg-accent transition-all duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Expansion Section A: Execution pipeline flow */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-accent dark:text-accent uppercase">
              How We Work
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-black dark:text-white mt-1">
              OUR OPERATIONAL MODEL
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              A clear pathway from awareness to lasting impact through ethical action and community-led change.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pipelineStages.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 * idx }}
                className="surface-card dark:bg-dark-card border border-primary/5 dark:border-dark-border p-6 rounded-2xl relative shadow-lg shadow-primary/8 dark:shadow-sm"
              >
                <span className="text-xs font-bold text-accent dark:text-accent font-brand tracking-widest block mb-2">
                  STAGE {stage.step}
                </span>
                <h4 className="text-base font-display font-extrabold text-primary dark:text-white mb-2 leading-tight">
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
