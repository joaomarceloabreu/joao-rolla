import { createTheme } from '@mui/material/styles';

// Paleta de cores inspirada na música e nas referências fornecidas
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B35', // Laranja vibrante para destaque
      light: '#FF8F65',
      dark: '#E55A2B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4ECDC4', // Verde-água para contraste
      light: '#7DDDD6',
      dark: '#3BBEB5',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0A0A0A', // Preto profundo
      paper: '#1A1A1A', // Cinza escuro para cards
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
    },
    divider: '#333333',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
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
    '0px 2px 4px rgba(255, 107, 53, 0.1)',
    '0px 4px 8px rgba(255, 107, 53, 0.15)',
    '0px 8px 16px rgba(255, 107, 53, 0.2)',
    '0px 12px 24px rgba(255, 107, 53, 0.25)',
    '0px 16px 32px rgba(255, 107, 53, 0.3)',
    '0px 20px 40px rgba(255, 107, 53, 0.35)',
    '0px 24px 48px rgba(255, 107, 53, 0.4)',
    '0px 32px 64px rgba(255, 107, 53, 0.45)',
    '0px 40px 80px rgba(255, 107, 53, 0.5)',
    '0px 48px 96px rgba(255, 107, 53, 0.55)',
    '0px 56px 112px rgba(255, 107, 53, 0.6)',
    '0px 64px 128px rgba(255, 107, 53, 0.65)',
    '0px 72px 144px rgba(255, 107, 53, 0.7)',
    '0px 80px 160px rgba(255, 107, 53, 0.75)',
    '0px 88px 176px rgba(255, 107, 53, 0.8)',
    '0px 96px 192px rgba(255, 107, 53, 0.85)',
    '0px 104px 208px rgba(255, 107, 53, 0.9)',
    '0px 112px 224px rgba(255, 107, 53, 0.95)',
    '0px 120px 240px rgba(255, 107, 53, 1)',
    '0px 128px 256px rgba(255, 107, 53, 1)',
    '0px 136px 272px rgba(255, 107, 53, 1)',
    '0px 144px 288px rgba(255, 107, 53, 1)',
    '0px 152px 304px rgba(255, 107, 53, 1)',
    '0px 160px 320px rgba(255, 107, 53, 1)',
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
          backgroundColor: '#1A1A1A',
          borderRadius: 16,
          border: '1px solid #333333',
        },
      },
    },
  },
});