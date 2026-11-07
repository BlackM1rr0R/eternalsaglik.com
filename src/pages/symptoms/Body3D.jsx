// Soft-lit, rotatable 3D body map for the symptom guide.
// Original stylised figure built only from three.js primitives (capsules / spheres).
// Lazy-loaded from ./index.jsx so three.js is only downloaded on this page.
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";

// ---------------------------------------------------------------------------
// Figure definition. type: "c" = capsule [radius, length], "s" = sphere [radius].
// Positions are in figure space (feet at about y = -2.2, top of head at y = 1.76).
// ---------------------------------------------------------------------------
const armParts = (side) => {
  const s = side; // -1 left, +1 right
  const rz = s * 0.16;
  // Parts are placed along a slightly splayed arm axis that starts at the shoulder.
  const along = (d) => [s * 0.6 + Math.sin(rz) * d, 0.88 - Math.cos(rz) * d, 0];
  return [
    { type: "s", args: [0.15], pos: along(0), rot: [0, 0, rz] },
    { type: "c", args: [0.12, 0.5], pos: along(0.36), rot: [0, 0, rz] },
    { type: "c", args: [0.105, 0.46], pos: along(0.96), rot: [0, 0, rz] },
    { type: "s", args: [0.12], pos: along(1.36), rot: [0, 0, rz], scale: [0.8, 1.15, 0.55] },
  ];
};

const legParts = (side) => {
  const s = side;
  return [
    { type: "c", args: [0.165, 0.58], pos: [s * 0.2, -0.9, 0], rot: [0, 0, s * 0.03] },
    { type: "c", args: [0.13, 0.6], pos: [s * 0.22, -1.68, 0], rot: [0, 0, s * 0.02] },
    { type: "c", args: [0.1, 0.18], pos: [s * 0.23, -2.12, 0.1], rot: [Math.PI / 2, 0, 0], scale: [1.1, 1, 0.8] },
  ];
};

const PARTS = {
  head: [
    { type: "s", args: [0.34], pos: [0, 1.42, 0], scale: [0.92, 1.05, 0.98] },
    { type: "c", args: [0.12, 0.16], pos: [0, 1.04, 0] },
  ],
  chest: [{ type: "c", args: [0.42, 0.34], pos: [0, 0.6, 0], scale: [1.18, 1, 0.68] }],
  belly: [
    { type: "c", args: [0.36, 0.22], pos: [0, 0.06, 0], scale: [1.12, 1, 0.7] },
    { type: "s", args: [0.38], pos: [0, -0.32, 0], scale: [1.12, 0.72, 0.74] },
  ],
  arms: [...armParts(-1), ...armParts(1)],
  legs: [...legParts(-1), ...legParts(1)],
};
const BODY_IDS = Object.keys(PARTS);
const ALL_PARTS = BODY_IDS.flatMap((id) => PARTS[id]);

const PALETTE = {
  light: {
    base: "#cdeee5", dim: "#e2ebe9", hover: "#a7e0d3", active: "#33a593",
    glow: "#33a593", halo: "#b9a8fb", sheen: "#c3b5fb", shadow: "#1a7066",
  },
  dark: {
    base: "#5fa89d", dim: "#3f5f5b", hover: "#79c4b7", active: "#5dbfae",
    glow: "#5dbfae", halo: "#9381ee", sheen: "#9381ee", shadow: "#000000",
  },
};

// Shared geometries (cached per shape so halo and body reuse them).
const geoCache = new Map();
const getGeometry = (type, args) => {
  const key = `${type}:${args.join(",")}`;
  if (!geoCache.has(key)) {
    geoCache.set(key, type === "c"
      ? new THREE.CapsuleGeometry(args[0], args[1], 10, 24)
      : new THREE.SphereGeometry(args[0], 32, 24));
  }
  return geoCache.get(key);
};

const Part = ({ part, material, grow = 0 }) => {
  const args = grow ? [part.args[0] + grow, ...part.args.slice(1)] : part.args;
  return (
    <mesh
      geometry={getGeometry(part.type, args)}
      material={material}
      position={part.pos}
      rotation={part.rot || [0, 0, 0]}
      scale={part.scale || [1, 1, 1]}
    />
  );
};

const setCursor = (gl, value) => {
  gl.domElement.style.cursor = value;
};

// One clickable region: shares a single material that is eased toward its target state each frame.
const Region = ({ id, active, hovered, setHovered, onSelect, colors }) => {
  const { gl } = useThree();
  const material = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: colors.base, roughness: 0.62, metalness: 0, clearcoat: 0.25, clearcoatRoughness: 0.6,
      sheen: 0.6, sheenRoughness: 0.8, sheenColor: new THREE.Color(colors.sheen),
      emissive: new THREE.Color(colors.glow), emissiveIntensity: 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => { material.sheenColor.set(colors.sheen); material.emissive.set(colors.glow); }, [colors, material]);

  const target = useMemo(() => new THREE.Color(), []);
  useFrame(({ clock }, delta) => {
    const isActive = active === id;
    const dimmed = active && active !== id && active !== "skin";
    const isHover = hovered === id;
    target.set(isActive ? colors.active : isHover ? colors.hover : dimmed ? colors.dim : colors.base);
    const k = 1 - Math.exp(-delta * 8);
    material.color.lerp(target, k);
    const glow = isActive ? 0.28 + 0.14 * Math.sin(clock.elapsedTime * 2.6) : isHover ? 0.22 : 0;
    material.emissiveIntensity += (glow - material.emissiveIntensity) * k;
  });

  return (
    <group
      onPointerOver={(e) => { e.stopPropagation(); setHovered(id); setCursor(gl, "pointer"); }}
      onPointerOut={() => { setHovered((h) => (h === id ? null : h)); setCursor(gl, ""); }}
      onClick={(e) => { e.stopPropagation(); if (e.delta <= 6) onSelect(id); }}
    >
      {PARTS[id].map((p, i) => <Part key={i} part={p} material={material} />)}
    </group>
  );
};

