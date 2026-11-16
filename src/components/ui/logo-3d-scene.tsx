"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import logoData from "./logo-3d-data.json";

interface Logo3DSceneProps {
  className?: string;
}

export function Logo3DScene({ className = "" }: Logo3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 400;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 22);

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
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;
    controls.enableZoom = false; // Prevent interfering with page scroll
    controls.enablePan = false;
    controls.minDistance = 16;
    controls.maxDistance = 28;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Main key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(12, 16, 14);
    scene.add(keyLight);

    // Soft warm fill light
    const fillLight = new THREE.DirectionalLight(0xffe2e2, 1.5);
    fillLight.position.set(-12, -6, -8);
    scene.add(fillLight);

    // Rim light from behind/top for edge definition
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(0, 12, -12);
    scene.add(rimLight);

    // Subtle point light for reflection highlights
    const pointLight = new THREE.PointLight(0xff3344, 1.8, 30);
    pointLight.position.set(2, 4, 9);
    scene.add(pointLight);

    // Extruded 3D Brand Logo
    const pivot = new THREE.Group();
    const logoGroup = new THREE.Group();

    // Clean physical material with smooth clearcoat
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe11d48, // Brand ruby red
      roughness: 0.28,
      metalness: 0.25,
      clearcoat: 0.75,
      clearcoatRoughness: 0.15,
      reflectivity: 0.85,
    });

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 1.1,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.12,
      bevelThickness: 0.14,
    };

    (logoData as number[][][]).forEach((polygon) => {
      const shape = new THREE.Shape();
      polygon.forEach((pt, idx) => {
        if (idx === 0) shape.moveTo(pt[0], pt[1]);
        else shape.lineTo(pt[0], pt[1]);
      });
      shape.closePath();

      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mesh = new THREE.Mesh(geom, material);
      logoGroup.add(mesh);
    });

    // Perfectly center logo in its pivot
    const box = new THREE.Box3().setFromObject(logoGroup);
    const center = new THREE.Vector3();
    box.getCenter(center);
    logoGroup.position.set(-center.x, -center.y, -center.z);

    pivot.add(logoGroup);
    // Scale slightly so 3D model never clips boundaries when rotated at any angle
    pivot.scale.set(0.85, 0.85, 0.85);
    // Subtle initial isometric presentation angle
    pivot.rotation.x = 0.08;
    pivot.rotation.y = -0.22;
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
      controls.dispose();
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

  return (
    <div
      className={`relative w-full h-[360px] sm:h-[420px] lg:h-[460px] xl:h-[480px] flex items-center justify-center select-none ${className}`}
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />
    </div>
  );
}
