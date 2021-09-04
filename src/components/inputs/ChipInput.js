import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import {withStyles} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Chip from "@material-ui/core/Chip";

// Import custom components
import RoleMenu from '../../components/inputs/RoleMenu';

// Import Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    margin: "0 0 10px 10px",
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
    '&:hover' :{
      color: theme.palette.orange.light,
    },
    margin: theme.spacing(2.4, 0, .4, 0),
    width: theme.spacing(3.2),
    height: theme.spacing(3.2),
  },
  chip: {
    verticalAlign: "top",
    margin: theme.spacing(2, 0, 0, 1),
    color: theme.palette.white.main,
    backgroundColor: theme.palette.teal.dark,
    borderColor: theme.palette.teal.main,
    '&:focus': {
      backgroundColor: theme.palette.teal.dark,
    }
  }
});

function ChipInput(props) {
  const {
    value,
    setValue,
    formControlProps,
    labelText,
    description,
    id,
    name,
    inputProps,
    register,
    error,
    classes
  } = props;

  const [addRoleAnchor, setAddRoleAchor] = React.useState(null);

  const setNewValue = (value) => {
    setValue(name, value, {shouldValidate: true});
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
      className={formControlProps.className + " " + classes.formControl }
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
        inputProps={{...inputProps, className: classes.textarea}}
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
            <RoleMenu
              anchorEl={addRoleAnchor}
              handleClose={handleAddRoleClose}
              value={value}
              setNewValue={setNewValue}
            />
            {value.map((role, index) => {
            return (
              <Chip
                key={index} 
                label={role} 
                className={classes.chip} 
                onDelete={()=>handleDelete(role)} 
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
    </FormControl>
  );
}

ChipInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  description: PropTypes.string,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  register: PropTypes.object.isRequired,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.object,
  success: PropTypes.bool,
};

export default withStyles(styles)(ChipInput);