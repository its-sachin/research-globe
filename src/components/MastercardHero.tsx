import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import './MastercardHero.css';
import MastercardProductBubbleEmitter, { type MastercardBubbleProduct } from './MastercardProductBubbleEmitter';
import { content } from '../content/content';
import { iconForKey } from '../content/iconRegistry';

export type MastercardHeroPosition = 'center' | 'left' | 'bottom-left' | 'center-focus' | 'center-mid';

interface MastercardHeroProps {
  position: MastercardHeroPosition;
  mode?: 'default' | 'products';
}

const HERO_CONTAINER_SIZE = 400;
const HERO_HALF = HERO_CONTAINER_SIZE / 2;
const HERO_MIN_LEFT_EDGE = 16;
const DESIRED_LEFT_SHIFT = -580;

const BASE_ANCHOR_TOP_PCT = 45;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const MastercardHero: React.FC<MastercardHeroProps> = ({ position, mode = 'default' }) => {
  const [viewport, setViewport] = useState<{ width: number; height: number }>(() => ({
    width: window.innerWidth,
    height: window.innerHeight
  }));

  useEffect(() => {
    const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const targetX = useMemo(() => {
    if (position === 'center' || position === 'center-focus' || position === 'center-mid') return 0;
    if (position === 'bottom-left') return 0; // No horizontal shift for bottom-left

    // Keep the hero from going off-screen on smaller widths.
    // Left edge when centered is (w/2 - HERO_HALF). After translating by x, left edge becomes:
    //   (w/2 - HERO_HALF) + x
    // Enforce >= HERO_MIN_LEFT_EDGE.
    const minX = HERO_MIN_LEFT_EDGE - (viewport.width / 2 - HERO_HALF);
    return clamp(DESIRED_LEFT_SHIFT, minX, 0);
  }, [position, viewport.width]);

  const anchorOffset = useMemo(() => {
    if (position === 'center-focus') {
      // Bring the logo closer to the true center of the viewport.
      // The base anchor is fixed via CSS at left: 38.5%, top: 25%.
      const x = viewport.width * (0.5 - 0.5);
      const y = viewport.height * (0.48 - 0.38);
      return { x, y };
    }

    if (position === 'center-mid') {
      // Center the hero in the viewport using the fixed CSS anchor as baseline.
      // mc-hero-anchor is positioned at left: 38.5%, top: 25%.
      const x = viewport.width * (0.5 - 0.5);
      const y = viewport.height * (0.48 - 0.38);
      return { x, y };
    }

    if (position !== 'bottom-left') return { x: 0, y: 0 };

    // Animate the hero's center point down to the bottom-left in a way that works
    // across viewports (and avoids CSS `top:auto`/`bottom` jumps).
    const desiredCenterX = 130;
    const desiredCenterY = clamp(viewport.height - 180, 140, viewport.height - 120);

    const baseCenterX = viewport.width / 2.03;
    const baseCenterY = (viewport.height * BASE_ANCHOR_TOP_PCT) / 115;

    return {
      x: desiredCenterX - baseCenterX,
      y: desiredCenterY - baseCenterY
    };
  }, [position, viewport.height, viewport.width]);

  const scale =
    position === 'bottom-left' ? 0.35 :
    position === 'center-focus' ? 0.86 :
    position === 'center-mid' ? 0.50 :
    1;

  const products = useMemo<MastercardBubbleProduct[]>(
    () =>
      content.products.map((p) => ({
        id: p.id,
        label: p.label,
        icon: iconForKey(p.iconKey)
      })),
    []
  );

  return (
    <motion.div
      className="mc-hero-anchor"
      animate={anchorOffset}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.div
        className="mc-hero"
        animate={{ x: targetX, scale }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="mc-hero-circle-container">
          <div className="mc-hero-circle-ring ring-1" />
          <div className="mc-hero-circle-ring ring-2" />
          <div className="mc-hero-circle-ring ring-3" />

          {mode === 'products' && <MastercardProductBubbleEmitter products={products} />}

          <motion.div
            className="mc-hero-circle"
            animate={{
              boxShadow: [
                '0 0 30px rgba(255, 170, 0, 0.25), inset 0 0 25px rgba(255, 170, 0, 0.05)',
                '0 0 40px rgba(255, 170, 0, 0.35), inset 0 0 35px rgba(255, 170, 0, 0.08)',
                '0 0 30px rgba(255, 170, 0, 0.25), inset 0 0 25px rgba(255, 170, 0, 0.05)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <img
              src="/assets/mc_logo.png"
              alt="Mastercard Logo"
              className="mc-hero-logo"
              draggable={false}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MastercardHero;
