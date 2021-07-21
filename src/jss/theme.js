//import { createTheme } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

// Creating theme with unstable_createMuiStrictModeTheme version, as material UI stable release is currenlty
// behind React's strict mode rules. Consider changing back to standard createTheme for production as 
// findDomNode warnings in strict mode do not show during production.
let theme = createMuiTheme({
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
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f'
      },
      gray: {
        light: '#282c34',
        main: '#23272e',
        dark: '#171a1f',
      },
      green: {
        main: '#98c379',
      },
      purple: {
        main: '#c678DD',
      }, 
      teal: {
        light: '#72cff9',
        main: '#4fc3f7',
        dark: '#3f9cc6',
      },
      orange: {
        light: '#de8f4d',
        main: '#da8136',
        dark: '#d67320',
      },
      yellow: {
        main: '#edc374',
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

  export {theme}