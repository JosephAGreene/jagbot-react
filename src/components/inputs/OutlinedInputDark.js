import React from "react";
import PropTypes from "prop-types";
import clsx from 'clsx';

// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
  textFieldRoot: {
    '& .MuiFormLabel-root': {
      color: theme.palette.white.dark,
    },
    '& label.Mui-focused': {
      color: theme.palette.white.main,
    },
    '& label.Mui-error': {
      color: theme.palette.error.main,
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
  textFieldDisabled: {
    '& .MuiFormLabel-root': {
      color: theme.palette.gray.disabled,
    },
    '& .MuiOutlinedInput-root': {
      "& .MuiInputBase-input": {
        color: theme.palette.gray.disabled,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.gray.disabled,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.gray.disabled,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.gray.disabled,
      }, 
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
});

function CustomOutlinedInputDark(props) {
  const {
    formControlProps,
    labelText,
    description,
    id,
    name,
    type,
    inputProps,
    InputProps,
    error,
    multiline,
    rows,
    disabled,
    labelProps,
    classes,
  } = props;

  const textFieldClasses = clsx({
    [classes.textFieldRoot]: true,
    [classes.textFieldDisabled]: disabled,
  });

  return (
    <FormControl
      {...formControlProps}
      className={classes.formControl }
      variant="outlined"
    >
      <div className={classes.description}>
        {description}
      </div>
      <TextField
        className={textFieldClasses}
        id={id}
        multiline={multiline ? true : false}
        rows={multiline && rows ? rows : 1}
        type={type}
        name={name}
        inputProps={{...inputProps}}
        InputProps={{...InputProps}}
        InputLabelProps={{...labelProps}}
        label={labelText}
        error={error[name] ? true : false}
        variant="outlined"
        disabled={disabled}
      />
      {error[name] ? 
        <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>{error[name].message}</FormHelperText>
        : <FormHelperText> </FormHelperText> 
      }
    </FormControl>
  );
}

CustomOutlinedInputDark.propTypes = {
  labelText: PropTypes.node,
  description: PropTypes.string,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.object,
  success: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(CustomOutlinedInputDark);