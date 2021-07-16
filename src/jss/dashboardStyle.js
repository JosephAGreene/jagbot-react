import {theme} from "./theme.js";

const drawerWidth = 256;

const dashboardStyle = {
    root: {
      display: 'flex',
      minHeight: '100vh',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    app: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      flex: 1,
      padding: theme.spacing(6, 4),
      background: theme.palette.gray.light,
    },
  };

  export {
    dashboardStyle as styles,
    drawerWidth
  };