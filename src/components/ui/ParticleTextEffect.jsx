import { useRef, useEffect } from 'react';

// Constantes configurables para ajustes
const CONFIG = {
  // Partículas
  PARTICLE_SIZE_MIN: 0.5,      // Tamaño mínimo de partícula
  PARTICLE_SIZE_MAX: 1.5,      // Tamaño máximo de partícula
  PARTICLE_COLOR_DARK: '#ffffff',   // Color de las partículas en modo oscuro
  PARTICLE_COLOR_LIGHT: '#333333',  // Color de las partículas en modo claro
  PARTICLE_DENSITY: 3,         // Densidad de partículas (más alto = menos partículas)
  
  // Física
  SPRING_FACTOR: 0.015,        // Velocidad de retorno a posición original (reducido para evitar temblores)
  FRICTION: 0.50,              // Fricción de las partículas (aumentada para más amortiguación)
  DAMPING: 0.9,                // Factor de amortiguación para reducir oscilaciones
  
  // Efecto repulsión del cursor
  REPULSION_RADIUS: 50,       // Radio de repulsión en píxeles (aumentado)
  REPULSION_FORCE: 12,         // Fuerza de repulsión (aumentada considerablemente)
  
  // Texto
  FONT_FAMILY: 'sans-serif',   // Familia de fuente
  ALPHA_THRESHOLD: 128,        // Umbral para detectar píxeles de texto (0-255)
  SUBTITLE_SCALE: 0.3,         // Escala del subtítulo respecto al título
  SUBTITLE_VERTICAL_OFFSET: 0.7, // Desplazamiento vertical del subtítulo (en relación con la altura de la fuente del título)
  
  // Rendimiento
  ANIMATION_DELAY: 100,        // Retraso inicial para la animación en ms
  
  // Animación de implosión inicial
  IMPLOSION_ENABLED: true,     // Activar efecto de implosión al cargar
  IMPLOSION_DISTANCE: 800,     // Distancia inicial de dispersión (px)
  IMPLOSION_SPEED: 0.12,       // Velocidad de convergencia (aumentada considerablemente)
  IMPLOSION_STAGGER: 5         // Retraso entre partículas (reducido considerablemente)
};

