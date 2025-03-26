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
    <div className="flex items-center space-x-2">
      <button
        onClick={() => toggleLanguage('es')}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          language === 'es'
            ? 'bg-highlight text-white'
            : 'text-light-text-light dark:text-dark-text-light hover:text-light-text dark:hover:text-dark-text'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => toggleLanguage('en')}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          language === 'en'
            ? 'bg-highlight text-white'
            : 'text-light-text-light dark:text-dark-text-light hover:text-light-text dark:hover:text-dark-text'
        }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-lg' 
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
            className="flex items-center cursor-pointer"
            onClick={closeMenu}
          >
            <span className="text-highlight text-2xl">&lt;</span>
            <span className="text-gradient font-bold text-2xl">
              Carlos Rábago
            </span>
            <span className="text-highlight text-2xl">/&gt;</span>
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
                activeClass="active"
                className="text-light-text-light dark:text-dark-text-light hover:text-light-text dark:hover:text-dark-text transition-colors duration-200 text-sm font-medium"
                onSetActive={() => setActive(link.id)}
              >
                {link.title}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors"
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
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Panel del menú */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-neutral-900 z-50 md:hidden shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* Encabezado del menú */}
                <div className="flex items-center justify-between p-4 border-b border-light-secondary dark:border-dark-secondary">
                  <span className="text-light-text dark:text-dark-text font-medium">
                    Menú
                  </span>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-md text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors"
                    aria-label="Cerrar menú"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Enlaces de navegación */}
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="flex flex-col space-y-1 px-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.id}
                        to={link.id}
                        smooth
                        duration={500}
                        spy={true}
                        activeClass="bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text"
                        className="px-4 py-3 text-light-text-light dark:text-dark-text-light hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-md transition-colors duration-200 text-sm font-medium"
                        onClick={closeMenu}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer del menú */}
                <div className="p-4 border-t border-light-secondary dark:border-dark-secondary flex items-center justify-between">
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