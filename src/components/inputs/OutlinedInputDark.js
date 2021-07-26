import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

const styles = (theme) => ({
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
});

const OutlinedInput = withStyles((theme) => ({
  root: {
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
}))(TextField);

function CustomOutlinedInputDark(props) {
  const {
    formControlProps,
    labelText,
    description,
    id,
    name,
    type,
    inputProps,
    error,
    multiline,
    rows,
    classes
  } = props;

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl }
      variant="outlined"
    >
      <div className={classes.description}>
        {description}
      </div>
      <OutlinedInput
        id={id}
        multiline={multiline ? true : false}
        rows={multiline && rows ? rows : 1}
        type={type}
        name={name}
        inputProps={{...inputProps}}
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

CustomOutlinedInputDark.propTypes = {
  labelText: PropTypes.node,
  description: PropTypes.string,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.object,
  success: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

export default withStyles(styles)(CustomOutlinedInputDark);