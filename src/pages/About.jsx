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
            Founded in 2026, Orniva Design Studio is a forward-thinking agency dedicated to transforming how people experience interior environments with modern innovation and timeless elegance.
          </motion.p>
        </div>
      </section>

      {/* Rolling Projects Marquee */}
      <section className="py-20 bg-white overflow-hidden relative">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
        </div>

        <div className="relative z-10">
          <div className="flex gap-4 md:gap-8 animate-marquee whitespace-nowrap">
            <div className="flex gap-4 md:gap-8 min-w-full shrink-0 items-center">
              {[
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6',
                'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
                'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
                'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
                'https://images.unsplash.com/photo-1600121848594-d8644e57abab'
              ].map((img, i) => (
                <div key={i} className={`shrink-0 rounded-2xl overflow-hidden shadow-xl ${i % 2 === 0 ? 'w-[300px] h-[400px]' : 'w-[450px] h-[320px]'}`}>
                  <img src={`${img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} alt="Project" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            {/* Duplicate for infinite effect */}
            <div className="flex gap-4 md:gap-8 min-w-full shrink-0 items-center">
              {[
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6',
                'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
                'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
                'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
                'https://images.unsplash.com/photo-1600121848594-d8644e57abab'
              ].map((img, i) => (
                <div key={i} className={`shrink-0 rounded-2xl overflow-hidden shadow-xl ${i % 2 === 0 ? 'w-[300px] h-[400px]' : 'w-[450px] h-[320px]'}`}>
                  <img src={`${img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} alt="Project" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />
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
              { num: '24/7', label: 'Support' },
              { num: '100%', label: 'Commitment' },
              { num: 'Modern', label: 'Aesthetics' },
              { num: 'Premium', label: 'Quality' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl md:text-6xl font-heading font-bold text-accent mb-2">{stat.num}</div>
                <div className="text-sm uppercase tracking-wider text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-white mt-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-24 pt-10">
            <h2 
              className="text-5xl md:text-7xl mb-6 text-primary"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              together, we've achieved great things
            </h2>
            <p className="text-neutral-500 max-w-3xl mx-auto text-lg leading-relaxed">
              At Orniva, we foster strong partnerships to deliver exceptional results. We work closely with our clients to understand their unique needs and deliver tailored solutions.
            </p>
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
