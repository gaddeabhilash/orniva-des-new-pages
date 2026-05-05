import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Residential Design',
      desc: 'Complete home transformations that reflect your personal aesthetic while maximizing functionality and comfort.',
      img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Space Planning & Layout', 'Custom Furniture Selection', 'Color Consultation', 'Lighting Design', 'Material Sourcing']
    },
    {
      id: 2,
      title: 'Commercial & Workspace',
      desc: 'Strategic interior solutions that boost productivity, align with your brand identity, and impress your clients.',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Brand Integration', 'Ergonomic Workspaces', 'Retail Store Design', 'Hospitality Concepts', 'Acoustic Planning']
    },
    {
      id: 3,
      title: 'Bespoke Furnishing',
      desc: 'Tailor-made furniture and millwork designed specifically for your space, ensuring a perfect fit and unique style.',
      img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Custom Cabinetry', 'Upholstery Design', 'Unique Art Curation', 'Window Treatments', 'Styling & Decor']
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">Our Services</h1>
          <p className="text-xl text-neutral-500">Comprehensive design solutions tailored to meet the unique demands of your space, lifestyle, and business.</p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <div key={service.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3]">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2 lg:px-8"
              >
                <div className="w-16 h-16 bg-secondary text-accent rounded-full flex items-center justify-center mb-6">
                  <span className="font-heading font-bold text-2xl">0{service.id}</span>
                </div>
                <h2 className="text-4xl font-heading font-bold text-primary mb-6">{service.title}</h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">{service.desc}</p>
                
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b border-neutral-200 pb-2">What's Included</h4>
                <ul className="space-y-3 mb-10">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-neutral-600">
                      <Check size={18} className="text-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="inline-block px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-accent transition-colors">
                  Discuss your project
                </Link>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Services;
