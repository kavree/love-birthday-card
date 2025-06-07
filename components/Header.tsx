import React from 'react';
import { motion } from 'framer-motion';
import BirthdayCake from './BirthdayCake'; // Import the new component

interface HeaderProps {
  areCandlesLit: boolean;
  setAreCandlesLit: (isLit: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ areCandlesLit, setAreCandlesLit }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness:100, damping:15 }}
      className="py-12 md:py-16 text-center bg-purple-700/20 backdrop-blur-lg shadow-xl shadow-purple-400/10
                 border-b-2 border-purple-400/20 rounded-b-3xl lg:rounded-b-[50px] overflow-hidden mb-8 md:mb-12 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-400/5 to-blue-400/5 opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        
        <BirthdayCake areFlamesLit={areCandlesLit} />

        <motion.h1 
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 tracking-tight text-pink-300"
          style={{ textShadow: '0 0 5px #fff, 0 0 8px var(--neon-pink), 0 0 12px var(--neon-pink)' }}
        >
          🎂 Happy 20th Birthday 🥳
        </motion.h1>
        <motion.h2 
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 text-blue-200"
          style={{ textShadow: '0 0 5px #fff, 0 0 8px var(--electric-blue), 0 0 12px var(--electric-blue)' }}
        >
          แฟนของฉันคนเก่ง
        </motion.h2>

        {areCandlesLit && (
          <motion.button
            initial={{ opacity:0, scale:0.8 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ delay: 1.2, type:"spring", stiffness:150 }}
            onClick={() => setAreCandlesLit(false)}
            className="mb-6 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all text-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            style={{textShadow: "0 1px 2px rgba(0,0,0,0.2)"}}
          >
            เป่าเทียนอธิษฐานสิคะ 🌬️🎂
          </motion.button>
        )}
         {!areCandlesLit && (
          <motion.p
            initial={{ opacity:0, scale:0.8 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ delay: 0.2, type:"spring", stiffness:150 }}
            className="mb-6 text-xl text-yellow-300 font-medium"
            style={{textShadow: "0 0 5px var(--neon-pink)"}}
          >
            ขอให้คำอธิษฐานเป็นจริงนะคะ! ✨
          </motion.p>
        )}

        <motion.p 
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.9 }}
          className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300 font-light"
        >
          สุขสันต์วันเกิดนะคะเบบี๋! 🎉<br />
          ขอบคุณที่โลกนี้มีเธอเข้ามา เติมเต็มทุกวันให้มีความหมาย ถึงจะดื้อบ้างบอกไม่้ฟังบ้าง แต่ก็ขอให้ปีนี้ของอั้มเป็นปีที่ มีแต่รอยยิ้ม เสียงหัวเราะ และรักกันไปนานๆเลยนะ ❤️
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;