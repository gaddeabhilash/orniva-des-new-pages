import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold text-primary mb-6"
          >
            We build spaces<br/>with <span className="text-accent italic font-light">purpose.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-xl text-neutral-600 leading-relaxed"
          >
            Founded in 2015, Orniva Design Studio has grown from a passionate duo to an award-winning agency dedicated to transforming how people experience interior environments.
          </motion.p>
        </div>
      </section>

      {/* Story Image */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full h-[60vh] rounded-3xl overflow-hidden relative"
          >
            <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Orniva Studio" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Our Mission</h2>
              <h3 className="text-3xl font-heading font-bold text-primary mb-6">Elevating everyday living through thoughtful design.</h3>
              <p className="text-neutral-600 leading-relaxed">
                We believe that good design is not just about aesthetics; it's about creating spaces that function seamlessly and evoke the right emotions. Our mission is to democratize luxury by providing highly personalized, thoughtful design solutions that significantly improve our clients' quality of life.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Our Vision</h2>
              <h3 className="text-3xl font-heading font-bold text-primary mb-6">To be the global standard for modern luxury interiors.</h3>
              <p className="text-neutral-600 leading-relaxed">
                We envision a world where every space tells a story. We aim to continually push the boundaries of interior architecture, integrating sustainable practices and innovative technologies to create timeless environments that endure for generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '8+', label: 'Years Experience' },
              { num: '150+', label: 'Projects Completed' },
              { num: '12', label: 'Design Awards' },
              { num: '100%', label: 'Client Satisfaction' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl md:text-6xl font-heading font-bold text-accent mb-2">{stat.num}</div>
                <div className="text-sm uppercase tracking-wider text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Meet the Team</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">The creative minds and technical experts behind our award-winning designs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Jenkins', role: 'Principal Designer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
              { name: 'David Chen', role: 'Lead Architect', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
              { name: 'Amira Hassan', role: 'Interior Stylist', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary">{member.name}</h3>
                <p className="text-accent uppercase tracking-wider text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-8">Want to work with us?</h2>
        <Link to="/contact" className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-accent transition-colors inline-block">
          Get in Touch
        </Link>
      </section>
    </div>
  );
};

export default About;
