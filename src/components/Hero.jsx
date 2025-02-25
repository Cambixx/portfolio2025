import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';
import { BackgroundPaths } from './ui/background-paths';

const Hero = ({ standalone = false }) => {
  return (
    <section 
      id="inicio" 
      className={`${standalone ? 'pt-20' : ''} relative w-full h-screen mx-auto flex flex-col items-center justify-center overflow-hidden pt-10 md:pt-16`}
    >
      {/* Componente BackgroundPaths */}
      <BackgroundPaths title="Carlos Rábago" />
      
      {/* Indicador de scroll */}
      <div className="absolute xs:bottom-10 bottom-6 w-full flex justify-center items-center z-10">
        <Link to="sobre-mi" smooth duration={500} className="cursor-pointer">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white/50 flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-3 h-3 rounded-full bg-white mb-1"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero; 