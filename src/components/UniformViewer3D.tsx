
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { UniformModel } from './UniformModel';

interface UniformViewer3DProps {
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

export const UniformViewer3D = ({ currentView, customization }: UniformViewer3DProps) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 relative">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        shadows
        className="cursor-grab active:cursor-grabbing w-full h-full"
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          position={[-5, 5, 5]}
          intensity={0.8}
          angle={0.3}
          penumbra={1}
          castShadow
        />
        
        <Suspense fallback={null}>
          <UniformModel 
            currentView={currentView}
            customization={customization}
          />
          <Environment preset="studio" />
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4}
          />
        </Suspense>
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.5}
          maxDistance={6}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          autoRotate={false}
          autoRotateSpeed={0.5}
          target={[0, 0, 0]}
        />
      </Canvas>
      
      {/* Loading overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300" id="loading-overlay">
        <div className="text-blue-600 font-semibold">Loading 3D Model...</div>
      </div>
    </div>
  );
};
