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
  YouTube, 
  Twitter, 
  MusicNote,
  Email,
  LocationOn
} from '@mui/icons-material';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { artistInfo } from '@/lib/mockData';

const FooterContainer = styled(Box)`
  background: linear-gradient(180deg, #0A0A0A 0%, #111111 100%);
  border-top: 1px solid #333;
  padding: 60px 0 30px;
  margin-top: auto;
`;

const SocialIcon = styled(IconButton)`
  color: #B3B3B3 !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    color: #FF6B35 !important;
    transform: translateY(-3px);
  }
`;

const FooterLogo = styled(Typography)`
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  font-size: 2rem !important;
  letter-spacing: -0.02em;
  margin-bottom: 16px !important;
`;

const FooterSection = styled(Box)`
  margin-bottom: 32px;
`;

const FooterLink = styled(Typography)`
  color: #B3B3B3;
  cursor: pointer;
  transition: color 0.3s ease;
  margin-bottom: 8px;
  
  &:hover {
    color: #FF6B35;
  }
`;

const NewsletterButton = styled(Button)`
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  margin-top: 16px !important;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3) !important;
  }
`;

const socialLinks = [
  { icon: <MusicNote />, url: artistInfo.socialMedia.spotify, label: 'Spotify' },
  { icon: <Instagram />, url: `https://instagram.com/${artistInfo.socialMedia.instagram.replace('@', '')}`, label: 'Instagram' },
  { icon: <YouTube />, url: artistInfo.socialMedia.youtube, label: 'YouTube' },
  { icon: <Twitter />, url: `https://twitter.com/${artistInfo.socialMedia.twitter.replace('@', '')}`, label: 'Twitter' },
];

const quickLinks = [
  { label: 'Sobre', href: '/about' },
  { label: 'Música', href: '/music' },
  { label: 'Galeria', href: '/gallery' },
  { label: 'Loja', href: '/shop' },
  { label: 'Contato', href: '/contact' },
];

export default function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FooterSection>
              <FooterLogo variant="h4">João Rolla</FooterLogo>
              <Typography variant="body2" color="#B3B3B3" sx={{ mb: 3, lineHeight: 1.6 }}>
                {artistInfo.tagline}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <SocialIcon aria-label={social.label}>
                        {social.icon}
                      </SocialIcon>
                    </a>
                  </motion.div>
                ))}
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ color: '#B3B3B3', mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="#B3B3B3">
                  {artistInfo.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ color: '#B3B3B3', mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="#B3B3B3">
                  contato@arianova.com.br
                </Typography>
              </Box>
            </FooterSection>
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FooterSection>
              <Typography variant="h6" color="white" sx={{ mb: 2, fontWeight: 600 }}>
                Newsletter
              </Typography>
              <Typography variant="body2" color="#B3B3B3" sx={{ mb: 2 }}>
                Receba novidades sobre lançamentos e shows exclusivos.
              </Typography>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <NewsletterButton fullWidth>
                  Inscrever-se
                </NewsletterButton>
              </motion.div>
            </FooterSection>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#333' }} />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}>
          <Typography variant="body2" color="#666">
            © 2025 João Rolla. Todos os direitos reservados.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FooterLink variant="body2">Política de Privacidade</FooterLink>
            <FooterLink variant="body2">Termos de Uso</FooterLink>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
}