import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();

  // Data updated from portfolio
  const projectsData = {
    "1": {
      title: 'Mr. Abhi - Vidyanagar',
      cat: 'Residential',
      client: 'Mr. Madhusudan Rao',
      location: 'Vidyanagar, Hyderabad',
      area: '3BHK',
      duration: '6 Months',
      heroImg: 'https://res.cloudinary.com/dbmvjtbqk/image/upload/v1779110836/2_zmwgd2.jpg',
      desc: 'The 3BHK interior design is created with a perfect balance of simplicity, functionality, and modern aesthetics. Each space is thoughtfully designed to maintain a clean and clutter-free look while highlighting unique design elements. The living room features elegant wall textures, cozy furniture, and soft lighting that create a warm and welcoming ambiance.',
      gallery: [
        'https://res.cloudinary.com/dbmvjtbqk/image/upload/v1779110836/2_zmwgd2.jpg',
        'https://res.cloudinary.com/dbmvjtbqk/image/upload/v1779111279/imresizer-2_rwnmyw.jpg',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "2": {
      title: 'Gym Studio - Hyderabad',
      cat: 'Commercial',
      client: 'Private Client',
      location: 'Hyderabad',
      area: '2,500 sq ft',
      duration: '4 Months',
      heroImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'A modern, high-energy gym studio located in Hyderabad. Designed to motivate and inspire, the space features dynamic lighting, durable materials, and an optimal layout for various workout zones. The interior balances raw, industrial elements with sleek, modern finishes to create a premium fitness environment.',
      gallery: [
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "3": {
      title: 'Mini Banquet Hall',
      cat: 'Hospitality',
      client: 'Private Client',
      location: 'Hyderabad',
      area: '4,000 sq ft',
      duration: '5 Months',
      heroImg: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'An elegant and versatile mini banquet hall designed to host intimate gatherings and celebrations. The interior features sophisticated lighting, premium acoustic treatments, and a flexible layout. The design emphasizes a grand yet welcoming atmosphere, utilizing rich textures and a refined color palette to create a memorable experience for guests.',
      gallery: [
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "4": {
      title: 'Premium Modular Kitchen',
      cat: 'Residential',
      client: 'Private Client',
      location: 'Hyderabad',
      area: '300 sq ft',
      duration: '2 Months',
      heroImg: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'This modular kitchen is designed with a soothing combination of sage green and creamy white, reflecting elegance, freshness, and functionality. The cabinetry is crafted using HDHMR for durability and longevity, paired with glossy acrylic shutters for a sleek, modern appearance. Wicker baskets add a natural touch while enhancing ventilation for dry storage.',
      gallery: [
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556911073-a517e052029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "5": {
      title: 'Master Bedroom Suite',
      cat: 'Residential',
      client: 'Private Client',
      location: 'Hyderabad',
      area: '400 sq ft',
      duration: '2 Months',
      heroImg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'The detailing of the master bedroom focuses on a luxurious yet balanced composition of the bed and its background wall. The bed background features layered panel detailing, combining wooden textures, fabric padding, and profile lighting for a sophisticated ambiance. Wall grooves and laminate patterns are illustrated with precision to enhance visual depth.',
      gallery: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "6": {
      title: 'Children\'s Bedroom Design',
      cat: 'Residential',
      client: 'Private Client',
      location: 'Hyderabad',
      area: '350 sq ft',
      duration: '2 Months',
      heroImg: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'A lively, imaginative, and functional space tailored to a child’s needs and comfort. The layout is designed to ensure safe circulation, playful aesthetics, and efficient use of space. The color palette features cheerful hues and contrasting tones that stimulate creativity and positivity.',
      gallery: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "7": {
      title: 'Ergonomic Study Unit',
      cat: 'Residential',
      client: 'Private Client',
      location: 'Hyderabad',
      area: '150 sq ft',
      duration: '1 Month',
      heroImg: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'The detailing of the study unit highlights a perfect balance between functionality, comfort, and aesthetic design. The design focuses on creating a productive workspace with ample storage and display options. Shelves, drawers, and cabinets are arranged ergonomically.',
      gallery: [
        'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544413647-14fb81c2be52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "8": {
      title: 'Pooja Unit Detailing',
      cat: 'Residential',
      client: 'Private Client',
      location: 'Hyderabad',
      area: '100 sq ft',
      duration: '1 Month',
      heroImg: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'A timeless design that brings spirituality into everyday living. The 2D detailing of the pooja unit showcases multiple design variations, each reflecting a balance between tradition and modern aesthetics. Each design emphasizes symmetry, simplicity, and the spiritual essence.',
      gallery: [
        'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "9": {
      title: 'Contemporary Ceiling Concepts',
      cat: 'Residential',
      client: 'Private Client',
      location: 'Hyderabad',
      area: 'Full House',
      duration: '2 Months',
      heroImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'A contemporary ceiling concept combining elegance and functionality. Warm wood textures add depth and a sense of natural sophistication. Profile lighting highlights architectural lines and enhances ambience.',
      gallery: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "10": {
      title: 'Luxury Living Area',
      cat: 'Residential',
      client: 'Private Client',
      location: 'Hyderabad',
      area: '800 sq ft',
      duration: '3 Months',
      heroImg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      desc: 'A luxurious living space designed to reflect sophistication and comfort. Every element blends elegance with functionality. Rich textures and refined finishes enhance visual warmth. A seamless balance of space, light, and texture.',
      gallery: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    }
  };

  const project = projectsData[id] || projectsData["1"];

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <img
          src={project.heroImg}
          alt={project.title}
          className="w-full h-full object-cover blur-[5px] scale-105"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={img}
                      alt={`${project.title} view ${i + 1}`}
                      className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
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
