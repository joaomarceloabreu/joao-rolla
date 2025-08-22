'use client';
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  IconButton, 
  Container,
  Grid,
  Chip,
  Button,
  LinearProgress,
  Slider,
  CircularProgress
} from '@mui/material';
import { 
  PlayArrow, 
  Pause, 
  MusicNote, 
  Album, 
  OpenInNew,
  VolumeUp,
  SkipNext,
  SkipPrevious
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useSpotifyPlayer } from '@/hooks/useSpotifyPlayer';
import { useSpotifyData } from '@/utils/spotifyApi';

const MusicContainer = styled(Box)`
  padding: 100px 0;
  background: 
    linear-gradient(180deg, #3A3A3A 0%, #3A3A3A 50%, #3A3A3A 100%);
`;

const SectionTitle = styled(Typography)`
  background: linear-gradient(135deg, #E55722 0%, #F4A842 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900 !important;
  text-align: center;
  margin-bottom: 24px !important;
`;

const SectionSubtitle = styled(Typography)`
  color: #E5D4C1 !important;
  text-align: center;
  margin-bottom: 60px !important;
  max-width: 600px;
  margin-left: auto !important;
  margin-right: auto !important;
`;

const EPCard = styled(Card)`
  background: linear-gradient(135deg, #3A3A3A 0%, #3A3A3A 100%) !important;
  border: 1px solid #333 !important;
  border-radius: 20px !important;
  overflow: hidden;
  transition: all 0.3s ease !important;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(229, 87, 34, 0.2) !important;
    border-color: #E55722 !important;
  }
`;

const EPCover = styled(Box)`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #E55722 0%, #F4A842 100%);
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
  background: #3A3A3A !important;
  border: 1px solid #333 !important;
  border-radius: 12px !important;
  margin-bottom: 12px;
  transition: all 0.3s ease !important;
  
  &:hover {
    background: #222 !important;
    border-color: #E55722 !important;
    transform: translateX(8px);
  }
`;

const PlayButton = styled(IconButton)`
  background: linear-gradient(135deg, #E55722 0%, #E55A2B 100%) !important;
  color: white !important;
  width: 50px !important;
  height: 50px !important;
  
  &:hover {
    background: linear-gradient(135deg, #B91C3C 0%, #8B9456 100%) !important;
    transform: scale(1.1);
  }
`;

const GenreChip = styled(Chip)`
  background: rgba(139, 148, 86, 0.2) !important;
  color: #8B9456 !important;
  border: 1px solid #8B9456 !important;
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

const MiniPlayer = styled(Box)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #3A3A3A 0%, #3A3A3A 100%);
  border: 1px solid #E55722;
  border-radius: 16px;
  padding: 16px;
  min-width: 300px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const PlayerControls = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

const ProgressContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const TrackInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SpotifyLinkButton = styled(IconButton)`
  background: rgba(29, 185, 84, 0.1) !important;
  color: #1DB954 !important;
  
  &:hover {
    background: rgba(29, 185, 84, 0.2) !important;
    transform: scale(1.1);
  }
