import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, DoubleSide, AdditiveBlending } from 'three';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Reliable textures from Three.js examples repository
const TEXTURES = {
  map: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
  specular: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
  normal: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
  clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
};

export const EarthScene: React.FC = () => {
  const earthRef = useRef<Mesh>(null);
  const cloudsRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);

  // useTexture is easier to handle than raw TextureLoader
  const [colorMap, specularMap, normalMap, cloudsMap] = useTexture([
    TEXTURES.map,
    TEXTURES.specular,
    TEXTURES.normal,
    TEXTURES.clouds
  ]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Rotate earth slowly (if not handled by OrbitControls autoRotate)
    if (earthRef.current) {
        // earthRef.current.rotation.y = elapsedTime * 0.02; 
    }

    // Independent cloud rotation
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = elapsedTime * 0.05;
    }
    
    // Atmosphere pulse
    if (atmosphereRef.current) {
        atmosphereRef.current.scale.setScalar(1.2 + Math.sin(elapsedTime * 0.5) * 0.005);
    }
  });

  return (
    <group>
      {/* Earth Surface */}
      <mesh ref={earthRef} rotation={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          specularMap={specularMap}
          normalMap={normalMap}
          specular={new THREE.Color(0x333333)}
          shininess={5}
        />
      </mesh>

      {/* Clouds Layer */}
      <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.8}
          blending={AdditiveBlending}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh ref={atmosphereRef} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
            blending={AdditiveBlending}
            side={THREE.BackSide}
            transparent={true}
            uniforms={{
                c: { value: 0.1 },
                p: { value: 3.0 },
                glowColor: { value: new THREE.Color(0x3b82f6) },
                viewVector: { value: new THREE.Vector3(0, 0, 2.5) }
            }}
            vertexShader={`
                uniform vec3 viewVector;
                uniform float c;
                uniform float p;
                varying float intensity;
                void main() 
                {
                    vec3 vNormal = normalize( normalMatrix * normal );
                    vec3 vNormel = normalize( normalMatrix * viewVector );
                    intensity = pow( c - dot(vNormal, vNormel), p );
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }
            `}
            fragmentShader={`
                uniform vec3 glowColor;
                varying float intensity;
                void main() 
                {
                    vec3 glow = glowColor * intensity;
                    gl_FragColor = vec4( glow, 1.0 );
                }
            `}
        />
      </mesh>
    </group>
  );
};