'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
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
  Badge,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Star, 
  LocalShipping, 
  Close,
  Add,
  Remove
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { useShopifyProducts, useShopifyCart } from '@/hooks/useShopify';
import { ShopifyProduct } from '@/utils/shopifyClient';

const ShopContainer = styled(Box)`
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

const ProductCard = styled(Card)`
  background: #1c1b18 !important;
  border: 1px solid #5a6b3a !important;
  border-radius: 16px !important;
  overflow: hidden;
  transition: all 0.3s ease !important;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(140, 33, 36, 0.2) !important;
    border-color: #8c2124 !important;
  }
`;

const FeaturedCard = styled(Card)`
  background: linear-gradient(135deg, #1a1a1a 0%, #1a1a1a 100%) !important;
  border: 2px solid #8c2124 !important;
  border-radius: 20px !important;
  overflow: hidden;
  transition: all 0.3s ease !important;
  position: relative;
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 50px rgba(140, 33, 36, 0.3) !important;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #6d1f22 0%, #a67c52 100%);
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
    box-shadow: 0 8px 25px rgba(229, 87, 34, 0.4) !important;
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

const FeaturedBadge = styled(Chip)`
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #E55722 0%, #F4A842 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  z-index: 2;
`;

const ShopifyButton = styled(Button)`
  background: linear-gradient(135deg, #8B9456 0%, #6B7344 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 16px 32px !important;
  font-size: 1.1rem !important;
  border-radius: 12px !important;
  margin-top: 40px !important;
  
  &:hover {
    background: linear-gradient(135deg, #6B7344 0%, #5A6238 100%) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(150, 191, 72, 0.4) !important;
  }
`;

const CartButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #E55722 0%, #F4A842 100%) !important;
  color: white !important;
  width: 60px;
  height: 60px;
  border-radius: 50% !important;
  box-shadow: 0 4px 20px rgba(229, 87, 34, 0.3) !important;
  z-index: 1000;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(229, 87, 34, 0.4) !important;
  }
