import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">

        {/* Massive Brand Statement (Reference Style: Antigravity) */}
        <div className="pb-16 flex flex-col items-center justify-center select-none overflow-hidden px-2">
          <h2 className="text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] font-bold text-white font-heading leading-none select-none text-center">
            Orniva
          </h2>
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-neutral-400 font-semibold mt-4 block text-center">
            Design Studio
          </span>
        </div>

        {/* Centered Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-16 pt-8 border-t border-neutral-800/40">
          <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="text-sm font-medium text-white/80 hover:text-accent transition-colors">
            About Us
          </Link>
          <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="text-sm font-medium text-white/80 hover:text-accent transition-colors">
            Services
          </Link>
          <Link to="/projects" onClick={() => window.scrollTo(0, 0)} className="text-sm font-medium text-white/80 hover:text-accent transition-colors">
            Our Projects
          </Link>
          <Link to="/calculator" onClick={() => window.scrollTo(0, 0)} className="text-sm font-medium text-white/80 hover:text-accent transition-colors">
            Cost Calculator
          </Link>
          <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="text-sm font-medium text-white/80 hover:text-accent transition-colors">
            Contact
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-400">
          {/* Copyright */}
          <p className="order-3 md:order-1">&copy; {new Date().getFullYear()} Orniva Design Studio</p>
          
          {/* Terms & Privacy */}
          <div className="flex gap-6 order-1 md:order-2">
            <Link to="#" className="hover:text-white transition-colors">Privacy policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>

          {/* Socials */}
          <div className="flex gap-6 order-2 md:order-3 text-lg">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/orniva.design_studio/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
