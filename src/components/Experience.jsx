import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

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

// Datos de experiencia
const experiences = [
  {
    title: "Desarrollador Frontend Senior",
    company_name: "Tech Innovations",
    location: "Ciudad de México",
    icon: <FaBriefcase />,
    iconBg: "#383E56",
    date: "Marzo 2022 - Presente",
    points: [
      "Desarrollo y mantenimiento de aplicaciones web utilizando React.js y otras tecnologías relacionadas.",
      "Colaboración con equipos de diseño, producto y otros desarrolladores para crear productos de alta calidad.",
      "Implementación de diseño responsivo y asegurando compatibilidad entre navegadores.",
      "Participación en revisiones de código y proporcionando retroalimentación constructiva a otros desarrolladores."
    ],
    technologies: ["React", "Next.js", "Redux", "Tailwind CSS", "GraphQL"]
  },
  {
    title: "Desarrollador Web Full Stack",
    company_name: "Digital Solutions",
    location: "Guadalajara",
    icon: <FaBriefcase />,
    iconBg: "#E6DEDD",
    date: "Enero 2020 - Febrero 2022",
    points: [
      "Desarrollo de aplicaciones web completas desde el frontend hasta el backend.",
      "Creación de APIs RESTful y integración con servicios de terceros.",
      "Optimización de aplicaciones para máxima velocidad y escalabilidad.",
      "Mentoría a desarrolladores junior y liderazgo en proyectos pequeños."
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Docker"]
  },
  {
    title: "Desarrollador Frontend",
    company_name: "WebSolutions Co",
    location: "Remoto",
    icon: <FaBriefcase />,
    iconBg: "#383E56",
    date: "Julio 2018 - Diciembre 2019",
    points: [
      "Desarrollo de interfaces de usuario con HTML, CSS y JavaScript.",
      "Trabajo con frameworks como React y Vue.js para crear experiencias interactivas.",
      "Implementación de diseños responsivos y accesibles según estándares web.",
      "Colaboración estrecha con diseñadores UX/UI y backend developers."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Vue.js", "Sass"]
  },
  {
    title: "Ingeniería en Sistemas Computacionales",
    company_name: "Universidad Tecnológica",
    location: "Ciudad de México",
    icon: <FaGraduationCap />,
    iconBg: "#E6DEDD",
    date: "2014 - 2018",
    points: [
      "Formación en fundamentos de programación, estructuras de datos y algoritmos.",
      "Especialización en desarrollo web y aplicaciones móviles.",
      "Proyecto final: Desarrollo de una aplicación web para gestión de proyectos.",
      "Participación en hackathons y competencias de programación."
    ],
    technologies: ["Java", "C++", "JavaScript", "MySQL", "Git"]
  },
];

const ExperienceCard = ({ experience, index }) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: isDarkTheme ? "#1f2937" : "#f3f4f6",
        color: isDarkTheme ? "#f9fafb" : "#111827",
        boxShadow: isDarkTheme 
          ? "0 10px 30px -15px rgba(0, 0, 0, 0.7)" 
          : "0 10px 30px -15px rgba(0, 0, 0, 0.1)"
      }}
      contentArrowStyle={{ borderRight: `7px solid ${isDarkTheme ? "#1f2937" : "#f3f4f6"}` }}
      date={experience.date}
      dateClassName={isDarkTheme ? "text-dark-text-light" : "text-light-text-light"}
      iconStyle={{ background: experience.iconBg, color: isDarkTheme ? "#f9fafb" : "#111827" }}
      icon={experience.icon}
    >
      <div>
        <h3 className="text-xl font-bold" style={{ color: isDarkTheme ? "#f9fafb" : "#111827" }}>
          {experience.title}
        </h3>
        <p className="text-base font-semibold" style={{ margin: 0, color: isDarkTheme ? "#d1d5db" : "#4b5563" }}>
          {experience.company_name} • {experience.location}
        </p>
      </div>

      <ul className="mt-4 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-sm"
            style={{ color: isDarkTheme ? "#d1d5db" : "#4b5563" }}
          >
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {experience.technologies.map((tech, index) => (
          <span
            key={`tech-${index}`}
            className={`text-xs px-2 py-1 rounded-full ${
              isDarkTheme 
                ? "bg-dark-tertiary text-dark-text-light" 
                : "bg-light-tertiary text-light-text-light"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </VerticalTimelineElement>
  );
};

const Experience = ({ standalone = false }) => {
  const { theme } = useTheme();

  return (
    <section 
      id="experience"
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
            Mi <span className="text-highlight">Experiencia</span>
          </h2>
          <p className="text-light-text-light dark:text-dark-text-light max-w-3xl mx-auto">
            Mi trayectoria profesional y educación. Un recorrido por mi camino en el desarrollo web.
          </p>
        </motion.div>

        <div className="mt-10">
          <VerticalTimeline lineColor={theme === "dark" ? "#374151" : "#e5e7eb"}>
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
              />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default Experience; 