import React from "react";
import PropTypes from "prop-types";

// Import Mui components
import { withStyles } from '@material-ui/core/styles';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const styles = (theme) => ({
  alert: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: "250px",
    },
  },
});
function Alert(props) {
  const { classes, open, autoHideDuration, onClose, severity } = props;

  return(
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <MuiAlert className={classes.alert} elevation={6} variant='filled' onClose={onClose} severity={severity}>
        {props.children}
      </MuiAlert>
    </Snackbar>
  );
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  autoHideDuration: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
};

export default withStyles(styles)(Alert);