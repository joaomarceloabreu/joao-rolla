'use client';
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Card,
  CardContent,
  Chip,
  Button
} from '@mui/material';
import { MusicNote, LocationOn, Email } from '@mui/icons-material';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

const AboutContainer = styled(Box)`
  padding: 120px 0 100px;
  background: transparent;
  min-height: 100vh;
`;

const PageTitle = styled(Typography)`
  font-family: var(--font-carina), "carina", serif !important;
  color: white !important;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 60px !important;
`;

const BioCard = styled(Card)`
  background: rgba(28, 27, 24, 0.85) !important;
  border: 1px solid rgba(90, 107, 58, 0.5) !important;
  border-radius: 20px !important;
  backdrop-filter: blur(10px);
  padding: 40px;
  margin-bottom: 40px;
`;

const ArtistImage = styled(Box)`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #6d1f22 0%, #a67c52 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/sobre-mim.png');
    background-size: cover;
    background-position: center;
    opacity: 0.9;
  }
`;

const GenreChip = styled(Chip)`
  background: rgba(109, 31, 34, 0.2) !important;
  color: #6d1f22 !important;
  border: 1px solid #6d1f22 !important;
  margin: 4px !important;
  font-weight: 600 !important;
`;

const ContactButton = styled(Button)`
  background: linear-gradient(135deg, #6d1f22 0%, #a67c52 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 12px 24px !important;
  border-radius: 10px !important;
  margin: 8px !important;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
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
    <AboutContainer>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <PageTitle variant="h1">
              Sobre João Rolla
            </PageTitle>
          </motion.div>

          <Grid container spacing={4}>
            {/* Informações */}
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div variants={itemVariants}>
              <ArtistImage />
                <Card sx={{ background: '#111111', border: '1px solid #333', borderRadius: '16px' }}>
                  <CardContent sx={{ p: 4, pl: 5 }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2, fontSize: '1.3rem' }}>
                      Informações
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOn sx={{ color: '#E55722', mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="body1" sx={{ color: '#E5D4C1', fontSize: '1.1rem' }}>
                          Belo Horizonte, MG
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Email sx={{ color: '#E55722', mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="body1" sx={{ color: '#E5D4C1', fontSize: '1.1rem' }}>
                          joaorollaneto@gmail.com
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
                      Gêneros Musicais
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                    <GenreChip key="Samba" label="Samba" size="small" />
                    <GenreChip key="Rock" label="Rock" size="small" />
                    <GenreChip key="MPB" label="MPB" size="small" />
                    <GenreChip key="Groove" label="Groove" size="small" />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Biography */}
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div variants={itemVariants}>
                <BioCard>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
                    Sobre o Artista
                  </Typography>
                  
                  <Typography variant="body1" sx={{ 
                    color: '#E5D4C1', 
                    lineHeight: 1.8, 
                    mb: 3,
                    fontSize: '1.05rem'
                  }}>
                    João Rolla é cantor, compositor e intérprete que traduz o amor em suas múltiplas formas, o leve, o confuso, o intenso, o que chega e o que vai embora. Com sua musicalidade expressiva e presença cativante, João se destaca por unir sensibilidade poética a ritmos brasileiros contemporâneos, criando uma sonoridade que é ao mesmo tempo íntima e popular.
                  </Typography>

                  <Typography variant="body1" sx={{ 
                    color: '#E5D4C1', 
                    lineHeight: 1.8, 
                    mb: 3,
                    fontSize: '1.05rem'
                  }}>
                    Natural de João Monlevade, João cresceu cercado por música e afetos. Em suas canções, revela o olhar curioso de quem observa o cotidiano e o transforma em verso, ritmo e emoção.
                  </Typography>

                  <Typography variant="body1" sx={{ 
                    color: '#8B9456', 
                    lineHeight: 1.8, 
                    mb: 4,
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    pl: 2,
                    borderLeft: '3px solid #8B9456'
                  }}>
                    "Eu gosto de cantar o que sinto, o que vivi e o que vejo nas pessoas. A música é meu jeito de amar o mundo", diz o artista.
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3, mt: 4 }}>
                    "Eu só queria falar de amor."
                  </Typography>
                  
                  <Typography variant="body1" sx={{ 
                    color: '#E5D4C1', 
                    lineHeight: 1.8,
                    mb: 3,
                    fontSize: '1.05rem'
                  }}>
                    É um EP que nasce do desejo de simplificar e exaltar o sentir. De voltar àquilo que é puro, sincero e humano.
                    Em um tempo em que tudo é rápido e volátil, João propõe uma pausa para o afeto: amar, rir, errar, sofrer, dançar, recomeçar.
                  </Typography>

                  <Typography variant="body1" sx={{ 
                    color: '#E5D4C1', 
                    lineHeight: 1.8,
                    fontSize: '1.05rem'
                  }}>
                    O trabalho reúne canções que contam, cada uma à sua maneira, sobre o amor em suas fases: da paixão leve à dor da ausência, da esperança no futuro ao reencontro consigo mesmo.
                    O EP flui como uma conversa entre alma e corpo, entre o agora e o que fica, o que deve ficar.
                  </Typography>
                </BioCard>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </AboutContainer>
  );
}