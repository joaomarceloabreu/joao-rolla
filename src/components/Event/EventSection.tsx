'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Card,
  CardContent,
  Button,
  Divider
} from '@mui/material';
import { CalendarToday, AccessTime, LocationOn, ConfirmationNumber } from '@mui/icons-material';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const EventContainer = styled(Box)`
  padding: 100px 0;
  background: transparent;
  position: relative;
`;

const SectionTitle = styled(Typography)`
  font-family: var(--font-carina), "carina", serif !important;
  color: white !important;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 60px !important;
  font-size: 3.5rem !important;
  
  @media (max-width: 960px) {
    font-size: 3rem !important;
  }
  
  @media (max-width: 600px) {
    font-size: 2.5rem !important;
  }
`;

const EventCard = styled(Card)`
  background: rgba(28, 27, 24, 0.85) !important;
  border: 1px solid rgba(90, 107, 58, 0.5) !important;
  border-radius: 20px !important;
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s ease !important;
  
  &:hover {
    transform: translateY(-8px);
    border-color: #8c2124 !important;
  }
`;

const EventImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  
  @media (max-width: 960px) {
    aspect-ratio: 2 / 3;
  }
  
  @media (max-width: 600px) {
    aspect-ratio: 3 / 4;
  }
`;

const EventTitle = styled(Typography)`
  font-family: var(--font-carina), "carina", serif !important;
  color: white !important;
  font-weight: 900 !important;
  font-size: 3rem !important;
  margin-bottom: 16px !important;
  
  @media (max-width: 960px) {
    font-size: 2.5rem !important;
  }
  
  @media (max-width: 600px) {
    font-size: 2rem !important;
  }
`;

const EventSubtitle = styled(Typography)`
  font-family: var(--font-carina), "carina", serif !important;
  color: #E5D4C1 !important;
  font-weight: 600 !important;
  font-size: 1.5rem !important;
  margin-bottom: 8px !important;
  
  @media (max-width: 600px) {
    font-size: 1.2rem !important;
  }
`;

const EventInfoItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  .MuiSvgIcon-root {
    color: #E55722;
    margin-right: 12px;
    font-size: 1.5rem;
  }
`;

const EventInfoText = styled(Typography)`
  color: #E5D4C1 !important;
  font-size: 1.1rem !important;
  
  &.bold {
    font-weight: 700 !important;
    color: white !important;
    font-size: 1.3rem !important;
  }
`;

const EventDescription = styled(Typography)`
  color: #E5D4C1 !important;
  line-height: 1.8 !important;
  font-size: 1.05rem !important;
  margin-bottom: 32px !important;
`;

const BuyTicketButton = styled(Button)`
  background: linear-gradient(135deg, #E55722 0%, #E55A2B 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  border-radius: 10px !important;
  padding: 16px 32px !important;
  font-size: 1.1rem !important;
  width: 100%;
  
  &:hover {
    background: linear-gradient(135deg, #B91C3C 0%, #8B9456 100%) !important;
    transform: translateY(-2px);
  }
`;

export default function EventSection() {
  const containerVariants: Variants = {
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

  const handleBuyTickets = () => {
    window.open('https://www.sympla.com.br/evento/pra-falar-de-amor-ao-vivo/3135676', '_blank');
  };

  return (
    <EventContainer>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle variant="h2">
              Evento
            </SectionTitle>
          </motion.div>

          <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
            {/* Imagem do Evento */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div variants={itemVariants} style={{ height: '100%' }}>
                <EventCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <EventImageWrapper sx={{ flex: 1 }}>
                    <Image
                      src="/images/evento1.png"
                      alt="Pra falar de amor - Ao vivo"
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                      quality={90}
                    />
                  </EventImageWrapper>
                </EventCard>
              </motion.div>
            </Grid>

            {/* Informações do Evento */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div variants={itemVariants} style={{ height: '100%' }}>
                <EventCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <EventTitle variant="h2">
                      pra falar de amor
                    </EventTitle>
                    
                    <EventSubtitle variant="h5">
                      ao vivo
                    </EventSubtitle>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 3 }} />

                    {/* Informações do Evento */}
                    <EventInfoItem>
                      <CalendarToday />
                      <EventInfoText className="bold">
                        08 Nov
                      </EventInfoText>
                    </EventInfoItem>

                    <EventInfoItem>
                      <AccessTime />
                      <EventInfoText>
                        15h às 22h
                      </EventInfoText>
                    </EventInfoItem>

                    <EventInfoItem>
                      <LocationOn />
                      <Box>
                        <EventInfoText className="bold">
                          VILA MALOCA
                        </EventInfoText>
                        <EventInfoText>
                          Rua Manicoré - 278
                        </EventInfoText>
                      </Box>
                    </EventInfoItem>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 3 }} />

                    {/* Descrição */}
                    <EventDescription>
                      Em uma apresentação vibrante que promete ser inesquecível, João Rolla interpretará as canções do seu novo projeto e navegará por um repertório de clássicos que moldaram a música brasileira.
                      <br /><br />
                      Com uma banda completa, trompete, sax, percussão, bateria, guitarra e baixo, espere ouvir releituras cheias de groove swingue de gigantes como Clube da Esquina, Djavan, Jorge Ben, Tim Maia e Vinicius de Moraes. É para curtir, comemorar, dançar e claro: <strong style={{ color: '#E55722' }}>pra falar de amor</strong>
                    </EventDescription>

                    {/* Botão de Comprar Ingressos */}
                    <Box sx={{ mt: 'auto' }}>
                      <BuyTicketButton
                        variant="contained"
                        startIcon={<ConfirmationNumber />}
                        onClick={handleBuyTickets}
                        size="large"
                      >
                        Comprar Ingressos
                      </BuyTicketButton>
                    </Box>
                  </CardContent>
                </EventCard>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </EventContainer>
  );
}

