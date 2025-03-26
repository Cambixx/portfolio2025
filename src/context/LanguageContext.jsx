import React, { createContext, useContext, useState } from 'react';
import es from '../locales/es.json';
import en from '../locales/en.json';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('es');
  const translations = { es, en };

  const toggleLanguage = (newLang) => {
    if (newLang && (newLang === 'es' || newLang === 'en')) {
      setLanguage(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 