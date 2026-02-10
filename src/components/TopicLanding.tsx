import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { TopicOption } from './TopicSidebar';
import './TopicLanding.css';
import { content } from '../content/content';

type BubbleLayout = {
  xPx: number;
  yPx: number;
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

type StageSize = { width: number; height: number };

type UnitPoint = { ux: number; uy: number };

function makeSymmetricSlots(count: number): UnitPoint[] {
  if (count <= 0) return [];
  if (count === 1) return [{ ux: 0, uy: 0 }];

  const slots: UnitPoint[] = [];

  const isOdd = count % 2 === 1;
  if (isOdd) slots.push({ ux: 0, uy: 0 });

  const pairCount = Math.floor(count / 2);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const maxR = 0.92;

  for (let i = 0; i < pairCount; i++) {
    const t = i + 1;
    const r = Math.sqrt(t / (pairCount + 1)) * maxR;
    const a = t * goldenAngle;
    const ux = r * Math.cos(a);
    const uy = r * Math.sin(a);
    slots.push({ ux, uy });
    slots.push({ ux: -ux, uy: -uy });
  }

  return slots.slice(0, count);
}

function layoutForTopic(
  topicId: string,
  slot: UnitPoint,
  paperCount: number,
  maxPaperCount: number,
  stage: StageSize
): BubbleLayout {
  const rand = prng(seedFromString(topicId));

  // Size proportional to paper count
  const minSize = 100;
  const maxSize = 240;
  const normalizedCount = Math.sqrt(paperCount / Math.max(maxPaperCount, 1));
  const sizePx = minSize + normalizedCount * (maxSize - minSize);

  const driftPx = 10 + rand() * 14;
  const floatPx = 14 + rand() * 18;
  const duration = 5.8 + rand() * 4.2;
  const delay = rand() * 0.6;

  const width = Math.max(1, stage.width);
  const height = Math.max(1, stage.height);

  // Reserve enough margin so animated drift/float never clips bubbles
  const padPx = 10;
  const marginX = sizePx / 2 + driftPx + padPx;
  const marginY = sizePx / 2 + floatPx + padPx;

  const halfAvailX = Math.max(0, width / 2 - marginX);
  const halfAvailY = Math.max(0, height / 2 - marginY);

  const centerX = width / 2;
  const centerY = height / 2;

  let xPx = centerX + slot.ux * halfAvailX;
  let yPx = centerY + slot.uy * halfAvailY;

  // Safety clamp (should be mostly unnecessary with halfAvail calculation)
  xPx = Math.max(marginX, Math.min(width - marginX, xPx));
  yPx = Math.max(marginY, Math.min(height - marginY, yPx));

  return { xPx, yPx, sizePx, driftPx, floatPx, duration, delay };
}

interface TopicLandingProps {
  topics: TopicOption[];
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
  onBack?: () => void;
}

const TOPIC_TINTS = ['#f79e1b', '#eb001b', '#ffb347', '#7dd3fc'] as const;

function tintForTopicId(topicId: string): string {
  const seed = seedFromString(topicId);
  return TOPIC_TINTS[seed % TOPIC_TINTS.length];
}

const TopicLanding: React.FC<TopicLandingProps> = ({
  topics,
  selectedTopicId,
  onSelectTopic,
  onBack
}) => {
  const copy = content.pages.topicLanding;
  const visibleTopics = useMemo(() => topics.filter((t) => t.id !== 'all'), [topics]);

  const stageInnerRef = useRef<HTMLDivElement | null>(null);
  const [stageSize, setStageSize] = useState<StageSize>({ width: 1, height: 1 });

  useLayoutEffect(() => {
    const el = stageInnerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setStageSize({ width: Math.max(1, rect.width), height: Math.max(1, rect.height) });
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const bubbles = useMemo(() => {
    const total = visibleTopics.length;
    const maxPaperCount = Math.max(...visibleTopics.map(t => t.count), 1);

    const slots = makeSymmetricSlots(total);

    return visibleTopics.map((t, idx) => ({
      topic: t,
      layout: layoutForTopic(t.id, slots[idx] ?? { ux: 0, uy: 0 }, t.count, maxPaperCount, stageSize)
    }));
  }, [visibleTopics, stageSize]);

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

        <div className="topic-landing-stage-inner" ref={stageInnerRef}>
          {bubbles.map(({ topic, layout }) => {
            const active = topic.id === selectedTopicId;

            return (
              <motion.button
                key={topic.id}
                type="button"
                className={`topic-bubble ${active ? 'active' : ''}`}
                style={{
                  left: `${layout.xPx}px`,
                  top: `${layout.yPx}px`,
                  width: `${layout.sizePx}px`,
                  height: `${layout.sizePx}px`,
                  ['--bubble-tint' as unknown as string]: tintForTopicId(topic.id)
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
