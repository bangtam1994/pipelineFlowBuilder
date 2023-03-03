import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4081',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: '#11C6A9', // custom button color (seafoam green)
      contrastText: '#ffffff', // custom button text (white)
    },

    info: {
      main: '#adadad',
    },
  },
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    h1: {
      fontSize: 60,
      fontWeight: 'bold',
      letterSpacing: 3,
    },
    h2: {
      fontSize: 48,
      fontWeight: 'bold',
      letterSpacing: 3,
    },
    h3: {
      fontSize: 34,
      fontWeight: 'bold',
      letterSpacing: 3,
    },
    h4: {
      fontSize: 24,
      fontWeight: 'normal',
    },
    h5: {
      fontSize: 20,
      fontWeight: 'normal',
    },
    h6: {
      fontSize: 16,
      fontWeight: 'normal',
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 'normal',
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    body1: {
      fontSize: 18,
      fontWeight: 'normal',
    },
    body2: {
      fontSize: 16,
      fontWeight: 'normal',
    },
    caption: {
      fontSize: 11,
      color: '#696969',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  },
});

export default theme;
