import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaNodeJs, 
  FaGithub, 
  FaDatabase, 
  FaDocker, 
  FaFigma, 
  FaNpm, 
  FaAws, 
  FaGitAlt 
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiRedux, 
  SiTailwindcss, 
  SiExpress, 
  SiMongodb, 
  SiPostgresql 
} from "react-icons/si";

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

// Habilidades de desarrollo
const skills = [
  {
    name: "HTML5",
    icon: <FaHtml5 />,
    category: "Frontend",
    level: 95
  },
  {
    name: "CSS3",
    icon: <FaCss3Alt />,
    category: "Frontend",
    level: 90
  },
  {
    name: "JavaScript",
    icon: <FaJs />,
    category: "Frontend",
    level: 92
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    category: "Frontend",
    level: 85
  },
  {
    name: "React",
    icon: <FaReact />,
    category: "Frontend",
    level: 95
  },
  {
    name: "Redux",
    icon: <SiRedux />,
    category: "Frontend",
    level: 88
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    category: "Frontend",
    level: 90
  },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    category: "Backend",
    level: 85
  },
  {
    name: "Express",
    icon: <SiExpress />,
    category: "Backend",
    level: 80
  },
  {
    name: "MongoDB",
    icon: <SiMongodb />,
    category: "Backend",
    level: 78
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql />,
    category: "Backend",
    level: 75
  },
  {
    name: "Git",
    icon: <FaGitAlt />,
    category: "Herramientas",
    level: 90
  },
  {
    name: "GitHub",
    icon: <FaGithub />,
    category: "Herramientas",
    level: 88
  },
  {
    name: "Docker",
    icon: <FaDocker />,
    category: "Herramientas",
    level: 70
  },
  {
    name: "Figma",
    icon: <FaFigma />,
    category: "Herramientas",
    level: 75
  },
  {
    name: "AWS",
    icon: <FaAws />,
    category: "Herramientas",
    level: 65
  },
];

const SkillCard = ({ name, icon, level }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 ${
      theme === "light" 
        ? "bg-light-secondary shadow-md hover:shadow-xl" 
        : "bg-dark-secondary shadow-md hover:shadow-xl"
    }`}>
      <div className={`text-4xl mb-3 ${
        theme === "light" ? "text-highlight" : "text-highlight"
      }`}>
        {icon}
      </div>
      <h3 className={`text-base font-medium ${
        theme === "light" ? "text-light-text" : "text-dark-text"
      }`}>
        {name}
      </h3>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-3">
        <div 
          className="bg-highlight h-2.5 rounded-full" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <span className={`text-xs mt-1 ${
        theme === "light" ? "text-light-text-light" : "text-dark-text-light"
      }`}>
        {level}%
      </span>
    </div>
  );
};

const Skills = ({ standalone = false }) => {
  const { theme } = useTheme();

  // Agrupar habilidades por categoría
  const categories = {
    Frontend: skills.filter(skill => skill.category === "Frontend"),
    Backend: skills.filter(skill => skill.category === "Backend"),
    Herramientas: skills.filter(skill => skill.category === "Herramientas")
  };

  return (
    <section 
      id="skills"
      className={`${standalone ? 'pt-28' : ''} relative w-full mx-auto pb-10 bg-light-secondary dark:bg-dark-secondary`}
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
            Mis <span className="text-highlight">Habilidades</span>
          </h2>
          <p className="text-light-text-light dark:text-dark-text-light max-w-3xl mx-auto">
            Un conjunto de tecnologías y herramientas que domino para crear experiencias web excepcionales.
          </p>
        </motion.div>

        {Object.entries(categories).map(([category, categorySkills], index) => (
          <motion.div
            key={category}
            variants={fadeIn("up", "tween", 0.2 + index * 0.1, 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold mb-6 text-light-text dark:text-dark-text">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categorySkills.map((skill, skillIndex) => (
                <SkillCard
                  key={skillIndex}
                  name={skill.name}
                  icon={skill.icon}
                  level={skill.level}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills; 