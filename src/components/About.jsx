import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="sobre-mi" className="relative py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* Imagen perfil */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-highlight to-purple-600 opacity-70 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-primary overflow-hidden">
                {/* Reemplaza con tu imagen de perfil */}
                <div className="w-full h-full bg-tertiary flex items-center justify-center text-7xl font-bold text-highlight">
                  CR
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              <span className="text-gradient">Sobre Mí</span>
            </h2>
            
            <p className="text-secondary text-lg leading-relaxed mb-6">
              Soy un desarrollador frontend con 5 años de experiencia en la creación de interfaces
              de usuario atractivas y funcionales. Mi pasión es transformar ideas en experiencias
              digitales que sean intuitivas, accesibles y visualmente impactantes.
            </p>
            
            <p className="text-secondary text-lg leading-relaxed mb-8">
              Me especializo en frameworks modernos como React, Vue.js y Next.js, 
              con un enfoque en rendimiento, accesibilidad y diseño responsive.
              Siempre estoy aprendiendo nuevas tecnologías y mejorando mis habilidades
              para crear experiencias web excepcionales.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-white font-semibold">Nombre:</span>
                <span className="text-secondary">Carlos Rábago</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold">Email:</span>
                <span className="text-secondary">carlos@ejemplo.com</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold">Ubicación:</span>
                <span className="text-secondary">Ciudad de México</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold">Disponibilidad:</span>
                <span className="text-secondary">Freelance / Tiempo completo</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary mt-8"
              onClick={() => window.open('/cv.pdf', '_blank')}
            >
              Descargar CV
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 