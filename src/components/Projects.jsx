import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
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

const ProjectCard = ({ project, t }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.3, 0.75)}
      className={`project-card ${theme === "light" ? "light" : "dark"}`}
    >
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-2xl">
        {project.image && (
          <img
            src={project.image}
            alt={project.name[language]}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
        {!project.image && (
          <div className="w-full h-full bg-gray-300/50 dark:bg-[#1f2937]/70 backdrop-blur-md flex items-center justify-center">
            <span className="text-lg font-medium text-gray-600 dark:text-gray-300">{project.name[language]}</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col h-[calc(100%-12rem)] md:h-[calc(100%-14rem)] lg:h-[calc(100%-16rem)]">
        <h3 className={`text-xl font-bold tracking-tight ${
          theme === "light" ? "text-gray-900" : "text-white"
        }`}>
          {project.name[language]}
        </h3>
        
        <p className={`mt-2 text-sm leading-relaxed ${
          theme === "light" ? "text-gray-600" : "text-gray-300"
        }`}>
          {project.description[language]}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className={`text-xs px-3 py-1 rounded-full backdrop-blur-md ${
                theme === "light"
                  ? "bg-gray-200/80 text-gray-800 border border-gray-300/50"
                  : "bg-[#1f2937]/70 text-gray-100 border border-white/10"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              theme === "light"
                ? "bg-black/90 text-white hover:bg-black"
                : "bg-white/90 text-black hover:bg-white"
            }`}
          >
            <FaExternalLinkAlt className="text-xs" /> {t.projects.viewProject}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ standalone = false }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <section
      id="proyectos"
      className={`${standalone ? 'pt-28' : ''} relative w-full mx-auto pb-16 bg-gray-50/80 dark:bg-[#1e293b]/90 overflow-hidden`}
    >
      <div className="container relative mx-auto px-4 py-16 max-w-7xl">
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-light-text dark:text-dark-text tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-light-text-light dark:text-dark-text-light max-w-2xl mx-auto text-lg">
            {t.projects.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {projectsData.projects.map((project, index) => (
            <ProjectCard key={index} project={project} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 