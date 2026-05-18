import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  
  // Mock data for all 6 projects
  const projectsData = {
    "1": {
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
    },
    "2": {
      title: 'Modern Corporate HQ',
      cat: 'Commercial',
      client: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      area: '12,000 sq ft',
      duration: '14 Months',
      heroImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'Designed for a forward-thinking tech company, this corporate headquarters balances collaborative open workspaces with private acoustic pods. The aesthetic relies on raw concrete, warm oak, and extensive interior landscaping to foster creativity and employee wellbeing.',
      gallery: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "3": {
      title: 'Urban Loft Retreat',
      cat: 'Residential',
      client: 'Private Couple',
      location: 'New York, NY',
      area: '2,200 sq ft',
      duration: '6 Months',
      heroImg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'An industrial loft transformed into a warm, sophisticated retreat. We preserved the original exposed brick and structural beams while introducing custom walnut cabinetry, bespoke lighting, and plush textiles to soften the industrial edge.',
      gallery: [
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4e5fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "4": {
      title: 'Boutique Hotel Lobby',
      cat: 'Hospitality',
      client: 'Luxe Hotels Group',
      location: 'Miami, FL',
      area: '3,500 sq ft',
      duration: '10 Months',
      heroImg: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'The lobby design serves as a captivating first impression for this luxury boutique hotel. Featuring custom terrazzo floors, brass accents, and a breathtaking central lighting installation, the space invites guests to linger and socialize in style.',
      gallery: [
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542314831-c6a4d140f6f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "5": {
      title: 'Serene Scandinavian Villa',
      cat: 'Residential',
      client: 'Private Family',
      location: 'Aspen, CO',
      area: '5,800 sq ft',
      duration: '12 Months',
      heroImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'Inspired by Nordic design principles, this mountain villa emphasizes natural materials, muted tones, and an abundance of natural light. The design seamlessly integrates the stunning exterior landscape with the cozy, hygge-inspired interior.',
      gallery: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "6": {
      title: 'Artisan Coffee Roasters',
      cat: 'Commercial',
      client: 'Artisan Beans Co.',
      location: 'Portland, OR',
      area: '1,800 sq ft',
      duration: '4 Months',
      heroImg: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'A vibrant and inviting space designed for a specialty coffee roaster. We utilized warm woods, deep green accents, and custom tile work to create a community-focused atmosphere that reflects the artisanal quality of the product.',
      gallery: [
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    }
  };

  const project = projectsData[id] || projectsData["1"];

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
