import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-heading font-bold tracking-tight inline-block">
              Orniva
              <span className="block text-xs uppercase tracking-widest font-sans font-medium text-neutral-400 mt-1">
                Design Studio
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Premium interior design studio crafting timeless, elegant spaces that perfectly reflect your unique vision and lifestyle.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:bg-accent hover:text-white hover:border-accent transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:bg-accent hover:text-white hover:border-accent transition-all">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:bg-accent hover:text-white hover:border-accent transition-all">
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
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
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li>Residential Design</li>
              <li>Commercial Spaces</li>
              <li>Space Planning</li>
              <li>Custom Furniture</li>
              <li>Styling & Decor</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="text-accent shrink-0" />
                <span>123 Design Boulevard, Suite 400<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span>hello@ornivadesign.com</span>
              </li>
            </ul>
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
