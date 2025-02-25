import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaUserGraduate, FaLaptopCode } from "react-icons/fa";
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

const About = ({ standalone = false }) => {
  const { theme } = useTheme();

  return (
    <section
      id="about"
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
            Sobre <span className="text-highlight">Mí</span>
          </h2>
          <p className="text-light-text-light dark:text-dark-text-light max-w-3xl mx-auto">
            Descubre más sobre mi trayectoria, pasión y experiencia en el desarrollo web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={fadeIn("right", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
              Mi Historia
            </h3>
            <p className="text-light-text-light dark:text-dark-text-light mb-6">
              Soy un desarrollador Full Stack apasionado con más de 5 años de experiencia creando aplicaciones web dinámicas y responsivas. Mi viaje comenzó con HTML, CSS y JavaScript, y desde entonces he estado constantemente aprendiendo y adaptándome a las nuevas tecnologías.
            </p>
            <p className="text-light-text-light dark:text-dark-text-light mb-6">
              Mi objetivo es crear experiencias web que no solo sean visualmente atractivas, sino también intuitivas y eficientes. Me encanta resolver problemas complejos y transformar ideas en productos digitales.
            </p>
            <p className="text-light-text-light dark:text-dark-text-light">
              Cuando no estoy codificando, disfruto explorar nuevas tecnologías, contribuir a proyectos de código abierto y compartir conocimientos con la comunidad de desarrolladores.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "tween", 0.3, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-xl bg-light-secondary dark:bg-dark-secondary shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <FaCode className="text-2xl text-highlight mr-4" />
                <h4 className="text-xl font-semibold text-light-text dark:text-dark-text">
                  Habilidades
                </h4>
              </div>
              <p className="text-light-text-light dark:text-dark-text-light">
                Especializado en React, Node.js, y bases de datos SQL/NoSQL. Experiencia con frameworks modernos y metodologías ágiles.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-light-secondary dark:bg-dark-secondary shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <FaUserGraduate className="text-2xl text-highlight mr-4" />
                <h4 className="text-xl font-semibold text-light-text dark:text-dark-text">
                  Educación
                </h4>
              </div>
              <p className="text-light-text-light dark:text-dark-text-light">
                Ingeniería en Sistemas Computacionales. Certificaciones en desarrollo web frontend y backend.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-light-secondary dark:bg-dark-secondary shadow-md hover:shadow-xl transition-all duration-300 sm:col-span-2">
              <div className="flex items-center mb-4">
                <FaLaptopCode className="text-2xl text-highlight mr-4" />
                <h4 className="text-xl font-semibold text-light-text dark:text-dark-text">
                  Experiencia
                </h4>
              </div>
              <p className="text-light-text-light dark:text-dark-text-light">
                He colaborado con startups y empresas establecidas, desarrollando soluciones digitales escalables y mantenibles que resuelven problemas reales de negocio.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 