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
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section
      id="sobre-mi"
      className={`${standalone ? 'pt-28' : ''} relative w-full mx-auto pb-16 overflow-hidden bg-white dark:bg-[#111827]`}
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
            {t.nav.sobreMi}
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-stretch">
            <motion.div
              variants={fadeIn("right", "spring", 0.3, 0.75)}
              className="md:w-72 shrink-0 mx-auto md:mx-0"
            >
              <div className={`about-card ${theme === "light" ? "light" : "dark"} p-4 sm:p-6 max-w-sm rounded-xl backdrop-blur-sm border border-gray-200/20 bg-white/30 dark:bg-[#1f2937]/50 shadow-lg`}>
                <img
                  src="/images/foto-perfil.png"
                  alt="Carlos Rábago"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn("left", "spring", 0.5, 0.75)}
              className="flex-1"
            >
              <div className={`about-card ${theme === "light" ? "light" : "dark"} h-full p-8 rounded-xl backdrop-blur-sm border border-gray-200/20 bg-white/30 dark:bg-[#1f2937]/50 shadow-lg`}>
                <h3 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text md:text-left text-center tracking-tight">
                  {t.about.role}
                </h3>
                <div className="space-y-6">
                  <p className="text-lg text-light-text-light dark:text-dark-text-light leading-relaxed">
                    {t.about.description}
                  </p>
                  <p className="text-lg text-light-text-light dark:text-dark-text-light leading-relaxed">
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