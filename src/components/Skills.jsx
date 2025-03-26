import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaNodeJs, 
  FaGithub, 
  FaDocker, 
  FaFigma, 
  FaNpm, 
  FaAws, 
  FaGitAlt,
  FaBootstrap,
  FaPhp 
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiThreedotjs,
  SiMysql,
  SiVite,
  SiWebpack
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
    category: "frontend"
  },
  {
    name: "CSS3",
    icon: <FaCss3Alt />,
    category: "frontend"
  },
  {
    name: "JavaScript",
    icon: <FaJs />,
    category: "frontend"
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    category: "frontend"
  },
  {
    name: "React",
    icon: <FaReact />,
    category: "frontend"
  },
  {
    name: "Three.js",
    icon: <SiThreedotjs />,
    category: "frontend"
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    category: "frontend"
  },
  {
    name: "Bootstrap",
    icon: <FaBootstrap />,
    category: "frontend"
  },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    category: "backend"
  },
  {
    name: "PHP",
    icon: <FaPhp />,
    category: "backend"
  },
  {
    name: "MySQL",
    icon: <SiMysql />,
    category: "backend"
  },
  {
    name: "Git",
    icon: <FaGitAlt />,
    category: "tools"
  },
  {
    name: "GitHub",
    icon: <FaGithub />,
    category: "tools"
  },
  {
    name: "Docker",
    icon: <FaDocker />,
    category: "tools"
  },
  {
    name: "Vite",
    icon: <SiVite />,
    category: "tools"
  },
  {
    name: "Webpack",
    icon: <SiWebpack />,
    category: "tools"
  },
  {
    name: "Figma",
    icon: <FaFigma />,
    category: "tools"
  },
  {
    name: "AWS",
    icon: <FaAws />,
    category: "tools"
  }
];

const SkillCard = ({ name, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center justify-center p-4 transition-all duration-300"
    >
      <div className="text-4xl mb-3 text-highlight">
        {icon}
      </div>
      <h3 className="text-base font-medium text-light-text dark:text-dark-text">
        {name}
      </h3>
    </motion.div>
  );
};

const CategorySection = ({ title, skills, t }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.3, 0.75)}
      className="mb-12 last:mb-0"
    >
      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8 flex items-center">
        <span className="text-highlight mr-2">#</span>
        {t.skills[title.toLowerCase()]}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {skills.map((skill) => (
          <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = ({ standalone = false }) => {
  const { t } = useLanguage();
  const categories = {
    frontend: skills.filter(skill => skill.category === "frontend"),
    backend: skills.filter(skill => skill.category === "backend"),
    tools: skills.filter(skill => skill.category === "tools")
  };

  return (
    <section 
      id="habilidades"
      className={`${standalone ? 'pt-28' : ''} relative w-full mx-auto pb-16 bg-light-secondary dark:bg-dark-secondary`}
    >
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-light-text dark:text-dark-text">
            {t.nav.habilidades}
          </h2>
          <p className="text-light-text-light dark:text-dark-text-light max-w-2xl mx-auto text-lg">
            {t.skills.description}
          </p>
        </motion.div>

        <div className="space-y-16">
          {Object.entries(categories).map(([category, skills]) => (
            <CategorySection key={category} title={category} skills={skills} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 