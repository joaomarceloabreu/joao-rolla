import { createTheme } from '@mui/material/styles';

// Paleta de cores inspirada em "Mente Sã e Samba" - cores vibrantes e brasileiras
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E55722', // Laranja vibrante (energia e vida)
      light: '#F4A842',
      dark: '#B91C3C',
      contrastText: '#F5E6D3',
    },
    secondary: {
      main: '#8B9456', // Verde oliva (natureza e equilíbrio)
      light: '#A8B26B',
      dark: '#6B7344',
      contrastText: '#F5E6D3',
    },
    background: {
      default: '#1A1A1A', // Fundo escuro moderno
      paper: '#2A2A2A', // Cards em tom escuro
    },
    text: {
      primary: '#F5E6D3', // Bege/creme claro para texto principal
      secondary: '#E5D4C1', // Bege mais escuro para texto secundário
    },
    divider: '#8B9456',
    error: {
      main: '#B91C3C', // Vermelho profundo
    },
    warning: {
      main: '#F4A842', // Amarelo dourado
    },
    info: {
      main: '#8B9456', // Verde oliva
    },
    success: {
      main: '#8B9456', // Verde oliva
    },
  },
  typography: {
    fontFamily: 'var(--font-crimson), "Crimson Text", Georgia, serif',
    h1: {
      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(229, 87, 34, 0.1)',
    '0px 4px 8px rgba(229, 87, 34, 0.15)',
    '0px 8px 16px rgba(229, 87, 34, 0.2)',
    '0px 12px 24px rgba(229, 87, 34, 0.25)',
    '0px 16px 32px rgba(229, 87, 34, 0.3)',
    '0px 20px 40px rgba(229, 87, 34, 0.35)',
    '0px 24px 48px rgba(229, 87, 34, 0.4)',
    '0px 32px 64px rgba(229, 87, 34, 0.45)',
    '0px 40px 80px rgba(229, 87, 34, 0.5)',
    '0px 48px 96px rgba(229, 87, 34, 0.55)',
    '0px 56px 112px rgba(229, 87, 34, 0.6)',
    '0px 64px 128px rgba(229, 87, 34, 0.65)',
    '0px 72px 144px rgba(229, 87, 34, 0.7)',
    '0px 80px 160px rgba(229, 87, 34, 0.75)',
    '0px 88px 176px rgba(229, 87, 34, 0.8)',
    '0px 96px 192px rgba(229, 87, 34, 0.85)',
    '0px 104px 208px rgba(229, 87, 34, 0.9)',
    '0px 112px 224px rgba(229, 87, 34, 0.95)',
    '0px 120px 240px rgba(229, 87, 34, 1)',
    '0px 128px 256px rgba(229, 87, 34, 1)',
    '0px 136px 272px rgba(229, 87, 34, 1)',
    '0px 144px 288px rgba(229, 87, 34, 1)',
    '0px 152px 304px rgba(229, 87, 34, 1)',
    '0px 160px 320px rgba(229, 87, 34, 1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2A2A2A',
          borderRadius: 16,
          border: '1px solid #8B9456',
        },
      },
    },
  },
});