import React from 'react';
import PropTypes from "prop-types";

// Import MUI components
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = (theme) => ({
  labelRootError: {
    width: "100%",
    textAlign: "right",
    color: theme.palette.error.main
  },
});

function FormHelperText(props) {
  const { classes, error, text} = props;

  if (error) {
    return (
      <FormHelperText className={classes.labelRootError} id={`error-message-maxChar`}>
        {text}
      </FormHelperText>
    );
  }

  return (
    <FormHelperText> </FormHelperText>
  );
}

FormHelperText.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(FormHelperText);

