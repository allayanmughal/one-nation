import React from 'react';
import { motion } from 'framer-motion';
import { Send, Heart, MessageCircle, ExternalLink } from 'lucide-react';

// Custom local brand icon for Instagram
function Instagram({ size = 20, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function SocialProof() {
  const igPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500&q=80",
      likes: "342",
      comments: "18",
      caption: "Spreading smiles across KP. Today we finished our winter blanket drive in Abbottabad rural districts."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80",
      likes: "512",
      comments: "29",
      caption: "Educating young minds. Youth chapters conducting health and sanitization workshops in local schools."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=500&q=80",
      likes: "408",
      comments: "14",
      caption: "Unity is strength. A big thank you to all our collaborators who made the Haripur clean water plant a reality."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=500&q=80",
      likes: "289",
      comments: "11",
      caption: "Monthly grocery drives. Monitoring supply pipelines to ensure transparency and equal distribution."
    }
  ];

  return (
    <section id="social-proof" className="py-24 bg-gray-50 dark:bg-dark-bg/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
            Social Media Branding
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 dark:text-white mt-2 mb-4">
            Follow Our Active Journey
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            We document our field operations transparently. Connect with us on social media for live updates, stories of impact, and volunteer diaries.
          </p>
        </div>

        {/* Instagram Mock Profile Widget */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-3xl p-6 sm:p-8 mb-12 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start text-left">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-white dark:bg-dark-card p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-primary flex items-center justify-center p-1 border border-gray-100 dark:border-dark-border">
                  <img src="/logo.jpeg" alt="1Nation Logo" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
            <span className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full p-0.5 text-[8px] border border-white dark:border-dark-card font-extrabold flex items-center justify-center w-5 h-5">✓</span>
          </div>

          {/* Profile Data */}
          <div className="flex-grow space-y-4 w-full text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <h3 className="text-xl font-display font-extrabold text-gray-900 dark:text-white">@1nation_pk</h3>
              <a
                href="https://www.instagram.com/1nation_pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-primary dark:bg-accent hover:bg-primary-light dark:hover:bg-accent-light text-white dark:text-primary-dark text-xs font-bold rounded-lg transition-all active:scale-95 shadow-sm"
              >
                Follow
              </a>
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-8 border-t border-b border-gray-50 dark:border-dark-border/40 py-3 text-xs sm:text-sm">
              <div>
                <span className="font-extrabold text-gray-900 dark:text-white">1,248</span>{' '}
                <span className="text-gray-500 dark:text-gray-400 font-semibold">posts</span>
              </div>
              <div>
                <span className="font-extrabold text-gray-900 dark:text-white">25.6K</span>{' '}
                <span className="text-gray-500 dark:text-gray-400 font-semibold">followers</span>
              </div>
              <div>
                <span className="font-extrabold text-gray-900 dark:text-white">112</span>{' '}
                <span className="text-gray-500 dark:text-gray-400 font-semibold">following</span>
              </div>
            </div>

            {/* Bio info */}
            <div className="space-y-1.5 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
              <p className="font-black text-gray-900 dark:text-white">One Nation Pakistan</p>
              <p>🤝 Humanitarian & Social Welfare</p>
              <p>🌱 Environment • Health • Education</p>
              <p>🐾 Street Animal Welfare</p>
              <p>📍 Abbottabad, Pakistan</p>
            </div>

            {/* Hashtags display */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              {[
                '#OneNationPakistan',
                '#1NationPK',
                '#BeANationNotSeparation',
                '#HumanityFirst',
                '#YouthForChange',
                '#CommunityImpact',
                '#TogetherForPakistan',
                '#StreetAnimalsPakistan'
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded bg-gray-50 dark:bg-dark-bg/60 border border-gray-150 dark:border-dark-border text-[9px] sm:text-[10px] font-bold text-primary dark:text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Instagram Grid Mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {igPosts.map((post) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/1nation_pk/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * post.id }}
              className="group block relative aspect-square rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-dark-border cursor-pointer bg-gray-100"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={`Instagram Post ${post.id}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover Details Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white backdrop-blur-[2px]">
                {/* Top Instagram Brand indicator */}
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="flex items-center gap-1">
                    <Instagram size={14} />
                    @1nation_pk
                  </span>
                  <ExternalLink size={12} />
                </div>

                {/* Caption Snippet */}
                <p className="text-xs font-medium line-clamp-3 text-gray-200">
                  {post.caption}
                </p>

                {/* Likes / Comments Indicators */}
                <div className="flex items-center gap-4 text-sm font-bold pt-3 border-t border-white/20">
                  <span className="flex items-center gap-1">
                    <Heart size={16} className="fill-red-500 text-red-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={16} className="fill-white text-white" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Social CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/1nation_pk/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-extrabold text-sm uppercase tracking-wider rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-98 cursor-pointer"
          >
            <Instagram size={18} />
            <span>Follow on Instagram</span>
          </a>

          {/* WhatsApp Channel Button */}
          <a
            href="https://wa.me/923435707812"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20ba56] text-white font-extrabold text-sm uppercase tracking-wider rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-98 cursor-pointer"
          >
            <Send size={18} className="fill-current text-white" />
            <span>Join WhatsApp Wing</span>
          </a>
        </div>
      </div>
    </section>
  );
}
