'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Box, 
  Typography, 
  Container,
  Dialog,
  IconButton
} from '@mui/material';
import { 
  Close,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const GalleryContainer = styled(Box)`
  padding: 100px 0;
  background: transparent;
  
  @media (max-width: 960px) {
    padding: 80px 0;
  }
  
  @media (max-width: 600px) {
    padding: 60px 0;
  }
`;

const SectionTitle = styled(Typography)`
  font-family: var(--font-carina), "carina", serif !important;
  background: linear-gradient(135deg, #6d1f22 0%, #a67c52 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 80px !important;
  font-size: 4rem !important;
  
  @media (max-width: 960px) {
    font-size: 3.5rem !important;
    margin-bottom: 60px !important;
  }
  
  @media (max-width: 600px) {
    font-size: 2.5rem !important;
    margin-bottom: 40px !important;
  }
`;

const GalleryGrid = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  
  @media (max-width: 600px) {
    gap: 15px;
  }
`;

const GalleryRow = styled(Box)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ImageCard = styled(Box)`
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const ImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  
  img {
    transition: transform 0.3s ease;
  }
`;

const FullscreenDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: rgba(0, 0, 0, 0.95) !important;
    max-width: 90vw !important;
    max-height: 90vh !important;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute !important;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5) !important;
  color: white !important;
  z-index: 1000;
  
  &:hover {
    background: rgba(109, 31, 34, 0.8) !important;
  }
`;

const NavigationButton = styled(IconButton)`
  position: absolute !important;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5) !important;
  color: white !important;
  z-index: 1000;
  padding: 12px !important;
  
  &:hover {
    background: rgba(109, 31, 34, 0.8) !important;
  }
  
  &.left {
    left: 20px;
  }
  
  &.right {
    right: 20px;
  }
`;

interface GalleryImageData {
  id: number;
  url: string;
}

// Array com as 10 imagens da galeria
const galleryImages: GalleryImageData[] = [
  // Primeira fileira
  { id: 1, url: '/images/gallery/gallery_1.jpg' },
  { id: 2, url: '/images/gallery/gallery_2.jpg' },
  { id: 3, url: '/images/gallery/gallery_3.jpg' },
  { id: 4, url: '/images/gallery/gallery_4.jpg' },
  { id: 5, url: '/images/gallery/gallery_5.jpg' },
  // Segunda fileira
  { id: 6, url: '/images/gallery/gallery_6.jpg' },
  { id: 7, url: '/images/gallery/gallery_7.jpg' },
  { id: 8, url: '/images/gallery/gallery_8.jpg' },
  { id: 9, url: '/images/gallery/gallery_9.jpg' },
  { id: 10, url: '/images/gallery/gallery_10.jpg' }
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImageData | null>(null);

  const handleImageClick = (image: GalleryImageData) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  const handlePreviousImage = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
    setSelectedImage(galleryImages[previousIndex]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(galleryImages[nextIndex]);
  };

  // Event listener para navegação por teclado
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        const previousIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
        setSelectedImage(galleryImages[previousIndex]);
      } else if (event.key === 'ArrowRight') {
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
        setSelectedImage(galleryImages[nextIndex]);
      } else if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  // Dividir imagens em duas fileiras
  const firstRow = galleryImages.slice(0, 5);
  const secondRow = galleryImages.slice(5, 10);

  return (
    <GalleryContainer>
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SectionTitle variant="h2">
            Galeria
          </SectionTitle>

          <GalleryGrid>
            {/* Primeira fileira */}
            <GalleryRow>
              {firstRow.map((image) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                >
                  <ImageCard onClick={() => handleImageClick(image)}>
                    <ImageWrapper>
                      <Image
                        src={image.url}
                        alt={`Galeria ${image.id}`}
                        fill
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                        quality={85}
                      />
                    </ImageWrapper>
                  </ImageCard>
                </motion.div>
              ))}
            </GalleryRow>

            {/* Segunda fileira */}
            <GalleryRow>
              {secondRow.map((image) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                >
                  <ImageCard onClick={() => handleImageClick(image)}>
                    <ImageWrapper>
                      <Image
                        src={image.url}
                        alt={`Galeria ${image.id}`}
                        fill
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                        quality={85}
                      />
                    </ImageWrapper>
                  </ImageCard>
                </motion.div>
              ))}
            </GalleryRow>
          </GalleryGrid>
        </motion.div>
      </Container>

      {/* Fullscreen Image Dialog */}
      <AnimatePresence>
        {selectedImage && (
          <FullscreenDialog
            open={!!selectedImage}
            onClose={handleCloseDialog}
            maxWidth={false}
          >
            <CloseButton onClick={handleCloseDialog}>
              <Close />
            </CloseButton>
            
            <NavigationButton className="left" onClick={handlePreviousImage}>
              <ChevronLeft fontSize="large" />
            </NavigationButton>
            
            <NavigationButton className="right" onClick={handleNextImage}>
              <ChevronRight fontSize="large" />
            </NavigationButton>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                minHeight: '90vh',
                position: 'relative'
              }}>
                <Box sx={{
                  position: 'relative',
                  maxWidth: '90%',
                  maxHeight: '85vh',
                  width: '100%',
                  height: '85vh'
                }}>
                  <Image
                    src={selectedImage.url}
                    alt={`Galeria ${selectedImage.id}`}
                    fill
                    sizes="90vw"
                    style={{
                      objectFit: 'contain',
                      borderRadius: '8px'
                    }}
                    quality={90}
                    priority
                  />
                </Box>
              </Box>
            </motion.div>
          </FullscreenDialog>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
}