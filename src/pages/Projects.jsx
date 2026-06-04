import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const projects = [
  { id: 1, title: 'Mr. Abhi - Vidyanagar', cat: 'Residential', img: 'https://res.cloudinary.com/dbmvjtbqk/image/upload/v1779111279/imresizer-2_rwnmyw.jpg' },
  { id: 4, title: 'Premium Modular Kitchen', cat: 'Residential', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Master Bedroom Suite', cat: 'Residential', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Children\'s Bedroom Design', cat: 'Residential', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 7, title: 'Ergonomic Study Unit', cat: 'Residential', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 8, title: 'Pooja Unit Detailing', cat: 'Residential', img: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 10, title: 'Luxury Living Area', cat: 'Residential', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

const categories = ['All', 'Residential'];

const Projects = () => {
  const [activeCat, setActiveCat] = useState('All');

  const filteredProjects = activeCat === 'All'
    ? projects
    : projects.filter(p => p.cat === activeCat);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <Helmet>
        <title>Our Portfolio | Orniva Design Studio</title>
        <meta name="description" content="Explore our diverse collection of interior design projects, showcasing our commitment to excellence and innovative spatial solutions." />
      </Helmet>
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
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${activeCat === cat
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
                    className={`w-full h-full object-cover transform transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${project.id === 1 ? 'scale-[1.4] object-top group-hover:scale-[1.5]' : 'scale-100 group-hover:scale-[1.04]'
                      }`}
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
