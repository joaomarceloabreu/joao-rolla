'use client';

import React from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import ShopSectionShopify from '@/components/Shop/ShopSectionShopifyDynamic';

const ShopPageContainer = styled(Box)`
  padding-top: 80px;
  background: transparent;
  min-height: 100vh;
`;

export default function Shop() {
  return (
    <ShopPageContainer>
      {/* 
        Integração com a loja real: https://yadwwn-2b.myshopify.com/
      */}
      <ShopSectionShopify />
    </ShopPageContainer>
  );
}