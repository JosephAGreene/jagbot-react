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

function ErrorText(props) {
  const { classes, error, text} = props;

  return (
    <FormHelperText className={classes.labelRootError} id={`error-message-maxChar`}>
      {error ? text : " "}
    </FormHelperText>
  );
}

ErrorText.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(ErrorText);

