import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

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
  const { theme } = useTheme();
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
        // Asegurarnos de obtener los datos del formulario correctamente
        const formElement = e.target;
        const formData = new FormData(formElement);
        
        // Agregar explícitamente el nombre del formulario - esto es crítico para Netlify
        formData.append("form-name", "contact");
        
        // Convertir FormData a string con URLSearchParams
        const searchParams = new URLSearchParams(formData);
        
        console.log("Enviando formulario a Netlify:", Object.fromEntries(searchParams));
        
        const response = await fetch("/", {
          method: "POST",
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded" 
          },
          body: searchParams.toString(),
        });
        
        if (!response.ok) {
          console.error("Respuesta no ok:", response.status, response.statusText);
          throw new Error(`Error al enviar el formulario: ${response.status}`);
        }
        
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
      id="contact"
      className={`${standalone ? 'pt-28' : ''} relative w-full mx-auto pb-10 bg-light-secondary dark:bg-dark-secondary`}
    >
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
            <span className="text-highlight">Contáctame</span>
          </h2>
          <p className="text-light-text-light dark:text-dark-text-light max-w-3xl mx-auto">
            ¿Tienes algún proyecto en mente? Estoy disponible para trabajar en proyectos freelance o de tiempo completo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={fadeIn("right", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
              Información de Contacto
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className={`rounded-full p-3 mr-4 ${
                  theme === "light"
                    ? "bg-light-tertiary text-highlight"
                    : "bg-dark-tertiary text-highlight"
                }`}>
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-light-text dark:text-dark-text">
                    Email
                  </h4>
                  <a
                    href="mailto:ejemplo@email.com"
                    className="text-light-text-light dark:text-dark-text-light hover:text-highlight transition-colors duration-300"
                  >
                    ejemplo@email.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className={`rounded-full p-3 mr-4 ${
                  theme === "light"
                    ? "bg-light-tertiary text-highlight"
                    : "bg-dark-tertiary text-highlight"
                }`}>
                  <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-light-text dark:text-dark-text">
                    Teléfono
                  </h4>
                  <a
                    href="tel:+1234567890"
                    className="text-light-text-light dark:text-dark-text-light hover:text-highlight transition-colors duration-300"
                  >
                    +123 456 7890
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className={`rounded-full p-3 mr-4 ${
                  theme === "light"
                    ? "bg-light-tertiary text-highlight"
                    : "bg-dark-tertiary text-highlight"
                }`}>
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-light-text dark:text-dark-text">
                    Ubicación
                  </h4>
                  <p className="text-light-text-light dark:text-dark-text-light">
                    Ciudad de México, México
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
                  className={`rounded-full p-3 ${
                    theme === "light"
                      ? "bg-light-tertiary text-highlight hover:bg-highlight hover:text-white"
                      : "bg-dark-tertiary text-highlight hover:bg-highlight hover:text-white"
                  } transition-all duration-300`}
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="https://github.com/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full p-3 ${
                    theme === "light"
                      ? "bg-light-tertiary text-highlight hover:bg-highlight hover:text-white"
                      : "bg-dark-tertiary text-highlight hover:bg-highlight hover:text-white"
                  } transition-all duration-300`}
                >
                  <FaGithub className="text-xl" />
                </a>
                <a
                  href="https://twitter.com/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full p-3 ${
                    theme === "light"
                      ? "bg-light-tertiary text-highlight hover:bg-highlight hover:text-white"
                      : "bg-dark-tertiary text-highlight hover:bg-highlight hover:text-white"
                  } transition-all duration-300`}
                >
                  <FaTwitter className="text-xl" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "tween", 0.3, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
              Envíame un Mensaje
            </h3>
            
            {/* Formulario con atributos para Netlify Forms */}
            <form 
              name="contact"
              method="POST"
              data-netlify="true" 
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="space-y-4"
            >
              {/* Campo oculto necesario para Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              
              {/* Campo honeypot para evitar spam */}
              <div className="hidden">
                <label>
                  No llenes esto si eres humano: <input name="bot-field" />
                </label>
              </div>
              
              {formStatus.submitted && (
                <div
                  className={`p-4 rounded-md ${
                    formStatus.success
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
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
                  className={`w-full p-3 rounded-md ${
                    theme === "light"
                      ? "bg-light-primary text-light-text border border-light-tertiary focus:border-highlight"
                      : "bg-dark-primary text-dark-text border border-dark-tertiary focus:border-highlight"
                  } focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-opacity-50 transition-colors duration-300`}
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
                  className={`w-full p-3 rounded-md ${
                    theme === "light"
                      ? "bg-light-primary text-light-text border border-light-tertiary focus:border-highlight"
                      : "bg-dark-primary text-dark-text border border-dark-tertiary focus:border-highlight"
                  } focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-opacity-50 transition-colors duration-300`}
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
                  className={`w-full p-3 rounded-md ${
                    theme === "light"
                      ? "bg-light-primary text-light-text border border-light-tertiary focus:border-highlight"
                      : "bg-dark-primary text-dark-text border border-dark-tertiary focus:border-highlight"
                  } focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-opacity-50 transition-colors duration-300`}
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
                  className={`w-full p-3 rounded-md ${
                    theme === "light"
                      ? "bg-light-primary text-light-text border border-light-tertiary focus:border-highlight"
                      : "bg-dark-primary text-dark-text border border-dark-tertiary focus:border-highlight"
                  } focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-opacity-50 transition-colors duration-300`}
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
                className={`w-full py-3 px-6 rounded-md text-white font-medium ${
                  theme === "light"
                    ? "bg-highlight hover:bg-highlight-hover"
                    : "bg-highlight hover:bg-highlight-hover"
                } transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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