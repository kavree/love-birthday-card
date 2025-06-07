import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BirthdayImage } from '../types';

interface ImageCardProps {
  image: BirthdayImage;
  index: number; 
  onClick: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 }, // Slightly softer entrance
  visible: (i:number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08, // Faster delay for cute feel
      duration: 0.4, // Faster duration
      ease: "easeOut"
    }
  })
};

const ImageCard: React.FC<ImageCardProps> = ({ image, index, onClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.div 
      custom={index}
      variants={cardVariants}
      onClick={onClick}
      className="bg-purple-700/20 backdrop-blur-md rounded-2xl shadow-lg 
                 border border-purple-400/30 overflow-hidden transform cursor-pointer
                 hover:border-pink-300/50" // Softer hover border
      aria-label={`รูปภาพ ${image.name || 'ความทรงจำวันเกิด'}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      whileHover={{ 
        y: -6, 
        scale: 1.04, // Slightly less scale for cuteness
        boxShadow: "0px 8px 25px rgba(0,0,0,0.2), 0 0 15px var(--glow-pink-soft), 0 0 25px var(--glow-blue-soft)", // Softer glows
        transition: { type: "spring", stiffness: 280, damping: 18 } // Softer spring
      }}
      whileTap={{ scale: 0.97 }} // Softer tap
    >
      <div className={`w-full aspect-[4/3] ${!isImageLoaded ? 'shimmer' : ''} bg-purple-800/40`}>
        <img 
          src={image.image_url} 
          alt={image.name || `Birthday Memory ${image.id}`} 
          className={`w-full h-full object-cover transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)} // Consider showing a placeholder on error
        />
      </div>
      {image.name && (
        <div className="p-3 md:p-4">
          <p className="text-sm md:text-base text-blue-100 text-center font-medium truncate" title={image.name}
             style={{textShadow: '0 0 2px var(--electric-blue)'}} // Subtle glow
          >
            {image.name}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ImageCard;