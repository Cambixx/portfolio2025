import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

// Creamos un efecto de fade-in para las animaciones
const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

const projects = [
  {
    name: "E-commerce App",
    description:
      "Una plataforma de e-commerce completa con catálogo de productos, carrito de compras, panel de administración y pasarela de pagos integrada.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Redux", "Stripe"],
    image: "/images/projects/project-1.jpg",
    sourceCode: "https://github.com/username/ecommerce-app",
    liveDemo: "https://ecommerce-app-demo.netlify.app",
  },
  {
    name: "Dashboard de Analíticas",
    description:
      "Dashboard interactivo que visualiza datos comerciales y métricas clave con gráficos personalizables y reportes exportables.",
    tags: ["React", "Chart.js", "Firebase", "Tailwind CSS", "Context API"],
    image: "/images/projects/project-2.jpg",
    sourceCode: "https://github.com/username/analytics-dashboard",
    liveDemo: "https://analytics-dashboard-demo.vercel.app",
  },
  {
    name: "App de Gestión de Tareas",
    description:
      "Aplicación para gestionar tareas personales y proyectos con funcionalidades de Drag & Drop, recordatorios y colaboración en equipo.",
    tags: ["React", "TypeScript", "MongoDB", "Express", "JWT", "Socket.io"],
    image: "/images/projects/project-3.jpg",
    sourceCode: "https://github.com/username/task-management-app",
    liveDemo: "https://task-app-demo.herokuapp.com",
  },
  {
    name: "Portfolio Personal",
    description:
      "Portfolio web responsivo construido con React y Tailwind CSS, con soporte para temas claro y oscuro, animaciones y vistas optimizadas.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    image: "/images/projects/project-4.jpg",
    sourceCode: "https://github.com/username/portfolio",
    liveDemo: "https://my-portfolio-demo.netlify.app",
  },
  {
    name: "API de Reservas",
    description:
      "API RESTful para un sistema de reservas de hoteles con autenticación, autorización, y documentación Swagger.",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
    image: "/images/projects/project-5.jpg",
    sourceCode: "https://github.com/username/booking-api",
    liveDemo: "https://booking-api-docs.netlify.app",
  },
  {
    name: "App de Clima",
    description:
      "Aplicación de pronóstico del tiempo que consume datos de APIs externas para mostrar información meteorológica detallada y alertas.",
    tags: ["React", "OpenWeather API", "Context API", "CSS Modules"],
    image: "/images/projects/project-6.jpg",
    sourceCode: "https://github.com/username/weather-app",
    liveDemo: "https://weather-app-demo.vercel.app",
  },
];

const ProjectCard = ({ project }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.3, 0.75)}
      className={`rounded-xl overflow-hidden ${
        theme === "light"
          ? "bg-light-secondary shadow-md hover:shadow-xl"
          : "bg-dark-secondary shadow-md hover:shadow-xl"
      } transition-all duration-300 hover:-translate-y-2`}
    >
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
        <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <span className="text-lg font-medium">{project.name}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${
          theme === "light" ? "text-light-text" : "text-dark-text"
        }`}>
          {project.name}
        </h3>
        <p className={`mb-4 text-sm ${
          theme === "light" ? "text-light-text-light" : "text-dark-text-light"
        }`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className={`text-xs px-2 py-1 rounded-full ${
                theme === "light"
                  ? "bg-light-tertiary text-light-text-light"
                  : "bg-dark-tertiary text-dark-text-light"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-300 ${
              theme === "light"
                ? "bg-highlight text-white hover:bg-highlight-hover"
                : "bg-highlight text-white hover:bg-highlight-hover"
            }`}
          >
            <FaExternalLinkAlt /> Sitio Web
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ standalone = false }) => {
  const { theme } = useTheme();

  return (
    <section
      id="proyectos"
      className={`${standalone ? 'pt-28' : ''} relative w-full mx-auto pb-10 bg-light-primary dark:bg-dark-primary`}
    >
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-light-text dark:text-dark-text">
            <span className="text-highlight">Proyectos</span>
          </h2>
          <p className="text-light-text-light dark:text-dark-text-light max-w-2xl mx-auto text-lg">
            Proyectos en los que estoy trabajando actualmente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 