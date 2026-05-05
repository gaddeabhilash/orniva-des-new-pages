import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">Let's create something beautiful.</h1>
          <p className="text-xl text-neutral-500">Reach out to discuss your upcoming project, request a consultation, or simply say hello.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2 bg-secondary/30 p-8 md:p-12 rounded-3xl"
          >
            <h3 className="text-2xl font-heading font-bold text-primary mb-8">Send us a message</h3>
            
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Full Name</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Email Address</label>
                    <input 
                      type="email" required
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-5 py-4 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Phone Number</label>
                    <input 
                      type="tel"
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-5 py-4 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Project Details</label>
                  <textarea 
                    required rows="5"
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-5 py-4 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary resize-none"
                    placeholder="Tell us about your space, budget, and vision..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors flex justify-center items-center gap-2">
                  Submit Inquiry <Send size={18} />
                </button>
              </form>
            )}
            
            <div className="mt-8 pt-8 border-t border-neutral-200">
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="w-full py-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded-xl font-medium hover:bg-[#25D366]/20 transition-colors flex justify-center items-center gap-2">
                <MessageCircle size={20} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="w-full lg:w-1/2 space-y-12"
          >
            <div>
              <h3 className="text-2xl font-heading font-bold text-primary mb-8">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Studio Location</h4>
                    <p className="text-neutral-500">123 Design Boulevard, Suite 400<br/>New York, NY 10001</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Phone</h4>
                    <p className="text-neutral-500">+1 (555) 123-4567<br/>Mon-Fri, 9am - 6pm EST</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Email</h4>
                    <p className="text-neutral-500">hello@ornivadesign.com<br/>careers@ornivadesign.com</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map Mock */}
            <div className="w-full h-[300px] bg-neutral-200 rounded-3xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Map Location" className="w-full h-full object-cover" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <MapPin size={24} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
