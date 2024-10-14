// src/themes/theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#4B0082', // Deep Indigo
    },
    secondary: {
      main: '#800080', // Vibrant Purple
    },
    info: {
      main: '#87CEEB', // Sky Blue
    },
    warning: {
      main: '#FFD700', // Gold
    },
    background: {
      default: '#F0F8FF', // Light blue background
      paper: '#fff',
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#808080', // Grey text for secondary elements
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h3: {
      color: '#4B0082',
      fontWeight: 'bold',
    },
    h5: {
      color: '#800080',
    },
    button: {
      fontSize: '1rem',
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners for buttons, inputs
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: '#FFD700',
          color: '#4B0082',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFD700 0%, #4B0082 100%)',
            color: '#fff',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '20px',
        },
      },
    },
  },
});

export default theme;