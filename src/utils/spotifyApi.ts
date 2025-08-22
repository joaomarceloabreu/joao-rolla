'use client';

// Configurações da API do Spotify
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const ARTIST_ID = process.env.NEXT_PUBLIC_SPOTIFY_ARTIST_ID || '55iD3A1B8KCQGFGz2k3OKh';

interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  followers: {
    total: number;
  };
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  tracks: {
    items: SpotifyTrack[];
  };
  external_urls: {
    spotify: string;
  };
}

class SpotifyAPI {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  // Obter token de acesso (Client Credentials Flow)
  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
      throw new Error('Spotify credentials not configured');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      throw new Error('Failed to get Spotify access token');
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // 1 min antes de expirar

    return this.accessToken!;
  }

  // Fazer requisição autenticada para a API
  private async apiRequest(endpoint: string) {
    const token = await this.getAccessToken();
    
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    return response.json();
  }

  // Buscar artista por nome
  async searchArtist(artistName: string): Promise<SpotifyArtist[]> {
    const data = await this.apiRequest(`/search?q=${encodeURIComponent(artistName)}&type=artist&limit=10`);
    return data.artists.items;
  }

  // Obter informações do artista
  async getArtist(artistId: string): Promise<SpotifyArtist> {
    return this.apiRequest(`/artists/${artistId}`);
  }

  // Obter álbuns do artista
  async getArtistAlbums(artistId: string): Promise<SpotifyAlbum[]> {
    const data = await this.apiRequest(`/artists/${artistId}/albums?include_groups=album,single&market=BR&limit=20`);
    return data.items;
  }

  // Obter faixas de um álbum
  async getAlbumTracks(albumId: string): Promise<SpotifyTrack[]> {
    const data = await this.apiRequest(`/albums/${albumId}/tracks?market=BR`);
    return data.items;
  }

  // Obter álbum completo com faixas
  async getAlbum(albumId: string): Promise<SpotifyAlbum> {
    return this.apiRequest(`/albums/${albumId}?market=BR`);
  }

  // Utility: Converter ms para formato MM:SS
  static formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Instância singleton
export const spotifyApi = new SpotifyAPI();

// Funções para buscar dados do Spotify (não como hook para evitar dependências)
export const spotifyDataService = {
  findArtistId: async (artistName: string = "João Rolla") => {
    try {
      const artists = await spotifyApi.searchArtist(artistName);
      console.log('Artistas encontrados:', artists);
      return artists;
    } catch (error) {
      console.error('Erro ao buscar artista:', error);
      return [];
    }
  },

  getArtistData: async (artistId: string = ARTIST_ID) => {
    try {
      const [artist, albums] = await Promise.all([
        spotifyApi.getArtist(artistId),
        spotifyApi.getArtistAlbums(artistId)
      ]);
      
      return { artist, albums };
    } catch (error) {
      console.error('Erro ao obter dados do artista:', error);
      return null;
    }
  },

  // Buscar dados específicos do João Rolla
  getJoaoRollaData: async () => {
    try {
      const data = await spotifyDataService.getArtistData(ARTIST_ID);
      if (!data) return null;

      const { artist, albums } = data;

      // Buscar tracks de cada álbum individualmente usando /albums/{id}/tracks
      const tracksPromises = albums.slice(0, 5).map(async album => {
        try {
          console.log(`🎵 Buscando tracks do álbum: ${album.name} (ID: ${album.id})`);
          
          // Usar getAlbumTracks que faz GET /albums/{id}/tracks
          const tracks = await spotifyApi.getAlbumTracks(album.id);
          
          console.log(`✅ Encontradas ${tracks.length} tracks para ${album.name}`);
          console.log(`🎧 Tracks com preview:`, tracks.filter(t => t.preview_url).length);
          
          return tracks.map(track => ({
            id: track.id,
            name: track.name,
            duration_ms: track.duration_ms,
            preview_url: track.preview_url, // URL do preview de 30s
            external_urls: track.external_urls,
            albumInfo: {
              id: album.id,
              name: album.name,
              image: album.images[0]?.url
            }
          }));
        } catch (error) {
          console.error(`❌ Erro ao buscar tracks do álbum ${album.name} (${album.id}):`, error);
          return [];
        }
      });
      
      const albumTracks = await Promise.all(tracksPromises);
      
      // Combinar todas as faixas com informações do álbum
      const allTracks = albumTracks.flat().map(track => ({
        id: track.id,
        title: track.name,
        duration: SpotifyAPI.formatDuration(track.duration_ms),
        preview: track.preview_url, // URL do preview de 30s
        spotifyUrl: track.external_urls.spotify,
        albumName: track.albumInfo.name,
        albumImage: track.albumInfo.image,
        albumId: track.albumInfo.id
      }));

      console.log('📋 RESUMO FINAL:');
      console.log(`🎵 Total de faixas encontradas: ${allTracks.length}`);
      console.log(`🎧 Faixas com preview: ${allTracks.filter(t => t.preview).length}`);
      console.log(`❌ Faixas sem preview: ${allTracks.filter(t => !t.preview).length}`);
      
      console.log('\n📊 Detalhes por faixa:');
      allTracks.forEach((track, index) => {
        console.log(`${index + 1}. "${track.title}" (${track.albumName})`);
        console.log(`   Preview: ${track.preview ? '✅ DISPONÍVEL' : '❌ NÃO DISPONÍVEL'}`);
        if (track.preview) {
          console.log(`   URL: ${track.preview}`);
        }
        console.log('');
      });

      return {
        artist: {
          id: artist.id,
          name: artist.name,
          followers: artist.followers.total,
          genres: artist.genres,
          image: artist.images[0]?.url,
          spotifyUrl: artist.external_urls.spotify
        },
        albums: albums.map(album => ({
          id: album.id,
          name: album.name,
          releaseDate: album.release_date,
          image: album.images[0]?.url,
          spotifyUrl: album.external_urls.spotify
        })),
        tracks: allTracks
      };
    } catch (error) {
      console.error('Erro ao buscar dados do João Rolla:', error);
      return null;
    }
  }
};

// Hook simplificado
export const useSpotifyData = () => {
  return {
    findArtistId: spotifyDataService.findArtistId,
    getArtistData: spotifyDataService.getArtistData,
    getJoaoRollaData: spotifyDataService.getJoaoRollaData,
    formatDuration: SpotifyAPI.formatDuration
  };
};
