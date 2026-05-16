import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, MessageCircle, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
        .insert([
          { 
            source: 'contact_page',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
          }
        ]);

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMsg(error.message || 'An unexpected error occurred. Please check your Supabase configuration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-32 lg:pt-24 lg:pb-8 bg-white min-h-screen lg:h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3">Let's create something beautiful.</h1>
          <p className="text-lg text-neutral-500">Reach out to discuss your upcoming project, request a consultation, or simply say hello.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-start">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2 bg-secondary/30 p-6 md:p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-heading font-bold text-primary mb-6">Send us a message</h3>
            
            {isSubmitted ? (
              <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200 flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <Send size={20} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold">Message sent successfully!</h4>
                  <p className="text-sm">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Full Name</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Email Address</label>
                    <input 
                      type="email" required
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Phone Number</label>
                    <input 
                      type="tel"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Project Details</label>
                  <textarea 
                    required rows="3"
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary resize-none"
                    placeholder="Tell us about your space, budget, and vision..."
                  ></textarea>
                </div>
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 mb-4">
                    {errorMsg}
                  </div>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>Submitting... <Loader2 size={18} className="animate-spin" /></>
                  ) : (
                    <>Submit Inquiry <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
            
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <a href="https://wa.me/919398801834" target="_blank" rel="noreferrer" className="w-full py-3 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded-xl font-medium hover:bg-[#25D366]/20 transition-colors flex justify-center items-center gap-2">
                <MessageCircle size={20} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="w-full lg:w-1/2 mt-4 lg:mt-6"
          >
            <div className="pl-0 lg:pl-12">
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex gap-6 items-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={32} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-2">Studio Location</h4>
                    <p className="text-neutral-500 text-lg">Hyderabad, Telangana</p>
                  </div>
                </li>
                <li className="flex gap-6 items-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <Phone size={32} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-2">Phone</h4>
                    <p className="text-neutral-500 text-lg">+91 93988 01834<br/>+91 79931 07169</p>
                  </div>
                </li>
                <li className="flex gap-6 items-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <Mail size={32} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-2">Email</h4>
                    <p className="text-neutral-500 text-lg">ornivadesignstudio@gmail.com</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-neutral-200">
                <a 
                  href="https://cal.com/orniva-design-studio/30min" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors flex justify-center items-center gap-2"
                >
                  <Calendar size={20} /> Book a Meeting
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
