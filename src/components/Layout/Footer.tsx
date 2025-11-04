'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  IconButton, 
  Button,
  Divider
} from '@mui/material';
import { 
  Instagram, 
  WhatsApp,
  MusicNote,
  Email,
  LocationOn
} from '@mui/icons-material';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FooterContainer = styled(Box)`
  background: rgba(10, 10, 10, 0.90);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(90, 107, 58, 0.3);
  padding: 60px 0 30px;
  margin-top: auto;
`;

const SocialIcon = styled(IconButton)`
  color: #E5D4C1 !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    color: #E55722 !important;
    transform: translateY(-3px);
  }
`;

const FooterLogo = styled(Typography)`
  color: white !important;
  font-weight: 900 !important;
  font-size: 2rem !important;
  letter-spacing: -0.02em;
  margin-bottom: 16px !important;
`;

const FooterSection = styled(Box)`
  margin-bottom: 32px;
  text-align: center;
`;

const FooterLink = styled(Typography)`
  color: #E5D4C1;
  cursor: pointer;
  transition: color 0.3s ease;
  margin-bottom: 8px;
  
  &:hover {
    color: #E55722;
  }
`;

const NewsletterButton = styled(Button)`
  background: linear-gradient(135deg, #E55722 0%, #F4A842 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  margin-top: 16px !important;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

// const socialLinks = [
//   { icon: <MusicNote />, url: artistInfo.socialMedia.spotify, label: 'Spotify' },
//   { icon: <Instagram />, url: `https://instagram.com/${artistInfo.socialMedia.instagram.replace('@', '')}`, label: 'Instagram' },
//   { icon: <YouTube />, url: artistInfo.socialMedia.youtube, label: 'YouTube' },
//   { icon: <Twitter />, url: `https://twitter.com/${artistInfo.socialMedia.twitter.replace('@', '')}`, label: 'Twitter' },
// ];

const quickLinks = [
  { label: 'Sobre', href: '/about' },
  { label: 'Música', href: '/music' },
  { label: 'Galeria', href: '/gallery' },
  { label: 'Loja', href: '/shop' },
];

export default function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FooterSection>
              <FooterLogo variant="h4">João Rolla</FooterLogo>
              <Typography variant="body2" color="#E5D4C1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {/* {artistInfo.tagline} */}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 3, justifyContent: 'center' }}>
                <SocialIcon aria-label="Instagram">
                  <Instagram onClick={() => window.open('https://www.instagram.com/rollajoao/', '_blank')} />
                </SocialIcon>
                <SocialIcon aria-label="Spotify">
                  <MusicNote onClick={() => window.open('https://open.spotify.com/artist/55iD3A1B8KCQGFGz2k3OKh', '_blank')} />
                </SocialIcon>
                <SocialIcon aria-label="WhatsApp">
                  <WhatsApp onClick={() => window.open('https://wa.me/5531993170820', '_blank')} />
                </SocialIcon>
              </Box>
            </FooterSection>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, md: 2 }}>
            <FooterSection>
              <Typography variant="h6" color="white" sx={{ mb: 2, fontWeight: 600 }}>
                Navegação
              </Typography>
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.href} style={{ textDecoration: 'none' }}>
                  <FooterLink variant="body2">
                    {link.label}
                  </FooterLink>
                </Link>
              ))}
            </FooterSection>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FooterSection>
              <Typography variant="h6" color="white" sx={{ mb: 2, fontWeight: 600 }}>
                Contato
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <LocationOn sx={{ color: '#E5D4C1', mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="#E5D4C1">
                  Belo Horizonte, MG
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Email sx={{ color: '#E5D4C1', mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="#E5D4C1">
                joaorollaneto@gmail.com
                </Typography>
              </Box>
            </FooterSection>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#333' }} />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant="body2" color="#666">
            © 2025 João Rolla. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
}