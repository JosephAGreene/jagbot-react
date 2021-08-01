import React from "react";
import PropTypes from "prop-types";

// Import Mui components
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
  menuRoot: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.gray.dark,
      width: "300px",
      borderRadius: 2,
      [theme.breakpoints.up('md')]: {
        width: "500px",
      },
    },
    '& .MuiPopover-paper': {
      width: "300px",
      height: "250px",
      [theme.breakpoints.up('md')]: {
        width: "500px",
      },
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
    [theme.breakpoints.up('md')]: {
      width: "500px",
    },
  },
  header: {
    padding: "5px 10px",
    display: "flex",
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
  spacer: {
    height: "50px",
  },
  formContainer: {
    width: "inherit",
    height: "inherit",
    paddingTop: "15px",
    textAlign: "center",
  },
});

function VariableMenu (props) {
  const {classes, anchorEl, handleClose, insertValue} = props;

  const handleClick = (value) => {
    insertValue(value);
    handleClose();
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
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          Available Variables
        </div>
      </div>
      <div className={classes.spacer} />
      <MenuItem onClick={() => handleClick('{user}')}>
        <ListItemText primary="user" secondary="The user name triggering the command." />
      </MenuItem>
      <MenuItem onClick={() => handleClick('{user_display}')}>
        <ListItemText primary="display name" secondary="The display name of the user triggering the command."/>
      </MenuItem>
      <MenuItem onClick={() => handleClick('{server}')}>
        <ListItemText primary="server" secondary="The server name." />
      </MenuItem>
      <MenuItem onClick={() => handleClick('{channel}')}>
        <ListItemText primary="channel" secondary="The channel name." />
      </MenuItem>
    </Menu>
  );
}

VariableMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  insertValue: PropTypes.func.isRequired,
};

export default withStyles(styles)(VariableMenu);