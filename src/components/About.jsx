import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <section
      id="sobre-mi"
      className={`${standalone ? 'pt-28' : ''} relative w-full mx-auto pb-10 bg-light-primary dark:bg-dark-primary`}
    >
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-light-text dark:text-dark-text">
            {t.about.title}
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <motion.div
              variants={fadeIn("right", "tween", 0.2, 1)}
              className="md:w-64 shrink-0"
            >
              <div className={`h-full rounded-2xl overflow-hidden shadow-lg ${
                theme === "light" ? "bg-light-secondary" : "bg-dark-secondary"
              }`}>
                <img
                  src="/images/foto-perfil.png"
                  alt="Carlos Rábago"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("left", "tween", 0.3, 1)}
              className="flex-1"
            >
              <div className={`h-full p-6 rounded-2xl ${
                theme === "light" ? "bg-light-secondary" : "bg-dark-secondary"
              } shadow-md`}>
                <h3 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text md:text-left text-center">
                  {t.about.role}
                </h3>
                <div className="space-y-4">
                  <p className="text-light-text-light dark:text-dark-text-light">
                    {t.about.description}
                  </p>
                  <p className="text-light-text-light dark:text-dark-text-light">
                    {t.about.objectives}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 