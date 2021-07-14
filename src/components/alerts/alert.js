import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function Alert(props) {
  const { open, autoHideDuration, onClose, severity } = props;

  return(
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <MuiAlert elevation={6} variant='filled' onClose={onClose} severity={severity}>
        {props.children}
      </MuiAlert>
    </Snackbar>
  );
}

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  autoHideDuration: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
};