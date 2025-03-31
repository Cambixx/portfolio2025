import { useRef, useEffect } from 'react';

// Constantes configurables para ajustes
const CONFIG = {
  // Partículas
  PARTICLE_SIZE_MIN: 0.8,      // Tamaño mínimo de partícula
  PARTICLE_SIZE_MAX: 2.2,      // Tamaño máximo de partícula
  PARTICLE_COLOR_DARK: '#ffffff',   // Color de las partículas en modo oscuro
  PARTICLE_COLOR_LIGHT: '#ffffff',  // Color de las partículas en modo claro
  PARTICLE_DENSITY: 3,         // Densidad de partículas (más alto = menos partículas)
  
  // Física
  SPRING_FACTOR: 0.105,        // Velocidad de retorno a posición original (aumentado de 0.015)
  FRICTION: 0.90,              // Fricción de las partículas (reducido de 0.50 para menos resistencia)
  DAMPING: 0.8,                // Factor de amortiguación para reducir oscilaciones
  
  // Efecto repulsión del cursor
  REPULSION_RADIUS: 50,       // Radio de repulsión en píxeles
  REPULSION_FORCE: 26,         // Fuerza de repulsión
  
  // Texto
  FONT_FAMILY: 'sans-serif',
  ALPHA_THRESHOLD: 128,
  SUBTITLE_SCALE: 0.3,
  SUBTITLE_VERTICAL_OFFSET: 0.7,
  
  // Rendimiento
  ANIMATION_DELAY: 100,
  FPS_TARGET: 24,              // Nuevo: FPS objetivo
  
  // Animación de implosión inicial
  IMPLOSION_ENABLED: true,
  IMPLOSION_DISTANCE: 600,      // Aumentado de 400 para más dispersión
  IMPLOSION_SPEED: 0.12,        // Reducido de 0.22 para más lentitud
  IMPLOSION_STAGGER: 8,         // Aumentado de 4 para más variación en el tiempo de inicio
  IMPLOSION_CHAOS: 0.3,         // Nuevo: Factor de caos en el movimiento
  IMPLOSION_PATH_VARIATION: 0.4, // Nuevo: Variación en el camino de regreso
};

