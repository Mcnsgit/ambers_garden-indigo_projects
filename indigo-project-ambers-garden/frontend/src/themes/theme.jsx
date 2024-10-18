// src/themes/theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom light and dark color palettes
const lightPalette = {
  mode: 'light',
  primary: {
    main: '#4B0082', // Deep Indigo
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#800080', // Vibrant Purple
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#87CEEB', // Sky Blue
  },
  warning: {
    main: '#FFD700', // Gold
  },
  background: {
    default: '#F0F8FF', // Light blue background
    paper: '#F5F5F5',
    background: 'linear-gradient(135deg, #87CEEB 0%, #98FB98 100%)',
  },
  text: {
    primary: '#000000', // Black text
    secondary: '#808080', // Grey text
  },
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#9370DB', // Medium Purple
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#BA55D3', // Medium Orchid
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#4682B4', // Steel Blue
  },
  warning: {
    main: '#DAA520', // Goldenrod
  },
  background: {
    default: '#121212', // Dark background
    paper: '#1E1E1E',
  },
  text: {
    primary: '#FFFFFF', // White text
    secondary: '#C0C0C0', // Light grey text
  },
};

const getTheme = (mode) =>
  createTheme({
    palette: mode === 'dark' ? darkPalette : lightPalette,
    typography: {
      fontFamily: "'Roboto', 'Arial', sans-serif",
      h3: {
        fontWeight: 'bold',
        fontSize: '2.5rem',
        color: mode === 'dark' ? darkPalette.primary.main : lightPalette.primary.main,
      },
      h5: {
        fontSize: '1.5rem',
        color: mode === 'dark' ? darkPalette.secondary.main : lightPalette.secondary.main,
      },
      button: {
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8, // Rounded corners
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? darkPalette.warning.main : lightPalette.warning.main,
            color: mode === 'dark' ? darkPalette.primary.main : lightPalette.primary.main,
            '&:hover': {
              background: `linear-gradient(135deg, ${
                mode === 'dark' ? darkPalette.warning.main : lightPalette.warning.main
              } 0%, ${mode === 'dark' ? darkPalette.primary.main : lightPalette.primary.main} 100%)`,
              color: '#FFFFFF',
            },
            borderRadius: 8,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: '20px',
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

export default getTheme;