`;

interface SpotifyArtist {
  id: string;
  name: string;
  followers: number;
  genres: string[];
  image: string;
  spotifyUrl: string;
}

interface SpotifyTrack {
  name: string;
  duration_ms: number;
  preview_url?: string;
  external_urls: { spotify: string };
  album: { images: { url: string }[] };
}

interface SpotifyData {
  artist: SpotifyArtist;
  albums: unknown[];
  tracks: unknown[];
}

export default function MusicSection() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getJoaoRollaData } = useSpotifyData();
  
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    playTrack,
    pauseTrack,
    seekTo,
    changeVolume,
    openSpotify
  } = useSpotifyPlayer();

  // Carregar dados do Spotify na inicialização
  useEffect(() => {
    const loadSpotifyData = async () => {
      try {
        setLoading(true);
        const data = await getJoaoRollaData();
        if (data) {
          console.log('Dados do Spotify carregados:', data);
          console.log('Imagem do artista:', data.artist.image);
          setSpotifyData(data);
        } else {
          setError('Não foi possível carregar os dados do Spotify');
        }
      } catch (err) {
        setError('Erro ao conectar com a API do Spotify');
        console.error('Erro ao carregar dados:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSpotifyData();
  }, []); // Array vazio para executar apenas uma vez

  const handlePlayPause = (trackIndex: number) => {
    if (!spotifyData?.tracks) return;
    
    const track = spotifyData.tracks[trackIndex] as any;
    
    if (track.preview) {
      playTrack(trackIndex, track.preview);
    } else {
      // Se não há preview, abrir diretamente no Spotify
      openSpotify(track.spotifyUrl);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (loading) {
    return (
      <MusicContainer>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '400px',
            gap: 3
          }}>
            <CircularProgress size={60} sx={{ color: '#E55722' }} />
            <Typography variant="h6" sx={{ color: 'white' }}>
              Carregando dados do Spotify...
            </Typography>
          </Box>
        </Container>
      </MusicContainer>
    );
  }

  // Error state
  if (error || !spotifyData) {
    return (
      <MusicContainer>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '400px',
            gap: 3
          }}>
            <Typography variant="h6" sx={{ color: '#E55722' }}>
              {error || 'Dados não disponíveis'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#E5D4C1', textAlign: 'center' }}>
              Verifique suas credenciais do Spotify ou tente novamente mais tarde.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()}
              sx={{ 
                background: 'linear-gradient(135deg, #E55722 0%, #F4A842 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #B91C3C 0%, #8B9456 100%)',
                }
              }}
            >
              Tentar Novamente
            </Button>
          </Box>
        </Container>
      </MusicContainer>
    );
  }

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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
              {spotifyData.artist.image && (
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #E55722'
                }}>
                  <img
                    src={spotifyData.artist.image}
                    alt={spotifyData.artist.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
              )}
              <SectionTitle variant="h2">
                Música
              </SectionTitle>
            </Box>
            <SectionSubtitle variant="h6">
              Explore minha jornada musical através de sons únicos e experiências imersivas
            </SectionSubtitle>
          </motion.div>

          <Grid container spacing={4} alignItems="stretch">
            {/* EP Information */}
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div variants={itemVariants}>
                <EPCard>
                  <EPCover>
                    {spotifyData.artist.image ? (
                      <Box sx={{ 
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(135deg, rgba(229, 87, 34, 0.3) 0%, rgba(139, 148, 86, 0.3) 100%)',
                          zIndex: 2
                        }
                      }}>
                        <img
                          src={spotifyData.artist.image}
                          alt={`Foto do artista ${spotifyData.artist.name}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0
                          }}
                        />
                        <Box sx={{
                          position: 'absolute',
                          bottom: 20,
                          right: 20,
                          zIndex: 3,
                          background: 'rgba(0, 0, 0, 0.7)',
                          borderRadius: '50%',
                          padding: '12px',
                          backdropFilter: 'blur(10px)'
                        }}>
                          <Album sx={{ fontSize: 24, color: 'white' }} />
                        </Box>
                      </Box>
                    ) : (
                      <Album sx={{ fontSize: 80, color: 'white', zIndex: 2 }} />
                    )}
                  </EPCover>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                      {spotifyData.artist.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#8B9456', fontWeight: 600, mb: 2 }}>
                      {spotifyData.artist.followers.toLocaleString()} seguidores
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#E5D4C1', mb: 3, lineHeight: 1.6 }}>
                      Últimos lançamentos no Spotify
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      {spotifyData.artist.genres.slice(0, 4).map((genre: string) => (
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
                      onClick={() => openSpotify(spotifyData.artist.spotifyUrl)}
                    >
                      Perfil no Spotify
                    </SpotifyButton>
                  </CardContent>
                </EPCard>
              </motion.div>
            </Grid>

            {/* Track List */}
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div variants={itemVariants}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
                  Músicas no Spotify ({spotifyData.tracks.length})
                </Typography>
                
                {(spotifyData.tracks as any[]).map((track, index) => (
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
                          {/* Album Cover */}
                          <Box sx={{ 
                            width: 50, 
                            height: 50, 
                            borderRadius: '8px',
                            overflow: 'hidden',
                            mr: 2,
                            flexShrink: 0
                          }}>
                            <img
                              src={track.albumImage || '/api/placeholder/50/50'}
                              alt={`Capa do álbum ${track.albumName}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                              onError={(e) => {
                                // Fallback para ícone se imagem falhar
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <div style="
                                      width: 100%; 
                                      height: 100%; 
                                      background: linear-gradient(135deg, #E55722 0%, #F4A842 100%);
                                      display: flex;
                                      align-items: center;
                                      justify-content: center;
                                    ">
                                      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                      </svg>
                                    </div>
                                  `;
                                }
                              }}
                            />
                          </Box>

                          <PlayButton
                            onClick={() => handlePlayPause(index)}
                            size="small"
                            title={track.preview ? 'Tocar preview de 30s' : 'Ouvir no Spotify'}
                            sx={{ mr: 2 }}
                          >
                            {currentTrack === index && isPlaying ? <Pause /> : <PlayArrow />}
                          </PlayButton>
                          
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                              {index + 1}. {track.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#E5D4C1' }}>
                              {track.duration} {track.preview ? '• Preview 30s' : '• Ouvir no Spotify'}
                            </Typography>
                            {track.albumName && (
                              <Typography variant="caption" sx={{ color: '#8B9456', fontSize: '0.75rem' }}>
                                Álbum: {track.albumName}
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ color: '#8B9456' }}>
                            Preview 30s
                          </Typography>
                          <SpotifyLinkButton
                            onClick={(e) => {
                              e.stopPropagation();
                              openSpotify(track.spotifyUrl);
                            }}
                            size="small"
                            title="Ouvir completa no Spotify"
                          >
                            <OpenInNew fontSize="small" />
                          </SpotifyLinkButton>
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

      {/* Mini Player Flutuante */}
      <AnimatePresence>
        {currentTrack !== null && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <MiniPlayer>
              <TrackInfo>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #E55722 0%, #F4A842 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {(spotifyData.tracks[currentTrack] as any)?.albumImage ? (
                    <img
                      src={(spotifyData.tracks[currentTrack] as any).albumImage}
                      alt={`Capa ${(spotifyData.tracks[currentTrack] as any).albumName}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <Album sx={{ color: 'white', fontSize: 20 }} />
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                    {(spotifyData.tracks[currentTrack] as any)?.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#E5D4C1' }}>
                    {spotifyData.artist.name}
                  </Typography>
                </Box>
                <SpotifyLinkButton
                  onClick={() => openSpotify((spotifyData.tracks[currentTrack] as any)?.spotifyUrl)}
                  size="small"
                >
                  <OpenInNew fontSize="small" />
                </SpotifyLinkButton>
              </TrackInfo>

              <PlayerControls>
                <IconButton
                  onClick={() => handlePlayPause(Math.max(0, currentTrack - 1))}
                  disabled={currentTrack === 0}
                  sx={{ color: 'white' }}
                >
                  <SkipPrevious />
                </IconButton>
                
                <IconButton
                  onClick={() => isPlaying ? pauseTrack() : handlePlayPause(currentTrack)}
                  sx={{ 
                    color: 'white',
                    background: 'linear-gradient(135deg, #E55722 0%, #F4A842 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #B91C3C 0%, #8B9456 100%)',
                    }
                  }}
                >
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>

                <IconButton
                  onClick={() => handlePlayPause(Math.min(spotifyData.tracks.length - 1, currentTrack + 1))}
                  disabled={currentTrack === spotifyData.tracks.length - 1}
                  sx={{ color: 'white' }}
                >
                  <SkipNext />
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2, flex: 1 }}>
                  <VolumeUp sx={{ color: '#E5D4C1', fontSize: 20 }} />
                  <Slider
                    size="small"
                    value={volume}
                    onChange={(_, value) => changeVolume(value as number)}
                    min={0}
                    max={1}
                    step={0.1}
                    sx={{
                      color: '#E55722',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#E55722',
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#E55722',
                      }
                    }}
                  />
                </Box>
              </PlayerControls>

              <ProgressContainer>
                <Typography variant="caption" sx={{ color: '#E5D4C1', minWidth: 40 }}>
                  {formatTime(currentTime)}
                </Typography>
                <Slider
                  size="small"
                  value={currentTime}
                  onChange={(_, value) => seekTo(value as number)}
                  min={0}
                  max={duration || 100}
                  sx={{
                    flex: 1,
                    color: '#8B9456',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#8B9456',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#8B9456',
                    }
                  }}
                />
                <Typography variant="caption" sx={{ color: '#E5D4C1', minWidth: 40 }}>
                  {formatTime(duration)}
                </Typography>
              </ProgressContainer>
            </MiniPlayer>
          </motion.div>
        )}
      </AnimatePresence>
    </MusicContainer>
  );
}