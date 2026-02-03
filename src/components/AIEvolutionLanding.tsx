import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import './AIEvolutionLanding.css';
import AIEvolutionCardCarousel, { AIEvolutionCard } from './AIEvolutionCardCarousel';
import { content } from '../content/content';
import { iconForKey } from '../content/iconRegistry';

interface AIEvolutionLandingProps {
  onSelectTopic: (topicId: string) => void;
  onBack: () => void;
}

/* Cards are driven by Excel -> JSON (src/content/generated/ai-evolution-cards.json) */

const containerAnim = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 }
};

const containerTransition = {
  duration: 0.5,
  ease: 'easeOut'
};

const AIEvolutionLanding: React.FC<AIEvolutionLandingProps> = ({ onSelectTopic, onBack }) => {
  const handleSelect = useCallback((id: string) => {
    onSelectTopic(id);
  }, [onSelectTopic]);

  const handleBack = useCallback(() => {
    onBack();
  }, [onBack]);

  const cards = useMemo<AIEvolutionCard[]>(
    () =>
      content.aiEvolutionCards.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        accent: c.accent,
        icon: iconForKey(c.iconKey)
      })),
    []
  );

  return (
    <section className="ai-evolution-landing">
      <motion.div
        className="ai-evolution-landing-inner"
        variants={containerAnim}
        initial="initial"
        animate="animate"
        transition={containerTransition}
      >
        <button
          type="button"
          className="back-button"
          onClick={handleBack}
          aria-label="Home"
          title="Home"
        >
          <svg className="back-button-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 10.5L12 3l9 7.5v10a1.5 1.5 0 0 1-1.5 1.5H15v-7.5h-6V22H4.5A1.5 1.5 0 0 1 3 20.5v-10Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          Home
        </button>

        <div className="evolution-hero-spacer" aria-hidden="true" />

        <div className="evolution-cards-section">
          <div className="evolution-carousel-section">
            <AIEvolutionCardCarousel
              cards={cards}
              onSelect={handleSelect}
              autoRotateMs={3500}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default React.memo(AIEvolutionLanding);
