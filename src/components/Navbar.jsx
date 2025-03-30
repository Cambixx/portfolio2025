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
            : 'text-white dark:text-neutral-300 hover:text-white dark:hover:text-white'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => toggleLanguage('en')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-light-text dark:bg-dark-text text-white dark:text-neutral-900'
            : 'text-white dark:text-neutral-300 hover:text-white dark:hover:text-white'
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
            spy={true}
            smooth={true} 
            offset={-70}
            duration={500} 
            className="flex items-center cursor-pointer group"
            onClick={closeMenu}
          >
            <span className="text-neutral-100 dark:text-neutral-300 text-2xl transition-colors duration-300 group-hover:text-white dark:group-hover:text-white">&lt;</span>
            <span className="font-bold text-2xl text-white dark:text-white mx-1">
              Carlos Rábago
            </span>
            <span className="text-neutral-100 dark:text-neutral-300 text-2xl transition-colors duration-300 group-hover:text-white dark:group-hover:text-white">/&gt;</span>
          </Link>

          {/* Enlaces de navegación - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.id}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                activeClass="text-white dark:text-white"
                className="cursor-pointer text-neutral-200 dark:text-neutral-300 hover:text-white dark:hover:text-white transition-all duration-300 text-sm font-medium"
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
            className="md:hidden p-2 rounded-lg text-neutral-200 dark:text-neutral-300 hover:text-white dark:hover:text-white hover:bg-light-text/5 dark:hover:bg-dark-text/5 transition-all duration-300 cursor-pointer"
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
              className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-neutral-900 z-50 md:hidden shadow-2xl"
            >
              {/* Encabezado del menú */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-900 dark:text-white font-medium text-lg">
                  Menú
                </span>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  aria-label="Cerrar menú"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Enlaces de navegación */}
              <div className="flex-1 overflow-y-auto py-4 bg-white dark:bg-neutral-900">
                <div className="flex flex-col space-y-1 px-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.id}
                      to={link.id}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      onClick={closeMenu}
                      activeClass="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      className="cursor-pointer px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-all duration-300 text-base font-medium"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer del menú */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800">
                <div className="flex items-center justify-between">
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