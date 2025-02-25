import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./Lamp";
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useTheme } from "../../context/ThemeContext";

export function HeroLamp() {
  const { theme } = useTheme();
  const highlightColor = "#6b7280"; // Color highlight de tu tema

  return (
    <LampContainer className="h-auto min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)]">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center justify-center text-center"
      >
        <motion.p
          className="text-white/80 text-lg md:text-xl mb-2 md:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Hola, soy
        </motion.p>
        
        <motion.h1
          className="mt-2 bg-gradient-to-br from-white to-gray-300 py-2 md:py-4 bg-clip-text text-center text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-transparent mb-2 md:mb-4"
        >
          Carlos Rábago
        </motion.h1>
        
        <motion.h3
          className="text-white/80 text-xl md:text-2xl mb-4 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Desarrollador Frontend
        </motion.h3>
        
        <motion.p
          className="text-white/70 text-base md:text-lg max-w-[600px] mb-6 md:mb-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Especializado en crear experiencias web interactivas y responsivas 
          con las últimas tecnologías del mercado. Apasionado por el diseño UI/UX
          y el desarrollo frontend de alto rendimiento.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <Link to="proyectos" smooth duration={500}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-gray-600 hover:bg-gray-700 text-white px-5 md:px-6 py-2 md:py-3 rounded-md font-medium transition-colors w-40 sm:w-auto"
            >
              Ver Proyectos
            </motion.button>
          </Link>
          <Link to="contacto" smooth duration={500}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-transparent border-2 border-white/30 hover:bg-white/10 transition-colors duration-300 text-white px-5 md:px-6 py-2 md:py-3 rounded-md font-medium w-40 sm:w-auto"
            >
              Contactar
            </motion.button>
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="flex justify-center gap-6 mt-6 md:mt-8"
        >
          <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-gray-400 transition-colors">
            <FaGithub size={22} />
          </a>
          <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-gray-400 transition-colors">
            <FaLinkedin size={22} />
          </a>
          <a href="https://twitter.com/tuusuario" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-gray-400 transition-colors">
            <FaTwitter size={22} />
          </a>
        </motion.div>
      </motion.div>
    </LampContainer>
  );
} 