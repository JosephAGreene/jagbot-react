import { createTheme } from '@material-ui/core/styles';
import { green, grey, red } from '@material-ui/core/colors';

const primaryColor = ["#9c27b0", "#ab47bc", "#8e24aa", "#af2cc5"];
const warningColor = ["#ff9800", "#ffa726", "#fb8c00", "#ffa21a"];
const dangerColor = ["#f44336", "#ef5350", "#e53935", "#f55a4e"];
const successColor = ["#4caf50", "#66bb6a", "#43a047", "#5cb860"];
const infoColor = ["#00acc1", "#26c6da", "#00acc1", "#00d3ee"];
const roseColor = ["#e91e63", "#ec407a", "#d81b60", "#eb3573"];
const grayColor = [
  "#999",
  "#777",
  "#3C4858",
  "#AAAAAA",
  "#D2D2D2",
  "#DDD",
  "#b4b4b4",
  "#555555",
  "#333",
  "#a9afbb",
  "#eee",
  "#e7e7e7"
];
const blackColor = "#000";
const whiteColor = "#FFF";

const rawTheme = createTheme({
  palette: {
    primary: {
      light: '#69696a',
      main: '#222629',
      dark: '#1e1e1f',
    },
    secondary: {
      light: '#6ec0c1',
      main: '#86c232',
      dark: '#61892f',
    },
    warning: {
      main: '#ffc071',
      dark: '#ffb25e',
    },
    error: {
      xLight: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      xLight: green[50],
      main: green[500],
      dark: green[700],
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamilySecondary,
  textTransform: 'uppercase',
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export {
  theme,
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  blackColor,
  whiteColor,
} 