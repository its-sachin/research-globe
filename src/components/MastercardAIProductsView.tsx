import { motion } from 'framer-motion';
import './MastercardAIProductsView.css';
import { content } from '../content/content';

interface MastercardAIProductsViewProps {
  onBack: () => void;
}

const MastercardAIProductsView: React.FC<MastercardAIProductsViewProps> = ({ onBack }) => {
  const copy = content.pages.mcProducts;
  return (
    <motion.section
      className="mc-products-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      aria-label="AI in Mastercard products"
    >
      <motion.button
        type="button"
        className="mc-products-back"
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ x: -4 }}
        aria-label="Back to AI Evolution"
        title="Back"
      >
        {copy.backButton?.text ?? '← AI Evolution'}
      </motion.button>

      <div className="mc-products-hero">
        <motion.h1
          className="mc-products-title"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          {copy.title?.text ?? 'AI in Mastercard'}
        </motion.h1>
        <motion.p
          className="mc-products-subtitle"
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.65, ease: 'easeOut' }}
        >
          {copy.subtitle?.text ?? ''}
        </motion.p>
      </div>
    </motion.section>
  );
};

export default MastercardAIProductsView;
