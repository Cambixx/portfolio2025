import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../lib/emailjs';
import { useLanguage } from "../context/LanguageContext";

// Creamos un efecto de fade-in para las animaciones
const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

const Contact = ({ standalone = false }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });
  const [formError, setFormError] = useState({});
  // Estado para controlar cuando el formulario está siendo enviado
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "El nombre es requerido";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "El email es requerido";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "El email no es válido";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "El asunto es requerido";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "El mensaje es requerido";
      isValid = false;
    }

    setFormError(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Enviar formulario usando EmailJS
        const result = await emailjs.sendForm(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          formRef.current,
          emailjsConfig.publicKey
        );
        
        console.log('Resultado:', result.text);
        
        // Formulario enviado exitosamente
        setFormStatus({
          submitted: true,
          success: true,
          message: "¡Mensaje enviado con éxito! Te contactaré pronto.",
        });
        
        // Resetear el formulario
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } catch (error) {
        console.error("Error al enviar formulario:", error);
        setFormStatus({
          submitted: true,
          success: false,
          message: "Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.",
        });
      } finally {
        setIsSubmitting(false);
        
        // Después de 5 segundos, resetear el estado del formulario
        setTimeout(() => {
          setFormStatus({
            submitted: false,
            success: false,
            message: "",
          });
        }, 5000);
      }
    }
  };

  return (
    <section
      id="contacto"
      className={`${standalone ? 'pt-28' : ''} relative w-full mx-auto pb-16 overflow-hidden bg-gray-50/80 dark:bg-[#1e293b]/90`}
    >
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-light-text dark:text-dark-text tracking-tight">
            {t.nav.contacto}
          </h2>
          <p className="text-light-text-light dark:text-dark-text-light max-w-2xl mx-auto text-lg">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={fadeIn("right", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`about-card ${theme === "light" ? "light" : "dark"} p-8 rounded-xl backdrop-blur-sm border border-gray-200/20 bg-white/30 dark:bg-[#1f2937]/50 shadow-lg`}
          >
            <h3 className="text-2xl font-bold mb-8 text-light-text dark:text-dark-text">
              Información de Contacto
            </h3>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className={`rounded-full p-3 mr-4 backdrop-blur-sm ${
                  theme === "light"
                    ? "bg-white/50 text-gray-800"
                    : "bg-[#1f2937]/70 text-gray-100"
                }`}>
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-light-text dark:text-dark-text">
                    Email
                  </h4>
                  <a
                    href="mailto:carlosmiguel40@gmail.com"
                    className="text-light-text-light dark:text-dark-text-light hover:text-highlight transition-colors duration-300"
                  >
                    carlosmiguel40@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className={`rounded-full p-3 mr-4 backdrop-blur-sm ${
                  theme === "light"
                    ? "bg-white/50 text-gray-800"
                    : "bg-[#1f2937]/70 text-gray-100"
                }`}>
                  <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-light-text dark:text-dark-text">
                    Teléfono
                  </h4>
                  <a
                    href="tel:+34603728243"
                    className="text-light-text-light dark:text-dark-text-light hover:text-highlight transition-colors duration-300"
                  >
                    +34 603 72 82 43
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className={`rounded-full p-3 mr-4 backdrop-blur-sm ${
                  theme === "light"
                    ? "bg-white/50 text-gray-800"
                    : "bg-[#1f2937]/70 text-gray-100"
                }`}>
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-light-text dark:text-dark-text">
                    Ubicación
                  </h4>
                  <p className="text-light-text-light dark:text-dark-text-light">
                    Madrid 28018, España
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">
                Sígueme en:
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/in/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full p-3 backdrop-blur-sm transition-all duration-300 ${
                    theme === "light"
                      ? "bg-white/50 text-gray-800 hover:bg-highlight hover:text-white"
                      : "bg-[#1f2937]/70 text-gray-100 hover:bg-highlight hover:text-white"
                  }`}
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="https://github.com/Cambixx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full p-3 backdrop-blur-sm transition-all duration-300 ${
                    theme === "light"
                      ? "bg-white/50 text-gray-800 hover:bg-highlight hover:text-white"
                      : "bg-[#1f2937]/70 text-gray-100 hover:bg-highlight hover:text-white"
                  }`}
                >
                  <FaGithub className="text-xl" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "tween", 0.3, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`about-card ${theme === "light" ? "light" : "dark"} p-8 rounded-xl backdrop-blur-sm border border-gray-200/20 bg-white/30 dark:bg-[#1f2937]/50 shadow-lg`}
          >
            <h3 className="text-2xl font-bold mb-8 text-light-text dark:text-dark-text">
              Envíame un Mensaje
            </h3>
            
            {/* Formulario con EmailJS */}
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              {formStatus.submitted && (
                <div
                  className={`p-4 rounded-md ${
                    formStatus.success
                      ? "bg-green-100/50 dark:bg-green-900/50 text-green-700 dark:text-green-300 backdrop-blur-sm"
                      : "bg-red-100/50 dark:bg-red-900/50 text-red-700 dark:text-red-300 backdrop-blur-sm"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-light-text dark:text-dark-text"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg backdrop-blur-sm ${
                    theme === "light"
                      ? "bg-white/50 text-gray-800 border border-gray-200/50 focus:border-gray-300/50"
                      : "bg-[#1f2937]/70 text-gray-100 border border-gray-600/50 focus:border-gray-500/50"
                  } focus:outline-none transition-colors duration-300`}
                  placeholder="Tu nombre"
                />
                {formError.name && (
                  <p className="mt-1 text-red-500 dark:text-red-400 text-sm">
                    {formError.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-light-text dark:text-dark-text"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg backdrop-blur-sm ${
                    theme === "light"
                      ? "bg-white/50 text-gray-800 border border-gray-200/50 focus:border-gray-300/50"
                      : "bg-[#1f2937]/70 text-gray-100 border border-gray-600/50 focus:border-gray-500/50"
                  } focus:outline-none transition-colors duration-300`}
                  placeholder="Tu email"
                />
                {formError.email && (
                  <p className="mt-1 text-red-500 dark:text-red-400 text-sm">
                    {formError.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-light-text dark:text-dark-text"
                >
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg backdrop-blur-sm ${
                    theme === "light"
                      ? "bg-white/50 text-gray-800 border border-gray-200/50 focus:border-gray-300/50"
                      : "bg-[#1f2937]/70 text-gray-100 border border-gray-600/50 focus:border-gray-500/50"
                  } focus:outline-none transition-colors duration-300`}
                  placeholder="Asunto del mensaje"
                />
                {formError.subject && (
                  <p className="mt-1 text-red-500 dark:text-red-400 text-sm">
                    {formError.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-light-text dark:text-dark-text"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full p-3 rounded-lg backdrop-blur-sm ${
                    theme === "light"
                      ? "bg-white/50 text-gray-800 border border-gray-200/50 focus:border-gray-300/50"
                      : "bg-[#1f2937]/70 text-gray-100 border border-gray-600/50 focus:border-gray-500/50"
                  } focus:outline-none transition-colors duration-300`}
                  placeholder="Tu mensaje"
                ></textarea>
                {formError.message && (
                  <p className="mt-1 text-red-500 dark:text-red-400 text-sm">
                    {formError.message}
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 ${
                  theme === "light"
                    ? "bg-black/90 text-white hover:bg-black"
                    : "bg-white/90 text-black hover:bg-white"
                } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 