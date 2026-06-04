import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Check } from 'lucide-react';
import manasAvatar from '../assets/manas_avatar.png';

const CostCalculator = () => {
  const [step, setStep] = useState(0); // 0 = Hero, 1 = Form
  const [formData, setFormData] = useState({
    roomType: '',
    area: '',
    budget: ''
  });
  const [isCalculated, setIsCalculated] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });

  // ==========================================
  // CHANGE PRICING HERE (Rate per Sq Ft)
  // ==========================================
  const PRICING_RATES = {
    Residential: {
      essential: 1200,
      premium: 1800,
      luxury: 2500
    },
    Commercial: {
      essential: 1500,
      premium: 2200,
      luxury: 3000
    },
    Office: {
      essential: 1000,
      premium: 1600,
      luxury: 2200
    },
    Hospitality: {
      essential: 2000,
      premium: 3000,
      luxury: 4500
    }
  };

  const handleStart = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateEstimate = (e) => {
    e.preventDefault();
    const area = parseFloat(formData.area);
    const rate = PRICING_RATES[formData.roomType]?.[formData.budget] || 0;

    if (area && rate) {
      const baseCost = area * rate;
      // Creating a range (+/- 10%)
      const min = Math.round(baseCost * 0.9);
      const max = Math.round(baseCost * 1.1);
      setEstimatedCost({ min, max });
    } else {
      setEstimatedCost({ min: 0, max: 0 });
    }

    setIsCalculated(true);
  };

  const formatCost = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Hero Section
  if (step === 0) {
    return (
      <div className="pt-24 min-h-screen bg-[#FAF7F2] overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-8 py-12 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-heading font-bold text-primary leading-[1.1] tracking-tight">
              Interior design<br />budget calculator
            </h1>
            <p className="text-xl md:text-2xl text-neutral-800 max-w-lg font-light">
              Get customized quotation for your interior design
            </p>
            <div className="pt-4">
              <button
                onClick={handleStart}
                className="relative overflow-hidden px-8 py-3.5 bg-transparent border-2 border-primary text-primary rounded-full text-lg font-medium transition-all duration-500 hover:shadow-[0_0_25px_rgba(17,17,17,0.15)] hover:scale-[1.02] w-full sm:w-auto flex items-center justify-center gap-2 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Calculate now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative h-[350px] md:h-[500px] lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0 group"
          >
            {/* Background Room Image */}
            <div className="absolute inset-0 md:right-10 rounded-[2rem] overflow-hidden shadow-2xl bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Beautiful living room"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
            </div>

            {/* Phone Mockup overlay - Refined positioning and style */}
            <motion.div
              initial={{ y: 50, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: -2 }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
              className="hidden md:flex absolute -right-6 lg:-right-16 bottom-8 w-[260px] lg:w-[300px] h-[520px] lg:h-[600px] bg-black rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-[12px] border-black overflow-hidden z-20 flex-col items-center justify-center"
            >
              <div className="absolute top-0 w-32 h-6 bg-black rounded-b-3xl z-30"></div>
              <div className="w-full h-full bg-[#1C1C1E] p-3 md:p-4 flex flex-col justify-end pb-6 md:pb-8">
                {/* Mock Calculator UI on Phone */}
                <div className="w-full text-right text-white text-3xl md:text-5xl font-light mb-4 md:mb-6">
                  0
                </div>
                <div className="grid grid-cols-4 gap-2 md:gap-3 w-full">
                  {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn, i) => (
                    <div
                      key={i}
                      className={`h-10 md:h-14 rounded-full flex items-center justify-center text-base md:text-xl font-medium ${btn === '0' ? 'col-span-2' : ''
                        } ${['÷', '×', '-', '+', '='].includes(btn)
                          ? 'bg-[#FF9F0A] text-white'
                          : ['C', '±', '%'].includes(btn)
                            ? 'bg-[#A5A5A5] text-black'
                            : 'bg-[#333333] text-white'
                        }`}
                    >
                      {btn}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    );
  }

  // Interactive Form Section
  return (
    <div className="pt-24 pb-8 min-h-screen bg-secondary/50 flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Cost Estimator
          </h1>
          <p className="text-neutral-500">Provide details about your space to get an instant budget estimate.</p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* Form Side */}
            <div className="w-full md:w-3/5 p-6 md:p-8">
              {!isCalculated ? (
                <form onSubmit={calculateEstimate} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">What kind of space are we designing?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Residential', 'Commercial', 'Office', 'Hospitality'].map(type => (
                        <div
                          key={type}
                          onClick={() => setFormData({ ...formData, roomType: type })}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.roomType === type
                              ? 'border-accent bg-accent/5'
                              : 'border-neutral-200 hover:border-accent/30'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-primary">{type}</span>
                            {formData.roomType === type && <Check size={18} className="text-accent" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Total Area (Sq Ft)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1500"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Quality & Finish Preference</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'essential', label: 'Essential', desc: 'Budget' },
                        { id: 'premium', label: 'Premium', desc: 'Standard' },
                        { id: 'luxury', label: 'Luxury', desc: 'High-End' }
                      ].map(item => (
                        <div
                          key={item.id}
                          onClick={() => setFormData({ ...formData, budget: item.id })}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${formData.budget === item.id
                              ? 'border-accent bg-accent/5'
                              : 'border-neutral-200 hover:border-accent/30'
                            }`}
                        >
                          <div className="font-medium text-primary">{item.label}</div>
                          <div className="text-[10px] text-neutral-400 mt-0.5">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="relative overflow-hidden w-full py-3.5 bg-accent text-white rounded-xl font-medium transition-all duration-500 hover:shadow-[0_0_25px_rgba(197,164,126,0.45)] hover:scale-[1.02] flex items-center justify-center gap-2 group/btn"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Calculator size={20} />
                      Generate Estimate
                    </span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300"></span>
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col justify-center items-center text-center space-y-6 py-12"
                >
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4">
                    <Check size={40} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-primary">Your Estimate is Ready!</h3>
                  <div className="bg-neutral-50 p-6 rounded-2xl w-full border border-neutral-100">
                    <p className="text-4xl font-light text-primary tracking-tight">
                      {formatCost(estimatedCost.min)} - {formatCost(estimatedCost.max)}
                    </p>
                    <p className="text-sm text-neutral-400 mt-4">*This is a rough estimate based on {formData.area} sq.ft for a {formData.budget} {formData.roomType} space.</p>
                  </div>
                  <div className="flex gap-4 w-full mt-4">
                    <button
                      onClick={() => setIsCalculated(false)}
                      className="flex-1 py-3.5 border border-neutral-200 text-primary rounded-xl font-medium transition-all duration-300 hover:bg-neutral-50 hover:scale-[1.02]"
                    >
                      Recalculate
                    </button>
                    <a 
                      href="https://cal.com/orniva-design-studio/30min" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="relative overflow-hidden flex-1 py-3.5 bg-accent text-white rounded-xl font-medium transition-all duration-500 hover:shadow-[0_0_25px_rgba(197,164,126,0.45)] hover:scale-[1.02] text-center block leading-tight group/btn"
                    >
                      <span className="relative z-10 block pt-0.5">Book Consultation</span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300"></span>
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Info Side */}
            <div className="w-full md:w-2/5 bg-[#111111] text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-heading font-semibold mb-4 text-white">What's included?</h3>
                <ul className="space-y-3">
                  {[
                    'Detailed 2D & 3D planning',
                    'Material selection guidance',
                    'Project management',
                    'Quality assurance checks',
                    'Post-handover support'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300">
                      <Check size={18} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-neutral-400 italic">
                  "The calculator gave us a very realistic idea of what to expect, making our planning phase so much easier."
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={manasAvatar}
                    alt="Manas"
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <p className="text-xs font-medium text-white">Manas</p>
                    <p className="text-[10px] text-neutral-400">Residential Client</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;