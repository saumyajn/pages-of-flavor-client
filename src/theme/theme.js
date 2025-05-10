import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#F7E7CE', // Champagne
    },
    primary: {
      main: '#702963', // Byzantium
    },
    secondary: {
      main: '#A50021', // Madder
    },
    contrast: {
      main: '#1B4D3E', // Brunswick green
    },
    muted: {
      main: '#6F4E37', // Coffee
    },
  },
  typography: {
    fontFamily: "'Merriweather', serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 500,
    },
  },
});

export default theme;
