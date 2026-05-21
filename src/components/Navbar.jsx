import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change and handle scroll lock
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Calculator', path: '/calculator' },
  ];

  // Bright white theme when overlaying dark hero backgrounds unscrolled on Home or Project details
  const useWhiteText = !isScrolled && !isMobileMenuOpen && (location.pathname === '/' || location.pathname.startsWith('/projects/'));

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'py-3 bg-white shadow-sm' : 'py-4 bg-transparent md:bg-transparent'
      } ${!isScrolled && !isMobileMenuOpen ? 'max-md:bg-white max-md:py-3 max-md:shadow-sm' : ''}`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link 
          to="/" 
          className={`flex items-baseline gap-2 text-2xl md:text-3xl font-heading font-bold tracking-tight z-50 transition-colors duration-300 ${
            useWhiteText ? 'text-white' : 'text-primary'
          }`}
        >
          <span>Orniva</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className={`flex items-center gap-8 text-[15px] font-semibold transition-colors duration-300`}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`hover:text-accent transition-colors duration-300 ${
                    location.pathname === link.path 
                      ? 'text-accent' 
                      : (useWhiteText ? 'text-white hover:text-accent' : 'text-primary hover:text-accent')
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            to="/contact" 
            className={`px-6 py-2 rounded-full text-[15px] font-semibold transition-all duration-300 ${
              useWhiteText 
                ? 'bg-white text-primary hover:bg-accent hover:text-white' 
                : 'bg-primary text-white hover:bg-neutral-800'
            }`}
          >
            Get Quote
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden z-50 p-2 transition-colors duration-300 ${
            useWhiteText ? 'text-white' : 'text-primary'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <div 
          className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ul className="flex flex-col items-center gap-10 text-3xl font-heading">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'text-accent' : 'text-primary'}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="text-primary">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
