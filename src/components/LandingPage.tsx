import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './LandingPage.css';
import { content } from '../content/content';

interface BackgroundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
  hue: number;
}

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const copy = content.pages.landing;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<BackgroundParticle[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Clear immediately after resizing
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Slight upward bias so the particle band sits above dead center.
    // Keep this responsive (vh-capped) so it scales across screen sizes.
    const centerYOffset = () => -Math.min(56, canvas.height * 0.055);
    const getCenterY = () => canvas.height / 2 + centerYOffset();

    // Clear canvas immediately on mount
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pre-populate particles on page load
    const initialParticleCount = 150;
    const PARTICLE_BASE_SPEED = 0.9;
    const PARTICLE_SPEED_VARIANCE = 0.6;
    const PARTICLE_MAX_LIFE_BASE = 1800;
    const PARTICLE_MAX_LIFE_VARIANCE = 400;
    
    for (let i = 0; i < initialParticleCount; i++) {
      const startX = Math.random() * canvas.width;
      const startY = getCenterY() + (Math.random() - 0.5) * 300;
      
      const hueChoice = Math.random() > 0.5 ? 0 : 35; // Red or Yellow
      
      particlesRef.current.push({
        x: startX,
        y: startY,
        vx: PARTICLE_BASE_SPEED + Math.random() * PARTICLE_SPEED_VARIANCE,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 2.5 + 1.2,
        life: Math.random() * 150, // Randomize life to spread them out
        maxLife: PARTICLE_MAX_LIFE_BASE + Math.random() * PARTICLE_MAX_LIFE_VARIANCE,
        hue: hueChoice
      });
    }

    // Animation loop with background particle flow
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 0.01;

      // Spawn new particles more frequently
      if (Math.random() > 0.65) {
        const startX = -50;
        const startY = getCenterY() + (Math.random() - 0.5) * 300;
        
        const hueChoice = Math.random() > 0.5 ? 0 : 35; // Red or Yellow
        
        particlesRef.current.push({
          x: startX,
          y: startY,
          vx: PARTICLE_BASE_SPEED + Math.random() * PARTICLE_SPEED_VARIANCE,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 2.5 + 1.2,
          life: 0,
          maxLife: PARTICLE_MAX_LIFE_BASE + Math.random() * PARTICLE_MAX_LIFE_VARIANCE,
          hue: hueChoice
        });
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life += 1;

        // Update position with slight curve
        particle.x += particle.vx;
        particle.y += particle.vy + Math.sin(timeRef.current + particle.x * 0.01) * 0.06;

        // Fade in and out
        const fadeInDuration = 30;
        const fadeOutDuration = 60;
        let alpha = 1;

        if (particle.life < fadeInDuration) {
          alpha = particle.life / fadeInDuration;
        } else if (particle.life > particle.maxLife - fadeOutDuration) {
          alpha = (particle.maxLife - particle.life) / fadeOutDuration;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

        const saturation = 70 + Math.random() * 30;
        const lightness = 45 + Math.random() * 20;

        ctx.fillStyle = `hsla(${particle.hue}, ${saturation}%, ${lightness}%, ${alpha * 0.6})`;
        ctx.fill();

        // Glow effect
        ctx.strokeStyle = `hsla(${particle.hue}, ${saturation}%, ${lightness}%, ${alpha * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        return particle.life < particle.maxLife && particle.x < canvas.width + 200;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="landing-page">
      <canvas ref={canvasRef} className="landing-particles" />

      <div className="landing-content">
        <div className="landing-hero-spacer" aria-hidden="true" />

        {/* Text and button */}
        <motion.div
          className="landing-text-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.h1
            className="landing-welcome-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {copy.welcomeTitle?.text ?? 'Welcome'}
          </motion.h1>

          <motion.p
            className="landing-subtitle landing-subtitle--hidden"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {copy.welcomeSubtitle?.text ?? ''}
          </motion.p>

          <motion.button
            className="landing-start-button"
            onClick={onStart}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="button-text">{copy.startButton?.text ?? 'Start'}</span>
            <span className="button-arrow">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingPage;
