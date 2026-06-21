import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import Logo from './Logo';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulated short network delay for transition feedback
    setTimeout(() => {
      if (username === 'admin' && password === '1NationPakistan@2026') {
        sessionStorage.setItem('one_nation_admin_auth', 'true');
        onLoginSuccess();
      } else {
        setError('Invalid username or password. Please try again.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-light-bg dark:bg-dark-bg/20 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="surface-card dark:glass-dark rounded-3xl p-8 sm:p-10 shadow-2xl relative border border-primary/5 dark:border-white/5 overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/10 dark:bg-accent/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-accent/10 dark:bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col items-center mb-8 text-center relative z-10">
            <Logo className="h-16 w-16 mb-4" />
            <h2 className="text-2xl font-display font-extrabold text-primary dark:text-white">
              Admin Portal Gate
            </h2>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">
              Authorized Access Only
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 p-3.5 rounded-xl flex items-start gap-2.5 text-xs font-semibold overflow-hidden"
                >
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 dark:text-gray-500">
                  <User size={18} />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  disabled={isLoading}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-dark-bg/60 border border-primary/10 dark:border-dark-border rounded-xl text-sm font-semibold text-primary dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 dark:text-gray-500">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-dark-bg/60 border border-primary/10 dark:border-dark-border rounded-xl text-sm font-semibold text-primary dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-primary hover:bg-primary-light dark:bg-accent dark:hover:bg-accent-light text-white dark:text-primary-dark font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Authenticate Securely</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
