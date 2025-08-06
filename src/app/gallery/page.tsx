'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography
} from '@mui/material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GallerySection from '@/components/Gallery/GallerySection';

const GalleryPageContainer = styled(Box)`
  padding-top: 100px;
  background: #0A0A0A;
  min-height: 100vh;
`;

const PageTitle = styled(Typography)`
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 60px !important;
`;

export default function Gallery() {
  return (
    <GalleryPageContainer>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PageTitle variant="h1">
            Galeria
          </PageTitle>
        </motion.div>
      </Container>
      
      <GallerySection />
    </GalleryPageContainer>
  );
}