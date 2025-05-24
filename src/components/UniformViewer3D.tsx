
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
    <div className="w-full h-full bg-gradient-to-br from-spized-gray to-white rounded-xl overflow-hidden shadow-2xl">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        className="cursor-grab active:cursor-grabbing"
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
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Loading overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300" id="loading-overlay">
        <div className="text-spized-blue font-semibold">Carregando modelo 3D...</div>
      </div>
    </div>
  );
};
