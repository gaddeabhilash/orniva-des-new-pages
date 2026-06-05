import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isHomePage = location.pathname === '/';
      const threshold = isHomePage ? window.innerHeight - 80 : 20;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change and handle scroll lock
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const isHome = location.pathname === '/';
  const isProjectDetail = location.pathname.startsWith('/projects/');

  // Use light/white text when at the top of the homepage (dark background image)
  const useWhiteText = isHome && !isScrolled && !isMobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen || isProjectDetail
          ? 'py-3 bg-white shadow-sm border-b border-neutral-100'
          : 'py-4 bg-transparent border-b border-transparent'
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link
          to="/"
          className={`flex items-baseline gap-2 text-2xl md:text-3xl font-heading font-bold tracking-tight z-50 transition-colors duration-300 ${useWhiteText ? 'text-white hover:text-accent' : 'text-primary hover:text-accent'
            }`}
        >
          <span>Orniva</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <ul className="flex items-center gap-8 text-[15px] font-semibold transition-colors duration-300">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  className={`hover:text-accent transition-colors duration-300 relative flex items-center gap-1.5 ${location.pathname === link.path
                      ? 'text-accent'
                      : useWhiteText
                        ? 'text-white hover:text-accent'
                        : 'text-primary hover:text-accent'
                    }`}
                >
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className={`px-6 py-2 rounded-full text-[15px] font-semibold transition-all duration-300 ${useWhiteText
                ? 'bg-white text-primary hover:bg-accent hover:text-white'
                : 'bg-primary text-white hover:bg-neutral-800'
              }`}
          >
            Get Quote
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden z-50 p-2 transition-colors duration-300 ${isMobileMenuOpen ? 'text-primary' : useWhiteText ? 'text-white' : 'text-primary'
            }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Nav Overlay / Drawer */}
        <div
          id="mobile-nav"
          role="navigation"
          aria-label="Mobile navigation"
          className={`fixed top-0 left-0 right-0 h-[60vh] min-h-[420px] bg-white z-40 flex flex-col justify-center items-center shadow-xl border-b border-neutral-100 transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
          <ul className="flex flex-col items-center gap-7 text-2xl font-heading pt-20 pb-6 w-full">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-2 transition-colors duration-300 ${location.pathname === link.path
                      ? 'text-accent font-semibold'
                      : 'text-primary hover:text-accent'
                    }`}
                >
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/contact"
                className="px-8 py-2.5 rounded-full text-base font-semibold transition-all duration-300 bg-primary text-white hover:bg-neutral-800"
              >
                Get Quote
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

