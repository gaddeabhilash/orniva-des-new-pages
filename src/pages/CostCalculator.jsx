import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Check } from 'lucide-react';

const CostCalculator = () => {
  const [step, setStep] = useState(0); // 0 = Hero, 1 = Form
  const [formData, setFormData] = useState({
    roomType: '',
    area: '',
    budget: ''
  });
  const [isCalculated, setIsCalculated] = useState(false);

  const handleStart = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateEstimate = (e) => {
    e.preventDefault();
    setIsCalculated(true);
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
              Interior design<br/>budget calculator
            </h1>
            <p className="text-xl md:text-2xl text-neutral-800 max-w-lg font-light">
              Get customized quotation for your interior design
            </p>
            <div className="pt-4">
              <button 
                onClick={handleStart}
                className="px-8 py-3.5 bg-transparent border-2 border-primary text-primary rounded-full text-lg font-medium hover:bg-primary hover:text-white transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 group"
              >
                Calculate now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative h-[350px] md:h-[500px] lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0"
          >
            {/* Background Room Image */}
            <div className="absolute inset-0 md:right-10 rounded-[2rem] overflow-hidden shadow-2xl bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Beautiful living room" 
                className="w-full h-full object-cover"
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
                  {['C','±','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','0','.','='].map((btn, i) => (
                    <div 
                      key={i} 
                      className={`h-10 md:h-14 rounded-full flex items-center justify-center text-base md:text-xl font-medium ${
                        btn === '0' ? 'col-span-2' : ''
                      } ${
                        ['÷','×','-','+','='].includes(btn) 
                          ? 'bg-[#FF9F0A] text-white' 
                          : ['C','±','%'].includes(btn)
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
    <div className="pt-32 pb-24 min-h-screen bg-secondary/50">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Cost Estimator
          </h1>
          <p className="text-neutral-500">Provide details about your space to get an instant budget estimate.</p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Form Side */}
            <div className="w-full md:w-3/5 p-8 md:p-12">
              {!isCalculated ? (
                <form onSubmit={calculateEstimate} className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-3">What kind of space are we designing?</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Residential', 'Commercial', 'Office', 'Hospitality'].map(type => (
                        <div 
                          key={type}
                          onClick={() => setFormData({...formData, roomType: type})}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.roomType === type 
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
                    <label className="block text-sm font-medium text-primary mb-3">Total Area (Sq Ft)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="e.g. 1500"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="w-full px-5 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-3">Quality & Finish Preference</label>
                    <select 
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-5 py-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-primary appearance-none"
                    >
                      <option value="" disabled>Select finish quality</option>
                      <option value="essential">Essential (Budget Friendly)</option>
                      <option value="premium">Premium (Standard)</option>
                      <option value="luxury">Luxury (High-End)</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Calculator size={20} />
                    Generate Estimate
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
                    <p className="text-neutral-500 mb-2">Estimated Range</p>
                    <p className="text-4xl font-light text-primary tracking-tight">₹4.5L - ₹6.2L</p>
                    <p className="text-sm text-neutral-400 mt-4">*This is a rough estimate based on {formData.area} sq.ft for a {formData.budget} {formData.roomType} space.</p>
                  </div>
                  <div className="flex gap-4 w-full mt-4">
                    <button 
                      onClick={() => setIsCalculated(false)}
                      className="flex-1 py-3 border border-neutral-200 text-primary rounded-xl font-medium hover:bg-neutral-50 transition-colors"
                    >
                      Recalculate
                    </button>
                    <button className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors">
                      Book Consultation
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Info Side */}
            <div className="w-full md:w-2/5 bg-primary text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-heading font-semibold mb-6">What's included?</h3>
                <ul className="space-y-4">
                  {[
                    'Detailed 2D & 3D planning',
                    'Material selection guidance',
                    'Project management',
                    'Quality assurance checks',
                    'Post-handover support'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300">
                      <Check size={20} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-12 pt-8 border-t border-neutral-800">
                <p className="text-sm text-neutral-400 italic">
                  "The calculator gave us a very realistic idea of what to expect, making our planning phase so much easier."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-800 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-white">Sarah Jenkins</p>
                    <p className="text-xs text-neutral-500">Residential Client</p>
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
