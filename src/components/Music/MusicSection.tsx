'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  IconButton, 
  Container,
  Grid,
  Chip,
  Button
} from '@mui/material';
import { PlayArrow, Pause, MusicNote, Album } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { upcomingEP, artistInfo } from '@/lib/mockData';

const MusicContainer = styled(Box)`
  padding: 100px 0;
  background: 
    linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%);
`;

const SectionTitle = styled(Typography)`
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 24px !important;
`;

const SectionSubtitle = styled(Typography)`
  color: #B3B3B3 !important;
  text-align: center;
  margin-bottom: 60px !important;
  max-width: 600px;
  margin-left: auto !important;
  margin-right: auto !important;
`;

const EPCard = styled(Card)`
  background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%) !important;
  border: 1px solid #333 !important;
  border-radius: 20px !important;
  overflow: hidden;
  transition: all 0.3s ease !important;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2) !important;
    border-color: #FF6B35 !important;
  }
`;

const EPCover = styled(Box)`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
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
    opacity: 0.8;
  }
`;

const TrackCard = styled(Card)`
  background: #1A1A1A !important;
  border: 1px solid #333 !important;
  border-radius: 12px !important;
  margin-bottom: 12px;
  transition: all 0.3s ease !important;
  
  &:hover {
    background: #222 !important;
    border-color: #FF6B35 !important;
    transform: translateX(8px);
  }
`;

const PlayButton = styled(IconButton)`
  background: linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%) !important;
  color: white !important;
  width: 50px !important;
  height: 50px !important;
  
  &:hover {
    background: linear-gradient(135deg, #E55A2B 0%, #D44A20 100%) !important;
    transform: scale(1.1);
  }
`;

const GenreChip = styled(Chip)`
  background: rgba(78, 205, 196, 0.2) !important;
  color: #4ECDC4 !important;
  border: 1px solid #4ECDC4 !important;
  margin: 4px !important;
`;

const SpotifyButton = styled(Button)`
  background: #1DB954 !important;
  color: white !important;
  font-weight: 600 !important;
  text-transform: none !important;
  padding: 12px 24px !important;
  border-radius: 25px !important;
  margin-top: 24px !important;
  
  &:hover {
    background: #1AA34A !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(29, 185, 84, 0.3) !important;
  }
`;

export default function MusicSection() {
  const [currentTrack, setCurrentTrack] = React.useState<number | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayPause = (trackIndex: number) => {
    if (currentTrack === trackIndex && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrack(trackIndex);
      setIsPlaying(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <MusicContainer>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <SectionTitle variant="h2">
              Música
            </SectionTitle>
            <SectionSubtitle variant="h6">
              Explore minha jornada musical através de sons únicos e experiências imersivas
            </SectionSubtitle>
          </motion.div>

          <Grid container spacing={4} alignItems="stretch">
            {/* EP Information */}
            <Grid item xs={12} md={5}>
              <motion.div variants={itemVariants}>
                <EPCard>
                  <EPCover>
                    <Album sx={{ fontSize: 80, color: 'white', zIndex: 2 }} />
                  </EPCover>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                      {upcomingEP.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#4ECDC4', fontWeight: 600, mb: 2 }}>
                      {upcomingEP.releaseDate}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B3B3B3', mb: 3, lineHeight: 1.6 }}>
                      {upcomingEP.description}
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      {artistInfo.genres.map((genre) => (
                        <GenreChip
                          key={genre}
                          label={genre}
                          size="small"
                        />
                      ))}
                    </Box>

                    <SpotifyButton
                      startIcon={<MusicNote />}
                      fullWidth
                    >
                      Ouvir no Spotify
                    </SpotifyButton>
                  </CardContent>
                </EPCard>
              </motion.div>
            </Grid>

            {/* Track List */}
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                  Faixas do EP
                </Typography>
                
                {upcomingEP.tracks.map((track, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <TrackCard>
                      <CardContent sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        p: 2,
                        '&:last-child': { pb: 2 }
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                          <PlayButton
                            onClick={() => handlePlayPause(index)}
                            size="small"
                          >
                            {currentTrack === index && isPlaying ? <Pause /> : <PlayArrow />}
                          </PlayButton>
                          
                          <Box sx={{ ml: 2, flex: 1 }}>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                              {index + 1}. {track.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#B3B3B3' }}>
                              {track.duration}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ color: '#666', mr: 2 }}>
                            Preview
                          </Typography>
                          <Box sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #FF6B35 0%, #4ECDC4 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <MusicNote sx={{ color: 'white', fontSize: 20 }} />
                          </Box>
                        </Box>
                      </CardContent>
                    </TrackCard>
                  </motion.div>
                ))}
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </MusicContainer>
  );
}