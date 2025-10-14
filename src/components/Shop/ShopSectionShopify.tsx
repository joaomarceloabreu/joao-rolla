'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Button,
  Container,
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
  ShoppingCart, 
  Close,
  Add,
  Remove,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useShopifyProducts, useShopifyCart } from '@/hooks/useShopify';
import { ShopifyProduct } from '@/utils/shopifyClient';

const ShopContainer = styled(Box)`
  padding: 100px 0;
  background: transparent;
  position: relative;
`;

const ShopContentWrapper = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 1400px) {
    gap: 20px;
  }
  
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ModelImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  border: 2px solid #5a6b3a;
  transition: all 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  
  &:hover {
    border-color: #8c2124;
    box-shadow: 0 20px 40px rgba(140, 33, 36, 0.3);
  }
`;

const SideImagesColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: sticky;
  top: 120px;
  align-self: flex-start;
  width: 300px;
  height: 600px;
  
  @media (max-width: 1400px) {
    width: 250px;
    height: 500px;
  }
  
  @media (max-width: 1200px) {
    display: none;
  }
`;

const ModelImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
`;

const CenterContent = styled(Box)`
  flex: 1;
  max-width: 900px;
`;

const SectionTitle = styled(Typography)`
  font-family: var(--font-carina), "carina", serif !important;
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

interface ShopSectionShopifyProps {
  // Componente sempre usa dados do Shopify
}

// Funções auxiliares para Shopify products
const getProductImage = (product: ShopifyProduct): string => {
  return product.images?.[0]?.src || '';
};

const getProductTitle = (product: ShopifyProduct): string => {
  if (!product || typeof product.title !== 'string') {
    console.warn('Produto sem título válido:', product);
    return 'Produto sem nome';
  }
  return product.title;
};

const getProductDescription = (product: ShopifyProduct): string => {
  if (!product || typeof product.description !== 'string') {
    console.warn('Produto sem descrição válida:', product);
    return 'Sem descrição disponível';
  }
  if (product.description.length > 100) {
    return product.description.substring(0, 100) + '...';
  }
  return product.description;
};

const getProductPrice = (product: ShopifyProduct): string => {
  try {
    // Verificar se o produto tem estrutura de preço válida
    if (!product || !product.priceRange || !product.priceRange.minVariantPrice) {
      console.warn('Produto sem informação de preço válida:', product);
      return 'R$ 0,00';
    }
    
    return formatPrice(
      product.priceRange.minVariantPrice.amount, 
      product.priceRange.minVariantPrice.currencyCode
    );
  } catch (error) {
    console.error('Erro ao obter preço do produto:', error, product);
    return 'R$ 0,00';
  }
};

const isProductAvailable = (product: ShopifyProduct): boolean => {
  return product.availableForSale;
};

const getProductOptions = (product: ShopifyProduct): any[] => {
  if (!product || !Array.isArray(product.options)) {
    console.warn('Produto sem opções válidas:', product);
    return [];
  }
  return product.options || [];
};

const formatPrice = (amount: any, currency: string = 'BRL'): string => {
  // Verificar se amount é um objeto com propriedades value/amount
  let numAmount: number;
  
  if (typeof amount === 'object' && amount !== null) {
    if (amount.amount) {
      numAmount = parseFloat(amount.amount);
    } else if (amount.value) {
      numAmount = parseFloat(amount.value);
    } else {
      console.warn('Formato de preço desconhecido:', amount);
      return 'R$ 0,00';
    }
  } else if (typeof amount === 'string' || typeof amount === 'number') {
    numAmount = parseFloat(amount.toString());
  } else {
    console.warn('Formato de preço inválido:', amount);
    return 'R$ 0,00';
  }
  
  if (isNaN(numAmount)) {
    console.warn('Preço não é um número válido:', amount);
    return 'R$ 0,00';
  }
  
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
  
  // Estados para rotação de imagens laterais
  const [leftImageIndex, setLeftImageIndex] = useState(0);
  const [rightImageIndex, setRightImageIndex] = useState(0);
  
  // Estado para controlar qual imagem está sendo mostrada em cada produto
  const [productImageIndexes, setProductImageIndexes] = useState<Record<string, number>>({});

  // Garantir que só executa no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Rotação automática das imagens laterais
  useEffect(() => {
    const leftImages = ['/images/dudinha_frente.png', '/images/luizao_costas.png'];
    const rightImages = ['/images/luizao_frente.png', '/images/dudinha_costas.png'];
    
    const interval = setInterval(() => {
      setLeftImageIndex((prev) => (prev + 1) % leftImages.length);
      setRightImageIndex((prev) => (prev + 1) % rightImages.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  }, []);
  
  // Arrays de imagens para uso no JSX
  const leftImages = ['/images/dudinha_frente.png', '/images/luizao_costas.png'];
  const rightImages = ['/images/luizao_frente.png', '/images/dudinha_costas.png'];

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

  const getProductImages = (product: ShopifyProduct): string[] => {
    if (!product || !Array.isArray(product.images)) {
      return [getProductImage(product)];
    }
    return product.images.map(img => img.src).filter(Boolean);
  };

  const getCurrentImageIndex = (productId: string): number => {
    return productImageIndexes[productId] || 0;
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

  return (
    <ShopContainer>
      {/* Título centralizado fora do wrapper */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
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
          </motion.div>
        </motion.div>
      </Container>

      {/* Conteúdo com imagens laterais */}
      <ShopContentWrapper>
        {/* Coluna Esquerda - Imagem Rotativa */}
        <SideImagesColumn>
          <ModelImageWrapper>
            <AnimatePresence mode="wait">
              <ModelImage
                key={leftImageIndex}
                src={leftImages[leftImageIndex]}
                alt="Modelo usando camiseta"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>
          </ModelImageWrapper>
        </SideImagesColumn>

        {/* Conteúdo Central */}
        <CenterContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
          {/* Carrossel de Produtos */}
          {displayProducts.length > 0 && (
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
            {displayProducts.map((item, index) => (
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
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <ProductCard sx={{ height: '100%' }}>
                    <ProductImageWrapper>
                      <img
                        src={getProductImages(item)[getCurrentImageIndex(item.id)]}
                        alt={getProductTitle(item)}
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
                              handleImageNavigation(item.id, 'prev', getProductImages(item).length);
                            }}
                          >
                            <ChevronLeft />
                          </ImageNavigationButton>
                          
                          <ImageNavigationButton
                            className="right"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageNavigation(item.id, 'next', getProductImages(item).length);
                            }}
                          >
                            <ChevronRight />
                          </ImageNavigationButton>
                          
                          {/* Indicadores */}
                          <ImageIndicators>
                            {getProductImages(item).map((_, idx) => (
                              <ImageDot
                                key={idx}
                                active={getCurrentImageIndex(item.id) === idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setProductImageIndexes(prev => ({ ...prev, [item.id]: idx }));
                                }}
                              />
                            ))}
                          </ImageIndicators>
                        </>
                      )}
                    </ProductImageWrapper>
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
            </Box>
          )}
        </motion.div>
        </CenterContent>

        {/* Coluna Direita - Imagem Rotativa */}
        <SideImagesColumn>
          <ModelImageWrapper>
            <AnimatePresence mode="wait">
              <ModelImage
                key={rightImageIndex}
                src={rightImages[rightImageIndex]}
                alt="Modelo usando camiseta"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>
          </ModelImageWrapper>
        </SideImagesColumn>
      </ShopContentWrapper>

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
