// Dados mockados para demonstração e brainstorming
import { GalleryData } from '@/types/gallery';

export const artistInfo = {
  name: "João Rolla",
  tagline: "Representante da boemia no século XXI",
  bio: "Nascido e criado em João Monlevade e hoje vivendo em Belo Horizonte, João Rolla traz consigo um legado musical que começou na igreja. Desde 2020, encanta os ouvidos com suas próprias composições que misturam samba, rock e aquela batida que faz até os santos dançarem no céu! Com humor e irreverência, inspirado por Jorge Ben Jor, Tim Maia e Vinicius de Moraes, cria um som único capaz de fazer até as estátuas de Aleijadinho se mexerem!",
  location: "Belo Horizonte, MG",
  genres: ["Samba", "Rock", "MPB", "Groove"],
  followers: 272,
  monthlyListeners: 38,
  socialMedia: {
    spotify: "https://open.spotify.com/artist/55iD3A1B8KCQGFGz2k3OKh",
    instagram: "@joaorolla.music",
    youtube: "https://youtube.com/@joaorollamusic",
    tiktok: "@joaorolla",
    twitter: "@joaorollamusic"
  }
};

export const upcomingEP = {
  title: "Só queria falar de amor",
  releaseDate: "Em breve",
  description: "Um álbum que celebra a filosofia 'mente sã e samba', trazendo faixas que navegam pela cultura brasileira e pelo bem-estar através da música.",
  coverArt: "/images/placeholder-400x400.svg",
  tracks: [
    { 
      title: "Dawn", 
      duration: "3:42", 
      preview: "https://p.scdn.co/mp3-preview/9af2948ac8b56d9ad0347d7b5b49b5c62cf863a8?cid=your-client-id",
      spotifyUrl: "https://open.spotify.com/track/example1"
    },
    { 
      title: "Neon Dreams", 
      duration: "4:15", 
      preview: "https://p.scdn.co/mp3-preview/example2",
      spotifyUrl: "https://open.spotify.com/track/example2"
    },
    { 
      title: "Midnight Revival", 
      duration: "3:58", 
      preview: "https://p.scdn.co/mp3-preview/example3",
      spotifyUrl: "https://open.spotify.com/track/example3"
    },
    { 
      title: "Solar Flare", 
      duration: "4:22", 
      preview: "https://p.scdn.co/mp3-preview/example4",
      spotifyUrl: "https://open.spotify.com/track/example4"
    },
    { 
      title: "Aurora", 
      duration: "5:01", 
      preview: "https://p.scdn.co/mp3-preview/example5",
      spotifyUrl: "https://open.spotify.com/track/example5"
    }
  ],
  spotifyAlbumUrl: "https://open.spotify.com/album/your-album-id",
  spotifyArtistUrl: "https://open.spotify.com/artist/your-artist-id"
};

export const gallery: GalleryData = {
  photos: [
    {
      id: 1,
      url: "/images/gallery/1.png",
      title: "Sessão de fotos - Estúdio",
      description: "Registros íntimos do processo criativo no estúdio"
    },
    {
      id: 2,
      url: "/images/gallery/2.png",
      title: "Behind the Scenes - Gravação",
      description: "Momentos especiais durante a gravação do EP AURORA"
    },
    {
      id: 3,
      url: "/images/gallery/3.png",
      title: "Ensaio Conceitual",
      description: "Ensaio fotográfico explorando a identidade visual do artista"
    },
    {
      id: 4,
      url: "/images/gallery/4.png",
      title: "Processo Criativo",
      description: "Rascunhos e anotações musicais"
    },
    {
      id: 5,
      url: "/images/gallery/5.png",
      title: "Instrumentos",
      description: "Os instrumentos que dão vida às composições"
    }
  ],
  sketches: [
    {
      id: 1,
      url: "/images/gallery/3.png",
      title: "Composição - Dawn",
      description: "Rascunho original da primeira faixa do EP"
    },
    {
      id: 2,
      url: "/images/gallery/4.png",
      title: "Arte Conceitual - Aurora",
      description: "Estudos visuais para a capa do EP"
    },
    {
      id: 3,
      url: "/images/gallery/5.png",
      title: "Lettering Studies",
      description: "Estudos tipográficos para a identidade visual"
    }
  ]
};

export const pressKit = {
  bio: {
    short: "João Rolla é um artista emergente que combina elementos eletrônicos contemporâneos com melodias orgânicas.",
    medium: artistInfo.bio,
    long: `${artistInfo.bio} 

Nascido em São Paulo, João Rolla começou sua jornada musical aos 15 anos, explorando diferentes instrumentos e softwares de produção. Sua sonoridade única é resultado de uma combinação cuidadosa entre elementos orgânicos e sintéticos, criando paisagens sonoras que transportam o ouvinte para universos paralelos.

O EP de estreia "AURORA" representa não apenas o início de sua carreira profissional, mas também uma declaração artística de suas intenções musicais: explorar territórios sonoros inexplorados e conectar-se genuinamente com seu público através da música.`
  },
  photos: {
    press: [
      "https://via.placeholder.com/800x600/E55722/FFFFFF?text=Press+Photo+1",
      "https://via.placeholder.com/800x600/F4A842/FFFFFF?text=Press+Photo+2", 
      "https://via.placeholder.com/800x600/8B9456/FFFFFF?text=Press+Photo+3"
    ],
    live: [
      "https://via.placeholder.com/800x600/333333/FFFFFF?text=Live+Photo+1",
      "https://via.placeholder.com/800x600/666666/FFFFFF?text=Live+Photo+2"
    ]
  },
  contact: {
    management: "contato@joaorolla.com.br",
    press: "imprensa@joaorolla.com.br",
    booking: "shows@joaorolla.com.br"
  }
};