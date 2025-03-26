import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import projectsData from "../data/projects.json";

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
        {project.image && (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        )}
        {!project.image && (
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <span className="text-lg font-medium">{project.name}</span>
          </div>
        )}
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
          {projectsData.projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 