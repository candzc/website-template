import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { HeroAnimationConfig } from '../types';

interface ThreeHeroCanvasProps {
  config: HeroAnimationConfig;
  onMouseStatsUpdate?: (x: number, y: number, fps: number) => void;
}

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({ config, onMouseStatsUpdate }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const [fps, setFps] = useState(60);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xFBFBFD, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Lights setup for Apple White/Noble aesthetic
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, config.lightIntensity * 2.5);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0fe, 1.0);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);

    // Rim light reacting to mouse
    const rimLight = new THREE.PointLight(0xffffff, 2.0, 15);
    rimLight.position.set(0, 0, 3);
    scene.add(rimLight);

    // Generate Geometry based on Shape Preset
    function createMainGeometry(preset: string): THREE.BufferGeometry {
      switch (preset) {
        case 'ribbon-helix': {
          const geom = new THREE.TorusKnotGeometry(1.6, 0.45, 128, 32, 2, 3);
          return geom;
        }
        case 'quantum-torus': {
          const geom = new THREE.TorusGeometry(1.7, 0.5, 64, 128);
          return geom;
        }
        case 'monolith-morph': {
          const geom = new THREE.BoxGeometry(2.4, 2.4, 1.0, 64, 64, 32);
          return geom;
        }
        case 'lattice-sphere': {
          const geom = new THREE.IcosahedronGeometry(1.8, 8);
          return geom;
        }
        case 'organic-flow':
        default: {
          const geom = new THREE.IcosahedronGeometry(1.9, 12);
          return geom;
        }
      }
    }

    let geometry = createMainGeometry(config.shapePreset);

    // Store initial positions for organic vertex displacement
    const posAttribute = geometry.attributes.position;
    const initialPositions = posAttribute.array.slice() as Float32Array;

    // Create Material based on Preset & Colors
    function createMainMaterial(cfg: HeroAnimationConfig): THREE.Material {
      const getBaseColor = (palette: string) => {
        switch (palette) {
          case 'champagne-gold': return new THREE.Color(0xf6f0e6);
          case 'nordic-sky': return new THREE.Color(0xebf3fa);
          case 'silver-titanium': return new THREE.Color(0xe1e1e6);
          case 'white-alabaster':
          default: return new THREE.Color(0xffffff);
        }
      };

      const baseColor = getBaseColor(cfg.colorPalette);

      switch (cfg.materialPreset) {
        case 'satin-silver':
          return new THREE.MeshStandardMaterial({
            color: baseColor,
            metalness: 0.85,
            roughness: 0.2,
            wireframe: cfg.wireframe,
          });

        case 'pearl-glass':
          return new THREE.MeshPhysicalMaterial({
            color: baseColor,
            metalness: 0.1,
            roughness: 0.15,
            transmission: 0.85,
            ior: 1.45,
            thickness: 1.2,
            specularIntensity: 1.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            wireframe: cfg.wireframe,
          });

        case 'opal-iridescent':
          return new THREE.MeshPhysicalMaterial({
            color: baseColor,
            metalness: 0.2,
            roughness: 0.1,
            iridescence: 0.9,
            iridescenceIOR: 1.3,
            clearcoat: 1.0,
            reflectivity: 0.9,
            wireframe: cfg.wireframe,
          });

        case 'obsidian-titanium':
          return new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x222226),
            metalness: 0.9,
            roughness: 0.25,
            wireframe: cfg.wireframe,
          });

        case 'liquid-ceramic':
        default:
          return new THREE.MeshPhysicalMaterial({
            color: baseColor,
            metalness: 0.05,
            roughness: 0.08,
            clearcoat: 1.0,
            clearcoatRoughness: 0.02,
            reflectivity: 0.95,
            sheen: 0.5,
            sheenColor: new THREE.Color(0xffffff),
            wireframe: cfg.wireframe,
          });
      }
    }

    const material = createMainMaterial(config);

    // Main Mesh Creation
    const mainMesh = new THREE.Mesh(geometry, material);
    mainMesh.castShadow = true;
    mainMesh.receiveShadow = true;
    scene.add(mainMesh);

    // Two Smaller Satellite Spheres floating in orbit
    const orb1Geo = new THREE.IcosahedronGeometry(0.65, 8);
    const orb1Positions = orb1Geo.attributes.position.array.slice() as Float32Array;
    const orb1Mesh = new THREE.Mesh(orb1Geo, material);
    orb1Mesh.castShadow = true;
    orb1Mesh.receiveShadow = true;
    scene.add(orb1Mesh);

    const orb2Geo = new THREE.IcosahedronGeometry(0.45, 8);
    const orb2Positions = orb2Geo.attributes.position.array.slice() as Float32Array;
    const orb2Mesh = new THREE.Mesh(orb2Geo, material);
    orb2Mesh.castShadow = true;
    orb2Mesh.receiveShadow = true;
    scene.add(orb2Mesh);

    // Inner wireframe lattice for technological precision accent
    let latticeMesh: THREE.LineSegments | null = null;
    if (config.showGridLines) {
      const wireGeo = new THREE.WireframeGeometry(geometry);
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x86868B,
        transparent: true,
        opacity: 0.12,
      });
      latticeMesh = new THREE.LineSegments(wireGeo, wireMat);
      latticeMesh.scale.setScalar(1.02);
      scene.add(latticeMesh);
    }

    // Floating Orbital Tech Precision Rings
    const ringGroup = new THREE.Group();
    if (config.showPrecisionNodes) {
      const ringGeo1 = new THREE.RingGeometry(2.6, 2.61, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x1D1D1F,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.12,
      });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat);
      ring1.rotation.x = Math.PI / 2.2;
      ring1.rotation.y = Math.PI / 8;
      ringGroup.add(ring1);

      const ringGeo2 = new THREE.RingGeometry(3.1, 3.11, 96);
      const ring2 = new THREE.Mesh(ringGeo2, ringMat);
      ring2.rotation.x = Math.PI / 3.5;
      ring2.rotation.y = -Math.PI / 6;
      ringGroup.add(ring2);

      // Precision Satellite Nodes
      const nodeGeo = new THREE.SphereGeometry(0.04, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x1D1D1F });

      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(Math.cos(angle) * 2.6, Math.sin(angle) * 2.6, 0);
        ring1.add(node);
      }

      scene.add(ringGroup);
    }

    // Floating Dust Particles
    const particleCount = Math.floor(config.particleDensity * 120);
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xa0a0a5,
      size: 0.035,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Mouse Interaction Event Listeners
    const handlePointerMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      mousePosRef.current.targetX = x;
      mousePosRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime() * config.speed;

      // Calculate FPS
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(currentFps);
        frameCount = 0;
        lastTime = currentTime;
      }

      // Smooth mouse lerping
      const mouse = mousePosRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (onMouseStatsUpdate) {
        onMouseStatsUpdate(mouse.x, mouse.y, fps);
      }

      // Position rim light based on cursor
      rimLight.position.x = mouse.x * 4;
      rimLight.position.y = mouse.y * 4;

      // Rotate Main Mesh
      mainMesh.rotation.y = elapsedTime * 0.25 + mouse.x * 0.4;
      mainMesh.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2 - mouse.y * 0.3;

      if (latticeMesh) {
        latticeMesh.rotation.y = mainMesh.rotation.y;
        latticeMesh.rotation.x = mainMesh.rotation.x;
      }

      if (ringGroup) {
        ringGroup.rotation.z = elapsedTime * 0.08;
        ringGroup.rotation.y = Math.sin(elapsedTime * 0.1) * 0.2;
      }

      // Orbit and rotate Satellite Orb 1 (upper-left/floating)
      const orb1Radius = 3.0;
      const orb1Angle = elapsedTime * 0.4;
      orb1Mesh.position.x = Math.cos(orb1Angle) * orb1Radius + mouse.x * 0.8;
      orb1Mesh.position.y = Math.sin(orb1Angle * 0.8) * 1.2 + Math.cos(elapsedTime * 0.5) * 0.4 - mouse.y * 0.5;
      orb1Mesh.position.z = Math.sin(orb1Angle) * 1.5;
      orb1Mesh.rotation.y = elapsedTime * 0.6;
      orb1Mesh.rotation.x = elapsedTime * 0.3;

      // Orbit and rotate Satellite Orb 2 (lower-right/floating)
      const orb2Radius = 3.4;
      const orb2Angle = elapsedTime * 0.3 + Math.PI;
      orb2Mesh.position.x = Math.cos(orb2Angle) * orb2Radius - mouse.x * 0.6;
      orb2Mesh.position.y = Math.sin(orb2Angle * 0.7) * 1.5 + Math.sin(elapsedTime * 0.4) * 0.5 + mouse.y * 0.4;
      orb2Mesh.position.z = Math.cos(orb2Angle) * 1.2;
      orb2Mesh.rotation.y = -elapsedTime * 0.5;
      orb2Mesh.rotation.z = elapsedTime * 0.2;

      // Deform Vertices dynamically for smooth organic fluid motion of Main Mesh
      const currentPos = mainMesh.geometry.attributes.position;
      const count = currentPos.count;

      const mouseForce = config.interactiveMouseForce;
      const amp = config.flowAmplitude * 0.25;

      for (let i = 0; i < count; i++) {
        const ix = initialPositions[i * 3];
        const iy = initialPositions[i * 3 + 1];
        const iz = initialPositions[i * 3 + 2];

        // 3D Sine/Cos wave combinations simulating 3D fluid noise
        const wave1 = Math.sin(ix * 1.5 + elapsedTime * 2.0) * Math.cos(iy * 1.5 + elapsedTime * 1.8);
        const wave2 = Math.cos(iz * 2.0 + elapsedTime * 1.4) * Math.sin(ix * 1.2 + elapsedTime * 2.2);

        // Distance to cursor force
        const distToMouse = Math.sqrt((ix - mouse.x * 2) ** 2 + (iy - mouse.y * 2) ** 2);
        const mouseDeform = Math.sin(distToMouse * 3.0 - elapsedTime * 3.0) * Math.exp(-distToMouse) * mouseForce * 0.15;

        const totalDisplacement = 1.0 + (wave1 + wave2) * amp + mouseDeform;

        currentPos.setXYZ(i, ix * totalDisplacement, iy * totalDisplacement, iz * totalDisplacement);
      }

      currentPos.needsUpdate = true;
      mainMesh.geometry.computeVertexNormals();

      // Deform Vertices for Orb 1
      const orb1Pos = orb1Mesh.geometry.attributes.position;
      for (let i = 0; i < orb1Pos.count; i++) {
        const ix = orb1Positions[i * 3];
        const iy = orb1Positions[i * 3 + 1];
        const iz = orb1Positions[i * 3 + 2];
        const wave = Math.sin(ix * 2.0 + elapsedTime * 2.5) * Math.cos(iy * 2.0 + elapsedTime * 2.0);
        const disp = 1.0 + wave * amp * 0.8;
        orb1Pos.setXYZ(i, ix * disp, iy * disp, iz * disp);
      }
      orb1Pos.needsUpdate = true;
      orb1Mesh.geometry.computeVertexNormals();

      // Deform Vertices for Orb 2
      const orb2Pos = orb2Mesh.geometry.attributes.position;
      for (let i = 0; i < orb2Pos.count; i++) {
        const ix = orb2Positions[i * 3];
        const iy = orb2Positions[i * 3 + 1];
        const iz = orb2Positions[i * 3 + 2];
        const wave = Math.cos(iz * 2.2 + elapsedTime * 2.2) * Math.sin(ix * 2.2 + elapsedTime * 2.8);
        const disp = 1.0 + wave * amp * 0.9;
        orb2Pos.setXYZ(i, ix * disp, iy * disp, iz * disp);
      }
      orb2Pos.needsUpdate = true;
      orb2Mesh.geometry.computeVertexNormals();

      // Slow drift for particles
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount or re-config
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [config]);

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Subtle Apple Radial Light Gradient Backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8)_0%,rgba(251,251,253,0.3)_60%,rgba(245,245,247,0.95)_100%)]" />

      {/* Tech Precision Grid overlay */}
      {config.showGridLines && (
        <div className="absolute inset-0 subtle-grid-bg opacity-30 pointer-events-none" />
      )}
    </div>
  );
};
