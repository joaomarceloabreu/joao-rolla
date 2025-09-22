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
  background: transparent;
  overflow: hidden;
`;

const HeroContent = styled(Box)`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 120px 0 80px;
`;

const ArtistName = styled(Typography)`
  font-family: var(--font-carina), "Carina", "Playfair Display", Georgia, serif !important;
  background: linear-gradient(135deg, #6d1f22 0%, #a67c52 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  font-size: clamp(3rem, 8vw, 6rem) !important;
  letter-spacing: -0.02em;
  margin-bottom: 16px !important;
  text-shadow: 0 0 40px rgba(109, 31, 34, 0.2);
`;

const Tagline = styled(Typography)`
  color: #e8dcc6 !important;
  font-size: clamp(1.2rem, 3vw, 1.8rem) !important;
  font-weight: 300 !important;
  margin-bottom: 48px !important;
  letter-spacing: 0.02em;
`;

const EPTitle = styled(Typography)`
  font-family: var(--font-carina), "Carina", "Playfair Display", Georgia, serif !important;
  color: #f4f0e8 !important;
  font-weight: 700 !important;
  font-size: 2rem !important;
  margin-bottom: 8px !important;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ReleaseDate = styled(Typography)`
  color: #6d1f22 !important;
  font-weight: 600 !important;
  font-size: 1.1rem !important;
  margin-bottom: 32px !important;
`;

const ActionButton = styled(Button)`
  background: ${props => props.variant === 'contained' 
    ? 'linear-gradient(135deg, #6d1f22 0%, #8b5a3c 100%) !important'
    : 'transparent !important'
  };
  border: ${props => props.variant === 'outlined' ? '2px solid #5a6b3a !important' : 'none'};
  color: #f4f0e8 !important;
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
      ? '0 12px 30px rgba(109, 31, 34, 0.3) !important'
      : '0 12px 30px rgba(90, 107, 58, 0.3) !important'
    };
  }
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