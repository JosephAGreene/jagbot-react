import React from 'react';
import PropTypes from 'prop-types';

// Import MUI components
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

// Import custom components
import Headline from '../components/Headline.js';

// Import Icons
import { AiOutlineRobot } from 'react-icons/ai';
import MenuIcon from '@material-ui/icons/Menu';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  bar: {
    backgroundColor: theme.palette.gray.main,
    boxShadow: '0px 1px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 4px 5px 0px rgba(0,0,0,0.12)',
  },
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
    color: theme.palette.orange.main,
  },
  spacer: {
    width: "10px",
  },
  psuedoBurger: {
    width: "250px",
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  menuPaper: {
    backgroundColor: theme.palette.gray.dark,
    border: `1px solid ${theme.palette.gray.light}`,
    borderRadius: 0,
  },
});

function Header(props) {
  const { classes, onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar
        component="div"
        className={(classes.secondaryBar, classes.bar)}
        color="primary"
        position="fixed"
        elevation={0}
      >
        <Toolbar>
          <Hidden smUp>
            <Grid container justifyContent="space-between">
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Headline 
                  iconComponent={AiOutlineRobot}
                  start="Jag"
                  end="Bot"
                  color="#98c379"
                  title
                />
              </Grid>
              <Grid item >
                <div className={classes.spacer} />
              </Grid>
            </Grid>
          </Hidden>
          <Hidden xsDown>
            <Grid container justifyContent="space-between">
              <Grid item >
                <div className={classes.psuedoBurger} />
              </Grid>
              <Grid item>
                <Headline 
                  iconComponent={AiOutlineRobot}
                  start="Jag"
                  end="Bot"
                  color="#98c379"
                  title
                />
              </Grid>
              <Grid item >
                <div className={classes.spacer} />
              </Grid>
            </Grid>
          </Hidden>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);