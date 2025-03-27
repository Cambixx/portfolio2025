import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ShaderCanvas = () => {
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
      // Definiciones
      #define SPIN_ROTATION -2.0
      #define SPIN_SPEED 7.0
      #define OFFSET vec2(0.0)
      #define COLOUR_1 vec4(0.871, 0.267, 0.231, 1.0)
      #define COLOUR_2 vec4(0.0, 0.42, 0.706, 1.0)
      #define COLOUR_3 vec4(0.086, 0.137, 0.145, 1.0)
      #define CONTRAST 3.5
      #define LIGTHING 0.4
      #define SPIN_AMOUNT 0.25
      #define PIXEL_FILTER 1490.0  // Aumentado para mayor resolución (antes 745.0)
      #define SPIN_EASE 1.0
      #define PI 3.14159265359
      #define IS_ROTATE false

      uniform float iTime;
      uniform vec2 iResolution;
      
      vec4 effect(vec2 screenSize, vec2 screen_coords) {
        float pixel_size = length(screenSize.xy) / PIXEL_FILTER;
        vec2 uv = (floor(screen_coords.xy*(1./pixel_size))*pixel_size - 0.5*screenSize.xy)/length(screenSize.xy) - OFFSET;
        float uv_len = length(uv);
        
        float speed = (SPIN_ROTATION*SPIN_EASE*0.2);
        if(IS_ROTATE){
           speed = iTime * speed;
        }
        speed += 302.2;
        float new_pixel_angle = atan(uv.y, uv.x) + speed - SPIN_EASE*20.*(1.*SPIN_AMOUNT*uv_len + (1. - 1.*SPIN_AMOUNT));
        vec2 mid = (screenSize.xy/length(screenSize.xy))/2.;
        uv = (vec2((uv_len * cos(new_pixel_angle) + mid.x), (uv_len * sin(new_pixel_angle) + mid.y)) - mid);
        
        uv *= 30.;
        speed = iTime*(SPIN_SPEED);
        vec2 uv2 = vec2(uv.x+uv.y);
        
        for(int i=0; i < 5; i++) {
            uv2 += sin(max(uv.x, uv.y)) + uv;
            uv  += 0.5*vec2(cos(5.1123314 + 0.353*uv2.y + speed*0.131121),sin(uv2.x - 0.113*speed));
            uv  -= 1.0*cos(uv.x + uv.y) - 1.0*sin(uv.x*0.711 - uv.y);
        }
        
        float contrast_mod = (0.25*CONTRAST + 0.5*SPIN_AMOUNT + 1.2);
        float paint_res = min(2., max(0.,length(uv)*(0.035)*contrast_mod));
        float c1p = max(0.,1. - contrast_mod*abs(1.-paint_res));
        float c2p = max(0.,1. - contrast_mod*abs(paint_res));
        float c3p = 1. - min(1., c1p + c2p);
        float light = (LIGTHING - 0.2)*max(c1p*5. - 4., 0.) + LIGTHING*max(c2p*5. - 4., 0.);
        return (0.3/CONTRAST)*COLOUR_1 + (1. - 0.3/CONTRAST)*(COLOUR_1*c1p + COLOUR_2*c2p + vec4(c3p*COLOUR_3.rgb, c3p*COLOUR_1.a)) + light;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy/iResolution.xy;
        
        gl_FragColor = effect(iResolution.xy, uv * iResolution.xy);
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

export default ShaderCanvas; 