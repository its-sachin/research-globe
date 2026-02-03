import React, { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { TopicOption } from './TopicSidebar';
import './TopicLanding.css';
import { content } from '../content/content';

type BubbleLayout = {
  xPct: number;
  yPct: number;
  sizePx: number;
  driftPx: number;
  floatPx: number;
  duration: number;
  delay: number;
};

function seedFromString(input: string): number {
  // Simple deterministic hash (32-bit)
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function prng(seed: number): () => number {
  // xorshift32
  let x = seed || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 10000) / 10000;
  };
}

function layoutForTopic(topicId: string, index: number, total: number, paperCount: number, maxPaperCount: number): BubbleLayout {
  const rand = prng(seedFromString(`${topicId}:${index}`));

  // Size proportional to paper count (calculate first to use for margins)
  const minSize = 100;
  const maxSize = 240;
  const normalizedCount = Math.sqrt(paperCount / Math.max(maxPaperCount, 1)); // sqrt for better visual scaling
  const sizePx = minSize + normalizedCount * (maxSize - minSize);
  
  // Even spread (sunflower / Fermat spiral) to avoid clumping.
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const t = index + 0.5;
  const radius = Math.sqrt(t / Math.max(total, 1)) * 1.08; // Increased spread
  const angle = t * goldenAngle;

  // Dynamic margins based on bubble size (as percentage)
  const bubbleSizeMargin = (sizePx / 2) / 10; // Convert half bubble size to percentage margin (assuming ~1000px container)
  const marginX = 1 + bubbleSizeMargin;
  const marginY = 5 + bubbleSizeMargin;
  const jitterXPct = (rand() - 0.5) * 12; // Increased jitter: +/- 6%
  const jitterYPct = (rand() - 0.5) * 12 - 6;

  const xUnit = radius * Math.cos(angle);
  const yUnit = radius * Math.sin(angle);

  const xPct = 50 + xUnit * (50 - marginX) + jitterXPct;
  const yPct = 50 + yUnit * (50 - marginY) + jitterYPct;

  // Clamp positions to ensure bubbles stay within bounds
  const clampedXPct = Math.max(marginX * 0.8, Math.min(100 - marginX * 0.8, xPct));
  const clampedYPct = Math.max(marginY * 0.8, Math.min(100 - marginY * 0.8, yPct));
  
  const driftPx = 10 + rand() * 14;
  const floatPx = 14 + rand() * 18;

  const duration = 5.8 + rand() * 4.2;
  const delay = rand() * 0.6;

  return { xPct: clampedXPct, yPct: clampedYPct, sizePx, driftPx, floatPx, duration, delay };
}

interface TopicLandingProps {
  topics: TopicOption[];
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
  onBack?: () => void;
}

const TopicLanding: React.FC<TopicLandingProps> = ({
  topics,
  selectedTopicId,
  onSelectTopic,
  onBack
}) => {
  const copy = content.pages.topicLanding;
  const visibleTopics = useMemo(() => topics.filter((t) => t.id !== 'all'), [topics]);

  const bubbles = useMemo(() => {
    const total = visibleTopics.length;
    const maxPaperCount = Math.max(...visibleTopics.map(t => t.count), 1);

    return visibleTopics.map((t, idx) => ({
      topic: t,
      layout: layoutForTopic(t.id, idx, total, t.count, maxPaperCount)
    }));
  }, [visibleTopics]);

  return (
    <motion.section
      className="topic-landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {onBack && (
        <motion.button
          type="button"
          className="topic-landing-back"
          onClick={onBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ x: -4 }}
          aria-label="Back"
          title="Back"
        >
          {copy.backButton?.text ?? '← Back'}
        </motion.button>
      )}
      
      <div className="topic-landing-hero">
        <motion.h1
          className="topic-landing-title"
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {copy.title?.text ?? 'Choose a research topic'}
        </motion.h1>
        <motion.p
          className="topic-landing-subtitle"
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.55, ease: 'easeOut' }}
        >
          {copy.subtitle?.text ?? ''}
        </motion.p>
      </div>

      <div className="topic-landing-stage" aria-label="Topic bubbles">
        <div className="topic-landing-glow" />

        {bubbles.map(({ topic, layout }) => {
          const active = topic.id === selectedTopicId;

          return (
            <motion.button
              key={topic.id}
              type="button"
              className={`topic-bubble ${active ? 'active' : ''}`}
              style={{
                left: `${layout.xPct}%`,
                top: `${layout.yPct}%`,
                width: `${layout.sizePx}px`,
                height: `${layout.sizePx}px`
              }}
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -layout.floatPx, 0, layout.floatPx * 0.6, 0],
                x: [0, layout.driftPx, 0, -layout.driftPx * 0.8, 0]
              }}
              transition={{
                opacity: { duration: 0.35, delay: layout.delay },
                scale: { duration: 0.4, delay: layout.delay },
                y: { duration: layout.duration, repeat: Infinity, ease: 'easeInOut', delay: layout.delay },
                x: { duration: layout.duration * 1.2, repeat: Infinity, ease: 'easeInOut', delay: layout.delay }
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTopic(topic.id)}
              aria-label={`${topic.label} (${topic.count} papers)`}
              title={`${topic.label} (${topic.count})`}
            >
              <span className="topic-bubble-label">{topic.label}</span>
              <span className="topic-bubble-count">{topic.count}</span>
              <span className="topic-bubble-ring" aria-hidden="true" />
            </motion.button>
          );
        })}

        <AnimatePresence>
          {visibleTopics.length === 0 && (
            <motion.div
              className="topic-landing-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {copy.empty?.text ?? 'No topics found.'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="topic-landing-footer">
        <button type="button" className="topic-landing-all" onClick={() => onSelectTopic('all')}>
          {copy.allTopicsCta?.text ?? 'Or explore all topics →'}
        </button>
      </div>
    </motion.section>
  );
};

export default TopicLanding;
