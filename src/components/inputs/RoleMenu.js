import React from "react";
import PropTypes from "prop-types";

// Import API service
import BotService from "../../services/BotService.js";

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

// Import custom components
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";

// Import icons
import SyncIcon from '@material-ui/icons/Sync';

const styles = (theme) => ({
  menuRoot: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.gray.dark,
      width: "300px",
      borderRadius: 2,
    },
    '& .MuiPopover-paper': {
      width: "300px",
      maxHeight: "250px",
    },
    '& .MuiList-padding': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '& .MuiMenuItem-root': {
      padding: "0 15px 0 15px",
      margin: 0,
      '&:hover': {
        backgroundColor: theme.palette.gray.light,
      },
    },
    '& .MuiListItemText-primary': {
      fontSize: "16px",
      color: theme.palette.white.main,
    },
    '& .MuiListItemText-secondary': {
      fontSize: "14px",
      color: theme.palette.white.dark,
      whiteSpace: 'normal',
    },
  },
  headerContainer: {
    position: "absolute",
    height: "50px",
    width: "300px",
  },
  header: {
    padding: "5px 10px",
    alignItems: "center",
    position: "fixed",
    zIndex: 10,
    height: "inherit",
    width: "inherit",
    backgroundColor: theme.palette.gray.dark,
    color: theme.palette.white.dark,
    fontSize: "16px",
    boxShadow: '0px 1px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 4px 5px 0px rgba(0,0,0,0.12)',
  },
  syncButton: {
    color: theme.palette.teal.main,
    '&:hover' :{
      color: theme.palette.teal.light,
    },
    margin: theme.spacing(1, 1),
    width: theme.spacing(3.2),
    height: theme.spacing(3.2),
  },
  spacer: {
    height: "50px",
  },
  formContainer: {
    width: "inherit",
    height: "inherit",
    paddingTop: "15px",
    textAlign: "center",
  },
  noContent: {
    padding: "15px",
    textAlign: "center",
    color: theme.palette.white.dark,
  },
  progress: {
    marginTop: theme.spacing(2),
    color: theme.palette.teal.main,
  }
});

function RoleMenu(props) {
  const { classes, value, setNewValue, roles, anchorEl, handleClose } = props;
  const [loading, setLoading] = React.useState(false);
  const [serverRoles, setServerRoles] = React.useState(roles ? roles : []);

  const handleServerRoleSync = async () => {
    setLoading(true);

    const payload = {
      _id: "60d03603e2a93152b9ecd9f7",
    };

    const res = await BotService.getServerRoles(payload);

    setServerRoles(res.data);

    setLoading(false);
  }

  const handleClick = (role) => {
    if (value.indexOf(role) < 0) {
      const newValue = [...value]
      newValue.push(role);
      setNewValue(newValue);
    }
    handleClose();
  }

  const menuItems = () => {
    if (loading) {
      return (
        <div className={classes.noContent}>
          <div>Fetching Roles</div>
          <CircularProgress className={classes.progress} />
        </div>
      );
    }

    if (serverRoles.length < 1) {
      return (
        <div className={classes.noContent}>
          <div><b>No Roles Found</b></div>
          <div>Try refreshing to search again</div>
        </div>
      );
    }

    return (
      serverRoles.map((role, index) => {
        return (
          <MenuItem key={`${role}-${index}`} onClick={() => handleClick(role)}>
            <ListItemText primary={role} />
          </MenuItem>
        );
       })
    );
  }

  return (
    <Menu
      id="role-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      className={classes.menuRoot}
      elevation={3}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <GridContainer justifyContent="space-between" alignItems="baseline">
            <GridItem>
              Roles
            </GridItem>
            <GridItem>
              <IconButton className={classes.syncButton} aria-label="sync roles" onClick={handleServerRoleSync} >
                <SyncIcon />
              </IconButton>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <div className={classes.spacer} />
      {menuItems()}
    </Menu>
  );
}

RoleMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(RoleMenu);