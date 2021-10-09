import React from "react";
import PropTypes from "prop-types";

// Import API service
import BotService from "../../services/BotService.js";

// Import Mui components
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Chip from "@material-ui/core/Chip";

// Import custom components
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";

// Import icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SyncIcon from '@material-ui/icons/Sync';

const menuStyles = makeStyles((theme) => ({
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
    width: "inherit",
    padding: "5px 10px",
    alignItems: "center",
    position: "fixed",
    zIndex: 10,
    height: "inherit",
    backgroundColor: theme.palette.gray.dark,
    color: theme.palette.white.dark,
    fontSize: "16px",
    boxShadow: '0px 1px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 4px 5px 0px rgba(0,0,0,0.12)',
  },
  syncButton: {
    color: theme.palette.teal.main,
    '&:hover': {
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
  },
  itemHeading: {
    borderBottom: "1px solid black",
    borderTop: "1px solid black",
    backgroundColor: theme.palette.gray.light,
  }
}));

function RoleMenu(props) {
  const classes = menuStyles();
  const { value, setNewValue, roles, anchorEl, handleClose } = props;
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
      serverRoles.map((server, index) => {
        return (
          <section key={`${server.serverId}-${index}`}>
            <MenuItem className={classes.itemHeading} disabled>
              <ListItemText primary={server.serverName} />
            </MenuItem>
          {server.serverRoles.map((role, index) => {
          return (
            <MenuItem key={`${role.roleId}-${index}`} onClick={() => handleClick(role)}>
              <ListItemText secondary={role.roleName} />
            </MenuItem>
            )
          })}
          </section>
        )
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
            <GridItem xs>
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
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};

const styles = (theme) => ({
  textFieldRoot: {
    '& .MuiInputBase-root ': {
      display: "block",
    },
    '& .MuiFormLabel-root': {
      color: theme.palette.white.dark,
    },
    '& label.Mui-focused': {
      color: theme.palette.white.main,
    },
    '& label.Mui-error': {
      color: theme.palette.error.main,
    },
    '& .MuiOutlinedInput-multiline': {
      padding: theme.spacing(0, 2, 0, 2),
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.gray.main,
      color: theme.palette.white.main,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.teal.dark,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.teal.light,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.teal.main
      },
      "&.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.error.main
      }
    },
  },
  labelRootError: {
    color: theme.palette.error.main
  },
  formControl: {
    paddingBottom: "5px",
    margin: "5px 0 0 0",
    position: "relative",
    verticalAlign: "unset",
  },
  description: {
    color: theme.palette.white.dark,
    margin: "0 0 10px 0",
    fontSize: "16px",
  },
  textarea: {
    width: "inherit",
    resize: "none",
    dragable: false
  },
  display: {
    overflowWrap: "normal",
  },
  addButton: {
    padding: 0,
  },
  addIcon: {
    color: theme.palette.orange.main,
    '&:hover': {
      color: theme.palette.orange.light,
    },
    margin: theme.spacing(2.4, 0, .4, 0),
    width: theme.spacing(3.2),
    height: theme.spacing(3.2),
  },
  chip: {
    height: "unset !important",
    verticalAlign: "top",
    margin: theme.spacing(2, 0, 0, 1),
    backgroundColor: theme.palette.teal.dark,
    '&:focus': {
      backgroundColor: theme.palette.teal.dark,
    },
    borderRadius: "5px",
    padding: "3px 0",
  },
  chipHeading: {
    fontWeight: 600,
    color: theme.palette.white.dark,
  },
  chipLabel: {
    color: theme.palette.white.main,
  },
});

function RoleChipInput(props) {
  const {
    value,
    setValue,
    formControlProps,
    labelText,
    description,
    id,
    name,
    serverRoles,
    inputProps,
    register,
    error,
    classes
  } = props;

  const [addRoleAnchor, setAddRoleAchor] = React.useState(null);

  const setNewValue = (value) => {
    setValue(name, value, { shouldValidate: true });
  }

  const handleDelete = (role) => {
    const newValue = [...value];
    newValue.splice(newValue.indexOf(role), 1);
    setNewValue(newValue);
  }

  const handleAddRoleClick = (event) => {
    setAddRoleAchor(event.currentTarget);
  };

  const handleAddRoleClose = () => {
    setAddRoleAchor(null);
  };

  return (
    <FormControl
      {...formControlProps}
      className={classes.formControl}
      variant="outlined"
    >
      <div className={classes.description}>
        {description}
      </div>
      <TextField
        className={classes.textFieldRoot}
        id={id}
        multiline
        name={name}
        inputProps={{ ...inputProps, className: classes.textarea }}
        label={labelText}
        error={error[name] ? true : false}
        variant="outlined"
        disabled={true}
        InputProps={{
          startAdornment:
            <span className={classes.display}>
              <IconButton className={classes.addButton} aria-label="add role" onClick={handleAddRoleClick} >
                <AddCircleIcon className={classes.addIcon} />
              </IconButton>
              {value.map((role, index) => {
                return (
                  <Chip
                    key={index}
                    label={(
                      <>
                        <div className={classes.chipHeading}>{role.serverName}</div>
                        <div className={classes.chipLabel}>{role.roleName}</div>
                      </>
                    )}
                    className={classes.chip}
                    onDelete={() => handleDelete(role)}
                  />
                );
              })}
            </span>
        }}
      />
      {error[name] ?
        <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>{error[name].message}</FormHelperText>
        : <FormHelperText> </FormHelperText>
      }
      {/* Hidden input used to host react-hook-form register object because the
         "Chip Input TextField" is really only displayed for looks.
         I.E. It holds no value and only displays an array of startAdornments
      */}
      <input {...register} type="hidden" />
      <RoleMenu
        value={value}
        setNewValue={setNewValue}
        roles={serverRoles}
        anchorEl={addRoleAnchor}
        handleClose={handleAddRoleClose}
      />
    </FormControl>
  );
}

RoleChipInput.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  register: PropTypes.object.isRequired,
  serverRoles: PropTypes.array,
  labelText: PropTypes.string,
  description: PropTypes.string,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoleChipInput);