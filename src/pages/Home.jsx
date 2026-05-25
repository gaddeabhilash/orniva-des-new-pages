import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Loader2, Plus, Minus } from 'lucide-react';
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

// You can change the names of your collaborators/brands here whenever you want
const collaborators = [
  "Architects Hub", "supabase", "GitHub", "OpenAI",
  "TURSO", "clerk", "Claude", "Vercel"
];

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      layout
      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
        ? 'bg-[#111111] border-accent/30 shadow-[0_8px_32px_rgba(197,164,126,0.08)]'
        : 'bg-[#0d0d0d] border-white/[0.06] hover:border-white/[0.12]'
        }`}
    >
      {/* Accent left bar when open */}
      {isOpen && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent via-accent/60 to-transparent rounded-l-2xl" />
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-5 px-6 py-6 text-left focus:outline-none group"
      >
        {/* Number badge */}
        <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-[11px] font-medium mt-0.5 transition-colors duration-300 ${isOpen ? 'border-accent/50 text-accent bg-accent/10' : 'border-white/10 text-neutral-500 bg-white/[0.03]'
          }`}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 flex justify-between items-start gap-4">
          <h4 className={`text-base md:text-lg font-heading font-medium leading-snug transition-colors duration-300 ${isOpen ? 'text-white' : 'text-neutral-200 group-hover:text-white'
            }`}>
            {question}
          </h4>
          <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 mt-0.5 ${isOpen ? 'bg-accent border-accent text-primary rotate-0' : 'border-white/10 text-neutral-500 group-hover:border-white/20'
            }`}>
            {isOpen ? <Minus size={12} /> : <Plus size={12} />}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }}
            className="overflow-hidden"
          >
            <div className="pl-[4.5rem] pr-6 pb-6">
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
                  <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center font-bold mb-4 shadow-sm">
                    {i + 1}
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
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">A simple five-step journey<br className="hidden md:block" />to your new space.</h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { title: 'Consultation', desc: 'Understanding lifestyle and requirements.' },
              { title: 'Concept Development', desc: 'Mood boards, layouts, and design direction.' },
              { title: 'Material Selection', desc: 'Finishes, textures, lighting, and colors.' },
              { title: 'Execution', desc: 'Coordinated implementation.' },
              { title: 'Final Styling', desc: 'Furniture, decor, and finishing touches.' }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeIn} className="relative">
                {i !== 4 && <div className="hidden md:block absolute top-6 left-12 w-full h-[1px] bg-neutral-800 z-0"></div>}
                <div className="relative z-10 w-12 h-12 bg-neutral-900 border border-neutral-700 rounded-full flex items-center justify-center font-bold text-accent mb-6">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">{step.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6.5 Client Portal Promotion */}
      <section className="py-28 bg-[#080809] relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: Text + features */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-8">
                <div className="space-y-4">
                  <span className="inline-block text-accent text-[11px] font-semibold tracking-[0.3em] uppercase border border-accent/20 px-4 py-1.5 rounded-full bg-accent/5">
                    Client Experience
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-normal text-white leading-tight">
                    No Waiting.<br />No Wondering.
                  </h2>
                  <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed max-w-lg">
                    From first concept to final handover — every milestone of your project is tracked, documented, and accessible live. Zero chasing, zero guessing.
                  </p>
                </div>

                {/* Feature list */}
                <div className="space-y-5 pt-2">
                  {[
                    { icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Live Milestone Tracking', desc: 'Follow every phase from electrical to cabinetry in real time.' },
                    { icon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z', title: 'Instant Design Access', desc: 'View floor plans, 3D renders, and material boards anytime.' },
                    { icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z', title: 'Direct Designer Access', desc: 'WhatsApp updates and weekly video walkthroughs — no middlemen.' },
                  ].map((f, i) => (
                    <motion.div key={i} variants={fadeIn} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-semibold mb-0.5">{f.title}</h4>
                        <p className="text-neutral-500 text-xs leading-relaxed">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.a
                  variants={fadeIn}
                  href="https://odscp.vercel.app/login"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-accent hover:bg-accent/90 text-primary text-sm font-bold rounded-full transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-accent/20 group"
                >
                  View Your Progress Live
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>

              {/* Right: Elevated portal mockup card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative"
              >
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl pointer-events-none" />

                <div className="relative bg-[#111113] border border-white/10 rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                  {/* Card header bar */}
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07] bg-[#0d0d0f]">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                      </div>
                      <span className="text-[11px] text-neutral-600 ml-2 font-mono">odscp.vercel.app/dashboard</span>
                    </div>
                    <span className="text-[10px] text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full font-semibold tracking-wide">LIVE</span>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Project header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Active Project</p>
                        <h3 className="text-white font-heading font-semibold text-lg">Jubilee Hills Villa</h3>
                        <p className="text-neutral-500 text-xs mt-0.5">Banjara Hills, Hyderabad</p>
                      </div>
                      <span className="text-[11px] text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        On Track
                      </span>
                    </div>

                    {/* Milestones */}
                    <div className="space-y-3">
                      {[
                        { label: 'Concept & 3D Design', pct: 100, done: true },
                        { label: 'Material Procurement', pct: 100, done: true },
                        { label: 'Carpentry & Fixtures', pct: 80, done: false },
                        { label: 'Final Styling & Handover', pct: 15, done: false },
                      ].map((m, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className={m.done ? 'text-neutral-400' : 'text-white'}>{m.label}</span>
                            <span className={m.done ? 'text-green-400' : 'text-accent'}>{m.done ? '✓ Done' : `${m.pct}%`}</span>
                          </div>
                          <div className="w-full bg-white/[0.05] rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${m.pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
                              className={`h-full rounded-full ${m.done ? 'bg-green-500/70' : 'bg-gradient-to-r from-accent/60 to-accent'}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Next update row */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px] text-neutral-500">
                      <span>Next update: <span className="text-accent">Tomorrow, 10 AM</span></span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Designer online</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. Philosophy */}
      <section className="py-28 bg-[#0a0a0b] relative overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">

          {/* Section Header */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="max-w-2xl mb-20"
          >
            <span className="inline-block text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-5 border border-accent/20 px-4 py-1.5 rounded-full bg-accent/5">
              Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal text-white leading-tight mb-5">
              What we<br className="hidden sm:block" /> believe in.
            </h2>
            <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed">
              We believe spaces have a profound effect on our wellbeing, relationships, and routines. Every project is an opportunity to craft a sanctuary that feels both inspiring and deeply functional.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                num: '01',
                title: 'Craftsmanship',
                desc: 'Quality, precision, and creativity are at the core of everything we build. We source exquisite materials and partner with highly skilled artisans to deliver details that endure.',
                icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z'
              },
              {
                num: '02',
                title: 'Collaboration',
                desc: 'Turning concepts into meaningful spatial experiences requires listening and shared vision. We co-create with you, ensuring your stories and daily habits shape every corner.',
                icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
              },
              {
                num: '03',
                title: 'Sustainability',
                desc: 'Using materials and methods that inspire longevity and reduce the environmental footprint. We design with future relevance in mind, selecting products built to stand the test of time.',
                icon: 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="group relative bg-[#111113] border border-white/[0.07] rounded-3xl p-8 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(197,164,126,0.07)] overflow-hidden flex flex-col"
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Number */}
                <span className="text-[11px] font-semibold text-accent/50 tracking-[0.2em] mb-6 block">{item.num}</span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors duration-300">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>

                <h3 className="text-xl md:text-2xl font-heading font-normal text-white mb-4 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light flex-1">
                  {item.desc}
                </p>

                {/* Watermark on hover */}
                <div className="absolute -bottom-4 -right-2 font-heading italic text-[5rem] font-extrabold text-white/[0.02] select-none pointer-events-none group-hover:text-accent/[0.04] transition-colors duration-700">
                  {item.title[0]}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Collaborators / Brands */}
      <section className="py-16 bg-[#080809] relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h3 className="text-center text-neutral-400 text-lg md:text-[22px] font-light mb-12">
            Companies we <span className="text-white font-semibold">collaborate</span> with.
          </h3>

          <div className="relative mx-auto border-t border-l border-white/[0.08] grid grid-cols-2 md:grid-cols-4 bg-[#0a0a0a]/50">
            {/* Grid corner plus marks */}
            <div className="absolute -top-[13px] -left-[9px] text-neutral-500 font-light text-xl select-none pointer-events-none">+</div>
            <div className="absolute -top-[13px] -right-[9px] text-neutral-500 font-light text-xl select-none pointer-events-none">+</div>
            <div className="absolute -bottom-[13px] -left-[9px] text-neutral-500 font-light text-xl select-none pointer-events-none">+</div>
            <div className="absolute -bottom-[13px] -right-[9px] text-neutral-500 font-light text-xl select-none pointer-events-none">+</div>

            {collaborators.map((name, i) => (
              <div
                key={i}
                className="h-24 sm:h-28 border-r border-b border-white/[0.08] flex items-center justify-center relative group hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-white/60 group-hover:text-white transition-colors duration-300 font-bold tracking-wider text-sm sm:text-base lg:text-lg">
                  {name}
                </span>

                {/* Crosshairs for internal intersections (desktop middle row) */}
                {i < 4 && i !== 3 && (
                  <div className="hidden md:flex absolute -right-[9px] -bottom-[13px] text-neutral-500 text-xl font-light select-none pointer-events-none z-10 w-4 h-4 items-center justify-center">+</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="py-28 bg-[#080809] relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-3xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-14">
            <span className="inline-block text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 border border-accent/20 px-4 py-1.5 rounded-full bg-accent/5">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-normal text-white mt-4 mb-4 leading-tight">
              Answers before<br className="hidden sm:block" /> we begin.
            </h2>
            <p className="text-neutral-500 text-sm md:text-base font-light max-w-lg mx-auto">
              Everything you need to know about working with Orniva.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            className="space-y-3"
          >
            {[
              { q: "What types of projects does Orniva take on?", a: "We work across high-end residential interiors — apartments, villas, penthouses, and duplexes — as well as curated commercial spaces like boutique offices, salons, and retail environments. Every project, regardless of size, receives the same founder-led attention and craft-first approach." },
              { q: "Can you redesign just one room or a specific area?", a: "Absolutely. We offer focused single-room packages for spaces like master bedrooms, living rooms, or kitchens, as well as full-home transformations. Our process adapts to your scope — you only pay for what you actually need." },
              { q: "How long does a typical interior project take?", a: "Timelines vary with scope. A single room concept and 3D design typically takes 2–3 weeks. A full home execution — from concept to handover — generally spans 3 to 5 months, depending on custom material sourcing and site conditions. We provide a clear milestone schedule before work begins." },
              { q: "Will I see the design before anything is built or purchased?", a: "Yes, always. Concept development, mood boards, and photorealistic 3D views are delivered and approved by you before a single rupee is spent on execution. We believe you should be completely confident in the vision before committing to it." },
              { q: "How does Orniva handle material and vendor sourcing?", a: "We manage the entire supply chain — from sourcing premium finishes, marble slabs, veneers, and lighting to coordinating with trusted local contractors and craftsmen. You don't deal with vendors. We do. This keeps quality consistent and timelines tight." },
              { q: "What does the pricing structure look like?", a: "We offer transparent, package-based pricing rather than vague per-sqft estimates. Packages cover design-only, design + material guidance, and full turnkey execution. Exact costs are shared after the initial consultation once we understand your space and scope clearly." },
              { q: "How do I get started with Orniva?", a: "Simply fill out the inquiry form below or reach out via WhatsApp. We'll schedule a free 30-minute consultation to understand your space, lifestyle, and vision — with zero obligation to proceed." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn}>
                <FAQItem question={item.q} answer={item.a} index={i} />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mt-14 text-center border-t border-white/[0.06] pt-10"
          >
            <p className="text-neutral-500 text-sm mb-5">Still have questions? We're happy to help.</p>
            <a
              href="https://cal.com/orniva-design-studio/30min"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent/90 text-primary text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-accent/15 group"
            >
              Book a Free Consultation
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
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
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent text-white"
                  />
                </div>
                <div>
                  <input
                    type="tel" required placeholder="Phone Number"
                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
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
                              setFormData({ ...formData, project_type: option.value });
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
