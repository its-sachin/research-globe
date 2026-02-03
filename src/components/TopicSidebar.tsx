import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TopicSidebar.css';
import { content } from '../content/content';

export type TopicOption = {
  id: string;
  label: string;
  count: number;
};

interface TopicSidebarProps {
  topics: TopicOption[];
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
}

const TopicSidebar: React.FC<TopicSidebarProps> = ({
  topics,
  selectedTopicId,
  onSelectTopic
}) => {
  const copy = content.pages.topicSidebar;
  const [collapsed, setCollapsed] = useState(false);

  const selectedLabel = useMemo(() => {
    return topics.find((t) => t.id === selectedTopicId)?.label ?? (copy.fallbackSelected?.text ?? 'Topic');
  }, [topics, selectedTopicId]);

  return (
    <motion.aside
      className={`topic-sidebar ${collapsed ? 'collapsed' : ''}`}
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      aria-label="Topic selector"
    >
      <div className="topic-sidebar-header">
        <div className="topic-sidebar-title">
          <span className="topic-sidebar-title-main">{copy.title?.text ?? 'Topics'}</span>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                key={selectedTopicId}
                className="topic-sidebar-title-sub"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                title={selectedLabel}
              >
                {selectedLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="topic-sidebar-toggle"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? (copy.expand?.text ?? 'Expand topics') : (copy.collapse?.text ?? 'Collapse topics')}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <div className="topic-sidebar-list" role="list">
        {topics.map((topic) => {
          const active = topic.id === selectedTopicId;

          return (
            <button
              key={topic.id}
              type="button"
              className={`topic-item ${active ? 'active' : ''}`}
              onClick={() => onSelectTopic(topic.id)}
              aria-current={active ? 'true' : undefined}
              title={`${topic.label} (${topic.count})`}
            >
              <span className="topic-label">{topic.label}</span>
              <span className="topic-count">{topic.count}</span>
            </button>
          );
        })}
      </div>

      {!collapsed && (
        <div className="topic-sidebar-footer">
          <div className="topic-sidebar-hint">{copy.tip?.text ?? ''}</div>
        </div>
      )}
    </motion.aside>
  );
};

export default TopicSidebar;
