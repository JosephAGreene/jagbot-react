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
    margin: 14, 
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
          <Grid container justifyContent="space-between" alignItems="flex-end">
            <Hidden smUp>
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
            </Hidden>
            <Hidden xsDown>
              <Grid item >
                <div className={classes.spacer} />
              </Grid>
            </Hidden>
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