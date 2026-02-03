import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './MastercardProductBubbleEmitter.css';

export type MastercardBubbleProduct = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type BubbleConfig = {
  id: string;
  productIndex: number;
  duration: number;
  delay: number;
  radius: number;
  baseAngleDeg: number;
  curveDeg: number;
  size: number;
};

function arcKeyframes(baseAngleDeg: number, curveDeg: number, radiusPx: number, steps = 14) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const xs: number[] = [];
  const ys: number[] = [];

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1); // 0..1
    const theta = toRad(baseAngleDeg + curveDeg * t);

    // Ease the radius so it accelerates away then slows.
    const eased = 1 - Math.pow(1 - t, 2.2);
    const r = radiusPx * eased;

    xs.push(r * Math.cos(theta));
    ys.push(r * Math.sin(theta));
  }

  return { xs, ys };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

interface MastercardProductBubbleEmitterProps {
  products: MastercardBubbleProduct[];
}

const MastercardProductBubbleEmitter: React.FC<MastercardProductBubbleEmitterProps> = ({ products }) => {
  const bubbles = useMemo<BubbleConfig[]>(() => {
    const laneAngles = [];
    for (let start = 10; start < 360; start += 36) {
        laneAngles.push(start);
    }
    // shuffle lanes for more visual variety
    laneAngles.sort(() => Math.random() - 0.5);
    const configs: BubbleConfig[] = [];

    // Intentionally keep the count lower and staggered to avoid visual clutter.
    for (let i = 0; i < 10; i++) {
      const lane = laneAngles[i % laneAngles.length];
      const radius = 300 + (i % 5) * 38; // 300..452
      const curveDeg = (i % 2 === 0 ? 1 : -1) * (18 + (i % 4) * 3);
      const duration = 15 + (i % 5) * 1.6 + (i % 2) * 0.8;

      // Spread spawns so bubbles don't bunch up.
      const delay = i * 1;
      const size = clamp(200 + (i % 5) * 12, 100, 150);

      configs.push({
        id: `bubble-${i}`,
        productIndex: i % Math.max(products.length, 1),
        duration,
        delay,
        radius,
        baseAngleDeg: lane,
        curveDeg,
        size
      });
    }

    return configs;
  }, [products.length]);

  return (
    <div className="mc-bubble-layer" aria-hidden="true">
      {bubbles.map((b) => {
        const product = products[b.productIndex];
        const { xs, ys } = arcKeyframes(b.baseAngleDeg, b.curveDeg, b.radius, 14);

        // Keep the bubble readable for longer; fade mainly near the end.
        const bubbleOpacity = [0, 0.9, 0.9, 0.9, 0.78, 0.34, 0];
        const bubbleScale = [0.78, 1, 1.02, 1.02, 1.01, 0.98, 0.95];

        // Product content resolves mid-flight, then dissolves.
        const contentOpacity = [0, 0, 0.95, 0.95, 0.95, 0.18, 0];
        const contentScale = [0.92, 0.92, 1, 1, 1, 1, 1.02];

        const repeatDelay = 1.0 + (Number(b.id.replace('bubble-', '')) % 3) * 0.35;

        return (
          <motion.div
            key={b.id}
            className="mc-bubble"
            style={{ width: b.size, height: b.size }}
            animate={{
              x: xs,
              y: ys,
              opacity: bubbleOpacity,
              scale: bubbleScale
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay
            }}
          >
            <div className="mc-bubble-shell" />

              <motion.div
                className="mc-bubble-content"
                animate={{
                opacity: contentOpacity,
                scale: contentScale
                }}
                transition={{
                  duration: b.duration,
                  delay: b.delay,
                  ease: 'linear',
                  repeat: Infinity,
                repeatDelay
                }}
              >
                <div className="mc-bubble-icon">{product?.icon}</div>
                <div className="mc-bubble-label">{product?.label}</div>
              </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MastercardProductBubbleEmitter;
