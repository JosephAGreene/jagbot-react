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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// Import custom components
import Alert from '../components/alerts/alert';
import Button from '../components/buttons/Button';

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

function getSelectedBot(bots, selectedBotId) {
  for (let i=0; i < bots.length; i++) {
    if (bots[i]._id === selectedBotId) {
      return bots[i];
    }
  }

  return {};
}

// Returns react routes inside a switch based on routes.js routes
function buildSwitchRoutes (bots, handleBotSelection, selectedBotId, setBots, setApiAlert) {
  let routeArray = [];

  // Separate child routes from their parent into their own array
  routes.forEach((parent) => {
    parent.children.forEach((child)=> {
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
              ? <route.component bots={bots} handleBotSelection={handleBotSelection}/>
              : (route.api && route.api === "bot") 
                ? <route.component 
                    selectedBot={getSelectedBot(bots, selectedBotId)}
                    bots={bots} 
                    setBots={setBots}
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
  const [loading, setLoading] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [bots, setBots] = React.useState([]);
  const [selectedBotId, setSelectedBotId] = React.useState(false);
  const [apiAlert, setApiAlert] = React.useState({status: false, duration: 5000, severity: "success"});
  const [logoutDialog, setLogoutDialog] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    const authenticateUser = async () => {
      const res = await AuthService.getCurrentUser();
  
      if (res.status === 200) {
        setUser({
          discordTag: res.data.discordTag,
          avatarURL: res.data.avatarURL,
        });
        setBots(res.data.bots);
        setLoading(false);
      } else {
        setLoading(false);
        history.push('/');
      }
    }

    setLoading(true);
    authenticateUser();
  }, [history]);



  // Sets active path to the last sub directory. 
  // I.E. The same pathname acquired from 'path' keys in the routes array.
  const activePath = useLocation().pathname.split('/').filter(param => param).slice(1, 3).join('/');
  const activeSubDirectory = activePath.split('/').slice(0, 1)[0];  
   
  if (activeSubDirectory === 'develop' && !selectedBotId) {
    return <Redirect to="/dashboard" />;
  }

  const apiAlertClose= () => {
    setApiAlert({status: false, duration: 5000, severity: "success"});
  }

  const handleBotSelection = (botId) => {
    history.push("/dashboard/develop/modules");
    setSelectedBotId(botId);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogoutDialogOpen = () => {
    setLogoutDialog(true);
  }

  const handleLogoutDialogClose = () => {
    setLogoutDialog(false);
  }

  const handleLogout = async () => {
    await AuthService.logout();
    history.push('/');
  }

  if(loading || !user) {
    return (
      <div>Loading...</div>
    );
  }

  return (
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth }}}
              routes={routes}
              activePath={activePath}
              activeSubDirectory={activeSubDirectory}
              selectedBot={getSelectedBot(bots, selectedBotId)} 
              setSelectedBotId={setSelectedBotId}
              user={user} 
              handleLogoutDialogOpen={handleLogoutDialogOpen}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator 
              routes={routes} 
              activePath={activePath}
              activeSubDirectory={activeSubDirectory}
              selectedBot={getSelectedBot(bots, selectedBotId)} 
              setSelectedBotId={setSelectedBotId}
              user={user} 
              handleLogoutDialogOpen={handleLogoutDialogOpen}
              PaperProps={{ style: { width: drawerWidth } }}
            />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>
            {buildSwitchRoutes(bots, handleBotSelection, selectedBotId, setBots, setApiAlert)}
          </main>
        </div>
        <Alert open={apiAlert.status} autoHideDuration={apiAlert.duration} onClose={apiAlertClose} severity={apiAlert.severity}>
          {apiAlert.message}
        </Alert>
        <Dialog
          PaperProps={{className: classes.logoutDialog}}
          open={logoutDialog}
          onClose={handleLogoutDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleLogoutDialogClose} color="purple">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="danger">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);