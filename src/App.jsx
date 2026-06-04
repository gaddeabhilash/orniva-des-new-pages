import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { FaWhatsapp } from 'react-icons/fa';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import CostCalculator from './pages/CostCalculator';
import LuxeInteriors from './pages/LuxeInteriors';
import LuxeGate from './components/LuxeGate';
import NotFound from './pages/NotFound';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-secondary/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calculator" element={<CostCalculator />} />
            <Route path="/luxe" element={<LuxeGate><LuxeInteriors /></LuxeGate>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />

        {/* Floating Contact Buttons */}
        <div className="fixed bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-2 md:gap-3">
          {/* Floating Call Button */}
          <a
            href="tel:9398801834"
            className="group flex items-center bg-[#111111] text-[#E5C298] p-3 rounded-full shadow-2xl transition-all duration-300 ease-in-out border border-[#E5C298]/30 w-14 h-14 md:hover:w-[240px] overflow-hidden"
          >
            <div className="flex items-center justify-center shrink-0 w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div className="flex flex-col whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3">
              <span className="font-bold text-sm leading-tight">Call Support Now</span>
              <span className="text-xs font-medium opacity-80 leading-tight">Expert Design Consultation</span>
            </div>
          </a>

          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/919398801834"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center bg-[#25D366] text-white p-3 rounded-full shadow-2xl transition-all duration-300 ease-in-out border border-[#25D366]/30 w-14 h-14 md:hover:w-[240px] overflow-hidden"
          >
            <div className="flex items-center justify-center shrink-0 w-8 h-8">
              <FaWhatsapp size={26} className="text-white shrink-0" />
            </div>
            <div className="flex flex-col whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3">
              <span className="font-bold text-sm leading-tight">Chat on WhatsApp</span>
              <span className="text-xs font-medium opacity-80 leading-tight">Get Free Design Consultation</span>
            </div>
          </a>
        </div>
        <Analytics />
        <SpeedInsights />
      </div>
    </Router>
  );
}
export default App;
