import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// Lazy load de los componentes pesados
const ShaderCanvas = lazy(() => import('./ui/ShaderCanvas'));
const BlackholeShaderCanvas = lazy(() => import('./ui/BlackholeShaderCanvas'));
const FluidShaderCanvas = lazy(() => import('./ui/FluidShaderCanvas'));
const MusicShaderCanvas = lazy(() => import('./ui/MusicShaderCanvas'));
const ParticleTextEffect = lazy(() => import('./ui/ParticleTextEffect'));

// Cambia el tipo de shader: 'abstract', 'blackhole', 'fluid', 'music' o 'none'
const SHADER_TYPE = 'fluid';

const Hero = ({ standalone = false }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [canUseShader, setCanUseShader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detectar capacidades del dispositivo
    const checkDeviceCapabilities = () => {
      // Si SHADER_TYPE es 'none', no necesitamos verificar capacidades
      if (SHADER_TYPE === 'none') {
        setCanUseShader(false);
        setIsLoading(false);
        return;
      }

      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setCanUseShader(false);
        setIsLoading(false);
        return;
      }

      // Verificar si es un dispositivo móvil de gama baja
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      
      if (isMobile && isLowEnd) {
        setCanUseShader(false);
      }
      setIsLoading(false);
    };

    checkDeviceCapabilities();
  }, []);

  // Función para renderizar el shader seleccionado
  const renderShader = () => {
    if (!canUseShader || SHADER_TYPE === 'none') {
      return null;
    }

    return (
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />}>
        {(() => {
          switch(SHADER_TYPE) {
            case 'abstract':
              return <ShaderCanvas />;
            case 'blackhole':
              return <BlackholeShaderCanvas />;
            case 'fluid':
              return <FluidShaderCanvas />;
            case 'music':
              return <MusicShaderCanvas />;
            default:
              return null;
          }
        })()}
      </Suspense>
    );
  };

  // Función para renderizar el fondo cuando no hay shader
  const renderBackground = () => {
    if (canUseShader && SHADER_TYPE !== 'none') return null;

    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />
      </div>
    );
  }

  return (
    <section 
      id="inicio" 
      className={`${standalone ? 'pt-20' : ''} relative w-full h-screen mx-auto flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* Fondo: Shader o Gradiente */}
      {renderBackground()}
      {renderShader()}
      
      {/* Texto formado por partículas */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Suspense fallback={<h1 className="text-4xl font-bold">{t.hero.name}</h1>}>
          <ParticleTextEffect text={t.hero.name} isDarkMode={theme === 'dark'} />
        </Suspense>
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