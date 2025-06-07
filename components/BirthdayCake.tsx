import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BirthdayCakeProps {
  areFlamesLit: boolean;
}

const BirthdayCake: React.FC<BirthdayCakeProps> = ({ areFlamesLit }) => {
  const numCandles = 5; // Number of candles

  return (
    <motion.div 
      className="birthday-cake-container mb-4"
      initial={{ opacity: 0, y: -30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 15 }}
    >
      <div className="cake-topper">20</div>
      <div className="cake-layer top">
        <div className="icing"></div>
        <div className="candles">
          {Array.from({ length: numCandles }).map((_, index) => (
            <div className="candle" key={index}>
              <AnimatePresence>
                {areFlamesLit && (
                  <motion.div
                    className="flame"
                    initial={{ opacity: 0, scaleY: 0.5, y: 5 }}
                    animate={{ opacity: 1, scaleY: 1, y: 0 }}
                    exit={{ opacity: 0, scaleY: 0, y: 10, transition: { duration: 0.2 } }}
                    transition={{ delay: 0.2 + index * 0.05, duration:0.3 }}
                  />
                )}
              </AnimatePresence>
              {!areFlamesLit && (
                 <motion.div 
                  className="smoke"
                  initial={{ opacity: 0, y:0, scale:0 }}
                  animate={{ opacity: [0.7, 0], y: -20, scale:[0.5, 1.5], transition: { delay: index * 0.05, duration:1.5, ease:"easeOut"}}}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="cake-layer middle">
         <div className="icing"></div>
      </div>
      <div className="cake-layer bottom"></div>
      <div className="cake-base"></div>
    </motion.div>
  );
};

export default BirthdayCake;