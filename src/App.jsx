import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowUp, CheckCircle2, Phone, Heart } from 'lucide-react';

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

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Mission from './components/Mission';
import Projects from './components/Projects';
import GetInvolved from './components/GetInvolved';
import SocialProof from './components/SocialProof';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import Logo from './components/Logo';

// SEED DATA FOR DEMO RUNS
const SEED_PROJECTS = [
  {
    id: 1,
    title: "Ration Distribution Drive",
    location: "Abbottabad & Mansehra",
    date: "March 2026",
    status: "Completed",
    description: "Provided essential food rations and grocery supplies to over 1,500 families affected by inflation.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    details: "The ration packs were distributed transparently across two distribution points in KP. Each pack contained flour, ghee, sugar, pulses, tea, and dry milk. Volunteers monitored the list via local coordinators."
  },
  {
    id: 2,
    title: "Clean Water Filtration Plant",
    location: "Haripur Rural Districts",
    date: "June 2026",
    status: "Ongoing",
    description: "Installing reverse osmosis water filtration plants to supply clean drinking water to 5,000 residents.",
    image: "https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&w=800&q=80",
    details: "This project addresses critical arsenic and fluoride contamination in drinking water sources in Haripur's outskirts. Construction is complete, and we are currently assembling the filtration membranes and testing purity."
  },
  {
    id: 3,
    title: "Winter Aid Campaign",
    location: "Galyat & Kaghan Valley",
    date: "January 2026",
    status: "Completed",
    description: "Distributed heavy blankets, warm clothing, and fuel supplies to high-altitude mountain communities.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    details: "High-altitude winter conditions severely impact low-income families. Our team coordinated with regional volunteers to distribute 500+ blanket packs, fleece jackets, and fuel logs to the Galyat region."
  },
  {
    id: 4,
    title: "Youth Leadership Seminar",
    location: "Peshawar Universities",
    date: "October 2026",
    status: "Ongoing",
    description: "Creating advocacy chapters to train student leaders in disaster relief, first aid, and community service.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    details: "Empowering youth is core to 1 Nation. These chapters conduct emergency response workshops, blood donation camps, and local fundraising drives, mobilizing over 400 ambassadors in three major universities."
  },
  {
    id: 5,
    title: "Mobile Health Clinics",
    location: "KP Tribal Districts",
    date: "November 2026",
    status: "Ongoing",
    description: "Equipping specialized medical vans with basic diagnostics and medicines to travel to remote villages.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    details: "Rural communities in remote valleys lack clinics. Mobile Health Clinic vans will operate weekly, staffed with volunteer physicians, delivering essential maternal care, pediatric checkups, and free medicines."
  }
];

const SEED_VOLUNTEERS = [
  {
    fullName: "Muhammad Ali",
    email: "ali@gmail.com",
    phone: "03214567890",
    city: "Abbottabad",
    notes: "Interested in organizing youth drives. Former red crescent volunteer."
  },
  {
    fullName: "Ayesha Khan",
    email: "ayesha@yahoo.com",
    phone: "03339876543",
    city: "Peshawar",
    notes: "Medical student, can assist in healthcare camps."
  }
];

const SEED_INQUIRIES = [
  {
    name: "Bilal Shah",
    email: "bilal@gmail.com",
    subject: "Partnership in Swat",
    message: "We would love to coordinate a food relief drive in Swat. Please send details."
  },
  {
    name: "Sana Malik",
    email: "sana@corp.com",
    subject: "CSR Alignment Request",
    message: "On behalf of Malik Foundations, we want to align our annual CSR budget with your RO filtration setups."
  }
];

