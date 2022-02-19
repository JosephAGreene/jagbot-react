import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory
} from 'react-router-dom';
import PropTypes from 'prop-types';

// Import API service
import AuthService from "../services/AuthService.js";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// Import custom components
import Alert from '../components/alerts/alert';
import Button from '../components/buttons/Button';
import CircularBackdrop from '../components/progress/CircularBackdrop';
import MinDialog from '../components/dialogs/MinDialog';

// Import Views
import Navigator from '../views/Navigator';
import Header from '../views/Header';

import routes from "../routes";

const drawerWidth = 256;

const styles = (theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
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
  [theme.breakpoints.down('sm')]: {
    main: {
      padding: theme.spacing(6, 1),
    },
  },
  logoutDialog: {
    color: theme.palette.white.main,
    backgroundColor: theme.palette.gray.light,
  }
});

function isEmptyObject(obj){
  return JSON.stringify(obj) === '{}';
}

// Returns react routes inside a switch based on routes.js routes
function buildSwitchRoutes(warningAcknowledged, handleBotSelection, selectedBot, setSelectedBot, setApiAlert) {
  let routeArray = [];

  // Separate child routes from their parent into their own array
  routes.forEach((parent) => {
    parent.children.forEach((child) => {
      routeArray.push(child);
    })
  })

  return (
    <Switch>
      {routeArray.map((route, key) => {
        return (
          <Route
            exact
            path={`/dashboard/${route.path}`}
            key={key}
          >
            {route.path === 'stash/mybots'
              ? <route.component warningAcknowledged={warningAcknowledged} handleBotSelection={handleBotSelection} setApiAlert={setApiAlert} />
              : (route.path === 'stash/newbot')
                ? <route.component warningAcknowledged={warningAcknowledged} setApiAlert={setApiAlert} />
                : (route.api && route.api === "bot")
                  ? <route.component
                    selectedBot={selectedBot}
                    setSelectedBot={setSelectedBot}
                    setApiAlert={setApiAlert}
                  />
                  : <route.component />
            }
          </Route>
        );
      })}
      <Redirect from="/dashboard" to="/dashboard/stash/mybots" />
    </Switch>
  );
}

function Dashboard(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [selectedBot, setSelectedBot] = React.useState({});
  const [apiAlert, setApiAlert] = React.useState({ status: false, duration: 2500, severity: "success" });
  const [logoutDialog, setLogoutDialog] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    const getCurrentUser = async () => {
      const res = await AuthService.getCurrentUser();

      if (res.status === 200) {
        setUser(res.data);
      } else {
        history.push('/');
      }
    }

    getCurrentUser();
  }, [history]);


  // Sets active path to the last sub directory. 
  // I.E. The same pathname acquired from 'path' keys in the routes array.
  const activePath = useLocation().pathname.split('/').filter(param => param).slice(1).join('/');
  const activeSubDirectory = activePath.split('/').slice(0, 1)[0];

  if (activeSubDirectory === 'develop' && isEmptyObject(selectedBot)) {
    return <Redirect to="/dashboard" />;
  }

  const apiAlertClose = () => {
    setApiAlert({ status: false, duration: 5000, severity: "success" });
  }

  const handleBotSelection = (bot) => {
    setSelectedBot(bot);
    history.push("/dashboard/develop/modules");
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogoutDialogOpen = () => {
    setLogoutDialog(true);
  }

  const handleLogout = async () => {
    await AuthService.logout();
    history.push('/');
  }

  if (!user) {
    return (
      <CircularBackdrop loading={true} />
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="js">
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            routes={routes}
            activePath={activePath}
            activeSubDirectory={activeSubDirectory}
            selectedBot={selectedBot}
            setSelectedBot={setSelectedBot}
            user={user}
            handleLogoutDialogOpen={handleLogoutDialogOpen}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <Navigator
            routes={routes}
            activePath={activePath}
            activeSubDirectory={activeSubDirectory}
            selectedBot={selectedBot}
            setSelectedBot={setSelectedBot}
            user={user}
            handleLogoutDialogOpen={handleLogoutDialogOpen}
            PaperProps={{ style: { width: drawerWidth } }}
          />
        </Hidden>
      </nav>
      <div className={classes.app}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <main className={classes.main}>
          {buildSwitchRoutes(user.warningAcknowledged, handleBotSelection, selectedBot, setSelectedBot, setApiAlert)}
        </main>
      </div>
      <Alert open={apiAlert.status} autoHideDuration={apiAlert.duration} onClose={apiAlertClose} severity={apiAlert.severity}>
        {apiAlert.message}
      </Alert>
      <MinDialog
        open={logoutDialog}
        setOpen={setLogoutDialog}
        keepMounted={false}
      >
        <DialogTitle id="confirm-logout">{"Confirm Logout"}</DialogTitle>
        <DialogActions>
          <Button onClick={()=> setLogoutDialog(false)} color="danger">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="teal">
            Confirm
          </Button>
        </DialogActions>
      </MinDialog>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);