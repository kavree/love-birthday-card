import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-16 md:py-20">
      <motion.div
        style={{
          width: '50px', // Slightly smaller
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <motion.svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} // Slower rotation
        >
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            stroke="url(#spinner-gradient-cute)"
            strokeWidth="3.5" // Thinner stroke
            fill="transparent"
            strokeDasharray="40 125" // Different dash array for softer look
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="spinner-gradient-cute" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--pastel-pink)" />
              <stop offset="100%" stopColor="var(--pastel-lavender)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </motion.div>
      <p className="mt-5 text-md md:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300" // Softer text gradient
         style={{filter: "drop-shadow(0 0 4px rgba(230, 230, 250, 0.4))"}} // Softer lavender glow
      >
        กำลังเตรียมของขวัญสุดพิเศษ... 🎁✨
      </p>
    </div>
  );
};

export default LoadingSpinner;