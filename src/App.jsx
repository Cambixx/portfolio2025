import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// Componente para la página de inicio con todas las secciones
const Home = () => {
  return (
    <>
      <div className="bg-hero-pattern-light dark:bg-hero-pattern-dark bg-cover bg-no-repeat bg-center">
        <Hero />
      </div>
      
      <div className="relative z-0">
        <About />
        <Experience />
        <Skills />
        <Projects />
        
        <div className="relative z-0">
          <Contact />
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative z-0">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About standalone={true} />} />
            <Route path="/experience" element={<Experience standalone={true} />} />
            <Route path="/skills" element={<Skills standalone={true} />} />
            <Route path="/projects" element={<Projects standalone={true} />} />
            <Route path="/contact" element={<Contact standalone={true} />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
          
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