const ParticleTextEffect = ({ text, subtitle = "WEB DEVELOPER", isDarkMode = true }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef(null);
  const implosionCompleteRef = useRef(false);
  const touchStartTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const frameIntervalRef = useRef(1000 / CONFIG.FPS_TARGET);
  const isMobileRef = useRef(false);

  useEffect(() => {
    // Detectar si es un dispositivo móvil
    isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    const handleTouchMove = (e) => {
      if (!isMobileRef.current && e.touches && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        e.preventDefault();
      }
    };
    
    const handleTouchStart = (e) => {
      if (!isMobileRef.current && e.touches && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        touchStartTimeRef.current = Date.now();
      }
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    
    class Particle {
      constructor(x, y) {
        this.originX = x;
        this.originY = y;
        
        if (CONFIG.IMPLOSION_ENABLED && !implosionCompleteRef.current && !isMobileRef.current) {
          const angle = Math.random() * Math.PI * 2;
          const distance = CONFIG.IMPLOSION_DISTANCE * (0.8 + Math.random() * 0.4);
          
          this.x = this.originX + Math.cos(angle) * distance;
          this.y = this.originY + Math.sin(angle) * distance;
          
          this.implosionComplete = false;
          this.implosionDelay = Math.random() * CONFIG.IMPLOSION_STAGGER;
        } else {
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
        if (CONFIG.IMPLOSION_ENABLED && !this.implosionComplete) {
          if (time > this.implosionDelay) {
            const dx = this.originX - this.x;
            const dy = this.originY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 0.5) {
              this.x = this.originX;
              this.y = this.originY;
              this.implosionComplete = true;
            } else {
              // Añadir variación al camino de regreso
              const angle = Math.atan2(dy, dx);
              const chaos = CONFIG.IMPLOSION_CHAOS * Math.sin(time * 2 + this.implosionDelay);
              const pathVar = CONFIG.IMPLOSION_PATH_VARIATION;
              
              // Movimiento principal
              const baseSpeed = this.implosionSpeed * (0.8 + Math.sin(time + this.implosionDelay) * 0.2);
              
              // Añadir movimiento circular aleatorio
              const circularMotion = {
                x: Math.cos(time * 2 + this.implosionDelay) * chaos * distance * 0.1,
                y: Math.sin(time * 3 + this.implosionDelay) * chaos * distance * 0.1
              };
              
              // Aplicar variación al camino
              const pathVariation = {
                x: Math.sin(time * 1.5 + this.implosionDelay * 2) * pathVar * distance * 0.05,
                y: Math.cos(time * 2.5 + this.implosionDelay * 2) * pathVar * distance * 0.05
              };
              
              this.x += (dx * baseSpeed) + circularMotion.x + pathVariation.x;
              this.y += (dy * baseSpeed) + circularMotion.y + pathVariation.y;
            }
          }
        }
        
        const dx = this.originX - this.x;
        const dy = this.originY - this.y;
        
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && 
            Math.abs(this.vx) < 0.5 && Math.abs(this.vy) < 0.5) {
          this.x = this.originX;
          this.y = this.originY;
          this.vx = 0;
          this.vy = 0;
          
          this.handleRepulsion(mouseX, mouseY);
          return;
        }
        
        this.vx += dx * this.springFactor;
        this.vy += dy * this.springFactor;
        
        this.handleRepulsion(mouseX, mouseY);
        
        if (Math.abs(this.vx) > 3 || Math.abs(this.vy) > 3) {
          this.vx *= this.damping;
          this.vy *= this.damping;
        }
        
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        this.x += this.vx;
        this.y += this.vy;
      }
      
      handleRepulsion(mouseX, mouseY) {
        if (isMobileRef.current) return;

        if (typeof mouseX !== 'number' || typeof mouseY !== 'number' || 
            isNaN(mouseX) || isNaN(mouseY)) return;
        
        const distX = mouseX - this.x;
        const distY = mouseY - this.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < this.repulsionRadius) {
          const force = (this.repulsionRadius - distance) / this.repulsionRadius;
          const angle = Math.atan2(distY, distX);
          
          const repulsionX = Math.cos(angle) * force * this.repulsionForce;
          const repulsionY = Math.sin(angle) * force * this.repulsionForce;
          
          this.vx -= repulsionX;
          this.vy -= repulsionY;
          
          if (distance < this.repulsionRadius * 0.3) {
            this.vx -= Math.cos(angle) * 3;
            this.vy -= Math.sin(angle) * 3;
          }
          
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
    
    const initParticles = () => {
      particlesRef.current = [];
      implosionCompleteRef.current = false;
      
      const textCanvas = document.createElement('canvas');
      const textCtx = textCanvas.getContext('2d');
      
      const titleFontSize = Math.min(window.innerWidth / (text.length * 0.7), 150);
      const subtitleFontSize = titleFontSize * CONFIG.SUBTITLE_SCALE;
      
      const textTotalHeight = titleFontSize + subtitleFontSize + (titleFontSize * CONFIG.SUBTITLE_VERTICAL_OFFSET);
      
      textCanvas.width = window.innerWidth;
      textCanvas.height = textTotalHeight * 1.5;
      
      textCtx.font = `${titleFontSize}px ${CONFIG.FONT_FAMILY}`;
      textCtx.fillStyle = 'white';
      textCtx.textAlign = 'center';
      textCtx.textBaseline = 'middle';
      const titleY = (textCanvas.height / 2) - (subtitleFontSize / 2);
      textCtx.fillText(text, textCanvas.width / 2, titleY);
      
      textCtx.font = `bold ${subtitleFontSize}px ${CONFIG.FONT_FAMILY}`;
      const subtitleY = titleY + (titleFontSize * CONFIG.SUBTITLE_VERTICAL_OFFSET);
      textCtx.fillText(subtitle, textCanvas.width / 2, subtitleY);
      
      const imageData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height);
      const pixels = imageData.data;
      
      for (let y = 0; y < textCanvas.height; y += CONFIG.PARTICLE_DENSITY) {
        for (let x = 0; x < textCanvas.width; x += CONFIG.PARTICLE_DENSITY) {
          const alpha = pixels[(y * textCanvas.width + x) * 4 + 3];
          
          if (alpha > CONFIG.ALPHA_THRESHOLD) {
            const centerOffsetX = (window.innerWidth - textCanvas.width) / 2;
            const centerOffsetY = (window.innerHeight - textCanvas.height) / 2;
            
            const particleX = x + centerOffsetX;
            const particleY = y + centerOffsetY;
            
            particlesRef.current.push(new Particle(particleX, particleY));
          }
        }
      }
    };
    
    const startTime = Date.now();
    const animate = (currentTime) => {
      // Control de FPS básico
      if (currentTime - lastFrameTimeRef.current >= frameIntervalRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const elapsedTime = (Date.now() - startTime) / 1000;
        
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
        
        particlesRef.current.forEach(particle => {
          particle.update(mouseRef.current.x, mouseRef.current.y, elapsedTime);
          particle.draw(ctx);
        });
        
        lastFrameTimeRef.current = currentTime;
      }
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    setTimeout(() => {
      initParticles();
      animate(0);
    }, CONFIG.ANIMATION_DELAY);
    
    window.addEventListener('resize', initParticles);
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', initParticles);
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