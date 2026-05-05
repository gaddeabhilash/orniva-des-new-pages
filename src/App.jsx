import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
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
        
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/1234567890" 
          target="_blank" 
          rel="noreferrer" 
          className="fixed bottom-6 right-6 z-50 bg-[#E5C298] text-[#111111] py-3 px-5 rounded-full flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform"
        >
          <div className="flex items-center justify-center">
            {/* Simple SVG WhatsApp Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight">Chat on WhatsApp</span>
            <span className="text-xs font-medium opacity-80 leading-tight">Get Free Design Consultation</span>
          </div>
        </a>
      </div>
    </Router>
  );
}

export default App;
