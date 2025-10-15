'use client';

import React from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import GallerySection from '@/components/Gallery/GallerySection';

const GalleryPageContainer = styled(Box)`
  padding-top: 80px;
  background: transparent;
  min-height: 100vh;
`;

export default function Gallery() {
  return (
    <GalleryPageContainer>
      <GallerySection />
    </GalleryPageContainer>
  );
}