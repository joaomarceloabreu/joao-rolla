'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  Container,
  Grid,
  Chip,
  Badge
} from '@mui/material';
import { ShoppingBag, ShoppingCart, Star, LocalShipping } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { merchandise } from '@/lib/mockData';

const ShopContainer = styled(Box)`
  padding: 100px 0;
  background: 
    linear-gradient(180deg, #111111 0%, #0A0A0A 50%, #111111 100%);
`;

const SectionTitle = styled(Typography)`
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 24px !important;
`;

const SectionSubtitle = styled(Typography)`
  color: #B3B3B3 !important;
  text-align: center;
  margin-bottom: 60px !important;
  max-width: 600px;
  margin-left: auto !important;
  margin-right: auto !important;
`;

const ProductCard = styled(Card)`
  background: #1A1A1A !important;
  border: 1px solid #333 !important;
  border-radius: 16px !important;
  overflow: hidden;
  transition: all 0.3s ease !important;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2) !important;
    border-color: #FF6B35 !important;
  }
`;

const FeaturedCard = styled(Card)`
  background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%) !important;
  border: 2px solid #FF6B35 !important;
  border-radius: 20px !important;
  overflow: hidden;
  transition: all 0.3s ease !important;
  position: relative;
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 50px rgba(255, 107, 53, 0.3) !important;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%);
  }
`;

const ProductImage = styled(CardMedia)`
  height: 250px;
  transition: transform 0.3s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const PriceTag = styled(Typography)`
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  font-size: 1.5rem !important;
`;

const AddToCartButton = styled(Button)`
  background: linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border-radius: 10px !important;
  padding: 12px 24px !important;
  
  &:hover {
    background: linear-gradient(135deg, #E55A2B 0%, #D44A20 100%) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4) !important;
  }
`;

const OutOfStockButton = styled(Button)`
  background: #333 !important;
  color: #999 !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border-radius: 10px !important;
  padding: 12px 24px !important;
  cursor: not-allowed !important;
`;

const FeaturedBadge = styled(Chip)`
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  z-index: 2;
`;

const ShopifyButton = styled(Button)`
  background: linear-gradient(135deg, #96BF48 0%, #7BA83A 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 16px 32px !important;
  font-size: 1.1rem !important;
  border-radius: 12px !important;
  margin-top: 40px !important;
  
  &:hover {
    background: linear-gradient(135deg, #7BA83A 0%, #6A9733 100%) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(150, 191, 72, 0.4) !important;
  }
`;

export default function ShopSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
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

          {/* Featured Product */}
          <motion.div variants={itemVariants}>
            <Grid container justifyContent="center" sx={{ mb: 6 }}>
              <Grid item xs={12} md={8}>
                <FeaturedCard>
                  <FeaturedBadge label="Lançamento" icon={<Star />} />
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <ProductImage
                        component="img"
                        image={merchandise.featured.image}
                        alt={merchandise.featured.name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
                          {merchandise.featured.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#B3B3B3', mb: 3, flex: 1 }}>
                          {merchandise.featured.description}
                        </Typography>
                        <PriceTag variant="h3" sx={{ mb: 3 }}>
                          {merchandise.featured.price}
                        </PriceTag>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <AddToCartButton
                            startIcon={<ShoppingCart />}
                            fullWidth
                          >
                            Pré-Venda
                          </AddToCartButton>
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </FeaturedCard>
              </Grid>
            </Grid>
          </motion.div>

          {/* Regular Products */}
          <Grid container spacing={4}>
            {merchandise.items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <ProductCard>
                    <ProductImage
                      component="img"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#B3B3B3', mb: 2, minHeight: 40 }}>
                        {item.description}
                      </Typography>
                      
                      {item.sizes && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" sx={{ color: '#999', mb: 1, display: 'block' }}>
                            Tamanhos disponíveis:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {item.sizes.map((size) => (
                              <Chip
                                key={size}
                                label={size}
                                size="small"
                                sx={{
                                  background: '#333',
                                  color: '#B3B3B3',
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
                              background: 'rgba(78, 205, 196, 0.2)',
                              color: '#4ECDC4',
                              border: '1px solid #4ECDC4'
                            }}
                          />
                        ) : (
                          <Chip
                            label="Esgotado"
                            size="small"
                            sx={{
                              background: 'rgba(255, 107, 53, 0.2)',
                              color: '#FF6B35',
                              border: '1px solid #FF6B35'
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
              </Grid>
            ))}
          </Grid>

          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                Mais produtos em breve!
              </Typography>
              <Typography variant="body1" sx={{ color: '#B3B3B3', mb: 4 }}>
                Nossa loja completa estará disponível no Shopify com muito mais opções
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShopifyButton
                  startIcon={<ShoppingBag />}
                  size="large"
                >
                  Visitar Loja Completa
                </ShopifyButton>
              </motion.div>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </ShopContainer>
  );
}