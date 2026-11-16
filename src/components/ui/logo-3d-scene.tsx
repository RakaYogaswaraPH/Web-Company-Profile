"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import logoData from "./logo-3d-data.json";

interface Logo3DSceneProps {
  className?: string;
}

export function Logo3DScene({ className = "" }: Logo3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [isInteracted, setIsInteracted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    const testCanvas = document.createElement("canvas");
    const gl =
      testCanvas.getContext("webgl") ||
      testCanvas.getContext("experimental-webgl");
    if (!gl) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Orbit Controls for smooth 360 drag interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;
    controls.enableZoom = false; // Prevent interfering with page scroll
    controls.enablePan = false;
    controls.minDistance = 12;
    controls.maxDistance = 25;

    const onStartInteraction = () => {
      setIsInteracted(true);
    };
    controls.addEventListener("start", onStartInteraction);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Main key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(12, 16, 14);
    scene.add(keyLight);

    // Soft red/warm fill light
    const fillLight = new THREE.DirectionalLight(0xffe0e0, 1.6);
    fillLight.position.set(-12, -6, -8);
    scene.add(fillLight);

    // Rim light from behind/top for edge definition
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(0, 12, -12);
    scene.add(rimLight);

    // Subtle specular point light for glossy reflection highlight
    const pointLight = new THREE.PointLight(0xff4455, 2.2, 35);
    pointLight.position.set(3, 5, 10);
    scene.add(pointLight);

    // Extruded 3D Brand Logo
    const pivot = new THREE.Group();
    const logoGroup = new THREE.Group();

    // High quality metallic/acrylic material with clearcoat gloss
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe11d48, // Brand ruby red
      roughness: 0.22,
      metalness: 0.35,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      reflectivity: 0.95,
    });

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 1.25,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.16,
      bevelThickness: 0.22,
    };

    (logoData as number[][][]).forEach((polygon) => {
      const shape = new THREE.Shape();
      polygon.forEach((pt, idx) => {
        if (idx === 0) shape.moveTo(pt[0], pt[1]);
        else shape.lineTo(pt[0], pt[1]);
      });
      shape.closePath();

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.computeVertexNormals();
      const mesh = new THREE.Mesh(geom, material);
      logoGroup.add(mesh);
    });

    // Perfectly center logo in its pivot
    const box = new THREE.Box3().setFromObject(logoGroup);
    const center = new THREE.Vector3();
    box.getCenter(center);
    logoGroup.position.set(-center.x, -center.y, -center.z);

    pivot.add(logoGroup);
    // Subtle natural isometric presentation angle
    pivot.rotation.x = 0.08;
    pivot.rotation.y = -0.25;
    scene.add(pivot);

    // Animation loop
    let animationFrameId: number;
    let isDisposed = false;

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width: newW, height: newH } = entries[0].contentRect;
      if (newW <= 0 || newH <= 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      controls.removeEventListener("start", onStartInteraction);
      controls.dispose();
      controlsRef.current = null;
      resizeObserver.disconnect();

      logoGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
        }
      });
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div
      className={`relative w-full h-[280px] sm:h-[320px] lg:h-[360px] flex items-center justify-center select-none ${className}`}
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="Klik dan geser untuk memutar logo 3D ke segala arah"
      />

      {/* Floating Interaction Hint Badge */}
      <div
        className={`pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/75 backdrop-blur-xs text-[10px] font-mono uppercase tracking-wider text-white shadow-sm transition-opacity duration-500 ${
          isInteracted ? "opacity-0" : "opacity-85 animate-pulse"
        }`}
      >
        <svg
          className="w-3.5 h-3.5 shrink-0 text-red-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
        <span>Geser untuk rotasi 3D</span>
      </div>

      {/* Reset button if interacted */}
      {isInteracted && (
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-2 right-2 p-1.5 rounded bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-300/60 shadow-xs text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
          title="Reset posisi tampilan 3D"
        >
          Reset View
        </button>
      )}
    </div>
  );
}
