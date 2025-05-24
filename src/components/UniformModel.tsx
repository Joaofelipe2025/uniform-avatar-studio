
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial, Color, CanvasTexture } from 'three';
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
  };
}

export const UniformModel = ({ currentView, customization }: UniformModelProps) => {
  const meshRef = useRef<Mesh>(null);
  
  // Create dynamic texture based on customization
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Base color
    ctx.fillStyle = customization.baseColor;
    ctx.fillRect(0, 0, 512, 512);
    
    // Apply pattern
    if (customization.pattern === 'stripes') {
      ctx.fillStyle = customization.accentColor;
      for (let i = 0; i < 512; i += 80) {
        ctx.fillRect(i, 0, 40, 512);
      }
    } else if (customization.pattern === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, 0, 512);
      gradient.addColorStop(0, customization.baseColor);
      gradient.addColorStop(1, customization.accentColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
    }
    
    // Add player number (large, centered)
    if (customization.playerNumber) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 120px Arial';
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.strokeText(customization.playerNumber, 256, 300);
      ctx.fillText(customization.playerNumber, 256, 300);
    }
    
    // Add player name (smaller, below number)
    if (customization.playerName) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeText(customization.playerName.toUpperCase(), 256, 360);
      ctx.fillText(customization.playerName.toUpperCase(), 256, 360);
    }
    
    return new CanvasTexture(canvas);
  }, [customization]);

  // Create geometry based on current view
  const geometry = useMemo(() => {
    switch (currentView) {
      case 'shirt':
        // Create a shirt-like geometry
        const shirtGeometry = new THREE.CylinderGeometry(0.8, 1.2, 2, 16);
        return shirtGeometry;
      case 'shorts':
        const shortsGeometry = new THREE.CylinderGeometry(1, 1.1, 1, 12);
        return shortsGeometry;
      case 'socks':
        const socksGeometry = new THREE.CylinderGeometry(0.3, 0.35, 1.5, 12);
        return socksGeometry;
      default:
        return new THREE.CylinderGeometry(0.8, 1.2, 2, 16);
    }
  }, [currentView]);

  const material = useMemo(() => {
    return new MeshStandardMaterial({
      map: texture,
      roughness: 0.7,
      metalness: 0.1,
    });
  }, [texture]);

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
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
      castShadow
      receiveShadow
    />
  );
};
