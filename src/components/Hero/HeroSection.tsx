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
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { artistInfo, upcomingEP } from '@/lib/mockData';

const HeroContainer = styled(Box)`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: 
    linear-gradient(135deg, rgba(229, 87, 34, 0.1) 0%, rgba(139, 148, 86, 0.1) 100%),
    radial-gradient(circle at 30% 20%, rgba(229, 87, 34, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(244, 168, 66, 0.15) 0%, transparent 50%),
    #1A1A1A;
  overflow: hidden;
`;

const HeroContent = styled(Box)`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 120px 0 80px;
`;

const ArtistName = styled(Typography)`
  background: linear-gradient(135deg, #E55722 0%, #F4A842 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  font-size: clamp(3rem, 8vw, 6rem) !important;
  letter-spacing: -0.02em;
  margin-bottom: 16px !important;
  text-shadow: 0 0 40px rgba(229, 87, 34, 0.3);
`;

const Tagline = styled(Typography)`
  color: #E5D4C1 !important;
  font-size: clamp(1.2rem, 3vw, 1.8rem) !important;
  font-weight: 300 !important;
  margin-bottom: 48px !important;
  letter-spacing: 0.02em;
`;

const EPTitle = styled(Typography)`
  color: #F5E6D3 !important;
  font-weight: 700 !important;
  font-size: 2rem !important;
  margin-bottom: 8px !important;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ReleaseDate = styled(Typography)`
  color: #E55722 !important;
  font-weight: 600 !important;
  font-size: 1.1rem !important;
  margin-bottom: 32px !important;
`;

const ActionButton = styled(Button)`
  background: ${props => props.variant === 'contained' 
    ? 'linear-gradient(135deg, #E55722 0%, #B91C3C 100%) !important'
    : 'transparent !important'
  };
  border: ${props => props.variant === 'outlined' ? '2px solid #8B9456 !important' : 'none'};
  color: #F5E6D3 !important;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 16px 32px !important;
  font-size: 1.1rem !important;
  border-radius: 12px !important;
  margin: 0 12px 12px !important;
  transition: all 0.3s ease !important;
  min-width: 200px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.variant === 'contained' 
      ? '0 12px 30px rgba(229, 87, 34, 0.4) !important'
      : '0 12px 30px rgba(139, 148, 86, 0.4) !important'
    };
  }
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(229, 87, 34, 0.1), rgba(139, 148, 86, 0.1));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(245, 230, 211, 0.1);
`;

const AnimatedBackground = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
`;

export default function HeroSection() {
  const [mounted, setMounted] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
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
    <HeroContainer>
      <AnimatedBackground>
        <FloatingElement
          style={{ top: '20%', left: '10%' }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1]
          }}
        />
        <FloatingElement
          style={{ top: '60%', right: '15%' }}
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1]
          }}
        />
        <FloatingElement
          style={{ bottom: '30%', left: '20%' }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </AnimatedBackground>

      <Container maxWidth="lg">
        <HeroContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <ArtistName variant="h1">
                {artistInfo.name}
              </ArtistName>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Tagline variant="h4">
                {artistInfo.tagline}
              </Tagline>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 4 }}>
                <EPTitle variant="h3">
                  EP &quot;{upcomingEP.title}&quot;
                </EPTitle>
                <ReleaseDate variant="h6">
                  Lançamento: {upcomingEP.releaseDate}
                </ReleaseDate>
              </Box>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: "auto" }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ActionButton
                      variant="contained"
                      startIcon={<PlayArrow />}
                      size="large"
                    >
                      Ouvir Preview
                    </ActionButton>
                  </motion.div>
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ActionButton
                      variant="outlined"
                      startIcon={<Album />}
                      size="large"
                    >
                      Pré-Venda
                    </ActionButton>
                  </motion.div>
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ActionButton
                      variant="outlined"
                      startIcon={<ShoppingBag />}
                      size="large"
                    >
                      Loja
                    </ActionButton>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography variant="body1" color="#E5D4C1" sx={{ maxWidth: 600, mx: 'auto' }}>
                {upcomingEP.description}
              </Typography>
            </motion.div>
          </motion.div>
        </HeroContent>
      </Container>
    </HeroContainer>
  );
}