import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: "E-commerce moderno",
    description: "Plataforma de comercio electrónico completa con carrito de compras, integración de pagos y sistema de autenticación. Diseño responsivo y alto rendimiento.",
    image: "https://placehold.co/600x400/151030/FFFFFF?text=E-commerce+App",
    tags: ["React", "Redux", "Node.js", "MongoDB", "Stripe API"],
    code: "https://github.com/usuario/ecommerce-app",
    demo: "https://demo-ecommerce.com",
    featured: true
  },
  {
    title: "Dashboard administrativo",
    description: "Panel de control para gestión de datos con estadísticas en tiempo real, visualizaciones con gráficos y sistema de roles de usuario.",
    image: "https://placehold.co/600x400/151030/FFFFFF?text=Admin+Dashboard",
    tags: ["React", "TypeScript", "Material UI", "Chart.js", "Firebase"],
    code: "https://github.com/usuario/admin-dashboard",
    demo: "https://demo-dashboard.com",
    featured: true
  },
  {
    title: "App de gestión de tareas",
    description: "Aplicación de productividad con funcionalidad de arrastrar y soltar, filtros avanzados y sincronización en la nube.",
    image: "https://placehold.co/600x400/151030/FFFFFF?text=Task+Manager",
    tags: ["Vue.js", "Vuex", "Tailwind CSS", "Firebase"],
    code: "https://github.com/usuario/task-manager",
    demo: "https://demo-taskmanager.com",
    featured: false
  },
  {
    title: "Red social para profesionales",
    description: "Plataforma de networking con perfiles personalizables, sistema de mensajería y foro de discusión para profesionales.",
    image: "https://placehold.co/600x400/151030/FFFFFF?text=Social+Network",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
    code: "https://github.com/usuario/social-network",
    demo: "https://demo-socialnetwork.com",
    featured: true
  },
  {
    title: "Plataforma de cursos online",
    description: "Sistema de gestión de aprendizaje con reproducción de video, progreso del curso y certificaciones.",
    image: "https://placehold.co/600x400/151030/FFFFFF?text=E-Learning",
    tags: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL"],
    code: "https://github.com/usuario/elearning-platform",
    demo: "https://demo-elearning.com",
    featured: false
  },
  {
    title: "Aplicación de clima",
    description: "App para consultar pronóstico del tiempo en tiempo real con visualizaciones interactivas y alertas meteorológicas.",
    image: "https://placehold.co/600x400/151030/FFFFFF?text=Weather+App",
    tags: ["React", "REST API", "D3.js", "PWA"],
    code: "https://github.com/usuario/weather-app",
    demo: "https://demo-weatherapp.com",
    featured: false
  }
];

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`card relative flex flex-col ${project.featured ? 'md:col-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[200px] overflow-hidden rounded-t-2xl">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          style={{ opacity: isHovered ? 0.7 : 0 }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <a 
            href={project.code} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-tertiary hover:bg-highlight p-3 rounded-full transition-colors duration-300"
          >
            <FaGithub className="text-white text-xl" />
          </a>
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-tertiary hover:bg-highlight p-3 rounded-full transition-colors duration-300"
          >
            <FaExternalLinkAlt className="text-white text-xl" />
          </a>
        </motion.div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-secondary mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-tertiary text-secondary px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section id="proyectos" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Mis <span className="text-gradient">Proyectos</span>
          </h2>
          <p className="text-secondary text-lg mt-4 max-w-2xl mx-auto">
            Una selección de los proyectos más recientes y destacados en los que he trabajado.
            Cada proyecto representa un desafío único y una oportunidad para aprender.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 