import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, MessageSquare, ShieldCheck, Heart, Sparkles, Building, Phone } from 'lucide-react';

export default function GetInvolved({ onVolunteerRegister }) {
  // Volunteer Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Focus tracking for floating labels
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = (field, value) => {
    if (!value) setFocusedField(null);
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone)) {
      tempErrors.phone = "Phone number is invalid";
    }
    if (!formData.city.trim()) tempErrors.city = "City/Location is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Callback to add registration to App state
      onVolunteerRegister(formData);
      // Reset form
      setFormData({ fullName: '', email: '', phone: '', city: '', notes: '' });
      setFocusedField(null);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const whatsappLink = "https://wa.me/923435707812?text=Hello%20%231NationPakistan%2C%20I%E2%80%99m%20interested%20in%20becoming%20a%20Collaborator%2FPartner%20organization.%20Please%20share%20more%20details%20about%20partnership%20opportunities.";

  return (
    <section id="get-involved" className="py-24 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold tracking-widest text-primary dark:text-accent uppercase">
            Join the Movement
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-gray-900 dark:text-white mt-2 mb-6">
            Two Paths. One Mission.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Whether you want to offer your hands as a volunteer or collaborate as an organization, you can make a tangible difference today.
          </p>
        </div>

        {/* Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* PATH A: Volunteer Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="bg-gray-50 dark:bg-dark-card rounded-3xl p-8 border border-gray-100 dark:border-dark-border shadow-sm flex flex-col justify-between relative"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 bg-primary/10 dark:bg-accent/10 rounded-xl text-primary dark:text-accent">
                  <Heart size={22} className="fill-current" />
                </span>
                <h3 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white">
                  Become a Volunteer
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Join our active wings in Khyber Pakhtunkhwa and beyond. Gain leadership training, contribute to ration drives, and support local initiatives.
              </p>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="volunteer-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Full Name Field */}
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onFocus={() => handleFocus('fullName')}
                        onBlur={(e) => handleBlur('fullName', e.target.value)}
                        className={`w-full px-4 py-3.5 bg-white dark:bg-dark-bg/60 border rounded-xl text-sm font-medium outline-none transition-all duration-300 ${
                          errors.fullName
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-200 dark:border-dark-border focus:border-primary dark:focus:border-accent'
                        } text-gray-900 dark:text-white`}
                        placeholder="Full Name"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-500 mt-1 font-semibold">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={(e) => handleBlur('email', e.target.value)}
                        className={`w-full px-4 py-3.5 bg-white dark:bg-dark-bg/60 border rounded-xl text-sm font-medium outline-none transition-all duration-300 ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-200 dark:border-dark-border focus:border-primary dark:focus:border-accent'
                        } text-gray-900 dark:text-white`}
                        placeholder="Email Address"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1 font-semibold">{errors.email}</p>
                      )}
                    </div>

                    {/* Grid for Phone & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => handleFocus('phone')}
                          onBlur={(e) => handleBlur('phone', e.target.value)}
                          className={`w-full px-4 py-3.5 bg-white dark:bg-dark-bg/60 border rounded-xl text-sm font-medium outline-none transition-all duration-300 ${
                            errors.phone
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-gray-200 dark:border-dark-border focus:border-primary dark:focus:border-accent'
                          } text-gray-900 dark:text-white`}
                          placeholder="Phone Number (e.g. 03001234567)"
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1 font-semibold">{errors.phone}</p>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          onFocus={() => handleFocus('city')}
                          onBlur={(e) => handleBlur('city', e.target.value)}
                          className={`w-full px-4 py-3.5 bg-white dark:bg-dark-bg/60 border rounded-xl text-sm font-medium outline-none transition-all duration-300 ${
                            errors.city
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-gray-200 dark:border-dark-border focus:border-primary dark:focus:border-accent'
                          } text-gray-900 dark:text-white`}
                          placeholder="City / Location"
                        />
                        {errors.city && (
                          <p className="text-xs text-red-500 mt-1 font-semibold">{errors.city}</p>
                        )}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="relative">
                      <textarea
                        name="notes"
                        rows="3"
                        value={formData.notes}
                        onChange={handleChange}
                        onFocus={() => handleFocus('notes')}
                        onBlur={(e) => handleBlur('notes', e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-dark-bg/60 border border-gray-200 dark:border-dark-border rounded-xl text-sm font-medium outline-none transition-all duration-300 focus:border-primary dark:focus:border-accent text-gray-900 dark:text-white resize-none"
                        placeholder="Additional Notes / Skills (Optional)"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-xl shadow-md transition-all duration-300 active:scale-98 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Registration...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Submit Registration</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="volunteer-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center justify-center h-full"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12, delay: 0.1 }}
                      className="w-16 h-16 bg-primary/10 dark:bg-accent/15 rounded-full flex items-center justify-center text-primary dark:text-accent mb-6"
                    >
                      <CheckCircle2 size={36} />
                    </motion.div>
                    <h4 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white mb-2">
                      Application Submitted!
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
                      Thank you for volunteering with **1 Nation Pakistan**. Our regional coordinators will contact you via email or phone shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-dark-card dark:hover:bg-gray-800 text-gray-700 dark:text-white text-xs font-bold rounded-full transition-all"
                    >
                      Register Another Person
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* PATH B: Collaborator & Partner Path */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col justify-between gap-8"
          >
            {/* Why Partner block */}
            <div className="bg-gray-50 dark:bg-dark-card rounded-3xl p-8 border border-gray-100 dark:border-dark-border shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 bg-accent/10 rounded-xl text-accent-dark dark:text-accent">
                  <Building size={22} />
                </span>
                <h3 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white">
                  Collaborator & Partnership Path
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                We align with corporate CSR departments, NGOs, academic institutions, and administrative offices to run large-scale community distributions.
              </p>

              {/* Partnership Bulletpoints */}
              <ul className="space-y-4">
                {[
                  "Complete transparency and audited distribution tracking.",
                  "Alignment with UN Sustainable Development Goals (SDGs).",
                  "Verified, direct reach to high-altitude and marginalized KP districts.",
                  "Comprehensive PR, video, and social proof co-branding assets."
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <ShieldCheck size={18} className="text-primary dark:text-accent mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instagram style Sponsored Ad Widget (WhatsApp CTA) */}
            <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-3xl overflow-hidden shadow-md group relative">
              {/* Ad Header */}
              <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-dark-bg/20">
                <div className="flex items-center gap-3">
                  {/* Miniature Logo Emblem */}
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center p-0.5 border border-accent/30 overflow-hidden">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                      <polygon points="50,2 62,38 98,38 68,60 80,96 50,74 20,96 32,60 2,38 38,38" className="fill-primary" stroke="#d4af37" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">1nation_pk</h4>
                    <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest leading-none">Sponsored</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-primary dark:text-accent flex items-center gap-1">
                  <Sparkles size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
                  Direct Connect
                </span>
              </div>

              {/* Ad Cover Image Placeholder */}
              <div className="h-44 relative bg-gray-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                  alt="Welfare drives in KP"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-5">
                  <p className="text-sm font-bold text-white mb-1">Make a Structural Impact</p>
                  <p className="text-[10px] text-gray-200">Co-design corporate charity projects across KP & Abbottabad.</p>
                </div>
              </div>

              {/* Ad Body Caption */}
              <div className="p-5 border-b border-gray-100 dark:border-dark-border">
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  <span className="font-bold text-gray-900 dark:text-white mr-1.5">1nation_pk</span>
                  Join forces with 1 Nation Pakistan. Let's align resources, organize medical drives, and deliver relief where it matters most. Click below to start an automated WhatsApp inquiry. 🤝✨ #BeANation #Collaboration
                </p>
              </div>

              {/* CTA Ad Banner Button (WhatsApp Deep Link) */}
              <div className="p-3 bg-gray-50 dark:bg-dark-bg/20">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-between w-full px-5 py-3.5 bg-[#25D366] hover:bg-[#20ba56] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-[#25D366]/20 transition-all duration-300 hover:scale-[1.01] group/btn cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {/* Pulsing WhatsApp Icon */}
                    <div className="relative">
                      <span className="absolute -inset-1.5 rounded-full bg-white/30 animate-ping" />
                      <Phone size={16} className="fill-current text-white relative z-10" />
                    </div>
                    <span>Partner on WhatsApp</span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-white/20 uppercase tracking-widest">
                    Contact Us
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
