"use client";

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
import HomeView from './components/HomeView';
import AdminLogin from './components/AdminLogin';

// SEED DATA FOR DEMO RUNS
const SEED_PROJECTS = [
  {
    id: 1,
    title: "Medical Camp",
    location: "Abbottabad & Mansehra",
    date: "March 2026",
    status: "Ongoing (Twice a month)",
    category: "Free Medical Camps",
    description: "Providing free medical consultations, diagnostics, and essential medicines to underserved communities.",
    image: "/medical_camp.jpeg",
    details: "Our Medical Camp initiative brings quality healthcare directly to communities in need. Mobile clinics staffed with qualified physicians and paramedics offer free health screenings, vaccinations, and basic treatment."
  },
  {
    id: 2,
    title: "Stray Animal Welfare",
    location: "Haripur & Surrounding Districts",
    date: "June 2026",
    status: "Ongoing",
    category: "Nature Rehabilitation",
    description: "Rescuing and rehabilitating injured and abandoned animals while promoting animal welfare awareness.",
    image: "/animal_rescue.jpeg",
    details: "This initiative focuses on animal rescue operations, rehabilitation centers, and community education on animal welfare. We partner with veterinarians to provide free medical care for rescued animals."
  },
  {
    id: 3,
    title: "Nature Rehabilitation",
    location: "Galyat & Kaghan Valley",
    date: "January 2026",
    status: "Completed",
    category: "Nature Rehabilitation",
    description: "Large-scale tree plantation drive to combat deforestation and improve environmental sustainability.",
    image: "/massive_plantation.jpeg",
    details: "Our Nature Rehabilitation initiative plants thousands of trees across KP. Volunteers engage in environmental conservation, creating green spaces, and combating climate change impacts on mountain communities."
  },
  {
    id: 4,
    title: "Special Nation",
    location: "Peshawar & Urban Centers",
    date: "October 2026",
    status: "Ongoing",
    category: "Special Nation",
    description: "Dedicated welfare programs and support services for persons with disabilities.",
    image: "/special_nation.jpeg",
    details: "Special Nation focuses on empowering disabled individuals through vocational training, assistive devices, accessibility support, and inclusive community programs that ensure dignity and participation."
  },
  {
    id: 5,
    title: "Project Haya",
    location: "KP Tribal Districts",
    date: "November 2026",
    status: "Ongoing",
    category: "Project Haya",
    description: "Empowerment initiative supporting women's economic independence and skill development.",
    image: "/pervaaz-e-zann.jpeg",
    details: "Project Haya promotes the values of modesty, dignity, and moral responsibility through awareness campaigns, educational workshops, and community engagement. The initiative empowers individuals, especially youth, to build strong character, uphold ethical values, and contribute positively to society."
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
    subject: "Collaboration in Swat",
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
  const parseHash = () => {
    const hash = window.location.hash;
    if (!hash) return 'home';
    const route = hash.replace(/^#\/?/, '');
    const validPages = ['home', 'about', 'mission', 'projects', 'get-involved', 'contact', 'admin'];
    return validPages.includes(route) ? route : 'home';
  };

  const [currentPage, setCurrentPage] = useState(parseHash());
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
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
    const loadData = async () => {
      try {
        const authRes = await fetch('/api/admin/me');
        if (authRes.ok) {
          const authData = await authRes.json();
          setAdminAuthenticated(authData.authenticated);
        }
      } catch (error) {
        console.error('Failed to check admin auth:', error);
      }

      try {
        const [projectsRes, volunteersRes, inquiriesRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/volunteers'),
          fetch('/api/contact')
        ]);

        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          setProjects(projectsData.length > 0 ? projectsData : SEED_PROJECTS);
        } else {
          setProjects(SEED_PROJECTS);
        }

        if (volunteersRes.ok) {
          const volunteersData = await volunteersRes.json();
          setVolunteers(volunteersData.length > 0 ? volunteersData : SEED_VOLUNTEERS);
        } else {
          setVolunteers(SEED_VOLUNTEERS);
        }

        if (inquiriesRes.ok) {
          const inquiriesData = await inquiriesRes.json();
          setInquiries(inquiriesData.length > 0 ? inquiriesData : SEED_INQUIRIES);
        } else {
          setInquiries(SEED_INQUIRIES);
        }
      } catch (error) {
        console.error('Failed to load data from database:', error);
        setProjects(SEED_PROJECTS);
        setVolunteers(SEED_VOLUNTEERS);
        setInquiries(SEED_INQUIRIES);
      }

      const localNews = localStorage.getItem('one_nation_newsletters');
      if (localNews) {
        setNewsletters(JSON.parse(localNews));
      } else {
        setNewsletters(SEED_NEWSLETTERS);
        localStorage.setItem('one_nation_newsletters', JSON.stringify(SEED_NEWSLETTERS));
      }
    };

    loadData();

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

  // Listen to hash changes for page routing
  useEffect(() => {
    const handleHashChange = () => {
      const page = parseHash();
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
  const handleVolunteerRegister = async (newVolunteer) => {
    const response = await fetch('/api/volunteers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newVolunteer)
    });

    if (!response.ok) {
      throw new Error('Failed to submit volunteer registration');
    }

    const created = await response.json();
    setVolunteers((prev) => [created, ...prev]);
  };

  const handleContactSubmit = async (newInquiry) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry)
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact inquiry');
    }

    const created = await response.json();
    setInquiries((prev) => [created, ...prev]);
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
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed:', error);
    }

    setAdminAuthenticated(false);
    window.location.hash = '#/home';
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      
      {/* 1. STICKY NAVBAR */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={currentPage}
        setActiveSection={(section) => {
          window.location.hash = `#/${section}`;
        }}
        currentView={currentPage === 'admin' ? 'admin' : 'landing'}
        setCurrentView={(view) => {
          if (view === 'admin') {
            window.location.hash = '#/admin';
          } else {
            window.location.hash = '#/home';
          }
        }}
      />

      {/* 2. MAIN CORE VIEWPORTS */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && <HomeView projects={projects} />}
            {currentPage === 'about' && <About />}
            {currentPage === 'mission' && <Mission />}
            {currentPage === 'projects' && <Projects projects={projects} />}
            {currentPage === 'get-involved' && <GetInvolved onVolunteerRegister={handleVolunteerRegister} />}
            {currentPage === 'contact' && <Contact onContactSubmit={handleContactSubmit} />}
            {currentPage === 'admin' && (
              !adminAuthenticated ? (
                <AdminLogin onLoginSuccess={() => setAdminAuthenticated(true)} />
              ) : (
                <AdminDashboard
                  projects={projects}
                  setProjects={setProjects}
                  volunteers={volunteers}
                  setVolunteers={setVolunteers}
                  inquiries={inquiries}
                  setInquiries={setInquiries}
                  newsletters={newsletters}
                  setNewsletters={setNewsletters}
                  setCurrentView={(view) => {
                    if (view === 'landing') {
                      window.location.hash = '#/home';
                    } else {
                      window.location.hash = '#/admin';
                    }
                  }}
                  onLogout={handleLogout}
                />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. GLOBAL FOOTER (Only shown on non-Admin site) */}
      {currentPage !== 'admin' && (
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
                    <li><button onClick={() => { window.location.hash = '#/home'; }} className="hover:text-accent hover:underline cursor-pointer">Home</button></li>
                    <li><button onClick={() => { window.location.hash = '#/about'; }} className="hover:text-accent hover:underline cursor-pointer">About Us</button></li>
                    <li><button onClick={() => { window.location.hash = '#/mission'; }} className="hover:text-accent hover:underline cursor-pointer">Mission</button></li>
                    <li><button onClick={() => { window.location.hash = '#/projects'; }} className="hover:text-accent hover:underline cursor-pointer">Projects</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Support Channels</h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                    <li><button onClick={() => { window.location.hash = '#/get-involved'; }} className="hover:text-accent hover:underline cursor-pointer">Volunteer</button></li>
                    <li><button onClick={() => { window.location.hash = '#/get-involved'; }} className="hover:text-accent hover:underline cursor-pointer">Collaborate</button></li>
                    <li><button onClick={() => { window.location.hash = '#/contact'; }} className="hover:text-accent hover:underline cursor-pointer">Contact</button></li>
                    <li><button onClick={() => { window.location.hash = '#/admin'; }} className="hover:text-accent hover:underline cursor-pointer text-left">Admin Panel</button></li>
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
      {currentPage !== 'admin' && (
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
      )}

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
