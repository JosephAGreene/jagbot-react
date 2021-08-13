import React from 'react';
import PropTypes from "prop-types";
import clsx from 'clsx';

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const TealRadio =  withStyles((theme) =>({
  root: {
    color: theme.palette.teal.dark,
    '&$checked': {
      color: theme.palette.teal.main,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const styles = (theme) => ({
  disabled: {
    '& .MuiFormControlLabel-label.Mui-disabled': {
      color: theme.palette.gray.disabled,
    },
    '& .MuiIconButton-root.Mui-disabled': {
      color: theme.palette.gray.disabled,
    },
  },
});

function ControlledRadio (props) {
  const {value, label, disabled, classes} = props;

  const radioClasses = clsx({
    [classes.disabled]: disabled,
  });

  return (
    <FormControlLabel
      className={radioClasses}
      value={value}
      control={<TealRadio />}
      label={label}
      disabled={disabled}
    />
  );
}

ControlledRadio.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(ControlledRadio);