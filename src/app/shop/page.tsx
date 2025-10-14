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
import ShopSectionShopify from '@/components/Shop/ShopSectionShopifyDynamic';

const ShopPageContainer = styled(Box)`
  padding-top: 100px;
  background: transparent;
  min-height: 100vh;
`;

const PageTitle = styled(Typography)`
  font-family: var(--font-carina), "carina", serif !important;
  background: linear-gradient(135deg, #6d1f22 0%, #a67c52 100%);
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
        </motion.div>
      </Container>
      
      {/* 
        Integração com a loja real: https://yadwwn-2b.myshopify.com/
      */}
      <ShopSectionShopify />
    </ShopPageContainer>
  );
}