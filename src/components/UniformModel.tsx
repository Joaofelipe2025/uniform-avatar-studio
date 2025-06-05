
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial, Object3D, BoxGeometry, CylinderGeometry } from 'three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface UniformModelProps {
  currentView: string;
  customization: {
    baseColor: string;
    accentColor: string;
    pattern: string;
    playerName: string;
    playerNumber: string;
    logoUrl?: string;
    modelType?: string;
    patternColor?: string;
  };
}

function hexToRGB(hex: string) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function applyPatternTexture(
  patternName: string,
  patternColor: string,
  model: Object3D,
  callback: (texture: THREE.Texture) => void
) {
  if (patternName === 'solid') {
    callback(null);
    return;
  }

  const textureLoader = new THREE.TextureLoader();
  
  // Carrega a textura diretamente
  textureLoader.load(
    `/textures/${patternName}.svg`,
    (texture) => {
      // Configurar wrapping e repetição
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      
      // Aplicar coloração se necessário
      if (patternColor && patternColor !== '#ffffff') {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          canvas.width = img.width || 512;
          canvas.height = img.height || 512;
          
          // Desenhar a imagem original
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Aplicar coloração
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          const color = hexToRGB(patternColor);
          
          // Substituir áreas escuras pela cor do padrão
          for (let i = 0; i < data.length; i += 4) {
            if (data[i] < 10 && data[i + 1] < 10 && data[i + 2] < 10 && data[i + 3] > 0) {
              data[i] = color.r;
              data[i + 1] = color.g;
              data[i + 2] = color.b;
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          // Criar nova textura do canvas
          const coloredTexture = new THREE.CanvasTexture(canvas);
          coloredTexture.wrapS = THREE.RepeatWrapping;
          coloredTexture.wrapT = THREE.RepeatWrapping;
          coloredTexture.repeat.set(2, 2);
          
          callback(coloredTexture);
        };
        
        img.src = `/textures/${patternName}.svg`;
      } else {
        callback(texture);
      }
    },
    undefined,
    (error) => {
      console.warn(`Failed to load pattern: ${patternName}`, error);
      callback(null);
    }
  );
}

function applyCustomization(
  model: Object3D,
  options: {
    baseColor: string;
    pattern: string;
    patternColor?: string;
  }
) {
  model.traverse((child) => {
    if (child instanceof Mesh && child.name.startsWith("Cloth_mesh")) {
      if (child.material instanceof MeshStandardMaterial) {
        // Clonar o material para não afetar outros objetos
        child.material = child.material.clone();
        child.material.color.set(options.baseColor);

        // Aplicar textura de padrão se não for sólido
        if (options.pattern && options.pattern !== 'solid' && options.patternColor) {
          applyPatternTexture(
            options.pattern,
            options.patternColor,
            model,
            (texture) => {
              if (texture) {
                child.material.map = texture;
              } else {
                child.material.map = null;
              }
              child.material.needsUpdate = true;
            }
          );
        } else {
          child.material.map = null;
          child.material.needsUpdate = true;
        }
      }
    }
  });
}

// Create a fallback uniform model using basic geometry
function createFallbackUniform(baseColor: string) {
  const group = new THREE.Group();
  
  // Create shirt (cylinder)
  const shirtGeometry = new CylinderGeometry(0.8, 1.2, 1.5, 8);
  const shirtMaterial = new MeshStandardMaterial({ color: baseColor });
  const shirt = new Mesh(shirtGeometry, shirtMaterial);
  shirt.name = "Cloth_mesh_shirt";
  shirt.position.set(0, 0.5, 0);
  
  // Create shorts (cylinder)
  const shortsGeometry = new CylinderGeometry(1.0, 1.0, 0.8, 8);
  const shortsMaterial = new MeshStandardMaterial({ color: baseColor });
  const shorts = new Mesh(shortsGeometry, shortsMaterial);
  shorts.name = "Cloth_mesh_shorts";
  shorts.position.set(0, -0.8, 0);
  
  group.add(shirt);
  group.add(shorts);
  
  return group;
}

export const UniformModel = ({ currentView, customization }: UniformModelProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [useGLBModel, setUseGLBModel] = useState(true);
  const [glbModel, setGLBModel] = useState<Object3D | null>(null);

  // Try to load GLB model with error handling
  useEffect(() => {
    const loadGLB = async () => {
      try {
        console.log('Attempting to load GLB model from /kits/home.glb');
        const { scene } = await new Promise<{ scene: Object3D }>((resolve, reject) => {
          const loader = new GLTFLoader();
          loader.load(
            '/kits/home.glb',
            (gltf) => {
              console.log('GLB model loaded successfully:', gltf);
              
              // Configurar escala e posicionamento adequados
              gltf.scene.scale.set(1.2, 1.2, 1.2);
              gltf.scene.position.set(0, -0.5, 0);
              
              // Centralizar o modelo baseado em sua bounding box
              const box = new THREE.Box3().setFromObject(gltf.scene);
              const center = box.getCenter(new THREE.Vector3());
              gltf.scene.position.x = -center.x;
              gltf.scene.position.y = -center.y + 0.2; // Pequeno ajuste vertical
              gltf.scene.position.z = -center.z;
              
              resolve({ scene: gltf.scene });
            },
            (progress) => {
              console.log('Loading progress:', progress);
            },
            (error) => {
              console.error('GLB loading error:', error);
              reject(error);
            }
          );
        });
        
        setGLBModel(scene);
        setUseGLBModel(true);
      } catch (error) {
        console.error('Failed to load GLB model, using fallback:', error);
        setUseGLBModel(false);
        setGLBModel(null);
      }
    };

    loadGLB();
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  useEffect(() => {
    if (!meshRef.current) return;

    // Clear previous children
    meshRef.current.clear();

    if (useGLBModel && glbModel) {
      // Use GLB model
      const clonedScene = glbModel.clone();
      
      // Apply customization to all cloth meshes
      applyCustomization(clonedScene, {
        baseColor: customization.baseColor,
        pattern: customization.pattern,
        patternColor: customization.patternColor
      });
      
      meshRef.current.add(clonedScene);
    } else {
      // Use fallback model
      const fallbackModel = createFallbackUniform(customization.baseColor);
      
      // Apply customization to fallback model
      applyCustomization(fallbackModel, {
        baseColor: customization.baseColor,
        pattern: customization.pattern,
        patternColor: customization.patternColor
      });
      
      meshRef.current.add(fallbackModel);
    }
  }, [glbModel, useGLBModel, customization.baseColor, customization.pattern, customization.patternColor]);

  return (
    <group
      ref={meshRef}
      scale={[1, 1, 1]}
      position={[0, 0, 0]}
    />
  );
};
