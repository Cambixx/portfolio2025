import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const MusicShaderCanvas = () => {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const audioContextRef = useRef(null);
  const audioSourceRef = useRef(null);
  const analyserRef = useRef(null);
  const nativeAudioRef = useRef(null);
  const materialRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const { theme } = useTheme();
  const FPS_LIMIT = 24;
  const FRAME_TIME = 1000 / FPS_LIMIT;

  // Función para inicializar y conectar el contexto de audio
  const initAudioContext = useCallback(async () => {
    try {
      // Si ya tenemos un contexto de audio válido, no hacemos nada
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        console.log('Contexto de audio ya existe, estado:', audioContextRef.current.state);
        return;
      }
      
      console.log('Inicializando contexto de audio...');
      
      // Verificar que tenemos el elemento de audio
      if (!nativeAudioRef.current) {
        console.error('No se encontró el elemento de audio');
        return;
      }
      
      // Crear nuevo contexto de audio
      const context = new (window.AudioContext || window.webkitAudioContext)();
      console.log('Nuevo contexto de audio creado, estado:', context.state);
      
      // Si el contexto está suspendido, debemos reanudarlo (requiere interacción del usuario)
      if (context.state === 'suspended') {
        console.log('Intentando reanudar contexto...');
        try {
          await context.resume();
          console.log('Contexto de audio reanudado, estado:', context.state);
        } catch (error) {
          console.error('Error al reanudar contexto de audio:', error);
        }
      }
      
      // Crear los nodos de audio
      console.log('Creando nodos de audio...');
      try {
        const source = context.createMediaElementSource(nativeAudioRef.current);
        const audioAnalyser = context.createAnalyser();
        audioAnalyser.fftSize = 64;
        
        // Conectar los nodos
        source.connect(audioAnalyser);
        audioAnalyser.connect(context.destination);
        
        // Guardar referencias
        audioContextRef.current = context;
        audioSourceRef.current = source;
        analyserRef.current = audioAnalyser;
        
        console.log('Contexto de audio inicializado correctamente');
        setIsAudioInitialized(true);
      } catch (error) {
        console.error('Error al conectar nodos de audio:', error);
      }
    } catch (error) {
      console.error('Error al inicializar el contexto de audio:', error);
    }
  }, []);

  // Efecto para verificar que el archivo de audio existe y está disponible al cargar
  useEffect(() => {
    // Verificar si el archivo de audio existe
    const checkAudioFile = async () => {
      const audioPath = `${window.location.origin}/sounds/beat3.mp3`;
      console.log('Verificando disponibilidad del audio en:', audioPath);
      
      try {
        const response = await fetch(audioPath, { method: 'HEAD' });
        if (!response.ok) {
          console.error(`Archivo de audio no encontrado: ${response.status} ${response.statusText}`);
          return false;
        }
        console.log('Archivo de audio verificado correctamente');
        return true;
      } catch (error) {
        console.error('Error al verificar el archivo de audio:', error);
        return false;
      }
    };
    
    checkAudioFile();
  }, []);

  // Efecto para limpiar recursos de audio cuando el componente se desmonta
  useEffect(() => {
    return () => {
      console.log('Limpiando recursos de audio...');
      
      // Pausar y limpiar elementos de audio
      if (nativeAudioRef.current) {
        nativeAudioRef.current.pause();
        nativeAudioRef.current.src = '';
      }
      
      // Desconectar fuentes de audio
      if (audioSourceRef.current) {
        try {
          audioSourceRef.current.disconnect();
        } catch (error) {
          console.log('Error al desconectar fuente de audio:', error);
        }
      }
      
      // Cerrar contexto de audio
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch (error) {
          console.log('Error al cerrar contexto de audio:', error);
        }
      }
    };
  }, []);

  // Inicializar Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: false,
      precision: 'mediump'
    });
    
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    
    const resizeCanvas = () => {
      const canvas = renderer.domElement;
      const parent = canvas.parentElement;
      const displayWidth = parent ? parent.clientWidth : window.innerWidth;
      const displayHeight = parent ? parent.clientHeight : window.innerHeight;
      
      const scale = 0.75;
      renderer.setSize(displayWidth * scale, displayHeight * scale, false);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Crear textura de audio
    const audioTexture = new THREE.DataTexture(
      new Float32Array(8),
      8,
      1,
      THREE.RedFormat,
      THREE.FloatType
    );
    audioTexture.needsUpdate = true;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iChannel0: { value: audioTexture },
      isDarkMode: { value: theme === 'dark' }
    };
    
    const fragmentShader = `
      uniform float iTime;
      uniform vec2 iResolution;
      uniform sampler2D iChannel0;
      uniform bool isDarkMode;

      // Constantes para ajustar el comportamiento visual
      const float CUBE_HEIGHT_FACTOR = 3.2;
      const float TIME_SPEED = 0.35;
      const float FREQ_IMPACT = 1.6;
      const float SMOOTHING = 0.5;
      const float BOUNCE_FACTOR = 0.7;

      // Factores para cada banda de frecuencia
      const float FREQ_0_FACTOR = 0.45 * FREQ_IMPACT;
      const float FREQ_1_FACTOR = 0.32 * FREQ_IMPACT;
      const float FREQ_2_FACTOR = 0.4 * FREQ_IMPACT;
      const float FREQ_3_FACTOR = 0.35 * FREQ_IMPACT;
      const float FREQ_4_FACTOR = 0.3 * FREQ_IMPACT;
      const float FREQ_5_FACTOR = 0.25 * FREQ_IMPACT;
      const float FREQ_6_FACTOR = 0.2 * FREQ_IMPACT;
      const float FREQ_7_FACTOR = 0.15 * FREQ_IMPACT;

      // Propiedades del vidrio esmerilado
      const float GLASS_ROUGHNESS = 0.45;     // Rugosidad de la superficie
      const float GLASS_IOR = 2.5;            // Índice de refracción
      const float GLASS_TRANSPARENCY = 0.9;   // Transparencia del vidrio
      const float INNER_LIGHT_INTENSITY = 1.2;  // Intensidad de la luz interna
      const vec3 INNER_LIGHT_POS = vec3(0.0, 0.3, 0.0);  // Posición relativa de la luz interna

      // Distribución de bandas
      const float BAND_WIDTH = 0.15;

      float hash(float n) { return fract(sin(n)*13.5453123); }
      float hash3(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.9)))*43758.5453123); }

      float maxcomp(in vec3 v) { return max(max(v.x, v.y), v.z); }

      // Función para crear textura de ruido para simular vidrio esmerilado
      float fbm(vec3 p) {
        float f = 0.0;
        float scale = 1.0;
        float amp = 1.0;
        for (int i = 0; i < 4; i++) {
          f += amp * hash3(p * scale);
          scale *= 2.0;
          amp *= 0.5;
        }
        return f;
      }

      float udBox(vec3 p, vec3 b, float r) {
        return length(max(abs(p)-b,0.0))-r;
      }

      vec4 texcube(sampler2D sam, in vec3 p, in vec3 n) {
        vec3 a = n*n;
        vec4 x = texture(sam, p.yz);
        vec4 y = texture(sam, p.zx);
        vec4 z = texture(sam, p.yx);
        return (x*a.x + y*a.y + z*a.z) / (a.x + a.y + a.z);
      }

      float freqs[8];

      vec3 mapH(in vec2 pos) {
        vec2 fpos = fract(pos); 
        vec2 ipos = floor(pos);
        
        float f = 0.0;	
        float id = hash(ipos.x + ipos.y*57.0);
        
        // Efecto de onda que se propaga desde el centro
        float dist = length(pos * 0.1);
        float wave = sin(dist * 3.0 - iTime * 2.0) * 0.1;
        
        // Añadir variación temporal basada en la posición para más dinamismo
        float timeFactor = sin(iTime * 0.5 + id * 6.28) * 0.2 + 0.8;
        
        // Aplicar frecuencias con variación espacial y temporal
        f += freqs[0] * clamp(1.0 - abs(id-0.10)/BAND_WIDTH, 0.0, 1.0) * (1.0 + wave) * timeFactor;
        f += freqs[1] * clamp(1.0 - abs(id-0.23)/BAND_WIDTH, 0.0, 1.0) * (1.0 + wave) * timeFactor;
        f += freqs[2] * clamp(1.0 - abs(id-0.36)/BAND_WIDTH, 0.0, 1.0) * (1.0 + wave) * timeFactor;
        f += freqs[3] * clamp(1.0 - abs(id-0.49)/BAND_WIDTH, 0.0, 1.0) * (1.0 + wave) * timeFactor;
        f += freqs[4] * clamp(1.0 - abs(id-0.62)/BAND_WIDTH, 0.0, 1.0) * (1.0 + wave) * timeFactor;
        f += freqs[5] * clamp(1.0 - abs(id-0.75)/BAND_WIDTH, 0.0, 1.0) * (1.0 + wave) * timeFactor;
        f += freqs[6] * clamp(1.0 - abs(id-0.88)/BAND_WIDTH, 0.0, 1.0) * (1.0 + wave) * timeFactor;
        f += freqs[7] * clamp(1.0 - abs(id-1.01)/BAND_WIDTH, 0.0, 1.0) * (1.0 + wave) * timeFactor;

        // Curva de respuesta mejorada con más elasticidad
        f = pow(clamp(f, 0.0, 1.0), 1.8);
        
        // Añadir un ligero rebote global
        float bounce = sin(iTime * 3.0) * 0.05 * max(freqs[0] + freqs[1], 0.1);
        
        float h = CUBE_HEIGHT_FACTOR * f + bounce;

        return vec3(h, id, f);
      }

      // Función para SDF de un cilindro vertical
      float sdCylinder(vec3 p, vec2 h) {
        // h.x = radio, h.y = altura/2
        vec2 d = abs(vec2(length(p.xz), p.y)) - h;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
      }

      vec3 map(in vec3 pos) {
        vec2 p = fract(pos.xz); 
        vec3 m = mapH(pos.xz);
        
        // Posición relativa para el cilindro centrado
        vec3 rp = vec3(p.x-0.5, pos.y-0.5*m.x, p.y-0.5);
        
        // Usar cilindro en lugar de caja
        // sdCylinder espera (radio, altura/2)
        float d = sdCylinder(rp, vec2(0.25, m.x*0.5));
        
        // Añadir redondeo a los bordes del cilindro
        d -= 0.05;
        
        return vec3(d, m.yz);
      }

      const float surface = 0.001;

      vec3 trace(vec3 ro, in vec3 rd, in float tmin, in float tmax) {
        ro += tmin*rd;
        
        vec2 pos = floor(ro.xz);
        vec3 rdi = 1.0/rd;
        vec3 rda = abs(rdi);
        vec2 rds = sign(rd.xz);
        vec2 dis = (pos-ro.xz+ 0.5 + rds*0.5) * rdi.xz;
        
        vec3 res = vec3(-1.0);

        vec2 mm = vec2(0.0);
        for(int i=0; i<28; i++) {
          vec3 cub = mapH(pos);
          
          vec2 pr = pos+0.5-ro.xz;
          vec2 mini = (pr-0.5*rds)*rdi.xz;
          float s = max(mini.x, mini.y);
          if((tmin+s)>tmax) break;
          
          vec3 ce = vec3(pos.x+0.5, 0.5*cub.x, pos.y+0.5);
          // Para cilindros, rb contiene (radio, altura/2, radio)
          vec3 rb = vec3(0.25, cub.x*0.5, 0.25);
          vec3 ra = vec3(rb.x + 0.08, rb.y, rb.z + 0.08);
          vec3 rc = ro - ce;
          float tN = maxcomp(-rdi*rc - rda*ra);
          float tF = maxcomp(-rdi*rc + rda*ra);
          if(tN < tF) {
            float s = tN;
            float h = 1.0;
            for(int j=0; j<24; j++) {
              // Calcular distancia para un cilindro en lugar de una caja
              vec3 rcp = rc+s*rd;
              h = sdCylinder(rcp, vec2(rb.x, rb.y)) - 0.05; 
              s += h;
              if(s>tF) break;
            }

            if(h < (surface*s*2.0)) {
              res = vec3(s, cub.yz);
              break; 
            }
          }

          mm = step(dis.xy, dis.yx); 
          dis += mm*rda.xz;
          pos += mm*rds;
        }

        res.x += tmin;
        
        return res;
      }

      float usmoothstep(in float x) {
        x = clamp(x,0.0,1.0);
        return x*x*(3.0-2.0*x);
      }

      float softshadow(in vec3 ro, in vec3 rd, in float mint, in float maxt, in float k) {
        float res = 1.0;
        float t = mint;
        for(int i=0; i<50; i++) {
          float h = map(ro + rd*t).x;
          res = min(res, usmoothstep(k*h/t));
          t += clamp(h, 0.05, 0.2);
          if(res<0.001 || t>maxt) break;
        }
        return clamp(res, 0.0, 1.0);
      }

      vec3 calcNormal(in vec3 pos, in float t) {
        vec2 e = vec2(1.0,-1.0)*surface*t;
        
        // Añadir perturbación a la normal para efecto de vidrio esmerilado
        float noiseFactor = GLASS_ROUGHNESS * fbm(pos * 50.0 + iTime * 0.05);
        
        vec3 normal = normalize(e.xyy*map(pos + e.xyy).x + 
                      e.yyx*map(pos + e.yyx).x + 
                      e.yxy*map(pos + e.yxy).x + 
                      e.xxx*map(pos + e.xxx).x);
                      
        // Perturbar normal con ruido
        normal += vec3(noiseFactor) * vec3(0.3, 0.1, 0.3);
        return normalize(normal);
      }

      const vec3 light1 = vec3(0.60, 0.48, -0.65);
      const vec3 light2 = vec3(-0.60, -0.10, 0.80);
      const vec3 lpos = vec3(0.0) + 6.0*light1;

      vec2 boundingVolume(vec2 tminmax, in vec3 ro, in vec3 rd) {
        float bp = 2.7;
        float tp = (bp-ro.y)/rd.y;
        if(tp>0.0) {
          if(ro.y>bp) tminmax.x = max(tminmax.x, tp);
          else        tminmax.y = min(tminmax.y, tp);
        }
        bp = 0.0;
        tp = (bp-ro.y)/rd.y;
        if(tp>0.0) {
          if(ro.y>bp) tminmax.y = min(tminmax.y, tp);
        }
        return tminmax;
      }

      // Función de Fresnel para efecto de vidrio
      float fresnel(vec3 normal, vec3 viewDir, float F0) {
        float cosTheta = clamp(dot(normal, viewDir), 0.0, 1.0);
        return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
      }

      // Calcula luz interna para los cilindros
      vec3 calculateInnerLight(vec3 pos, vec3 nor, vec3 rd, float height, float intensity, float id) {
        // Posición de la luz interna relativa al centro del cilindro
        vec3 lightDir = normalize(vec3(sin(iTime*2.0 + id*5.0)*0.3, 0.0, cos(iTime*1.5 + id*5.0)*0.3) - pos);
        
        // Color base de la luz (varía según el ID del objeto y el tiempo)
        vec3 innerColor;
        if (isDarkMode) {
            // Paleta de colores neón para tema oscuro
            vec3 color1 = vec3(1.0, 0.1, 0.3);  // Rojo neón
            vec3 color2 = vec3(0.1, 1.0, 0.8);  // Cyan neón
            vec3 color3 = vec3(0.8, 0.2, 1.0);  // Púrpura neón
            vec3 color4 = vec3(0.1, 0.8, 1.0);  // Azul neón
            vec3 color5 = vec3(1.0, 0.6, 0.1);  // Naranja neón
            
            // Usar el ID para seleccionar colores y mezclarlos suavemente
            float t = fract(id * 1.23 + iTime * 0.1);
            float blend = smoothstep(0.0, 1.0, fract(t * 5.0));
            
            if(t < 0.2) innerColor = mix(color1, color2, blend);
            else if(t < 0.4) innerColor = mix(color2, color3, blend);
            else if(t < 0.6) innerColor = mix(color3, color4, blend);
            else if(t < 0.8) innerColor = mix(color4, color5, blend);
            else innerColor = mix(color5, color1, blend);
        } else {
            // Paleta de colores pastel para tema claro
            vec3 color1 = vec3(1.0, 0.6, 0.6);  // Rosa pastel
            vec3 color2 = vec3(0.6, 0.9, 0.8);  // Menta pastel
            vec3 color3 = vec3(0.8, 0.7, 1.0);  // Lavanda pastel
            vec3 color4 = vec3(0.7, 0.8, 1.0);  // Azul pastel
            vec3 color5 = vec3(1.0, 0.8, 0.6);  // Melocotón pastel
            
            float t = fract(id * 1.23 + iTime * 0.05);
            float blend = smoothstep(0.0, 1.0, fract(t * 5.0));
            
            if(t < 0.2) innerColor = mix(color1, color2, blend);
            else if(t < 0.4) innerColor = mix(color2, color3, blend);
            else if(t < 0.6) innerColor = mix(color3, color4, blend);
            else if(t < 0.8) innerColor = mix(color4, color5, blend);
            else innerColor = mix(color5, color1, blend);
        }
        
        // Añadir pulsación suave al brillo
        float pulse = 0.8 + 0.2 * sin(iTime * 2.0 + id * 3.0);
        
        // Atenuación de la luz interna basada en altura y distancia
        float heightFactor = smoothstep(0.0, 1.0, height); // Más brillo en barras más altas
        float att = pow(heightFactor, 2.0) * intensity * pulse;
        
        // Combinar factores
        return innerColor * att * 1.5; // Aumentado el brillo general
      }

      vec3 doLighting(in vec3 col, in float ks,
                    in vec3 pos, in vec3 nor, in vec3 rd, float height, float id) {
        
        // Calcular iluminación exterior tradicional
        vec3 ldif = lpos - pos;
        float llen = length(ldif);
        ldif /= llen;
        float con = dot(light1, ldif);
        float occ = mix(clamp(pos.y/4.0, 0.0, 1.0), 1.0, 0.2*max(0.0,nor.y));
        vec2 sminmax = vec2(0.01, 5.0);

        float sha = softshadow(pos, ldif, sminmax.x, sminmax.y, 32.0);
        
        float bb = smoothstep(0.5, 0.8, con);
        float lkey = clamp(dot(nor,ldif), 0.0, 1.0);
        vec3 lkat = vec3(1.0);
              lkat *= vec3(bb*bb*0.5+0.5*bb,bb*0.6+0.4*bb*bb,bb*1.2).zyx;
              lkat /= 1.0+0.25*llen*llen;		
              lkat *= 30.0;
              lkat *= vec3(sha,0.6*sha+0.4*sha*sha,0.3*sha+0.7*sha*sha);
        
        float lbac = clamp(0.5 + 0.5*dot(light2, nor), 0.0, 1.0);
              lbac *= smoothstep(0.0, 0.8, con);
              lbac /= 1.0+0.2*llen*llen;		
              lbac *= 7.0;
        float lamb = 1.0 - 0.5*nor.y;
              lamb *= 1.0-smoothstep(10.0, 25.0, length(pos.xz));
              lamb *= 0.25 + 0.75*smoothstep(0.0, 0.8, con);
              lamb *= 0.25;

        // Iluminación externa base
        vec3 lin = 1.0*vec3(0.80,0.90,1.60)*lkey*lkat*(0.5+0.5*occ);
             lin += 1.0*vec3(0.15,0.20,0.40)*lamb*occ*occ;
             lin += 1.0*vec3(0.40,0.30,0.80)*lbac*occ*occ;
             lin *= vec3(1.1,1.2,1.4);
        
        // Factor fresnel para efecto de vidrio
        float fresnelFactor = fresnel(nor, -rd, 0.04);
        
        // Color base con textura de vidrio (más translúcido)
        vec3 baseCol = col * lin * (1.0 - GLASS_TRANSPARENCY);
        
        // Añadir reflejo especular externo
        vec3 hal = normalize(ldif-rd);
        vec3 spe = lkey*lkat*(0.5+0.5*occ)*5.0*
                   pow(clamp(dot(hal, nor),0.0,1.0), 6.0+6.0*ks) * 
                   (0.04+0.96*pow(clamp(1.0-dot(hal,ldif),0.0,1.0),5.0));
        
        // Luz interna
        vec3 innerLight = calculateInnerLight(pos, nor, rd, height, INNER_LIGHT_INTENSITY, id);
        
        // Combinar todos los elementos
        // Base de vidrio translúcido + brillo externo + luz interna
        col = baseCol + 
              (0.4+0.6*ks)*spe*vec3(0.7,0.8,1.2) * (1.0 + fresnelFactor) + 
              innerLight * GLASS_TRANSPARENCY;
              
        // Toque final para hacer el vidrio más brillante
        col = 1.6*col/(1.0+col);
        
        return col;
      }

      mat3 setLookAt(in vec3 ro, in vec3 ta, float cr) {
        vec3 cw = normalize(ta-ro);
        vec3 cp = vec3(sin(cr), cos(cr),0.0);
        vec3 cu = normalize(cross(cw,cp));
        vec3 cv = normalize(cross(cu,cw));
        return mat3(cu, cv, cw);
      }

      vec3 render(in vec3 ro, in vec3 rd) {
        vec3 col = vec3(0.0);

        vec2 tminmax = vec2(0.0, 40.0);

        tminmax = boundingVolume(tminmax, ro, rd);

        vec3 res = trace(ro, rd, tminmax.x, tminmax.y);
        if(res.y > -0.5) {
          float t = res.x;
          vec3 pos = ro + t*rd;
          vec3 nor = calcNormal(pos, t);

          // Obtener la altura actual de la barra (utilizada para iluminación interior)
          vec3 m = mapH(floor(pos.xz));
          float barHeight = m.x;

          // Base color según tema, más transparente para efecto de vidrio
          vec3 baseColor;
          if (isDarkMode) {
            // Tema oscuro: color base claro con alta transparencia
            baseColor = vec3(0.9, 0.9, 0.92);
          } else {
            // Tema claro: color base blanco puro con alta transparencia
            baseColor = vec3(1.0, 1.0, 1.0);
          }
          
          vec3 ff = vec3(0.5);
          col = baseColor * ff.x * GLASS_TRANSPARENCY;  // Reducir opacidad para efecto de vidrio

          // Pasar la altura y el ID para iluminación interior
          col = doLighting(col, ff.x*ff.x*ff.x*2.0, pos, nor, rd, barHeight, res.y);
          col *= 1.0 - smoothstep(20.0, 40.0, t);
        }
        return col;
      }

      void main() {
        freqs[0] = texture(iChannel0, vec2(0.01, 0.25)).x * FREQ_0_FACTOR;
        freqs[1] = texture(iChannel0, vec2(0.07, 0.25)).x * FREQ_1_FACTOR;
        freqs[2] = texture(iChannel0, vec2(0.15, 0.25)).x * FREQ_2_FACTOR;
        freqs[3] = texture(iChannel0, vec2(0.23, 0.25)).x * FREQ_3_FACTOR;
        freqs[4] = texture(iChannel0, vec2(0.33, 0.25)).x * FREQ_4_FACTOR;
        freqs[5] = texture(iChannel0, vec2(0.45, 0.25)).x * FREQ_5_FACTOR;
        freqs[6] = texture(iChannel0, vec2(0.60, 0.25)).x * FREQ_6_FACTOR;
        freqs[7] = texture(iChannel0, vec2(0.80, 0.25)).x * FREQ_7_FACTOR;

        float time = 5.0 + TIME_SPEED*iTime;
        
        vec2 fragCoord = gl_FragCoord.xy;
        vec2 off = vec2(0.0);
        vec2 xy = (-iResolution.xy + 2.0*(fragCoord+off)) / iResolution.y;

        vec3 ro = vec3(8.5*cos(0.2+.33*time), 5.0+2.0*cos(0.1*time), 8.5*sin(0.1+0.37*time));
        vec3 ta = vec3(-2.5+3.0*cos(1.2+.41*time), 0.0, 2.0+3.0*sin(2.0+0.38*time));
        float roll = 0.2*sin(0.1*time);

        mat3 ca = setLookAt(ro, ta, roll);
        vec3 rd = normalize(ca * vec3(xy.xy,1.75));
        
        vec3 col = render(ro, rd);
        col = pow(col, vec3(0.4545));
        
        // Ajustar tono general según el tema
        if (isDarkMode) {
          // Tema oscuro: más neón y vibrante, manteniendo transparencia
          col = pow(col, vec3(0.85, 0.75, 0.65));
          col *= vec3(0.7, 0.9, 1.4);
          // Añadir un toque de brillo extra para el efecto neón
          col += vec3(0.1, 0.05, 0.2) * pow(col, vec3(2.0));
        } else {
          // Tema claro: más cálido y brillante, manteniendo transparencia
          col = pow(col, vec3(0.8, 0.9, 1.0));
          col *= vec3(1.2, 1.1, 0.9);
        }

        vec2 q = fragCoord.xy/iResolution.xy;
        col *= 0.2 + 0.8*pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y), 0.1);

        gl_FragColor = vec4(col, 1.0);
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
    
    materialRef.current = material;
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const updateAudioData = () => {
      if (!analyserRef.current || !isAudioInitialized) {
        // Si no hay analizador, utilizamos datos simulados
        const frequencies = new Float32Array(8);
        const time = Date.now() * 0.001;
        
        // Crear patrones más complejos para la simulación
        const beat = Math.sin(time * 2.0) * 0.5 + 0.5;
        const pulse = Math.pow(Math.sin(time * 0.8) * 0.5 + 0.5, 3);
        const bump = Math.max(0, Math.sin(time * 1.2));
        
        // Crear un ritmo más interesante con diferentes patrones
        frequencies[0] = (Math.sin(time * 3.0) * 0.5 + 0.5) * 0.6 + pulse * 0.3;
        frequencies[1] = (Math.sin(time * 3.5 + 0.2) * 0.5 + 0.5) * 0.5 + bump * 0.3;
        frequencies[2] = (Math.sin(time * 4.2 + 0.4) * 0.5 + 0.5) * 0.45 + beat * 0.25;
        frequencies[3] = (Math.sin(time * 3.2 + 0.6) * 0.5 + 0.5) * 0.4 + pulse * 0.2;
        frequencies[4] = (Math.sin(time * 3.7 + 0.8) * 0.5 + 0.5) * 0.35 + bump * 0.2;
        frequencies[5] = (Math.sin(time * 4.2 + 1.0) * 0.5 + 0.5) * 0.3 + beat * 0.15;
        frequencies[6] = (Math.sin(time * 4.8 + 1.2) * 0.5 + 0.5) * 0.25 + pulse * 0.1;
        frequencies[7] = (Math.sin(time * 5.5 + 1.4) * 0.5 + 0.5) * 0.2 + bump * 0.1;
        
        audioTexture.image.data = frequencies;
        audioTexture.needsUpdate = true;
        return;
      }
      
      try {
        const frequencyData = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(frequencyData);
        
        const frequencies = new Float32Array(8);
        const binSize = Math.floor(frequencyData.length / 8);
        
        let lastFrequencies = new Array(8).fill(0);
        
        for (let i = 0; i < 8; i++) {
          let sum = 0;
          for (let j = 0; j < binSize; j++) {
            sum += frequencyData[i * binSize + j];
          }
          
          // Obtener el valor bruto
          const rawValue = (sum / (binSize * 255));
          
          // Aplicar un factor de amplificación para mayor movimiento
          const amplifiedValue = rawValue * 0.9;
          
          // Procesar los picos para mayor dinamismo
          const withPeaks = Math.pow(amplifiedValue, 0.7);
          
          // Almacenar el valor procesado
          frequencies[i] = withPeaks;
        }
        
        audioTexture.image.data = frequencies;
        audioTexture.needsUpdate = true;
      } catch (error) {
        console.error('Error al actualizar datos de audio:', error);
      }
    };
    
    const animate = (currentTime) => {
      if (currentTime - lastFrameTimeRef.current >= FRAME_TIME) {
        // Siempre actualizar datos de audio (reales o simulados)
        updateAudioData();
        
        uniforms.iTime.value = currentTime * 0.001;
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
      console.log('Limpiando recursos de Three.js...');
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', debouncedResize);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isAudioInitialized, isPlaying]);

  // Efecto para actualizar el uniform cuando cambia el tema
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.isDarkMode.value = theme === 'dark';
    }
  }, [theme]);

  // Método para reproducir o pausar el audio
  const handleClick = async () => {
    try {
      console.log('Clic detectado');
      
      // Verificar que el elemento de audio existe
      if (!nativeAudioRef.current) {
        console.error('No se encontró el elemento de audio');
        return;
      }
      
      // Verificar URL del audio
      const audioSrc = nativeAudioRef.current.src;
      console.log('Estado del audio:', nativeAudioRef.current.paused ? 'pausado' : 'reproduciendo');
      console.log('URL actual del audio:', audioSrc);
      
      // Si la URL no es correcta, corregirla
      if (!audioSrc || audioSrc === window.location.origin + '/' || !audioSrc.includes('beat3.mp3')) {
        const newSrc = `${window.location.origin}/sounds/beat3.mp3`;
        console.log('Corrigiendo URL del audio a:', newSrc);
        nativeAudioRef.current.src = newSrc;
      }
      
      // Reproducir o pausar el audio
      if (nativeAudioRef.current.paused) {
        try {
          // Asegurarnos de que el volumen está alto
          nativeAudioRef.current.volume = 1.0;
          console.log('Intentando reproducir audio...');
          
          // Si el audio no está listo, cargarlo primero
          if (nativeAudioRef.current.readyState < 2) {
            console.log('Audio no está listo, cargando...');
            await new Promise((resolve) => {
              nativeAudioRef.current.addEventListener('canplaythrough', resolve, { once: true });
              nativeAudioRef.current.load();
            });
          }
          
          // Inicializar el contexto de audio para visualización
          if (!isAudioInitialized) {
            try {
              await initAudioContext();
            } catch (e) {
              console.warn('No se pudo inicializar el contexto de audio, continuando sin él:', e);
            }
          }
          
          // Reproducir audio
          await nativeAudioRef.current.play();
          console.log('Audio reproduciendo correctamente');
          setIsPlaying(true);
        } catch (error) {
          console.error('Error al reproducir audio:', error);
          
          // Si falla por interacción del usuario, mostrar mensaje
          if (error.name === 'NotAllowedError') {
            console.warn('La reproducción automática está bloqueada. Se requiere interacción del usuario.');
            alert('Haz clic en el botón de reproducción para activar el audio');
          }
        }
      } else {
        console.log('Pausando audio...');
        nativeAudioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error general en handleClick:', error);
    }
  };

  return (
    <div className="relative w-full h-full overflow-visible">
      {/* Canvas para el shader */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ display: 'block' }}
      />
      
      {/* Control de reproducción - Botón/Icono fijo en la esquina inferior derecha */}
      <div 
        className="fixed bottom-6 right-6"
        style={{ zIndex: 50, pointerEvents: 'auto' }}
      >
        <button 
          className="w-14 h-14 flex items-center justify-center bg-black bg-opacity-70 text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
          onClick={handleClick}
          aria-label={isPlaying ? "Silenciar Música" : "Activar Música"}
          title={isPlaying ? "Silenciar Música" : "Activar Música"}
        >
          {isPlaying ? (
            // Icono de altavoz con sonido
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          ) : (
            // Icono de altavoz silenciado
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          )}
        </button>
      </div>
      
      {/* Audio oculto (pero funcional) */}
      <audio 
        ref={nativeAudioRef}
        id="music-shader-audio"
        className="hidden"
        src={`${window.location.origin}/sounds/beat3.mp3`}
        loop
        preload="auto"
        crossOrigin="anonymous"
      />
    </div>
  );
};

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

export default MusicShaderCanvas; 