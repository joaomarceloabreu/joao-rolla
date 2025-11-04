'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography
} from '@mui/material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MusicSection from '@/components/Music/MusicSection';

const MusicPageContainer = styled(Box)`
  padding-top: 100px;
  background: transparent;
  min-height: 100vh;
`;

const PageTitle = styled(Typography)`
  font-family: var(--font-carina), "carina", serif !important;
  color: white !important;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 60px !important;
`;

export default function Music() {
  return (
    <MusicPageContainer>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PageTitle variant="h1">
            Música
          </PageTitle>
        </motion.div>
      </Container>
      
      <MusicSection />
    </MusicPageContainer>
  );
}