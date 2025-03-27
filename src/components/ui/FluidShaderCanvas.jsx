import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FluidShaderCanvas = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Crear la escena, cámara y renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Configurar el renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      precision: 'highp' // Alta precisión para mejor calidad
    });
    
    // Usar pixel ratio del dispositivo para mejorar la nitidez en pantallas de alta densidad
    const pixelRatio = window.devicePixelRatio || 1;
    renderer.setPixelRatio(pixelRatio);
    
    // Ajustar tamaño al contenedor considerando el pixel ratio
    const resizeCanvas = () => {
      const canvas = renderer.domElement;
      const parent = canvas.parentElement;
      
      // Obtener el tamaño real del contenedor
      const displayWidth = parent ? parent.clientWidth : window.innerWidth;
      const displayHeight = parent ? parent.clientHeight : window.innerHeight;
      
      // Verificar si necesita cambio de tamaño
      const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
      
      if (needResize) {
        // Configurar el renderizador con el nuevo tamaño
        renderer.setSize(displayWidth, displayHeight, false);
      }
      
      return needResize;
    };

    // Crear geometría y material con el shader
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() }
    };
    
    const fragmentShader = `
      uniform float iTime;
      uniform vec2 iResolution;
      
      void mainImage( out vec4 O, in vec2 I )
      {
          //Resolution for scaling
          vec2 r = iResolution.xy,
          //Centered, ratio corrected, coordinates
          p = (I+I-r) / r.y / 1.2, // Dividido por 1.2 para reducir el tamaño
          //Z depth
          z,
          //Iterator (x=0)
          i,
          //Fluid coordinates
          f = p*(z+=4.-4.*abs(.6-dot(p,p))); // Cambiado de .7 a .6 para reducir tamaño
          
          //Clear frag color and loop 8 times
          for(O *= 0.; i.y++<8.;
              //Set color waves and line brightness
              O += (sin(f)+1.).xyyx * abs(f.x-f.y))
              //Add fluid waves
              f += cos(f.yx*i.y+i+iTime)/i.y+.7;
          
          //Tonemap, fade edges and color gradient
          O = tanh(7.*exp(z.x-4.-p.y*vec4(-1,1,2,0))/O);
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
    
    // Configurar la animación
    let animationFrameId;
    const clock = new THREE.Clock();
    
    const animate = () => {
      // Comprobar y actualizar el tamaño si es necesario
      const resized = resizeCanvas();
      
      // Actualizar el tiempo
      uniforms.iTime.value = clock.getElapsedTime();
      
      // Actualizar resolución con el tamaño real del canvas
      uniforms.iResolution.value.set(
        renderer.domElement.width, 
        renderer.domElement.height
      );
      
      // Renderizar la escena
      renderer.render(scene, camera);
      
      // Solicitar el siguiente frame
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    // Realizar el resize inicial para asegurar que comience con el tamaño correcto
    resizeCanvas();
    
    // Comenzar animación
    animate();
    
    // Manejar cambios de tamaño
    window.addEventListener('resize', resizeCanvas);
    
    // Limpieza al desmontar
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      
      // Liberar memoria
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

export default FluidShaderCanvas; 