
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface PersistentSpotifyPlayerProps {
  isHomePageActive: boolean;
  portalTargetNode: HTMLDivElement | null;
  isMiniPlayerVisible: boolean;
  toggleMiniPlayerVisibility: () => void;
}

const PersistentSpotifyPlayer: React.FC<PersistentSpotifyPlayerProps> = ({
  isHomePageActive,
  portalTargetNode,
  isMiniPlayerVisible,
  toggleMiniPlayerVisibility,
}) => {
  const spotifyTrackSrc = "https://open.spotify.com/embed/track/5DMALWZOGyyc7noptzvF2j?utm_source=generator";

  const spotifyPlayerElement = useMemo(() => {
    console.log("Creating Spotify iframe instance");
    return (
      <iframe
        style={{ borderRadius: '12px', display: 'block' }} // display:block to prevent extra space
        src={spotifyTrackSrc}
        width="100%"
        height="100%" // Will take height of its container (80px for placeholder/mini-player)
        frameBorder="0"
        allowFullScreen={false} // typically false for embeds unless specifically needed
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Player"
      ></iframe>
    );
  }, [spotifyTrackSrc]); // src is stable, so this runs once

  // Case 1: Player should be in the Home page placeholder
  if (isHomePageActive && portalTargetNode) {
    return ReactDOM.createPortal(spotifyPlayerElement, portalTargetNode);
  }

  // Case 2: Player is not on the Home page (floating mini-player or hidden)
  if (!isHomePageActive) {
    return (
      <>
        <motion.button
          onClick={toggleMiniPlayerVisibility}
          className="fixed bottom-4 left-4 z-[110] bg-purple-600/50 text-white p-3 rounded-full shadow-lg backdrop-blur-sm border border-pink-400/30 hover:bg-purple-700/60"
          aria-label={isMiniPlayerVisible ? "ซ่อนเพลง" : "แสดงเพลง"}
          whileHover={{ scale: 1.1, boxShadow: "0 0 10px var(--pastel-pink)" }}
          whileTap={{ scale: 0.9 }}
          initial={{opacity:0, x: -20}}
          animate={{opacity:1, x:0}}
          transition={{delay:0.5}}
        >
          {isMiniPlayerVisible ? '➖' : '🎶'}
        </motion.button>

        <AnimatePresence>
          {isMiniPlayerVisible && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '320px', 
                height: '80px', // Compact player height
                zIndex: 100,
              }}
              className="bg-purple-800/50 backdrop-blur-lg rounded-xl shadow-2xl border border-pink-500/60 p-1.5" // Added padding for better iframe fit
            >
              <div className="w-full h-full rounded-md overflow-hidden"> {/* Inner div for rounded iframe */}
                {spotifyPlayerElement}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden player for continuous background playback when mini-player is hidden */}
        {!isMiniPlayerVisible && (
          <div style={{
            position: 'fixed',
            top: '-9999px', // Off-screen
            left: '-9999px',
            width: '1px',
            height: '1px',
            opacity: 0,
            overflow: 'hidden', // Ensure it doesn't affect layout
          }}>
            {spotifyPlayerElement}
          </div>
        )}
      </>
    );
  }

  return null; // Should not happen if logic is correct, but acts as a fallback
};

export default PersistentSpotifyPlayer;
