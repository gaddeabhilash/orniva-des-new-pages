import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Loader2, CheckCircle, ChevronDown } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', project_type: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([{ source: 'contact_page', name: formData.name, phone: formData.phone, project_type: formData.project_type, message: formData.message }]);
      if (error) throw error;
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', project_type: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (error) {
      setErrorMsg(error.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 bg-white border border-black/[0.1] rounded-lg text-[#111] text-sm placeholder-neutral-400 focus:outline-none transition-all duration-300 ${
      focusedField === field
        ? 'border-accent bg-white'
        : 'hover:border-neutral-300'
    }`;

  return (
    <div className="min-h-screen bg-gradient-dark text-[#111] relative flex flex-col justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Background glow for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-6xl mx-auto"
      >
        {/* Corner Plus Marks */}
        <div className="absolute -top-[11px] -left-[11px] text-neutral-500 font-light text-xl select-none pointer-events-none">+</div>
        <div className="absolute -top-[11px] -right-[11px] text-neutral-500 font-light text-xl select-none pointer-events-none">+</div>
        <div className="absolute -bottom-[11px] -left-[11px] text-neutral-500 font-light text-xl select-none pointer-events-none">+</div>
        <div className="absolute -bottom-[11px] -right-[11px] text-neutral-500 font-light text-xl select-none pointer-events-none">+</div>

        {/* Main Box Container */}
        <div className="bg-white border border-black/[0.06] rounded-xl overflow-hidden flex flex-col md:flex-row relative z-10 shadow-2xl">
          
          {/* Left Column: Info */}
          <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-3 text-[#111] font-sans tracking-tight">Get in touch</h1>
              <p className="text-neutral-600 leading-relaxed mb-8 text-[15px] max-w-md">
                If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.
              </p>

              <div className="flex flex-col gap-6">
                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111] text-[15px] mb-0.5">Email</h4>
                    <a href="mailto:ornivadesignstudio@gmail.com" className="text-neutral-600 text-sm hover:text-primary transition-colors break-words max-w-full block">
                      ornivadesignstudio@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111] text-[15px] mb-0.5">Phone</h4>
                    <a href="tel:9398801834" className="text-neutral-600 text-sm hover:text-primary transition-colors">
                      +91 93988 01834
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111] text-[15px] mb-0.5">Address</h4>
                    <p className="text-neutral-600 text-sm">
                      Hyderabad, Telangana
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <FaInstagram size={16} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111] text-[15px] mb-0.5">Instagram</h4>
                    <a href="https://www.instagram.com/orniva.design_studio/" target="_blank" rel="noreferrer" className="text-neutral-600 text-sm hover:text-primary transition-colors">
                      @orniva.design_studio
                    </a>
                  </div>
              </div>
            </div>
            </div>

            {/* Booking Button pushed to bottom */}
            <div className="pt-6 mt-auto">
              <a 
                href="https://cal.com/orniva-design-studio/30min" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center justify-center w-full px-8 py-3.5 bg-accent hover:bg-primary text-primary hover:text-white text-[15px] font-bold rounded-lg transition-all duration-300 shadow-lg shadow-accent/15 hover:scale-[1.01] active:scale-[0.99]"
              >
                Book a Free Consultation
              </a>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 border-t md:border-t-0 md:border-l border-black/[0.06] bg-neutral-50/50 flex flex-col">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="text-accent" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#111] mb-2">Message sent!</h4>
                  <p className="text-neutral-600">We'll be in touch with you shortly.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col flex-1"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                  <div className="space-y-4 flex-1">
                  {/* Name */}
                  <div>
                    <label className="block text-[13px] font-semibold text-[#111] mb-2">Name</label>
                    <input
                      type="text" required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={inputClass('name')}
                    />
                  </div>

                  {/* Project Type */}
                  <div className="relative">
                    <label className="block text-[13px] font-semibold text-[#111] mb-2">Project Type</label>
                    <div 
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                      className={`${inputClass('project_type')} cursor-pointer flex justify-between items-center ${isSelectOpen ? 'border-accent bg-white' : ''}`}
                    >
                      <span className={formData.project_type ? "text-[#111]" : "text-neutral-400"}>
                        {formData.project_type === 'residential' ? 'Residential Interior' :
                         formData.project_type === 'commercial' ? 'Commercial Space' :
                         formData.project_type === 'renovation' ? 'Renovation' :
                         'Select project type'}
                      </span>
                      <ChevronDown size={16} className={`text-neutral-400 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                    </div>
                    
                    <AnimatePresence>
                      {isSelectOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-50 w-full mt-2 bg-white border border-black/[0.1] rounded-lg overflow-hidden shadow-xl"
                        >
                          {[
                            { value: 'residential', label: 'Residential Interior' },
                            { value: 'commercial', label: 'Commercial Space' },
                            { value: 'renovation', label: 'Renovation' }
                          ].map((option) => (
                            <div 
                              key={option.value}
                              onClick={() => {
                                setFormData({...formData, project_type: option.value});
                                setIsSelectOpen(false);
                              }}
                              className={`px-4 py-3 text-sm cursor-pointer transition-colors ${formData.project_type === option.value ? 'bg-accent/10 text-accent font-medium' : 'text-neutral-600 hover:bg-neutral-50 hover:text-[#111]'}`}
                            >
                              {option.label}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[13px] font-semibold text-[#111] mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className={inputClass('phone')}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[13px] font-semibold text-[#111] mb-2">Message</label>
                    <textarea
                      required rows={3}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputClass('message')} resize-none`}
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-500/10 text-red-400 text-[13px] rounded-lg border border-red-500/20">
                      {errorMsg}
                    </div>
                  )}
                  </div>

                  <div className="pt-6 mt-auto">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-accent hover:bg-primary text-primary hover:text-white text-[15px] font-bold rounded-lg transition-all duration-300 shadow-lg shadow-accent/15 hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
