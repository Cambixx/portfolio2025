import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaVuejs, 
  FaAngular,
  FaSass, 
  FaGitAlt, 
  FaFigma, 
  FaNpm,
  FaDocker
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiRedux,
  SiJest,
  SiGraphql,
  SiWebpack,
  SiFirebase
} from 'react-icons/si';

const skills = [
  {
    title: "HTML5",
    icon: <FaHtml5 className="skill-icon text-orange-500" />,
    level: 95
  },
  {
    title: "CSS3",
    icon: <FaCss3Alt className="skill-icon text-blue-500" />,
    level: 90
  },
  {
    title: "JavaScript",
    icon: <FaJs className="skill-icon text-yellow-400" />,
    level: 92
  },
  {
    title: "TypeScript",
    icon: <SiTypescript className="skill-icon text-blue-600" />,
    level: 88
  },
  {
    title: "React",
    icon: <FaReact className="skill-icon text-cyan-400" />,
    level: 94
  },
  {
    title: "Next.js",
    icon: <SiNextdotjs className="skill-icon text-white" />,
    level: 85
  },
  {
    title: "Vue.js",
    icon: <FaVuejs className="skill-icon text-green-500" />,
    level: 80
  },
  {
    title: "Angular",
    icon: <FaAngular className="skill-icon text-red-500" />,
    level: 75
  },
  {
    title: "Tailwind CSS",
    icon: <SiTailwindcss className="skill-icon text-cyan-400" />,
    level: 90
  },
  {
    title: "SASS",
    icon: <FaSass className="skill-icon text-pink-500" />,
    level: 85
  },
  {
    title: "Redux",
    icon: <SiRedux className="skill-icon text-purple-500" />,
    level: 82
  },
  {
    title: "Jest",
    icon: <SiJest className="skill-icon text-red-600" />,
    level: 78
  },
  {
    title: "GraphQL",
    icon: <SiGraphql className="skill-icon text-pink-600" />,
    level: 75
  },
  {
    title: "Git",
    icon: <FaGitAlt className="skill-icon text-orange-600" />,
    level: 88
  },
  {
    title: "Figma",
    icon: <FaFigma className="skill-icon text-purple-400" />,
    level: 80
  },
  {
    title: "Webpack",
    icon: <SiWebpack className="skill-icon text-blue-400" />,
    level: 75
  },
  {
    title: "npm",
    icon: <FaNpm className="skill-icon text-red-500" />,
    level: 85
  },
  {
    title: "Firebase",
    icon: <SiFirebase className="skill-icon text-yellow-500" />,
    level: 80
  },
  {
    title: "Docker",
    icon: <FaDocker className="skill-icon text-blue-500" />,
    level: 70
  }
];

const SkillCard = ({ skill, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-tertiary/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center hover:bg-tertiary transition-colors duration-300"
    >
      {skill.icon}
      <h3 className="text-white mt-3 mb-2">{skill.title}</h3>
      <div className="w-full bg-black-200 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
          className="bg-gradient-to-r from-highlight to-purple-600 h-2.5 rounded-full"
        />
      </div>
      <span className="text-sm text-secondary mt-2">{skill.level}%</span>
    </motion.div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="habilidades" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Mis <span className="text-gradient">Habilidades</span>
          </h2>
          <p className="text-secondary text-lg mt-4 max-w-2xl mx-auto">
            Tecnologías y herramientas con las que trabajo diariamente para
            desarrollar proyectos web modernos e innovadores.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 