'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip
} from '@mui/material';
import { Search, ContentCopy } from '@mui/icons-material';
import { useSpotifyData } from '@/utils/spotifyApi';

export default function SpotifyDebug() {
  const [searchTerm, setSearchTerm] = useState('João Rolla');
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { findArtistId } = useSpotifyData();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await findArtistId(searchTerm);
      setArtists(results);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copiado: ${text}`);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        🔍 Spotify Artist ID Finder
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Nome do Artista"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={handleSearch}
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </Box>

      {artists.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Artistas Encontrados:
            </Typography>
            <List>
              {artists.map((artist, index) => (
                <ListItem key={artist.id} divider={index < artists.length - 1}>
                  <ListItemAvatar>
                    <Avatar 
                      src={artist.images?.[0]?.url} 
                      alt={artist.name}
                      sx={{ width: 60, height: 60 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6">{artist.name}</Typography>
                        <Chip 
                          size="small" 
                          label={`${artist.followers?.total?.toLocaleString()} seguidores`}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>ID:</strong> {artist.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Gêneros:</strong> {artist.genres?.join(', ') || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>URL:</strong> {artist.external_urls?.spotify}
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            startIcon={<ContentCopy />}
                            onClick={() => copyToClipboard(artist.id)}
                          >
                            Copiar ID
                          </Button>
                          <Button
                            size="small"
                            onClick={() => copyToClipboard(artist.external_urls?.spotify)}
                          >
                            Copiar URL
                          </Button>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          📝 Como usar:
        </Typography>
        <Typography variant="body2" paragraph>
          1. Digite seu nome artístico no campo acima
        </Typography>
        <Typography variant="body2" paragraph>
          2. Clique em "Buscar" para encontrar seu perfil no Spotify
        </Typography>
        <Typography variant="body2" paragraph>
          3. Copie o ID do artista correto
        </Typography>
        <Typography variant="body2" paragraph>
          4. Use esse ID no arquivo mockData.ts ou nas variáveis de ambiente
        </Typography>
      </Box>
    </Box>
  );
}
