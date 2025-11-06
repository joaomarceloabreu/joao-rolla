'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Button,
  Container,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Dialog
} from '@mui/material';
import { 
  ShoppingCart, 
  ChevronLeft,
  ChevronRight,
  Close
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useShopifyProducts } from '@/hooks/useShopify';
import { ShopifyProduct } from '@/utils/shopifyClient';

const ShopContainer = styled(Box)`
  padding: 60px 0 100px 0;
  background: transparent;
  position: relative;
`;

const HeaderBanner = styled(Box)`
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  margin-bottom: 60px;
  
  @media (max-width: 960px) {
    height: 300px;
    margin-bottom: 40px;
  }
  
  @media (max-width: 600px) {
    height: 250px;
    margin-bottom: 30px;
  }
`;

const HeaderImageWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  }
`;

const SideImagesColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: sticky;
  top: 120px;
  align-self: flex-start;
  width: 350px;
  height: 700px;
  
  @media (max-width: 1400px) {
    width: 300px;
    height: 600px;
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
  color: white !important;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 24px !important;
  font-size: 3.5rem !important;
  
  @media (max-width: 960px) {
    font-size: 3rem !important;
  }
  
  @media (max-width: 600px) {
    font-size: 2.5rem !important;
  }
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
  background: #E55722 !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border-radius: 10px !important;
  padding: 12px 24px !important;
  
  &:hover {
    background: #d14a1a !important;
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
  
  @media (max-width: 600px) {
    height: 240px;
  }
  
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
  // Removido o limite de caracteres para exibir a descrição completa
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

// Array de imagens do header
const headerImages = [
  '/images/header_loja_1.jpg',
  '/images/header_loja_2.jpg'
];

function ShopSectionShopifyComponent({}: ShopSectionShopifyProps) {
  const [isClient, setIsClient] = useState(false);
  
  // Estados para rotação de imagens laterais
  const [leftImageIndex, setLeftImageIndex] = useState(0);
  const [rightImageIndex, setRightImageIndex] = useState(0);
  
  // Estado para controlar qual imagem está sendo mostrada em cada produto
  const [productImageIndexes, setProductImageIndexes] = useState<Record<string, number>>({});
  
  // Estado para o header banner
  const [currentHeaderImageIndex, setCurrentHeaderImageIndex] = useState(0);
  
  // Estado para imagem ampliada
  const [selectedProductImage, setSelectedProductImage] = useState<{ product: ShopifyProduct; imageIndex: number } | null>(null);

  // Garantir que só executa no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Rotação automática do header banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeaderImageIndex((prev) => (prev + 1) % headerImages.length);
    }, 5000); // Alterna a cada 5 segundos

    return () => clearInterval(interval);
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

  // Usar dados do Shopify
  const products = shopifyProducts;

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


  // Função para abrir WhatsApp com o produto selecionado
  const openWhatsApp = (product: ShopifyProduct) => {
    const whatsappNumber = '5531993170820';
    const productName = getProductTitle(product);
    
    // Formatar mensagem simples para WhatsApp
    const message = `Olá, quero comprar ${productName}`;
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
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

  const handleImageClick = (product: ShopifyProduct, imageIndex: number) => {
    setSelectedProductImage({ product, imageIndex });
  };

  const handleCloseImageDialog = () => {
    setSelectedProductImage(null);
  };

  const handlePreviousImage = () => {
    if (!selectedProductImage) return;
    const images = getProductImages(selectedProductImage.product);
    const newIndex = selectedProductImage.imageIndex > 0 
      ? selectedProductImage.imageIndex - 1 
      : images.length - 1;
    setSelectedProductImage({ ...selectedProductImage, imageIndex: newIndex });
  };

  const handleNextImage = () => {
    if (!selectedProductImage) return;
    const images = getProductImages(selectedProductImage.product);
    const newIndex = (selectedProductImage.imageIndex + 1) % images.length;
    setSelectedProductImage({ ...selectedProductImage, imageIndex: newIndex });
  };

  // Event listener para navegação por teclado
  useEffect(() => {
    if (!selectedProductImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        const images = getProductImages(selectedProductImage.product);
        const newIndex = selectedProductImage.imageIndex > 0 
          ? selectedProductImage.imageIndex - 1 
          : images.length - 1;
        setSelectedProductImage({ ...selectedProductImage, imageIndex: newIndex });
      } else if (event.key === 'ArrowRight') {
        const images = getProductImages(selectedProductImage.product);
        const newIndex = (selectedProductImage.imageIndex + 1) % images.length;
        setSelectedProductImage({ ...selectedProductImage, imageIndex: newIndex });
      } else if (event.key === 'Escape') {
        setSelectedProductImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProductImage]);

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
      {/* Header Banner com imagens alternadas */}
      <HeaderBanner>
        <AnimatePresence mode="wait">
          <HeaderImageWrapper
            key={currentHeaderImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <Image
              src={headerImages[currentHeaderImageIndex]}
              alt="João Rolla"
              fill
              priority
              quality={90}
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </HeaderImageWrapper>
        </AnimatePresence>
      </HeaderBanner>

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
          {/* Grid de Produtos Responsivo */}
          {displayProducts.length > 0 && (
            <Box sx={{ position: 'relative', mt: 4 }}>
              <Box sx={{ 
                // Desktop: Carrossel horizontal
                display: { xs: 'grid', md: 'flex' },
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 3,
                alignItems: 'stretch',
                // Carrossel apenas em desktop
                overflowX: { xs: 'visible', md: 'auto' },
                scrollSnapType: { md: 'x mandatory' },
                scrollBehavior: { md: 'smooth' },
                pb: 3,
                px: 2,
                '&::-webkit-scrollbar': {
                  height: '10px',
                  display: { xs: 'none', md: 'block' },
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
                  // Mobile: full width / 2 colunas em tablet
                  width: { xs: '100%', md: 'auto' },
                  // Desktop: tamanho fixo para carrossel
                  minWidth: { md: '400px' },
                  maxWidth: { md: '400px' },
                  scrollSnapAlign: { md: 'start' },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <ProductCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <ProductImageWrapper>
                      <img
                        src={getProductImages(item)[getCurrentImageIndex(item.id)]}
                        alt={getProductTitle(item)}
                        onClick={() => handleImageClick(item, getCurrentImageIndex(item.id))}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'opacity 0.3s ease',
                          cursor: 'pointer'
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
                    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                        {getProductTitle(item)}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#E5D4C1', 
                          mb: 2, 
                          lineHeight: 1.6,
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          flex: 1
                        }}
                      >
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

                      <Box sx={{ mt: 'auto' }}>
                        {isProductAvailable(item) ? (
                          <AddToCartButton
                            startIcon={<ShoppingCart />}
                            fullWidth
                            onClick={() => openWhatsApp(item)}
                          >
                            Comprar via WhatsApp
                          </AddToCartButton>
                        ) : (
                          <OutOfStockButton
                            fullWidth
                            disabled
                          >
                            Esgotado
                          </OutOfStockButton>
                        )}
                      </Box>
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

      {/* Dialog para imagem ampliada */}
      <AnimatePresence>
        {selectedProductImage && (
          <Dialog
            open={!!selectedProductImage}
            onClose={handleCloseImageDialog}
            maxWidth={false}
            PaperProps={{
              sx: {
                background: 'rgba(0, 0, 0, 0.95)',
                margin: 0,
                maxWidth: 'none',
                width: '100%',
                height: '100%',
                maxHeight: 'none',
                borderRadius: 0,
                position: 'relative'
              }
            }}
          >
            <IconButton
              onClick={handleCloseImageDialog}
              sx={{
                position: 'fixed',
                top: 20,
                right: 20,
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                zIndex: 1302,
                '&:hover': {
                  background: 'rgba(109, 31, 34, 0.9)'
                }
              }}
            >
              <Close fontSize="large" />
            </IconButton>
            
            {getProductImages(selectedProductImage.product).length > 1 && (
              <>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreviousImage();
                  }}
                  sx={{
                    position: 'fixed',
                    top: '50%',
                    left: 20,
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    zIndex: 1302,
                    '&:hover': {
                      background: 'rgba(109, 31, 34, 0.9)'
                    }
                  }}
                >
                  <ChevronLeft fontSize="large" />
                </IconButton>
                
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  sx={{
                    position: 'fixed',
                    top: '50%',
                    right: 20,
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    zIndex: 1302,
                    '&:hover': {
                      background: 'rgba(109, 31, 34, 0.9)'
                    }
                  }}
                >
                  <ChevronRight fontSize="large" />
                </IconButton>
                
                <Box
                  sx={{
                    position: 'fixed',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    zIndex: 1302
                  }}
                >
                  {selectedProductImage.imageIndex + 1} / {getProductImages(selectedProductImage.product).length}
                </Box>
              </>
            )}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Box 
                sx={{ 
                  width: '100vw',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 2, md: 4 },
                  position: 'relative',
                  zIndex: 1301
                }}
              >
                <img
                  src={getProductImages(selectedProductImage.product)[selectedProductImage.imageIndex]}
                  alt={getProductTitle(selectedProductImage.product)}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    width: 'auto',
                    height: 'auto',
                    cursor: 'default'
                  }}
                />
              </Box>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

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
