import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Home, Sparkles, Calculator, Briefcase } from 'lucide-react';

const BrickWall = () => {
  const rows = 16;
  return (
    <div className="absolute inset-0 bg-[#EFECE6] p-1 flex flex-col gap-[3px] select-none pointer-events-none overflow-hidden">
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const isEven = rowIndex % 2 === 0;
        return (
          <div key={rowIndex} className="flex gap-[3px] h-[6%] w-full shrink-0">
            {isEven ? (
              <>
                <div className="bg-[#FAF7F2]/80 border border-neutral-300/40 rounded-sm w-[15%]" />
                <div className="bg-[#FAF7F2]/80 border border-neutral-300/40 rounded-sm flex-grow" />
                <div className="bg-[#FAF7F2]/80 border border-neutral-300/40 rounded-sm flex-grow" />
                <div className="bg-[#FAF7F2]/80 border border-neutral-300/40 rounded-sm flex-grow" />
                <div className="bg-[#FAF7F2]/80 border border-neutral-300/40 rounded-sm w-[15%]" />
              </>
            ) : (
              <>
                <div className="bg-[#FAF7F2]/80 border border-neutral-300/40 rounded-sm flex-grow" />
                <div className="bg-[#FAF7F2]/80 border border-neutral-300/40 rounded-sm flex-grow" />
                <div className="bg-[#FAF7F2]/80 border border-neutral-300/40 rounded-sm flex-grow" />
                <div className="bg-[#FAF7F2]/80 border border-neutral-300/40 rounded-sm flex-grow" />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-primary flex items-center justify-center pt-24 pb-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background soft glowing accent blurs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium 3D Swinging Doors Graphic */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[340px] md:max-w-[360px] aspect-[4/5] bg-neutral-900 border-x-4 border-t-4 border-primary rounded-t-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden">
              
              {/* 1. Brick Wall backdrop (behind the doors) */}
              <BrickWall />
              
              {/* Subtle vignette/depth shadow overlay inside the frame */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/15 pointer-events-none z-10" />

              {/* 2. Hanging swinging 404 signboard */}
              <div className="absolute inset-0 flex justify-center items-start pt-[20%] z-20 pointer-events-none">
                <motion.div 
                  animate={{ rotate: [-4, 4, -4] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4.2, 
                    ease: "easeInOut" 
                  }}
                  style={{ transformOrigin: 'top center' }}
                  className="flex flex-col items-center relative"
                >
                  {/* String Hanging Cords */}
                  <div className="flex gap-[44px] -mb-1">
                    <div className="w-[1.5px] h-12 bg-neutral-600 border border-neutral-700/20" />
                    <div className="w-[1.5px] h-12 bg-neutral-600 border border-neutral-700/20" />
                  </div>
                  
                  {/* Signboard */}
                  <div className="px-6 py-3 bg-[#C84E55] border-2 border-primary rounded-md shadow-md text-white font-sans text-center min-w-[100px]">
                    <div className="text-[10px] tracking-[0.25em] font-semibold text-white/70 uppercase -mb-1">Error</div>
                    <div className="text-3xl font-bold tracking-wider leading-none">404</div>
                  </div>
                </motion.div>
              </div>

              {/* 3. Left Door */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -118 }}
                transition={{ 
                  delay: 0.6, 
                  duration: 2.2, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                style={{ 
                  transformOrigin: 'left center', 
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
                className="absolute left-0 top-0 w-1/2 h-full z-30 bg-[#FAF7F2] border-r border-primary/20 flex flex-col justify-between p-4 shadow-2xl"
              >
                {/* Panel Door details */}
                <div className="w-full h-[46%] border border-primary/30 rounded-md bg-[#FAF7F2]/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] flex items-center justify-center">
                  <div className="w-[80%] h-[80%] border border-primary/10 rounded bg-[#FAF7F2]/40" />
                </div>
                <div className="w-full h-[46%] border border-primary/30 rounded-md bg-[#FAF7F2]/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] flex items-center justify-center">
                  <div className="w-[80%] h-[80%] border border-primary/10 rounded bg-[#FAF7F2]/40" />
                </div>
                
                {/* Latch / Handle */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-neutral-800 rounded-sm border border-neutral-600 shadow-sm flex items-center justify-end">
                  <div className="w-3 h-2 bg-neutral-700 rounded-sm -mr-1 shadow-sm border border-neutral-600" />
                </div>
              </motion.div>

              {/* 4. Right Door */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 118 }}
                transition={{ 
                  delay: 0.6, 
                  duration: 2.2, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                style={{ 
                  transformOrigin: 'right center', 
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
                className="absolute right-0 top-0 w-1/2 h-full z-30 bg-[#FAF7F2] border-l border-primary/20 flex flex-col justify-between p-4 shadow-2xl"
              >
                {/* Panel Door details */}
                <div className="w-full h-[46%] border border-primary/30 rounded-md bg-[#FAF7F2]/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] flex items-center justify-center">
                  <div className="w-[80%] h-[80%] border border-primary/10 rounded bg-[#FAF7F2]/40" />
                </div>
                <div className="w-full h-[46%] border border-primary/30 rounded-md bg-[#FAF7F2]/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] flex items-center justify-center">
                  <div className="w-[80%] h-[80%] border border-primary/10 rounded bg-[#FAF7F2]/40" />
                </div>
                
                {/* Latch / Handle */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-neutral-800 rounded-sm border border-neutral-600 shadow-sm flex items-center justify-start">
                  <div className="w-3 h-2 bg-neutral-700 rounded-sm -ml-1 shadow-sm border border-neutral-600" />
                </div>
              </motion.div>

              {/* Door Step Shadow */}
              <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/25 to-transparent z-40 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Copy & Navigation Links */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="text-accent text-sm font-bold tracking-[0.25em] uppercase block">
                Wrong Address
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal text-primary leading-[1.15]">
                Whoops! Wrong address
              </h1>
              <p className="text-neutral-500 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                We are sorry, but the page you requested is unavailable.<br className="hidden md:block" />
                Can we interest you in some other great links instead?
              </p>
            </motion.div>

            {/* Custom Brand Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4 max-w-md mx-auto lg:mx-0 pt-4 border-t border-primary/10"
            >
              <Link 
                to="/contact" 
                className="group flex items-center justify-between p-4 bg-white hover:bg-primary hover:text-white rounded-xl border border-primary/5 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-colors">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-semibold text-sm tracking-wide">Hire a designer</span>
                </div>
                <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link 
                to="/projects" 
                className="group flex items-center justify-between p-4 bg-white hover:bg-primary hover:text-white rounded-xl border border-primary/5 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-colors">
                    <Briefcase className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-semibold text-sm tracking-wide">Orniva design ideas</span>
                </div>
                <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link 
                to="/calculator" 
                className="group flex items-center justify-between p-4 bg-white hover:bg-primary hover:text-white rounded-xl border border-primary/5 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-colors">
                    <Calculator className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-semibold text-sm tracking-wide">Estimate design cost</span>
                </div>
                <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>

            {/* Back to Home CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2"
            >
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#C84E55] hover:bg-neutral-900 text-white rounded-full font-medium shadow-lg shadow-[#C84E55]/15 hover:shadow-black/10 transition-all duration-300 text-sm tracking-wider uppercase"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotFound;
