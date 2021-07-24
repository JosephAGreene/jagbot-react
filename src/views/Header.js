import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

// Import API services
import AuthService from "../services/AuthService.js";

// Import MUI components
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Import custom components
import Headline from '../components/Headline.js';

// Import Icons
import { AiOutlineRobot } from 'react-icons/ai';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
  menuItemRoot: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  menuIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
});

function Header(props) {
  const { classes, onDrawerToggle } = props;
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

  const handleLogout = async () => {
    await AuthService.logout();
    handleClose();
    history.push("/home");
  };

  return (
    <React.Fragment>
      <AppBar
        component="div"
        className={(classes.secondaryBar, classes.bar)}
        color="primary"
        position="static"
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
              <Grid item />
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