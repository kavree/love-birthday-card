import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      className="py-8 md:py-10 text-center text-gray-300 relative z-[5]"
    >
      <p className="text-sm md:text-base font-light tracking-wide">
        รักเธอทุกลมหายใจนะคนดีของฉัน 
        <span className="text-pink-300" style={{ textShadow: '0 0 5px var(--glow-pink-soft)'}}>💖✨</span> 
        จาก... 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 font-semibold"
              style={{filter: "drop-shadow(0 0 4px rgba(255, 182, 193, 0.4))"}} // Softer pink glow
        >
          คนที่รักเธอที่สุดในกาแล็กซีนี้เลย 🚀💫
        </span>
      </p>
    </motion.footer>
  );
};

export default Footer;