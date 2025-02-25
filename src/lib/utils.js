/**
 * Combina nombres de clases condicionales
 * @param  {...string} classes - Clases CSS a combinar
 * @returns {string} - Clases combinadas en un string
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
} 