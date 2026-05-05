import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const projects = [
  { id: 1, title: 'The Minimalist Haven', cat: 'Residential', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Modern Corporate HQ', cat: 'Commercial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Urban Loft Retreat', cat: 'Residential', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Boutique Hotel Lobby', cat: 'Hospitality', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Serene Scandinavian Villa', cat: 'Residential', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Artisan Coffee Roasters', cat: 'Commercial', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const categories = ['All', 'Residential', 'Commercial', 'Hospitality'];

const Projects = () => {
  const [activeCat, setActiveCat] = useState('All');

  const filteredProjects = activeCat === 'All' 
    ? projects 
    : projects.filter(p => p.cat === activeCat);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">Our Portfolio</h1>
          <p className="text-xl text-neutral-500">Explore our diverse collection of interior design projects, showcasing our commitment to excellence and innovative spatial solutions.</p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeCat === cat 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={project.id} 
              className="group"
            >
              <Link to={`/projects/${project.id}`}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100">
                    <span className="text-white bg-accent/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold self-start mb-3">View Project</span>
                  </div>
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <span className="text-xs font-medium text-neutral-400 tracking-wider uppercase mb-1 block">{project.cat}</span>
                <h3 className="text-xl font-heading font-semibold text-primary">{project.title}</h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
