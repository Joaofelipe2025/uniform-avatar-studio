
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial, BoxGeometry } from 'three';
import * as THREE from 'three';

interface UniformFallbackProps {
  customization: {
    baseColor: string;
    modelType?: string;
  };
}

export const UniformFallback = ({ customization }: UniformFallbackProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body (Shirt) */}
      <mesh position={[0, 0.5, 0]} name="Body">
        <boxGeometry args={[2, 2.5, 0.5]} />
        <meshStandardMaterial color={customization.baseColor} />
      </mesh>
      
      {/* Shorts */}
      <mesh position={[0, -1, 0]} name="Shorts">
        <boxGeometry args={[1.8, 1, 0.4]} />
        <meshStandardMaterial color={customization.baseColor} />
      </mesh>
      
      {/* Left Sock */}
      <mesh position={[-0.5, -2.2, 0]} name="LeftSock">
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshStandardMaterial color={customization.baseColor} />
      </mesh>
      
      {/* Right Sock */}
      <mesh position={[0.5, -2.2, 0]} name="RightSock">
        <boxGeometry args={[0.4, 1.5, 0.4]} />
        <meshStandardMaterial color={customization.baseColor} />
      </mesh>
      
      {/* Placeholder text indicating this is a fallback */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[3, 0.3, 0.1]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    </group>
  );
};
