import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Hero = () => {
  return (
    <section 
      id="inicio" 
      className="relative w-full h-screen mx-auto flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute top-[120px] left-0 right-0 bottom-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-30 z-[-1]" />
      
      {/* Elementos de gradiente para efectos visuales */}
      <div className="absolute top-20 left-20 w-48 h-48 gradient-01 z-0" />
      <div className="absolute bottom-40 right-20 w-72 h-72 gradient-02 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-secondary text-xl sm:text-2xl mb-4">Hola, soy</h2>
          <h1 className="text-white text-4xl sm:text-6xl font-bold mb-6">
            <span className="text-gradient">Carlos Rábago</span>
          </h1>
          <h3 className="text-secondary text-2xl sm:text-3xl mb-8">
            Desarrollador Frontend
          </h3>
          
          <p className="text-secondary text-base sm:text-lg max-w-[800px] mb-12">
            Especializado en crear experiencias web interactivas y responsivas 
            con las últimas tecnologías del mercado. Apasionado por el diseño UI/UX
            y el desarrollo frontend de alto rendimiento.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="proyectos" smooth duration={500}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
              >
                Ver Proyectos
              </motion.button>
            </Link>
            <Link to="contacto" smooth duration={500}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-transparent border-2 border-highlight hover:bg-highlight/20 transition-colors duration-300"
              >
                Contactar
              </motion.button>
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex justify-center gap-6 mt-8"
          >
            <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer" className="text-white hover:text-highlight transition-colors">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer" className="text-white hover:text-highlight transition-colors">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com/tuusuario" target="_blank" rel="noopener noreferrer" className="text-white hover:text-highlight transition-colors">
              <FaTwitter size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <Link to="sobre-mi" smooth duration={500} className="cursor-pointer">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero; 