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
      backgroundColor: theme.palette.gray.dark,
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
  textarea: {
    width: "100%",
    resize: "none",
    dragable: false,
  },
});

function CustomOutlinedFieldInput(props) {
  const {
    formControlProps,
    labelText,
    id,
    name,
    type,
    inputProps,
    error,
    multiline,
    textarea,
    classes,
  } = props;

  const textAreaClasses = clsx({
    [classes.textarea]: textarea && multiline,
  });

  return (
    <FormControl
      {...formControlProps}
      variant="outlined"
    >
      <TextField
        margin="dense"
        className={classes.textFieldRoot}
        id={id}
        multiline={multiline ? true : false}
        type={type}
        name={name}
        inputProps={{...inputProps, className: textAreaClasses}}
        label={labelText}
        error={error[name] ? true : false}
        variant="outlined"
      />
      {error[name] ? 
        <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>{error[name].message}</FormHelperText>
        : <FormHelperText> </FormHelperText> 
      }
    </FormControl>
  );
}

CustomOutlinedFieldInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.object,
  success: PropTypes.bool,
  multiline: PropTypes.bool,
  textarea: PropTypes.bool,
};

export default withStyles(styles)(CustomOutlinedFieldInput);