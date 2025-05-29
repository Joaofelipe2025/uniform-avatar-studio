
import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial, CanvasTexture } from 'three';
import * as THREE from 'three';
import { UniformFallback } from './UniformFallback';

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

export const UniformModel = ({ currentView, customization }: UniformModelProps) => {
  const meshRef = useRef<THREE.Group>(null);

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
      {/* Using fallback component until GLB files are available */}
      <UniformFallback customization={customization} />
      
      {/* Info text */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[4, 0.5, 0.1]} />
        <meshStandardMaterial color="#4A90E2" />
      </mesh>
    </group>
  );
};
