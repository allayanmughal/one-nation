import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Heart, Settings, LogOut } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ darkMode, toggleDarkMode, activeSection, setActiveSection, currentView, setCurrentView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledState, setIsScrolledState] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolledState(true);
      } else {
        setIsScrolledState(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = isScrolledState || activeSection !== 'home';

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Mission', id: 'mission' },
    { name: 'Projects', id: 'projects' },
    { name: 'Get Involved', id: 'get-involved' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleScrollTo = (id) => {
    setIsOpen(false);
    window.location.hash = `#/${id}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'py-3 bg-white/80 dark:bg-dark-bg/85 backdrop-blur-md border-b border-gray-100 dark:border-dark-border shadow-sm'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('home');
            }}
            className="cursor-pointer"
          >
            <Logo className="h-11 w-11 sm:h-12 sm:w-12" showSlogan={false} lightModeColor={isScrolled ? "text-primary" : "text-white"} />
          </a>

          {/* Desktop Navigation Links */}
          {currentView === 'landing' ? (
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                    activeSection === link.id
                      ? (isScrolled ? 'text-primary dark:text-accent font-bold' : 'text-accent font-bold')
                      : (isScrolled ? 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-accent' : 'text-white/80 hover:text-white')
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
          ) : (
            <div className="hidden md:flex items-center space-x-3 text-sm">
              <span className={`font-semibold ${isScrolled ? 'text-primary dark:text-accent' : 'text-accent'}`}>Admin Portal Mockup</span>
              <span className={isScrolled ? "text-gray-300" : "text-white/40"}>|</span>
              <span className={isScrolled ? "text-gray-500" : "text-white/80"}>Local State Only</span>
            </div>
          )}

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Admin Toggle */}
            <button
              onClick={() => setCurrentView(currentView === 'landing' ? 'admin' : 'landing')}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-accent hover:bg-gray-100 dark:hover:bg-dark-card'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              title={currentView === 'landing' ? 'Admin Panel Mockup' : 'Back to Website'}
            >
              {currentView === 'landing' ? <Settings size={20} /> : <LogOut size={20} />}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 relative overflow-hidden ${
                isScrolled
                  ? 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-accent hover:bg-gray-100 dark:hover:bg-dark-card'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle dark mode"
            >
              <motion.div
                initial={false}
                animate={{ rotate: darkMode ? 360 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {darkMode ? <Sun size={20} className="text-accent" /> : <Moon size={20} />}
              </motion.div>
            </button>

            {/* Pulsing CTA Button */}
            {currentView === 'landing' ? (
              <button
                onClick={() => handleScrollTo('get-involved')}
                className="relative flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-pulse-slow active:scale-95 group overflow-hidden"
              >
                {/* Button Glow effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" style={{ backgroundSize: '200% 100%' }}></span>
                <Heart size={16} className="fill-accent text-accent animate-beat" />
                <span>Get Involved</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('landing')}
                className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-dark-card dark:hover:bg-gray-800 text-gray-700 dark:text-white font-bold text-sm rounded-full shadow transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                Exit Portal
              </button>
            )}
          </div>

          {/* Mobile Menu & Toggles Grid */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Dark Mode Toggle Mobile */}
            <button
              onClick={toggleDarkMode}
              className={`p-1.5 rounded-full ${isScrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white/90'}`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} className="text-accent" /> : <Moon size={20} />}
            </button>

            {/* Admin Toggle Mobile */}
            <button
              onClick={() => setCurrentView(currentView === 'landing' ? 'admin' : 'landing')}
              className={`p-1.5 rounded-full ${isScrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white/90'}`}
            >
              {currentView === 'landing' ? <Settings size={20} /> : <LogOut size={20} />}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 rounded-full focus:outline-none ${
                isScrolled
                  ? 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-accent'
                  : 'text-white/90 hover:text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass dark:glass-dark border-b border-gray-200 dark:border-dark-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {currentView === 'landing' ? (
                <>
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleScrollTo(link.id)}
                      className={`py-2 px-3 rounded-lg text-left text-base font-semibold tracking-wide transition-all duration-200 ${activeSection === link.id
                          ? 'bg-primary/10 text-primary dark:text-accent dark:bg-accent/10'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-card/50'
                        }`}
                    >
                      {link.name}
                    </button>
                  ))}
                  <button
                    onClick={() => handleScrollTo('get-involved')}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-light transition-all"
                  >
                    <Heart size={18} className="fill-accent text-accent" />
                    <span>Get Involved</span>
                  </button>
                </>
              ) : (
                <div className="py-4 text-center">
                  <p className="font-bold text-primary dark:text-accent">Admin Portal Mockup</p>
                  <p className="text-xs text-gray-500 mt-1 mb-4">View submissions and manage projects locally</p>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setCurrentView('landing');
                    }}
                    className="w-full py-2.5 bg-gray-200 dark:bg-dark-card hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-800 dark:text-white font-bold rounded-lg transition-all"
                  >
                    Exit Admin Portal
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
