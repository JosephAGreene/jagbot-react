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
import UserService from "../services/UserService.js";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import {styles, drawerWidth} from "../jss/dashboardStyle.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';

// Import custom components
import Alert from '../components/alerts/alert';

// Import Views
import Navigator from '../views/navigator';
import Header from '../views/header';

import routes from "../routes";


// Returns react routes inside a switch based on routes.js routes
function buildSwitchRoutes (bots, handleBotSelection) {
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
            path={`/dashboard/${route.path}`}
            key={key}
          >
            {route.path === 'bunker/mybots' 
              ? <route.component bots={bots} handleBotSelection={handleBotSelection}/>
              : <route.component />
            }
          </Route>
        );
      })}
      <Redirect from="/dashboard" to="/dashboard/home" />
    </Switch>
  );
}

// Returns the name of the active route from the corresponsding values in routes.js.
// Nested for loops used over forEach due to better performance and early return.
function getActiveName (routes, path) {
  for (let i = 0; i < routes.length; i++) {
    for (let j = 0; j < routes[i].children.length; j++) {
      if (routes[i].children[j].path === path) {
        return routes[i].children[j].name;
      } 
    }
  }
}

function Dashboard(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [bots, setBots] = React.useState([]);
  const [selectedBot, setSelectedBot] = React.useState(false);
  const [ failureAlert, setFailureAlert ] = React.useState({status: false});

  const history = useHistory();

  React.useEffect(() => {
    fetchBots();
  }, []);

  // fetch bots that belong to user
  const fetchBots = async () => {

    const res = await UserService.getBots();

    if (res.status === 200) {
      setBots(res.data);
    } 
    else if (res.status === 'dead') {
      setFailureAlert({
        status: true,
        message: 'Server is down or busy. Try again later.'
      });
    } else {
      console.log(res.status);
      setFailureAlert({
        status: true,
        message: 'Something went wrong. Hint: Check the console.'
      });
    }
  }

  // Sets active path to the last sub directory. 
  // I.E. The same pathname acquired from 'path' keys in the routes array.
  const activePath = useLocation().pathname.split('/').filter(param => param).slice(-2).join('/');
  const activeSubDirectory = activePath.split('/').slice(0, 1)[0];  
  const name = getActiveName(routes, activePath);
   
  if (activeSubDirectory === 'develop' && !selectedBot) {
    return <Redirect to="/dashboard" />;
  }

  if(!AuthService.getCurrentUser()) {
    return <Redirect to="/home" />
  }

  const failureAlertClose= () => {
    setFailureAlert({status: false});
  }

  const handleBotSelection = (bot) => {
    history.push("/dashboard/develop/modules");
    setSelectedBot(bot);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
              selectedBot={selectedBot} 
              setSelectedBot={setSelectedBot}
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
              selectedBot={selectedBot} 
              setSelectedBot={setSelectedBot}
              PaperProps={{ style: { width: drawerWidth } }} 
            />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header name={name} onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>
            {buildSwitchRoutes(bots, handleBotSelection)}
          </main>
        </div>
        <Alert open={failureAlert.status} autoHideDuration={5000} onClose={failureAlertClose} severity='error'>
          {failureAlert.message}
        </Alert>
      </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);