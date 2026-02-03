import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 250;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3 + (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.3 + (Math.random() - 0.5) * 0.2,
      radius: Math.random() * 2 + 0.5
    }));

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 10, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Update position with ambient movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges for continuous flow
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.vx -= (dx / distance) * force * 0.08;
          particle.vy -= (dy / distance) * force * 0.08;
        }

        // Apply gentle friction while maintaining ambient movement
        const baseSpeed = 0.15;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        // Restore minimal ambient movement
        if (Math.abs(particle.vx) < baseSpeed && distance > maxDistance) {
          particle.vx += (Math.random() - 0.5) * 0.02;
        }
        if (Math.abs(particle.vy) < baseSpeed && distance > maxDistance) {
          particle.vy += (Math.random() - 0.5) * 0.02;
        }

        // Draw particle with orange/yellow color scheme
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        // Create varied colors from orange to yellow
        const colorVariant = Math.sin(i * 0.5) * 0.5 + 0.5;
        const r = 255;
        const g = Math.floor(140 + colorVariant * 95); // 140-235
        const b = Math.floor(colorVariant * 60); // 0-60
        
        const alpha = distance < maxDistance ? 1 - (distance / maxDistance) * 0.3 : 0.7;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
        
        // Add glow effect for brighter particles
        if (particle.radius > 1.5) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Draw connections with orange/yellow theme
        particlesRef.current.forEach((otherParticle, j) => {
          if (i >= j) return;
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const connectionAlpha = (1 - distance2 / 120) * 0.15;
            ctx.strokeStyle = `rgba(255, 180, 40, ${connectionAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: 'linear-gradient(135deg, #0a0508 0%, #1a0f0a 30%, #0f0a05 60%, #050508 100%)'
      }}
    />
  );
};

export default ParticleBackground;
