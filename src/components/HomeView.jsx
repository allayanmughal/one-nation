import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flag, HeartHandshake, ShieldCheck, Compass, MessageSquare, Users, Sparkles, Heart } from 'lucide-react';
import Hero from './Hero';

export default function HomeView({ projects }) {
  // Take first 3 projects as a preview
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

  const campaignMetrics = [
    { name: "Ration Distribution Drive", target: "1,500 Families", reached: "1,500 Families", percent: 100, status: "Completed" },
    { name: "RO Clean Water Filtration Plants", target: "5 Plants", reached: "3 Plants", percent: 60, status: "Active" },
    { name: "Winter Blanket Campaigns", target: "1,000 Households", reached: "850 Households", percent: 85, status: "Active" }
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
    <div className="relative overflow-hidden bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Mission Teaser Banner */}
      <section className="py-20 bg-gray-50/50 dark:bg-dark-bg/20 border-t border-b border-gray-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* 3. Expanded Section A: Why 1 Nation Pakistan (Value Proposition Grid) */}
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
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="p-8 rounded-3xl bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border hover:border-accent/30 dark:hover:border-accent/40 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all flex flex-col items-start"
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Expanded Section B: Field Campaign Target Progress */}
      <section className="py-20 bg-gray-50/50 dark:bg-dark-bg/20 border-t border-b border-gray-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
                Audited Targets
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white mt-1 mb-4 leading-tight">
                Live Campaign Metrics
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Our operations team sets concrete, quarterly target lines. Here is the current progress of our major drives across Abbottabad and Haripur.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-primary-glow dark:bg-accent-glow text-primary dark:text-accent border border-primary/10 dark:border-accent/15">
                <Sparkles size={12} className="animate-pulse" />
                <span>Audited on 1 Nation Admin Panel</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {campaignMetrics.map((metric, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-gray-900 dark:text-white">{metric.name}</span>
                    <span className="text-primary dark:text-accent">{metric.reached} / {metric.target}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-3 bg-gray-100 dark:bg-dark-bg/80 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 * idx }}
                      className="h-full bg-gradient-to-r from-primary to-primary-light dark:from-accent-dark dark:to-accent rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[10px] font-semibold text-gray-400">
                    <span>{metric.percent}% Completed</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${metric.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{metric.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Projects Preview */}
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
              <div
                key={project.id}
                className="group bg-white dark:bg-dark-card rounded-3xl overflow-hidden border border-gray-100 dark:border-dark-border hover:border-accent/20 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
                onClick={() => {
                  window.location.hash = '#/projects';
                }}
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase shadow-sm ${project.status.toLowerCase() === 'ongoing' ? 'bg-amber-600' : 'bg-primary'
                      }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Quick Links Navigation Grid */}
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
                <a
                  key={idx}
                  href={link.hash}
                  className={`group block p-6 rounded-3xl bg-gradient-to-br border border-gray-100 dark:border-dark-border/40 hover:scale-[1.02] shadow-sm hover:shadow-md transition-all duration-300 ${link.color}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-dark-card flex items-center justify-center mb-4 shadow-sm text-current">
                    <IconComponent size={22} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-base font-display font-extrabold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    {link.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
