// Dados mockados para demonstração e brainstorming

export const artistInfo = {
  name: "João Rolla",
  tagline: "Descobrindo novos horizontes sonoros",
  bio: "Artista emergente que combina elementos eletrônicos contemporâneos com melodias orgânicas, criando uma sonoridade única e envolvente. Influenciado por diversos gêneros musicais, João Rolla traz uma proposta fresca e inovadora para a cena musical atual.",
  location: "São Paulo, Brasil",
  genres: ["Electronic", "Indie Pop", "Alternative"],
  socialMedia: {
    spotify: "https://open.spotify.com/artist/joaorolla",
    instagram: "@joaorolla.music",
    youtube: "https://youtube.com/@joaorollamusic",
    tiktok: "@joaorolla",
    twitter: "@joaorollamusic"
  }
};

export const upcomingEP = {
  title: "AURORA",
  releaseDate: "15 de Março, 2025",
  description: "Um EP que explora as nuances entre luz e sombra, trazendo 5 faixas que navegam por paisagens sonoras emotivas e envolventes.",
  coverArt: "/api/placeholder/400/400",
  tracks: [
    { title: "Dawn", duration: "3:42", preview: "/previews/dawn.mp3" },
    { title: "Neon Dreams", duration: "4:15", preview: "/previews/neon-dreams.mp3" },
    { title: "Midnight Revival", duration: "3:58", preview: "/previews/midnight-revival.mp3" },
    { title: "Solar Flare", duration: "4:22", preview: "/previews/solar-flare.mp3" },
    { title: "Aurora", duration: "5:01", preview: "/previews/aurora.mp3" }
  ]
};

export const gallery = {
  photos: [
    {
      id: 1,
      url: "/api/placeholder/600/400",
      title: "Sessão de fotos - Estúdio",
      description: "Registros íntimos do processo criativo no estúdio"
    },
    {
      id: 2,
      url: "/api/placeholder/600/400",
      title: "Behind the Scenes - Gravação",
      description: "Momentos especiais durante a gravação do EP AURORA"
    },
    {
      id: 3,
      url: "/api/placeholder/600/400",
      title: "Ensaio Conceitual",
      description: "Ensaio fotográfico explorando a identidade visual do artista"
    },
    {
      id: 4,
      url: "/api/placeholder/600/400",
      title: "Processo Criativo",
      description: "Rascunhos e anotações musicais"
    },
    {
      id: 5,
      url: "/api/placeholder/600/400",
      title: "Instrumentos",
      description: "Os instrumentos que dão vida às composições"
    },
    {
      id: 6,
      url: "/api/placeholder/600/400",
      title: "Live Session",
      description: "Apresentação acústica exclusiva"
    }
  ],
  sketches: [
    {
      id: 1,
      url: "/api/placeholder/400/500",
      title: "Composição - Dawn",
      description: "Rascunho original da primeira faixa do EP"
    },
    {
      id: 2,
      url: "/api/placeholder/400/500",
      title: "Arte Conceitual - Aurora",
      description: "Estudos visuais para a capa do EP"
    },
    {
      id: 3,
      url: "/api/placeholder/400/500",
      title: "Lettering Studies",
      description: "Estudos tipográficos para a identidade visual"
    }
  ]
};

export const merchandise = {
  featured: {
    id: 1,
    name: "EP AURORA - Vinil Limitado",
    price: "R$ 89,90",
    image: "/api/placeholder/300/300",
    description: "Edição limitada em vinil transparente com artwork exclusivo",
    inStock: true
  },
  items: [
    {
      id: 2,
      name: "Camiseta ARIA NOVA - Preta",
      price: "R$ 59,90",
      image: "/api/placeholder/300/300",
      description: "Camiseta 100% algodão com logo bordado",
      sizes: ["P", "M", "G", "GG"],
      inStock: true
    },
    {
      id: 3,
      name: "Hoodie AURORA Collection",
      price: "R$ 129,90",
      image: "/api/placeholder/300/300",
      description: "Moletom premium com capuz e estampa exclusiva",
      sizes: ["P", "M", "G", "GG"],
      inStock: true
    },
    {
      id: 4,
      name: "Poster Set - AURORA",
      price: "R$ 29,90",
      image: "/api/placeholder/300/300",
      description: "Kit com 3 posters A3 da coleção AURORA",
      inStock: true
    },
    {
      id: 5,
      name: "Pin Set - Enamel Collection",
      price: "R$ 24,90",
      image: "/api/placeholder/300/300",
      description: "Conjunto de 4 pins esmaltados com símbolos do EP",
      inStock: false
    }
  ]
};

export const shows = [
  {
    id: 1,
    date: "2025-03-20",
    venue: "Cultura Artística",
    city: "São Paulo, SP",
    ticketUrl: "#",
    status: "available"
  },
  {
    id: 2,
    date: "2025-03-25",
    venue: "Casa do Lago",
    city: "Rio de Janeiro, RJ",
    ticketUrl: "#",
    status: "available"
  },
  {
    id: 3,
    date: "2025-04-02",
    venue: "Festival Sonora",
    city: "Belo Horizonte, MG",
    ticketUrl: "#",
    status: "sold-out"
  },
  {
    id: 4,
    date: "2025-04-10",
    venue: "Teatro Opus",
    city: "Curitiba, PR",
    ticketUrl: "#",
    status: "soon"
  }
];

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
      "/api/placeholder/800/600",
      "/api/placeholder/800/600", 
      "/api/placeholder/800/600"
    ],
    live: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
    ]
  },
  contact: {
    management: "contato@joaorolla.com.br",
    press: "imprensa@joaorolla.com.br",
    booking: "shows@joaorolla.com.br"
  }
};