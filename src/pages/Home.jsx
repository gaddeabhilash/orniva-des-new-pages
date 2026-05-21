import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center text-left focus:outline-none group"
      >
        <h4 className="text-xl font-heading font-semibold text-primary group-hover:text-accent transition-colors">{question}</h4>
        <ChevronDown 
          className={`text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={24} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-neutral-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', project_type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          { 
            source: 'landing_page',
            name: formData.name,
            phone: formData.phone,
            project_type: formData.project_type
          }
        ]);

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: '', phone: '', project_type: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMsg(error.message || 'An unexpected error occurred. Please check your Supabase configuration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      
      {/* 2. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Interior Design Studio" 
            className="w-full h-full object-cover opacity-50 blur-[5px] scale-105"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white pt-32 pb-16 md:py-24">
          <motion.p 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-accent text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-6"
          >
            Interior Design Studio
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-bold leading-tight mb-8 max-w-5xl mx-auto"
          >
            We design spaces that reflect your lifestyle.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl font-light max-w-3xl mx-auto mb-10 text-neutral-200 leading-relaxed"
          >
            A boutique launch studio for people who want premium interiors without the agency markup. Founder-led design, transparent pricing, and confident spaces created from day one.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="https://cal.com/orniva-design-studio/30min" 
              target="_blank" 
              rel="noreferrer" 
              className="relative overflow-hidden px-8 py-4 bg-accent text-white rounded-full font-medium transition-all duration-500 hover:shadow-[0_0_25px_rgba(197,164,126,0.45)] hover:scale-[1.02] group w-full sm:w-auto text-center"
            >
              <span className="relative z-10">Get Free Consultation</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </a>
            <Link 
              to="/projects" 
              className="relative overflow-hidden px-8 py-4 border border-white text-white rounded-full font-medium transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:scale-[1.02] group w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span className="relative z-10">View Design Concepts</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. Expertise (What We Do) */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mb-16"
          >
            <h4 className="text-[#C5A47E] text-xs font-bold tracking-[0.2em] uppercase mb-6">What we do</h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal text-white max-w-4xl leading-[1.1]">
              Design support from first<br className="hidden md:block" />sketch to final styling.
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: 'Residential interiors', desc: 'Warm, functional homes planned around your routines, storage, light, and finishes.' },
              { title: 'Commercial spaces', desc: 'Workplaces, studios, salons, and retail spaces shaped for flow and brand presence.' },
              { title: 'Furniture and decor', desc: 'Custom furniture, material palettes, soft furnishings, and styling details.' },
              { title: 'Space planning', desc: 'Layouts, zoning, 3D views, and detail-ready plans before work begins on site.' }
            ].map((service, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-[#1a1a1a] p-8 rounded-2xl hover:bg-[#222] transition-colors duration-300 h-full flex flex-col">
                <h3 className="text-lg font-heading font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-[#999999] leading-relaxed text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Concept Design (Portfolio) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-16">
            <h4 className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">CONCEPT DESIGN | NOT EXECUTED</h4>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6 max-w-3xl">Early visual directions for your first look.</h2>
            <p className="text-neutral-500 max-w-2xl text-lg">These are concept explorations created for our launch portfolio. They show how we think about space, materials, and modern living.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {[
              { title: 'Courtyard Residence', type: 'Living', desc: 'A calm, layered home built around natural light and daily rituals.', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { title: 'Urban Minimalist Lounge', type: 'Living', desc: 'A refined communal space with clean lines, warm texture, and quiet luxury.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { title: 'Compact City Apartment', type: 'Bedroom', desc: 'Smart planning for city living that feels spacious, elegant, and personal.', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
            ].map((project, i) => (
              <motion.div key={i} variants={fadeIn} className="group cursor-pointer flex flex-col h-full">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]" />
                </div>
                <span className="text-xs font-bold text-accent tracking-wider uppercase mb-2 block">{project.type}</span>
                <h3 className="text-2xl font-heading font-semibold text-primary mb-3">{project.title}</h3>
                <p className="text-neutral-600 flex-grow">{project.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Why Us */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="w-full lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8 leading-tight">Built for clients who value clarity and craft.</h2>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 mb-8 inline-block">
                <h4 className="text-accent font-bold uppercase tracking-wider text-sm mb-2">Exclusive Offer</h4>
                <p className="text-primary font-heading font-bold text-2xl">Only 10 slots left - Free 3D Design Consultation for the first 10 clients.</p>
              </div>
            </motion.div>
            
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: 'Personalized Attention', desc: 'Direct collaboration with the founder for a tailored design process.' },
                { title: 'Affordable Startup Pricing', desc: 'Transparent packages and lower overhead for premium interiors.' },
                { title: 'Direct Communication', desc: 'Fast WhatsApp access for efficient decision-making.' },
                { title: 'Flexible Design Options', desc: 'Choices ranging from concept-only to full execution support.' }
              ].map((prop, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center font-bold font-heading mb-4 shadow-sm">
                    {i+1}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">{prop.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{prop.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Process (How We Work) */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h4 className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">How we work</h4>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">A simple five-step journey<br className="hidden md:block"/>to your new space.</h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { title: 'Consultation', desc: 'Mapping lifestyle, priorities, and budget.' },
              { title: 'Design', desc: 'Shaping layouts, palettes, and finishes.' },
              { title: '3D Views', desc: 'Realistic visuals before build commitment.' },
              { title: 'Execution', desc: 'On-site coordination and trusted vendor management.' },
              { title: 'Delivery', desc: 'Final styling and handover.' }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeIn} className="relative">
                {i !== 4 && <div className="hidden md:block absolute top-6 left-12 w-full h-[1px] bg-neutral-800 z-0"></div>}
                <div className="relative z-10 w-12 h-12 bg-neutral-900 border border-neutral-700 rounded-full flex items-center justify-center font-bold text-accent mb-6">
                  0{i+1}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">{step.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6.5 Client Portal Promotion */}
      <section className="py-24 bg-[#0d0d0d] border-t border-b border-neutral-900 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto bg-neutral-900/40 border border-white/5 rounded-3xl p-8 md:p-16 backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Column */}
              <div className="lg:col-span-7 space-y-6">
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                >
                  <h4 className="text-accent text-xs font-bold tracking-[0.25em] uppercase mb-4">
                    Orniva Experience
                  </h4>
                  <h2 className="text-4xl md:text-5xl font-heading font-normal text-white leading-tight mb-6">
                    No Waiting. <br className="hidden sm:block"/>No Wondering.
                  </h2>
                  <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed mb-8">
                    We believe you should never have to wait for a weekly update or chase for status reports. From initial 3D renderings and moodboards to site preparation and final paint coats, follow every milestone of your home's transformation live. Seamless transparency, entirely on your own terms.
                  </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div 
                  variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10"
                >
                  <motion.div variants={fadeIn} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">Live Milestone Status</h4>
                      <p className="text-neutral-500 text-xs leading-relaxed">Follow active phases from electrical layouts to bespoke cabinetry.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">Instant Design Access</h4>
                      <p className="text-neutral-500 text-xs leading-relaxed">Instantly view floor plans, 3D renderings, and color swatches.</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Interactive Card Column */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-[#141414] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative"
                >
                  <div className="absolute top-4 right-4 flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
                  </div>

                  <span className="text-[10px] uppercase tracking-wider text-accent font-bold mb-2 block">Secure Access</span>
                  <h3 className="text-lg font-heading text-white font-semibold mb-6">Orniva Client Portal</h3>
                  
                  {/* Mock UI Graphic inside the box */}
                  <div className="space-y-4 mb-8 bg-neutral-900/50 p-4 rounded-xl border border-white/5 text-xs text-neutral-400">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="font-medium text-white">Project Name</span>
                      <span className="text-accent font-medium">Jubilee Hills Villa</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Design Concept</span>
                        <span className="text-green-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Approved
                        </span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-accent h-full w-[80%] rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-neutral-500 pt-1">
                      <span>Milestone: Carpentry & Custom Fixtures</span>
                      <span>80% Complete</span>
                    </div>
                  </div>

                  <a 
                    href="https://odscp.vercel.app/login" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-4 bg-accent text-white rounded-xl font-medium hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 group text-sm shadow-lg shadow-accent/10 text-center"
                  >
                    <span>View Your Progress Live</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. Philosophy */}
      <section className="py-28 bg-[#faf7f2]/40 relative overflow-hidden border-t border-b border-neutral-100">
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Sticky Brand Statement */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="space-y-4"
              >
                <h4 className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Philosophy</h4>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal text-primary leading-tight">
                  What we<br className="hidden lg:block" /> believe in.
                </h2>
                <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed max-w-md pt-2">
                  We believe spaces have a profound effect on our wellbeing, relationships, and routines. Every project is an opportunity to craft a sanctuary that feels both inspiring and deeply functional.
                </p>
                <div className="w-20 h-[2px] bg-accent mt-8 shrink-0" />
              </motion.div>
            </div>

            {/* Right Column: Premium Staggered Stacked Cards */}
            <div className="lg:col-span-7">
              <motion.div 
                variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="space-y-8"
              >
                {[
                  { 
                    title: 'Craftsmanship', 
                    desc: 'Quality, precision, and creativity are at the core of everything we build. We source exquisite materials and partner with highly skilled local artisans to deliver details that endure.' 
                  },
                  { 
                    title: 'Collaboration', 
                    desc: 'Turning concepts into meaningful spatial experiences requires listening and shared vision. We co-create with you, ensuring your stories and daily habits shape every corner.' 
                  },
                  { 
                    title: 'Sustainability', 
                    desc: 'Using materials and methods that inspire longevity and reduce the environmental footprint. We design with future relevance in mind, selecting products built to stand the test of time.' 
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={fadeIn} 
                    className="bg-white p-8 md:p-10 rounded-3xl border border-neutral-100 hover:border-accent/40 transition-all duration-500 shadow-sm hover:shadow-[0_20px_50px_rgba(197,164,126,0.08)] group relative overflow-hidden flex flex-col sm:flex-row gap-6 md:gap-8"
                  >
                    {/* Circle Number */}
                    <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-accent shrink-0 text-sm font-heading select-none">
                      0{i+1}
                    </div>
                    
                    {/* Card Content */}
                    <div className="space-y-3 z-10 relative">
                      <h3 className="text-2xl font-heading font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-neutral-500 leading-relaxed font-light text-sm md:text-base">
                        {item.desc}
                      </p>
                    </div>

                    {/* Watermark Logo/Text on Hover */}
                    <div className="absolute right-6 bottom-4 select-none pointer-events-none font-heading italic text-5xl font-extrabold text-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">
                      {item.title}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h4 className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">Frequently Asked Questions</h4>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary">Answers before we begin.</h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <FAQItem 
              question="What types of projects do you handle?" 
              answer="We specialize in both high-end residential interiors and bespoke commercial spaces including offices, boutique retail, and salons." 
            />
            <FAQItem 
              question="Can you help with just one room?" 
              answer="Yes, we offer tailored packages that scale based on your needs, whether it's a single living room revamp or a complete property overhaul." 
            />
            <FAQItem 
              question="Will I see 3D views before construction begins?" 
              answer="Absolutely. 3D visualization is a core part of our 5-step process, ensuring you are completely confident in the design before any build commitment." 
            />
            <FAQItem 
              question="How do I start a project with Orniva?" 
              answer="Simply reach out via our contact form or WhatsApp. We will schedule a free initial consultation to map out your lifestyle needs and budget." 
            />
          </motion.div>
        </div>
      </section>

      {/* 9. Contact (Start a Project) */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h4 className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">Start a Project</h4>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to transform your space?</h2>
            <p className="text-neutral-400 text-lg mb-12">Tell us what you are dreaming of. We will reply within 24 hours with next steps and a rough estimate.</p>
            
            {isSubmitted ? (
              <div className="max-w-2xl mx-auto mb-8 p-6 bg-accent/20 border border-accent/30 rounded-xl text-center">
                <h3 className="text-xl font-heading font-bold text-white mb-2">Request Received!</h3>
                <p className="text-neutral-300">Thank you for reaching out. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8 text-left">
                <div>
                  <input 
                    type="text" required placeholder="Your Name" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent text-white" 
                  />
                </div>
                <div>
                  <input 
                    type="tel" required placeholder="Phone Number" 
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent text-white" 
                  />
                </div>
                <div className="md:col-span-2 relative">
                  <div 
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="w-full px-5 py-4 bg-[#141414] border border-white/10 rounded-xl cursor-pointer flex justify-between items-center text-white"
                  >
                    <span className={formData.project_type ? "text-white" : "text-neutral-400"}>
                      {formData.project_type === 'residential' ? 'Residential Interior' :
                       formData.project_type === 'commercial' ? 'Commercial Space' :
                       formData.project_type === 'renovation' ? 'Renovation' :
                       'Select Project Type'}
                    </span>
                    <ChevronDown size={20} className={`text-neutral-400 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  <AnimatePresence>
                    {isSelectOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                      >
                        {[
                          { value: 'residential', label: 'Residential Interior' },
                          { value: 'commercial', label: 'Commercial Space' },
                          { value: 'renovation', label: 'Renovation' }
                        ].map((option) => (
                          <div 
                            key={option.value}
                            onClick={() => {
                              setFormData({...formData, project_type: option.value});
                              setIsSelectOpen(false);
                            }}
                            className={`px-5 py-4 cursor-pointer transition-colors ${formData.project_type === option.value ? 'bg-accent/20 text-accent' : 'text-white hover:bg-white/5'}`}
                          >
                            {option.label}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {errorMsg && (
                  <div className="md:col-span-2 p-3 bg-red-500/10 text-red-400 text-sm rounded-xl border border-red-500/20">
                    {errorMsg}
                  </div>
                )}
                
                <div className="md:col-span-2 mt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !formData.project_type}
                    className="w-full py-4 bg-accent text-white rounded-xl font-medium hover:bg-white hover:text-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Submitting... <Loader2 size={18} className="animate-spin" /></>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
