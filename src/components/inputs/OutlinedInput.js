import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';

// core components
import styles from "../../jss/outlinedInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomOutlinedInput(props) {
const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    name,
    type,
    labelProps,
    inputProps,
    error,
    multiline,
    rows,
  } = props;

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl }
      variant="outlined"
    >
      <InputLabel
        className={classes.labelRoot }
        htmlFor={id}
        {...labelProps}
      >
        {labelText}
      </InputLabel>
      <OutlinedInput
        multiline={multiline ? true : false}
        rows={multiline && rows ? rows : 1}
        type={type}
        name={name}
        {...inputProps}
        label={labelText}
        error={error[name] ? true : false}
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