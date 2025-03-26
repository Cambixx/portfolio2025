import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

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

const TimelineElement = ({ item, t }) => {
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
      date={item.period}
      dateClassName={isDarkTheme ? "text-dark-text-light" : "text-light-text-light"}
      iconStyle={{ 
        background: isDarkTheme ? "#374151" : "#e5e7eb", 
        color: isDarkTheme ? "#f9fafb" : "#111827" 
      }}
      icon={item.type === 'education' ? <FaGraduationCap /> : <FaBriefcase />}
    >
      <div>
        <h3 className="text-xl font-bold" style={{ color: isDarkTheme ? "#f9fafb" : "#111827" }}>
          {item.title}
        </h3>
        <h4 className="text-base font-semibold" style={{ color: isDarkTheme ? "#d1d5db" : "#4b5563" }}>
          {item.company}
        </h4>
      </div>

      <ul className="mt-4 list-disc ml-5 space-y-2">
        {item.responsibilities.map((responsibility, index) => (
          <li
            key={`point-${index}`}
            className="text-sm"
            style={{ color: isDarkTheme ? "#d1d5db" : "#4b5563" }}
          >
            {responsibility}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = ({ standalone = false }) => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  const timelineItems = {
    es: [
      {
        type: 'education',
        title: 'Desarrollo de aplicaciones web',
        company: 'Edix',
        period: '2023',
        responsibilities: [
          'Formación especializada en desarrollo web frontend y backend',
          'Tecnologías modernas como React, Node.js, y bases de datos',
          'Proyectos prácticos y desarrollo de aplicaciones web completas'
        ]
      },
      {
        type: 'education',
        title: 'Ingeniería Industrial',
        company: 'Universidad Yacambú',
        period: '2009',
        responsibilities: [
          'Fundamentos de gestión y optimización de procesos',
          'Desarrollo de habilidades analíticas y de resolución de problemas',
          'Base sólida en matemáticas y pensamiento lógico'
        ]
      },
      {
        type: 'work',
        title: 'Desarrollador Web',
        company: 'DOERS DF',
        period: '2023 - Actualidad',
        responsibilities: [
          'Desarrollo de soluciones web adaptadas a procesos empresariales',
          'Desarrollo Front-end - React, JavaScript, HTML5 y CSS3',
          'Creación de interfaces interactivas con WordPress y tecnologías modernas',
          'Adaptación de proyectos según necesidades específicas del cliente',
          'Colaboración en la integración con bases de datos y back-end en PHP'
        ]
      },
      {
        type: 'work',
        title: 'Desarrollador Web',
        company: 'EDIX',
        period: '2021 - 2023',
        responsibilities: [
          'Desarrollo de aplicaciones web',
          'Diseño y optimización de interfaces de usuario'
        ]
      }
    ],
    en: [
      {
        type: 'education',
        title: 'Web Application Development',
        company: 'Edix',
        period: '2023',
        responsibilities: [
          'Specialized training in frontend and backend web development',
          'Modern technologies like React, Node.js, and databases',
          'Practical projects and complete web application development'
        ]
      },
      {
        type: 'education',
        title: 'Industrial Engineering',
        company: 'Yacambú University',
        period: '2009',
        responsibilities: [
          'Fundamentals of process management and optimization',
          'Development of analytical and problem-solving skills',
          'Solid foundation in mathematics and logical thinking'
        ]
      },
      {
        type: 'work',
        title: 'Web Developer',
        company: 'DOERS DF',
        period: '2023 - Present',
        responsibilities: [
          'Development of web solutions adapted to business processes',
          'Front-end development - React, JavaScript, HTML5, and CSS3',
          'Creation of interactive interfaces with WordPress and modern technologies',
          'Project adaptation according to specific client needs',
          'Collaboration in database and PHP back-end integration'
        ]
      },
      {
        type: 'work',
        title: 'Web Developer',
        company: 'EDIX',
        period: '2021 - 2023',
        responsibilities: [
          'Web application development',
          'User interface design and optimization'
        ]
      }
    ]
  };

  return (
    <section
      id="experiencia"
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
            {t.experience.title}
          </h2>
          <p className="text-light-text-light dark:text-dark-text-light max-w-2xl mx-auto text-lg">
            {t.experience.description}
          </p>
        </motion.div>

        <div className="mt-10">
          <VerticalTimeline lineColor={theme === "dark" ? "#374151" : "#e5e7eb"}>
            {timelineItems[language].map((item, index) => (
              <TimelineElement
                key={index}
                item={item}
                t={t}
              />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default Experience; 