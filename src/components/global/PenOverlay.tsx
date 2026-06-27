"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ─────────────────────────────────────────────────────────────────────────────
   MATERIALS
   metalness ≤ 0.85 — shows albedo from direct lights, no HDR required
───────────────────────────────────────────────────────────────────────────── */
const LACQUER: React.ComponentProps<"meshPhysicalMaterial"> = {
  color: "#10131F",
  metalness: 0.3,
  roughness: 0.08,
  clearcoat: 1.0,
  clearcoatRoughness: 0.06,
};

const GOLD: React.ComponentProps<"meshPhysicalMaterial"> = {
  color: "#D4A843",
  metalness: 0.85,
  roughness: 0.15,
};

const SILVER: React.ComponentProps<"meshPhysicalMaterial"> = {
  color: "#C8D4E8",
  metalness: 0.8,
  roughness: 0.12,
};

const ENDCAP: React.ComponentProps<"meshPhysicalMaterial"> = {
  color: "#080A12",
  metalness: 0.25,
  roughness: 0.4,
};

/* ─────────────────────────────────────────────────────────────────────────────
   PEN MODEL
   ─────────────────────────────────────────────────────────────────────────────
   Group hierarchy
   ─────────────────────────────────────────────────────────────────────────────
     posRef   → scroll-scrubbed X position (always within viewport)
     spinRef  → scroll-linked Y rotation (reverses on scroll-up)
     tiltGrp  → fixed 25° tilt (rotation.z = 0.44 rad)
───────────────────────────────────────────────────────────────────────────── */
function PenModel() {
  const posRef  = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  /**
   * All animation state lives in refs → zero React re-renders → 60 FPS.
   *
   * rawProgress   = window.scrollY / (page height - viewport height)
   *               = a direct 0 → 1 value that goes UP on scroll-down and
   *                 DOWN on scroll-up. No accumulation. No looping.
   *
   * smoothProgress = lerped version of rawProgress for buttery easing.
   *
   * targetRotY    = rawProgress × (4π)  → 2 full rotations end-to-end,
   *                 reverses naturally when the user scrolls back up.
   * smoothRotY    = lerped rotation.
   */
  const sc = useRef({
    rawProgress:    0,
    smoothProgress: 0,
    targetRotY:     0,
    smoothRotY:     0,
  });

  /* ── Geometry (built once) ──────────────────────────────────────────────── */
  const nibGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.072, 0);
    shape.quadraticCurveTo(0.092, 0.115, 0.062, 0.29);
    shape.lineTo(0.011, 0.51);
    shape.lineTo(0, 0.545);
    shape.lineTo(-0.011, 0.51);
    shape.lineTo(-0.062, 0.29);
    shape.quadraticCurveTo(-0.092, 0.115, -0.072, 0);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.007,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.002,
      bevelSegments: 4,
    });
  }, []);

  const nibInlayGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.02);
    shape.lineTo(0.048, 0.02);
    shape.quadraticCurveTo(0.065, 0.12, 0.044, 0.27);
    shape.lineTo(0.008, 0.46);
    shape.lineTo(0, 0.49);
    shape.lineTo(-0.008, 0.46);
    shape.lineTo(-0.044, 0.27);
    shape.quadraticCurveTo(-0.065, 0.12, -0.048, 0.02);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.005,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.001,
      bevelSegments: 3,
    });
  }, []);

  /* ── Scroll listener ────────────────────────────────────────────────────── */
  useEffect(() => {
    const read = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const ref         = sc.current;
      const p           = window.scrollY / maxScroll;       // 0 → 1, bidirectional
      ref.rawProgress   = p;
      ref.targetRotY    = p * Math.PI * 4;                  // 2 full spins, reverses on scroll-up
    };

    read(); // seed on mount
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, []);

  /* ── useFrame: GPU-synced, 60 FPS ──────────────────────────────────────── */
  useFrame((state) => {
    if (!posRef.current || !spinRef.current) return;

    const ref = sc.current;

    /* Ease toward targets — factor 0.08 gives Apple-style scrub easing */
    ref.smoothProgress = lerp(ref.smoothProgress, ref.rawProgress, 0.08);
    ref.smoothRotY     = lerp(ref.smoothRotY,     ref.targetRotY,  0.08);

    const p = ref.smoothProgress; // 0 → 1

    /*
     * Visible-area X boundaries
     * ─────────────────────────
     * Derived from the real camera frustum so they adapt to every screen
     * width (16:9, 21:9, 32:9 …).
     *
     * factor 0.82 → pen centre sits ~18 % inside the screen edge,
     * which gives visually ~10 % margin from the viewport boundary
     * once the pen geometry extent (~8 % of halfW) is accounted for.
     */
    const cam   = state.camera as THREE.PerspectiveCamera;
    const halfW = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2))
                * Math.abs(cam.position.z)
                * (state.size.width / state.size.height);

    const rightX = halfW * 0.65;   // pen start — slightly left of right edge
    const leftX  = -halfW * 0.82;  // pen end   — left  of screen

    /*
     * Position
     * ─────────
     * Directly mapped from scroll progress — NO auto-movement, NO looping.
     * Scrolling down  (p ↑) → tX decreases → pen moves left.
     * Scrolling up    (p ↓) → tX increases → pen moves right.
     */
    const tX = lerp(rightX, leftX, p);
    posRef.current.position.x = tX;

    /* Subtle organic vertical float (clock-based, unrelated to scroll) */
    posRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.05;

    /*
     * Rotation
     * ─────────
     * Tied to scroll progress — reverses naturally on scroll-up.
     * 4π total = 2 full revolutions from top to bottom of the page.
     */
    spinRef.current.rotation.y = ref.smoothRotY;
  });

  /* ── Pen JSX ────────────────────────────────────────────────────────────── */
  return (
    <group ref={posRef}>
      <group ref={spinRef}>
        {/* Fixed 25° tilt from vertical, nib facing down (Math.PI flip on X) */}
        <group rotation={[Math.PI, 0, 0.44]} scale={0.84}>

          {/* ══ NIB SECTION ════════════════════════════════════════════════ */}

          {/* Tapered nib collar */}
          <mesh position={[0, 1.68, 0]}>
            <cylinderGeometry args={[0.066, 0.086, 0.38, 48]} />
            <meshPhysicalMaterial {...LACQUER} />
          </mesh>

          {/* Gold nib plate */}
          <mesh geometry={nibGeo} position={[0, 1.9, -0.004]}>
            <meshPhysicalMaterial {...GOLD} side={THREE.DoubleSide} />
          </mesh>

          {/* Silver inlay */}
          <mesh geometry={nibInlayGeo} position={[0, 1.9, 0.002]}>
            <meshPhysicalMaterial {...SILVER} side={THREE.DoubleSide} />
          </mesh>

          {/* Nib slit */}
          <mesh position={[0, 2.11, 0.006]}>
            <boxGeometry args={[0.002, 0.28, 0.001]} />
            <meshBasicMaterial color="#020305" />
          </mesh>

          {/* Breather hole */}
          <mesh position={[0, 2.01, 0.006]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.013, 0.013, 0.001, 20]} />
            <meshBasicMaterial color="#020305" />
          </mesh>

          {/* Barrel–nib gold ring */}
          <mesh position={[0, 1.50, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.04, 48]} />
            <meshPhysicalMaterial {...GOLD} />
          </mesh>

          {/* ══ BARREL ═════════════════════════════════════════════════════ */}
          <mesh position={[0, 0.46, 0]}>
            <cylinderGeometry args={[0.116, 0.116, 2.06, 64]} />
            <meshPhysicalMaterial {...LACQUER} />
          </mesh>

          {/* ══ CAP JUNCTION ═══════════════════════════════════════════════ */}
          <mesh position={[0, -0.56, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.05, 48]} />
            <meshPhysicalMaterial {...GOLD} />
          </mesh>

          {/* ══ CAP ════════════════════════════════════════════════════════ */}
          <mesh position={[0, -1.28, 0]}>
            <cylinderGeometry args={[0.124, 0.124, 1.44, 64]} />
            <meshPhysicalMaterial {...LACQUER} />
          </mesh>

          {/* Cap top gold band */}
          <mesh position={[0, -0.62, 0]}>
            <cylinderGeometry args={[0.127, 0.127, 0.07, 48]} />
            <meshPhysicalMaterial {...GOLD} />
          </mesh>

          {/* Cap taper */}
          <mesh position={[0, -1.97, 0]}>
            <cylinderGeometry args={[0.124, 0.058, 0.1, 48]} />
            <meshPhysicalMaterial {...GOLD} />
          </mesh>

          {/* Finial */}
          <mesh position={[0, -2.018, 0]} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry
              args={[0.058, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2]}
            />
            <meshPhysicalMaterial {...ENDCAP} />
          </mesh>

          {/* ══ CAP CLIP ═══════════════════════════════════════════════════ */}
          <mesh position={[0, -0.68, 0.138]}>
            <sphereGeometry args={[0.023, 20, 20]} />
            <meshPhysicalMaterial {...GOLD} />
          </mesh>
          <mesh position={[0, -1.40, 0.152]}>
            <boxGeometry args={[0.021, 1.42, 0.018]} />
            <meshPhysicalMaterial {...GOLD} />
          </mesh>
          <mesh position={[0, -2.00, 0.152]}>
            <sphereGeometry args={[0.026, 20, 20]} />
            <meshPhysicalMaterial {...GOLD} />
          </mesh>

        </group>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   EXPORT
───────────────────────────────────────────────────────────────────────────── */
export default function PenOverlay() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div
      className="hidden lg:block fixed inset-0 pointer-events-none z-30 select-none overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        {/* ── Cinematic manual lighting (no HDR / Environment) ───────────── */}

        {/* Warm window key — upper-left, cream-orange */}
        <directionalLight position={[-5, 8,  6]} intensity={3.5} color="#FFE4C0" />

        {/* Cool fill — right-side, blue-white */}
        <directionalLight position={[ 7, 1,  4]} intensity={1.2} color="#C8DAFF" />

        {/* Rim / separation — from behind */}
        <directionalLight position={[ 0, 5, -8]} intensity={1.4} color="#FFF0E0" />

        {/* Top barrel highlight */}
        <directionalLight position={[ 0, 10, 2]} intensity={0.9} color="#FFFFFF" />

        {/* Warm under-bounce */}
        <pointLight position={[0, -4, 3]} intensity={0.6} color="#FFD580" />

        {/* Soft ambient */}
        <ambientLight intensity={0.35} color="#D0DEFF" />

        <PenModel />
      </Canvas>
    </div>
  );
}