const ParticleTextEffect = ({ text, subtitle = "WEB DEVELOPER", isDarkMode = true }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 }); // Inicializar fuera de pantalla
  const frameRef = useRef(null);
  const implosionCompleteRef = useRef(false);
  const touchStartTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configurar tamaño del canvas para que ocupe toda la pantalla
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Actualizar posición del mouse
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    // Manejar eventos táctiles para dispositivos móviles
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        e.preventDefault(); // Prevenir scroll
      }
    };
    
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        touchStartTimeRef.current = Date.now();
      }
    };
    
    // Asegurarse de que los eventos se registren correctamente
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart);
    
    // También agregar listeners al window para capturar movimientos fuera del canvas
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    
    // Clase para las partículas
    class Particle {
      constructor(x, y) {
        // Posición final/de origen
        this.originX = x;
        this.originY = y;
        
        if (CONFIG.IMPLOSION_ENABLED && !implosionCompleteRef.current) {
          // Para la implosión: colocar partículas en posición aleatoria fuera de la pantalla
          const angle = Math.random() * Math.PI * 2;
          const distance = CONFIG.IMPLOSION_DISTANCE * (0.8 + Math.random() * 0.4);
          
          this.x = this.originX + Math.cos(angle) * distance;
          this.y = this.originY + Math.sin(angle) * distance;
          
          this.implosionComplete = false;
          this.implosionDelay = Math.random() * CONFIG.IMPLOSION_STAGGER;
        } else {
          // Sin implosión: colocar partículas directamente en su posición final
          this.x = x;
          this.y = y;
          this.implosionComplete = true;
        }
        
        this.size = Math.random() * 
          (CONFIG.PARTICLE_SIZE_MAX - CONFIG.PARTICLE_SIZE_MIN) + 
          CONFIG.PARTICLE_SIZE_MIN;
        this.color = isDarkMode ? CONFIG.PARTICLE_COLOR_DARK : CONFIG.PARTICLE_COLOR_LIGHT;
        this.vx = 0;
        this.vy = 0;
        this.friction = CONFIG.FRICTION;
        this.springFactor = CONFIG.SPRING_FACTOR;
        this.repulsionRadius = CONFIG.REPULSION_RADIUS;
        this.repulsionForce = CONFIG.REPULSION_FORCE;
        this.damping = CONFIG.DAMPING;
        this.implosionSpeed = CONFIG.IMPLOSION_SPEED;
      }
      
      update(mouseX, mouseY, time) {
        // Si estamos en fase de implosión y aún no ha terminado para esta partícula
        if (CONFIG.IMPLOSION_ENABLED && !this.implosionComplete) {
          // Esperar el tiempo de retraso escalonado antes de comenzar
          if (time > this.implosionDelay) {
            // Mover hacia la posición final con interpolación suave
            const dx = this.originX - this.x;
            const dy = this.originY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 0.5) {
              // Cerca del destino, finalizar implosión
              this.x = this.originX;
              this.y = this.originY;
              this.implosionComplete = true;
            } else {
              // Mover hacia el destino
              this.x += dx * this.implosionSpeed;
              this.y += dy * this.implosionSpeed;
            }
          }
        }
        
        // Comportamiento normal: siempre verificar repulsión y aplicar físicas
        
        // Calcular distancia al origen (posición inicial/de reposo)
        const dx = this.originX - this.x;
        const dy = this.originY - this.y;
        
        // No aplicar físicas si está muy cerca de su posición original y sin velocidad
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && 
            Math.abs(this.vx) < 0.5 && Math.abs(this.vy) < 0.5) {
          this.x = this.originX;
          this.y = this.originY;
          this.vx = 0;
          this.vy = 0;
          
          // Importante: seguir verificando repulsión incluso cuando está en reposo
          this.handleRepulsion(mouseX, mouseY);
          return;
        }
        
        // Fuerza hacia posición original (como un resorte)
        this.vx += dx * this.springFactor;
        this.vy += dy * this.springFactor;
        
        // Manejar repulsión del cursor
        this.handleRepulsion(mouseX, mouseY);
        
        // Aplicar amortiguación para movimientos extremos
        if (Math.abs(this.vx) > 3 || Math.abs(this.vy) > 3) {
          this.vx *= this.damping;
          this.vy *= this.damping;
        }
        
        // Aplicar fricción
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        // Actualizar posición
        this.x += this.vx;
        this.y += this.vy;
      }
      
      // Método separado para manejar la repulsión del cursor
      handleRepulsion(mouseX, mouseY) {
        // Solo procesar si mouseX y mouseY son números válidos
        if (typeof mouseX !== 'number' || typeof mouseY !== 'number' || 
            isNaN(mouseX) || isNaN(mouseY)) return;
        
        // Calcular distancia al cursor
        const distX = mouseX - this.x;
        const distY = mouseY - this.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // Aplicar repulsión si el cursor está cerca
        if (distance < this.repulsionRadius) {
          const force = (this.repulsionRadius - distance) / this.repulsionRadius;
          const angle = Math.atan2(distY, distX);
          
          // Fuerza base de repulsión
          const repulsionX = Math.cos(angle) * force * this.repulsionForce;
          const repulsionY = Math.sin(angle) * force * this.repulsionForce;
          
          this.vx -= repulsionX;
          this.vy -= repulsionY;
          
          // Aplicar un impulso adicional para partículas cercanas al cursor
          if (distance < this.repulsionRadius * 0.3) {
            this.vx -= Math.cos(angle) * 3;
            this.vy -= Math.sin(angle) * 3;
          }
          
          // Añadir un poco de aleatoriedad al movimiento para hacerlo más natural
          this.vx += (Math.random() - 0.5) * 0.5;
          this.vy += (Math.random() - 0.5) * 0.5;
        }
      }
      
      draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Inicializar partículas que forman las letras
    const initParticles = () => {
      // Limpiar partículas existentes
      particlesRef.current = [];
      
      // Reiniciar estado de implosión
      implosionCompleteRef.current = false;
      
      // Crear un canvas oculto para dibujar y analizar el texto
      const textCanvas = document.createElement('canvas');
      const textCtx = textCanvas.getContext('2d');
      
      // Determinar el tamaño adecuado basado en el ancho de la ventana
      const titleFontSize = Math.min(window.innerWidth / (text.length * 0.7), 150);
      const subtitleFontSize = titleFontSize * CONFIG.SUBTITLE_SCALE;
      
      // Calcular altura total para ambos textos
      const textTotalHeight = titleFontSize + subtitleFontSize + (titleFontSize * CONFIG.SUBTITLE_VERTICAL_OFFSET);
      
      textCanvas.width = window.innerWidth;
      textCanvas.height = textTotalHeight * 1.5;
      
      // Dibujar el título
      textCtx.font = `bold ${titleFontSize}px ${CONFIG.FONT_FAMILY}`;
      textCtx.fillStyle = 'white';
      textCtx.textAlign = 'center';
      textCtx.textBaseline = 'middle';
      const titleY = (textCanvas.height / 2) - (subtitleFontSize / 2);
      textCtx.fillText(text, textCanvas.width / 2, titleY);
      
      // Dibujar el subtítulo
      textCtx.font = `bold ${subtitleFontSize}px ${CONFIG.FONT_FAMILY}`;
      const subtitleY = titleY + (titleFontSize * CONFIG.SUBTITLE_VERTICAL_OFFSET);
      textCtx.fillText(subtitle, textCanvas.width / 2, subtitleY);
      
      // Obtener los datos de los píxeles del canvas
      const imageData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height);
      const pixels = imageData.data;
      
      // Recorrer los píxeles y crear partículas donde hay contenido
      for (let y = 0; y < textCanvas.height; y += CONFIG.PARTICLE_DENSITY) {
        for (let x = 0; x < textCanvas.width; x += CONFIG.PARTICLE_DENSITY) {
          // Obtener el valor alfa en esta posición (4 componentes: R,G,B,A)
          const alpha = pixels[(y * textCanvas.width + x) * 4 + 3];
          
          // Si hay algo dibujado (alpha > umbral), crear una partícula
          if (alpha > CONFIG.ALPHA_THRESHOLD) {
            // Calcular las coordenadas centradas en el viewport
            const centerOffsetX = (window.innerWidth - textCanvas.width) / 2;
            const centerOffsetY = (window.innerHeight - textCanvas.height) / 2;
            
            const particleX = x + centerOffsetX;
            const particleY = y + centerOffsetY;
            
            particlesRef.current.push(new Particle(particleX, particleY));
          }
        }
      }
    };
    
    // Función de animación
    const startTime = Date.now();
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const elapsedTime = (Date.now() - startTime) / 1000;
      
      // Verificar si la implosión ha finalizado para todas las partículas
      if (CONFIG.IMPLOSION_ENABLED && !implosionCompleteRef.current) {
        let allComplete = true;
        for (const particle of particlesRef.current) {
          if (!particle.implosionComplete) {
            allComplete = false;
            break;
          }
        }
        if (allComplete) {
          implosionCompleteRef.current = true;
        }
      }
      
      // Actualizar y dibujar cada partícula
      particlesRef.current.forEach(particle => {
        particle.update(mouseRef.current.x, mouseRef.current.y, elapsedTime);
        particle.draw(ctx);
      });
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    // Inicializar partículas después de que el componente esté completamente renderizado
    setTimeout(() => {
      initParticles();
      animate();
    }, CONFIG.ANIMATION_DELAY);
    
    // Re-inicializar partículas si el texto cambia o en resize
    window.addEventListener('resize', initParticles);
    
    // Debug: verificar posición del mouse
    const debugInfo = () => {
      console.log(`Mouse: ${mouseRef.current.x}, ${mouseRef.current.y}`);
      console.log(`Particles: ${particlesRef.current.length}`);
      console.log(`Implosion complete: ${implosionCompleteRef.current}`);
    };
    
    // Añadir evento de clic para debug
    window.addEventListener('click', debugInfo);
    
    // Limpiar
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', initParticles);
      window.removeEventListener('click', debugInfo);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, subtitle, isDarkMode]);
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-10"
      />
    </div>
  );
};

export default ParticleTextEffect; 