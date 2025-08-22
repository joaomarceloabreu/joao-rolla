'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography
} from '@mui/material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ShopSection from '@/components/Shop/ShopSection';

const ShopPageContainer = styled(Box)`
  padding-top: 100px;
  background: #1A1A1A;
  min-height: 100vh;
`;

const PageTitle = styled(Typography)`
  background: linear-gradient(135deg, #E55722 0%, #F4A842 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 60px !important;
`;

export default function Shop() {
  return (
    <ShopPageContainer>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PageTitle variant="h1">
            Loja
          </PageTitle>
        </motion.div>
      </Container>
      
      <ShopSection />
    </ShopPageContainer>
  );
}