import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaTwitter, FaCodepen, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-light-tertiary dark:bg-dark-tertiary py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="inicio" smooth duration={500} className="cursor-pointer">
              <h2 className="font-bold text-[20px] cursor-pointer flex items-center text-light-text dark:text-dark-text mb-6">
                <span className="text-highlight mr-2">&lt;</span>
                <span className="text-gradient">Carlos Rábago</span>
                <span className="text-highlight ml-2">/&gt;</span>
              </h2>
            </Link>
            <p className="text-light-text-light dark:text-dark-text-light">
              Desarrollador frontend especializado en crear experiencias web
              modernas, interactivas y de alto rendimiento.
            </p>
          </div>
          
          <div>
            <h3 className="text-light-text dark:text-dark-text font-bold text-xl mb-6">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="inicio" smooth duration={500} className="text-light-text-light dark:text-dark-text-light hover:text-light-text dark:hover:text-dark-text transition-colors duration-300 cursor-pointer">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="sobre-mi" smooth duration={500} className="text-light-text-light dark:text-dark-text-light hover:text-light-text dark:hover:text-dark-text transition-colors duration-300 cursor-pointer">
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link to="proyectos" smooth duration={500} className="text-light-text-light dark:text-dark-text-light hover:text-light-text dark:hover:text-dark-text transition-colors duration-300 cursor-pointer">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link to="contacto" smooth duration={500} className="text-light-text-light dark:text-dark-text-light hover:text-light-text dark:hover:text-dark-text transition-colors duration-300 cursor-pointer">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-light-text dark:text-dark-text font-bold text-xl mb-6">Contáctame</h3>
            <p className="text-light-text-light dark:text-dark-text-light mb-4">
              ¿Tienes un proyecto en mente? ¡Hablemos!
            </p>
            <a
              href="mailto:carlosmiguel40@gmail.com"
              className="text-highlight hover:text-light-text dark:hover:text-dark-text transition-colors duration-300"
            >
              carlosmiguel40@gmail.com
            </a>
            
            <div className="mt-6">
              <div className="flex gap-4">
                <a
                  href="https://github.com/Cambixx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-text-light dark:text-dark-text-light hover:text-highlight transition-colors duration-300"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/tuusuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-text-light dark:text-dark-text-light hover:text-highlight transition-colors duration-300"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-light-text/10 dark:border-dark-text/10 pt-8 text-center">
          <p className="text-light-text-light dark:text-dark-text-light">
            &copy; {currentYear} Carlos Rábago. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 