const SEED_NEWSLETTERS = [
  "sub1@welfare.org",
  "sub2@nation.pk"
];

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'admin'
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Global State (Dynamic and Sync'd with local storage)
  const [projects, setProjects] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Footer newsletter submission state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Local Storage and Theme Initialization
  useEffect(() => {
    // 1. Projects
    const localProjects = localStorage.getItem('one_nation_projects');
    if (localProjects) {
      setProjects(JSON.parse(localProjects));
    } else {
      setProjects(SEED_PROJECTS);
      localStorage.setItem('one_nation_projects', JSON.stringify(SEED_PROJECTS));
    }

    // 2. Volunteers
    const localVolunteers = localStorage.getItem('one_nation_volunteers');
    if (localVolunteers) {
      setVolunteers(JSON.parse(localVolunteers));
    } else {
      setVolunteers(SEED_VOLUNTEERS);
      localStorage.setItem('one_nation_volunteers', JSON.stringify(SEED_VOLUNTEERS));
    }

    // 3. Contact Inquiries
    const localInquiries = localStorage.getItem('one_nation_inquiries');
    if (localInquiries) {
      setInquiries(JSON.parse(localInquiries));
    } else {
      setInquiries(SEED_INQUIRIES);
      localStorage.setItem('one_nation_inquiries', JSON.stringify(SEED_INQUIRIES));
    }

    // 4. Newsletter
    const localNews = localStorage.getItem('one_nation_newsletters');
    if (localNews) {
      setNewsletters(JSON.parse(localNews));
    } else {
      setNewsletters(SEED_NEWSLETTERS);
      localStorage.setItem('one_nation_newsletters', JSON.stringify(SEED_NEWSLETTERS));
    }

    // 5. Theme Sync
    const isDark = localStorage.getItem('one_nation_dark_mode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 6. Scroll indicator trigger
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Sync Dark Mode class when toggled
  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    localStorage.setItem('one_nation_dark_mode', String(nextDark));
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Callback handlers for submissions
  const handleVolunteerRegister = (newVolunteer) => {
    const updated = [newVolunteer, ...volunteers];
    setVolunteers(updated);
    localStorage.setItem('one_nation_volunteers', JSON.stringify(updated));
  };

  const handleContactSubmit = (newInquiry) => {
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('one_nation_inquiries', JSON.stringify(updated));
  };

  // Footer Newsletter submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    const updated = [newsletterEmail, ...newsletters];
    setNewsletters(updated);
    localStorage.setItem('one_nation_newsletters', JSON.stringify(updated));
    setNewsletterEmail('');
    setNewsletterSuccess(true);

    setTimeout(() => {
      setNewsletterSuccess(false);
    }, 4000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setActiveSection('home');
  };

  const handleLinkClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-bg transition-colors duration-300">
      
      {/* 1. STICKY NAVBAR */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* 2. MAIN CORE VIEWPORTS */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'landing' ? (
            <motion.div
              key="landing-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Hero />
              <About />
              <Mission />
              <Projects projects={projects} />
              <GetInvolved onVolunteerRegister={handleVolunteerRegister} />
              <SocialProof />
              <Contact onContactSubmit={handleContactSubmit} />
            </motion.div>
          ) : (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <AdminDashboard
                projects={projects}
                setProjects={setProjects}
                volunteers={volunteers}
                setVolunteers={setVolunteers}
                inquiries={inquiries}
                setInquiries={setInquiries}
                newsletters={newsletters}
                setNewsletters={setNewsletters}
                setCurrentView={setCurrentView}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. GLOBAL FOOTER (Only shown on Landing site) */}
      {currentView === 'landing' && (
        <footer className="bg-primary-dark text-white border-t border-white/5 pt-16 pb-8 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
              
              {/* Left Column: Branding */}
              <div className="md:col-span-4 flex flex-col items-start">
                <Logo className="h-14 w-14 mb-4" showText={true} lightModeColor="text-white" darkModeColor="dark:text-white" />
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm mt-3">
                  A registered non-profit organization fostering national unity, social cohesion, and direct welfare support across Pakistan.
                </p>
              </div>

              {/* Middle Column: Links */}
              <div className="md:col-span-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Navigations</h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                    <li><button onClick={() => handleLinkClick('home')} className="hover:text-accent hover:underline cursor-pointer">Home</button></li>
                    <li><button onClick={() => handleLinkClick('about')} className="hover:text-accent hover:underline cursor-pointer">About Us</button></li>
                    <li><button onClick={() => handleLinkClick('mission')} className="hover:text-accent hover:underline cursor-pointer">Mission</button></li>
                    <li><button onClick={() => handleLinkClick('projects')} className="hover:text-accent hover:underline cursor-pointer">Projects</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Support Channels</h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                    <li><button onClick={() => handleLinkClick('get-involved')} className="hover:text-accent hover:underline cursor-pointer">Volunteer</button></li>
                    <li><button onClick={() => handleLinkClick('get-involved')} className="hover:text-accent hover:underline cursor-pointer">Collaborate</button></li>
                    <li><button onClick={() => handleLinkClick('contact')} className="hover:text-accent hover:underline cursor-pointer">Contact</button></li>
                    <li><button onClick={() => setCurrentView('admin')} className="hover:text-accent hover:underline cursor-pointer text-left">Admin Panel</button></li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Newsletter Subscription */}
              <div className="md:col-span-4">
                <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Newsletter Digest</h4>
                <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                  Subscribe to receive monthly field reports, impact statements, and announcements.
                </p>

                <AnimatePresence mode="wait">
                  {!newsletterSuccess ? (
                    <motion.form
                      key="newsletter-form"
                      onSubmit={handleNewsletterSubmit}
                      className="flex gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="flex-grow px-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-xs sm:text-sm outline-none focus:border-accent text-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-accent hover:bg-accent-light text-primary-dark font-extrabold text-xs sm:text-sm uppercase tracking-wide rounded-xl shadow transition-all duration-300 active:scale-95 cursor-pointer"
                      >
                        Subscribe
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="newsletter-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-xs font-bold text-accent bg-accent/10 border border-accent/25 p-3.5 rounded-xl"
                    >
                      <CheckCircle2 size={16} />
                      <span>Subscribed! Thank you for supporting our vision.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            <hr className="border-white/10 mb-8" />

            {/* Copyright & Meta */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
              <p>© 2026 1 Nation Pakistan. All Rights Reserved.</p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/1nation_pk/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Instagram size={16} /></a>
                <a href="https://wa.me/923435707812" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Mail size={16} /></a>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* 4. GLOBAL FLOATING WHATSAPP CHAT BUBBLE (Bottom Right) */}
      <a
        href="https://wa.me/923435707812?text=Hello%20%231NationPakistan%2C%20I%20would%20like%20to%20get%20more%20information%20on%20how%20to%20support%20or%20participate%20in%20your%20causes."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white flex items-center justify-center rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
        title="Chat on WhatsApp"
      >
        {/* Pulsing Concentric Outer Ring */}
        <span className="absolute -inset-2 rounded-full border-2 border-[#25D366]/40 animate-ping pointer-events-none" />
        <span className="absolute -inset-4 rounded-full border-2 border-[#25D366]/15 animate-pulse-slow pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <Phone size={24} className="fill-current text-white group-hover:rotate-12 transition-transform duration-300 relative z-10" />
      </a>

      {/* 5. GLOBAL SCROLL TO TOP TRIGGER */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={handleScrollToTop}
            className="fixed bottom-24 right-6 z-40 p-3 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border text-primary dark:text-accent rounded-full shadow-lg hover:scale-110 transition-all cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
