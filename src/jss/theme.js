//import { createTheme } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

// Creating theme with unstable_createMuiStrictModeTheme version, as material UI stable release is currenlty
// behind React's strict mode rules. Consider changing back to standard createTheme for production as 
// findDomNode warnings in strict mode do not show during production.
let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
    },
    secondary: {
      light: '#f73378',
      main: '#f50057',
      dark: '#ab003c',
    },
    warning: {
      main: '#ffc071',
      dark: '#ffb25e',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f'
    },
    gray: {
      light: '#282c34',
      main: '#23272e',
      dark: '#171a1f',
      disabled: '#65686d',
    },
    green: {
      light: '#a2c986',
      main: '#98c379',
      dark: '#7a961',
    },
    purple: {
      light: '#7e57c2',
      main: '#c67ab7',
      dark: '#512da8',
    },
    teal: {
      light: '#72cff9',
      main: '#4fc3f7',
      dark: '#3789ad',
    },
    orange: {
      light: '#de8f4d',
      main: '#da8136',
      dark: '#d67320',
    },
    yellow: {
      light: '#efc982',
      main: '#edc374',
      dark: '#d5b068',
    },
    white: {
      main: '#ffffff',
      dark: '#babbbc'
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '10px',
          height: '2px',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.gray.dark,
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: "#dfdfdf",
          borderRadius: "10px",
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 0,
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: theme.palette.gray.dark,
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: theme.palette.gray.light,
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

export { theme }