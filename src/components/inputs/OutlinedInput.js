import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import {
  withStyles,
} from '@material-ui/core/styles';

const styles = (theme) => ({
  labelRootError: {
    color: theme.palette.error.main
  },
  marginTop: {
    marginTop: "16px"
  },
  formControl: {
    paddingBottom: "10px",
    margin: "27px 0 0 0",
    position: "relative",
    verticalAlign: "unset",
  },
});

const OutlinedInput = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.gray.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.gray.light,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.teal.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.teal.main,
      },
    },
  },
}))(TextField);

function CustomOutlinedInput(props) {
  const {
    formControlProps,
    labelText,
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
      <OutlinedInput
        id={id}
        multiline={multiline ? true : false}
        rows={multiline && rows ? rows : 1}
        type={type}
        name={name}
        {...inputProps}
        label={labelText}
        error={error[name] ? true : false}
        variant="outlined"
      />
          {error[name] ? (
    <FormHelperText className={classes.labelRootError} id={`error-message-${name}`}>{error[name].message}</FormHelperText>
      ) : <FormHelperText> </FormHelperText> }
    </FormControl>
  );
}

CustomOutlinedInput.propTypes = {
  labelText: PropTypes.node,
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

export default withStyles(styles)(CustomOutlinedInput);