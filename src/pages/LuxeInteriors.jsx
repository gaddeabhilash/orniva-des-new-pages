import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { 
  Sparkles, 
  Layers, 
  Clock, 
  Send, 
  Check, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  Volume2,
  Sun,
  Maximize2,
  Users,
  Compass,
  Wand2,
  Sliders,
  Smartphone,
  Play,
  Pause,
  SunDim
} from 'lucide-react';

// High-fidelity animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};


const LuxeInteriors = () => {
  // Mouse position tracking for atmospheric light leak
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Interactive Before/After Split-Screen Slider State (Render vs. Reality)
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100

  // Interactive Acoustic mapping widget state
  const [acousticRoom, setAcousticRoom] = useState('Sanctuary');
  const [soundPlaying, setSoundPlaying] = useState(false);

  // Interactive Seasonal Daylight Simulator State
  const [daylightSeason, setDaylightSeason] = useState('Equinox');

  // Curation Calculator State
  const [estateSize, setEstateSize] = useState(3000); // in sqft
  const [addons, setAddons] = useState({
    statuario: true,
    veneer: false,
    acoustic: true,
    lighting: false,
    concierge: true
  });

  // Interactive WhatsApp Chat Simulator State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'designer', text: "Good morning! Here is the weekly video walkthrough of the book-matched Statuario marble installation in your Jubilee Hills dining hall. We checked the daylight vectors at 11:00 AM, and the shine is spectacular.", time: "10:14 AM" },
    { sender: 'client', text: "Wow, the grain alignment is absolutely stunning! How is the master suite veneer cladding coming along?", time: "10:18 AM" }
  ]);
  const [newMessageText, setNewMessageText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Interactive Timeline State
  const [activeStep, setActiveStep] = useState(0);

  // Selected Material Detail State (Immersive Modal Overlay)
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // Project Concept Carousel State
  const [activeProject, setActiveProject] = useState(0);

  const luxeProjects = [
    {
      title: "The Statuario Penthouse",
      location: "Jubilee Hills, Hyderabad",
      style: "Monochromatic Warm Minimalism",
      desc: "An architectural marvel featuring full-slab Statuario marble walls, bespoke walnut paneling, and curated Italian recessed luminaires aligned to sun path tracking.",
      img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Jubilee Atelier Mansion",
      location: "Banjara Hills, Hyderabad",
      style: "Modern Classic & Brass Accents",
      desc: "A stunning family residence balancing rich classical panel moldings with sleek brushed brass elements and custom double-lacquer kitchen shutters.",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "The Walnut & Oak Duplex",
      location: "Gachibowli, Hyderabad",
      style: "Biophilic Luxury Atelier",
      desc: "Rooted in nature, featuring double-height veneer arches, dynamic acoustic ceiling baffles, custom-cast bronze handles, and velvet wall linings.",
      img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    }
  ];

  const luxeSteps = [
    {
      title: "1. Acoustic & Aesthetic Audit",
      subtitle: "Lifestyle Profile Mapping",
      desc: "We perform a scientific audit of your space before standard drawings begin. This includes mapping natural light orientation across seasons, conducting linear foot assessments for clothing and cookware storage, and profiling acoustic boundaries to shield bedrooms from media room frequencies.",
      icon: Compass,
      highlights: ["Lifestyle light path profiling", "Custom linear storage inventory", "Accoustic zoning sketches"]
    },
    {
      title: "2. Cohesive Conception",
      subtitle: "Atelier Rendering & Physical Materialization",
      desc: "Rather than looking at generic digital renders, we construct a photorealistic 3D virtual environment of your home and deliver a customized physical Material Board containing authentic samples of solid walnut veneer, premium lacquers, and hand-selected marble slabs to touch and experience.",
      icon: Wand2,
      highlights: ["Ultra-HD photorealistic VR walkthroughs", "Hand-assembled physical material boards", "Full-scale layout testing mockups"]
    },
    {
      title: "3. Concierge Project Management",
      subtitle: "Direct-to-Founder Collaboration",
      desc: "We completely bypass standard account managers. You have a direct WhatsApp bridge with our Principal Designer and Project Coordinator. You receive weekly video walkthrough updates and real-time status access via our secure digital client portal, tracking exact site progression milestones.",
      icon: Users,
      highlights: ["24/7 client portal with video logs", "Direct-to-founder WhatsApp access", "Double-verified site engineering audits"]
    },
    {
      title: "4. Atelier Styling",
      subtitle: "White-Glove Finesse & Handover",
      desc: "The design does not end with construction. Our professional stylists handle the final curation, picking and placing premium soft furnishings, procuring fine custom lighting, mounting handpicked wall art, and performing deep white-glove dust sanitation prior to your official entry.",
      icon: Sparkles,
      highlights: ["Bespoke fine-art curation", "Custom lighting and luminary styling", "Complete white-glove cleaning & setup"]
    }
  ];

  const luxeMaterials = [
    {
      name: "Exotic Walnut Veneer",
      type: "Custom Millwork",
      desc: "Premium, grain-matched walnut sheets imported from European groves, sealed with a velvet matte finish.",
      details: "Our veneer panels are matched grain-by-grain from a single walnut log to ensure visual continuity across large architectural elements. Coated in a customized non-yellowing polyurethane sealant.",
      img: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Statuario Marble",
      type: "Flooring & Walls",
      desc: "Extraordinary Italian marble slabs selected in Carrara, meticulously book-matched on-site.",
      details: "Individually selected for grain character, sweeping grey veins, and pristine white background. Each slab is calibrated on-site, installed using dry-lay layout checking, and finished to a custom semi-gloss luster.",
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Bespoke Italian Lacquer",
      type: "Custom Cabinetry",
      desc: "Applied in 7 coats under strictly controlled dust-free chambers, yielding liquid reflections.",
      details: "Features a heavy-duty scratch resistant acrylic lacquer base cured under precise thermal control. Zero orange-peel texture, offering absolute mirror reflections with long-term ultraviolet protection.",
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Handcrafted Brushed Brass",
      type: "Details & Accents",
      desc: "Oxidized and brushed by hand, adding warm, shimmering structural details and luxurious custom hardware.",
      details: "Constructed of high-purity solid brass profiles. Hand-polished, patinated, and finished with a micro-thin transparent lacquer to resist oxidation while retaining natural warmth.",
      img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Live Curation Calculations
  const calcConsultationHours = Math.round((estateSize / 1000) * 24 + (addons.concierge ? 15 : 0));
  const calcSpotlights = Math.round((estateSize / 100) * 1.5 + (addons.lighting ? 25 : 0));
  const calcVeneerSquareFeet = addons.veneer ? Math.round(estateSize * 0.45) : 0;
  const calcMarbleAllocation = addons.statuario ? Math.round(estateSize * 0.6) : 0;

  // Premium Live Luxury Quotation Calculator
  const calcBaseCost = estateSize * 2400; // base luxury interior rate per sqft
  const calcMarbleCost = addons.statuario ? estateSize * 900 : 0;
  const calcVeneerCost = addons.veneer ? estateSize * 600 : 0;
  const calcAcousticCost = addons.acoustic ? 140000 : 0;
  const calcLightingCost = addons.lighting ? 190000 : 0;
  const calcConciergeCost = addons.concierge ? 160000 : 0;

  const totalLuxeCost = calcBaseCost + calcMarbleCost + calcVeneerCost + calcAcousticCost + calcLightingCost + calcConciergeCost;

  const formatCostLakhs = (amt) => {
    return `₹${(amt / 100000).toFixed(2)} Lakhs`;
  };

  // Split-Screen slider movement handler
  const handleSliderMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - box.left;
    const percentage = Math.max(0, Math.min(100, (x / box.width) * 100));
    setSliderPos(percentage);
  };

  const handleApplyCuration = () => {
    let requests = `Orniva Luxe Curation Configuration:\n`;
    requests += `- Estate Size: ${estateSize} sqft\n`;
    requests += `- Dedicated Curation Hours: ${calcConsultationHours} Hours\n`;
    requests += `- Statuario Marble: ${addons.statuario ? `Yes (~${calcMarbleAllocation} sqft)` : 'No'}\n`;
    requests += `- Walnut Veneer Paneling: ${addons.veneer ? `Yes (~${calcVeneerSquareFeet} sqft)` : 'No'}\n`;
    requests += `- Acoustic Sound Mapping: ${addons.acoustic ? 'Yes' : 'No'}\n`;
    requests += `- Recessed Italian Lighting: ${addons.lighting ? `Yes (~${calcSpotlights} spotlights)` : 'No'}\n`;
    requests += `- Dynamic Estimate: ${formatCostLakhs(totalLuxeCost)}\n`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(requests).then(() => {
        setToastMessage("✓ Luxe Curation specs copied to clipboard! Redirecting to Cal.com...");
        setTimeout(() => {
          setToastMessage("");
          window.open("https://cal.com/orniva-design-studio/orniva-luxe", "_blank");
        }, 2000);
      }).catch((err) => {
        console.error("Could not copy specs: ", err);
        window.open("https://cal.com/orniva-design-studio/orniva-luxe", "_blank");
      });
    } else {
      window.open("https://cal.com/orniva-design-studio/orniva-luxe", "_blank");
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const userMsg = { sender: 'client', text: newMessageText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    setNewMessageText("");
    setIsBotTyping(true);

    // Simulated reply from Principal Designer
    setTimeout(() => {
      const replies = [
        "Absolutely, we've cataloged your choice! The custom brushed brass hardware handles are being hand-cast in the foundry tomorrow. I will send over photos as soon as they're ready.",
        "Perfect. I am adding this coordinate shift to the site layout tracking. You will see the revised lighting electrical nodes updated in your digital live portal in 2 hours.",
        "Understood! We've reserved the matching wood logs from our walnut stock to guarantee the grain profile flows beautifully across your master cabinet wall."
      ];
      const botMsg = {
        sender: 'designer',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMsg]);
      setIsBotTyping(false);
    }, 1500);
  };



  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % luxeProjects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + luxeProjects.length) % luxeProjects.length);
  };

  return (
    <div className="bg-[#070708] text-white overflow-hidden min-h-screen">
      
      {/* 1. Luxe Hero Section */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center justify-center pt-28 pb-24 overflow-hidden"
      >
        {/* Subtle grid pattern background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none" />
        
        {/* Glowing warm radial backdrop */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
        
        {/* Interactive mouse-following radial light leak */}
        <div 
          className="absolute pointer-events-none rounded-full blur-[120px] opacity-35 mix-blend-screen transition-transform duration-700 ease-out z-10"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(197,164,126,0.18) 0%, rgba(197,164,126,0.03) 60%, transparent 100%)',
          }}
        />

        {/* Breathing atmospheric glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-[140px] animate-[pulse_10s_infinite_alternate] pointer-events-none z-10" />

        {/* Fullscreen Hero background image with luxury overlay */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#070708]/95 via-[#070708]/80 to-[#070708] backdrop-blur-[1px] z-10" />
          <motion.img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
            alt="Orniva Luxe Interior"
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1.12, opacity: 1 }}
            transition={{ 
              scale: { duration: 25, ease: "linear" },
              opacity: { duration: 1.2, ease: "easeInOut" }
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-20 flex justify-center">
          <div className="w-full max-w-4xl flex flex-col items-center text-center space-y-8 pb-20">
            
            {/* Luxury Watermark / Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className="text-[10px] tracking-[0.45em] uppercase text-accent/80 font-semibold font-serif drop-shadow-md">ORNIVA ATELIER LUXE</span>
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </motion.div>
            
            {/* Majestic Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-heading font-light leading-[1.05] text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] max-w-3xl"
            >
              <span className="font-heading tracking-[0.05em] uppercase text-[0.9em] opacity-90 block mb-2">The Art of</span>
              <span className="font-heading italic inline-block pl-2 pr-6 pb-3 font-semibold mt-2 leading-[1.2] text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#e2c199] to-accent drop-shadow-[0_4px_20px_rgba(197,164,126,0.25)]">
                Extraordinary Living
              </span>
            </motion.h1>

            {/* Static Premium Editorial Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-300/80 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] tracking-wide"
            >
              Bespoke interiors born from legacy craftsmanship — where every material,
              every proportion, and every detail is a deliberate act of beauty.
            </motion.p>

            {/* Action Button with Sweeping Shimmer Reflection */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-4 w-full flex justify-center relative z-20"
            >
              <a 
                href="https://cal.com/orniva-design-studio/orniva-luxe"
                target="_blank"
                rel="noreferrer"
                className="px-10 py-5 bg-accent hover:bg-accent/95 text-primary font-heading font-bold rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-accent/20 hover:scale-[1.03] inline-flex items-center gap-3 relative group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>Secure Consultation</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                
                {/* Glass Sweeping Reflection Shimmer Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12"
                  initial={{ left: '-100%' }}
                  animate={{ left: '200%' }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatDelay: 4.5, 
                    duration: 1.5, 
                    ease: 'easeInOut' 
                  }}
                />
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </motion.div>

            {/* Accolades Trust Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-white/10 w-full max-w-2xl flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 text-xs text-neutral-400 font-medium tracking-[0.15em] uppercase"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping shrink-0" />
                <span>Founder-Led Atelier</span>
              </div>
              <div className="hidden sm:block w-[1px] h-4 bg-accent/30 pointer-events-none" />
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping shrink-0" />
                <span>100% Raw Sourcing</span>
              </div>
              <div className="hidden sm:block w-[1px] h-4 bg-accent/30 pointer-events-none" />
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping shrink-0" />
                <span>White-Glove Handover</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scrolling Indicator at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-accent/50 z-20 pointer-events-none">
          <span className="text-[9px] tracking-[0.3em] uppercase font-semibold">Scroll to Explore</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-[1.5px] h-10 bg-gradient-to-b from-accent to-transparent"
          />
        </div>
      </section>

      {/* NEW INTERACTIVE FEATURE: 2. Before/After Split Slider Section (Photorealistic Rendering vs. Reality) */}
      <section className="py-24 bg-[#050506] border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Cohesive Conception</span>
            <h2 className="text-3xl md:text-5xl font-heading font-normal text-white">Rendering vs. Handover Reality</h2>
            <p className="text-neutral-500 text-sm md:text-base font-light">Drag the center golden handle to witness how our photorealistic designs translate 100% into completed physical reality.</p>
          </div>

          {/* Interactive Slider Box */}
          <div 
            className="relative h-[300px] sm:h-[450px] md:h-[520px] rounded-3xl overflow-hidden border border-white/10 cursor-ew-resize shadow-2xl select-none"
            onMouseMove={handleSliderMove}
            onTouchMove={handleSliderMove}
          >
            {/* Base Image (Reality) */}
            <div className="absolute inset-0 select-none">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" 
                alt="Reality Interior Setup" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 right-6 bg-primary/80 backdrop-blur-md px-4 py-2 border border-white/5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent z-20">
                Reality Handover
              </div>
            </div>

            {/* Overlapping Image (Rendering - Clamped by clipPath polygon) */}
            <div 
              className="absolute inset-0 select-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
              }}
            >
              {/* Monochromatic look representing the architectural CAD render */}
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" 
                alt="3D CAD Design Render" 
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-75 sepia-[0.15]"
              />
              <div className="absolute bottom-6 left-6 bg-accent/90 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider z-20">
                Atelier 3D Concept Design
              </div>
            </div>

            {/* Divider Handle */}
            <div 
              className="absolute inset-y-0 w-[2px] bg-accent z-30"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-accent text-primary rounded-full flex items-center justify-center shadow-xl border border-white/20 select-none">
                <Sliders size={18} className="rotate-90" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Opulence Philosophy Section */}
      <section className="py-24 bg-[#070708] border-t border-white/5 relative overflow-hidden">
        {/* Massive elegant watermark "O" in background */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 text-accent/[0.02] text-[28rem] font-heading font-light pointer-events-none select-none z-0">
          O
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:col-span-5 space-y-6"
            >
              <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Philosophy of Atelier</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-normal leading-tight text-white">
                An aura of grandeur, a touch of opulence and a symphony of thoughtful designs.
              </h2>
              <div className="h-[1px] w-24 bg-accent/40" />
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:col-span-7 space-y-6 text-sm sm:text-base md:text-lg font-light leading-relaxed text-neutral-400"
            >
              <p>
                We believe that a luxury home represents far more than beautiful styling—it is a sophisticated, deeply customized sanctuary woven meticulously around your family's daily life vectors.
              </p>
              <p>
                At Orniva Luxe, every design concept begins with custom lifestyle audits. We mathematically calculate light corridors, acoustically analyze media spaces, analyze material toxicity coefficients, and layout complete functional zones.
              </p>
              
              {/* Highlight cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left relative z-10">
                <div className="p-6 bg-gradient-to-b from-white/[0.02] to-transparent border border-accent/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md hover:scale-[1.03] hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(197,164,126,0.1)] transition-all duration-500 group cursor-default">
                  <div className="text-accent mb-3 group-hover:scale-110 transition-transform duration-300"><Volume2 size={26} /></div>
                  <h4 className="font-heading font-medium text-white text-base mb-1 group-hover:text-accent transition-colors duration-300">Acoustic Engineering</h4>
                  <p className="text-xs text-neutral-400">Meticulous spatial sound mapping for bedrooms and media lounges to guarantee sanctuary silence.</p>
                </div>
                
                <div className="p-6 bg-gradient-to-b from-white/[0.02] to-transparent border border-accent/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md hover:scale-[1.03] hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(197,164,126,0.1)] transition-all duration-500 group cursor-default">
                  <div className="text-accent mb-3 group-hover:scale-110 transition-transform duration-300"><Sun size={26} /></div>
                  <h4 className="font-heading font-medium text-white text-base mb-1 group-hover:text-accent transition-colors duration-300">Seasonal Daylight Mapping</h4>
                  <p className="text-xs text-neutral-400">Orienting premium seating arrays and workspace desks exactly aligned with local sun vectors.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* NEW INTERACTIVE FEATURE: 4. Interactive Acoustic mapping & Soundwave Mapping widget */}
      <section className="py-24 bg-[#050506] border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Scientific Acoustics</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-normal text-white">Atelier Soundscape Analyzer</h2>
            <p className="text-neutral-500 text-sm md:text-base font-light">Click different sanctuary zones to analyze mathematically calibrated decibel (dB) reduction ratios.</p>
          </div>

          <div className="bg-[#111113]/60 border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Zone Controls */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-accent/5 border border-accent/20 px-2 py-0.5 rounded">
                Sanctuary Zones
              </span>
              
              {[
                { key: 'Sanctuary', title: 'Master Sanctuary Bedsuite', db: '-42 dB', absorber: 'Double-Wall Clad Walnut Slats' },
                { key: 'Living', title: 'Great Room Living Lounge', db: '-28 dB', absorber: 'Perforated Acoustic Timber Ceilings' },
                { key: 'Cinema', title: 'Atelier Media Cinema Room', db: '-65 dB', absorber: 'High-Density Sound Fabric Panels' }
              ].map((room) => (
                <button
                  key={room.key}
                  onClick={() => { setAcousticRoom(room.key); setSoundPlaying(true); }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex justify-between items-center relative overflow-hidden ${
                    acousticRoom === room.key 
                      ? 'bg-neutral-900/80 border-accent/40 border-l-4 border-l-accent pl-6 text-accent' 
                      : 'bg-transparent border-white/5 text-neutral-400 hover:border-white/15 pl-5 hover:pl-6'
                  }`}
                >
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-white">{room.title}</h4>
                    <p className="text-[11px] text-neutral-500 mt-1">{room.absorber}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-accent font-heading">{room.db}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Interactive soundwave player log */}
            <div className="lg:col-span-7 bg-[#080809] border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col justify-between min-h-[340px] space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Live Acoustic Isolation Analytics</h4>
                  <span className="text-xl font-heading font-semibold text-white mt-1 block">
                    {acousticRoom === 'Sanctuary' ? 'Master Bedroom Sanctuary' : acousticRoom === 'Living' ? 'Living Room Acoustics' : 'Media Cinema Room'}
                  </span>
                </div>
                
                <button 
                  onClick={() => setSoundPlaying(!soundPlaying)}
                  className="p-3 bg-accent text-primary rounded-full hover:bg-accent/80 transition-colors shadow-lg"
                >
                  {soundPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
              </div>

              {/* Two-column layout: visualizer + comparative decibel gauges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Column 1: Soundwaves Bar Animation */}
                <div className="bg-[#111113]/40 border border-white/5 p-4 rounded-xl flex flex-col justify-center h-32">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest text-center block mb-2 font-medium">Wave Spectrum</span>
                  <div className="h-16 flex items-end gap-1.5 justify-center overflow-hidden py-1 select-none">
                    {Array.from({ length: 12 }).map((_, waveIdx) => {
                      const randomHeight = soundPlaying 
                        ? [40, 80, 20, 95, 55, 30, 85, 45, 60][(waveIdx + (acousticRoom === 'Sanctuary' ? 2 : acousticRoom === 'Living' ? 5 : 7)) % 9]
                        : 15;
                      return (
                        <motion.div
                          key={waveIdx}
                          animate={{ height: `${randomHeight}%` }}
                          transition={{ type: 'spring', stiffness: 200, damping: 10, mass: 0.5 }}
                          className={`w-2.5 rounded-full bg-gradient-to-t from-accent/20 to-accent ${
                            soundPlaying ? 'shadow-[0_0_10px_rgba(197,164,126,0.5)] opacity-100' : 'bg-neutral-850 opacity-40'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Column 2: Decibel Comparative Gauges */}
                <div className="space-y-3">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-[0.15em] block font-medium">Acoustic Isolation (dB incoming)</span>
                  
                  {/* Gauge 1: Standard Luxury Home */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold">
                      <span className="text-neutral-400">Standard Luxury Home</span>
                      <span className="text-red-400/80">52 dB (Noisy)</span>
                    </div>
                    <div className="w-full bg-[#030304] border border-white/5 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-red-950 to-red-500/70 h-full rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  {/* Gauge 2: Boutique Suite */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold">
                      <span className="text-neutral-400">Standard Boutique Suite</span>
                      <span className="text-amber-400/70">38 dB (Quiet)</span>
                    </div>
                    <div className="w-full bg-[#030304] border border-white/5 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-950 to-amber-500/70 h-full rounded-full transition-all duration-500" style={{ width: '62%' }}></div>
                    </div>
                  </div>

                  {/* Gauge 3: Orniva Sanctuary (Active Room) */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold">
                      <span className="text-accent">Orniva Sanctuary Zone</span>
                      <span className="text-accent font-bold">
                        {acousticRoom === 'Sanctuary' ? '22 dB' : acousticRoom === 'Living' ? '35 dB' : '18 dB'} (Sanctuary)
                      </span>
                    </div>
                    <div className="w-full bg-[#030304] border border-accent/20 rounded-full h-2 overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
                      <div 
                        className="bg-gradient-to-r from-accent/40 via-accent to-[#e2c199] h-full rounded-full transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(197,164,126,0.8)]" 
                        style={{ 
                          width: acousticRoom === 'Sanctuary' ? '35%' : acousticRoom === 'Living' ? '57%' : '28%' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-neutral-500 border-t border-white/5 pt-4">
                <span className="flex items-center gap-1">
                  <CheckCircle size={10} className="text-accent" />
                  <span>Acoustically Certified Studio</span>
                </span>
                <span>Active DB Limit: {acousticRoom === 'Sanctuary' ? '22 dB (Ultra Sanctuary)' : acousticRoom === 'Living' ? '35 dB (Pleasant Ambient)' : '18 dB (Cinema Quiet)'}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* NEW INTERACTIVE FEATURE: 5. Seasonal Daylight Orientation widget */}
      <section className="py-24 bg-[#070708] border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Daylight Vectors</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-normal text-white">Seasonal Orientation Mapper</h2>
            <p className="text-neutral-500 text-sm md:text-base font-light">Toggle between seasons to simulate solar light angles entering our premium seating arrays.</p>
          </div>

          <div className="bg-[#111113]/60 border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left descriptive vectors with dynamic sundial SVG */}
            <div className="lg:col-span-7 bg-[#080809] border border-white/5 p-6 sm:p-8 rounded-2xl relative min-h-[340px] flex flex-col justify-between overflow-hidden">
              
              {/* COMPASS SUNDIAL SVG GRAPHIC */}
              <div className="hidden sm:flex absolute right-4 bottom-4 w-40 h-40 md:w-48 md:h-48 border border-white/10 rounded-full items-center justify-center bg-gradient-to-b from-[#111113]/80 to-transparent shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md pointer-events-none select-none">
                <div className="absolute inset-4 border border-dashed border-accent/15 rounded-full animate-[spin_100s_linear_infinite]" />
                <span className="absolute top-2 text-[8px] font-bold text-accent/60 tracking-widest">N</span>
                <span className="absolute bottom-2 text-[8px] font-bold text-accent/60 tracking-widest">S</span>
                <span className="absolute left-2 text-[8px] font-bold text-accent/60 tracking-widest">W</span>
                <span className="absolute right-2 text-[8px] font-bold text-accent/60 tracking-widest">E</span>

                {/* Precision watch face markings */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Fine coordinate lines */}
                  <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(197, 164, 126, 0.08)" strokeWidth="0.5" />
                  <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(197, 164, 126, 0.08)" strokeWidth="0.5" />

                  {/* Outer delicate ring markings */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(197, 164, 126, 0.15)" strokeWidth="0.75" />
                  <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(197, 164, 126, 0.05)" strokeWidth="0.5" strokeDasharray="1 3" />
                  
                  {/* Astrolabe degree tick marks */}
                  <line x1="50" y1="5" x2="50" y2="8" stroke="rgba(197, 164, 126, 0.4)" strokeWidth="0.75" />
                  <line x1="50" y1="92" x2="50" y2="95" stroke="rgba(197, 164, 126, 0.4)" strokeWidth="0.75" />
                  <line x1="5" y1="50" x2="8" y2="50" stroke="rgba(197, 164, 126, 0.4)" strokeWidth="0.75" />
                  <line x1="92" y1="50" x2="95" y2="50" stroke="rgba(197, 164, 126, 0.4)" strokeWidth="0.75" />
                  <line x1="18.2" y1="18.2" x2="20.3" y2="20.3" stroke="rgba(197, 164, 126, 0.25)" strokeWidth="0.5" />
                  <line x1="81.8" y1="18.2" x2="79.7" y2="20.3" stroke="rgba(197, 164, 126, 0.25)" strokeWidth="0.5" />
                  <line x1="18.2" y1="81.8" x2="20.3" y2="79.7" stroke="rgba(197, 164, 126, 0.25)" strokeWidth="0.5" />
                  <line x1="81.8" y1="81.8" x2="79.7" y2="79.7" stroke="rgba(197, 164, 126, 0.25)" strokeWidth="0.5" />

                  {/* Base Solar Path Guide Arc */}
                  <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="0.5" />
                  
                  {/* Sun Arc Path depending on season (Animated Path) */}
                  <motion.path 
                    animate={{
                      d: daylightSeason === 'Summer' 
                        ? "M 15 50 A 35 35 0 0 1 85 50" 
                        : daylightSeason === 'Equinox'
                        ? "M 20 50 A 30 30 0 0 1 80 50" 
                        : "M 25 50 A 25 25 0 0 1 75 50"
                    }}
                    transition={{ type: 'spring', stiffness: 80, damping: 14 }}
                    fill="none" 
                    stroke="rgba(197, 164, 126, 0.35)" 
                    strokeWidth="1.25" 
                    strokeDasharray="2.5 2.5"
                  />

                  {/* Active Sun position on arc - Spring Animated */}
                  <motion.circle 
                    cx="50"
                    animate={{
                      cy: daylightSeason === 'Summer' ? 15 : daylightSeason === 'Equinox' ? 20 : 25
                    }}
                    transition={{ type: 'spring', stiffness: 80, damping: 14 }}
                    r="4.5" 
                    fill="#C5A47E" 
                    className="shadow-[0_0_15px_#C5A47E]"
                  />

                  {/* Radiating Sun Rays - Spring Animated */}
                  <motion.line 
                    x1="50" 
                    animate={{
                      y1: daylightSeason === 'Summer' ? 15 : daylightSeason === 'Equinox' ? 20 : 25
                    }}
                    transition={{ type: 'spring', stiffness: 80, damping: 14 }}
                    x2="50" 
                    y2="50" 
                    stroke="rgba(197, 164, 126, 0.45)" 
                    strokeWidth="0.75" 
                    strokeDasharray="1.5 1.5"
                  />

                  {/* Center Seating Array anchor node */}
                  <circle cx="50" cy="50" r="3.5" fill="#fff" stroke="rgba(197, 164, 126, 0.5)" strokeWidth="1" />

                  {/* Shadow Cast vector - Spring Animated */}
                  <motion.line 
                    x1="50" 
                    y1="50" 
                    x2="50" 
                    animate={{
                      y2: daylightSeason === 'Summer' ? 58 : daylightSeason === 'Equinox' ? 68 : 78
                    }}
                    transition={{ type: 'spring', stiffness: 80, damping: 14 }}
                    stroke="rgba(255, 255, 255, 0.25)" 
                    strokeWidth="1.5" 
                  />
                </svg>

                {/* Sun angle overlay text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-12 bg-[#070708]/95 border border-accent/30 px-2 py-0.5 rounded text-[8px] font-bold text-accent shadow-lg">
                  {daylightSeason === 'Summer' ? '78° Summer' : daylightSeason === 'Equinox' ? '45° Equinox' : '32° Winter'}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-accent/5 border border-accent/20 px-2 py-0.5 rounded">
                  Daylight Simulation Vector
                </span>
                
                <h3 className="text-2xl font-heading font-semibold text-white mt-4">
                  {daylightSeason === 'Summer' ? 'Summer Solstice (High Angle)' : daylightSeason === 'Equinox' ? 'Vernal Equinox (Direct Path)' : 'Winter Solstice (Low Soft Exposure)'}
                </h3>
                
                <p className="text-xs text-neutral-400 leading-relaxed max-w-md mt-2">
                  {daylightSeason === 'Summer' 
                    ? 'Solar elevation reaches peak ~78° angle. Seating is designed with custom structural deep-coffered veneer overhangs to shadow harsh mid-day glare completely.'
                    : daylightSeason === 'Equinox'
                    ? 'Perfect balance at ~45° solar vector. Direct sunlight channels naturally along our book-matched statuario floor corridors to double ambient room luminance.'
                    : 'Low-angle winter solar arcs at ~32°. Soft daylight penetrates deeply. Desks and lounge seating are perfectly aligned to receive comforting thermal glow.'
                  }
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-[10px] text-neutral-500 max-w-xs z-10">
                <div>
                  <span className="font-semibold block text-neutral-500 uppercase tracking-wide">Solar Angle Elevation</span>
                  <span className="text-white text-xs font-semibold mt-0.5 block">{daylightSeason === 'Summer' ? '78° Peak' : daylightSeason === 'Equinox' ? '45° Direct' : '32° Deep'}</span>
                </div>
                <div>
                  <span className="font-semibold block text-neutral-500 uppercase tracking-wide">Layout Curation</span>
                  <span className="text-accent text-xs font-semibold mt-0.5 block">{daylightSeason === 'Summer' ? 'Glared Shielding' : daylightSeason === 'Equinox' ? 'Ambient Double' : 'Thermal Capture'}</span>
                </div>
              </div>
            </div>

            {/* Right seasons controls */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">Select Season Profile</span>
              
              {[
                { key: 'Summer', label: 'Summer Solstice (Peak Light)', angle: '78° High Angle', icon: Sun },
                { key: 'Equinox', label: 'Vernal Equinox (Balanced)', angle: '45° Balanced Path', icon: SunDim },
                { key: 'Winter', label: 'Winter Solstice (Soft Warm)', angle: '32° Soft Penetration', icon: Compass }
              ].map((season) => {
                const IconComponent = season.icon;
                const isActive = daylightSeason === season.key;
                return (
                  <button
                    key={season.key}
                    onClick={() => setDaylightSeason(season.key)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 relative group ${
                      isActive 
                        ? 'bg-neutral-900 border-accent/40 text-accent shadow-xl shadow-accent/5' 
                        : 'bg-transparent border-white/5 text-neutral-400 hover:border-white/15 hover:text-white'
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${isActive ? 'bg-accent text-primary' : 'bg-neutral-850 text-accent group-hover:bg-neutral-850'}`}>
                      <IconComponent size={16} />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm text-white">{season.label}</h4>
                      <p className="text-[10px] text-neutral-500 mt-0.5">{season.angle}</p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 6. Atelier Spatial Curation Calculator (High-End Interactive Tool) */}
      <section id="curation-calculator-section" className="py-24 bg-[#050506] border-t border-white/5 relative">
        <div className="absolute inset-0 bg-accent/[0.01] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Interactive Planner</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-normal">Spatial Curation Planner</h2>
            <p className="text-neutral-500 text-sm md:text-base font-light">Custom estimate design ratios, raw material allocations, and concierge hours instantly.</p>
          </div>

          <div className="bg-[#111113]/60 border border-white/10 p-6 md:p-10 rounded-3xl backdrop-blur-md shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Inputs Panel */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Estate Area (sqft)</label>
                  <span className="text-accent font-heading font-bold text-lg">{estateSize.toLocaleString()} sqft</span>
                </div>
                
                <input 
                  type="range" min="1500" max="10000" step="500"
                  value={estateSize} onChange={e => setEstateSize(Number(e.target.value))}
                  className="w-full h-1 bg-gradient-to-r from-accent/20 via-accent/60 to-accent rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(197,164,126,0.8)] [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125 focus:outline-none"
                />
                
                <div className="flex justify-between text-[10px] text-neutral-600 font-medium">
                  <span>1,500 sqft</span>
                  <span>5,000 sqft</span>
                  <span>10,000 sqft</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">Premium Atelier Add-Ons</label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setAddons({ ...addons, statuario: !addons.statuario })}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                      addons.statuario ? 'bg-accent/10 border-accent text-accent' : 'bg-neutral-900 border-white/5 text-neutral-400 hover:border-white/10'
                    }`}
                  >
                    <span>Statuario Book-Matched Marble</span>
                    {addons.statuario ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 border border-neutral-700 rounded-full" />}
                  </button>

                  <button
                    onClick={() => setAddons({ ...addons, veneer: !addons.veneer })}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                      addons.veneer ? 'bg-accent/10 border-accent text-accent' : 'bg-neutral-900 border-white/5 text-neutral-400 hover:border-white/10'
                    }`}
                  >
                    <span>Walnut Veneer Paneling</span>
                    {addons.veneer ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 border border-neutral-700 rounded-full" />}
                  </button>

                  <button
                    onClick={() => setAddons({ ...addons, acoustic: !addons.acoustic })}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                      addons.acoustic ? 'bg-accent/10 border-accent text-accent' : 'bg-neutral-900 border-white/5 text-neutral-400 hover:border-white/10'
                    }`}
                  >
                    <span>Acoustic Sound Mapping</span>
                    {addons.acoustic ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 border border-neutral-700 rounded-full" />}
                  </button>

                  <button
                    onClick={() => setAddons({ ...addons, lighting: !addons.lighting })}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                      addons.lighting ? 'bg-accent/10 border-accent text-accent' : 'bg-neutral-900 border-white/5 text-neutral-400 hover:border-white/10'
                    }`}
                  >
                    <span>Recessed Italian Lighting</span>
                    {addons.lighting ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 border border-neutral-700 rounded-full" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Display Results Panel */}
            <div className="lg:col-span-6 bg-neutral-900/60 p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6 relative overflow-hidden">
              {/* Subtle Ambient Gold Glow in calculator */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-accent/5 border border-accent/20 px-2 py-0.5 rounded">
                    Calculated Spatial Allocations
                  </span>
                  <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-semibold">Atelier Standard Rate</span>
                </div>

                {/* Main Estimated Cost Display - Shimmering Velvet Dashboard Overlay */}
                <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-accent/20 p-5 rounded-2xl text-center space-y-1 relative shadow-[0_8px_32px_rgba(197,164,126,0.05)] overflow-hidden group">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] block font-medium">Bespoke Curation Estimate</span>
                  <div className="text-3xl sm:text-4xl font-heading font-semibold text-accent tracking-tight py-1 relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] bg-clip-text text-transparent filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                      {formatCostLakhs(totalLuxeCost)}
                    </span>
                    {/* Sweeping shimmer effect on text */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none mix-blend-overlay"
                      initial={{ left: '-100%' }}
                      animate={{ left: '200%' }}
                      transition={{ 
                        repeat: Infinity, 
                        repeatDelay: 3.5, 
                        duration: 1.8, 
                        ease: 'easeInOut' 
                      }}
                    />
                  </div>
                  <span className="text-[9px] text-neutral-400 block leading-tight pt-1">Includes 0% Direct-to-Consumer Markup & Founder Supervision</span>
                </div>

                <div className="divide-y divide-white/5 text-sm space-y-3 pt-1">
                  
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-neutral-400 font-light flex items-center gap-1.5 text-xs">
                      <Clock size={12} className="text-accent" />
                      <span>Dedicated Curation Hours</span>
                    </span>
                    <span className="font-heading font-medium text-xs text-white">{calcConsultationHours} Atelier Hours</span>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <span className="text-neutral-400 font-light flex items-center gap-1.5 text-xs">
                      <Sparkles size={12} className="text-accent" />
                      <span>Statuario Premium Slabs</span>
                    </span>
                    <span className="font-heading font-medium text-xs text-white">
                      {addons.statuario ? `${calcMarbleAllocation.toLocaleString()} sqft (~₹${((calcMarbleCost)/100000).toFixed(1)}L)` : 'Not Selected'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <span className="text-neutral-400 font-light flex items-center gap-1.5 text-xs">
                      <Layers size={12} className="text-accent" />
                      <span>Veneer Sheet Inventory</span>
                    </span>
                    <span className="font-heading font-medium text-xs text-white">
                      {addons.veneer ? `${calcVeneerSquareFeet.toLocaleString()} sqft (~₹${((calcVeneerCost)/100000).toFixed(1)}L)` : 'Not Selected'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <span className="text-neutral-400 font-light flex items-center gap-1.5 text-xs">
                      <Sun size={12} className="text-accent" />
                      <span>Italian Luminaries Recessed</span>
                    </span>
                    <span className="font-heading font-medium text-xs text-white">
                      {calcSpotlights} spots (~₹${((calcLightingCost)/100000).toFixed(1)}L)
                    </span>
                  </div>

                </div>
              </div>

              <button
                onClick={handleApplyCuration}
                className="w-full py-4 bg-accent hover:bg-accent/90 text-primary font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-accent/10"
              >
                <span>Secure Curation & Book Consultation</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 7. The Four Pillars of Luxe (Interactive Timeline) */}
      <section className="py-24 bg-[#070708] border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Unfolding the Vision</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-normal">How Luxe Homes Come to Life</h2>
            <p className="text-neutral-500 text-sm md:text-base font-light">Explore the detailed physical milestones driving our white-glove creation journey.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Nav Elements with Vertical timeline axis (Brushed Brass Rod) */}
            <div className="lg:col-span-5 relative pl-12 space-y-6">
              {/* Brushed brass timeline rod */}
              <div className="absolute left-[22px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-accent/70 via-accent/30 to-accent/70 pointer-events-none" />

              {luxeSteps.map((step, idx) => {
                const IconComponent = step.icon;
                const isActive = idx === activeStep;
                return (
                  <div key={idx} className="relative group/timeline">
                    {/* Floating interactive timeline node/pip */}
                    <div 
                      className="absolute left-[-26px] top-11 -translate-x-1/2 z-10 flex items-center justify-center pointer-events-none"
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.35 : 1.0,
                          borderColor: isActive ? '#C5A47E' : 'rgba(197, 164, 126, 0.25)',
                          backgroundColor: isActive ? '#070708' : '#111113',
                          boxShadow: isActive ? '0 0 15px rgba(197, 164, 126, 0.4)' : 'none'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="w-5 h-5 rounded-full border-2 bg-primary flex items-center justify-center shadow-lg"
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="activeTimelineNodeCore"
                            className="w-2 h-2 rounded-full bg-accent"
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          />
                        )}
                      </motion.div>
                    </div>

                    <button
                      onClick={() => setActiveStep(idx)}
                      className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 relative group ${
                        isActive 
                          ? 'bg-neutral-900 border-accent/40 shadow-xl shadow-accent/5' 
                          : 'bg-transparent border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`p-3 rounded-xl transition-colors shrink-0 ${
                        isActive ? 'bg-accent text-primary' : 'bg-neutral-800 text-accent group-hover:bg-neutral-700'
                      }`}>
                        <IconComponent size={20} />
                      </div>

                      <div>
                        <h4 className={`font-heading font-medium text-lg transition-colors ${isActive ? 'text-accent' : 'text-white'}`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1 font-medium tracking-wide uppercase">{step.subtitle}</p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right Display Panel */}
            <div className="lg:col-span-7 bg-[#111113]/60 border border-white/5 p-6 sm:p-8 rounded-3xl relative min-h-[420px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                      {luxeSteps[activeStep].subtitle}
                    </span>
                    <h3 className="text-2xl font-heading font-semibold mt-2 text-white">
                      {luxeSteps[activeStep].title}
                    </h3>
                  </div>

                  <p className="text-neutral-400 leading-relaxed font-light text-sm sm:text-base md:text-lg">
                    {luxeSteps[activeStep].desc}
                  </p>

                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">Deliverables & Curation</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {luxeSteps[activeStep].highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-sm text-neutral-300">
                          <CheckCircle size={14} className="text-accent shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-8 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500">
                <span>Milestone {activeStep + 1} of 4</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                    disabled={activeStep === 0}
                    className="p-2 rounded-full border border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={() => setActiveStep(prev => Math.min(luxeSteps.length - 1, prev + 1))}
                    disabled={activeStep === luxeSteps.length - 1}
                    className="p-2 rounded-full border border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8. Interactive WhatsApp Curation Feed (Concierge Showcase) */}
      <section className="py-24 bg-[#050506] border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">White-Glove Communication</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-normal">24/7 Concierge Feed</h2>
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
                Experience direct connection. Completely bypass standard administrative accounts. You have an immediate, interactive feed directly to your principal designer, receiving physical site photos and milestone validations.
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0">
                  <Smartphone size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Simulated Chat Simulator</h4>
                  <p className="text-[11px] text-neutral-500">Test a conversation with our designer in real-time below.</p>
                </div>
              </div>
            </div>

            {/* Simulated Chat Feed Widget */}
            <div className="lg:col-span-7 bg-[#0a0a0b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[400px]">
              {/* Header */}
              <div className="bg-[#111113] px-6 py-4 border-b border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-heading font-bold text-primary">
                  O
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Principal Designer (Orniva Luxe)</h4>
                  <p className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span>Active Now</span>
                  </p>
                </div>
              </div>

              {/* Chat Log */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4 scroll-smooth">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col max-w-[80%] ${msg.sender === 'client' ? 'ml-auto items-end' : 'items-start'}`}
                  >
                    <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'client' 
                        ? 'bg-accent text-primary font-medium rounded-tr-none shadow-md' 
                        : 'bg-[#19191c] text-neutral-300 rounded-tl-none border border-white/5'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-neutral-500 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}

                {isBotTyping && (
                  <div className="flex flex-col items-start max-w-[80%]">
                    <div className="bg-[#19191c] border border-white/5 p-4 rounded-2xl rounded-tl-none text-xs text-neutral-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-[#111113] border-t border-white/5 flex gap-2">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={e => setNewMessageText(e.target.value)}
                  className="flex-grow bg-[#19191c] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent"
                  placeholder="Ask designer about marble, finishes..."
                />
                <button
                  type="submit"
                  className="p-3 bg-accent hover:bg-accent/90 text-primary rounded-xl flex items-center justify-center transition-colors"
                >
                  <Send size={14} />
                </button>
              </form>

            </div>

          </div>
        </div>
      </section>

      {/* 9. Atelier Custom Materials Grid */}
      <section className="py-24 bg-[#070708] border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Bespoke Curation</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-normal text-white">Authentic Textures & Materials</h2>
            <p className="text-neutral-500 text-sm md:text-base font-light">We craft with absolute structural integrity. Touch and feel authentic wood veneers, raw brass, and book-matched marble.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {luxeMaterials.map((mat, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedMaterial(mat)}
                className="bg-[#111113] border border-white/5 rounded-2xl overflow-hidden group hover:border-accent/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="h-48 overflow-hidden relative select-none">
                  <div className="absolute inset-0 bg-[#070708]/30 group-hover:bg-[#070708]/0 transition-colors z-10" />
                  <img 
                    src={mat.img} 
                    alt={mat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-primary/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={12} className="text-accent" />
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-accent bg-accent/5 border border-accent/20 px-2 py-0.5 rounded">
                      {mat.type}
                    </span>
                    <h3 className="text-lg font-heading font-medium text-white pt-2">{mat.name}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                      {mat.desc}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500 font-medium">
                    <span>Selected Atelier Tier</span>
                    <span className="text-accent font-semibold flex items-center gap-1">
                      <span>Premium Authenticated</span>
                      <Check size={10} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Material Detail Immersive Overlay (Modal) */}
      <AnimatePresence>
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070708]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedMaterial(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111113] border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-80 select-none">
                <img 
                  src={selectedMaterial.img} 
                  alt={selectedMaterial.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111113] to-transparent" />
                <button 
                  onClick={() => setSelectedMaterial(null)}
                  className="absolute z-20 top-4 right-4 bg-primary/80 backdrop-blur-md hover:bg-neutral-800 text-white rounded-full p-2.5 transition-colors border border-white/5 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8 space-y-4">
                <span className="text-accent text-[10px] uppercase font-bold tracking-widest border border-accent/20 bg-accent/5 px-2.5 py-1 rounded">
                  {selectedMaterial.type}
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-heading font-medium text-white">{selectedMaterial.name}</h3>
                
                <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
                  {selectedMaterial.details}
                </p>

                <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-xs text-neutral-400">
                  <div>
                    <span className="font-semibold block text-neutral-500 uppercase tracking-wide">Procurement Region</span>
                    <span className="text-white text-sm font-medium mt-1 block">Imported / Premium Select</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-neutral-500 uppercase tracking-wide">Authentication Certificate</span>
                    <span className="text-accent text-sm font-medium mt-1 block">100% Raw Slip Included</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. Concept Design Carousel (Atelier Gallery) */}
      <section className="py-24 bg-[#0c0c0d] border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Curated Renderings</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-normal">Majestic Concept Creations</h2>
              <p className="text-neutral-500 max-w-2xl text-sm md:text-base font-light">Explore recent architectural directions designed under our ultra-premium Luxe portfolio.</p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={prevProject} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextProject} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Active Project Card Display */}
          <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 relative shadow-2xl">
            
            <div className="lg:col-span-7 h-[300px] sm:h-[400px] lg:h-[500px] relative select-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProject}
                  src={luxeProjects[activeProject].img}
                  alt={luxeProjects[activeProject].title}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8 bg-[#111113]/95 backdrop-blur-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <span className="text-accent font-bold tracking-widest text-[9px] uppercase border border-accent/20 bg-accent/5 px-2 py-0.5 rounded">
                      {luxeProjects[activeProject].location}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-medium text-white pt-2">
                      {luxeProjects[activeProject].title}
                    </h3>
                  </div>

                  <p className="text-neutral-400 font-light leading-relaxed text-sm sm:text-base">
                    {luxeProjects[activeProject].desc}
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-xs text-neutral-400">
                    <div>
                      <span className="font-semibold block text-neutral-500 uppercase tracking-wide">Design concept</span>
                      <span className="font-heading font-medium text-white text-sm mt-1 block">{luxeProjects[activeProject].style}</span>
                    </div>
                    <div>
                      <span className="font-semibold block text-neutral-500 uppercase tracking-wide">Handover service</span>
                      <span className="font-heading font-medium text-white text-sm mt-1 block">Full White-Glove Curation</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-white/5 pt-6">
                <span>Delivering Elite Standards</span>
                <div className="flex gap-1.5">
                  {luxeProjects.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => setActiveProject(pIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        pIdx === activeProject ? 'w-6 bg-accent' : 'w-1.5 bg-neutral-750'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. Comparison Section ("The Luxe Difference") */}
      <section className="py-24 bg-[#050506] border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Value Paradigm</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-normal">Why Choose Orniva Luxe</h2>
            <p className="text-neutral-500 text-sm md:text-base font-light">Contrasting standard luxury agencies against Orniva Luxe's personalized, DTC model.</p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#111113]/30 border border-white/5 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5 text-sm">
              
              {/* Ordinary Luxury Firms */}
              <div className="p-8 md:p-12 space-y-6">
                <h4 className="font-heading font-semibold text-lg text-neutral-400">Standard Luxury Agency</h4>
                <ul className="space-y-4 text-xs text-neutral-500">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 shrink-0 font-bold">✕</span>
                    <span><strong>Project markup</strong>: 20-30% agency overhead hidden inside material billing.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 shrink-0 font-bold">✕</span>
                    <span><strong>Project management</strong>: Handed off to junior account representatives; limited updates.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 shrink-0 font-bold">✕</span>
                    <span><strong>Material sourcing</strong>: Rigid, selected list of distributors with standardized catalogs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 shrink-0 font-bold">✕</span>
                    <span><strong>Styling curation</strong>: Simple generic placement of catalog decor to close site out.</span>
                  </li>
                </ul>
              </div>

              {/* Orniva Luxe */}
              <div className="p-8 md:p-12 space-y-6 bg-accent/[0.02] relative">

                
                <h4 className="font-heading font-semibold text-lg text-accent flex items-center gap-2">
                  <span>Orniva Luxe Elite</span>
                  <Check size={16} className="text-accent" />
                </h4>
                <ul className="space-y-4 text-xs text-neutral-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                    <span><strong>0% Direct-to-Consumer markup</strong>: Full material authenticity slips shared transparently.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                    <span><strong>Founder-led execution</strong>: Direct phone link to principal designer and weekly video walkthroughs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                    <span><strong>Atelier selection</strong>: Handcrafted hardware, custom book-matched marble slabs, and custom veneers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-accent shrink-0 mt-0.5" />
                    <span><strong>White-glove handover</strong>: Turnkey setup including custom illumination setup, furniture styling, and deep sanitization.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 12. Bottom Luxe Call-to-Action */}
      <section className="py-24 bg-gradient-to-b from-[#050506] to-[#070708] text-center relative border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10 space-y-8">
          <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Limited Atelier Slots</span>
          <h2 className="text-4xl md:text-6xl font-heading font-normal leading-tight text-white">
            Only 10 custom estates <br />curated each season.
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Due to our high-fidelity, founder-led project delivery structure, we only take on 10 luxury commissions each season to ensure absolute aesthetic perfection. Schedule your spatial and acoustic zoning audit today.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <a 
              href="https://cal.com/orniva-design-studio/orniva-luxe"
              target="_blank"
              rel="noreferrer"
              className="px-10 py-4 bg-accent hover:bg-accent/90 text-primary font-bold rounded-full text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-accent/15 w-full sm:w-auto text-center"
            >
              Secure Atelier Commission
            </a>
            <a 
              href="https://wa.me/919398801834"
              target="_blank" 
              rel="noreferrer" 
              className="px-10 py-4 border border-white/10 hover:border-white/30 text-white font-medium rounded-full text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 w-full sm:w-auto hover:bg-white/5"
            >
              <FaWhatsapp size={20} className="text-[#25D366] shrink-0" />
              <span>Discuss via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Floating Gold Sparkles Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-accent text-primary font-heading font-bold px-8 py-4 rounded-full shadow-2xl border border-white/20 flex items-center gap-3 text-xs uppercase tracking-widest"
          >
            <Sparkles size={16} className="animate-spin text-primary shrink-0" style={{ animationDuration: "4s" }} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LuxeInteriors;
