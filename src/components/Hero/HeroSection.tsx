'use client';
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { PlayArrow, Album, ShoppingBag } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { artistInfo, upcomingEP } from '@/lib/mockData';

// Animação de rotação para os círculos de AMOR
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const HeroContainer = styled(Box)`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/joao-rolla-capa.png.gif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;

const HeroContent = styled(Box)`
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const AmorCircleContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    width: 450px;
    height: 450px;
  }
  
  @media (max-width: 480px) {
    width: 350px;
    height: 350px;
  }
`;

const AmorCircle = styled.img`
  position: absolute;
  left: 1%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  animation: ${rotateAnimation} 20s linear infinite;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    opacity: 0.8;
  }
  
  @media (max-width: 480px) {
    opacity: 0.7;
  }
`;

const AmorText = styled.span`
  position: absolute;
  white-space: nowrap;
  transform-origin: center;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 3;
`;

const ArtistInitials = styled.img`
  width: clamp(200px, 25vw, 300px);
  height: auto;
  margin-bottom: 24px;
  position: relative;
  z-index: 5;
  filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.5));
  
  @media (max-width: 768px) {
    width: clamp(150px, 20vw, 200px);
  }
  
  @media (max-width: 480px) {
    width: clamp(120px, 18vw, 150px);
  }
`;

const ArtistInitialsText = styled(Typography)`
  font-family: var(--font-carina), "Carina", "Playfair Display", Georgia, serif !important;
  color: rgba(255, 255, 255, 0.95) !important;
  font-weight: 400 !important;
  font-size: clamp(3rem, 8vw, 5rem) !important;
  letter-spacing: -0.05em;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  margin-bottom: 24px !important;
  position: relative;
  z-index: 5;
`;

const EPButton = styled(Button)`
  background: #be6800 !important;
  color: white !important;
  font-family: var(--font-carina), "Carina", serif !important;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 16px 40px !important;
  font-size: 1rem !important;
  border-radius: 25px !important;
  box-shadow: 0 4px 15px rgba(190, 104, 0, 0.4) !important;
  transition: all 0.3s ease !important;
  line-height: 1.4 !important;
  min-height: 70px !important;
  
  div {
    text-align: center;
    line-height: 1.3;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(190, 104, 0, 0.6) !important;
    background: #d4731a !important;
  }
`;

const SubText = styled(Typography)`
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 0.9rem !important;
  font-weight: 400 !important;
  margin-top: 8px !important;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
`;


export default function HeroSection() {
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const theme = useTheme();

  React.useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Função para renderizar o círculo AMOR (agora é uma imagem)
  const renderAmorCircle = () => {
    if (!mounted) return null;
    
    return (
      <AmorCircle 
        src="/AMOR AMOR AMOR.png" 
        alt="Círculo AMOR"
      />
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  if (!mounted) {
    return (
      <HeroContainer>
        <HeroContent>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: '60vh'
            }}
          >
            <img 
              src="/JR.png" 
              alt="JR"
              style={{
                width: 'clamp(120px, 15vw, 180px)',
                height: 'auto',
                filter: 'drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.5))',
                marginBottom: '24px'
              }}
            />
            <Typography 
              variant="body1" 
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                textAlign: 'center'
              }}
            >
              Carregando...
            </Typography>
          </Box>
        </HeroContent>
      </HeroContainer>
    );
  }

  return (
    <HeroContainer>
      <HeroContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <AmorCircleContainer>
              {renderAmorCircle()}
              
              <LogoContainer>
                <ArtistInitials 
                  src="/JR.png" 
                  alt="JR"
                />
                
                <motion.div variants={itemVariants}>
                  <EPButton
                    variant="contained"
                    size="large"
                  >
                    <div>
                      OUÇA AGORA O EP
                      <br />
                      "EU SÓ QUERIA FALAR DE AMOR"
                    </div>
                  </EPButton>
                </motion.div>
              </LogoContainer>
            </AmorCircleContainer>
          </motion.div>
        </motion.div>
      </HeroContent>
    </HeroContainer>
  );
}