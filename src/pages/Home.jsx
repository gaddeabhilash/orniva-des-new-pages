import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Loader2, Plus, Minus, MessageSquare, Layers, Palette, Hammer, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { WebGLShader } from '@/components/ui/web-gl-shader';

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
        ? 'bg-white border-accent/30 shadow-[0_8px_32px_rgba(197,164,126,0.08)]'
        : 'bg-[#fafafa] border-black/[0.06] hover:border-black/[0.12]'
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
        <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-[11px] font-medium mt-0.5 transition-colors duration-300 ${isOpen ? 'border-accent/50 text-accent bg-accent/10' : 'border-black/10 text-neutral-500 bg-black/[0.03]'
          }`}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 flex justify-between items-start gap-4">
          <h4 className={`text-base md:text-lg font-heading font-medium leading-snug transition-colors duration-300 ${isOpen ? 'text-[#111]' : 'text-neutral-600 group-hover:text-[#111]'
            }`}>
            {question}
          </h4>
          <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 mt-0.5 ${isOpen ? 'bg-accent border-accent text-white rotate-0' : 'border-black/10 text-neutral-500 group-hover:border-black/20'
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
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-light">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PromiseItem = ({ title, desc, icon, isOpen, onClick }) => {
  return (
    <motion.div
      layout
      className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none group"
      >
        <div className="flex items-center gap-4">
          {/* Icon circle */}
          <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h4 className="text-[17px] font-heading font-bold text-[#111]">
            {title}
          </h4>
        </div>
        <span className="text-neutral-400 font-light text-2xl group-hover:text-[#111] transition-colors">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.3 } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1">
              <p className="text-neutral-500 text-sm leading-relaxed pl-[56px]">{desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const STEPS = [
  {
    title: 'Consultation',
    desc: 'Understanding your lifestyle, requirements, space potential, and vision.',
    icon: MessageSquare,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
    deliverables: ['Lifestyle Review', 'Site Mapping', 'Scope Definition', 'Initial Budgeting']
  },
  {
    title: 'Concept Development',
    desc: 'Crafting layout options, mood boards, and overall design direction.',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&auto=format&fit=crop&q=80',
    deliverables: ['2D Floor Plans', 'Color Palettes', 'Moodboards', 'Design Direction']
  },
  {
    title: 'Material Selection',
    desc: 'Choosing finishes, textures, lighting fixtures, hardware, and color schemes.',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
    deliverables: ['Hardware Selection', 'Finishes & Textures', 'Lighting Plans', 'Custom Carpentry specs']
  },
  {
    title: 'Execution',
    desc: 'Turnkey site implementation, carpentry, electrical work, and quality audits.',
    icon: Hammer,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80',
    deliverables: ['Site Coordination', 'Carpentry & Fittings', 'Electrical Execution', 'Quality Inspections']
  },
  {
    title: 'Final Styling',
    desc: 'Placing custom furniture, decor items, and perfect handover touches.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80',
    deliverables: ['Furniture Setup', 'Custom Decor layout', 'Deep Cleaning', 'Sanctuary Handover']
  }
];

const Home = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', project_type: '' });
  const { scrollY } = useScroll();

  // High-end real-time scroll parallax for the background image
  const yBg = useTransform(scrollY, [0, 800], [0, 180]);
  const scaleBg = useTransform(scrollY, [0, 800], [1.03, 1.15]);

  // Sleek drift-up and fade-out animation for the text content
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  const yText = useTransform(scrollY, [0, 500], [0, -60]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [openPromise, setOpenPromise] = useState(0);

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
      <Helmet>
        <title>Orniva Design Studio | End to end Interiors</title>
        <meta name="description" content="Orniva Design Studio offers premium, bespoke interior design services for residential and commercial spaces in Hyderabad." />
      </Helmet>

      {/* 2. Hero Section — ELORIA-Style Moody Luxury */}
      <section className="relative h-screen w-full overflow-visible z-10">

        {/* ── Full-bleed moody background photo with dynamic parallax & entrance zoom ── */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
          className="sticky top-0 left-0 right-0 h-screen z-0 overflow-hidden"
        >
          {/* LCP hero image — plain <img> for fastest LCP measurement, motion wrapper handles animation */}
          <motion.div
            className="w-full h-full"
            style={{ y: yBg, scale: scaleBg }}
          >
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              srcSet="
                https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80 800w,
                https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80 1600w,
                https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80 2560w
              "
              sizes="100vw"
              alt="Orniva luxury interior design — elegant living room with warm lighting"
              className="w-full h-full object-cover origin-center"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              width="1600"
              height="900"
            />
          </motion.div>
          {/* Custom cinematic background overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.15) 100%)'
            }}
          />
        </motion.div>

        {/* ── Main content block — dynamically floats and fades on scroll ── */}
        <motion.div
          style={{ opacity: opacityText, y: yText }}
          className="absolute inset-0 z-20 flex flex-col justify-end px-6 sm:px-12 md:px-16 lg:px-24 pb-16 sm:pb-24 md:pb-28 lg:pb-32 pt-32 sm:pt-40"
        >

          {/* Headline — Cinematic Staggered Split Line Reveal */}
          <div className="flex flex-col items-start w-full">
            <div className="overflow-hidden h-auto mb-1 flex items-center justify-start w-full">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="font-heading text-white leading-tight tracking-tight text-left"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 400 }}
              >
                Designing Timeless Spaces
              </motion.h1>
            </div>
            <div className="overflow-hidden h-auto mb-6 flex items-center justify-start w-full">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="font-heading text-white leading-tight tracking-tight text-left"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 400 }}
              >
                Crafted Around Your Lifestyle
              </motion.p>
            </div>
          </div>

          {/* Description — smooth staggered slide and fade */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-white/70 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-sm sm:max-w-xl mb-8 sm:mb-10 tracking-wide text-left"
          >
            Founder-led interior design studio creating elegant homes and inspiring workspaces through thoughtful design and turnkey execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            className="flex flex-col min-[500px]:flex-row gap-4 items-center w-full min-[500px]:w-auto"
          >
            <a
              href="https://cal.com/orniva-design-studio/30min"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-3 bg-white text-primary text-[15px] font-semibold rounded-full hover:bg-accent hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg text-center w-full min-[500px]:w-auto"
            >
              Book Design Session
            </a>
            <Link
              to="/projects"
              className="inline-block px-8 py-3 bg-transparent border border-white/40 text-white text-[15px] font-semibold rounded-full hover:bg-white hover:text-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center w-full min-[500px]:w-auto"
            >
              View Projects
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Expertise (What We Do) */}
      <section className="py-24 bg-[#faf9f6] relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.15)]">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mb-16"
          >
            <h4 className="text-[#C5A47E] text-xs font-bold tracking-[0.2em] uppercase mb-6">What we do</h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal text-[#111] max-w-5xl leading-[1.1]">
              Complete turnkey interior solutions<br className="hidden md:block" />from concept and design to final execution.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: 'Residential interiors',
                desc: 'Warm, functional homes planned around your routines, storage, light, and finishes.'
              },
              {
                title: 'Commercial spaces',
                desc: 'Workplaces, studios, salons, and retail spaces shaped for flow and brand presence.'
              },
              {
                title: 'Furniture and decor',
                desc: 'Custom furniture, material palettes, soft furnishings, and styling details.'
              },
              {
                title: 'Space planning',
                desc: 'Layouts, zoning, 3D views, and detail-ready plans before work begins on site.'
              }
            ].map((service, i) => (
              <motion.div key={i} variants={fadeIn} className="group bg-white border border-black/[0.06] shadow-sm p-6 rounded-2xl hover:border-accent/30 transition-all duration-300 h-full flex flex-col cursor-pointer">
                <h3 className="text-lg font-heading font-semibold text-[#111] mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm flex-grow">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* 5. Why Us */}
      <section className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="w-full lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111] mb-8 leading-tight">Built for clients who value clarity and craft.</h2>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/[0.06] mb-8 inline-block">
                <h4 className="text-accent font-bold uppercase tracking-wider text-sm mb-2">Exclusive Offer</h4>
                <p className="text-[#111] font-heading font-bold text-2xl">Only 10 slots left - Free 3D Design Consultation for the first 10 clients.</p>
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
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center font-bold mb-4 shadow-sm">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#111] mb-2">{prop.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{prop.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5.5 Promises */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-white">

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-normal text-[#111]">
              Orniva Promises!
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
            {/* Left: Accordions */}
            <div className="w-full lg:w-5/12 space-y-4">
              {[
                {
                  title: 'On-Time Delivery',
                  desc: 'We map out a strict milestone timeline before we begin. Your move-in date is locked, and we honor it with zero delays.',
                  icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                },
                {
                  title: '10+ Years Warranty',
                  desc: 'We use premium marine-grade plywood and high-density boards, ensuring durability. All our core materials come with a decade-long warranty.',
                  icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                },
                {
                  title: 'No Hidden Costs',
                  desc: 'Our estimates are comprehensive and fully transparent. What you see on the final BOQ is exactly what you pay. No sudden surprises.',
                  icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                },
                {
                  title: 'Free 3D Design',
                  desc: 'Visualize your entire space before a single hammer swings. Photorealistic renders are included in your package at no extra cost.',
                  icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                }
              ].map((promise, i) => (
                <PromiseItem
                  key={i}
                  index={i}
                  title={promise.title}
                  desc={promise.desc}
                  icon={promise.icon}
                  isOpen={openPromise === i}
                  onClick={() => setOpenPromise(openPromise === i ? -1 : i)}
                />
              ))}

              <div className="pt-8">
                <Link
                  to="/contact"
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-primary text-sm font-bold rounded-full transition-all duration-300 shadow-lg shadow-accent/15 hover:scale-[1.02] group"
                >
                  Get a Free Quote
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Floating Circular Images */}
            <div className="w-full lg:w-7/12 relative h-[500px] lg:h-[600px] flex items-center justify-center">
              {/* Center Large Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute z-20 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-[6px] border-white shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern contemporary living room interior design by Orniva"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="800"
                />
              </motion.div>

              {/* Bottom Left Medium Image */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="absolute z-30 bottom-0 lg:bottom-[10%] left-0 lg:left-[5%] w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full overflow-hidden border-4 border-white shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Elegant pooja unit interior design with warm ambient lighting"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="600"
                />
              </motion.div>

              {/* Bottom Right Medium Image */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="absolute z-10 bottom-[-5%] right-[5%] lg:right-[15%] w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden border-4 border-white shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Luxury bedroom interior design with premium materials by Orniva"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="600"
                />
              </motion.div>


            </div>
          </div>
        </div>
      </section>

      {/* 6. Process (How We Work) */}
      <section className="py-12 lg:py-20 bg-gradient-dark relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16 md:mb-20">
            <h4 className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">How we work</h4>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-[#111]">A simple five-step journey <br className="hidden md:block" />to your new space.</h2>
          </motion.div>

          {/* Process Timeline */}
          <div className="process-timeline-wrapper relative z-30 max-w-full">
            {/* Style 2 Desktop Timeline (Hidden on small screens) */}
            <div className="hidden lg:block relative min-h-[380px] mb-12">
              {/* Horizontal SVG Bezier Wavy Line */}
              <svg
                className="absolute top-0 left-0 w-full h-[200px] pointer-events-none z-0 overflow-visible"
                viewBox="0 0 1000 200"
                preserveAspectRatio="none"
              >
                {/* Light background track line */}
                <path
                  d="M 100 40 C 200 40, 200 136, 300 136 C 400 136, 400 40, 500 40 C 600 40, 600 136, 700 136 C 800 136, 800 40, 900 40"
                  stroke="#C5A47E"
                  strokeWidth="2"
                  strokeOpacity="0.15"
                  fill="none"
                />
                {/* Glow blur behind moving pulse */}
                <motion.path
                  d="M 100 40 C 200 40, 200 136, 300 136 C 400 136, 400 40, 500 40 C 600 40, 600 136, 700 136 C 800 136, 800 40, 900 40"
                  stroke="#C5A47E"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeOpacity="0.4"
                  style={{ filter: "blur(6px)" }}
                  strokeDasharray="60 200"
                  fill="none"
                  animate={{ strokeDashoffset: [0, -260] }}
                  transition={{ strokeDashoffset: { repeat: Infinity, ease: "linear", duration: 3.5 } }}
                />
                {/* Flowing animated pulse */}
                <motion.path
                  d="M 100 40 C 200 40, 200 136, 300 136 C 400 136, 400 40, 500 40 C 600 40, 600 136, 700 136 C 800 136, 800 40, 900 40"
                  stroke="#C5A47E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="60 200"
                  fill="none"
                  animate={{ strokeDashoffset: [0, -260] }}
                  transition={{ strokeDashoffset: { repeat: Infinity, ease: "linear", duration: 3.5 } }}
                />
              </svg>

              {/* Steps grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-5 gap-8 relative z-10"
              >
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isOdd = i % 2 !== 0;
                  return (
                    <motion.div
                      key={i}
                      variants={fadeIn}
                      className={`flex flex-col items-center text-center group transition-all duration-500 ${isOdd ? 'mt-24' : 'mt-0'}`}
                    >
                      {/* Circle Node Container */}
                      <div className="relative mb-6">
                        {/* Step Number Badge */}
                        <span className="absolute -top-2.5 -right-2.5 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10 shadow-sm z-20 transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
                          0{i + 1}
                        </span>

                        {/* Circle Outer Glow */}
                        <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:scale-125 z-0" />

                        {/* Inner Circle Node */}
                        <motion.div
                          className="relative w-20 h-20 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-sm z-10 transition-all duration-500 group-hover:border-accent/80 group-hover:scale-105"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                        </motion.div>
                      </div>

                      {/* Step Content */}
                      <h3 className="text-xl font-heading font-semibold mb-3 text-primary group-hover:text-accent transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-neutral-500 text-sm leading-relaxed max-w-[200px]">
                        {step.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Style 2 Mobile Timeline (Visible on small screens) */}
            <motion.div
              className="lg:hidden"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === STEPS.length - 1;
                return (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="flex gap-5 group"
                  >
                    {/* Left column: circle + serpentine connector */}
                    <div className="flex flex-col items-center shrink-0">
                      {/* Circle Node */}
                      <div className="relative shrink-0">
                        <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-white/10 shadow-sm z-20 transition-all duration-300 group-hover:bg-accent">
                          0{i + 1}
                        </span>
                        <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:scale-125 z-0" />
                        <motion.div
                          className="relative w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-sm z-10 transition-all duration-500 group-hover:border-accent/80"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-300" />
                        </motion.div>
                      </div>

                      {/* Straight vertical connector with desktop-style flowing animation */}
                      {/* Straight vertical connector with desktop-style flowing animation */}
                      {!isLast && (
                        <div className="relative flex-1 my-1" style={{ minHeight: '48px', width: '24px' }}>
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                            viewBox="0 0 24 56"
                            preserveAspectRatio="none"
                          >
                            {/* Light background track line */}
                            <path
                              d="M 12 0 L 12 56"
                              stroke="#C5A47E"
                              strokeWidth="2"
                              strokeOpacity="0.15"
                              fill="none"
                            />
                            {/* Glow blur behind active line */}
                            <motion.path
                              d="M 12 0 L 12 56"
                              stroke="#C5A47E"
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeOpacity="0.4"
                              style={{ filter: "blur(4px)" }}
                              strokeDasharray="15 45"
                              fill="none"
                              animate={{ strokeDashoffset: [0, -60] }}
                              transition={{ strokeDashoffset: { repeat: Infinity, ease: "linear", duration: 1.5 } }}
                            />
                            {/* Flowing animated pulse matching desktop */}
                            <motion.path
                              d="M 12 0 L 12 56"
                              stroke="#C5A47E"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeDasharray="15 45"
                              fill="none"
                              animate={{ strokeDashoffset: [0, -60] }}
                              transition={{ strokeDashoffset: { repeat: Infinity, ease: "linear", duration: 1.5 } }}
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Right column: card */}
                    <div className={`pt-1 ${isLast ? 'pb-0' : 'pb-6'} flex-1`}>
                      <div className="bg-white/50 backdrop-blur-sm border border-neutral-200/50 p-5 rounded-2xl group-hover:border-accent/30 group-hover:bg-white/85 transition-all duration-300 shadow-sm">
                        <h3 className="text-base font-heading font-semibold mb-2 text-primary group-hover:text-accent transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-neutral-500 text-xs leading-relaxed font-light">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6.5 Client Portal Promotion */}
      <section className="py-28 bg-[#f8f9fa] relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: Text + features */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-8">
                <div className="space-y-4">
                  <span className="inline-block text-accent text-[11px] font-semibold tracking-[0.3em] uppercase border border-accent/20 px-4 py-1.5 rounded-full bg-accent/5">
                    Client Experience
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-normal text-[#111] leading-tight">
                    No Waiting.
                  </h2>
                  <p className="text-neutral-600 text-base md:text-lg font-light leading-relaxed max-w-lg">
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
                        <h4 className="text-[#111] text-sm font-semibold mb-0.5">{f.title}</h4>
                        <p className="text-neutral-600 text-xs leading-relaxed">{f.desc}</p>
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
                <div className="relative bg-[#111113] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="p-6 sm:p-8 space-y-6">

                    {/* Top Row: Current Project Header & 3D Render Image */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Current Project</p>
                          <h3 className="text-white font-heading font-normal text-2xl mt-1 tracking-tight">Jubilee Hills Villa</h3>
                        </div>
                        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A47E]/10 border border-[#C5A47E]/20 hover:bg-[#C5A47E]/20 text-[#C5A47E] hover:text-white text-xs font-semibold rounded-xl transition-all duration-300">
                          View Project Details
                          <ArrowRight size={14} />
                        </button>
                      </div>

                      {/* 3D Render Image with Rounded Corners */}
                      <div className="w-full sm:w-[220px] md:w-[240px] shrink-0 rounded-2xl overflow-hidden border border-white/[0.08] aspect-[16/10] bg-neutral-900 shadow-md">
                        <img
                          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                          alt="Jubilee Hills Living Room Render"
                          className="w-full h-full object-cover opacity-90"
                        />
                      </div>
                    </div>

                    {/* Second Row: Design Concept Milestone Box */}
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white font-semibold">Design Concept</span>
                        <span className="text-xs text-green-400 font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Approved
                        </span>
                      </div>

                      {/* Gold Progress Bar */}
                      <div className="space-y-2">
                        <div className="w-full bg-white/[0.05] rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "80%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="h-full rounded-full bg-accent"
                          />
                        </div>
                        <div className="flex justify-end text-xs text-neutral-400 font-semibold">
                          <span>80%</span>
                        </div>
                      </div>

                      {/* Milestone Subtext */}
                      <div className="flex justify-between items-center text-xs border-t border-white/[0.05] pt-3">
                        <span className="text-neutral-400">Milestone: Carpentry & Custom Fixtures</span>
                        <span className="text-accent font-semibold">In Progress</span>
                      </div>
                    </div>

                    {/* Third Row: 4-Card Navigation Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                      {/* Card 1: Floor Plans */}
                      <div className="bg-white/[0.01] border border-white/[0.05] hover:border-accent/40 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/15 transition-colors">
                          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M9 3v18M9 11h12M3 15h6" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-white group-hover:text-accent transition-colors">Floor Plans</span>
                        <span className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider font-semibold">View Now</span>
                      </div>

                      {/* Card 2: 3D Renders */}
                      <div className="bg-white/[0.01] border border-white/[0.05] hover:border-accent/40 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/15 transition-colors">
                          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M12 3v18M12 3L4 7.5v9L12 21l8-4.5v-9L12 3z M4 7.5L12 12l8-4.5" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-white group-hover:text-accent transition-colors">3D Renders</span>
                        <span className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider font-semibold">View Now</span>
                      </div>

                      {/* Card 3: Moodboard */}
                      <div className="bg-white/[0.01] border border-white/[0.05] hover:border-accent/40 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/15 transition-colors">
                          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <rect x="4" y="4" width="6" height="6" rx="1.5" />
                            <rect x="14" y="4" width="6" height="6" rx="1.5" />
                            <rect x="4" y="14" width="6" height="6" rx="1.5" />
                            <rect x="14" y="14" width="6" height="6" rx="1.5" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-white group-hover:text-accent transition-colors">Moodboard</span>
                        <span className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider font-semibold">View Now</span>
                      </div>

                      {/* Card 4: Materials */}
                      <div className="bg-white/[0.01] border border-white/[0.05] hover:border-accent/40 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/15 transition-colors">
                          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 12l10 4.5 10-4.5M2 17l10 4.5 10-4.5" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-white group-hover:text-accent transition-colors">Materials</span>
                        <span className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider font-semibold">View Now</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. Philosophy */}
      <section className="py-28 bg-gradient-dark relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal text-[#111] leading-tight mb-5">
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
                className="group relative bg-white border border-black/[0.06] rounded-3xl p-8 hover:border-accent/30 transition-all duration-500 hover:shadow-sm overflow-hidden flex flex-col"
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

                <h3 className="text-xl md:text-2xl font-heading font-normal text-[#111] mb-4 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light flex-1">
                  {item.desc}
                </p>

                {/* Watermark on hover */}
                <div className="absolute -bottom-4 -right-2 font-heading italic text-[5rem] font-extrabold text-black/[0.03] select-none pointer-events-none group-hover:text-accent/[0.04] transition-colors duration-700">
                  {item.title[0]}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Collaborators / Brands */}
      <section className="hidden py-16 bg-gradient-dark relative overflow-hidden">
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
                <span className="text-white group-hover:text-accent transition-colors duration-300 font-bold tracking-wider text-sm sm:text-base lg:text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
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





      {/* 9. Contact (Start a Project) */}
      <section id="contact-section" className="py-24 bg-[#111111] text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h4 className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">Start a Project</h4>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">Ready to transform your space?</h2>
            <p className="text-neutral-400 text-lg mb-12">Tell us what you are dreaming of. We will reply within 24 hours with next steps and a rough estimate.</p>

            {isSubmitted ? (
              <div className="max-w-2xl mx-auto mb-8 p-6 bg-accent/10 border border-accent/20 rounded-xl text-center">
                <h3 className="text-xl font-heading font-bold text-white mb-2">Request Received!</h3>
                <p className="text-neutral-300">Thank you for reaching out. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8 text-left">
                <div>
                  <input
                    type="text" required placeholder="Your Name"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 bg-[#18181b]/50 border border-white/10 rounded-xl focus:outline-none focus:border-accent text-white placeholder-neutral-500"
                  />
                </div>
                <div>
                  <input
                    type="tel" required placeholder="Phone Number"
                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-4 bg-[#18181b]/50 border border-white/10 rounded-xl focus:outline-none focus:border-accent text-white placeholder-neutral-500"
                  />
                </div>
                <div className="md:col-span-2 relative">
                  <div
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="w-full px-5 py-4 bg-[#18181b]/50 border border-white/10 rounded-xl cursor-pointer flex justify-between items-center text-white"
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
                        className="absolute z-50 w-full mt-2 bg-[#18181b] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
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
                    className="w-full py-4 bg-accent/80 hover:bg-accent text-neutral-100 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-accent/15 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

      {/* 10. Frequently Asked Questions (Moved to end) */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-14">
            <span className="inline-block text-accent text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 border border-accent/20 px-4 py-1.5 rounded-full bg-accent/5">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-normal text-[#111] mt-4 mb-4 leading-tight">
              Answers before<br className="hidden sm:block" /> we begin.
            </h2>
            <p className="text-neutral-600 text-sm md:text-base font-light max-w-lg mx-auto">
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
            className="mt-14 text-center border-t border-black/[0.06] pt-10"
          >
            <p className="text-neutral-600 text-sm mb-5">Still have questions? We're happy to help.</p>
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

      {/* 11. Interactive WebGL Shader Demo */}
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden min-h-[50vh] bg-primary py-24 z-10">
        <WebGLShader />
        <div className="relative w-full mx-auto max-w-3xl z-20 text-center px-6">
          <h1 className="mb-3 text-white text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">Design is Everything</h1>
          <p className="text-white/60 px-6 text-center text-xs md:text-sm lg:text-lg font-light max-w-2xl mx-auto mb-8">Unleashing creativity through bold visuals, seamless execution, and limitless possibilities.</p>
          <div className="flex justify-center">
            <a
              href="https://cal.com/orniva-design-studio/30min"
              target="_blank"
              rel="noreferrer"
              className="inline-block"
            >
              <LiquidButton className="text-white border rounded-full font-semibold" size="xl">Contact Us</LiquidButton>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