`;

interface ShopSectionShopifyProps {
  // Componente sempre usa dados do Shopify
}

// Funções auxiliares para Shopify products
const getProductImage = (product: ShopifyProduct): string => {
  return product.images?.[0]?.src || '';
};

const getProductTitle = (product: ShopifyProduct): string => {
  return product.title;
};

const getProductDescription = (product: ShopifyProduct): string => {
  if (product.description.length > 100) {
    return product.description.substring(0, 100) + '...';
  }
  return product.description;
};

const getProductPrice = (product: ShopifyProduct): string => {
  return formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode);
};

const isProductAvailable = (product: ShopifyProduct): boolean => {
  return product.availableForSale;
};

const getProductOptions = (product: ShopifyProduct): any[] => {
  return product.options || [];
};

const formatPrice = (amount: string, currency: string = 'BRL'): string => {
  const numAmount = parseFloat(amount);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency === 'USD' ? 'BRL' : currency,
  }).format(numAmount);
};

function ShopSectionShopifyComponent({}: ShopSectionShopifyProps) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Garantir que só executa no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hooks do Shopify (só executam quando estiver no cliente)
  const { products: shopifyProducts, loading, error } = useShopifyProducts(isClient ? 20 : 0);
  const { cart, addToCart, removeFromCart, updateCartItem, checkout, loading: cartLoading } = useShopifyCart();

  // Usar dados do Shopify
  const products = shopifyProducts;

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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };


  const handleAddToCart = async (product: any, variantId?: string) => {
    if (variantId) {
      await addToCart(variantId, quantity);
      setSelectedProduct(null);
    } else {
      alert(`${product.title} adicionado ao carrinho!`);
    }
  };

  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0].id);
    }
    setQuantity(1);
  };

  const getCartItemCount = () => {
    return cart?.lineItems.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  // Mostrar loading enquanto não estiver no cliente ou carregando dados
  if (!isClient || loading) {
    return (
      <ShopContainer>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
            <CircularProgress sx={{ color: '#E55722' }} />
            <Typography sx={{ color: 'white', ml: 2 }}>
              {!isClient ? 'Inicializando...' : 'Carregando produtos do Shopify...'}
            </Typography>
          </Box>
        </Container>
      </ShopContainer>
    );
  }

  if (error) {
    return (
      <ShopContainer>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
          {/* Fallback para dados mocados em caso de erro */}
          <Typography sx={{ color: 'white', textAlign: 'center' }}>
            Mostrando produtos de demonstração
          </Typography>
        </Container>
      </ShopContainer>
    );
  }

  const displayProducts = products.length > 0 ? products : [];
  const featuredProduct = products.length > 0 ? products[0] : null;

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
              Produtos exclusivos diretamente da nossa loja Shopify
            </SectionSubtitle>
          </motion.div>

          {/* Featured Product */}
          {featuredProduct && (
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                <Box sx={{ width: { xs: '100%', md: '66.67%' } }}>
                  <FeaturedCard>
                    <FeaturedBadge label="Destaque" icon={<Star />} />
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <img
                          src={getProductImage(featuredProduct)}
                          alt={getProductTitle(featuredProduct)}
                          style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'cover',
                            borderRadius: '12px'
                          }}
                        />
                      </Box>
                      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
                            {getProductTitle(featuredProduct)}
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#E5D4C1', mb: 3, flex: 1 }}>
                            {getProductDescription(featuredProduct)}
                          </Typography>
                          <PriceTag variant="h3" sx={{ mb: 3 }}>
                            {getProductPrice(featuredProduct)}
                          </PriceTag>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <AddToCartButton
                              startIcon={<ShoppingCart />}
                              fullWidth
                              onClick={() => openProductModal(featuredProduct)}
                            >
                              Adicionar ao Carrinho
                            </AddToCartButton>
                          </Box>
                        </CardContent>
                      </Box>
                    </Box>
                  </FeaturedCard>
                </Box>
              </Box>
            </motion.div>
          )}

          {/* Regular Products */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(3, 1fr)' 
            }, 
            gap: 4 
          }}>
            {displayProducts.slice(1).map((item, index) => (
              <Box key={item.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <ProductCard>
                    <img
                      src={getProductImage(item)}
                      alt={getProductTitle(item)}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                        {getProductTitle(item)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#E5D4C1', mb: 2, minHeight: 40 }}>
                        {getProductDescription(item)}
                      </Typography>

                      {/* Variantes do Shopify */}
                      {getProductOptions(item).length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" sx={{ color: '#8B9456', mb: 1, display: 'block' }}>
                            {getProductOptions(item)[0].name}:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {getProductOptions(item)[0].values.slice(0, 3).map((value: string) => (
                              <Chip
                                key={value}
                                label={value}
                                size="small"
                                sx={{
                                  background: '#333',
                                  color: '#E5D4C1',
                                  border: '1px solid #555'
                                }}
                              />
                            ))}
                            {getProductOptions(item)[0].values.length > 3 && (
                              <Chip
                                label={`+${getProductOptions(item)[0].values.length - 3}`}
                                size="small"
                                sx={{
                                  background: '#333',
                                  color: '#8B9456',
                                  border: '1px solid #8B9456'
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <PriceTag variant="h6">
                          {getProductPrice(item)}
                        </PriceTag>
                        <Chip
                          label={isProductAvailable(item) ? "Disponível" : "Esgotado"}
                          size="small"
                          sx={{
                            background: isProductAvailable(item) 
                              ? 'rgba(139, 148, 86, 0.2)' 
                              : 'rgba(229, 87, 34, 0.2)',
                            color: isProductAvailable(item) 
                              ? '#8B9456' 
                              : '#E55722',
                            border: isProductAvailable(item) 
                              ? '1px solid #8B9456' 
                              : '1px solid #E55722'
                          }}
                        />
                      </Box>

                      {isProductAvailable(item) ? (
                        <AddToCartButton
                          startIcon={<ShoppingCart />}
                          fullWidth
                          onClick={() => openProductModal(item)}
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

          {/* CTA para loja completa */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography variant="h5" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                Visite nossa loja completa!
              </Typography>
              <Typography variant="body1" sx={{ color: '#E5D4C1', mb: 4 }}>
                Descubra toda nossa coleção na loja oficial
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShopifyButton
                  startIcon={<ShoppingBag />}
                  size="large"
                  onClick={() => window.open('https://yadwwn-2b.myshopify.com', '_blank')}
                >
                  Visitar Loja Completa
                </ShopifyButton>
              </motion.div>
            </Box>
          </motion.div>
        </motion.div>
      </Container>

      {/* Botão do Carrinho */}
      {getCartItemCount() > 0 && (
        <CartButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getCartItemCount()} color="secondary">
            <ShoppingCart />
          </Badge>
        </CartButton>
      )}

      {/* Modal do Produto */}
      <Dialog 
        open={Boolean(selectedProduct)} 
        onClose={() => setSelectedProduct(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ background: '#111', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {selectedProduct ? getProductTitle(selectedProduct) : ''}
          <IconButton onClick={() => setSelectedProduct(null)} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ background: '#111', color: 'white' }}>
          {selectedProduct && (
            <Box sx={{ pt: 2 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <img
                    src={getProductImage(selectedProduct)}
                    alt={getProductTitle(selectedProduct)}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ mb: 3, color: '#E5D4C1' }}>
                    {getProductDescription(selectedProduct)}
                  </Typography>
                  
                  {selectedProduct.variants && selectedProduct.variants.length > 1 && (
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel sx={{ color: '#8B9456' }}>Variante</InputLabel>
                      <Select
                        value={selectedVariant}
                        onChange={(e) => setSelectedVariant(e.target.value)}
                        sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: '#555' } }}
                      >
                        {selectedProduct.variants.map((variant: any) => (
                          <MenuItem key={variant.id} value={variant.id}>
                            {variant.title} - {formatPrice(variant.price.amount, variant.price.currencyCode)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Typography sx={{ color: '#E5D4C1' }}>Quantidade:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        sx={{ color: '#E55722' }}
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        type="number"
                        sx={{ width: 80, input: { color: 'white', textAlign: 'center' } }}
                        inputProps={{ min: 1 }}
                      />
                      <IconButton 
                        onClick={() => setQuantity(quantity + 1)}
                        sx={{ color: '#E55722' }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>

                  <AddToCartButton
                    fullWidth
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(selectedProduct, selectedVariant)}
                    disabled={cartLoading}
                  >
                    {cartLoading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
                  </AddToCartButton>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal do Carrinho */}
      <Dialog 
        open={cartOpen} 
        onClose={() => setCartOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ background: '#111', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Carrinho ({getCartItemCount()} itens)
          <IconButton onClick={() => setCartOpen(false)} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ background: '#111', color: 'white' }}>
          {cart && cart.lineItems.length > 0 ? (
            <>
              {cart.lineItems.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, borderBottom: '1px solid #333' }}>
                  <Box>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#8B9456' }}>
                      Quantidade: {item.quantity}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton 
                      onClick={() => updateCartItem(item.id, item.quantity - 1)}
                      sx={{ color: '#E55722' }}
                      disabled={item.quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton 
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      sx={{ color: '#E55722' }}
                    >
                      <Add />
                    </IconButton>
                    <IconButton 
                      onClick={() => removeFromCart(item.id)}
                      sx={{ color: '#E55722', ml: 1 }}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                </Box>
              ))}
              
              <Box sx={{ mt: 3, pt: 2, borderTop: '2px solid #E55722' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Total: {formatPrice(cart.totalPrice.amount, cart.totalPrice.currencyCode)}
                </Typography>
                <AddToCartButton fullWidth onClick={checkout}>
                  Finalizar Compra
                </AddToCartButton>
              </Box>
            </>
          ) : (
            <Typography sx={{ textAlign: 'center', py: 4, color: '#8B9456' }}>
              Seu carrinho está vazio
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </ShopContainer>
  );
}

// Export com dynamic import para evitar problemas de SSR
const ShopSectionShopify = dynamic(() => Promise.resolve(ShopSectionShopifyComponent), {
  ssr: false,
  loading: () => (
    <Box sx={{ 
      padding: '100px 0', 
      background: '#000000',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '400px'
    }}>
      <CircularProgress sx={{ color: '#E55722' }} />
      <Typography sx={{ color: 'white', ml: 2 }}>
        Carregando loja...
      </Typography>
    </Box>
  )
});

export default ShopSectionShopify;
