
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import HomeComponent from './components/Home';
import LoveButton from './components/LoveButton';
import Lightbox from './components/Lightbox';
import PersistentSpotifyPlayer from './components/PersistentSpotifyPlayer';
import { fetchBirthdayImages } from './services/supabaseService';
import { BirthdayImage } from './types';

const App: React.FC = () => {
  const [images, setImages] = useState<BirthdayImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(true);
  const [imageError, setImageError] = useState<string | null>(null);
  const [appVisible, setAppVisible] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<BirthdayImage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Spotify States
  const [hasInitiatedSpotifyPlay, setHasInitiatedSpotifyPlay] = useState<boolean>(false);
  const [spotifyPortalTargetNode, setSpotifyPortalTargetNode] = useState<HTMLDivElement | null>(null);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState<boolean>(true);
  
  const [areCandlesLit, setAreCandlesLit] = useState<boolean>(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoadingImages(true);
        setImageError(null);
        const fetchedImages = await fetchBirthdayImages();
        setImages(fetchedImages);
      } catch (err) {
        if (err instanceof Error) {
          setImageError(err.message);
        } else {
          setImageError('An unknown error occurred while fetching data.');
        }
        console.error("Failed to load images:", err);
      } finally {
        setIsLoadingImages(false);
      }
    };

    loadImages();
    
    const timer = setTimeout(() => setAppVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const initiateSpotifyPlay = useCallback(() => {
    setHasInitiatedSpotifyPlay(true);
  }, []);

  const handleImageClick = useCallback((image: BirthdayImage) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setTimeout(() => setSelectedImage(null), 300); 
  }, []);

  const toggleMiniPlayerVisibility = useCallback(() => {
    setIsMiniPlayerVisible(prev => !prev);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: appVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen font-['Prompt','Kanit'] text-gray-200 relative z-0"
    >
      <Header areCandlesLit={areCandlesLit} setAreCandlesLit={setAreCandlesLit} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-[5]">
        <HomeComponent 
          initiateSpotifyPlay={initiateSpotifyPlay}
          hasInitiatedSpotifyPlay={hasInitiatedSpotifyPlay}
          setSpotifyPortalTarget={setSpotifyPortalTargetNode}
          images={images}
          isLoadingImages={isLoadingImages}
          imageError={imageError}
          onImageClick={handleImageClick}
          areCandlesLit={areCandlesLit}
        />
      </main>
      
      {hasInitiatedSpotifyPlay && (
        <PersistentSpotifyPlayer 
          isHomePageActive={true} // Always on home page now
          portalTargetNode={spotifyPortalTargetNode} 
          isMiniPlayerVisible={isMiniPlayerVisible}
          toggleMiniPlayerVisibility={toggleMiniPlayerVisibility}
        />
      )}

      <Footer />
      <LoveButton />
      
      <AnimatePresence>
        {isLightboxOpen && selectedImage && (
          <Lightbox image={selectedImage} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;
