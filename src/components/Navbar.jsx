import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { id: 'inicio', title: 'Inicio' },
  { id: 'sobre-mi', title: 'Sobre Mí' },
  { id: 'experiencia', title: 'Experiencia' },
  { id: 'habilidades', title: 'Habilidades' },
  { id: 'proyectos', title: 'Proyectos' },
  { id: 'contacto', title: 'Contacto' },
];

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? 'bg-primary bg-opacity-90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="inicio" smooth duration={500} className="cursor-pointer">
          <h1 className="font-bold text-[24px] cursor-pointer flex items-center text-white">
            <span className="text-highlight mr-2">&lt;</span>
            <span className="text-gradient font-extrabold text-[28px]">
              Carlos Rábago
            </span>
            <span className="text-highlight ml-2">/&gt;</span>
          </h1>
        </Link>

        <div className="hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.id}
              smooth
              duration={500}
              spy={true}
              activeClass="active"
              className="nav-item"
              onSetActive={() => setActive(link.id)}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div
            className="w-[28px] h-[28px] cursor-pointer"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <XMarkIcon className="w-[28px] h-[28px] text-white" />
            ) : (
              <Bars3Icon className="w-[28px] h-[28px] text-white" />
            )}
          </div>

          <motion.div
            className={`${!toggle ? 'hidden' : 'flex'} nav-menu ${toggle ? 'open' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: toggle ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="list-none flex flex-col justify-end items-start gap-4 mt-10">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.id ? 'text-white' : 'text-secondary'
                  } font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.id);
                  }}
                >
                  <Link
                    to={link.id}
                    smooth
                    duration={500}
                    spy={true}
                    activeClass="active"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 