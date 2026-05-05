import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  
  // Mock data for demonstration
  const project = {
    title: 'The Minimalist Haven',
    cat: 'Residential',
    client: 'Private Owner',
    location: 'Beverly Hills, CA',
    area: '4,500 sq ft',
    duration: '8 Months',
    heroImg: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    desc: 'The Minimalist Haven is a testament to the idea that less is more. By focusing on clean lines, natural light, and a restrained material palette, we created a space that feels both expansive and intimately cozy. The design prioritizes functional elegance, ensuring every element serves a purpose while contributing to the overall aesthetic harmony.',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ]
  };

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[500px] w-full">
        <img 
          src={project.heroImg} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto">
            <Link to="/projects" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to Projects
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-accent text-sm font-semibold tracking-wider uppercase block mb-2">{project.cat}</span>
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">{project.title}</h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Info */}
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="bg-secondary/50 p-8 rounded-2xl">
                <h3 className="text-xl font-heading font-bold text-primary mb-6 border-b border-neutral-200 pb-4">Project Details</h3>
                <ul className="space-y-4">
                  <li>
                    <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Client</span>
                    <span className="text-primary font-medium">{project.client}</span>
                  </li>
                  <li>
                    <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Location</span>
                    <span className="text-primary font-medium">{project.location}</span>
                  </li>
                  <li>
                    <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Area</span>
                    <span className="text-primary font-medium">{project.area}</span>
                  </li>
                  <li>
                    <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Duration</span>
                    <span className="text-primary font-medium">{project.duration}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Description & Gallery */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">The Concept</h2>
              <p className="text-neutral-600 leading-relaxed text-lg mb-12">
                {project.desc}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((img, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden ${i === 2 ? 'md:col-span-2' : ''}`}>
                    <img src={img} alt={`${project.title} view ${i+1}`} className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Next Project CTA */}
      <section className="py-24 bg-primary text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8">Ready to start your project?</h2>
          <Link to="/contact" className="px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-white hover:text-primary transition-colors inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
