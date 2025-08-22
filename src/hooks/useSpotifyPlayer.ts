'use client';

import { useState, useRef, useEffect } from 'react';

interface Track {
  title: string;
  duration: string;
  preview?: string;
  spotifyUrl?: string;
}

export const useSpotifyPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Criar elemento de áudio quando necessário
  const createAudioElement = (src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(src);
    audio.volume = volume;
    audio.preload = 'metadata';

    // Event listeners
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    audio.addEventListener('error', (e) => {
      console.error('Erro ao carregar áudio:', e);
      setIsPlaying(false);
    });

    audioRef.current = audio;
    return audio;
  };

  const playTrack = async (trackIndex: number, previewUrl: string) => {
    try {
      // Se é a mesma faixa, apenas pause/resume
      if (currentTrack === trackIndex && audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
        return;
      }

      // Nova faixa
      const audio = createAudioElement(previewUrl);
      setCurrentTrack(trackIndex);
      
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Erro ao tocar música:', error);
      setIsPlaying(false);
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const openSpotify = (spotifyUrl?: string) => {
    if (spotifyUrl) {
      window.open(spotifyUrl, '_blank');
    } else {
      // URL padrão do artista (você pode personalizar)
      window.open('https://open.spotify.com/artist/your-artist-id', '_blank');
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    playTrack,
    pauseTrack,
    stopTrack,
    seekTo,
    changeVolume,
    openSpotify
  };
};
