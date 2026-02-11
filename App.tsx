import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Loader } from '@react-three/drei';
import { EarthScene } from './components/EarthScene';
import { UIOverlay } from './components/UIOverlay';

// Placeholder component shown while textures load
const EarthFallback = () => (
  <mesh>
    <sphereGeometry args={[1, 16, 16]} />
    <meshBasicMaterial color="purple" wireframe />
  </mesh>
);

const App: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-black">
      {/* UI Overlay */}
      <UIOverlay />

      {/* 3D Scene */}
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={0.2} color="#ffffff" />
        <directionalLight position={[5, 3, 5]} intensity={3} castShadow />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#4444ff" />

        {/* Stars render immediately, independent of Earth textures */}
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Earth loads with a fallback wireframe */}
        <Suspense fallback={<EarthFallback />}>
          <EarthScene />
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={1.5} 
          maxDistance={10} 
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Loading overlay */}
      <Loader 
        containerStyles={{ background: 'rgba(0,0,0,0.8)' }}
        innerStyles={{ width: '50vw' }}
        barStyles={{ background: '#3b82f6' }}
        dataStyles={{ color: 'white', fontSize: '1rem', fontFamily: 'monospace' }} 
      />
    </div>
  );
};

export default App;