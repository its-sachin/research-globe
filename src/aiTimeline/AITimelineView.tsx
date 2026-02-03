import { useEffect, useState } from 'react';
import './AITimelineView.css';
import TimelineApp from './TimelineApp';

type AITimelineViewProps = {
  onBack: () => void;
};

function ensureTimelineStyles(): { dispose: () => void; alreadyPresent: boolean } {
  const id = 'ai-timeline-styles';
  const existing = document.getElementById(id);
  if (existing) {
    return { dispose: () => {}, alreadyPresent: true };
  }

  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = '/ai-timeline/timeline.css';
  document.head.appendChild(link);

  return {
    dispose: () => {
      link.remove();
    },
    alreadyPresent: false
  };
}

export default function AITimelineView({ onBack }: AITimelineViewProps) {
  const [stylesReady, setStylesReady] = useState(false);

  useEffect(() => {
    const { alreadyPresent, dispose } = ensureTimelineStyles();

    if (alreadyPresent) {
      setStylesReady(true);
      return;
    }

    const link = document.getElementById('ai-timeline-styles') as HTMLLinkElement | null;
    if (!link) {
      setStylesReady(true);
      return;
    }

    const handleLoad = () => setStylesReady(true);
    const handleError = () => setStylesReady(true);

    link.addEventListener('load', handleLoad);
    link.addEventListener('error', handleError);

    // If the stylesheet is cached, load may not fire.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sheet = (link as any).sheet as CSSStyleSheet | null;
    if (sheet) setStylesReady(true);

    return () => {
      link.removeEventListener('load', handleLoad);
      link.removeEventListener('error', handleError);
      dispose();
    };
  }, []);

  return (
    <div className="ai-timeline-host">
      <button
        type="button"
        className="ai-timeline-back"
        onClick={onBack}
        aria-label="Back to AI Evolution"
        title="Back to AI Evolution"
      >
        ← Back
      </button>

      {!stylesReady ? (
        <div className="ai-timeline-loading">Loading timeline…</div>
      ) : null}

      <TimelineApp />
    </div>
  );
}
