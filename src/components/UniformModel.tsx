
import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial, Color, CanvasTexture, Object3D } from 'three';
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
  img.src = `/textures/${textureFile}`;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const color = hexToRGB(patternColor);

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] < 10 && data[i + 1] < 10 && data[i + 2] < 10 && data[i + 3] > 0) {
        data[i] = color.r;
        data[i + 1] = color.g;
        data[i + 2] = color.b;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const texture = new CanvasTexture(canvas);
    callback(texture);
  };
}

export const UniformModel = ({ currentView, customization }: UniformModelProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [patternTexture, setPatternTexture] = useState<CanvasTexture | null>(null);
  
  const modelType = customization.modelType || 'home';
  const modelPath = `/kits/${modelType}.glb`;
  
  // Load the GLB model
  const { scene } = useGLTF(modelPath);
  
  // Clone the scene to avoid sharing between instances
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Apply colors and patterns when customization changes
  useEffect(() => {
    if (!clonedScene) return;

    // Apply base color to the Body mesh
    clonedScene.traverse((child) => {
      if (child instanceof Mesh && child.name === "Body") {
        if (child.material instanceof MeshStandardMaterial) {
          child.material = child.material.clone();
          child.material.color.set(customization.baseColor);
          
          // Apply pattern if selected
          if (customization.pattern && customization.pattern !== 'solid' && customization.patternColor) {
            const patternFile = `${customization.pattern}.svg`;
            applyColoredPattern(patternFile, customization.patternColor, clonedScene, (texture) => {
              if (child.material instanceof MeshStandardMaterial) {
                child.material.map = texture;
                child.material.needsUpdate = true;
              }
            });
          } else {
            // Remove pattern if solid is selected
            child.material.map = null;
            child.material.needsUpdate = true;
          }
        }
      }
    });
  }, [clonedScene, customization.baseColor, customization.pattern, customization.patternColor]);

  // Add player number and name as text geometry or decals
  useEffect(() => {
    if (!clonedScene || !customization.playerNumber) return;

    // Create canvas for player number
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Clear canvas
    ctx.clearRect(0, 0, 512, 512);
    
    // Add player number
    if (customization.playerNumber) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 120px Arial';
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.strokeText(customization.playerNumber, 256, 300);
      ctx.fillText(customization.playerNumber, 256, 300);
    }
    
    // Add player name
    if (customization.playerName) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeText(customization.playerName.toUpperCase(), 256, 360);
      ctx.fillText(customization.playerName.toUpperCase(), 256, 360);
    }
    
    const numberTexture = new CanvasTexture(canvas);
    
    // Apply to number area or create a decal
    clonedScene.traverse((child) => {
      if (child instanceof Mesh && (child.name === "Number" || child.name === "Back")) {
        if (child.material instanceof MeshStandardMaterial) {
          child.material = child.material.clone();
          child.material.map = numberTexture;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, customization.playerNumber, customization.playerName]);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Position based on current view
  const position: [number, number, number] = useMemo(() => {
    switch (currentView) {
      case 'shirt':
        return [0, 0.5, 0];
      case 'shorts':
        return [0, -0.5, 0];
      case 'socks':
        return [0, -1.2, 0];
      default:
        return [0, 0, 0];
    }
  }, [currentView]);

  return (
    <group
      ref={meshRef}
      position={position}
      scale={[1, 1, 1]}
    >
      <primitive object={clonedScene} />
    </group>
  );
};

// Preload all models
useGLTF.preload('/kits/home.glb');
useGLTF.preload('/kits/away.glb');
useGLTF.preload('/kits/goalkeeper.glb');
