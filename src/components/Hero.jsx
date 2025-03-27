import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import ShaderCanvas from './ui/ShaderCanvas';
import BlackholeShaderCanvas from './ui/BlackholeShaderCanvas';
import FluidShaderCanvas from './ui/FluidShaderCanvas';

// Cambia el tipo de shader: 'abstract', 'blackhole' o 'fluid'
const SHADER_TYPE = 'fluid'; 

const Hero = ({ standalone = false }) => {
  const { t } = useLanguage();

  // Función para renderizar el shader seleccionado
  const renderShader = () => {
    switch(SHADER_TYPE) {
      case 'abstract':
        return <ShaderCanvas />;
      case 'blackhole':
        return <BlackholeShaderCanvas />;
      case 'fluid':
        return <FluidShaderCanvas />;
      default:
        return <ShaderCanvas />;
    }
  };

  return (
    <section 
      id="inicio" 
      className={`${standalone ? 'pt-20' : ''} relative w-full h-screen mx-auto flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* Shader Canvas - Cambia SHADER_TYPE arriba para alternar entre shaders */}
      {renderShader()}
      
      {/* Texto superpuesto */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-5xl font-bold text-white mb-4">{t.hero.name}</h1>
      </div>
      
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