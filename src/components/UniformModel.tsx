
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Object3D } from 'three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { centerAndScaleModel } from '@/utils/modelUtils';
import { applyPatternToModel } from '@/utils/pattern';

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

export const UniformModel = ({ currentView, customization }: UniformModelProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [glbModel, setGLBModel] = useState<Object3D | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
              centerAndScaleModel(gltf.scene);
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
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load GLB model:', error);
        setIsLoading(false);
      }
    };

    loadGLB();
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  // Apply patterns and colors whenever they change
  useEffect(() => {
    if (!meshRef.current || !glbModel || isLoading) return;

    meshRef.current.clear();
    
    const clonedScene = glbModel.clone();
    
    // Apply pattern using the updated utility function
    applyPatternToModel(clonedScene, customization);
    
    meshRef.current.add(clonedScene);
  }, [glbModel, isLoading, customization.pattern, customization.patternColor]);

  if (isLoading) {
    return null;
  }

  return (
    <group
      ref={meshRef}
      scale={[1, 1, 1]}
      position={[0, 0, 0]}
    />
  );
};
