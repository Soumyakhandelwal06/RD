"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FountainPen() {
  const groupRef = useRef<THREE.Group>(null);
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Setup procedural geometries
  const nibShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.06, 0);
    shape.quadraticCurveTo(0.08, 0.08, 0.06, 0.22);
    shape.lineTo(0.015, 0.42);
    shape.lineTo(0.001, 0.45);
    shape.lineTo(0, 0.45);
    shape.lineTo(-0.001, 0.45);
    shape.lineTo(-0.015, 0.42);
    shape.lineTo(-0.06, 0.22);
    shape.quadraticCurveTo(-0.08, 0.08, -0.06, 0);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.006,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.002,
      bevelSegments: 3,
    });
  }, []);

  const silverShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.03);
    shape.lineTo(0.042, 0.03);
    shape.quadraticCurveTo(0.056, 0.08, 0.04, 0.18);
    shape.lineTo(0.008, 0.38);
    shape.lineTo(0, 0.39);
    shape.lineTo(-0.008, 0.38);
    shape.lineTo(-0.04, 0.18);
    shape.quadraticCurveTo(-0.056, 0.08, -0.042, 0.03);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.004,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.001,
      bevelSegments: 2,
    });
  }, []);

  // Material settings for physical accuracy
  const lacquerMat = {
    color: "#0b0f19",
    metalness: 0.85,
    roughness: 0.08,
  };

  const goldMat = {
    color: "#d4af37",
    metalness: 0.9,
    roughness: 0.12,
  };

  const silverMat = {
    color: "#e2e8f0",
    metalness: 0.9,
    roughness: 0.1,
  };

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Connect GSAP ScrollTrigger once component is fully mounted in WebGL
  useEffect(() => {
    if (!mounted || !groupRef.current) return;

    let ctx: any = null;
    let cleanupGSAP = false;

    const initGSAP = async () => {
      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        if (cleanupGSAP || !groupRef.current) return;

        ctx = gsap.context(() => {
          // Sync GSAP timeline with page scrolling
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: "main",
              start: "top top",
              end: "bottom bottom",
              scrub: 1.5,
              invalidateOnRefresh: true,
              refreshPriority: -100, // Refresh last to calculate after other layout pin spacers
            },
          });

          // GSAP coordinates mapped to Three.js world space coordinates
          // Start: Right side (0%) -> Middle-right (25%) -> Center prominent (50%) -> Left side (75%) -> Bottom right (100%)
          
          tl.fromTo(
            groupRef.current!.position,
            {
              x: 2.2,
              y: 0.3,
              z: 0,
            },
            {
              x: 2.0,
              y: 0.1,
              z: 0.1,
              duration: 1,
              ease: "power1.inOut",
            }
          )
          .to(groupRef.current!.position, {
            x: 1.8,
            y: -0.4,
            z: 0.2, // Keep it on the right side, floating elegantly
            duration: 1,
            ease: "power1.inOut",
          })
          .to(groupRef.current!.position, {
            x: -2.0,
            y: 0.2,
            z: 0.1, // Slide to the left side
            duration: 1,
            ease: "power1.inOut",
          })
          .to(groupRef.current!.position, {
            x: 2.2,
            y: -1.2,
            z: -0.1, // Return to right side at the bottom
            duration: 1,
            ease: "power1.inOut",
          });

          // Sync 3D Rotation along with position path
          tl.fromTo(
            groupRef.current!.rotation,
            {
              x: 0.2,
              y: -0.4,
              z: Math.PI - 0.6,
            },
            {
              x: 0.3,
              y: Math.PI / 2,
              z: Math.PI - 0.3,
              duration: 1,
              ease: "power1.inOut",
            },
            0
          )
          .to(groupRef.current!.rotation, {
            x: 0.4,
            y: Math.PI,
            z: Math.PI + 0.8,
            duration: 1,
            ease: "power1.inOut",
          })
          .to(groupRef.current!.rotation, {
            x: 0.2,
            y: Math.PI * 1.5,
            z: Math.PI - 0.8,
            duration: 1,
            ease: "power1.inOut",
          })
          .to(groupRef.current!.rotation, {
            x: 0.1,
            y: Math.PI * 2,
            z: Math.PI - 0.4,
            duration: 1,
            ease: "power1.inOut",
          });

          // Sync Scale along with position path
          tl.fromTo(
            groupRef.current!.scale,
            {
              x: 0.8,
              y: 0.8,
              z: 0.8,
            },
            {
              x: 0.9,
              y: 0.9,
              z: 0.9,
              duration: 1,
              ease: "power1.inOut",
            },
            0
          )
          .to(groupRef.current!.scale, {
            x: 0.95,
            y: 0.95,
            z: 0.95,
            duration: 1,
            ease: "power1.inOut",
          })
          .to(groupRef.current!.scale, {
            x: 0.9,
            y: 0.9,
            z: 0.9,
            duration: 1,
            ease: "power1.inOut",
          })
          .to(groupRef.current!.scale, {
            x: 0.75,
            y: 0.75,
            z: 0.75,
            duration: 1,
            ease: "power1.inOut",
          });

        });
      } catch (e) {
        console.warn("GSAP ScrollTrigger failed to animate 3D pen overlay:", e);
      }
    };

    initGSAP();

    // Set up a ResizeObserver to automatically refresh ScrollTrigger on layout shift (e.g. horizontal scroll load)
    let resizeObserver: ResizeObserver | null = null;
    if (typeof window !== "undefined" && "ResizeObserver" in window && document.body) {
      resizeObserver = new ResizeObserver(() => {
        import("gsap/ScrollTrigger").then((m) => {
          m.ScrollTrigger.refresh();
        });
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      cleanupGSAP = true;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (ctx) ctx.revert();
    };
  }, [mounted]);

  // Subtle interactive floating animation in 3D using useFrame
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Hover drift effect (gentle wave)
    groupRef.current.position.y += Math.sin(t * 1.5) * 0.0006;
    // Interactive mouse tracking (small response to cursor coords from global mouseRef)
    groupRef.current.rotation.y += mouseRef.current.x * 0.005;
    groupRef.current.rotation.x += mouseRef.current.y * 0.005;
  });

  return (
    <group ref={groupRef}>
      {/* CAP (Posted on back) */}
      <mesh position={[0, -1.235, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.9, 32]} />
        <meshStandardMaterial {...lacquerMat} />
      </mesh>
      {/* Cap gold bands */}
      <mesh position={[0, -0.81, 0]}>
        <cylinderGeometry args={[0.132, 0.132, 0.05, 32]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      {/* Cap bottom gold cap */}
      <mesh position={[0, -1.645, 0]}>
        <cylinderGeometry args={[0.13, 0.06, 0.08, 32]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      <mesh position={[0, -1.685, 0]}>
        <sphereGeometry args={[0.06, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#000000" roughness={0.5} />
      </mesh>

      {/* BARREL (Main body) */}
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1.6, 32]} />
        <meshStandardMaterial {...lacquerMat} />
      </mesh>

      {/* BARREL TO GRIP GOLD RING */}
      <mesh position={[0, 0.815, 0]}>
        <cylinderGeometry args={[0.122, 0.122, 0.03, 32]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* GRIP SECTION */}
      <mesh position={[0, 1.015, 0]}>
        <cylinderGeometry args={[0.09, 0.12, 0.4, 32]} />
        <meshStandardMaterial {...lacquerMat} />
      </mesh>

      {/* GRIP TO NIB GOLD RING */}
      <mesh position={[0, 1.205, 0]}>
        <cylinderGeometry args={[0.092, 0.092, 0.02, 32]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* CAP CLIP */}
      {/* Clip Base */}
      <mesh position={[0, -0.9, 0.14]}>
        <boxGeometry args={[0.03, 0.04, 0.06]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      {/* Clip Bar */}
      <mesh position={[0, -1.15, 0.17]}>
        <boxGeometry args={[0.02, 0.5, 0.02]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      {/* Clip Ball End */}
      <mesh position={[0, -1.4, 0.17]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* NIB GROUP */}
      <group position={[0, 1.215, 0]}>
        {/* Outer Gold Nib */}
        <mesh geometry={nibShape} rotation={[0, 0, 0]} position={[0, 0, -0.003]}>
          <meshStandardMaterial {...goldMat} side={THREE.DoubleSide} />
        </mesh>
        {/* Inner Silver Inlay */}
        <mesh geometry={silverShape} rotation={[0, 0, 0]} position={[0, 0, 0.001]}>
          <meshStandardMaterial {...silverMat} side={THREE.DoubleSide} />
        </mesh>
        {/* Breather Hole (black circle cylinder) */}
        <mesh position={[0, 0.15, 0.004]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.001, 16]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
        {/* Nib Slit (thin black strip) */}
        <mesh position={[0, 0.31, 0.004]}>
          <boxGeometry args={[0.0015, 0.3, 0.001]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
      </group>

      {/* Subtle cyan rim glow — just a thin ring, not a filled disc */}
      <mesh position={[0, 0, -0.3]}>
        <ringGeometry args={[0.85, 1.05, 64]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function PenOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none z-30 select-none overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        {/* Luxury Lighting Setup */}
        <ambientLight intensity={0.5} />
        
        {/* Core Key Light */}
        <directionalLight position={[10, 10, 10]} intensity={1.8} color="#ffffff" />
        
        {/* Metallic Accent Highlight Lights */}
        <directionalLight position={[-10, 5, 5]} intensity={0.6} color="#ffffff" />
        {/* Orange back reflections */}
        <directionalLight position={[0, 5, -10]} intensity={0.8} color="#F97316" />
        {/* Cyan fill */}
        <pointLight position={[-4, -2, 3]} intensity={0.3} color="#06B6D4" />
        
        {/* Nib Spotlight */}
        <pointLight position={[2, 3, 2]} intensity={1.2} color="#ffffff" />

        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
          <FountainPen />
        </Float>
      </Canvas>
    </div>
  );
}
