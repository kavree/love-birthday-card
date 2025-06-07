
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BirthdayImage } from '../types';
import ImageCard from './ImageCard';
import LoadingSpinner from './LoadingSpinner';

interface HomeProps {
  initiateSpotifyPlay: () => void;
  hasInitiatedSpotifyPlay: boolean;
  setSpotifyPortalTarget: (node: HTMLDivElement | null) => void;
  images: BirthdayImage[];
  isLoadingImages: boolean;
  imageError: string | null;
  onImageClick: (image: BirthdayImage) => void;
  areCandlesLit: boolean; // Added to potentially influence UI elements if needed
}

const HomeComponent: React.FC<HomeProps> = ({ 
  initiateSpotifyPlay, 
  hasInitiatedSpotifyPlay,
  setSpotifyPortalTarget,
  images,
  isLoadingImages,
  imageError,
  onImageClick,
  areCandlesLit
}) => {
  const spotifyPlaceholderRef = useRef<HTMLDivElement>(null);
  const [showGallery, setShowGallery] = useState<boolean>(false);

  useEffect(() => {
    if (hasInitiatedSpotifyPlay && spotifyPlaceholderRef.current) {
      setSpotifyPortalTarget(spotifyPlaceholderRef.current);
    }
    return () => {
      if (hasInitiatedSpotifyPlay) { 
         setSpotifyPortalTarget(null); 
      }
    };
  }, [hasInitiatedSpotifyPlay, setSpotifyPortalTarget]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale:0.98 },
    visible: { 
      opacity: 1, y: 0, scale:1,
      transition: { type: "spring", stiffness: 120, damping:18 } 
    }
  };

  const gallerySectionVariants = {
    hidden: { opacity: 0, height: 0, y: 20 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 } 
    }
  };
  
  const galleryGridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren:0.1 }
    }
  };

  const toggleGallery = () => {
    setShowGallery(prev => !prev);
     if (!showGallery) { // If gallery is about to be shown
      setTimeout(() => {
        const galleryElement = document.getElementById('memory-gallery-section');
        if (galleryElement) {
          galleryElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 550); // Delay to allow animation to start
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center py-10 md:py-12"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 mb-5 md:mb-6"
        style={{filter: "drop-shadow(0 0 6px rgba(255, 182, 193, 0.6))"}}
      >
        แด่คนพิเศษของฉัน 💖
      </motion.h2>
      <motion.p 
        variants={itemVariants}
        className="text-md md:text-lg text-gray-300 max-w-xl lg:max-w-2xl mb-8 md:mb-10 leading-relaxed px-2"
      >
        นี่คือของขวัญเล็กๆ จากใจ ที่ตั้งใจทำขึ้นเพื่อฉลองวันเกิดปีที่ 20 ของเธอคนเดียว<br/>
        ทุกความทรงจำ ทุกรอยยิ้ม ทุกช่วงเวลาที่เรามีร่วมกัน... ถูกเก็บไว้ในนี้แล้วนะ 💌
      </motion.p>
      
      {/* Spotify Player Section - kept above gallery button */}
      {!hasInitiatedSpotifyPlay && (
        <motion.button
          variants={itemVariants}
          onClick={initiateSpotifyPlay}
          aria-label="กดเพื่อเปิดเพลง"
          className="bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 hover:from-green-500 hover:via-teal-600 hover:to-cyan-600
                     text-white font-semibold py-3 px-7 rounded-xl 
                     shadow-lg hover:shadow-xl hover:shadow-teal-400/40 
                     transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out 
                     text-lg md:text-xl focus:outline-none focus:ring-3 focus:ring-teal-300/50
                     border border-transparent hover:border-green-200/50 mb-10" // Added margin bottom
          style={{
            boxShadow: '0 0 8px rgba(45,201,151,0.4), 0 0 15px rgba(20,184,166,0.3)'
          }}
        >
          🎵 กดเพื่อเปิดเพลง
        </motion.button>
      )}
      
      {hasInitiatedSpotifyPlay && (
        <motion.div 
          variants={itemVariants}
          className="mb-10 md:mb-12 w-full max-w-md md:max-w-lg mx-auto px-2 
                     bg-purple-700/25 backdrop-blur-md rounded-2xl shadow-xl 
                     border border-purple-400/30 p-4 md:p-5" // Added margin bottom
          style={{boxShadow: '0 0 20px 2px rgba(160,130,196,0.3), 0 0 12px 1px rgba(173,216,230,0.2)'}}
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-blue-200 mb-5 text-center"
              style={{ textShadow: '0 0 5px #fff, 0 0 8px var(--electric-blue)' }}
          >
            🎶 เพลงพิเศษสำหรับเธอ 🎧
          </h3>
          <div 
            ref={spotifyPlaceholderRef} 
            id="spotify-player-portal-target"
            className="rounded-xl overflow-hidden h-[80px] w-full border border-pink-400/20"
            aria-label="Spotify music player area"
          >
            {/* Spotify iframe will be portaled here */}
          </div>
        </motion.div>
      )}

      {/* Gallery Toggle Button */}
      <motion.button
        key={showGallery ? "hide-gallery" : "show-gallery"} // Key for AnimatePresence text change
        variants={itemVariants}
        onClick={toggleGallery}
        aria-label={showGallery ? "ซ่อนความทรงจำ" : "เปิดดูความทรงจำของเรา"}
        className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 hover:from-pink-500 hover:via-purple-600 hover:to-blue-500 
                   text-white font-medium py-3.5 px-8 md:px-10 rounded-xl 
                   shadow-lg hover:shadow-xl hover:shadow-pink-400/30 
                   transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out 
                   text-lg md:text-xl focus:outline-none focus:ring-3 focus:ring-purple-300/50
                   border border-transparent hover:border-pink-200/50"
        style={{
          boxShadow: '0 0 8px rgba(255,105,180,0.3), 0 0 15px rgba(125,249,255,0.2)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={showGallery ? "text-hide" : "text-show"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {showGallery ? "💖 ซ่อนความทรงจำ 💖" : "🎁 เปิดกล่องความทรงจำ ✨"}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Image Gallery Section */}
      <AnimatePresence>
        {showGallery && (
          <motion.section 
            id="memory-gallery-section"
            variants={gallerySectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-full mt-10 md:mt-12 py-8 md:py-12 overflow-hidden" // Added overflow-hidden for height animation
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 mb-8 md:mb-12"
                style={{ filter: "drop-shadow(0 0 8px rgba(173, 216, 230, 0.4)) drop-shadow(0 0 12px rgba(255,182,193,0.3))" }}
            >
              🎈 แกลเลอรีความทรงจำ 📸
            </h2>

            {isLoadingImages && <LoadingSpinner />}
            {imageError && (
              <div className="text-center py-10 text-red-300 bg-purple-700/40 backdrop-blur-md border border-red-500/60 rounded-xl p-6 shadow-2xl shadow-red-500/20 max-w-md mx-auto my-10">
                <h2 className="text-2xl font-semibold mb-3">เกิดข้อผิดพลาด 😥</h2>
                <p className="text-lg">{imageError}</p>
                <p className="mt-3 text-md text-gray-300">โปรดตรวจสอบการตั้งค่า Supabase หรือลองรีเฟรชหน้านะคะ</p>
              </div>
            )}
            {!isLoadingImages && !imageError && (
              images.length === 0 ? (
                <div className="text-center py-12 text-blue-200">
                  <p className="text-2xl mb-2">ยังไม่มีรูปภาพในตอนนี้เลย... 🥺</p>
                  <p className="text-md text-gray-400">ลองเพิ่มรูปภาพความทรงจำของเราใน Supabase ดูนะ!</p>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 px-2 items-start"
                  variants={galleryGridVariants} // Use grid specific variants for children
                >
                  {images.map((image, index) => (
                    <ImageCard 
                      key={image.id} 
                      image={image} 
                      index={index} 
                      onClick={() => onImageClick(image)}
                    />
                  ))}
                </motion.div>
              )
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomeComponent;
