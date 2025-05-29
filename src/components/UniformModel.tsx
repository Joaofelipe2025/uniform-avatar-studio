
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial, CanvasTexture, Object3D } from 'three';
import * as THREE from 'three';

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

function applyColoredPattern(
  textureFile: string,
  patternColor: string,
  model: Object3D,
  callback: (texture: CanvasTexture) => void
) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = `/textures/${textureFile}`;
  
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width || 512;
    canvas.height = img.height || 512;
    const ctx = canvas.getContext('2d')!;
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const color = hexToRGB(patternColor);
    
    // Replace black areas with the pattern color
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] < 10 && data[i + 1] < 10 && data[i + 2] < 10 && data[i + 3] > 0) {
        data[i] = color.r;
        data[i + 1] = color.g;
        data[i + 2] = color.b;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    const texture = new CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    
    callback(texture);
  };
  
  img.onerror = () => {
    console.warn(`Failed to load pattern: ${textureFile}`);
  };
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
        child.material = child.material.clone();
        child.material.color.set(options.baseColor);

        if (
          options.pattern &&
          options.pattern !== 'solid' &&
          options.patternColor
        ) {
          applyColoredPattern(
            `${options.pattern}.svg`,
            options.patternColor,
            model,
            (texture) => {
              child.material.map = texture;
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

export const UniformModel = ({ currentView, customization }: UniformModelProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/kits/home_3.glb');

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  useEffect(() => {
    if (scene) {
      const clonedScene = scene.clone();
      
      // Apply customization to all cloth meshes
      applyCustomization(clonedScene, {
        baseColor: customization.baseColor,
        pattern: customization.pattern,
        patternColor: customization.patternColor
      });
      
      // Clear previous children and add the customized model
      if (meshRef.current) {
        meshRef.current.clear();
        meshRef.current.add(clonedScene);
      }
    }
  }, [scene, customization.baseColor, customization.pattern, customization.patternColor]);

  return (
    <group
      ref={meshRef}
      scale={[1, 1, 1]}
      position={[0, 0, 0]}
    />
  );
};

// Preload the GLB model
useGLTF.preload('/kits/home_3.glb');
