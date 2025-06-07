import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BirthdayImage } from '../types';

interface LightboxProps {
  image: BirthdayImage;
  onClose: () => void;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 }, // Softer entrance
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } },
  exit: { opacity: 0, scale: 0.85, y: -30, transition: { duration: 0.15 } } // Faster exit
};

const Lightbox: React.FC<LightboxProps> = ({ image, onClose }) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm" // Slightly less blur
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <motion.div 
        variants={modalVariants}
        className="relative bg-purple-700/30 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-2xl 
                   max-w-3xl max-h-[90vh] w-full border border-purple-400/40" // Softer border
        style={{boxShadow: "0 0 25px 3px rgba(160,130,196,0.3), 0 0 15px 1px rgba(173,216,230,0.2)"}} // Softer glows
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90, boxShadow: "0 0 12px var(--glow-pink-soft)" }} // Softer glow
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute -top-2.5 -right-2.5 md:-top-3.5 md:-right-3.5 z-10 
                     bg-gradient-to-br from-pink-400 to-purple-500 text-white 
                     rounded-full p-1.5 hover:from-pink-500 hover:to-purple-600 transition-all shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        <div className="overflow-hidden rounded-xl max-h-[calc(90vh-100px)] border border-blue-300/20 shadow-inner shadow-blue-400/10">
          <img 
            src={image.image_url} 
            alt={image.name || 'Enlarged birthday memory'} 
            className="w-full h-full object-contain"
          />
        </div>

        {image.name && (
          <p id="lightbox-title" className="mt-3 text-center text-blue-100 text-md md:text-lg font-medium"
             style={{textShadow: '0 0 3px var(--electric-blue)'}} // Subtle glow
          >
            {image.name}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;