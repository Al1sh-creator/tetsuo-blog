'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0005;
      groupRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FloatingCube key={i} position={[i * 4 - 8, Math.sin(i) * 3, -10 - i * 2]} />
      ))}
    </group>
  );
}

function FloatingCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
      meshRef.current.position.y += Math.sin(Date.now() * 0.001 + position[0]) * 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={hovered ? '#ff0080' : '#00ff41'}
        emissive={hovered ? '#ff0080' : '#00ff41'}
        emissiveIntensity={hovered ? 1 : 0.5}
        wireframe={false}
      />
    </mesh>
  );
}

function AnimatedGrid() {
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.z += 0.0003;
    }
  });

  const size = 30;
  const divisions = 20;
  const gridHelper = new THREE.GridHelper(size, divisions, 0x00d4ff, 0x333333);

  return (
    <primitive object={gridHelper} position={[0, -5, -15]} ref={lineRef} />
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);

  useFrame(() => {
    if (points.current) {
      const positionAttribute = points.current.geometry.getAttribute('position');
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.05;
        if (positions[i + 1] < -20) {
          positions[i + 1] = 20;
        }
      }
      positionAttribute.needsUpdate = true;
    }
  });

  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 40;
    positions[i + 1] = Math.random() * 40 - 20;
    positions[i + 2] = (Math.random() - 0.5) * 40;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.15} color={0x00ff41} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#0a0a0a']} />
        <FloatingCubes />
        <AnimatedGrid />
        <Particles />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
        <pointLight position={[-10, -10, 10]} intensity={0.8} color="#ff0080" />
      </Canvas>
    </div>
  );
}
