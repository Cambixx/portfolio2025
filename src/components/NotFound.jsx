import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex flex-col items-center justify-center min-h-screen px-4 text-center ${
        theme === "light" 
          ? "bg-light-primary text-light-text" 
          : "bg-dark-primary text-dark-text"
      }`}
    >
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <h2 className="text-4xl font-semibold mb-6">Página no encontrada</h2>
      <p className={`text-xl mb-8 max-w-lg ${
        theme === "light" ? "text-light-text-light" : "text-dark-text-light"
      }`}>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 ${
            theme === "light"
              ? "bg-light-tertiary hover:bg-highlight text-light-text"
              : "bg-dark-tertiary hover:bg-highlight text-dark-text"
          }`}
        >
          <FaHome /> Inicio
        </Link>
        <button
          onClick={() => window.history.back()}
          className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 ${
            theme === "light"
              ? "bg-light-secondary hover:bg-highlight text-light-text"
              : "bg-dark-secondary hover:bg-highlight text-dark-text"
          }`}
        >
          <FaArrowLeft /> Volver
        </button>
      </div>
    </motion.div>
  );
};

export default NotFound; 