// "skin": a soft lavender halo shell around the whole figure. BackSide shells are only hit by the
// raycaster at the silhouette edge, so tapping the outline selects skin while the body stays clickable.
const Halo = ({ active, hovered, setHovered, onSelect, colors }) => {
  const { gl } = useThree();
  const material = useMemo(
    () => new THREE.MeshBasicMaterial({
      color: colors.halo, side: THREE.BackSide, transparent: true, opacity: 0.16, depthWrite: true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => { material.color.set(colors.halo); }, [colors, material]);

  useFrame(({ clock }, delta) => {
    const isActive = active === "skin";
    const goal = isActive ? 0.55 + 0.15 * Math.sin(clock.elapsedTime * 2.2) : hovered === "skin" ? 0.4 : 0.16;
    material.opacity += (goal - material.opacity) * (1 - Math.exp(-delta * 8));
  });

  return (
    <group
      onPointerOver={(e) => { e.stopPropagation(); setHovered("skin"); setCursor(gl, "pointer"); }}
      onPointerOut={() => { setHovered((h) => (h === "skin" ? null : h)); setCursor(gl, ""); }}
      onClick={(e) => { e.stopPropagation(); if (e.delta <= 6) onSelect("skin"); }}
    >
      {ALL_PARTS.map((p, i) => <Part key={i} part={p} material={material} grow={0.075} />)}
    </group>
  );
};

const Figure = ({ active, onSelect, onHover, colors }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(null);
  useEffect(() => { onHover?.(hovered); }, [hovered, onHover]);

  // Subtle idle "breathing".
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const b = Math.sin(clock.elapsedTime * 1.5);
    ref.current.scale.set(1 + b * 0.008, 1 + b * 0.005, 1 + b * 0.012);
  });

  const shared = { active, hovered, setHovered, onSelect, colors };
  return (
    <group ref={ref} position={[0, 0.22, 0]}>
      {BODY_IDS.map((id) => <Region key={id} id={id} {...shared} />)}
      <Halo {...shared} />
    </group>
  );
};

// Stop auto-rotate on first interaction; let vertical page scroll through on touch (pan-y),
// horizontal drags still rotate the figure.
const Controls = ({ autoRotate }) => {
  const { gl } = useThree();
  const [spinning, setSpinning] = useState(autoRotate);
  useEffect(() => {
    gl.domElement.style.touchAction = "pan-y";
  });
  return (
    <OrbitControls
      makeDefault
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.7}
      autoRotate={spinning}
      autoRotateSpeed={0.9}
      minPolarAngle={Math.PI / 2 - 0.38}
      maxPolarAngle={Math.PI / 2 + 0.22}
      target={[0, 0, 0]}
      onStart={() => setSpinning(false)}
    />
  );
};

const Body3D = ({ active, onSelect, onHover, dark = false, onFail }) => {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const colors = dark ? PALETTE.dark : PALETTE.light;

  // Render only while on screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.35, 7.4], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => { e.preventDefault(); onFail?.(); }, { once: true });
        }}
        onPointerMissed={() => onHover?.(null)}
      >
        <hemisphereLight args={[dark ? "#c9d6ff" : "#ffffff", dark ? "#0d2b28" : "#bfe6dc", dark ? 0.55 : 0.75]} />
        <directionalLight
          position={[-3, 5, 4]}
          intensity={dark ? 1.4 : 1.6}
        />
        <directionalLight position={[3, 2.5, -4]} intensity={0.8} color={colors.sheen} />
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={1.6} position={[0, 4, 3]} scale={[6, 3, 1]} />
          <Lightformer form="rect" intensity={0.9} color="#dcf3ee" position={[-4, 1, 1]} rotation-y={Math.PI / 2} scale={[4, 4, 1]} />
          <Lightformer form="rect" intensity={0.7} color="#ebe5ff" position={[4, 1, -1]} rotation-y={-Math.PI / 2} scale={[4, 4, 1]} />
        </Environment>
        <Figure active={active} onSelect={onSelect} onHover={onHover} colors={colors} />
        <ContactShadows
          position={[0, -2.0, 0]}
          opacity={dark ? 0.55 : 0.32}
          scale={4}
          blur={2.6}
          far={2.5}
          resolution={256}
          frames={1}
          color={colors.shadow}
        />
        <Controls autoRotate />
      </Canvas>
    </div>
  );
};

export default Body3D;
