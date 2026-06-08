import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { FaWhatsapp } from 'react-icons/fa';

// ── Eagerly load Home (landing page — must be instant) ──
import Home from './pages/Home';

// ── Lazy load all other routes (code-split into separate chunks) ──
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CostCalculator = lazy(() => import('./pages/CostCalculator'));

const NotFound = lazy(() => import('./pages/NotFound'));

// Minimal loading fallback — invisible to avoid CLS
const PageLoader = () => (
  <div
    style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    aria-busy="true"
    aria-label="Loading page"
  >
    <div style={{ width: 32, height: 32, border: '2px solid #C5A47E', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/calculator" element={<CostCalculator />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />

        {/* Floating Contact Buttons */}
        <div
          className="fixed bottom-24 right-7 z-50 flex flex-col items-end gap-2 md:gap-3"
          role="region"
          aria-label="Quick contact options"
        >
          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/919398801834?text=Hello"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Orniva Design Studio on WhatsApp"
            className="group flex items-center bg-[#25D366] text-white p-3 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:bg-[#20bd5a] transition-all duration-300 ease-in-out w-[56px] h-[56px] md:hover:w-[240px] overflow-hidden"
          >
            <div className="flex items-center justify-center shrink-0 w-8 h-8" aria-hidden="true">
              <FaWhatsapp size={30} className="text-white shrink-0 drop-shadow-sm" />
            </div>
            <div className="flex flex-col whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3" aria-hidden="true">
              <span className="font-bold text-sm leading-tight tracking-wide">WhatsApp Us</span>
              <span className="text-[11px] font-medium opacity-90 leading-tight mt-0.5">Quick Design Consultation</span>
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
