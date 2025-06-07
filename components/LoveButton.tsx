import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const romanticMessages = [
  "รักนะคะคนดีของฉัน 💖", "เธอคือดาวประกายแสงของฉัน ✨", "ขอบคุณที่โลกนี้ใจดีส่งเธอมาให้ 🎁",
  "ทุกวันที่มีเธอคือวันพิเศษสุดๆ 🥳", "รักเธอที่สุด... มากกว่าคำว่ารักล้านเท่าเลย! 💕", "รอยยิ้มของเธอคือยาวิเศษที่สุด 😊",
  "อยู่เป็นความสุขให้กันแบบนี้ตลอดไปนะคนดี 🎈", "แฟนใคร ทำไมน่ารักเกินต้านขนาดนี้! 🥰",
  "อยากกอดเธอแน่นๆ ทุกวันเลย 🤗", "เธอคือของขวัญที่ดีที่สุดในชีวิตของฉัน 💝"
];

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  content: string; // Use string for emoji particles
  color: string; // For text shadow mainly
}

const LoveButton: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2800); 
    return () => clearTimeout(timer);
  }, []);

  const showRandomMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * romanticMessages.length);
    setToastMessage(romanticMessages[randomIndex]);
    setTimeout(() => setToastMessage(null), 3500); 
  }, []);

  const createParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    const emojis = ['💖', '✨', '💕', '💫', '🌸', '🌟'];
    const colors = ['var(--pastel-pink)', 'var(--electric-blue)', 'var(--pastel-lavender)'];
    for (let i = 0; i < 12; i++) { // Fewer, cuter particles
      newParticles.push({
        id: Math.random(),
        x: Math.random() * 50 - 25, 
        y: Math.random() * -50 - 25, 
        opacity: 1,
        scale: Math.random() * 0.6 + 0.6, // Slightly larger, more consistent
        content: emojis[Math.floor(Math.random() * emojis.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1400); 
  }, []);

  const handleClick = () => {
    showRandomMessage();
    createParticles();
  };

  if (!isVisible) return null;

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px var(--glow-pink-soft), 0 0 12px var(--glow-blue-soft)" }} // Softer glow
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 280, damping: 18, delay:1 }}
        onClick={handleClick}
        aria-label="ส่งความรักและความปรารถนาดี"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[50] 
                   bg-purple-600/40 backdrop-blur-md text-white p-3.5 rounded-full 
                   shadow-xl hover:shadow-2xl border border-pink-400/40
                   focus:outline-none focus:ring-3 focus:ring-pink-300/70" // Softer ring
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-pink-300 filter drop-shadow-[0_0_3px_var(--pastel-pink)]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        
        <div className="absolute bottom-full right-1/2 transform translate-x-1/2 -translate-y-1 pointer-events-none">
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: p.opacity, y: p.y, scale: p.scale, x: p.x }}
              exit={{ opacity: 0, y: p.y - 15, scale: 0 }}
              transition={{ duration: 1.1, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="absolute text-xl" // Smaller emoji size
              style={{ textShadow: `0 0 6px ${p.color}` }}
            >
              {p.content}
            </motion.div>
          ))}
        </div>
      </motion.button>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            aria-live="assertive"
            className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-[60] 
                       bg-gradient-to-r from-purple-600/60 via-pink-500/50 to-blue-500/60 
                       backdrop-blur-lg text-gray-100 text-sm md:text-base py-2.5 px-5 
                       rounded-xl shadow-xl border border-purple-300/30" // Softer border
            style={{boxShadow: "0 0 12px rgba(160,130,196,0.4)"}} // Softer shadow
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoveButton;