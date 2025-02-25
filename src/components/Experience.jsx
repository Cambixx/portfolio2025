import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

const experiences = [
  {
    title: "Desarrollador Frontend Senior",
    company: "TechInnovations",
    date: "2022 - Presente",
    description: "Desarrollo de aplicaciones web complejas utilizando React, NextJS y TypeScript. Implementación de arquitecturas escalables y optimización de rendimiento. Liderazgo técnico de un equipo de 4 desarrolladores.",
    technologies: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS"]
  },
  {
    title: "Desarrollador Frontend",
    company: "WebSolutions Inc.",
    date: "2020 - 2022",
    description: "Desarrollo de componentes reutilizables y páginas con Vue.js. Integración con APIs RESTful. Implementación de diseños responsive y animaciones interactivas.",
    technologies: ["Vue.js", "JavaScript", "SASS", "Vuex", "Jest"]
  },
  {
    title: "Desarrollador Web Junior",
    company: "CreativeDigital",
    date: "2018 - 2020",
    description: "Desarrollo de sitios web responsivos. Maquetación HTML/CSS a partir de diseños en Figma. Implementación de funcionalidades interactivas con JavaScript.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"]
  },
];

const ExperienceCard = ({ experience, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeIn}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="card hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-highlight rounded-full p-3">
          <BriefcaseIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white text-xl font-semibold">{experience.title}</h3>
          <p className="text-secondary">{experience.company}</p>
          <p className="text-highlight text-sm my-2">{experience.date}</p>
          <p className="text-secondary mb-4">{experience.description}</p>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, idx) => (
              <span 
                key={idx} 
                className="bg-tertiary border border-highlight text-sm text-white px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experiencia" className="py-20 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Mi <span className="text-gradient">Experiencia</span>
          </h2>
          <p className="text-secondary text-lg mt-4 max-w-2xl mx-auto">
            Mi trayectoria profesional como desarrollador frontend, donde he participado
            en proyectos desafiantes y he adquirido diversas habilidades.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 