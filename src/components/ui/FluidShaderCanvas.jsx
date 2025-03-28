import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FluidShaderCanvas = () => {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const FPS_LIMIT = 30; // Limitar a 30 FPS para mejor rendimiento
  const FRAME_TIME = 1000 / FPS_LIMIT;
  
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: false, // Desactivar antialiasing para mejor rendimiento
      precision: 'mediump' // Usar precisión media para mejor rendimiento
    });
    
    const pixelRatio = Math.min(window.devicePixelRatio, 2); // Limitar pixel ratio a 2
    renderer.setPixelRatio(pixelRatio);
    
    const resizeCanvas = () => {
      const canvas = renderer.domElement;
      const parent = canvas.parentElement;
      const displayWidth = parent ? parent.clientWidth : window.innerWidth;
      const displayHeight = parent ? parent.clientHeight : window.innerHeight;
      
      // Reducir la resolución de render para mejor rendimiento
      const scale = 0.75;
      renderer.setSize(displayWidth * scale, displayHeight * scale, false);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() }
    };
    
    // Shader simplificado para mejor rendimiento
    const fragmentShader = `
      uniform float iTime;
      uniform vec2 iResolution;
      
      void mainImage( out vec4 O, in vec2 I )
      {
          vec2 r = iResolution.xy,
          p = (I+I-r) / r.y / 1.5,
          z,
          i,
          f = p*(z+=3.-3.*abs(.5-dot(p,p)));
          
          for(O *= 0.; i.y++<6.; // Reducido de 8 a 6 iteraciones
              O += (sin(f)+1.).xyyx * abs(f.x-f.y))
              f += cos(f.yx*i.y+i+iTime)/i.y+.5;
          
          O = tanh(5.*exp(z.x-3.-p.y*vec4(-1,1,2,0))/O);
      }
      
      void main() {
        vec4 fragColor;
        mainImage(fragColor, gl_FragCoord.xy);
        gl_FragColor = fragColor;
      }
    `;
    
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;
    
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    const clock = new THREE.Clock();
    
    const animate = (currentTime) => {
      if (currentTime - lastFrameTimeRef.current >= FRAME_TIME) {
        uniforms.iTime.value = clock.getElapsedTime() * 0.75; // Reducir velocidad de animación
        uniforms.iResolution.value.set(
          renderer.domElement.width, 
          renderer.domElement.height
        );
        
        renderer.render(scene, camera);
        lastFrameTimeRef.current = currentTime;
      }
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    resizeCanvas();
    animate(0);
    
    const debouncedResize = debounce(resizeCanvas, 250);
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', debouncedResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0"
      style={{ display: 'block' }}
    />
  );
};

// Función de debounce para optimizar el resize
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default FluidShaderCanvas; 