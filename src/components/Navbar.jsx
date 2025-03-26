import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { id: 'sobre-mi', title: t.nav.sobreMi },
    { id: 'experiencia', title: t.nav.experiencia },
    { id: 'habilidades', title: t.nav.habilidades },
    { id: 'proyectos', title: t.nav.proyectos },
    { id: 'contacto', title: t.nav.contacto },
  ];

  // Manejar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const LanguageToggle = () => (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => toggleLanguage('es')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
          language === 'es'
            ? 'bg-light-text dark:bg-dark-text text-white dark:text-neutral-900'
            : 'text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => toggleLanguage('en')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-light-text dark:bg-dark-text text-white dark:text-neutral-900'
            : 'text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text'
        }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="inicio" 
            smooth 
            duration={500} 
            className="flex items-center cursor-pointer group"
            onClick={closeMenu}
          >
            <span className="text-light-text/80 dark:text-dark-text/80 text-2xl transition-colors duration-300 group-hover:text-light-text dark:group-hover:text-dark-text">&lt;</span>
            <span className="font-bold text-2xl bg-gradient-to-r from-light-text/90 to-light-text dark:from-dark-text/90 dark:to-dark-text bg-clip-text text-transparent">
              Carlos Rábago
            </span>
            <span className="text-light-text/80 dark:text-dark-text/80 text-2xl transition-colors duration-300 group-hover:text-light-text dark:group-hover:text-dark-text">/&gt;</span>
          </Link>

          {/* Enlaces de navegación - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.id}
                smooth
                duration={500}
                spy={true}
                activeClass="text-light-text dark:text-dark-text"
                className="cursor-pointer text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text transition-all duration-300 text-sm font-medium"
                onSetActive={() => setActive(link.id)}
              >
                {link.title}
              </Link>
            ))}
            <div className="flex items-center space-x-6 pl-6 border-l border-light-text/10 dark:border-dark-text/10">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text hover:bg-light-text/5 dark:hover:bg-dark-text/5 transition-all duration-300 cursor-pointer"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Panel del menú */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Encabezado del menú */}
                <div className="flex items-center justify-between p-4">
                  <span className="text-light-text dark:text-dark-text font-medium text-lg">
                    Menú
                  </span>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-lg text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text hover:bg-light-text/5 dark:hover:bg-dark-text/5 transition-all duration-300"
                    aria-label="Cerrar menú"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Enlaces de navegación */}
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="flex flex-col space-y-1 px-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.id}
                        to={link.id}
                        smooth
                        duration={500}
                        spy={true}
                        activeClass="bg-light-text/10 dark:bg-dark-text/10 text-light-text dark:text-dark-text"
                        className="cursor-pointer px-4 py-3 rounded-xl text-light-text/70 dark:text-dark-text/70 hover:bg-light-text/5 dark:hover:bg-dark-text/5 hover:text-light-text dark:hover:text-dark-text transition-all duration-300 text-base font-medium"
                        onClick={closeMenu}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer del menú */}
                <div className="p-4 border-t border-light-text/5 dark:border-dark-text/5 flex items-center justify-between bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 