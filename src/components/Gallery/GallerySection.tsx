'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Card,
  Dialog,
  IconButton
} from '@mui/material';
import { 
  Close, 
  ZoomIn
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { gallery } from '@/lib/mockData';
import { GalleryImage } from '@/types/gallery';

const GalleryContainer = styled(Box)`
  padding: 100px 0;
  background: transparent;
`;

const SectionTitle = styled(Typography)`
  font-family: var(--font-carina), "Carina", serif !important;
  background: linear-gradient(135deg, #6d1f22 0%, #a67c52 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 24px !important;
`;

const SectionSubtitle = styled(Typography)`
  color: #e8dcc6 !important;
  text-align: center;
  margin-bottom: 60px !important;
  max-width: 600px;
  margin-left: auto !important;
  margin-right: auto !important;
`;

const CarouselContainer = styled(Box)`
  position: relative;
  margin-bottom: 40px;
`;

const CarouselTrack = styled(Box)`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 20px 0;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #333;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #6d1f22 0%, #a67c52 100%);
    border-radius: 3px;
  }
`;

const ImageCard = styled(Card)`
  min-width: 280px;
  height: 200px;
  background: #2A2A2A !important;
  border: 2px solid #333 !important;
  border-radius: 16px !important;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease !important;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(229, 87, 34, 0.3) !important;
    border-color: #E55722 !important;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ImageCard}:hover & {
    transform: scale(1.1);
  }
`;

const ZoomButton = styled(IconButton)`
  position: absolute !important;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7) !important;
  color: white !important;
  opacity: 0;
  transition: all 0.3s ease !important;
  
  ${ImageCard}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background: rgba(229, 87, 34, 0.8) !important;
    transform: scale(1.1);
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

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <GalleryContainer>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle variant="h2">
              Galeria
            </SectionTitle>
            <SectionSubtitle variant="h6">
              Momentos especiais, processos criativos e inspirações visuais
            </SectionSubtitle>
          </motion.div>

          <motion.div variants={itemVariants}>
            <CarouselContainer>
              <CarouselTrack>
                {gallery.photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ImageCard onClick={() => handleImageClick(photo)}>
                      <ImagePreview
                        src={photo.url}
                        alt={photo.title}
                        onError={(e) => {
                          console.error('Erro ao carregar imagem:', photo.url);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <ZoomButton>
                        <ZoomIn />
                      </ZoomButton>
                    </ImageCard>
                  </motion.div>
                ))}
              </CarouselTrack>
            </CarouselContainer>
          </motion.div>
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
                p: 4,
                minHeight: '90vh'
              }}>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    width: 'auto',
                    height: 'auto'
                  }}
                />
              </Box>
            </motion.div>
          </FullscreenDialog>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
}