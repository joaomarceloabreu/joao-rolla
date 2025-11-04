'use client';

import React, { useState } from 'react';
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

const GalleryContainer = styled(Box)`
  padding: 60px 0;
  background: transparent;
  
  @media (max-width: 600px) {
    padding: 40px 0;
  }
`;

const SectionTitle = styled(Typography)`
  font-family: var(--font-carina), "carina", serif !important;
  color: white !important;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 40px !important;
  font-size: 2.5rem !important;
  
  @media (min-width: 960px) {
    font-size: 4rem !important;
    margin-bottom: 80px !important;
  }
`;

// Carrossel Mobile
const CarouselContainer = styled(Box)`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0 20px;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const CarouselTrack = styled(Box)`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 10px 0;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #6d1f22;
    border-radius: 4px;
  }
`;

const CarouselItem = styled(Box)`
  min-width: 85%;
  aspect-ratio: 1;
  scroll-snap-align: center;
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a1a;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

// Grid Desktop
const DesktopGrid = styled(Box)`
  display: none;
  
  @media (min-width: 769px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const GalleryRow = styled(Box)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ImageCard = styled(Box)`
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  border-radius: 8px;
  background: #1a1a1a;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FullscreenDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: rgba(0, 0, 0, 0.95) !important;
    margin: 0 !important;
    max-width: none !important;
    width: 100% !important;
    height: 100% !important;
    max-height: none !important;
    border-radius: 0 !important;
  }
`;

const CloseButton = styled(IconButton)`
  position: fixed !important;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7) !important;
  color: white !important;
  z-index: 1301;
  
  &:hover {
    background: rgba(109, 31, 34, 0.9) !important;
  }
`;

const NavButton = styled(IconButton)`
  position: fixed !important;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7) !important;
  color: white !important;
  z-index: 1301;
  
  &:hover {
    background: rgba(109, 31, 34, 0.9) !important;
  }
  
  &.left {
    left: 10px;
  }
  
  &.right {
    right: 10px;
  }
`;

const ImageCounter = styled(Box)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 1301;
`;

interface GalleryImageData {
  id: number;
  url: string;
}

const galleryImages: GalleryImageData[] = [
  { id: 1, url: '/images/gallery/gallery_1.jpg' },
  { id: 2, url: '/images/gallery/gallery_2.jpg' },
  { id: 3, url: '/images/gallery/gallery_3.jpg' },
  { id: 4, url: '/images/gallery/gallery_4.jpg' },
  { id: 5, url: '/images/gallery/gallery_5.jpg' },
  { id: 6, url: '/images/gallery/gallery_6.jpg' },
  { id: 7, url: '/images/gallery/gallery_7.jpg' },
  { id: 8, url: '/images/gallery/gallery_8.jpg' },
  { id: 9, url: '/images/gallery/gallery_9.jpg' },
  { id: 10, url: '/images/gallery/gallery_10.jpg' }
];

export default function GallerySectionMobile() {
  const [selectedImage, setSelectedImage] = useState<GalleryImageData | null>(null);

  const handleImageClick = (image: GalleryImageData) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
    setSelectedImage(galleryImages[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(galleryImages[nextIndex]);
  };

  const firstRow = galleryImages.slice(0, 5);
  const secondRow = galleryImages.slice(5, 10);

  const currentIndex = selectedImage 
    ? galleryImages.findIndex(img => img.id === selectedImage.id) + 1
    : 0;

  return (
    <GalleryContainer>
      <Container maxWidth="xl">
        <SectionTitle variant="h2">
          Galeria
        </SectionTitle>

        {/* CARROSSEL MOBILE */}
        <CarouselContainer>
          <CarouselTrack>
            {galleryImages.map((image) => (
              <CarouselItem key={image.id} onClick={() => handleImageClick(image)}>
                <img
                  src={image.url}
                  alt={`Galeria ${image.id}`}
                  loading="lazy"
                />
              </CarouselItem>
            ))}
          </CarouselTrack>
        </CarouselContainer>

        {/* GRID DESKTOP */}
        <DesktopGrid>
          <GalleryRow>
            {firstRow.map((image) => (
              <ImageCard key={image.id} onClick={() => handleImageClick(image)}>
                <img
                  src={image.url}
                  alt={`Galeria ${image.id}`}
                  loading="lazy"
                />
              </ImageCard>
            ))}
          </GalleryRow>

          <GalleryRow>
            {secondRow.map((image) => (
              <ImageCard key={image.id} onClick={() => handleImageClick(image)}>
                <img
                  src={image.url}
                  alt={`Galeria ${image.id}`}
                  loading="lazy"
                />
              </ImageCard>
            ))}
          </GalleryRow>
        </DesktopGrid>
      </Container>

      {/* FULLSCREEN DIALOG */}
      {selectedImage && (
        <FullscreenDialog
          open={true}
          onClose={handleCloseDialog}
          maxWidth={false}
        >
          <CloseButton onClick={handleCloseDialog}>
            <Close />
          </CloseButton>
          
          <NavButton className="left" onClick={handlePrevious}>
            <ChevronLeft fontSize="large" />
          </NavButton>
          
          <NavButton className="right" onClick={handleNext}>
            <ChevronRight fontSize="large" />
          </NavButton>
          
          <ImageCounter>
            {currentIndex} / {galleryImages.length}
          </ImageCounter>
          
          <Box sx={{ 
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, md: 4 }
          }}>
            <img
              src={selectedImage.url}
              alt={`Galeria ${selectedImage.id}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                width: 'auto',
                height: 'auto'
              }}
            />
          </Box>
        </FullscreenDialog>
      )}
    </GalleryContainer>
  );
}

