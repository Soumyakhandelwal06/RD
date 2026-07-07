"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Floating Books ─── */
function FloatingBook({
  position,
  color,
  rotation,
  speed,
}: {
  position: [number, number, number];
  color: string;
  rotation: [number, number, number];
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * speed) * 0.3;
    meshRef.current.rotation.z = rotation[2] + Math.cos(t * speed * 0.7) * 0.1;
    meshRef.current.position.y =
      position[1] + Math.sin(t * speed + position[0]) * 0.15;
  });

  return (
    <Float speed={speed} floatIntensity={0.3} rotationIntensity={0.1}>
      <group ref={meshRef} position={position} rotation={rotation}>
        {/* Book cover */}
        <mesh>
          <boxGeometry args={[0.5, 0.08, 0.35]} />
          <meshStandardMaterial
            color={color}
            metalness={0.1}
            roughness={0.7}
          />
        </mesh>
        {/* Book pages (white stripe) */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.44, 0.06, 0.33]} />
          <meshStandardMaterial color="#F5F0E8" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Sparkle Particles ─── */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 80;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      // Blue or Cyan particles
      if (Math.random() > 0.5) {
        // Primary Blue: #2563EB → rgb(37, 99, 235)
        col[i * 3] = 0.145; col[i * 3 + 1] = 0.388; col[i * 3 + 2] = 0.922;
      } else {
        // Accent Cyan: #06B6D4 → rgb(6, 182, 212)
        col[i * 3] = 0.024; col[i * 3 + 1] = 0.714; col[i * 3 + 2] = 0.831;
      }
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Main Scene ─── */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 4.5], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight
        position={[-3, 3, 4]}
        intensity={0.5}
        color="#F97316"
      />
      <pointLight position={[0, 3, 2]} intensity={0.4} color="#F97316" />
      <pointLight position={[0, -1, 3]} intensity={0.25} color="#06B6D4" />

      {/* Floating books around the scene */}
      <FloatingBook
        position={[-1.8, 0.5, 0.5]}
        color="#059669"
        rotation={[0.2, 0.5, 0.15]}
        speed={1.2}
      />
      <FloatingBook
        position={[1.9, 0.2, -0.3]}
        color="#1E293B"
        rotation={[-0.1, -0.4, -0.1]}
        speed={0.9}
      />

      <FloatingBook
        position={[1.4, 1.3, 0.8]}
        color="#2D456B"
        rotation={[-0.2, -0.6, 0.1]}
        speed={1.1}
      />

      <Particles />
    </Canvas>
  );
}
