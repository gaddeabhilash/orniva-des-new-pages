import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const LUXE_PASSWORD = '0987';
const STORAGE_KEY = 'orniva_luxe_access';

const LuxeGate = ({ children }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  // Persist access across page refreshes (session only)
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === LUXE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setError(false);
      setUnlocked(true);
    } else {
      setError(true);
      setShaking(true);
      setInput('');
      setTimeout(() => {
        setShaking(false);
        setError(false);
      }, 700);
    }
  };

  if (unlocked) return children;

  return (
    <div className="min-h-screen bg-[#070708] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Card */}
        <div className="bg-[#111113]/80 border border-white/8 rounded-3xl p-10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl text-center space-y-8">

          {/* Icon badge */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shadow-[0_0_32px_rgba(197,164,126,0.12)]">
              <Lock size={26} className="text-accent" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.45em] uppercase text-accent/70 font-semibold font-serif">
                ORNIVA ATELIER LUXE
              </p>
              <h1 className="text-xl font-heading font-semibold text-white mt-1">
                Private Access
              </h1>
              <p className="text-xs text-neutral-500 mt-1 font-light">
                Enter your exclusive access code to continue
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent mx-auto" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              animate={shaking ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <input
                type={showPin ? 'text' : 'password'}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="••••"
                maxLength={10}
                autoFocus
                className={`w-full bg-[#0a0a0b] border rounded-2xl px-5 py-4 text-center text-white text-xl font-heading tracking-[0.5em] focus:outline-none transition-all duration-300 placeholder:tracking-[0.3em] placeholder:text-neutral-700 ${
                  error
                    ? 'border-red-500/50 shadow-[0_0_16px_rgba(239,68,68,0.15)]'
                    : 'border-white/8 focus:border-accent/50 focus:shadow-[0_0_16px_rgba(197,164,126,0.1)]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPin(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                tabIndex={-1}
              >
                {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-400 text-center"
                >
                  Incorrect code. Please try again.
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full py-4 bg-accent hover:bg-accent/90 text-primary font-heading font-bold rounded-2xl text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-accent/10 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <ShieldCheck size={14} />
              <span>Unlock Atelier</span>
            </button>
          </form>

          <p className="text-[10px] text-neutral-600 font-light">
            This area is restricted to invited guests only.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LuxeGate;
