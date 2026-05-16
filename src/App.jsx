import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import CostCalculator from './pages/CostCalculator';

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
          </Routes>
        </main>
        <Footer />
        
        {/* Floating Contact Buttons */}
        <div className="fixed bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-2 md:gap-3">
          {/* Floating Call Button */}
          <a 
            href="tel:9398801834" 
            className="bg-[#111111] text-[#E5C298] p-3 md:py-3 md:px-5 rounded-full flex items-center justify-center md:justify-start gap-3 shadow-2xl hover:scale-105 transition-transform border border-[#E5C298]/30 group w-14 h-14 md:w-auto md:h-auto md:min-w-[240px]"
          >
            <div className="flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div className="hidden md:flex flex-col">
              <span className="font-bold text-sm leading-tight">Call Support Now</span>
              <span className="text-xs font-medium opacity-80 leading-tight">Expert Design Consultation</span>
            </div>
          </a>

          {/* Floating WhatsApp Button */}
          <a 
            href="https://wa.me/919398801834" 
            target="_blank" 
            rel="noreferrer" 
            className="bg-[#E5C298] text-[#111111] p-3 md:py-3 md:px-5 rounded-full flex items-center justify-center md:justify-start gap-3 shadow-2xl hover:scale-105 transition-transform w-14 h-14 md:w-auto md:h-auto md:min-w-[240px]"
          >
            <div className="flex items-center justify-center shrink-0">
              {/* Simple SVG WhatsApp Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </div>
            <div className="hidden md:flex flex-col">
              <span className="font-bold text-sm leading-tight">Chat on WhatsApp</span>
              <span className="text-xs font-medium opacity-80 leading-tight">Get Free Design Consultation</span>
            </div>
          </a>
        </div>
      </div>
    </Router>
  );
}

export default App;
