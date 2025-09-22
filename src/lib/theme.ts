import { createTheme } from '@mui/material/styles';

// Paleta de cores refinada "Mente Sã e Samba" - tons terrosos e orgânicos
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6d1f22', // Vermelho bordô mais sutil e terroso
      light: '#8b5a3c', // Marrom terroso quente
      dark: '#4a1518',
      contrastText: '#f4f0e8',
    },
    secondary: {
      main: '#5a6b3a', // Verde oliva natural
      light: '#6d7d47',
      dark: '#3d4a26',
      contrastText: '#f4f0e8',
    },
    background: {
      default: '#0a0a0a', // Preto mais suave
      paper: '#1c1b18', // Tons mais quentes para cards
    },
    text: {
      primary: '#f4f0e8', // Bege mais claro e suave
      secondary: '#e8dcc6', // Bege secundário refinado
    },
    divider: '#5a6b3a',
    error: {
      main: '#6d1f22',
    },
    warning: {
      main: '#a67c52', // Dourado terroso mais sutil
    },
    info: {
      main: '#5a6b3a',
    },
    success: {
      main: '#5a6b3a',
    },
  },
  typography: {
    fontFamily: 'var(--font-crimson), "Crimson Text", Georgia, serif',
    h1: {
      fontFamily: 'var(--font-carina), "Carina", "Playfair Display", Georgia, serif',
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: 'var(--font-carina), "Carina", "Playfair Display", Georgia, serif',
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: 'var(--font-carina), "Carina", "Playfair Display", Georgia, serif',
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: 'var(--font-carina), "Carina", "Playfair Display", Georgia, serif',
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
    '0px 2px 4px rgba(109, 31, 34, 0.08)',
    '0px 4px 8px rgba(109, 31, 34, 0.12)',
    '0px 8px 16px rgba(109, 31, 34, 0.16)',
    '0px 12px 24px rgba(109, 31, 34, 0.20)',
    '0px 16px 32px rgba(109, 31, 34, 0.24)',
    '0px 20px 40px rgba(109, 31, 34, 0.28)',
    '0px 24px 48px rgba(109, 31, 34, 0.32)',
    '0px 32px 64px rgba(109, 31, 34, 0.36)',
    '0px 40px 80px rgba(109, 31, 34, 0.40)',
    '0px 48px 96px rgba(109, 31, 34, 0.44)',
    '0px 56px 112px rgba(109, 31, 34, 0.48)',
    '0px 64px 128px rgba(109, 31, 34, 0.52)',
    '0px 72px 144px rgba(109, 31, 34, 0.56)',
    '0px 80px 160px rgba(109, 31, 34, 0.60)',
    '0px 88px 176px rgba(109, 31, 34, 0.64)',
    '0px 96px 192px rgba(109, 31, 34, 0.68)',
    '0px 104px 208px rgba(109, 31, 34, 0.72)',
    '0px 112px 224px rgba(109, 31, 34, 0.76)',
    '0px 120px 240px rgba(109, 31, 34, 0.80)',
    '0px 128px 256px rgba(109, 31, 34, 0.84)',
    '0px 136px 272px rgba(109, 31, 34, 0.88)',
    '0px 144px 288px rgba(109, 31, 34, 0.92)',
    '0px 152px 304px rgba(109, 31, 34, 0.96)',
    '0px 160px 320px rgba(109, 31, 34, 1)',
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
          backgroundColor: 'rgba(28, 27, 24, 0.85)',
          borderRadius: 16,
          border: '1px solid rgba(90, 107, 58, 0.5)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});