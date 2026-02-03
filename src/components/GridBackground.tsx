import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type GridBackgroundProps = {
  hidden?: boolean;
};

const GridBackground: React.FC<GridBackgroundProps> = ({ hidden = false }) => {
  const animationRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.style.opacity = hidden ? '0' : '1';
  }, [hidden]);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#030a13', 0.06);
    scene.background = new THREE.Color('#020409');

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.8, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.transition = 'opacity 220ms ease';
    canvas.style.opacity = hidden ? '0' : '1';
    canvasRef.current = canvas;
    document.body.appendChild(canvas);

    // Build a soft circular sprite so Three Points render as circles (not squares).
    const circleTexture = (() => {
      const s = 64;
      const c = document.createElement('canvas');
      c.width = s;
      c.height = s;
      const g = c.getContext('2d');
      if (!g) return null;

      const cx = s / 2;
      const cy = s / 2;
      const r = s / 2;
      const grad = g.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0.0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.18, 'rgba(255,255,255,1)');
      grad.addColorStop(0.55, 'rgba(255,255,255,0.22)');
      grad.addColorStop(1.0, 'rgba(255,255,255,0)');

      g.clearRect(0, 0, s, s);
      g.fillStyle = grad;
      g.beginPath();
      g.arc(cx, cy, r, 0, Math.PI * 2);
      g.fill();

      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      return tex;
    })();

    // Warm Mastercard-like palette (varied per-particle).
    const palette = [
      new THREE.Color('#ffb347'),
      new THREE.Color('#ff9a1f'),
      new THREE.Color('#ffd28a'),
      new THREE.Color('#ffe4b3'),
      new THREE.Color('#ffffff')
    ];

    type Layer = {
      particleCount: number;
      geometry: THREE.BufferGeometry;
      velocities: Float32Array;
      points: THREE.Points;
    };

    const makeLayer = (particleCount: number, size: number, opacity: number): Layer => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const colours = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const r = Math.random() * 12;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.cos(phi) * 0.6;
        const z = -Math.random() * 18;
        positions.set([x, y, z], i * 3);

        // Slightly different drift per layer.
        velocities.set([
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002,
          0.004 + Math.random() * 0.006,
        ], i * 3);

        const mix = Math.random();
        const a = palette[Math.floor(Math.random() * palette.length)];
        const b = palette[Math.floor(Math.random() * palette.length)];
        const c = a.clone().lerp(b, mix);
        colours.set([c.r, c.g, c.b], i * 3);
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colours, 3));

      const material = new THREE.PointsMaterial({
        size,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        map: circleTexture ?? undefined,
        alphaTest: 0.02,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      return { particleCount, geometry, velocities, points };
    };

    // Multiple layers = visible size variation while staying robust.
    const layers: Layer[] = [
      makeLayer(520, 0.035, 0.65),
      makeLayer(280, 0.060, 0.55),
      makeLayer(140, 0.095, 0.45)
    ];

    const mouse = new THREE.Vector2(999, 999);
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points!.threshold = 0.25;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const tick = () => {
      animationRef.current = requestAnimationFrame(tick);

      raycaster.setFromCamera(mouse, camera);

      for (const layer of layers) {
        const pos = layer.geometry.attributes.position as THREE.BufferAttribute;

        for (let i = 0; i < layer.particleCount; i++) {
          let x = pos.getX(i);
          let y = pos.getY(i);
          let z = pos.getZ(i);

          const vx = layer.velocities[i * 3];
          const vy = layer.velocities[i * 3 + 1];
          const vz = layer.velocities[i * 3 + 2];

          z += vz;
          x += vx;
          y += vy;

          if (z > 2) {
            z = -18;
            x = (Math.random() - 0.5) * 14;
            y = Math.random() * 6 - 2;
          }

          pos.setXYZ(i, x, y, z);
        }

        pos.needsUpdate = true;
        layer.points.rotation.y += 0.0004;
      }

      renderer.render(scene, camera);
    };

    tick();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);

      for (const layer of layers) {
        layer.geometry.dispose();
        (layer.points.material as THREE.Material).dispose();
        scene.remove(layer.points);
      }

      circleTexture?.dispose();
      renderer.dispose();
      document.body.removeChild(canvas);
      canvasRef.current = null;
    };
  }, []);

  return null;
};

export default GridBackground;
