import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Calendar } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">

        {/* Massive Brand Statement (Reference Style: Antigravity) */}
        <div className="pb-16 flex flex-col items-center justify-center select-none overflow-hidden px-2">
          <h2 className="text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] font-extrabold tracking-tighter text-white font-sans leading-none select-none text-center">
            Orniva
          </h2>
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-neutral-400 font-sans font-semibold mt-4 block text-center">
            Design Studio
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 mb-16 border-t border-neutral-800/40 pt-16">

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-heading font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><Link to="/projects" className="hover:text-accent transition-colors">Our Projects</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/calculator" className="hover:text-accent transition-colors">Cost Calculator</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h4 className="text-lg font-heading font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li>Residential Design</li>
              <li>Commercial Spaces</li>
              <li>Space Planning</li>
              <li>Custom Furniture</li>
              <li>Styling & Decor</li>
            </ul>
          </div>

          {/* Contact Info & Socials */}
          <div className="col-span-2 md:col-span-1 space-y-6 flex flex-col items-center md:items-start">
            <div className="w-full flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-lg font-heading font-semibold mb-6">Get in Touch</h4>
              <ul className="space-y-4 text-neutral-400 text-sm flex flex-col items-center md:items-start w-full">
                <li className="flex flex-col items-center md:flex-row md:items-start gap-2 md:gap-3 w-full">
                  <MapPin size={18} className="text-accent shrink-0" />
                  <span>Hyderabad, Telangana</span>
                </li>
                <li className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 w-full">
                  <Phone size={18} className="text-accent shrink-0" />
                  <span className="text-center md:text-left">+91 93988 01834<br/>+91 79931 07169</span>
                </li>
                <li className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 w-full">
                  <Mail size={18} className="text-accent shrink-0" />
                  <span>ornivadesignstudio@gmail.com</span>
                </li>
              </ul>
            </div>
            
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="https://www.instagram.com/orniva.design_studio/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:bg-accent hover:text-white hover:border-accent transition-all">
                <FaInstagram size={18} />
              </a>

              <a href="https://cal.com/orniva-design-studio/30min" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:bg-accent hover:text-white hover:border-accent transition-all">
                <Calendar size={18} />
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Orniva Design Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
