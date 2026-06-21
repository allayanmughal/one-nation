import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Contact({ onContactSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Callback to add contact inquiry to App state
      onContactSubmit(formData);
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  return (
    <section id="contact" className="py-24 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-gray-900 dark:text-white mt-2 mb-6">
            Contact 1 Nation Pakistan
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Have questions about our initiatives, volunteer drives, or collaborative proposals? Drop us a message, and we'll reply as soon as possible.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Info Cards */}
            <div className="space-y-6">
              {/* Card 1: Location */}
              <div className="flex items-start gap-4 bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border">
                <span className="p-3 bg-primary/10 dark:bg-accent/10 rounded-xl text-primary dark:text-accent flex-shrink-0">
                  <MapPin size={20} />
                </span>
                <div>
                  <h4 className="text-base font-display font-extrabold text-gray-900 dark:text-white mb-1">Headquarters Location</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Main Abbottabad Road, Havelian City, District Abbottabad, Khyber Pakhtunkhwa, Pakistan
                  </p>
                </div>
              </div>

              {/* Card 2: Phone / WhatsApp */}
              <a
                href="https://wa.me/923435707812"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border hover:border-accent/20 transition-all duration-300 cursor-pointer block group"
              >
                <span className="p-3 bg-primary/10 dark:bg-accent/10 rounded-xl text-primary dark:text-accent flex-shrink-0">
                  <Phone size={20} />
                </span>
                <div>
                  <h4 className="text-base font-display font-extrabold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-accent transition-colors">WhatsApp Hotline</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:underline">
                    +92 343 5707812
                  </p>
                </div>
              </a>

              {/* Card 3: Email */}
              <a
                href="mailto:info@1nation.pk"
                className="flex items-start gap-4 bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border hover:border-accent/20 transition-all duration-300 cursor-pointer block group"
              >
                <span className="p-3 bg-primary/10 dark:bg-accent/10 rounded-xl text-primary dark:text-accent flex-shrink-0">
                  <Mail size={20} />
                </span>
                <div>
                  <h4 className="text-base font-display font-extrabold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-accent transition-colors">Email Support</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:underline">
                    info@1nation.pk
                  </p>
                </div>
              </a>
            </div>

            {/* Stylized Vector Map Representation */}
            <div className="relative h-48 rounded-2xl overflow-hidden bg-primary-dark border border-gray-100 dark:border-dark-border flex flex-col justify-end p-5 shadow-inner">
              {/* Background decorative map grid lines */}
              <div className="absolute inset-0 opacity-15" style={{
                backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)',
                backgroundSize: '16px 16px'
              }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-accent/10 blur-xl animate-pulse-slow" />

              <div className="relative z-10 text-white">
                <span className="inline-block px-2.5 py-0.5 bg-accent text-primary-dark text-[9px] font-extrabold rounded-full uppercase tracking-wider mb-2">
                  Operating Region
                </span>
                <h4 className="text-lg font-display font-extrabold mb-1">Khyber Pakhtunkhwa</h4>
                <p className="text-xs text-gray-300">Coordinating operations across Abbottabad, Peshawar, Galyat, and outlying districts.</p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white dark:bg-dark-card rounded-3xl p-8 border border-gray-100 dark:border-dark-border shadow-sm flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white mb-2">
                    Send a Message
                  </h3>

                  {/* Name field */}
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 bg-white dark:bg-dark-bg/60 border rounded-xl text-sm font-medium outline-none transition-all duration-300 ${errors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 dark:border-dark-border focus:border-primary dark:focus:border-accent'
                        } text-gray-900 dark:text-white`}
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 font-semibold">{errors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 bg-white dark:bg-dark-bg/60 border rounded-xl text-sm font-medium outline-none transition-all duration-300 ${errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 dark:border-dark-border focus:border-primary dark:focus:border-accent'
                        } text-gray-900 dark:text-white`}
                      placeholder="Email Address"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 font-semibold">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject field */}
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 bg-white dark:bg-dark-bg/60 border rounded-xl text-sm font-medium outline-none transition-all duration-300 ${errors.subject
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 dark:border-dark-border focus:border-primary dark:focus:border-accent'
                        } text-gray-900 dark:text-white`}
                      placeholder="Subject"
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-500 mt-1 font-semibold">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="relative">
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3.5 bg-white dark:bg-dark-bg/60 border rounded-xl text-sm font-medium outline-none transition-all duration-300 resize-none ${errors.message
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 dark:border-dark-border focus:border-primary dark:focus:border-accent'
                        } text-gray-900 dark:text-white`}
                      placeholder="Your Message..."
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1 font-semibold">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-xl shadow transition-all duration-300 active:scale-98 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 flex flex-col items-center text-center justify-center h-full"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-16 h-16 bg-primary/10 dark:bg-accent/15 rounded-full flex items-center justify-center text-primary dark:text-accent mb-6"
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>
                  <h4 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mb-8 leading-relaxed">
                    Thank you for reaching out. We have logged your message, and a team member will reply to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-dark-card dark:hover:bg-gray-800 text-gray-700 dark:text-white text-xs font-bold rounded-full transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Expansion Section A: Regional Coordinator Directory */}
        <div className="mt-28 border-t border-gray-100 dark:border-dark-border/40 pt-20 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
              Local Coordinates
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white mt-1">
              Regional Chapter Hubs
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: "Abbottabad Chapter", lead: "Zainab Malik", email: "abbottabad@1nation.pk", desc: "Coordinates Galyat relief logistics and student advocate orientations." },
              { city: "Haripur Chapter", lead: "Usman Shah", email: "haripur@1nation.pk", desc: "Manages reverse osmosis filtration projects and local water testing." },
              { city: "Mansehra Chapter", lead: "Khurram Qureshi", email: "mansehra@1nation.pk", desc: "Manages remote village distributions and emergency winter clothing packs." },
              { city: "Peshawar Chapter", lead: "Sana Bangash", email: "peshawar@1nation.pk", desc: "Coordinates university blood camps and youth leadership seminars." }
            ].map((hub, idx) => (
              <div key={idx} className="p-6 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl transition-all hover:shadow-md">
                <span className="text-[10px] font-extrabold text-primary dark:text-accent uppercase tracking-wider block mb-1">
                  {hub.city}
                </span>
                <h4 className="text-base font-display font-extrabold text-gray-900 dark:text-white mb-2">
                  {hub.lead}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3 leading-relaxed">
                  {hub.desc}
                </p>
                <a
                  href={`mailto:${hub.email}`}
                  className="text-xs font-bold text-primary dark:text-accent hover:underline block"
                >
                  {hub.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Expansion Section B: CSR & Proposal Guidelines */}
        <div className="py-16 bg-white dark:bg-dark-card/30 border border-gray-100 dark:border-dark-border/40 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
              Institutional Partnerships
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 dark:text-white mt-1 mb-4 leading-tight">
              CSR & Proposal Guidelines
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              For corporations, foundations, or governmental bureaus interested in co-sponsoring clean water plants, ration drives, or establishing student chapters, please contact our executive office directly at <a href="mailto:partnerships@1nation.pk" className="font-bold text-primary dark:text-accent hover:underline">partnerships@1nation.pk</a>. We provide fully audited impact reports, GPS coordinates of deployments, and media documentation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
