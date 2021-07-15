import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {styles} from "./../jss/headerStyle.js";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AuthService from "../../services/AuthService.js";
import { useHistory } from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Header(props) {
  const { classes, name, onDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccountSettings = () => {
    handleClose();
    history.push("/dashboard/accountsettings")
  }

  const handleLogout = () => {
    AuthService.logout();
    handleClose();
    history.push("/home");
  };

  return (
    <React.Fragment>
      <AppBar className={classes.bar} color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
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
            <Grid item xs />
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={(classes.secondaryBar, classes.bar)}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography style={{"color" : "#4fc3f7"}} variant="h5" component="h1">
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={classes.iconButtonAvatar} onClick={handleClick}>
                <PersonIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                classes={{paper: classes.menuPaper}}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem classes={{root: classes.menuItemRoot}} onClick={handleAccountSettings}>
                  <SettingsIcon classes={{root: classes.menuIcon}} /> Account Settings
                </MenuItem>
                <MenuItem classes={{root: classes.menuItemRoot}} onClick={handleLogout}>
                  <ExitToAppIcon classes={{root: classes.menuIcon}} /> Logout
                </MenuItem>
              </Menu>
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