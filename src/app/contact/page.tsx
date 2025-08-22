'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import { 
  Email, 
  Phone, 
  LocationOn, 
  Instagram, 
  YouTube, 
  Twitter, 
  MusicNote,
  Send
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { artistInfo, pressKit } from '@/lib/mockData';

const ContactContainer = styled(Box)`
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

const ContactCard = styled(Card)`
  background: #1A1A1A !important;
  border: 1px solid #333 !important;
  border-radius: 20px !important;
  padding: 40px;
  height: 100%;
`;

const ContactForm = styled(Card)`
  background: #1A1A1A !important;
  border: 1px solid #333 !important;
  border-radius: 20px !important;
  padding: 40px;
`;

const SocialIcon = styled(IconButton)`
  background: rgba(255, 107, 53, 0.1) !important;
  color: #FF6B35 !important;
  margin: 8px !important;
  
  &:hover {
    background: rgba(255, 107, 53, 0.2) !important;
    transform: translateY(-3px);
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 16px 32px !important;
  border-radius: 12px !important;
  font-size: 1.1rem !important;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3) !important;
  }
`;

const ContactInfo = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 107, 53, 0.05);
  border: 1px solid rgba(255, 107, 53, 0.2);
`;

const socialLinks = [
  { icon: <MusicNote />, url: artistInfo.socialMedia.spotify, label: 'Spotify' },
  { icon: <Instagram />, url: `https://instagram.com/${artistInfo.socialMedia.instagram.replace('@', '')}`, label: 'Instagram' },
  { icon: <YouTube />, url: artistInfo.socialMedia.youtube, label: 'YouTube' },
  { icon: <Twitter />, url: `https://twitter.com/${artistInfo.socialMedia.twitter.replace('@', '')}`, label: 'Twitter' },
];

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria o envio do formulário
    console.log('Form submitted:', formData);
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <ContactContainer>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <PageTitle variant="h1">
              Contato
            </PageTitle>
          </motion.div>

          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} md={5}>
              <motion.div variants={itemVariants}>
                <ContactCard>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 3 }}>
                    Vamos Conversar
                  </Typography>
                  
                  <Typography variant="body1" sx={{ color: '#B3B3B3', mb: 4, lineHeight: 1.6 }}>
                    Entre em contato para parcerias, shows, entrevistas ou apenas para trocar uma ideia sobre música!
                  </Typography>

                  <ContactInfo>
                    <Email sx={{ color: '#FF6B35', mr: 2, fontSize: '1.5rem' }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                        Email Geral
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#B3B3B3' }}>
                        {pressKit.contact.management}
                      </Typography>
                    </Box>
                  </ContactInfo>

                  <ContactInfo>
                    <Email sx={{ color: '#FF6B35', mr: 2, fontSize: '1.5rem' }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                        Imprensa
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#B3B3B3' }}>
                        {pressKit.contact.press}
                      </Typography>
                    </Box>
                  </ContactInfo>

                  <ContactInfo>
                    <MusicNote sx={{ color: '#FF6B35', mr: 2, fontSize: '1.5rem' }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                        Shows & Booking
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#B3B3B3' }}>
                        {pressKit.contact.booking}
                      </Typography>
                    </Box>
                  </ContactInfo>

                  <ContactInfo>
                    <LocationOn sx={{ color: '#FF6B35', mr: 2, fontSize: '1.5rem' }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                        Localização
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#B3B3B3' }}>
                        {artistInfo.location}
                      </Typography>
                    </Box>
                  </ContactInfo>

                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                      Redes Sociais
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {socialLinks.map((social) => (
                        <motion.div
                          key={social.label}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <SocialIcon
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                          >
                            {social.icon}
                          </SocialIcon>
                        </motion.div>
                      ))}
                    </Box>
                  </Box>
                </ContactCard>
              </motion.div>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <ContactForm>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                    Envie uma Mensagem
                  </Typography>
                  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Nome"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          sx={{
                            '& .MuiInputLabel-root': { color: '#B3B3B3' },
                            '& .MuiOutlinedInput-root': {
                              color: 'white',
                              '& fieldset': { borderColor: '#333' },
                              '&:hover fieldset': { borderColor: '#FF6B35' },
                              '&.Mui-focused fieldset': { borderColor: '#FF6B35' }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          sx={{
                            '& .MuiInputLabel-root': { color: '#B3B3B3' },
                            '& .MuiOutlinedInput-root': {
                              color: 'white',
                              '& fieldset': { borderColor: '#333' },
                              '&:hover fieldset': { borderColor: '#FF6B35' },
                              '&.Mui-focused fieldset': { borderColor: '#FF6B35' }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Assunto"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          sx={{
                            '& .MuiInputLabel-root': { color: '#B3B3B3' },
                            '& .MuiOutlinedInput-root': {
                              color: 'white',
                              '& fieldset': { borderColor: '#333' },
                              '&:hover fieldset': { borderColor: '#FF6B35' },
                              '&.Mui-focused fieldset': { borderColor: '#FF6B35' }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Mensagem"
                          name="message"
                          multiline
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          sx={{
                            '& .MuiInputLabel-root': { color: '#B3B3B3' },
                            '& .MuiOutlinedInput-root': {
                              color: 'white',
                              '& fieldset': { borderColor: '#333' },
                              '&:hover fieldset': { borderColor: '#FF6B35' },
                              '&.Mui-focused fieldset': { borderColor: '#FF6B35' }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <SubmitButton
                            type="submit"
                            startIcon={<Send />}
                            fullWidth
                          >
                            Enviar Mensagem
                          </SubmitButton>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </form>
                </ContactForm>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </ContactContainer>
  );
}