import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import {theme} from '../jss/theme';
import {styles, drawerWidth} from "../jss/dashboardStyle.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from '../views/navigator';
import Header from './../views/header';
import {
  Switch,
  Route, 
  Redirect
} from 'react-router-dom';
import routes from "../routes";
import AuthService from "../../services/AuthService.js";

// Returns react routes inside a switch based on routes.js routes
function buildSwitchRoutes () {
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
            path={`/dashboard/${route.id}`}
            component={route.component}
            key={key}
          />
        );
      })}
      <Redirect from="/dashboard" to="/dashboard/home" />
    </Switch>
  );
}

function Dashboard(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if(!AuthService.getCurrentUser()) {
    return <Redirect to="/home" />
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              routes={routes}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator routes={routes} PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>
            {buildSwitchRoutes()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);