'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Button,
  Container,
  Chip,
  IconButton
} from '@mui/material';
import { ShoppingCart, ChevronLeft, ChevronRight } from '@mui/icons-material';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { merchandise } from '@/lib/mockData';

const ShopContainer = styled(Box)`
  padding: 100px 0;
  background: transparent;
`;

const SectionTitle = styled(Typography)`
  font-family: var(--font-carina), "carina", serif !important;
  color: white !important;
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

const ProductCard = styled(Card)`
  background: #1c1b18 !important;
  border: 1px solid #5a6b3a !important;
  border-radius: 16px !important;
  overflow: hidden;
  transition: all 0.3s ease !important;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    border-color: #8c2124 !important;
  }
`;

const PriceTag = styled(Typography)`
  background: linear-gradient(135deg, #E55722 0%, #F4A842 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  font-size: 1.5rem !important;
`;

const AddToCartButton = styled(Button)`
  background: linear-gradient(135deg, #E55722 0%, #E55A2B 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border-radius: 10px !important;
  padding: 12px 24px !important;
  
  &:hover {
    background: linear-gradient(135deg, #B91C3C 0%, #8B9456 100%) !important;
    transform: translateY(-2px);
  }
`;

const OutOfStockButton = styled(Button)`
  background: #333 !important;
  color: #8B9456 !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border-radius: 10px !important;
  padding: 12px 24px !important;
  cursor: not-allowed !important;
`;

const ImageNavigationButton = styled(IconButton)`
  position: absolute !important;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6) !important;
  color: white !important;
  opacity: 0;
  transition: opacity 0.3s ease !important;
  z-index: 2;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8) !important;
  }
  
  &.left {
    left: 8px;
  }
  
  &.right {
    right: 8px;
  }
`;

const ImageIndicators = styled(Box)`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
`;

const ImageDot = styled(Box)<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#E55722' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#E55722' : 'rgba(255, 255, 255, 0.8)'};
    transform: scale(1.2);
  }
`;

const ProductImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  
  &:hover ${ImageNavigationButton} {
    opacity: 1;
  }
`;

export default function ShopSection() {
  const [productImageIndexes, setProductImageIndexes] = useState<Record<string, number>>({});
  
  const handleImageNavigation = (productId: string, direction: 'next' | 'prev', totalImages: number) => {
    setProductImageIndexes(prev => {
      const currentIndex = prev[productId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % totalImages;
      } else {
        newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
      }
      
      return { ...prev, [productId]: newIndex };
    });
  };

  const getCurrentImageIndex = (productId: string): number => {
    return productImageIndexes[productId] || 0;
  };

  const getProductImages = (item: any): string[] => {
    // Se o item tiver um array de imagens, usa ele, senão retorna apenas a imagem principal
    if (item.images && Array.isArray(item.images)) {
      return item.images;
    }
    return [item.image];
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8
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
    <ShopContainer>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle variant="h2">
              Loja
            </SectionTitle>
            <SectionSubtitle variant="h6">
              Produtos exclusivos para você levar um pedacinho da música comigo
            </SectionSubtitle>
          </motion.div>

          {/* Carrossel de Produtos */}
          {merchandise.items.length > 0 && (
            <Box sx={{ position: 'relative', mt: 4 }}>
              <Box sx={{ 
                display: 'flex',
                gap: 3,
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                pb: 3,
                px: 2,
                '&::-webkit-scrollbar': {
                  height: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '5px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'linear-gradient(135deg, #E55722 0%, #F4A842 100%)',
                  borderRadius: '5px',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #8c2124 0%, #E55722 100%)',
                  },
                },
              }}>
                {merchandise.items.map((item, index) => (
                  <Box 
                    key={item.id}
                    sx={{
                      minWidth: { xs: '280px', sm: '320px', md: '360px' },
                      maxWidth: { xs: '280px', sm: '320px', md: '360px' },
                      scrollSnapAlign: 'start',
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <ProductCard sx={{ height: '100%' }}>
                        <ProductImageWrapper>
                          <img
                            src={getProductImages(item)[getCurrentImageIndex(String(item.id))]}
                            alt={item.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'opacity 0.3s ease'
                            }}
                          />
                          
                          {/* Navegação de imagens - só mostra se tiver múltiplas imagens */}
                          {getProductImages(item).length > 1 && (
                            <>
                              <ImageNavigationButton
                                className="left"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleImageNavigation(String(item.id), 'prev', getProductImages(item).length);
                                }}
                              >
                                <ChevronLeft />
                              </ImageNavigationButton>
                              
                              <ImageNavigationButton
                                className="right"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleImageNavigation(String(item.id), 'next', getProductImages(item).length);
                                }}
                              >
                                <ChevronRight />
                              </ImageNavigationButton>
                              
                              {/* Indicadores */}
                              <ImageIndicators>
                                {getProductImages(item).map((_, idx) => (
                                  <ImageDot
                                    key={idx}
                                    active={getCurrentImageIndex(String(item.id)) === idx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setProductImageIndexes(prev => ({ ...prev, [String(item.id)]: idx }));
                                    }}
                                  />
                                ))}
                              </ImageIndicators>
                            </>
                          )}
                        </ProductImageWrapper>
                        <CardContent sx={{ p: 3 }}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#E5D4C1', mb: 2, minHeight: 40 }}>
                            {item.description}
                          </Typography>
                          
                          {item.sizes && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" sx={{ color: '#8B9456', mb: 1, display: 'block' }}>
                                Tamanhos disponíveis:
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {item.sizes.map((size) => (
                                  <Chip
                                    key={size}
                                    label={size}
                                    size="small"
                                    sx={{
                                      background: '#333',
                                      color: '#E5D4C1',
                                      border: '1px solid #555'
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <PriceTag variant="h6">
                              {item.price}
                            </PriceTag>
                            {item.inStock ? (
                              <Chip
                                label="Em Estoque"
                                size="small"
                                sx={{
                                  background: 'rgba(139, 148, 86, 0.2)',
                                  color: '#8B9456',
                                  border: '1px solid #8B9456'
                                }}
                              />
                            ) : (
                              <Chip
                                label="Esgotado"
                                size="small"
                                sx={{
                                  background: 'rgba(229, 87, 34, 0.2)',
                                  color: '#E55722',
                                  border: '1px solid #E55722'
                                }}
                              />
                            )}
                          </Box>

                          {item.inStock ? (
                            <AddToCartButton
                              startIcon={<ShoppingCart />}
                              fullWidth
                            >
                              Adicionar ao Carrinho
                            </AddToCartButton>
                          ) : (
                            <OutOfStockButton
                              fullWidth
                              disabled
                            >
                              Esgotado
                            </OutOfStockButton>
                          )}
                        </CardContent>
                      </ProductCard>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </motion.div>
      </Container>
    </ShopContainer>
  );
}