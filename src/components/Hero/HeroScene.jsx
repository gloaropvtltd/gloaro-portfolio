"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

function BrandCore() {
  const group = useRef(null);
  const ring = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;

    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = pointer.current.y * 0.25;
      group.current.rotation.y +=
        (pointer.current.x * 0.3 - group.current.rotation.y * 0.02) * 0.02;
    }
    if (ring.current) {
      ring.current.rotation.z -= delta * 0.35;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.9}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color="#1a2c7a"
            wireframe
            emissive="#2b46b8"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
          {/* Radial segments kept at 64 (not 128+) — thin ring reads smooth at this size without the extra triangles */}
          <torusGeometry args={[2, 0.035, 16, 64]} />
          <meshStandardMaterial
            color="#f2a71b"
            emissive="#f2a71b"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

function CameraRig() {
  useFrame((state) => {
    const { pointer, camera } = state;
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Particles() {
  return (
    <Sparkles
      count={70}
      scale={[7, 5, 5]}
      size={2.4}
      speed={0.3}
      color="#f7be4d"
      opacity={0.6}
      noise={1}
    />
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#f2a71b" />
      <BrandCore />
      <Particles />
      <CameraRig />
    </Canvas>
  );
}
