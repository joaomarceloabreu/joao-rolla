'use client';

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
import { artistInfo, pressKit } from '@/lib/mockData';

const AboutContainer = styled(Box)`
  padding: 120px 0 100px;
  background: 
    linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(78, 205, 196, 0.05) 100%),
    #0A0A0A;
  min-height: 100vh;
`;

const PageTitle = styled(Typography)`
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 60px !important;
`;

const BioCard = styled(Card)`
  background: #1A1A1A !important;
  border: 1px solid #333 !important;
  border-radius: 20px !important;
  padding: 40px;
  margin-bottom: 40px;
`;

const ArtistImage = styled(Box)`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%);
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
    background: url('/api/placeholder/400/400');
    background-size: cover;
    background-position: center;
    opacity: 0.9;
  }
`;

const GenreChip = styled(Chip)`
  background: rgba(255, 107, 53, 0.2) !important;
  color: #FF6B35 !important;
  border: 1px solid #FF6B35 !important;
  margin: 4px !important;
  font-weight: 600 !important;
`;

const ContactButton = styled(Button)`
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 12px 24px !important;
  border-radius: 10px !important;
  margin: 8px !important;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3) !important;
  }
`;

export default function About() {
  const containerVariants: Variants = {
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
    <AboutContainer>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <PageTitle variant="h1">
              Sobre {artistInfo.name}
            </PageTitle>
          </motion.div>

          <Grid container spacing={4}>
            {/* Artist Image */}
            <Grid item xs={12} md={5} component="div">
              <motion.div variants={itemVariants}>
                <ArtistImage>
                  <MusicNote sx={{ fontSize: 80, color: 'white', zIndex: 2 }} />
                </ArtistImage>
                
                <Card sx={{ background: '#1A1A1A', border: '1px solid #333', borderRadius: '16px' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                      Informações
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOn sx={{ color: '#FF6B35', mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="body1" sx={{ color: '#B3B3B3' }}>
                          {artistInfo.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Email sx={{ color: '#FF6B35', mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="body1" sx={{ color: '#B3B3B3' }}>
                          {pressKit.contact.management}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      Gêneros Musicais
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      {artistInfo.genres.map((genre) => (
                        <GenreChip key={genre} label={genre} size="small" />
                      ))}
                    </Box>

                    <ContactButton startIcon={<Email />} fullWidth>
                      Entrar em Contato
                    </ContactButton>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Biography */}
            <Grid item xs={12} md={7} component="div">
              <motion.div variants={itemVariants}>
                <BioCard>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
                    Minha História
                  </Typography>
                  
                  <Typography variant="h6" sx={{ color: '#4ECDC4', fontWeight: 600, mb: 2 }}>
                    {artistInfo.tagline}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ 
                    color: '#B3B3B3', 
                    lineHeight: 1.8, 
                    mb: 4,
                    fontSize: '1.1rem'
                  }}>
                    {pressKit.bio.long}
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                    Próximos Passos
                  </Typography>
                  
                  <Typography variant="body1" sx={{ 
                    color: '#B3B3B3', 
                    lineHeight: 1.8,
                    fontSize: '1rem'
                  }}>
                    Com o lançamento do EP "AURORA", planejo explorar ainda mais as possibilidades 
                    sonoras e conectar-me com um público cada vez maior. Estou trabalhando em 
                    colaborações com outros artistas e planejando apresentações ao vivo que 
                    prometem ser experiências únicas e memoráveis.
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